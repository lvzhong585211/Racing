var MyUI;
(function (MyUI) {
    var forge;
    (function (forge) {
        /**
         * 装备打造窗口
         */
        class ForgeWindow extends MyUI.BaseWindow {
            constructor() {
                super();
            }
            /** @override */
            createTabDataList() {
                return [
                    this.createTabData(WindowID.Forge, Loca.getLang("20054")),
                    this.createTabData(WindowID.Synthesis, Loca.getLang("20042")) // 合成
                ];
            }
        }
        forge.ForgeWindow = ForgeWindow;
    })(forge = MyUI.forge || (MyUI.forge = {}));
})(MyUI || (MyUI = {}));
//# sourceMappingURL=ForgeWindow.js.map