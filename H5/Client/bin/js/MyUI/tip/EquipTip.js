var MyUI;
(function (MyUI) {
    var Handler = laya.utils.Handler;
    /**
     * 装备类道具Tip
     */
    class EquipTip extends ui.tip.EquipTipUI {
        constructor() {
            super();
            this.BuyNum = 0; // 数量
            this.BuyOnePrice = 0; // 物品单价
            this.PriceTypeIndex = 0; // 价格类型
            this.MaxBuyNum = 0; // 当前价格类型可以购买的最大数量
            this.m_nDBID = 0; // 当前Tip的道具DBID
            this.ChineseNum = [Loca.getLang("零"), Loca.getLang("一"), Loca.getLang("二"), Loca.getLang("三"), Loca.getLang("四"),
                Loca.getLang("五"), Loca.getLang("六"), Loca.getLang("七"), Loca.getLang("八"), Loca.getLang("九"), Loca.getLang("十")]; // 中文数字
            this.zuoyueSpriteNames = ["tip_chuanshuo_lv", "tip_chuanshuo_lan", "tip_chuanshuo_zi"]; // 卓越属性图片名称
            this._btnWear.label = Loca.getLang("佩戴");
            this._btnTakeOff.label = Loca.getLang("卸下");
            this._btnProcess.label = Loca.getLang("加工");
            this._btnSale.label = Loca.getLang("出售");
            this._btnPutIn.label = Loca.getLang("放入");
            this._btnGetBack.label = Loca.getLang("取回");
            this._btnUpShelf.label = Loca.getLang("上架");
            this._btnDestroy.label = Loca.getLang("摧毁");
            this._btnBuy.label = Loca.getLang("购买");
            this._btnUse.label = Loca.getLang("列队");
            this._btnScan.label = Loca.getLang("查看");
            this._txtTitleCombat.text = Loca.getLang("战斗力");
            this._txtTitleBasic.text = Loca.getLang("[基础属性]");
            this._txtTitleAddition.text = Loca.getLang("[附加属性]");
            this._txtTitleRefined.text = Loca.getLang("[炼化属性]");
            this._txtTitleRandom.text = Loca.getLang("[随机属性]");
            this._txtTitleLucky.text = Loca.getLang("[幸运属性]");
            this._txtTitleRebirth.text = Loca.getLang("[重生属性]");
            this._btnProcess.disabled = true;
            this._btnSale.disabled = true;
            this._btnPutIn.disabled = true;
            this._btnGetBack.disabled = true;
            this._btnUpShelf.disabled = true;
            this._btnDestroy.disabled = true;
            this._btnBuy.disabled = true;
            this._btnUse.disabled = true;
            this._btnScan.disabled = true;
            MyUI.prepareCSSStyle(this._txtTitle.style, "center", 22);
            MyUI.prepareCSSStyle(this._txtOccu.style, "right", 18);
            MyUI.prepareCSSStyle(this._txtLevel.style);
            MyUI.prepareCSSStyle(this._txtCondition0.style);
            MyUI.prepareCSSStyle(this._txtCondition1.style);
            MyUI.prepareCSSStyle(this._txtCondition2.style);
            MyUI.prepareCSSStyle(this._txtCondition3.style);
            MyUI.prepareCSSStyle(this._txtBasic.style);
            MyUI.prepareCSSStyle(this._txtAddition.style, "left", 18, "#bbad6a");
            MyUI.prepareCSSStyle(this._txtRefined.style);
            MyUI.prepareCSSStyle(this._txtRandom.style, "left", 18, `#${MyUI.ColorCode.zhuoYue1}`);
            MyUI.prepareCSSStyle(this._txtLucky.style, "left", 18, `#8a85de`);
            MyUI.prepareCSSStyle(this._txtRebirth.style);
            MyUI.prepareCSSStyle(this._txtDurability.style, "right");
            MyUI.prepareCSSStyle(this._txtPrice.style);
            // 滚动条
            const scrBar = this._panelContent.vScrollBar;
            scrBar.elasticDistance = 100;
            scrBar.hide = true;
            // 佩戴按钮点击处理
            this._btnWear.clickHandler = new Handler(null, () => {
                if (!MyUI.GTipServiceEx.TipsSender)
                    return;
                const dtGoods = MyUI.GTipServiceEx.TipsSender.goodsData;
                if (!dtGoods)
                    return;
                Global.ToUseGoods(dtGoods);
                windowMgr.closeWindow(WindowID.EquipTip);
            });
            // 卸下按钮点击处理
            this._btnTakeOff.clickHandler = new Handler(null, () => {
                if (!MyUI.GTipServiceEx.TipsSender)
                    return;
                const dtGoods = MyUI.GTipServiceEx.TipsSender.goodsData;
                if (!dtGoods)
                    return;
                const nCategory = tableMgr.goodsTable.getCategoriy(dtGoods.GoodsID);
                if (ItemCategories.ChongWu === nCategory || ItemCategories.ShouHuChong === nCategory) {
                    if (dtGoods.Using === 1) {
                        dtGoods.Using = 0;
                        Net.sendModGoods(ModGoodsTypes.EquipUnload, dtGoods.Id, dtGoods.GoodsID, dtGoods.Using, dtGoods.Site, dtGoods.GCount, dtGoods.BagIndex);
                        windowMgr.closeWindow(WindowID.EquipTip);
                    }
                }
                else if (Global.CanAddGoods(dtGoods.GoodsID, dtGoods.GCount, dtGoods.Binding, dtGoods.Endtime, false)) {
                    if (Global.Data.roleData.MapCode === 8) { // 如果是在火云谷禁止卸载翅膀
                        if (ItemCategories.ChiBang === nCategory) {
                            uiMgr.hintText(Loca.getLang("当前地图中禁止卸载此装备！"));
                            return;
                        }
                    }
                    if (dtGoods.Using === 1) {
                        dtGoods.Using = 0;
                        Net.sendModGoods(ModGoodsTypes.EquipUnload, dtGoods.Id, dtGoods.GoodsID, dtGoods.Using, dtGoods.Site, dtGoods.GCount, dtGoods.BagIndex);
                        windowMgr.closeWindow(WindowID.EquipTip);
                    }
                }
                else {
                    uiMgr.hintText(Loca.getLang("背包已满，请先清理出空闲位置后，再卸载装备..."));
                }
            });
            // 加工按钮点击处理
            this._btnProcess.clickHandler = new Handler(null, () => {
                if (!MyUI.GongnengYugaoMgr.HintGongNengOpened(GongNengIDs.LianLu)) {
                    return;
                }
                this.TipsCallBack(TipsOperationTypes.Jiagong);
                windowMgr.closeWindow(WindowID.Parcel);
                // TODO: 显示装备强化界面
            });
            // 出售按钮点击处理
            this._btnSale.clickHandler = new Handler(null, () => {
                if (this._btnSale.name === "") {
                    this.TipsCallBack(TipsOperationTypes.Chushou);
                }
                else {
                    const id = parseInt(this._btnSale.name);
                    const gd = Global.GetGoodsDataByDbID(id);
                    const goodVO = tableMgr.goodsTable.Find(gd.GoodsID);
                    if (gd) {
                        if (ItemCategories.Fashion === goodVO.Categoriy || ItemCategories.Decoration === goodVO.Categoriy) {
                            uiMgr.hintText(Loca.getLang("该物品无法进行回收！"));
                            this.TipsCallBack(TipsOperationTypes.Close);
                            return;
                        }
                        // 再造功能未开启时，10阶以上装备不能回收
                        if (!(MyUI.GongnengYugaoMgr.IsGongNengOpened(GongNengIDs.ZaiZao)[0])) {
                            if (goodVO.SuitID >= Global.ShenqiZaizaoSuit) {
                                const sName = MyUI.GongnengYugaoMgr.GetGongNengName(GongNengIDs.ZaiZao);
                                uiMgr.hintText(Global.String.Format(Loca.getLang("需要开启【{0}】系统才能回收"), sName));
                                return;
                            }
                        }
                        if (((ItemCategories.ShouHuChong === goodVO.Categoriy || ItemCategories.ChongWu === goodVO.Categoriy)
                            && (goodVO.SuitID >= 3 || (Global.GetZhuoyueAttributeCountByGoodsData(gd) > 1 || gd.ForgeLevel >= 5)))
                            ||
                                (((goodVO.SuitID >= 5 && Global.GetZhuoyueAttributeCountByGoodsData(gd) >= 2)
                                    || (goodVO.SuitID < 5 && Global.GetZhuoyueAttributeCountByGoodsData(gd) >= 4)
                                    || gd.ForgeLevel >= 7 || gd.AppendPropLev >= 20)
                                    && (Super.MessageBoxIsHint[MessBoxIsHintTypes.EquipHuishouNeedHint] === 0))) {
                            if (ItemCategories.ShouHuChong === goodVO.Categoriy || ItemCategories.ChongWu === goodVO.Categoriy) {
                                const str_D = [Loca.getLang("骑宠本体回收"), Loca.getLang("骑宠等级回收"), Loca.getLang("骑宠技能回收")];
                                const money = Global.GetJingLingRecoverAward(gd);
                                Super.ShowJingLingHuiShouMessageBox(Loca.getLang("骑宠回收"), str_D, money, (x, c) => {
                                    if (0 === c.ID)
                                        Net.sendOneKeyQuickSaleOut(OneKeyOTypes.BatchSaleDamon, this._btnSale.name);
                                    this.TipsCallBack(TipsOperationTypes.Close);
                                    return true;
                                });
                            }
                            else {
                                // TODO: 是否回收弹窗
                            }
                        }
                        else {
                            if (ItemCategories.ShouHuChong === goodVO.Categoriy || ItemCategories.ChongWu === goodVO.Categoriy) {
                                Net.sendOneKeyQuickSaleOut(OneKeyOTypes.BatchSaleDamon, this._btnSale.name);
                            }
                            else {
                                Net.sendOneKeyQuickSaleOut(OneKeyOTypes.BatchSaleBack, this._btnSale.name);
                            }
                            this.TipsCallBack(TipsOperationTypes.Close);
                        }
                    }
                }
            });
            // 放入按钮点击处理
            this._btnPutIn.clickHandler = new Handler(null, () => this.TipsCallBack(TipsOperationTypes.Fangru));
            // 取回按钮点击处理
            this._btnGetBack.clickHandler = new Handler(null, () => this.TipsCallBack(TipsOperationTypes.Quhui));
            // 上架按钮点击处理
            this._btnUpShelf.clickHandler = new Handler(null, () => this.TipsCallBack(TipsOperationTypes.ShangJia));
            // 购买按钮点击处理
            this._btnBuy.clickHandler = new Handler(null, () => {
                // TODO:
            });
        }
        /**
         * 更新Tip显示
         * @param goodsOwner
         * @param goodsData
         * @param selfBagOnly
         * @param priceInfo
         * @param handTypes
         */
        RenderTips(goodsOwner, goodsData, selfBagOnly, priceInfo = null, handTypes = -1) {
            this.m_nDBID = goodsData.Id;
            MyUI.GoodsTip.LastGoodsID = goodsData.GoodsID;
            this.SetText(goodsOwner, goodsData, priceInfo, handTypes);
            this.SetMenus(goodsOwner, goodsData, selfBagOnly);
            this.SetPropsPanel(goodsOwner, goodsData);
            this._panelContent.vScrollBar.value = 0;
            // TODO: 宠物技能数据
            // TODO: 引导
            // let categoriy = goodVO.Categoriy;
            // if (categoriy == ItemCategories.ShouHuChong || categoriy == ItemCategories.ChongWu) {
            // 	SystemHelpMgr.OnAction(UIObjIDs.Loong_Qichong_BagIconClick, HelpStateEvents.Clicked);
            // }
        }
        /**
         * 设置Tip文本
         * @param goodsOwner
         * @param goodsData
         * @param priceInfo
         * @param handTypes
         */
        SetText(goodsOwner, goodsData, priceInfo = null, handTypes = -1) {
            const goodVO = tableMgr.goodsTable.Find(goodsData.GoodsID);
            let fontColor = MyUI.ColorCode.zhuoYue0;
            let nPosY = 0;
            //#region ======== 装备名字 ========
            let str0 = "";
            let str1 = "";
            const zhuoyueNum = Global.GetZhuoyueAttributeCount(goodsData.ExcellenceInfo);
            if ((zhuoyueNum > 0) && (zhuoyueNum <= 2)) {
                fontColor = MyUI.ColorCode.zhuoYue1;
                str0 += Loca.getLang(UIHelper.ZuoyueTitleNames[0]);
            }
            else if ((zhuoyueNum >= 3) && (zhuoyueNum <= 4)) {
                fontColor = MyUI.ColorCode.zhuoYue2;
                str0 += Loca.getLang(UIHelper.ZuoyueTitleNames[1]);
            }
            else if ((zhuoyueNum >= 5) && (zhuoyueNum <= 6)) {
                fontColor = MyUI.ColorCode.zhuoYue3;
                str0 += Loca.getLang(UIHelper.ZuoyueTitleNames[2]);
            }
            str0 += Loca.getLang(goodVO.Title);
            if ((ItemCategories.ShouHuChong === goodVO.Categoriy) || (ItemCategories.ChongWu === goodVO.Categoriy) || (ItemCategories.MengChongWu === goodVO.Categoriy)) {
                fontColor = goodVO.GoodsColor;
                str0 = Loca.getLang(goodVO.Title);
            }
            str0 = Global.GetColorStringForNGUIText(fontColor, str0);
            if ((ItemCategories.ShouHuChong !== goodVO.Categoriy) && (ItemCategories.ChongWu !== goodVO.Categoriy) && (ItemCategories.MengChongWu !== goodVO.Categoriy)
                && (ItemCategories.Decoration !== goodVO.Categoriy) && (ItemCategories.Fashion !== goodVO.Categoriy)) {
                if (goodsData.ForgeLevel > 0) {
                    str1 += `+${goodsData.ForgeLevel}`;
                }
                if (goodsData.AppendPropLev > 0) {
                    str1 += Loca.getLang("附") + `${goodsData.AppendPropLev}`;
                }
            }
            if (goodVO.Categoriy === ItemCategories.JieHunJieZhi) {
                this._txtTitle.innerHTML = `${str0}`;
            }
            else {
                this._txtTitle.innerHTML = `${str0}&nbsp;&nbsp;${str1}`;
            }
            //#endregion
            //#region ======== 是否已装备 ========
            this._imgEquiped.visible = goodsData.Using === 1;
            //#endregion
            //#region ======== 物品图片 ========
            this._goodsIcon.updateByGoodsVO(goodVO);
            //#endregion
            //#region ======== 装备阶数 ========
            if ((ItemCategories.ShouHuChong === goodVO.Categoriy) || (ItemCategories.ChongWu === goodVO.Categoriy) || (ItemCategories.MengChongWu === goodVO.Categoriy)) {
                this._txtGrade.text = "";
            }
            else if (goodVO.SuitID > 0) {
                this._txtGrade.color = `#${fontColor}`;
                this._txtGrade.text = Global.String.Format(Loca.getLang("{0}阶装备"), this.GetChineseNum(goodVO.SuitID));
            }
            else {
                this._txtGrade.text = "";
            }
            //#endregion
            //#region ======== 装备类型 ========
            const categoriy = goodVO.Categoriy;
            this._txtType.text = Global.GetGoodsType(categoriy);
            //#endregion
            //#region ======== 战斗力 ========
            this._txtCombat.text = Global.GetGoodsDataZhanLi(goodsData).toString();
            //#endregion
            //#region ======== 适用职业 ========
            fontColor = MyUI.ColorCode.value;
            if ((ItemCategories.ShouHuChong === goodVO.Categoriy) || (ItemCategories.ChongWu === goodVO.Categoriy) || (ItemCategories.MengChongWu === goodVO.Categoriy)) {
                this._txtOccu.innerHTML = Global.GetColorStringForNGUIText(fontColor, ConfigLoca.UI_OCCUPATION_COMMON_USE);
            }
            else if (goodVO.ToOccupation >= 0) {
                if (0 === ((1 << Global.CalcOriginalOccupationID(Global.Data.roleData.Occupation)) & goodVO.ToOccupation)) {
                    fontColor = MyUI.ColorCode.no;
                }
                const OccupationStr = Global.GetOccupationStrByGoods(goodVO.ToOccupation);
                this._txtOccu.innerHTML = Global.GetColorStringForNGUIText(fontColor, Loca.getLang(OccupationStr));
            }
            else {
                this._txtOccu.innerHTML = Global.GetColorStringForNGUIText(fontColor, ConfigLoca.UI_OCCUPATION_COMMON_USE);
            }
            //#endregion
            //#region ======== 使用等级 ========
            const toZhuansheng = goodVO.ToZhuanSheng;
            const level = goodVO.ToLevel;
            fontColor = MyUI.ColorCode.value;
            if (Global.Data.roleData.ChangeLifeCount === toZhuansheng) {
                if (Global.Data.roleData.Level < level) {
                    fontColor = MyUI.ColorCode.no;
                }
            }
            else if (Global.Data.roleData.ChangeLifeCount < toZhuansheng) {
                fontColor = MyUI.ColorCode.no;
            }
            if (toZhuansheng > 0) {
                this._txtLevel.innerHTML = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("所需等级") + ": ", fontColor, Global.String.Format(Loca.getLang("{0}[{1}重]"), level, toZhuansheng));
            }
            else {
                this._txtLevel.innerHTML = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("所需等级") + ": ", fontColor, Math.max(level, 1));
            }
            //#endregion
            //#region ======== 所需条件 ========
            const aTxtCond = [
                this._txtCondition0,
                this._txtCondition1,
                this._txtCondition2,
                this._txtCondition3
            ];
            str0 = "";
            let nTxtIdx = 0;
            if (goodVO.Strength > 0) {
                fontColor = MyUI.ColorCode.value;
                const strength = Math.floor(Global.GetCurrentRoleProp(1, UnitPropIndexes.Strength));
                if (strength < goodVO.Strength) {
                    fontColor = MyUI.ColorCode.no;
                    str0 = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("所需力量:") + " ", fontColor, `${strength}/${goodVO.Strength}`);
                }
                else {
                    str0 = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("所需力量:") + " ", fontColor, `${goodVO.Strength}`);
                }
                MyUI.showNodeWithLayout(aTxtCond[nTxtIdx]);
                aTxtCond[nTxtIdx++].innerHTML = str0;
            }
            if (goodVO.Dexterity > 0) {
                fontColor = MyUI.ColorCode.value;
                const dexterity = Math.floor(Global.GetCurrentRoleProp(1, UnitPropIndexes.Dexterity));
                if (dexterity < goodVO.Dexterity) {
                    fontColor = MyUI.ColorCode.no;
                    str0 = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("所需敏捷:") + " ", fontColor, `${dexterity}/${goodVO.Dexterity}`);
                }
                else {
                    str0 = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("所需敏捷:") + " ", fontColor, `${goodVO.Dexterity}`);
                }
                MyUI.showNodeWithLayout(aTxtCond[nTxtIdx]);
                aTxtCond[nTxtIdx++].innerHTML = str0;
            }
            if (goodVO.Intelligence > 0) {
                fontColor = MyUI.ColorCode.value;
                const intelligence = Math.floor(Global.GetCurrentRoleProp(1, UnitPropIndexes.Intelligence));
                if (intelligence < goodVO.Intelligence) {
                    fontColor = MyUI.ColorCode.no;
                    str0 = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("所需智力:") + " ", fontColor, `${intelligence}/${goodVO.Intelligence}`);
                }
                else {
                    str0 = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("所需智力:") + " ", fontColor, `${goodVO.Intelligence}`);
                }
                MyUI.showNodeWithLayout(aTxtCond[nTxtIdx]);
                aTxtCond[nTxtIdx++].innerHTML = str0;
            }
            if (goodVO.Constitution > 0) {
                fontColor = MyUI.ColorCode.value;
                const constitution = Math.floor(Global.GetCurrentRoleProp(1, UnitPropIndexes.Constitution));
                if (constitution < goodVO.Constitution) {
                    fontColor = MyUI.ColorCode.no;
                    str0 = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("所需体力:") + " ", fontColor, `${constitution}/${goodVO.Constitution}`);
                }
                else {
                    str0 = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("所需体力:") + " ", fontColor, `${goodVO.Constitution}`);
                }
                MyUI.showNodeWithLayout(aTxtCond[nTxtIdx]);
                aTxtCond[nTxtIdx++].innerHTML = str0;
            }
            for (; nTxtIdx < aTxtCond.length; nTxtIdx++) {
                MyUI.hideNodeWithLayout(aTxtCond[nTxtIdx]);
            }
            //#endregion
            //#region ======== 装备属性 ========
            const equipFields_1 = Global.GetGoodsEquipPropsDoubleList(goodsData.GoodsID);
            //#region 结婚戒指Tip做特殊处理
            if (categoriy === ItemCategories.JieHunJieZhi) {
                if (goodsData.ForgeLevel <= 0) {
                    goodsData.ForgeLevel = 1;
                    goodsData.AppendPropLev = 0;
                }
                const xiShu = tableMgr.sysParamsTable.getParamDouble("GoodWillXiShu");
                for (let i = 0; i < equipFields_1.length; i++) {
                    // 戒指最终属性=基础属性*（1+(阶-1）*2+等级*系数）
                    equipFields_1[i] = equipFields_1[i] * (1 + (goodsData.ForgeLevel - 1) * 2 + goodsData.AppendPropLev * xiShu);
                }
                MyUI.hideNodeWithLayout(this._groupAddition);
            }
            //#endregion
            //#region 基础属性
            if (categoriy === ItemCategories.MengChongWu) {
                MyUI.hideNodeWithLayout(this._groupBasic);
            }
            else if (categoriy === ItemCategories.ShouHuChong || categoriy === ItemCategories.ChongWu) {
                const aAttr = Global.GetPetAttribute(goodsData);
                const curAttr = aAttr[1];
                if (!curAttr || curAttr.length === 0) {
                    MyUI.hideNodeWithLayout(this._groupBasic);
                }
                else {
                    MyUI.showNodeWithLayout(this._groupBasic);
                    this._txtBasic.innerHTML = curAttr.join("<br>");
                }
                // 不能强化的装备不显示星星进度条
                MyUI.hideNodeWithLayout(this._groupStar0);
                MyUI.hideNodeWithLayout(this._groupStar1);
            }
            else if (categoriy === ItemCategories.Fashion) {
                MyUI.hideNodeWithLayout(this._groupBasic);
                MyUI.hideNodeWithLayout(this._groupLucky);
            }
            else {
                MyUI.showNodeWithLayout(this._groupBasic);
                this._txtBasic.innerHTML = this.GetBaseAttributeStr(goodsData, equipFields_1, categoriy);
            }
            if (this._groupBasic.visible) {
                nPosY = 96; // 文本默认位置
                if (!this._groupStar1.visible)
                    nPosY = this._groupStar1.y;
                if (!this._groupStar0.visible)
                    nPosY = this._groupStar0.y;
                this._txtBasic.y = nPosY;
            }
            //#endregion
            //#region 附加属性
            if (categoriy === ItemCategories.HuFu || categoriy === ItemCategories.ShouHuChong
                || categoriy === ItemCategories.ChongWu || categoriy === ItemCategories.JieHunJieZhi
                || categoriy === ItemCategories.Decoration || categoriy === ItemCategories.Fashion
                || categoriy === ItemCategories.MengChongWu) {
                MyUI.hideNodeWithLayout(this._groupAddition);
            }
            else {
                str0 = this.GetZhuijiaAttributeStr(goodsData, equipFields_1);
                if (Global.String.IsNullOrWhiteSpace(str0)) {
                    MyUI.hideNodeWithLayout(this._groupAddition);
                }
                else {
                    MyUI.showNodeWithLayout(this._groupAddition);
                    this._txtAddition.innerHTML = str0;
                }
            }
            //#endregion
            //#region 炼化属性
            if (categoriy === ItemCategories.MengChongWu) {
                this._txtTitleRefined.text = Loca.getLang("[羁绊属性]");
            }
            else {
                this._txtTitleRefined.text = Loca.getLang("[炼化属性]");
            }
            str0 = this.GetXilianAttributeStr(goodsData, categoriy);
            this._txtRefined.innerHTML = str0;
            if (Global.String.IsNullOrWhiteSpace(str0)) {
                MyUI.hideNodeWithLayout(this._groupRefined);
            }
            else {
                // this._txtRefined.color = "#" + Global.GetColorByGoodsData(goodsData).toString(16);
                MyUI.showNodeWithLayout(this._groupRefined);
            }
            //#endregion
            //#region 随机属性
            str0 = this.GetZhuoyueAttributeStr(goodsData);
            this._txtRandom.innerHTML = str0;
            if (!Global.String.IsNullOrWhiteSpace(str0)) {
                if (this._imgZhuoYue) {
                    if ((categoriy === ItemCategories.ShouHuChong) || (categoriy === ItemCategories.ChongWu)) {
                        this._txtTitleRandom.text = Loca.getLang("[天赋属性]");
                    }
                    else {
                        this._txtTitleRandom.text = Loca.getLang("[随机属性]");
                        this._imgZhuoYue.skin = Global.getCommonAtlasImgPath(this.zuoyueSpriteNames[Global.GetZhuoYueAddIndex(goodsData.ExcellenceInfo)]);
                    }
                    this._imgZhuoYue.visible = true;
                }
                MyUI.showNodeWithLayout(this._groupRandom);
            }
            else {
                if (this._imgZhuoYue) {
                    this._imgZhuoYue.visible = false;
                }
                MyUI.hideNodeWithLayout(this._groupRandom);
            }
            //#endregion
            //#region 幸运属性
            str0 = this.GetXingyunAttributeStr(goodsData);
            this._txtLucky.innerHTML = str0;
            if (Global.String.IsNullOrEmpty(str0)) {
                MyUI.hideNodeWithLayout(this._groupLucky);
            }
            else {
                if (categoriy === ItemCategories.Fashion) {
                    MyUI.hideNodeWithLayout(this._groupLucky);
                }
                else {
                    MyUI.showNodeWithLayout(this._groupLucky);
                }
            }
            //#endregion
            //#region 重生属性
            str0 = this.GetZhuanshengAttributeStr(goodsData, equipFields_1);
            this._txtRebirth.innerHTML = str0;
            if (Global.String.IsNullOrEmpty(str0)) {
                MyUI.hideNodeWithLayout(this._groupRebirth);
            }
            else {
                MyUI.showNodeWithLayout(this._groupRebirth);
            }
            //#endregion
            //#endregion
            //#region ======== 装备耐久 ========
            let hintStrongText = "";
            if (goodsData.Strong >= Math.floor(equipFields_1[0])) {
                hintStrongText = Global.GetColorStringForNGUIText(MyUI.ColorCode.no, Loca.getLang("(已破损，请修理)"));
            }
            else {
                const max = Math.floor(equipFields_1[0] / Global.MaxNotifyEquipStrongValue);
                const cur = max - Math.floor(goodsData.Strong / Global.MaxNotifyEquipStrongValue);
                hintStrongText = `${cur}/${max}`;
            }
            this._txtDurability.innerHTML = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("耐久: "), MyUI.ColorCode.value, hintStrongText);
            //#endregion
            //#region ======== 物品出售价格 ========
            if (goodsOwner === GoodsOwnerTypes.mallSale || goodsOwner === GoodsOwnerTypes.NPCSale
                || goodsOwner === GoodsOwnerTypes.OtherOnSale || goodsOwner === GoodsOwnerTypes.JiaoYiShuo) {
                // TODO: 交易的显示以后处理
                // if (priceInfo) {
                // 	let fields = priceInfo.split(',');
                // 	if (fields.length != 2) {
                // 		return;
                // 	}
                // 	this.PriceTypeIndex = parseInt(fields[0]);
                // 	let priceInfoUnit = GTipServiceEx.GetPriceInfoUnit(this.PriceTypeIndex);
                // 	this.BuyOnePrice = parseInt(fields[1]);
                // 	this.MaxBuyNum = GTipServiceEx.GetMaxBuyNum(this.PriceTypeIndex, this.BuyOnePrice);
                // 	this.BuyNum = 1;
                // 	if (goodsOwner == GoodsOwnerTypes.JiaoYiShuo) {
                // 		FootBuyTxtNum.text = "1"; // 交易所特殊处理
                // 	}
                // 	else {
                // 		FootBuyTxtNum.text = BuyNum.ToString();
                // 	}
                // 	RefreshPrice();
                // }
            }
            else if (goodsOwner === GoodsOwnerTypes.SelfBag || goodsOwner === GoodsOwnerTypes.ChatGoods
                || goodsOwner === GoodsOwnerTypes.OtherRole || goodsOwner === GoodsOwnerTypes.SysGifts
                || goodsOwner === GoodsOwnerTypes.Lianlu) {
                let price = 0;
                let isMojing = false;
                let IsZaiZao = false;
                if (goodsData) {
                    if (categoriy === ItemCategories.ShouHuChong || categoriy === ItemCategories.ChongWu) {
                        price = Global.GetPetPrice(goodsData);
                    }
                    else {
                        const tempPrice = tableMgr.goodsTable.getZaiZaoDian(goodsData.GoodsID);
                        if (0 < tempPrice) {
                            price = tempPrice;
                            IsZaiZao = true;
                        }
                        else {
                            price = Global.GetGoodsSaleToNpJiFen(goodsData);
                        }
                    }
                    if (price > 0) {
                        isMojing = IsZaiZao ? false : true;
                    }
                    else {
                        price = Global.GetGoodsSaleToNpcPrice(goodsData); // 叠加参数不用管，现在不能叠加物品，物品个数都是一个
                    }
                }
                if (price > 0) {
                    this._txtPrice.innerHTML = Global.GetColorStringForNGUIText(MyUI.ColorCode.normal, Loca.getLang("售价: "), MyUI.ColorCode.value, price);
                    if (isMojing) {
                        if (categoriy === ItemCategories.ShouHuChong || categoriy === ItemCategories.ChongWu) {
                            this._imgMoney.skin = Global.getCommonAtlasImgPath("money_lingjing");
                        }
                        else {
                            this._imgMoney.skin = Global.getCommonAtlasImgPath("money_mojing");
                        }
                    }
                    else if (IsZaiZao) {
                        // this._imgMoney.skin = Global.getCommonAtlasImgPath("zaizao");
                    }
                    else {
                        if (goodsData.Binding > 0) {
                            this._imgMoney.skin = Global.getCommonAtlasImgPath("money_gold_binding");
                        }
                        else {
                            this._imgMoney.skin = Global.getCommonAtlasImgPath("money_gold");
                        }
                    }
                    this._imgMoney.x = this._txtPrice.x + this._txtPrice.contextWidth + 3;
                }
                else {
                    this._txtPrice.innerHTML = "";
                    this._imgMoney.skin = null;
                }
            }
            else if (goodsOwner === GoodsOwnerTypes.SysGifts || goodsOwner === GoodsOwnerTypes.SelfStall || goodsOwner === GoodsOwnerTypes.None) {
                this._txtPrice.innerHTML = "";
                this._imgMoney.skin = null;
            }
            //#region 结婚戒指Tips 做特殊处理 && 时装, 萌宠
            if (categoriy === ItemCategories.MengChongWu) {
                this._txtDurability.innerHTML = "";
                this._txtPrice.innerHTML = Global.GetColorStringForNGUIText(MyUI.ColorCode.no, Loca.getLang("不可出售"));
                this._imgMoney.skin = null;
            }
            else if (categoriy === ItemCategories.JieHunJieZhi) {
                this._txtDurability.innerHTML = "";
            }
            else if (categoriy === ItemCategories.Fashion) {
                this._txtPrice.innerHTML = Global.GetColorStringForNGUIText(MyUI.ColorCode.no, Loca.getLang("不可出售"));
                this._imgMoney.skin = null;
            }
            //#endregion
            //#endregion
        }
        /**
         * 设置Tip上的按钮显示
         * @param goodsOwner
         * @param goodsData
         * @param selfBagOnly
         */
        SetMenus(goodsOwner, goodsData, selfBagOnly) {
            // 先隐藏menu中所有的按钮
            MyUI.setActiveChildren(this._groupButton, false);
            if (!goodsData)
                return;
            const goodVO = tableMgr.goodsTable.Find(goodsData.GoodsID);
            if (!goodVO || goodVO.Categoriy === ItemCategories.JieHunJieZhi)
                return;
            if (goodsOwner === GoodsOwnerTypes.SelfBag) {
                if (goodsData.Using === 1) {
                    if (goodVO.Categoriy === ItemCategories.ShouHuChong || goodVO.Categoriy === ItemCategories.ChongWu) {
                        // 使用精灵 把精灵放入备战背包中
                        this._btnScan.clickHandler = new Handler(null, () => this.TipsCallBack(TipsOperationTypes.CheckPet));
                        MyUI.showNodeWithLayout(this._btnScan);
                    }
                    // 佩戴在身上的装备只显示卸下与加工
                    MyUI.toggleNodeWithLayout(this._btnTakeOff, (goodVO.Categoriy < ItemCategories.WuQi_Jian || goodVO.Categoriy > ItemCategories.WuQi_NuJianTong));
                    MyUI.toggleNodeWithLayout(this._btnProcess, (goodVO.Categoriy !== ItemCategories.MengChongWu && goodVO.Categoriy !== ItemCategories.ShouHuChong
                        && goodVO.Categoriy !== ItemCategories.HuFu && goodVO.Categoriy !== ItemCategories.ChongWu
                        && goodVO.Categoriy !== ItemCategories.Decoration && goodVO.Categoriy !== ItemCategories.Fashion));
                    return;
                }
                if (!selfBagOnly) { // 出售、仓库、交易时，在背包中只有：放入，出售 ,上架
                    MyUI.showNodeWithLayout(this._btnPutIn);
                    MyUI.showNodeWithLayout(this._btnSale);
                    if (goodsOwner === GoodsOwnerTypes.SelfStall) {
                        MyUI.hideNodeWithLayout(this._btnPutIn);
                        MyUI.hideNodeWithLayout(this._btnSale);
                        MyUI.showNodeWithLayout(this._btnUpShelf);
                    }
                }
                else { // 纯背包中只显示：佩戴、加工、出售
                    if (goodVO.Categoriy === ItemCategories.ShouHuChong || goodVO.Categoriy === ItemCategories.ChongWu) {
                        this._btnUse.label = Loca.getLang("列队");
                        this._btnUse.clickHandler = new Handler(null, () => {
                            if (!MyUI.GongnengYugaoMgr.HintGongNengOpened(GongNengIDs.JingLingSystem)) {
                                return;
                            }
                            this.TipsCallBack(TipsOperationTypes.UsePet);
                        });
                        MyUI.showNodeWithLayout(this._btnUse);
                    }
                    else if (goodVO.Categoriy === ItemCategories.MengChongWu) {
                        this._btnUse.label = Loca.getLang("入库");
                        // 使用萌宠 把萌宠放入萌宠背包中
                        this._btnUse.clickHandler = new Handler(null, () => this.TipsCallBack(TipsOperationTypes.UseMengchong));
                        MyUI.showNodeWithLayout(this._btnUse);
                    }
                    let ShowPeiDai = (goodVO.Categoriy !== ItemCategories.ShouHuChong && goodVO.Categoriy !== ItemCategories.ChongWu && goodVO.Categoriy !== ItemCategories.MengChongWu);
                    if (ItemCategories.Fashion === goodVO.Categoriy) {
                        const lst = Global.GetRoleFashionList();
                        for (let j = 0; j < lst.length; ++j) {
                            if (goodsData.GoodsID === lst[j].GoodsID) {
                                ShowPeiDai = false;
                                break;
                            }
                        }
                    }
                    if (ItemCategories.Fashion === goodVO.Categoriy && ShowPeiDai) {
                        this._btnWear.label = Loca.getLang("使用");
                    }
                    else {
                        this._btnWear.label = Loca.getLang("佩戴");
                    }
                    MyUI.toggleNodeWithLayout(this._btnWear, ShowPeiDai);
                    MyUI.toggleNodeWithLayout(this._btnProcess, (goodVO.Categoriy !== ItemCategories.MengChongWu && goodVO.Categoriy !== ItemCategories.ShouHuChong
                        && goodVO.Categoriy !== ItemCategories.HuFu && goodVO.Categoriy !== ItemCategories.ChongWu
                        && goodVO.Categoriy !== ItemCategories.Decoration && goodVO.Categoriy !== ItemCategories.Fashion));
                    MyUI.toggleNodeWithLayout(this._btnSale, (goodVO.Categoriy !== ItemCategories.MengChongWu && goodVO.Categoriy !== ItemCategories.Decoration
                        && goodVO.Categoriy !== ItemCategories.Fashion));
                    MyUI.toggleNodeWithLayout(this._btnDestroy, Global.g_bIsTipsShowCuiHuiBtn);
                }
            }
            if (goodsOwner === GoodsOwnerTypes.JiaoYiShuo) {
                MyUI.showNodeWithLayout(this._btnBuy);
            }
            else if (goodsOwner === GoodsOwnerTypes.Exchange || goodsOwner === GoodsOwnerTypes.SelfPet
                || goodsOwner === GoodsOwnerTypes.SelfPet) { // 出售、仓库、交易窗口中的物品点击时，只显示：取回
                MyUI.showNodeWithLayout(this._btnGetBack);
            }
            else if (goodsOwner === GoodsOwnerTypes.Lianlu) {
                MyUI.showNodeWithLayout(this._btnPutIn);
            }
            else if (goodsOwner === GoodsOwnerTypes.SelfStall) {
                if (0 >= goodsData.Binding && !Global.IsTimeLimitGoods(goodsData)) {
                    MyUI.showNodeWithLayout(this._btnUpShelf);
                }
            }
            if (this._btnSale.visible) { // 显示出售按钮时，如果是有卓越属性的装备特殊处理
                this._btnSale.label = Loca.getLang("回收");
                this._btnSale.name = goodsData.Id.toString();
            }
        }
        /**
         * 设置属性面板
         * @param goodsOwner
         * @param goodsData
         */
        SetPropsPanel(goodsOwner, goodsData) {
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
            this._groupBasic.height = this._txtBasic.y + this._txtBasic.contextHeight;
            this._groupContent.refresh();
            if (this._groupButton.visible) {
                this._bgContent.height = 628;
            }
            else {
                this._bgContent.height = 580;
            }
        }
        /**
         * 基础属性字符串
         * @param gd 装备数据
         * @param equipFields_1 数量列表
         * @param categoriy 分类
         */
        GetBaseAttributeStr(gd, equipFields_1, categoriy = -1) {
            const aStrAttrs = [];
            let str = "";
            let extPropName = "";
            let subIndex = 0;
            let extPropIndexMin = 0;
            let extPropIndexMax = 0;
            if ((categoriy > ItemCategories.JieZhi && categoriy < ItemCategories.ChongWu)
                || (categoriy > ItemCategories.WuQi_Dao && categoriy !== ItemCategories.WuQi_NuJianTong)
                || categoriy === ItemCategories.ShouHuChong
                || categoriy === ItemCategories.JieHunJieZhi) {
                // 不能强化的装备不显示星星进度条
                MyUI.hideNodeWithLayout(this._groupStar0);
                MyUI.hideNodeWithLayout(this._groupStar1);
            }
            else {
                if (20 === Global.MaxForgeLevel()) {
                    MyUI.showNodeWithLayout(this._groupStar0);
                    MyUI.showNodeWithLayout(this._groupStar1);
                }
                else {
                    if (gd.ForgeLevel <= 15) {
                        MyUI.showNodeWithLayout(this._groupStar0);
                        MyUI.hideNodeWithLayout(this._groupStar1);
                    }
                    else {
                        MyUI.showNodeWithLayout(this._groupStar0);
                        MyUI.showNodeWithLayout(this._groupStar1);
                        this._progressBg1.repeatX = gd.ForgeLevel - 15;
                    }
                }
            }
            // 设置强化星级
            if (gd.ForgeLevel >= 0 && gd.ForgeLevel <= 15) {
                this._progressBar0.repeatX = gd.ForgeLevel;
            }
            else {
                this._progressBar0.repeatX = 15;
                this._progressBar1.repeatX = gd.ForgeLevel - 15;
            }
            // 卓越装备加成攻击力比例
            const zhuoyueAddAttackPersent = (gd.ExcellenceInfo > 0) ? Global.GetZhuoYueAddAttackRates(gd.ExcellenceInfo) : 0;
            // 卓越装备加成防御力比例
            const zhuoyueAddDefensePersent = (gd.ExcellenceInfo > 0) ? Global.GetZhuoYueAddDefenseRates(gd.ExcellenceInfo) : 0;
            // 设置属性字串，包括两个值，有最小和最大
            for (subIndex = ExtPropIndexes.AttackSpeed; subIndex <= ExtPropIndexes.MaxMAttack; subIndex += 2) {
                extPropName = Loca.getLang(ExtPropIndexes.ExtPropIndexChineseNames[subIndex]);
                switch (subIndex) {
                    case ExtPropIndexes.MinDefense:
                        extPropName = Loca.getLang("物理防御");
                        break;
                    case ExtPropIndexes.MinMDefense:
                        extPropName = Loca.getLang("魔法防御");
                        break;
                    case ExtPropIndexes.MinAttack:
                        extPropName = Loca.getLang("物理攻击");
                        break;
                    case ExtPropIndexes.MinMAttack:
                        extPropName = Loca.getLang("魔法攻击");
                        break;
                }
                if (subIndex === ExtPropIndexes.MinDefense) {
                }
                if (subIndex === ExtPropIndexes.AttackSpeed) {
                    if (equipFields_1[subIndex] !== 0.0) {
                        const nField = Math.floor(equipFields_1[subIndex]);
                        str = `${extPropName}: ${nField}%`;
                        aStrAttrs.push(str);
                    }
                }
                else {
                    extPropIndexMin = subIndex;
                    extPropIndexMax = subIndex + 1;
                    if (equipFields_1[extPropIndexMin] !== 0.0 || equipFields_1[extPropIndexMax] !== 0.0) {
                        // 装备基础属性
                        let minOriginValue = equipFields_1[extPropIndexMin]; // 最小值
                        let maxOriginValue = equipFields_1[extPropIndexMax]; // 最大值
                        // 卓越装备加成的属性
                        if (subIndex === ExtPropIndexes.MinDefense || subIndex === ExtPropIndexes.MinMDefense) {
                            minOriginValue += (zhuoyueAddDefensePersent * minOriginValue);
                            maxOriginValue += (zhuoyueAddDefensePersent * maxOriginValue);
                        }
                        else if (subIndex === ExtPropIndexes.MinAttack || subIndex === ExtPropIndexes.MinMAttack) {
                            minOriginValue += (zhuoyueAddAttackPersent * minOriginValue);
                            maxOriginValue += (zhuoyueAddAttackPersent * maxOriginValue);
                        }
                        // 强化增加的属性，保底加3
                        const ForgeAddBasePersent = Global.GetEquipForgeAddBaseValue(gd, extPropIndexMax);
                        const minForgeAddBaseValue = Math.floor(Math.max(minOriginValue * ForgeAddBasePersent, 3));
                        const maxForgeAddBaseValue = Math.floor(Math.max(maxOriginValue * ForgeAddBasePersent, 3));
                        let minForgeAddBaseValueStr = "";
                        let maxForgeAddBaseValueStr = "";
                        minOriginValue = Math.floor(minOriginValue);
                        maxOriginValue = Math.floor(maxOriginValue);
                        if (ForgeAddBasePersent > 0) {
                            if (categoriy !== ItemCategories.JieHunJieZhi && categoriy !== ItemCategories.Decoration && categoriy !== ItemCategories.Fashion) {
                                minForgeAddBaseValueStr = Global.GetColorStringForNGUIText(MyUI.ColorCode.zhuoYue1, `(+${minForgeAddBaseValue})`);
                                maxForgeAddBaseValueStr = Global.GetColorStringForNGUIText(MyUI.ColorCode.zhuoYue1, `(+${maxForgeAddBaseValue})`);
                                str = `${extPropName}: ${minOriginValue}${minForgeAddBaseValueStr} - ${maxOriginValue}${maxForgeAddBaseValueStr}`;
                                aStrAttrs.push(str);
                            }
                            else {
                                str = `${extPropName}: ${minOriginValue} - ${maxOriginValue}`;
                                aStrAttrs.push(str);
                            }
                        }
                        else {
                            str = `${extPropName}: ${minOriginValue} - ${maxOriginValue}`;
                            aStrAttrs.push(str);
                        }
                    }
                }
            }
            let ForgeAddStr = "";
            // 基础属性，只有一个值
            for (subIndex = ExtPropIndexes.IncreasePhyAttack; subIndex < ExtPropIndexes.Max; subIndex++) {
                if (equipFields_1[subIndex] !== 0) {
                    extPropName = Loca.getLang(ExtPropIndexes.ExtPropIndexChineseNames[subIndex]);
                    // 基础值
                    const originValue = equipFields_1[subIndex];
                    const ForgeAddBasePersent = Global.GetEquipForgeAddBaseValue(gd, subIndex);
                    if (ExtPropIndexes.ExtPropIndexPercents[subIndex] === 1) {
                        // 如果是翅膀，并且计算当前属性是伤害加成，则特殊计算
                        if (categoriy === ItemCategories.ChiBang && subIndex === ExtPropIndexes.SubAttackInjurePercent) {
                            // 翅膀不能强化
                        }
                        else if (categoriy === ItemCategories.Fashion) {
                            // 时装特殊处理
                        }
                        else {
                            if (ForgeAddBasePersent > 0) {
                                if (categoriy !== ItemCategories.JieHunJieZhi && categoriy !== ItemCategories.Decoration && categoriy !== ItemCategories.Fashion) {
                                    const nBase = Math.floor(ForgeAddBasePersent * 100);
                                    const nOrigin = Math.floor(originValue * 100);
                                    ForgeAddStr = Global.GetColorStringForNGUIText(MyUI.ColorCode.zhuoYue1, `(+${nBase}%)`);
                                    str = `${extPropName}: ${nOrigin}%${ForgeAddStr}`;
                                    aStrAttrs.push(str);
                                }
                                else {
                                    const nOrigin = Math.floor(originValue * 100);
                                    str = `${extPropName}: ${nOrigin}%`;
                                    aStrAttrs.push(str);
                                }
                            }
                            else {
                                const nOrigin = Math.floor(originValue * 100);
                                str = `${extPropName}: ${nOrigin}%`;
                                aStrAttrs.push(str);
                            }
                        }
                    }
                    else if (ExtPropIndexes.ExtPropIndexPercents[subIndex] === 0) {
                        if (ForgeAddBasePersent > 0) {
                            if (categoriy !== ItemCategories.JieHunJieZhi && categoriy !== ItemCategories.Decoration && categoriy !== ItemCategories.Fashion) {
                                const nOrigin = Math.floor(originValue * ForgeAddBasePersent);
                                ForgeAddStr = Global.GetColorStringForNGUIText(MyUI.ColorCode.zhuoYue1, `(+${nOrigin})`);
                                str = `${extPropName}: ${Math.floor(originValue)}${ForgeAddStr}`;
                                aStrAttrs.push(str);
                            }
                            else {
                                str = `${extPropName}: ${Math.floor(originValue)}`;
                                aStrAttrs.push(str);
                            }
                        }
                        else {
                            str = `${extPropName}: ${Math.floor(originValue)}`;
                            aStrAttrs.push(str);
                        }
                    }
                }
            }
            return aStrAttrs.join("<br>");
        }
        /**
         * 追加属性字符串
         * @param gd 装备数据
         * @param equipFields_1 属性列表
         */
        GetZhuijiaAttributeStr(gd, equipFields_1) {
            const aStrAttrs = [];
            let str = "";
            let extPropName = "";
            let subIndex = 0;
            // 设置追加星级
            if (gd.AppendPropLev <= 0) {
                const maxZhuijiaLevel = Global.GetMaxZhuijiaLevelByGoodsData(gd);
                this._progressAddition.value = 0;
                this._txtProgAddition.text = `${gd.AppendPropLev}/${maxZhuijiaLevel}`;
                return str;
            }
            else {
                const maxZhuijiaLevel = Global.GetMaxZhuijiaLevelByGoodsData(gd);
                this._progressAddition.value = gd.AppendPropLev / maxZhuijiaLevel;
                this._txtProgAddition.text = `${gd.AppendPropLev}/${maxZhuijiaLevel}`;
            }
            // 卓越装备加成攻击力比例
            const zhuoyueAddAttackPersent = (gd.ExcellenceInfo > 0) ? Global.GetZhuoYueAddAttackRates(gd.ExcellenceInfo) : 0;
            // 卓越装备加成防御力比例
            const zhuoyueAddDefensePersent = (gd.ExcellenceInfo > 0) ? Global.GetZhuoYueAddDefenseRates(gd.ExcellenceInfo) : 0;
            for (subIndex = ExtPropIndexes.MaxAttack; subIndex <= ExtPropIndexes.MaxLifeV; subIndex++) {
                extPropName = Loca.getLang(ExtPropIndexes.ExtPropIndexChineseNames[subIndex]);
                // 追加增加的属性
                let maxOriginValue = equipFields_1[subIndex];
                if (maxOriginValue === 0) {
                    continue;
                }
                const addBasePersent = Global.GetEquipZhuijiaAddBaseValue(gd, subIndex);
                // 卓越放大攻击属性
                if (subIndex === ExtPropIndexes.MaxAttack || subIndex === ExtPropIndexes.MaxMAttack) {
                    maxOriginValue += (zhuoyueAddAttackPersent * maxOriginValue);
                }
                const maxAddBaseValue = Math.ceil(maxOriginValue * addBasePersent);
                // 追加属性暂时只显示最大值
                if (maxAddBaseValue > 0) {
                    str = `${extPropName}: +${maxAddBaseValue}`;
                    aStrAttrs.push(str);
                }
            }
            return aStrAttrs.join("<br>");
        }
        /**
         * 培养属性字符串
         * @param gd 装备数据
         * @param nCategoriy 分类
         */
        GetXilianAttributeStr(gd, nCategoriy) {
            const aStrAttrs = [];
            let str = "";
            let key = 0;
            let value = 0;
            const valueLength = 5;
            const bIsMengchong = (nCategoriy === ItemCategories.MengChongWu);
            if (gd.ExcellenceInfo <= 0 && bIsMengchong === false)
                return str;
            const dict = Global.GetXilianPropsUpLimitDict(gd);
            const factor = Global.GetXilianPropsUpFactor(gd);
            if (!gd.WashProps) {
                if (!dict)
                    return str;
                for (const [key, value] of dict) {
                    if (value <= 0)
                        continue;
                    str = "";
                    if (ExtPropIndexes.ExtPropIndexPercents[key] === 1) {
                        str += `${Loca.getLang(ExtPropIndexes.ExtPropIndexChineseNames[key])} +0%`;
                    }
                    else if (ExtPropIndexes.ExtPropIndexPercents[key] === 0) {
                        str += `${Loca.getLang(ExtPropIndexes.ExtPropIndexChineseNames[key])} +0`;
                    }
                    str += this.GetSpaceString(Math.max(valueLength - value.toString().length, 0));
                    str += this.GetUpLimitValueStr(dict, factor, key, 0);
                    aStrAttrs.push(str);
                }
            }
            else {
                for (let i = 0; i < gd.WashProps.length; i += 2) {
                    str = "";
                    key = gd.WashProps[i];
                    value = gd.WashProps[i + 1];
                    if (ExtPropIndexes.ExtPropIndexPercents[key] === 1) {
                        str += `${Loca.getLang(ExtPropIndexes.ExtPropIndexChineseNames[key])} +${value}%`;
                    }
                    else if (ExtPropIndexes.ExtPropIndexPercents[key] === 0) {
                        if (bIsMengchong)
                            value = value / 100;
                        str += `${Loca.getLang(ExtPropIndexes.ExtPropIndexChineseNames[key])} +${value}`;
                    }
                    str += this.GetSpaceString(Math.max(valueLength - value.toString().length, 0));
                    if (dict)
                        str += this.GetUpLimitValueStr(dict, factor, key, value);
                    aStrAttrs.push(str);
                }
            }
            return aStrAttrs.join("<br>");
        }
        /**
         * 得到属性id为key的洗炼上限值字符串
         * @param dict
         * @param factor
         * @param key
         * @param currentValue
         */
        GetUpLimitValueStr(dict, factor, key, currentValue) {
            let upLimitValue = 0;
            let str = "";
            if (dict) {
                if (dict.has(key)) {
                    upLimitValue = dict.get(key);
                    upLimitValue = Math.floor(upLimitValue * factor);
                    str += "             ";
                    if (currentValue >= upLimitValue) {
                        str += Global.GetColorStringForNGUIText(MyUI.ColorCode.gray, Loca.getLang("已达上限"));
                    }
                    else {
                        str += Global.GetColorStringForNGUIText(MyUI.ColorCode.gray, Global.String.Format(Loca.getLang("最高上限 +{0}"), upLimitValue));
                    }
                }
            }
            return str;
        }
        /**
         * 重生属性字符串
         * @param gd 装备数据
         * @param equipFields_1 属性列表
         */
        GetZhuanshengAttributeStr(gd, equipFields_1) {
            const aStrAttrs = [];
            let str = "";
            let extPropName = "";
            let subIndex = 0;
            if (gd.ChangeLifeLevForEquip <= 0) {
                return str;
            }
            this._txtTitleRebirth.text = Global.String.Format(Loca.getLang("[重生属性] {0}重"), gd.ChangeLifeLevForEquip);
            // 卓越装备加成攻击力比例
            const zhuoyueAddAttackPersent = (gd.ExcellenceInfo > 0) ? Global.GetZhuoYueAddAttackRates(gd.ExcellenceInfo) : 0;
            // 卓越装备加成防御力比例
            const zhuoyueAddDefensePersent = (gd.ExcellenceInfo > 0) ? Global.GetZhuoYueAddDefenseRates(gd.ExcellenceInfo) : 0;
            for (subIndex = ExtPropIndexes.MaxDefense; subIndex <= ExtPropIndexes.MaxMAttack; subIndex += 2) {
                extPropName = Loca.getLang(ExtPropIndexes.ExtPropIndexChineseNames[subIndex]);
                // 卓越增加的属性
                let maxOriginValue = equipFields_1[subIndex];
                const addBasePersent = Global.GetEquipZhuanshengAddBaseValue(gd, subIndex);
                if (subIndex === ExtPropIndexes.MaxDefense || subIndex === ExtPropIndexes.MaxMDefense) {
                    maxOriginValue += Math.floor(zhuoyueAddDefensePersent * maxOriginValue);
                }
                else if (subIndex === ExtPropIndexes.MaxAttack || subIndex === ExtPropIndexes.MaxMAttack) {
                    maxOriginValue += Math.floor(zhuoyueAddAttackPersent * maxOriginValue);
                }
                const maxAddBaseValue = Math.ceil(maxOriginValue * addBasePersent);
                // 重生属性暂时只显示最大值
                if (maxAddBaseValue > 0) {
                    str = `${extPropName}: +${maxAddBaseValue}`;
                    aStrAttrs.push(str);
                }
            }
            return aStrAttrs.join("<br>");
        }
        /**
         * 卓越属性字符串
         * @param gd 装备数据
         */
        GetZhuoyueAttributeStr(gd) {
            const aStrAttrs = [];
            let propStr = "";
            // 卓越属性最多24条属性，用一个24位的整数表示卓越属性是否激活的状态，
            const maxNum = 32;
            for (let i = 0; i < maxNum; i++) {
                if (Global.GetIntSomeBit(gd.ExcellenceInfo, i) === 1) {
                    propStr = this.GetZhuoyuePropStr(i);
                    if (!Global.String.IsNullOrEmpty(propStr)) {
                        aStrAttrs.push(propStr);
                    }
                }
            }
            return aStrAttrs.join("<br>");
        }
        /**
         * 根据卓越属性字段，获取某一条卓越属性字串
         * @param flag 卓越属性索引
         */
        GetZhuoyuePropStr(flag) {
            let propsStr = "";
            let propsValue = "";
            const propsID = flag;
            const propsName = Loca.getLang(ZhuoyuePropIndexes.ZhuoyuePropIndexChineseNames[propsID]);
            if (propsID === ZhuoyuePropIndexes.MaxAttack || propsID === ZhuoyuePropIndexes.MaxMAttack || propsID === ZhuoyuePropIndexes.MaxMagicPercent) {
                propsValue = Global.String.Format(Loca.getLang("人物等级/{0}"), ZhuoyuePropIndexes.ZhuoyuePropIndexValues[flag]);
            }
            else {
                propsValue = ZhuoyuePropIndexes.ZhuoyuePropIndexValues[flag].toString();
            }
            if (ZhuoyuePropIndexes.ZhuoyuePropIndexPercents[propsID] === 1) {
                propsStr = `${propsName}: +${propsValue}%`;
            }
            else {
                propsStr = `${propsName}: +${propsValue}`;
            }
            return propsStr;
        }
        /**
         * 幸运属性字符串
         * @param gd 装备数据
         */
        GetXingyunAttributeStr(gd) {
            let str = "";
            if (gd.Lucky <= 0)
                return str;
            str = Loca.getLang("幸运一击概率: +5%");
            return str;
        }
        /**
         * 返回中文数字
         * @param num 数字
         */
        GetChineseNum(num) {
            let str = "";
            const i10 = Math.floor(num / 10);
            if (i10 > 1) {
                str += `${this.ChineseNum[i10]}${this.ChineseNum[10]}`;
            }
            else if (i10 === 1) {
                str += `${this.ChineseNum[10]}`;
            }
            const i1 = Math.floor(num % 10);
            if (i1 > 0) {
                str += this.ChineseNum[i1];
            }
            return str;
        }
        /**
         * 返回num个空格的字符串
         * @param num
         */
        GetSpaceString(num) {
            let str = "";
            while (num > 0) {
                str += "  ";
                num--;
            }
            return str;
        }
        /**
         * Tip上的操作回调
         * @param type
         * @param id
         * @param handTypes
         */
        TipsCallBack(type, id = 0, handTypes = HandTypes.None) {
            if (handTypes === HandTypes.None) {
                this.DPSelectedItem(this, new DPSelectedItemEventArgs(TipsOperationTypes.Close, 0));
            }
            if (TipsOperationTypes.UseMengchong === type) {
                MyUI.GTipServiceEx.TipsSender.DPSelectedItem(this, new DPSelectedItemEventArgs(type, id));
            }
            if (TipsOperationTypes.UsePet === type) {
                MyUI.GTipServiceEx.TipsSender.DPSelectedItem(this, new DPSelectedItemEventArgs(type, id));
            }
            if (TipsOperationTypes.CheckPet === type) {
                MyUI.GTipServiceEx.TipsSender.DPSelectedItem(this, new DPSelectedItemEventArgs(type, id));
            }
            if (type > TipsOperationTypes.Close && type < TipsOperationTypes.SwitchHand) {
                MyUI.GTipServiceEx.TipsSender.DPSelectedItem(this, new DPSelectedItemEventArgs(type, id));
            }
            if (TipsOperationTypes.ShangJia === type) {
                this.DPSelectedItem(this, new DPSelectedItemEventArgs(TipsOperationTypes.ShangJia));
            }
            if (TipsOperationTypes.JiaoYiShuoGouMai === type) {
                MyUI.GTipServiceEx.TipsSender.DPSelectedItem(this, new DPSelectedItemEventArgs(type, id));
            }
        }
        onClosed(type) {
            MyUI.GTipServiceEx.ClearChildWindow();
        }
    }
    MyUI.EquipTip = EquipTip;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=EquipTip.js.map