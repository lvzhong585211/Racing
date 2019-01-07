module MyUI {
	import Handler = laya.utils.Handler;
	/** 
	 * render 数据Data
	 */
	export class ChargeWelfareData {
		/** 列表类型 (每日充值、累计充值、累计消费) */
		type: number;
		/** 标识Id */
		id: number;
		/** 充值数量 */
		chargeNums: number;
		/** 充值状态 */
		chargeState: number;
		/** 奖励物品 */
		rewardStr: string;
	}
	/**
       * 每日充值Render 
       */
	export class ChargeWelfareRender extends ui.Welfare.Components.ChargeWelfareRenderUI {
		private mGetState: number;			// 领取状态
		constructor() {
			super();
			this._txtTitle.text = ConfigLoca.UI_COMMON_TodayCharge_Title;
			this._btnCharge.label = ConfigLoca.UI_VIP_ChongZhiTitle;
			this._btnGet.label = ConfigLoca.UI_COMMON_LingQu;
			this._btnCharge.visible = false
			this._btnGet.visible = false;
			this._imageYiLingQu.visible = false;
		}
		/** 领取状态值 */
		get getState() {
			return this.mGetState;
		}
		/** ItemRender数据源 */
		get dataSource(): ChargeWelfareData { return this._dataSource; }
		set dataSource(value: ChargeWelfareData) {
			if (value === null)
				return;
			super._dataSource = value;
			// 充值数量条件
			this._txtDiamondNums.text = value.chargeNums.toString();
			// 钻石图片位置设置
			this._imageDiamond.x = this._txtDiamondNums.x + this._txtDiamondNums.displayWidth + 5;
			// 充值奖励领取状态
			//this.setChargeState(value.chargeState);
			// 充值奖励物品
			this.getRewardStr(value.rewardStr);
			// 充值按钮点击事件
			this._btnCharge.clickHandler = Handler.create(this, () => {

			}, undefined, false);
			// 领取奖励点击事件
			this._btnGet.clickHandler = Handler.create(this, () => {
				this.getReward();
			}, undefined, false);
		}
		/**
		 * 充值奖励领取状态
		 * @param value 状态值
		 */
		setChargeState(value: number) {
			this.mGetState = value;
			this._btnCharge.visible = value === chargeStateEnum.Not;
			this._btnGet.visible = value === chargeStateEnum.Can;
			this._imageYiLingQu.visible = value === chargeStateEnum.Had;
		}
		/**
		 * 充值奖励物品
		 * @param rStr 奖励物品字符串
		 */
		private getRewardStr(rStr: string) {
			const goodsList = rStr.split("|");
			this._listGoods.repeatX = goodsList.length;
			goodsList.forEach((gStr, index) => {
				const gInfoList = gStr.split(",");
				const goodsIcon = new GoodsIcon();
				goodsIcon.x = index * (goodsIcon.width + 15);
				//goodsIcon.updateByGoodsVO(tableMgr.goodsTable.Find(parseInt(gInfoList[0])));
				const goodsData = Global.GetDummyGoodsDataMu(parseInt(gInfoList[0]), parseInt(gInfoList[3]), parseInt(gInfoList[4]), parseInt(gInfoList[6]), parseInt(gInfoList[5]), parseInt(gInfoList[2]), parseInt(gInfoList[1]));
				goodsIcon.updateByGoodsData(goodsData);
				this._listGoods.addChild(goodsIcon);
			});
		}
		/** 领取奖励 */
		getReward() {
			if (this.dataSource.type === WindowID.DayCharge)
				Net.sendGetChongZhiJiangLi(FuLiActivityEnum.MeiRiChongZhiHaoLi, this.dataSource.id);
			else if (this.dataSource.type === WindowID.LeiJiCharge)
				Net.sendGetChongZhiJiangLi(FuLiActivityEnum.TotalCharge, this.dataSource.id);
			else if (this.dataSource.type === WindowID.LeiJiConsume)
				Net.sendGetChongZhiJiangLi(FuLiActivityEnum.TotalConsume, this.dataSource.id);
		}

		destroy(destroyChild?: boolean) {
			if (this._btnCharge.clickHandler)
				this._btnCharge.clickHandler.recover();
			if (this._btnGet.clickHandler)
				this._btnGet.clickHandler.recover();
			super.destroy(destroyChild);
		}
	}
}