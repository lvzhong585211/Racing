namespace Logic {
    /**
     * 实现NCP头顶的任务状态的模型显示
     */
    export class TaskDecoration extends Laya.Script {
        protected mTaskDecoSprite: Laya.Sprite3D = null;    // 头顶任务状态的图形
        private mTaskState = NPCTaskStates.NONE;            // 保存当前的状态
        private mUrl = "";
        private static mMapUrl = new Map<NPCTaskStates, string>().
            set(NPCTaskStates.NEWTASK, "KeJieRenWu").
            set(NPCTaskStates.DOINGTASK, "WeiWanChengRenWu").
            set(NPCTaskStates.OKTASK, "KeJiaoRenWu");

        /**
         * 改变任务的状态,刷新模型显示
         * @param taskState 指定要更新到的状态
         */
        public changeState(taskState: NPCTaskStates): void {
            if (this.mTaskState === taskState)
                return;

            const taskDecoSpriteResName: string = TaskDecoration.mMapUrl.get(taskState);
            this.mTaskState = taskState;

            // 移除掉旧的图形显示
            if (this.mTaskDecoSprite) {
                this.mTaskDecoSprite.destroy();
                this.mTaskDecoSprite = null;
            }

            if (!taskDecoSpriteResName) {
                return;
            }

            this.mUrl = Global.getDecorationResPath(taskDecoSpriteResName);
            Laya.loader.create(this.mUrl, new Laya.Handler(this, this.CompleteHandler));
        }

        private CompleteHandler() {
            this.mTaskDecoSprite = Laya.loader.getRes(this.mUrl);
            this.owner.addChild(this.mTaskDecoSprite);

            this.mTaskDecoSprite.transform.localPosition.y += SystemConfig.npcHeadEffectOffset;
        }

        /**
         * @private
         * 销毁组件。
         */
        _destroy(): void {
            if (this.mTaskDecoSprite) {
                this.mTaskDecoSprite.destroy();
                this.mTaskDecoSprite = null;
            }
            super._destroy();
        }
    }
}