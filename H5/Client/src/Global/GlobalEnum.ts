// 这个文件中放置一些全局定义的枚举

/** 游戏模块枚举 */
enum EnumGameMode {
    Invalid = -1,               // 无效的模块
    Logo = 0,                   // Logo模块
    ShowStartupAlerts,          // 显示警告信息,如防沉迷信息等.
    Loading,                    // 资源加载模块
    Login,                      // 登陆模块
    Selector,                   // 选择角色模块
    Creator,                    // 创建角色模块
    Playing,                    // 游戏中模块
    RobotTesting,               // 机器测试中
}

/** UI层枚举.注: 值越小越先渲染,值越大越后渲染 */
enum UILayer {
    Invalid = -1,
    /** 交互层，用来监听场景中模型点击的检测 */
    Interaction,
    /** 调试信息显示层 */
    Debug,
    /**头顶图标层 */
    RoleTitle,
    /**伤害数字显示层*/
    Hurt,
    /** View界面层,如左上角的角色头像等不可以被关闭,常驻的界面 */
    View,
    /** 功能窗口层,如背包,NPC对话界面 */
    Window,
    /** 加载进度层 */
    Loading,
    /** 网络消息等待层 */
    NetWaiting,
    /** 提示层 */
    Hint,
    /** 层个数 */
    Max
}

/**
* 职业枚举
*/
enum EnumOccupation {
    Invalid = -1,   // 无效值
    LongDan = 0,    // 龙胆
    HuaLing = 1,    // 花灵
    QiaoGong = 2,   // 巧工
    DouXian = 4,    // 斗仙
    /** 职业个数 */
    Max = 3,

    OpenedNumber = 3,   // 定义已经开放的职业数量
}

/**
 * 性别枚举
 */
enum EnumSex {
    /** 无效值 */
    Invalid = -1,
    /** 男性 */
    Male = 0,
    /** 女性 */
    Female = 1
}

/** 身体的部分ID */
enum BodyPartIDs {
    Invalid = -1,   // 无效值
    Head = 0,       // 头部
    Chest = 1,      // 胸部
    Hand = 2,       // 手部
    Leg = 3,        // 腿部
    Foot = 4,       // 脚部
    Max,            // 最大值
}

/** 物品种类 */
enum ItemCategories {
    /** 无效种类 */
    Invalid = -1,
    /** 任务道具 */
    ItemTask = 50,
    /** 骑宠类 */
    ItemHorsePet = 60,
    /** 书籍类 */
    ItemBook = 70,
    /** 杂物类 */
    ItemOther = 80,
    /** 宝石类 */
    ItemJewel = 90,
    /** 卷轴类 */
    ItemMagic = 100,
    /** 合成材料类 */
    ItemMakings = 110,
    /** 消耗材料类 (包括装备、坐骑等进阶强化等需要消耗的材料) */
    ItemMaterial = 120,
    /** 萌宠蛋类 */
    ItemMengchongEgg = 130,
    /** 药品类 */
    ItemDrug = 180,
    /** 一次性增加属性 (经验、灵力、货币等直接给角色增加数值) */
    ItemAddVal = 230,
    /** 包括临时加攻、防等道具，以及储备类、双倍经验、灵力类的道具 */
    ItemBuffer = 250,
    /** 经脉类物品 */
    JingMai = 251,
    /** 武学类物品 */
    WuXue = 252,
    /** 成就类物品 */
    ChengJiu = 253,
    /** 荣耀护体 */
    RongYuHuTi = 255,
    /** 战魂护体 */
    ZhanHunHuTi = 256,
    /** 战旗护体 */
    BangQiHuTi = 258,
    /** 普通包裹 */
    ItemNormalPack = 301,
    /** 升级包裹 */
    ItemUpPack = 302,
    /** 银两包 */
    YinLiangPack = 401,
    /** 金币包 */
    MoneyPack = 501,
    /** 神龙大陆怪物精魄 */
    MonsterSoul = 600,
    /** 绑定金币符 */
    BindMoneyFu = 601,
    /** 宝箱类型 -- 点击后掉落物品在地上 */
    TreasureBox = 701,

    /** 元素之心定义开始 */
    HeartStart = 800,
    /** 钢铁之心 */
    GangtieHeart = 800,
    /** 愤怒之心 */
    FengnuHeart = 801,
    /** 王者之心 */
    WangzeHeart = 802,
    /** 坚韧之心 */
    JianrenHeart = 803,
    /** 守护之心 */
    ShouhuHeart = 804,
    /** 强壮之心 */
    QiangzhuangHeart = 805,
    /** 强攻之心 */
    QianggongHeart = 806,
    /** 不屈之心 */
    BuquHeart = 807,
    /** 平静之心 */
    PingjinHeart = 808,
    /** 警觉之心 */
    JingjueHeart = 809,
    /** 厌恶之心 */
    YanwuHeart = 810,
    /** 元素之心定义结束 */
    HeartEnd = 810,

    /** 时装-翅膀 */
    Fashion_Wing = 700,
    /** 时装-称号 */
    Fashion_Title = 702,
    /** 荧光宝石 */
    FluorescentDiamond = 901,

    /** 魂石定义开始 */
    SoulCometStoneStart = 910,
    /** 魂石精华 */
    SoulCometStone_Essence = 910,
    /** 魂石-火 */
    SoulCometStone_Fire = 911,
    /** 魂石-雷 */
    SoulCometStone_Thurder = 912,
    /** 魂石-风 */
    SoulCometStone_Wind = 913,
    /** 魂石-水 */
    SoulCometStone_Water = 914,
    /** 魂石-冰 */
    SoulCometStone_Ice = 915,
    /** 魂石-土 */
    SoulCometStone_Earth = 916,
    /** 魂石-光 */
    SoulCometStone_Guang = 917,
    /** 魂石-电 */
    SoulCometStone_Dian = 918,
    /** 魂石-极 */
    SoulCometStone_Ji = 919,
    /** 魂石-冷 */
    SoulCometStone_Leng = 920,
    /** 魂石-霜 */
    SoulCometStone_Shuang = 921,
    /** 魂石-热 */
    SoulCometStone_Re = 922,
    /** 魂石-爆 */
    SoulCometStone_Bao = 923,
    /** 魂石-云 */
    SoulCometStone_Yun = 924,
    /** 魂石-漫 */
    SoulCometStone_Man = 925,
    /** 魂石-雪 */
    SoulCometStone_Xue = 926,
    /** 魂石-封 */
    SoulCometStone_Feng = 927,
    /** 魂石-赤 */
    SoulCometStone_Chi = 928,
    /** 魂石定义结束 */
    SoulCometStoneEnd = 928,

    // 新的命名故意使用拼音命名，来避免和以前的混淆，防止修改时无法发现出错
    /** 头盔 */
    TouKui = 0,
    /** 铠甲 */
    KaiJia = 1,
    /** 护手 */
    HuShou = 2,
    /** 护腿 */
    HuTui = 3,
    /** 靴子 */
    XueZi = 4,
    /** 项链 */
    XiangLian = 5,
    /** 戒指 */
    JieZhi = 6,
    /** 坐骑 */
    JieHunJieZhi = 7,
    /** 翅膀 */
    ChiBang = 8,
    /** 守护宠物 */
    ShouHuChong = 9,
    /** 跟随宠物 */
    ChongWu = 10, // 神龙大陆暂不使用该类型，所有坐骑的类型为9

    //#region 武器类型
    /** 武器类型开始 */
    WeaponStart = 11,
    /** 武器-剑 */
    WuQi_Jian = 11,
    /** 武器-斧 */
    WuQi_Fu = 12,
    /** 武器-槌 */
    WuQi_Chui = 13,
    /** 武器-弓 */
    WuQi_Gong = 14,
    /** 武器-弩 */
    WuQi_Nu = 15,
    /** 武器-矛 */
    WuQi_Mao = 16,
    /** 武器-杖 */
    WuQi_Zhang = 17,
    /** 武器-盾 */
    WuQi_Dun = 18,
    /** 武器-刀 */
    WuQi_Dao = 19,
    /** 武器-弓箭筒 */
    WuQi_GongJianTong = 20,
    /** 武器-弩箭筒 */
    WuQi_NuJianTong = 21,
    /** 武器类型结束 */
    WeaponEnd = 21,
    //#endregion 武器类型

    /** 护身符 */
    HuFu = 22,
    /** 饰品 */
    Decoration = 23,
    /** 时装（周年庆） */
    Fashion = 24,
    /** 萌宠 */
    MengChongWu = 25,
    /** 装备最大值 */
    EquipMax = 26
}

/** 道具品质枚举 */
enum GoodsQuality {
    White = 0,
    Green = 1,
    Blue = 2,
    Purple = 3,
    FlashPurple = 4,
    Gold = 5,
    Max
}

enum GoodsColor {
    White = 1,
    Green = 2,
    Blue = 3,
    Purple = 4,
    Gold = 5,
    Max = 6
}

/**
 * 定义角色的类型
 */
enum EActorType {
    Invalid = -1,       // 无效值
    LocalPlayer = 0,    // 本地玩家，主角
    NetPlayer,          // 网络玩家
    Monster,            // 怪物
    NPC,                // 功能NPC
    Pet,                // 宠物
    BiaoChe,            // 镖车
    JunQi,              // 战旗
    FakeRole,           // 假人
    GoodsPack,          // 掉落包裹

    // 下面是新加的Actor类型（因为目前所有世界对象都是基于AActor，所以会比之前多一些类型）
    /** 传送点 */
    Teleport,
}

/**
 * 外部设置的强制阻挡的类型位设置
 */
enum ForceHoldBitSets {
    None = 0,           // 无
    HoldRole = 0x01,    // 强制角色阻挡
    HoldMonster = 0x02, // 强制怪物阻挡
    HoldNPC = 0x04,     // 强制NPC阻挡
}

/**
 * NPC的任务状态类型
 */
enum NPCTaskStates {
    NONE = 0,       // 无
    NEWTASK = 1,    // 有新任务 
    DOINGTASK = 2,  // 有未完成任务
    OKTASK = 3,     // 有完成任务
}

/**
 * 对象ID的类型分配的区间范围
 * 32位整数最大值为2,147,483,648
 * ==========Client-Only========
 * 6F00 0000 = 1,862,270,976
 * 6F50 0000 = 1,867,513,856
 * ==========Server-Syn=========
 * 7F00 0000 = 2,130,706,432
 * 7F01 0000 = 2,130,771,968
 * 7F40 0000 = 2,134,900,736
 * 7F41 0000 = 2,134,966,272
 * 7F42 0000 = 2,135,031,808
 * 7F43 0000 = 2,135,097,344
 * 7F50 0000 = 2,135,949,312
 */
namespace SpriteBaseIds {
    // ======================= Client使用的BaseId ============================
    const ClientBaseId = 0x6F000000; // Client的BaseId开始
    export const TeleportBaseId = ClientBaseId;
    const ClientEndBaseId = 0x6F500000; // Client的BaseId结束

    // ======================= Server同步的BaseId ============================
    const ServerSynBaseId = 0x7F000000; // Server同步的BaseId开始
    // export const RoleBaseId      = 0;
    export const NpcBaseId = ServerSynBaseId;
    export const MonsterBaseId = 0x7F010000;
    export const PetBaseId = 0x7F400000;
    export const BiaoCheBaseId = 0x7F410000;
    export const JunQiBaseId = 0x7F420000;
    export const FakeRoleBaseId = 0x7F430000;
    export const MaxId = 0x7F500000;
    const ServerSynEndBaseId = MaxId; // Server同步的BaseId结束

    /**
     * 获取传送点在当前场景中的唯一对象ID（当前场景中的所有对象ID都是唯一的）
     * @param nTeleportID 传送点在数据表中的ID（注：一个关卡中该ID是唯一的）
     */
    export function calcTeleportActorID(nTeleportID: number) {
        return TeleportBaseId + nTeleportID;
    }

    /**
     * 获取传送点的在数据表中的ID
     * @param nTeleportActorID 传送点在当前场景中的唯一对象ID
     */
    export function calcTeleportID(nTeleportActorID: number) {
        return nTeleportActorID - TeleportBaseId;
    }

    /**
     * 计算NPC的角色ID
     * @param npcID 指定要计算角色ID的NPC的数据表ID.注: 一个关卡中NPC的数据表ID是唯一的.
     */
    export function calcNpcRoleId(npcID: number) {
        return NpcBaseId + npcID;
    }

    /**
     * 由Npc的角色ID计算出NPC的数据表Id
     * @param npcRoleId 指定要计算数据表Id的NPC的角色ID
     */
    export function calcNpcId(npcRoleId: number) {
        return npcRoleId - NpcBaseId;
    }
}

/**
 * 场景UI类型定义,每种类型包括一组mapCode
 */
enum SceneUIClasses {
    Normal = 0,             // 常规地图
    NormalCopy = 1,         // 普通副本
    DianJiangCopy = 2,      // 点将台副本
    CaiShenMiaoCopy = 3,    // 财神庙副本
    TaskCopy = 4,           // 任务剧情副本
    BloodCastle = 5,        // 罗汉星阵
    Demon = 6,	            // 部落营地
    Battle = 7,             // 阵营战
    NewPlayerMap = 8,       // 新手场景地图
    JingYanFuBen = 9,       // 斗兽场 5000-5009
    KaLiMaTemple = 10,      // 多人副本 - 石魔峡谷
    EMoLaiXiCopy = 11,      // 多人副本 - 百魔夜行
    PKKing = 12,            // 斗技之王
    AngelTemple = 13,       // 死骷岛
    BossFamily = 14,        // Boss之家
    HuangJinShengDian = 15, // 黄金圣殿
    JingJiChang = 16,       // 竞技场[chenshu]
    PaTa = 17,              // 爬塔
    JinBiFuBen = 18,        // 个人藏金古墓
    QiJiMiJing = 19,        // 奇迹密境
    GuZhanChang = 20,       // 孤魂遗迹
    ShuiJingHuanJing = 21,  // 龙晶矿场
    FamilyBoss = 22,        // 帮派BOSS
    LuolanFazhen = 23,      // 多人副本-八卦迷阵
    LuoLanChengZhan = 24,   // 龙城城战
    HuanYingSiYuan = 25,    // 斗阵争霸（跨服）
    TianTi = 26,            // 跨服天梯
    YongZheZhanChang = 27,  // 决死战场
    ElementWar = 28,        // 灵格修炼
    MoRiJudge = 29,         // 天煞之战(跨服)
    LoveFuBen = 30,         // 情侣副本
    KuaFuBoss = 31,         // 跨服Boss
    KuaFuMap = 32,          // 跨服主线地图
    OnePiece = 33,          // 藏宝秘境
    CopyWolf = 34,          // 禁地修炼
    LangHunLingYu = 35,     //  狼魂领域
    ZhongShenZhengBa = 36,  // 众神争霸
    HuanShuYuan = 37,       // 跨服场景2
    PKLovers = 38,          // 夫妻竞技场
    KuaFuWangZhe = 39,      // 跨服独尊战场

    BaoShiFuBen = 1000,     // 宝石副本
    VIPFuBen = 1001,        // vip副本
    ShaBaKeChengZhan = 1002, // 沙巴克城战
    KFXuHuanFuBen = 1003,   // 跨服副本 --- 虚幻之间

    //  其他
    UnDefined = 9999,       // 未定义

    //  自定义组仅程序使用- 请不要在Settings.xml表中配置这些类型

    All = 10000,            // 不区分场景
    KuaFuCopy = 10001,      // 跨服副本(仅用于事件类型注册，每个跨服副本定义自己的SceneUIClasses)

    // 自定义组仅程序使用- 请不要在Settings.xml表中配置这些类型
}

/**
 * 定义任务类型
 */
enum TaskClasses {
    Invalid = -1,   // 无效值
    Main = 0,       // 主线
    DailyTask = 8,  // 日常任务
    PriceTask = 9,  // 讨伐任务
    GuideTask = 10, // 引导任务
    TotemTask = 11, //图腾任务
}

/**
 * 地图类型定义
 */
enum MapTypes {
    Normal = 0,             // 常规地图
    NormalCopy = 1,         // 普通副本
    DianJiangCopy = 2,      // 点将台副本
    CaiShenMiaoCopy = 3,    // 福神庙副本
    TaskCopy = 4,           // 任务剧情副本
    JingJiChang = 5,        // 竞技场副本
    HuanYingSiYuan = 6,     // 跨服战副本-活动预留3
    MarriageCopy = 7,       // [bing] 情侣副本
    Max,                    // 最大值
}

enum GongNengIDs {
    None = -1,
    QiFu = 1, // 祈福
    BaiTan = 2, // 摆摊
    Friend = 4, // 好友
    MoYanDong = 5, // 魔炎洞（剧情副本第一个页签，可以拿来判定剧情副本开启条件）
    LianLu = 6, // 炼炉
    HeCheng = 8, // 合成
    PaiHangBang = 10, // 排行榜
    JingJiChang = 11, // 竞技场
    ZhamMeng = 12, // 帮会
    MingXiang = 14, // 潜心修炼
    GuaJi = 15, // 挂机
    Demon = 16, // 部落营地（部落营地）
    BloodCastle = 18, // 血色墓地（罗汉星阵）
    GamePayerRolePartChiBang = 19, // 翅膀
    JinBiFuBen = 20, // 藏金古墓（藏金古墓）
    PaTa = 21, // 锁魔塔（锁魔塔）
    GuZhanChang = 22, // 孤魂遗迹（孤魂遗迹）
    ZuDuiFuBen = 23, // 组队副本
    AngelTemple = 30, // 死骷岛
    XiLian = 31, // 洗炼
    GamePayerRolePartXingZuo = 32, // 星曜
    FengYunZhi = 33,      // 风云志(山海全书/山海全书)
    RiChangRenWu = 35, // 日常任务
    GuideRenWu = 36,   // 引导任务
    ZhuiJia = 37, // 装备追加
    JingYanFuBen = 38, // 斗兽场（斗兽场）
    PKKing = 39, // 斗技之王
    Honour = 40,  // 荣耀（成就|军衔）
    TaoFaRenWu = 41, // 讨伐任务(i >10 ?BodyIconVecFistSize : BodyIconFirstPos) +
    ShuiJingHuanJing = 42, // 龙晶矿场(龙晶矿场)
    YuanSuHeart = 43, // 元素之心
    JingLingSystem = 44, // 精灵系统
    LieQuYuanSu = 45, // 猎取元素
    LingYU = 50, // 翎羽系统
    ZhuLing = 51, // 注灵系统
    ZhuHun = 52, // 注魂系统
    ChengJiuFuWen = 53, // 成就符文
    ZaiZao = 54, // 神器再造
    ShengWangXunZhang = 55, // 声望勋章
    KuafuHuanyingsiyuan = 57, // 跨服幻影寺院
    Marray = 58, // 婚姻
    GuardStatue = 60, // 守护雕像
    MeiLanZhiShu = 61, // 梅兰之书
    TianTiJingSai = 62, // 天梯赛
    MoriShenPan = 63,  // 天煞之战
    YuansuShiLian = 64, // 灵格修炼    
    KuafuHuodongBOSS = 65, // 跨服活动跨服BOSS
    YongZheZhanChang = 66, // 决死战场
    ShengWuXiTong = 67,  // 龙骸系统
    FluorescentDiamond = 68,  // 荧光宝石
    DailyPrivilege = 69, // 每日专享
    LingDI = 70, // 领地
    LangHunLingYu = 71,  // 狼魂领域
    SoulCometStonePowder = 73,  // 狼魂粉末
    LangHunYaoSai = 74, // 跨服副本-禁地修炼
    GrowFund = 75,    // 成长基金
    JingLingJiNeng = 76,  // 精灵技能
    BangHuiShenDian = 77,   // 帮会神殿
    KuaFuWangZhe = 78,    // 独尊战场
    PKLovers = 80,    // 夫妻竞技场
    FashionBag = 81,  // 衣橱
    CouleWish = 82, // 情侣祝福
    MengchongPart = 83,   // 萌宠
    ZhuanBeiHuiShou = 84,   // 装备回收
    MengchongHuasheng = 85,   // 萌宠化生

    SkillSetup = 3000, // 技能配置
    HideTaskBoxJianTou = 10000, // Mini任务栏的引导箭头
}

/**
 * 战斗阵营类型
 */
enum BattleWhichSides {
    Sui = 1,    // 隋军阵营===》现在的仙阵营
    Tang = 2,   // 唐军阵营===》现在的魔阵营
}

/**
 * 任务类型
 */
enum TaskTypes {
    None = -1,              // 无定义
    Talk = 0,               // 对话
    KillMonster = 1,        // 杀怪 
    MonsterSomething = 2,   // 杀怪拾取
    BuySomething = 3,       // 购买
    UseSomething = 4,       // 使用物品
    TransferSomething = 5,  // 物品传送
    GetSomething = 6,       // NPC自动给予物品
    NeedYuanBao = 7,        // 与NPC对话时判断有无钻石
    CaiJiGoods = 8,         // 采集物品
    ZhiLiao = 9,            // 治疗
    FangHuo = 10,           // 防火  
    KillMonsterForLevel = 11,   // 击杀等级不小于要求等级的怪
    JoinFamily = 12,        // 加入帮会
    CompleteOnceDailyTask = 13, // 完成一次日常任务
    JoinJingjichang = 14,   // 参加竞技场
    WinJingjichang = 15,    // 竞技场中胜利
    GetEquipFromChouJiang = 16, // 通关抽奖获得装备
    JoinBuluoyingdi = 17,   // 参加部落营地
    JoinLuohanxingzhen = 18, // 参加罗汉星阵
    MergeHighlevelLingdan = 19, // 合成高级灵丹
    AddFriend = 20,         // 加好友
    XingyaoGuhuangShengjie = 21, // 星耀孤皇升阶
    JoinDouJiZhiWang = 22,  // 参加斗鸡之王
    SuoMoTa = 23,           // 打万魔塔到指定层数
    JoinJuQingFuBen = 24,   //参加剧情副本
    QiangHua = 25,  //强化一次
    MergeDoorTicket_QingTie = 26,  //合成门票_请帖
    MergeDoorTicket_XingZhenYi = 27,  //合成门票_星阵仪
    SpawnMonster = 28,//刷新一只boss出来
}

/** 物品使用限制的类型 */
class GoodRequirementTypes {
    static VIP = "VIP";       // vip对应的值不管,默认采用-1
    static WingSuit = "WingSuit";  // 翅膀阶级
    static EquipSuit = "EquipSuit"; // 装备阶数
    static QiangHuaLevel = "QiangHuaLevel"; // 强化等级
    static ZhuiJiaLevel = "ZhuiJiaLevel";  // 追加等级
    static ChengJiuLevel = "ChengJiuLevel"; // 成就阶数
    static JunXianLevel = "JunXianLevel";  // 军衔阶数
    static ZhuanShengLevel = "ZhuanShengLevel"; // 转身等级
    static Level = "Level";    // 角色等级
    static HuFuSuit = "HuFuSuit"; // 护身符阶数
    static PetLevel = "PetLevel"; // 宠物等级
    static YuanSuZhiXinLevel = "YuanSuZhiXinLevel"; // 元素之心等级
    static DaTianShiSuit = "DaTianShiSuit"; // 大天使阶数
    static NeedTask = "NeedTask"; // 需要完成X转X级主线任务XXXX
    static CanNotBeyondLevel = "CanNotBeyondLevel"; // 达到等级以上无法使用
    static FEIANQUANQU = "FEIANQUANQU"; // 不能在安全区使用
    static NeedMarry = "NeedMarry"; // 已结婚
    static NeedBangHui = "NeedBangHui"; // 加入帮会
    static PKKingFinals = "PKKingFinals"; // 斗技之王决赛
}

/** 角色通用属性索引  */
enum RoleCommonUseIntParamsIndexs {
    /** 成就 */
    ChengJiu = 0,
    /** 装备积分 */
    ZhuangBeiJiFen = 1,
    /** 猎杀值 */
    LieShaZhi = 2,
    /** 悟性值 */
    WuXingZhi = 3,
    /** 真气值 */
    ZhenQiZhi = 4,
    /** 天地精元值 */
    TianDiJingYuan = 5,
    /** 试炼令值 ==>通天令 */
    ShiLianLing = 6,
    /** 经脉等级值---通过真气值升级 */
    JingMaiLevel = 7,
    /** 武学等级值---通过悟性值升级 */
    WuXueLevel = 8,
    /** 钻皇等级值---通过累积充值升级 */
    ZuanHuangLevel = 9,
    /** 系统激活项值---用于记录界面相关元素 */
    SystemOpenValue = 10,
    /** 军功值，玩家做任务获取 */
    JunGong = 11,
    /** 开服在线奖励DayID */
    KaiFuOnlineDayID = 12,
    /** 达到60或者100级的记忆 */
    To60or100 = 13,
    /** 战魂值 */
    ZhanHun = 14,
    /** 荣耀值 */
    RongYu = 15,
    /** 战魂等级 */
    ZhanHunLevel = 16,
    /** 荣耀等级 */
    RongYuLevel = 17,
    /** 声望 */
    ShengWang = 18,
    /** 声望等级 */
    ShengWangLevel = 19,
    /** 锁魔塔当前层编号 */
    WanMoTaCurrLayerOrder = 20,
    /** 星曜值 */
    StarSoulValue = 21,
    /** 成就等级 */
    ChengJiuLevel = 22,
    /** 元素值 */
    YuansuFenmo = 23,
    /** 精灵积分 */
    PetJiFen = 24,
    /** 魔核 */
    MoHeValue = 25,
    /** 时装-翅膀 */
    FashionWingsID = 26,
    /** 再造点 */
    ZaizaoDian = 27,
    /** 月卡奖励是否开启 */
    MonthCard = 28,
    /** 守护雕像 */
    GuardStatue = 29,
    /** 时装-称号 */
    TitleID = 30,
    /** 荧光宝石 */
    FluorescentPoint = 31,
    /** 藏宝积分 */
    TreasureJiFen = 32,
    /** 藏宝血钻 */
    TreasureXueZuan = 33,
    /** 狼魂粉末 */
    LangHunFenMo = 34,
    /** 众神争霸武道点数 */
    ZhengBaPoint = 35,
    /** 视频聊天按钮 */
    VideoButton = 36,
    /** 独尊战场点数 */
    KingOfBattlePoint = 37
}

/**
 * 跑步或者走路后附加的操作类型
 */
enum ExtActionTypes {
    EXTACTION_NONE = 0,
    EXTACTION_NPCDLG,
    EXTACTION_KILLMONSTER,
    EXTACTION_GETGOODSPACK,
    EXTACTION_CAIJI,
    EXTACTION_ATTACKENEMY,
    EXTACTION_ATTACKBOSS
}

/**自动战斗时间类型 */
enum EnumAutoFight_EventType {
    EnumAutoFight_EventType_null = -1,
    EnumAutoFight_EventType_FindRoadEnd = 0, // 自动寻路结束
    EnumAutoFight_EventType_Num,														// 数量
}

/** 物品所属类型 */
enum GoodsOwnerTypes {
    /** 无数据支持 */
    None = -1,
    /** 自己背包中的 */
    SelfBag = 0,
    /** 其他人的(角色栏中) */
    OtherRole = 1,
    /** 掉落的 */
    FallGoods = 2,
    /** 物品交易窗口中的 */
    Exchange = 3,
    /** 自己摆摊窗口中的 */
    SelfStall = 4,
    /** 他人摆摊窗口中的 */
    OtherStall = 5,
    /** 自己随身仓库窗口 */
    SelfPet = 6,
    /** 临时解开的物品包 */
    GoodsPack = 7,
    /** 自己挂售窗口中的 */
    SelfOnSale = 8,
    /** 他人挂售窗口中的 */
    OtherOnSale = 9,
    /** 挂售物品列表中的 */
    AllOthersOnSale = 10,
    /** 挖宝得到的物品 */
    WaBaoGoods = 11,
    /** 系统送礼中的物品 */
    SysGifts = 12,
    /** 进阶后的物品 */
    UpgradeEquip = 13,
    /** 其他人的(排行榜中) */
    OtherRole2 = 14,
    /** 任务信息 */
    ViewTaskInfo = 15,
    /** 杨公宝库 */
    YangGongBK = 16,
    /** 快速精炼 */
    QuickEnchance = 17,
    /** 快速锻造 */
    QuickForge = 18,
    /** 聊天中的物品 */
    ChatGoods = 19,
    /** email附件中的物品 */
    EmailFujian = 20,
    /** npc出售列表中的物品 */
    NPCSale = 21,
    /** npc出售列表中的物品 */
    BaoKuJiangLi = 22,
    /** 商城出售列表中的物品 */
    mallSale = 23,
    /** 自己背包中的物品但不显示菜单，比如炼炉、合成等界面中使用 */
    SelfBagNoMenu = 24,
    /** 炼炉列表中的物品 */
    Lianlu = 25,
    /** 新手引导中的物品 */
    Guide = 26,
    /** 交易所中的物品 */
    JiaoYiShuo = 27,
    /** 元素背包中的物品 */
    YuansuBag = 28,
    /** 荧光宝石背包中的物品 */
    FluorescentDiamondBag = 29,
    /** 魂石背包中的物品 */
    SoulCometStoneBag = 30,
    /** 王者商城中的物品 */
    WangZheShangCheng = 31,
    /** 老玩家 */
    LaoWanJiaShangCheng = 32,
    /** 骑宠栏的物品 */
    QichongBag = 33,
    /** 斗气商人,帮会商人,寻龙商人,归属 */
    DuiHuanBusinessmanOwner = 34
}

/** 物品价格单位类型 */
enum GoodsPriceUnitTypes {
    /** 无 */
    None = -1,
    /** 金币 */
    Jinbi = 0,
    /** 积分 */
    Jifen = 1,
    /** 钻石 */
    Zhuanshi = 2,
    /** 绑定钻石 */
    BindZhuanshi = 3,
    /** 绑定金币 */
    BindJinBi = 4,
    /** 王者点数 */
    KingOfBattlePoint = 5
}

/** 货币类型 */
enum MoneyTypes {
    None = 0,
    /** 金币 => 现在叫绑定金币 */
    TongQian = 1,
    /** 银两 => 现在叫金币 */
    YinLiang = 8,
    /** 精元值 => 现在叫斗气 */
    JingYuanZhi = 13,
    /** 军功值 */
    JunGongZhi = 14,
    /** 猎杀值 */
    LieShaZhi = 20,
    /** 积分值 */
    JiFenZhi = 30,
    /** 钻石 */
    YuanBao = 40,
    /** 绑定钻石 */
    BindYuanBao = 50,
    /** 战魂值 */
    ZhanHun = 90,
    /** 宝藏积分 */
    BaoZangJiFen = 110,
    /** 宝藏血钻 */
    BaoZangXueZuan = 111,
    /** 王者点数 */
    KingOfBattlePoint = 112,
    /** 帮贡 */
    BangGong = 150,
    /** 祈福积分 */
    QiFuJiFen = 151,
}

/** 怪物的类型 */
enum MonsterTypes {
    None = 0,       // 无定义
    Noraml = 101,   // 普通怪
    Task = 201,     // 剧情怪
    Rarity = 301,   // 精英怪
    Boss = 401,     // Boss
    DaDao = 501,    // 通天大盗
    QiBao = 601,    // 夺宝奇兵
    NoAttack = 701, // 被打不还击的怪
    BiaoChe = 801,  // 镖车怪
    ShengXiaoYunCheng = 901, // 生肖运程怪
    DSPetMonster = 1001,    // 召唤怪2 逍遥召唤 骷髅 或者神兽 同时刻只能有一个 新召唤一个，就杀死旧的
    CaiJi = 1101,           // 采集怪物类型，按怪物血量采
    CityGuard = 1201,       // 城池守卫
    XianFactionGuard = 1301, // 仙阵营守卫
    MoFactionGuard = 1302,  // 魔阵营守卫
    CivilianMonster = 1401, // 平民怪，不打人的正常怪
    JUSTMOVE = 1501,        // 不攻击玩家 只走路
    CaiJiByTime = 1601,     // 采集怪物类型，按时间采
    BloodCastleGateAndCrystal = 1701,
    JingJiChangRobot = 1801, // 竞技场机器人
}

/**
 * 奖励类型
 */
enum AwardsTypes {
    None,
    Exp,
    JinBi,
    BindJinBi,
    ZuanShi,
    BindZuanShi,
    /** 斗气 */
    MoJing,
    ShengWang,
    ZhanGong,
    ChengJiu,
    XingHun,
    CangBaoXueZuan,
    CangBaoJiFen,

    ZhenQi,
    JunGong,
    RongYao,
    FenMo,
    /** 帮贡 */
    BangGong,
    /** 祈福积分 */
    QiFuJiFen,
    Max,
}

/** 一级属性 */
class UnitPropIndexes {
    public static readonly Strength = 0;       // 力量--物理攻击力 物理防御 魔法技能增幅(新增)
    public static readonly Intelligence = 1;   // 智力--魔法攻击力 魔法防御 物理技能增幅(新增)
    public static readonly Dexterity = 2;      // 敏捷--命中       闪避     攻击速度(新增)
    public static readonly Constitution = 3;   // 体力--生命上限   魔法上限 
    public static readonly Max = 4;

    public static readonly Names: string[] = [
        "力量", "智力", "敏捷", "体力"
    ];
}

/** 扩展属性索引值 */
class ExtPropIndexes {
    public static readonly Strong = 0;    // 耐久
    public static readonly AttackSpeed = 1;    // 攻击速度
    public static readonly MoveSpeed = 2;    // 移动速度
    public static readonly MinDefense = 3;    // 最小物防	
    public static readonly MaxDefense = 4;    // 最大物防	
    public static readonly MinMDefense = 5;    // 最小魔防	
    public static readonly MaxMDefense = 6;    // 最大魔防	
    public static readonly MinAttack = 7;    // 最小物攻	
    public static readonly MaxAttack = 8;    // 最大物攻	
    public static readonly MinMAttack = 9;    // 最小魔攻	
    public static readonly MaxMAttack = 10;   // 最大魔攻
    public static readonly IncreasePhyAttack = 11;   // 物理攻击提升
    public static readonly IncreaseMagAttack = 12;   // 魔法攻击提升
    public static readonly MaxLifeV = 13;   // 生命上限	
    public static readonly MaxLifePercent = 14;   // 生命上限加成比例(百分比)	
    public static readonly MaxMagicV = 15;   // 魔法上限
    public static readonly MaxMagicPercent = 16;   // 魔法上限加成比例(百分比)
    public static readonly Lucky = 17;   // 幸运
    public static readonly HitV = 18;   // 准确
    public static readonly Dodge = 19;   // 闪避
    public static readonly LifeRecoverPercent = 20;   // 生命恢复(百分比)
    public static readonly MagicRecoverPercent = 21;   // 魔法恢复(百分比)
    public static readonly LifeRecover = 22;   // 单位时间恢复的生命恢复(固定值)
    public static readonly MagicRecover = 23;   // 单位时间恢复的魔法恢复(固定值)      
    public static readonly SubAttackInjurePercent = 24;  // 伤害吸收魔法/物理(百分比)
    public static readonly SubAttackInjure = 25;   // 伤害吸收魔法/物理(固定值)
    public static readonly AddAttackInjurePercent = 26;  // 伤害加成魔法/物理(百分比)
    public static readonly AddAttackInjure = 27;   // 伤害加成魔法/物理(固定值) => 改名为：附加伤害
    public static readonly IgnoreDefensePercent = 28;   // 无视攻击对象的物理/魔法防御(概率)
    public static readonly DamageThornPercent = 29;   // 伤害反弹(百分比)
    public static readonly DamageThorn = 30;   // 伤害反弹(固定值)
    public static readonly PhySkillIncreasePercent = 31; // 物理技能增幅(百分比)
    public static readonly PhySkillIncrease = 32;   // 物理技能增幅(固定值)    
    public static readonly MagicSkillIncreasePercent = 33; // 魔法技能增幅(百分比)
    public static readonly MagicSkillIncrease = 34;   // 魔法技能增幅(固定值)
    public static readonly FatalAttack = 35;   // 卓越一击
    public static readonly DoubleAttack = 36;   // 双倍一击
    public static readonly DecreaseInjurePercent = 37;   // 伤害减少百分比(物理、魔法)
    public static readonly DecreaseInjureValue = 38;   // 伤害减少数值(物理、魔法) => 改名为：抵挡伤害
    public static readonly CounteractInjurePercent = 39;   // 伤害抵挡百分比(物理、魔法)
    public static readonly CounteractInjureValue = 40;   // 伤害抵挡数值(物理、魔法)
    public static readonly IgnoreDefenseRate = 41;   // 无视防御的比例
    public static readonly IncreasePhyDefense = 42;   // 物理防御提升
    public static readonly IncreaseMagDefense = 43;   // 魔法防御提升
    public static readonly LifeSteal = 44;  // 击中恢复(固定值)
    public static readonly AddAttack = 45;  // 攻击力(固定值，最小物攻、最大物攻、最小魔攻、最大魔攻，4个值同时加)
    public static readonly AddDefense = 46; // 防御力(固定值，最小魔攻、最大魔攻、最小物攻、最大魔攻，4个值同时加)  
    public static readonly StateDingShen = 47;                  // 定身状态加成 ChenXiaojun
    public static readonly StateMoveSpeed = 48;                 // 速度改变状态 ChenXiaojun
    public static readonly StateJiTui = 49;                     // 击退状态 ChenXiaojun
    public static readonly StateHunMi = 50;                    // 昏迷状态 ChenXiaojun
    public static readonly DeLucky = 51;                        // 抵抗幸运一击
    public static readonly DeFatalAttack = 52;                  // 抵抗卓越一击
    public static readonly DeDoubleAttack = 53;                 // 抵抗双倍一击
    public static readonly HitPercent = 54;                // 增加命中百分比 [XSea 2015/5/12]
    public static readonly DodgePercent = 55;              // 增加闪避百分比 [XSea 2015/5/12]        
    public static readonly FrozenPercent = 56;       // 冰冻几率
    public static readonly PalsyPercent = 57;       // 麻痹几率
    public static readonly SpeedDownPercent = 58;       // 减速几率
    public static readonly BlowPercent = 59;       // 重击几率
    public static readonly AutoRevivePercent = 60;       // 自动重生几率
    public static readonly SavagePercent = 61;      // 野蛮一击
    public static readonly ColdPercent = 62;       // 冷血一击
    public static readonly RuthlessPercent = 63;       // 无情一击
    public static readonly DeSavagePercent = 64;       // 抵抗野蛮一击
    public static readonly DeColdPercent = 65;       // 抵抗冷血一击
    public static readonly DeRuthlessPercent = 66;       // 抵抗无情一击
    public static readonly LifeStealPercent = 67;       // 击中恢复百分比
    public static readonly Potion = 68;       // 药水效果
    public static readonly FireAttack = 69;                // 火系固定伤害
    public static readonly WaterAttack = 70;               // 水系固定伤害
    public static readonly LightningAttack = 71;           // 雷系固定伤害
    public static readonly SoilAttack = 72;                // 土系固定伤害
    public static readonly IceAttack = 73;                 // 冰系固定伤害
    public static readonly WindAttack = 74;                // 风系固定伤害
    public static readonly FirePenetration = 75;           // 火伤穿透
    public static readonly WaterPenetration = 76;          // 水伤穿透
    public static readonly LightningPenetration = 77;      // 雷伤穿透
    public static readonly SoilPenetration = 78;           // 土伤穿透
    public static readonly IcePenetration = 79;            // 冰伤穿透
    public static readonly WindPenetration = 80;           // 风伤穿透
    public static readonly DeFirePenetration = 81;         // 抵抗火伤穿透
    public static readonly DeWaterPenetration = 82;        // 抵抗水伤穿透
    public static readonly DeLightningPenetration = 83;    // 抵抗雷伤穿透
    public static readonly DeSoilPenetration = 84;         // 抵抗土伤穿透
    public static readonly DeIcePenetration = 85;          // 抵抗冰伤穿透
    public static readonly DeWindPenetration = 86;         // 抵抗风伤穿透
    public static readonly Holywater = 87;                 // [bing] 圣水效果：HolyWater，百分比 圣水：GoodsID=1000、1001、1002、1100、1101、1102 效果：基础效果（1+ X.X）
    public static readonly RecoverLifeV = 88;              // [bing] 自动恢复生命效果：RecoverLifeV，百分比 效果：基础恢复生命效果*（1+X.X）
    public static readonly RecoverMagicV = 89;             // [bing] 自动恢复魔法效果：RecoverMagicV，百分比 效果：基础恢复魔法效果+X.X
    public static readonly Fatalhurt = 90;                 // [bing] 卓越伤害加成：FatalHurt，百分比 效果：卓越一击伤害加成*（1+X.X）
    public static readonly AddAttackPercent = 91;          // [bing] 攻击力提升：AddAttackPercent，百分比 
    public static readonly AddDefensePercent = 92;         // [bing] 防御力提升：AddDefensePercent，百分比 
    public static readonly InjurePenetrationPercent = 93;  // 伤害穿透
    public static readonly ElementInjurePercent = 94;      // 元素伤害加成
    public static readonly IgnorePhyAttackPercent = 95;    // 物理免疫几率
    public static readonly IgnoreMagyAttackPercent = 96;   // 魔法免疫几率
    public static readonly Max = 97;

    // 各个属性对应的英文名字，配置文件中会用到 比如QiangHua.xml 全部是小写，非常重要 前缀min去掉
    public static readonly ExtPropIndexNames: string[] = [
        "strong", "accackspeed", "speed",
        "defense", "maxdefense", "mdefense", "maxmdefense",
        "attack", "maxattack", "mattack", "maxmattack",
        "increasephyattack", "increasemagattack",
        "maxlifev", "maxlifepercent",
        "maxmagicv", "maxmagicpercent",
        "lucky", "hitv", "dodge",
        "liferecoverpercent", "magicrecoverpercent",
        "liferecover", "magicrecover",
        "subattackinjurepercent", "subattackinjure",
        "addattackinjurepercent", "addattackinjure",
        "ignoredefensepercent",
        "damagethornpercent", "damagethorn",
        "physkillincreasepercent", "physkillincrease",
        "magicskillincreasepercent", "magicskillincrease",
        "fatalattack", "doubleattack",
        "decreaseinjurepercent", "decreaseinjurevalue",
        "counteractinjurepercent", "counteractinjurevalue",
        "ignoredefenserate",
        "increasephydefense", "increasemagdefense",
        "lifesteal", "addattack", "adddefense", "hitpercent", "dodgepercent", "savagepercent",
        "coldpercent", "ruthlesspercent", "desavagepercent", "decoldpercent", "deruthlesspercent",
        "lifestealpercent", "potion",
        "fireattack",
        "waterattack",
        "lightningattack",
        "soilattack",
        "iceattack",
        "windattack",
        "firepenetration",
        "waterpenetration",
        "lightningpenetration",
        "soilpenetration",
        "icepenetration",
        "windpenetration",
        "defirepenetration",
        "dewaterpenetration",
        "delightningpenetration",
        "desoilpenetration",
        "deicepenetration",
        "dewindpenetration",
        "holywater",
        "recoverlifev",
        "recovermagicv",
        "fatalhurt",
        "addattackpercent",
        "adddefensepercent",
        "injurepenetrationpercent",
        "elementinjurepercent",
        "ignorephyattackpercent",
        "ignoremagyattackpercent",
    ];

    public static readonly ChineseNames: string[] = [
        "耐久", "攻击速度", "移动速度",
        "最小物防", "最大物防", "最小魔防", "最大魔防",
        "最小物攻", "最大物攻", "最小魔攻", "最大魔攻",
        "物理攻击提升", "魔法攻击提升",
        "生命上限", "生命上限加成", /*百分比*/
        "魔法上限", "魔法上限加成", /*百分比*/
        "幸    运", "命    中", "闪    避",
        "生命恢复", /*百分比*/"魔法恢复", /*百分比*/
        "生命恢复", /*固定值*/"魔法恢复", /*固定值*/
        "伤害吸收", /*百分比*/"伤害吸收", /*固定值*/
        "伤害加成", /*百分比*/"附加伤害", /*固定值*/
        "无视防御概率", /*百分比*/
        "伤害反弹", /*百分比*/"伤害反弹", /*固定值*/
        "物理技能增幅", /*百分比*/"物理技能增幅", /*固定值*/
        "魔法技能增幅", /*百分比*/"魔法技能增幅", /*固定值*/
        "极限一击概率", /*百分比*/"双倍一击概率", /*百分比*/
        "伤害减少", /*百分比*/"抵挡伤害", /*固定值*/
        "伤害抵挡", /*百分比*/"伤害抵挡", /*固定值*/
        "无视防御比例", /*百分比*/
        "物理防御提升", /*百分比*/"魔法防御提升", /*百分比*/
        "击中恢复", /*固定值*/"攻击力　", /*固定值*/"防御力　", /*固定值*/
        "定身状态加成", /**/"速度改变状态", /**/"击退状态", /**/"昏迷状态", /**/
        "抵抗幸运一击", /**/"抵抗极限一击", /**/"抵抗双倍一击", /**/
        "增加命中百分比", "增加闪避百分比",
        "冰冻几率", /**/"麻痹几率", /**/"减速几率", /**/"重击几率", /**/"自动重生几率", /**/
        "野蛮一击", "冷血一击",
        "无情一击", "抵抗野蛮一击", "抵抗冷血一击", "抵抗无情一击",
        "击中恢复百分比", "药水效果", "火系伤害", "水系伤害",
        "雷系伤害", "土系伤害", "冰系伤害", "风系伤害",
        "火系伤害穿透", /**/"水系伤害穿透", /**/
        "雷系伤害穿透", /**/"土系伤害穿透", /**/
        "冰系伤害穿透", /**/"风系伤害穿透", /**/
        "火系抵抗", /**/"水系抵抗", /**/
        "雷系抵抗", /**/"土系抵抗", /**/
        "冰系抵抗", /**/"风系抵抗", /**/
        "圣水效果", "自动恢复生命效果", "自动恢复魔法效果", "卓越伤害提升", /**/
        "攻击力提升", "防御力提升", /**/
        "伤害穿透",
        "元素伤害加成",
        "物理免疫几率",
        "魔法免疫几率",
    ];

    /** 各个属性对应的中文名字，主要用于界面显示，同时，界面显示时，需要带上Loca.getLang("")进行语言转换,考虑到存在最大最小，
        界面不显示最大最小，因此，最小不配置最小，只有最大值配置最大,这样便于界面统一处理 */
    public static readonly ExtPropIndexChineseNames: string[] = [
        "耐久", "攻击速度", "移动速度", "最小物防", "最大物防", "最小魔防", "最大魔防",
        "最小物攻", "最大物攻", "最小魔攻", "最大魔攻", "物理攻击提升", "魔法攻击提升",
        "生命上限", "生命上限加成", /*百分比*/ "魔法上限", "魔法上限加成", /*百分比*/
        "幸    运", "命    中", "闪    避", "生命恢复", /*百分比*/"魔法恢复", /*百分比*/
        "生命恢复", /*固定值*/"魔法恢复", /*固定值*/ "伤害吸收", /*百分比*/"伤害吸收", /*固定值*/
        "伤害加成", /*百分比*/"附加伤害", /*固定值*/ "无视防御概率", /*百分比*/ "伤害反弹", /*百分比*/"伤害反弹", /*固定值*/
        "物理技能增幅", /*百分比*/"物理技能增幅", /*固定值*/ "魔法技能增幅", /*百分比*/"魔法技能增幅", /*固定值*/
        "极限一击概率", /*百分比*/"双倍一击概率", /*百分比*/ "伤害减少", /*百分比*/"抵挡伤害", /*固定值*/
        "伤害抵挡", /*百分比*/"伤害抵挡", /*固定值*/ "无视防御比例", /*百分比*/ "物理防御提升", /*百分比*/"魔法防御提升", /*百分比*/
        "击中恢复", /*固定值*/"攻击力　", /*固定值*/"防御力　", /*固定值*/ "定身状态加成", /**/"速度改变状态", /**/"击退状态", /**/"昏迷状态", /**/
        "抵抗幸运一击", /**/"抵抗极限一击", /**/"抵抗双倍一击", /**/ "增加命中百分比", /**/"增加闪避百分比", /**/
        "冰冻几率", /**/"麻痹几率", /**/"减速几率", /**/"重击几率", /**/"自动重生几率", /**/
        "野蛮一击", /**/"冷血一击", /**/"无情一击", /**/ "抵抗野蛮一击", /**/"抵抗冷血一击", /**/"抵抗无情一击", /**/
        "击中恢复百分比", /**/"药水效果", /**/ "火系伤害", /**/"水系伤害", /**/
        "雷系伤害", /**/"土系伤害", /**/ "冰系伤害", /**/"风系伤害", /**/ "火系伤害穿透", /**/"水系伤害穿透", /**/
        "雷系伤害穿透", /**/"土系伤害穿透", /**/ "冰系伤害穿透", /**/"风系伤害穿透", /**/ "火系抵抗", /**/"水系抵抗", /**/
        "雷系抵抗", /**/"土系抵抗", /**/ "冰系抵抗", /**/"风系抵抗", /**/ "圣水效果", "自动恢复生命效果", "自动恢复魔法效果", "卓越伤害提升", /**/
        "攻击力提升", "防御力提升", /**/ "伤害穿透", "元素伤害加成", "物理免疫几率", "魔法免疫几率"
    ];

    /** 用于判断是否百分比，0表示不是百分比数据， 1表示是百分比数据，如果是百分比数据，显示时需要加百分号 */
    public static readonly ExtPropIndexPercents: number[] = [
        0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        1, 1,
        0, 1,
        0, 1,
        0, 0, 0,
        1, 1,
        0, 0,
        1, 0,
        1, 0,
        1,
        1, 0,
        1, 0,
        1, 0,
        1, 1,
        1, 0,
        1, 0,
        1,
        1, 1,
        0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        1, 1,
        0, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 1,
        1, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        0, 0, 0, 0,
        1, 1,
        0,
        0, 0, 0
    ];

    /** 格式化Buff效果描述需要解析的属性索引 */
    public static readonly ExtPropIndexShows: number[] = [1, 2, 3, 7, 11, 13, 14, 15, 16];

    /** 各个属性对应的中文名字，主要用于界面显示，同时，界面显示时，需要带上Loca.getLang("")进行语言转换,考虑到存在最大最小，
        界面不显示最大最小，因此，最小不配置最小，只有最大值配置最大,这样便于界面统一处理 */
    public static readonly ExtPropIndexBuffNames: string[] = [
        "耐久", "攻击速度提升", "移动速度提升", // 0
        "防御提升", "最大物防", "魔法防御提升", "最大魔防", // 3
        "攻击提升", "最大物攻", "魔法攻击提升", "最大魔攻", // 7
        "攻击提升", "魔法攻击提升", // "物理攻击提升", "魔法攻击提升" //11
        "生命上限加成", "生命上限加成", // 百分比 //13
        "魔法上限加成", "魔法上限加成", // 百分比 //15
        "幸运提升", "命中提升", "闪避提升", // 17
        "生命恢复提升", /*百分比*/"魔法恢复提升", /*百分比*/ // 20
        "生命恢复提升", /*固定值*/"魔法恢复提升", /*固定值*/ // 22               
        "伤害吸收提升", /*百分比*/"伤害吸收提升", /*固定值*/ // 24
        "伤害加成提升", /*百分比*/"伤害加成提升", /*固定值*/ // 26
        "无视防御概率提升", /*百分比*/
        "伤害反弹提升", /*百分比*/"伤害反弹提升", /*固定值*/ // 28
        "物理技能增幅提升", /*百分比*/"物理技能增幅提升", /*固定值*/ // 30
        "魔法技能增幅提升", /*百分比*/"魔法技能增幅提升", /*固定值*/ // 32
        "极限一击概率提升", /*百分比*/"双倍一击概率提升", /*百分比*/ // 34
        "伤害减少提升", /*百分比*/"伤害减少提升", /*固定值*/ // 36
        "伤害抵挡提升", /*百分比*/"伤害抵挡提升", /*固定值*/ // 38
        "无视防御比例提升", /*百分比*/
        "物理防御提升", /*百分比*/"魔法防御提升"/*百分比*/ // 41
    ];

    public static readonly ShengWuIndexNames: string[] = [
        "Constitution", "Dexterity", "Intelligence", "Strength", "Strong", "AttackSpeed", "MoveSpeed", "MinDefense", "MaxDefense", "MinMDefense",
        "MaxMDefense", "MinAttack", "MaxAttack", "MinMAttack", "MaxMAttack", "IncreasePhyAttack", "IncreaseMagAttack", "MaxLifeV", "MaxLifePercent",
        "MaxMagicV", "MaxMagicPercent", "Lucky", "HitV", "Dodge", "LifeRecoverPercent", "MagicRecoverPercent", "LifeRecover", "MagicRecover",
        "SubAttackInjurePercent", "SubAttackInjure", "AddAttackInjurePercent", "AddAttackInjure", "IgnoreDefensePercent", "DamageThornPercent",
        "DamageThorn", "PhySkillIncreasePercent", "PhySkillIncrease", "MagicSkillIncreasePercent", "MagicSkillIncrease", "FatalAttack",
        "DoubleAttack", "DecreaseInjurePercent", "DecreaseInjureValue", "CounteractInjurePercent", "CounteractInjureValue", "IgnoreDefenseRate",
        "IncreasePhyDefense", "IncreaseMagDefense", "LifeSteal", "AddAttack", "AddDefense", "StateDingShen", "StateMoveSpeed", "StateJiTui",
        "StateHunMi", "DeLucky", "DeFatalAttack", "DeDoubleAttack", "HitPercent", "DodgePercent", "FrozenPercent", "PalsyPercent", "SpeedDownPercent",
        "BlowPercent", "AutoRevivePercent", "SavagePercent", "ColdPercent", "RuthlessPercent", "DeSavagePercent", "DeColdPercent", "DeRuthlessPercent",
        "LifeStealPercent", "Potion", "FireAttack", "WaterAttack", "LightningAttack", "SoilAttack", "IceAttack", "WindAttack", "FirePenetration",
        "WaterPenetration", "LightningPenetration", "SoilPenetration", "IcePenetration", "WindPenetration", "DeFirePenetration", "DeWaterPenetration",
        "DeLightningPenetration", "DeSoilPenetration", "DeIcePenetration", "DeWindPenetration", "HolyWater", "RecoverLifeV", "RecoverMagicV", "FatalHurt"
    ];

    public static readonly ShengWuChineseNames: string[] = [
        "体    力", "敏    捷", "智    力", "力    量", "耐    久",
        "攻击速度", "移动速度", "最小物防", "最大物防", "最小魔防",
        "最大魔防", "最小物攻", "最大物攻", "最小魔攻", "最大魔攻",
        "物理攻击", "魔法攻击", "生命上限", "生命上限加成", "魔法上限",
        "魔法上限", "幸    运", "命    中", "闪    避", "生命恢复",
        "魔法恢复", "生命恢复", "魔法恢复", "伤害吸收", "伤害吸收",
        "伤害加成", "伤害加成", "无视防御几率", "伤害反弹", "伤害反弹",
        "物理技能伤害", "物理技能伤害", "魔法技能伤害", "魔法技能伤害", "极限一击几率",
        "致命一击几率", "伤害减少", "伤害减少", "抵挡伤害", "抵挡伤害",
        "无视防御的比例", "物理防御", "魔法防御", "击中恢复", "攻 击 力",
        "防 御 力", "定身状态", "速度改变", "击退状态", "昏迷状态",
        "抵抗幸运一击", "抵抗极限一击", "抵抗双倍一击", "命中提升", "闪避提升",
        "冰冻几率", "麻痹几率", "减速几率", "重击几率", "自动重生几率",
        "野蛮一击几率", "冷血一击几率", "无情一击几率", "抵抗野蛮几率", "抵抗冷血几率",
        "抵抗无情几率", "击中恢复", "药水效果", "火系伤害", "水系伤害",
        "雷系伤害", "土系伤害", "冰系伤害", "风系伤害", "火伤穿透",
        "水伤穿透", "雷伤穿透", "土伤穿透", "冰伤穿透", "风伤穿透",
        "火系抗性", "水系抗性", "雷系抗性", "土系抗性", "冰系抗性",
        "风系抗性", "圣水效果", "自动恢复生命效果", "自动恢复魔法效果", "卓越伤害提升"
    ];

    public GetPropIndex(propName: string): number {
        return ExtPropIndexes.ExtPropIndexNames.indexOf(propName.toLowerCase());
    }
}

/** 卓越属性索引值 */
class ZhuoyuePropIndexes {
    public static readonly FatalAttack = 0;   // 卓越一击几率
    public static readonly MaxAttack = 1;    // 攻击力	
    public static readonly MaxMAttack = 2;   // 攻击力 
    public static readonly IncreasePhyAttack = 3;   // 攻击力提升
    public static readonly IncreaseMagAttack = 4;   // 攻击力提升
    public static readonly AttackSpeed = 5;    // 伤害加成
    public static readonly LifeRecoverKillMonster = 6; // 命中
    public static readonly MagicRecoverKillMonster = 7; // 无视防御比例
    public static readonly MaxLifePercent = 8;   // 生命上限加成(百分比)
    public static readonly MaxMagicPercent = 9;   // 防御力(百分比)
    public static readonly DamageDecrease = 10; // 伤害减少
    public static readonly DamageThornPercent = 11;   // 伤害反弹(百分比)
    public static readonly Dodge = 12;   // 闪避
    public static readonly DropMoneyKillMonster = 13;   // 防御力(增加百分比)
    public static readonly IgnoreDefensePercent = 14;   // 无视防御几率(概率)
    public static readonly LifeRecoverPercent = 15;   // 生命完全恢复几率(百分比)
    public static readonly MagicRecoverPercent = 16;   // 魔法完全恢复几率(百分比)
    public static readonly LuckyAttackPercent = 17;      // 幸运一击几率+5%
    public static readonly FatalAttackPercent = 18;      // 卓越一击几率+5%
    public static readonly HitVPercent = 19;             // 命中+5%
    public static readonly MaxLifeUpPercent = 20;        // 生命上限加成+5%
    public static readonly AddAttackInjurePercent = 21;  // 伤害增加+5%
    public static readonly SubAttackInjurePercent = 22;  // 伤害减少+5%
    public static readonly DoubleAttackPercent = 23;     // 致死一击几率+5%
    public static readonly MaxAttackPercent = 24;        // 攻击力+5%
    public static readonly DodgePercent = 25;            // 闪避+5%
    public static readonly IgnoreDefensePercentNew = 26; // 无视防御几率+5%
    public static readonly DefensePercent = 27;          // 防御力+5%
    public static readonly DamageThornPercentNew = 28;   // 伤害反弹+5%
    public static readonly CounteractLuckyAttack = 29;   // 抵抗幸运一击率+5%
    public static readonly CounteractFatalAttack = 30;   // 抵抗卓越一击率+5%
    public static readonly CounteractDoubleAttack = 31;  // 抵抗致死一击率+5%

    public static readonly ZhuoyuePropIndexChineseNames: string[] = [
        "极限一击几率",
        "攻击力",
        "攻击力",
        "攻击力提升",
        "攻击力提升",
        "伤害加成",
        "命中值",
        "无视防御比例",
        "生命上限加成",
        "防御力",
        "伤害减少",
        "伤害反弹",
        "闪避值",
        "防御力",
        "无视防御几率",
        "生命完全恢复几率",
        "魔法完全恢复几率",
        "幸运一击几率",
        "极限一击几率",
        "命中值",
        "生命上限加成",
        "伤害加成",
        "伤害减少",
        "致命一击几率",
        "攻击力",
        "闪避值",
        "无视防御几率",
        "防御力",
        "伤害反弹",
        "抵抗幸运一击率",
        "抵抗极限一击率",
        "抵抗致命一击率"
    ];

    /** 1表示百分比数据，0表示数值 */
    public static readonly ZhuoyuePropIndexPercents: number[] = [
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
    ];

    /** 卓越属性 */
    public static readonly ZhuoyuePropIndexValues: number[] = [
        2,
        20,
        20,
        2,
        2,
        2,
        2,
        2,
        2,
        20,
        2,
        2,
        2,
        2,
        3,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
    ];
}

/** 对于Enum类型的扩展 */
class ExtPropIndexesExt {
    /** 各个属性对应的英文名字，配置文件中会用到 比如QiangHua.Xml 全部是小写，非常重要 前缀min去掉 */
    public static readonly ExtPropIndexNames: string[] = [
        "weight", "strong", "defense", "maxdefense", "mdefense", "maxmdefense",
        "attack", "maxattack", "mattack", "maxmattack", "dsattack", "maxdsattack", "maxlifev", "maxlifepercent",
        "maxmagicv", "lucky", "curse", "hitv",
        "dodge", "magicdodgepercent", "poisoningreoverpercent", "poisoningdodge", "liferecoverpercent", "magicrecoverpercent",
        "subattackinjurepercent", "submattackinjurepercent",
        "maxmagicpercent", "ignoredefensepercent",
        "ignoremdefensepercent"
    ];

    /**各个属性对应的中文名字，主要用于界面显示，同时，界面显示时，需要带上Loca.getLang进行语言转换,考虑到存在最大最小，
       界面不显示最大最小，因此，最小不配置最小，只有最大值配置最大,这样便于界面统一处理*/
    public static readonly ExtPropIndexChineseNames: string[] = [
        "重量", "耐久", "最小物防", "最大物防", "最小魔防", "最大魔防",
        "最小物攻", "最大物攻", "最小魔攻", "最大魔攻",
        "最小道攻", "最大道攻", "生命上限", "生命上限",
        "魔法上限", "幸    运", "诅    咒", "准    确",
        "闪    避", "魔法闪避", "中毒恢复", "中毒闪避",
        "生命恢复", "魔法恢复", "物伤吸收", "魔伤吸收",
        "魔法上限", "无视物防", "无视魔防"
    ];

    /** 用于判断是否百分比，0表示不是百分比数据， 1表示是百分比数据，如果是百分比数据，显示时需要加百分号 */
    public static readonly ExtPropIndexPercents: number[] = [
        0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0,
        0, 1, 1, 1, 1, 1,
        1, 1,
        1, 1,
        1
    ];
}

/** Tip类型 */
enum TipTypes {
    /** 安全文字提示 */
    NormalText = 0,
    /** 物品提示 */
    GoodsText = 1,
    /** 技能提示 */
    SkillText = 2,
    /** 经脉提示 */
    JingMaiText = 3,
    /** 外部的格式化文本 */
    ExternalTip = 4,
    /** DBBuffer项的提示 */
    BufferTip = 5,
    /** 经验条的提示 */
    ExperienceTip = 6,
    /** 灵力条的提示 */
    LingLiTip = 7,
    /** 血条自动恢复的提示 */
    LifeSliderTip = 8,
    /** 蓝条自动恢复的提示 */
    MagicSliderTip = 9,
    /** 加成提示 */
    BonusTip = 10,
    /** 摆摊提示 */
    StallTip = 11,
    /** 元素背包提示 */
    YuansuBagTip = 12,
    /** 守护之灵提示 */
    SoulGuardTip = 13,
    /** 荧光宝石背包提示 */
    FluorescentDiamondBagTip = 14,
    /** 魂石背包提示 */
    SoulCometStoneBagTip = 15
}

/** Tip操作类型 */
enum TipsOperationTypes {
    /** 关闭 */
    Close = 0,
    /** 佩戴 */
    Peidai = 1,
    /** 卸下 */
    Xiexia = 2,
    /** 加工 */
    Jiagong = 3,
    /** 出售 */
    Chushou = 4,
    /** 放入 */
    Fangru = 5,
    /** 取回 */
    Quhui = 6,
    /** 使用 */
    Shiyong = 7,
    /** 购买 */
    Goumai = 8,
    /** 切换左右手 */
    SwitchHand = 9,
    /** 拆分 */
    Caifen = 10,
    /** 斗气回收 */
    Huishou = 11,
    /** 上架 */
    ShangJia = 12,
    /** 购买其它玩家物品 */
    OtherStallGouMai = 13,
    /** 购买交易所物品 */
    JiaoYiShuoGouMai = 14,
    /** 使用宠物 */
    UsePet = 15,
    /** 查看宠物 */
    CheckPet = 16,
    /** 最大 */
    Max = 17,
    /** 替换 */
    Replace = 18,
    /** 分解 */
    Pulverize = 19,
    /** 王者商城 */
    KingOfBattle = 20,
    /** 使用宠物 */
    UseMengchong = 21
}

/** 武器的手持状态 */
enum HandTypes {
    /** 非武器配置 */
    None = -1,
    /** 左手 */
    ZuoShou = 0,
    /** 右手 */
    YouShou = 1,
    /** 左右手 */
    ZuoYouShou = 2
}

/** 持有武器的动作状态 */
enum WeaponStates {
    /** 空手 */
    K = 0,
    /** 单手 */
    D = 1,
    /** 双手 */
    S = 2,
    /** 持弓 */
    G = 3,
    /** 持弩 */
    N = 4,
    /** 长柄 */
    C = 5,
    /** 双持（单手） */
    SD = 6,
    /** 双手巨剑 */
    MJ = 7
}

/**
 * 精灵动作
 */
enum GActions {
    None = -1,      // 无效值
    Stand = 0,      // 站立
    Walk = 1,       // 行走
    Run = 2,        // 奔跑
    Attack = 3,     // 武力攻击
    Injured = 4,    // 被击
    Magic = 6,      // 魔法攻击
    Bow = 9,        // 弓箭攻击
    Death = 12,     // 死亡
    HorseStand = 14, // 骑马站立
    HorseRun = 16,  // 骑马奔跑
    HorseDead = 20, // 骑马死亡
    Sit = 23,       // 打坐
    PreAttack = 24, // 攻击待机
    IdleStand = 25, // 休闲待机
    Italic = 26,    // 斜靠墙壁
    Collect = 27,   // 采集
    Wenhao = 28,    // 问好
    Genwolai = 29,  // 跟我来
    Guzhang = 30,   // 鼓掌
    Huanhu = 31,    // 欢呼
    Jushang = 32,   // 沮丧
    Xingli = 33,    // 行礼
    Chongfeng = 34, // 冲锋
    Mobai = 35,     // 膜拜
    Tiaoxin = 36,   // 挑衅
    Zuoxia = 37,    // 坐下
    Shuijiao = 38,  // 睡觉
    ZS_Orz = 39,    // 战士的情侣动作
    GS_Orz = 40,    // 弓手的情侣动作
    FS_Orz = 41,    // 法师的情侣动作
    MJ_Orz = 42,    // 巧工情侣动作
    WingShow = 43,  // 翅膀展示动作
    MonsterBirth = 44, // 怪物出生动作
    QG_RideJJ = 45, // 巧工上机甲动作
    Magic_1 = 100,  // 怪物魔法攻击动作用
    Magic_2 = 101,
    Magic_3 = 102,
    Magic_4 = 103,
    Attack1,     // 普攻1
    Attack2,     // 普攻2
    Attack3,     // 普攻3
    Attack4,     // 普攻4
    Attack5,     // 普攻5

    //  添加动作枚举时，请保持与Server端一致（GS中相同的文件名），防止出现问题

    MaxAction,      // 最大的动作值
}

/**
 * 系统帮助发生时机
 */
enum SystemHelpModes {
    None = 0,
    ToLevel = 1,    // 到达某个等级
    ToMap = 2,      // 到达某个场景
    FirstLogin = 3, // 第一次登陆游戏
    FirstGoods = 4, // 第一次获得某道具(保留不使用)
    Login = 5,      // 每次登陆游戏
    NewTask = 6,    // 成功接取任务后
    CompTask = 7,   // 成功交换任务后
    TaskOk = 8,     // 完成某个任务时
    BeforeCompTask = 9, // 交还任务前
    LeaveSafeArea = 10, // 离开安全区
    ShowText = 11,  // 显示文本
    LeaveMap = 12,  // 离开地图
    WinUpGrade = 14, // 翅膀进阶
    ChengJiuLv = 15, // 成就等级
    ShengWangLevel = 16, // 声望等级
    AfterBossAnimation = 17,// 在Boss动画播放完毕之后
    JianTouGuide = 18,      //剪头引导
    VipLevel = 19,  ///VIP等级达到
    Max = 20,       // 最大值
}

/** Buffer项的类型 */
enum BufferItemTypes {
    None = 0, // 无定义
    DblExperience = 1, // 双倍经验卡
    DblMoney = 2, // 双倍金钱卡
    DblLingLi = 3, // 双倍灵力卡
    LifeVReserve = 4, // 生命储备
    MagicVReserve = 5, // 魔法储备
    AddTempAttack = 6, // 狂攻符咒
    AddTempDefense = 7, // 防御符咒
    UpLifeLimit = 8, // 生命符咒
    UpMagicLimit = 9, // 精气符咒
    LingLiVReserve = 10, // 灵力储备
    AntiBoss = 11, // BOSS克星
    AntiRole = 12, // 决斗长buffer
    MonthVIP = 13, // VIP月卡
    SheLiZhiYuan = 14, // 舍利之源
    DiWanZhiYou = 15, // 帝王之佑
    JunQi = 16, // 战旗加成
    DblSkillUp = 17, // 双倍技能卡
    ThreeExperience = 18, // 三倍经验卡
    ThreeMoney = 19, // 三倍金钱卡
    AutoFightingProtect = 20, // 挂机保护卡
    TimeExp = 21, // 持续给经验
    TimeAddDefense = 22, // 持续增加物理防御力
    TimeAddMDefense = 23, // 持续增加魔法防御力
    TimeAddAttack = 24, // 持续增加物理攻击力
    TimeAddMAttack = 25, // 持续增加魔法攻击力
    TimeAddDSAttack = 26, // 持续增加道术攻击力
    TimeAddLifeMagic = 27, // 持续增加生命值和魔法值
    WaWaExp = 28, // 替身娃娃经验buffer
    ZhuFu = 29, // 祝福Buffer
    FallTianSheng = 30, // 掉落天生装备的Buffer
    ChengJiu = 31, // 成就Buffer
    JingMai = 32, // 经脉Buffer
    WuXue = 33, // 武学Buffer
    GuMuTimeLimit = 34, // 古墓限时Buffer 古墓密令 和 角色第一次登录后得到
    MingJieMapLimit = 35, // 冥界限时地图Buffer 冥界令牌使用后得到
    FiveExperience = 36, // 五倍经验卡
    TimeAddLifeNoShow = 37, // 持续增加生命值(客户端不显示)
    TimeAddMagicNoShow = 38, // 持续增加魔法值(客户端不显示)
    PKKingBuffer = 39, // 角斗场 武林争霸 [现在叫决战地府]  pk 王 buffer
    DSTimeAddLifeNoShow = 40, // 持续增加生命值(客户端不显示)(道士加血使用)
    DSTimeHideNoShow = 41, // 隐身(客户端不显示)(道士给其他角色使用)
    DSTimeShiDuNoShow = 42, // 道士施放毒(客户端不显示)(道士给其他角色使用)
    DSTimeAddDefenseNoShow = 43, // 道士加防(客户端不显示)(道士给其他角色使用)
    DSTimeAddMDefenseNoShow = 44, // 道士加攻毒(客户端不显示)(道士给其他角色使用)
    FSAddHuDunNoShow = 45, // 法师加护盾(客户端不显示)
    MutilExperience = 46, // 多倍经验卡
    JieRiChengHao = 47, // 节日称号buffer
    ErGuoTou = 48, // 二锅头酒的buffer
    ZuanHuang = 49, // 钻皇Buffer
    ZhanHun = 50, // 战魂Buffer
    RongYu = 51, // 荣誉Buffer

    // 属性改造 begin
    ADDTEMPStrength = 52,      // 增加角色力量值 (值,持续时间)
    ADDTEMPIntelligsence = 53, // 增加角色智力值 (值,持续时间)
    ADDTEMPDexterity = 54,     // 增加角色敏捷值 (值,持续时间)
    ADDTEMPConstitution = 55,  // 增加角色体力值 (值,持续时间)
    ADDTEMPATTACKSPEED = 56,   // 持续一段时间内增加角色攻击速度值 (值, 持续时间)
    ADDTEMPLUCKYATTACK = 57,   // 持续一段时间内增加角色幸运一击概率值 (值, 持续时间)
    ADDTEMPFATALATTACK = 58,   // 持续一段时间内增加角色卓越一击概率值 (值, 持续时间)
    ADDTEMPDOUBLEATTACK = 59,   // 持续一段时间内增加角色双倍一击概率值 (值, 持续时间)
    // 属性改造 end

    // MU项目BUFF begin
    SLDL_SUBDAMAGEPERCENTTIMER = 60,   // 一段时间内减少伤害百分比 (时间，百分比)(守护之魂)
    SLDL_MAXLIFEPERCENT = 61,   // 一段时间增加百分比的生命值 (时间，百分比，每级值增加的步长)
    SLDL_ADDDEFENSETIMER = 62,   // 一段时间增加物理和魔法防御力(时间，数值，每级值增加的步长)
    SLDL_ADDATTACKTIMER = 63,   // 一段时间增加物理和魔法攻击力(时间，数值，每级值增加的步长)
    SLDL_ADDLUCKYATTACKPERCENTTIMER = 64,   // 一段时间提升百分比幸运一击效果(百分比，时间)
    SLDL_ADDFATALATTACKPERCENTTIMER = 65,   // 一段时间提升百分比卓越一击效果(百分比，时间)
    SLDL_ADDDOUBLEATTACKPERCENTTIMER = 66,   // 一段时间提升百分比双倍一击效果(百分比，时间)
    SLDL_ADDMAXHPVALUE = 67,   // 一段时间提升HP上限(值，时间)
    SLDL_ADDMAXMPVALUE = 68,   // 一段时间提升MP上限(值，时间)
    SLDL_ADDLIFERECOVERPERCENT = 69,   // 一段时间提升生命恢复百分比(值，时间)
    SLDL_FRESHPLAYERBUFF = 70,   // 新玩家BUFF
    SLDL_SUBDAMAGEPERCENTTIMER1 = 71, // (圣盾防御)
    // 3期新增 Begin
    SLDL_SUBATTACKPERCENTTIMER = 72,   // 一段时间内减小攻击力百分比 (时间, 百分比)
    SLDL_ADDATTACKPERCENTTIMER = 73,   // 一段时间内增加攻击力百分比 (时间, 百分比)
    SLDL_SUBATTACKVALUETIMER = 74,   // 一段时间内减小攻击力值 (时间, 值)
    SLDL_ADDATTACKVALUETIMER = 75,   // 一段时间内增加攻击力值 (时间, 值)
    SLDL_SUBDEFENSEPERCENTTIMER = 76,   // 一段时间内减少防御百分比(时间,百分比)
    SLDL_ADDDEFENSEPERCENTTIMER = 77,   // 一段时间内增加防御百分比(时间,百分比)
    SLDL_SUBDEFENSEVALUETIMER = 78,   // 一段时间内减少防御值(时间,值)
    SLDL_ADDDEFENSEVALUETIMER = 79,   // 一段时间内增加防御值(时间,值)
    SLDL_SUBMOVESPEEDPERCENTTIMER = 80,   // 一段时间内降低移动速度 (时间, 百分比)
    SLDL_ADDMAXLIFEPERCENTANDVALUE = 81,   // 一段时间内增加生命上限百分比和值(时间, 百分比, 值) 生命之光
    SLDL_SUBHITPERCENTTIMER = 82,   // 一段时间内降低命中 (时间)
    SLDL_SUBDAMAGEPERCENTVALUETIMER = 83,   // 一段时间内减少伤害百分比和值 (时间,百分比,值) 守护之魂
    SLDL_ADDATTACKANDDEFENSEEPERCENTVALUETIMER = 84,   // 一段时间内增加攻击和防御的百分比和值 (时间,百分比,值)  战神之力
    SLDL_ANGELTEMPLEBUFF1 = 85,   // 死骷岛BUFF1
    SLDL_ANGELTEMPLEBUFF2 = 86,   // 死骷岛BUFF2
    SLDL_JINGJICHANG_JUNXIAN = 87,   // 竞技场军衔Buff
    // 3期新增 End
    // MU项目BUFF end
    SLDL_ZHANMENGBUILD_ZHANQI = 88,   // 帮会建筑buffer，战旗
    SLDL_ZHANMENGBUILD_JITAN = 89,   // 帮会建筑buffer，祭坛
    SLDL_ZHANMENGBUILD_JUNXIE = 90,   // 帮会建筑buffer，军械
    SLDL_ZHANMENGBUILD_GUANGHUAN = 91,   // 帮会建筑buffer，光环
    SLDL_REDNAME_DEBUFF = 92,       // 红名惩罚DEBUFF
    TimeFEIXUENoShow = 93, // 腐蚀沸血
    TimeZHONGDUNoShow = 94, // 毒爆术
    TimeLINGHUNoShow = 95, // 灵魂奔腾
    TimeRANSHAONoShow = 96, // 生命燃烧
    TimeHUZHAONoShow = 97, // 重生
    TimeWUDIHUZHAONoShow = 98, // 无敌
    SLDL_WORLDLEVEL = 99, // 世界等级
    SLDL_SPECMACH_EXP = 100, // 特殊设备提升经验的buff

    /// 跨服
    Kuafu_Huanying = 101, // 幻影圣杯减速
    // 魔剑士技能Buff
    SLDL_ADD_HIT_DODGE_PERCENT = 102, // 魔剑士的技能buff
    LangHunLingYu_ChengHao = 103,  // 狼魂领域帮会称号与龙城城主称号位置一致，跟李腾确定后以Buffer的形式添加称号，判断当前是否有此buffer ？ 圣战称号 ： 龙城城主称号

    ZhongShenZhiShen_ChengHao = 111, // 众神之神称号

    SLDL_LUOLANCHENGZHAN_QIZHI1 = 2000805, // 龙城城战旗帜Buff1
    SLDL_LUOLANCHENGZHAN_QIZHI2 = 2000806, // 龙城城战旗帜Buff2
    SLDL_LUOLANCHENGZHAN_QIZHI3 = 2000807, // 龙城城战旗帜Buff3

    SLDL_LANGHUNLINGYU_QIZHI1 = 2000810, // 狼魂领域旗帜Buff1
    SLDL_LANGHUNLINGYU_QIZHI2 = 2000811, // 狼魂领域旗帜Buff2
    SLDL_LANGHUNLINGYU_QIZHI3 = 2000812, // 狼魂领域旗帜Buff3

    CoupleArena_ZhenAi_Buff = 2080010, // 情侣竞技真爱buff
    CoupleArena_YongQi_Buff = 2080011,  // 情侣竞技勇气buff

    // 独尊战场Buffer
    KingOfBattleCrystal = 2080001,      // 王者争霸水晶
    KingOfBattleBoss_GJDZY = 2080007,   // 公爵的战意-BUFF 
    KingOfBattleBoss_GJDJX = 2080008,   // 公爵的决心-BUFF 
    KingOfBattleBoss_GJDNH = 2080009,   // 公爵的怒火-BUFF 

    SLDL_PKKING_SAFE_BUFF = 2080012,    // 斗技之王毒圈buff

    MaxVal, // 最大值
}

/** 魔剑士类型 */
enum MJSSkillType {
    Strength_Sword,
    Magic_Sword
}

/** vip类型 */
enum VIPTypes {
    /** 非vip */
    NoVip = 0,
    /** 月卡vip 1月卡 */
    Month = 1,
    /** 季卡vip 3月卡 */
    Season = 3,
    /** 半年卡vip 6月卡 */
    HalfYear = 6
}

/**
 * 单次奖励掩码值，用于定位64位变量中的相应位，扩展时将16进制的每一个数字设置成1、2、4、8就能保证
 * 为了支持64位，不用enum，enum是int32类型
 */
class OnceAwardMask {
    /** 下载微端 */
    public static readonly DownloadTinyClient = 0x0000000000000001;
    /** 第一次使用vip月卡奖励 */
    public static readonly UseMonthVipCard = 0x0000000000000002;
    /** 第一次使用vip季卡奖励 */
    public static readonly UseSeasonVipCard = 0x0000000000000004;
    /** 第一次使用vip半年卡奖励 */
    public static readonly UseHalfYearVipCard = 0x0000000000000008;
    /** 其它 */
    public static readonly Other = 0x4000000000000000;
}

/** 换装类型 */
enum ModEquipTypes {
    Mod_Equip_None = -1, // 都不换
    Mod_Equip_Body = 0, // 换身体
    Mod_Equip_Weapon = 1, // 换武器
    Mod_Equip_Wing = 2, // 换翅膀
    Mod_Equip_Horse = 3, // 换坐骑
    Mod_Equip_JiJia = 4, // 换机甲
    Mod_Equip_All = 100 // 全换
}

/** 修改物品的操作类型 */
enum ModGoodsTypes {
    Abandon = 0, // 丢弃
    EquipLoad = 1, // 添加装备
    EquipUnload = 2, // 卸载装备
    ModValue = 3, // 修改数值
    Destroy = 4, // 摧毁物品,用户什么也得不到
    SaleToNpc = 5, // 出售物品给npc,绑定物品得到绑定金币，非绑定物品得到金币
    DoSplit = 6, // 分解,分解后得到指定奖励
    DoFuhua = 7, // 宠物蛋孵化
    DoGetMengchong = 8 // 领取萌宠
}

/** 返回出售中的物品列表的最大数 */
enum SaleGoodsConsts {
    /** 出售中的物品的ID */
    SaleGoodsID = -1,
    /** 随身仓库中的物品ID */
    PortableGoodsID = -1000,
    /** 普通背包 */
    NormalBag = 0,
    /** 同时出售的物品数量 */
    MaxSaleNum = 16,
    /** 返回列表的最大数量 */
    MaxReturnNum = 250,
    /** 金蛋仓库位置【0表示背包，-1000表示随身仓库，这个值2000表示砸金蛋的仓库】 */
    JinDanGoodsID = 2000,
    /** 元素背包 */
    YuanShuGoodsID = 3000,
    /** 已装备元素 */
    YuanShuGoodsIDByUsed = 3001,
    /** 精灵装备栏 */
    PetBagGoodsID = 4000,
    /** 精灵装备栏 */
    UsingDemonGoodsID = 5000,
    /** 特殊的摆摊金币物品ID */
    BaiTanJinBiGoodsID = 50200,
    /** 时装类物品ID */
    FashionGoodsID = 6000,
    /** 荧光宝石背包 */
    FluorescentDiamondGoodsID = 7000,
    /** 已装备元素 */
    EquipedFluorescentDiamondGoodsID = 7001,
    /** 魂石背包 */
    SoulStoneBag = 8000,
    /** 魂石装备栏 */
    SoulStoneEquip = 8001,
    /** 萌宠背包 */
    MengchongStoneBag = 9000,
}

/** 弹出包括复选框提示的窗口的类型 */
enum MessBoxIsHintTypes {
    None = -1,
    SkillUpNeedMoJing = 0, // 技能升级需要斗气
    EquipHuishouNeedHint = 1, // tips中装备回收时是否需要提示
    ImportantGoodsSaleNeedHint = 2, // 重要物品出售时需要提示
    YuansuQianghuaSelectNeedHint = 3, // 元素强化时，选择物品时需要提示
    HuaFeiZuanShiNeedHint = 4,  // 勋章花费钻石需要提示
    ChengJiuHuaFeiZuanShiNeedHint = 5, // 成就花费钻石需要提示
    JieHunHuaFeiZuanShiNeedHint = 6,  // 结婚花费钻石需要提示
    CangBaoMiJingEventHint = 7, // 藏宝秘境需要提示
    SoulCometStoneEventHint = 8, // 魂石-吞噬紫色、紫闪魂石提示
    SoulCometStoneSwallowHigherLevelEventHint = 9, // 魂石-低阶吞噬高阶提示
    SoulCometStoneUplevelOverflowEventHint = 10, // 魂石-升级经验溢出提示
    PulverizeDiamondEventHint = 11, // 分解高阶荧光宝石提示
    JjingLingSkillAwarkHint = 12, // 精灵技能槽升级提示
    SelectPKModeAllType = 13, // 切换PK模式到仇恨模式时给玩家的提示
    JinglingSkillGraspType = 14, // 精灵技能领悟提示
    JinBiCostTipsType = 15, // 消耗流通金币提示
    MengchongEggFuhuaType = 16, // 萌宠蛋立即孵化提示
    OpenBossFight = 17,  // 开启BOSS挑战
    ZuanShiCostTipsType = 18, // 消耗流通钻石提示
    TypeEnd // 结束
}

/** 一键操作类型 */
enum OneKeyOTypes {
    /** 无定义 */
    None = 0,
    /** 批量出售 */
    BatchSaleOut = 1,
    /** 批量回收 */
    BatchSaleBack = 2,
    /** 批量回收精灵 */
    BatchSaleDamon = 3,
    /** 批量回收仓库里的精灵 */
    BatchSaleStoreDamon = 4,
}

/** 图片文本的颜色的类型 */
enum PicTextColors {
    White = 0,
    Red = 1,
    Yellow = 2,
    Blue = 3,
    Green = 4,
    Purple = 5,
    Max = 6
}

/** GoodsIcon右上角显示文本的类型，如可显示：强化级别、追加级别、重生级别 */
enum IconTextTypes {
    /** 无 */
    None = -1,
    /** 强化 */
    Qianghua = 0,
    /** 追加 */
    Zhuijia = 1,
    /** 重生 */
    Zhuansheng = 2
}

/**
 * 精灵的类型
 */
enum GSpriteTypes {

    None = -1,                      // 无类型

    Leader = 0,                     // 主角

    Other,                          // 其他玩家

    Monster,                        // 怪物

    Npc,                            // NPC

    Pet,                            // 宠物

    BiaoChe,                        // 镖车

    JunQi,                          // 战旗

    FakeRole,                       // 假人
}

/**图标标识枚举 */
enum ERoleTitleType {
    None = -1,                                  // null
    Banghui = 0,                             // 帮会
    Team,                                         // 队伍
    Chengjiu,                                 // 成就
    PKKing,                                    // pk之王
    JunXian,                                   // 军衔
    Baitan,                                     // 摆摊
    LongYingChengZhan,          // 龙影城战
}

/// <summary>
/// 精灵(角色/怪)的PK模式
/// </summary>
enum GPKModes {
    /// <summary>
    /// 普通模式(用户无法攻击其他玩家，也不会被其他玩家所攻击; 玩家对怪物不受此规则限制)
    /// </summary>
    Normal = 0,

    /// <summary>
    /// 全体模式(打开后在系统允许的区域（非安全区）可自由攻击其他所有非安全模式下的用户（和攻击怪物一致）; 等级低于10级的用户不能被攻击，也不能攻击其他用户)
    /// </summary>
    Whole = 1,

    /// <summary>
    /// 帮派模式(对于怪无意义)
    /// </summary>
    Faction = 2,

    /// <summary>
    /// 组队模式(对于怪无意义)
    /// </summary>
    Team = 3,

    /// <summary>
    /// 善恶模式(只可对红名玩家发起PK)
    /// </summary>
    Kind = 4,
}

/*
 * 角色自动挂机战斗指令类型定义 
 */
enum AutoFightCmds {
    None = 0,
    Start,      // 开始战斗
    Update,     // 计时通知
    End,        // 结束战斗
    Notify,     // 结束战斗
    PlayerClickStart,   // 玩家主动点击的开始挂机请求
    PlayerClickEnd,     // 玩家主动点击的关闭挂机请求
}

/**
 * 定义挂机要拾取的类型
 */
enum GetThingsIndexes {
    Color_Bai = 0,
    Color_Lv = 1,
    Color_Lan = 2,
    Color_Zi = 3,

    BaoShi = 24,
    YuMao = 25,
    YaoPin = 26,
    JinBi = 27,
    MenPiaoCaiLiao = 28,
    QiTaDaoJu = 29,
    Nothing = 30,
}

/**
 * 伤害类型
 */
enum DamageType {
    DAMAGETYPE_DEFAULT = 0,             // 默认值
    DAMAGETYPE_IGNOREDEFENCE = 1,       // 无视防御
    DAMAGETYPE_DOUBLEATTACK = 2,        // 双倍一击
    DAMAGETYPE_EXCELLENCEATTACK = 3,    // 卓越一击
    DAMAGETYPE_LUCKYATTACK = 4,         // 幸运一击
    DAMAGETYPE_THORNDAMAGE = 5,         // 反弹伤害
    DAMAGETYPE_RUTHLESS = 6,            // 无情一击
    DAMAGETYPE_COLD = 7,                // 冷血一击
    DAMAGETYPE_SAVAGE = 8,              // 野蛮一击
    DAMAGETYPE_IGNOREPHY = 9,           // 物理免疫
    DAMAGETYPE_IGNOREMAGIC = 10,        // 魔法免疫
    DAMAGETYPE_MAX,                     // 最大类型
}

/**
 * 系统喊话的类型. 为提升体验添加的系统喊话系统
 */
enum SystemTalkTriggerType {
    AcceptTask = 1,             // 接受任务后触发
    KillMonsterComplete = 2,    // 完成任务后触发
}
/**
 * 活动界面页签枚举
 */
enum EAdventureTab {
    Daily = 0, // 日常
    SinglePk, // 个人战场
    MeiRiHuoYue, // 每日活跃
    XianShiHuoDong, // 限时活动
    Max,
}
/**
 * 活动界面所有ID枚举，应对的是EAdventureItem
 */
enum ActivityTypeEnum {
    Adventure = 0, // 冒险

    DailyItem = Adventure,
    Story, // 剧情
    BangpaiBoss, // 帮派boss
    Exp, // 经验（斗兽场）
    Coin, // 金币（藏金古墓）
    PaTa, // 爬塔（锁魔塔/锁魔塔）

    ActivityItem = 100, // 战场页签下内容
    WorldBoss, // 世界Boss
    GoldBoss, // 灵魂狩猎（灵魂狩猎）
    Demon, // 部落营地
    Bloodcastle, // 血色墓地（罗汉星阵）
    GuZhanChang, // 孤魂遗迹（孤魂遗迹）
    Longjing,
    AngelTemple, // 死骷岛
    ActivityItemMax = 199, // 活动页签下内容最大枚举

    TeamItem = 200, // 团队页签下内容
    KaLiMaTemple, // 卡利玛神庙（石魔峡谷）
    EMoLaiXi, // 百魔夜行（百魔夜行）
    LoveFuBen, // 比翼庭院(情侣副本)
    LuolanFazhen, // 八卦迷阵（迷阵八卦）
    TianShaZhiZhan, // 天煞之战(末日审判)
    YuansuShiLian, // 灵格修炼(元素试练)
    TeamItemMax = 299, // 团队页签下内容最大枚举

    // ================================== 战场界面 ==============================================
    Battlefield = 300, // 战场

    SinglePkItem = Battlefield, // 个人战场页签下内容
    Arena, // 竞技场
    PkCamp, // 阵营大战
    PkKing, // 斗技之王
    SinglePkItemMax = 399, // 个人战场页签下内容最大枚举

    UnionPkItem = 400, // 公会战场页签下内容
    LuoLanChengZhan, // 龙城城战
    ShengYuZhengBa, // 狼烟战场
    UnionPkItemMax = 499, // 公会战场页签下内容最大枚举

    CrossPkItem = 20000, // 跨服战场页签下内容
    HuanYingShiYuan = CrossPkItem,    // 斗阵争霸
    TianTiArena,            // 跨服天梯竞技
    YongzheZhanChang,  // 勇者战场-决死战场
    HuoDongBoss,    // 跨服活动boss-魔炼之地-百炼战场
    ZhongShenZhengBa, // 勇者争霸
    PkLovers, // 夫妻竞技
    DouZuZhanChang, // 独尊战场
    CrossPkItemMax = 20099, // 跨服战场页签下内容最大枚举
}
/**
 * 功能开启Order所有ID枚举，应对的是SystemOpenVo
 */
enum SystemOpenOrderEnum {
    RenWu = 70,			// 人物
    ChengJiu = 2,		// 成就
    PaiHang = 7,		// 排行榜
    ShangCheng = 9,		// 商城
    QingLvZhuFu = 66,	// 情侣祝福
    ChengZhangJiJin = 63,	// 成长基金
    SheZhi = 10,		// 设置
    GongNeng = 12,		// 功能
    FuLi = 13,			// 福利
    QianXinXiuLian = 12, // 潜心修炼
    GuaJi = 40,			// 挂机
    XiDian = 70,		// 洗点
    TianFu = 57,		// 天赋
    XuanFengZhan = 70,	// 旋风斩
    BingHuaMan = 70,	// 冰花漫 
    HongLeiHuoPao = 70,	// 轰雷火炮
    JinFengTui = 70,	// 劲风腿 
    BengShanJi = 70,	// 崩山击 
    CuiZaoTeng = 70,	// 翠沼藤
    HuXingDianChang = 70, // 弧形电场
    BaXiangZhen = 70,	// 八相阵
    ShangGuSuoLian = 70, // 上古锁链
    FengYeSha = 70,		// 风叶杀
    BingHuoPenWu = 70,	// 冰火喷雾
    BaiLiePoKong = 70,	// 百裂破空
    QiuLongXiao = 70,	// 虬龙啸" 
    GanLinRun = 70,		// 甘霖润" 
    ChuanJiaZiDan = 70,	// 穿甲子弹
    MingJingZhenYan = 70, // 明净真言		
    QiChong = 44,		// 骑宠
    HaoYou = 5,			// 好友
    ZhuangBeiDaZao = 4,	// 装备打造
    ZhuangBeiHuiShou = 70,	// 装备回收
    ShanHaiQuanShu = 8,		// 山海全书
    YiChu = 70,			// 衣橱
    HeCheng = 4,		// 合成
    BuLuoYingDi = 16,	// 部落营地
    QingQiuMiJing = 72,	// 青丘秘境
    BangHui = 6,		// 帮会
    MengChong = 44,		// 萌宠
    SuiHunTiaoYue = 70,	// 碎魂跳跃
    PiaoLingBu = 70,	// 飘零步
    ZhanLueJuLi = 70,	// 战略距离
    XianZongXi = 70,	// 仙踪袭
    JiNengPeiZhi = 70,	// 技能配置
    LuoHanXingZhen = 16,	// 罗汉星阵
    HuaSheng = 44,		// 化生
    ShaQiuMoKu = 16,	// 沙丘魔窟
    ShiLianChou = 22,	// 十连抽
    BianQiang = 23,		// 变强
    ChiBang = 70,		// 翅膀
    SuoMoTa = 16,		// 锁魔塔
    LeiTingFeiFu = 70,	// 雷霆飞斧
    CaiDieNu = 70,		// 彩蝶怒
    YiDongSheJi = 70,	// 移动射击
    QianZhenQuan = 70,	// 千甄拳
    RiChangRenWu = 10,	// 日常任务
    JingJiChang = 16,	// 竞技场
    ZhuangBeiFuJia = 4,	// 装备附加
    DouShouChang = 16,	// 斗兽场
    JiaoYiHang = 20,	// 交易行
    XingYao = 8,		// 星曜
    KuaFuTuTeng = 70,	// 夸父图腾
    AnHunMeng = 70,		// 安魂梦
    XuanZhuanDaoShan = 70, // 旋转刀扇	
    SongZhongPo = 70,	// 颂钟破
    SiKuDao = 16,		// 死骷岛
    DouJiZhiWang = 18,	// 斗技之王
    CangJinGuMu = 16,	// 藏金古墓
    GuHunYiJi = 16,		// 孤魂遗迹
    TuanDuiFuBen = 16,	// 团队副本
    LongJingKuangChang = 16,	// 龙晶矿场
    LingDiXiTong = 58,		// 领地系统

    YinYuan = 11,			// 姻缘
    YuanSuZhiXin = 41,		// 元素之心
    FengMoLianZhan = 70,	// 疯魔连斩
    HongHuangLi = 70,		// 洪荒力
    GaoSheDaoDan = 70,		// 高射导弹
    JueDuiLingYu = 70,		// 绝对领域
    ShanHaiShuLing = 8,		// 山海书灵
    QiChongLieQu = 41,		// 骑宠猎取

    ZhuanHuan = 24,			// 转换
    BangHuiShenDian = 6,	// 帮会神殿
    DouZhenZhengBa = 18,	// 斗阵争霸
    TianQiZhiLun = 8,		// 天启之轮
    TianTiSai = 18,			// 天梯赛
    LongHai = 8,			// 龙骸
    TianShaZhiZhan = 16,	// 天煞之战
    MeiRiZhuanXiang = 23,	// 每日专享
    JueSiZhanChang = 18,	// 决死战场
    BaiLianZhanChang = 18,	// 百炼战场
    QingLvJingJi = 18,		// 情侣竞技
    YingGuangBaoShi = 61,	// 荧光宝石
    LingGeXiuLian = 16,		// 灵格修炼
    CangBaoMiJing = 62,		// 藏宝秘境
    DuZunZhanChang = 17,	// 独尊战场
    WuXingPai = 64,			// 五行牌
    QiChongJiNeng = 41,		// 骑宠技能
    ShenQiZaiZao = 4,		// 神器再造
    ChiBangHuanYu = 50,		// 翅膀幻羽
    ChiBangYangLing = 51,	// 翅膀阳灵
    ChiBangYinLIng = 52,	// 翅膀阴灵
    ChengJiuWenZhang = 55,	// 成就纹章
    JunXianXunZhang = 56,	// 军衔勋章
    LangYanZhanChang = 6,	// 狼烟战场
    GuaShi = 61,			// 卦石
    JinDiXiuLian = 16,		// 禁地修炼
}
/** 主界面功能按钮区域enum */
enum MainViewBoxEnum {
    TopBtnBox1 = 1,         // 上边区域1
    TopBtnBox2 = 2,         // 上边区域2
    RightBtnBox = 3         // 右边区域
}
/**
 * Vip特权类型
 */
enum VipPrivilegeEnum {
    SuiShenXiuLi = 4001,    // 随身修理
    SuiShenCangKu = 5001,   // 随身仓库
    SuiShenYaoDian = 6001,  // 随身药店
    ZiDongHuiShou = 7001    // 自动回收
}
/** 福利活动类型 对应 ActivityTypes */
enum FuLiActivityEnum {
    None = 0, // 无定义
    InputFirst = 1, // 首充大礼
    InputFanLi = 2, // 充值返利
    InputJiaSong = 3, // 充值加送
    InputKing = 4, // 充值王 
    LevelKing = 5, // 冲级王
    EquipKing = 6, // 装备王====>修改成boss王 
    HorseKing = 7, // 坐骑王====>修改成武学王
    JingMaiKing = 8, // 经脉王====>采用新的经脉系统计算
    JieriDaLiBao = 9, // 节日礼包
    JieriDengLuHaoLi = 10, // 节日登录
    JieriVIP = 11, // VIP大回馈
    JieriCZSong = 12, // 节日每日充值
    JieriLeiJiCZ = 13, // 节日期间累计充值
    JieriZiKa = 14, // 节日兑换
    JieriPTXiaoFeiKing = 15, // 节日期间平台消费王
    JieriPTCZKing = 16, // 节日期间平台充值王
    JieriBossAttack = 17, // 节日期间Boss攻城
    HeFuLogin = 20, // 合服登陆好礼
    HeFuTotalLogin = 21, // 合服累计登陆
    HeFuShopLimit = 22, // 合服商店限购
    HeFuRecharge = 23, // 合服充值返利
    HeFuPKKing = 24, // 合服PK王
    HeFuAwardTime = 25,	// 奖励翻倍（为战而生）
    HeFuBossAttack = 26, // BOSS之战
    MeiRiChongZhiHaoLi = 27,  // 每日充值豪礼
    NewZoneUpLevelMadman = 33, // -----------冲级狂人---new
    NewZoneRechargeKing = 34, // -------------充值达人---new
    NewZoneConsumeKing = 35, // ------------- 消费达人---new
    NewZoneBosskillKing = 36, // -------------屠魔勇士---new
    NewZoneFanli = 37, // --------------------劲爆返利---new
    NewZoneWing = 45, // --------------------羽翼勇士---new

    TotalCharge = 38, // 累计充值   回馈
    TotalConsume = 39, // 累计消费  回馈

    HeFuDaLiBao = 20, // 合服VIP大回馈   
    HeFuCZFanLi = 23, // 合服充值返利
    HefuLuolanZhengba = 44, // 合服龙城争霸

    TeHuiHaoLi = 75,            // 特惠豪礼
    MeiRiChongZhiNew = 76,      // 每日充值（新1元、3元、6元）
    DonwloadResReward = 77,     // 下载完整包资源奖励

    QiRiKuangHuanLogin = 1,     // 七日狂欢登录
    QiRiKuangHuanChongZhi = 2,  // 七日狂欢充值
    QiRiKuangHuanGoal = 3,      // 七日狂欢目标
    QiRiKuangHuanBuy = 4,       // 七日狂欢抢购
}
/**
 * 节日活动的相关领取状态
 */
enum JieRiRewardGiftGainState {
    CanGain = 0,            // 可领取
    Gained = 1,             // 已领取   
    CanNotGain = 2,         // 不可领取
    OverTime = 3,           // 超时
    NotNeedGain = 4,        // 不需要领取(平台充值王用)
}

/** 奖励状态 */
enum RewardState {
    /** 无效标识（未赋值） */
    Invalid,
    /** 未领取状态（未达成） */
    Not,
    /** 可领取状态 */
    Can,
    /** 已领取状态 */
    Had
}
/**
 * 商城类型
 */
enum MallType {
    BuyLimit = 100000,            // 限购商城
    Diamond = 100,                // 钻石商城	
    BindingDiamond = 10000,       // 绑定钻石商城	
    Silver = 20000                // 银币商城	
}

/** 活动提示类型（节点）| 小红点 */
enum ActivityTipTypes {
    Invalid = -1,                   // 无效类型
    Root,                           // 根节点
    MainQiehuanIcon = 100,          // 主界面的切换按钮
    JiaoyiHangIcon = 900,           // 主界面交易行图标
    JiaoyiRecord = 901,             // 交易记录按钮
    MainHuoDongIcon = 1000,         // 主活动图标 (客户端判断)
    RiChangHuoDong,                 // 日常活动 (客户端判断)
    ShiJieBoss,	                    // 世界Boss 
    VIPHuoDong,	                    // 付费Boss (客户端判断)
    ShouFeiBoss,                    // 付费Boss (客户端判断)
    HuangJinBoss,                   // 灵魂狩猎
    RiChangHuoDongOther,            // 其他日常活动(除黄金Boss) (客户端判断)
    AngelTemple,                    // 死骷岛
    TianTiMonthRankAwards,          // 天梯上月段位排行奖励
    KuafuActivity = 1100,           // 跨服活动

    HonourSystem = 1200,                    // 荣耀系统
    HonourChengHao = 1210,                  // 荣耀系统-称号系统
    HonourChengHaoTouxianActive = 1211,     // 荣耀系统-称号系统-头衔升星提示（激活）
    HonourChengHaoWenzhang = 1212,          // 荣耀系统-称号系统-纹章升级提示
    HonourChengHaoActivity = 1213,          // 荣耀系统-称号系统-活动称号
    HonourJunXian = 1220,                   // 荣耀系统-军衔系统
    HonourJunXianPanel = 1221,              // 荣耀系统-军衔系统-军衔升级提示
    HonourJunXianXunZhang = 1222,           // 荣耀系统-军衔系统-勋章升级提示
    HonourChengHaoTouxianUpgrade = 1223,    // 荣耀系统-称号系统-头衔升阶提示（升阶）
    HonourChengJiu = 1230,                  // 荣耀系统-成就系统
    HonourChengJiu_1 = 1231,                // 荣耀系统-成就系统1
    HonourChengJiu_2 = 1232,                // 荣耀系统-成就系统2
    HonourChengJiu_3 = 1233,                // 荣耀系统-成就系统3
    HonourChengJiu_4 = 1234,                // 荣耀系统-成就系统4
    HonourChengJiu_5 = 1235,                // 荣耀系统-成就系统5
    HonourChengJiu_6 = 1236,                // 荣耀系统-成就系统6
    HonourChengJiu_7 = 1237,                // 荣耀系统-成就系统7
    HonourChengJiu_8 = 1238,                // 荣耀系统-成就系统8

    MaoxianSystem = 1300,         // 冒险界面系统
    RichangMaoxian = 1301,        // 冒险->日常(改为冒险)
    SuoMoTa = 1305,               // 冒险->日常->锁魔塔

    ZhanChangSystem = 1400,       // 战场界面系统
    PersonalZhanchang = 1401,     // 战场->个人战场
    BangHuiZhanChang = 1420,      // 战场->帮会战场
    LongYingChengZhan = 1421,     // 帮会战场->龙影城战

    FengYunZhiSystem = 1500,      // 风云志系统
    ShanHaiQuanShu = 1510,        // 山海全书
    ShanHaiTuJian = 1511,         // 图鉴
    ShanHaiSouler = 1512,         // 书灵
    LongHai = 1530,               // 龙骸

    QichongSystem = 1600,         // 骑宠系统
    ZuoqiLieDui = 1601,           // 骑宠系统-坐骑列队
    ZuoqiShuxing = 1602,          // 骑宠系统-坐骑列队-属性
    ZuoqiLevelup = 1603,          // 骑宠系统-坐骑列队-属性-坐骑升级
    ZuoqiSkill = 1604,            // 骑宠系统-坐骑列队-技能
    ZuoqiSkillLingwu = 1605,      // 骑宠系统-坐骑列队-技能-坐骑技能领悟
    ZuoqiSkillLevelup = 1606,     // 骑宠系统-坐骑列队-技能-坐骑技能升级
    ZuoqiGoodIcon = 1607,         // 骑宠系统-坐骑图标小红点

    Mengchongpart = 1610,       // 骑宠系统-萌宠
    MengchongEggFuhuan = 1611,  // 骑宠系统-萌宠-萌宠蛋孵化
    MengchongLingqu = 1612,     // 骑宠系统-萌宠-萌宠领取
    MengchongFeed = 1613,       // 骑宠系统-萌宠-萌宠喂养

    FriendPart = 1700,          // 好友系统
    Friend_NewFriend = 1701,    // 新好友
    Friend_NewEnemy = 1702,     // 新仇人    
    Friend_Pingbi = 1703,       // 屏蔽

    JuQingFuBen = 2000,         // 剧情副本 (客户端判断)
    ZuDuiFuBen,                 // 组队副本 (客户端判断)
    RiChangFuBen,               // 日常副本 (客户端判断)
    KuaFuFuBen,                 // 跨服副本 (客户端判断)
    FuBenTabs = 2100,           // 副本列表项,保留100个序号
    FuBenItems = 2200,          // 副本列表项,保留100个序号

    MainFuLiIcon = 3000,        // 主福利图标
    FuLiChongZhiHuiKui,         // 充值回馈
    ShouCiChongZhi,             // 充值回馈-首次充值 (OK)
    MeiRiChongZhi,              // 充值回馈-每日充值 (OK)
    LeiJiChongZhi,              // 充值回馈-累积充值
    LeiJiXiaoFei,               // 充值回馈-累计消费
    FuLiMeiRiHuoYue,            // 每日活跃 (OK)
    FuLiLianXuDengLu,               // 连续登录 (OK)
    FuLiLeiJiDengLu,                // 累计登陆 (OK)
    FuLiMeiRiZaiXian,               // 每日在线 (OK)
    FuLiUpLevelGift,                // 等级奖励 (OK)
    ShouCiChongZhi_YiLingQu,        // 首次充值-已领取
    MeiRiChongZhi_YiLingQu,         // 每日充值-已领取
    FuLiYueKaFanLi = 3013,          // 月卡用户
    ZuDuiXiaoXi = 3014,             // 组队消息（客户端判断）
    TeHuiHaoLiChongZhi_YiWanCheng,  // 特惠豪礼-已完成
    MeiRiLiBao_YiWanCheng,          // 每日礼包-已全部完成
    DownloadRes_YiLingQu,           // 下载完整资源包-已领取
    FuLiDailyWelfare = 3018,        // 每日福利（客户端判断）

    MainJingJiChangIcon = 4000,     // 主竞技场图标
    JingJiChangJiangLi,             // 奖励预览
    JingJiChangJunXian,             // 军衔提升
    JingJiChangLeftTimes,           // 剩余挑战次数

    MainGongNeng = 5000,            // 主功能图标 (客户端判断)
    MainMingXiangIcon = 5001,       // 功能里的潜心修炼图标 (客户端判断)
    MainEmailIcon = 5002,           // 功能里的邮件图标

    MainXinFuIcon = 6000,           // 主新服图标
    XinFuLevel = 6001,              // 练级狂人 (客户端判断)
    XinFuKillBoss = 6002,           // 屠魔勇士
    XinFuChongZhiMoney = 6003,      // 充值达人
    XinFuUseMoney = 6004,           // 消费达人
    XinFuFreeGetMoney = 6005,       // 劲爆返利
    YuYiYongShi = 6006,             // 羽翼勇士 (客户端判断)

    MainMeiRiBiZuoIcon = 7000,      // 每日必做图标
    ZiYuanZhaoHui = 7001,             // 资源追回

    QiFuIcon = 8000,                // 祈福功能
    QiFuFreeIcon = 8001,            // 十连抽免费抽取      

    MainTopIcon = 9001,             // 排行榜图标

    VIPGongNeng = 10000,            // vip功能
    VIPGifts = 10001,               // vip礼包
    BuChangIcon = 11000,            // 补偿
    ShuiJingHuangJin = 13000,       // 龙晶矿场   

    HeFuActivity = 12000,        // 合服活动总叹号
    HeFuLogin = 12001,           // 合服登陆
    HeFuTotalLogin = 12002,      // 合服累计登陆
    HeFuRecharge = 12003,        // 合服充值返利 
    HeFuPKKing = 12004,          // 合服战场之神
    HeFuLuolanZhengba = 12005,   // 龙城争霸

    JieRiActivity = 14000,       // 节日活动总叹号
    JieRiLogin = 14001,          // 节日登陆
    JieRiTotalLogin = 14002,     // 节日累计登陆
    JieRiDayCZ = 14003,          // 节日每日充值 
    JieRiLeiJiXF = 14004,        // 节日累计消费 
    JieRiLeiJiCZ = 14005,        // 节日累计充值 
    JieRiCZKING = 14006,         // 节日充值王 
    JieRiXFKING = 14007,         // 节日消费王 

    JieRiGive = 14008,           // 节日赠送
    JieRiGiveKing = 14009,       // 节日赠送王
    JieRiRecvKing = 14010,       // 节日收取王
    JieriWing = 14011,           // 节日翅膀返利
    JieriAddon = 14012,          // 节日追加返利
    JieriStrengthen = 14013,     // 节日强化返利
    JieriAchievement = 14014,    // 节日成就返利
    JieriMilitaryRank = 14015,   // 节日军衔返利
    JieriVIPFanli = 14016,       // 节日VIP返利
    JieriAmulet = 14017,         // 节日护身符返利
    JieriArchangel = 14018,      // 节日大天使返利
    JieriJiehun = 14019,         // 婚姻返利
    JieRiLianXuCharge = 14020,   // 节日连续充值
    JieRiRecv = 14021,           // 节日收礼
    JieRiIPointsExchg = 14023,   // 节日积分兑换

    JieRiLoongCollect = 14024,   // Loong 节日收集
    JieRiLoongDouble = 14025,    // Loong 节日双倍来袭

    GuildIcon = 15000,              // 帮派界面
    GuildCopyMap = 15001,           // 有没领取的帮派副本的奖励
    LangHunLingYuIcon = 15002,      // 狼魂领域奖励提示
    LangHunLingYuFightIcon = 15003, // 有没狼烟战场城池参战资格
    GuildActivity = 15004,          // 帮派活动页签
    FamilyMembersIcon = 15005,      // 帮会成员页签

    ZhanMengWaiJiaoIconTip = 14111,    // 帮派界面的帮派外交按钮感叹号显示
    ZhanMengWaiJiaoRequestTip = 14112, // 帮派外交-帮派请求 感叹号显示
    ZhanMengWaiJiaoInfoTip = 14113,    // 帮派外交-结盟信息 感叹号显示

    PlayerRecallActivity = 14100,   // 老玩家召回最外面的叹号
    Recall_Rewards = 14101,         // 召回奖励
    Recall_GiftSet = 14102,         // 回归礼包
    Recall_SignIn = 14103,          // 回归签到
    TipSpread = 14105,              // 推广系统            
    Recall_MyReference = 14104,     // 我的推荐人, 召回结果
    FundChangeLife = 14106,         // 基金——重生
    FundLogin = 14107,              // 基金——登陆
    FundMoney = 14108,              // 基金——豪气
    Fund = 14109,                   // 基金

    ZhuanXiang = 14110,         // 专享活动
    IDBinging = 14111,          // 账号绑定
    SevenDayActivity = 17000,   // 七日狂欢活动外面叹号
    SevenDayLogin = 17001,      // 七日狂欢登录
    SevenDayCharge = 17002,     // 七日充值
    SevenDayGoal = 17003,       // 七日目标
    SevenDayBuy = 17004,        // 七日抢购

    SevenDayGoal_1 = 17005, // 七日目标第1天
    SevenDayGoal_2 = 17006, // 七日目标第2天
    SevenDayGoal_3 = 17007, // 七日目标第3天
    SevenDayGoal_4 = 17008, // 七日目标第3天
    SevenDayGoal_5 = 17009, // 七日目标第5天
    SevenDayGoal_6 = 17010, // 七日目标第6天
    SevenDayGoal_7 = 17011, // 七日目标第7天

    BuildingIcon = 15050,         // 领地系统icon
    ZhengBaCanJoinIcon = 15010,   //  众神争霸提示按按钮标签
    CoupleArenaCanAward = 15011,  // 夫妻竞技可领奖提示
    CoupleWishCanAward = 15012,   // 情侣排行榜可领奖提示

    MainRoleIcon = 18000,         // 主界面左上角人物按钮tip
    MainParcelIcon = 18001,       // 主界面背包按钮
    RolePageIcon = 18100,         // 人物面版角色页签按钮tip
    AddPropertyPointIcon = 18101, // 人物面版角色子面板加点按钮tip
    WingUpgradeButton = 18102,    // 翅膀升级按钮

    MainBianQiangIcon = 19000,    // 主变强图标
    BianQiangMeiRiHuoYue = 19001, // 每日活跃

    // 人物技能相关
    RoleSkill = 20001,              // 人物技能
    RoleSkillLevel = 20002,         // 人物技能升级(普通)
    RoleSkillYJLevel = 20003,       // 人物技能升级(一键升级)

    Fashion = 21000,                // 时装激活
    PetTuJian = 22000,              // 宠物图鉴 
    PetTuJian_Putong = 22001,       // 宠物图鉴_普通
    PetTuJian_Xiyou = 22002,        // 宠物图鉴_稀有
    PetTuJian_Jueshi = 22003,       // 宠物图鉴_绝世

    Title = 23000,                  // 称号
    Title_Putong = 23001,           // 称号_普通
    Title_Xiyou = 23002,            // 称号_稀有
    Title_Rongyao = 23003,          // 称号_荣耀
}
/**
 * 登录豪礼领取类型
 */
enum AwardType {
    Normal = 1,            // 普通
    Vip = 2,                  // VIP
}
/** 充值奖励状态 */
enum chargeStateEnum {
    /** 未充值 */
    Not = 0,
    /** 可领取 */
    Can = 1,
    /** 已领取 */
    Had = 2,
}
/** 图腾枚举 */
enum TotemTypeEnum {
    /** 虬龙图腾 */
    QiuLong = 1,
    /** 蛟龙图腾 */
    JiaoLong = 2,
    /** 螭龙图腾 */
    LiLong = 3,
}
/** 图腾奖励类型 */
enum ToTemAwardTypes {
    None = 0,
    /** 主动技能 */
    MainSkill = 1,
    /** 被动技能 */
    PassiveSkill = 2,
    /** 激活某种特殊能力 */
    ToTemMagic = 3,
}
/** 图腾进度类型 */
enum ToTemStateEnum {
    /** 未获得 */
    WeiHuoDe = 0,
    /** 可获得 */
    KeHuoDe = 1,
    /** 已获得 */
    YiHuoDe = 2,
    /** 进行中 */
    JinXingZhong = 3,
}
/** 图腾魔法类型 */
enum TotemMagicTypes {
    AddBuff = 1,
    VIP = 2,
    Battle = 3,
}
/** 任务刷新类型枚举 */
enum TaskRefreshType {
    Refresh_Force = -1,
    Refresh_NewTask = 0,
    Refresh_ModTask = 1,
    Refresh_ComTask = 2,
}
/** 任务排序枚举 */
enum TaskSortType {
    TaskSort_None = 0,            //初始无效状态
    TaskSort_Mod = 1,            //任务修改
    TaskSort_Com = 2,            //任务完成
    TaskSort_New = 3,            //任务接受
    TaskSort_Limit = 4,          //任务不可进行（限制等级）
}
/** 商人类型枚举 */
enum BussinessTypeEnum {
    /** 斗气商人 */
    BussinessDouQi = 0,
    /** 帮会商人 */
    BussinessBangHui = 1,
    /** 寻龙商人(道具) */
    BussinessXunLong = 2,

}
/**
 * 活动类型
 */
enum ActivityCategorys {
    /** 剧情副本 */
    JuQingFuBen = 0,
    /** 组队副本 */
    ZuDuiFuBen = 1,
    /** 日常副本 */
    RiChangFuBen = 2,
    /** 日常活动 */
    RiChangHuoDong = 3,
    /** 世界Boss */
    ShiJieBoss = 4,
    /** 付费Boss */
    VIPHuoDong = 5,
    /** 孤魂遗迹 */
    GuZhanChang = 6,
    /** 付费Boss */
    ShouFeiBoss = 7,
    /** 龙晶矿场 */
    ShuiJingHuanJing = 8,
    /** 跨服副本 */
    KuaFuFuBen = 9,
    /** 藏金古墓 金币副本 */
    RiChangFuBenJinBi = 10,
}