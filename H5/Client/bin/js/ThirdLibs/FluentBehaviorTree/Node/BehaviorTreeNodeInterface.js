var FBT;
(function (FBT) {
    class BehaviorTreeNodeInterface {
        constructor(name) {
            this.name = name;
        }
        /**
         * 支持跨帧执行的子节点选择函数
         * @param state 行为树的Tick的状态数据
         * @return 返回 BehaviorTreeStatus
         */
        *executeNode(rootNode) {
            Global.Log.Assert(false); // ??? 派生类没实现?
        }
    }
    FBT.BehaviorTreeNodeInterface = BehaviorTreeNodeInterface;
})(FBT || (FBT = {}));
//# sourceMappingURL=BehaviorTreeNodeInterface.js.map