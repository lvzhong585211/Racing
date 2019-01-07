namespace FBT {
    export abstract class BehaviorTreeNodeInterface {
        constructor(public readonly name: string) {
        }

        /**
         * 支持跨帧执行的子节点选择函数
         * @param state 行为树的Tick的状态数据
         * @return 返回 BehaviorTreeStatus
         */
        *executeNode(rootNode: RootNode):IterableIterator<BehaviorTreeStatus>{
            Global.Log.Assert(false);   // ??? 派生类没实现?
        }
    }
}