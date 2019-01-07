var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Base;
(function (Base) {
    var Utils = Global.Utils;
    // @desc 封装一个管理资源加载与卸载的基类.
    class ResourceObject {
        /**
         * @param resGroupPrefix 资源组的前缀,方便调试
         */
        constructor(resGroupPrefix) {
            this.resGroup =
                resGroupPrefix
                    ? resGroupPrefix + "_" + ResourceObject.groupIndex.toString()
                    : ResourceObject.groupIndex.toString();
            ResourceObject.groupIndex++;
        }
        /**
        * @desc 加载指定的资源,具体参数与返回值见: Laya.loader.load()函数
        * 注: 这里是对Laya.loader.load()函数支持async的封装,方便上层使用
        */
        Load(url, progress, type, priority) {
            return __awaiter(this, void 0, void 0, function* () {
                return Utils.LoadRes(url, progress, type, priority, this.resGroup);
            });
        }
        /**
         * @desc 调用此函数清除本对象加载的资源
         */
        ClearRes() {
            Global.Log.Info(`-> 清除资源组${this.resGroup}`);
            Laya.loader.clearResByGroup(this.resGroup);
        }
    }
    ResourceObject.groupIndex = 1000; // 我们需要一个数来唯一标识资源所在的组.
    Base.ResourceObject = ResourceObject;
})(Base || (Base = {}));
//# sourceMappingURL=ResourceObject.js.map