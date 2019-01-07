var MyUI;
(function (MyUI) {
    /**
     * 货币Item  需要设置货币类型，数量以及是否需要跳转按钮 , 也可以在编辑器里直接设置
     */
    class HuoBiItem extends ui.Components.HuoBiItemUI {
        constructor() {
            super();
            this.huoBiJumpBtnShow = false;
        }
        /**
         * 设置货币类型
         */
        set huoBiType(value) {
            switch (value) {
                case MoneyTypes.TongQian: // 银币
                    this._imageHuoBi.skin = Global.getCommonAtlasImgPath("money_yinbi");
                    break;
                case MoneyTypes.YinLiang: // 金币
                    this._imageHuoBi.skin = Global.getCommonAtlasImgPath("money_gold");
                    break;
                case MoneyTypes.YuanBao: // 钻石
                    this._imageHuoBi.skin = Global.getCommonAtlasImgPath("money_diamond");
                    break;
                case MoneyTypes.BindYuanBao: // 绑定钻石
                    this._imageHuoBi.skin = Global.getCommonAtlasImgPath("money_bindingdiamond");
                    break;
            }
        }
        /**
         * 设置货币数量
         */
        set huoBiNums(value) {
            switch (value) {
                case MoneyTypes.TongQian: // 银币
                    this._textHuoBiNums.text = `${gameIns.gameState.roleData.Money1}`;
                    break;
                case MoneyTypes.YinLiang: // 金币
                    this._textHuoBiNums.text = `${gameIns.gameState.roleData.YinLiang}`;
                    break;
                case MoneyTypes.YuanBao: // 钻石
                    this._textHuoBiNums.text = `${gameIns.gameState.roleData.UserMoney}`;
                    break;
                case MoneyTypes.BindYuanBao: // 绑定钻石
                    this._textHuoBiNums.text = `${gameIns.gameState.roleData.Gold}`;
                    break;
            }
        }
        /**
         * 设置跳转按钮是否显示
         */
        set huoBiJumpBtnShow(value) {
            this._btnJump.visible = value;
        }
    }
    MyUI.HuoBiItem = HuoBiItem;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=HuoBiItem.js.map