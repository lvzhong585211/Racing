var MyUI;
(function (MyUI) {
    var Mall;
    (function (Mall) {
        /**
         * 商城窗口
         */
        class MallWindow extends MyUI.BaseWindow {
            constructor() {
                super();
            }
            /** @override */
            createTabDataList() {
                return [
                    this.createTabData(WindowID.Mall, ConfigLoca.UI_SysName_Activity_Mall, Mall.MallPart),
                ];
            }
        }
        Mall.MallWindow = MallWindow;
    })(Mall = MyUI.Mall || (MyUI.Mall = {}));
})(MyUI || (MyUI = {}));
//# sourceMappingURL=MallWindow.js.map