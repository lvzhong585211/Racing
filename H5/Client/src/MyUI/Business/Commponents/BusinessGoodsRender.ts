module MyUI {
	/**
	 * 商人Goods Data
	 */
	export class BusinessGoodsData {
		/** 商品Id */
		id: number;
		/** 商品字符串数据 */
		newGoods: string;
		/** 斗气值 */
		douQi: number;
		/** 帮贡值 */
		bangGong: number;
		/** 寻龙积分 */
		xunLongJiFen: number;
		/** 帮会需要等级 */
		bangHuiNeedLevel: number
		/** 帮会当前等级 */
		bangHuiCurrLevel: number;
		/** 商品可兑换数量 */
		goodsCount: number;
		/** 商人类型 */
		businessType: number;
		/** 获取兑换商品数量 */
		duiHuanNum: number;
		/** 获取当前商店拥有的货币数量 */
		busMoneyNums: number;
	}
	/**
	* 商人Goods Render
	*/
	export class BusinessGoodsRender extends ui.Business.Components.BusinessGoodsRenderUI {
		constructor() {
			super();
			Style.prepareHtmlFont22Center(this._textGoodsName, ColorCode.normalH);
			this._btnBuy.clickHandler = Laya.Handler.create(this, () => {
				Net.sendGetExchangeMoJingAndQiFuCmd(this.dataSource.id, 1);
			}, null, false);
		}

		/** ItemRender数据源 */
		get dataSource(): BusinessGoodsData { return this._dataSource; }
		set dataSource(value: BusinessGoodsData) {
			super._dataSource = value;
			if (value === null)
				return;
			const newGoodsList = value.newGoods.split(',');
			// 物品Id
			const goodsId = parseInt(newGoodsList[0]);
			const goodsVo = tableMgr.goodsTable.Find(goodsId);
			// 物品是否是装备，装备与道具都是不同的名称颜色
			const goodsData = Global.GetDummyGoodsDataMu(goodsId, parseInt(newGoodsList[3]), parseInt(newGoodsList[4]), parseInt(newGoodsList[6]), parseInt(newGoodsList[5]), parseInt(newGoodsList[2]), parseInt(newGoodsList[1]));
			if (Global.goodsIsEquip(goodsId)) {
				this._textGoodsName.innerHTML = Global.GetColorStringForNGUIText(Global.GetColorByGoodsData(goodsData), Loca.getLang(goodsVo.Title));
			} else {
				this._textGoodsName.innerHTML = Global.GetColorStringForNGUIText(goodsVo.GoodsColor, Loca.getLang(goodsVo.Title));
			}
			// 物品Icon
			this._goodsIcon.updateByGoodsData(goodsData);
			// 设置货币
			this.setMoneyType();
			// 刷新状态(商品数量)
			if (!this.refreshBHLevelCondition(this.dataSource.bangHuiCurrLevel))
				this.refreshGoodsCountCondition(this.dataSource.duiHuanNum, this.dataSource.busMoneyNums);
		}
		/**
		 * 设置货币
		 */
		private setMoneyType(): void {
			switch (this.dataSource.businessType) {
				case BussinessTypeEnum.BussinessDouQi:
					this._imageMoneyType.skin = Global.getCommonAtlasImgPath("money_douqi");
					this._textGoodsPrice.text = `${this.dataSource.douQi}`;
					break;
				case BussinessTypeEnum.BussinessBangHui:
					this._imageMoneyType.skin = Global.getCommonAtlasImgPath("money_gongxian");
					this._textGoodsPrice.text = `${this.dataSource.bangGong}`;
					break;
				case BussinessTypeEnum.BussinessXunLong:
					this._imageMoneyType.skin = Global.getCommonAtlasImgPath("money_jifen");
					this._textGoodsPrice.text = `${this.dataSource.xunLongJiFen}`;
					break;
			}
		}
		/**
		 * 刷新状态(货币)
		 * @param nums 货币数量
		 */
		refreshCondition(nums: number): void {
			// 货币数量不足、兑换数量不足
			if (nums < parseInt(this._textGoodsPrice.text)) {
				this.setBuyState(true);
				return;
			}
			this.setBuyState(false);
		}
		/**
		 * 刷新状态(商品数量)
		 * @param nums 商品数量
		 * @param huoBiNums 货币数量
		 */
		refreshGoodsCountCondition(nums: number, huoBiNums: number): boolean {
			// 商品兑换无上限
			if (this.dataSource.goodsCount === -1) {
				// 货币数量不足、兑换数量不足
				if (huoBiNums < parseInt(this._textGoodsPrice.text)) {
					this.setBuyState(true);
					return true;
				}
				// 无上限商品可购买，隐藏条件文本
				this.setBuyState(false);
				this._textCondition.visible = false;
				return true;
			}
			// 商品剩余数量
			nums = nums === undefined ? 0 : nums;
			const shengYuCount = this.dataSource.goodsCount - nums;
			// 商品条件文本(比如今日可竞次数，帮会等级需求等)
			this._textCondition.text = Global.String.Format(ConfigLoca.UI_Bussiness_TodayCanDui, shengYuCount);
			// Global.Log.Error("id = " + this.dataSource.id + "   _textGoodsName = " + this._textGoodsName.text + "   nums = " + nums + "    huoBiNums = " + huoBiNums + "   this._textCondition.text  = " + this._textCondition.text + "    shengYuCount = " + shengYuCount);
			// Global.Log.Error("------------------------------------------------------");
			this._textCondition.color = `#${ColorCode.friendLineBlue}`;
			// 货币数量不足、兑换数量不足
			if (huoBiNums < parseInt(this._textGoodsPrice.text)) {
				this.setBuyState(true);
				return true;
			}
			// 商品剩余数量不足
			if (shengYuCount <= 0) {
				this.setBuyState(true);
				return false;
			}
			// 可以兑换
			this.setBuyState(false);
			return true;
		}
		/**
		 * 刷新帮会商品购买状态(帮会等级是否满足)
		 * @param bhLevel 帮会等级
		 */
		refreshBHLevelCondition(bhLevel: number): boolean {
			// 如果是帮会商人，并且帮会等级小余需要等级
			if (this.dataSource.businessType === BussinessTypeEnum.BussinessBangHui) {
				if (gameIns.gameState.roleData.Faction < 1 || bhLevel < this.dataSource.bangHuiNeedLevel) {
					this._textCondition.text = Global.String.Format(ConfigLoca.UI_Bussiness_NeedBangHuiLevel, this.dataSource.bangHuiNeedLevel);
					this._textCondition.color = `#${ColorCode.no}`;
					this.setBuyState(true);
					return true;
				}
			}
			return false;
		}
		/**
		 * 设置购买的状态
		 * @param state 
		 */
		private setBuyState(state: boolean) {
			this._imageMoneyType.disabled = state;
			this._btnBuy.disabled = state;
		}
		destroy(destroyChild?: boolean): void {
			this._btnBuy.clickHandler.recover();
			super.destroy(destroyChild);
		}
	}
}