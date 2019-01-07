namespace Logic {
	/**
	 * 包含图形显示对象的Actor
	 */
    export class ActorWithView<TView extends Actor3DBase> extends AActor implements IDebugInnerID, IViewActor {
        protected m_view: TView; // 图形显示对象

		/**
		 * 包含图形显示对象的Actor构造函数
		 * @param type Actor的类型
		 * @param clsTView 图形对象构造函数的类类型
		 */
        constructor(type: EActorType, private clsTView: new () => TView) {
            super(type);
        }

		/**
         * 加载图形对象
         * @param url 指定要加载角色的文件. 如zs.lh
         * @param progress 用于加载进度的回调
         * 注: 必须是 Sprite3D 的文件
         * 注: 本函数不可以重入,即在上次调用执行完成前不可以再次调用
		 * 
         */
        protected async loadView(sUrl: string, progress?: Laya.Handler) {
            const view = new this.clsTView();
            this.m_view = view;
            const bRet = await view.load(sUrl, progress);
            this.handleAfterViewLoaded(bRet);
            return bRet;
        }

        /**
         * 图形加载完处理
         * @param bSuccess true=加载成功、false=加载失败
         */
        protected handleAfterViewLoaded(bSuccess: boolean) {

        }

		/**
         * 添加自己到指定的场景
         * @param scene 指定要添加到场景
         * 注: 只有添加到场景后,模型才会显示
         */
        public addToLevel(level: Logic.Level): boolean {
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
        public getRoleID(): number {
            return 0;
        }

        /** 获取3D显示对象 */
        public getView(): Laya.Sprite3D {
            return this.m_view;
        }

		/**
         * 返回二维平台坐标 
         * 注: 此函数效率会比 getCoordinate() 函数高,且少了内存分配
         */
        public getCoordinateRef(outCoord: Laya.Point): void {
            outCoord.x = 0;
            outCoord.y = 0;
        }

		/**
         * 返回二维平面坐标 
         * 注: 不要频繁调用此函数,以免带来性能问题
         */
        public getCoordinate(): Laya.Point {
            return new Laya.Point();
        }

		/**
		 * 返回世界位置(Laya坐标系)
		 */
        public getPosition(): Laya.Vector3 {
            return new Laya.Vector3();
        }

        public destroy() {
            if (this.m_view) {
                this.m_view.destroy();
                this.m_view = null;
            }
            super.destroy();
        }
    }
}