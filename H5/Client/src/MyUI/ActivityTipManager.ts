namespace MyUI {
    /** 活动提示数据 */
    export class ActivityTipItem {
        /** 类型 */
        public type = ActivityTipTypes.Root;
        /** 活动的子类总计数 */
        public ActiveChildCount: number = 0;
        /** 父类列表 */
        public Parent: ActivityTipItem[] = [];
        /** 子分类列表 */
        public Children: ActivityTipItem[] = [];
        /** 是否激活(玩家是否能看到此功能,图标是否已经显示) */
        public IsActive: boolean = false;
        /** 是否隐藏 */
        public Hide: boolean = false;
        /** 需要完成的任务Id */
        public NeedTaskID: number = 0;
        /** 需要的等级 */
        public NeedLevel: number = 0;
        /** 需要的Vip等级 */
        public NeedVIPLevel: number = 0;
        /** 状态变化时，UI接受状态变化信息的接口 */
        public HandlerList: Laya.Handler[] = [];
        /** 小红点对象列表，状态变化的时候直接控制该对象的显示隐藏 */
        public redDotList: RedDot[] = [];
    }

    export class ActivityTipManager {

        private static ActivityTipItemDict = new Map<number, ActivityTipItem>(); // 活动提示类型字典
        private static s_bClearZiYuanZhaoHuiTip = false; // 是否已经清除资源找回的小红点

        /**
         * 初始化活动提示
         */
        public static InitActivityItemTree() {
            let activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JiaoyiHangIcon);
            ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JiaoyiRecord, ActivityTipTypes.JiaoyiHangIcon);

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.MainHuoDongIcon);

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.RiChangHuoDong, ActivityTipTypes.MainHuoDongIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.RiChangHuoDongOther, ActivityTipTypes.RiChangHuoDong);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.AngelTemple, ActivityTipTypes.RiChangHuoDong);

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.MainQiehuanIcon);

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HuangJinBoss, ActivityTipTypes.MainHuoDongIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ShiJieBoss, ActivityTipTypes.MainHuoDongIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ShuiJingHuangJin, ActivityTipTypes.MainHuoDongIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.KuafuActivity, ActivityTipTypes.MainHuoDongIcon);

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.KuafuActivity, ActivityTipTypes.MainHuoDongIcon);

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HonourSystem, ActivityTipTypes.MainQiehuanIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HonourChengHao, ActivityTipTypes.HonourSystem);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HonourChengHaoTouxianActive, ActivityTipTypes.HonourChengHao);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HonourChengHaoTouxianUpgrade, ActivityTipTypes.HonourChengHao);
            if (FunctionOpenManager.functionOpenState(FunctionOpenManager.chengJiuWenZhang)) // 称号纹章是否已屏蔽
                activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HonourChengHaoWenzhang, ActivityTipTypes.HonourChengHao);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HonourJunXian, ActivityTipTypes.HonourSystem);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HonourJunXianPanel, ActivityTipTypes.HonourJunXian);
            if (FunctionOpenManager.functionOpenState(FunctionOpenManager.junXianXunZhang)) // 勋章页签是否已屏蔽
                activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HonourJunXianXunZhang, ActivityTipTypes.HonourJunXian);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HonourChengJiu, ActivityTipTypes.HonourSystem);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HonourChengJiu_1, ActivityTipTypes.HonourChengJiu);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HonourChengJiu_2, ActivityTipTypes.HonourChengJiu);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HonourChengJiu_3, ActivityTipTypes.HonourChengJiu);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HonourChengJiu_4, ActivityTipTypes.HonourChengJiu);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HonourChengJiu_5, ActivityTipTypes.HonourChengJiu);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HonourChengJiu_6, ActivityTipTypes.HonourChengJiu);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HonourChengJiu_7, ActivityTipTypes.HonourChengJiu);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HonourChengJiu_8, ActivityTipTypes.HonourChengJiu);

            // 风云志系统
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.FengYunZhiSystem, ActivityTipTypes.MainQiehuanIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ShanHaiQuanShu, ActivityTipTypes.FengYunZhiSystem);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ShanHaiTuJian, ActivityTipTypes.ShanHaiQuanShu);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ShanHaiSouler, ActivityTipTypes.ShanHaiQuanShu);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.LongHai, ActivityTipTypes.FengYunZhiSystem);

            // 冒险系统
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.MaoxianSystem);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.RichangMaoxian, ActivityTipTypes.MaoxianSystem);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.SuoMoTa, ActivityTipTypes.RichangMaoxian);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.PersonalZhanchang, ActivityTipTypes.MaoxianSystem);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ZhanChangSystem, ActivityTipTypes.MaoxianSystem);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.BianQiangMeiRiHuoYue, ActivityTipTypes.MaoxianSystem);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.LongYingChengZhan, ActivityTipTypes.PersonalZhanchang);

            // 战场系统
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ZhanChangSystem);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.PersonalZhanchang, ActivityTipTypes.ZhanChangSystem);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.BangHuiZhanChang, ActivityTipTypes.ZhanChangSystem);

            // 骑宠系统
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.QichongSystem, ActivityTipTypes.MainQiehuanIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ZuoqiLieDui, ActivityTipTypes.QichongSystem);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ZuoqiGoodIcon, ActivityTipTypes.ZuoqiLieDui);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ZuoqiShuxing, ActivityTipTypes.ZuoqiLieDui);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ZuoqiLevelup, ActivityTipTypes.ZuoqiShuxing);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ZuoqiLevelup, ActivityTipTypes.ZuoqiGoodIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ZuoqiSkill, ActivityTipTypes.ZuoqiLieDui);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ZuoqiSkillLevelup, ActivityTipTypes.ZuoqiSkill);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ZuoqiSkillLevelup, ActivityTipTypes.ZuoqiGoodIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ZuoqiSkillLingwu, ActivityTipTypes.ZuoqiSkill);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ZuoqiSkillLingwu, ActivityTipTypes.ZuoqiGoodIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.Mengchongpart, ActivityTipTypes.QichongSystem);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.MengchongEggFuhuan, ActivityTipTypes.Mengchongpart);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.MengchongLingqu, ActivityTipTypes.Mengchongpart);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.MengchongFeed, ActivityTipTypes.Mengchongpart);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.FriendPart);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.Friend_NewEnemy, ActivityTipTypes.FriendPart);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.PetTuJian, ActivityTipTypes.QichongSystem);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.PetTuJian_Putong, ActivityTipTypes.PetTuJian);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.PetTuJian_Xiyou, ActivityTipTypes.PetTuJian);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.PetTuJian_Jueshi, ActivityTipTypes.PetTuJian);

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.MainGongNeng);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.MainEmailIcon, ActivityTipTypes.MainGongNeng);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.MainFuLiIcon);
            // 七日狂欢登陆
            if (FunctionOpenManager.functionOpenState(FunctionOpenManager.qiRiDengLu))
                activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.SevenDayLogin, ActivityTipTypes.MainFuLiIcon);
            if (FunctionOpenManager.functionOpenState(FunctionOpenManager.chongZhi)) // 充值系统是否已屏蔽
                activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.FuLiChongZhiHuiKui, ActivityTipTypes.MainFuLiIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.FuLiDailyWelfare, ActivityTipTypes.MainFuLiIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.FuLiMeiRiZaiXian, ActivityTipTypes.FuLiDailyWelfare);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.FuLiUpLevelGift, ActivityTipTypes.FuLiDailyWelfare);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.MainMingXiangIcon, ActivityTipTypes.FuLiDailyWelfare);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ZiYuanZhaoHui, ActivityTipTypes.MainFuLiIcon);
            if (FunctionOpenManager.functionOpenState(FunctionOpenManager.yueKa))
                activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.FuLiYueKaFanLi, ActivityTipTypes.MainFuLiIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ShouCiChongZhi, ActivityTipTypes.Root);
            if (FunctionOpenManager.functionOpenState(FunctionOpenManager.chongZhi)) {
                activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.MeiRiChongZhi, ActivityTipTypes.FuLiChongZhiHuiKui);
                // 暂时开放 首次充值 和 每日充值 ， 将每日消费 和 累计消费功能关闭 
                activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.LeiJiChongZhi, ActivityTipTypes.FuLiChongZhiHuiKui); // 暂时注释 后期开放 勿删
                activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.LeiJiXiaoFei, ActivityTipTypes.FuLiChongZhiHuiKui);  // 暂时注释 后期开放 勿删
                // activityTipItem = AddActivityTipItem(ActivityTipTypes.ShouCiChongZhi_YiLingQu, ActivityTipTypes.Root);
                // activityTipItem = AddActivityTipItem(ActivityTipTypes.MeiRiChongZhi_YiLingQu, ActivityTipTypes.Root);
            }

            // 主界面 首冲 日冲 特惠豪礼 充值判断
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ShouCiChongZhi_YiLingQu, ActivityTipTypes.Root);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.MeiRiChongZhi_YiLingQu, ActivityTipTypes.Root);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.TeHuiHaoLiChongZhi_YiWanCheng, ActivityTipTypes.Root);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.MeiRiLiBao_YiWanCheng, ActivityTipTypes.Root);

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.MainJingJiChangIcon, ActivityTipTypes.PersonalZhanchang);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JingJiChangJiangLi, ActivityTipTypes.MainJingJiChangIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JingJiChangJunXian, ActivityTipTypes.MainJingJiChangIcon);
            // activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JingJiChangLeftTimes, ActivityTipTypes.MainJingJiChangIcon);

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.MainXinFuIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.XinFuLevel, ActivityTipTypes.MainXinFuIcon);
            // activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.XinFuKillBoss, ActivityTipTypes.MainXinFuIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.XinFuChongZhiMoney, ActivityTipTypes.MainXinFuIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.XinFuUseMoney, ActivityTipTypes.MainXinFuIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.XinFuFreeGetMoney, ActivityTipTypes.MainXinFuIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.YuYiYongShi, ActivityTipTypes.MainXinFuIcon);

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.MainMeiRiBiZuoIcon);
            // activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ZiYuanZhaoHui, ActivityTipTypes.MainMeiRiBiZuoIcon);

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.QiFuIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.QiFuFreeIcon, ActivityTipTypes.QiFuIcon);

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.VIPGongNeng);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.VIPGifts, ActivityTipTypes.VIPGongNeng);

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.BuChangIcon);

            // 合服活动相关
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HeFuActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HeFuLogin, ActivityTipTypes.HeFuActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HeFuTotalLogin, ActivityTipTypes.HeFuActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HeFuRecharge, ActivityTipTypes.HeFuActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HeFuPKKing, ActivityTipTypes.HeFuActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HeFuLuolanZhengba, ActivityTipTypes.HeFuActivity);

            // 节日活动相关
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieRiLogin, ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieRiTotalLogin, ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieRiDayCZ, ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieRiLeiJiXF, ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieRiLeiJiCZ, ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieRiCZKING, ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieRiXFKING, ActivityTipTypes.JieRiActivity);

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieRiGive, ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieRiGiveKing, ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieRiRecvKing, ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieriWing, ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieriAddon, ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieriStrengthen, ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieriAchievement, ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieriMilitaryRank, ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieriVIPFanli, ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieriAmulet, ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieriArchangel, ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieRiLianXuCharge, ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieRiRecv, ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieriJiehun, ActivityTipTypes.JieRiActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieRiIPointsExchg, ActivityTipTypes.JieRiActivity); // 节日积分兑换

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieRiLoongCollect, ActivityTipTypes.JieRiActivity); // Loong 节日收集
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.JieRiLoongDouble, ActivityTipTypes.JieRiActivity); // Loong 节日双倍来袭

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ZhuanXiang); // 专享活动

            // 帮派活动相关
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.GuildIcon, ActivityTipTypes.MainQiehuanIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.GuildActivity, ActivityTipTypes.GuildIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.FamilyMembersIcon, ActivityTipTypes.GuildIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.GuildCopyMap, ActivityTipTypes.GuildActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.LongYingChengZhan, ActivityTipTypes.GuildActivity);
            // activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.LangHunLingYuIcon, ActivityTipTypes.GuildActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.GuildCopyMap, ActivityTipTypes.RichangMaoxian);

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.LangHunLingYuFightIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ZhanMengWaiJiaoIconTip);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ZhanMengWaiJiaoRequestTip, ActivityTipTypes.ZhanMengWaiJiaoIconTip);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ZhanMengWaiJiaoInfoTip, ActivityTipTypes.ZhanMengWaiJiaoIconTip);

            // 玩家召回
            // activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.PlayerRecallActivity, ActivityTipTypes.MainFuLiIcon);
            // activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.Recall_Rewards, ActivityTipTypes.MainFuLiIcon); 
            // activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.Recall_GiftSet, ActivityTipTypes.MainFuLiIcon);
            // activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.Recall_SignIn, ActivityTipTypes.MainFuLiIcon);
            // activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.Recall_MyReference, ActivityTipTypes.MainFuLiIcon);

            // 推广
            // activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.TipSpread , ActivityTipTypes.MainFuLiIcon);

            // 七日活动
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.SevenDayActivity);
            if (FunctionOpenManager.functionOpenState(FunctionOpenManager.chongZhi)) // 充值系统是否已屏蔽
                activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.SevenDayCharge, ActivityTipTypes.SevenDayActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.SevenDayGoal, ActivityTipTypes.SevenDayActivity);
            // 七日抢购暂时没有
            false ? activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.SevenDayBuy, ActivityTipTypes.SevenDayActivity) : 0;

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.SevenDayGoal, ActivityTipTypes.MainFuLiIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.SevenDayBuy, ActivityTipTypes.MainFuLiIcon);

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.SevenDayGoal_1, ActivityTipTypes.SevenDayGoal);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.SevenDayGoal_2, ActivityTipTypes.SevenDayGoal);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.SevenDayGoal_3, ActivityTipTypes.SevenDayGoal);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.SevenDayGoal_4, ActivityTipTypes.SevenDayGoal);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.SevenDayGoal_5, ActivityTipTypes.SevenDayGoal);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.SevenDayGoal_6, ActivityTipTypes.SevenDayGoal);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.SevenDayGoal_7, ActivityTipTypes.SevenDayGoal);

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.BuildingIcon, ActivityTipTypes.MainQiehuanIcon);

            // 成长基金
            if (FunctionOpenManager.functionOpenState(FunctionOpenManager.chengZhangJiJin)) {
                activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.Fund, ActivityTipTypes.JieRiActivity);
                activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.Fund, ActivityTipTypes.MainFuLiIcon);
                activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.FundLogin, ActivityTipTypes.Fund);
                activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.FundMoney, ActivityTipTypes.Fund);
                activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.FundChangeLife, ActivityTipTypes.Fund);
            }

            // 众神争霸
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ZhengBaCanJoinIcon, ActivityTipTypes.KuafuActivity);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.CoupleArenaCanAward, ActivityTipTypes.KuafuActivity);

            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.CoupleWishCanAward);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.MainTopIcon, ActivityTipTypes.MainQiehuanIcon);
            // 组队消息
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.ZuDuiXiaoXi);

            // 人物界面tip
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.MainRoleIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.MainParcelIcon, ActivityTipTypes.MainRoleIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.HonourChengHaoActivity, ActivityTipTypes.MainRoleIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.RolePageIcon, ActivityTipTypes.MainRoleIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.AddPropertyPointIcon, ActivityTipTypes.RolePageIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.WingUpgradeButton, ActivityTipTypes.MainRoleIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.Fashion, ActivityTipTypes.MainRoleIcon);
            // activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.WingUpgradeButton, ActivityTipTypes.MainParcelIcon);

            // 称号
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.Title, ActivityTipTypes.MainRoleIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.Title_Putong, ActivityTipTypes.Title);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.Title_Xiyou, ActivityTipTypes.Title);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.Title_Rongyao, ActivityTipTypes.Title);

            // 变强
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.MainBianQiangIcon);
            // activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.BianQiangMeiRiHuoYue, ActivityTipTypes.MainBianQiangIcon);

            // 人物界面技能
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.RoleSkillLevel, ActivityTipTypes.MainRoleIcon);
            activityTipItem = ActivityTipManager.AddActivityTipItem(ActivityTipTypes.RoleSkillYJLevel, ActivityTipTypes.MainRoleIcon);

            // LoadFuBenTabConfig();
            // LoadFuBenConfig();
            ActivityTipManager.s_bClearZiYuanZhaoHuiTip = false;
        }

        /**
         * 获取活动提示数据
         * @param type 活动提示类型
         */
        public static GetActivityTipItem(type: number): ActivityTipItem {
            const item = ActivityTipManager.ActivityTipItemDict.get(type);
            return item ? item : null;
        }

        /**
         * 注册活动提示类型的处理函数，如果处理函数只是控制小红点的显示隐藏可以使用regActivityTipRedDot函数注册
         * @param type 活动提示类型
         * @param handler 注册的处理函数（注意：如果传入null，则会清空该活动提示类型的所有处理函数）</br>
         * Handler的参数类型：</br>
         * function(type: ActivityTipTypes, data: ActivityTipItem): void
         */
        public static regActivityTipItem(type: number, handler: Laya.Handler): ActivityTipItem {
            const datItem = ActivityTipManager.ActivityTipItemDict.get(type);
            if (!datItem) {
                return null;
            }

            if (handler) {
                if (datItem.HandlerList.indexOf(handler) === -1) {
                    datItem.HandlerList.push(handler);
                }
            } else {
                datItem.HandlerList.length = 0;
            }
            datItem.HandlerList.forEach(
                element => element.runWith([datItem.type, datItem])
            );
            return datItem;
        }

        /**
         * 注册活动提示类型的小红点，如果处理函数除了控制小红点的显示隐藏还需要其他逻辑可以使用regActivityTipItem函数注册
         * @param type 活动提示类型
         * @param redDot 小红点显示对象
         */
        public static regActivityTipRedDot(type: number, redDot: RedDot): ActivityTipItem {
            const datItem = ActivityTipManager.ActivityTipItemDict.get(type);
            if (!datItem) {
                return null;
            }

            Global.Log.Assert(redDot && !redDot.destroyed, `${ActivityTipTypes[type]} red dot error!!!`);
            if (datItem.redDotList.indexOf(redDot) === -1) {
                datItem.redDotList.push(redDot);
            }
            redDot.visible = datItem.IsActive;
            return datItem;
        }

        /**
         * 反注册（取消）活动提示类型的处理函数
         * @param type 活动提示类型
         * @param handler 反注册（取消）的处理函数（注意：如果传入null，则会清空该活动提示类型的所有处理函数）
         */
        public static unregActivityTipItem(type: number, handler: Laya.Handler): ActivityTipItem {
            const activityTipItem = ActivityTipManager.ActivityTipItemDict.get(type);
            if (!activityTipItem) {
                return null;
            }

            if (handler) {
                const nIdx = activityTipItem.HandlerList.indexOf(handler);
                if (nIdx !== -1) {
                    activityTipItem.HandlerList.splice(nIdx, 1);
                }
            } else {
                activityTipItem.HandlerList.length = 0;
            }
            activityTipItem.HandlerList.forEach(
                element => element.runWith([activityTipItem.type, activityTipItem])
            );
            return activityTipItem;
        }

        /**
         * 反注册（取消）活动提示类型的小红点
         * @param type 活动提示类型
         * @param redDot 小红点显示对象
         */
        public static unregActivityTipRedDot(type: number, redDot: RedDot): ActivityTipItem {
            const datItem = ActivityTipManager.ActivityTipItemDict.get(type);
            if (!datItem) {
                return null;
            }

            Global.Log.Assert(redDot && !redDot.destroyed, `${ActivityTipTypes[type]} red dot error!!!`);
            const nIdx = datItem.redDotList.indexOf(redDot);
            if (nIdx !== -1) {
                datItem.redDotList.splice(nIdx, 1);
            }
            return datItem;
        }

        /**
         * 服务器通知更新节点的活跃状态
         * @param data 节点状态数据
         */
        public static ServerUpdateIconStateData(data: NetMsg.ActivityIconStateData) {
            if (!data.arrIconState || data.arrIconState.length === 0) {
                return;
            }

            data.arrIconState.forEach(
                element => {
                    const type = element >> 1;
                    const state = element & 1;
                    ActivityTipManager.OnChangeItemCountValue(type, state);
                }
            );
        }

        /**
         * 通过类型查找并修改活跃值
         * @param type 活动提示类型
         * @param activeCount 激活个数
         */
        public static OnChangeItemCountValue(type: number, activeCount: number) {
            if (type === ActivityTipTypes.BuildingIcon)
                return; // 暂时屏蔽
            if (type === ActivityTipTypes.ZiYuanZhaoHui) {
                if (ActivityTipManager.s_bClearZiYuanZhaoHuiTip) activeCount = 0; // 如果已经清除了则设置为不显示
            }

            const item = ActivityTipManager.GetActivityTipItem(type);
            if (item) {
                ActivityTipManager.ChangeItemData(item, activeCount);
            }
        }

        /**
         * 清除资源找回的客户端小红点
         */
        public static ClearZiYuanZhaoHuiTip() {
            if (!ActivityTipManager.s_bClearZiYuanZhaoHuiTip) {
                ActivityTipManager.s_bClearZiYuanZhaoHuiTip = true;
                ActivityTipManager.OnChangeItemCountValue(ActivityTipTypes.ZiYuanZhaoHui, 0);
            }
        }

        /**
         * 添加活动提示数据节点
         * @param type 活动提示类型
         * @param parent 活动提示的父节点类型
         */
        private static AddActivityTipItem(type: number, parent: number = ActivityTipTypes.Root): ActivityTipItem {
            let activityTipItem = ActivityTipManager.ActivityTipItemDict.get(type);
            if (!activityTipItem) {
                activityTipItem = new ActivityTipItem();
                activityTipItem.type = type;
                ActivityTipManager.ActivityTipItemDict.set(type, activityTipItem);
            }
            if (parent !== ActivityTipTypes.Root) {
                ActivityTipManager.AddChildItem(parent, activityTipItem);
            }
            return activityTipItem;
        }

        /**
         * 添加子活动提示类型节点
         * @param parent 父节点活动类型
         * @param item 子活动提示类型数据
         */
        private static AddChildItem(parent: number, item: ActivityTipItem) {
            const parentItem = ActivityTipManager.ActivityTipItemDict.get(parent);
            if (parentItem) {
                if (!item.Parent.find(element => element.type === parentItem.type)) {
                    item.Parent.push(parentItem);
                }
                if (!parentItem.Children.find(element => element.type === item.type)) {
                    parentItem.Children.push(item);
                }
            }
        }

        /**
         * 修改活跃个数并重新计算是否激活
         * @param activityTipItem 活动提示数据
         * @param activeCount 活跃个数
         * @param force 是否强制刷新（如果设置为true，则即使计算出来的活跃状态一样也进行一次刷新），默认值false
         */
        public static ChangeItemData(activityTipItem: ActivityTipItem, activeCount: number, force = false) {
            let active = false;
            activityTipItem.ActiveChildCount = activeCount;
            if ((!activityTipItem.Hide) &&
                (activityTipItem.NeedLevel <= 0 || activityTipItem.NeedLevel <= Global.GetUnionLevel()) &&
                (activityTipItem.NeedTaskID <= Global.Data.roleData.CompletedMainTaskID) &&
                (activityTipItem.NeedVIPLevel <= Global.Data.roleData.VIPLevel) &&
                (activityTipItem.ActiveChildCount > 0)) {
                active = true;
            } else {
                active = false;
            }

            if (activityTipItem.IsActive === active) {
                if (!force) return;
            } else {
                activityTipItem.IsActive = active;
                activityTipItem.HandlerList.forEach(
                    element => element.runWith([activityTipItem.type, activityTipItem])
                );
                activityTipItem.redDotList.forEach(
                    element => {
                        Global.Log.Assert(element && !element.destroyed, `${ActivityTipTypes[activityTipItem.type]} red dot error!!!`);
                        element.visible = activityTipItem.IsActive;
                    }
                );
            }

            const parant = activityTipItem.Parent;
            if (parant.length >= 0) {
                parant.forEach(
                    element => {
                        let count = 0;
                        for (const child of element.Children) {
                            if (child.IsActive) {
                                count++;
                                break;
                            }
                        }
                        ActivityTipManager.ChangeItemData(element, count);
                    }
                );
            }
        }
    }
}