module MyUI.Welfare {
	import component = Laya.Component;
	/**
     * 充值福利Part 
     */
	export class ChargeWelfarePart extends ui.Welfare.ChargeWelfarePartUI {
		private mDayChargeItemBox: ChargeWelfareItemBox;			// 每日充值列表Box
		private mLeiJiChargeItemBox: ChargeWelfareItemBox;			// 累计充值列表Box
		private mLeiJiConSumeItemBox: ChargeWelfareItemBox;			// 累计消费列表Box
		private mLeiJiChargeNums = 0;		// 累计充值数量
		private mLeiJiConsumeNums = 0;		// 累计消费数量
		constructor() {
			super();
			Style.prepareTabItemRender1(this._tabDayCharge, WindowID.DayCharge);
			Style.prepareTabItemRender1(this._tabLeiJiCharge, WindowID.LeiJiCharge);
			Style.prepareTabItemRender1(this._tabLeiJiConsume, WindowID.LeiJiConsume);
			this.registerEventListeners();
			this._tabDayCharge.label = ConfigLoca.UI_SysName_Welfare_DayCharge;
			this._tabLeiJiCharge.label = ConfigLoca.UI_VIP_LeiJiChongZhi;
			this._tabLeiJiConsume.label = ConfigLoca.UI_SysName_Welfare_Cumulative;
		}

		/** 添加事件监听 */
		private registerEventListeners(): void {
			gameEventBus.chargeWelfareGetStateRefresh.on(this, this.getDayChargeStateRefresh);
			gameEventBus.leiJiChargeGetStateRefresh.on(this, this.getLeiJiChargeStateRefresh);
			gameEventBus.leiJiConsumeGetStateRefresh.on(this, this.getLeiJiConsumeStateRefresh);
			gameEventBus.leiJiNumsStateRefresh.on(this, this.leiJiNumsRefresh);
			this._tabDayCharge.on(Laya.Event.CLICK, this, this.onTabClick);
			this._tabLeiJiCharge.on(Laya.Event.CLICK, this, this.onTabClick);
			this._tabLeiJiConsume.on(Laya.Event.CLICK, this, this.onTabClick);
		}
		/** 移除事件监听 */
		private unregisterEventListeners(): void {
			gameEventBus.chargeWelfareGetStateRefresh.off(this, this.getDayChargeStateRefresh);
			gameEventBus.leiJiChargeGetStateRefresh.off(this, this.getLeiJiChargeStateRefresh);
			gameEventBus.leiJiConsumeGetStateRefresh.off(this, this.getLeiJiConsumeStateRefresh);
			gameEventBus.leiJiNumsStateRefresh.off(this, this.leiJiNumsRefresh);
			this._tabDayCharge.off(Laya.Event.CLICK, this, this.onTabClick);
			this._tabLeiJiCharge.off(Laya.Event.CLICK, this, this.onTabClick);
			this._tabLeiJiConsume.off(Laya.Event.CLICK, this, this.onTabClick);
		}
		enterPart() {
			this.welfareShow(WindowID.DayCharge);
			Net.sendGetAllRepayActivityInfo();
		}
		/**
		 * 页签点击处理
		 * @param e 事件类型
		 */
		private onTabClick(e: Laya.Event) {
			const itmTab = e.target as TabItemRender;
			this.welfareShow(itmTab.winId);
		}
		/**
		 * 福利类型显示
		 * @param showType 
		 */
		private welfareShow(showType: number) {
			// 页签选中
			const dayChargeState = showType === WindowID.DayCharge;
			const leiJiChargeState = showType === WindowID.LeiJiCharge;
			const leiJiConsumeState = showType === WindowID.LeiJiConsume;

			this._tabDayCharge.selectedVisibility = dayChargeState;
			this._tabLeiJiCharge.selectedVisibility = leiJiChargeState;
			this._tabLeiJiConsume.selectedVisibility = leiJiConsumeState;

			// 每日充值
			if (dayChargeState) {
				if (!this.mDayChargeItemBox) {
					this.mDayChargeItemBox = new ChargeWelfareItemBox();
					this.mDayChargeItemBox.initData(showType);
					this._boxList.addChild(this.mDayChargeItemBox);
					Net.sendQueryPayActiveInfo(FuLiActivityEnum.MeiRiChongZhiHaoLi);
				}
			}
			// 累计充值
			if (leiJiChargeState) {
				if (!this.mLeiJiChargeItemBox) {
					this.mLeiJiChargeItemBox = new ChargeWelfareItemBox();
					this.mLeiJiChargeItemBox.initData(showType);
					this._boxList.addChild(this.mLeiJiChargeItemBox);
					this.mLeiJiChargeItemBox.leiJiChargeNums = this.mLeiJiChargeNums;
					Net.sendQueryPayActiveInfo(FuLiActivityEnum.TotalCharge);
				}
			}
			// 累计消费
			if (leiJiConsumeState) {
				if (!this.mLeiJiConSumeItemBox) {
					this.mLeiJiConSumeItemBox = new ChargeWelfareItemBox();
					this.mLeiJiConSumeItemBox.initData(showType);
					this._boxList.addChild(this.mLeiJiConSumeItemBox);
					this.mLeiJiConSumeItemBox.leiJiConsumeNums = this.mLeiJiConsumeNums;
					Net.sendQueryPayActiveInfo(FuLiActivityEnum.TotalConsume);
				}
			}
			if (this.mDayChargeItemBox) {
				// this._boxDayTime.visible = dayChargeState;
				this.dayTimesGo();
				this.mDayChargeItemBox.visible = dayChargeState;
			} else {
				this.clearDayTimesGo();
			}
			if (this.mLeiJiChargeItemBox) this.mLeiJiChargeItemBox.visible = leiJiChargeState;
			if (this.mLeiJiConSumeItemBox) this.mLeiJiConSumeItemBox.visible = leiJiConsumeState;
		}
		/**
		 * 每日充值领取奖励状态改变
		 * @param nState 状态值
		 */
		private getDayChargeStateRefresh(nState: string): void {
			this.mDayChargeItemBox.renderGetState(nState);
		}
		/**
		 * 累计充值领取奖励状态改变
		 * @param nState 状态值
		 */
		private getLeiJiChargeStateRefresh(nState: string): void {
			this.mLeiJiChargeItemBox.renderGetState(nState);
		}
		/**
		 * 累计消费领取奖励状态改变
		 * @param nState 状态值
		 */
		private getLeiJiConsumeStateRefresh(nState: string): void {
			this.mLeiJiConSumeItemBox.renderGetState(nState);
		}
		/**
		 * 累计数量修改
		 * @param chargeNums 累计充值数量
		 * @param consumeNums 累计消费数量
		 */
		private leiJiNumsRefresh(chargeNums: number, consumeNums: number): void {
			this.mLeiJiChargeNums = chargeNums;
			this.mLeiJiConsumeNums = consumeNums;
			if (this.mLeiJiChargeItemBox) this.mLeiJiChargeItemBox.leiJiChargeNums = this.mLeiJiChargeNums;
			if (this.mLeiJiConSumeItemBox) this.mLeiJiConSumeItemBox.leiJiConsumeNums = this.mLeiJiConsumeNums;
		}
		/** 当天剩余时间计时器计时 */
		private dayTimesGo() {
			this.dayTimesCountDown();
			Laya.timer.loop(1000, this, this.dayTimesCountDown);
		}
		/** 清理计时器 */
		private clearDayTimesGo() {
			Laya.timer.clear(this, this.dayTimesCountDown);
		}
		/** 
		 * 每日充值倒计时时间
		 */
		private dayTimesCountDown() {
			const dayDate = new Date(TimeManager.getCorrectLocalTimes());
			const dayOverDate = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate(), 23, 59, 59);
			const nTimes = dayDate.getTime()//this.nowTimes();
			const dTimes = dayOverDate.getTime(); //this.dayTimes();
			// Global.Log.Error("1 chaTimes = " + (dTimes - nTimes) + "   " + "   dayDate.valueOf = " + nTimes + "    dayOverDate.valueOf = " + dTimes);
			// Global.Log.Error("2 chaTimes = " + (this.dayTimes() - this.nowTimes()) + "   " + "   dayDate.valueOf = " + this.nowTimes() + "    dayOverDate.valueOf = " + this.dayTimes());
			this.mDayChargeItemBox.dayTimesCountText(TimeManager.formatMillisecondsNoFont(dTimes - nTimes));
		}

		destroy(destroyChild?: boolean) {
			this.unregisterEventListeners();
			this.clearDayTimesGo();
			super.destroy(destroyChild);
		}
	}
}