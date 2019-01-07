var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Logic;
(function (Logic) {
    /**
     * 实现一个3D角色的基础类(包含动画操作),处理3D角色的加载等操作，仅加载单个资源的简单3D角色可使用该类派生
     */
    class Actor3DBase extends Laya.Sprite3D {
        // private animator: Laya.Animator;    // 动作控制器
        // 动作名称
        // private readonly Ani_Stand = "Stand";   
        // private readonly Ani_Fly = "Fly";
        constructor(bUseClone = false) {
            super();
            this.init = false; // 标识是否已经加载成功
            // 使用Loader加载出来的对象模型只有一个，如果该模型需要显示多个，则应该把加载出来的模型作为模板，使用克隆对象
            this.m_bUseClone = false;
            this.m_bUseClone = bUseClone;
        }
        /**
         * 加载3D角色
         * @param url 指定要加载角色的文件. 如zs.lh
         * @param progress 用于加载进度的回调
         * 注: 必须是 Sprite3D 的文件
         * 注: 本函数不可以重入,即在上次调用执行完成前不可以再次调用
         */
        load(url, progress) {
            return __awaiter(this, void 0, void 0, function* () {
                Global.Log.Assert(!this.init); // 已经加载过了,不可以再次复用
                // 加载资源
                const retData = yield Global.Utils.CreateRes(url, progress, Laya.Sprite3D, null);
                if (!retData) { // 加载资源失败?
                    Global.Log.Error(`(${url})加载失败!`);
                    return false;
                }
                if (!(retData instanceof Laya.Sprite3D)) { // 资源类型不正确?
                    // to do ... 释放资源?
                    Laya.loader.clearRes(url); // 只清除这个可以吗?
                    Global.Log.Assert(false, `非法的资源类型(${retData})`);
                    return false;
                }
                if (this.m_bUseClone) { // 使用克隆对象
                    this._sprite3D = Laya.Sprite3D.instantiate(retData);
                }
                else {
                    this._sprite3D = retData;
                }
                // this.animator = (this._sprite3D.getChildAt(0) as Laya.Sprite3D).getComponentByType(Laya.Animator) as Laya.Animator;
                // Global.Log.Assert(this.animator != null);
                // Fly 动作的Layabox导出有问题，先不使用了
                // this.animator.play(this.Ani_Fly);
                // this.animator.on(Laya.Event.STOPPED, this, this.onAniStoped); // Stopped事件只在非循环动作结束时触发，循环动作触发 complete 事件
                // 添加到父节点
                if (this.destroyed) {
                    Global.Log.Info(`(${url})加载完成添加到父节点时,发现父节点已经被删除了!`);
                    this._sprite3D.destroy();
                    return false;
                }
                this.addChild(this._sprite3D);
                // 调试代码
                if (SystemConfig.debugShowActor3DAxis && (gameIns.CurrentMode instanceof GameMode.PlayingMode)) {
                    const box = this.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.1, 0.1, 0.1)));
                    box.addComponent(Logic.DebugShowAxisComponent);
                }
                this.init = true;
                return true;
            });
        }
        // private onAniStoped():void{
        //    this.animator.play(this.Ani_Stand);
        // }
        /**
         * 获取底层的Sprite3D
         * @returns {}
         */
        get sprite3D() {
            return this._sprite3D;
        }
        /**
        * <p>销毁此对象。destroy对象默认会把自己从父节点移除，并且清理自身引用关系，等待js自动垃圾回收机制回收。destroy后不能再使用。</p>
        * <p>destroy时会移除自身的事情监听，自身的timer监听，移除子对象及从父节点移除自己。</p>
        * @param destroyChild	（可选）是否同时销毁子节点，若值为true,则销毁子节点，否则不销毁子节点。
        */
        destroy(destroyChild) {
            // to do ... 清除资源
            if (this._sprite3D) {
                this._sprite3D.destroy();
                this._sprite3D = null;
            }
            this.init = false;
            super.destroy(true);
        }
    }
    Logic.Actor3DBase = Actor3DBase;
})(Logic || (Logic = {}));
//# sourceMappingURL=Actor3DBase.js.map