/** UI通知函数 */
interface EventHandler {
    (sender: Object, args: EventArgs): void;
}

/** UI执行结果通知函数 */
interface DPSelectedItemEventHandler {
    (sender: Object, args: DPSelectedItemEventArgs): void;
}

/** UI执行结果通知函数（有返回结果） */
interface DPSelectedItemBoolEventHandler {
    (sender: Object, args: DPSelectedItemEventArgs): boolean;
}

/**
 * 事件参数类
 */
class EventArgs {
    public static readonly Empty: EventArgs = null;
}

/**
 * 事件处理传输参数类
 */
class DPSelectedItemEventArgs extends EventArgs {
    public static readonly Empty: DPSelectedItemEventArgs = null;
    public ID: number;
    public IDType: number;
    public ShowFlagUpdate: boolean;
    public Tag: Object;
    public Data: Object;
    public Index: number;
    public MagicType: number;
    public EquipIDs: number[];
    public Flag: number;
    public FilterType: number;
    public ZhuZhuangBei: NetMsg.IGoodsData;
    public FuZhuangBei: NetMsg.IGoodsData;
    public AutoUseGold: boolean;
    public NextMainTaskID: number;
    public HandleType: number;
    public NeedYuanBao: number;
    public MyID: number;
    public Title: string;
    public Quality: number;
    public Level: number;
    public AllowAutoBuy: boolean;
    public CountdownInfo: string;
    public buyFrom: number;
    public GetThingOpt: number;
    public MyBufferData: NetMsg.IBufferData;
    public Type: number;
    public get ItemCode(): number { return this.IDType; } // IDType的别名
    public set CanUse(value: number) { this.MagicType = value; }
    public get CanUse(): number { return this.MagicType; }
    public IsGouCheck: boolean; // 是否勾选
    public EquipName: string;

    constructor(nIDType?: number, nID?: number) {
        super();
        if (nIDType) this.IDType = nIDType;
        if (nID) this.ID = nID;
    }
}

/**
 * CoolDown项
 */
class CoolDownItem {
    /** ID */
    public ID: number;
    /** 使用时间（毫秒） */
    public StartTicks: number;
    /** 冷却时间（毫秒） */
    public CDTicks: number;
}

/** 显示文本内容 */
class ShowTextItem {
    PicTextColor: number;
    Text: string;
    NumType: number;
    NumVal: number;
    NumVal2: number;
    NumFormat: number;
}

/** 快捷项 */
class QuickKeyItem {
    /** 快捷键类型，0=技能、1=物品 */
    ItemType: number;
    /** 对应的技能（物品）ID */
    ID: number;
}

/** 技能快捷栏页信息 */
class SkillQuickKeyPageInfo {
    /** 技能组合页签名称 */
    sPageName: string;
    /** 技能组合列表 */
    MainQuickKeyItems = new Array<QuickKeyItem>(5);

    /**
     * 该页是否有技能
     */
    public IsHaveSkill(): boolean {
        for (let i = 0; i < this.MainQuickKeyItems.length; i++) {
            if (i !== 1) { // 1是基础攻击
                if (this.MainQuickKeyItems[i]) return true;
            }
        }
        return false;
    }

    /**
     * 该页是否存在指定的技能
     * @param nSkillId 技能ID
     */
    public IsHaveTheSkill(nSkillId: number): boolean {
        for (let i = 0; i < this.MainQuickKeyItems.length; i++) {
            if (this.MainQuickKeyItems[i]) {
                if (this.MainQuickKeyItems[i].ID === nSkillId) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 该页信息拼接成字符串
     */
    public get myString(): string {
        let ret = "";
        for (let i = 0; i < this.MainQuickKeyItems.length; i++) {
            if (!this.MainQuickKeyItems[i]) {
                if (ret.length > 0) ret += "|";
                ret += "-1@0";
            } else {
                if (ret.length > 0) ret += "|";
                ret += Global.String.Format("{0}@{1}", this.MainQuickKeyItems[i].ItemType, this.MainQuickKeyItems[i].ID);
            }
        }
        ret += Global.String.Format("|{0}", this.sPageName);
        return ret;
    }

    public set myString(value: string) {
        const fields = value.split("|");
        const nLen = fields.length;
        if (nLen < 6) { // 兼容旧版本 -- modify by CYW 修改为16(3页，每页5个,最后一个是选中的页签(1,2,3))
            this.sPageName = "";
        } else if ((nLen === 6)) {
            this.sPageName = fields[5];
        } else {
            return;
        }

        for (let i = 0; i < this.MainQuickKeyItems.length; i++) {
            let thisStr = (i < fields.length) ? fields[i] : "";
            if (i === 1) { // 1基础技能索引
                thisStr = this.getOccuBaseSkillQuickKey();
            }
            this.MainQuickKeyItems[i] = Super.ParseQuickKeyItem(thisStr);
        }
    }

    /**
     * 获取职业对应的基础技能
     */
    private getOccuBaseSkillQuickKey(): string {
        if (Global.Data.roleData) {
            const nOccu = Global.CalcOriginalOccupationID(Global.Data.roleData.Occupation);
            switch (nOccu) {
                case EnumOccupation.LongDan: return "0@10000";
                case EnumOccupation.HuaLing: return "0@11000";
                case EnumOccupation.QiaoGong: return "0@12000";
                case EnumOccupation.DouXian: return "0@14000";
            }
        }
        return "0@10000";
    }
}

/** 角色血蓝值参数 */
interface IRoleLifeEventArgs {
    roleID: number;     // 角色ID
    curLifeV: number;  // 当前血值
    curMagicV: number; // 当前蓝值
    maxLifeV: number;  // 最大血值
    maxMagicV: number; // 最大蓝值
}

/**新获得物品数据 */
class NewEquipGoodsInfo {
    goodsDbID: number;           // DbID
    zhanLiUp: number;            // 提升的战力值
}