var FBT;
(function (FBT) {
    /**
     * 等待指定的时间(秒). 返回 Success
     */
    class WaitNode extends FBT.ActionBaseNode {
        /**
         * @param name 本节点的名称
         * @param waitTime 等待的时间(秒)
         */
        constructor(name, waitTime) {
            super(name);
            this.waitTime = waitTime;
            this.mTime = 0;
        }
        tick(state) {
            this.mTime -= state.deltaTime;
            if (this.mTime <= 0) {
                return BehaviorTreeStatus.Success;
            }
            return BehaviorTreeStatus.Running;
        }
        *executeNode(rootNode) {
            this.mTime = this.waitTime;
            while (true) {
                const result = this.tick(rootNode.stateData);
                if (result !== BehaviorTreeStatus.Running) {
                    return result;
                }
                yield BehaviorTreeStatus.Running; // 等待下一帧执行
            }
        }
    }
    FBT.WaitNode = WaitNode;
})(FBT || (FBT = {}));
//# sourceMappingURL=WaitNode.js.map