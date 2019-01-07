var FBT;
(function (FBT) {
    /**
     * Runs child nodes in sequence, until one fails.
     *
     * @property {string} name - The name of the node.
     */
    class SequenceNode extends FBT.ParentBehaviorTreeNodeInterface {
        constructor(name) {
            super(name);
            /**
             * List of child nodes.
             *
             * @type {BehaviorTreeNodeInterface[]}
             */
            this.children = [];
        }
        addChild(child) {
            this.children.push(child);
        }
        *executeNode(rootNode) {
            for (let index = 0, count = this.children.length; index < count; ++index) {
                rootNode.curNode = this.children[index]; // 设置一下当前节点,方便调试用
                let status = yield* this.children[index].executeNode(rootNode);
                if (status === BehaviorTreeStatus.Failure) { // 有一个节点失败了,返回失败
                    return BehaviorTreeStatus.Failure;
                }
            }
            return BehaviorTreeStatus.Success;
        }
    }
    FBT.SequenceNode = SequenceNode;
})(FBT || (FBT = {}));
//# sourceMappingURL=SequenceNode.js.map