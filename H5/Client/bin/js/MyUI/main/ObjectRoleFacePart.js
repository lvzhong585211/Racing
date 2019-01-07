var MyUI;
(function (MyUI) {
    /**
     * 其他玩家头像
     */
    class ObjectRoleFacePart extends ui.MainUI.ObjectRoleFacePartUI {
        constructor() {
            super();
            this.m_nRoleID = 0; // 玩家ID
            this.visible = false;
        }
        destroy(destroyChild) {
            gameEventBus.lifeChange.off(this, this._onHeadLifeUpdated);
            super.destroy(destroyChild);
        }
        /**
         * 获取玩家ID
         */
        get roleID() {
            return this.m_nRoleID;
        }
        get visible() { return super.visible; }
        set visible(value) {
            super.visible = value;
            if (value)
                gameEventBus.lifeChange.on(this, this._onHeadLifeUpdated);
            else
                gameEventBus.lifeChange.off(this, this._onHeadLifeUpdated);
        }
        /**
         * 头像血量更新
         * @param argImp
         */
        _onHeadLifeUpdated(argImp) {
            if (this.visible && argImp.roleID === this.m_nRoleID) {
                this.updateLifeUI(argImp.curLifeV, argImp.maxLifeV);
                this.updateMagicUI(argImp.curMagicV, argImp.maxMagicV);
            }
        }
        /**
         * 更新显示
         * @param actor 角色对象
         */
        updateUI(actor) {
            const staActor = actor.getState();
            if (this.m_nRoleID !== staActor.RoleID) {
                this.m_nRoleID = staActor.RoleID;
                this._txtName.text = staActor.VSName;
                this._txtLevel.text = Global.formatRoleLevel(Logic.getLevelV(actor), Logic.getChangeLifeCount(actor));
            }
            this.updateLifeUI(Logic.getLifeV(actor), Logic.getMaxLifeV(actor));
            this.updateMagicUI(Logic.getMagicV(actor), Logic.getMaxMagicV(actor));
        }
        /**
         * 更新血值显示
         * @param nLifeV
         * @param nMaxLifeV
         */
        updateLifeUI(nLifeV, nMaxLifeV) {
            this._progBarLife.value = nLifeV / nMaxLifeV;
            this._txtLife.text = `${nLifeV}/${nMaxLifeV}`;
        }
        /**
         * 更新蓝值显示
         * @param nMagicV
         * @param nMaxMagicV
         */
        updateMagicUI(nMagicV, nMaxMagicV) {
            this._progBarMagic.value = nMagicV / nMaxMagicV;
            this._txtMagic.text = `${nMagicV}/${nMaxMagicV}`;
        }
    }
    MyUI.ObjectRoleFacePart = ObjectRoleFacePart;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=ObjectRoleFacePart.js.map