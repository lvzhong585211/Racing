var MyUI;
(function (MyUI) {
    var Handler = laya.utils.Handler;
    var Log = Global.Log;
    /**
     * 物品类道具Tip
     */
    class GoodsTip extends ui.tip.GoodsTipUI {
        constructor() {
            super();
            this.PriceTypeIndex = 0; // 价格类型
            this.BuyOnePrice = 0; // 物品单价
            this.BuyNum = 0; // 数量
            this.MaxBuyNum = 0; // 当前价格类型可以购买的最大数量
            this.CaifenNum = 0; // 拆分数量
            this.MaxCaifenNum = 0; // 当前物品可拆分的最大数量，总数-1
            this.goodsID = 0; // 当前物品的GoodsID
            this._goodsData = null; // 当前物品的数据
            this._goodsOwner = GoodsOwnerTypes.None; // 物品所属类型
            this.m_nEndTime = 0; // 道具有效结束时间
            this._btnUse.label = Loca.getLang("使用");
            this._btnSale.label = Loca.getLang("出售");
            this._btnPutIn.label = Loca.getLang("放入");
            this._btnGetBack.label = Loca.getLang("取回");
            this._btnUpShelf.label = Loca.getLang("上架");
            this._btnDestroy.label = Loca.getLang("摧毁");
            this._btnBuy.label = Loca.getLang("购买");
            this._txtTitleSplit.text = Loca.getLang("数量：");
            this._btnUse.disabled = true;
            this._btnSale.disabled = true;
            this._btnPutIn.disabled = true;
            this._btnGetBack.disabled = true;
            this._btnUpShelf.disabled = true;
            this._btnDestroy.disabled = true;
            this._btnBuy.disabled = true;
            this._txtTitleSplit.disabled = true;
            MyUI.prepareCSSStyle(this._txtType.style);
            MyUI.prepareCSSStyle(this._txtLevel.style);
            MyUI.prepareCSSStyle(this._txtOccu.style);
            MyUI.prepareCSSStyle(this._txtValidTime.style);
            MyUI.prepareCSSStyle(this._txtPrice.style);
            MyUI.prepareCSSStyle(this._txtCount.style, "right");
            MyUI.prepareCSSStyle(this._txtDesc.style, "left", 18, `#${MyUI.ColorCode.normal}`);
            // 出售按钮点击处理
            this._btnSale.clickHandler = new Handler(null, () => {
                if (this._goodsData) {
                    if (tableMgr.goodsTable.isValuable(this._goodsData.GoodsID) && (Super.MessageBoxIsHint[MessBoxIsHintTypes.ImportantGoodsSaleNeedHint] === 0)) {
                        // TODO: 弹窗		
                        // GChildWindow messageBoxWindow = Super.ShowMessageBox(Loca.getLang("提示"), Loca.getLang("此物品比较贵重，是否确认出售？"), 2, null, MessBoxIsHintTypes.ImportantGoodsSaleNeedHint);
                        // messageBoxWindow.ChildWindowClose = (s1, e1) => {
                        // 	int messageBoxReturn = messageBoxWindow.MessageBoxReturn;
                        // 	Super.CloseMessageBox(Container, messageBoxWindow);
                        // 	if (messageBoxReturn == 0) {
                        // 		TipsCallBack(TipsOperationTypes.Chushou);
                        // 	}
                        // 	return true;
                        // };
                    }
                    else {
                        this.TipsCallBack(TipsOperationTypes.Chushou);
                    }
                }
            });
            // 放入按钮点击处理
            this._btnPutIn.clickHandler = new Handler(null, () => this.TipsCallBack(TipsOperationTypes.Fangru));
            // 取回按钮点击处理
            this._btnGetBack.clickHandler = new Handler(null, () => this.TipsCallBack(TipsOperationTypes.Quhui));
            // 上架按钮点击处理
            this._btnUpShelf.clickHandler = new Handler(null, () => this.TipsCallBack(TipsOperationTypes.ShangJia));
            // 最大按钮点击处理
            this._btnSplit.clickHandler = new Handler(null, () => {
                const num = parseInt(this._txtSplitNum.text);
                if (this._btnSplit.name === TipsOperationTypes.Caifen.toString()) {
                    if (num > this.MaxCaifenNum) {
                        uiMgr.hintText(Loca.getLang("超过了最大可拆分的数量！"));
                    }
                    else if (num > 0) {
                        this.TipsCallBack(TipsOperationTypes.Caifen, num);
                    }
                    else {
                        uiMgr.hintText(Loca.getLang("输入的数量不正确！"));
                    }
                }
                if (this._btnSplit.name === TipsOperationTypes.Max.toString()) {
                    let nGridNum = 0;
                    if (this._btnBuy.name === TipsOperationTypes.Goumai.toString()) {
                        nGridNum = this.MaxBuyNum;
                    }
                    else {
                        nGridNum = tableMgr.goodsTable.getGridNum(this._goodsData.GoodsID);
                    }
                    this._txtSplitNum.text = nGridNum.toString();
                    if (nGridNum < this.MaxBuyNum) { // 金币满足购买最大数量
                        this._txtSplitNum.color = `#${MyUI.ColorCode.value}`;
                    }
                    else { // 金币不足购买最大数量 执行相同逻辑 
                        this._txtSplitNum.color = `#${MyUI.ColorCode.red}`;
                    }
                    // 王者就是最大
                    if (this._goodsOwner === GoodsOwnerTypes.WangZheShangCheng) {
                        nGridNum = this.MaxBuyNum;
                        this._txtSplitNum.color = `#${MyUI.ColorCode.white}`;
                    }
                    this.BuyNum = nGridNum;
                    this.RefreshPrice(nGridNum);
                }
            });
            // 购买按钮点击处理
            this._btnBuy.clickHandler = Handler.create(null, () => {
                let num = parseInt(this._txtSplitNum.text);
                if (this._btnBuy.name === TipsOperationTypes.Goumai.toString() || this._btnBuy.name === TipsOperationTypes.JiaoYiShuoGouMai.toString()) {
                    if (this._btnBuy.name === TipsOperationTypes.JiaoYiShuoGouMai.toString()) {
                        num = 1;
                    }
                    if (9999 < num) {
                        uiMgr.hintText(Loca.getLang("输入数量错误！"));
                        this._txtSplitNum.text = "1";
                        return;
                    }
                    if (num > this.MaxBuyNum) {
                        if (this.PriceTypeIndex === GoodsPriceUnitTypes.Jinbi || this.PriceTypeIndex === GoodsPriceUnitTypes.BindJinBi) {
                            const t_OnePrice = this.BuyOnePrice;
                            // 点击花费金币执行请求
                            const costJinBihandler = (sender, args) => {
                                if (0 === args.ID) { // 确定
                                    if (((Global.Data.roleData.YinLiang + Global.Data.roleData.Money1) / (t_OnePrice * num)) <= 0) {
                                        // TODO: 显示某窗口
                                        // Super.ShowGuideWindow(BaodianGuidePart.GuideType.NeedJinbi, callback);
                                    }
                                    else {
                                        this.TipsCallBack(TipsOperationTypes.Goumai, num);
                                    }
                                }
                                else {
                                    // TODO: 显示某窗口
                                    // Super.ShowGuideWindow(BaodianGuidePart.GuideType.NeedJinbi, callback);
                                }
                            };
                            // TODO:
                            // //客户端绑金是否充足判断
                            // bool isSuccess = PlayZone.GlobalPlayZone.ToastCostJinBiMessageWindows(BuyOnePrice * num, costJinBihandler);
                        }
                        else if (this.PriceTypeIndex === GoodsPriceUnitTypes.Zhuanshi) {
                            // TODO:			
                            // Super.ShowGuideWindow(BaodianGuidePart.GuideType.NeedZuanshi, callback);
                        }
                        else if (this.PriceTypeIndex === GoodsPriceUnitTypes.BindZhuanshi) {
                            // TODO:			
                            // Super.ShowGuideWindow(BaodianGuidePart.GuideType.NeedZuanshi, callback);
                        }
                        else {
                            uiMgr.hintText(Global.String.Format(Loca.getLang("{0}不足"), MyUI.GTipServiceEx.GetPriceInfoUnit(this.PriceTypeIndex)));
                        }
                    }
                    else if (num > 0) {
                        if (this._btnBuy.name === TipsOperationTypes.JiaoYiShuoGouMai.toString()) {
                            this.TipsCallBack(TipsOperationTypes.JiaoYiShuoGouMai, num);
                        }
                        else {
                            this.TipsCallBack(TipsOperationTypes.Goumai, num);
                        }
                    }
                    else {
                        uiMgr.hintText(Loca.getLang("输入的数量不正确！"));
                    }
                }
                else if (this._btnBuy.name === TipsOperationTypes.OtherStallGouMai.toString()) {
                    this.TipsCallBack(TipsOperationTypes.OtherStallGouMai, 0);
                }
            }, undefined, false);
            // 输入数字框点击处理
            this._txtSplitNum.on(laya.events.Event.CLICK, null, () => {
                if (this._btnBuy.name !== TipsOperationTypes.JiaoYiShuoGouMai.toString()) {
                    // TODO: 输入数字弹窗
                    // PlayZone.GlobalPlayZone.OpenNumberKeyboardPart(DPSelectedItemNum, FootBuyTxtNum);
                }
            });
            // 增加按钮点击处理
            this._btnPlus.clickHandler = new Handler(null, () => {
                this.AddNum();
            });
            // 减少按钮点击处理
            this._btnMinus.clickHandler = new Handler(null, () => {
                this.SubNum();
            });
        }
        /**
         * 更新Tip显示
         * @param goodsOwner
         * @param goodsData
         * @param selfBagOnly
         * @param priceInfo
         */
        RenderTips(goodsOwner, goodsData, selfBagOnly, priceInfo = null) {
            this.goodsID = goodsData.GoodsID;
            this._goodsData = goodsData;
            this._goodsOwner = goodsOwner;
            GoodsTip.LastGoodsID = this.goodsID;
            this.SetText(goodsOwner, goodsData, priceInfo);
            this.SetMenus(goodsOwner, goodsData, selfBagOnly);
            this.SetPropsPanel(goodsOwner, goodsData);
            // TODO: 引导
            // let categoriy = Global.GetCategoriyByGoodsID(goodsData.GoodsID);
            // if (categoriy == ItemCategories.ItemMengchongEgg) {
            // 	SystemHelpMgr.OnAction(UIObjIDs.Loong_Mengchong_BagIconClick, HelpStateEvents.Clicked);
            // }
        }
        /**
         * 设置Tip文本显示
         * @param goodsOwner
         * @param goodsData
         * @param priceInfo
         */
        SetText(goodsOwner, goodsData, priceInfo = null) {
            const voGoods = tableMgr.goodsTable.Find(goodsData.GoodsID);
            Log.Assert(voGoods != null, `can't find goodsVO!!! (goodsID = ${goodsData.GoodsID})`);
            let sColor = MyUI.ColorCode.value;
            //#region ======== 道具名字 ========
            this._txtTitle.color = `#${voGoods.GoodsColor}`;
            this._txtTitle.text = Loca.getLang(voGoods.Title);
            //#endregion
            //#region ======== 道具图标 ========
            this._goodsIcon.updateByGoodsVO(voGoods);
            //#endregion
            //#region ======== 道具类型 ========
            this._txtType.innerHTML = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("类型："), MyUI.ColorCode.value, Global.GetGoodsType(voGoods.Categoriy));
            //#endregion
            //#region ======== 使用等级 ========
            const nNeedLifeCnt = voGoods.ToZhuanSheng;
            const nNeedLv = Math.max(voGoods.ToLevel, 1);
            const sLvCondi = UIHelper.FormatLevelLimit(nNeedLv, nNeedLifeCnt);
            sColor = MyUI.ColorCode.value;
            if (!Global.validLevel(nNeedLifeCnt, nNeedLv)) {
                sColor = MyUI.ColorCode.no;
            }
            this._txtLevel.innerHTML = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("使用等级: "), sColor, sLvCondi);
            //#endregion
            //#region ======== 适用职业 ========
            sColor = MyUI.ColorCode.value;
            if (voGoods.ToOccupation >= 0) {
                if (0 === ((1 << Global.CalcOriginalOccupationID(Global.Data.roleData.Occupation)) & voGoods.ToOccupation)) {
                    sColor = MyUI.ColorCode.no;
                }
                const OccupationStr = Global.GetOccupationStrByGoods(voGoods.ToOccupation);
                this._txtOccu.innerHTML = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("适用职业: "), sColor, OccupationStr);
            }
            else {
                this._txtOccu.innerHTML = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("适用职业: "), sColor, ConfigLoca.UI_OCCUPATION_COMMON_USE);
            }
            //#endregion
            //#region ======== 道具描述 ========
            if (Global.String.IsNullOrWhiteSpace(voGoods.Description)) {
                this._txtDesc.innerHTML = "";
            }
            else {
                this._txtDesc.innerHTML = Loca.getLang(voGoods.Description);
            }
            //#endregion
            //#region ======== 有效时间 ========
            this.m_nEndTime = 0;
            if (goodsData.Endtime && goodsData.Endtime !== Global.ConstGoodsEndTime) {
                let time_str = "";
                let desc_str = "";
                if (goodsData.Endtime.indexOf("-") !== -1) {
                    this.m_nEndTime = Date.parse(goodsData.Endtime);
                    const nNowTime = Date.now();
                    time_str = TimeManager.formatMilliseconds(this.m_nEndTime - nNowTime);
                    desc_str = Loca.getLang("有效时间") + "：";
                }
                else {
                    time_str = goodsData.Endtime + Loca.getLang("分钟");
                    desc_str = Loca.getLang("领取后有效时间：");
                }
                this._txtValidTime.innerHTML = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, desc_str, MyUI.ColorCode.green, time_str);
                // this._txtValidTime.layoutEnabled = this._txtValidTime.visible = true;
                Laya.timer.loop(1000, this, this._inner_loop);
            }
            else { // 非时效性物品
                this._txtValidTime.innerHTML = "";
                // this._txtValidTime.layoutEnabled = this._txtValidTime.visible = false;
            }
            //#endregion
            //#region ======== 使用限制 ========
            this._txtLimited.text = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("使用限制") + "：");
            if (goodsData) {
                const mapLimit = Global.GetGoodsToTypeLimitString(goodsData.GoodsID);
                for (const [key, value] of mapLimit) {
                    if (value === 1) { // 如果条件通过就显示绿色
                        this._txtLimited.color = `#${MyUI.ColorCode.zhuoYue1}`;
                        this._txtLimited.text += key; // Global.GetColorStringForNGUIText(ColorCode.zhuoYue1, key);
                    }
                    else { // 否则就显示红色
                        this._txtLimited.color = `#${MyUI.ColorCode.no}`;
                        this._txtLimited.text += key; // Global.GetColorStringForNGUIText(ColorCode.no, key);
                    }
                }
                this._txtLimited.layoutEnabled = this._txtLimited.visible = mapLimit.size > 0;
            }
            //#endregion
            //#region ======== 道具数量 ========
            let nGoodsCnt = goodsData.GCount;
            if (goodsData.Id < 0 && goodsOwner === GoodsOwnerTypes.None) { // 当物品个数小于等于0时,且dbID < 0，说明需要根据goodsid显示tips，这时数量显示包裹内部所有数量
                nGoodsCnt = Global.GetTotalGoodsCountByID(goodsData.GoodsID);
            }
            if (voGoods.UsingNum > 1) {
                this._txtCount.innerHTML = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("剩余次数:"), MyUI.ColorCode.value, nGoodsCnt);
            }
            else {
                if (nGoodsCnt <= 0)
                    nGoodsCnt = 1; // 既然有物品Tips，且显示数量文本,则该物品必然有1个，这里强制将物品数量为0且显示物品数量文本的Tips的物品数量修正为1最小值
                this._txtCount.innerHTML = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("数量:"), MyUI.ColorCode.value, nGoodsCnt);
            }
            //#endregion
            //#region ======== 道具价格 ========
            this._txtPrice.innerHTML = "";
            this._imgMoney.skin = null;
            if (goodsOwner === GoodsOwnerTypes.mallSale || goodsOwner === GoodsOwnerTypes.NPCSale
                || goodsOwner === GoodsOwnerTypes.OtherOnSale || goodsOwner === GoodsOwnerTypes.JiaoYiShuo
                || goodsOwner === GoodsOwnerTypes.WangZheShangCheng) {
                if (priceInfo) {
                    const fields = priceInfo.split(",");
                    if (fields.length !== 2) {
                        return;
                    }
                    this.PriceTypeIndex = parseInt(fields[0]);
                    const priceInfoUnit = MyUI.GTipServiceEx.GetPriceInfoUnit(this.PriceTypeIndex);
                    this.BuyOnePrice = parseInt(fields[1]);
                    this.MaxBuyNum = MyUI.GTipServiceEx.GetMaxBuyNum(this.PriceTypeIndex, this.BuyOnePrice);
                    const netMaxBuyNum = Global.GetGoodsGridNumByIDOfMall(goodsData.GoodsID);
                    this.MaxBuyNum = Math.min(this.MaxBuyNum, netMaxBuyNum);
                    this.BuyNum = 1;
                    if (goodsOwner === GoodsOwnerTypes.WangZheShangCheng) {
                        // TODO:
                        // MallItem mi = null;
                        // if (PlayZone.GlobalPlayZone != null && PlayZone.GlobalPlayZone.kuaFuWangZheMallPart != null) {
                        // 	mi = PlayZone.GlobalPlayZone.kuaFuWangZheMallPart.GetMallItemByGoodID(_goodsData.GoodsID);
                        // }
                        // if (mi != null) {
                        // 	MaxBuyNum = mi.nXianGouLeft;
                        // }
                    }
                    else if (goodsOwner === GoodsOwnerTypes.JiaoYiShuo) {
                        this.MaxBuyNum = goodsData.GCount;
                    }
                    if (goodsOwner === GoodsOwnerTypes.JiaoYiShuo) { // 交易所特殊处理
                        this._txtSplitNum.text = goodsData.GCount.toString();
                    }
                    else {
                        this._txtSplitNum.text = this.BuyNum.toString();
                        if (goodsOwner === GoodsOwnerTypes.OtherOnSale) {
                            if (SaleGoodsConsts.BaiTanJinBiGoodsID === goodsData.GoodsID) {
                                this._txtSplitNum.text = goodsData.Quality ? goodsData.Quality.toString() : "0";
                            }
                            else {
                                this._txtSplitNum.text = goodsData.GCount.toString();
                            }
                        }
                    }
                    this.RefreshPrice();
                }
            }
            else if (goodsOwner === GoodsOwnerTypes.SelfBag || goodsOwner === GoodsOwnerTypes.ChatGoods) {
                let price = 0;
                if (goodsData) {
                    price = Global.GetGoodsSaleToNpcPrice(goodsData); // 叠加参数不用管，现在不能叠加物品，物品个数都是一个
                    if (price <= 0) {
                        price = Global.GetGoodsSaleToNpcZaizao(goodsData);
                        this._imgMoney.skin = null; // "zaizao"; // 没有该图标，暂时置空
                    }
                    else {
                        if (goodsData.Binding > 0) {
                            this._imgMoney.skin = Global.getCommonAtlasImgPath("money_gold_binding");
                        }
                        else {
                            this._imgMoney.skin = Global.getCommonAtlasImgPath("money_gold");
                        }
                    }
                }
                if (price > 0) {
                    this._txtPrice.innerHTML = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("售价: "), MyUI.ColorCode.value, price);
                    this._imgMoney.x = this._txtPrice.x + this._txtPrice.contextWidth + 3;
                }
                else {
                    this._imgMoney.skin = null;
                }
                if (1 === voGoods.NoSaleOut) {
                    this._txtPrice.innerHTML = Global.GetColorStringForNGUIText(MyUI.ColorCode.no, Loca.getLang("不可出售"));
                    this._imgMoney.skin = null;
                }
            }
            else if (goodsOwner === GoodsOwnerTypes.SysGifts || goodsOwner === GoodsOwnerTypes.SelfStall || goodsOwner === GoodsOwnerTypes.None) {
                this._txtPrice.innerHTML = "";
                this._imgMoney.skin = null;
            }
            //#endregion
        }
        /**
         * 设置Tip上的按钮显示
         * @param goodsOwner
         * @param goodsData
         * @param selfBagOnly
         */
        SetMenus(goodsOwner, goodsData, selfBagOnly) {
            this._btnUse.label = Loca.getLang("使用");
            this._btnUse.clickHandler = new Handler(null, () => {
                if (this._goodsData) {
                    if (Global.IsCanUseGoodsByGongnengID(this._goodsData.GoodsID)) {
                        const goodVO = tableMgr.goodsTable.Find(this._goodsData.GoodsID);
                        const isBatchUse = goodVO.PiLiangUse;
                        Global.ToUseGoods(this._goodsData, true, isBatchUse);
                        // TODO: 引导
                        // SystemHelpMgr.OnAction(UIObjIDs.UseGoodsBtn, HelpStateEvents.Clicked);
                        windowMgr.closeWindow(WindowID.GoodsTip);
                    }
                }
            });
            // 先隐藏menu中所有的按钮
            MyUI.setActiveChildren(this._groupButton, false);
            const goodVO = tableMgr.goodsTable.Find(goodsData.GoodsID);
            if (goodsOwner === GoodsOwnerTypes.SelfBag) {
                if (!selfBagOnly) { // 出售、仓库、交易时，在背包中点击时多一个：放入
                    MyUI.showNodeWithLayout(this._btnPutIn);
                }
                if (!goodVO) {
                    return;
                }
                if (ItemCategories.Fashion === goodVO.Categoriy) {
                    MyUI.showNodeWithLayout(this._btnUse);
                }
                else if (goodVO.Categoriy === ItemCategories.ItemMengchongEgg) {
                    this._btnUse.label = Loca.getLang("入库");
                    this._btnUse.clickHandler = new Handler(null, () => {
                        this.TipsCallBack(TipsOperationTypes.UseMengchong);
                    });
                    MyUI.showNodeWithLayout(this._btnUse);
                }
                else {
                    // 先判断物品是否可以直接使用
                    if (Global.CanDirectUseGoods(goodsData.GoodsID, false)) {
                        MyUI.showNodeWithLayout(this._btnUse);
                    }
                    else {
                        const uiGuanLianType = goodVO.GlUI;
                        if (uiGuanLianType > 0) {
                            MyUI.showNodeWithLayout(this._btnUse);
                        }
                    }
                }
                if (Super.CanSaleOutGoods(goodsData)) {
                    MyUI.showNodeWithLayout(this._btnSale);
                }
                if (Global.g_bIsTipsShowCuiHuiBtn && ItemCategories.ItemMengchongEgg !== goodVO.Categoriy) {
                    MyUI.showNodeWithLayout(this._btnDestroy);
                }
            }
            else if (goodsOwner === GoodsOwnerTypes.JiaoYiShuo) {
                // TODO: 交易Tip显示
                // m_BtnMaxNum.isEnabled = false;
                // m_BtnMaxNum.gameObject.SetActive(false);
                // BuyNumIcon.gameObject.SetActive(true);
                // IconSpriteBak.gameObject.SetActive(true);
            }
            else if (goodsOwner === GoodsOwnerTypes.NPCSale || goodsOwner === GoodsOwnerTypes.mallSale || goodsOwner === GoodsOwnerTypes.WangZheShangCheng) {
                this._btnBuy.visible = true;
            }
            else if (goodsOwner === GoodsOwnerTypes.Exchange || goodsOwner === GoodsOwnerTypes.SelfPet || goodsOwner === GoodsOwnerTypes.SelfPet) {
                // 出售、仓库、交易窗口中的物品点击时，只显示：取回
                MyUI.showNodeWithLayout(this._btnGetBack);
            }
            else if (goodsOwner === GoodsOwnerTypes.SelfBagNoMenu) {
                // 不处理
            }
            else if (goodsOwner === GoodsOwnerTypes.SelfStall) {
                if (0 >= goodsData.Binding && !Global.IsTimeLimitGoods(goodsData)) {
                    if (goodVO.Categoriy !== ItemCategories.ItemTask) {
                        MyUI.showNodeWithLayout(this._btnUpShelf);
                    }
                }
            }
            else if (goodsOwner === GoodsOwnerTypes.Guide) {
                if (Global.CanDirectUseGoods(goodsData.GoodsID, false)) {
                    MyUI.showNodeWithLayout(this._btnUse);
                }
                else { // 判读如果是礼包，要显示出使用按钮
                    if (goodVO.Categoriy === ItemCategories.ItemNormalPack || goodVO.Categoriy === ItemCategories.ItemUpPack) {
                        MyUI.showNodeWithLayout(this._btnUse);
                    }
                }
            }
        }
        /**
         * 设置属性面板
         * @param goodsOwner
         * @param goodsData
         */
        SetPropsPanel(goodsOwner, goodsData) {
            // 设置拆分组的显示
            if (goodsOwner === GoodsOwnerTypes.NPCSale || goodsOwner === GoodsOwnerTypes.mallSale
                || goodsOwner === GoodsOwnerTypes.OtherOnSale || goodsOwner === GoodsOwnerTypes.JiaoYiShuo
                || goodsOwner === GoodsOwnerTypes.WangZheShangCheng) {
                if (goodsOwner === GoodsOwnerTypes.JiaoYiShuo) {
                    this._btnBuy.name = TipsOperationTypes.JiaoYiShuoGouMai.toString();
                    this._btnSplit.label = Loca.getLang("最大");
                    this._btnSplit.visible = false;
                    this._btnPlus.visible = false;
                    this._btnMinus.visible = false;
                }
                else {
                    if (goodsOwner === GoodsOwnerTypes.OtherOnSale) {
                        this._btnBuy.name = TipsOperationTypes.OtherStallGouMai.toString();
                        this._btnPlus.visible = false;
                        this._btnMinus.visible = false;
                    }
                    else {
                        this._btnBuy.name = TipsOperationTypes.Goumai.toString();
                        this._btnPlus.visible = true;
                        this._btnMinus.visible = true;
                    }
                }
                this._btnBuy.label = Loca.getLang("购买");
                if (goodsOwner !== GoodsOwnerTypes.JiaoYiShuo) {
                    this._btnSplit.name = TipsOperationTypes.Max.toString();
                    this._btnSplit.label = Loca.getLang("最大");
                }
                MyUI.showNodeWithLayout(this._groupSplit);
            }
            else {
                if (goodsOwner === GoodsOwnerTypes.SelfBag && goodsData.GCount > 1
                    && Global.GetGoodsToTypeLimitString(goodsData.GoodsID).size === 0
                    && (goodsData.Endtime == null || goodsData.Endtime === Global.ConstGoodsEndTime)) {
                    this._btnBuy.name = TipsOperationTypes.Caifen.toString();
                    this._btnSplit.name = TipsOperationTypes.Caifen.toString();
                    this._btnSplit.label = Loca.getLang("拆分");
                    this._btnSplit.visible = true;
                    this.MaxCaifenNum = goodsData.GCount - 1;
                    this.CaifenNum = 1;
                    this._txtSplitNum.text = this.CaifenNum.toString();
                    this._btnPlus.visible = true;
                    this._btnMinus.visible = true;
                    MyUI.showNodeWithLayout(this._groupSplit);
                }
                else {
                    MyUI.hideNodeWithLayout(this._groupSplit);
                }
            }
            // 设置按钮个数及按钮宽度
            const aBtns = [];
            const nCnt = this._groupButton.numChildren;
            for (let nIdx = 0; nIdx < nCnt; nIdx++) {
                const child = this._groupButton.getChildAt(nIdx);
                if (child.visible) {
                    aBtns.push(child);
                }
            }
            this._groupButton.layoutEnabled = this._groupButton.visible = aBtns.length > 0;
            if (aBtns.length > 0) {
                const nBtnW = Math.floor((this._groupButton.width - (aBtns.length - 1) * this._groupButton.space) / aBtns.length);
                aBtns.forEach(element => {
                    element.width = nBtnW;
                });
            }
            this._groupContent.refresh();
            // 设置底板背景的高度
            this.callLater(() => this._contentBg.height = this._groupContent.height + 10);
        }
        _inner_loop() {
            if (this.m_nEndTime <= 0) {
                Laya.timer.clear(this, this._inner_loop);
                return;
            }
            const nDiffTime = this.m_nEndTime - Date.now();
            if (nDiffTime < 0) {
                Laya.timer.clear(this, this._inner_loop);
                return;
            }
            const time_str = TimeManager.formatMilliseconds(nDiffTime);
            const desc_str = Loca.getLang("有效时间") + "：";
            this._txtValidTime.innerHTML = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, desc_str, MyUI.ColorCode.green, time_str);
        }
        /**
         * 刷新价格
         */
        RefreshPrice(tempBuyNum = -1) {
            if (tempBuyNum === -1)
                tempBuyNum = this.BuyNum;
            const price = this.BuyOnePrice * tempBuyNum;
            const fontColor = (tempBuyNum <= this.MaxBuyNum) ? MyUI.ColorCode.value : MyUI.ColorCode.no;
            this._txtPrice.innerHTML = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("总价: "), fontColor, price);
            // 价格大于0时，算一下钻石图标的位置
            if (price > 0)
                this._imgMoney.x = this._txtPrice.x + this._txtPrice.contextWidth + 3;
            this._imgMoney.skin = Global.getCommonAtlasImgPath(MyUI.GTipServiceEx.PriceIconUnits[this.PriceTypeIndex]);
            if (tempBuyNum <= this.MaxBuyNum) {
                this._txtSplitNum.color = `#${MyUI.ColorCode.value}`;
                this._btnBuy.disabled = false;
            }
            else {
                this._txtSplitNum.color = `#${MyUI.ColorCode.red}`;
                this._btnBuy.disabled = true;
            }
        }
        /**
         * 增加数字
         */
        AddNum() {
            if (this._btnBuy.name === TipsOperationTypes.Goumai.toString()) {
                const factor = this.BuyNum.toString().length;
                let step = 0;
                if (factor >= 3) {
                    step = Math.floor(Math.pow(10, factor - 2));
                }
                else {
                    step = Math.floor(Math.pow(10, factor - 1));
                }
                this.BuyNum = Math.min(this.BuyNum + step, this.MaxBuyNum);
                this._txtSplitNum.text = this.BuyNum.toString();
                this.RefreshPrice();
            }
            else if (this._btnSplit.name === TipsOperationTypes.Caifen.toString()) {
                this.CaifenNum = Math.min(++this.CaifenNum, this.MaxCaifenNum);
                this._txtSplitNum.text = this.CaifenNum.toString();
            }
        }
        /**
         * 减少数字
         */
        SubNum() {
            if (this._btnBuy.name === TipsOperationTypes.Goumai.toString()) {
                const factor = this.BuyNum.toString().length;
                this.BuyNum = Math.max(this.BuyNum - Math.floor(Math.pow(10, Math.max(factor - 2, 0))), 1);
                this._txtSplitNum.text = this.BuyNum.toString();
                this.RefreshPrice();
            }
            else if (this._btnSplit.name === TipsOperationTypes.Caifen.toString()) {
                this.CaifenNum = Math.max(--this.CaifenNum, 1);
                this._txtSplitNum.text = this.CaifenNum.toString();
            }
        }
        /**
         * Tip上的操作回调
         * @param type
         * @param id
         */
        TipsCallBack(type, id = 0) {
            this.DPSelectedItem(this, new DPSelectedItemEventArgs(TipsOperationTypes.Close, 0));
            if (type > TipsOperationTypes.Close && type < TipsOperationTypes.Max || type === TipsOperationTypes.UseMengchong) {
                if (null != MyUI.GTipServiceEx.TipsSender && null != MyUI.GTipServiceEx.TipsSender.DPSelectedItem) {
                    MyUI.GTipServiceEx.TipsSender.DPSelectedItem(this, new DPSelectedItemEventArgs(type, id));
                }
            }
            if (TipsOperationTypes.ShangJia === type) {
                this.DPSelectedItem(this, new DPSelectedItemEventArgs(TipsOperationTypes.ShangJia));
            }
        }
        onClosed(type) {
            MyUI.GTipServiceEx.ClearChildWindow();
        }
    }
    MyUI.GoodsTip = GoodsTip;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=GoodsTip.js.map