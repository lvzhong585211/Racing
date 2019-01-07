var Logic;
(function (Logic) {
    /**
     * 实现对角色头顶跟随显示信息的管理与显示
     */
    class UIFollowTargetManager extends Laya.Sprite {
        constructor() {
            super();
            this.mVisualNameCollection = null; // 头顶名字列表
            this.mPosInScreen = new Laya.Vector3(); // 屏幕位置
            uiMgr.addChild(this, UILayer.RoleTitle);
            this.frameLoop(1, this, () => this.refreshCollection());
        }
        /**
         * 销毁本对象
         * @param destroyChild 是否销毁子对象
         */
        destroy(destroyChild) {
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
        set visualNameCollection(value) {
            this.mVisualNameCollection = value;
        }
        /**
         * 刷新集合中对应的显示
         */
        refreshCollection() {
            this.graphics.clear();
            const camera = GameMode.PlayingMode.getMainCamera();
            if (!camera) {
                return;
            }
            // 绘制头顶名称
            if (this.mVisualNameCollection) {
                const aEntities = this.mVisualNameCollection.entities;
                let compVisual;
                for (const entity of aEntities) {
                    compVisual = entity.components.get(Logic.ActorState.VisualName);
                    this.mPosInScreen.toDefault();
                    camera.worldToViewportPoint(compVisual.outWorldPos, this.mPosInScreen);
                    if (compVisual.title) {
                        this.graphics.fillBorderText(compVisual.title, this.mPosInScreen.x, this.mPosInScreen.y, MyUI.DebugFont, compVisual.color, "#000000", 1, "center");
                    }
                }
            }
        }
    }
    Logic.UIFollowTargetManager = UIFollowTargetManager;
})(Logic || (Logic = {}));
//# sourceMappingURL=UIFollowTargetManager.js.map