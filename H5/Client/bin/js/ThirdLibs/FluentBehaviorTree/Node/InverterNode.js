var FBT;
(function (FBT) {
    /**
     * Decorator node that inverts the success/failure of its child.
     *
     * @property {string} name - The name of the node
     */
    class InverterNode extends FBT.ParentBehaviorTreeNodeInterface {
        constructor(name) {
            super(name);
        }
        *executeNode(rootNode) {
            rootNode.curNode = this.children; // 设置一下当前节点,方便调试用
            const result = yield* this.children.executeNode(rootNode);
            if (result === BehaviorTreeStatus.Failure) {
                return BehaviorTreeStatus.Success;
            }
            else if (result === BehaviorTreeStatus.Success) {
                return BehaviorTreeStatus.Failure;
            }
            return result;
        }
        addChild(child) {
            if (!!this.children) {
                throw new FBT.BehaviorTreeError(FBT.Errors.INVERTER_MULTIPLE_CHILDREN);
            }
            this.children = child;
        }
    }
    FBT.InverterNode = InverterNode;
})(FBT || (FBT = {}));
//# sourceMappingURL=InverterNode.js.map