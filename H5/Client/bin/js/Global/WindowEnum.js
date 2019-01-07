/**
 * 存放功能窗口相关的一些枚举
 */
/** 窗口子界面的基础ID */
const WINDOW_PART_BASE_ID = 1000;
/**
 * 窗口ID枚举
 * 注意：枚举ID唯一，除了页签类的ID，新的界面ID只能加在最后面，并赋予一个确定的值
 */
var WindowID;
(function (WindowID) {
    /** 无效窗口 */
    WindowID[WindowID["Invalid"] = 0] = "Invalid";
    /** 人物窗口（包含人物属性、背包、技能、翅膀、星曜） */
    WindowID[WindowID["Role"] = 1] = "Role";
    /** 背包窗口（如果是同一个窗口则使用相同的窗口乘以WINDOW_PART_BASE_ID的方式） */
    WindowID[WindowID["Parcel"] = WindowID.Role * WINDOW_PART_BASE_ID + 0] = "Parcel";
    /** 技能页签 */
    WindowID[WindowID["Skill"] = WindowID.Role * WINDOW_PART_BASE_ID + 1] = "Skill";
    /** 翅膀页签 */
    WindowID[WindowID["Wing"] = WindowID.Role * WINDOW_PART_BASE_ID + 2] = "Wing";
    /** 星曜页签 */
    WindowID[WindowID["XingYao"] = WindowID.Role * WINDOW_PART_BASE_ID + 3] = "XingYao";
    /** 人物窗口枚举结束 */
    WindowID[WindowID["End_Role"] = 1] = "End_Role";
    /** 物品类道具Tip */
    WindowID[WindowID["GoodsTip"] = 2] = "GoodsTip";
    /** 装备类道具Tip */
    WindowID[WindowID["EquipTip"] = 3] = "EquipTip";
    /** NPC任务对话界面 */
    WindowID[WindowID["NpcDoingTask"] = 4] = "NpcDoingTask";
    /** 装备打造窗口 */
    WindowID[WindowID["Forge"] = 5] = "Forge";
    /** 合成页签 */
    WindowID[WindowID["Synthesis"] = WindowID.Forge * WINDOW_PART_BASE_ID + 0] = "Synthesis";
    /** 装备打造窗口枚举结束 */
    WindowID[WindowID["End_Forge"] = 5] = "End_Forge";
    /**包含击中界面 */
    WindowID[WindowID["HudtextUI"] = 6] = "HudtextUI";
    /**提示框 （确认、取消/确认） */
    WindowID[WindowID["PromptBox"] = 7] = "PromptBox";
    /**活动界面，包含冒险、战场、每日活跃界面 */
    WindowID[WindowID["MaoXian"] = 8] = "MaoXian";
    /** 战场页签 */
    WindowID[WindowID["ZhanChang"] = WindowID.MaoXian * WINDOW_PART_BASE_ID + 0] = "ZhanChang";
    /** 每日活跃页签 */
    WindowID[WindowID["MeiRiHuoYue"] = WindowID.MaoXian * WINDOW_PART_BASE_ID + 1] = "MeiRiHuoYue";
    /** 活动界面枚举结束 */
    WindowID[WindowID["End_MaoXian"] = 8] = "End_MaoXian";
    /** 地图窗口 */
    WindowID[WindowID["Map"] = 9] = "Map";
    /** 功能开启提示界面 */
    WindowID[WindowID["FunOpenTiShiPart"] = 10] = "FunOpenTiShiPart";
    /** 功能开启飞图标界面 */
    WindowID[WindowID["SystemOpenFlyPart"] = 11] = "SystemOpenFlyPart";
    /** 福利窗口（包括七日登录、每日福利、每日礼包、充值福利等） */
    WindowID[WindowID["Welfare"] = 12] = "Welfare";
    /** 七日登录 */
    WindowID[WindowID["SevenLogin"] = WindowID.Welfare * WINDOW_PART_BASE_ID + 0] = "SevenLogin";
    /** 每日福利 */
    WindowID[WindowID["DailyWelfare"] = WindowID.Welfare * WINDOW_PART_BASE_ID + 1] = "DailyWelfare";
    /** 在线奖励（三级页签的定义方式，二级页签的值乘以WINDOW_PART_BASE_ID，加号后的值不需要改变） */
    WindowID[WindowID["OnlineReward"] = WindowID.DailyWelfare * WINDOW_PART_BASE_ID + 2] = "OnlineReward";
    /** 等级奖励（三级页签）*/
    WindowID[WindowID["GradeReward"] = WindowID.DailyWelfare * WINDOW_PART_BASE_ID + 3] = "GradeReward";
    /** 潜心修炼（三级页签） */
    WindowID[WindowID["MeditationReward"] = WindowID.DailyWelfare * WINDOW_PART_BASE_ID + 4] = "MeditationReward";
    /** 福利窗口枚举结束 */
    WindowID[WindowID["End_Welfare"] = 12] = "End_Welfare";
    /** 坐骑界面 */
    WindowID[WindowID["ZuoQi"] = 13] = "ZuoQi";
    /** Vip界面 */
    WindowID[WindowID["Vip"] = 14] = "Vip";
    /** 商城 */
    WindowID[WindowID["Mall"] = 15] = "Mall";
    /** 限时抢购 */
    WindowID[WindowID["MallBuyLimit"] = WindowID.Mall * WINDOW_PART_BASE_ID] = "MallBuyLimit";
    /** 钻石商城 */
    WindowID[WindowID["MallDiamond"] = WindowID.Mall * WINDOW_PART_BASE_ID + 1] = "MallDiamond";
    /** 红钻商城 */
    WindowID[WindowID["MallBindingDiamond"] = WindowID.Mall * WINDOW_PART_BASE_ID + 2] = "MallBindingDiamond";
    /** 银币商城 */
    WindowID[WindowID["MallSilver"] = WindowID.Mall * WINDOW_PART_BASE_ID + 3] = "MallSilver";
    // ...add to here!
})(WindowID || (WindowID = {}));
//# sourceMappingURL=WindowEnum.js.map