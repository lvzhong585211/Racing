var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var MyUI;
(function (MyUI) {
    var ResourceObject = Base.ResourceObject;
    /**
     * @desc 封装UI的加载与卸载,方便管理它的资源.
     */
    class UIObject extends ResourceObject {
        /**
         * 构造函数
         * @param ctor 传入T的构造函数
         * @param resGroupPrefix
         */
        constructor(ctor, resGroupPrefix) {
            super(resGroupPrefix);
            this.uiView = null; // 保存真正的UI实现类实例
            this.ctorT = ctor;
        }
        /**
        * @desc 加载指定的资源,具体参数与返回值见: Laya.loader.load()函数
        * 注: 这里是对Laya.loader.load()函数支持async的封装,方便上层使用
        */
        Load(url, progress, type, priority, eLayer = UILayer.View) {
            const _super = name => super[name];
            return __awaiter(this, void 0, void 0, function* () {
                // 等待资源加载完成
                if (url) {
                    yield _super("Load").call(this, url, progress, type, priority);
                }
                // 构造界面实例
                this.uiView = new this.ctorT();
                uiMgr.addChild(this.uiView, eLayer);
            });
        }
        /**
         * @desc 删除自己及资源引用
         */
        ClearRes() {
            if (this.uiView) {
                this.uiView.destroy();
            }
            super.ClearRes();
        }
    }
    MyUI.UIObject = UIObject;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=UIObject.js.map