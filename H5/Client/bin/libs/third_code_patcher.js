// 在这里实现一些对第三方库的扩展或Bug修正
// 本文件应该在所有第三方库代码之后,项目代码之前包含

// 给protobuf.Reader扩展一个直接读取剩余内容到一个utf8格式的字符串的功能
protobuf.Reader.prototype.rawstring = function read_rawstring() {
    let utf8 = protobuf.util.utf8;
    return utf8.read(this.buf, this.pos, this.len);
};

// 给protobuf.Writer扩展一个直接写入utf8格式的字符串的功能,不带字符串长度
protobuf.Writer.prototype.rawstring = function write_rawstring(value) {
    let utf8 = protobuf.util.utf8;
    var len = utf8.length(value);
    if (len > 0)
        return this._push(utf8.write, len, value);
    else
        return this;
};

/**
 * 读取数组对象.这对应C#版本的 Serializer.Serialize<List<T>>();
 */
protobuf.Reader.prototype.array = function read_array(decode) {
    const retArray = new Array();
    let msgReader = this;
    while (msgReader.pos < msgReader.len) {
        var tag = msgReader.uint32();
        Global.Log.Assert((tag >>> 3) == 1);
        retArray.push(decode(msgReader, msgReader.uint32()));
    }
    return retArray;
}

/**
 * 由于Laya在导出时写死了地形的调光参数,但我们目前不需要地形有高光,所以屏蔽掉它
 */
let _oldParseDataFn = laya.d3.terrain.TerrainRes.prototype.parseData;

laya.d3.terrain.TerrainRes.prototype.parseData = function (data) {
    let json = data[0];

    // 清除掉高光
    const specular = json.material.specular;
    specular[0] = 0;
    specular[1] = 0;
    specular[2] = 0;
    specular[3] = 0;

    // 环境光默认设置为白色
    const ambient = json.material.ambient;
    ambient[0] = 0.4;
    ambient[1] = 0.4;
    ambient[2] = 0.4;

    return _oldParseDataFn.call(this, data);
};

/** 
 * Html显示的文本中的空格替换成"&nbsp;"
 */
let _oldAppendHTML = laya.html.dom.HTMLDivElement.prototype.appendHTML;
laya.html.dom.HTMLDivElement.prototype.appendHTML = function (text) {
    text = text.replace(/[ ](?=[^>]*(<|$))/g, "&nbsp;");
    _oldAppendHTML.call(this, text);
}

/** 
 * Label.text自动处理多语言文本
 */
let _oldLabelGetText = laya.ui.Label.prototype._$get_text;
let _oldLabelSetText = laya.ui.Label.prototype._$set_text;
Object.defineProperty(laya.ui.Label.prototype, "text", {
    get: function () {
        return _oldLabelGetText.call(this);
    },
    set: function (value) {
        if (typeof value !== "string") {
            value = value + "";
        }
        if (value.search(/^``\d+$/) !== -1) {
            value = Loca.getLang(value.substr(2));
        }
        _oldLabelSetText.call(this, value);
    }, enumerable: false, configurable: true
});

// /** 
//  * Button.label自动处理多语言文本
//  */
// let _oldButtonGetLabel = laya.ui.Button.prototype._$get_label;
// let _oldButtonSetLabel = laya.ui.Button.prototype._$set_label;
// Object.defineProperty(laya.ui.Button.prototype, "label", {
//     get: function () {
//         return _oldButtonGetLabel.call(this);
//     },
//     set: function (value) {
//         if (typeof value !== "string") {
//             value = value + "";
//         }
//         if (value.search(/^``\d+$/) !== -1) {
//             value = Loca.getLang(value.substr(2));
//         }
//         _oldButtonSetLabel.call(this, value);
//     }, enumerable: false, configurable: true
// });