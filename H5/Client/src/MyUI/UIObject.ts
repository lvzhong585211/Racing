namespace MyUI {

    import ResourceObject = Base.ResourceObject;

    /**
     * @desc 封装UI的加载与卸载,方便管理它的资源.
     */
    export class UIObject<T extends View | Dialog> extends ResourceObject {
        public uiView: T = null;        // 保存真正的UI实现类实例
        private ctorT: { new(): T };   // T 的构造函数

        /**
         * 构造函数
         * @param ctor 传入T的构造函数
         * @param resGroupPrefix 
         */
        constructor(ctor: { new(): T }, resGroupPrefix?: string) {
            super(resGroupPrefix);
            this.ctorT = ctor;
        }

        /**
        * @desc 加载指定的资源,具体参数与返回值见: Laya.loader.load()函数
        * 注: 这里是对Laya.loader.load()函数支持async的封装,方便上层使用
        */
        public async Load(url?: any, progress?: laya.utils.Handler, type?: string, priority?: number, eLayer: UILayer = UILayer.View): Promise<any> {
            // 等待资源加载完成
            if (url) {
                await super.Load(url, progress, type, priority);
            }

            // 构造界面实例
            this.uiView = new this.ctorT();
            uiMgr.addChild(this.uiView, eLayer);
        }

        /**
         * @desc 删除自己及资源引用
         */
        public ClearRes(): void {
            if (this.uiView) {
                this.uiView.destroy();
            }

            super.ClearRes();
        }
    }
}