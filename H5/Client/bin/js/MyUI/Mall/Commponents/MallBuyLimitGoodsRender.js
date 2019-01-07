var MyUI;
(function (MyUI) {
    /**
     * 限购商城商品goodsData
     */
    class MallBuyLimitGoodsData {
    }
    MyUI.MallBuyLimitGoodsData = MallBuyLimitGoodsData;
    /**
     * 商城限购商品Render
     */
    class MallBuyLimitGoodsRender extends ui.Mall.Components.MallBuyLimitGoodsRenderUI {
        constructor() {
            super();
            this._textYuanJiaTitle.text = ConfigLoca.UI_COMMON_YuanJia;
            this._textXianJiaTitle.text = ConfigLoca.UI_COMMON_XianJia;
            this._textShengYuTitle.text = ConfigLoca.UI_COMMON_ShengYu;
            this._textXianGouTitle.text = ConfigLoca.UI_COMMON_XianGou;
            this._btnBuy.label = ConfigLoca.UI_COMMON_BuyTitle;
        }
        get dataSource() { return this._dataSource; }
        set dataSource(value) {
            super._dataSource = value;
            if (value === null)
                return;
            const goodsVo = tableMgr.goodsTable.Find(this.dataSource.goodsId);
            // 商品名称
            //this._textGoodsName.innerHTML = Global.GetColorStringForNGUIText(goodsVo.GoodsColor, Loca.getLang(goodsVo.Title));
            this._goodsIcon.updateByGoodsVO(goodsVo);
            // 抢购商城商品为绑定状态
            this._goodsIcon.isBinding = true;
            // 原价
            this._textYuanJiaNums.text = `${this.dataSource.origPrice}`;
            // 现价
            this._textXianJiaNums.text = `${this.dataSource.price}`;
            // 剩余数量
            this.shengYuNums = this.dataSource.fullPurchase;
            // 限购数量
            this.xianGouNums = this.dataSource.singlePurchase;
            // 购买点击(抢购商城，直接购买)
            this._btnBuy.clickHandler = Laya.Handler.create(this, () => {
                Net.sendMallBuyLimitBuy(this.dataSource.group, 1, false, this.dataSource.goodsId);
            }, undefined, false);
        }
        /**
         * 剩余数量改变
         */
        get shengYuNums() { return this.mShengYuNums; }
        set shengYuNums(value) {
            this.mShengYuNums = value;
            this._textShengYuNums.text = `${value}`;
            this._btnBuy.disabled = value === 0;
        }
        /**
         * 限购数量改变
         */
        get xianGouNums() { return this.mXianGouNums; }
        set xianGouNums(value) {
            this.mXianGouNums = value;
            this._textXianGouNums.text = `${value}`;
            this._btnBuy.disabled = value === 0;
        }
        destroy(destroyChild) {
            if (this._btnBuy.clickHandler)
                this._btnBuy.clickHandler.recover();
            super.destroy(destroyChild);
        }
    }
    MyUI.MallBuyLimitGoodsRender = MallBuyLimitGoodsRender;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=MallBuyLimitGoodsRender.js.map