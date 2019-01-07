module FBT {

	/**
	 * The Cooldown node will lock the execution of a node or branch until the cooldown time expires.
	 */
	export class CooldownNode extends ParentBehaviorTreeNodeInterface {
		private mPreTimeToExe = 0;			// 上次执行的时间（豪秒）
		private readonly mPeriod: number;	// 执行周期（豪秒）

        /**
         * child nodes.
         *
         * @type {BehaviorTreeNodeInterface[]}
         */
		private children: BehaviorTreeNodeInterface = null;

        /**
         * @param name 节点的名称
         * @param period 冷却时间(秒)
         */
        public constructor(name: string, period: number) {
            super(name);
            this.mPeriod = period*1000;
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
			const now = TimeManager.getCorrectLocalTime();
            if (now - this.mPreTimeToExe < this.mPeriod) {
                // 时间还没到返回 Fail
                return BehaviorTreeStatus.Failure;
            }
		    this.mPreTimeToExe = now;   // 记录本次执行时的时间点
			rootNode.curNode = this.children;   // 设置一下当前节点,方便调试用
			yield* this.children.executeNode(rootNode);
		}
	}
}