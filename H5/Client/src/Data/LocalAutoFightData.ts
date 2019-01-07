namespace Data {

    /** 自动战斗相关的配置 */
    export class LocalAutoFightData {
        constructor() {
            this.Fighting = false;
            this.CancelFightingNum = 0;
            this.FightPoint = new Laya.Point(0, 0);
            this.FightStartTicks = 0;
            this.LastCheckBufferTicks = 0;
            this.LastCheckNormalDrugsTicks = 0;
            this.MaxFightSecs = 24 * 60 * 60 * 7;
            this.AutoGetEquips = true;
            this.AutoGetThings = true;
            this.AutoGetMoney = true;
            this.AutoGetDrugs = false;
            this.AutoGoBack = false;
            this.AutoGoBackWhenNoLifeDrugs = false;
            this.AutoGoBackWhenNoMagicDrugs = false;
            this.DontAttackBigBoss = false;
            this.AutoRealive = false;
            this.AutoUseExpCard = true;
            this.AutoUseLifeReserveDrugs = true;
            this.AutoUseMagicReserveDrugs = true;
            this.AutoAntiAttack = true;
            this.AutoOpenLieHuoJianQi = true;
            this.AutoOpenFSHunDun = true;
            this.AutoZhaohuanShenshou = true;
            this.LifeLessThanXDo = false;
            this.MagicLessThanXDo = false;
            this.LifeLessThanX = 60;
            this.MagicLessThanX = 60;
            this.LifeLessThanXAutoUse = 0;
            this.MagicLessThanXAutoUse = 0;
            this.AutoBuyMedicine = true;
        }

        /** 取消自动战斗的次数 */
        public CancelFightingNum: number = 0;

        /** 玩家是否手动开启了挂机模式.注: 这并不代表正在挂机,只是开启了挂机选项,如有些副本不可以挂机,此选项并不会关闭,退出副本后还是可以继续挂机 */
        public Fighting: boolean = false;

        /** 开始挂机时的战斗地点坐标 */
        public FightPoint: Laya.Point;

        /** 开始挂机的时间 */
        public FightStartTicks: number = 0;

        /** 上次检查Buffer消耗的时间 */
        public LastCheckBufferTicks: number = 0;

        /** 上次检查药品消耗的时间 */
        public LastCheckNormalDrugsTicks: number = 0;

        /** 挂机时战斗范围(30米?) */
        public FightRadius: number = 3000;

        /** 挂机时战斗最大时间 */
        public MaxFightSecs: number = 0;

        /** 是否自动拾取装备 */
        public AutoGetEquips: boolean = false;

        /** 是否自动拾取金币 */
        public AutoGetMoney: boolean = false;

        /** 是否自动拾取其他物品 */
        public AutoGetThings: boolean = false;

        /** 是否自动拾取药品 */
        public AutoGetDrugs: boolean = false;

        /** 是否自动回城 */
        public AutoGoBack: boolean = false;

        /** 无补血的药时自动回城 */
        public AutoGoBackWhenNoLifeDrugs: boolean = false;

        /** 无补蓝的药时自动回城 */
        public AutoGoBackWhenNoMagicDrugs: boolean = false;

        /** 是否避开稀有怪和Bosss */
        public DontAttackBigBoss: boolean = false;

        /** 是否自动原地复活 */
        public AutoRealive: boolean = false;

        /** 是否自动补充经验卡 */
        public AutoUseExpCard: boolean = false;

        /** 是否自动补充生命储备 */
        public AutoUseLifeReserveDrugs: boolean = false;

        /** 是否自动补充魔法储备 */
        public AutoUseMagicReserveDrugs: boolean = false;

        /** 被攻击时是否自动反击 */
        public AutoAntiAttack: boolean = false;

        /** 是否自动购买药品 */
        public AutoBuyMedicine: boolean = false;

        /** 是否自动使用烈火剑气 */
        public AutoOpenLieHuoJianQi: boolean = false;

        /** 是否使用法师的护盾 */
        public AutoOpenFSHunDun: boolean = false;

        /** 自动召唤神兽 */
        public AutoZhaohuanShenshou: boolean = false;

        /** 是否选中生命值小于 */
        public LifeLessThanXDo: Boolean = true;

        /** 是否选中魔法值小于 */
        public MagicLessThanXDo: boolean = true;

        /** 生命值小于x时 */
        public LifeLessThanX: Number = 0;

        /** 魔法值小于x时 */
        public MagicLessThanX: Number = 0;

        /** 生命值小于x时，自动使用物品的索引 */
        public LifeLessThanXAutoUse: number = 0;

        /** 魔法值小于x时，自动使用物品的索引 */
        public MagicLessThanXAutoUse: number = 0;

		/**
         * 在超出战斗范围时返回原始战斗点途中，此时玩家所处的位置在战斗范围之外
		 * 一旦玩家回到范围内，将被设置false
         */
        public IsGoingBackOnOutOfRange: Boolean = false;

        /** 是否在线挂机 */
        public IsOnlineGuaJi: Boolean = true;

        /** 领取倍率 */
        public Multi: number = 0;

        /** 挂机时间设置上限 */
        public TimeMax: number = 24;

        /** 剩余未领取经验 */
        public RemainExper: number = 0;

        /** 剩余未领取经验上限 */
        public RemainExperMax: number = 0;

        /** 消耗金币 */
        public GoldUsed: number = 0;

        /** 每小时消耗金币 */
        public GoldPerHour: number = 0;

        /** 拾取设置 */
        public Color_Zi: boolean = true;
        public Color_Lan: boolean = true;
        public Color_Lv: boolean = true;
        public Color_Bai: boolean = true;

        public BaoShi: boolean = true;
        public YuMao: boolean = true;
        public YaoPin: boolean = true;
        public JinBi: boolean = true;
        public MenPiaoCaiLiao: boolean = true;
        public QiTaDaoJu: boolean = true;

        public AutoPickThingFlags: number = -1;

        /**
         * 获取自动挂机的位设置项,自动设置拾取Flags
         */
        public getAutoGetThingsFlag(): number {
            const autoFightData = this;
            let flag = 0;

            if (autoFightData.Color_Zi) {
                flag = LocalAutoFightData.setIntSomeBit(GetThingsIndexes.Color_Zi, flag, true);
            }

            if (autoFightData.Color_Lan) {
                flag = LocalAutoFightData.setIntSomeBit(GetThingsIndexes.Color_Lan, flag, true);
            }

            if (autoFightData.Color_Lv) {
                flag = LocalAutoFightData.setIntSomeBit(GetThingsIndexes.Color_Lv, flag, true);
            }

            if (autoFightData.Color_Bai) {
                flag = LocalAutoFightData.setIntSomeBit(GetThingsIndexes.Color_Bai, flag, true);
            }

            if (autoFightData.BaoShi) {
                flag = LocalAutoFightData.setIntSomeBit(GetThingsIndexes.BaoShi, flag, true);
            }

            if (autoFightData.YuMao) {
                flag = LocalAutoFightData.setIntSomeBit(GetThingsIndexes.YuMao, flag, true);
            }

            if (autoFightData.YaoPin) {
                flag = LocalAutoFightData.setIntSomeBit(GetThingsIndexes.YaoPin, flag, true);
            }

            if (autoFightData.JinBi) {
                flag = LocalAutoFightData.setIntSomeBit(GetThingsIndexes.JinBi, flag, true);
            }

            if (autoFightData.MenPiaoCaiLiao) {
                flag = LocalAutoFightData.setIntSomeBit(GetThingsIndexes.MenPiaoCaiLiao, flag, true);
            }

            if (autoFightData.QiTaDaoJu) {
                flag = LocalAutoFightData.setIntSomeBit(GetThingsIndexes.QiTaDaoJu, flag, true);
            }

            autoFightData.AutoPickThingFlags = flag;

            return flag;
        }

        /**
         * 将整数的某位置为0或1
         * @param mask 整数的某位
         * @param resource 整数
         * @param flag 是否置1，TURE表示置1，FALSE表示置0
         */
        public static setIntSomeBit(mask: number, resource: number, flag: boolean) {
            if (flag) {
                resource |= (0x1 << mask);
            }
            else {
                resource &= ~(0x1 << mask);
            }
            return resource;
        }
    }
}