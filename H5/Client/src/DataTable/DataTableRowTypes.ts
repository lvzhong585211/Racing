namespace tables {
    /************************************************************************************************************
	 * 定义表中行数据模型
	 * 有自定义表对象的表可以把VO放到表对象的文件里面，比如TaskVO可以定义到SystemTasksTable里面
	 * 不需要自定义表对象的可以把VO定义到这里
	 * 注意1：定义对象时属性名字需要与表里的属性名字完全一致
	 * 注意2：表里有些列的属性会配置为空，定义这种属性时要定义成可选属性，即在名字后面加`?`符号
	 * 注意3：定义为number的属性一定要确保表中的数据为数字格式，如GoodsVO中的ItemQuality定义为number，
	 * 		但是表中使用的是字符格式“4”，导致程序运行时出现了内存格式错误（运行正常，死活找不出错误）
	 ************************************************************************************************************/

    /** 随机名字表数据对象，对应name.json */
    export interface RandomNameVO {
        /** 姓 */
        xing: string;
        /** 男名，注意：该配置可为空，因此该属性为可选属性 */
        nan?: string;
        /** 女名，注意：该配置可为空，因此该属性为可选属性 */
        nv?: string;
    }

    /** NPC表对应的NPC模板数据 */
    export interface NPCInfoVO {
        ID: number;
        ResName: string;
        FlyPet: string;
        PicCode?: number;
        YouShou?: string;
        ZuoShou?: string;
        Wing?: string;
        Scale?: number;
        ShaderID?: number;
        GuaJieDian?: string;
        GuaJieTeXiao?: string;
        Function?: string;
        SName?: string;
        MapCode?: number;
        Talk?: string;
        SaleID?: string;
        Display?: number;
        PlaySound?: string;
        Interval?: number;
        TakeSound?: string;
        IsCollide?: boolean;
        CollideCenter?: Laya.Vector3;
        CollideSize?: Laya.Vector3;
        ObstacleX?: number;
        ObstacleY?: number;
        IsSafe?: number;
        FocusHeight?: number;
        FocusDistance?: number;
        FocusRight?: number;
    }

    /**
     * 把json数据转换成NPCInfoVO
     * @param jsonRowData 要转换的json数据 
     */
    export function json2NPCInfoVO(jsonRowData: any): NPCInfoVO {
        const rowRet = jsonRowData as NPCInfoVO;

        // 只需要转换Vector3这种自定义格式的数据即可
        if (jsonRowData.CollideCenter) {
            rowRet.CollideCenter = TableUtils.getVector3(jsonRowData.CollideCenter);
            rowRet.CollideSize = TableUtils.getVector3(jsonRowData.CollideSize);
        }
        return rowRet;
    }

    /**
     * Monsters.xml表的怪物信息
     */
    export interface MonsterVO {
        ID: number;
        PicCode: number;
        ResName: string;
        YouShou: string;
        ZuoShou: string;
        Scale: number;
        ShaderID: number;
        GuaJieDian: string;
        GuaJieTeXiao: string;
        SName: string;
        MapCode: number;
        Talk: string;
        SeedRange: number;
        MonsterType: number;
        XueTiaoType: number[];
        RunSpeed: number;
        WalkSpeed: number;
        Display: number;
        SkillIDs: number[];
        PlaySound: string;
        AttackSound: string;
        HitSound: string;
        DieSound: string;
        ComeAnimation: number;
        DieAnimation: number;
        CollideCenter: Laya.Vector3;
        CollideSize: Laya.Vector3;
        IsCollide: boolean;
    }

    /**
     * 把json数据转换成 MonsterVO
     * @param jsonRowData 要转换的json数据 
     */
    export function json2MonsterInfoVO(jsonRowData: any): MonsterVO {
        const rowRet = jsonRowData as MonsterVO;

        // 只需要转换Vector3这种自定义格式的数据即可
        if (jsonRowData.CollideCenter) {
            rowRet.CollideCenter = TableUtils.getVector3(jsonRowData.CollideCenter);
            rowRet.CollideSize = TableUtils.getVector3(jsonRowData.CollideSize);
        }
        return rowRet;
    }

    /**
     * "Settings.xml" 中Map对应的VO对象
     */
    export class SettingMapVO {
        Code: number;               // 关卡Id
        Name: string;               // 关卡名称
        MapType: number;            // 关卡类型
        PicCode: number = -1;       // 关卡使用的地图Id
        Music: string;
        AutoStart: number;
        ResName: string;
        SliceTerrain: number;
        RealiveType: number;
        loadingImage: number;
        Goods: string;
        MoveType: number;            // 0表示步行1表示游泳
        Logo: number;                // 0不显示logo 1显示
        BeiShu: number;
        AllowRideType: number;
        AllowShowPetType: number;    // 0当前地图不显示宠物 1当前地图显示宠物
    }

    /**
     * 关卡上种植的NPC信息
     */
    export class LevelNpcInfoVO {
        Code: number;        // NPC的ID
        X: number;           // NPC的坐标
        Y: number;          // NPC的坐标
        Dir: number;        // NPC的朝向
    }

    /**
     * 关卡上种植的怪物信息
     */
    export class LevelMonstersInfoVO {
        ID: number;          // 怪物实例的ID
        Code: number;        // 怪物的数据表ID
        X: number;           // 怪物的出生坐标
        Y: number;           // 怪物的出生坐标
    }

    /** 关卡配置相关的结构 */
    namespace LevelConfigInfo {
        /** 设置项 */
        export interface ISettings {
            PKMode: number;      // PK模式
            IsolatedMap: number; // 地图类型，见MapTypes中的定义
        }

        /** 等级限制 */
        export interface ILimits {
            minZhuanSheng?: number;  // 最低重生限制
            minLevel: number;       // 最低等级限制
        }

        /**  */
        export interface ISaleRegion {
            ID: number;
            PosX: number;
            PosY: number;
        }
    }

    /**
     * 关卡的配置信息
     */
    export class LevelConfigInfo {
        ID: number;
        settings: LevelConfigInfo.ISettings;
        saleRegion: LevelConfigInfo.ISaleRegion;

        private _limits: LevelConfigInfo.ILimits;
        set limits(value: LevelConfigInfo.ILimits) {
            if (!("minZhuanSheng" in value)) {
                value["minZhuanSheng"] = 0;
            }
            this._limits = value;
        }

        get limits(): LevelConfigInfo.ILimits {
            return this._limits;
        }
    }

    /** 定义2维坐标点 */
    export interface Point {
        X: number;
        Y: number;
    }

    /** 传送点项 */
    export interface TeleportItem {
        TeleportKey: number;   // 传送点的Key
        TeleportPos: Point;    // 传送点的位置
        ToMapID: number;       // 要调到的地图ID
        ToMapPos: Point;       // 要跳转到的地图地点
        Code: number;          // 传送点特效ID
        Tip: string;           // 传送点去的地图名称
        ToDirection: number;   // 传送到地图后角色的方向
        Radius: number;        // 传送点有效半径
        MoveType: number;      // 移动类型
    }

    /** 地图传送点项 */
    export interface MapTeleports {
        MapID: number;                   // 地图ID
        TeleportsList: TeleportItem[];   // 传送点列表
    }

    /* 数据格式化的测试代码
    let npcTest = new NPCInfoVO();
    npcTest.CollideCenter = new Laya.Vector3(1,2,3);
    let test = JSON.stringify(npcTest);
    console.log(test);
    let npctest1 = JSON.parse(test, (key, value)=>{
        console.log(key+","+value);
        return value;
    }) as NPCInfoVO;
    
    console.log(npctest1);
    */

    /**
     * XiLianType.xml的VO信息
     */
    export interface XiLianTypeVO {
        ID: string;
        Color: string;
        ShuXingNum: string;
        Text: string;
        Multiplying: string;
    }

    /**
     * XiLianShuXing.xml的VO信息
     */
    export interface XiLianShuXingVO {
        ID: string;
        Name: string;
        NeedGoods: string;
        NeedJinBi: string;
        NeedZuanShi: string;
        JinBiMaxLifeV: string;
        JinBiAddAttackInjure: string;
        JinBiDecreaseInjureValue: string;
        JinBiAddAttack: string;
        JinBiAddDefense: string;
        JinBiHitV: string;
        JinBiDodge: string;
        JinBiLifeSteal: string;
        ZuanShiMaxLifeV: string;
        ZuanShiAddAttackInjure: string;
        ZuanShiDecreaseInjureValue: string;
        ZuanShiAddAttack: string;
        ZuanShiAddDefense: string;
        ZuanShiHitV: string;
        ZuanShiDodge: string;
        ZuanShiLifeSteal: string;
        MaxLifeV: string;
        AddAttackInjure: string;
        DecreaseInjureValue: string;
        AddAttack: string;
        AddDefense: string;
        HitV: string;
        Dodge: string;
        LifeSteal: string;
    }

    /**
     * 宠物升级信息VO（PetLevelUp.xml）
     */
    export interface PetLevelUpVO {
        ID: number;
        Level: number;
        NeedExp: number;
    }

    /**
     * 宠物技能升级信息VO（PetSkillLevelup.xml）
     */
    export interface PetSkillLevelupVO {
        Level: number;
        Cost: number;
    }

    /**
     * 功能开启表VO（SystemOpen.xml）
     */
    export interface SystemOpenVO {
        ID: number;
        Order: number;
        Name: string;
        Occupation: number;
        TriggerCondition: number;
        TimeParameters: number;
        ImageOne: string;
        ImageTwo: string;
        Description: string;
        Music: string;
        Cartoon: number;
        TimeParameters2: number;
        PostWizardID: number;
        SpecialOpenType: number;
        IsOpened: boolean;
    }

    /**
     * 时装升级VO（ShiZhuangLevelup.xml）
     */
    export interface ShiZhuangLevelupVO {
        ID: number;
        GoodsID: number;
        Name: string;
        level: number;
        NeedGoods: string;
        ProPerty: string;
        Time: number;
        CanLevlUp: number;
    }

    /**
     * 时装模型资源信息VO（ShiZhuangRes.xml）
     * 注意：该VO对应原来的ShiZhuangResInfo
     */
    export interface ShiZhuangResVO {
        ID: number;
        Name: string;
        GoodsID: number;
        MainOccupation: number;
        TouRes: number;
        XiongRes: number;
        ShouRes: number;
        TuiRes: number;
        XieRes: number;
    }

    /**
     * 等级基础属性VO
     */
    export interface LevelBaseAttrVO {
        Level: number;
        LifeV: number;
        MagicV: number;
        MinDefenseV: number;
        MaxDefenseV: number;
        MinMDefenseV: number;
        MaxMDefenseV: number;
        MinAttackV: number;
        MaxAttackV: number;
        MinMAttackV: number;
        MaxMAttackV: number;
        RecoverLifeV: number;
        RecoverMagicV: number;
        HitV: number;
        Dodge: number;
        PhySkillIncreasePercent: number;
        MagicSkillIncreasePercent: number;
        AttackSpeed: number;
    }

    /**
     * 职业基础属性VO（Roles/[0-4].xml）
     */
    export interface OccupationBaseAttrVO {
        occuID: number;
        levelBaseAttrList: LevelBaseAttrVO[];
    }

    /**
     * 强化表（QiangHua.xml）
     */
    export interface QiangHuaVO {
        ID: number;
        QiangHua: string;
    }

    /**
     * 技能表（Magics.xml）
     */
    export class MagicInfoVO {
        ID: number;
        NextMagicID: number;
        ParentMagicID: number;
        SkillType: number;
        Queue: number;
        InjureType: number;
        SkillAction: string;
        ToOcuupation: number;
        Name: string;
        LearnCondition: string;
        LearnTask: string;
        HasDirection: number;
        DamageType: number;
        Bangding: number;
        MagicsBook: number;
        UseType: number;
        FanWeiDescription: string;
        Description: string;
        /** 冷却时间（秒） */
        CDTime: number;
        /** 公共冷却时间（毫秒） */
        PubCDTime: number;
        AttackInterval: number;
        BaseMagic: number;
        AttackDistance: string;
        ManyTimeDmage: string;
        MagicIcon: number;
        AutoStart: number;
        MagicColor: number;
        ActionType: number;
        MagicCode: string;
        MusicWeapon: string;
        MusicNoWeapon: string;
        ActionIndex: number;
        MoveType: number;
        FirstMagicAttackID: number;
        preWeakMagicId: number;

        public get FirstMagicAttackData(): MagicAttackInfoVO {
            return tableMgr.magicAttacksTable.Find(this.FirstMagicAttackID);
        }
    }

    /**
     * 技能升级表（MagicLevels.xml）
     */
    export interface MagicLevelVO {
        MagicID: number;
        Level: number;
        NeedZhuanSheng: number;
        NeedRoleLevel: number;
        ShuLianDu: number;
        NeedJinBi: number;
        DescriptionParams: string[];
    }

    /**
     * 技能攻击信息表（MagicAttacks.xml）
     */
    export interface MagicAttackInfoVO {
        ID: number; // 招式ID
        MagicAttackType: number; // 招式类型 单攻 还是 群攻 等  EMagicType
        MagicScanType: string; // 检测类型 //="FRONT_SECTOR(120)"        
        TargetPos: number; // 目标位置类型 EAttackTargetPos
        TargetType: number; // 目标类型 EMagicTargetType
        MagicScripts: string; // 技能公式
        MaxNum: number; // 该招式的目标的最大个数
        DecorationList: number[]; // 原 magicCode
        DelayDecorationList: number[]; // 持续特效
        DelayDecorationTime: number; // 施加在目标上的持续性特效的持续时长 原 magicTime
        DelayDecoToMap: number; // 延迟特效的播放类型。0，播放到受击对象身上；1，按目标点播放到地图上
        FlyDecoration: number;
        FlyTarget: number;
        FlySpeed: number;
        TargetDecorationList: number[];
        TargetPlayingType: number; // 命中特效的播放类型。0，按目标点播放到地图上；1，播放到受击对象身上
    }

    /**
     * 升级信息VO
     */
    export interface LevelUpVO {
        Level: number; // 等级
        ChangeLifeList: number[]; // 重生级别列表
    }

    /**
     * 特效信息VO（Decorations.xml）
     */
    export interface DecorationVO {
        Code: number;
        ResName: string;
        Sound: string;
        HangPos: number;
        DelayTime: number;
        HangBone: string; // 绑定的骨骼名称，仅当 HangPos = 1 时有效
    }
	/**
	 * 活动副本VO (AdventureGifts.xml)
	 */
    export interface AdventureGiftsVO {
        Id: number;				// 活动代码里定义Id 
        Name: string;			// 活动名称
        GiftsId: string;			// 产出
        FuBenType1: string;		// 活动类型1
        FuBenType2: string;		// 活动类型2
        TimeLimitType: number;	// 期限类型(可能没用)
    }
    /**
     * 副本TabVO (FuBenTab.xml)
     */
    export interface FuBenTabVO {
        TabId: number;               // tabID
        FuBenType: number;       // 副本类型
        Name: string;                    // 名称
        Preview: number;
        RewardExplain: string;
        CopyGrade: number;          // 副本阶数
    }
	/**
     * 功能开启提示VO (FunOpenTiShi.xml)
     */
    export interface FunOpenTiShiVO {
        Id: number;
        Openstate: number;
        Type: number;
        FOpenId: string;
        Order: number;
        Name: number;
        FIconId: string;
        Pic: string;
        Pic2: string;
        Rewar: string;
        RewarTwo: string;
        DescId: number;
    }
    /**
     * 贵族VO (GuiZu.xml)
     */
    export interface GuiZuVO {
        VipLevel: number;               // Vip等级
        LiBaoAward: string;            // Vip奖励
        NeedExp: number;              // 需要的充值经验
        DestributInfo: number;       // Vip等级权限描述
    }
    /**
     * 贵族特权VO (VipDailyAwards.xml)
     */
    export interface VipDailyAwardsVO {
        AwardId: number;              // 特权ID
        emark: string;                     // 特权名称
        ViPlev: number;                 // 需求Vip等级
    }

    /**
     * 在线奖励VO（LoongNewRoleGift.xml）
     */
    export interface OnlineRewardItemVO {
        ID: number;          // 奖励ID
        TimeSecs: number;    // 在线时间（分钟）
        ShowGoods: number[]; // 奖励道具展示
    }
    /**
     * 7日活动VO (SevenDayLogin.xml)
     */
    export interface SevenDayLoginVO {
        Id: number;                     // 每日ID
        ActTypeId: number;                // 活动类型Id
        GoodsOne: string;                 // 每日奖励1
        GoodsTwo: string;                 // 每日奖励2
    }

    /**
     * 等级奖励VO（UpLevelGift.xml）
     */
    export interface GradeRewardItemVO {
        ID: number;
        Occupation: number;
        ToZhuanSheng: number;
        ToLevel: number;
        GoodsIDs: string;
        BindMoney: number;
        MoJing: number;
    }

    /**
     * 冥想经验表（MingXiang.xml）
     */
    export interface MingXiangVO {
        ID: number;
        MinZhuanSheng: number;
        MinLevel: number;
        MaxZhuanSheng: number;
        MaxLevel: number;
        Experience: number;
        Xinghun: number;
    }
    /**
     * 首充表（MingXiang.xml）
     */
    export interface FirstChargeVO {
        Id: number;
        GoodsOne: string;
    }

    /**
     * 功能操作表（SystemOperations.xml）
     */
    export interface SystemOperationVO {
        ID: number;
        Title: string;
        MinZhuanSheng: number;
        MinLevel: number;
        MaxZhuanSheng: number;
        MaxLevel: number;
        SexCondition: number;
        OccupCondition: number;
        FilterID: number;
        Icon: string;
    }

    /**
     * NPC执行脚本表（NPCScripts.xml）
     */
    export interface NPCScriptVO {
        ID: number;
        Title: string;
        ExecMagic: string;
        MinZhuanSheng: number;
        MinLevel: number;
        MaxZhuanSheng: number;
        MaxLevel: number;
        SexCondition: number;
        OccupCondition: number;
        FilterID: number;
    }

    /**
     * NPC商店表（NPCSaleList.xml）
     */
    export interface NPCSaleListVO {
        ID: number;
        SaleType: number;
        Description: string;
        Items: string;
    }
    /** 
     * 每日充值表 (DayChongZhi.xml)
     */
    export interface DayChongZhiVO {
        Id: number;        // id
        MinYuanBao: number;       // 达成条件
        GoodsIDs: string;       // 奖励
    }
    /** 
     * 累计充值表 (LeiJiChongZhi.xml)
     */
    export interface LeiJiChongZhiVO {
        Id: number;        // id
        ShowMinYuanBao;     // 显示最小值
        MinYuanBao: number;       // 达成条件
        GoodsOne: string;       // 奖励
        GoodsTwo: string;       // 奖励2
    }
    /** 
     * 累计消耗表 (LeiJiXiaoFei.xml)
     */
    export interface LeiJiXiaoFeiVO {
        Id: number;        // id
        ShowMinYuanBao;     // 显示最小值
        MinYuanBao: number;       // 达成条件
        GoodsOne: string;       // 奖励1
        GoodsTwo: string;       // 奖励2
    }
    /** 
         * 图腾数据位置表 (DragonTotem.xml)
         */
    export interface DragonTotemVO {
        ID: number;
        TotemType: number;
        Title: number;
        Title1: number;
        Describle: number;
        Icon: number;
        TriggerCondition: number;
        Parameters: string;
        params_key: number;
        params_value: string;
        params_value_describle: number;
        autoActive: number;
        visibility: number;
    }
    /** 
        *  图腾标签数据表 (DragonTotemType.xml)
        */
    export interface DragonTotemTypeVO {
        ID: number;
        Title: number;
        Type: number;
    }
    /** 
        * 累计消耗表 (TotemMagic.xml)
        */
    export interface TotemMagicVO {
        ID: number;
        Name: number;
        Icon: number;
        Describle: number;
        Key: number;
        Value: string;
    }
    /** 
    * 商人兑换商品表 (DuiHuanItems.xml)
    */
    export interface DuiHuanItemsVO {
        ID: number;
        DuiHuanType: number;
        Name: string;
        NewGoods: string;
        MoJing: number;
        QiFuJiFen: number;
        PetJiFen: number;
        ZhanGong: number;
        NeedZhanMengLevel: number;
        RongYao: number;
        TreasureJiFen: number;
        TreasureXueZuan: number;
        ZhengBaDianShu: number;
        DayDuiHuanNum: number;
    }
    /** 
   * 商人商品类型 (DuiHuanType.xml)
   */
    export interface DuiHuanTypeVO {
        ID: number;
        SaleType: number;
        Name: string;
        Description: number;
        Image: number;
        OccupCondition: number;

    }
    /**
     * 副本VO(FuBen.xml)
     */
    export interface FuBenVO {
        ID: number;
        TabID: number;
        CopyName: string;
        FuBenUse: number;
        UpCopyID: number;
        DownCopyID: number;

        MapCode: number;
        KillAll: number;
        FuBenLevel: number;
        MinZhuanSheng: number;
        MinLevel: number;
        MaxZhuanSheng: number;
        MaxLevel: number;
        Display: number;

        CopyType: number;
        EnterNumber: number;
        FinishNumber: number;
        WeekEnterNumber: number;
        Reward: number;
        NeedYuanBao: number;

        RewardGoods: string;
        ZhanLi: number;
        Preview2: number;
        BossID: number;
        BossGoodsList: number;
        MonsterTotalNum: number;
        Remind: number;

    }
    /**
     * 副本地图表(FuBenMap.xml)
     */
    export interface FuBenMapVO {
        MapCode: number;
        CopyID: number;
        MaxTime: number;
        MinSaoDangTime: number;
        Moneyaward: number;
        Experienceaward: number;
        GoodsIDs: string;
        FirstGold: number;
        FirstExp: number;
        FirstXingHun: number;
        FirstGoodsID: string;

    }
    /**
     * 怪物掉落表(MonsterGoodsList.xml)
     */
    export interface MonsterGoodsListVO {
        ID: number;
        MaxList: number;
        GoodsID: string;

    }
}