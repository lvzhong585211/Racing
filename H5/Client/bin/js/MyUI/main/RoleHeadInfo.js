var MyUI;
(function (MyUI) {
    /**
     * 主界面头像显示
     */
    class RoleHeadPart extends ui.MainUI.RoleHeadInfoUI {
        constructor() {
            super();
            this.m_nRoleID = 0; // 主角ID
            this.m_lstAutoOffEvent = []; // 事件监听列表
            // 多语言
            this._txtTitleCombat.text = Loca.getLang("11042"); // 战
            //
            this._imgVIPLevel.on(Laya.Event.CLICK, this, this.clickVipBtn);
            // 等级更新通知
            this.m_lstAutoOffEvent.push(gameEventBus.levelChange.on(this, this._updateLevelUI));
            // 战力更新通知
            this.m_lstAutoOffEvent.push(gameEventBus.combatForceChange.on(this, this._updateCombatUI));
            // 血值更新通知
            this.m_lstAutoOffEvent.push(gameEventBus.lifeChange.on(this, (lifeArg) => {
                if (this.m_nRoleID === 0)
                    this.m_nRoleID = Global.Data.roleData.RoleID;
                if (lifeArg.roleID === this.m_nRoleID)
                    this._updateLifeMagicUI();
            }));
            // Vip等级改变通知
            this.m_lstAutoOffEvent.push(gameEventBus.vipLevelChange.on(this, this._updateVIPLevelUI));
            // 初始化时更新显示
            this.m_nRoleID = Global.Data.roleData.RoleID;
            this._updateHeadImg();
            this._updateLevelUI();
            this._updateCombatUI();
            this._updateVIPLevelUI();
            this._updateLifeMagicUI();
        }
        destroy(destroyChild) {
            this.m_lstAutoOffEvent.forEach(element => element.off());
            this.m_lstAutoOffEvent.length = 0;
            super.destroy(destroyChild);
        }
        /** 更新头像显示 */
        _updateHeadImg() {
            const nOccu = Global.CalcOriginalOccupationID(Global.Data.roleData.Occupation);
            this._imgHead.skin = Global.getAvatarImgPath(nOccu);
        }
        /** 更新等级显示 */
        _updateLevelUI() {
            const datLeader = Global.Data.roleData;
            this._txtLevel.text = Global.String.Format(Loca.getLang("{0}[{1}重]"), datLeader.Level, datLeader.ChangeLifeCount);
        }
        /** 更新战力显示 */
        _updateCombatUI() {
            this._txtCombat.text = Global.Data.roleData.CombatForce.toString();
        }
        /** 更新VIP等级显示 */
        _updateVIPLevelUI() {
            const nVIPLv = Global.Data.roleData.VIPLevel;
            const sImgName = `btn_vip_${nVIPLv}`;
            this._imgVIPLevel.skin = Global.getMainAtlasImgPath(sImgName);
        }
        /** 更新血蓝值显示 */
        _updateLifeMagicUI() {
            const datLeader = Global.Data.roleData;
            const nLifePercent = datLeader.LifeV / datLeader.MaxLifeV;
            this._progBarLife.value = nLifePercent;
            this._txtLife.text = `${datLeader.LifeV}/${datLeader.MaxLifeV}`;
            this._progBarMagic.value = datLeader.MagicV / datLeader.MaxMagicV;
            this._txtMagic.text = `${datLeader.MagicV}/${datLeader.MaxMagicV}`;
            if (nLifePercent > 0 && nLifePercent <= 0.1) {
                // TODO: 显示血值低的预警窗口，参考RefreshSpriteLife方法
            }
            else {
                // TODO: 关闭血值低的预警窗口
            }
        }
        /**
         * 弹出VipPart
         * @param e
         */
        clickVipBtn(e) {
            const vipPart = windowMgr.openWindow(WindowID.Vip);
            vipPart.initData();
            vipPart.dPSelectedItem = (s, e) => {
                windowMgr.closeWindow(WindowID.Vip);
            };
        }
    }
    MyUI.RoleHeadPart = RoleHeadPart;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=RoleHeadInfo.js.map