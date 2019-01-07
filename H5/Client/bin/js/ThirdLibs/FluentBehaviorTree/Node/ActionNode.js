var FBT;
(function (FBT) {
    /**
     * 运行一个行为的行为树的叶子节点的基类
     *
     * @property {string}                                   name - The name of the node
     */
    class ActionBaseNode extends FBT.BehaviorTreeNodeInterface {
        constructor(name) {
            super(name);
            this.name = name;
        }
    }
    FBT.ActionBaseNode = ActionBaseNode;
    /**
     * A behavior tree leaf node for running an action
     *
     * @property {string}                                   name - The name of the node
     * @property {(state: StateData) => BehaviorTreeStatus} fn   - Function to invoke for the action.
     */
    class ActionNode extends ActionBaseNode {
        constructor(name, fn) {
            super(name);
            this.name = name;
            this.fn = fn;
        }
        *executeNode(rootNode) {
            while (true) {
                const result = this.fn(rootNode.stateData);
                if (result !== BehaviorTreeStatus.Running) {
                    return result;
                }
                yield BehaviorTreeStatus.Running; // 等待下一帧执行
            }
        }
    }
    FBT.ActionNode = ActionNode;
    /**
     * 模板类型的行为节点类,方便派生更灵活的行为节点类
     */
    class TActionNode extends ActionBaseNode {
        /**
         *
         * @param name 本节点的名称
         * @param CtorT 指定自定义行为叶子节点的构造函数
         * @param argsT 传递给CtorT的构造函数的参数
         */
        constructor(name, CtorT, ...argsT) {
            super(name);
            this.name = name;
            this.mRawAction = null; // 真正的动作运行实例
            this.mRawAction = new CtorT(...argsT);
        }
        /**
         * 支持异步执行的子节点选择函数
         */
        *executeNode(rootNode) {
            this.mRawAction.enter();
            while (true) {
                const result = this.mRawAction.tick(rootNode.stateData);
                if (result !== BehaviorTreeStatus.Running) {
                    return result;
                }
                yield BehaviorTreeStatus.Running; // 等待下一帧执行
            }
        }
    }
    FBT.TActionNode = TActionNode;
})(FBT || (FBT = {}));
//# sourceMappingURL=ActionNode.js.map