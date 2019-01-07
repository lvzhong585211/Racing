var FBT;
(function (FBT) {
    /**
     * The Cooldown node will lock the execution of a node or branch until the cooldown time expires.
     */
    class CooldownNode extends FBT.ParentBehaviorTreeNodeInterface {
        /**
         * @param name 节点的名称
         * @param period 冷却时间(秒)
         */
        constructor(name, period) {
            super(name);
            this.mPreTimeToExe = 0; // 上次执行的时间（豪秒）
            /**
             * child nodes.
             *
             * @type {BehaviorTreeNodeInterface[]}
             */
            this.children = null;
            this.mPeriod = period * 1000;
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
            const now = TimeManager.getCorrectLocalTime();
            if (now - this.mPreTimeToExe < this.mPeriod) {
                // 时间还没到返回 Fail
                return BehaviorTreeStatus.Failure;
            }
            this.mPreTimeToExe = now; // 记录本次执行时的时间点
            rootNode.curNode = this.children; // 设置一下当前节点,方便调试用
            yield* this.children.executeNode(rootNode);
        }
    }
    FBT.CooldownNode = CooldownNode;
})(FBT || (FBT = {}));
//# sourceMappingURL=CooldownNode.js.map