namespace Logic {
	/**
	 * 实现对角色头顶跟随显示信息的管理与显示
	 */
	export class UIFollowTargetManager extends Laya.Sprite {
		private mVisualNameCollection: ECS.EntitiesSearchCache = null; // 头顶名字列表

		private mPosInScreen: Laya.Vector3 = new Laya.Vector3(); // 屏幕位置

		constructor() {
			super();
			uiMgr.addChild(this, UILayer.RoleTitle);
			this.frameLoop(1, this, () => this.refreshCollection());
		}

		/**
		 * 销毁本对象
		 * @param destroyChild 是否销毁子对象
		 */
		public destroy(destroyChild?: boolean) {
			uiMgr.removeChild(this, UILayer.RoleTitle);
			if (this.mVisualNameCollection) {
				this.mVisualNameCollection.dispose();
				this.mVisualNameCollection = null;
			}
			super.destroy(destroyChild);
		}

		/**
		 * 设置头顶名字列表
		 */
		public set visualNameCollection(value: ECS.EntitiesSearchCache) {
			this.mVisualNameCollection = value;
		}

		/**
		 * 刷新集合中对应的显示
		 */
		private refreshCollection() {
			this.graphics.clear();
			const camera = GameMode.PlayingMode.getMainCamera();
			if (!camera) {
				return;
			}

			// 绘制头顶名称
			if (this.mVisualNameCollection) {
				const aEntities = this.mVisualNameCollection.entities;
				let compVisual: ActorState.VisualName;
				for (const entity of aEntities) {
					compVisual = entity.components.get(ActorState.VisualName);
					this.mPosInScreen.toDefault();
					camera.worldToViewportPoint(compVisual.outWorldPos, this.mPosInScreen);
					if (compVisual.title) {
						this.graphics.fillBorderText(compVisual.title, this.mPosInScreen.x, this.mPosInScreen.y, MyUI.DebugFont, compVisual.color, "#000000", 1, "center");
					}
				}
			}
		}
	}
}