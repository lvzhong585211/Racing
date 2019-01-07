var MyUI;
(function (MyUI) {
    var role;
    (function (role) {
        /**
         * 角色窗口类
         */
        class RoleWindow extends MyUI.BaseWindow {
            constructor() {
                super();
            }
            /** @override */
            createTabDataList() {
                return [
                    this.createTabData(WindowID.Role, Loca.getLang("1447")),
                    this.createTabData(WindowID.Parcel, Loca.getLang("1080"), role.ParcelPart),
                    this.createTabData(WindowID.Skill, Loca.getLang("11590"), role.SkillPart),
                    this.createTabData(WindowID.Wing, Loca.getLang("20034")),
                    this.createTabData(WindowID.XingYao, Loca.getLang("20070")) // 星曜
                ];
            }
            /** @override */
            onClosed(type) {
                super.onClosed(type);
                // 关闭面板时保存一下技能配置
                Super.SaveSkillQuickBar();
            }
            /** @override */
            showPart(nTabID) {
                const bRet = super.showPart(nTabID);
                // 切换页签时要保存一下技能配置(因为可能是设置完技能直接切页签)
                bRet && Super.SaveSkillQuickBar();
                return bRet;
            }
            /** @override */
            updatePartUI(nTabID) {
                const vewPart = super.updatePartUI(nTabID);
                // 是否需要显示装备界面
                const bShowEquipPart = nTabID === WindowID.Role || nTabID === WindowID.Parcel;
                if (bShowEquipPart) {
                    if (!this.mEquipPart) {
                        this.mEquipPart = new role.EquipPart();
                        this.addChild(this.mEquipPart);
                        this.addChild(this.mPartInstanceMap.get(nTabID));
                    }
                    this.mEquipPart.enterPart();
                }
                // 装备界面的显示状态
                this.mEquipPart && (this.mEquipPart.visible = bShowEquipPart);
                return vewPart;
            }
        }
        role.RoleWindow = RoleWindow;
    })(role = MyUI.role || (MyUI.role = {}));
})(MyUI || (MyUI = {}));
//# sourceMappingURL=RoleWindow.js.map