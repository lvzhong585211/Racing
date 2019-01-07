namespace MyUI {
	import GameInstance = GameMode.GameInstance;

	/**
	* Vip界面 
	*/
	export class VipPart extends ui.Vip.VipPartUI {
		// UI操作执行回调函数
		dPSelectedItem: DPSelectedItemEventHandler;
		// 当前的显示等级
		private currVipLevel: number;
		// 领取状态
		private vipRewardFlags: number;
		// 记录当前时间用做延迟判断
		private currTimes: number;
		constructor() {
			super();
			this.init();
		}
		/**
		 * 基础信息显示
		 * @returns {} 
		 */
		private init(): void {
			this._titleText.text = ConfigLoca.UI_VIP_Title;
			this._descText.text = ConfigLoca.UI_VIP_LeiJiChongZhi;
			this._descText1.text = ConfigLoca.UI_VIP_JiKeShengJi;
			this._chongZhiBtn.label = ConfigLoca.UI_VIP_ChongZhiTitle;

			// this._progressBar.width = 750;			
			this._vipItemCanvas.optimizeScrollRect = true;
			this._vipItemCanvas.scrollRect = new Laya.Rectangle(0, 0, 1000, 476);
			this._leftImageBtn.mouseEnabled = this._rightImageBtn.mouseEnabled = true;
			// 左右箭头点击区域扩大
			MyUI.enlargeHitArea(this._leftImageBtn, 80, 80);
			MyUI.enlargeHitArea(this._rightImageBtn, 80, 80);
		}
		/**
		 * 初始化数据
		 */
		initData() {
			this.registerEventListeners();
			this.getVipData();
		}
		/** 添加事件监听 */
		private registerEventListeners(): void {
			this.on(Laya.Event.CLICK, this, this.onClickStage);
			gameEventBus.vipPartRefresh.on(this, this.setVipData);
			gameEventBus.vipRewardResult.on(this, this.rewardResult);
		}
		/** 移除事件监听 */
		private unregisterEventListeners(): void {
			this.off(Laya.Event.CLICK, this, this.onClickStage);
			gameEventBus.vipPartRefresh.off(this, this.setVipData);
			gameEventBus.vipRewardResult.off(this, this.rewardResult);
		}
		/** 
		 * 关闭界面
		*/
		private closePart(): void {
			// this.unregisterEventListeners();
			this.dPSelectedItem(this, new DPSelectedItemEventArgs());
		}

		destroy(destroyChild?: boolean): void {
			this.unregisterEventListeners();
			super.destroy(destroyChild);
		}
		/**
		 * Vip奖励领取状态
		 * @param value 
		 * @returns {} 
		 */
		set vipRewardFlag(value: number) { this.vipRewardFlags = value; }
		get vipRewardFlag() { return this.vipRewardFlags; }
		/**
		 * 获取Vip信息
		 * @returns {} 
		 */
		getVipData() {
			Net.sendGetVipInfo();
		}
		/**
		 * 显示Vip的等级、升级经验与领取状态
		 * @param levelExp		当前的冲值经验		
		 * @param rewardFlag	奖励领取状态
		 * @returns {} 
		 */
		setVipData(levelExp: number, rewardFlag: number): void {
			this.currVipLevel = Global.GetVIPLeve();
			this.vipRewardFlag = rewardFlag;
			let nextVipLevel = this.currVipLevel + 1;
			const guiZuLen = tableMgr.guiZuTable.AllRows().length;
			// 判断Vip等级是否超过上限
			if (nextVipLevel >= guiZuLen) {
				nextVipLevel = guiZuLen;
			}

			const guiZuVo = tableMgr.guiZuTable.Find(nextVipLevel);
			// 需要充值的数量
			this._nextVipLevelNumsText.text = `${guiZuVo.NeedExp}`;
			this._nextVipLevelText.text = `${nextVipLevel}`;
			this._progressBarText.text = `${levelExp > guiZuVo.NeedExp ? guiZuVo.NeedExp : levelExp}/${guiZuVo.NeedExp}`;
			this._progressBar.value = levelExp > guiZuVo.NeedExp ? 1 : levelExp / guiZuVo.NeedExp;
			this._currVipLevelText.text = this.currVipLevel.toString();

			this.refreshVipData();
		}
		/**
		 * 奖励领取结果
		 * @param rewardFlag	领取状态
		 * @returns {} 
		 */
		rewardResult(rewardFlag: number): void {
			this.vipRewardFlag = rewardFlag;
			this.refreshVipItemRewardFlag();
		}
		/**
		 * 刷新Vip等级显示数据
		 * @returns {} 
		 */
		refreshVipData(): void {
			this._vipItemCanvas.repeatX = tableMgr.guiZuTable.AllRows().length;
			tableMgr.guiZuTable.AllRows().forEach((guiZuVo, index) => {
				const vipItem = new VipItem();
				vipItem.initData(guiZuVo.VipLevel, this.vipRewardFlag);
				vipItem.dPSelectedItem = (s, e) => {

				};
				vipItem.x = index * (vipItem.width + 5);
				this._vipItemCanvas.addChildAt(vipItem, index);
			});
			// 直接设置当前的Vip等级显示，太快显示不出来，故加个延迟
			Laya.timer.once(200, this, () => {
				this._vipItemCanvas.scrollRect.x = (this.currVipLevel === 0 ? 0 : this.currVipLevel - 1) * 1000;
			});
		}
		/** 
		 * 刷新领取状态
		 */
		private refreshVipItemRewardFlag(): void {
			const iLen = this._vipItemCanvas.numChildren;
			for (let i = 0; i < iLen; i++) {
				const vipItem = this._vipItemCanvas.getChildAt(i);
				if (vipItem && vipItem instanceof VipItem) {
					vipItem.refreshRewardFlag(this.vipRewardFlag);
				}
			}
		}

		/**
		 * 点击触发
		 * @param e 
		 * @returns {} 
		 */
		private onClickStage(e: Laya.Event): void {
			const clickObj = e.target as Laya.Component;
			switch (clickObj) {
				case this._btnClose:			// 关闭界面
					this.closePart();
					break;
				case this._leftImageBtn:        // 左翻页显示
					if (Date.now() - this.currTimes < 1000)
						return;
					this.currTimes = Date.now();
					// 不能低于Vip最小等级
					if (this.currVipLevel <= 0) {
						return;
					}
					this.currVipLevel--;
					this.playTween();
					break;
				case this._rightImageBtn:       // 右翻页显示
					if (Date.now() - this.currTimes < 1000)
						return;
					this.currTimes = Date.now();
					// 不能超过最大Vip等级
					if (this.currVipLevel + 1 > tableMgr.guiZuTable.AllRows().length) {
						return;
					}
					this.currVipLevel++;
					this.playTween();
					break;
				case this._chongZhiBtn:			// 充值
					uiMgr.hintText(ConfigLoca.UI_COMMON_FunNoOpen);			// 未开放
					break;
			}
		}
		/**
		 * 显示对应Vip等级数据(执行翻页效果)
		 * @returns {} 
		 */
		private playTween(): void {
			const vipItem = this._vipItemCanvas.getChildAt(this.currVipLevel);
			if (vipItem) {
				// this.currVipLevel * 1000(切换相应的Vip等级页，所在的位置)
				Laya.Tween.to(this._vipItemCanvas.scrollRect, { x: (this.currVipLevel === 0 ? 0 : this.currVipLevel - 1) * 1000 }, 300, Laya.Ease.linearIn);
			}
		}
	}
}