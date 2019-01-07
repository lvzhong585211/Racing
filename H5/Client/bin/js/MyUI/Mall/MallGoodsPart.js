var MyUI;
(function (MyUI) {
    /**
     * 商品容器Part
     */
    class MallGoodsPart extends ui.Mall.MallGoodsPartUI {
        constructor() {
            super();
            /** 是否打开过 */
            this.mIsOpen = false;
            this._listgoods.vScrollBarSkin = "";
        }
        /**
         * 商城商品的Data列表
         * @param mallGoodsDataArr          商品的Data数组
         */
        initData(mallGoodsDataArr) {
            this._listgoods.array = mallGoodsDataArr;
            this.mIsOpen = true;
        }
        /**
         * 是否打开过(用来判断是否已加载商品)
         */
        get isOpen() {
            return this.mIsOpen;
        }
        /**
         * 商品列表是否有商品，影响抢购界面感叹号显示
         */
        get isHasGoods() {
            return this._listgoods.array.length === 0;
        }
        /**
         * 设置商品显示列数
         */
        set listRepeatX(value) {
            this._listgoods.repeatX = value;
        }
    }
    MyUI.MallGoodsPart = MallGoodsPart;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=MallGoodsPart.js.map