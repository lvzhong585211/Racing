namespace Logic {
    /**
     * 实现功能NPC,如商店npc,任务npc等
     */
    export class NPC extends CharacterEx<NPCState> {

        /**         
         * @param npcState 指定初始化使用的npc状态.注:这里是引用,即外面修改 npcState 的数值时会修改本玩家的状态值.外面不应该再使用此变量!
         */
        public constructor(npcState: NPCState) {
            super(EActorType.NPC, npcState);
        }

        /**
         * 加载NPC实例,并显示到场景中
         * @param progress 用于接收加载进度
         * 注: NPC在没加载完成前是不会显示的,但并不影响对NPC的操作,包括换装等操作.
         */
        public async load(progress?: Laya.Handler): Promise<boolean> {
            // 注意: 不要把纯逻辑(不需要加载资源的逻辑)放在等待的代码之后.理论上只有图形需要等待加载
            const npcInfo = TableUtils.getNPCVOByID(this.mState.npcID);
            const sklResUrl = Global.getNPCActorPath(npcInfo.ResName);

            return super._load(sklResUrl, progress);
        }

        /**
         * 获取扩展Id,不同的类型对应不同的值,一般来讲应该存储了NPC或怪物的数据表ID
         */
        public getExtensionID(): number {
            return this.mState.npcID;
        }

        /**
         * 是否是雕像台子
         */
        public isStatueStand() {
            const nExtId = this.getExtensionID();
            return nExtId === 140 || nExtId === 141 || nExtId === 142;
        }

        /**
         * 更新任务的状态
         * @param taskState 指定要更新的任务
         */
        public updateTaskState(taskState: NPCTaskStates): void {

            if (taskState === NPCTaskStates.NONE
                || taskState === undefined) {  // 不需要显示了,直接移除吧
                this.mView.removeComponentByType(TaskDecoration);
                return;
            }

            // 获取任务图标组件
            let taskDeco = this.mView.getComponentByType(TaskDecoration) as TaskDecoration;
            if (!taskDeco) {
                taskDeco = this.mView.addComponent(TaskDecoration) as TaskDecoration;
            }
            taskDeco.changeState(taskState);
        }

        /**
         * 释放占用的资源
         */
        public destroy(): void {

            super.destroy();
        }
    }
}