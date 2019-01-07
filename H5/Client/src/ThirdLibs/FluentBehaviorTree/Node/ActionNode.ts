namespace FBT {
    /**
     * 运行一个行为的行为树的叶子节点的基类
     *
     * @property {string}                                   name - The name of the node
     */
    export abstract class ActionBaseNode extends BehaviorTreeNodeInterface {
        public constructor(public readonly name: string) {
            super(name);
        }
    }

    /**
     * A behavior tree leaf node for running an action
     *
     * @property {string}                                   name - The name of the node
     * @property {(state: StateData) => BehaviorTreeStatus} fn   - Function to invoke for the action.
     */
    export class ActionNode extends ActionBaseNode {
        public constructor(public name: string, public readonly fn: (state: StateData) => BehaviorTreeStatus) {
            super(name);
        }

        public *executeNode(rootNode: RootNode): IterableIterator<BehaviorTreeStatus>{
            while (true) {
                const result = this.fn(rootNode.stateData);
                if (result !== BehaviorTreeStatus.Running) {
                    return result;
                }
                yield BehaviorTreeStatus.Running;   // 等待下一帧执行
            }
        }
    }

    /**
     * 定义自定义派生的行为节点类的接口
     */
    export interface IActionNode {
        /**
         * 节点进入的函数
         * @returns {} 
         */
        enter():void;
        
        /**
         * 节点执行状态时,每帧调用的函数
         * @param state 行为树的状态数据
         * @returns 返回BehaviorTreeStatus.Success或BehaviorTreeStatus.Failure中止运行,返回BehaviorTreeStatus.Running继续运行
         */
        tick(state: StateData): BehaviorTreeStatus;
    }

    /**
     * 模板类型的行为节点类,方便派生更灵活的行为节点类
     */
    export class TActionNode<T extends IActionNode> extends ActionBaseNode {
        private mRawAction : T = null;  // 真正的动作运行实例

        /**
         * 
         * @param name 本节点的名称
         * @param CtorT 指定自定义行为叶子节点的构造函数
         * @param argsT 传递给CtorT的构造函数的参数
         */
        public constructor(public name: string, CtorT: { new(...args): T; }, ...argsT) {
            super(name);
            this.mRawAction = new CtorT(...argsT);
        }

        /**
         * 支持异步执行的子节点选择函数
         */
        public *executeNode(rootNode: RootNode): IterableIterator<BehaviorTreeStatus> {
            this.mRawAction.enter();
            while (true) {
                const result = this.mRawAction.tick(rootNode.stateData);
                if (result !== BehaviorTreeStatus.Running) {
                    return result;
                }
                yield BehaviorTreeStatus.Running;   // 等待下一帧执行
            }
        }
    }
}