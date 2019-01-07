var MyUI;
(function (MyUI) {
    var Welfare;
    (function (Welfare) {
        /**
         * 在线奖励界面
         */
        class OnlineRewardPart extends ui.Welfare.OnlineRewardPartUI {
            constructor() {
                super();
                this.mCanGetNum = 0; // 可以领取的奖励个数
                this._btnGet.label = ConfigLoca.UI_Reward_Literal_Get;
                MyUI.prepareCSSStyle(this._txtTime.style, "left", 20);
                this._txtTime.innerHTML = "";
                // 初始化列表项
                this.mAniItemsList = [];
                this.mItemsList = [this._item0, this._item1, this._item2, this._item3];
                const aDatas = tableMgr.onlineRewardTable.AllRows();
                this.mItemsList.forEach((element, index) => {
                    element.setNeedTime(aDatas[index].TimeSecs);
                    element.setGoodsList(aDatas[index].ShowGoods);
                });
                // 事件监听
                gameEventBus.onlineRewardInfo.on(this, this.onUpdateUI);
                gameEventBus.onlineRewardGet.on(this, this.onGetRewardGoods);
                this._btnGet.clickHandler = Laya.Handler.create(this, this.onGetButtonClick, null, false);
                // 请求每日在线信息
                Net.sendQureyeEverydayOnlineAwardGiftInfo();
            }
            /** @override */
            destroy(destroyChild) {
                Laya.timer.clear(this, this.onFrameMove);
                gameEventBus.onlineRewardInfo.off(this, this.onUpdateUI);
                gameEventBus.onlineRewardGet.off(this, this.onGetRewardGoods);
                gameEventBus.onlineTimeUpdated.off(this, this.onOnlineTimeUpdate);
                this._btnGet.clickHandler.recover();
                this.mItemsList.length = 0;
                this.mAniItemsList.length = 0;
                super.destroy(destroyChild);
                this.mItemsList = null;
                this.mAniItemsList = null;
            }
            /**
             * 领奖按钮点击处理
             */
            onGetButtonClick() {
                if (Global.Data.MyHuoDongData.EveryDayOnLineAwardStep === this.mItemsList.length) {
                    uiMgr.hintText(ConfigLoca.UI_Online_Get_Failure_AllHadExtract);
                    return;
                }
                if (this.mCanGetNum === 0) {
                    uiMgr.hintText(ConfigLoca.UI_Online_Get_Failure_TimeNotEnough);
                    return;
                }
                if (Global.GetBaoGuoSpaceCount() < this.mCanGetNum) {
                    uiMgr.hintText(ConfigLoca.UI_Welfare_Get_Failure_GridNotEnough);
                    return;
                }
                this._btnGet.disabled = true;
                Net.sendGetEveryDayOnLineAwardGiftCmd(1);
            }
            /**
             * 更新界面显示
             */
            onUpdateUI() {
                const datHuoDong = Global.Data.MyHuoDongData;
                const nRewardStep = datHuoDong.EveryDayOnLineAwardStep;
                const aStrGoodsIds = datHuoDong.EveryDayOnLineAwardGoodsID.split(",");
                Global.Log.Assert(aStrGoodsIds.length >= nRewardStep, `error!!! online reward goods(${aStrGoodsIds.length}) less than step(${nRewardStep}).`);
                let nCanGetNum = 0;
                this.mItemsList.forEach((element, index) => {
                    if (index < nRewardStep) {
                        element.setGetGoodsId(parseInt(aStrGoodsIds[index]));
                    }
                    else {
                        element.setOnlineTime(gameIns.gameState.roleData.DayOnlineSecond) && nCanGetNum++;
                    }
                });
                this.mCanGetNum = nCanGetNum;
                // 在线时长变化监听
                gameEventBus.onlineTimeUpdated.on(this, this.onOnlineTimeUpdate);
            }
            /**
             * 领取到的在线奖励
             * @param nRet 抽奖结果
             * @param nStep 进行到第几步
             * @param aGoodsIds 奖励道具Id列表
             */
            onGetRewardGoods(nRet, nStep, aGoodsIds) {
                if (nRet <= 0) {
                    this._btnGet.disabled = false;
                    return;
                }
                this.mAniItemsList.length = 0;
                const nStartStep = Global.Data.MyHuoDongData.EveryDayOnLineAwardStep;
                for (let nIdx = nStartStep; nIdx < nStep; nIdx++) {
                    const itmOnline = this.mItemsList[nIdx];
                    itmOnline.setGetGoodsIdWithAnimation(aGoodsIds[nIdx - nStartStep]);
                    this.mAniItemsList.push(itmOnline);
                }
                if (this.mAniItemsList.length > 0) {
                    Laya.timer.frameLoop(1, this, this.onFrameMove);
                }
                else {
                    this._btnGet.disabled = false;
                }
            }
            /**
             * 物品转动动画
             */
            onFrameMove() {
                const aRemoveItems = [];
                this.mAniItemsList.forEach(element => {
                    if (element.onFrameMove()) {
                        aRemoveItems.push(element);
                    }
                }, this);
                while (aRemoveItems.length > 0) {
                    const nIdx = this.mAniItemsList.indexOf(aRemoveItems.shift());
                    this.mAniItemsList.splice(nIdx, 1);
                }
                if (this.mAniItemsList.length === 0) {
                    Laya.timer.clear(this, this.onFrameMove);
                    this._btnGet.disabled = false;
                    if (Global.GetBaoGuoSpaceCount() < this.mCanGetNum) {
                        uiMgr.hintText(ConfigLoca.UI_Welfare_Get_Failure_GridNotEnough);
                        Net.sendQureyeEverydayOnlineAwardGiftInfo(); // 领取失败，重置一下数据
                    }
                    else {
                        Net.sendGetEveryDayOnLineAwardGiftCmd(2);
                    }
                }
            }
            /**
             * 在线时长更新
             */
            onOnlineTimeUpdate() {
                const nRewardStep = Global.Data.MyHuoDongData.EveryDayOnLineAwardStep;
                const nOnlineSecs = gameIns.gameState.roleData.DayOnlineSecond;
                const sTime = TimeManager.formatMilliseconds(nOnlineSecs * 1000);
                if (nRewardStep === this.mItemsList.length) {
                    this._txtTime.innerHTML = Global.String.Format(ConfigLoca.UI_Welfare_Online_AllGet, MyUI.ColorCode.encodingText(sTime, MyUI.ColorCode.green));
                    return;
                }
                let nCanGetNum = 0; // 可以领取的奖励个数
                this.mItemsList.forEach((element, index) => {
                    if (index >= nRewardStep) {
                        element.setOnlineTimeWithTicks(nOnlineSecs) && nCanGetNum++;
                    }
                });
                this.mCanGetNum = nCanGetNum;
                if (nCanGetNum > 0) {
                    this._txtTime.innerHTML = Global.String.Format(ConfigLoca.UI_Welfare_Online_CanGet, MyUI.ColorCode.encodingText(sTime, MyUI.ColorCode.green), MyUI.ColorCode.encodingText(this._btnGet.label, MyUI.ColorCode.green));
                }
                else {
                    this._txtTime.innerHTML = Global.String.Format(ConfigLoca.UI_Welfare_Online_NotGet, MyUI.ColorCode.encodingText(sTime, MyUI.ColorCode.green), MyUI.ColorCode.encodingText(`${this.mItemsList.length - nRewardStep}`, MyUI.ColorCode.green));
                }
            }
            /** @implements */
            enterPart() {
            }
        }
        Welfare.OnlineRewardPart = OnlineRewardPart;
    })(Welfare = MyUI.Welfare || (MyUI.Welfare = {}));
})(MyUI || (MyUI = {}));
//# sourceMappingURL=OnlineRewardPart.js.map