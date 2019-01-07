var FBT;
(function (FBT) {
    /**
     * 总是返回成功
     */
    class ForceSuccessNode extends FBT.ParentBehaviorTreeNodeInterface {
        constructor(name) {
            super(name);
            /**
             * child nodes.
             *
             * @type {BehaviorTreeNodeInterface[]}
             */
            this.children = null;
        }
        addChild(child) {
            Global.Log.Assert(this.children == null);
            this.children = child;
        }
        /**
         * 开始执行此节点逻辑
         * @param rootNode
         */
        *executeNode(rootNode) {
            rootNode.curNode = this.children; // 设置一下当前节点,方便调试用
            yield* this.children.executeNode(rootNode);
            return BehaviorTreeStatus.Success;
        }
    }
    FBT.ForceSuccessNode = ForceSuccessNode;
})(FBT || (FBT = {}));
//# sourceMappingURL=ForceSuccessNode.js.map