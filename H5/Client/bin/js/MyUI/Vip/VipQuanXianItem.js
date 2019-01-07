var MyUI;
(function (MyUI) {
    /**
    * Vip权限Item
    */
    class VipQuanXianItem extends ui.Vip.VipQuanXianItemUI {
        constructor() {
            super();
            MyUI.prepareCSSStyle(this._descText.style, "left", 20, `#${MyUI.ColorCode.normal}`);
        }
        /**
         * 权限描述
         * @param text
         * @returns {}
         */
        setText(text) {
            this._descText.innerHTML = text;
        }
    }
    MyUI.VipQuanXianItem = VipQuanXianItem;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=VipQuanXianItem.js.map