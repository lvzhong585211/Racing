var MyUI;
(function (MyUI) {
    var Welfare;
    (function (Welfare) {
        /**
         * 在线奖励列表项
         */
        class OnlineItemRender extends ui.Welfare.Components.OnlineItemRenderUI {
            constructor() {
                super();
                this._goodsList.vScrollBarSkin = "";
                this._goodsList.scrollBar.mouseWheelEnable = false;
                this._goodsList.scrollBar.touchScrollEnable = false;
                this._progTime.visible = false;
                this._imgState.visible = false;
                this._txtState.text = "";
                this.mCurGetState = RewardState.Invalid;
            }
            /** @override */
            destroy(destroyChild) {
                super.destroy(destroyChild);
            }
            /**
             * 设置领奖需要的在线时间
             * @param nTime 时间（分钟）
             */
            setNeedTime(nTime) {
                this.mNeedTime = nTime * 60;
                this._txtTime.text = Global.String.Format(ConfigLoca.UI_Time_Format_OnlyMinute, nTime);
            }
            /**
             * 设置奖励道具列表
             * @param aGoodsIds 道具Id列表
             */
            setGoodsList(aGoodsIds) {
                // 多加一个道具到列表的末位，为了列表转动时的效果更真实（在转到最后的时候会把列表突然拉到头，会从最后一个道具突然切换成第一个道具）
                const aNewGoodsIds = aGoodsIds.concat(aGoodsIds[0]);
                this._goodsList.array = aNewGoodsIds;
            }
            /**
             * 设置已经在线的时间
             * @param nTime 时间（秒）
             * @returns true=可以领奖、false=不可领奖
             */
            setOnlineTime(nTime) {
                if (nTime < this.mNeedTime) {
                    this.curGetState = RewardState.Not;
                    this._progTime.value = nTime / this.mNeedTime;
                    return false;
                }
                else {
                    this.curGetState = RewardState.Can;
                    return true;
                }
            }
            /**
             * 设置已经在线的时间，用于客户端时间Tick更新调用
             * @param nTime 时间（秒）
             * @returns true=可以领奖、false=不可领奖
             */
            setOnlineTimeWithTicks(nTime) {
                if (this.mCurGetState === RewardState.Had) {
                    return false;
                }
                return this.setOnlineTime(nTime);
            }
            /**
             * 设置抽到的物品Id
             * @param nGoodsId 道具Id
             */
            setGetGoodsId(nGoodsId) {
                const nIdIdx = this._goodsList.array.findIndex(element => element === nGoodsId);
                Global.Log.Assert(nIdIdx !== -1, `error!!! online item goods(${nGoodsId}) not found.`);
                this._goodsList.scrollTo(nIdIdx);
                this.curGetState = RewardState.Had;
            }
            /**
             * 设置抽到的物品Id，并播放抽奖动画
             * @param nGoodsId 道具Id
             */
            setGetGoodsIdWithAnimation(nGoodsId) {
                this.mGetGoodsStopIdx = this._goodsList.array.findIndex(element => element === nGoodsId);
                Global.Log.Assert(this.mGetGoodsStopIdx !== -1, `error!!! animation online item goods(${this.mGetGoodsStopIdx}) not found.`);
                // this.mGetGoodsStopIdx = (this._goodsList.array.length * Math.random()) | 0; // 测试时随机转动停止
                this.mLoopNumOfTimes = 0;
                this.afterOneLoopComplete();
            }
            /**
             * 物品转动动画
             */
            onFrameMove() {
                this._goodsList.scrollBar.value += this.mFrameMoveDist;
                const nStartIdx = this._goodsList.startIndex;
                if (this.mLoopNumOfTimes > 6 && nStartIdx === this.mGetGoodsStopIdx) {
                    this._goodsList.scrollTo(this.mGetGoodsStopIdx);
                    this.curGetState = RewardState.Had;
                    return true;
                }
                if (nStartIdx === this._goodsList.length - 1) {
                    this.afterOneLoopComplete();
                }
                return false;
            }
            /**
             * 一圈转动完成后
             */
            afterOneLoopComplete() {
                this._goodsList.scrollBar.value = 0;
                this.mLoopNumOfTimes++;
                if (this.mLoopNumOfTimes < 4) { // 快速转三圈
                    this.mFrameMoveDist = 20;
                }
                else if (this.mLoopNumOfTimes < 6) { // 中速转两圈
                    this.mFrameMoveDist = 10;
                }
                else if (this.mLoopNumOfTimes === 6) { // 最后一圈慢速
                    this.mFrameMoveDist = 5;
                }
            }
            /**
             * 设置当前领奖状态
             */
            set curGetState(value) {
                if (this.mCurGetState !== value) {
                    this.mCurGetState = value;
                    value === RewardState.Not && this.updateNotGetState();
                    value === RewardState.Can && this.updateCanGetState();
                    value === RewardState.Had && this.updateHadGetState();
                }
            }
            /**
             * 更新未领取状态
             */
            updateNotGetState() {
                this._progTime.visible = true;
                this._imgState.visible = false;
                this._txtState.text = "";
            }
            /**
             * 更新可领取状态
             */
            updateCanGetState() {
                this._progTime.visible = false;
                this._imgState.visible = true;
                this._imgState.skin = Global.getWelfareAtlasImgPath("online_state_can");
                this._txtState.text = ConfigLoca.UI_Welfare_Reward_CanExtract;
                this._txtState.color = "#afdcff";
            }
            /**
             * 更新已领取状态
             */
            updateHadGetState() {
                this._progTime.visible = false;
                this._imgState.visible = true;
                this._imgState.skin = Global.getWelfareAtlasImgPath("online_state_had");
                this._txtState.text = ConfigLoca.UI_Reward_HadGet;
                this._txtState.color = "#536f90";
            }
        }
        Welfare.OnlineItemRender = OnlineItemRender;
    })(Welfare = MyUI.Welfare || (MyUI.Welfare = {}));
})(MyUI || (MyUI = {}));
//# sourceMappingURL=OnlineItemRender.js.map