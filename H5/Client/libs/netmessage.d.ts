// DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run types'.


declare namespace NetMsg {


    /** Properties of a CToGS_Login. */
    interface ICToGS_Login {

        /** CToGS_Login Info */
        Info?: (string|null);
    }

    /** Represents a CToGS_Login. */
    class CToGS_Login implements ICToGS_Login {

        /**
         * Constructs a new CToGS_Login.
         * @param [properties] Properties to set
         */
        constructor(properties?: ICToGS_Login);

        /** CToGS_Login Info. */
        public Info: string;

        /**
         * Encodes the specified CToGS_Login message. Does not implicitly {@link CToGS_Login.verify|verify} messages.
         * @param message CToGS_Login message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ICToGS_Login, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CToGS_Login message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CToGS_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CToGS_Login;
    }

    /** Properties of a GoodsData. */
    interface IGoodsData {

        /** 数据库流水ID */
        Id?: (number|null);

        /** 物品ID */
        GoodsID?: (number|null);

        /** 是否正在使用 */
        Using?: (number|null);

        /** 锻造级别 */
        ForgeLevel?: (number|null);

        /** 开始使用的时间 */
        Starttime?: (string|null);

        /** 物品使用截止时间 */
        Endtime?: (string|null);

        /** 所在的位置(0: 包裹, 1:仓库) */
        Site?: (number|null);

        /** 物品的品质(某些装备会分品质，不同的品质属性不同，用户改变属性后要记录下来) */
        Quality?: (number|null);

        /** 根据品质随机抽取的扩展属性的索引列表 */
        Props?: (string|null);

        /** 物品数量 */
        GCount?: (number|null);

        /** 是否绑定的物品(绑定的物品不可交易, 不可摆摊) */
        Binding?: (number|null);

        /** 根据品质随机抽取的扩展属性的索引列表 */
        Jewellist?: (string|null);

        /** 根据品质随机抽取的扩展属性的索引列表 */
        BagIndex?: (number|null);

        /** 出售的金币价格 */
        SaleMoney1?: (number|null);

        /** 出售的钻石价格 */
        SaleYuanBao?: (number|null);

        /** 出售的银两价格 */
        SaleYinPiao?: (number|null);

        /** 出售的银两价格 */
        AddPropIndex?: (number|null);

        /** 增加一个天生属性的百分比 */
        BornIndex?: (number|null);

        /** 装备的幸运值 */
        Lucky?: (number|null);

        /** 装备的耐久度--如果是萌宠则表示羁当前经验 */
        Strong?: (number|null);

        /** 卓越信息 -- 一个32位int32 每位代表一个卓越属性 */
        ExcellenceInfo?: (number|null);

        /** 追加等级--如果是萌宠则表示羁绊的是哪个坐骑 */
        AppendPropLev?: (number|null);

        /** 装备的重生级别 */
        ChangeLifeLevForEquip?: (number|null);

        /** 装备洗炼属性 结构: 属性ID|属性值|属性ID|属性值|属性ID|属性值... */
        WashProps?: (number[]|null);

        /** 元素之心的属性 */
        ElementhrtsProps?: (number[]|null);
    }

    /** 物品数据 */
    class GoodsData implements IGoodsData {

        /**
         * Constructs a new GoodsData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IGoodsData);

        /** 数据库流水ID */
        public Id: number;

        /** 物品ID */
        public GoodsID: number;

        /** 是否正在使用 */
        public Using: number;

        /** 锻造级别 */
        public ForgeLevel: number;

        /** 开始使用的时间 */
        public Starttime: string;

        /** 物品使用截止时间 */
        public Endtime: string;

        /** 所在的位置(0: 包裹, 1:仓库) */
        public Site: number;

        /** 物品的品质(某些装备会分品质，不同的品质属性不同，用户改变属性后要记录下来) */
        public Quality: number;

        /** 根据品质随机抽取的扩展属性的索引列表 */
        public Props: string;

        /** 物品数量 */
        public GCount: number;

        /** 是否绑定的物品(绑定的物品不可交易, 不可摆摊) */
        public Binding: number;

        /** 根据品质随机抽取的扩展属性的索引列表 */
        public Jewellist: string;

        /** 根据品质随机抽取的扩展属性的索引列表 */
        public BagIndex: number;

        /** 出售的金币价格 */
        public SaleMoney1: number;

        /** 出售的钻石价格 */
        public SaleYuanBao: number;

        /** 出售的银两价格 */
        public SaleYinPiao: number;

        /** 出售的银两价格 */
        public AddPropIndex: number;

        /** 增加一个天生属性的百分比 */
        public BornIndex: number;

        /** 装备的幸运值 */
        public Lucky: number;

        /** 装备的耐久度--如果是萌宠则表示羁当前经验 */
        public Strong: number;

        /** 卓越信息 -- 一个32位int32 每位代表一个卓越属性 */
        public ExcellenceInfo: number;

        /** 追加等级--如果是萌宠则表示羁绊的是哪个坐骑 */
        public AppendPropLev: number;

        /** 装备的重生级别 */
        public ChangeLifeLevForEquip: number;

        /** 装备洗炼属性 结构: 属性ID|属性值|属性ID|属性值|属性ID|属性值... */
        public WashProps: number[];

        /** 元素之心的属性 */
        public ElementhrtsProps: number[];

        /**
         * Encodes the specified GoodsData message. Does not implicitly {@link GoodsData.verify|verify} messages.
         * @param message GoodsData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IGoodsData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GoodsData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GoodsData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GoodsData;
    }

    /** Properties of a WingData. */
    interface IWingData {

        /** 翅膀的数据库ID */
        DbID?: (number|null);

        /** 翅膀ID */
        WingID?: (number|null);

        /** 翅膀强化的次数 */
        ForgeLevel?: (number|null);

        /** 翅膀的领养时间 */
        AddDateTime?: (number|Long|null);

        /** 本次进阶成功前失败的次数 */
        JinJieFailedNum?: (number|null);

        /** 是否使用 */
        Using?: (number|null);

        /** 升星经验值 */
        StarExp?: (number|null);

        /** 注灵次数 */
        ZhuLingNum?: (number|null);

        /** 注魂次数 */
        ZhuHunNum?: (number|null);
    }

    /** 翅膀数据 */
    class WingData implements IWingData {

        /**
         * Constructs a new WingData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IWingData);

        /** 翅膀的数据库ID */
        public DbID: number;

        /** 翅膀ID */
        public WingID: number;

        /** 翅膀强化的次数 */
        public ForgeLevel: number;

        /** 翅膀的领养时间 */
        public AddDateTime: (number|Long);

        /** 本次进阶成功前失败的次数 */
        public JinJieFailedNum: number;

        /** 是否使用 */
        public Using: number;

        /** 升星经验值 */
        public StarExp: number;

        /** 注灵次数 */
        public ZhuLingNum: number;

        /** 注魂次数 */
        public ZhuHunNum: number;

        /**
         * Encodes the specified WingData message. Does not implicitly {@link WingData.verify|verify} messages.
         * @param message WingData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IWingData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WingData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WingData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WingData;
    }

    /** Properties of a RoleData4Selector. */
    interface IRoleData4Selector {

        /** 当前的角色ID */
        RoleID?: (number|null);

        /** 当前的角色名称 */
        RoleName?: (string|null);

        /** 当前角色的性别 */
        RoleSex?: (number|null);

        /** 角色职业 */
        Occupation?: (number|null);

        /** 角色级别 */
        Level?: (number|null);

        /** 角色所属的帮派 */
        Faction?: (number|null);

        /** 称号 */
        OtherName?: (string|null);

        /** 物品数据 */
        GoodsDataList?: (IGoodsData[]|null);

        /** 翅膀数据列表 */
        MyWingData?: (IWingData|null);

        /** 战斗力 */
        CombatForce?: (number|null);

        /** 被崇拜次数 */
        AdmiredCount?: (number|null);

        /** 时装翅膀id */
        FashionWingsID?: (number|null);

        /** 二态功能设置，参考ESettingBitFlag */
        SettingBitFlags?: (number|Long|null);
    }

    /** 选择角色的数据定义 */
    class RoleData4Selector implements IRoleData4Selector {

        /**
         * Constructs a new RoleData4Selector.
         * @param [properties] Properties to set
         */
        constructor(properties?: IRoleData4Selector);

        /** 当前的角色ID */
        public RoleID: number;

        /** 当前的角色名称 */
        public RoleName: string;

        /** 当前角色的性别 */
        public RoleSex: number;

        /** 角色职业 */
        public Occupation: number;

        /** 角色级别 */
        public Level: number;

        /** 角色所属的帮派 */
        public Faction: number;

        /** 称号 */
        public OtherName: string;

        /** 物品数据 */
        public GoodsDataList: IGoodsData[];

        /** 翅膀数据列表 */
        public MyWingData?: (IWingData|null);

        /** 战斗力 */
        public CombatForce: number;

        /** 被崇拜次数 */
        public AdmiredCount: number;

        /** 时装翅膀id */
        public FashionWingsID: number;

        /** 二态功能设置，参考ESettingBitFlag */
        public SettingBitFlags: (number|Long);

        /**
         * Encodes the specified RoleData4Selector message. Does not implicitly {@link RoleData4Selector.verify|verify} messages.
         * @param message RoleData4Selector message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IRoleData4Selector, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoleData4Selector message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoleData4Selector
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RoleData4Selector;
    }

    /** Properties of an AwardsItemData. */
    interface IAwardsItemData {

        /** 职业标识 */
        Occupation?: (number|null);

        /** 物品ID */
        GoodsID?: (number|null);

        /** 物品数量 */
        GoodsNum?: (number|null);

        /** 是否绑定物品 */
        Binding?: (number|null);

        /** 物品的级别 */
        Level?: (number|null);

        /** 物品的品质 */
        Quality?: (number|null);

        /** 物品的截止时间 */
        EndTime?: (string|null);

        /** 物品的天生 */
        BornIndex?: (number|null);

        /** 性别标示 */
        RoleSex?: (number|null);

        /** 物品追加等级 */
        AppendLev?: (number|null);

        /** 是否有幸运 */
        IsHaveLuckyProp?: (number|null);

        /** 卓越属性值 */
        ExcellencePorpValue?: (number|null);
    }

    /** 物品奖励数据 */
    class AwardsItemData implements IAwardsItemData {

        /**
         * Constructs a new AwardsItemData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IAwardsItemData);

        /** 职业标识 */
        public Occupation: number;

        /** 物品ID */
        public GoodsID: number;

        /** 物品数量 */
        public GoodsNum: number;

        /** 是否绑定物品 */
        public Binding: number;

        /** 物品的级别 */
        public Level: number;

        /** 物品的品质 */
        public Quality: number;

        /** 物品的截止时间 */
        public EndTime: string;

        /** 物品的天生 */
        public BornIndex: number;

        /** 性别标示 */
        public RoleSex: number;

        /** 物品追加等级 */
        public AppendLev: number;

        /** 是否有幸运 */
        public IsHaveLuckyProp: number;

        /** 卓越属性值 */
        public ExcellencePorpValue: number;

        /**
         * Encodes the specified AwardsItemData message. Does not implicitly {@link AwardsItemData.verify|verify} messages.
         * @param message AwardsItemData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IAwardsItemData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AwardsItemData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AwardsItemData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AwardsItemData;
    }

    /** Properties of a TaskAwardsData. */
    interface ITaskAwardsData {

        /** 任务奖励 */
        TaskawardList?: (IAwardsItemData[]|null);

        /** 任务其他奖励 */
        OtherTaskawardList?: (IAwardsItemData[]|null);

        /** 任务金币奖励 */
        Moneyaward?: (number|null);

        /** 任务经验奖励 */
        Experienceaward?: (number|Long|null);

        /** 任务银两奖励 */
        YinLiangaward?: (number|null);

        /** 任务灵力奖励 */
        LingLiaward?: (number|null);

        /** 任务绑定钻石奖励 */
        BindYuanBaoaward?: (number|null);

        /** 真气奖励 */
        ZhenQiaward?: (number|null);

        /** 猎杀值奖励 */
        LieShaaward?: (number|null);

        /** 悟性值奖励 */
        WuXingaward?: (number|null);

        /** 钻石完成需要消耗钻石 */
        NeedYuanBao?: (number|null);

        /** 军功值奖励 */
        JunGongaward?: (number|null);

        /** 荣誉奖励 */
        RongYuaward?: (number|null);

        /** 完成所有环额外经验奖励 */
        AddExperienceForDailyCircleTask?: (number|null);

        /** 完成所有环额外斗气奖励 */
        AddMoJingForDailyCircleTask?: (number|null);

        /** 完成所有环额外物品奖励 */
        AddGoodsForDailyCircleTask?: (string|null);

        /** 斗气奖励 */
        MoJingaward?: (number|null);

        /** 星魂奖励 */
        XingHunaward?: (number|null);

        /** 粉末奖励 */
        FenMoAward?: (number|null);

        /** 声望奖励 */
        ShengwangAward?: (number|null);

        /** 帮会贡献值奖励 */
        SAwardBHMoney?: (number|null);
    }

    /** 任务奖励数据 */
    class TaskAwardsData implements ITaskAwardsData {

        /**
         * Constructs a new TaskAwardsData.
         * @param [properties] Properties to set
         */
        constructor(properties?: ITaskAwardsData);

        /** 任务奖励 */
        public TaskawardList: IAwardsItemData[];

        /** 任务其他奖励 */
        public OtherTaskawardList: IAwardsItemData[];

        /** 任务金币奖励 */
        public Moneyaward: number;

        /** 任务经验奖励 */
        public Experienceaward: (number|Long);

        /** 任务银两奖励 */
        public YinLiangaward: number;

        /** 任务灵力奖励 */
        public LingLiaward: number;

        /** 任务绑定钻石奖励 */
        public BindYuanBaoaward: number;

        /** 真气奖励 */
        public ZhenQiaward: number;

        /** 猎杀值奖励 */
        public LieShaaward: number;

        /** 悟性值奖励 */
        public WuXingaward: number;

        /** 钻石完成需要消耗钻石 */
        public NeedYuanBao: number;

        /** 军功值奖励 */
        public JunGongaward: number;

        /** 荣誉奖励 */
        public RongYuaward: number;

        /** 完成所有环额外经验奖励 */
        public AddExperienceForDailyCircleTask: number;

        /** 完成所有环额外斗气奖励 */
        public AddMoJingForDailyCircleTask: number;

        /** 完成所有环额外物品奖励 */
        public AddGoodsForDailyCircleTask: string;

        /** 斗气奖励 */
        public MoJingaward: number;

        /** 星魂奖励 */
        public XingHunaward: number;

        /** 粉末奖励 */
        public FenMoAward: number;

        /** 声望奖励 */
        public ShengwangAward: number;

        /** 帮会贡献值奖励 */
        public SAwardBHMoney: number;

        /**
         * Encodes the specified TaskAwardsData message. Does not implicitly {@link TaskAwardsData.verify|verify} messages.
         * @param message TaskAwardsData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ITaskAwardsData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TaskAwardsData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TaskAwardsData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TaskAwardsData;
    }

    /** Properties of a TaskData. */
    interface ITaskData {

        /** 数据库ID */
        DbID?: (number|null);

        /** 已经接受的任务列表 */
        DoingTaskID?: (number|null);

        /** 已经接受的任务数值列表1 */
        DoingTaskVal1?: (number|null);

        /** 已经接受的任务数值列表2 */
        DoingTaskVal2?: (number|null);

        /** 已经接受的任务追踪列表 */
        DoingTaskFocus?: (number|null);

        /** 任务添加的时间(单位秒) */
        AddDateTime?: (number|Long|null);

        /** 任务奖励数据 */
        TaskAwards?: (ITaskAwardsData|null);

        /** 已经做过的次数 */
        DoneCount?: (number|null);

        /** 任务星级信息 */
        StarLevel?: (number|null);
    }

    /** 任务数据 */
    class TaskData implements ITaskData {

        /**
         * Constructs a new TaskData.
         * @param [properties] Properties to set
         */
        constructor(properties?: ITaskData);

        /** 数据库ID */
        public DbID: number;

        /** 已经接受的任务列表 */
        public DoingTaskID: number;

        /** 已经接受的任务数值列表1 */
        public DoingTaskVal1: number;

        /** 已经接受的任务数值列表2 */
        public DoingTaskVal2: number;

        /** 已经接受的任务追踪列表 */
        public DoingTaskFocus: number;

        /** 任务添加的时间(单位秒) */
        public AddDateTime: (number|Long);

        /** 任务奖励数据 */
        public TaskAwards?: (ITaskAwardsData|null);

        /** 已经做过的次数 */
        public DoneCount: number;

        /** 任务星级信息 */
        public StarLevel: number;

        /**
         * Encodes the specified TaskData message. Does not implicitly {@link TaskData.verify|verify} messages.
         * @param message TaskData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ITaskData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TaskData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TaskData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TaskData;
    }

    /** Properties of a SkillData. */
    interface ISkillData {

        /** 数据库ID */
        DbID?: (number|null);

        /** 技能类型ID */
        SkillID?: (number|null);

        /** 技能类型级别 */
        SkillLevel?: (number|null);

        /** 熟练度 */
        UsedNum?: (number|null);
    }

    /** 技能数据 */
    class SkillData implements ISkillData {

        /**
         * Constructs a new SkillData.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISkillData);

        /** 数据库ID */
        public DbID: number;

        /** 技能类型ID */
        public SkillID: number;

        /** 技能类型级别 */
        public SkillLevel: number;

        /** 熟练度 */
        public UsedNum: number;

        /**
         * Encodes the specified SkillData message. Does not implicitly {@link SkillData.verify|verify} messages.
         * @param message SkillData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISkillData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SkillData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SkillData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SkillData;
    }

    /** Properties of a SkillDataList. */
    interface ISkillDataList {

        /** 技能列表 */
        list?: (ISkillData[]|null);
    }

    /** 技能列表数据 */
    class SkillDataList implements ISkillDataList {

        /**
         * Constructs a new SkillDataList.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISkillDataList);

        /** 技能列表 */
        public list: ISkillData[];

        /**
         * Encodes the specified SkillDataList message. Does not implicitly {@link SkillDataList.verify|verify} messages.
         * @param message SkillDataList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISkillDataList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SkillDataList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SkillDataList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SkillDataList;
    }

    /** Properties of a SCSkillLevelUp. */
    interface ISCSkillLevelUp {

        /** 升级结果 */
        State?: (number|null);

        /** 角色ID */
        RoleID?: (number|null);

        /** 技能DBID */
        SkillID?: (number|null);

        /** 技能等级 */
        SkillLevel?: (number|null);

        /** 熟练度 */
        SkillUsedNum?: (number|null);
    }

    /** 技能升级数据 */
    class SCSkillLevelUp implements ISCSkillLevelUp {

        /**
         * Constructs a new SCSkillLevelUp.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISCSkillLevelUp);

        /** 升级结果 */
        public State: number;

        /** 角色ID */
        public RoleID: number;

        /** 技能DBID */
        public SkillID: number;

        /** 技能等级 */
        public SkillLevel: number;

        /** 熟练度 */
        public SkillUsedNum: number;

        /**
         * Encodes the specified SCSkillLevelUp message. Does not implicitly {@link SCSkillLevelUp.verify|verify} messages.
         * @param message SCSkillLevelUp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISCSkillLevelUp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SCSkillLevelUp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SCSkillLevelUp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SCSkillLevelUp;
    }

    /** Properties of a NPCTaskState. */
    interface INPCTaskState {

        /** NPC的ID */
        NPCID?: (number|null);

        /** 任务状态 */
        TaskState?: (number|null);
    }

    /** NPC的任务状态 */
    class NPCTaskState implements INPCTaskState {

        /**
         * Constructs a new NPCTaskState.
         * @param [properties] Properties to set
         */
        constructor(properties?: INPCTaskState);

        /** NPC的ID */
        public NPCID: number;

        /** 任务状态 */
        public TaskState: number;

        /**
         * Encodes the specified NPCTaskState message. Does not implicitly {@link NPCTaskState.verify|verify} messages.
         * @param message NPCTaskState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: INPCTaskState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NPCTaskState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NPCTaskState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): NPCTaskState;
    }

    /** Properties of a BufferData. */
    interface IBufferData {

        /** Buffer的ID */
        BufferID?: (number|null);

        /** Buffer开始计时的时间 */
        StartTime?: (number|Long|null);

        /** Buffer计时秒数长度 */
        BufferSecs?: (number|null);

        /** Buffer的动态值 */
        BufferVal?: (number|Long|null);

        /** Buffer的类型（0:DBBuffer、1:临时Buffer） */
        BufferType?: (number|null);
    }

    /** Buffer数据 */
    class BufferData implements IBufferData {

        /**
         * Constructs a new BufferData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IBufferData);

        /** Buffer的ID */
        public BufferID: number;

        /** Buffer开始计时的时间 */
        public StartTime: (number|Long);

        /** Buffer计时秒数长度 */
        public BufferSecs: number;

        /** Buffer的动态值 */
        public BufferVal: (number|Long);

        /** Buffer的类型（0:DBBuffer、1:临时Buffer） */
        public BufferType: number;

        /**
         * Encodes the specified BufferData message. Does not implicitly {@link BufferData.verify|verify} messages.
         * @param message BufferData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IBufferData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BufferData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BufferData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BufferData;
    }

    /** Properties of an OtherBufferData. */
    interface IOtherBufferData {

        /** Buffer的ID */
        BufferID?: (number|null);

        /** Buffer开始计时的时间 */
        StartTime?: (number|Long|null);

        /** Buffer计时秒数长度 */
        BufferSecs?: (number|null);

        /** Buffer的动态值 */
        BufferVal?: (number|Long|null);

        /** Buffer的类型(0:DBBuffer 1:临时Buffer) */
        BufferType?: (number|null);

        /** buff所在对象的RoleID */
        RoleID?: (number|null);
    }

    /** Buffer数据 */
    class OtherBufferData implements IOtherBufferData {

        /**
         * Constructs a new OtherBufferData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IOtherBufferData);

        /** Buffer的ID */
        public BufferID: number;

        /** Buffer开始计时的时间 */
        public StartTime: (number|Long);

        /** Buffer计时秒数长度 */
        public BufferSecs: number;

        /** Buffer的动态值 */
        public BufferVal: (number|Long);

        /** Buffer的类型(0:DBBuffer 1:临时Buffer) */
        public BufferType: number;

        /** buff所在对象的RoleID */
        public RoleID: number;

        /**
         * Encodes the specified OtherBufferData message. Does not implicitly {@link OtherBufferData.verify|verify} messages.
         * @param message OtherBufferData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IOtherBufferData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OtherBufferData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OtherBufferData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): OtherBufferData;
    }

    /** Properties of a BufferDataMini. */
    interface IBufferDataMini {

        /** Buffer的ID */
        BufferID?: (number|null);

        /** Buffer开始计时的时间 */
        StartTime?: (number|Long|null);

        /** Buffer计时秒数长度 */
        BufferSecs?: (number|null);

        /** Buffer的动态值 */
        BufferVal?: (number|Long|null);

        /** Buffer的类型(0:DBBuffer 1:临时Buffer) */
        BufferType?: (number|null);
    }

    /** buffer mini 数据 */
    class BufferDataMini implements IBufferDataMini {

        /**
         * Constructs a new BufferDataMini.
         * @param [properties] Properties to set
         */
        constructor(properties?: IBufferDataMini);

        /** Buffer的ID */
        public BufferID: number;

        /** Buffer开始计时的时间 */
        public StartTime: (number|Long);

        /** Buffer计时秒数长度 */
        public BufferSecs: number;

        /** Buffer的动态值 */
        public BufferVal: (number|Long);

        /** Buffer的类型(0:DBBuffer 1:临时Buffer) */
        public BufferType: number;

        /**
         * Encodes the specified BufferDataMini message. Does not implicitly {@link BufferDataMini.verify|verify} messages.
         * @param message BufferDataMini message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IBufferDataMini, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BufferDataMini message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BufferDataMini
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BufferDataMini;
    }

    /** Properties of a DailyTaskData. */
    interface IDailyTaskData {

        /** 环的ID */
        HuanID?: (number|null);

        /** 跑环的日子 */
        RecTime?: (string|null);

        /** 跑环的次数 */
        RecNum?: (number|null);

        /** 跑环的任务类型 */
        TaskClass?: (number|null);

        /** 额外的次数天ID */
        ExtDayID?: (number|null);

        /** 额外的次数 */
        ExtNum?: (number|null);
    }

    /** 公告消息数据 */
    class DailyTaskData implements IDailyTaskData {

        /**
         * Constructs a new DailyTaskData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IDailyTaskData);

        /** 环的ID */
        public HuanID: number;

        /** 跑环的日子 */
        public RecTime: string;

        /** 跑环的次数 */
        public RecNum: number;

        /** 跑环的任务类型 */
        public TaskClass: number;

        /** 额外的次数天ID */
        public ExtDayID: number;

        /** 额外的次数 */
        public ExtNum: number;

        /**
         * Encodes the specified DailyTaskData message. Does not implicitly {@link DailyTaskData.verify|verify} messages.
         * @param message DailyTaskData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IDailyTaskData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DailyTaskData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DailyTaskData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DailyTaskData;
    }

    /** Properties of a DailyJingMaiData. */
    interface IDailyJingMaiData {

        /** 冲穴的日子 */
        JmTime?: (string|null);

        /** 冲穴的次数 */
        JmNum?: (number|null);
    }

    /** 每日的已经冲穴次数数据 */
    class DailyJingMaiData implements IDailyJingMaiData {

        /**
         * Constructs a new DailyJingMaiData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IDailyJingMaiData);

        /** 冲穴的日子 */
        public JmTime: string;

        /** 冲穴的次数 */
        public JmNum: number;

        /**
         * Encodes the specified DailyJingMaiData message. Does not implicitly {@link DailyJingMaiData.verify|verify} messages.
         * @param message DailyJingMaiData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IDailyJingMaiData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DailyJingMaiData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DailyJingMaiData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DailyJingMaiData;
    }

    /** Properties of a PortableBagData. */
    interface IPortableBagData {

        /** 用户扩展的格子个数 */
        ExtGridNum?: (number|null);

        /** 当前物品使用的格子的个数（不存数据库，每次加载后计算） */
        GoodsUsedGridNum?: (number|null);
    }

    /** 随身仓库数据 */
    class PortableBagData implements IPortableBagData {

        /**
         * Constructs a new PortableBagData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IPortableBagData);

        /** 用户扩展的格子个数 */
        public ExtGridNum: number;

        /** 当前物品使用的格子的个数（不存数据库，每次加载后计算） */
        public GoodsUsedGridNum: number;

        /**
         * Encodes the specified PortableBagData message. Does not implicitly {@link PortableBagData.verify|verify} messages.
         * @param message PortableBagData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IPortableBagData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PortableBagData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PortableBagData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PortableBagData;
    }

    /** Properties of a FuBenData. */
    interface IFuBenData {

        /** 副本的ID */
        FuBenID?: (number|null);

        /** 日期ID */
        DayID?: (number|null);

        /** 当日进入的次数 */
        EnterNum?: (number|null);

        /** 最快通关时间 */
        QuickPassTimer?: (number|null);

        /** 今日完成次数 */
        FinishNum?: (number|null);
    }

    /** 副本数据 */
    class FuBenData implements IFuBenData {

        /**
         * Constructs a new FuBenData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IFuBenData);

        /** 副本的ID */
        public FuBenID: number;

        /** 日期ID */
        public DayID: number;

        /** 当日进入的次数 */
        public EnterNum: number;

        /** 最快通关时间 */
        public QuickPassTimer: number;

        /** 今日完成次数 */
        public FinishNum: number;

        /**
         * Encodes the specified FuBenData message. Does not implicitly {@link FuBenData.verify|verify} messages.
         * @param message FuBenData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IFuBenData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FuBenData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FuBenData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): FuBenData;
    }

    /** Properties of a YaBiaoData. */
    interface IYaBiaoData {

        /** 押镖ID */
        YaBiaoID?: (number|null);

        /** 开始时间 */
        StartTime?: (number|Long|null);

        /** 押镖状态（0:正常, 1:失败） */
        State?: (number|null);

        /** 接镖时的线路ID */
        LineID?: (number|null);

        /** 是否做了投保, 0: 没做 1:做了 */
        TouBao?: (number|null);

        /** 押镖的日ID */
        YaBiaoDayID?: (number|null);

        /** 每日押镖的次数 */
        YaBiaoNum?: (number|null);

        /** 是否取到了货物 */
        TakeGoods?: (number|null);
    }

    /** 押镖数据 */
    class YaBiaoData implements IYaBiaoData {

        /**
         * Constructs a new YaBiaoData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IYaBiaoData);

        /** 押镖ID */
        public YaBiaoID: number;

        /** 开始时间 */
        public StartTime: (number|Long);

        /** 押镖状态（0:正常, 1:失败） */
        public State: number;

        /** 接镖时的线路ID */
        public LineID: number;

        /** 是否做了投保, 0: 没做 1:做了 */
        public TouBao: number;

        /** 押镖的日ID */
        public YaBiaoDayID: number;

        /** 每日押镖的次数 */
        public YaBiaoNum: number;

        /** 是否取到了货物 */
        public TakeGoods: number;

        /**
         * Encodes the specified YaBiaoData message. Does not implicitly {@link YaBiaoData.verify|verify} messages.
         * @param message YaBiaoData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IYaBiaoData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a YaBiaoData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns YaBiaoData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): YaBiaoData;
    }

    /** Properties of a BangHuiLingDiItemData. */
    interface IBangHuiLingDiItemData {

        /** 领地ID */
        LingDiID?: (number|null);

        /** 帮派的ID */
        BHID?: (number|null);

        /** 区的ID */
        ZoneID?: (number|null);

        /** 帮派的名称 */
        BHName?: (string|null);

        /** 领地税率 */
        LingDiTax?: (number|null);

        /** 帮会战争请求字段 */
        WarRequest?: (string|null);

        /** 领地每日奖励领取日 */
        AwardFetchDay?: (number|null);
    }

    /** 领地占领数据（简单） */
    class BangHuiLingDiItemData implements IBangHuiLingDiItemData {

        /**
         * Constructs a new BangHuiLingDiItemData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IBangHuiLingDiItemData);

        /** 领地ID */
        public LingDiID: number;

        /** 帮派的ID */
        public BHID: number;

        /** 区的ID */
        public ZoneID: number;

        /** 帮派的名称 */
        public BHName: string;

        /** 领地税率 */
        public LingDiTax: number;

        /** 帮会战争请求字段 */
        public WarRequest: string;

        /** 领地每日奖励领取日 */
        public AwardFetchDay: number;

        /**
         * Encodes the specified BangHuiLingDiItemData message. Does not implicitly {@link BangHuiLingDiItemData.verify|verify} messages.
         * @param message BangHuiLingDiItemData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IBangHuiLingDiItemData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BangHuiLingDiItemData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BangHuiLingDiItemData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BangHuiLingDiItemData;
    }

    /** Properties of a TalentEffectInfo. */
    interface ITalentEffectInfo {

        /** 效果类型 */
        EffectType?: (number|null);

        /** 效果id */
        EffectID?: (number|null);

        /** 效果值 */
        EffectValue?: (number|null);
    }

    /** 效果数据 */
    class TalentEffectInfo implements ITalentEffectInfo {

        /**
         * Constructs a new TalentEffectInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: ITalentEffectInfo);

        /** 效果类型 */
        public EffectType: number;

        /** 效果id */
        public EffectID: number;

        /** 效果值 */
        public EffectValue: number;

        /**
         * Encodes the specified TalentEffectInfo message. Does not implicitly {@link TalentEffectInfo.verify|verify} messages.
         * @param message TalentEffectInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ITalentEffectInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TalentEffectInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TalentEffectInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TalentEffectInfo;
    }

    /** Properties of a TalentEffectItem. */
    interface ITalentEffectItem {

        /** 效果id */
        ID?: (number|null);

        /** 效果等级 */
        Level?: (number|null);

        /** 天赋类型 */
        TalentType?: (number|null);

        /** 效果 */
        ItemEffectList?: (ITalentEffectInfo[]|null);
    }

    /** 效果项 */
    class TalentEffectItem implements ITalentEffectItem {

        /**
         * Constructs a new TalentEffectItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: ITalentEffectItem);

        /** 效果id */
        public ID: number;

        /** 效果等级 */
        public Level: number;

        /** 天赋类型 */
        public TalentType: number;

        /** 效果 */
        public ItemEffectList: ITalentEffectInfo[];

        /**
         * Encodes the specified TalentEffectItem message. Does not implicitly {@link TalentEffectItem.verify|verify} messages.
         * @param message TalentEffectItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ITalentEffectItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TalentEffectItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TalentEffectItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TalentEffectItem;
    }

    /** Properties of a TalentData. */
    interface ITalentData {

        /** 是否开放 */
        IsOpen?: (boolean|null);

        /** 已获取天赋点数 */
        TotalCount?: (number|null);

        /** 当前天赋点注入经验 */
        Exp?: (number|Long|null);

        /** 效果分类加点数量 */
        CountList?: ({ [k: string]: number }|null);

        /** 效果列表（天赋类型，效果列表） */
        EffectList?: (ITalentEffectItem[]|null);

        /** 单个技能（技能id，技能等级） */
        SkillOneValue?: ({ [k: string]: number }|null);

        /** 全部技能 */
        SkillAllValue?: (number|null);

        /** 状态 */
        State?: (number|null);

        /** 职业 */
        Occupation?: (number|null);
    }

    /** 天赋数据 */
    class TalentData implements ITalentData {

        /**
         * Constructs a new TalentData.
         * @param [properties] Properties to set
         */
        constructor(properties?: ITalentData);

        /** 是否开放 */
        public IsOpen: boolean;

        /** 已获取天赋点数 */
        public TotalCount: number;

        /** 当前天赋点注入经验 */
        public Exp: (number|Long);

        /** 效果分类加点数量 */
        public CountList: { [k: string]: number };

        /** 效果列表（天赋类型，效果列表） */
        public EffectList: ITalentEffectItem[];

        /** 单个技能（技能id，技能等级） */
        public SkillOneValue: { [k: string]: number };

        /** 全部技能 */
        public SkillAllValue: number;

        /** 状态 */
        public State: number;

        /** 职业 */
        public Occupation: number;

        /**
         * Encodes the specified TalentData message. Does not implicitly {@link TalentData.verify|verify} messages.
         * @param message TalentData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ITalentData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TalentData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TalentData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TalentData;
    }

    /** Properties of a FluorescentGemDataValue. */
    interface IFluorescentGemDataValue {

        /** <宝石类型,宝石GoodsData> */
        value?: ({ [k: string]: IGoodsData }|null);
    }

    /** protobufjs貌似不支持map嵌套，先这样写 /// TODO... */
    class FluorescentGemDataValue implements IFluorescentGemDataValue {

        /**
         * Constructs a new FluorescentGemDataValue.
         * @param [properties] Properties to set
         */
        constructor(properties?: IFluorescentGemDataValue);

        /** <宝石类型,宝石GoodsData> */
        public value: { [k: string]: IGoodsData };

        /**
         * Encodes the specified FluorescentGemDataValue message. Does not implicitly {@link FluorescentGemDataValue.verify|verify} messages.
         * @param message FluorescentGemDataValue message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IFluorescentGemDataValue, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FluorescentGemDataValue message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FluorescentGemDataValue
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): FluorescentGemDataValue;
    }

    /** Properties of a FluorescentGemData. */
    interface IFluorescentGemData {

        /** 宝石镶嵌列表 <部位id，<宝石类型,宝石GoodsData>> */
        GemInstalList?: ({ [k: string]: IFluorescentGemDataValue }|null);

        /** 宝石仓库列表 <格子索引,宝石GoodsData> */
        GemStoreList?: ({ [k: string]: IGoodsData }|null);
    }

    /** 荧光宝石数据 */
    class FluorescentGemData implements IFluorescentGemData {

        /**
         * Constructs a new FluorescentGemData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IFluorescentGemData);

        /** 宝石镶嵌列表 <部位id，<宝石类型,宝石GoodsData>> */
        public GemInstalList: { [k: string]: IFluorescentGemDataValue };

        /** 宝石仓库列表 <格子索引,宝石GoodsData> */
        public GemStoreList: { [k: string]: IGoodsData };

        /**
         * Encodes the specified FluorescentGemData message. Does not implicitly {@link FluorescentGemData.verify|verify} messages.
         * @param message FluorescentGemData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IFluorescentGemData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FluorescentGemData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FluorescentGemData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): FluorescentGemData;
    }

    /** Properties of a SoulStoneData. */
    interface ISoulStoneData {

        /** 魂石背包栏 */
        StonesInBag?: (IGoodsData[]|null);

        /** 魂石装备栏 */
        StonesInUsing?: (IGoodsData[]|null);
    }

    /** 魂石数据 */
    class SoulStoneData implements ISoulStoneData {

        /**
         * Constructs a new SoulStoneData.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISoulStoneData);

        /** 魂石背包栏 */
        public StonesInBag: IGoodsData[];

        /** 魂石装备栏 */
        public StonesInUsing: IGoodsData[];

        /**
         * Encodes the specified SoulStoneData message. Does not implicitly {@link SoulStoneData.verify|verify} messages.
         * @param message SoulStoneData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISoulStoneData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SoulStoneData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SoulStoneData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SoulStoneData;
    }

    /** Properties of a RoleData. */
    interface IRoleData {

        /** 角色ID */
        RoleID?: (number|null);

        /** 角色名字 */
        RoleName?: (string|null);

        /** 性别 */
        RoleSex?: (number|null);

        /** 职业 */
        Occupation?: (number|null);

        /** 角色级别 */
        Level?: (number|null);

        /** 角色所属的帮派 */
        Faction?: (number|null);

        /** 绑定金币 */
        Money1?: (number|null);

        /** 非绑定金币（绑定钻石） */
        Money2?: (number|null);

        /** 当前的经验 */
        Experience?: (number|Long|null);

        /** 当前的PK模式 */
        PKMode?: (number|null);

        /** 当前的PK值 */
        PKValue?: (number|null);

        /** 所在的地图的编号 */
        MapCode?: (number|null);

        /** 当前所在的位置X坐标 */
        PosX?: (number|null);

        /** 当前所在的位置Y坐标 */
        PosY?: (number|null);

        /** 当前的方向 */
        RoleDirection?: (number|null);

        /** 当前的生命值 */
        LifeV?: (number|null);

        /** 最大的生命值 */
        MaxLifeV?: (number|null);

        /** 当前的魔法值 */
        MagicV?: (number|null);

        /** 最大的魔法值 */
        MaxMagicV?: (number|null);

        /** 当前的头像 */
        RolePic?: (number|null);

        /** 当前背包格子数（已解锁可用的格子） */
        BagNum?: (number|null);

        /** 任务数据 */
        TaskDataList?: (ITaskData[]|null);

        /** 物品数据 */
        GoodsDataList?: (IGoodsData[]|null);

        /** 衣服代号 */
        BodyCode?: (number|null);

        /** 武器代号 */
        WeaponCode?: (number|null);

        /** 技能数据 */
        SkillDataList?: (ISkillData[]|null);

        /** 称号 */
        OtherName?: (string|null);

        /** NPC的任务状态 */
        NPCTaskStateList?: (INPCTaskState[]|null);

        /** 主快捷面板的映射 */
        MainQuickBarKeys?: (string|null);

        /** 辅助快捷面板的映射 */
        OtherQuickBarKeys?: (string|null);

        /** 登陆的次数 */
        LoginNum?: (number|null);

        /** 充值的钱数 => 钻石（非绑定钻石） */
        UserMoney?: (number|null);

        /** 摆摊的名称 */
        StallName?: (string|null);

        /** 组队的ID */
        TeamID?: (number|null);

        /** 剩余的自动挂机时间 */
        LeftFightSeconds?: (number|null);

        /** 拥有的坐骑的数量 */
        TotalHorseCount?: (number|null);

        /** 坐骑数据（当前骑乘） */
        HorseDbID?: (number|null);

        /** 拥有的宠物的数量 */
        TotalPetCount?: (number|null);

        /** 宠物数据（当前放出） */
        PetDbID?: (number|null);

        /** 角色的内力值 */
        InterPower?: (number|null);

        /** 当前的组队中的队长ID */
        TeamLeaderRoleID?: (number|null);

        /** 系统绑定的银两 => 金币（非绑定金币） */
        YinLiang?: (number|null);

        /** 当前冲脉的重数 */
        JingMaiBodyLevel?: (number|null);

        /** 当前冲脉的累加穴位个数 */
        JingMaiXueWeiNum?: (number|null);

        /** 上一次的坐骑ID */
        LastHorseID?: (number|null);

        /** 缺省的技能ID */
        DefaultSkillID?: (number|null);

        /** 自动补血喝药的百分比 */
        AutoLifeV?: (number|null);

        /** 自动补蓝喝药的百分比 */
        AutoMagicV?: (number|null);

        /** Buffer的数据列表 */
        BufferDataList?: (IBufferData[]|null);

        /** 跑环的数据列表 */
        MyDailyTaskDataList?: (IDailyTaskData[]|null);

        /** 已经冲通的经脉的条数 */
        JingMaiOkNum?: (number|null);

        /** 每日冲穴的次数数据 */
        MyDailyJingMaiData?: (IDailyJingMaiData|null);

        /** 自动增加熟练度的被动技能ID */
        NumSkillID?: (number|null);

        /** 随身仓库数据 */
        MyPortableBagData?: (IPortableBagData|null);

        /** 见面有礼领取步骤 */
        NewStep?: (number|null);

        /** 领取上一个见面有礼步骤的时间 */
        StepTime?: (number|Long|null);

        /** 大奖活动ID */
        BigAwardID?: (number|null);

        /** 送礼活动ID */
        SongLiID?: (number|null);

        /** 副本数据 */
        FuBenDataList?: (IFuBenData[]|null);

        /** 总共学习技能的级别 */
        TotalLearnedSkillLevelCount?: (number|null);

        /** 当前已经完成的主线任务ID */
        CompletedMainTaskID?: (number|null);

        /** 当前的PK点 */
        PKPoint?: (number|null);

        /** 最高连斩数 */
        LianZhan?: (number|null);

        /** 紫名的开始时间 */
        StartPurpleNameTicks?: (number|Long|null);

        /** 押镖的数据 */
        MyYaBiaoData?: (IYaBiaoData|null);

        /** 角斗场荣誉称号开始时间 */
        BattleNameStart?: (number|Long|null);

        /** 角斗场荣誉称号 */
        BattleNameIndex?: (number|null);

        /** 充值TaskID */
        CZTaskID?: (number|null);

        /** 英雄逐擂的层数 */
        HeroIndex?: (number|null);

        /** 全套品质的级别 */
        AllQualityIndex?: (number|null);

        /** 全套锻造级别 */
        AllForgeLevelIndex?: (number|null);

        /** 全套宝石级别 */
        AllJewelLevelIndex?: (number|null);

        /** 银两折半优惠 */
        HalfYinLiangPeriod?: (number|null);

        /** 区ID */
        ZoneID?: (number|null);

        /** 帮会名称 */
        BHName?: (string|null);

        /** 被邀请加入帮会时是否验证 */
        BHVerify?: (number|null);

        /** 帮会职务 */
        BHZhiWu?: (number|null);

        /** 帮会帮贡 */
        BangGong?: (number|null);

        /** 内存领地帮会分布字典 */
        BangHuiLingDiItemsDict?: ({ [k: string]: IBangHuiLingDiItemData }|null);

        /** 当前服的皇帝的ID */
        HuangDiRoleID?: (number|null);

        /** 是否皇后 */
        HuangHou?: (number|null);

        /** 自己在排行中的位置字典 */
        PaiHangPosDict?: ({ [k: string]: number }|null);

        /** 是否进入了挂机保护状态 */
        AutoFightingProtect?: (number|null);

        /** 法师的护盾开始的时间 */
        FSHuDunStart?: (number|Long|null);

        /** 大乱斗中的阵营ID */
        BattleWhichSide?: (number|null);

        /** 上次的mailID */
        LastMailID?: (number|null);

        /** 上次的mailID */
        IsVIP?: (number|null);

        /** 单次奖励记录标志位 */
        OnceAwardFlag?: (number|Long|null);

        /** 系统绑定的金币 => 绑定钻石 */
        Gold?: (number|null);

        /** 道术隐身的时间 */
        DSHideStart?: (number|Long|null);

        /** 角色常用整形参数值列表 */
        RoleCommonUseIntPamams?: (number[]|null);

        /** 法师的护盾持续的秒数 */
        FSHuDunSeconds?: (number|null);

        /** 中毒开始的时间 */
        ZhongDuStart?: (number|Long|null);

        /** 中毒持续的秒数 */
        ZhongDuSeconds?: (number|null);

        /** 开服日期 */
        KaiFuStartDay?: (string|null);

        /** 注册日期 */
        RegTime?: (string|null);

        /** 节日活动开始日期 */
        JieriStartDay?: (string|null);

        /** 节日活动持续天数 */
        JieriDaysNum?: (number|null);

        /** 合区活动开始时间 */
        HefuStartDay?: (string|null);

        /** 节日称号 */
        JieriChengHao?: (number|null);

        /** 补偿开始时间 */
        BuChangStartDay?: (string|null);

        /** 冻结开始的时间 */
        DongJieStart?: (number|Long|null);

        /** 冻结持续的秒数 */
        DongJieSeconds?: (number|null);

        /** 月度抽奖活动开始日期 */
        YueduDazhunpanStartDay?: (string|null);

        /** 月度抽奖活动持续天数 */
        YueduDazhunpanStartDayNum?: (number|null);

        /** 力量 */
        RoleStrength?: (number|null);

        /** 智力 */
        RoleIntelligence?: (number|null);

        /** 敏捷 */
        RoleDexterity?: (number|null);

        /** 体力 */
        RoleConstitution?: (number|null);

        /** 重生计数 */
        ChangeLifeCount?: (number|null);

        /** 总属性点 */
        TotalPropPoint?: (number|null);

        /** 新人标记 */
        IsFlashPlayer?: (number|null);

        /** 被崇拜计数 */
        AdmiredCount?: (number|null);

        /** 战斗力 */
        CombatForce?: (number|null);

        /** 崇拜计数 */
        AdorationCount?: (number|null);

        /** 每日在线时长（秒） */
        DayOnlineSecond?: (number|null);

        /** 连续登陆天数（1-7） */
        SeriesLoginNum?: (number|null);

        /** 自动分配属性点 */
        AutoAssignPropertyPoint?: (number|null);

        /** 总在线时间 */
        OnLineTotalTime?: (number|null);

        /** 全套卓越属性装备个数 */
        AllZhuoYueNum?: (number|null);

        /** VIP等级 */
        VIPLevel?: (number|null);

        /** 开启背包个格子计时 */
        OpenGridTime?: (number|null);

        /** 开启移动背包格子计时 */
        OpenPortableGridTime?: (number|null);

        /** 翅膀数据列表 */
        MyWingData?: (IWingData|null);

        /** 山海全书提交信息 */
        PictureJudgeReferInfo?: ({ [k: string]: number }|null);

        /** 星魂值 */
        StarSoulValue?: (number|null);

        /** 仓库金币 */
        StoreYinLiang?: (number|Long|null);

        /** 仓库绑定金币 */
        StoreMoney?: (number|Long|null);

        /** 节日活动开始日期 */
        PlayerRecallStartDay?: (string|null);

        /** 节日活动持续天数 */
        PlayerRecallDaysNum?: (string|null);

        /** 天赋数据 */
        MyTalentData?: (ITalentData|null);

        /** 天梯荣耀值 */
        TianTiRongYao?: (number|null);

        /** 荧光宝石数据 */
        FluorescentDiamondData?: (IFluorescentGemData|null);

        /** 是否gm */
        GMAuth?: (number|null);

        /** 魂石石数据 */
        soulStoneData?: (ISoulStoneData|null);

        /** 二态功能设置，参考ESettingBitFlag */
        SettingBitFlags?: (number|Long|null);

        /** 配偶id */
        SpouseId?: (number|null);

        /** 配偶的名称 */
        sSpouseName?: (string|null);

        /** 军衔等级 */
        nJunXianLevel?: (number|null);

        /** 是否骑乘机甲 */
        nIsOnJiJia?: (number|null);

        /** 每周帮会资金贡献 */
        weekBhMoney?: (number|null);

        /** 功能开启提示奖励领取列表 */
        funOpenflagList?: (number[]|null);

        /** 萌宠栏数据 */
        MengChongsInBag?: (IGoodsData[]|null);

        /** 当前萌宠背包的页数（总个数 - 1） */
        MengchongBagNum?: (number|null);

        /** 萌宠背包格子开启时间 */
        OpenMengchongGridTime?: (number|null);

        /** 七日登陆活动是否完成 */
        QiRiLoginActFinished?: (number|null);

        /** 萌宠命名列表 */
        MengchongNameList?: ({ [k: string]: string }|null);

        /** 当前的开启的图腾List */
        activatedTotemList?: (ITotemNetItem[]|null);
    }

    /** 游戏中角色的数据定义 */
    class RoleData implements IRoleData {

        /**
         * Constructs a new RoleData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IRoleData);

        /** 角色ID */
        public RoleID: number;

        /** 角色名字 */
        public RoleName: string;

        /** 性别 */
        public RoleSex: number;

        /** 职业 */
        public Occupation: number;

        /** 角色级别 */
        public Level: number;

        /** 角色所属的帮派 */
        public Faction: number;

        /** 绑定金币 */
        public Money1: number;

        /** 非绑定金币（绑定钻石） */
        public Money2: number;

        /** 当前的经验 */
        public Experience: (number|Long);

        /** 当前的PK模式 */
        public PKMode: number;

        /** 当前的PK值 */
        public PKValue: number;

        /** 所在的地图的编号 */
        public MapCode: number;

        /** 当前所在的位置X坐标 */
        public PosX: number;

        /** 当前所在的位置Y坐标 */
        public PosY: number;

        /** 当前的方向 */
        public RoleDirection: number;

        /** 当前的生命值 */
        public LifeV: number;

        /** 最大的生命值 */
        public MaxLifeV: number;

        /** 当前的魔法值 */
        public MagicV: number;

        /** 最大的魔法值 */
        public MaxMagicV: number;

        /** 当前的头像 */
        public RolePic: number;

        /** 当前背包格子数（已解锁可用的格子） */
        public BagNum: number;

        /** 任务数据 */
        public TaskDataList: ITaskData[];

        /** 物品数据 */
        public GoodsDataList: IGoodsData[];

        /** 衣服代号 */
        public BodyCode: number;

        /** 武器代号 */
        public WeaponCode: number;

        /** 技能数据 */
        public SkillDataList: ISkillData[];

        /** 称号 */
        public OtherName: string;

        /** NPC的任务状态 */
        public NPCTaskStateList: INPCTaskState[];

        /** 主快捷面板的映射 */
        public MainQuickBarKeys: string;

        /** 辅助快捷面板的映射 */
        public OtherQuickBarKeys: string;

        /** 登陆的次数 */
        public LoginNum: number;

        /** 充值的钱数 => 钻石（非绑定钻石） */
        public UserMoney: number;

        /** 摆摊的名称 */
        public StallName: string;

        /** 组队的ID */
        public TeamID: number;

        /** 剩余的自动挂机时间 */
        public LeftFightSeconds: number;

        /** 拥有的坐骑的数量 */
        public TotalHorseCount: number;

        /** 坐骑数据（当前骑乘） */
        public HorseDbID: number;

        /** 拥有的宠物的数量 */
        public TotalPetCount: number;

        /** 宠物数据（当前放出） */
        public PetDbID: number;

        /** 角色的内力值 */
        public InterPower: number;

        /** 当前的组队中的队长ID */
        public TeamLeaderRoleID: number;

        /** 系统绑定的银两 => 金币（非绑定金币） */
        public YinLiang: number;

        /** 当前冲脉的重数 */
        public JingMaiBodyLevel: number;

        /** 当前冲脉的累加穴位个数 */
        public JingMaiXueWeiNum: number;

        /** 上一次的坐骑ID */
        public LastHorseID: number;

        /** 缺省的技能ID */
        public DefaultSkillID: number;

        /** 自动补血喝药的百分比 */
        public AutoLifeV: number;

        /** 自动补蓝喝药的百分比 */
        public AutoMagicV: number;

        /** Buffer的数据列表 */
        public BufferDataList: IBufferData[];

        /** 跑环的数据列表 */
        public MyDailyTaskDataList: IDailyTaskData[];

        /** 已经冲通的经脉的条数 */
        public JingMaiOkNum: number;

        /** 每日冲穴的次数数据 */
        public MyDailyJingMaiData?: (IDailyJingMaiData|null);

        /** 自动增加熟练度的被动技能ID */
        public NumSkillID: number;

        /** 随身仓库数据 */
        public MyPortableBagData?: (IPortableBagData|null);

        /** 见面有礼领取步骤 */
        public NewStep: number;

        /** 领取上一个见面有礼步骤的时间 */
        public StepTime: (number|Long);

        /** 大奖活动ID */
        public BigAwardID: number;

        /** 送礼活动ID */
        public SongLiID: number;

        /** 副本数据 */
        public FuBenDataList: IFuBenData[];

        /** 总共学习技能的级别 */
        public TotalLearnedSkillLevelCount: number;

        /** 当前已经完成的主线任务ID */
        public CompletedMainTaskID: number;

        /** 当前的PK点 */
        public PKPoint: number;

        /** 最高连斩数 */
        public LianZhan: number;

        /** 紫名的开始时间 */
        public StartPurpleNameTicks: (number|Long);

        /** 押镖的数据 */
        public MyYaBiaoData?: (IYaBiaoData|null);

        /** 角斗场荣誉称号开始时间 */
        public BattleNameStart: (number|Long);

        /** 角斗场荣誉称号 */
        public BattleNameIndex: number;

        /** 充值TaskID */
        public CZTaskID: number;

        /** 英雄逐擂的层数 */
        public HeroIndex: number;

        /** 全套品质的级别 */
        public AllQualityIndex: number;

        /** 全套锻造级别 */
        public AllForgeLevelIndex: number;

        /** 全套宝石级别 */
        public AllJewelLevelIndex: number;

        /** 银两折半优惠 */
        public HalfYinLiangPeriod: number;

        /** 区ID */
        public ZoneID: number;

        /** 帮会名称 */
        public BHName: string;

        /** 被邀请加入帮会时是否验证 */
        public BHVerify: number;

        /** 帮会职务 */
        public BHZhiWu: number;

        /** 帮会帮贡 */
        public BangGong: number;

        /** 内存领地帮会分布字典 */
        public BangHuiLingDiItemsDict: { [k: string]: IBangHuiLingDiItemData };

        /** 当前服的皇帝的ID */
        public HuangDiRoleID: number;

        /** 是否皇后 */
        public HuangHou: number;

        /** 自己在排行中的位置字典 */
        public PaiHangPosDict: { [k: string]: number };

        /** 是否进入了挂机保护状态 */
        public AutoFightingProtect: number;

        /** 法师的护盾开始的时间 */
        public FSHuDunStart: (number|Long);

        /** 大乱斗中的阵营ID */
        public BattleWhichSide: number;

        /** 上次的mailID */
        public LastMailID: number;

        /** 上次的mailID */
        public IsVIP: number;

        /** 单次奖励记录标志位 */
        public OnceAwardFlag: (number|Long);

        /** 系统绑定的金币 => 绑定钻石 */
        public Gold: number;

        /** 道术隐身的时间 */
        public DSHideStart: (number|Long);

        /** 角色常用整形参数值列表 */
        public RoleCommonUseIntPamams: number[];

        /** 法师的护盾持续的秒数 */
        public FSHuDunSeconds: number;

        /** 中毒开始的时间 */
        public ZhongDuStart: (number|Long);

        /** 中毒持续的秒数 */
        public ZhongDuSeconds: number;

        /** 开服日期 */
        public KaiFuStartDay: string;

        /** 注册日期 */
        public RegTime: string;

        /** 节日活动开始日期 */
        public JieriStartDay: string;

        /** 节日活动持续天数 */
        public JieriDaysNum: number;

        /** 合区活动开始时间 */
        public HefuStartDay: string;

        /** 节日称号 */
        public JieriChengHao: number;

        /** 补偿开始时间 */
        public BuChangStartDay: string;

        /** 冻结开始的时间 */
        public DongJieStart: (number|Long);

        /** 冻结持续的秒数 */
        public DongJieSeconds: number;

        /** 月度抽奖活动开始日期 */
        public YueduDazhunpanStartDay: string;

        /** 月度抽奖活动持续天数 */
        public YueduDazhunpanStartDayNum: number;

        /** 力量 */
        public RoleStrength: number;

        /** 智力 */
        public RoleIntelligence: number;

        /** 敏捷 */
        public RoleDexterity: number;

        /** 体力 */
        public RoleConstitution: number;

        /** 重生计数 */
        public ChangeLifeCount: number;

        /** 总属性点 */
        public TotalPropPoint: number;

        /** 新人标记 */
        public IsFlashPlayer: number;

        /** 被崇拜计数 */
        public AdmiredCount: number;

        /** 战斗力 */
        public CombatForce: number;

        /** 崇拜计数 */
        public AdorationCount: number;

        /** 每日在线时长（秒） */
        public DayOnlineSecond: number;

        /** 连续登陆天数（1-7） */
        public SeriesLoginNum: number;

        /** 自动分配属性点 */
        public AutoAssignPropertyPoint: number;

        /** 总在线时间 */
        public OnLineTotalTime: number;

        /** 全套卓越属性装备个数 */
        public AllZhuoYueNum: number;

        /** VIP等级 */
        public VIPLevel: number;

        /** 开启背包个格子计时 */
        public OpenGridTime: number;

        /** 开启移动背包格子计时 */
        public OpenPortableGridTime: number;

        /** 翅膀数据列表 */
        public MyWingData?: (IWingData|null);

        /** 山海全书提交信息 */
        public PictureJudgeReferInfo: { [k: string]: number };

        /** 星魂值 */
        public StarSoulValue: number;

        /** 仓库金币 */
        public StoreYinLiang: (number|Long);

        /** 仓库绑定金币 */
        public StoreMoney: (number|Long);

        /** 节日活动开始日期 */
        public PlayerRecallStartDay: string;

        /** 节日活动持续天数 */
        public PlayerRecallDaysNum: string;

        /** 天赋数据 */
        public MyTalentData?: (ITalentData|null);

        /** 天梯荣耀值 */
        public TianTiRongYao: number;

        /** 荧光宝石数据 */
        public FluorescentDiamondData?: (IFluorescentGemData|null);

        /** 是否gm */
        public GMAuth: number;

        /** 魂石石数据 */
        public soulStoneData?: (ISoulStoneData|null);

        /** 二态功能设置，参考ESettingBitFlag */
        public SettingBitFlags: (number|Long);

        /** 配偶id */
        public SpouseId: number;

        /** 配偶的名称 */
        public sSpouseName: string;

        /** 军衔等级 */
        public nJunXianLevel: number;

        /** 是否骑乘机甲 */
        public nIsOnJiJia: number;

        /** 每周帮会资金贡献 */
        public weekBhMoney: number;

        /** 功能开启提示奖励领取列表 */
        public funOpenflagList: number[];

        /** 萌宠栏数据 */
        public MengChongsInBag: IGoodsData[];

        /** 当前萌宠背包的页数（总个数 - 1） */
        public MengchongBagNum: number;

        /** 萌宠背包格子开启时间 */
        public OpenMengchongGridTime: number;

        /** 七日登陆活动是否完成 */
        public QiRiLoginActFinished: number;

        /** 萌宠命名列表 */
        public MengchongNameList: { [k: string]: string };

        /** 当前的开启的图腾List */
        public activatedTotemList: ITotemNetItem[];

        /**
         * Encodes the specified RoleData message. Does not implicitly {@link RoleData.verify|verify} messages.
         * @param message RoleData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IRoleData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoleData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoleData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RoleData;
    }

    /** Properties of a NPCRole. */
    interface INPCRole {

        /** NPC的角色ID */
        NpcID?: (number|null);

        /** 格子X坐标 */
        PosX?: (number|null);

        /** 格子Y坐标 */
        PosY?: (number|null);

        /** 地图编码 */
        MapCode?: (number|null);

        /** NPC角色基础配置数据 */
        RoleString?: (string|null);

        /** npc的方向 */
        Dir?: (number|null);
    }

    /** NPC角色的数据,主要用于九宫格移动时客户端动态创建NPC使用 */
    class NPCRole implements INPCRole {

        /**
         * Constructs a new NPCRole.
         * @param [properties] Properties to set
         */
        constructor(properties?: INPCRole);

        /** NPC的角色ID */
        public NpcID: number;

        /** 格子X坐标 */
        public PosX: number;

        /** 格子Y坐标 */
        public PosY: number;

        /** 地图编码 */
        public MapCode: number;

        /** NPC角色基础配置数据 */
        public RoleString: string;

        /** npc的方向 */
        public Dir: number;

        /**
         * Encodes the specified NPCRole message. Does not implicitly {@link NPCRole.verify|verify} messages.
         * @param message NPCRole message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: INPCRole, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NPCRole message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NPCRole
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): NPCRole;
    }

    /** Properties of a MarriageData. */
    interface IMarriageData {

        /** 配偶的ID */
        nSpouseID?: (number|null);

        /** 类型 -1 = 未结婚 1 = 丈夫 2 = 妻子  // TODO... 原始数据类型为sbyte */
        byMarrytype?: (number|null);

        /** 婚戒ID */
        nRingID?: (number|null);

        /** 亲密度 */
        nGoodwillexp?: (number|null);

        /** 亲密星级 */
        byGoodwillstar?: (number|null);

        /** 亲密阶数 */
        byGoodwilllevel?: (number|null);

        /** 已收玫瑰数量 */
        nGivenrose?: (number|null);

        /** 爱情宣言 */
        strLovemessage?: (string|null);

        /** 自动拒绝求婚 */
        byAutoReject?: (number|null);
    }

    /** 结婚数据 */
    class MarriageData implements IMarriageData {

        /**
         * Constructs a new MarriageData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IMarriageData);

        /** 配偶的ID */
        public nSpouseID: number;

        /** 类型 -1 = 未结婚 1 = 丈夫 2 = 妻子  // TODO... 原始数据类型为sbyte */
        public byMarrytype: number;

        /** 婚戒ID */
        public nRingID: number;

        /** 亲密度 */
        public nGoodwillexp: number;

        /** 亲密星级 */
        public byGoodwillstar: number;

        /** 亲密阶数 */
        public byGoodwilllevel: number;

        /** 已收玫瑰数量 */
        public nGivenrose: number;

        /** 爱情宣言 */
        public strLovemessage: string;

        /** 自动拒绝求婚 */
        public byAutoReject: number;

        /**
         * Encodes the specified MarriageData message. Does not implicitly {@link MarriageData.verify|verify} messages.
         * @param message MarriageData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IMarriageData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MarriageData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MarriageData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MarriageData;
    }

    /** Properties of a MarriageData_EX. */
    interface IMarriageData_EX {

        /** 结婚数据 */
        myMarriageData?: (IMarriageData|null);

        /** 玩家名称 */
        roleName?: (string|null);

        /** 角色职业 */
        occupationId?: (number|null);
    }

    /** 结婚数据 */
    class MarriageData_EX implements IMarriageData_EX {

        /**
         * Constructs a new MarriageData_EX.
         * @param [properties] Properties to set
         */
        constructor(properties?: IMarriageData_EX);

        /** 结婚数据 */
        public myMarriageData?: (IMarriageData|null);

        /** 玩家名称 */
        public roleName: string;

        /** 角色职业 */
        public occupationId: number;

        /**
         * Encodes the specified MarriageData_EX message. Does not implicitly {@link MarriageData_EX.verify|verify} messages.
         * @param message MarriageData_EX message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IMarriageData_EX, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MarriageData_EX message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MarriageData_EX
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MarriageData_EX;
    }

    /** Properties of a MallSaleData. */
    interface IMallSaleData {

        /** Mall.xml 字符串 */
        MallXmlString?: (string|null);

        /** MallTab.xml 字符串 */
        MallTabXmlString?: (string|null);

        /** QiangGou.xml 字符串 => 这个xml内部最多有需要的三条数据 */
        QiangGouXmlString?: (string|null);
    }

    /** 商城销售数据 */
    class MallSaleData implements IMallSaleData {

        /**
         * Constructs a new MallSaleData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IMallSaleData);

        /** Mall.xml 字符串 */
        public MallXmlString: string;

        /** MallTab.xml 字符串 */
        public MallTabXmlString: string;

        /** QiangGou.xml 字符串 => 这个xml内部最多有需要的三条数据 */
        public QiangGouXmlString: string;

        /**
         * Encodes the specified MallSaleData message. Does not implicitly {@link MallSaleData.verify|verify} messages.
         * @param message MallSaleData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IMallSaleData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MallSaleData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MallSaleData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MallSaleData;
    }

    /** Properties of a SpriteMoveData. */
    interface ISpriteMoveData {

        /** 要开始移动的角色的Id */
        roleID?: (number|null);

        /** 角色所在的关卡Id */
        mapCode?: (number|null);

        /** 角色在移动过程中的行为(跑步?走跳?) */
        action?: (number|null);

        /** 目标点坐标(服务器坐标系) */
        toX?: (number|null);

        /** 目标点坐标(服务器坐标系) */
        toY?: (number|null);

        /** 寻路结束后的行为 */
        extAction?: (number|null);

        /** 起始坐标点(服务器坐标系) */
        fromX?: (number|null);

        /** 起始坐标点(服务器坐标系) */
        fromY?: (number|null);

        /** 暂时没有用了,为了兼容性留着 */
        startMoveTicks?: (number|Long|null);

        /** 寻路使用的路径点 */
        pathString?: (string|null);
    }

    /** 向指定目标点移动的消息 */
    class SpriteMoveData implements ISpriteMoveData {

        /**
         * Constructs a new SpriteMoveData.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISpriteMoveData);

        /** 要开始移动的角色的Id */
        public roleID: number;

        /** 角色所在的关卡Id */
        public mapCode: number;

        /** 角色在移动过程中的行为(跑步?走跳?) */
        public action: number;

        /** 目标点坐标(服务器坐标系) */
        public toX: number;

        /** 目标点坐标(服务器坐标系) */
        public toY: number;

        /** 寻路结束后的行为 */
        public extAction: number;

        /** 起始坐标点(服务器坐标系) */
        public fromX: number;

        /** 起始坐标点(服务器坐标系) */
        public fromY: number;

        /** 暂时没有用了,为了兼容性留着 */
        public startMoveTicks: (number|Long);

        /** 寻路使用的路径点 */
        public pathString: string;

        /**
         * Encodes the specified SpriteMoveData message. Does not implicitly {@link SpriteMoveData.verify|verify} messages.
         * @param message SpriteMoveData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISpriteMoveData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SpriteMoveData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SpriteMoveData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SpriteMoveData;
    }

    /** Properties of a CS_ClickOn. */
    interface ICS_ClickOn {

        /** 要与NPC对话的角色Id(应该是本地玩家的角色Id) */
        RoleId?: (number|null);

        /** 本地角色所在的关卡Id */
        MapCode?: (number|null);

        /** 要与之对话的NPC的角色Id */
        NpcId?: (number|null);

        /** 要与之对话的NPC的数据表Id */
        ExtId?: (number|null);
    }

    /** 点击NPC的消息(与NPC对话?) */
    class CS_ClickOn implements ICS_ClickOn {

        /**
         * Constructs a new CS_ClickOn.
         * @param [properties] Properties to set
         */
        constructor(properties?: ICS_ClickOn);

        /** 要与NPC对话的角色Id(应该是本地玩家的角色Id) */
        public RoleId: number;

        /** 本地角色所在的关卡Id */
        public MapCode: number;

        /** 要与之对话的NPC的角色Id */
        public NpcId: number;

        /** 要与之对话的NPC的数据表Id */
        public ExtId: number;

        /**
         * Encodes the specified CS_ClickOn message. Does not implicitly {@link CS_ClickOn.verify|verify} messages.
         * @param message CS_ClickOn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ICS_ClickOn, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CS_ClickOn message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CS_ClickOn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CS_ClickOn;
    }

    /** Properties of a NPCData. */
    interface INPCData {

        /** 当前的地图编号 */
        MapCode?: (number|null);

        /** 主角的角色ID */
        RoleID?: (number|null);

        /** NPC的唯一ID */
        NPCID?: (number|null);

        /** 尚未接受的任务列表 */
        NewTaskIDs?: (number[]|null);

        /** 系统功能列表 */
        OperationIDs?: (number[]|null);

        /** NPC功能脚本列表 */
        ScriptIDs?: (number[]|null);

        /** 扩展ID（NPC表中的模板ID） */
        ExtensionID?: (number|null);

        /** 尚未接受的任务列表已经完成的次数 */
        NewTaskIDsDoneCount?: (number[]|null);
    }

    /** NPC角色的数据定义 */
    class NPCData implements INPCData {

        /**
         * Constructs a new NPCData.
         * @param [properties] Properties to set
         */
        constructor(properties?: INPCData);

        /** 当前的地图编号 */
        public MapCode: number;

        /** 主角的角色ID */
        public RoleID: number;

        /** NPC的唯一ID */
        public NPCID: number;

        /** 尚未接受的任务列表 */
        public NewTaskIDs: number[];

        /** 系统功能列表 */
        public OperationIDs: number[];

        /** NPC功能脚本列表 */
        public ScriptIDs: number[];

        /** 扩展ID（NPC表中的模板ID） */
        public ExtensionID: number;

        /** 尚未接受的任务列表已经完成的次数 */
        public NewTaskIDsDoneCount: number[];

        /**
         * Encodes the specified NPCData message. Does not implicitly {@link NPCData.verify|verify} messages.
         * @param message NPCData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: INPCData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NPCData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NPCData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): NPCData;
    }

    /** Properties of a CS_SprUseGoods. */
    interface ICS_SprUseGoods {

        /** 角色id */
        RoleId?: (number|null);

        /** 物品dbId */
        DbId?: (number|null);

        /** 物品类型Id */
        GoodsId?: (number|null);

        /** 使用个数 */
        UseNum?: (number|null);
    }

    /** 使用道具数据 */
    class CS_SprUseGoods implements ICS_SprUseGoods {

        /**
         * Constructs a new CS_SprUseGoods.
         * @param [properties] Properties to set
         */
        constructor(properties?: ICS_SprUseGoods);

        /** 角色id */
        public RoleId: number;

        /** 物品dbId */
        public DbId: number;

        /** 物品类型Id */
        public GoodsId: number;

        /** 使用个数 */
        public UseNum: number;

        /**
         * Encodes the specified CS_SprUseGoods message. Does not implicitly {@link CS_SprUseGoods.verify|verify} messages.
         * @param message CS_SprUseGoods message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ICS_SprUseGoods, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CS_SprUseGoods message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CS_SprUseGoods
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CS_SprUseGoods;
    }

    /** Properties of an EquipPropsData. */
    interface IEquipPropsData {

        /** EquipPropsData RoleID */
        RoleID?: (number|null);

        /** EquipPropsData Strength */
        Strength?: (number|null);

        /** EquipPropsData Intelligence */
        Intelligence?: (number|null);

        /** EquipPropsData Dexterity */
        Dexterity?: (number|null);

        /** EquipPropsData Constitution */
        Constitution?: (number|null);

        /** EquipPropsData MinAttack */
        MinAttack?: (number|null);

        /** EquipPropsData MaxAttack */
        MaxAttack?: (number|null);

        /** EquipPropsData MinDefense */
        MinDefense?: (number|null);

        /** EquipPropsData MaxDefense */
        MaxDefense?: (number|null);

        /** EquipPropsData MagicSkillIncrease */
        MagicSkillIncrease?: (number|null);

        /** EquipPropsData MinMAttack */
        MinMAttack?: (number|null);

        /** EquipPropsData MaxMAttack */
        MaxMAttack?: (number|null);

        /** EquipPropsData MinMDefense */
        MinMDefense?: (number|null);

        /** EquipPropsData MaxMDefense */
        MaxMDefense?: (number|null);

        /** EquipPropsData PhySkillIncrease */
        PhySkillIncrease?: (number|null);

        /** EquipPropsData MaxHP */
        MaxHP?: (number|null);

        /** EquipPropsData MaxMP */
        MaxMP?: (number|null);

        /** EquipPropsData AttackSpeed */
        AttackSpeed?: (number|null);

        /** EquipPropsData Hit */
        Hit?: (number|null);

        /** EquipPropsData Dodge */
        Dodge?: (number|null);

        /** EquipPropsData TotalPropPoint */
        TotalPropPoint?: (number|null);

        /** EquipPropsData ChangeLifeCount */
        ChangeLifeCount?: (number|null);

        /** EquipPropsData CombatForce */
        CombatForce?: (number|null);

        /** EquipPropsData TEMPStrength */
        TEMPStrength?: (number|null);

        /** EquipPropsData TEMPIntelligsence */
        TEMPIntelligsence?: (number|null);

        /** EquipPropsData TEMPDexterity */
        TEMPDexterity?: (number|null);

        /** EquipPropsData TEMPConstitution */
        TEMPConstitution?: (number|null);
    }

    /** 角色属性数据 */
    class EquipPropsData implements IEquipPropsData {

        /**
         * Constructs a new EquipPropsData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IEquipPropsData);

        /** EquipPropsData RoleID. */
        public RoleID: number;

        /** EquipPropsData Strength. */
        public Strength: number;

        /** EquipPropsData Intelligence. */
        public Intelligence: number;

        /** EquipPropsData Dexterity. */
        public Dexterity: number;

        /** EquipPropsData Constitution. */
        public Constitution: number;

        /** EquipPropsData MinAttack. */
        public MinAttack: number;

        /** EquipPropsData MaxAttack. */
        public MaxAttack: number;

        /** EquipPropsData MinDefense. */
        public MinDefense: number;

        /** EquipPropsData MaxDefense. */
        public MaxDefense: number;

        /** EquipPropsData MagicSkillIncrease. */
        public MagicSkillIncrease: number;

        /** EquipPropsData MinMAttack. */
        public MinMAttack: number;

        /** EquipPropsData MaxMAttack. */
        public MaxMAttack: number;

        /** EquipPropsData MinMDefense. */
        public MinMDefense: number;

        /** EquipPropsData MaxMDefense. */
        public MaxMDefense: number;

        /** EquipPropsData PhySkillIncrease. */
        public PhySkillIncrease: number;

        /** EquipPropsData MaxHP. */
        public MaxHP: number;

        /** EquipPropsData MaxMP. */
        public MaxMP: number;

        /** EquipPropsData AttackSpeed. */
        public AttackSpeed: number;

        /** EquipPropsData Hit. */
        public Hit: number;

        /** EquipPropsData Dodge. */
        public Dodge: number;

        /** EquipPropsData TotalPropPoint. */
        public TotalPropPoint: number;

        /** EquipPropsData ChangeLifeCount. */
        public ChangeLifeCount: number;

        /** EquipPropsData CombatForce. */
        public CombatForce: number;

        /** EquipPropsData TEMPStrength. */
        public TEMPStrength: number;

        /** EquipPropsData TEMPIntelligsence. */
        public TEMPIntelligsence: number;

        /** EquipPropsData TEMPDexterity. */
        public TEMPDexterity: number;

        /** EquipPropsData TEMPConstitution. */
        public TEMPConstitution: number;

        /**
         * Encodes the specified EquipPropsData message. Does not implicitly {@link EquipPropsData.verify|verify} messages.
         * @param message EquipPropsData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IEquipPropsData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EquipPropsData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EquipPropsData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): EquipPropsData;
    }

    /** Properties of an AddGoodsData. */
    interface IAddGoodsData {

        /** 道具属于的角色Id */
        roleID?: (number|null);

        /** 数据库流水ID */
        id?: (number|null);

        /** 物品ID */
        goodsID?: (number|null);

        /** 锻造级别 */
        forgeLevel?: (number|null);

        /** 物品的品质(某些装备会分品质，不同的品质属性不同，用户改变属性后要记录下来) */
        quality?: (number|null);

        /** 物品数量 */
        goodsNum?: (number|null);

        /** 是否绑定的物品(绑定的物品不可交易, 不可摆摊) */
        binding?: (number|null);

        /** 所在的位置(0: 包裹, 1:仓库) */
        site?: (number|null);

        /** 根据品质随机抽取的扩展属性的索引列表 */
        jewellist?: (string|null);

        /** AddGoodsData newHint */
        newHint?: (number|null);

        /** AddGoodsData newEndTime */
        newEndTime?: (string|null);

        /** 出售的银两价格 */
        addPropIndex?: (number|null);

        /** 增加一个天生属性的百分比 */
        bornIndex?: (number|null);

        /** 装备的幸运值 */
        lucky?: (number|null);

        /** 装备的耐久度--如果是萌宠则表示羁当前经验 */
        strong?: (number|null);

        /** 卓越信息 -- 一个32位int32 每位代表一个卓越属性 */
        ExcellenceProperty?: (number|null);

        /** 追加等级--如果是萌宠则表示羁绊的是哪个坐骑 */
        nAppendPropLev?: (number|null);

        /** 装备的重生级别 */
        ChangeLifeLevForEquip?: (number|null);

        /** 根据品质随机抽取的扩展属性的索引列表 */
        bagIndex?: (number|null);

        /** 装备洗炼属性 结构: 属性ID|属性值|属性ID|属性值|属性ID|属性值... */
        washProps?: (number[]|null);

        /** AddGoodsData ElementhrtsProps */
        ElementhrtsProps?: (number[]|null);
    }

    /** 通知客户端添加新物品的数据 */
    class AddGoodsData implements IAddGoodsData {

        /**
         * Constructs a new AddGoodsData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IAddGoodsData);

        /** 道具属于的角色Id */
        public roleID: number;

        /** 数据库流水ID */
        public id: number;

        /** 物品ID */
        public goodsID: number;

        /** 锻造级别 */
        public forgeLevel: number;

        /** 物品的品质(某些装备会分品质，不同的品质属性不同，用户改变属性后要记录下来) */
        public quality: number;

        /** 物品数量 */
        public goodsNum: number;

        /** 是否绑定的物品(绑定的物品不可交易, 不可摆摊) */
        public binding: number;

        /** 所在的位置(0: 包裹, 1:仓库) */
        public site: number;

        /** 根据品质随机抽取的扩展属性的索引列表 */
        public jewellist: string;

        /** AddGoodsData newHint. */
        public newHint: number;

        /** AddGoodsData newEndTime. */
        public newEndTime: string;

        /** 出售的银两价格 */
        public addPropIndex: number;

        /** 增加一个天生属性的百分比 */
        public bornIndex: number;

        /** 装备的幸运值 */
        public lucky: number;

        /** 装备的耐久度--如果是萌宠则表示羁当前经验 */
        public strong: number;

        /** 卓越信息 -- 一个32位int32 每位代表一个卓越属性 */
        public ExcellenceProperty: number;

        /** 追加等级--如果是萌宠则表示羁绊的是哪个坐骑 */
        public nAppendPropLev: number;

        /** 装备的重生级别 */
        public ChangeLifeLevForEquip: number;

        /** 根据品质随机抽取的扩展属性的索引列表 */
        public bagIndex: number;

        /** 装备洗炼属性 结构: 属性ID|属性值|属性ID|属性值|属性ID|属性值... */
        public washProps: number[];

        /** AddGoodsData ElementhrtsProps. */
        public ElementhrtsProps: number[];

        /**
         * Encodes the specified AddGoodsData message. Does not implicitly {@link AddGoodsData.verify|verify} messages.
         * @param message AddGoodsData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IAddGoodsData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AddGoodsData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AddGoodsData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AddGoodsData;
    }

    /** Properties of a SCCompTask. */
    interface ISCCompTask {

        /** 完成任务的角色Id,应该是本地玩家角色Id */
        roleID?: (number|null);

        /** 任务对应的Npc的角色Id */
        npcID?: (number|null);

        /** 任务Id */
        taskID?: (number|null);

        /** 任务状态 */
        state?: (number|null);
    }

    /** 快速接受并完成任务 */
    class SCCompTask implements ISCCompTask {

        /**
         * Constructs a new SCCompTask.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISCCompTask);

        /** 完成任务的角色Id,应该是本地玩家角色Id */
        public roleID: number;

        /** 任务对应的Npc的角色Id */
        public npcID: number;

        /** 任务Id */
        public taskID: number;

        /** 任务状态 */
        public state: number;

        /**
         * Encodes the specified SCCompTask message. Does not implicitly {@link SCCompTask.verify|verify} messages.
         * @param message SCCompTask message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISCCompTask, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SCCompTask message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SCCompTask
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SCCompTask;
    }

    /** Properties of a SCModGoods. */
    interface ISCModGoods {

        /** 结果 */
        State?: (number|null);

        /** 修改类型 */
        ModType?: (number|null);

        /** 道具DBID */
        ID?: (number|null);

        /** 是否正在使用 */
        IsUsing?: (number|null);

        /** 位置（背包、仓库...） */
        Site?: (number|null);

        /** 个数 */
        Count?: (number|null);

        /** 所在包里位置索引 */
        BagIndex?: (number|null);

        /** 新提示 */
        NewHint?: (number|null);

        /** 参数 */
        sParam?: (string|null);
    }

    /** 修改道具返回 */
    class SCModGoods implements ISCModGoods {

        /**
         * Constructs a new SCModGoods.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISCModGoods);

        /** 结果 */
        public State: number;

        /** 修改类型 */
        public ModType: number;

        /** 道具DBID */
        public ID: number;

        /** 是否正在使用 */
        public IsUsing: number;

        /** 位置（背包、仓库...） */
        public Site: number;

        /** 个数 */
        public Count: number;

        /** 所在包里位置索引 */
        public BagIndex: number;

        /** 新提示 */
        public NewHint: number;

        /** 参数 */
        public sParam: string;

        /**
         * Encodes the specified SCModGoods message. Does not implicitly {@link SCModGoods.verify|verify} messages.
         * @param message SCModGoods message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISCModGoods, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SCModGoods message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SCModGoods
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SCModGoods;
    }

    /** Properties of a S2CResetBag. */
    interface IS2CResetBag {

        /** 物品数据列表 */
        GoodsDataList?: (IGoodsData[]|null);
    }

    /** 整理背包返回 */
    class S2CResetBag implements IS2CResetBag {

        /**
         * Constructs a new S2CResetBag.
         * @param [properties] Properties to set
         */
        constructor(properties?: IS2CResetBag);

        /** 物品数据列表 */
        public GoodsDataList: IGoodsData[];

        /**
         * Encodes the specified S2CResetBag message. Does not implicitly {@link S2CResetBag.verify|verify} messages.
         * @param message S2CResetBag message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IS2CResetBag, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CResetBag message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CResetBag
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): S2CResetBag;
    }

    /** Properties of a MonsterData. */
    interface IMonsterData {

        /** 当前的角色ID */
        RoleID?: (number|null);

        /** 当前的角色ID */
        RoleName?: (string|null);

        /** 当前角色的性别 */
        RoleSex?: (number|null);

        /** 角色级别 */
        Level?: (number|null);

        /** 当前的经验 */
        Experience?: (number|null);

        /** 当前所在的位置X坐标 */
        PosX?: (number|null);

        /** 当前所在的位置Y坐标 */
        PosY?: (number|null);

        /** 当前的方向 */
        RoleDirection?: (number|null);

        /** 当前的生命值 */
        LifeV?: (number|null);

        /** 当前的生命值 */
        MaxLifeV?: (number|null);

        /** 当前的魔法值 */
        MagicV?: (number|null);

        /** 当前的魔法值 */
        MaxMagicV?: (number|null);

        /** 获取或设置精灵当前衣服代码 */
        EquipmentBody?: (number|null);

        /** 扩展ID */
        ExtensionID?: (number|null);

        /** 怪物的类型 */
        MonsterType?: (number|null);

        /** 怪物主人的角色ID 必须是玩家角色 */
        MasterRoleID?: (number|null);

        /** 宠物怪的ai类型 默认1 自由攻击 只对道士的宠物怪才有用 */
        AiControlType?: (number|null);

        /** 宠物怪的ai类型 默认1 自由攻击 只对道士的宠物怪才有用 */
        AnimalSound?: (string|null);

        /** 怪物的级别 */
        MonsterLevel?: (number|null);

        /** 中毒开始的时间 */
        ZhongDuStart?: (number|Long|null);

        /** 中毒持续的秒数 */
        ZhongDuSeconds?: (number|null);

        /** 昏迷开始时间 */
        FaintStart?: (number|Long|null);

        /** 昏迷持续的秒数 */
        FaintSeconds?: (number|null);

        /** 所属阵营 */
        BattleWitchSide?: (number|null);

        /** 是否播放出生动作 0 不播放  1 播放 */
        PlayBirthAni?: (number|null);

        /** 掉落归属者名称 */
        FallBelongToRoleID?: (number|null);

        /** 掉落归属者RoleID */
        FallBelongToName?: (string|null);
    }

    /** 创建怪物的消息包 */
    class MonsterData implements IMonsterData {

        /**
         * Constructs a new MonsterData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IMonsterData);

        /** 当前的角色ID */
        public RoleID: number;

        /** 当前的角色ID */
        public RoleName: string;

        /** 当前角色的性别 */
        public RoleSex: number;

        /** 角色级别 */
        public Level: number;

        /** 当前的经验 */
        public Experience: number;

        /** 当前所在的位置X坐标 */
        public PosX: number;

        /** 当前所在的位置Y坐标 */
        public PosY: number;

        /** 当前的方向 */
        public RoleDirection: number;

        /** 当前的生命值 */
        public LifeV: number;

        /** 当前的生命值 */
        public MaxLifeV: number;

        /** 当前的魔法值 */
        public MagicV: number;

        /** 当前的魔法值 */
        public MaxMagicV: number;

        /** 获取或设置精灵当前衣服代码 */
        public EquipmentBody: number;

        /** 扩展ID */
        public ExtensionID: number;

        /** 怪物的类型 */
        public MonsterType: number;

        /** 怪物主人的角色ID 必须是玩家角色 */
        public MasterRoleID: number;

        /** 宠物怪的ai类型 默认1 自由攻击 只对道士的宠物怪才有用 */
        public AiControlType: number;

        /** 宠物怪的ai类型 默认1 自由攻击 只对道士的宠物怪才有用 */
        public AnimalSound: string;

        /** 怪物的级别 */
        public MonsterLevel: number;

        /** 中毒开始的时间 */
        public ZhongDuStart: (number|Long);

        /** 中毒持续的秒数 */
        public ZhongDuSeconds: number;

        /** 昏迷开始时间 */
        public FaintStart: (number|Long);

        /** 昏迷持续的秒数 */
        public FaintSeconds: number;

        /** 所属阵营 */
        public BattleWitchSide: number;

        /** 是否播放出生动作 0 不播放  1 播放 */
        public PlayBirthAni: number;

        /** 掉落归属者名称 */
        public FallBelongToRoleID: number;

        /** 掉落归属者RoleID */
        public FallBelongToName: string;

        /**
         * Encodes the specified MonsterData message. Does not implicitly {@link MonsterData.verify|verify} messages.
         * @param message MonsterData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IMonsterData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MonsterData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MonsterData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MonsterData;
    }

    /** Properties of a SpriteNotifyOtherMoveData. */
    interface ISpriteNotifyOtherMoveData {

        /** SpriteNotifyOtherMoveData roleID */
        roleID?: (number|null);

        /** SpriteNotifyOtherMoveData mapCode */
        mapCode?: (number|null);

        /** SpriteNotifyOtherMoveData action */
        action?: (number|null);

        /** SpriteNotifyOtherMoveData toX */
        toX?: (number|null);

        /** SpriteNotifyOtherMoveData toY */
        toY?: (number|null);

        /** SpriteNotifyOtherMoveData extAction */
        extAction?: (number|null);

        /** SpriteNotifyOtherMoveData fromX */
        fromX?: (number|null);

        /** SpriteNotifyOtherMoveData fromY */
        fromY?: (number|null);

        /** SpriteNotifyOtherMoveData startMoveTicks */
        startMoveTicks?: (number|Long|null);

        /** SpriteNotifyOtherMoveData pathString */
        pathString?: (string|null);

        /** SpriteNotifyOtherMoveData moveCost */
        moveCost?: (number|null);
    }

    /** 寻路信息, 通知他人自己开始移动 */
    class SpriteNotifyOtherMoveData implements ISpriteNotifyOtherMoveData {

        /**
         * Constructs a new SpriteNotifyOtherMoveData.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISpriteNotifyOtherMoveData);

        /** SpriteNotifyOtherMoveData roleID. */
        public roleID: number;

        /** SpriteNotifyOtherMoveData mapCode. */
        public mapCode: number;

        /** SpriteNotifyOtherMoveData action. */
        public action: number;

        /** SpriteNotifyOtherMoveData toX. */
        public toX: number;

        /** SpriteNotifyOtherMoveData toY. */
        public toY: number;

        /** SpriteNotifyOtherMoveData extAction. */
        public extAction: number;

        /** SpriteNotifyOtherMoveData fromX. */
        public fromX: number;

        /** SpriteNotifyOtherMoveData fromY. */
        public fromY: number;

        /** SpriteNotifyOtherMoveData startMoveTicks. */
        public startMoveTicks: (number|Long);

        /** SpriteNotifyOtherMoveData pathString. */
        public pathString: string;

        /** SpriteNotifyOtherMoveData moveCost. */
        public moveCost: number;

        /**
         * Encodes the specified SpriteNotifyOtherMoveData message. Does not implicitly {@link SpriteNotifyOtherMoveData.verify|verify} messages.
         * @param message SpriteNotifyOtherMoveData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISpriteNotifyOtherMoveData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SpriteNotifyOtherMoveData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SpriteNotifyOtherMoveData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SpriteNotifyOtherMoveData;
    }

    /** Properties of a SCClientHeart. */
    interface ISCClientHeart {

        /** 玩家的角色Id */
        RoleID?: (number|null);

        /** 此次登录的令牌 */
        RandToken?: (number|null);

        /** 无效字段,兼容用 */
        Ticks?: (number|null);

        /** 客户端上报现实中的tick */
        ReportCliRealTick?: (number|Long|null);
    }

    /** 发送给服务器的心跳消息(每分钟一次?) */
    class SCClientHeart implements ISCClientHeart {

        /**
         * Constructs a new SCClientHeart.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISCClientHeart);

        /** 玩家的角色Id */
        public RoleID: number;

        /** 此次登录的令牌 */
        public RandToken: number;

        /** 无效字段,兼容用 */
        public Ticks: number;

        /** 客户端上报现实中的tick */
        public ReportCliRealTick: (number|Long);

        /**
         * Encodes the specified SCClientHeart message. Does not implicitly {@link SCClientHeart.verify|verify} messages.
         * @param message SCClientHeart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISCClientHeart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SCClientHeart message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SCClientHeart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SCClientHeart;
    }

    /** Properties of a MgiacCodeData. */
    interface IMgiacCodeData {

        /** 玩家的角色Id */
        RoleID?: (number|null);

        /** 场景id */
        mapCode?: (number|null);

        /** 技能id */
        magicCode?: (number|null);

        /** 目标id */
        targetRoleID?: (number|null);
    }

    /** Represents a MgiacCodeData. */
    class MgiacCodeData implements IMgiacCodeData {

        /**
         * Constructs a new MgiacCodeData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IMgiacCodeData);

        /** 玩家的角色Id */
        public RoleID: number;

        /** 场景id */
        public mapCode: number;

        /** 技能id */
        public magicCode: number;

        /** 目标id */
        public targetRoleID: number;

        /**
         * Encodes the specified MgiacCodeData message. Does not implicitly {@link MgiacCodeData.verify|verify} messages.
         * @param message MgiacCodeData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IMgiacCodeData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MgiacCodeData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MgiacCodeData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MgiacCodeData;
    }

    /** Properties of a RoleAction. */
    interface IRoleAction {

        /** 玩家的角色Id */
        RoleID?: (number|null);

        /** 场景id */
        mapCode?: (number|null);

        /** 方向id */
        direction?: (number|null);

        /** 行为id */
        action?: (number|null);

        /** 坐标 */
        toX?: (number|null);

        /** 坐标 */
        toY?: (number|null);

        /** 目标坐标 */
        targetX?: (number|null);

        /** 目标坐标 */
        targetY?: (number|null);

        /** yAnge */
        yAngel?: (number|null);

        /** RoleAction moveToX */
        moveToX?: (number|null);

        /** RoleAction moveToY */
        moveToY?: (number|null);

        /** RoleAction ClientTicks */
        ClientTicks?: (number|null);
    }

    /** Represents a RoleAction. */
    class RoleAction implements IRoleAction {

        /**
         * Constructs a new RoleAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: IRoleAction);

        /** 玩家的角色Id */
        public RoleID: number;

        /** 场景id */
        public mapCode: number;

        /** 方向id */
        public direction: number;

        /** 行为id */
        public action: number;

        /** 坐标 */
        public toX: number;

        /** 坐标 */
        public toY: number;

        /** 目标坐标 */
        public targetX: number;

        /** 目标坐标 */
        public targetY: number;

        /** yAnge */
        public yAngel: number;

        /** RoleAction moveToX. */
        public moveToX: number;

        /** RoleAction moveToY. */
        public moveToY: number;

        /** RoleAction ClientTicks. */
        public ClientTicks: number;

        /**
         * Encodes the specified RoleAction message. Does not implicitly {@link RoleAction.verify|verify} messages.
         * @param message RoleAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IRoleAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoleAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoleAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RoleAction;
    }

    /** Properties of an AttackData. */
    interface IAttackData {

        /** 玩家的角色Id */
        roleID?: (number|null);

        /** 攻击者的x */
        roleX?: (number|null);

        /** 攻击者的y */
        roleY?: (number|null);

        /** 受攻击的id */
        enemy?: (number|null);

        /** 受攻击者的x */
        enemyX?: (number|null);

        /** 受攻击者的y */
        enemyY?: (number|null);

        /** 受攻击者服务器位置x */
        realEnemyX?: (number|null);

        /** 受攻击者服务器位置y */
        realEnemyY?: (number|null);

        /** 技能id */
        magicCode?: (number|null);

        /** 客户端上报现实中的tick */
        clientTicks?: (number|Long|null);
    }

    /** Represents an AttackData. */
    class AttackData implements IAttackData {

        /**
         * Constructs a new AttackData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IAttackData);

        /** 玩家的角色Id */
        public roleID: number;

        /** 攻击者的x */
        public roleX: number;

        /** 攻击者的y */
        public roleY: number;

        /** 受攻击的id */
        public enemy: number;

        /** 受攻击者的x */
        public enemyX: number;

        /** 受攻击者的y */
        public enemyY: number;

        /** 受攻击者服务器位置x */
        public realEnemyX: number;

        /** 受攻击者服务器位置y */
        public realEnemyY: number;

        /** 技能id */
        public magicCode: number;

        /** 客户端上报现实中的tick */
        public clientTicks: (number|Long);

        /**
         * Encodes the specified AttackData message. Does not implicitly {@link AttackData.verify|verify} messages.
         * @param message AttackData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IAttackData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AttackData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AttackData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AttackData;
    }

    /** Properties of a SpriteRelifeData. */
    interface ISpriteRelifeData {

        /** SpriteRelifeData roleID */
        roleID?: (number|null);

        /** SpriteRelifeData x */
        x?: (number|null);

        /** SpriteRelifeData y */
        y?: (number|null);

        /** SpriteRelifeData direction */
        direction?: (number|null);

        /** SpriteRelifeData lifeV */
        lifeV?: (number|null);

        /** SpriteRelifeData magicV */
        magicV?: (number|null);

        /** SpriteRelifeData force */
        force?: (number|null);
    }

    /** 精灵回血数据 */
    class SpriteRelifeData implements ISpriteRelifeData {

        /**
         * Constructs a new SpriteRelifeData.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISpriteRelifeData);

        /** SpriteRelifeData roleID. */
        public roleID: number;

        /** SpriteRelifeData x. */
        public x: number;

        /** SpriteRelifeData y. */
        public y: number;

        /** SpriteRelifeData direction. */
        public direction: number;

        /** SpriteRelifeData lifeV. */
        public lifeV: number;

        /** SpriteRelifeData magicV. */
        public magicV: number;

        /** SpriteRelifeData force. */
        public force: number;

        /**
         * Encodes the specified SpriteRelifeData message. Does not implicitly {@link SpriteRelifeData.verify|verify} messages.
         * @param message SpriteRelifeData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISpriteRelifeData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SpriteRelifeData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SpriteRelifeData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SpriteRelifeData;
    }

    /** Properties of a SpriteAttackResultData. */
    interface ISpriteAttackResultData {

        /** 敌人ID */
        enemy?: (number|null);

        /** 伤害类型 */
        burst?: (number|null);

        /** 伤害值 */
        injure?: (number|null);

        /** 敌人生命值 */
        enemyLife?: (number|null);

        /** 获得的经验？ */
        newExperience?: (number|Long|null);

        /** 主角的当前经验值 */
        experience?: (number|Long|null);

        /** 主角的新等级 */
        newLevel?: (number|null);

        /** 梅林伤害值 */
        MerlinInjuer?: (number|null);

        /** 梅林伤害类型 */
        MerlinType?: (number|null);
    }

    /** 精灵攻击结果 */
    class SpriteAttackResultData implements ISpriteAttackResultData {

        /**
         * Constructs a new SpriteAttackResultData.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISpriteAttackResultData);

        /** 敌人ID */
        public enemy: number;

        /** 伤害类型 */
        public burst: number;

        /** 伤害值 */
        public injure: number;

        /** 敌人生命值 */
        public enemyLife: number;

        /** 获得的经验？ */
        public newExperience: (number|Long);

        /** 主角的当前经验值 */
        public experience: (number|Long);

        /** 主角的新等级 */
        public newLevel: number;

        /** 梅林伤害值 */
        public MerlinInjuer: number;

        /** 梅林伤害类型 */
        public MerlinType: number;

        /**
         * Encodes the specified SpriteAttackResultData message. Does not implicitly {@link SpriteAttackResultData.verify|verify} messages.
         * @param message SpriteAttackResultData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISpriteAttackResultData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SpriteAttackResultData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SpriteAttackResultData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SpriteAttackResultData;
    }

    /** Properties of a SpriteInjuredData. */
    interface ISpriteInjuredData {

        /** SpriteInjuredData attackerRoleID */
        attackerRoleID?: (number|null);

        /** SpriteInjuredData injuredRoleID */
        injuredRoleID?: (number|null);

        /** SpriteInjuredData burst */
        burst?: (number|null);

        /** SpriteInjuredData injure */
        injure?: (number|null);

        /** SpriteInjuredData injuredRoleLife */
        injuredRoleLife?: (number|null);

        /** SpriteInjuredData attackerLevel */
        attackerLevel?: (number|null);

        /** SpriteInjuredData injuredRoleMaxLifeV */
        injuredRoleMaxLifeV?: (number|null);

        /** SpriteInjuredData injuredRoleMagic */
        injuredRoleMagic?: (number|null);

        /** SpriteInjuredData injuredRoleMaxMagicV */
        injuredRoleMaxMagicV?: (number|null);

        /** SpriteInjuredData hitToGridX */
        hitToGridX?: (number|null);

        /** SpriteInjuredData hitToGridY */
        hitToGridY?: (number|null);

        /** 梅林伤害值 */
        MerlinInjuer?: (number|null);

        /** 梅林伤害类型  // TODO... 原始数据类型为sbyte */
        MerlinType?: (number|null);
    }

    /** 精灵伤害数据 */
    class SpriteInjuredData implements ISpriteInjuredData {

        /**
         * Constructs a new SpriteInjuredData.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISpriteInjuredData);

        /** SpriteInjuredData attackerRoleID. */
        public attackerRoleID: number;

        /** SpriteInjuredData injuredRoleID. */
        public injuredRoleID: number;

        /** SpriteInjuredData burst. */
        public burst: number;

        /** SpriteInjuredData injure. */
        public injure: number;

        /** SpriteInjuredData injuredRoleLife. */
        public injuredRoleLife: number;

        /** SpriteInjuredData attackerLevel. */
        public attackerLevel: number;

        /** SpriteInjuredData injuredRoleMaxLifeV. */
        public injuredRoleMaxLifeV: number;

        /** SpriteInjuredData injuredRoleMagic. */
        public injuredRoleMagic: number;

        /** SpriteInjuredData injuredRoleMaxMagicV. */
        public injuredRoleMaxMagicV: number;

        /** SpriteInjuredData hitToGridX. */
        public hitToGridX: number;

        /** SpriteInjuredData hitToGridY. */
        public hitToGridY: number;

        /** 梅林伤害值 */
        public MerlinInjuer: number;

        /** 梅林伤害类型  // TODO... 原始数据类型为sbyte */
        public MerlinType: number;

        /**
         * Encodes the specified SpriteInjuredData message. Does not implicitly {@link SpriteInjuredData.verify|verify} messages.
         * @param message SpriteInjuredData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISpriteInjuredData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SpriteInjuredData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SpriteInjuredData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SpriteInjuredData;
    }

    /** Properties of a SpriteHitedData. */
    interface ISpriteHitedData {

        /** SpriteHitedData roleId */
        roleId?: (number|null);

        /** SpriteHitedData enemy */
        enemy?: (number|null);

        /** SpriteHitedData enemyX */
        enemyX?: (number|null);

        /** SpriteHitedData enemyY */
        enemyY?: (number|null);

        /** SpriteHitedData magicAttackID */
        magicAttackID?: (number|null);

        /** SpriteHitedData yAngle */
        yAngle?: (number|null);
    }

    /** 精灵受击 */
    class SpriteHitedData implements ISpriteHitedData {

        /**
         * Constructs a new SpriteHitedData.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISpriteHitedData);

        /** SpriteHitedData roleId. */
        public roleId: number;

        /** SpriteHitedData enemy. */
        public enemy: number;

        /** SpriteHitedData enemyX. */
        public enemyX: number;

        /** SpriteHitedData enemyY. */
        public enemyY: number;

        /** SpriteHitedData magicAttackID. */
        public magicAttackID: number;

        /** SpriteHitedData yAngle. */
        public yAngle: number;

        /**
         * Encodes the specified SpriteHitedData message. Does not implicitly {@link SpriteHitedData.verify|verify} messages.
         * @param message SpriteHitedData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISpriteHitedData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SpriteHitedData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SpriteHitedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SpriteHitedData;
    }

    /** Properties of a SpriteMagicAttackData. */
    interface ISpriteMagicAttackData {

        /** 攻击者 */
        attackerRoleID?: (number|null);

        /** 招式ID */
        magicAttackID?: (number|null);
    }

    /** 精灵招式攻击数据 */
    class SpriteMagicAttackData implements ISpriteMagicAttackData {

        /**
         * Constructs a new SpriteMagicAttackData.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISpriteMagicAttackData);

        /** 攻击者 */
        public attackerRoleID: number;

        /** 招式ID */
        public magicAttackID: number;

        /**
         * Encodes the specified SpriteMagicAttackData message. Does not implicitly {@link SpriteMagicAttackData.verify|verify} messages.
         * @param message SpriteMagicAttackData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISpriteMagicAttackData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SpriteMagicAttackData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SpriteMagicAttackData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SpriteMagicAttackData;
    }

    /** Properties of a SpriteLifeChangeData. */
    interface ISpriteLifeChangeData {

        /** 角色ID */
        roleID?: (number|null);

        /** 最大血值 */
        lifeV?: (number|null);

        /** 最大蓝值 */
        magicV?: (number|null);

        /** 当前血值 */
        currentLifeV?: (number|null);

        /** 当前蓝值 */
        currentMagicV?: (number|null);

        /** 加入移动速度变化时的同步 */
        moveSpeed?: (number|null);
    }

    /** 精灵生命变化 */
    class SpriteLifeChangeData implements ISpriteLifeChangeData {

        /**
         * Constructs a new SpriteLifeChangeData.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISpriteLifeChangeData);

        /** 角色ID */
        public roleID: number;

        /** 最大血值 */
        public lifeV: number;

        /** 最大蓝值 */
        public magicV: number;

        /** 当前血值 */
        public currentLifeV: number;

        /** 当前蓝值 */
        public currentMagicV: number;

        /** 加入移动速度变化时的同步 */
        public moveSpeed: number;

        /**
         * Encodes the specified SpriteLifeChangeData message. Does not implicitly {@link SpriteLifeChangeData.verify|verify} messages.
         * @param message SpriteLifeChangeData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISpriteLifeChangeData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SpriteLifeChangeData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SpriteLifeChangeData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SpriteLifeChangeData;
    }

    /** Properties of a LoadAlreadyData. */
    interface ILoadAlreadyData {

        /** LoadAlreadyData RoleID */
        RoleID?: (number|null);

        /** LoadAlreadyData MapCode */
        MapCode?: (number|null);

        /** LoadAlreadyData StartMoveTicks */
        StartMoveTicks?: (number|Long|null);

        /** LoadAlreadyData CurrentX */
        CurrentX?: (number|null);

        /** LoadAlreadyData CurrentY */
        CurrentY?: (number|null);

        /** LoadAlreadyData CurrentDirection */
        CurrentDirection?: (number|null);

        /** LoadAlreadyData Action */
        Action?: (number|null);

        /** LoadAlreadyData ToX */
        ToX?: (number|null);

        /** LoadAlreadyData ToY */
        ToY?: (number|null);

        /** LoadAlreadyData MoveCost */
        MoveCost?: (number|null);

        /** LoadAlreadyData ExtAction */
        ExtAction?: (number|null);

        /** LoadAlreadyData PathString */
        PathString?: (string|null);

        /** LoadAlreadyData CurrentPathIndex */
        CurrentPathIndex?: (number|null);
    }

    /** 角色加载完毕的数据 */
    class LoadAlreadyData implements ILoadAlreadyData {

        /**
         * Constructs a new LoadAlreadyData.
         * @param [properties] Properties to set
         */
        constructor(properties?: ILoadAlreadyData);

        /** LoadAlreadyData RoleID. */
        public RoleID: number;

        /** LoadAlreadyData MapCode. */
        public MapCode: number;

        /** LoadAlreadyData StartMoveTicks. */
        public StartMoveTicks: (number|Long);

        /** LoadAlreadyData CurrentX. */
        public CurrentX: number;

        /** LoadAlreadyData CurrentY. */
        public CurrentY: number;

        /** LoadAlreadyData CurrentDirection. */
        public CurrentDirection: number;

        /** LoadAlreadyData Action. */
        public Action: number;

        /** LoadAlreadyData ToX. */
        public ToX: number;

        /** LoadAlreadyData ToY. */
        public ToY: number;

        /** LoadAlreadyData MoveCost. */
        public MoveCost: number;

        /** LoadAlreadyData ExtAction. */
        public ExtAction: number;

        /** LoadAlreadyData PathString. */
        public PathString: string;

        /** LoadAlreadyData CurrentPathIndex. */
        public CurrentPathIndex: number;

        /**
         * Encodes the specified LoadAlreadyData message. Does not implicitly {@link LoadAlreadyData.verify|verify} messages.
         * @param message LoadAlreadyData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ILoadAlreadyData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoadAlreadyData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoadAlreadyData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): LoadAlreadyData;
    }

    /** Properties of a RoleDataMini. */
    interface IRoleDataMini {

        /** 当前的角色ID */
        RoleID?: (number|null);

        /** 当前的角色ID */
        RoleName?: (string|null);

        /** 当前角色的性别 */
        RoleSex?: (number|null);

        /** 角色职业 */
        Occupation?: (number|null);

        /** 角色级别 */
        Level?: (number|null);

        /** 角色所属的帮派 */
        Faction?: (number|null);

        /** 当前的PK模式 */
        PKMode?: (number|null);

        /** 当前的PK值 */
        PKValue?: (number|null);

        /** 所在的地图的编号 */
        MapCode?: (number|null);

        /** 当前所在的位置X坐标 */
        PosX?: (number|null);

        /** 当前所在的位置Y坐标 */
        PosY?: (number|null);

        /** 当前的方向 */
        RoleDirection?: (number|null);

        /** 当前的生命值 */
        LifeV?: (number|null);

        /** 最大的生命值 */
        MaxLifeV?: (number|null);

        /** 当前的魔法值 */
        MagicV?: (number|null);

        /** 最大的魔法值 */
        MaxMagicV?: (number|null);

        /** 衣服代号 */
        BodyCode?: (number|null);

        /** 武器代号 */
        WeaponCode?: (number|null);

        /** 称号 */
        OtherName?: (string|null);

        /** 组队的ID */
        TeamID?: (number|null);

        /** 当前的组队中的队长ID */
        TeamLeaderRoleID?: (number|null);

        /** 当前的PK点 */
        PKPoint?: (number|null);

        /** 紫名的开始时间 */
        StartPurpleNameTicks?: (number|Long|null);

        /** 角斗场荣誉称号开始时间 */
        BattleNameStart?: (number|Long|null);

        /** 角斗场荣誉称号 */
        BattleNameIndex?: (number|null);

        /** 区ID */
        ZoneID?: (number|null);

        /** 帮会名称 */
        BHName?: (string|null);

        /** 被邀请加入帮会时是否验证 */
        BHVerify?: (number|null);

        /** 帮会职务 */
        BHZhiWu?: (number|null);

        /** 法师的护盾开始的时间 */
        FSHuDunStart?: (number|Long|null);

        /** 大乱斗中的阵营ID */
        BattleWhichSide?: (number|null);

        /** 上次的mailID */
        IsVIP?: (number|null);

        /** 道术隐身的时间 */
        DSHideStart?: (number|Long|null);

        /** 角色常用整形参数值列表 */
        RoleCommonUseIntPamams?: (number[]|null);

        /** 法师的护盾持续的秒数 */
        FSHuDunSeconds?: (number|null);

        /** 中毒开始的时间 */
        ZhongDuStart?: (number|Long|null);

        /** 中毒持续的秒数 */
        ZhongDuSeconds?: (number|null);

        /** 节日称号 */
        JieriChengHao?: (number|null);

        /** 冻结开始的时间 */
        DongJieStart?: (number|Long|null);

        /** 冻结持续的秒数 */
        DongJieSeconds?: (number|null);

        /** 物品数据 */
        GoodsDataList?: (IGoodsData[]|null);

        /** 重生级别 */
        ChangeLifeLev?: (number|null);

        /** 重生计数 */
        ChangeLifeCount?: (number|null);

        /** 摆摊的名称 */
        StallName?: (string|null);

        /** Buffer Mini数据 */
        BufferMiniInfo?: (IBufferDataMini[]|null);

        /** 翅膀数据列表 */
        MyWingData?: (IWingData|null);

        /** VIP等级 */
        VIPLevel?: (number|null);

        /** 是否gm */
        GMAuth?: (number|null);

        /** 二态功能设置，参考ESettingBitFlag */
        SettingBitFlags?: (number|Long|null);

        /** 配偶id, >0 表示有 */
        SpouseId?: (number|null);

        /** 骑乘状态， >0 表示在骑乘中 */
        HorseRideState?: (number|null);

        /** 骑乘机甲状态， >0 表示在骑乘中 */
        nIsOnJiJia?: (number|null);
    }

    /** 精简的角色数据（主要用于通知角色用） */
    class RoleDataMini implements IRoleDataMini {

        /**
         * Constructs a new RoleDataMini.
         * @param [properties] Properties to set
         */
        constructor(properties?: IRoleDataMini);

        /** 当前的角色ID */
        public RoleID: number;

        /** 当前的角色ID */
        public RoleName: string;

        /** 当前角色的性别 */
        public RoleSex: number;

        /** 角色职业 */
        public Occupation: number;

        /** 角色级别 */
        public Level: number;

        /** 角色所属的帮派 */
        public Faction: number;

        /** 当前的PK模式 */
        public PKMode: number;

        /** 当前的PK值 */
        public PKValue: number;

        /** 所在的地图的编号 */
        public MapCode: number;

        /** 当前所在的位置X坐标 */
        public PosX: number;

        /** 当前所在的位置Y坐标 */
        public PosY: number;

        /** 当前的方向 */
        public RoleDirection: number;

        /** 当前的生命值 */
        public LifeV: number;

        /** 最大的生命值 */
        public MaxLifeV: number;

        /** 当前的魔法值 */
        public MagicV: number;

        /** 最大的魔法值 */
        public MaxMagicV: number;

        /** 衣服代号 */
        public BodyCode: number;

        /** 武器代号 */
        public WeaponCode: number;

        /** 称号 */
        public OtherName: string;

        /** 组队的ID */
        public TeamID: number;

        /** 当前的组队中的队长ID */
        public TeamLeaderRoleID: number;

        /** 当前的PK点 */
        public PKPoint: number;

        /** 紫名的开始时间 */
        public StartPurpleNameTicks: (number|Long);

        /** 角斗场荣誉称号开始时间 */
        public BattleNameStart: (number|Long);

        /** 角斗场荣誉称号 */
        public BattleNameIndex: number;

        /** 区ID */
        public ZoneID: number;

        /** 帮会名称 */
        public BHName: string;

        /** 被邀请加入帮会时是否验证 */
        public BHVerify: number;

        /** 帮会职务 */
        public BHZhiWu: number;

        /** 法师的护盾开始的时间 */
        public FSHuDunStart: (number|Long);

        /** 大乱斗中的阵营ID */
        public BattleWhichSide: number;

        /** 上次的mailID */
        public IsVIP: number;

        /** 道术隐身的时间 */
        public DSHideStart: (number|Long);

        /** 角色常用整形参数值列表 */
        public RoleCommonUseIntPamams: number[];

        /** 法师的护盾持续的秒数 */
        public FSHuDunSeconds: number;

        /** 中毒开始的时间 */
        public ZhongDuStart: (number|Long);

        /** 中毒持续的秒数 */
        public ZhongDuSeconds: number;

        /** 节日称号 */
        public JieriChengHao: number;

        /** 冻结开始的时间 */
        public DongJieStart: (number|Long);

        /** 冻结持续的秒数 */
        public DongJieSeconds: number;

        /** 物品数据 */
        public GoodsDataList: IGoodsData[];

        /** 重生级别 */
        public ChangeLifeLev: number;

        /** 重生计数 */
        public ChangeLifeCount: number;

        /** 摆摊的名称 */
        public StallName: string;

        /** Buffer Mini数据 */
        public BufferMiniInfo: IBufferDataMini[];

        /** 翅膀数据列表 */
        public MyWingData?: (IWingData|null);

        /** VIP等级 */
        public VIPLevel: number;

        /** 是否gm */
        public GMAuth: number;

        /** 二态功能设置，参考ESettingBitFlag */
        public SettingBitFlags: (number|Long);

        /** 配偶id, >0 表示有 */
        public SpouseId: number;

        /** 骑乘状态， >0 表示在骑乘中 */
        public HorseRideState: number;

        /** 骑乘机甲状态， >0 表示在骑乘中 */
        public nIsOnJiJia: number;

        /**
         * Encodes the specified RoleDataMini message. Does not implicitly {@link RoleDataMini.verify|verify} messages.
         * @param message RoleDataMini message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IRoleDataMini, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoleDataMini message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoleDataMini
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RoleDataMini;
    }

    /** Properties of a PositionData. */
    interface IPositionData {

        /** PositionData RoleID */
        RoleID?: (number|null);

        /** PositionData MapCode */
        MapCode?: (number|null);

        /** PositionData toX */
        toX?: (number|null);

        /** PositionData toY */
        toY?: (number|null);

        /** PositionData currentPosTicks */
        currentPosTicks?: (number|Long|null);
    }

    /** Represents a PositionData. */
    class PositionData implements IPositionData {

        /**
         * Constructs a new PositionData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IPositionData);

        /** PositionData RoleID. */
        public RoleID: number;

        /** PositionData MapCode. */
        public MapCode: number;

        /** PositionData toX. */
        public toX: number;

        /** PositionData toY. */
        public toY: number;

        /** PositionData currentPosTicks. */
        public currentPosTicks: (number|Long);

        /**
         * Encodes the specified PositionData message. Does not implicitly {@link PositionData.verify|verify} messages.
         * @param message PositionData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IPositionData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PositionData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PositionData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PositionData;
    }

    /** Properties of a MonsterRealiveData. */
    interface IMonsterRealiveData {

        /** 当前的角色ID */
        RoleID?: (number|null);

        /** 当前的角色X坐标 */
        PosX?: (number|null);

        /** 当前的角色Y坐标 */
        PosY?: (number|null);

        /** 当前的角色方向 */
        Direction?: (number|null);
    }

    /** 怪的复活数据定义（人和怪物都使用这个数据） */
    class MonsterRealiveData implements IMonsterRealiveData {

        /**
         * Constructs a new MonsterRealiveData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IMonsterRealiveData);

        /** 当前的角色ID */
        public RoleID: number;

        /** 当前的角色X坐标 */
        public PosX: number;

        /** 当前的角色Y坐标 */
        public PosY: number;

        /** 当前的角色方向 */
        public Direction: number;

        /**
         * Encodes the specified MonsterRealiveData message. Does not implicitly {@link MonsterRealiveData.verify|verify} messages.
         * @param message MonsterRealiveData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IMonsterRealiveData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MonsterRealiveData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MonsterRealiveData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MonsterRealiveData;
    }

    /** Properties of a CSPropAddPoint. */
    interface ICSPropAddPoint {

        /** CSPropAddPoint RoleID */
        RoleID?: (number|null);

        /** 力量 */
        Strength?: (number|null);

        /** 智力 */
        Intelligence?: (number|null);

        /** 敏捷 */
        Dexterity?: (number|null);

        /** 体力 */
        Constitution?: (number|null);
    }

    /** 属性加点操作 */
    class CSPropAddPoint implements ICSPropAddPoint {

        /**
         * Constructs a new CSPropAddPoint.
         * @param [properties] Properties to set
         */
        constructor(properties?: ICSPropAddPoint);

        /** CSPropAddPoint RoleID. */
        public RoleID: number;

        /** 力量 */
        public Strength: number;

        /** 智力 */
        public Intelligence: number;

        /** 敏捷 */
        public Dexterity: number;

        /** 体力 */
        public Constitution: number;

        /**
         * Encodes the specified CSPropAddPoint message. Does not implicitly {@link CSPropAddPoint.verify|verify} messages.
         * @param message CSPropAddPoint message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ICSPropAddPoint, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CSPropAddPoint message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CSPropAddPoint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CSPropAddPoint;
    }

    /** Properties of an ActivityIconStateData. */
    interface IActivityIconStateData {

        /** 前15位表示功能状态编号，后一位表示图标状态（0为不显示感叹号、1为显示） // TODO... 原始数据类型为ushort */
        arrIconState?: (number[]|null);
    }

    /** 刷新图标状态数据 */
    class ActivityIconStateData implements IActivityIconStateData {

        /**
         * Constructs a new ActivityIconStateData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IActivityIconStateData);

        /** 前15位表示功能状态编号，后一位表示图标状态（0为不显示感叹号、1为显示） // TODO... 原始数据类型为ushort */
        public arrIconState: number[];

        /**
         * Encodes the specified ActivityIconStateData message. Does not implicitly {@link ActivityIconStateData.verify|verify} messages.
         * @param message ActivityIconStateData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IActivityIconStateData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ActivityIconStateData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ActivityIconStateData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ActivityIconStateData;
    }

    /** Properties of a SpriteActionData. */
    interface ISpriteActionData {

        /** 角色Id */
        roleID?: (number|null);

        /** 做动作时所在场景的Id */
        mapCode?: (number|null);

        /** 做动作时面向的方向(8方向?).兼容用! */
        direction?: (number|null);

        /** 角色做出的动作. GActions之一 */
        action?: (number|null);

        /** 角色做出动作时,客户端所在的坐标X(服务器系坐标系) */
        toX?: (number|null);

        /** 角色做出动作时,客户端所在的坐标Y(服务器系坐标系) */
        toY?: (number|null);

        /** 目标坐标X(服务器系坐标系),如技能释放点 */
        targetX?: (number|null);

        /** 目标坐标Y(服务器系坐标系),如技能释放点 */
        targetY?: (number|null);

        /** 做动作时面向的方向(360方向?). */
        yAngle?: (number|null);
    }

    /** 同步角色的动作(如释放技能,笑等) */
    class SpriteActionData implements ISpriteActionData {

        /**
         * Constructs a new SpriteActionData.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISpriteActionData);

        /** 角色Id */
        public roleID: number;

        /** 做动作时所在场景的Id */
        public mapCode: number;

        /** 做动作时面向的方向(8方向?).兼容用! */
        public direction: number;

        /** 角色做出的动作. GActions之一 */
        public action: number;

        /** 角色做出动作时,客户端所在的坐标X(服务器系坐标系) */
        public toX: number;

        /** 角色做出动作时,客户端所在的坐标Y(服务器系坐标系) */
        public toY: number;

        /** 目标坐标X(服务器系坐标系),如技能释放点 */
        public targetX: number;

        /** 目标坐标Y(服务器系坐标系),如技能释放点 */
        public targetY: number;

        /** 做动作时面向的方向(360方向?). */
        public yAngle: number;

        /**
         * Encodes the specified SpriteActionData message. Does not implicitly {@link SpriteActionData.verify|verify} messages.
         * @param message SpriteActionData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISpriteActionData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SpriteActionData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SpriteActionData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SpriteActionData;
    }

    /** Properties of a SpriteAttackData. */
    interface ISpriteAttackData {

        /** 发动伤害的角色Id */
        roleID?: (number|null);

        /** 角色的位置坐标X(服务器坐标系) */
        roleX?: (number|null);

        /** 角色的位置坐标Y(服务器坐标系) */
        roleY?: (number|null);

        /** 目标的角色Id(可以没有-1) */
        enemy?: (number|null);

        /** 目标的位置坐标X(服务器坐标系).enemy有效时才有效 */
        enemyX?: (number|null);

        /** 目标的位置坐标Y(服务器坐标系).enemy有效时才有效 */
        enemyY?: (number|null);

        /** 目标点位置坐标X(服务器坐标系) */
        realEnemyX?: (number|null);

        /** 目标点位置坐标Y(服务器坐标系) */
        realEnemyY?: (number|null);

        /** 使用的技能Id */
        magicCode?: (number|null);
    }

    /** 一次伤害相关的信息 */
    class SpriteAttackData implements ISpriteAttackData {

        /**
         * Constructs a new SpriteAttackData.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISpriteAttackData);

        /** 发动伤害的角色Id */
        public roleID: number;

        /** 角色的位置坐标X(服务器坐标系) */
        public roleX: number;

        /** 角色的位置坐标Y(服务器坐标系) */
        public roleY: number;

        /** 目标的角色Id(可以没有-1) */
        public enemy: number;

        /** 目标的位置坐标X(服务器坐标系).enemy有效时才有效 */
        public enemyX: number;

        /** 目标的位置坐标Y(服务器坐标系).enemy有效时才有效 */
        public enemyY: number;

        /** 目标点位置坐标X(服务器坐标系) */
        public realEnemyX: number;

        /** 目标点位置坐标Y(服务器坐标系) */
        public realEnemyY: number;

        /** 使用的技能Id */
        public magicCode: number;

        /**
         * Encodes the specified SpriteAttackData message. Does not implicitly {@link SpriteAttackData.verify|verify} messages.
         * @param message SpriteAttackData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISpriteAttackData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SpriteAttackData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SpriteAttackData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SpriteAttackData;
    }

    /** Properties of a SCAutoFight. */
    interface ISCAutoFight {

        /** 返回客户端挂机指令的执行结果. 0 - 成功, -1 - 已经处于对应的挂机状态,忽略此指令, -2 - 其它错误 */
        State?: (number|null);

        /** 发出指令的角色的角色Id */
        RoleID?: (number|null);

        /** 自动挂机的类型.为 AutoFightCmds 之一 */
        FightType?: (number|null);

        /** 自动挂机相关的标识, 为 GetThingsIndexes 标识的组合 */
        Tag?: (number|null);
    }

    /** 挂机(自动战斗)的信息 */
    class SCAutoFight implements ISCAutoFight {

        /**
         * Constructs a new SCAutoFight.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISCAutoFight);

        /** 返回客户端挂机指令的执行结果. 0 - 成功, -1 - 已经处于对应的挂机状态,忽略此指令, -2 - 其它错误 */
        public State: number;

        /** 发出指令的角色的角色Id */
        public RoleID: number;

        /** 自动挂机的类型.为 AutoFightCmds 之一 */
        public FightType: number;

        /** 自动挂机相关的标识, 为 GetThingsIndexes 标识的组合 */
        public Tag: number;

        /**
         * Encodes the specified SCAutoFight message. Does not implicitly {@link SCAutoFight.verify|verify} messages.
         * @param message SCAutoFight message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISCAutoFight, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SCAutoFight message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SCAutoFight
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SCAutoFight;
    }

    /** Properties of a SCFindMonster. */
    interface ISCFindMonster {

        /** 客户端的角色Id */
        RoleID?: (number|null);

        /** 目标点X(服务器坐标系) */
        X?: (number|null);

        /** 目标点Y(服务器坐标系) */
        Y?: (number|null);

        /** 查找半径(格子坐标系) */
        radiusGridNum?: (number|null);

        /** 是否排除Boss */
        ExcludeBoss?: (number|null);

        /** 需要排除的怪物角色Id */
        excludeMonsterIDs?: (number[]|null);
    }

    /** 通过服务器查找目标点周围的怪物 */
    class SCFindMonster implements ISCFindMonster {

        /**
         * Constructs a new SCFindMonster.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISCFindMonster);

        /** 客户端的角色Id */
        public RoleID: number;

        /** 目标点X(服务器坐标系) */
        public X: number;

        /** 目标点Y(服务器坐标系) */
        public Y: number;

        /** 查找半径(格子坐标系) */
        public radiusGridNum: number;

        /** 是否排除Boss */
        public ExcludeBoss: number;

        /** 需要排除的怪物角色Id */
        public excludeMonsterIDs: number[];

        /**
         * Encodes the specified SCFindMonster message. Does not implicitly {@link SCFindMonster.verify|verify} messages.
         * @param message SCFindMonster message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISCFindMonster, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SCFindMonster message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SCFindMonster
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SCFindMonster;
    }

    /** Properties of a SCMapChange. */
    interface ISCMapChange {

        /** 角色ID */
        RoleID?: (number|null);

        /** 传送点ID */
        TeleportID?: (number|null);

        /** 新地图ID */
        NewMapCode?: (number|null);

        /** 新地图坐标X */
        ToNewMapX?: (number|null);

        /** 新地图坐标Y */
        ToNewMapY?: (number|null);

        /** 新地图角色方向 */
        ToNewDiection?: (number|null);

        /** 结果 */
        State?: (number|null);
    }

    /** 切换地图数据 */
    class SCMapChange implements ISCMapChange {

        /**
         * Constructs a new SCMapChange.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISCMapChange);

        /** 角色ID */
        public RoleID: number;

        /** 传送点ID */
        public TeleportID: number;

        /** 新地图ID */
        public NewMapCode: number;

        /** 新地图坐标X */
        public ToNewMapX: number;

        /** 新地图坐标Y */
        public ToNewMapY: number;

        /** 新地图角色方向 */
        public ToNewDiection: number;

        /** 结果 */
        public State: number;

        /**
         * Encodes the specified SCMapChange message. Does not implicitly {@link SCMapChange.verify|verify} messages.
         * @param message SCMapChange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISCMapChange, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SCMapChange message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SCMapChange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SCMapChange;
    }

    /** Properties of a SpriteTransportToPosData. */
    interface ISpriteTransportToPosData {

        /** 角色ID */
        RoleID?: (number|null);

        /** 传送点ID */
        TeleportID?: (number|null);

        /** 地图ID */
        MapCode?: (number|null);

        /** 坐标X */
        TransportToX?: (number|null);

        /** 坐标Y */
        TransportToY?: (number|null);

        /** 角色方向 */
        ToNewDiection?: (number|null);
    }

    /** 瞬移的数据 */
    class SpriteTransportToPosData implements ISpriteTransportToPosData {

        /**
         * Constructs a new SpriteTransportToPosData.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISpriteTransportToPosData);

        /** 角色ID */
        public RoleID: number;

        /** 传送点ID */
        public TeleportID: number;

        /** 地图ID */
        public MapCode: number;

        /** 坐标X */
        public TransportToX: number;

        /** 坐标Y */
        public TransportToY: number;

        /** 角色方向 */
        public ToNewDiection: number;

        /**
         * Encodes the specified SpriteTransportToPosData message. Does not implicitly {@link SpriteTransportToPosData.verify|verify} messages.
         * @param message SpriteTransportToPosData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISpriteTransportToPosData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SpriteTransportToPosData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SpriteTransportToPosData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SpriteTransportToPosData;
    }

    /** Properties of a ChangeEquipData. */
    interface IChangeEquipData {

        /** 角色ID */
        RoleID?: (number|null);

        /** 换装GoodsData */
        EquipGoodsData?: (IGoodsData|null);

        /** 翅膀数据 */
        UsingWinData?: (IWingData|null);

        /** 变化类型 */
        nChangeType?: (number|null);
    }

    /** 更换装备的消息数据 */
    class ChangeEquipData implements IChangeEquipData {

        /**
         * Constructs a new ChangeEquipData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IChangeEquipData);

        /** 角色ID */
        public RoleID: number;

        /** 换装GoodsData */
        public EquipGoodsData?: (IGoodsData|null);

        /** 翅膀数据 */
        public UsingWinData?: (IWingData|null);

        /** 变化类型 */
        public nChangeType: number;

        /**
         * Encodes the specified ChangeEquipData message. Does not implicitly {@link ChangeEquipData.verify|verify} messages.
         * @param message ChangeEquipData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IChangeEquipData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChangeEquipData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChangeEquipData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ChangeEquipData;
    }

    /** Properties of a SevenDayItemData. */
    interface ISevenDayItemData {

        /** 领奖标识 1.七日登录：1 == 已领取, 否则为未领取 2.七日目标：1 == 已领取, 否则为未领取 3.七日抢购：不使用此字段 4.七日充值：1 == 已领取, 否则为未领取 */
        AwardFlag?: (number|null);

        /** 附加参数 1.七日登录：1 == 当天登录了，否则表示未登录 2.七日目标：表示该项已经达成的总和 3.七日抢购：该项已购买个数 4.七日充值：该项充值金额 */
        Params1?: (number|null);

        /** 暂时不明白干啥的 */
        Params2?: (number|null);
    }

    /** 七日活动每个活动的每个子项的信息 */
    class SevenDayItemData implements ISevenDayItemData {

        /**
         * Constructs a new SevenDayItemData.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISevenDayItemData);

        /** 领奖标识 1.七日登录：1 == 已领取, 否则为未领取 2.七日目标：1 == 已领取, 否则为未领取 3.七日抢购：不使用此字段 4.七日充值：1 == 已领取, 否则为未领取 */
        public AwardFlag: number;

        /** 附加参数 1.七日登录：1 == 当天登录了，否则表示未登录 2.七日目标：表示该项已经达成的总和 3.七日抢购：该项已购买个数 4.七日充值：该项充值金额 */
        public Params1: number;

        /** 暂时不明白干啥的 */
        public Params2: number;

        /**
         * Encodes the specified SevenDayItemData message. Does not implicitly {@link SevenDayItemData.verify|verify} messages.
         * @param message SevenDayItemData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISevenDayItemData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SevenDayItemData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SevenDayItemData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SevenDayItemData;
    }

    /** Properties of a SevenDayActQueryData. */
    interface ISevenDayActQueryData {

        /** 查询的那一个活动  SevenDayActivityType.xml */
        ActivityType?: (number|null);

        /** 活动的具体信息 key：每一个活动配置文件中的id字段 */
        ItemDict?: ({ [k: string]: ISevenDayItemData }|null);
    }

    /** 客户端查询七日活动信息 */
    class SevenDayActQueryData implements ISevenDayActQueryData {

        /**
         * Constructs a new SevenDayActQueryData.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISevenDayActQueryData);

        /** 查询的那一个活动  SevenDayActivityType.xml */
        public ActivityType: number;

        /** 活动的具体信息 key：每一个活动配置文件中的id字段 */
        public ItemDict: { [k: string]: ISevenDayItemData };

        /**
         * Encodes the specified SevenDayActQueryData message. Does not implicitly {@link SevenDayActQueryData.verify|verify} messages.
         * @param message SevenDayActQueryData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISevenDayActQueryData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SevenDayActQueryData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SevenDayActQueryData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SevenDayActQueryData;
    }

    /** Properties of a HuodongData. */
    interface IHuodongData {

        /** 登录周ID */
        LastWeekID?: (string|null);

        /** 登录日ID */
        LastDayID?: (string|null);

        /** 周连续登录次数 */
        LoginNum?: (number|null);

        /** 见面有礼领取步骤 */
        NewStep?: (number|null);

        /** 领取上一个见面有礼步骤的时间 */
        StepTime?: (number|Long|null);

        /** 上个月的在线时长 */
        LastMTime?: (number|null);

        /** 本月的标记ID */
        CurMID?: (string|null);

        /** 本月的在线时长 */
        CurMTime?: (number|null);

        /** 已经领取的送礼活动ID */
        SongLiID?: (number|null);

        /** 登录有礼的领取状态 */
        LoginGiftState?: (number|null);

        /** 在线有礼的领取状态 */
        OnlineGiftState?: (number|null);

        /** 限时登录活动ID */
        LastLimitTimeHuoDongID?: (number|null);

        /** 限时登录日ID */
        LastLimitTimeDayID?: (number|null);

        /** 限时登录日累计登录次数 */
        LimitTimeLoginNum?: (number|null);

        /** 限时登录日累计领取状态 */
        LimitTimeGiftState?: (number|null);

        /** 每日在线奖励的领取到了第几步 */
        EveryDayOnLineAwardStep?: (number|null);

        /** 领取上一个每日在线奖励的日期 */
        GetEveryDayOnLineAwardDayID?: (number|null);

        /** 连续登陆奖励领取到第几步了 */
        SeriesLoginGetAwardStep?: (number|null);

        /** 连续登陆领取奖励的日期 */
        SeriesLoginAwardDayID?: (number|null);

        /** 连续登陆领取奖励的列表 */
        SeriesLoginAwardGoodsID?: (string|null);

        /** 每日在线领取奖励的列表 */
        EveryDayOnLineAwardGoodsID?: (string|null);
    }

    /** 活动送礼相关数据 */
    class HuodongData implements IHuodongData {

        /**
         * Constructs a new HuodongData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IHuodongData);

        /** 登录周ID */
        public LastWeekID: string;

        /** 登录日ID */
        public LastDayID: string;

        /** 周连续登录次数 */
        public LoginNum: number;

        /** 见面有礼领取步骤 */
        public NewStep: number;

        /** 领取上一个见面有礼步骤的时间 */
        public StepTime: (number|Long);

        /** 上个月的在线时长 */
        public LastMTime: number;

        /** 本月的标记ID */
        public CurMID: string;

        /** 本月的在线时长 */
        public CurMTime: number;

        /** 已经领取的送礼活动ID */
        public SongLiID: number;

        /** 登录有礼的领取状态 */
        public LoginGiftState: number;

        /** 在线有礼的领取状态 */
        public OnlineGiftState: number;

        /** 限时登录活动ID */
        public LastLimitTimeHuoDongID: number;

        /** 限时登录日ID */
        public LastLimitTimeDayID: number;

        /** 限时登录日累计登录次数 */
        public LimitTimeLoginNum: number;

        /** 限时登录日累计领取状态 */
        public LimitTimeGiftState: number;

        /** 每日在线奖励的领取到了第几步 */
        public EveryDayOnLineAwardStep: number;

        /** 领取上一个每日在线奖励的日期 */
        public GetEveryDayOnLineAwardDayID: number;

        /** 连续登陆奖励领取到第几步了 */
        public SeriesLoginGetAwardStep: number;

        /** 连续登陆领取奖励的日期 */
        public SeriesLoginAwardDayID: number;

        /** 连续登陆领取奖励的列表 */
        public SeriesLoginAwardGoodsID: string;

        /** 每日在线领取奖励的列表 */
        public EveryDayOnLineAwardGoodsID: string;

        /**
         * Encodes the specified HuodongData message. Does not implicitly {@link HuodongData.verify|verify} messages.
         * @param message HuodongData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IHuodongData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HuodongData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HuodongData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): HuodongData;
    }

    /** Properties of a GradeRewardData. */
    interface IGradeRewardData {

        /** 等级奖励标识列表 */
        flags?: (number[]|null);
    }

    /** 等级奖励数据 */
    class GradeRewardData implements IGradeRewardData {

        /**
         * Constructs a new GradeRewardData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IGradeRewardData);

        /** 等级奖励标识列表 */
        public flags: number[];

        /**
         * Encodes the specified GradeRewardData message. Does not implicitly {@link GradeRewardData.verify|verify} messages.
         * @param message GradeRewardData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IGradeRewardData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GradeRewardData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GradeRewardData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GradeRewardData;
    }

    /** Properties of a SC_SprUseGoods. */
    interface ISC_SprUseGoods {

        /** 使用结果 */
        Error?: (number|null);

        /** 道具DbId */
        DbId?: (number|null);

        /** 使用个数 */
        Cnt?: (number|null);
    }

    /** 道具使用数据 */
    class SC_SprUseGoods implements ISC_SprUseGoods {

        /**
         * Constructs a new SC_SprUseGoods.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISC_SprUseGoods);

        /** 使用结果 */
        public Error: number;

        /** 道具DbId */
        public DbId: number;

        /** 使用个数 */
        public Cnt: number;

        /**
         * Encodes the specified SC_SprUseGoods message. Does not implicitly {@link SC_SprUseGoods.verify|verify} messages.
         * @param message SC_SprUseGoods message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISC_SprUseGoods, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SC_SprUseGoods message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SC_SprUseGoods
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SC_SprUseGoods;
    }

    /** Properties of a SecondaryAttributeData. */
    interface ISecondaryAttributeData {

        /** 属性列表 */
        attrList?: (number[]|null);
    }

    /** 二级属性数据 */
    class SecondaryAttributeData implements ISecondaryAttributeData {

        /**
         * Constructs a new SecondaryAttributeData.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISecondaryAttributeData);

        /** 属性列表 */
        public attrList: number[];

        /**
         * Encodes the specified SecondaryAttributeData message. Does not implicitly {@link SecondaryAttributeData.verify|verify} messages.
         * @param message SecondaryAttributeData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISecondaryAttributeData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SecondaryAttributeData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SecondaryAttributeData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SecondaryAttributeData;
    }

    /** Properties of a TotemNetItem. */
    interface ITotemNetItem {

        /** 当前的图腾ID */
        ToTemID?: (number|null);

        /** 当前的图腾状态（1可激活， 2已激活） */
        ToTemStute?: (number|null);

        /** 日志中可能会用到 */
        sOpenTime?: (string|null);
    }

    /** 玩家已经开启的图腾单个数据定义 */
    class TotemNetItem implements ITotemNetItem {

        /**
         * Constructs a new TotemNetItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: ITotemNetItem);

        /** 当前的图腾ID */
        public ToTemID: number;

        /** 当前的图腾状态（1可激活， 2已激活） */
        public ToTemStute: number;

        /** 日志中可能会用到 */
        public sOpenTime: string;

        /**
         * Encodes the specified TotemNetItem message. Does not implicitly {@link TotemNetItem.verify|verify} messages.
         * @param message TotemNetItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ITotemNetItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TotemNetItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TotemNetItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TotemNetItem;
    }

    /** Properties of a BangHuiDetailData. */
    interface IBangHuiDetailData {

        /** 帮派的ID */
        BHID?: (number|null);

        /** 帮派的名称 */
        BHName?: (string|null);

        /** 区ID */
        ZoneID?: (number|null);

        /** 首领的ID */
        BZRoleID?: (number|null);

        /** 首领的名称 */
        BZRoleName?: (string|null);

        /** 首领的职业 */
        BZOccupation?: (number|null);

        /** 帮成员总的个数 */
        TotalNum?: (number|null);

        /** 帮成员总的级别 */
        TotalLevel?: (number|null);

        /** 帮会公告 */
        BHBulletin?: (string|null);

        /** 建立时间 */
        BuildTime?: (string|null);

        /** 战旗名称 */
        QiName?: (string|null);

        /** 帮成员总的级别 */
        QiLevel?: (number|null);

        /** 管理成员列表 */
        MgrItemList?: (IBangHuiMgrItemData[]|null);

        /** 是否验证 */
        IsVerify?: (number|null);

        /** 帮会资金 */
        TotalMoney?: (number|null);

        /** 玩家今日获得帮贡值 */
        TodayZhanGongForGold?: (number|null);

        /** 玩家今日获得帮贡值 */
        TodayZhanGongForDiamond?: (number|null);

        /** 祭坛 */
        JiTan?: (number|null);

        /** 军械 */
        JunXie?: (number|null);

        /** 光环 */
        GuangHuan?: (number|null);

        /** 剩余允许改名次数 */
        CanModNameTimes?: (number|null);

        /** 帮会宣言 */
        BHXuanyan?: (string|null);

        /** 帮会等级 */
        bhLevel?: (number|null);

        /** 帮会成员总战斗力 */
        TotalCombatForce?: (number|null);

        /** 帮会buff */
        sBHBuff?: (string|null);
    }

    /** 帮会详细数据 */
    class BangHuiDetailData implements IBangHuiDetailData {

        /**
         * Constructs a new BangHuiDetailData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IBangHuiDetailData);

        /** 帮派的ID */
        public BHID: number;

        /** 帮派的名称 */
        public BHName: string;

        /** 区ID */
        public ZoneID: number;

        /** 首领的ID */
        public BZRoleID: number;

        /** 首领的名称 */
        public BZRoleName: string;

        /** 首领的职业 */
        public BZOccupation: number;

        /** 帮成员总的个数 */
        public TotalNum: number;

        /** 帮成员总的级别 */
        public TotalLevel: number;

        /** 帮会公告 */
        public BHBulletin: string;

        /** 建立时间 */
        public BuildTime: string;

        /** 战旗名称 */
        public QiName: string;

        /** 帮成员总的级别 */
        public QiLevel: number;

        /** 管理成员列表 */
        public MgrItemList: IBangHuiMgrItemData[];

        /** 是否验证 */
        public IsVerify: number;

        /** 帮会资金 */
        public TotalMoney: number;

        /** 玩家今日获得帮贡值 */
        public TodayZhanGongForGold: number;

        /** 玩家今日获得帮贡值 */
        public TodayZhanGongForDiamond: number;

        /** 祭坛 */
        public JiTan: number;

        /** 军械 */
        public JunXie: number;

        /** 光环 */
        public GuangHuan: number;

        /** 剩余允许改名次数 */
        public CanModNameTimes: number;

        /** 帮会宣言 */
        public BHXuanyan: string;

        /** 帮会等级 */
        public bhLevel: number;

        /** 帮会成员总战斗力 */
        public TotalCombatForce: number;

        /** 帮会buff */
        public sBHBuff: string;

        /**
         * Encodes the specified BangHuiDetailData message. Does not implicitly {@link BangHuiDetailData.verify|verify} messages.
         * @param message BangHuiDetailData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IBangHuiDetailData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BangHuiDetailData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BangHuiDetailData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BangHuiDetailData;
    }

    /** Properties of a BangHuiMgrItemData. */
    interface IBangHuiMgrItemData {

        /** 区ID */
        ZoneID?: (number|null);

        /** 角色的ID */
        RoleID?: (number|null);

        /** 角色的名称 */
        RoleName?: (string|null);

        /** 角色的职业 */
        Occupation?: (number|null);

        /** 帮中职务 */
        BHZhiwu?: (number|null);

        /** 帮中称号 */
        ChengHao?: (string|null);

        /** 帮会公告 */
        BangGong?: (number|null);

        /** 角色的级别 */
        Level?: (number|null);

        /** 角色的重生级别 */
        CLevel?: (number|null);

        /** 角色的战斗力 */
        CombatForce?: (number|null);

        /** 角色的登出时间 */
        LogoutTime?: (number|Long|null);

        /** 帮会资金贡献(每周的) */
        weekBhMoney?: (number|null);

        /** 位置信息(mapID:x:y:z) */
        sPosition?: (string|null);
    }

    /** 帮会管理成员数据 */
    class BangHuiMgrItemData implements IBangHuiMgrItemData {

        /**
         * Constructs a new BangHuiMgrItemData.
         * @param [properties] Properties to set
         */
        constructor(properties?: IBangHuiMgrItemData);

        /** 区ID */
        public ZoneID: number;

        /** 角色的ID */
        public RoleID: number;

        /** 角色的名称 */
        public RoleName: string;

        /** 角色的职业 */
        public Occupation: number;

        /** 帮中职务 */
        public BHZhiwu: number;

        /** 帮中称号 */
        public ChengHao: string;

        /** 帮会公告 */
        public BangGong: number;

        /** 角色的级别 */
        public Level: number;

        /** 角色的重生级别 */
        public CLevel: number;

        /** 角色的战斗力 */
        public CombatForce: number;

        /** 角色的登出时间 */
        public LogoutTime: (number|Long);

        /** 帮会资金贡献(每周的) */
        public weekBhMoney: number;

        /** 位置信息(mapID:x:y:z) */
        public sPosition: string;

        /**
         * Encodes the specified BangHuiMgrItemData message. Does not implicitly {@link BangHuiMgrItemData.verify|verify} messages.
         * @param message BangHuiMgrItemData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IBangHuiMgrItemData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BangHuiMgrItemData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BangHuiMgrItemData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BangHuiMgrItemData;
    }

    /** Properties of a BusinessDuiHuan. */
    interface IBusinessDuiHuan {

        /** 商人兑换数据字典 */
        Dict?: ({ [k: string]: number }|null);
    }

    /** 商人兑换数据 */
    class BusinessDuiHuan implements IBusinessDuiHuan {

        /**
         * Constructs a new BusinessDuiHuan.
         * @param [properties] Properties to set
         */
        constructor(properties?: IBusinessDuiHuan);

        /** 商人兑换数据字典 */
        public Dict: { [k: string]: number };

        /**
         * Encodes the specified BusinessDuiHuan message. Does not implicitly {@link BusinessDuiHuan.verify|verify} messages.
         * @param message BusinessDuiHuan message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IBusinessDuiHuan, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BusinessDuiHuan message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BusinessDuiHuan
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BusinessDuiHuan;
    }

    /** Properties of a CS_QueryFuBen. */
    interface ICS_QueryFuBen {

        /** CS_QueryFuBen RoleId */
        RoleId?: (number|null);

        /** CS_QueryFuBen MapId */
        MapId?: (number|null);

        /** CS_QueryFuBen FuBenId */
        FuBenId?: (number|null);
    }

    /** 装备副本请求数据 */
    class CS_QueryFuBen implements ICS_QueryFuBen {

        /**
         * Constructs a new CS_QueryFuBen.
         * @param [properties] Properties to set
         */
        constructor(properties?: ICS_QueryFuBen);

        /** CS_QueryFuBen RoleId. */
        public RoleId: number;

        /** CS_QueryFuBen MapId. */
        public MapId: number;

        /** CS_QueryFuBen FuBenId. */
        public FuBenId: number;

        /**
         * Encodes the specified CS_QueryFuBen message. Does not implicitly {@link CS_QueryFuBen.verify|verify} messages.
         * @param message CS_QueryFuBen message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ICS_QueryFuBen, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CS_QueryFuBen message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CS_QueryFuBen
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CS_QueryFuBen;
    }
}
