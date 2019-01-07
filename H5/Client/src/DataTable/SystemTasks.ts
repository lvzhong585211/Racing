namespace tables {

    //  触发系统喊话信息
    export interface SystemTalkTiggerInfo {
        TriggerType: number;
        SystemTalkID: number;
    }

    //  触发系统动画信息
    export interface SystemAnimTriggerInfo {
        TriggerType: number;
        TriggerNpcOrMonsterID: number;
        SystemAnimID: number;
    }

    /** 任务表项 */
    export interface TaskVo {
        ID: number;                         // 任务id
        TaskClass: number;                  // 任务类型
        Title: string;                      // 任务标题
        GuideText: string;                  // 任务描述 TaskZhangJie.xlsm
        Description: string;
        Description2: string;
        PrevTask: number;                   // 前置任务
        NextTask: number;                   // 后置任务
        MinZhuanSheng: number;              // 最小转生等级
        MinLevel: number;                   // 最新等级
        MaxLevel: number;                   // 最大等级
        MaxRedoing: number;                 // 环数          
        Taketime: number;                   // 任务的时限
        LimitDragonTotem: number;   // 限制图腾
        LimitZhuanSheng: number;            // 限制转生等级
        LimitLevel: number;                 // 限制等级
        AcceptTalk: string;                 // 接任务时NPC的对话
        DoingTalk: string;                  // 做任务时NPC的对话
        CompleteTalk: string;               // 交任务时NPC的对话
        SourceNPC: number;                  // 接任务NPCid
        DestNPC: number;                    // 交任务NPCid
        TargetType1: number;                // 任务具体执行内容类型
        TargetNPC1: number;                 // ？？
        PropsName1: string;                 // 任务属性名字
        TargetNum1: number;                 // 目标个数
        TargetMapCode1: number;             // 地图id
        TargetPos1: string;                 // 目标位置
        TargetType2: number;                // 目标类型，对应任务具体执行内容类型
        TargetNPC2: number;
        PropsName2: string;                 // 任务属性2名字
        TargetNum2: number;                 // 任务属性2目标个数
        TargetMapCode2: number;             // 地图id
        TargetPos2: string;                 // 任务属性2目标位置    
        PubStartTime: string;               // 向NPC领取活动礼物的开始时间
        PubEndTime: string;                 // 向NPC领取活动礼物的结束时间
        Teleports: number;                  // 任务传送点id
        YuanBaoComplete: number;            // 任务可以用钻石完成的次数

        // 关联属性
        TaskZhangJieID: number;             // 所属章节ID
        TaskIndexOfZhangJie: number;        // 本章内第几个任务

        CompleteTalkSoundEvent: string;     // 完成任务时，与NPC对话音效事件
        StrSystemTalkTrigger: string;
        SystemTalkTriggerList: SystemTalkTiggerInfo[];

        StrSystemAnimTrigger: string;		// 表未配置内容
        SystemAnimTriggerList: SystemAnimTriggerInfo[]; // 表未配置内容
        NextGuideTask: number;              // 后置引导任务
    }

	/**
	 * 任务表
	 */
    export class SystemTasksTable extends tables.DataTable<TaskVo, number> {
        constructor() {
            super("SystemTasks", "ID", 1);
        }

		/**
		 * 通过任务id获得对应的任务数据
		 * @param taskId 指定要获取任务数据的任务ID
		 */
        public getTaskVo(taskId: number): TaskVo {
            return super.Find(taskId);
        }

		/**
		 * 通过任务ID获取任务title
		 * @param goodsID 任务ID
		 */
        public getTaskTitle(taskId: number): string {
            const vo = super.Find(taskId);
            if (vo) return vo.Title;
            return "";
        }

		/**
		 * 通过任务ID获取任务类型(任务类型为能返回0，0是代表主线类型)
		 * @param goodsID 指定要获取资源名称的物品ID
		 */
        public getTaskClassById(taskId: number): number {
            const vo = super.Find(taskId);
            if (vo) return TableUtils.getFieldNumber(vo.TaskClass);
            return -1;
        }

        /**通过当前任务获得下一个任务ID */
        public getNextTaskId(taskId: number): number {
            const vo = super.Find(taskId);
            if (vo) return vo.NextTask;
            return -1;
        }

		/**
		 * 查找一个给定类型的任务
		 * @param taskClass 指定要获取的任务的类型
		 */
        public getTaskByClass(taskClass: TaskClasses): TaskVo {
            const lsNodes = tableMgr.tasksTable.AllRows();
            for (const taskVo of lsNodes) {
                if (TableUtils.getFieldNumber(taskVo.TaskClass) === taskClass)
                    return taskVo;
            }

            return null;
        }
    }

}