var Logic;
(function (Logic) {
    /**
     * 管理用户的操作输入
     */
    class LevelInput {
        constructor() {
            this.mMouseClickPoint = new Laya.Vector2(0, 0); // 鼠标点击屏幕位置
            this.mCollisionRay = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0)); // 发出的碰撞射线
            this.initializeInput();
        }
        destroy() {
            Laya.stage.off(Laya.Event.CLICK, this, this._onCollisionDetection);
        }
        initializeInput() {
            // 场景中的模型碰撞检测处理
            Laya.stage.on(Laya.Event.CLICK, this, this._onCollisionDetection);
        }
        /**
         * 场景中的模型碰撞检测
         * @param e
         */
        _onCollisionDetection(e) {
            const tCamera = GameMode.PlayingMode.getMainCamera();
            if (!tCamera)
                return;
            this.mMouseClickPoint.x = Laya.MouseManager.instance.mouseX;
            this.mMouseClickPoint.y = Laya.MouseManager.instance.mouseY;
            tCamera.viewportPointToRay(this.mMouseClickPoint, this.mCollisionRay);
            const outHitInfo = new Laya.RaycastHit();
            Laya.Physics.rayCast(this.mCollisionRay, outHitInfo);
            if (outHitInfo.sprite3D) {
                const nRoleID = parseInt(outHitInfo.sprite3D.name);
                if (!isNaN(nRoleID)) {
                    GameMode.getLocalPlayerController().setFocusedRoleId(nRoleID); // 设置玩家手动选择的目标
                }
            }
        }
    }
    Logic.LevelInput = LevelInput;
})(Logic || (Logic = {}));
//# sourceMappingURL=LevelInput.js.map