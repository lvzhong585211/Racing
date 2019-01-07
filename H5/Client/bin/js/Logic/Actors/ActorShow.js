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
     * 实现一个3D角色的显示节点(包含动画操作),处理3D角色的加载等操作
     * 注: 目前仅仅用在角色创建界面上
     */
    class ActorShow extends Logic.Actor3DBase {
        constructor() {
            super(...arguments);
            // 动作名称
            this.Ani_Stand = "Stand";
            this.Ani_Fly = "Fly";
        }
        /**
         * 加载3D角色
         * @param url 指定要加载角色的文件. 如zs.lh
         * @param progress 用于加载进度的回调
         * 注: 必须是 Sprite3D 的文件
         * 注: 本函数不可以重入,即在上次调用执行完成前不可以再次调用
         */
        load(url, progress) {
            const _super = name => super[name];
            return __awaiter(this, void 0, void 0, function* () {
                Global.Log.Assert(!this.init); // 已经加载过了,不可以再次复用
                yield _super("load").call(this, url, progress);
                this.animator = this._sprite3D.getChildAt(0).getComponentByType(Laya.Animator);
                Global.Log.Assert(this.animator != null);
                return true;
            });
        }
        onAniStoped() {
            this.animator.play(this.Ani_Stand);
        }
        /**
         * 获取底层的Sprite3D
         * @returns {}
         */
        get sprite3D() {
            return this._sprite3D;
        }
        /**
         * 播放动画。
         * @param	name 如果为null则播放默认动画，否则按名字播放动画片段。
         * @param	playbackRate 播放速率。
         * @param	startFrame 开始帧率。
         * @param	endFrame 结束帧率.-1表示为最大结束帧率。
         */
        play(name, playbackRate) {
            if (this.animator) {
                this.animator.play(name);
            }
        }
        /**
         * 停止播放当前动画
         * @param	immediate 是否立即停止
         */
        stop(immediate) {
            if (this.animator)
                this.animator.stop();
        }
        /**
        * <p>销毁此对象。destroy对象默认会把自己从父节点移除，并且清理自身引用关系，等待js自动垃圾回收机制回收。destroy后不能再使用。</p>
        * <p>destroy时会移除自身的事情监听，自身的timer监听，移除子对象及从父节点移除自己。</p>
        * @param destroyChild	（可选）是否同时销毁子节点，若值为true,则销毁子节点，否则不销毁子节点。
        */
        destroy(destroyChild) {
            this.animator = null;
            super.destroy(true);
        }
    }
    Logic.ActorShow = ActorShow;
})(Logic || (Logic = {}));
//# sourceMappingURL=ActorShow.js.map