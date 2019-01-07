var MyUI;
(function (MyUI) {
    /**
     * 怪物头像
     */
    class MonsterHeadPart extends ui.MainUI.MonsterHeadPartUI {
        constructor() {
            super();
            this.mNMonsterId = 0; // 怪物ID
            this.visible = false;
        }
        destroy(destroyChild) {
            gameEventBus.lifeChange.off(this, this._onHeadLifeUpdated);
            super.destroy(destroyChild);
        }
        /**
         * 获取怪物ID
         */
        get monsterId() {
            return this.mNMonsterId;
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
            if (this.visible && argImp.roleID === this.mNMonsterId) {
                this.lifePercent = argImp.curLifeV / argImp.maxLifeV;
            }
        }
        /**
         * 更新显示
         * @param staMonster 怪物State
         */
        updateUI(character) {
            const staMonster = character.getState();
            if (this.mNMonsterId !== staMonster.RoleID) {
                this.mNMonsterId = staMonster.RoleID;
                let sName = Loca.getLang(staMonster.VSName);
                if (SystemConfig.debugShowInnerId) {
                    sName = `${sName}-${character.getRoleID()}`;
                }
                this._txtName.text = sName;
                this._txtLevel.text = Global.String.Format(Loca.getLang("94"), Logic.getLevelV(character)); // {0}级
            }
            this.lifePercent = Logic.getLifeV(character) / Logic.getMaxLifeV(character);
        }
        /**
         * 设置怪物血量比例
         */
        set lifePercent(value) {
            this._progBarLife.value = value;
        }
    }
    MyUI.MonsterHeadPart = MonsterHeadPart;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=MonsterHeadPart.js.map