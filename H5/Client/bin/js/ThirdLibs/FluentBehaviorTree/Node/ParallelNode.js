var FBT;
(function (FBT) {
    /**
     * Runs child's nodes in parallel.
     *
     * @property {string} name              - The name of the node.
     * @property {number} requiredToFail    - Number of child failures required to terminate with failure.
     * @property {number} requiredToSucceed - Number of child successes required to terminate with success.
     * 注: 平行节点只支持行为节点作为子节点,即不允许同时运行多个平行节点.注:这里为了简化起见及提升性能.
     */
    class ParallelNode extends FBT.ParentBehaviorTreeNodeInterface {
        constructor(name, requiredToFail, requiredToSucceed) {
            super(name);
            this.requiredToFail = requiredToFail;
            this.requiredToSucceed = requiredToSucceed;
            /**
             * List of child nodes.
             *
             * @type {BehaviorTreeNodeInterface[]}
             */
            this.children = [];
        }
        *executeNode(rootNode) {
            const childIters = this.children.map((child) => child.executeNode(rootNode));
            const statuses = new Array(childIters.length);
            while (true) {
                // 遍历执行子节点
                for (let index = 0, childCount = childIters.length; index < childCount; ++index) {
                    if (childIters[index] == null) {
                        continue;
                    }
                    const result = childIters[index].next();
                    if (result.done || result.value !== BehaviorTreeStatus.Running) {
                        childIters[index] = null;
                    }
                    statuses[index] = result.value;
                }
                // 计算成功或失败的数量
                let succeeded = 0;
                let failed = 0;
                statuses.forEach(element => {
                    element === BehaviorTreeStatus.Success && succeeded++;
                    element === BehaviorTreeStatus.Failure && failed++;
                });
                // 如果达到目标,则返回
                if (this.requiredToSucceed > 0 && succeeded >= this.requiredToSucceed) {
                    return BehaviorTreeStatus.Success;
                }
                if (this.requiredToFail > 0 && failed >= this.requiredToFail) {
                    return BehaviorTreeStatus.Failure;
                }
                yield BehaviorTreeStatus.Running; // 下一帧继续运行
            }
        }
        addChild(child) {
            Global.Log.Assert(child instanceof FBT.ActionBaseNode); // 平行节点只支持行为节点作为子节点,即不允许同时运行多个平行节点.注:这里为了简化起见及提升性能.
            this.children.push(child);
        }
    }
    FBT.ParallelNode = ParallelNode;
})(FBT || (FBT = {}));
//# sourceMappingURL=ParallelNode.js.map