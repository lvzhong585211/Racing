namespace FBT {
    /**
     * Selects the first node that succeeds. Tries successive nodes until it finds one that doesn't fail.
     *
     * @property {string} name - The name of the node.
     */
    export class SelectorNode extends ParentBehaviorTreeNodeInterface {
        /**
         * List of child nodes.
         *
         * @type {BehaviorTreeNodeInterface[]}
         */
        private children: BehaviorTreeNodeInterface[] = [];

        public constructor(name: string) {
            super(name);
        }

        public *executeNode(rootNode: RootNode): IterableIterator<BehaviorTreeStatus>{
            for(let index = 0, count = this.children.length; index < count; ++index){
                rootNode.curNode = this.children[index];    // 设置一下当前节点,方便调试用
                const status = yield* this.children[index].executeNode(rootNode);
                if (status !== BehaviorTreeStatus.Failure) {                    
                    return status;
                }
            }
            return BehaviorTreeStatus.Failure;            
        }

        public addChild(child: BehaviorTreeNodeInterface): void {
            this.children.push(child);
        }
    }
}