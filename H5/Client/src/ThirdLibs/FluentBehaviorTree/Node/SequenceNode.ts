namespace FBT {
    /**
     * Runs child nodes in sequence, until one fails.
     *
     * @property {string} name - The name of the node.
     */
    export class SequenceNode extends ParentBehaviorTreeNodeInterface {
        /**
         * List of child nodes.
         *
         * @type {BehaviorTreeNodeInterface[]}
         */
        private children: BehaviorTreeNodeInterface[] = [];

        public constructor(name: string) {
            super(name);
        }

        public addChild(child: BehaviorTreeNodeInterface): void {
            this.children.push(child);
        }

        *executeNode(rootNode: RootNode): IterableIterator<BehaviorTreeStatus>{
            for(let index = 0, count = this.children.length; index < count;++index){
                rootNode.curNode = this.children[index];    // 设置一下当前节点,方便调试用
                let status = yield* this.children[index].executeNode(rootNode);
                if (status === BehaviorTreeStatus.Failure)
                {   // 有一个节点失败了,返回失败
                    return BehaviorTreeStatus.Failure;
                }
            }

            return BehaviorTreeStatus.Success;
        }
    }
}