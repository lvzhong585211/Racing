module MyUI {
	/**
	 * 充值福利Render Box 
	 */
	export class ChargeWelfareItemBox extends ui.Welfare.Components.ChargeWelfareItemBoxUI {
		/** 有没有可领取的奖励 */
		isHaveGetState = false;
		private cellIndex = 0;		// 计时Index
		private currTimes: number;			// 记录当前时间用做延迟判断
		constructor() {
			super();
			this._listWelfare.vScrollBarSkin = "";
			this._boxDayCharge.visible = false;
			this._boxLeiJiCharge.visible = false;
			this._boxLeiJiConsume.visible = false;
			this._btnAllGet.label = ConfigLoca.UI_COMMON_AllGet;
			this._btnAllGet.clickHandler = Laya.Handler.create(this, () => {
				if (this.isHaveGetState === false) {
					if (Date.now() - this.currTimes < 1000)
						return;
					this.currTimes = Date.now();
					//无可领取的奖励
					uiMgr.hintHtmlText(ConfigLoca.UI_COMMON_NoCanGetReward);
					return;
				}
				this.loopAllGetReward();
			}, undefined, false);
		}
		/**
		 * 充值福利对应的列表数据(每日充值、累计充值、累计消费)
		 * @param welfareType 充值福利类型
		 */
		initData(welfareType: number): void {
			let chargeDataList: ChargeWelfareData[] = [];
			switch (welfareType) {
				case WindowID.DayCharge:		//每日充值
					this._txtDayTimeTitle.text = ConfigLoca.UI_COMMON_DayTime_Title;
					this._txtDayCountDownTimeTitle.text = ConfigLoca.UI_COMMON_DayCountDownTime_Title;
					this._boxDayCharge.visible = true;
					chargeDataList = this.DayChargeInfo(welfareType);
					break;
				case WindowID.LeiJiCharge:		//累计充值
					this._boxLeiJiCharge.visible = true;
					this._listWelfare.repeatY = tableMgr.leiJiChargeTable.AllRows().length;
					chargeDataList = this.LeiJiChargeInfo(welfareType);
					break;
				case WindowID.LeiJiConsume:		//累计消费
					this._boxLeiJiConsume.visible = true;
					this._listWelfare.repeatY = tableMgr.leiJiConsumeTable.AllRows().length;
					chargeDataList = this.LeiJiConsumeInfo(welfareType);
					break;
			}
			this._listWelfare.itemRender = ChargeWelfareRender;
			this._listWelfare.array = chargeDataList;
		}
		/** 每日充值Data */
		private DayChargeInfo(welfareType: number): ChargeWelfareData[] {
			const chargeDataList: ChargeWelfareData[] = [];
			this._listWelfare.repeatY = tableMgr.dayChongZhiTable.AllRows().length;
			tableMgr.dayChongZhiTable.AllRows().forEach((dayVo, index) => {
				const chargeData = new ChargeWelfareData();
				chargeData.type = welfareType;
				chargeData.id = dayVo.Id;
				chargeData.chargeNums = dayVo.MinYuanBao;
				chargeData.rewardStr = dayVo.GoodsIDs;
				chargeDataList.push(chargeData);
				// this.AddRender(chargeData, index);
			});
			return chargeDataList;
		}
		/** 累计充值Data */
		private LeiJiChargeInfo(welfareType: number): ChargeWelfareData[] {
			const chargeDataList: ChargeWelfareData[] = [];
			this._listWelfare.repeatY = tableMgr.leiJiChargeTable.AllRows().length;
			tableMgr.leiJiChargeTable.AllRows().forEach((dayVo, index) => {
				const chargeData = new ChargeWelfareData();
				chargeData.type = welfareType;
				chargeData.id = dayVo.Id;
				chargeData.chargeNums = dayVo.MinYuanBao;
				chargeData.rewardStr = dayVo.GoodsOne;
				chargeDataList.push(chargeData);
				// this.AddRender(chargeData, index);
			});
			return chargeDataList;
		}
		/** 累计消费Data */
		private LeiJiConsumeInfo(welfareType: number): ChargeWelfareData[] {
			const chargeDataList: ChargeWelfareData[] = [];
			this._listWelfare.repeatY = tableMgr.leiJiConsumeTable.AllRows().length;
			tableMgr.leiJiConsumeTable.AllRows().forEach((dayVo, index) => {
				const chargeData = new ChargeWelfareData();
				chargeData.type = welfareType;
				chargeData.id = dayVo.Id;
				chargeData.chargeNums = dayVo.MinYuanBao;
				chargeData.rewardStr = dayVo.GoodsOne;
				chargeDataList.push(chargeData);
				// this.AddRender(chargeData, index);
			});
			return chargeDataList;
		}
		/**
		 * 添加render到容器中
		 * @param chargeData 充值数据
		 */
		private AddRender(chargeData: ChargeWelfareData, index: number) {
			const render: ChargeWelfareRender = new ChargeWelfareRender();
			render.dataSource = chargeData;
			render.y = render.height * index;
			this._listWelfare.addChild(render);
		}
		/**
		 * render 领取状态
		 * @param state 
		 */
		renderGetState(nState: string) {
			this.isHaveGetState = false;
			const sList = nState.split(",");
			sList.forEach((state, index) => {
				const render = this._listWelfare.getCell(index);
				if (render instanceof ChargeWelfareRender) {
					const sta = parseInt(state);
					render.setChargeState(parseInt(state));
					if (sta === chargeStateEnum.Can) {
						this.isHaveGetState = true;
					}
				}
			});
		}
		/**
		 * 每日充值时间倒计时时间
		 * @param timesStr 时间字符串
		 */
		dayTimesCountText(timesStr: string): void {
			this._txtTimes.text = timesStr;
		}
		/** 累计充值数量 */
		set leiJiChargeNums(value: number) {
			this._txtCurrLeiJiCharge.text = `${value}`;
		}
		/** 累计消费数量 */
		set leiJiConsumeNums(value: number) {
			this._txtCurrLeiJiConsume.text = `${value}`;
		}
		/** 一键领取计时器 */
		private loopAllGetReward() {
			Laya.timer.loop(100, this, this.allGetReward);
		}
		/** 清除一键领取计时器 */
		private clearLoopAllGetReward() {
			Laya.timer.clear(this, this.allGetReward);
		}
		/** 一键领取奖励 */
		private allGetReward() {
			const render = this._listWelfare.getCell(this.cellIndex);
			if ((render as ChargeWelfareRender).getState === chargeStateEnum.Can) {
				(render as ChargeWelfareRender).getReward();
			}
			this.cellIndex++;
			//找完所有奖励项，结束
			if (this.cellIndex >= this._listWelfare.cells.length) {
				this.cellIndex = 0;
				this.clearLoopAllGetReward();
			}
		}

		destroy(destroyChild?: boolean) {
			if (this._btnAllGet.clickHandler) this._btnAllGet.clickHandler.recover();
			super.destroy(destroyChild);
		}
	}
}