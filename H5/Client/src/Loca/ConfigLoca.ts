namespace Loca {
    /** 多语言枚举 */
    export enum EnumLanguage {
        /** 中文 */
        Chinese = 0,
        /** 韩文 */
        Korean = 1,
        /** 英文 */
        English = 2,
        /** 繁体中文 */
        TraditionalChinese = 3
    }

    /** 当前使用的语言 */
    export let curLanguage = EnumLanguage.Chinese;

    /**
     * 本地化字符串的影射表
     */
    // tslint:disable-next-line:class-name
    class _ {
        private static locaDict = new Map<string, string>();  // 本地化影射表

        /**
         * 获取一个key对应的多语言内容
         * @param key 多语言key
         * @param value 默认值，用于多语言查找不到时使用
         */
        public static KT(key: string, value: string): string {
            const voLang = tableMgr.languageTable.Find(key);
            if (voLang) {
                if (curLanguage === EnumLanguage.Chinese) {
                    return voLang.Chinese;
                } else if (curLanguage === EnumLanguage.Korean) {
                    return voLang.Korean;
                }
            } else {
                if (_.locaDict.has(key)) { // 检查多语言表里没有配置的key是否重复定义了
                    // Global.Log.Assert(false, "language key (%s) had existed!!!", key);
                }
                _.locaDict.set(key, value);
            }
            return value;
        }
    }

    /**
     * 返回对应Key的翻译后的文本
     * @param key 用来检索文本
     */
    export function getLang(key: string): string {
        return _.KT(key, key);
    }

    /**
     * 返回对应的Key的翻译后的文本,并使用给定的颜色格式化
     * @param key 用来检索文本
     * @param color 格式化用的颜色值
     */
    export function getLangWithColor(key: string, color: string): string {
        return MyUI.ColorCode.encodingText(getLang(key), color);
    }

    /**
     * 游戏中本地化文本的定义. 注：用数字做文本索引在多人开发时容易引起冲突，所以目前使用字符串，后期整理时可以考虑
     */
    export class LanguageConfig {

        //#region ========================= Language Region Common ==============================
        /************************************************************************************************************
         ***** 职业名称、货币类型、道具类型、系统名称、属性名称、确定/取消等
         ***** 这些在整个游戏所有系统中都一样的文本定义在这个区域
         ************************************************************************************************************/
        /** 无 */
        readonly UI_LITERAL_NONE = _.KT("2", "无");
        readonly UI_COMMON_确定 = _.KT("1", "确定");
        readonly UI_COMMON_取消 = _.KT("3", "取消");
        /** 配置错误 */
        readonly UI_Error_ConfigError = _.KT("1703", "配置错误");
        /** 龙胆 */
        readonly UI_OCCUPATION_LongDan = _.KT("UI_OCCUPATION_LongDan", "龙胆");
        /** 花灵 */
        readonly UI_OCCUPATION_HuaLing = _.KT("UI_OCCUPATION_HuaLing", "花灵");
        /** 巧工 */
        readonly UI_OCCUPATION_QiaoGong = _.KT("UI_OCCUPATION_QiaoGong", "巧工");
        /** 行者 */
        readonly UI_OCCUPATION_XingZhe = _.KT("UI_OCCUPATION_XingZhe", "行者");
        /** 斗仙 */
        readonly UI_OCCUPATION_DouXian = _.KT("UI_OCCUPATION_DouXian", "斗仙");
        readonly UI_MONEY_TYPE_GOLD = _.KT("UI_MONEY_TYPE_GOLD", "金币");
        readonly UI_MONEY_TYPE_BINDING_GOLD = _.KT("UI_MONEY_TYPE_BINDING_GOLD", "绑定金币");
        readonly UI_MONEY_TYPE_DIAMOND = _.KT("UI_MONEY_TYPE_DIAMOND", "钻石");
        readonly UI_MONEY_TYPE_BINDING_DIAMOND = _.KT("UI_MONEY_TYPE_BINDING_DIAMOND", "绑定钻石");
        readonly UI_MONEY_TYPE_JiFen = _.KT("UI_MONEY_TYPE_JIFEN", "积分");
        readonly UI_MONEY_TYPE_KingOfBattlePoint = _.KT("UI_MONEY_TYPE_KingOfBattlePoint", "王者点数");
        readonly UI_MONEY_TYPE_DOUQI = _.KT("UI_MONEY_TYPE_DOUQI", "斗气");
        readonly UI_MONEY_TYPE_SHENGWANG = _.KT("UI_MONEY_TYPE_SHENGWANG", "声望");
        readonly UI_MONEY_TYPE_BANGGONG = _.KT("UI_MONEY_TYPE_BANGGONG", "帮贡");
        readonly UI_MONEY_TYPE_CHENGHJIU = _.KT("UI_MONEY_TYPE_CHENGHJIU", "成就");
        readonly UI_MONEY_TYPE_XINGHUN = _.KT("UI_MONEY_TYPE_XINGHUN", "星魂");
        readonly UI_MONEY_TYPE_FENMO = _.KT("UI_MONEY_TYPE_FENMO", "粉末");
        readonly UI_MONEY_TYPE_XUEZUAN = _.KT("UI_MONEY_TYPE_XUEZUAN", "血钻");
        readonly UI_GOODS_TYPE_WEAPON = _.KT("UI_GOODS_TYPE_WEAPON", "武器");
        readonly UI_GOODS_TYPE_ELEMENT_HEART = _.KT("UI_GOODS_TYPE_ELEMENT_HEART", "元素之心");
        readonly UI_GOODS_TYPE_SOUL_STONE = _.KT("UI_GOODS_TYPE_SOUL_STONE", "魂石");
        readonly UI_GOODS_TYPE_HELMET = _.KT("UI_GOODS_TYPE_HELMET", "头盔");
        readonly UI_GOODS_TYPE_ARMOUR = _.KT("UI_GOODS_TYPE_ARMOUR", "铠甲");
        readonly UI_GOODS_TYPE_HANDGUARD = _.KT("UI_GOODS_TYPE_HANDGUARD", "护手");
        readonly UI_GOODS_TYPE_LEGGUARD = _.KT("UI_GOODS_TYPE_LEGGUARD", "护腿");
        readonly UI_GOODS_TYPE_SHOES = _.KT("UI_GOODS_TYPE_SHOES", "靴子");
        readonly UI_GOODS_TYPE_RING = _.KT("UI_GOODS_TYPE_RING", "戒指");
        readonly UI_GOODS_TYPE_WEDDINGRING = _.KT("UI_GOODS_TYPE_WEDDINGRING", "婚戒");
        readonly UI_GOODS_TYPE_WING = _.KT("UI_GOODS_TYPE_WING", "翅膀");
        readonly UI_GOODS_TYPE_RIDING = _.KT("UI_GOODS_TYPE_RIDING", "骑宠");
        readonly UI_GOODS_TYPE_PET = _.KT("UI_GOODS_TYPE_PET", "萌宠");
        readonly UI_GOODS_TYPE_PET_EGG = _.KT("UI_GOODS_TYPE_PET_EGG", "萌宠蛋");
        readonly UI_GOODS_TYPE_TASK_ITEM = _.KT("UI_GOODS_TYPE_TASK_ITEM", "任务道具");
        readonly UI_GOODS_TYPE_RIDING_ITEM = _.KT("UI_GOODS_TYPE_RIDING_ITEM", "骑宠道具");
        readonly UI_GOODS_TYPE_BOOK = _.KT("UI_GOODS_TYPE_BOOK", "书籍");
        readonly UI_GOODS_TYPE_SUNDRY = _.KT("UI_GOODS_TYPE_SUNDRY", "杂物");
        readonly UI_GOODS_TYPE_GEM = _.KT("UI_GOODS_TYPE_GEM", "宝石");
        readonly UI_GOODS_TYPE_SCROLL = _.KT("UI_GOODS_TYPE_SCROLL", "卷轴");
        readonly UI_GOODS_TYPE_COMPOSITE = _.KT("UI_GOODS_TYPE_COMPOSITE", "合成材料");
        readonly UI_GOODS_TYPE_CONSUMABLE = _.KT("UI_GOODS_TYPE_CONSUMABLE", "消耗材料");
        readonly UI_GOODS_TYPE_DRUG = _.KT("UI_GOODS_TYPE_DRUG", "药品");
        readonly UI_GOODS_TYPE_PANACEA = _.KT("UI_GOODS_TYPE_PANACEA", "灵丹");
        readonly UI_GOODS_TYPE_BUFFER = _.KT("UI_GOODS_TYPE_BUFFER", "Buffer类");
        readonly UI_GOODS_TYPE_NORMAL_PACK = _.KT("UI_GOODS_TYPE_NORMAL_PACK", "普通包裹");
        readonly UI_GOODS_TYPE_UP_PACK = _.KT("UI_GOODS_TYPE_UP_PACK", "升级包裹");
        readonly UI_GOODS_TYPE_GOLD_PACKAGE = _.KT("UI_GOODS_TYPE_GOLD_PACKAGE", "金币包");
        readonly UI_GOODS_TYPE_TREASURE = _.KT("UI_GOODS_TYPE_TREASURE", "宝箱");
        readonly UI_GOODS_TYPE_VEIN = _.KT("UI_GOODS_TYPE_VEIN", "经脉");
        readonly UI_GOODS_TYPE_WUXUE = _.KT("UI_GOODS_TYPE_WUXUE", "武学");
        readonly UI_GOODS_TYPE_ACHIEVEMENT = _.KT("UI_GOODS_TYPE_ACHIEVEMENT", "成就");
        readonly UI_GOODS_TYPE_FORTUNE_CAT = _.KT("UI_GOODS_TYPE_FORTUNE_CAT", "招财符");
        readonly UI_GOODS_TYPE_HONOR_CARE = _.KT("UI_GOODS_TYPE_HONOR_CARE", "荣耀护体");
        readonly UI_GOODS_TYPE_SOUL_CARE = _.KT("UI_GOODS_TYPE_SOUL_CARE", "战魂护体");
        readonly UI_GOODS_TYPE_FLAG_CARE = _.KT("UI_GOODS_TYPE_FLAG_CARE", "战旗护体");
        readonly UI_GOODS_TYPE_AMULET = _.KT("UI_GOODS_TYPE_AMULET", "护符");
        readonly UI_GOODS_TYPE_NECKLACE = _.KT("UI_GOODS_TYPE_NECKLACE", "项链");
        readonly UI_GOODS_TYPE_TITLE = _.KT("UI_GOODS_TYPE_TITLE", "称号");
        readonly UI_GOODS_TYPE_DECORATION = _.KT("UI_GOODS_TYPE_DECORATION", "饰品");
        readonly UI_GOODS_TYPE_FASHION = _.KT("UI_GOODS_TYPE_FASHION", "时装");
        readonly UI_GOODS_TYPE_FLUOR_STONE = _.KT("UI_GOODS_TYPE_FLUOR_STONE", "荧光宝石");

        /** NPC */
        readonly UI_ACTOR_TYPE_NPC = _.KT("UI_ACTOR_TYPE_NPC", "NPC");
        /** 怪物 */
        readonly UI_ACTOR_TYPE_MONSTER = _.KT("5848", "怪物");
        /** 传送点 */
        readonly UI_ACTOR_TYPE_TELEPORT = _.KT("5849", "传送点");
        /** 掉落预览 */
        readonly UI_TITLE_DROP_PREVIEW = _.KT("13045", "掉落预览");
        /** 消耗 */
        readonly UI_Title_Consumption = _.KT("146", "消耗");
        /** 消耗： */
        readonly UI_Title_Consumption_With_Colon = _.KT("204", "消耗：");
        /** {0}级 */
        readonly UI_Role_Level_Only_Level = _.KT("94", "{0}级");
        /** {0}重{1}级 */
        readonly UI_Role_Level_With_ChangeLife = _.KT("95", "{0}重{1}级");
        /** {0}天{1}小时{2}分{3}秒 */
        readonly UI_Time_Format_WithDay = _.KT("2100", "{0}天{1}小时{2}分{3}秒");
        /** {0}小时{1}分{2}秒 */
        readonly UI_Time_Format_WithHour = _.KT("2099", "{0}小时{1}分{2}秒");
        /** {0}分{1}秒 */
        readonly UI_Time_Format_WithMinute = _.KT("1531", "{0}分{1}秒");
        /** {0}天 */
        readonly UI_Time_Format_OnlyDay = _.KT("97", "{0}天");
        /** {0}小时 */
        readonly UI_Time_Format_OnlyHour = _.KT("546", "{0}小时");
        /** {0}分钟 */
        readonly UI_Time_Format_OnlyMinute = _.KT("239", "{0}分钟");
        /** {0}秒 */
        readonly UI_Time_Format_OnlySecond = _.KT("17", "{0}秒");
        /** 已领取 */
        readonly UI_Reward_HadGet = _.KT("11", "已领取");
        /** 未领取 */
        readonly UI_Reward_NotGet = _.KT("258", "未领取");
        /** 可领取 */
        readonly UI_Reward_CanGet = _.KT("400", "可领取");
        /** 未达成 */
        readonly UI_Reward_NotReach = _.KT("366", "未达成");
        /** 领奖 */
        readonly UI_Reward_Literal_Get = _.KT("1318", "领奖");
        /** 世界地图 */
        readonly UI_MapName_Type_World = _.KT("5845", "世界地图");
        /** 跨服地图 */
        readonly UI_MapName_Type_Cross = _.KT("5846", "跨服地图");
        /** 区域地图 */
        readonly UI_MapName_Type_Local = _.KT("5847", "区域地图");
        /** 七日登录 */
        readonly UI_SysName_Welfare_SevenLogin = _.KT("10992", "七日登录");
        /** 每日福利 */
        readonly UI_SysName_Welfare_DailyWelfare = _.KT("11115", "每日福利");
        /** 在线奖励 */
        readonly UI_SysName_Welfare_OnlineReward = _.KT("10032", "在线奖励");
        /** 等级奖励 */
        readonly UI_SysName_Welfare_GradeReward = _.KT("3349", "等级奖励");
        /** 充值福利 */
        readonly UI_SysName_Welfare_ChargeWelfare = _.KT("10530", "充值福利");
        /** 每日充值 */
        readonly UI_SysName_Welfare_DayCharge = _.KT("648", "每日充值");
        /** 累计消费 */
        readonly UI_SysName_Welfare_Cumulative = _.KT("399", "累计消费");
        /** 潜心修炼 */
        readonly UI_SysName_Welfare_Meditation = _.KT("10030", "潜心修炼");
        /** 冒险 */
        readonly UI_SysName_Activity_Adventure = _.KT("11620", "冒险");
        /** 战场 */
        readonly UI_SysName_Activity_BattleGround = _.KT("11621", "战场");
        /** 每日活跃 */
        readonly UI_SysName_Activity_DailyLiveness = _.KT("3347", "每日活跃");
        /** 商城 */
        readonly UI_SysName_Activity_Mall = _.KT("747", "商城");
        /** 限时抢购 */
        readonly UI_SysName_Mall_BuyLimit = _.KT("10386", "限时抢购");
        /** 钻石商城 */
        readonly UI_SysName_Mall_Diamond = _.KT("10387", "钻石商城");
        /** 红钻商城 */
        readonly UI_SysName_Mall_BindingDiamond = _.KT("10389", "红钻商城");
        /** 银币商城 */
        readonly UI_SysName_Mall_Silver = _.KT("10390", "银币商城");
        /** 角色 */
        readonly UI_SysName_Role = _.KT("1447", "角色");
        /** 背包 */
        readonly UI_SysName_Parcel = _.KT("1080", "背包");
        /** 技能 */
        readonly UI_SysName_Skill = _.KT("11590", "技能");
        /** 图腾 */
        readonly UI_SysName_Totem = _.KT("13809", "图腾");
        /** 虬龙图腾 */
        readonly UI_SysName_Totem_QiuLong = _.KT("13805", "虬龙图腾");
        /** 蛟龙图腾 */
        readonly UI_SysName_Totem_JiaoLong = _.KT("13806", "蛟龙图腾");
        /** 螭龙图腾 */
        readonly UI_SysName_Totem_LiLong = _.KT("13807", "螭龙图腾");
        /** 应龙图腾 */
        readonly UI_SysName_Totem_YingLong = _.KT("13808", "应龙图腾");
        /** 首充 */
        readonly UI_SysName_FirstCharge = _.KT("4447", "首充");
        /** 特惠豪礼 */
        readonly UI_SysName_TeHuiHaoLi = _.KT("80157", "特惠豪礼");
        /** 每日礼包 */
        readonly UI_SysName_DayGift = _.KT("13077", "每日礼包");
        /** 商人 */
        readonly UI_SysName_BusinessMan = _.KT("11170", "商人");
        /** 斗气商人 */
        readonly UI_SysName_BusinessMan_DouQi = _.KT("13234", "斗气商人");
        /** 寻龙商人 */
        readonly UI_SysName_BusinessMan_XunLong = _.KT("13235", "寻龙商人");
        /** 帮会商人 */
        readonly UI_SysName_BusinessMan_BangHui = _.KT("13245", "帮会商人");
        /** 装备副本 */
        readonly UI_SysName_FuBen_Equip = _.KT("13228", "装备副本");

        //#endregion ========================= Language Region Common ==============================

        //#region ========================= Language Region Special ==============================
        /************************************************************************************************************
         ***** 每个系统所特有的文本定义在这个区域
         ************************************************************************************************************/
        readonly UI_LOGIN_USERWRONG = _.KT("UI_LOGIN_USERWRONG", "您输入的用户名或密码错误, 请重新输入后再试...");
        readonly UI_LOGIN_VERSIONWRONG = _.KT("UI_LOGIN_VERSIONWRONG", "登陆用户服务器时失败, 客户端的版本太旧，请更新客户端后再重新登陆");
        readonly UI_LOGIN_USER_NOTEXIST = _.KT("UI_LOGIN_USER_NOTEXIST", "您输入的用户名不存在，请重新输入后再试...");
        readonly UI_LOGIN_USER_NOTEXIST_PLATFORM = _.KT("UI_LOGIN_USER_NOTEXIST_PLATFORM", "平台账号登录验证失败，请重新输入后再试...");
        readonly UI_LOGIN_TOKEN_TIMEOUT = _.KT("UI_LOGIN_TOKEN_TIMEOUT", "登录口令过期,请退出游戏重新登录");
        readonly UI_LOGIN_GS_USEREXIST = _.KT("UI_LOGIN_GS_USEREXIST", "登陆的用户名已经在线，请稍后重新刷新登陆");
        readonly UI_LOGIN_GS_USERBAN = _.KT("UI_LOGIN_GS_USERBAN", "登陆游戏服务器时失败, 你已经被游戏管理员禁止登陆");
        readonly UI_LOGIN_GS_USERFULL = _.KT("UI_LOGIN_GS_USERFULL", "当前服务器在线爆满，您可登录其他服务器进行游戏");
        readonly UI_LOGIN_GS_TIMEOUT = _.KT("UI_LOGIN_GS_TIMEOUT", "登录到游戏服务器超时,请稍后再试");
        readonly UI_LOGIN_GS_FAILED = _.KT("UI_LOGIN_GS_FAILED", "登陆游戏服务器时失败, 错误码:{0}");  // {0}用来格式化错误码
        readonly UI_CONNECT_LOGINSERVER_FAILED = _.KT("UI_CONNECT_LOGINSERVER_FAILED", "连接登录服务器失败，请稍后再试");
        readonly UI_CONNECT_SERVERLIST_FAILED = _.KT("UI_CONNECT_SERVERLIST_FAILED", "连接列表服务器失败，请稍后再试");
        readonly UI_CONNECT_GS_FAILED = _.KT("UI_CONNECT_GS_FAILED", "连接游戏服务器失败，请稍后再试");
        readonly UI_OCCUPATION_LongDan_Desc = _.KT("UI_OCCUPATION_LongDan_Desc", "夸父族的勇士，拥有无与伦比的强大力量.无人可在力量愤怒的释放下逃生，他们手中的拒付手中的拒付手中的拒付");
        readonly UI_OCCUPATION_HuaLing_Desc = _.KT("UI_OCCUPATION_HuaLing_Desc", "温柔的灵族少女，可以与自然万物沟通并借用他们的力量。比起战斗更擅长治愈法术，能够为同伴提供强有力的后方支援。");
        readonly UI_OCCUPATION_QiaoGong_Desc = _.KT("UI_OCCUPATION_QiaoGong_Desc", "出身于洪荒能工巧匠聚集地——百巧堂的天才幼女。灵活操控自制的机巧战偶，拥有强大的远程火力和固若金汤的防御力。");
        readonly UI_OCCUPATION_DouXian_Desc = _.KT("UI_OCCUPATION_DouXian_Desc", "传奇武道“金仙门”的传人。能够施展凌烈的格斗技巧，以及百步穿杨的气劲术。");
        readonly UI_LOGIN_CREATE_STAT_CREATE = _.KT("UI_LOGIN_CREATE_STAT_CREATE", "创建角色");
        readonly UI_LOGIN_SELECT_LEVEL = _.KT("UI_LOGIN_SELECT_LEVEL", "LV:{0}({1}重)");
        readonly UI_LOGIN_CREATE_NAME_EMPTY = _.KT("UI_LOGIN_CREATE_NAME_EMPTY", "抱歉,请输入的您要创建的角色名称");
        readonly UI_LOGIN_CREATE_NAME_ILLEGAL = _.KT("UI_LOGIN_CREATE_NAME_ILLEGAL", "抱歉,您的昵称当中含有非法字符，请重新输入");
        readonly UI_LOGIN_CREATE_NAME_SENSITIVE = _.KT("UI_LOGIN_CREATE_NAME_SENSITIVE", "抱歉,您的昵称当中含有敏感词汇，请重新输入");
        readonly UI_LOGIN_CREATE_NAME_LESS = _.KT("UI_LOGIN_CREATE_NAME_LESS", "抱歉,您输入的角色昵称不能少于2个字，请重新输入");
        readonly UI_LOGIN_CREATE_NAME_MORE = _.KT("UI_LOGIN_CREATE_NAME_MORE", "抱歉,您输入的角色昵称已超过7个字，请重新输入");
        readonly UI_LOGIN_CREATE_ReturnLogin = _.KT("UI_LOGIN_CREATE_ReturnLogin", "返回登录");
        readonly UI_LOGIN_CREATE_ReturnSelectorMode = _.KT("UI_LOGIN_CREATE_ReturnSelectorMode", "选择角色");
        /** [主] */
        readonly UI_TASKNAME_TYPE_MAIN = _.KT("UI_TASKNAME_TYPE_MAIN", "[主]");
        /** [支] */
        readonly UI_TASKNAME_TYPE_VICE = _.KT("UI_TASKNAME_TYPE_VICE", "[支]");
        /** [日常] */
        readonly UI_TASKNAME_TYPE_DailyTask = _.KT("UI_TASKNAME_TYPE_DailyTask", "[日常]");
        /** [引导] */
        readonly UI_TASKNAME_TYPE_GuideTask = _.KT("UI_TASKNAME_TYPE_GuideTask", "[引导]");

        readonly UI_TASKNAME_TYPE_NULL = _.KT("UI_TASKNAME_TYPE_NULL", "未知");
        readonly UI_TASK_EVERYDAY = _.KT("UI_TASK_EVERYDAY", "日常任务");
        /** 【失败】 */
        readonly UI_TASK_FAILURE = _.KT("UI_TASK_FAILURE", "【失败】");
        /** 等级达到{0}后 */
        readonly UI_TASK_NEEDLEVEL = _.KT("UI_TASK_NEEDLEVEL", "等级达到{0}后");
        /** 去[{0}]找{1}对话 */
        readonly UI_TASK_FindAndTalk = _.KT("UI_TASK_FindAndTalk", "去[{0}]找{1}对话");
        /** 去[{0}]找{1}提交 */
        readonly UI_TASK_FindAndSubmit = _.KT("UI_TASK_FindAndSubmit", "去[{0}]找{1}提交");
        /** 去[{0}]找{1}接取 */
        readonly UI_TASK_FindAndAsk = _.KT("UI_TASK_FindAndAsk", "去[{0}]找{1}接取");
        /** 任务已完成，点击领取奖励 */
        readonly UI_TASK_CompleteAndAward = _.KT("11059", "任务已完成，点击领取奖励");
        /** 等级不足，无法前往目标地图！ */
        readonly UI_TASK_LevelNotEnough = _.KT("UI_TASK_LevelNotEnough", "等级不足，无法前往目标地图！");
        readonly UI_TASK_立即重生 = _.KT("UI_TASK_立即重生", "立即重生");
        readonly UI_TASK_领取奖励 = _.KT("UI_TASK_领取奖励", "领取奖励");
        readonly UI_TASK_立即前往 = _.KT("UI_TASK_立即前往", "立即前往");
        readonly UI_TASK_Failed_BagFull = _.KT("UI_TASK_Failed_BagFull", "背包已满，请清理出空位后再提交任务: {0}");
        readonly UI_TASK_Failed_NotInRiding = _.KT("UI_TASK_Failed_NotInRiding", "坐骑任务提交时，必须处于骑乘状态: {0}");
        readonly UI_TASK_Failed_Other = _.KT("UI_TASK_Failed_Other", "提交任务时失败: {0}");
        readonly UI_NEWTASK_Failed_BagFull = _.KT("UI_NEWTASK_Failed_BagFull", "背包已满，请先清理出空格再接受新任务【{0}】");
        readonly UI_NEWTASK_Failed_Other = _.KT("UI_NEWTASK_Failed_Other", "添加新任务失败【{0}】");
        /** 路径信息格式错误 , 无法自动寻路 */
        readonly UI_TASK_Failed_InvalidPath = _.KT("UI_TASK_Failed_InvalidPath", "路径信息格式错误 ,无法自动寻路");
        /** 击杀{ 0}级以上的怪*/
        readonly UI_TASK_Target_KillMonsterForLevel = _.KT("UI_TASK_Target_KillMonsterForLevel", "击杀{0}级以上的怪");
        /** 击杀[{0}]{1} 获取{2} */
        readonly UI_TASK_Target_MonsterSomething = _.KT("UI_TASK_Target_MonsterSomething", "击杀[{0}]{1} 获取{2}");
        /* 击杀[{0}]{1} */
        readonly UI_TASK_Target_KillMonster = _.KT("UI_TASK_Target_KillMonster", "击杀[{0}]{1}");
        readonly Transport_Failed_SameMap = _.KT("Transport_Failed_SameMap", "已经在要传送的地图中了");
        /** "奉神" */
        readonly UI_ROLENAME_FENGSHEN = _.KT("UI_ROLENAME_FENGSHEN", "奉神");
        /** "弑神" */
        readonly UI_ROLENAME_SHASHEN = _.KT("UI_ROLENAME_SHASHEN", "弑神");
        /** 通用 */
        readonly UI_OCCUPATION_COMMON_USE = _.KT("UI_OCCUPATION_COMMON_USE", "通用");
        /** 经验 */
        readonly UI_AWARDS_TYPE_JINGYAN = _.KT("UI_AWARDS_TYPE_JINGYAN", "经验");
        /** 奖励 */
        readonly UI_AWARDS_TYPE_Awards = _.KT("UI_AWARDS_TYPE_Awards", "奖励");
        /** 【{0}】地图中禁止挂机 */
        readonly AUTO_FIGHT_NOT_ALLOWED = _.KT("AUTO_FIGHT_NOT_ALLOWED", "【{0}】地图中禁止挂机");
        /** 奖励已领取过 */
        readonly UI_COMMON_奖励已领取过 = _.KT("12346", "奖励已领取过!");
        /** 背包已满 */
        readonly UI_COMMON_背包已满 = _.KT("4709", "背包已满!");
        /** 达到{0}重{1}级后领取 */
        readonly UI_COMMON_REACHRECEIVE = _.KT("12044", "达到{0}重{1}级后领取");
        /** 完成{0}个任务后领取 */
        readonly UI_COMMON_REACHTASKRECEIVE = _.KT("12045", "完成{0}个任务后领取");
        /** {49BD1B}已完成{-}\r\n点击领取奖励 */
        readonly UI_COMMON_REACHCLICKRECEIVE = _.KT("11460", "{49BD1B}已完成{-}\r\n点击领取奖励");
        /** 达到{0}重{1}级后\r\n解锁 */
        readonly UI_COMMON_达成等级解锁 = _.KT("11461", "达到{0}重{1}级后\r\n解锁");
        /** 完成{0}个任务后\r\n获得 */
        readonly UI_COMMON_完成任务条件获得 = _.KT("11589", "完成{0}个任务后\r\n获得");
        /** 贵族2以上玩家点击传送 */
        readonly UI_MAP_TRANSFER_TIP = _.KT("5850", "贵族2以上玩家点击传送");
        /** 阵营战中无法使用传送功能 */
        readonly UI_Transfer_Failure_In_BattleMap = _.KT("6214", "阵营战中无法使用传送功能");
        /** 龙影城战中无法使用传送功能 */
        readonly UI_Transfer_Failure_In_ChengZhan = _.KT("UI_Transfer_Failure_In_ChengZhan", "龙影城战中无法使用传送功能");
        /** 等级未达到{0}重{1}级无法传送 */
        readonly UI_Transfer_Failure_Because_RoleLv = _.KT("2293", "等级未达到{0}重{1}级无法传送");
        /** 相同地图，不需要传送 */
        readonly UI_Transfer_Failure_Same_Map = _.KT("5851", "相同地图，不需要传送！");
        /** 贵族 */
        readonly UI_VIP_Title = _.KT("326", "贵族");
        /** 累计充值 */
        readonly UI_VIP_LeiJiChongZhi = _.KT("398", "累计充值");
        /** 贵族{0}特权 */
        readonly UI_VIP_PrivilegeLevelTitle = _.KT("11616", "贵族{0}特权");
        /** 贵族特权 */
        readonly UI_VIP_PrivilegeTitle = _.KT("11617", "贵族特权");
        /** 贵族特权大礼包 */
        readonly UI_VIP_PrivilegeReward = _.KT("11618", "贵族特权大礼包");
        /** ,即可升级到 */
        readonly UI_VIP_JiKeShengJi = _.KT("11619", ",即可升级到");
        /** 充值 */
        readonly UI_VIP_ChongZhiTitle = _.KT("27", "充值");
        /** 贵族等级不足{0}级 */
        readonly UI_VIP_贵族等级不足X级 = _.KT("13635", "贵族等级不足{0}级");
        /** 领取 */
        readonly UI_COMMON_LingQu = _.KT("4", "领取");
        /** 贵族等级不够，无法领取！ */
        readonly UI_VIP_贵族等级不够无法领取 = _.KT("4691", "贵族等级不够，无法领取！");
        /** 领取失败！ */
        readonly UI_VIP_GetLose = _.KT("1525", "领取失败！");
        /** 此奖励已经领取！ */
        readonly UI_VIP_RewardAlwaysGet = _.KT("4692", "此奖励已经领取！");
        /** 背包已满，请清理背包后再领取！ */
        readonly UI_COMMON_背包已满请清理背包后再领取 = _.KT("4693", "背包已满，请清理背包后再领取！");
        /** 该功能暂未开放，敬请期待。 */
        readonly UI_COMMON_FunNoOpen = _.KT("79", "该功能暂未开放，敬请期待。");
        /** 七日超值奖励，每天登录就送 */
        readonly UI_SEVENDAYLOGIN_Desc = _.KT("11061", "七日超值奖励，每天登录就送");

        /** 第{0}天 */
        readonly UI_SEVENDAYLOGIN_第X天 = _.KT("10993", "第{0}天");
        /** 不在活动时间 */
        readonly UI_SEVENDAYLOGIN_NoActTimes = _.KT("3980", "不在活动时间");
        /** 服务器配置出错 */
        readonly UI_SEVENDAYLOGIN_ServerConfigError = _.KT("440", "服务器配置出错");
        /** 背包不足 */
        readonly UI_SEVENDAYLOGIN_BagNoHas = _.KT("3941", "背包不足");
        /** 数据库异常 */
        readonly UI_SEVENDAYLOGIN_DataBaseError = _.KT("3981", "数据库异常");
        /** 不满足领奖条件 */
        readonly UI_SEVENDAYLOGIN_不满足领奖条件 = _.KT("441", "不满足领奖条件");
        /** 客户端访问参数错误 */
        readonly UI_SEVENDAYLOGIN_客户端访问参数错误 = _.KT("3982", "客户端访问参数错误");
        /** 钻石不足 */
        readonly UI_SEVENDAYLOGIN_DiamondNoHas = _.KT("32", "钻石不足");
        /** 可抢购数量不足 */
        readonly UI_SEVENDAYLOGIN_可抢购数量不足 = _.KT("3983", "可抢购数量不足");
        /** 领取奖励错误:{0} */
        readonly UI_SEVENDAYLOGIN_GetRewardError = _.KT("187", "领取奖励错误:{0}");
        /** 战力： */
        readonly UI_COMMON_ZhanliTitle = _.KT("137", "战力：");
        /** 可抽取 */
        readonly UI_Welfare_Reward_CanExtract = _.KT("3373", "可抽取");
        /** 今日在线时长{0}，今日还有{1}个奖励没有领取 */
        readonly UI_Welfare_Online_NotGet = _.KT("3378", "今日在线时长{0}，今日还有{1}个奖励没有领取");
        /** 今日在线时长{0}，今日奖励已全部领取 */
        readonly UI_Welfare_Online_AllGet = _.KT("3379", "今日在线时长{0}，今日奖励已全部领取");
        /** 今日在线时长{0}，请点击{1}按钮领取奖励 */
        readonly UI_Welfare_Online_CanGet = _.KT("3380", "今日在线时长{0}，请点击{1}按钮领取奖励");
        /** 还没到领取下一奖励的时间 */
        readonly UI_Online_Get_Failure_TimeNotEnough = _.KT("4633", "还没到领取下一奖励的时间");
        /** 领取失败，背包空间不足！ */
        readonly UI_Welfare_Get_Failure_GridNotEnough = _.KT("199", "领取失败，背包空间不足！");
        /** 今日奖励已经抽取完成 */
        readonly UI_Online_Get_Failure_AllHadExtract = _.KT("455", "今日奖励已经抽取完成");
        /** 需要{0} */
        readonly UI_Format_Need_Condition = _.KT("13727", "需要{0}");
        /** 您当前等级未达到要求 */
        readonly UI_Grade_Get_Failure_LevelNotEnough = _.KT("1642", "您当前等级未达到要求");
        /** 您已领取过该等级奖励,无法再次进行领取 */
        readonly UI_Grade_Get_Failure_GradeHadGet = _.KT("4593", "您已领取过该等级奖励,无法再次进行领取");
        /** 已经修炼： */
        readonly UI_Meditation_Title_HadMeditationTime = _.KT("11681", "已经修炼：");
        /** 获得星魂： */
        readonly UI_Meditation_Title_Get_XingHun = _.KT("11682", "获得星魂：");
        /** {0}% */
        readonly UI_Format_Percent = _.KT("2621", "{0}%");
        /** (已满) */
        readonly UI_MingXiang_Time_Full = _.KT("3902", "(已满)");
        /** 查看详情 */
        readonly UI_COMMON_ViewDetails = _.KT("686", "查看详情");
        /** 原价： */
        readonly UI_COMMON_YuanJia = _.KT("11145", "原价：");
        /** 现价： */
        readonly UI_COMMON_XianJia = _.KT("11144", "现价：");
        /** 剩余： */
        readonly UI_COMMON_ShengYu = _.KT("13374", "剩余：");
        /** 限购： */
        readonly UI_COMMON_XianGou = _.KT("13373", "限购：");

        /** 购买的物品已经从商城中下架了 */
        readonly UI_COMMON_BuyGoodsAlwaysXiaJia = _.KT("754", "购买的物品已经从商城中下架了");
        /** 背包已满，请清理出空格后再购买 */
        readonly UI_COMMON_BagFull_请清理出空格后再购买 = _.KT("154", "背包已满，请清理出空格后再购买");
        /** 该商品已经出售完毕 */
        readonly UI_COMMON_GoodsAlwaysSoldOver = _.KT("4519", "该商品已经出售完毕");
        /** 购买个数超过总剩余个数 */
        readonly UI_COMMON_BuyNumsMoreThan = _.KT("4520", "购买个数超过总剩余个数");
        /** 抢购限额已达上限，无法购买 */
        readonly UI_COMMON_BuyNumsMoreThan1 = _.KT("4521", "抢购限额已达上限，无法购买");
        /** 购买个数超过购买限额剩余个数 */
        readonly UI_COMMON_BuyNumsMoreThan2 = _.KT("4522", "购买个数超过购买限额剩余个数");
        /** 从商城购买物品失败:{0} */
        readonly UI_COMMON_BuyMallGoodsFailure = _.KT("453", "从商城购买物品失败:{0}");
        /** 已结束 */
        readonly UI_COMMON_FinishedTitle = _.KT("688", "已结束");
        /** {0}分钟{1}秒 */
        readonly UI_COMMON_X分钟X秒 = _.KT("421", "{0}分钟{1}秒");
        /** {0}小时{1}分钟{2}秒 */
        readonly UI_COMMON_X小时X分钟X秒 = _.KT("138", "{0}小时{1}分钟{2}秒");
        /** 购买 */
        readonly UI_COMMON_BuyTitle = _.KT("19", "购买");
        /** 钻石 + {0} */
        readonly UI_COMMON_DiamondAddX = _.KT("4527", "钻石 + {0}");
        /** 金币 + {0} */
        readonly UI_COMMON_JinBiAddX = _.KT("4530", "金币 + {0}");
        /** 绑定钻石 +  */
        readonly UI_COMMON_BindDiamondAddX = _.KT("4532", "绑定钻石 + ");
        /** 购买的物品已经从商城中下架了  */
        readonly UI_COMMON_BuyGoodsXiaJia = _.KT("754", "购买的物品已经从商城中下架了 ");
        /** 今日此物品的阵旗购买的数量已满  */
        readonly UI_COMMON_BuyGoodsNumsFull = _.KT("4526", "今日此物品的阵旗购买的数量已满 ");
        /** 您获得了: {0}  */
        readonly UI_COMMON_GetGoodsX = _.KT("11637", "您获得了: {0} ");
        /** 附{0}  */
        readonly UI_COMMON_FuX = _.KT("12572", "附{0} ");
        /** 潜心修炼状态被终止 */
        readonly UI_Meditation_End_Meditation = _.KT("11683", "潜心修炼状态被终止");
        /** 潜心修炼收益: */
        readonly UI_Meditation_Title_Earning = _.KT("11143", "潜心修炼收益:");
        /** 免费1倍 */
        readonly UI_Meditation_Radio_Free = _.KT("1003", "免费1倍");
        /** 2倍 */
        readonly UI_Meditation_Radio_Double = _.KT("3916", "2倍");
        /** 4倍 */
        readonly UI_Meditation_Radio_Quadruple = _.KT("3917", "4倍");
        /** 没有可领取的经验 */
        readonly UI_Meditation_Get_Failure_NoExp = _.KT("3912", "没有可领取的经验");
        /** 此功能需要贵族等级，跨服地图中不能进行充值！ */
        readonly UI_Meditation_NeedVip_CanntTopup_BecCross = _.KT("1487", "此功能需要贵族等级，跨服地图中不能进行充值！");
        /** 0分 */
        readonly UI_Meditation_NoMeditationTime = _.KT("12250", "0分");
        /** 需要贵族{0}级可解锁此功能,是否充值? */
        readonly UI_Format_NeedVipLevel_IfGoToTopup = _.KT("1488", "需要贵族{0}级可解锁此功能,是否充值?");
        /** 金币不足,无法领取 */
        readonly UI_Get_Failure_GoldNotEnough = _.KT("3913", "金币不足,无法领取");
        /** 钻石不足,无法领取 */
        readonly UI_Get_Failure_DiamondNotEnough = _.KT("3914", "钻石不足,无法领取");
        /** 贵族等级不足 */
        readonly UI_Get_Failure_VipLevelNotEnough = _.KT("1650", "贵族等级不足");
        /** 获得经验：{0} */
        readonly UI_Format_Hint_GetExp2 = _.KT("1809", "获得经验：{0}");
        /** 立即领取  */
        readonly UI_COMMON_PromptlyGet = _.KT("251", "立即领取");
        /** 功能 */
        readonly UI_Common_Title_Function = _.KT("4259", "功能");
        /** 任务奖励 */
        readonly UI_Common_TItle_TaskReward = _.KT("4031", "任务奖励");
        /** 类型:  */
        readonly UI_GoodsTip_Title_Type = _.KT("11750", "类型: ");
        /** 使用等级:  */
        readonly UI_GoodsTip_Title_Level = _.KT("3122", "使用等级: ");
        /** 适用职业:  */
        readonly UI_GoodsTip_Title_Occupation = _.KT("1241", "适用职业: ");
        /** 个人信息 */
        readonly UI_Role_Title_PersonInfo = _.KT("746", "个人信息");
        /** 基础属性 */
        readonly UI_Role_Title_BaseAttr = _.KT("1345", "基础属性");
        /** 战斗属性 */
        readonly UI_Role_Title_FightAttr = _.KT("11131", "战斗属性");
        /** 属性加点 */
        readonly UI_Role_Title_Button_AddPoint = _.KT("11119", "属性加点");
        /** 详细属性 */
        readonly UI_Role_Title_Button_Detail = _.KT("1463", "详细属性");
        /** 职业： */
        readonly UI_Role_Title_Occupation = _.KT("13268", "职业：");
        /** 等级： */
        readonly UI_Role_Title_Level = _.KT("13269", "等级：");
        /** 帮会： */
        readonly UI_Role_Title_Family = _.KT("13270", "帮会：");
        /** 头衔： */
        readonly UI_Role_Title_Title = _.KT("13271", "头衔：");
        /** PK值： */
        readonly UI_Role_Title_PK = _.KT("13272", "PK值：");
        /** 夫妻： */
        readonly UI_Role_Title_Sopuse = _.KT("13273", "夫妻：");
        /** 今日充值  */
        readonly UI_COMMON_TodayCharge_Title = _.KT("1315", "今日充值");
        /** 一键领取  */
        readonly UI_COMMON_AllGet = _.KT("13196", "一键领取");
        /** 每日0点计时  */
        readonly UI_COMMON_DayTime_Title = _.KT("11470", "每日0点计时");
        /** 每日倒计时:  */
        readonly UI_COMMON_DayCountDownTime_Title = _.KT("11471", "每日倒计时:");
        /** 暂无可领取的奖励  */
        readonly UI_COMMON_NoCanGetReward = _.KT("13197", "暂无可领取的奖励");
        /** 提示:\r\n1.拖拽左侧技能到相应的技能槽位，即可调整技能配置；或者先选择技能槽位，在挑选技能。\r\n1.战斗过程中可以随时切换技能组合。  */
        readonly UI_COMMON_SkillConfigTitle = _.KT("11132", "提示:\r\n1.拖拽左侧技能到相应的技能槽位，即可调整技能配置；或者先选择技能槽位，在挑选技能。\r\n1.战斗过程中可以随时切换技能组合。");
        /** 【图腾描述】{0}"  */
        readonly UI_COMMON_TotemDescTitle = _.KT("14112", "【图腾描述】{0}");
        /** 完成任务:{0}  */
        readonly UI_COMMON_FinishTask = _.KT("13913", "完成任务:{0}");
        /** 等级达到:{0}  */
        readonly UI_COMMON_LevelAchieve = _.KT("13914", "等级达到:{0}");
        /**  贵族等级达到：{0}  */
        readonly UI_COMMON_VipAchieve = _.KT("13916", " 贵族等级达到：{0}");
        /**  【图腾效果】获得技能：{0} {1}  */
        readonly UI_COMMON_TotemGetSkillTitle = _.KT("13812", " 【图腾效果】获得技能：{0} {1}");
        /**  查看  */
        readonly UI_COMMON_LookTitle = _.KT("283", " 查看");
        /**  【失败】  */
        readonly UI_COMMON_Failure = _.KT("210", " 【失败】");
        /**  请获得{0}后\r\n  */
        readonly UI_COMMON_PleaseGet_Title = _.KT("14017", " 请获得{0}后\r\n");
        /**  [主]  */
        readonly UI_TASK_ZhuXian_Title = _.KT("470", " [主]");
        /** 等级达到{0}后\r\n  */
        readonly UI_TASK_LevelAchieveEnter = _.KT("209", " 等级达到{0}后\r\n");
        /** 去[{0}]找{1}购买{2}  */
        readonly UI_TASKMINI_GoNpc_Buy = _.KT("1943", " 去[{0}]找{1}购买{2}");
        /** 购买{0}  */
        readonly UI_TASKMINI_GoBuy_Goods = _.KT("1944", " 购买{0}");
        /** 去({0})使用{1}  */
        readonly UI_TASKMINI_GoMap_Use = _.KT("1945", " 去({0})使用{1}");
        /** 使用{0}  */
        readonly UI_TASKMINI_Use_Goods = _.KT("1946", " 使用{0}");
        /** 将{0}交给[{1}]{2}  */
        readonly UI_TASKMINI_Goods_To_Npc = _.KT("1947", " 将{0}交给[{1}]{2}");
        /** 得到{0}  */
        readonly UI_TASKMINI_Get_Goods = _.KT("1948", " 得到{0}");
        /** 充值一钻石与[{0}]{1}对话  */
        readonly UI_TASKMINI_Charge_Diamond_NpcTalk = _.KT("1949", " 充值一钻石与[{0}]{1}对话");
        /** 到[{0}]采集{1}  */
        readonly UI_TASKMINI_To_CaiJi = _.KT("1950", " 到[{0}]采集{1}");
        /** 使用{2}治疗[{0}]{1}  */
        readonly UI_TASKMINI_Use_ZhiLiao = _.KT("1951", "使用{2}治疗[{0}]{1}");
        /** 火烧[{0}]{1} */
        readonly UI_TASKMINI_HuoShao = _.KT("1952", " 火烧[{0}]{1}");
        /** 今日可兑:{0} */
        readonly UI_Bussiness_TodayCanDui = _.KT("1500", " 今日可兑:{0}");
        /** 提示：每次购买斗气可获得20积分 */
        readonly UI_Bussiness_XunLongTiShiTetxt = _.KT("12253", " 提示：每次购买斗气可获得20积分")
        /** 需要帮会等级{0} */
        readonly UI_Bussiness_NeedBangHuiLevel = _.KT("3924", " 需要帮会等级{0}");

        /** 兑换失败，当前积分值不足! */
        readonly UI_Bussiness_DuiHuanLose_NoJiFen = _.KT("3929", " 兑换失败，当前积分值不足!");
        /** 兑换失败，兑所需背包中的物品不足！ */
        readonly UI_Bussiness_DuiHuanLose_NoBagGoods = _.KT("3930", " 兑换失败，兑所需背包中的物品不足！");
        /** 兑换失败，物品扣除失败！ */
        readonly UI_Bussiness_DuiHuanLose_GoodsKouChu = _.KT("3931", " 兑换失败，物品扣除失败！");
        /** 兑换失败，背包空间不足！ */
        readonly UI_Bussiness_DuiHuanLose_NoBagGird = _.KT("3932", " 兑换失败，背包空间不足！");
        /** 今日兑换次数已使用完！ */
        readonly UI_Bussiness_DuiHuanLose_ToDayNums = _.KT("3933", " 今日兑换次数已使用完！");
        /** 斗气值不足 */
        readonly UI_Bussiness_DuiHuanLose_DouQiNotEnough = _.KT("1347", " 斗气值不足");
        /** {0}阶 */
        readonly UI_Tips_TextFormat_Jie = _.KT("12677", " {0}阶");
        /** {0}内通关 */
        readonly UI_EquipFuBen_Seconds_TongGuan = _.KT("4925", " {0}内通关");
        /** 普通模式 */
        readonly UI_EquipFuBen_Mode_TuTong = _.KT("11702", " 普通模式");
        /** 困难模式 */
        readonly UI_EquipFuBen_Mode_KunNan = _.KT("11703", " 困难模式");
        /** 炼狱模式 */
        readonly UI_EquipFuBen_Mode_LianYu = _.KT("11704", " 炼狱模式");
        /** 完成次数: */
        readonly UI_EquipFuBen_CompleteNums = _.KT("6189", " 完成次数:");
        /** 通关[{0}] */
        readonly UI_EquipFuBen_TongGuanText = _.KT("4928", " 通关[{0}]");
        /** 【{0}】 */
        readonly UI_Common_FuHao = _.KT("10", "【{0}】");
        /** 需要完成主线任务 */
        readonly UI_Task_NeedFinishMianTask = _.KT("1580", "需要完成主线任务");
        /** 自动将蓝色及以下装备回收为斗气 */
        readonly UI_EquipFuBen_DouQiHuiShouText = _.KT("13746", "自动将蓝色及以下装备回收为斗气");
        /** 扫荡 */
        readonly UI_EquipFuBen_SaoDangText = _.KT("663", "扫荡");
        /** 挑战 */
        readonly UI_EquipFuBen_TiaoZhanText = _.KT("241", "挑战");
        /** 未达到扫荡该副本的条件!,无法扫荡副本 */
        readonly UI_EquipFuBen_NoCanSaoDangFuBen = _.KT("1382", "未达到扫荡该副本的条件!,无法扫荡副本");
        /** 【{0}】副本进入次数达到上限,无法扫荡副本 */
        readonly UI_EquipFuBen_FuBenEnterNumsCeiling = _.KT("1383", "【{0}】副本进入次数达到上限,无法扫荡副本");
        /** 未达到副本进入等级条件，无法进入该副本 */
        readonly UI_EquipFuBen_NoCanEnter_Level = _.KT("665", "未达到副本进入等级条件，无法进入该副本");
        /** 您今天进入【{0}】副本的次数已经达到了最大限制,不允许扫荡! */
        readonly UI_EquipFuBen_FuBenNameNoCanEnter_Nums = _.KT("1720", "您今天进入【{0}】副本的次数已经达到了最大限制,不允许扫荡!");

        //#endregion ========================= Language Region Special ==============================
    }
}