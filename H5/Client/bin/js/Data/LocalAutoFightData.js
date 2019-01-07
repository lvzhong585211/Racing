var Data;
(function (Data) {
    /** 自动战斗相关的配置 */
    class LocalAutoFightData {
        constructor() {
            /** 取消自动战斗的次数 */
            this.CancelFightingNum = 0;
            /** 玩家是否手动开启了挂机模式.注: 这并不代表正在挂机,只是开启了挂机选项,如有些副本不可以挂机,此选项并不会关闭,退出副本后还是可以继续挂机 */
            this.Fighting = false;
            /** 开始挂机的时间 */
            this.FightStartTicks = 0;
            /** 上次检查Buffer消耗的时间 */
            this.LastCheckBufferTicks = 0;
            /** 上次检查药品消耗的时间 */
            this.LastCheckNormalDrugsTicks = 0;
            /** 挂机时战斗范围(30米?) */
            this.FightRadius = 3000;
            /** 挂机时战斗最大时间 */
            this.MaxFightSecs = 0;
            /** 是否自动拾取装备 */
            this.AutoGetEquips = false;
            /** 是否自动拾取金币 */
            this.AutoGetMoney = false;
            /** 是否自动拾取其他物品 */
            this.AutoGetThings = false;
            /** 是否自动拾取药品 */
            this.AutoGetDrugs = false;
            /** 是否自动回城 */
            this.AutoGoBack = false;
            /** 无补血的药时自动回城 */
            this.AutoGoBackWhenNoLifeDrugs = false;
            /** 无补蓝的药时自动回城 */
            this.AutoGoBackWhenNoMagicDrugs = false;
            /** 是否避开稀有怪和Bosss */
            this.DontAttackBigBoss = false;
            /** 是否自动原地复活 */
            this.AutoRealive = false;
            /** 是否自动补充经验卡 */
            this.AutoUseExpCard = false;
            /** 是否自动补充生命储备 */
            this.AutoUseLifeReserveDrugs = false;
            /** 是否自动补充魔法储备 */
            this.AutoUseMagicReserveDrugs = false;
            /** 被攻击时是否自动反击 */
            this.AutoAntiAttack = false;
            /** 是否自动购买药品 */
            this.AutoBuyMedicine = false;
            /** 是否自动使用烈火剑气 */
            this.AutoOpenLieHuoJianQi = false;
            /** 是否使用法师的护盾 */
            this.AutoOpenFSHunDun = false;
            /** 自动召唤神兽 */
            this.AutoZhaohuanShenshou = false;
            /** 是否选中生命值小于 */
            this.LifeLessThanXDo = true;
            /** 是否选中魔法值小于 */
            this.MagicLessThanXDo = true;
            /** 生命值小于x时 */
            this.LifeLessThanX = 0;
            /** 魔法值小于x时 */
            this.MagicLessThanX = 0;
            /** 生命值小于x时，自动使用物品的索引 */
            this.LifeLessThanXAutoUse = 0;
            /** 魔法值小于x时，自动使用物品的索引 */
            this.MagicLessThanXAutoUse = 0;
            /**
             * 在超出战斗范围时返回原始战斗点途中，此时玩家所处的位置在战斗范围之外
             * 一旦玩家回到范围内，将被设置false
             */
            this.IsGoingBackOnOutOfRange = false;
            /** 是否在线挂机 */
            this.IsOnlineGuaJi = true;
            /** 领取倍率 */
            this.Multi = 0;
            /** 挂机时间设置上限 */
            this.TimeMax = 24;
            /** 剩余未领取经验 */
            this.RemainExper = 0;
            /** 剩余未领取经验上限 */
            this.RemainExperMax = 0;
            /** 消耗金币 */
            this.GoldUsed = 0;
            /** 每小时消耗金币 */
            this.GoldPerHour = 0;
            /** 拾取设置 */
            this.Color_Zi = true;
            this.Color_Lan = true;
            this.Color_Lv = true;
            this.Color_Bai = true;
            this.BaoShi = true;
            this.YuMao = true;
            this.YaoPin = true;
            this.JinBi = true;
            this.MenPiaoCaiLiao = true;
            this.QiTaDaoJu = true;
            this.AutoPickThingFlags = -1;
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
        /**
         * 获取自动挂机的位设置项,自动设置拾取Flags
         */
        getAutoGetThingsFlag() {
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
        static setIntSomeBit(mask, resource, flag) {
            if (flag) {
                resource |= (0x1 << mask);
            }
            else {
                resource &= ~(0x1 << mask);
            }
            return resource;
        }
    }
    Data.LocalAutoFightData = LocalAutoFightData;
})(Data || (Data = {}));
//# sourceMappingURL=LocalAutoFightData.js.map