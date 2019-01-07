var MyUI;
(function (MyUI) {
    /**
     * 商城商品goodsData(钻石、红钻、银币商城)
     */
    class MallGoodsData {
    }
    MyUI.MallGoodsData = MallGoodsData;
    /**
     * 商城物品Render
     */
    class MallGoodsRender extends ui.Mall.Components.MallGoodsRenderUI {
        constructor() {
            super();
            MyUI.prepareCSSStyle(this._textGoodsName.style, "center", 22, `#${MyUI.ColorCode.normal}`);
        }
        destroy(destroyChild) {
            if (this._btnBuy.clickHandler)
                this._btnBuy.clickHandler.recover();
            super.destroy(destroyChild);
        }
        /**
         * 货币类型
         * @returns {}
         */
        get moneyType() { return this.mMoneyType; }
        set moneyType(value) {
            this.mMoneyType = value;
            switch (this.mMoneyType) {
                case MallType.Diamond: // 钻石
                    this._imageMoneyType.skin = Global.getCommonAtlasImgPath("money_diamond");
                    break;
                case MallType.BindingDiamond: // 绑钻
                    this._imageMoneyType.skin = Global.getCommonAtlasImgPath("money_bindingdiamond");
                    break;
                case MallType.Silver: // 银币
                    this._imageMoneyType.skin = Global.getCommonAtlasImgPath("money_yinbi");
                    break;
                default:
                    this._imageMoneyType.skin = Global.getCommonAtlasImgPath("money_diamond");
                    break;
            }
        }
        /**
         * 商品价格
         */
        goodsPrice() {
            // 配表钻石、银行一个字段，绑钻一个字段，只能分开显示
            switch (this.mMoneyType) {
                case MallType.Diamond:
                case MallType.Silver:
                    this._textGoodsPrice.text = this.dataSource.price1.toString();
                    break;
                case MallType.BindingDiamond:
                    this._textGoodsPrice.text = this.dataSource.price2.toString();
                    break;
            }
        }
        /** ItemRender数据源 */
        get dataSource() { return this._dataSource; }
        set dataSource(value) {
            super._dataSource = value;
            if (this.dataSource === null)
                return;
            this.moneyType = this.dataSource.tabId;
            const goodsVo = tableMgr.goodsTable.Find(this.dataSource.goodsId);
            // 物品是否是装备，装备与道具都是不同的名称颜色
            const goodsData = this.getEquipColor();
            if (Global.goodsIsEquip(this.dataSource.goodsId)) {
                this._textGoodsName.innerHTML = Global.GetColorStringForNGUIText(Global.GetColorByGoodsData(goodsData), Loca.getLang(goodsVo.Title));
            }
            else {
                this._textGoodsName.innerHTML = Global.GetColorStringForNGUIText(goodsVo.GoodsColor, Loca.getLang(goodsVo.Title));
            }
            this._goodsIcon.updateByGoodsVO(goodsVo);
            // 绑钻商城商品绑定
            if (this.moneyType === MallType.BindingDiamond) {
                this._goodsIcon.isBinding = true;
            }
            this._goodsIcon.DPSelectedItem = (s, e) => {
                // 是否可以购买
                if (e.IDType === TipsOperationTypes.Goumai) {
                    if (this.getIsCanBuyState(e.ID)) {
                        this.sendBuyGoods(e.ID);
                    }
                }
            };
            // 商品价格
            this.goodsPrice();
            // 钻石、绑钻、银币商品直接弹购买Tips 
            this._btnBuy.clickHandler = Laya.Handler.create(this, () => {
                MyUI.GTipServiceEx.ShowMallTip(this._goodsIcon, TipTypes.GoodsText, GoodsOwnerTypes.mallSale, this.getBuyPriceType(), parseInt(this._textGoodsPrice.text), goodsData);
            }, undefined, false);
        }
        /**
         * 获取装备名称颜色
         */
        getEquipColor() {
            let goodsData = null;
            const propertyList = this.dataSource.property.split(",");
            if (propertyList.length === 4) {
                const isBuyLimitGoods = this.dataSource.tabId === 10000 ? 1 : 0;
                goodsData = Global.GetDummyGoodsDataMu(this.dataSource.goodsId, parseInt(propertyList[0]), parseInt(propertyList[1]), parseInt(propertyList[3]), parseInt(propertyList[2]), isBuyLimitGoods);
            }
            return goodsData;
        }
        /**
         * 获得购买的商品货币类型
         */
        getBuyPriceType() {
            switch (this.dataSource.tabId) {
                case MallType.Diamond: return GoodsPriceUnitTypes.Zhuanshi;
                case MallType.BindingDiamond: return GoodsPriceUnitTypes.BindZhuanshi;
                case MallType.Silver: return GoodsPriceUnitTypes.BindJinBi;
            }
            return GoodsPriceUnitTypes.Zhuanshi;
        }
        /**
         * 是否可以购买
         * @param nums       购买数量
         */
        getIsCanBuyState(nums) {
            const price = parseInt(this._textGoodsPrice.text);
            // 绑钻
            if (this.dataSource.tabId === MallType.BindingDiamond) {
                // 数量不足
                if (gameIns.gameState.roleData.Gold < price * nums) {
                    //TODO:货币途径
                    return false;
                }
            }
            else if (this.dataSource.tabId === MallType.Silver) {
            }
            else {
                // 钻石
                if (Global.Data.roleData.UserMoney < price * nums) {
                    //Super.HintMainText(Global.GetLang("您当前拥有的钻石数不足，无法进行购买!"));
                    //TODO:货币途径
                    return false;
                }
            }
            return true;
        }
        /**
         * 购买商品
         * @param nums       购买数量
         */
        sendBuyGoods(nums) {
            if (Global.IsBagFull()) {
                uiMgr.hintText(ConfigLoca.UI_COMMON_BagFull_请清理出空格后再购买);
                return;
            }
            switch (this.dataSource.tabId) {
                case MallType.BindingDiamond:
                    Net.sendMallBindDiamondBuy(this.dataSource.id, nums);
                    break;
                case MallType.Diamond:
                case MallType.Silver:
                    Net.sendMallBuy(this.dataSource.id, nums, false);
                    break;
            }
        }
    }
    MyUI.MallGoodsRender = MallGoodsRender;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=MallGoodsRender.js.map