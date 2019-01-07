/**
 * 存放和技能相关的全局函数
 */
namespace Global {
    // 技能升级表配置
    const mapMagicLevels = new Map<number, Map<number, tables.MagicLevelVO>>();
    /**
     * 初始化技能升级表
     */
    function initMagicLevelsDic() {
        if (mapMagicLevels.size === 0) {
            const aVOs = tableMgr.magicLevelsTable.AllRows();
            aVOs.forEach(element => {
                let mapSub: Map<number, tables.MagicLevelVO>;
                if (mapMagicLevels.has(element.MagicID)) {
                    mapSub = mapMagicLevels.get(element.MagicID);
                } else {
                    mapSub = new Map<number, tables.MagicLevelVO>();
                    mapMagicLevels.set(element.MagicID, mapSub);
                }
                mapSub.set(element.Level, element);
            });
        }
    }

    /**
     * 获取技能升级信息VO
     * @param magicID 技能ID
     * @param level 技能等级
     */
    export function getMagicLevelVO(magicID: number, level: number) {
        if (mapMagicLevels.size === 0) initMagicLevelsDic();
        if (mapMagicLevels.has(magicID)) {
            const mapSub = mapMagicLevels.get(magicID);
            if (mapSub.has(level)) {
                return mapSub.get(level);
            }
        }
        return null;
    }

    /**
     * 通过职业获得基础技能id
     * @param occupation 职业id
     */
    export function GetBaseSkillID(occupation: number) {
        if (3 === occupation) {
            if (MJSSkillType.Strength_Sword === Global.GetMJSType()) {
                return 10000;
            }
            else {
                return 10100;
            }
        }
        const BaseSkillIDs = [10000, 11000, 12000, 13000, 14000]; // 三个职业的基础攻击技能ID列表
        return BaseSkillIDs[Global.CalcOriginalOccupationID(occupation)];
    }

    /**
     * 根据技能ID获取技能Data
     * @param nSkillID 技能ID
     */
    export function GetSkillDataByID(nSkillID: number): NetMsg.ISkillData {
        if (nSkillID <= 0) return null;
        if (!Global.Data.roleData.SkillDataList) return null;
        const lstData = Global.Data.roleData.SkillDataList;
        return lstData.find(element => element.SkillID === nSkillID);
    }

    /**
     * 获取天赋加点
     * @param nSkillID 技能ID
     */
    export function getSkillAddPoin(nSkillID: number): number {
        let lv = 0;
        if (Data.roleData.MyTalentData) {
            if (Data.roleData.MyTalentData.SkillOneValue[nSkillID]) {
                lv = Data.roleData.MyTalentData.SkillOneValue[nSkillID];
            }
            lv += Data.roleData.MyTalentData.SkillAllValue;
            return lv;
        }
        return lv;
    }

    //#region ======== 技能CoolDown冷却管理 ========

    /** 添加新的Cooldown通知 */
    export let NotifyAddCoolDown: Laya.Handler;

    // 技能CoolDown冷却Map
    const SkillCoolDownDict = new Map<number, CoolDownItem>();

    // 技能挂机间隔配置项（类似像buff类的技能，不用时时进行释放，单独配置一个间隔）
    const AutoFightSkillDownDict = new Map<number, CoolDownItem>();

    // 配置在挂机时，技能的使用间隔 （如增益buff类技能，无需频繁使用，可按照buff时间配置）
    const AutoFightSkillSpecInterval = new Map<number, number>();

    /**
     * 判断技能是否处于冷却状态
     * @param nSkillID 技能ID
     */
    export function SkillCoolDown(nSkillID: number): boolean {
        const coolDownItem = SkillCoolDownDict.get(nSkillID);
        if (!coolDownItem) {
            return false;
        }

        const ticks = TimeManager.getCorrectLocalTime();
        if (ticks > (coolDownItem.StartTicks + coolDownItem.CDTicks)) {
            return false;
        }
        return true;
    }

    export function CheckSpecSkillNeedAutoFightUse(nSkillID: number): boolean {
        //  花灵 悬壶济世 判断当前生命值 占最大生命值 百分比 是否 低于 60%  
        if (nSkillID === 11040) {
            if ((Global.Data.roleData.LifeV / Global.Data.roleData.MaxLifeV) >= 0.6) {
                return false;
            }
        }
        return true;
    }

    export function SkillAutoFightCoolDown(nSkillID: number): boolean {
        const coolDownItem = AutoFightSkillDownDict.get(nSkillID);
        if (!coolDownItem) {
            return false;
        }

        const ticks = TimeManager.getCorrectLocalTime();
        if (ticks > (coolDownItem.StartTicks + coolDownItem.CDTicks)) {
            return false;
        }
        return true;
    }

    /**
     * 获取技能还剩余的冷却时间（毫秒）
     * @param nSkillID 技能ID
     */
    export function GetSkillCoolDownTicks(nSkillID: number): number {
        const coolDownItem = SkillCoolDownDict.get(nSkillID);
        if (!coolDownItem) {
            return 0;
        }

        const ticks = TimeManager.getCorrectLocalTime();
        if (ticks > (coolDownItem.StartTicks + coolDownItem.CDTicks)) {
            return 0;
        }

        const cooldown = (coolDownItem.StartTicks + coolDownItem.CDTicks) - ticks;
        if (cooldown > 3 * coolDownItem.CDTicks) {
            return 0;
        }
        return cooldown;
    }

    /**
     * 	判断技能魔法是否足够
     * @param magicCode 技能id
     */
    export function getSkillNeedMagicOk(magicCode: number): boolean {
        const SkillData = Global.GetSkillDataByID(magicCode);
        if (null == SkillData) {
            return false;
        }
        const magicLevel = SkillData == null ? 1 : SkillData.SkillLevel;
        // TODO:.
        return true;
    }

    /**
     * 消除技能的冷却时间
     * @param nSkillID 技能ID
     */
    export function RemoveSkillCoolDownTicks(nSkillID: number) {
        if (SkillCoolDownDict.has(nSkillID)) {
            SkillCoolDownDict.delete(nSkillID);
        }
        if (NotifyAddCoolDown) {
            NotifyAddCoolDown.runWith([nSkillID, 0]);
        }
    }

    /**
     * 添加cooldown项
     * @param coolDownDict 
     * @param id 
     * @param startTicks 
     * @param cdTicks 
     */
    export function AddCoolDownItem(coolDownDict: Map<number, CoolDownItem>, id: number, startTicks: number, cdTicks: number) {
        let coolDownItem = coolDownDict.get(id);
        if (!coolDownItem) {
            coolDownItem = new CoolDownItem();
            coolDownItem.ID = id;
            coolDownItem.StartTicks = startTicks;
            coolDownItem.CDTicks = cdTicks;
            coolDownDict.set(id, coolDownItem);
        } else {
            if ((startTicks + cdTicks) > (coolDownItem.StartTicks + coolDownItem.CDTicks)) {
                coolDownItem.StartTicks = startTicks;
                coolDownItem.CDTicks = cdTicks;
            }
        }
    }

    export function GetSpecAutoFightSkillInterval(nSkillID: number): number {
        let rtValue = 0;
        if (AutoFightSkillSpecInterval.size === 0) {
            const value = tableMgr.sysParamsTable.getParam("AutoFightSkillSpecInterval");
            const values = value.split("|");
            for (let i = 0; i < values.length; i++) {
                let skillID = 0;
                let interval = 0;
                const curValues = values[i].split(",");
                if (curValues.length === 2) {
                    skillID = parseInt(curValues[0]);
                    interval = parseInt(curValues[1]);
                    if (skillID > 0 && interval > 0) {
                        AutoFightSkillSpecInterval.set(skillID, interval);
                    }
                }
            }
        }
        if (AutoFightSkillSpecInterval.has(nSkillID)) {
            rtValue = AutoFightSkillSpecInterval.get(nSkillID);
        }
        return rtValue;
    }

    /// 物理攻击的序号
    export let AttackNum = 1;

    /**
     * 获得连招的id
     * @param Occupation  职业 
     */
    export function getLianZhaoMagicCode(Occupation: number) {
        if (0 === Global.CalcOriginalOccupationID(Occupation)) {
            return 10000 + AttackNum - 1;
        }
        else if (1 === Global.CalcOriginalOccupationID(Occupation)) {
            return 11000 + AttackNum - 1;
        }
        else if (2 === Global.CalcOriginalOccupationID(Occupation)) {
            return 12000 + AttackNum - 1;
        }
        else if (4 === Global.CalcOriginalOccupationID(Occupation)) {
            return 14000 + AttackNum - 1;
        }
        else {
        }
        return -1;
    }

    /**
     * 添加技能冷却
     * @param nSkillID 
     * @param isDrawTicks 
     */
    export function AddSkillCoolDown(nSkillID: number, isDrawTicks: boolean = true) {
        let skillData = Global.GetSkillDataByID(nSkillID);
        if (!skillData) return;
        const xmlItem = tableMgr.magicsTable.Find(skillData.SkillID);
        if (!xmlItem) return;

        // 技能CD
        const cdTime = xmlItem.CDTime;
        // 当前时间
        const nowTicks = TimeManager.getCorrectLocalTime();
        if (cdTime > 0) {
            const cdItem = new CoolDownItem();
            cdItem.ID = nSkillID;
            cdItem.StartTicks = nowTicks;
            cdItem.CDTicks = cdTime * 1000;
            SkillCoolDownDict.set(nSkillID, cdItem);
            AddCoolDownItem(SkillCoolDownDict, nSkillID, nowTicks, cdTime * 1000);
            const specInterval = GetSpecAutoFightSkillInterval(nSkillID);
            if (specInterval > 0) AddCoolDownItem(AutoFightSkillDownDict, nSkillID, nowTicks, specInterval * 1000);
            // 通知外部
            if (NotifyAddCoolDown) {
                NotifyAddCoolDown.runWith([nSkillID, cdTime * 1000]);
            }
        }

        // 技能公共CD
        const pubCDTime = xmlItem.PubCDTime;
        if (pubCDTime > 0) {
            for (let i = 0; i < Global.Data.roleData.SkillDataList.length; i++) {
                skillData = Global.Data.roleData.SkillDataList[i];
                if (null == skillData || skillData.SkillID === nSkillID) continue;
                const curXmlItem = tableMgr.magicsTable.Find(skillData.SkillID);
                if (!curXmlItem) continue;
                // 有父技能的技能不走公共CD
                if (pubCDTime > 0 && (curXmlItem.ParentMagicID <= 0)) {
                    let coolDownItem = SkillCoolDownDict.get(skillData.SkillID);
                    if (!coolDownItem) {
                        coolDownItem = new CoolDownItem();
                        coolDownItem.ID = skillData.SkillID;
                        coolDownItem.StartTicks = nowTicks;
                        coolDownItem.CDTicks = pubCDTime;
                        SkillCoolDownDict.set(skillData.SkillID, coolDownItem);
                        AddCoolDownItem(SkillCoolDownDict, skillData.SkillID, nowTicks, pubCDTime);
                        // 通知外部
                        if (NotifyAddCoolDown) {
                            NotifyAddCoolDown.runWith([skillData.SkillID, pubCDTime]);
                        }
                    } else {
                        if ((nowTicks + pubCDTime) > (coolDownItem.StartTicks + coolDownItem.CDTicks)) {
                            coolDownItem.StartTicks = nowTicks;
                            coolDownItem.CDTicks = pubCDTime;
                            if (NotifyAddCoolDown) {
                                NotifyAddCoolDown.runWith([skillData.SkillID, pubCDTime]);
                            }
                        }
                    }
                }
            }
        }
    }
    //#endregion ======== 技能CoolDown冷却管理 ========
    /**
     * 添加技能
     * @param skillDbID     数据库ID
     * @param skillID          技能类型ID
     * @param skillLevel     技能类型级别
     */
    export function AddSkillData(skillDbID: number, skillID: number, skillLevel: number) {
        if (null == Global.Data.roleData.SkillDataList) {
            Global.Data.roleData.SkillDataList = [];
        }

        const skillData = new NetMsg.SkillData();
        skillData.DbID = skillDbID;
        skillData.SkillID = skillID;
        skillData.SkillLevel = skillLevel;

        Global.Data.roleData.SkillDataList.push(skillData);
    }

    /**
     * 替换技能描述文本的属性值(因为技能里属性位置是动态的，所以加一个数组来遍历，有{}格式化的符号就按照对应的位来添加属性)
     * @param realStrDesc 描述文本
     * @param descriptionParams 技能属性字符串数组
     */
    export function GetRealDesc(realStrDesc: string, descriptionParams: string[]): string {
        const paramLen = descriptionParams.length;
        for (let i = 0; i < paramLen; i++) {
            const replaceIndex = Global.String.Format("{{0}}", i);
            realStrDesc = realStrDesc.replace(replaceIndex, descriptionParams[i]);
        }
        return realStrDesc;
    }
}