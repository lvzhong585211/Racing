namespace MyUI {
	/**
	 * 限购商城商品goodsData
	 */
	export class MallBuyLimitGoodsData {
		group: number;       // 抢购Id
		goodsId: number;     // 物品Id
		origPrice: number;   // 原价
		price: number;       // 现价
		singlePurchase: number;    // 自己可买数量
		fullPurchase: number;      // 可买的数量
		fullAllPurchase: number;   // 一共可买的数量
		daysTime: number;

	}
	/**
	 * 商城限购商品Render 
	 */
	export class MallBuyLimitGoodsRender extends ui.Mall.Components.MallBuyLimitGoodsRenderUI {
		/** 剩余数量 */
		private mShengYuNums: number;
		/** 限购数量 */
		private mXianGouNums: number;
		constructor() {
			super();
			this._textYuanJiaTitle.text = ConfigLoca.UI_COMMON_YuanJia;
			this._textXianJiaTitle.text = ConfigLoca.UI_COMMON_XianJia;
			this._textShengYuTitle.text = ConfigLoca.UI_COMMON_ShengYu;
			this._textXianGouTitle.text = ConfigLoca.UI_COMMON_XianGou;
			this._btnBuy.label = ConfigLoca.UI_COMMON_BuyTitle;
		}

		get dataSource(): MallBuyLimitGoodsData { return this._dataSource; }
		set dataSource(value: MallBuyLimitGoodsData) {
			super._dataSource = value;
			if (value === null)
				return;
			const goodsVo: tables.GoodsVO = tableMgr.goodsTable.Find(this.dataSource.goodsId);
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
		get shengYuNums() { return this.mShengYuNums }
		set shengYuNums(value: number) {
			this.mShengYuNums = value;
			this._textShengYuNums.text = `${value}`;
			this._btnBuy.disabled = value === 0;
		}
		/**
		 * 限购数量改变
		 */
		get xianGouNums() { return this.mXianGouNums }
		set xianGouNums(value: number) {
			this.mXianGouNums = value;
			this._textXianGouNums.text = `${value}`;
			this._btnBuy.disabled = value === 0;
		}
		destroy(destroyChild?: boolean): void {
			if (this._btnBuy.clickHandler)
				this._btnBuy.clickHandler.recover();
			super.destroy(destroyChild);
		}
	}
}