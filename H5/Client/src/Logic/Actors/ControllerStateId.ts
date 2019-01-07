namespace Logic {
    /**
     * 定义角色状态
     */
    export enum EControllerStateId {
        StateNone = -1,				// 无效的状态
        NotBeingControlled,			// 不受控制的状态
        Idling,			            // 空闲状态
        Dead,						// 死亡状态
        KnockDown,					// 被击倒状态
        KnockBacking,				// 被击退状态
        ShowTime,					// 表演状态,一般在被击退后出现
        SkillAttacking,				// 技能攻击状态,这是为了更好的复用代码,把技能的攻击统一成一个状态
        Fleeing,					// 逃跑中状态
        AutoPath,					// 自动寻路
        AutoPathForTask,			// 任务自动寻路
        StateDizzy,					// 眩晕状态
        Frozen,					    // 冰冻状态
        StateMountUp,				// 上坐骑状态
        StateMountDown,				// 下坐骑状态
        ServerRunAction,            // 运行来自服务器的表演动作

        NumStates
    }
}