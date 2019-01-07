var MyUI;
(function (MyUI) {
    var Mall;
    (function (Mall) {
        /**
         * 商城Part (注意一点：商城商品的数据是从服务器发过来的，抢购商城的是服务器进行筛选的，其他3个是一起发过来的，不用客户端自己读表)
         */
        class MallPart extends ui.Mall.MallpartUI {
            constructor() {
                super();
                this.gOpenTabId = WindowID.MallDiamond;
                /** 是否是第一次界面 */
                this.mIsOpenPart = true;
                this.init();
            }
            init() {
                MyUI.prepareTabItemRenderStyle1(this._tabBuyLimit, WindowID.MallBuyLimit);
                MyUI.prepareTabItemRenderStyle1(this._tabDiamond, WindowID.MallDiamond);
                MyUI.prepareTabItemRenderStyle1(this._tabBindingDiamond, WindowID.MallBindingDiamond);
                MyUI.prepareTabItemRenderStyle1(this._tabSilver, WindowID.MallSilver);
                this._tabBuyLimit.label = ConfigLoca.UI_SysName_Mall_BuyLimit;
                this._tabDiamond.label = ConfigLoca.UI_SysName_Mall_Diamond;
                this._tabBindingDiamond.label = ConfigLoca.UI_SysName_Mall_BindingDiamond;
                this._tabSilver.label = ConfigLoca.UI_SysName_Mall_Silver;
                this._btnViewDetails.label = ConfigLoca.UI_COMMON_ViewDetails;
                this.mBuyLimitGoodsPart = new MyUI.MallGoodsPart();
                this.mDiamondGoodsPart = new MyUI.MallGoodsPart();
                this.mBindingDiamondGoodsPart = new MyUI.MallGoodsPart();
                this.mSilverGoodsPart = new MyUI.MallGoodsPart();
                this.mBuyLimitGoodsPart.visible = false;
                this.mDiamondGoodsPart.visible = false;
                this.mBindingDiamondGoodsPart.visible = false;
                this.mSilverGoodsPart.visible = false;
                this.noHasGoodsShow(false);
                this.registerEventListeners();
                // 设置货币相关
                this._itemHuoBiDiamond.huoBiType = MoneyTypes.YuanBao;
                this._itemHuoBiBindDiamond.huoBiType = MoneyTypes.BindYuanBao;
                this._itemHuoYinBi.huoBiType = MoneyTypes.TongQian;
                this._itemHuoBiDiamond.huoBiNums = MoneyTypes.YuanBao;
                this._itemHuoBiBindDiamond.huoBiNums = MoneyTypes.BindYuanBao;
                this._itemHuoYinBi.huoBiNums = MoneyTypes.TongQian;
                this._itemHuoBiDiamond.huoBiJumpBtnShow = true;
            }
            /** 添加事件监听 */
            registerEventListeners() {
                this._tabBuyLimit.on(Laya.Event.CLICK, this, this.onTabClick);
                this._tabDiamond.on(Laya.Event.CLICK, this, this.onTabClick);
                this._tabBindingDiamond.on(Laya.Event.CLICK, this, this.onTabClick);
                this._tabSilver.on(Laya.Event.CLICK, this, this.onTabClick);
                gameEventBus.mallData.on(this, this.mallDataGoBack);
                gameEventBus.qiangGouGoodsBuyResult.on(this, this.qiangGouGoodsBuyResult);
                gameEventBus.huoBiNumsRefresh.on(this, this.huoBiRefresh);
            }
            /** 移除事件监听 */
            unregisterEventListeners() {
                this._tabBuyLimit.off(Laya.Event.CLICK, this, this.onTabClick);
                this._tabDiamond.off(Laya.Event.CLICK, this, this.onTabClick);
                this._tabBindingDiamond.off(Laya.Event.CLICK, this, this.onTabClick);
                this._tabSilver.off(Laya.Event.CLICK, this, this.onTabClick);
                gameEventBus.mallData.off(this, this.mallDataGoBack);
                gameEventBus.qiangGouGoodsBuyResult.off(this, this.qiangGouGoodsBuyResult);
                gameEventBus.huoBiNumsRefresh.off(this, this.huoBiRefresh);
            }
            /** @implements */
            enterPart() {
                this.mIsOpenPart = true;
                Net.sendGetMallData();
            }
            destroy(destroyChild) {
                this.unregisterEventListeners();
                this.countDownTimeOver();
                super.destroy(destroyChild);
            }
            /**
             * 商城商品信息返回
             */
            mallDataGoBack() {
                this.mallShow(this.gOpenTabId);
                // 抢购商品数据在打开界面的时候就初始化，因为抢购倒计时的时间在里面
                this.showPartListInit(WindowID.MallBuyLimit);
                this.countDownTime();
            }
            /**
             * 页签点击处理
             * @param e 事件类型
             */
            onTabClick(e) {
                this.mIsOpenPart = false;
                const itmTab = e.target;
                this.mallShow(itmTab.tabId);
            }
            /**
             * 对应商城的页签与商品Parts显示状态
             * @param tabId          商城页签Id
             */
            mallShow(tabId) {
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
            showPartListInit(tabId) {
                let showPart = this.getClickTabMallPart(tabId);
                // 如果商城商品已存在，则控制显示，否则初始化
                if (!showPart.isOpen) {
                    this.setGoodsPartListRender(tabId);
                    this.showPartData(tabId, showPart);
                    this._mallGoodsBox.addChild(showPart);
                }
                else {
                    // 只有抢购商城会在结束时显示感叹号，其他商城不会显示，这里是在显示Part缓存时进来，并且在不是刚才整个界面时会判断，
                    // 因为，抢购时间打开界面时就要显示，所有加这个是否第一个打开
                    if (tabId === WindowID.MallBuyLimit && !this.mIsOpenPart) {
                        this.noHasGoodsShow(this.mBuyLimitGoodsPart.isHasGoods);
                    }
                    else {
                        this.noHasGoodsShow(false);
                    }
                }
            }
            /**
             * 显示页签Id对应的界面
             * @param nTabId 页签Id
             */
            showPartData(nTabId, showPart) {
                const goodsDataList = [];
                let xmlDom;
                let nodeLen;
                this.noHasGoodsShow(false);
                // 抢购商城商品单独处理
                if (nTabId === WindowID.MallBuyLimit) {
                    // 服务器发的抢购数剧，如果为空，代表当前没有抢购数据(已结束)
                    if (Global.String.IsNullOrEmpty(Global.Data.MallData.QiangGouXmlString)) {
                        showPart.visible = false;
                        showPart.initData(goodsDataList);
                        return;
                    }
                    else {
                        showPart.listRepeatX = 2;
                        // 解析服务器发的抢购表
                        xmlDom = Global.Utils.parseXMLElementListFromString(Global.Data.MallData.QiangGouXmlString);
                        nodeLen = xmlDom.length;
                        for (let i = 0; i < nodeLen; i++) {
                            const element = xmlDom.item(i);
                            const type = Global.Utils.getElementAttributeInt(element, "Type");
                            if (type !== 0)
                                continue;
                            const mallBuyLimitGoodsData = new MyUI.MallBuyLimitGoodsData();
                            mallBuyLimitGoodsData.group = Global.Utils.getElementAttributeInt(element, "QiangGouID"); // 抢购Id
                            mallBuyLimitGoodsData.goodsId = Global.Utils.getElementAttributeInt(element, "GoodsID"); // 物品Id
                            mallBuyLimitGoodsData.origPrice = Global.Utils.getElementAttributeInt(element, "OrigPrice"); // 原价
                            mallBuyLimitGoodsData.price = Global.Utils.getElementAttributeInt(element, "Price"); // 现价
                            // 配置的自己可购买数量 - 已购买的数量 = 剩余的自己可购买数量 
                            mallBuyLimitGoodsData.singlePurchase = Global.Utils.getElementAttributeInt(element, "SinglePurchase") - Global.Utils.getElementAttributeInt(element, "SingleHasPurchase");
                            // 配置的剩余可购买数量 - 已购买的数量 = 剩余的可购买数量 (注意：这里的是所有人包括自己)
                            mallBuyLimitGoodsData.fullPurchase = Global.Utils.getElementAttributeInt(element, "FullPurchase") - Global.Utils.getElementAttributeInt(element, "FullHasPurchase");
                            mallBuyLimitGoodsData.fullAllPurchase = Global.Utils.getElementAttributeInt(element, "FullPurchase"); // 一共可买的数量
                            mallBuyLimitGoodsData.daysTime = Global.Utils.getElementAttributeInt(element, "DaysTime");
                            // 抢购开始的时间
                            const startTime = Global.Utils.getElementAttributeStr(element, "StartTime");
                            Global.Log.Error("startTime = " + startTime + "   safeConvertToTicks = " + TimeManager.safeConvertToTicks(startTime) + "  allTime = " + (mallBuyLimitGoodsData.daysTime * 24 * 60 * 60 * 1000 * 10000));
                            // startTime 服务发的开始时间，后面是持续几天的毫秒数，算出的总时间，下面的倒计时用这个减去当前的时候，算出倒计时
                            this.mQiangGouEndTicks = (TimeManager.safeConvertToTicks(startTime) + mallBuyLimitGoodsData.daysTime * 24 * 60 * 60 * 1000); // * 10000);// / 10000;
                            goodsDataList.push(mallBuyLimitGoodsData);
                        }
                    }
                }
                else {
                    showPart.listRepeatX = 4;
                    // (钻石、绑钻、银币)商城对应的商品Data列表
                    xmlDom = Global.Utils.parseXMLElementListFromString(Global.Data.MallData.MallXmlString);
                    nodeLen = xmlDom.length;
                    for (let i = 0; i < nodeLen; i++) {
                        const element = xmlDom.item(i);
                        const mallGoodsData = new MyUI.MallGoodsData();
                        mallGoodsData.id = Global.Utils.getElementAttributeInt(element, "ID"); // mallVo.Id;
                        mallGoodsData.goodsId = Global.Utils.getElementAttributeInt(element, "GoodsID"); //mallVo.GoodsID;
                        mallGoodsData.property = Global.Utils.getElementAttributeStr(element, "Property"); //mallVo.Property;
                        mallGoodsData.tabId = Global.Utils.getElementAttributeInt(element, "TabID"); //mallVo.TabID;
                        mallGoodsData.price1 = Global.Utils.getElementAttributeInt(element, "Price"); //mallVo.Price;
                        mallGoodsData.price2 = Global.Utils.getElementAttributeInt(element, "ZhenQi"); //mallVo.ZhenQi;
                        //mallGoodsData.gridNum = Global.Utils.getElementAttributeInt(element, "ID"); //mallVo.GridNum;
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
            getClickTabMallType(nTabId) {
                switch (nTabId) {
                    case WindowID.MallBuyLimit: // 限时抢购
                        return MallType.BuyLimit;
                    case WindowID.MallDiamond: // 钻石商城
                        return MallType.Diamond;
                    case WindowID.MallBindingDiamond: // 绑钻商城
                        return MallType.BindingDiamond;
                    case WindowID.MallSilver: // 银币商城
                        return MallType.Silver;
                }
                return -1;
            }
            /**
             * 设置商城商品类型Render
             * @param nTabId                页签Id
             */
            setGoodsPartListRender(nTabId) {
                switch (nTabId) {
                    case WindowID.MallBuyLimit: // 限时抢购
                        this.mBuyLimitGoodsPart._listgoods.itemRender = MyUI.MallBuyLimitGoodsRender;
                        break;
                    case WindowID.MallDiamond: // 钻石商城
                        this.mDiamondGoodsPart._listgoods.itemRender = MyUI.MallGoodsRender;
                        break;
                    case WindowID.MallBindingDiamond: // 绑钻商城
                        this.mBindingDiamondGoodsPart._listgoods.itemRender = MyUI.MallGoodsRender;
                        break;
                    case WindowID.MallSilver: // 银币商城
                        this.mSilverGoodsPart._listgoods.itemRender = MyUI.MallGoodsRender;
                        break;
                }
            }
            /**
             * 通过点击的页签得到对应商城Part
             * @param nTabId                页签Id
             */
            getClickTabMallPart(nTabId) {
                switch (nTabId) {
                    case WindowID.MallBuyLimit: // 限时抢购
                        return this.mBuyLimitGoodsPart;
                    case WindowID.MallDiamond: // 钻石商城
                        return this.mDiamondGoodsPart;
                    case WindowID.MallBindingDiamond: // 绑钻商城
                        return this.mBindingDiamondGoodsPart;
                    case WindowID.MallSilver: // 银币商城
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
            qiangGouGoodsBuyResult(qiangGouId, buyNums, saleNums) {
                this.mBuyLimitGoodsPart._listgoods.cells.forEach((render) => {
                    if (render && render.dataSource !== null) {
                        if (render.dataSource.group === qiangGouId) {
                            render.shengYuNums = render.dataSource.fullAllPurchase - saleNums;
                            render.xianGouNums -= buyNums;
                        }
                    }
                });
            }
            /**
             * 货币数量刷新
             */
            huoBiRefresh(type) {
                switch (type) {
                    case MoneyTypes.YuanBao:
                        this._itemHuoBiDiamond.huoBiNums = type;
                        break;
                    case MoneyTypes.BindYuanBao:
                        this._itemHuoBiBindDiamond.huoBiNums = type;
                        break;
                    case MoneyTypes.TongQian:
                        this._itemHuoYinBi.huoBiNums = type;
                        break;
                }
            }
            /**
             * 抢购时间倒计时
             */
            countDownTime() {
                Laya.timer.loop(1000, this, this.getQiangGouLeftTimeString);
            }
            /**
             * 抢购时间清理
             */
            countDownTimeOver() {
                Laya.timer.clear(this, this.getQiangGouLeftTimeString);
            }
            /**
             * 抢购剩余时间
             */
            getQiangGouLeftTimeString() {
                var leftTimeString = ConfigLoca.UI_COMMON_FinishedTitle;
                const nowTicks = TimeManager.getCorrectLocalTime(); // / 10000;//毫秒
                const leftSecs = (this.mQiangGouEndTicks - nowTicks) / 1000;
                //Global.Log.Error("nowTicks = " + nowTicks + "   this.mQiangGouEndTicks = " + this.mQiangGouEndTicks + "   cha = " + leftSecs);
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
                }
                else {
                    this._labBuyTimes.text = leftTimeString;
                }
            }
            /**
             * 没有商品状态显示
             * @param state
             */
            noHasGoodsShow(state) {
                this._imageNoHas.visible = this._textNoHas.visible = state;
            }
        }
        Mall.MallPart = MallPart;
    })(Mall = MyUI.Mall || (MyUI.Mall = {}));
})(MyUI || (MyUI = {}));
//# sourceMappingURL=MallPart.js.map