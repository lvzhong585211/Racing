namespace MyUI.Mall {
	/**
	 * 商城Part (注意一点：商城商品的数据是从服务器发过来的，抢购商城的是服务器进行筛选的，其他3个是一起发过来的，不用客户端自己读表)
	 */
	export class MallPart extends ui.Mall.MallpartUI {
		gOpenTabId = WindowID.MallDiamond;
		/** 抢购商城商品Part */
		private mBuyLimitGoodsPart: MallGoodsPart;
		/** 钻石商城商品Part */
		private mDiamondGoodsPart: MallGoodsPart;
		/** 绑钻商城商品Part */
		private mBindingDiamondGoodsPart: MallGoodsPart;
		/** 银币商城商品Part */
		private mSilverGoodsPart: MallGoodsPart;
		/** 抢购结束时间 */
		private mQiangGouEndTicks: number;
		/** 是否是第一次界面 */
		private mIsOpenPart = true;
		constructor() {
			super();
			this.init();
		}

		private init() {
			Style.prepareTabItemRender1(this._tabBuyLimit, WindowID.MallBuyLimit);
			Style.prepareTabItemRender1(this._tabDiamond, WindowID.MallDiamond);
			Style.prepareTabItemRender1(this._tabBindingDiamond, WindowID.MallBindingDiamond);
			Style.prepareTabItemRender1(this._tabSilver, WindowID.MallSilver);
			this._tabBuyLimit.label = ConfigLoca.UI_SysName_Mall_BuyLimit;
			this._tabDiamond.label = ConfigLoca.UI_SysName_Mall_Diamond;
			this._tabBindingDiamond.label = ConfigLoca.UI_SysName_Mall_BindingDiamond;
			this._tabSilver.label = ConfigLoca.UI_SysName_Mall_Silver;
			this._btnViewDetails.label = ConfigLoca.UI_COMMON_ViewDetails;
			this.mBuyLimitGoodsPart = new MallGoodsPart();
			this.mDiamondGoodsPart = new MallGoodsPart();
			this.mBindingDiamondGoodsPart = new MallGoodsPart();
			this.mSilverGoodsPart = new MallGoodsPart();
			this.mBuyLimitGoodsPart.visible = false;
			this.mDiamondGoodsPart.visible = false;
			this.mBindingDiamondGoodsPart.visible = false;
			this.mSilverGoodsPart.visible = false;
			this.noHasGoodsShow(false);
			this.registerEventListeners();
			// 设置货币相关
			this._itemHuoBiDiamond.itemType = MoneyTypes.YuanBao;
			this._itemHuoBiBindDiamond.itemType = MoneyTypes.BindYuanBao;
			this._itemHuoYinBi.itemType = MoneyTypes.TongQian;
		}

		/** 添加事件监听 */
		private registerEventListeners() {
			this._tabBuyLimit.on(Laya.Event.CLICK, this, this.onTabClick);
			this._tabDiamond.on(Laya.Event.CLICK, this, this.onTabClick);
			this._tabBindingDiamond.on(Laya.Event.CLICK, this, this.onTabClick);
			this._tabSilver.on(Laya.Event.CLICK, this, this.onTabClick);
			gameEventBus.mallData.on(this, this.mallDataGoBack);
			gameEventBus.qiangGouGoodsBuyResult.on(this, this.qiangGouGoodsBuyResult);
		}
		/** 移除事件监听 */
		private unregisterEventListeners() {
			this._tabBuyLimit.off(Laya.Event.CLICK, this, this.onTabClick);
			this._tabDiamond.off(Laya.Event.CLICK, this, this.onTabClick);
			this._tabBindingDiamond.off(Laya.Event.CLICK, this, this.onTabClick);
			this._tabSilver.off(Laya.Event.CLICK, this, this.onTabClick);
			gameEventBus.mallData.off(this, this.mallDataGoBack);
			gameEventBus.qiangGouGoodsBuyResult.off(this, this.qiangGouGoodsBuyResult);
		}
		/** @implements */
		enterPart() {
			this.mIsOpenPart = true;
			Net.sendGetMallData();
		}
		destroy(destroyChild?: boolean): void {
			this.unregisterEventListeners();
			this.countDownTimeOver();
			super.destroy(destroyChild);
		}
		/**
		 * 商城商品信息返回
		 */
		private mallDataGoBack() {
			this.mallShow(this.gOpenTabId);
			// 抢购商品数据在打开界面的时候就初始化，因为抢购倒计时的时间在里面
			this.showPartListInit(WindowID.MallBuyLimit);
			this.countDownTime();
		}
		/**
		 * 页签点击处理
		 * @param e 事件类型
		 */
		private onTabClick(e: Laya.Event) {
			this.mIsOpenPart = false;
			const itmTab = e.target as TabItemRender;
			this.mallShow(itmTab.winId);
		}
		/**
		 * 对应商城的页签与商品Parts显示状态
		 * @param tabId          商城页签Id
		 */
		private mallShow(tabId: number) {
			// 页签选中
			this._tabBuyLimit.selectedVisibility = tabId === WindowID.MallBuyLimit;
			this._tabDiamond.selectedVisibility = tabId === WindowID.MallDiamond;
			this._tabBindingDiamond.selectedVisibility = tabId === WindowID.MallBindingDiamond;
			this._tabSilver.selectedVisibility = tabId === WindowID.MallSilver;
			// 商品Part显示
			this.mBuyLimitGoodsPart.visible = tabId === WindowID.MallBuyLimit;
			this.mDiamondGoodsPart.visible = tabId === WindowID.MallDiamond;
			this.mBindingDiamondGoodsPart.visible = tabId === WindowID.MallBindingDiamond;
			this.mSilverGoodsPart.visible = tabId === WindowID.MallSilver;

			this.showPartListInit(tabId);
		}
		/**
		 * 商城商品List显示
		 * @param tabId           商城页签Id
		 */
		private showPartListInit(tabId: number) {
			const showPart = this.getClickTabMallPart(tabId);
			// 如果商城商品已存在，则控制显示，否则初始化
			if (!showPart.isOpen) {
				this.setGoodsPartListRender(tabId);
				this.showPartData(tabId, showPart);
				this._mallGoodsBox.addChild(showPart);
			} else {
				// 只有抢购商城会在结束时显示感叹号，其他商城不会显示，这里是在显示Part缓存时进来，并且在不是刚才整个界面时会判断，
				// 因为，抢购时间打开界面时就要显示，所有加这个是否第一个打开
				if (tabId === WindowID.MallBuyLimit && !this.mIsOpenPart) {
					this.noHasGoodsShow(this.mBuyLimitGoodsPart.isHasGoods);
				} else {
					this.noHasGoodsShow(false);
				}
			}
		}
		/**
		 * 显示页签Id对应的界面
		 * @param nTabId 页签Id
		 */
		private showPartData(nTabId: number, showPart: MallGoodsPart) {
			const goodsDataList: any[] = [];
			let xmlDom: NodeList;
			let nodeLen: number;
			this.noHasGoodsShow(false);
			// 抢购商城商品单独处理
			if (nTabId === WindowID.MallBuyLimit) {
				// 服务器发的抢购数剧，如果为空，代表当前没有抢购数据(已结束)
				if (Global.String.IsNullOrEmpty(Global.Data.MallData.QiangGouXmlString)) {
					showPart.visible = false;
					showPart.initData(goodsDataList);
					return;
				} else {
					showPart.listRepeatX = 2;
					// 解析服务器发的抢购表
					xmlDom = Global.Utils.parseXMLElementListFromString(Global.Data.MallData.QiangGouXmlString);
					nodeLen = xmlDom.length;
					for (let i = 0; i < nodeLen; i++) {
						const element = xmlDom.item(i) as Element;
						const type = Global.Utils.getElementAttributeInt(element, "Type");
						if (type !== 0)
							continue;
						const mallBuyLimitGoodsData = new MallBuyLimitGoodsData();
						mallBuyLimitGoodsData.group = Global.Utils.getElementAttributeInt(element, "QiangGouID");    // 抢购Id
						mallBuyLimitGoodsData.goodsId = Global.Utils.getElementAttributeInt(element, "GoodsID");     // 物品Id
						mallBuyLimitGoodsData.origPrice = Global.Utils.getElementAttributeInt(element, "OrigPrice"); // 原价
						mallBuyLimitGoodsData.price = Global.Utils.getElementAttributeInt(element, "Price");         // 现价
						// 配置的自己可购买数量 - 已购买的数量 = 剩余的自己可购买数量 
						mallBuyLimitGoodsData.singlePurchase = Global.Utils.getElementAttributeInt(element, "SinglePurchase") - Global.Utils.getElementAttributeInt(element, "SingleHasPurchase");
						// 配置的剩余可购买数量 - 已购买的数量 = 剩余的可购买数量 (注意：这里的是所有人包括自己)
						mallBuyLimitGoodsData.fullPurchase = Global.Utils.getElementAttributeInt(element, "FullPurchase") - Global.Utils.getElementAttributeInt(element, "FullHasPurchase");
						mallBuyLimitGoodsData.fullAllPurchase = Global.Utils.getElementAttributeInt(element, "FullPurchase");  // 一共可买的数量
						mallBuyLimitGoodsData.daysTime = Global.Utils.getElementAttributeInt(element, "DaysTime");
						// 抢购开始的时间
						const startTime = Global.Utils.getElementAttributeStr(element, "StartTime");
						// Global.Log.Error("startTime = " + startTime + "   safeConvertToTicks = " + TimeManager.safeConvertToTicks(startTime) + "  allTime = " + (mallBuyLimitGoodsData.daysTime * 24 * 60 * 60 * 1000 * 10000));
						// startTime 服务发的开始时间，后面是持续几天的毫秒数，算出的总时间，下面的倒计时用这个减去当前的时候，算出倒计时
						this.mQiangGouEndTicks = (TimeManager.safeConvertToTicks(startTime) + mallBuyLimitGoodsData.daysTime * 24 * 60 * 60 * 1000); // * 10000);// / 10000;
						goodsDataList.push(mallBuyLimitGoodsData);
					}
				}
			} else {
				showPart.listRepeatX = 4;
				// (钻石、绑钻、银币)商城对应的商品Data列表
				xmlDom = Global.Utils.parseXMLElementListFromString(Global.Data.MallData.MallXmlString);
				nodeLen = xmlDom.length;
				for (let i = 0; i < nodeLen; i++) {
					const element = xmlDom.item(i) as Element;
					const mallGoodsData = new MallGoodsData();
					mallGoodsData.id = Global.Utils.getElementAttributeInt(element, "ID"); // mallVo.Id;
					mallGoodsData.goodsId = Global.Utils.getElementAttributeInt(element, "GoodsID"); // mallVo.GoodsID;
					mallGoodsData.property = Global.Utils.getElementAttributeStr(element, "Property"); // mallVo.Property;
					mallGoodsData.tabId = Global.Utils.getElementAttributeInt(element, "TabID"); // mallVo.TabID;
					mallGoodsData.price1 = Global.Utils.getElementAttributeInt(element, "Price"); // mallVo.Price;
					mallGoodsData.price2 = Global.Utils.getElementAttributeInt(element, "ZhenQi"); // mallVo.ZhenQi;
					// mallGoodsData.gridNum = Global.Utils.getElementAttributeInt(element, "ID"); //mallVo.GridNum;
					// 筛选对应的商品Data
					if (this.getClickTabMallType(nTabId) === mallGoodsData.tabId) {
						goodsDataList.push(mallGoodsData);
					}
				}
			}
			showPart.initData(goodsDataList);
		}
		/**
		 * 通过点击的页签得到对应的表商城类型，以便准确筛选商品
		 * @param nTabId                页签Id
		 */
		private getClickTabMallType(nTabId: number): number {
			switch (nTabId) {
				case WindowID.MallBuyLimit:                // 限时抢购
					return MallType.BuyLimit;
				case WindowID.MallDiamond:                 // 钻石商城
					return MallType.Diamond;
				case WindowID.MallBindingDiamond:          // 绑钻商城
					return MallType.BindingDiamond;
				case WindowID.MallSilver:                  // 银币商城
					return MallType.Silver;
			}
			return -1;
		}
		/**
		 * 设置商城商品类型Render
		 * @param nTabId                页签Id
		 */
		private setGoodsPartListRender(nTabId: number) {
			switch (nTabId) {
				case WindowID.MallBuyLimit:                // 限时抢购
					this.mBuyLimitGoodsPart._listgoods.itemRender = MallBuyLimitGoodsRender;
					break;
				case WindowID.MallDiamond:                 // 钻石商城
					this.mDiamondGoodsPart._listgoods.itemRender = MallGoodsRender;
					break;
				case WindowID.MallBindingDiamond:          // 绑钻商城
					this.mBindingDiamondGoodsPart._listgoods.itemRender = MallGoodsRender;
					break;
				case WindowID.MallSilver:                  // 银币商城
					this.mSilverGoodsPart._listgoods.itemRender = MallGoodsRender;
					break;
			}
		}
		/**
		 * 通过点击的页签得到对应商城Part
		 * @param nTabId                页签Id
		 */
		private getClickTabMallPart(nTabId: number): MallGoodsPart {
			switch (nTabId) {
				case WindowID.MallBuyLimit:                // 限时抢购
					return this.mBuyLimitGoodsPart;
				case WindowID.MallDiamond:                 // 钻石商城
					return this.mDiamondGoodsPart;
				case WindowID.MallBindingDiamond:          // 绑钻商城
					return this.mBindingDiamondGoodsPart;
				case WindowID.MallSilver:                  // 银币商城
					return this.mSilverGoodsPart;
			}
			return null;
		}
		/**
		 * 抢购商品购买结果
		 * @param qiangGouId           抢购Id 
		 * @param buyNums              购买数量 
		 * @param saleNums             出售数量 
		 */
		private qiangGouGoodsBuyResult(qiangGouId: number, buyNums: number, saleNums: number) {
			this.mBuyLimitGoodsPart._listgoods.cells.forEach((render) => {
				if (render as MallBuyLimitGoodsRender && render.dataSource !== null) {
					if (render.dataSource.group === qiangGouId) {
						render.shengYuNums = render.dataSource.fullAllPurchase - saleNums;
						render.xianGouNums -= buyNums;
					}
				}
			});
		}
		/**
		 * 抢购时间倒计时
		 */
		private countDownTime() {
			Laya.timer.loop(1000, this, this.getQiangGouLeftTimeString);
		}
		/**
		 * 抢购时间清理
		 */
		private countDownTimeOver() {
			Laya.timer.clear(this, this.getQiangGouLeftTimeString);
		}
		/**
		 * 抢购剩余时间
		 */
		private getQiangGouLeftTimeString(): void {
			let leftTimeString = ConfigLoca.UI_COMMON_FinishedTitle;
			const nowTicks = TimeManager.getCorrectLocalTime(); // / 10000;//毫秒
			const leftSecs = (this.mQiangGouEndTicks - nowTicks) / 1000;
			// Global.Log.Error("nowTicks = " + nowTicks + "   this.mQiangGouEndTicks = " + this.mQiangGouEndTicks + "   cha = " + leftSecs);
			if (leftSecs < 3600) {
				if (leftSecs >= 0) {
					leftTimeString = Global.String.Format(ConfigLoca.UI_COMMON_X分钟X秒, Math.floor(leftSecs / 60), Math.floor(leftSecs % 60));
				}
			}
			else {
				const leftSecs1 = leftSecs % 3600;
				leftTimeString = Global.String.Format(ConfigLoca.UI_COMMON_X小时X分钟X秒, Math.floor(leftSecs / 3600), Math.floor(leftSecs1 / 60), Math.floor(leftSecs1 % 60));
			}
			// 抢购时间结束
			if (this.mQiangGouEndTicks === undefined || leftTimeString === ConfigLoca.UI_COMMON_FinishedTitle) {
				this.countDownTimeOver();
				this._labBuyTimes.text = ConfigLoca.UI_COMMON_FinishedTitle;
			} else {
				this._labBuyTimes.text = leftTimeString;
			}
		}
		/**
		 * 没有商品状态显示
		 * @param state 
		 */
		private noHasGoodsShow(state: boolean) {
			this._imageNoHas.visible = this._textNoHas.visible = state;
		}
	}
}