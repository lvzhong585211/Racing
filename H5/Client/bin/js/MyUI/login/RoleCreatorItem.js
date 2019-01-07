var MyUI;
(function (MyUI) {
    /**
     * 角色创建界面上角色标签组件
     */
    class RoleCreatorItem extends ui.Components.RoleCreatorItemUI {
        constructor() {
            super();
            this.m_eOccuSex = EnumSex.Invalid; // 性别
            this.m_eOccupation = EnumOccupation.Invalid; // 职业
        }
        /** 获取职业性别 */
        getOccuSex() { return this.m_eOccuSex; }
        /** 获取职业 */
        getOccupation() { return this.m_eOccupation; }
        /** 获取职业名称 */
        getOccuName() { return this._btnRole.label; }
        /** 获取职业描述 */
        getOccuDesc() { return this.m_sOccuDesc; }
        /**
         * 设置职业性别
         * @param value 职业性别
         */
        setOccuSex(value) {
            this.m_eOccuSex = value;
            return this;
        }
        /**
         * 设置职业
         * @param value 职业
         */
        setOccupation(value) {
            this.m_eOccupation = value;
            this._btnAvatar.skin = Global.getLoginAtlasImgPath(`btn_avatar_${this.m_eOccupation}`);
            return this;
        }
        /**
         * 设置职业名称
         * @param value 职业名称
         */
        setOccuName(value) {
            this._btnRole.label = value;
            return this;
        }
        /**
         * 设置职业描述
         * @param value 职业描述
         */
        setOccuDesc(value) {
            this.m_sOccuDesc = value;
            return this;
        }
        /**
         * 设置是否选中
         * @param value 是否选中
         */
        setSelected(value) {
            this._btnRole.selected = value;
            this._btnAvatar.selected = value;
        }
        destroy(destroyChild) {
            this.offAll();
            super.destroy(destroyChild);
        }
    }
    MyUI.RoleCreatorItem = RoleCreatorItem;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=RoleCreatorItem.js.map