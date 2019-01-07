namespace FBT {
    import Errors = FBT.Errors;

    /**
     * 注: 添加多个行为树节点要注意节点的引用,以免误把同一个节点添加到多棵树中!!!
     * 注: 行为树支持嵌套
     * /
    // 用法示例:
    //  $rootNode(
    //      $sequence("All",
    //          $do("isOwnerNoDeath", AutoFightComponent.isOwnerNoDeath),               /**判断目标是否死亡 */
    //          $do("hasSkilling", AutoFightComponent.hasSkilling),                     /**确认是否正在释放某些技能或者现在处于硬直状态 */
    //          $do("findMonsterOfClosedMe", AutoFightComponent.findMonsterOfClosedMe), /**查找并锁定怪物 */
    //          $do("randomSkillId", (state) => this.randomSkillId(state)),             /** 随机一个技能准备释放 */
    //          $selector("do selector",
    //              $do("decideSkillDistanceIsExceed",
    //                  (state) => this.decideSkillDistanceIsExceed(state)),    /** 判断释放的技能是否能达到目标点*/
    //              $do("findRoadToPoint", AutoFightComponent.findRoadToPoint), /**自动寻路到某一点 */
    //              $parallel("Loop decide condition", 1, 2, /**需要如果死亡 、没有死亡且到达目标点则需要返回主节点 */
    //                  $do("isDeadHeat", AutoFightComponent.isDeadHeat),                       /**判断是否达到了目标点 */
    //                  $do("updateTargetPoint", AutoFightComponent.updateFindRoadTargetPoint), /**更新目标位置是否改变 */
    //                  $do("isTargetNoDeath", AutoFightComponent.isTargetNoDeath)              /**判断主角是否死亡 */
    //              )
    //          ),
    //          $do("skillAttack", AutoFightComponent.playerFireSkillToMonster) /**开始释放技能攻击目标 */
    //      )
    //  );

    /**
     * 构造一棵行为树,返回根节点
     * @param firstChild 指定子节点.注: 节点必须是一个组合节点(如sequence或selector等).单纯的行为节点没有任务实际意义
     */
    export function $rootNode(firstChild: ParentBehaviorTreeNodeInterface, name:string = "Root"): RootNode {
        const rootNode = new RootNode(name);
        rootNode.addChild(firstChild);
        return rootNode;
    }

    /**
     * 添加子节点到指定的父节点
     * @param parentNode 指定父节点
     * @param firstChild 第一个子节点
     * @param childNodes 指定要添加的子节点
     */
    function addChildNodes(parentNode: ParentBehaviorTreeNodeInterface, firstChild: BehaviorTreeNodeInterface, ...childNodes: BehaviorTreeNodeInterface[]): ParentBehaviorTreeNodeInterface {
        parentNode.addChild(firstChild);
        for (const child of childNodes) {
            parentNode.addChild(child);
        }
        return parentNode;
    }

    /**
     * 构造一个Sequence节点
     * @param name 本节点名称
     * @param firstChild 第一个子节点
     * @param childNodes 其它的子节点
     * Sequence Nodes execute their children from left to right, and will stop executing its children when one of their children fails. 
     * If a child fails, then the Sequence fails. If all the Sequence's children succeed, then the Sequence succeeds.     
     * 注: 类似 And 条件, child1 && child2 && child3
     */
    export function $sequence(name: string, firstChild: BehaviorTreeNodeInterface, ...childNodes: BehaviorTreeNodeInterface[]): SequenceNode {
        const node = new SequenceNode(name);        
        addChildNodes(node, firstChild, ...childNodes);
        return node;
    }

    /**
     * 构造一个Selector节点
     * @param name 本节点名称
     * @param firstChild 第一个子节点
     * @param childNodes 所有的子节点
     * Selector Nodes execute their children from left to right, and will stop executing its children when one of their children succeeds. 
     * If a Selector's child succeeds, the Selector succeeds. If all the Selector's children fail, the Selector fails
     * 注: 类似 Or 条件, child1 || child2 || child3
     */
    export function $selector(name: string, firstChild: BehaviorTreeNodeInterface, ...childNodes: BehaviorTreeNodeInterface[]): SelectorNode {
        const node = new SelectorNode(name);         
        addChildNodes(node, firstChild, ...childNodes);
        return node;
    }

    /**
     * 构造一个 Parallel 节点
     * @param name 本节点的名称
     * @param requiredToFail 返回BehaviorTreeStatus.Failure子节点的数量达到这个值,则返回BehaviorTreeStatus.Failure
     * @param requiredToSucceed 返回BehaviorTreeStatus.Success子节点的数量达到这个值,则返回BehaviorTreeStatus.Success
     * @param firstChild 第一个子节点
     * @param childNodes 所有的子节点
     * 注: 同时运行所有的子节点,直到子节点返回值数量达到requiredToFail或requiredToSucceed
     * 注: 子节点只可以是 ActionNode
     */
    export function $parallel(name: string, requiredToFail: number, requiredToSucceed: number, firstChild: ActionBaseNode, ...childNodes: ActionBaseNode[]): ParallelNode {
        const node = new ParallelNode(name, requiredToFail, requiredToSucceed);
        addChildNodes(node, firstChild, ...childNodes);
        return node;
    }

    /**
     * 添加一个行为叶子节点
     * @param name 本节点名称
     * @param fnRun 指定行为节点的Run函数
     */
    export function $do(name: string, fnRun: (state: StateData) => BehaviorTreeStatus): ActionNode {
        const actionNode = new ActionNode(name, fnRun);
        return actionNode;
    }

    /**
     * 添加一个返回true或false的条件行为节点
     * @param name 本节点名称
     * @param fnRun 指定行为节点的Run函数
     * 注: 当返回true时,为 BehaviorTreeStatus.Success,否则为 BehaviorTreeStatus.Failure
     */
    export function $condition(name:string, fnRun: (state: StateData) => boolean): BehaviorTreeNodeInterface {        
        return $do(name,  (t) => fnRun(t) ? BehaviorTreeStatus.Success : BehaviorTreeStatus.Failure);
    }

    /**
     * 添加一个自定义的行为叶子节点
     * @param name 本节点的名称
     * @param CtorT 指定自定义行为叶子节点的构造函数
     * @param argsT 传递给CtorT的构造函数的参数
     */
    export function $doT<T extends IActionNode>(name: string, CtorT: { new(...args): T; }, ...argsT): TActionNode<T> {
        const actionNode = new TActionNode<T>(name, CtorT, ...argsT);
        return actionNode;
    }

    /**
     * 添加一个反转子节点结果的节点,即如果子节点返回 BehaviorTreeStatus.Success,则返回 BehaviorTreeStatus.Failure, 反之返回 BehaviorTreeStatus.Success
     * @param name 本节点名称
     * @param child 指定要添加的子节点
     */
    export function $inverter(name:string, child:BehaviorTreeNodeInterface):InverterNode{
        const node = new InverterNode(name);
        node.addChild(child);
        return node;
    }

    /**
     * 添加一个循环节点
     * @param name 指定本节点的名称
     * @param numLoop 循环次数,<=0表示无限循环
     * @param breakConditional 中断条件,如果指定了,则等待子节点返回 BehaviorTreeStatus.Success 或 BehaviorTreeStatus.Failure
     * @param child 指定要添加的子节点
     * Loops the node or branch a number of times, or infinitely.
     * 如果需要等待中断条件,且在循环中止前等到了中断条件,则返回 BehaviorTreeStatus.Success 否则返回 BehaviorTreeStatus.Failure
     * 如果没有需要等待的中断条件,则返回 BehaviorTreeStatus.Success
     */
    export function $loop(name: string, numLoop: number, child: BehaviorTreeNodeInterface, breakConditional?: BehaviorTreeStatus.Success | BehaviorTreeStatus.Failure): LoopNode {
        const node = new LoopNode(name,numLoop, breakConditional);
        node.addChild(child);
        return node;
    }

    /**
     * 添加一个总是返回成功的节点
     * @param name 本节点的名称
     * @param child 指定要添加的子节点
     */
    export function $forceSuccessNode(name: string, child: BehaviorTreeNodeInterface):ForceSuccessNode {
        const node = new ForceSuccessNode(name);
        node.addChild(child);
        return node;
    }

    /**
     *  Decorator node that inverts the success/failure of its child.
     * @param name 本节点的名称
     * @param child 指定要添加的子节点
     */
    export function $inverterNode(name: string, child: BehaviorTreeNodeInterface): InverterNode {
        const node = new InverterNode(name);
        node.addChild(child);
        return node;
    }

    /**
     *  The Cooldown node will lock the execution of a node or branch until the cooldown time expires.
     * @param name 本节点的名称
     * @param period 冷却时间(秒)
     * @param child 子节点
     */
    export function $cooldownNode(name: string, period: number, child: BehaviorTreeNodeInterface): CooldownNode {
        const node = new CooldownNode(name, period);
        node.addChild(child);
        return node;
    }

    /**
     * 等待给定的时间. 返回 Success
     * @param name 本节点的名称
     * @param waitTime 指定要等待的时间(秒)
     */
    export function $waitTime(name: string, waitTime:number):WaitNode {
        const node = new WaitNode(name, waitTime);
        return node;
    }

}