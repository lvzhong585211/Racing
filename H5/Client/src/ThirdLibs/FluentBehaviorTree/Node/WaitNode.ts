namespace FBT {
    /**
     * 等待指定的时间(秒). 返回 Success
     */
    export class WaitNode extends ActionBaseNode {
        /**
         * @param name 本节点的名称
         * @param waitTime 等待的时间(秒)
         */
        public constructor(name: string, public readonly waitTime:number) {
            super(name);
        }

        private mTime :number = 0;

        public tick(state: StateData): BehaviorTreeStatus {
            this.mTime -= state.deltaTime;
            if (this.mTime <= 0) {
                return BehaviorTreeStatus.Success;
            }
            return BehaviorTreeStatus.Running;
        }
        
        public *executeNode(rootNode: RootNode): IterableIterator<BehaviorTreeStatus> {
            this.mTime = this.waitTime;
            while (true) {
                const result = this.tick(rootNode.stateData);
                if (result !== BehaviorTreeStatus.Running) {
                    return result;
                }
                yield BehaviorTreeStatus.Running;   // 等待下一帧执行
            }
        }
    }
}