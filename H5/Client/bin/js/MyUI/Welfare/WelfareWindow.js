var MyUI;
(function (MyUI) {
    var Welfare;
    (function (Welfare) {
        /**
         * 福利窗口
         */
        class WelfareWindow extends MyUI.BaseWindow {
            constructor() {
                super();
            }
            /** @override */
            createTabDataList() {
                return [
                    this.createTabData(WindowID.SevenLogin, ConfigLoca.UI_SysName_Welfare_SevenLogin, Welfare.SevenDayLoginPart),
                    this.createTabData(WindowID.DailyWelfare, ConfigLoca.UI_SysName_Welfare_DailyWelfare, Welfare.DailyWelfarePart)
                ];
            }
        }
        Welfare.WelfareWindow = WelfareWindow;
    })(Welfare = MyUI.Welfare || (MyUI.Welfare = {}));
})(MyUI || (MyUI = {}));
//# sourceMappingURL=WelfareWindow.js.map