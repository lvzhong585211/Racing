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
     * 包含图形显示对象的Actor
     */
    class ActorWithView extends Logic.AActor {
        /**
         * 包含图形显示对象的Actor构造函数
         * @param type Actor的类型
         * @param clsTView 图形对象构造函数的类类型
         */
        constructor(type, clsTView) {
            super(type);
            this.clsTView = clsTView;
        }
        /**
         * 加载图形对象
         * @param url 指定要加载角色的文件. 如zs.lh
         * @param progress 用于加载进度的回调
         * 注: 必须是 Sprite3D 的文件
         * 注: 本函数不可以重入,即在上次调用执行完成前不可以再次调用
         *
         */
        loadView(sUrl, progress) {
            return __awaiter(this, void 0, void 0, function* () {
                const view = new this.clsTView();
                this.m_view = view;
                const bRet = yield view.load(sUrl, progress);
                this.handleAfterViewLoaded(bRet);
                return bRet;
            });
        }
        /**
         * 图形加载完处理
         * @param bSuccess true=加载成功、false=加载失败
         */
        handleAfterViewLoaded(bSuccess) {
        }
        /**
         * 添加自己到指定的场景
         * @param scene 指定要添加到场景
         * 注: 只有添加到场景后,模型才会显示
         */
        addToLevel(level) {
            if (!level) {
                return false;
            }
            if (this.m_view) {
                level.getScene().addChild(this.m_view);
            }
            super.addToLevel(level);
            return true;
        }
        /** 返回角色Id */
        getRoleID() {
            return 0;
        }
        /** 获取3D显示对象 */
        getView() {
            return this.m_view;
        }
        /**
         * 返回二维平台坐标
         * 注: 此函数效率会比 getCoordinate() 函数高,且少了内存分配
         */
        getCoordinateRef(outCoord) {
            outCoord.x = 0;
            outCoord.y = 0;
        }
        /**
         * 返回二维平面坐标
         * 注: 不要频繁调用此函数,以免带来性能问题
         */
        getCoordinate() {
            return new Laya.Point();
        }
        /**
         * 返回世界位置(Laya坐标系)
         */
        getPosition() {
            return new Laya.Vector3();
        }
        destroy() {
            if (this.m_view) {
                this.m_view.destroy();
                this.m_view = null;
            }
            super.destroy();
        }
    }
    Logic.ActorWithView = ActorWithView;
})(Logic || (Logic = {}));
//# sourceMappingURL=ActorWithView.js.map