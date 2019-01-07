var MyUI;
(function (MyUI) {
    class GTipServiceEx {
        constructor() {
        }
        /**
         * 价格信息单位类型名称
         * @param nPriceTypeIdex 货币类型
         */
        static GetPriceInfoUnit(nPriceTypeIdex) {
            switch (nPriceTypeIdex) {
                case GoodsPriceUnitTypes.Jinbi:
                    return ConfigLoca.UI_MONEY_TYPE_GOLD;
                case GoodsPriceUnitTypes.Jifen:
                    return ConfigLoca.UI_MONEY_TYPE_JiFen;
                case GoodsPriceUnitTypes.Zhuanshi:
                    return ConfigLoca.UI_MONEY_TYPE_DIAMOND;
                case GoodsPriceUnitTypes.BindZhuanshi:
                    return ConfigLoca.UI_MONEY_TYPE_BINDING_DIAMOND;
                case GoodsPriceUnitTypes.BindJinBi:
                    return ConfigLoca.UI_MONEY_TYPE_BINDING_GOLD;
                case GoodsPriceUnitTypes.KingOfBattlePoint:
                    return ConfigLoca.UI_MONEY_TYPE_KingOfBattlePoint;
            }
            return "";
        }
        /**
         * 取得当前货币可以购买物品的最大数量
         * @param goodsPriceUnit 价格单位类型
         * @param price 购买一个的价格
         */
        static GetMaxBuyNum(goodsPriceUnit, price) {
            let money = 0;
            if (goodsPriceUnit === GoodsPriceUnitTypes.Jinbi) {
                money = Global.Data.roleData.YinLiang;
            }
            else if (goodsPriceUnit === GoodsPriceUnitTypes.Jifen) {
                money = Global.GetRoleOwnNumByMoneyType(MoneyTypes.JingYuanZhi);
            }
            else if (goodsPriceUnit === GoodsPriceUnitTypes.Zhuanshi) {
                money = Global.Data.roleData.UserMoney;
            }
            else if (goodsPriceUnit === GoodsPriceUnitTypes.BindZhuanshi) {
                money = Global.Data.roleData.Gold;
            }
            else if (goodsPriceUnit === GoodsPriceUnitTypes.BindJinBi) {
                money = Global.Data.roleData.Money1;
            }
            else if (goodsPriceUnit === GoodsPriceUnitTypes.KingOfBattlePoint) {
                money = Global.GetRoleOwnNumByMoneyType(MoneyTypes.KingOfBattlePoint);
            }
            if (price <= 0) {
                return 0; // 防止配置错误
            }
            return Math.floor(money / price);
        }
        /**
         * 一些活动奖励的物品tips，需要传一个假的goodsdata
         * @param sender
         * @param tipType
         * @param goodsOwner
         * @param goodData
         */
        static ShowTip(sender, tipType, goodsOwner, goodData) {
            if (GTipServiceEx.IsWaitting)
                return;
            if (!goodData)
                return;
            if (null != sender) {
                GTipServiceEx.TipsSender = sender;
            }
            // 山海书灵Tip
            if (tipType === TipTypes.SoulGuardTip) {
                // TODO:
                // ShowSoulGuardTipsWindow(goodsOwner, goodData);
                return;
            }
            // 荧光宝石Tip
            if (tipType === TipTypes.FluorescentDiamondBagTip || tipType === TipTypes.SoulCometStoneBagTip) {
                // TODO:
                // ShowFluorescentDiamondTipsWindow(goodsOwner, goodData);
                return;
            }
            if (tipType !== TipTypes.YuansuBagTip) {
                const categoriy = Global.GetCategoriyByGoodsID(goodData.GoodsID);
                if ((categoriy >= 0 && categoriy < ItemCategories.EquipMax) ||
                    categoriy === ItemCategories.Fashion_Wing || categoriy === ItemCategories.Fashion_Title) {
                    // 时装根据策划要求特殊处理
                    if (ItemCategories.Fashion === categoriy) {
                        GTipServiceEx.ShowGoodsTipWindow(goodsOwner, goodData);
                    }
                    else {
                        GTipServiceEx.ShowEquipTipWindow(goodsOwner, goodData);
                    }
                }
                else {
                    GTipServiceEx.ShowGoodsTipWindow(goodsOwner, goodData);
                }
            }
            else if (tipType === TipTypes.YuansuBagTip) {
                // TODO:
                // ShowYuansuTipsWindow(goodsOwner, goodData);
            }
        }
        /**
         * 购买物品Tips
         * @param sender GoodsIcon
         * @param tipType Tip类型
         * @param goodsOwner 物品所属类型
         * @param goodsPriceUnit 物品货币类型
         * @param price 物品价格
         * @param goodData 物品Data
         */
        static ShowMallTip(sender, tipType, goodsOwner, goodsPriceUnit, price, goodData) {
            if (GTipServiceEx.IsWaitting)
                return;
            if (!goodData)
                return;
            if (null != sender) {
                GTipServiceEx.TipsSender = sender;
            }
            let priceInfo = null;
            if (goodsPriceUnit !== GoodsPriceUnitTypes.None) {
                priceInfo = Global.String.Format("{0},{1}", goodsPriceUnit, price);
            }
            if (tipType === TipTypes.GoodsText) {
                const categoriy = Global.GetCategoriyByGoodsID(goodData.GoodsID);
                if (categoriy >= 0 && categoriy < ItemCategories.EquipMax) {
                    // 时装根据策划要求特殊处理
                    if (categoriy === ItemCategories.Fashion || goodsOwner === GoodsOwnerTypes.DuiHuanBusinessmanOwner) {
                        GTipServiceEx.ShowGoodsTipWindow(goodsOwner, goodData, priceInfo);
                    }
                    else {
                        GTipServiceEx.ShowEquipTipWindow(goodsOwner, goodData, priceInfo);
                    }
                }
                else {
                    GTipServiceEx.ShowGoodsTipWindow(goodsOwner, goodData, priceInfo);
                }
            }
        }
        /**
         * 显示物品类道具Tip窗口
         * @param goodsOwner
         * @param GoodData
         * @param priceInfo
         */
        static ShowGoodsTipWindow(goodsOwner, GoodData, priceInfo = null) {
            GTipServiceEx._GoodData = GoodData;
            GTipServiceEx.GoodTips = windowMgr.openWindow(WindowID.GoodsTip);
            GTipServiceEx.GoodTips.DPSelectedItem = (s, e) => {
                if (e.IDType === TipsOperationTypes.ShangJia) {
                    // TODO:
                    // PlayZone.GlobalPlayZone.OpenWuPinShangJiaWindow(_GoodData, 0);
                }
                if (e.IDType === TipsOperationTypes.Close) {
                    if (e.ID === 0) { // 关闭物品类道具Tip窗口
                        windowMgr.closeWindow(WindowID.GoodsTip);
                    }
                }
            };
            GTipServiceEx.GoodTips.RenderTips(goodsOwner, GoodData, GTipServiceEx.SelfBagOnly, priceInfo);
        }
        /**
         * 显示装备Tip窗口
         * @param goodsOwner
         * @param GoodData
         * @param priceInfo
         */
        static ShowEquipTipWindow(goodsOwner, GoodData, priceInfo = null) {
            GTipServiceEx._goodsOwner = goodsOwner;
            GTipServiceEx._GoodData = GoodData;
            let tipsResultDict = Global.GetCompareAttributeInfo(GoodData);
            let tipsResultState = GTipServiceEx.IsShowTipsResultWindow(tipsResultDict, goodsOwner, GoodData.GoodsID) && (GoodData.Using === 0);
            let handValue = -1;
            if (tipsResultState) {
                const equipCategory = Global.GetCategoriyByGoodsID(GoodData.GoodsID);
                // 我们的武器不区分左右手
                if (equipCategory >= ItemCategories.WuQi_Jian && equipCategory <= ItemCategories.WuQi_NuJianTong) // 判断要佩戴的道具否是武器
                    handValue = -1;
                else
                    handValue = tipsResultDict.get(GTipServiceEx.HandKey);
            }
            GTipServiceEx.HandValue = handValue;
            GTipServiceEx.EquipTips = windowMgr.openWindow(WindowID.EquipTip);
            GTipServiceEx.EquipTips.DPSelectedItem = (s, e) => {
                if (e.IDType === TipsOperationTypes.Close) {
                    windowMgr.closeWindow(WindowID.EquipTip); // 关闭装备类道具Tip窗口
                }
                else if (e.IDType === TipsOperationTypes.SwitchHand) {
                    tipsResultDict.clear();
                    tipsResultDict = Global.GetCompareAttributeInfo(GTipServiceEx._GoodData, e.Flag);
                    tipsResultState = GTipServiceEx.IsShowTipsResultWindow(tipsResultDict, GTipServiceEx._goodsOwner, GTipServiceEx._GoodData.GoodsID);
                    GTipServiceEx.HandValue = e.Flag;
                    GTipServiceEx.ShowTipsResultWindow(ItemCategories.Fashion !== Global.GetCategoriyByGoodsID(GoodData.GoodsID), tipsResultDict, GTipServiceEx.HandValue);
                }
                else if (e.IDType === TipsOperationTypes.ShangJia) {
                    // TODO:
                    // PlayZone.GlobalPlayZone.OpenWuPinShangJiaWindow(_GoodData, 0);
                }
            };
            GTipServiceEx.EquipTips.RenderTips(goodsOwner, GoodData, GTipServiceEx.SelfBagOnly, priceInfo, handValue);
            // 佩戴后属性
            GTipServiceEx.ShowTipsResultWindow(tipsResultState, tipsResultDict, handValue);
        }
        /**
         * 是否显示Tip佩戴结果窗口
         * @param resultDict
         * @param goodsOwner
         * @param goodsID
         */
        static IsShowTipsResultWindow(resultDict, goodsOwner, goodsID) {
            if (!resultDict) {
                return false;
            }
            // 共ExtPropIndexes.Max-1个基础属性，0为战力，ExtPropIndexes.Max+0为卓越，ExtPropIndexes.Max+1为幸运，ExtPropIndexes.Max+2为左右手
            // 第ExtPropIndexes.Max+3个属性一定会存在，前面ExtPropIndexes.Max-1个要有都有，要没有都没有
            // 如果没有包含其中一个key，这时不需要显示佩戴结果窗口
            if (!resultDict.has(ExtPropIndexes.AttackSpeed)) {
                return false;
            }
            if (goodsOwner !== GoodsOwnerTypes.SelfBag) {
                return false;
            }
            let ToOccupation = -1;
            const goodVO = tableMgr.goodsTable.Find(goodsID);
            if (goodVO != null) {
                ToOccupation = goodVO.ToOccupation;
            }
            if ((ItemCategories.ShouHuChong === goodVO.Categoriy) || (ItemCategories.ChongWu === goodVO.Categoriy) || (ItemCategories.Fashion === goodVO.Categoriy)) {
                return false;
            }
            if (0 === ((1 << Global.CalcOriginalOccupationID(Global.Data.roleData.Occupation)) & ToOccupation)) {
                return false;
            }
            return true;
        }
        /**
         * 显示tips佩戴后结果窗口
         * @param tipsResultState
         * @param tipsResultDict
         * @param nHandValue
         */
        static ShowTipsResultWindow(tipsResultState, tipsResultDict, nHandValue) {
            // TODO: Tip对比窗口
            // int tipsPosx = 115;
            // int tipsResultPosx = -174;
            // int tipsResultPosy = 21;
            // if (tipsResultState) {
            // 	if (null == EquipTipsResult) {
            // 		EquipTipsResult = U3DUtils.NEW<GEquipTipsResult>();
            // 		EquipTipsResult.DPSelectedItem = (s, e) => {
            // 			if (e.IDType == (int)TipsOperationTypes.SwitchHand)
            // 			{
            // 				//testOwner = (int)goodsOwner;
            // 				//Debug.Log(String.Format("第2次：物品ID:{0}, 物品强化:{1}", _GoodData.GoodsID, _GoodData.Forge_level));
            // 				tipsResultDict.Clear();
            // 				tipsResultDict = Global.GetCompareAttributeInfo(_GoodData, (HandTypes)e.Flag);
            // 				tipsResultState = IsShowTipsResultWindow(tipsResultDict, _goodsOwner, _GoodData.GoodsID);
            // 				HandValue = e.Flag;
            // 				//if ((int)ItemCategories.Fashion != Global.GetCategoriyByGoodsID(GoodData.GoodsID))
            // 				//{
            // 				//    ShowTipsResultWindow(tipsResultState, tipsResultDict);
            // 				//}
            // 				ShowTipsResultWindow(true, tipsResultDict, HandValue);
            // 			}
            // 		};
            // 		EquipTipsResult.RenderTips(tipsResultDict, HandValue);
            // 		EquipTipWindow.SetContent(EquipTipWindow.BodyPresenter, EquipTipsResult, 0, 0);
            // 	}
            // 	else {
            // 		EquipTipsResult.Visibility = true;
            // 		EquipTipsResult.RenderTips(tipsResultDict, HandValue);
            // 	}
            // 	//设置位置
            // 	EquipTips.X = tipsPosx;
            // 	EquipTipsResult.X = tipsResultPosx;
            // 	EquipTipsResult.Y = tipsResultPosy;
            // }
            // else {
            // 	if (null != EquipTipsResult) {
            // 		EquipTipsResult.Visibility = false;
            // 	}
            // 	if (null != EquipTips) {
            // 		EquipTips.X = 0;
            // 	}
            // }
        }
        static ClearChildWindow() {
            GTipServiceEx.TipsSender = null;
            GTipServiceEx._GoodData = null;
        }
    }
    /** Tip对应的Icon */
    GTipServiceEx.TipsSender = null;
    /** 如果窗口打开的是纯背包，则此属性为true，如果包含其它的部分，如：交易、仓库等，则为false */
    GTipServiceEx.SelfBagOnly = true;
    /** 佩戴后属性的装备，是左手、右手，此值为一个key */
    GTipServiceEx.HandKey = ExtPropIndexes.Max + 3;
    /** 哪个手佩戴 */
    GTipServiceEx.HandValue = -1;
    /** 货币单位图片名称 */
    GTipServiceEx.PriceIconUnits = [
        "money_gold",
        "money_jifen",
        "money_diamond",
        "money_diamond_binding",
        "money_gold_binding",
        "wangzheDianshu" // 暂时没有该货币系统
    ];
    GTipServiceEx.GoodTips = null; // 物品类道具Tip
    GTipServiceEx.EquipTips = null; // 装备类道具Tip
    GTipServiceEx._GoodData = null; // 临时GoodsData
    GTipServiceEx._goodsOwner = GoodsOwnerTypes.None;
    GTipServiceEx.IsWaitting = false; // 是否是等待显示（向服务器请求数据中...）
    MyUI.GTipServiceEx = GTipServiceEx;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=GTipServiceEx.js.map