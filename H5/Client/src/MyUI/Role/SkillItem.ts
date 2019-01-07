namespace MyUI {
    /**
     * 技能Item项
     */
    export class SkillItem extends ui.PlayerBag.SkillItemUI {
        private m_voSkill: tables.MagicInfoVO; // 技能VO
        private m_dtSkill: NetMsg.ISkillData; // 技能Data

        constructor() {
            super();
            this.clearUI();
        }

        public destroy(destroyChild?: boolean) {
            super.destroy(destroyChild);
            this.m_voSkill = null;
            this.m_dtSkill = null;
        }

        /**
         * 清空显示
         */
        public clearUI() {
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
        public get skillID(): number { return this.m_voSkill ? this.m_voSkill.ID : 0; }
        /** 获取技能DBID */
        public get skillDBID(): number { return this.m_dtSkill ? this.m_dtSkill.DbID : -1; }
        /** 获取技能等级 */
        public get skillLevel(): number { return this.m_dtSkill ? this.m_dtSkill.SkillLevel : 0; }
        /** 获取技能熟练度 */
        public get skillUsedNum(): number { return this.m_dtSkill ? this.m_dtSkill.UsedNum : 0; }

        /** 获取技能VO */
        public get skillVO(): tables.MagicInfoVO { return this.m_voSkill; }
        /** 获取技能Data */
        public get skillData(): NetMsg.ISkillData { return this.m_dtSkill; }

        /**
         * 使用技能ID更新显示
         * @param nSkillID 技能ID
         */
        public updateBySkillID(nSkillID: number) {
            const dtSkill = Global.GetSkillDataByID(nSkillID);
            const voSkill = tableMgr.magicsTable.Find(nSkillID);
            this.updateUI(voSkill, dtSkill);
        }

        /**
         * 使用技能Data更新显示
         * @param dtSkill 技能Data
         */
        public updateBySkillData(dtSkill: NetMsg.ISkillData) {
            const voSkill = tableMgr.magicsTable.Find(dtSkill.SkillID);
            this.updateUI(voSkill, dtSkill);
        }

        /**
         * 更新界面显示
         * @param voSkill 
         * @param dtSkill 
         */
        public updateUI(voSkill: tables.MagicInfoVO, dtSkill: NetMsg.ISkillData) {
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
            } else {
                const nLv = Global.getSkillAddPoin(voSkill.ID);
                if (nLv !== 0) sInfo = `${dtSkill.SkillLevel}+${nLv}\n` + sInfo;
                else sInfo = `${dtSkill.SkillLevel}\n` + sInfo;
                this._imgLock.visible = false;
            }
            this._txtInfo.text = sInfo;
        }

        /**
         * 只显示等级
         */
        public showOnlyLevel() {
            let nSkillLv = this.skillLevel;
            if (nSkillLv <= 0) nSkillLv = 1;
            const nAddLv = Global.getSkillAddPoin(this.skillID);
            if (nAddLv !== 0) {
                this._txtInfo.text = `\nLv.${nSkillLv}+${nAddLv}`;
            } else {
                this._txtInfo.text = `\nLv.${nSkillLv}`;
            }
        }

        /**
         * 隐藏文本信息
         */
        public hideTxtInfo() {
            this._txtInfo.text = "";
        }

        /** 小红点是否显示 */
        public get redMarkVisibility(): boolean { return this._redMark.visible; }
        public set redMarkVisibility(value: boolean) {
            this._redMark.visible = value;
            if (value) this._redMark.play();
            else this._redMark.stop();
        }

        /** 选中图片是否显示 */
        public get selectImgVisibility(): boolean { return this._imgSelect.visible; }
        public set selectImgVisibility(value: boolean) {
            if (this._imgSelect.visible !== value) this._imgSelect.visible = value;
        }

        /** 勾选图片是否显示 */
        public get checkImgVisibility(): boolean { return this._imgCheck.visible; }
        public set checkImgVisibility(value: boolean) {
            if (this._imgCheck.visible !== value) this._imgCheck.visible = value;
        }

        /** 锁图片是否显示 */
        public get lockImgVisibility(): boolean { return this._imgLock.visible; }
        public set lockImgVisibility(value: boolean) {
            if (this._imgLock.visible !== value) this._imgLock.visible = value;
        }
    }
}