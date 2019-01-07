namespace Logic {
	/**
	 * 管理用户的操作输入
	 */
	export class LevelInput {
		private mMouseClickPoint: Laya.Vector2 = new Laya.Vector2(0, 0); // 鼠标点击屏幕位置
		private mCollisionRay: Laya.Ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0)); // 发出的碰撞射线

		constructor() {
			this.initializeInput();
		}

		public destroy() {
			uiMgr.interactionLayer.off(Laya.Event.CLICK, this, this._onCollisionDetection);
		}

		private initializeInput() {
			// 场景中的模型碰撞检测处理
			uiMgr.interactionLayer.on(Laya.Event.CLICK, this, this._onCollisionDetection);
		}

		/**
         * 场景中的模型碰撞检测
         * @param e 
         */
		private _onCollisionDetection(e: Laya.Event) {
			const tCamera = GameMode.PlayingMode.getMainCamera();
			if (!tCamera) return;
			this.mMouseClickPoint.x = Laya.MouseManager.instance.mouseX;
			this.mMouseClickPoint.y = Laya.MouseManager.instance.mouseY;
			tCamera.viewportPointToRay(this.mMouseClickPoint, this.mCollisionRay);
			const outHitInfo = new Laya.RaycastHit();
			Laya.Physics.rayCast(this.mCollisionRay, outHitInfo);
			if (outHitInfo.sprite3D) {
				const nRoleID: number = parseInt(outHitInfo.sprite3D.name);
				if (!isNaN(nRoleID)) {
					GameMode.getMainLevel().onActorInLevelClick(nRoleID);
				}
			}
		}
	}
}