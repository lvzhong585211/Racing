/**
 * 定义各种各样的事件,用来解耦代码
 * 注意: 监听的事件名称不可以重复
 */
class EventBus {
    private readonly mEventDispatcher = new Laya.EventDispatcher();

    /**
    * 任务更新事件
    * @param taskId 更新的任务Id
    */
    public readonly taskUpdate = new Base.MyEvent<{ (taskId: number): void }>("taskUpdate", this.mEventDispatcher);
    // 任务完成事件
    public readonly taskCompleted = new Base.MyEvent<{ (completedTask: NetMsg.SCCompTask): void }>("taskCompleted", this.mEventDispatcher);
    // 接受了新的任务事件
    public readonly newTask = new Base.MyEvent<{ (taskData: NetMsg.TaskData): void }>("newTask", this.mEventDispatcher);
    // 道具添加事件
    public readonly addGood = new Base.MyEvent<{ (goodDataAdded: NetMsg.GoodsData): void }>("addGood", this.mEventDispatcher);
    // 道具删除事件
    public readonly removeGood = new Base.MyEvent<{ (goodDataRemoved: NetMsg.GoodsData): void }>("removeGood", this.mEventDispatcher);
    // Money1发生改变事件
    public readonly money1Changed = new Base.MyEvent<{ (subMoney1: number): void }>("money1Changed", this.mEventDispatcher);

    /** 更新背包事件，参数为空时需刷新整个背包 */
    public readonly updateParcel = new Base.MyEvent<{ (dtGoods: NetMsg.IGoodsData): void }>("updateParcel", this.mEventDispatcher);

    /** 佩戴装备事件 */
    public readonly equipLoad = new Base.MyEvent<{ (dtGoods: NetMsg.IGoodsData, actorId?: number): void }>("equipLoad", this.mEventDispatcher);

    /** 卸下装备事件 */
    public readonly equipUnload = new Base.MyEvent<{ (dtGoods: NetMsg.IGoodsData, actorId?: number): void }>("equipUnload", this.mEventDispatcher);

    /** 战斗力改变事件 */
    public readonly combatForceChange = new Base.MyEvent<{ (): void }>("combatForceChange", this.mEventDispatcher);

    /** 更新技能列表 */
    public readonly updateSkillList = new Base.MyEvent<{ (): void }>("updateSkillList", this.mEventDispatcher);

    /** 技能升级事件 */
    public readonly skillUpLevel = new Base.MyEvent<{ (dtUpLevel: NetMsg.ISCSkillLevelUp): void }>("skillUpLevel", this.mEventDispatcher);

    /** 快捷使用配置改变事件 */
    public readonly quickKeyChange = new Base.MyEvent<{ (): void }>("quickKeyChange", this.mEventDispatcher);

    /** 技能添加事件 */
    public readonly skillAdd = new Base.MyEvent<{ (skillId: number): void }>("skillAdd", this.mEventDispatcher);
    /** 装备快捷提示引导 */
    public readonly newEquipSystemWizard = new Base.MyEvent<{ (wizardType: number): void }>("newEquipSystemWizard", this.mEventDispatcher);
    /** 功能开启提示*/
    readonly funOpenTiShi = new Base.MyEvent<{ (openId: number, taskNums: number, pickUpState: Boolean): void }>("funOpenTiShi", this.mEventDispatcher);
    /** 功能开启提示显示状态*/
    readonly funOpenTiShiShowState = new Base.MyEvent<{ (showState: Boolean): void }>("funOpenTiShiShowState", this.mEventDispatcher);
    /** 功能开启提示领取*/
    readonly funOpenTiShiGetReward = new Base.MyEvent<{ (): void }>("funOpenTiShiGetReward", this.mEventDispatcher);
    /** 主界面功能按钮区域刷新*/
    readonly mainViewBtnBoxRefresh = new Base.MyEvent<{ (orderId: number): void }>("mainViewBtnBoxRefresh", this.mEventDispatcher);
    /** Vip界面数据刷新*/
    readonly vipPartRefresh = new Base.MyEvent<{ (levelExp: number, rewardFlag: number): void }>("vipPartRefresh", this.mEventDispatcher);
    /** Vip界面奖励领取结果*/
    readonly vipRewardResult = new Base.MyEvent<{ (rewardFlag: number): void }>("vipRewardResult", this.mEventDispatcher);
    /** Vip等级改变 */
    readonly vipLevelChange = new Base.MyEvent<{ (): void }>("vipLevelChange", this.mEventDispatcher);
    /** 7日登陆信息 */
    readonly sevenDayLoginInfo = new Base.MyEvent<{ (sevenDayData: NetMsg.SevenDayActQueryData): void }>("sevenDayLoginInfo", this.mEventDispatcher);
    /** 7日登陆奖励领取 */
    readonly sevenDayLoginRewardGet = new Base.MyEvent<{ (position: number): void }>("sevenDayLoginRewardGet", this.mEventDispatcher);
    /** 商城商品数据 */
    readonly mallData = new Base.MyEvent<{ (): void }>("mallData", this.mEventDispatcher);
    /** 抢购物品购买结果 */
    readonly qiangGouGoodsBuyResult = new Base.MyEvent<{ (qiangGouId: number, buyNums: number, saleNums: number): void }>("qiangGouGoodsBuyResult", this.mEventDispatcher);
    /** 首充状态更新 */
    readonly firstChongZhiStateRefresh = new Base.MyEvent<{ (nState: number): void }>("firstChongZhiStateRefresh", this.mEventDispatcher);
    /** 充值状态更新 */
    readonly chargeStateRefresh = new Base.MyEvent<{ (): void }>("chargeStateRefresh", this.mEventDispatcher);
    /** 每日充值领取状态更新 */
    readonly chargeWelfareGetStateRefresh = new Base.MyEvent<{ (nState: string): void }>("chargeStateRefresh", this.mEventDispatcher);
    /** 累计充值领取状态更新 */
    readonly leiJiChargeGetStateRefresh = new Base.MyEvent<{ (nState: string): void }>("leiJiChargeGetStateRefresh", this.mEventDispatcher);
    /** 累计消费领取状态更新 */
    readonly leiJiConsumeGetStateRefresh = new Base.MyEvent<{ (nState: string): void }>("leiJiConsumeGetStateRefresh", this.mEventDispatcher);
    /** 累计充值、累计消费数量更新 */
    readonly leiJiNumsStateRefresh = new Base.MyEvent<{ (chargeNums: number, consumeNums: number): void }>("leiJiNumsStateRefresh", this.mEventDispatcher);
    /** 图腾数据刷新 */
    readonly totemRefresh = new Base.MyEvent<{ (totemId: number): void }>("totemRefresh", this.mEventDispatcher);
    /** 主界面任务图腾数据刷新 */
    readonly mainTaskTotemRefresh = new Base.MyEvent<{ (isShowTotemEffect: boolean): void }>("mainTaskTotemRefresh", this.mEventDispatcher);
    /** 抽奖积分更新 */
    readonly qiFuJiFenRefresh = new Base.MyEvent<{ (jfNums: number): void }>("qiFuJiFenRefresh", this.mEventDispatcher);
    /** 商人商品兑换刷新 */
    readonly businessDuiHuanRefresh = new Base.MyEvent<{ (duiHuanType: number): void }>("businessDuiHuanRefresh", this.mEventDispatcher);
    /** 商人商品兑换数量刷新 */
    readonly businessDuiHuanNumsRefresh = new Base.MyEvent<{ (listMap: Map<number, number>): void }>("businessDuiHuanNumsRefresh", this.mEventDispatcher);
    /** 帮会数据更新 */
    readonly bangHuiDataRefresh = new Base.MyEvent<{ (bangHuiData: NetMsg.BangHuiDetailData): void }>("bangHuiDataRefresh", this.mEventDispatcher);
    /** 帮会数据更新 */
    readonly equipFuBenDataRefresh = new Base.MyEvent<{ (data: MyUI.EquipFuBenServerData): void }>("bangHuiDataRefresh", this.mEventDispatcher);


	/**
     * 自动战斗改变事件
     * fightType 自动挂机行为的类型. AutoFightCmds 之一
     * fightFlags 自动挂机相关的标识. 为 GetThingsIndexes 标识的组合
    */
    public readonly autoFightEvent = new Base.MyEvent<{ (fightType: AutoFightCmds, fightFlags: number): void }>("autoFightEvent", this.mEventDispatcher);

    /**
     * 玩家的焦点(选择)目标改变事件
     * @param roleId 焦点目标的角色Id 
     */
    public readonly focusedActorChanged = new Base.MyEvent<{ (roleId: number): void }>("actorSelected", this.mEventDispatcher);

    /**
     * 角色血蓝值变化事件
     * @param lifeArg 血蓝值参数
     */
    public readonly lifeChange = new Base.MyEvent<{ (lifeArg: IRoleLifeEventArgs): void }>("lifeChange", this.mEventDispatcher);

    /**
     * 人物等级变化事件
     * @param nOldLv 旧等级
     * @param nNewLv 新等级
     */
    public readonly levelChange = new Base.MyEvent<{ (nOldLv?: number, nNewLv?: number): void }>("levelChange", this.mEventDispatcher);

    /**
     * 经验变化事件
     * @param nAddExp 增加的经验值
     * @param nNexExp 人物新的经验值
     */
    public readonly expChange = new Base.MyEvent<{ (nAddExp?: number, nNexExp?: number): void }>("expChange", this.mEventDispatcher);

    /**
     * 角色死亡事件
     * @param nActorID 角色ID（roleID、monsterID）
     */
    public readonly actorDeath = new Base.MyEvent<{ (nActorID: number): void }>("actorDeath", this.mEventDispatcher);

    /**
     * 场景中删除几个Actor对象
     * @param aActors Actor列表
     */
    public readonly delActorsInScene = new Base.MyEvent<{ (aActors: Logic.AActor[]): void }>("delActorsInScene", this.mEventDispatcher);

    /**
     * 在线时长更新（每秒更新一次）
     */
    public readonly onlineTimeUpdated = new Base.MyEvent<{ (): void }>("onlineTimeUpdated", this.mEventDispatcher);

    /**
     * 在线奖励信息更新
     */
    public readonly onlineRewardInfo = new Base.MyEvent<{ (): void }>("onlineRewardInfo", this.mEventDispatcher);

    /**
     * 领取每日在线奖励
     * @param nRet 抽奖结果
     * @param nStep 领取到第几步
     * @param aGoodsIds 奖励道具Id列表
     */
    public readonly onlineRewardGet = new Base.MyEvent<{ (nRet: number, nStep: number, aGoodsIds: number[]): void }>("onlineRewardGet", this.mEventDispatcher);

    /**
     * 等级奖励信息更新
     * @param flags 奖励标识
     */
    public readonly gradeRewardInfo = new Base.MyEvent<{ (flags: number[]): void }>("gradeRewardInfo", this.mEventDispatcher);

    /**
     * 领取等级奖励
     * @param nItemId 奖励Id
     */
    public readonly gradeRewardGet = new Base.MyEvent<{ (nItemId: number): void }>("gradeRewardGet", this.mEventDispatcher);

    /**
     * 安全区通知事件
     * @param bInSafe true=在安全区、false=不在安全区
     * @param bNearNpc 附近是否有Npc
     */
    public readonly safeRegionNotify = new Base.MyEvent<{ (bInSafe: boolean, bNearNpc: boolean): void }>("safeRegionNotify", this.mEventDispatcher);
    /**
     * 货币数量更新(钻石、红钻、金币、银币)
     * @param type  货币类型
     */
    readonly huoBiNumsRefresh = new Base.MyEvent<{ (type: MoneyTypes): void }>("huoBiNumsRefresh", this.mEventDispatcher);

    /** 潜心修炼时间变化通知 */
    public readonly meditationSecsNotify = new Base.MyEvent<{ (): void }>("meditationSecsNotify", this.mEventDispatcher);

    /** 角色属性变化通知 */
    public readonly roleAttributeNotify = new Base.MyEvent<{ (): void }>("roleAttributeNotify", this.mEventDispatcher);

    // to do ... 继续添加其它事件
}

const gameEventBus = new EventBus();   // 游戏全局的事件