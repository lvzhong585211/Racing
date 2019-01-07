var FBT;
(function (FBT) {
    /**
     * Selects the first node that succeeds. Tries successive nodes until it finds one that doesn't fail.
     *
     * @property {string} name - The name of the node.
     */
    class SelectorNode extends FBT.ParentBehaviorTreeNodeInterface {
        constructor(name) {
            super(name);
            /**
             * List of child nodes.
             *
             * @type {BehaviorTreeNodeInterface[]}
             */
            this.children = [];
        }
        *executeNode(rootNode) {
            for (let index = 0, count = this.children.length; index < count; ++index) {
                rootNode.curNode = this.children[index]; // 设置一下当前节点,方便调试用
                const status = yield* this.children[index].executeNode(rootNode);
                if (status !== BehaviorTreeStatus.Failure) {
                    return status;
                }
            }
            return BehaviorTreeStatus.Failure;
        }
        addChild(child) {
            this.children.push(child);
        }
    }
    FBT.SelectorNode = SelectorNode;
})(FBT || (FBT = {}));
//# sourceMappingURL=SelectorNode.js.map