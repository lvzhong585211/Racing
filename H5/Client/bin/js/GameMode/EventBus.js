/**
 * 定义各种各样的事件,用来解耦代码
 * 注意: 监听的事件名称不可以重复
 */
class EventBus {
    constructor() {
        this.mEventDispatcher = new Laya.EventDispatcher();
        /**
        * 任务更新事件
        * @param taskId 更新的任务Id
        */
        this.taskUpdate = new Base.MyEvent("taskUpdate", this.mEventDispatcher);
        // 任务完成事件
        this.taskCompleted = new Base.MyEvent("taskCompleted", this.mEventDispatcher);
        // 接受了新的任务事件
        this.newTask = new Base.MyEvent("newTask", this.mEventDispatcher);
        // 道具添加事件
        this.addGood = new Base.MyEvent("addGood", this.mEventDispatcher);
        // 道具删除事件
        this.removeGood = new Base.MyEvent("removeGood", this.mEventDispatcher);
        // Money1发生改变事件
        this.money1Changed = new Base.MyEvent("money1Changed", this.mEventDispatcher);
        /** 更新背包事件，参数为空时需刷新整个背包 */
        this.updateParcel = new Base.MyEvent("updateParcel", this.mEventDispatcher);
        /** 佩戴装备事件 */
        this.equipLoad = new Base.MyEvent("equipLoad", this.mEventDispatcher);
        /** 卸下装备事件 */
        this.equipUnload = new Base.MyEvent("equipUnload", this.mEventDispatcher);
        /** 战斗力改变事件 */
        this.combatForceChange = new Base.MyEvent("combatForceChange", this.mEventDispatcher);
        /** 更新技能列表 */
        this.updateSkillList = new Base.MyEvent("updateSkillList", this.mEventDispatcher);
        /** 技能升级事件 */
        this.skillUpLevel = new Base.MyEvent("skillUpLevel", this.mEventDispatcher);
        /** 快捷使用配置改变事件 */
        this.quickKeyChange = new Base.MyEvent("quickKeyChange", this.mEventDispatcher);
        /** 技能添加事件 */
        this.skillAdd = new Base.MyEvent("skillAdd", this.mEventDispatcher);
        /** 装备快捷提示引导 */
        this.newEquipSystemWizard = new Base.MyEvent("newEquipSystemWizard", this.mEventDispatcher);
        /** 功能开启提示*/
        this.funOpenTiShi = new Base.MyEvent("funOpenTiShi", this.mEventDispatcher);
        /** 功能开启提示显示状态*/
        this.funOpenTiShiShowState = new Base.MyEvent("funOpenTiShiShowState", this.mEventDispatcher);
        /** 功能开启提示领取*/
        this.funOpenTiShiGetReward = new Base.MyEvent("funOpenTiShiGetReward", this.mEventDispatcher);
        /** 主界面功能按钮区域刷新*/
        this.mainViewBtnBoxRefresh = new Base.MyEvent("mainViewBtnBoxRefresh", this.mEventDispatcher);
        /** Vip界面数据刷新*/
        this.vipPartRefresh = new Base.MyEvent("vipPartRefresh", this.mEventDispatcher);
        /** Vip界面奖励领取结果*/
        this.vipRewardResult = new Base.MyEvent("vipRewardResult", this.mEventDispatcher);
        /** Vip等级改变 */
        this.vipLevelChange = new Base.MyEvent("vipLevelChange", this.mEventDispatcher);
        /** 7日登陆信息 */
        this.sevenDayLoginInfo = new Base.MyEvent("sevenDayLoginInfo", this.mEventDispatcher);
        /** 7日登陆奖励领取 */
        this.sevenDayLoginRewardGet = new Base.MyEvent("sevenDayLoginRewardGet", this.mEventDispatcher);
        /** 商城商品数据 */
        this.mallData = new Base.MyEvent("mallData", this.mEventDispatcher);
        /** 抢购物品购买结果 */
        this.qiangGouGoodsBuyResult = new Base.MyEvent("qiangGouGoodsBuyResult", this.mEventDispatcher);
        /**
         * 自动战斗改变事件
         * fightType 自动挂机行为的类型. AutoFightCmds 之一
         * fightFlags 自动挂机相关的标识. 为 GetThingsIndexes 标识的组合
        */
        this.autoFightEvent = new Base.MyEvent("autoFightEvent", this.mEventDispatcher);
        /**
         * 玩家的焦点(选择)目标改变事件
         * @param roleId 焦点目标的角色Id
         */
        this.focusedActorChanged = new Base.MyEvent("actorSelected", this.mEventDispatcher);
        /**
         * 角色血蓝值变化事件
         * @param lifeArg 血蓝值参数
         */
        this.lifeChange = new Base.MyEvent("lifeChange", this.mEventDispatcher);
        /**
         * 人物等级变化事件
         * @param nOldLv 旧等级
         * @param nNewLv 新等级
         */
        this.levelChange = new Base.MyEvent("levelChange", this.mEventDispatcher);
        /**
         * 经验变化事件
         * @param nAddExp 增加的经验值
         * @param nNexExp 人物新的经验值
         */
        this.expChange = new Base.MyEvent("expChange", this.mEventDispatcher);
        /**
         * 角色死亡事件
         * @param nActorID 角色ID（roleID、monsterID）
         */
        this.actorDeath = new Base.MyEvent("actorDeath", this.mEventDispatcher);
        /**
         * 场景中删除几个Actor对象
         * @param aActors Actor列表
         */
        this.delActorsInScene = new Base.MyEvent("delActorsInScene", this.mEventDispatcher);
        /**
         * 在线时长更新（每秒更新一次）
         */
        this.onlineTimeUpdated = new Base.MyEvent("onlineTimeUpdated", this.mEventDispatcher);
        /**
         * 在线奖励信息更新
         */
        this.onlineRewardInfo = new Base.MyEvent("onlineRewardInfo", this.mEventDispatcher);
        /**
         * 领取每日在线奖励
         * @param nRet 抽奖结果
         * @param nStep 领取到第几步
         * @param aGoodsIds 奖励道具Id列表
         */
        this.onlineRewardGet = new Base.MyEvent("onlineRewardGet", this.mEventDispatcher);
        /**
         * 等级奖励信息更新
         * @param flags 奖励标识
         */
        this.gradeRewardInfo = new Base.MyEvent("gradeRewardInfo", this.mEventDispatcher);
        /**
         * 领取等级奖励
         * @param nItemId 奖励Id
         */
        this.gradeRewardGet = new Base.MyEvent("gradeRewardGet", this.mEventDispatcher);
        /**
         * 安全区通知事件
         * @param bInSafe true=在安全区、false=不在安全区
         * @param bNearNpc 附近是否有Npc
         */
        this.safeRegionNotify = new Base.MyEvent("safeRegionNotify", this.mEventDispatcher);
        /**
         * 货币数量更新(钻石、红钻、金币、银币)
         * @param type  货币类型
         */
        this.huoBiNumsRefresh = new Base.MyEvent("huoBiNumsRefresh", this.mEventDispatcher);
        /**
         * 潜心修炼时间变化通知
         */
        this.meditationSecsNotify = new Base.MyEvent("meditationSecsNotify", this.mEventDispatcher);
        // to do ... 继续添加其它事件
    }
}
const gameEventBus = new EventBus(); // 游戏全局的事件
//# sourceMappingURL=EventBus.js.map