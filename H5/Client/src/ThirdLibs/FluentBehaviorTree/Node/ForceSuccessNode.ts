module FBT {
    /**
     * 总是返回成功
     */
    export class ForceSuccessNode extends ParentBehaviorTreeNodeInterface {
        
        /**
         * child nodes.
         *
         * @type {BehaviorTreeNodeInterface[]}
         */
        private children: BehaviorTreeNodeInterface = null;

        public constructor(name: string) {
            super(name);
        }

        public addChild(child: BehaviorTreeNodeInterface): void {
            Global.Log.Assert(this.children == null);
            this.children = child;
        }

        /**
         * 开始执行此节点逻辑
         * @param rootNode 
         */
        public *executeNode(rootNode: RootNode): IterableIterator<BehaviorTreeStatus> {
            rootNode.curNode = this.children;   // 设置一下当前节点,方便调试用
            yield* this.children.executeNode(rootNode);
            return BehaviorTreeStatus.Success;
        }
    }
}