module MyUI {
	/**
	* 商人Part 
	*/
	export class BusinessPart extends ui.Business.BusinessPartUI {
		/** 当前打开商人类型 */
		private mCurrBusinessType: BussinessTypeEnum;
		/** 商品兑换数据列表 */
		private mGoodsDuiHuanList: Map<number, number>;
		constructor() {
			super();

			Style.prepareTabItemRender1(this._tabDouQi, WindowID.BusinessDouQi);
			Style.prepareTabItemRender1(this._tabBangHui, WindowID.BusinessBangHui);
			Style.prepareTabItemRender1(this._tabXunLong, WindowID.BusinessXunLong);
			this._tabDouQi.label = ConfigLoca.UI_SysName_BusinessMan_DouQi;
			this._tabBangHui.label = ConfigLoca.UI_SysName_BusinessMan_BangHui;
			this._tabXunLong.label = ConfigLoca.UI_SysName_BusinessMan_XunLong;
			this.registerEventListeners();
		}
		/** 添加事件监听 */
		private registerEventListeners(): void {
			this._tabDouQi.on(Laya.Event.CLICK, this, this.onTabClick);
			this._tabBangHui.on(Laya.Event.CLICK, this, this.onTabClick);
			this._tabXunLong.on(Laya.Event.CLICK, this, this.onTabClick);
			gameEventBus.qiFuJiFenRefresh.on(this, this.qiFuJiFenRefresh);
			gameEventBus.bangHuiDataRefresh.on(this, this.getBangHuiLevel);
			gameEventBus.businessDuiHuanRefresh.on(this, this.duiHuanRefresh);
			gameEventBus.businessDuiHuanNumsRefresh.on(this, this.refreshDuiHuanNums);
		}
		/** 移除事件监听 */
		private unregisterEventListeners(): void {
			this._tabDouQi.off(Laya.Event.CLICK, this, this.onTabClick);
			this._tabBangHui.off(Laya.Event.CLICK, this, this.onTabClick);
			this._tabXunLong.off(Laya.Event.CLICK, this, this.onTabClick);
			gameEventBus.qiFuJiFenRefresh.off(this, this.qiFuJiFenRefresh);
			gameEventBus.bangHuiDataRefresh.off(this, this.getBangHuiLevel);
			gameEventBus.businessDuiHuanRefresh.off(this, this.duiHuanRefresh);
			gameEventBus.businessDuiHuanNumsRefresh.off(this, this.refreshDuiHuanNums);
		}
		destroy(destroyChild?: boolean): void {
			this.unregisterEventListeners();
			super.destroy(destroyChild);
		}
		enterPart(): void {
			this.businessShow(WindowID.BusinessDouQi);
			this.sendGetDuiHuanData();
			this.sendBangHuiData();
		}
		/**
		 * 页签点击处理
		 * @param e 事件类型
		 */
		private onTabClick(e: Laya.Event) {
			const itmTab = e.target as TabItemRender;
			this.businessShow(itmTab.winId);
		}
		/**
		 * 积分更新(仅寻龙商人)
		 * @param jfNums 积分数量
		 */
		private qiFuJiFenRefresh(jfNums: number): void {
			if (this.mCurrBusinessType === BussinessTypeEnum.BussinessXunLong) {
				this._boxXunLong.refreshHuoBi(jfNums);
				this._boxXunLong.refreshGoodsCondition(this.mGoodsDuiHuanList)
			}
		}
		/**
		 * 获取帮会等级(仅帮会商人)
		 * @param bangHuiData 帮会数据
		 */
		private getBangHuiLevel(bangHuiData: NetMsg.BangHuiDetailData): void {
			// if (this.mCurrBusinessType === BussinessTypeEnum.BussinessBangHui) {
			this._boxBangHui.setBangHuiLevel(bangHuiData.bhLevel);
			this._boxBangHui.refreshGoodsCondition(this.mGoodsDuiHuanList);
			// this._boxBangHui.refreshDuiHuanNums(this.mGoodsDuiHuanList)
			// }
		}
		/**
		 * 商品兑换刷新
		 * @param duiHuanType 
		 */
		private duiHuanRefresh(duiHuanType: number): void {
			switch (duiHuanType) {
				case BussinessTypeEnum.BussinessDouQi:
					gameEventBus.huoBiNumsRefresh.event(MoneyTypes.JingYuanZhi);
					break;
				case BussinessTypeEnum.BussinessBangHui:

					break;
				case BussinessTypeEnum.BussinessXunLong:
					Net.sendGetZaJinDanJiFen();
					break;
			}
			this.sendGetDuiHuanData();
			this.sendGetXunLongJiFen();
		}
		/**
		 * 商品兑换后数量更新
		 * @param listMap 
		 */
		private refreshDuiHuanNums(goodsDuiHuanList: Map<number, number>): void {
			this.mGoodsDuiHuanList = goodsDuiHuanList;

			const businessBox = this.getBusinessBox(this.mCurrBusinessType);
			// 是否已经加载过
			if (!businessBox.getIsOpenState()) {
				businessBox.setGoodsDuiHuanList(goodsDuiHuanList);
				businessBox.init(this.mCurrBusinessType);
			} else {
				switch (this.mCurrBusinessType) {
					case BussinessTypeEnum.BussinessDouQi: this._boxDouQi.refreshGoodsCondition(goodsDuiHuanList); break;
					case BussinessTypeEnum.BussinessBangHui: this._boxBangHui.refreshGoodsCondition(goodsDuiHuanList); break;
					case BussinessTypeEnum.BussinessXunLong: this._boxXunLong.refreshGoodsCondition(goodsDuiHuanList); break;
				}
			}
		}
		/**
		 * 请求兑换商品数据
		 */
		private sendGetDuiHuanData(): void {
			Net.sendGetBindDiamondExchangeInfoCmd();
		}
		/**
		 * 请求抽奖积分
		 */
		private sendGetXunLongJiFen(): void {
			Net.sendGetZaJinDanJiFen();
		}
		/**
		 * 请求帮会信息
		 */
		private sendBangHuiData(): void {
			Net.sendQueryBangHuiDetail(gameIns.gameState.roleData.Faction);
		}
		/**
		 *  显示商店商品内容
		 * @param winId 商人Id(WindowID)
		 */
		private businessShow(winId: number): void {
			// 页签选中
			this._tabDouQi.selectedVisibility = winId === WindowID.BusinessDouQi;
			this._tabBangHui.selectedVisibility = winId === WindowID.BusinessBangHui;
			this._tabXunLong.selectedVisibility = winId === WindowID.BusinessXunLong;
			this.mCurrBusinessType = this.getBusinessType(winId);
			if (this.mGoodsDuiHuanList !== undefined) {
				const businessBox = this.getBusinessBox(this.mCurrBusinessType);
				// 是否已经加载过
				if (!businessBox.getIsOpenState()) {
					businessBox.setGoodsDuiHuanList(this.mGoodsDuiHuanList);
					businessBox.init(this.mCurrBusinessType);
				}
			}
		}
		/**
		 *  获取商人对应的Type枚举
		 * @param winId 商人Id(WindowID)
		 */
		private getBusinessType(winId: number): number {
			switch (winId) {
				case WindowID.BusinessDouQi:
					return BussinessTypeEnum.BussinessDouQi;
				case WindowID.BusinessBangHui:
					return BussinessTypeEnum.BussinessBangHui;
				case WindowID.BusinessXunLong:
					return BussinessTypeEnum.BussinessXunLong;
				default:
					return BussinessTypeEnum.BussinessDouQi;
			}
		}
		/**
		 * 获取当前显示的商人Box
		 * @param bType 商人类型(DuiHuanType表里的SaleType)
		 */
		private getBusinessBox(bType: number): BusinessGoodsBox {
			this._boxDouQi.visible = bType === BussinessTypeEnum.BussinessDouQi;
			this._boxBangHui.visible = bType === BussinessTypeEnum.BussinessBangHui;
			this._boxXunLong.visible = bType === BussinessTypeEnum.BussinessXunLong;
			switch (bType) {
				case BussinessTypeEnum.BussinessDouQi:
					return this._boxDouQi;
				case BussinessTypeEnum.BussinessBangHui:
					return this._boxBangHui;
				case BussinessTypeEnum.BussinessXunLong:
					return this._boxXunLong;
				default:
					return this._boxDouQi;
			}
		}
	}
}