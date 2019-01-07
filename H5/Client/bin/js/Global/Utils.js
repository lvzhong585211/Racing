var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/// 这个文件中放一些通用的功能辅助函数,与游戏上层的具体逻辑没太大关系
var Global;
(function (Global) {
    /**
     * 判断对象是否为null或undefined
     * @param value 要判断的对象
     */
    function isNullOrUndefined(value) {
        return value === null || value === undefined;
    }
    Global.isNullOrUndefined = isNullOrUndefined;
    //#region ====== 字符串拆分及转换辅助函数 ======
    /**
     * 将字符串转换为Int类型数组
     * @param str 字符串数组
     * @param ch 分隔符
     */
    function String2IntArray(str, ch) {
        if (str.trim() === "")
            return null;
        const sa = str.split(ch);
        if (!sa)
            return null;
        const da = [];
        for (let i = 0; i < sa.length; i++) {
            const sVal = sa[i].trim();
            if (sVal === "")
                da.push(0);
            else
                da.push(parseInt(sVal));
        }
        return da;
    }
    Global.String2IntArray = String2IntArray;
    /**
     * 将字符串转换为Double类型数组
     * @param str 字符串数组
     * @param ch 分隔符
     */
    function String2DoubleArray(str, ch) {
        if (str.trim() === "")
            return null;
        const sa = str.split(ch);
        if (!sa)
            return null;
        const da = [];
        for (let i = 0; i < sa.length; i++) {
            const sVal = sa[i].trim();
            if (sVal === "")
                da.push(0);
            else
                da.push(parseFloat(sVal));
        }
        return da;
    }
    Global.String2DoubleArray = String2DoubleArray;
    /**
     * 将字符串数组转换为Double类型数组
     * @param sa 字符串数组
     */
    function StringArray2DoubleArray(sa) {
        const da = [];
        for (let i = 0; i < sa.length; i++) {
            const sVal = sa[i].trim();
            if (sVal === "")
                da.push(0);
            else
                da.push(parseFloat(sVal));
        }
        return da;
    }
    Global.StringArray2DoubleArray = StringArray2DoubleArray;
    //#endregion ============
    class Utils {
        /**
         * @desc 加载指定的资源,具体参数与返回值见: Laya.loader.load()函数
         * 注: 这里是对Laya.loader.load()函数支持async的封装,方便上层使用
         */
        static LoadRes(url, progress, type, priority, group) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    // 构造加载资源完成的回调函数. retData的具体内容见 Laya.loader.load() 中的说明
                    const completeFun = (retData) => {
                        resolve(retData);
                    };
                    Laya.loader.load(url, Laya.Handler.create(null, completeFun), progress, type, priority, true, group);
                });
            });
        }
        /**
         * 加载指定的资源,具体参数与返回值见: Laya.loader.create()函数
         * 注: 这里是对Laya.loader.create()函数支持async的封装,方便上层使用
         */
        static CreateRes(url, progress, clas, params, priority, cache) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    // 构造加载资源完成的回调函数. retData的具体内容见 Laya.loader.create() 中的说明                
                    const completeFun = () => {
                        const retData = Laya.loader.getRes(url);
                        resolve(retData);
                    };
                    Laya.loader.create(url, Laya.Handler.create(null, completeFun), progress, clas, params, priority, cache);
                });
            });
        }
        /**
         * 可以设置阻塞（等待）多长时间
         * @param nMs 毫秒数
         */
        static waitTime(nMs) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => {
                    setTimeout(resolve, nMs);
                });
            });
        }
        /**
        * 解析xml字符串并返回一个含有多个子节点的节点nodeList
        * @param xmlString 批定要解析的对象
        */
        static parseXMLElementListFromString(xmlString) {
            const xmlDom = Laya.Utils.parseXMLFromString(xmlString);
            return xmlDom.childNodes[0].childNodes[0].childNodes;
        }
        /**
         * 解析xml字符串并返回第一个子节点
         * @param xmlString 批定要解析的对象
         */
        static parseXMLFromString(xmlString) {
            const xmlDom = Laya.Utils.parseXMLFromString(xmlString);
            let childNode = xmlDom.firstChild;
            while (childNode.nodeType !== 1) {
                childNode = childNode.nextSibling;
            }
            Global.Log.Assert(childNode instanceof Element);
            return childNode;
        }
        /**
         * 返回指定名称的整数属性值
         * @param xmlNode 指定要获取属性值的节点
         * @param attrName 指定要获取值的属性名称
         */
        static getElementAttributeInt(xmlNode, attrName) {
            const value = xmlNode.getAttribute(attrName);
            if (value)
                return parseInt(value);
            return 0;
        }
        /**
        * 返回指定名称的字符串值
        * @param xmlNode 指定要获取属性值的节点
        * @param attrName 指定要获取值的属性名称
        */
        static getElementAttributeStr(xmlNode, attrName) {
            const value = xmlNode.getAttribute(attrName);
            if (value)
                return value.toString();
            return "";
        }
    }
    Global.Utils = Utils;
    /**
     * 把GameServer服务器的坐标转换成对应的Laya坐标系
     * @param posX 指定要转换的服务器坐标X
     * @param posY 指定要转换的服务器坐标Y
     * 注: 不会转换高度
     */
    function GSCoord2Laya(posX, posY) {
        posX = -posX / 100; // 除100是把厘米转换成米
        const posZ = posY / 100;
        return new Laya.Vector3(posX, 0, posZ);
    }
    Global.GSCoord2Laya = GSCoord2Laya;
    /**
     * 把给定的Laya坐标转换成GameServer坐标系
     * @param pos 指定要转换的Laya坐标
     */
    function LayaCoord2GS(pos) {
        return { x: -pos.x * 100, y: pos.z * 100 };
    }
    Global.LayaCoord2GS = LayaCoord2GS;
    /**
     * 为函数的重进入进行检测
     * 注：重入检测分两种情况 1.全局重入检测（使用静态函数） 2.实例级别的重入检测（构造ReEnterCheck的实例，调用成员函数）
     */
    class ReEnterCheck {
        /**
         *
         * @param name 重入检测的名称
         * @param devOnly 是否只在开发版起作用,如果是,重入时会有Assert
         */
        constructor(name, devOnly) {
            this.entered = false; // 是否已经进入了
            this.devOnly = true; // 是否只是开发版起作用
            this.name = name;
            if (devOnly) {
                this.devOnly = devOnly;
            }
        }
        /**
         * 偿试看是否能进入,成功后必须与leave()匹配调用
         */
        tryEnter() {
            if (this.devOnly && !SystemConfig.development) {
                return true;
            }
            if (this.entered) {
                if (this.devOnly && SystemConfig.development) {
                    Global.Log.Assert(false); // 重入了
                }
                return false;
            }
            this.entered = true;
            return true;
        }
        /**
         * 离开,必须与tryEnter()匹配调用
         */
        leave() {
            if (this.devOnly && !SystemConfig.development) {
                return;
            }
            if (this.entered) {
                this.entered = false;
            }
            else {
                Global.Log.Assert(false, `${this.name}的tryEnter()与leave()调用不匹配?`);
            }
        }
        /**
        * 偿试看是否能进入,成功后必须与leave()匹配调用
        * @param toCheckFunction 指定要检测的函数
        * @param devOnly 是否只在开发版起作用,默认为true
        * 注：静态版本提供全局的检测，即在整个游戏进程中被检测的函数都不允许重入
        */
        static tryEnter(toCheckFunction, devOnly = true) {
            if (devOnly && !SystemConfig.development) {
                return true;
            }
            const obj = toCheckFunction;
            if (obj.__reEnterChecker) {
                if (devOnly && SystemConfig.development) {
                    Global.Log.Assert(false); // 重入了
                }
                return false;
            }
            obj.__reEnterChecker = true;
            return true;
        }
        /**
        * 离开,必须与tryEnter()匹配调用
        * @param toCheckFunction 指定要检测的函数
        * @param devOnly 是否只在开发版起作用
        * * 注：静态版本提供全局的检测，即在整个游戏进程中被检测的函数都不允许重入
        */
        static leave(toCheckFunction, devOnly = true) {
            if (devOnly && !SystemConfig.development) {
                return;
            }
            const obj = toCheckFunction;
            if (obj.__reEnterChecker) {
                obj.__reEnterChecker = false;
            }
            else {
                Global.Log.Assert(false, `${toCheckFunction}的tryEnter()与leave()调用不匹配?`);
            }
        }
    }
    Global.ReEnterCheck = ReEnterCheck;
    /**
     * 实现一个固定大小的Byte的多维数组. 类似 c# 的 int[,]
     */
    class Uint8ArrayGrid {
        /**
         *
         * @param stride 指定每个数据的步长
         * @param xSize 指定数组的一维大小
         * @param ySize 指定数组的二维大小
         */
        constructor(xSize, ySize) {
            this.mXSize = xSize;
            this.mYSize = ySize;
            const size = xSize * ySize;
            this.mDataView = new Uint8Array(size);
        }
        /**
         * 返回对应的索引
         */
        index(x, y) {
            return y * this.mXSize + x;
        }
        /**
         * 按下标设置数组的值
         * 注: x,y必须为无符号整数
         */
        set(x, y, value) {
            const index = this.index(x, y);
            this.mDataView[index] = value;
        }
        /**
         * 按下标获取数组的值
         * 注: x,y必须为无符号整数
         */
        get(x, y) {
            const index = this.index(x, y);
            return this.mDataView[index];
        }
        get xSize() {
            return this.mXSize;
        }
        get ySize() {
            return this.mYSize;
        }
        getUpperBound(index) {
            return index === 0 ? this.xSize : this.ySize;
        }
        clone() {
            const retArray = new Uint8ArrayGrid(this.mXSize, this.mYSize);
            retArray.mDataView.set(this.mDataView);
            return retArray;
        }
    }
    Global.Uint8ArrayGrid = Uint8ArrayGrid;
    class StringBuilder {
        constructor(value = String.Empty) {
            this.Values = [];
            this.Values = new Array(value);
        }
        ToString() {
            return this.Values.join("");
        }
        Append(value) {
            this.Values.push(value);
        }
        AppendFormat(format, ...args) {
            this.Values.push(String.Format(format, ...args));
        }
        Clear() {
            this.Values = [];
        }
    }
    Global.StringBuilder = StringBuilder;
    /**
     * 为字符串提供格式化操作,支持如: var value = String.Format("{0:L}", "APPLE"); //output "apple"
     */
    class String {
        /**
         * 比较两个字符串是否相等，忽略大小写
         * @param value1 字符串1
         * @param value2 字符串2
         */
        static isEqualIgnoreCase(value1, value2) {
            if (value1 === value2)
                return true;
            if (value1 && value2)
                return value1.toLowerCase() === value2.toLowerCase();
            return false;
        }
        static IsNullOrWhiteSpace(value) {
            try {
                if (value == null || value === undefined)
                    return true;
                return value.toString().replace(/\s/g, "").length < 1;
            }
            catch (e) {
                console.log(e);
                return false;
            }
        }
        static Join(delimiter, ...args) {
            try {
                const firstArg = args[0];
                if (Array.isArray(firstArg) || firstArg instanceof Array) {
                    let tempString = String.Empty;
                    const count = 0;
                    for (let i = 0; i < firstArg.length; i++) {
                        const current = firstArg[i];
                        if (i < firstArg.length - 1)
                            tempString += current + delimiter;
                        else
                            tempString += current;
                    }
                    return tempString;
                }
                else if (typeof firstArg === "object") {
                    let tempString = String.Empty;
                    const objectArg = firstArg;
                    const keys = Object.keys(firstArg); // get all Properties of the Object as Array
                    keys.forEach(element => { tempString += objectArg[element] + delimiter; });
                    tempString = tempString.slice(0, tempString.length - delimiter.length); // remove last delimiter
                    return tempString;
                }
                const stringArray = args;
                return String.join(delimiter, ...stringArray);
            }
            catch (e) {
                console.log(e);
                return String.Empty;
            }
        }
        static Format(format, ...args) {
            try {
                return format.replace(/{(\d+(:\w*)?)}/g, function (match, i) {
                    const s = match.split(":");
                    if (s.length > 1) {
                        i = i[0];
                        match = s[1].replace("}", ""); // U
                    }
                    let arg = args[i];
                    if (arg == null || arg === undefined || match.match(/{\d+}/))
                        return arg;
                    arg = String.parsePattern(match, arg);
                    return typeof arg !== "undefined" && arg != null ? arg : String.Empty;
                });
            }
            catch (e) {
                console.log(e);
                return String.Empty;
            }
        }
        static parsePattern(match, arg) {
            switch (match) {
                case "L":
                    arg = arg.toLowerCase();
                    return arg;
                case "U":
                    arg = arg.toUpperCase();
                    return arg;
                case "d":
                    if (typeof (arg) === "string") {
                        return String.getDisplayDateFromString(arg);
                    }
                    else if (arg instanceof Date) {
                        return String.Format("{0:00}.{1:00}.{2:0000}", arg.getDate(), arg.getMonth(), arg.getFullYear());
                    }
                    break;
                case "s":
                    if (typeof (arg) === "string") {
                        return String.getSortableDateFromString(arg);
                    }
                    else if (arg instanceof Date) {
                        return String.Format("{0:0000}-{1:00}-{2:00}", arg.getFullYear(), arg.getMonth(), arg.getDate());
                    }
                    break;
                case "n": // Tausender Trennzeichen
                    const replacedString = arg.replace(/,/g, ".");
                    if (isNaN(parseFloat(replacedString)) || replacedString.length <= 3)
                        break;
                    const numberparts = replacedString.split(/[^0-9]+/g);
                    let parts = numberparts;
                    if (numberparts.length > 1) {
                        parts = [String.join("", ...(numberparts.splice(0, numberparts.length - 1))), numberparts[numberparts.length - 1]];
                    }
                    const integer = parts[0];
                    const mod = integer.length % 3;
                    let output = (mod > 0 ? (integer.substring(0, mod)) : String.Empty);
                    const firstGroup = output;
                    const remainingGroups = integer.substring(mod).match(/.{3}/g);
                    output = `${output}.${String.Join(".", remainingGroups)}`;
                    arg = output + (parts.length > 1 ? "," + parts[1] : "");
                    return arg;
                default:
                    break;
            }
            if (typeof (arg) === "number" || !isNaN(arg))
                return String.formatNumber(arg, match);
            return arg;
        }
        static getDisplayDateFromString(input) {
            let splitted;
            splitted = input.split("-");
            if (splitted.length <= 1)
                return input;
            let day = splitted[splitted.length - 1];
            const month = splitted[splitted.length - 2];
            const year = splitted[splitted.length - 3];
            day = day.split("T")[0];
            day = day.split(" ")[0];
            return `${day}.${month}.${year}`;
        }
        static getSortableDateFromString(input) {
            const splitted = input.replace(",", "").split(".");
            if (splitted.length <= 1)
                return input;
            const times = splitted[splitted.length - 1].split(" ");
            let time = splitted[0];
            if (times.length > 1)
                time = times[times.length - 1];
            const year = splitted[splitted.length - 1].split(" ")[0];
            const month = splitted[splitted.length - 2];
            const day = splitted[splitted.length - 3];
            let result = `${year}-${month}-${day}`;
            if (time.length > 1)
                result += "T" + time;
            else
                result += "T" + "00:00:00";
            return result;
        }
        static formatNumber(input, formatTemplate) {
            const count = formatTemplate.length;
            const stringValue = input.toString();
            if (count <= stringValue.length)
                return stringValue;
            let remainingCount = count - stringValue.length;
            remainingCount += 1; // Das Array muss einen Eintrag mehr als die benötigten Nullen besitzen
            return new Array(remainingCount).join("0") + stringValue;
        }
        static join(delimiter, ...args) {
            let temp = String.Empty;
            for (let i = 0; i < args.length; i++) {
                if ((typeof args[i] === "string" && String.IsNullOrWhiteSpace(args[i])) || (typeof args[i] !== "number" && typeof args[i] !== "string"))
                    continue;
                const arg = "" + args[i];
                temp += arg;
                for (let i2 = i + 1; i2 < args.length; i2++) {
                    if (String.IsNullOrWhiteSpace(args[i2]))
                        continue;
                    temp += delimiter;
                    i = i2 - 1;
                    break;
                }
            }
            return temp;
        }
    }
    String.Empty = "";
    String.IsNullOrEmpty = String.IsNullOrWhiteSpace;
    Global.String = String;
})(Global || (Global = {}));
//# sourceMappingURL=Utils.js.map