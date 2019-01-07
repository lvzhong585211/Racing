var MyUI;
(function (MyUI) {
    /**
    * VipItem vip等级对应的数据
    */
    class VipItem extends ui.Vip.VipItemUI {
        constructor() {
            super();
            this.currViplevels = 0;
            this.init();
            this.registerEventListeners();
        }
        init() {
            this._teQuanBuffImage.mouseEnabled = this._jingPoHuiShouImage.mouseEnabled = this._suiShenCangKuImage.mouseEnabled = true;
            this._vipDescTitleText1.text = ConfigLoca.UI_VIP_PrivilegeTitle;
            this._vipDescTitleText2.text = ConfigLoca.UI_VIP_PrivilegeReward;
            this._getRewardBtn.visible = this._yiLIngQuImage.visible = false;
            this._getRewardBtn.label = ConfigLoca.UI_COMMON_LingQu;
        }
        /** 添加事件监听 */
        registerEventListeners() {
            this.on(Laya.Event.CLICK, this, this.onClickComponent);
        }
        /** 移除事件监听 */
        unregisterEventListeners() {
            this.off(Laya.Event.CLICK, this, this.onClickComponent);
        }
        destroy(destroyChild) {
            this.unregisterEventListeners();
            super.destroy(destroyChild);
        }
        /**
         * 当前的显示Item Vip等级
         * @param value
         * @returns {}
         */
        set currVipLevel(value) { this.currViplevels = value; }
        get currVipLevel() { return this.currViplevels; }
        /**
         * 所有触发的点击响应
         * @param component
         */
        onClickComponent(component) {
            const clickObj = component.target;
            let needLevel = 0; // 特权开启所需等级
            switch (clickObj) {
                case this._teQuanBuffImage: // 特权Buff
                    uiMgr.hintText(ConfigLoca.UI_COMMON_FunNoOpen);
                    break;
                case this._jingPoHuiShouImage: // 精魄回收
                    needLevel = tableMgr.vipDailyAwardsTable.Find(VipPrivilegeEnum.ZiDongHuiShou).ViPlev;
                    if (Global.GetVIPLeve() >= needLevel) {
                        uiMgr.hintText(ConfigLoca.UI_COMMON_FunNoOpen);
                        // this.dPSelectedItem(this, new DPSelectedItemEventArgs());
                    }
                    else {
                        uiMgr.hintText(ConfigLoca.UI_VIP_贵族等级不足X级.replace("{0}", needLevel.toString()));
                    }
                    break;
                case this._suiShenCangKuImage: // 随身仓库
                    needLevel = tableMgr.vipDailyAwardsTable.Find(VipPrivilegeEnum.SuiShenCangKu).ViPlev;
                    // 判断开启随身仓库的等级是否符合
                    if (Global.GetVIPLeve() >= needLevel) {
                        uiMgr.hintText(ConfigLoca.UI_COMMON_FunNoOpen);
                        // this.dPSelectedItem(this, new DPSelectedItemEventArgs());
                    }
                    else {
                        uiMgr.hintText(ConfigLoca.UI_VIP_贵族等级不足X级.replace("{0}", needLevel.toString()));
                    }
                    break;
                case this._getRewardBtn: // 领取奖励
                    Net.sendGetVipReward(this.currVipLevel);
                    break;
            }
        }
        /**
         * 设置Vip等级相关数据(权限、奖励等)
         * @param vipLevel      Vip等级
         * @returns {}
         */
        initData(vipLevel, rewardFlag) {
            const guiZuLen = tableMgr.guiZuTable.AllRows().length;
            if (vipLevel === 0)
                vipLevel = 1;
            else if (vipLevel > guiZuLen)
                vipLevel = guiZuLen;
            this.currVipLevel = vipLevel;
            const guiZuVo = tableMgr.guiZuTable.Find(vipLevel);
            const rewardStr = guiZuVo.LiBaoAward;
            const rewardStrList = rewardStr.split("|");
            this._rewardList.repeatX = rewardStrList.length;
            // 当前Vip等级可以领取的奖励
            rewardStrList.forEach((goodsStr, index) => {
                const goodsStrList = goodsStr.split(",");
                const goodIcon = new MyUI.GoodsIcon();
                const goodsData = Global.GetDummyGoodsDataMu(parseInt(goodsStrList[0]), parseInt(goodsStrList[3]), parseInt(goodsStrList[4]), parseInt(goodsStrList[6]), parseInt(goodsStrList[5]), parseInt(goodsStrList[2]), parseInt(goodsStrList[1]));
                goodIcon.updateByGoodsData(goodsData);
                goodIcon.x = index * (goodIcon.width + 15);
                this._rewardList.addChild(goodIcon);
            });
            // Vip等级
            this._vipDescTitleText.text = ConfigLoca.UI_VIP_PrivilegeLevelTitle.replace("{0}", vipLevel.toString());
            // 权限描述
            const descList = Loca.getLang(guiZuVo.DestributInfo.toString()).split(",");
            this._quanXianList.repeatY = descList.length;
            descList.forEach((desc, index) => {
                const vipQuanXianItem = new MyUI.VipQuanXianItem();
                vipQuanXianItem.setText(desc);
                vipQuanXianItem.y = index * (vipQuanXianItem.height + 20);
                this._quanXianList.addChild(vipQuanXianItem);
            });
            this.refreshRewardFlag(rewardFlag);
        }
        /**
         * 刷新领取状态
         * @param rewardFlag		领取状态值
         * @returns {}
         */
        refreshRewardFlag(rewardFlag) {
            if ((rewardFlag & Global.getBitValue(this.currVipLevel + 1)) > 0) {
                this._getRewardBtn.visible = false;
                this._yiLIngQuImage.visible = true;
            }
            else {
                this._getRewardBtn.visible = true;
                this._yiLIngQuImage.visible = false;
                if (Global.GetVIPLeve() < this.currVipLevel) {
                    this._getRewardBtn.disabled = true;
                }
                else {
                    this._getRewardBtn.disabled = false;
                }
            }
        }
    }
    MyUI.VipItem = VipItem;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=VipItem.js.map