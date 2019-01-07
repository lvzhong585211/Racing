namespace FBT {
    /**
     * Decorator node that inverts the success/failure of its child.
     *
     * @property {string} name - The name of the node
     */
    export class InverterNode extends ParentBehaviorTreeNodeInterface {
        /**
         * The child to be inverted
         */
        private children?: BehaviorTreeNodeInterface;

        public constructor(name: string) {
            super(name);
        }
      
        public *executeNode(rootNode:RootNode):IterableIterator<BehaviorTreeStatus>{
            rootNode.curNode = this.children;   // 设置一下当前节点,方便调试用
            const result = yield* this.children.executeNode(rootNode);
            if (result === BehaviorTreeStatus.Failure) {
                return BehaviorTreeStatus.Success;
            } else if (result === BehaviorTreeStatus.Success) {
                return BehaviorTreeStatus.Failure;
            }

            return result;
        }

        public addChild(child: BehaviorTreeNodeInterface): void {
            if (!!this.children) {
                throw new BehaviorTreeError(Errors.INVERTER_MULTIPLE_CHILDREN);
            }

            this.children = child;
        }
    }
}