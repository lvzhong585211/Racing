var MyUI;
(function (MyUI) {
    var role;
    (function (role) {
        /**
         * 技能界面
         */
        class SkillPart extends ui.PlayerBag.SkillPartUI {
            constructor() {
                super();
                this.m_nCurConfigItemIdx = -1; // 当前配置页正在配置的技能Item索引
            }
            createChildren() {
                super.createChildren();
                this.m_lstSkillItem = [
                    this._skillItem0, this._skillItem1, this._skillItem2,
                    this._skillItem3, this._skillItem4, this._skillItem5,
                    this._skillItem6, this._skillItem7, this._skillItem8
                ];
                this.m_lstConfigItem = [
                    this._configItem0, this._configItem1, this._configItem2, this._configItem3, this._configItem4
                ];
                this.m_lstPageButton = [
                    this._btnPage0, this._btnPage1, this._btnPage2
                ];
                this._groupConfig.visible = false;
                // 文本及样式设置
                this._txtTitleLevel.text = Loca.getLang("11541"); // 所需等级
                this._txtTitleConsume.text = Loca.getLang("11960"); // 消耗
                this._btnOneKeyUp.label = Loca.getLang("11118"); // 一键升级
                this._btnUpgrade.label = Loca.getLang("25"); // 升级
                this._txtConfigDesc.text = Loca.getLang("11132"); // 提示：1...，2...
                this._inputCfgName.text = Loca.getLang("11592"); // 请输入技能配置名称
                this._btnRename.label = Loca.getLang("12832"); // 命名
                MyUI.prepareCSSStyle(this._txtMPConsume.style);
                MyUI.prepareCSSStyle(this._txtCooldown.style);
                MyUI.prepareCSSStyle(this._txtReleaseScope.style);
                MyUI.prepareCSSStyle(this._txtSkillDesc.style);
                this._txtSkillDesc.style.lineHeight = 18;
                // 技能Item项事件注册
                this.m_lstSkillItem.forEach(element => element.on(Laya.Event.CLICK, this, this._onSkillItemClick));
                // 技能配置按钮选中状态改变处理
                this._btnConfig.on(Laya.Event.CHANGE, null, () => {
                    // TODO: 引导
                    // if (!GongnengYugaoMgr.HintGongNengOpened(GongNengIDs.SkillSetup)) {
                    // 	return;
                    // }
                    if (this._btnConfig.selected) {
                        const nCurPage = Super.GData.m_nChoosePage;
                        this._onPageButtonClick(this.m_lstPageButton[nCurPage].name);
                    }
                    else {
                        this._updateCheckState();
                        this._saveConfigPageSkill();
                        this.curConfigItemIdx = -1;
                    }
                    this._groupConfig.visible = this._btnConfig.selected;
                    this._groupInfo.visible = !this._btnConfig.selected;
                });
                // 一键升级按钮点击处理
                this._btnOneKeyUp.clickHandler = new Laya.Handler(null, () => {
                    if (!this.m_selectedItem)
                        return;
                    if (this.m_selectedItem.skillLevel === 0) {
                        uiMgr.hintText(Loca.getLang("此技能尚未激活！"));
                        return;
                    }
                    // TODO: 花费非绑金的弹窗
                    Net.sendUpSkillLevel(this.m_selectedItem.skillDBID, 1, 1);
                });
                // 升级按钮点击处理
                this._btnUpgrade.clickHandler = new Laya.Handler(null, () => {
                    if (!this.m_selectedItem)
                        return;
                    if (this.m_selectedItem.skillLevel === 0) {
                        uiMgr.hintText(Loca.getLang("此技能尚未激活！"));
                        return;
                    }
                    // TODO: 花费非绑金的弹窗
                    Net.sendUpSkillLevel(this.m_selectedItem.skillDBID, 3, 1);
                });
                // 技能配置页按钮点击处理
                this.m_lstPageButton.forEach(element => element.clickHandler = new Laya.Handler(this, this._onPageButtonClick, [element.name]));
                // 技能配置Item项事件注册
                this.m_lstConfigItem.forEach((element, index) => element.on(Laya.Event.CLICK, null, () => {
                    // 1是职业基础技能，不能选中
                    if (index !== 1)
                        this.curConfigItemIdx = index;
                }));
                // 重置按钮点击处理
                this._btnReset.clickHandler = new Laya.Handler(null, () => {
                    this.m_lstConfigItem.forEach((element, index) => {
                        if (index !== 1) {
                            this._addSkillToConfigPage(-1, index);
                            this._updateCheckState();
                        }
                    });
                });
                // 命名按钮点击处理
                this._btnRename.clickHandler = new Laya.Handler(null, () => {
                    this._saveConfigPageSkill(true);
                });
                // 更新技能事件监听
                gameEventBus.updateSkillList.on(this, this._onUpdateUI);
                gameEventBus.skillUpLevel.on(this, this._onSkillUpLevel);
            }
            destroy(destroyChild) {
                gameEventBus.skillUpLevel.off(this, this._onSkillUpLevel);
                gameEventBus.updateSkillList.off(this, this._onUpdateUI);
                super.destroy(destroyChild);
            }
            /**
             * 界面点击处理
             * @param e
             */
            _onSkillItemClick(e) {
                // TODO: 引导、音效
                // 增加技能配置界面显示判断，解决在选中技能情况下打开配置界面后，选中的技能无法配置成功问题
                if (this.m_selectedItem === e.currentTarget && this._groupConfig.visible === false)
                    return;
                if (this.m_selectedItem)
                    this.m_selectedItem.selectImgVisibility = false;
                this.m_selectedItem = e.currentTarget;
                this.m_selectedItem.selectImgVisibility = true;
                this._updateSkillDetailInfo(this.m_selectedItem);
                if (this.m_selectedItem.lockImgVisibility) { // 未解锁的技能
                    const voSkill = tableMgr.magicsTable.Find(this.m_selectedItem.skillID);
                    if (!voSkill)
                        return;
                    const nTaskID = parseInt(voSkill.LearnTask);
                    if (Global.Data.roleData.CompletedMainTaskID < nTaskID) {
                        uiMgr.hintText(Global.String.Format(Loca.getLang("完成主线任务【{0}】开放"), tableMgr.tasksTable.getTaskTitle(nTaskID)));
                    }
                }
                else {
                    if (this.m_nCurConfigItemIdx !== -1) {
                        this._addSkillToConfigPage(this.m_selectedItem.skillID, this.m_nCurConfigItemIdx);
                        this._updateCheckState();
                    }
                }
            }
            /**
             * 技能配置页按钮点击处理
             * @param sBtnName 按钮名字
             */
            _onPageButtonClick(sBtnName) {
                this.m_lstPageButton.forEach(element => element.selected = element.name === sBtnName);
                const nPageIdx = parseInt(sBtnName);
                this._btnDisplayPage.label = (nPageIdx + 1).toString();
                this._updateConfigInfo(nPageIdx);
                this._updateCheckState();
            }
            /** @implements */
            enterPart() {
                Net.sendGetSkillInfoCmd();
                this._updateTxtTotalMoJing();
            }
            /**
             * 更新界面显示
             */
            _onUpdateUI() {
                this._btnConfig.selected = false;
                this._updateSkillList();
                // 默认选中第一个
                const evt = new Laya.Event();
                evt.setTo(Laya.Event.CLICK, this._skillItem0, this._skillItem0);
                this._skillItem0.event(Laya.Event.CLICK, evt);
                // 默认选中配置第一页
                // evt.setTo(Laya.Event.CLICK, this._btnPage0, this._btnPage0);
                // this._btnPage0.event(Laya.Event.CLICK, evt);
            }
            /**
             * 技能升级处理
             * @param dtUpLevel 升级数据
             */
            _onSkillUpLevel(dtUpLevel) {
                const itmSkill = this.m_lstSkillItem.find(element => element.skillDBID === dtUpLevel.SkillID);
                if (!itmSkill)
                    return;
                if (dtUpLevel.SkillLevel > itmSkill.skillLevel) {
                    // TODO: 技能升级特效
                }
                const dtSkill = Global.GetSkillDataByID(itmSkill.skillID);
                dtSkill.SkillLevel = dtUpLevel.SkillLevel;
                dtSkill.UsedNum = dtUpLevel.SkillUsedNum;
                itmSkill.updateUI(itmSkill.skillVO, itmSkill.skillData);
                if (this.m_selectedItem === itmSkill)
                    this._updateSkillDetailInfo(this.m_selectedItem);
                this._updateTxtTotalMoJing();
                this._updateAllItemRedMark();
            }
            /**
             * 更新技能列表显示
             */
            _updateSkillList() {
                const lstVO = this._getSkillVOList();
                const nLength = this.m_lstSkillItem.length;
                for (let nIdx = 0; nIdx < nLength; nIdx++) {
                    const itmSkill = this.m_lstSkillItem[nIdx];
                    if (nIdx < lstVO.length) {
                        const voSkill = lstVO[nIdx];
                        const dtSkill = Global.GetSkillDataByID(voSkill.ID);
                        itmSkill.updateUI(voSkill, dtSkill);
                        this._updateOneItemRedMark(itmSkill);
                    }
                    else {
                        itmSkill.clearUI();
                    }
                }
                // 设置配置页的默认技能
                this._configItem1.updateUI(this.m_lstSkillItem[0].skillVO, this.m_lstSkillItem[0].skillData);
                this._configItem1.hideTxtInfo();
            }
            /**
             * 更新技能详细信息
             * @param itmSkill
             */
            _updateSkillDetailInfo(itmSkill) {
                if (!itmSkill.skillVO)
                    return;
                // 技能图标
                this._detailItem.updateUI(itmSkill.skillVO, itmSkill.skillData);
                this._detailItem.showOnlyLevel();
                // 技能名字
                const voSkill = itmSkill.skillVO;
                this._txtSkillName.text = Loca.getLang(voSkill.Name);
                if (voSkill.BaseMagic === 0) {
                    this._txtMPConsume.innerHTML = Loca.getLang("魔法消耗:") + Global.GetColorStringForNGUIText("5c97dd", Loca.getLang("无"));
                }
                else {
                    this._txtMPConsume.innerHTML = Loca.getLang("魔法消耗:") + Global.GetColorStringForNGUIText("5c97dd", Global.String.Format(Loca.getLang("{0}%魔法上限"), voSkill.BaseMagic));
                }
                this._txtCooldown.innerHTML = Loca.getLang("技能冷却:") + Global.GetColorStringForNGUIText("5c97dd", Global.String.Format(Loca.getLang("{0}秒"), voSkill.CDTime));
                this._txtReleaseScope.innerHTML = Loca.getLang("释放范围:") + Global.GetColorStringForNGUIText("5c97dd", Loca.getLang(voSkill.FanWeiDescription));
                // 技能描述
                const nSkillID = itmSkill.skillID;
                let nSkillLv = itmSkill.skillLevel;
                if (nSkillLv <= 0)
                    nSkillLv = 1;
                const nTotalLv = nSkillLv + Global.getSkillAddPoin(nSkillID);
                let strDesc;
                const realStrDesc = Loca.getLang(voSkill.Description);
                let voLevel = Global.getMagicLevelVO(nSkillID, nTotalLv);
                if (voLevel) {
                    strDesc = Loca.getLang("本级效果") + "<br>" + Global.String.Format(realStrDesc, voLevel.DescriptionParams);
                }
                voLevel = Global.getMagicLevelVO(nSkillID, nTotalLv + 1);
                if (voLevel) {
                    strDesc += "<br><br>" + Loca.getLang("下级效果") + "<br>" + Global.String.Format(realStrDesc, voLevel.DescriptionParams);
                }
                this._txtSkillDesc.innerHTML = strDesc;
                // 等级及消耗
                voLevel = Global.getMagicLevelVO(nSkillID, nSkillLv);
                let jingshi = Math.floor((voLevel.ShuLianDu - itmSkill.skillUsedNum) / 5);
                if (jingshi <= 0)
                    jingshi = 0;
                else if (jingshi < 1)
                    jingshi = 1;
                this._txtMoJingConsume.text = jingshi.toString();
                if (Global.GetRoleCommonUseParamsValue(RoleCommonUseIntParamsIndexs.TianDiJingYuan) < jingshi) {
                    this._txtMoJingConsume.color = `#${MyUI.ColorCode.no}`;
                    this._btnOneKeyUp.disabled = true;
                }
                else {
                    this._txtMoJingConsume.color = `#${MyUI.ColorCode.value}`;
                    this._btnOneKeyUp.disabled = false; // itmSkill.skillUsedNum >= voLevel.ShuLianDu;
                }
                this._txtGoldConsume.text = voLevel.NeedJinBi.toString();
                if (voLevel.NeedJinBi > Global.GetRoleOwnNumByMoneyType(MoneyTypes.TongQian)) {
                    this._txtGoldConsume.color = `#${MyUI.ColorCode.no}`;
                }
                else {
                    this._txtGoldConsume.color = `#${MyUI.ColorCode.value}`;
                }
                if (voLevel.NeedZhuanSheng !== 0) {
                    this._txtNeedLevel.text = Global.String.Format(Loca.getLang("2312"), voLevel.NeedZhuanSheng, voLevel.NeedRoleLevel); // 最低{0}重{1}级
                }
                else {
                    this._txtNeedLevel.text = Global.String.Format(Loca.getLang("2311"), voLevel.NeedRoleLevel); // 最低{0}级
                }
                if (Global.Data.roleData.ChangeLifeCount > voLevel.NeedZhuanSheng
                    || (Global.Data.roleData.ChangeLifeCount === voLevel.NeedZhuanSheng && Global.Data.roleData.Level >= voLevel.NeedRoleLevel)) {
                    this._txtNeedLevel.color = `#${MyUI.ColorCode.value}`;
                }
                else {
                    this._txtNeedLevel.color = `#${MyUI.ColorCode.no}`;
                }
            }
            /**
             * 更新斗气值
             */
            _updateTxtTotalMoJing() {
                this._txtTotalMoJing.text = Global.GetRoleCommonUseParamsValue(RoleCommonUseIntParamsIndexs.TianDiJingYuan) + "";
            }
            /**
             * 更新所有技能Item的小红点
             */
            _updateAllItemRedMark() {
                this.m_lstSkillItem.forEach(element => this._updateOneItemRedMark(element));
            }
            /**
             * 更新一个技能Item的小红点
             * @param itmSkill
             */
            _updateOneItemRedMark(itmSkill) {
                if (itmSkill.lockImgVisibility) {
                    itmSkill.redMarkVisibility = false;
                }
                else {
                    itmSkill.redMarkVisibility = this._getCanLevelUp(itmSkill.skillID, itmSkill.skillLevel, itmSkill.skillUsedNum);
                }
            }
            /**
             * 获取当前角色的技能VO列表
             */
            _getSkillVOList() {
                const lstVO = [];
                const nOccu = Global.CalcOriginalOccupationID(Global.Data.roleData.Occupation);
                const mapVO = tableMgr.magicsTable.allRowsRef();
                if (mapVO instanceof Map) {
                    mapVO.forEach(value => {
                        // ActionIndex >= 1000 或者 ParentMagicID > 0 都是使用但是不需要显示的技能
                        if (value.ToOcuupation === nOccu && value.ActionIndex < 1000 && value.ParentMagicID <= 0) {
                            lstVO.push(value);
                        }
                    });
                }
                return lstVO;
            }
            /**
             * 获取是否可以升级
             * @param nSkillID
             * @param nSkillLv
             * @param nSkillUsedNum
             */
            _getCanLevelUp(nSkillID, nSkillLv, nSkillUsedNum) {
                const voLevel = Global.getMagicLevelVO(nSkillID, nSkillLv);
                if (!voLevel || voLevel.Level >= 100)
                    return false;
                let jingshi = Math.floor((voLevel.ShuLianDu - nSkillUsedNum) / 5);
                if (jingshi <= 0)
                    jingshi = 0;
                else if (jingshi < 1)
                    jingshi = 1;
                if (Global.GetRoleCommonUseParamsValue(RoleCommonUseIntParamsIndexs.TianDiJingYuan) < jingshi) {
                    return false;
                }
                if (voLevel.NeedJinBi > Global.GetRoleOwnNumByMoneyType(MoneyTypes.TongQian)) {
                    return false;
                }
                const nLifeCnt = Global.Data.roleData.ChangeLifeCount;
                if (nLifeCnt < voLevel.NeedZhuanSheng || (nLifeCnt === voLevel.NeedZhuanSheng && Global.Data.roleData.Level < voLevel.NeedRoleLevel)) {
                    return false;
                }
                return true;
            }
            /**
             * 更新技能配置页信息
             * @param nPage 页码
             */
            _updateConfigInfo(nPage = 0) {
                const dtPage = Super.GData.MainQuickKeyItems[nPage];
                if (Global.String.IsNullOrWhiteSpace(dtPage.sPageName)) {
                    this._inputCfgName.text = Loca.getLang("11592"); // 请输入技能配置名称
                }
                else {
                    this._inputCfgName.text = dtPage.sPageName;
                }
                const aItmKeys = dtPage.MainQuickKeyItems;
                let itmKey;
                let itmSkill;
                for (let i = 0; i < aItmKeys.length; i++) {
                    itmKey = aItmKeys[i];
                    // 保存战斗快捷栏位置下标1是基础攻击，以前就是这样设计的
                    if (i === 1)
                        continue;
                    // 2,3,4位减1对应配置4个可设置的技能
                    itmSkill = this.m_lstConfigItem[i];
                    if (itmKey) {
                        const voSkill = tableMgr.magicsTable.Find(itmKey.ID);
                        itmSkill.updateUI(voSkill, Global.GetSkillDataByID(itmKey.ID));
                        itmSkill.hideTxtInfo();
                    }
                    else {
                        itmSkill.clearUI();
                    }
                }
            }
            /**
             * 当前配置页正在配置的技能Item索引
             */
            set curConfigItemIdx(value) {
                if (this.m_nCurConfigItemIdx === value) {
                    return;
                }
                if (this.m_nCurConfigItemIdx !== -1) {
                    this.m_lstConfigItem[this.m_nCurConfigItemIdx].selectImgVisibility = false;
                }
                this.m_nCurConfigItemIdx = value;
                if (value !== -1) {
                    this.m_lstConfigItem[value].selectImgVisibility = true;
                }
            }
            /**
             * 更新勾选状态
             */
            _updateCheckState() {
                this.m_lstSkillItem.forEach(element => {
                    if (element !== this._skillItem0) {
                        if (this._btnConfig.selected) {
                            if (!element.lockImgVisibility) {
                                if (this.m_lstConfigItem.find(value => element.skillID === value.skillID)) {
                                    element.checkImgVisibility = true;
                                }
                                else {
                                    element.checkImgVisibility = false;
                                }
                            }
                        }
                        else {
                            element.checkImgVisibility = false;
                        }
                    }
                });
            }
            /**
             * 向指定的位置设置技能
             * @param nSkillId 技能ID
             * @param nIndex 位置索引（1表示职业基础技能，0、2、3、4位置表示可配置的位置）
             */
            _addSkillToConfigPage(nSkillId, nIndex) {
                const nCurPage = Super.GData.m_nChoosePage;
                const QuickKeyItems = Super.GData.MainQuickKeyItems[nCurPage].MainQuickKeyItems;
                const skillData = Global.GetSkillDataByID(nSkillId);
                if (!skillData) {
                    if (QuickKeyItems && QuickKeyItems[nIndex]) {
                        QuickKeyItems[nIndex] = null;
                    }
                    this.m_lstConfigItem[nIndex].clearUI();
                    return false;
                }
                for (let i = 0; i < QuickKeyItems.length; ++i) {
                    const item = QuickKeyItems[i];
                    if (item && item.ID === nSkillId && i !== nIndex) {
                        item.ItemType = -1;
                        item.ID = 0;
                        this.m_lstConfigItem[i].clearUI();
                        break;
                    }
                }
                if (nIndex >= QuickKeyItems.length)
                    return false;
                let myItem = QuickKeyItems[nIndex];
                if (!myItem) {
                    myItem = new QuickKeyItem();
                    QuickKeyItems[nIndex] = myItem;
                }
                myItem.ItemType = 0;
                myItem.ID = nSkillId;
                this.m_lstConfigItem[nIndex].updateBySkillData(skillData);
                return true;
            }
            /**
             * 保存配置页技能
             * @param bRename 是否重命名技能页
             */
            _saveConfigPageSkill(bRename = false) {
                // TODO: 敏感词
                // if (bRename)
                // if (Global.RoleName_IncludeReplaceFilterFileds(InputText.text)) {
                // 		Super.ShowMessageBoxEx(Super.MainWindowRoot, 0, Loca.getLang("提示"), Loca.getLang("技能配置名称当中含有敏感词汇，请重新输入!"));
                // 	return;
                // }
                const nCurPage = this.m_lstPageButton.findIndex(element => element.selected === true);
                Super.GData.m_nChoosePage = nCurPage;
                if (bRename) {
                    const dtPage = Super.GData.MainQuickKeyItems[nCurPage];
                    dtPage.sPageName = this._inputCfgName.text;
                }
                Super.SaveSkillQuickBar();
            }
        }
        role.SkillPart = SkillPart;
    })(role = MyUI.role || (MyUI.role = {}));
})(MyUI || (MyUI = {}));
//# sourceMappingURL=SkillPart.js.map