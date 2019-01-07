namespace MyUI.Role {

    /**
     * 角色属性界面
     */
    export class RolePart extends ui.PlayerBag.RolePartUI implements IWindowPart {

        private mAutoOffEventList: Base.MyEventAutoOff[] = []; // 事件列表

        constructor() {
            super();

            // 多语言文本设置
            this._btnPoint.label = ConfigLoca.UI_Role_Title_Button_AddPoint;
            this._btnDetail.label = ConfigLoca.UI_Role_Title_Button_Detail;

            // 初始化时更新一次界面显示
            this._panelHelp.visible = false;
            this.updateUI();

            // 事件监听
            this._groupPrimary.on(Laya.Event.MOUSE_DOWN, this, () => { this._panelHelp.visible = true; });
            this._groupPrimary.on(Laya.Event.MOUSE_UP, this, () => { this._panelHelp.visible = false; });
            this._groupPrimary.on(Laya.Event.MOUSE_OUT, this, () => { this._panelHelp.visible = false; });
            this._btnPoint.clickHandler = Laya.Handler.create(this, () => {
                windowMgr.openWindow(WindowID.AttributePoint);
            }, null, false);
            this._btnDetail.clickHandler = Laya.Handler.create(this, () => {
                Net.sendGetRoleAllRib();
            }, null, false);
            this.mAutoOffEventList.push(gameEventBus.levelChange.on(this, () => {
                this.updateLevelUI();
            }));
            this.mAutoOffEventList.push(gameEventBus.roleAttributeNotify.on(this, () => {
                this.updateBaseAttributeUI();
                this.updateFightAttributeUI();
            }));
        }

        /** @override */
        public destroy(destroyChild?: boolean) {
            this._btnDetail.clickHandler.recover();
            this.mAutoOffEventList.forEach(element => element.off());
            super.destroy(destroyChild);
            this.mAutoOffEventList = null;
        }

        /** @implements */
        public enterPart() {

        }

        /** 更新界面显示 */
        private updateUI() {
            this.updateOccupationUI();
            this.updateLevelUI();
            this.updateFamilyUI();
            this.updateTitleUI();
            this.updateSpouseUI();
            this.updatePKUI();
            this.updateBaseAttributeUI();
            this.updateFightAttributeUI();
        }

        /** 更新职业显示 */
        private updateOccupationUI() {
            const datRole = gameIns.gameState.roleData;
            this._txtOccu.text = Global.getOccupationStr(Global.CalcOriginalOccupationID(datRole.Occupation));
        }

        /** 更新等级显示 */
        private updateLevelUI() {
            const datRole = gameIns.gameState.roleData;
            this._txtLevel.text = UIHelper.FormatLevelLimit(datRole.Level, datRole.ChangeLifeCount);
        }

        /** 更新帮会显示 */
        private updateFamilyUI() {
            const datRole = gameIns.gameState.roleData;
            this._txtFamily.text = Global.String.IsNullOrWhiteSpace(datRole.BHName) ? ConfigLoca.UI_LITERAL_NONE : datRole.BHName;
        }

        /** 更新头衔显示 */
        private updateTitleUI() {
            const ChengJiuLevel = Global.GetChengJiuLevel();
            if (ChengJiuLevel > 0) {
                const ChengJiuGoodsIDArr = tableMgr.sysParamsTable.getParamIntArray("ChengJiuBufferGoodsIDs");
                if (ChengJiuLevel < ChengJiuGoodsIDArr.length) {
                    this._txtTitle.text = tableMgr.goodsTable.getName(ChengJiuGoodsIDArr[ChengJiuLevel - 1]);
                    return;
                }
            }
            this._txtTitle.text = ConfigLoca.UI_LITERAL_NONE;
        }

        /** 更新配偶显示 */
        private updateSpouseUI() {
            const datMarriage = gameIns.gameState.MarriageData;
            if (datMarriage && datMarriage.byMarrytype !== -1) {
                const datSpouse = gameIns.gameState.OtherMarriageData;
                if (datSpouse && !Global.String.IsNullOrWhiteSpace(datSpouse.roleName)) {
                    this._txtSpouse.text = datSpouse.roleName;
                    return;
                }
            }
            this._txtSpouse.text = ConfigLoca.UI_LITERAL_NONE;
        }

        /** 更新PK值显示 */
        private updatePKUI() {
            this._txtPK.text = `${gameIns.gameState.roleData.PKPoint}`;
        }

        /** 更新基础属性显示（力量、智力、敏捷、体力） */
        private updateBaseAttributeUI() {
            this._txtStrength.text = NationHelper.FormatNumber(Global.GetCurrentRoleProp(1, UnitPropIndexes.Strength));
            this._txtIntelligence.text = NationHelper.FormatNumber(Global.GetCurrentRoleProp(1, UnitPropIndexes.Intelligence));
            this._txtDexterity.text = NationHelper.FormatNumber(Global.GetCurrentRoleProp(1, UnitPropIndexes.Dexterity));
            this._txtStamina.text = NationHelper.FormatNumber(Global.GetCurrentRoleProp(1, UnitPropIndexes.Constitution));
        }

        /** 更新战斗属性显示 */
        private updateFightAttributeUI() {
            this._txtMaxHp.text = NationHelper.FormatNumber(Global.GetCurrentRoleProp(2, ExtPropIndexes.MaxLifeV) | 0);
            this._txtPhysicalAttack.text = `${NationHelper.FormatNumber(Global.GetCurrentRoleProp(2, ExtPropIndexes.MinAttack) | 0)}-${NationHelper.FormatNumber(Global.GetCurrentRoleProp(2, ExtPropIndexes.MaxAttack) | 0)}`;
            this._txtMagicAttack.text = `${NationHelper.FormatNumber(Global.GetCurrentRoleProp(2, ExtPropIndexes.MinMAttack) | 0)}-${NationHelper.FormatNumber(Global.GetCurrentRoleProp(2, ExtPropIndexes.MaxMAttack) | 0)}`;
            this._txtPhysicalDefence.text = `${NationHelper.FormatNumber(Global.GetCurrentRoleProp(2, ExtPropIndexes.MinDefense) | 0)}-${NationHelper.FormatNumber(Global.GetCurrentRoleProp(2, ExtPropIndexes.MaxDefense) | 0)}`;
            this._txtMagicDefence.text = `${NationHelper.FormatNumber(Global.GetCurrentRoleProp(2, ExtPropIndexes.MinMDefense) | 0)}-${NationHelper.FormatNumber(Global.GetCurrentRoleProp(2, ExtPropIndexes.MaxMDefense) | 0)}`;
            this._txtHit.text = NationHelper.FormatNumber(Global.GetCurrentRoleProp(2, ExtPropIndexes.HitV) | 0);
            this._txtDodge.text = NationHelper.FormatNumber(Global.GetCurrentRoleProp(2, ExtPropIndexes.Dodge) | 0);
        }
    }
}