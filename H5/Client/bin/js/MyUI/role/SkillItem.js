var MyUI;
(function (MyUI) {
    /**
     * 技能Item项
     */
    class SkillItem extends ui.PlayerBag.SkillItemUI {
        constructor() {
            super();
            this.clearUI();
        }
        destroy(destroyChild) {
            super.destroy(destroyChild);
            this.m_voSkill = null;
            this.m_dtSkill = null;
        }
        /**
         * 清空显示
         */
        clearUI() {
            this._imgIcon.visible = false;
            this._imgSelect.visible = false;
            this._imgLock.visible = false;
            this._imgCheck.visible = false;
            this._redMark.visible = false;
            this._txtInfo.text = "";
            this.m_voSkill = null;
            this.m_dtSkill = null;
        }
        /** 获取技能ID */
        get skillID() { return this.m_voSkill ? this.m_voSkill.ID : 0; }
        /** 获取技能DBID */
        get skillDBID() { return this.m_dtSkill ? this.m_dtSkill.DbID : -1; }
        /** 获取技能等级 */
        get skillLevel() { return this.m_dtSkill ? this.m_dtSkill.SkillLevel : 0; }
        /** 获取技能熟练度 */
        get skillUsedNum() { return this.m_dtSkill ? this.m_dtSkill.UsedNum : 0; }
        /** 获取技能VO */
        get skillVO() { return this.m_voSkill; }
        /** 获取技能Data */
        get skillData() { return this.m_dtSkill; }
        /**
         * 使用技能ID更新显示
         * @param nSkillID 技能ID
         */
        updateBySkillID(nSkillID) {
            const dtSkill = Global.GetSkillDataByID(nSkillID);
            const voSkill = tableMgr.magicsTable.Find(nSkillID);
            this.updateUI(voSkill, dtSkill);
        }
        /**
         * 使用技能Data更新显示
         * @param dtSkill 技能Data
         */
        updateBySkillData(dtSkill) {
            const voSkill = tableMgr.magicsTable.Find(dtSkill.SkillID);
            this.updateUI(voSkill, dtSkill);
        }
        /**
         * 更新界面显示
         * @param voSkill
         * @param dtSkill
         */
        updateUI(voSkill, dtSkill) {
            this.m_voSkill = voSkill;
            this.m_dtSkill = dtSkill;
            if (!voSkill) {
                this.clearUI();
                return;
            }
            this._imgIcon.skin = Global.getSkillIconPath(voSkill.MagicIcon);
            this._imgIcon.visible = true;
            let sInfo = Loca.getLang(voSkill.Name);
            if (!dtSkill) {
                sInfo = "\n" + sInfo;
                this._imgLock.visible = true;
            }
            else {
                const nLv = Global.getSkillAddPoin(voSkill.ID);
                if (nLv !== 0)
                    sInfo = `${dtSkill.SkillLevel}+${nLv}\n` + sInfo;
                else
                    sInfo = `${dtSkill.SkillLevel}\n` + sInfo;
                this._imgLock.visible = false;
            }
            this._txtInfo.text = sInfo;
        }
        /**
         * 只显示等级
         */
        showOnlyLevel() {
            let nSkillLv = this.skillLevel;
            if (nSkillLv <= 0)
                nSkillLv = 1;
            const nAddLv = Global.getSkillAddPoin(this.skillID);
            if (nAddLv !== 0) {
                this._txtInfo.text = `\nLv.${nSkillLv}+${nAddLv}`;
            }
            else {
                this._txtInfo.text = `\nLv.${nSkillLv}`;
            }
        }
        /**
         * 隐藏文本信息
         */
        hideTxtInfo() {
            this._txtInfo.text = "";
        }
        /** 小红点是否显示 */
        get redMarkVisibility() { return this._redMark.visible; }
        set redMarkVisibility(value) {
            this._redMark.visible = value;
            if (value)
                this._redMark.play();
            else
                this._redMark.stop();
        }
        /** 选中图片是否显示 */
        get selectImgVisibility() { return this._imgSelect.visible; }
        set selectImgVisibility(value) {
            if (this._imgSelect.visible !== value)
                this._imgSelect.visible = value;
        }
        /** 勾选图片是否显示 */
        get checkImgVisibility() { return this._imgCheck.visible; }
        set checkImgVisibility(value) {
            if (this._imgCheck.visible !== value)
                this._imgCheck.visible = value;
        }
        /** 锁图片是否显示 */
        get lockImgVisibility() { return this._imgLock.visible; }
        set lockImgVisibility(value) {
            if (this._imgLock.visible !== value)
                this._imgLock.visible = value;
        }
    }
    MyUI.SkillItem = SkillItem;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=SkillItem.js.map