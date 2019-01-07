/**
 * 事件参数类
 */
class EventArgs {
}
EventArgs.Empty = null;
/**
 * 事件处理传输参数类
 */
class DPSelectedItemEventArgs extends EventArgs {
    constructor(nIDType, nID) {
        super();
        if (nIDType)
            this.IDType = nIDType;
        if (nID)
            this.ID = nID;
    }
    get ItemCode() { return this.IDType; } // IDType的别名
    set CanUse(value) { this.MagicType = value; }
    get CanUse() { return this.MagicType; }
}
DPSelectedItemEventArgs.Empty = null;
/**
 * CoolDown项
 */
class CoolDownItem {
}
/** 显示文本内容 */
class ShowTextItem {
}
/** 快捷项 */
class QuickKeyItem {
}
/** 技能快捷栏页信息 */
class SkillQuickKeyPageInfo {
    constructor() {
        /** 技能组合列表 */
        this.MainQuickKeyItems = new Array(5);
    }
    /**
     * 该页是否有技能
     */
    IsHaveSkill() {
        for (let i = 0; i < this.MainQuickKeyItems.length; i++) {
            if (i !== 1) { // 1是基础攻击
                if (this.MainQuickKeyItems[i])
                    return true;
            }
        }
        return false;
    }
    /**
     * 该页是否存在指定的技能
     * @param nSkillId 技能ID
     */
    IsHaveTheSkill(nSkillId) {
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
    get myString() {
        let ret = "";
        for (let i = 0; i < this.MainQuickKeyItems.length; i++) {
            if (!this.MainQuickKeyItems[i]) {
                if (ret.length > 0)
                    ret += "|";
                ret += "-1@0";
            }
            else {
                if (ret.length > 0)
                    ret += "|";
                ret += Global.String.Format("{0}@{1}", this.MainQuickKeyItems[i].ItemType, this.MainQuickKeyItems[i].ID);
            }
        }
        ret += Global.String.Format("|{0}", this.sPageName);
        return ret;
    }
    set myString(value) {
        const fields = value.split("|");
        const nLen = fields.length;
        if (nLen < 6) { // 兼容旧版本 -- modify by CYW 修改为16(3页，每页5个,最后一个是选中的页签(1,2,3))
            this.sPageName = "";
        }
        else if ((nLen === 6)) {
            this.sPageName = fields[5];
        }
        else {
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
    getOccuBaseSkillQuickKey() {
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
/**新获得物品数据 */
class NewEquipGoodsInfo {
}
//# sourceMappingURL=GlobalClass.js.map