var FBT;
(function (FBT) {
    /**
     * 根节点,下面只可以挂一个子节点.主要是为了提升执行节点性能用.
     *
     * @property {string} name - The name of the node.
     */
    class RootNode extends FBT.ParentBehaviorTreeNodeInterface {
        constructor(name = "Root") {
            super(name);
            /**
             * child node.
             *
             * @type {BehaviorTreeNodeInterface}
             */
            this.children = null;
            /**
             * 保存当前正在执行的节点.注:只可能是行为节点或平行节点
             */
            this.curNode = null;
            this.resultStatus = BehaviorTreeStatus.Running;
            this.mRuningIter = null; // 当前的运行迭代
            this.mStateData = null; // 保存当前的Tick状态数据,以便子节点访问
        }
        get stateData() {
            return this.mStateData;
        }
        getChildren() {
            return this.children;
        }
        /**
         * 外部每帧调用
         * @param state 传递行为树运行相关的数据
         */
        tick(state) {
            if (!this.mRuningIter) {
                this.mRuningIter = this.executeNode(this); // 开始运行行为树的各个节点.
            }
            this.mStateData = state; // 保存本帧的状态数据,以供子节点访问
            // 一直运行下一个节点,直到返回 BehaviorTreeStatus.Running
            let nodeTickResult = BehaviorTreeStatus.Running;
            while (true) {
                const iterResult = this.mRuningIter.next(nodeTickResult);
                nodeTickResult = iterResult.value; // 保存一下节点的运行状态
                if (iterResult.done) {
                    // 一次运行结束,清理,准备再次运行
                    this.mRuningIter = null;
                    this.curNode = null;
                    return nodeTickResult;
                }
                if (iterResult.value === BehaviorTreeStatus.Running) {
                    return BehaviorTreeStatus.Running; // 等待下一帧再次运行
                }
            }
        }
        /**
         * 重置行为树的执行
         */
        reset() {
            this.mRuningIter = null;
            this.curNode = null;
        }
        /**
         * 添加子节点
         * @param child 指定要添加的子节点
         * @inner 内部用
         */
        addChild(child) {
            console.assert(this.children == null); // 有且只可以有一个子节点
            this.children = child;
        }
        /**
         * 使用 Generator 控制节点的执行
         * @param rootNode 行为树根节点
         * @inner 内部用
         */
        *executeNode(rootNode) {
            rootNode.curNode = this.children; // 设置一下当前节点,方便调试用
            yield* this.children.executeNode(rootNode);
        }
    }
    FBT.RootNode = RootNode;
})(FBT || (FBT = {}));
//# sourceMappingURL=RootNode.js.map