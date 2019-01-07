namespace MyUI.Welfare {
	/**
	 * 7日登陆 Part
	 */
	export class SevenDayLoginPart extends ui.Welfare.SevenDayLoginPartUI implements IWindowPart {
		// 模型加载View
		private mCharacterView: Logic.CharacterView;
		// 存放模型的容器
		private mUiScene: Laya.Scene;
		constructor() {
			super();
			this.init();
		}

		init() {
			this._labDesc.text = ConfigLoca.UI_SEVENDAYLOGIN_Desc;
			Net.sendSevenDayActInfo(FuLiActivityEnum.QiRiKuangHuanLogin);
			this.registerEventListeners();
			this.updateCharacterView();
		}

		/** @override */
		enterPart() {

		}
		destroy(destroyChild?: boolean) {
			this.unregisterEventListeners();
			if (this.mCharacterView) this.mCharacterView.destroy(destroyChild);
			if (this.mUiScene) this.mUiScene.destroy(destroyChild);
			super.destroy(destroyChild);
		}
		/** 添加事件监听 */
		private registerEventListeners(): void {
			gameEventBus.sevenDayLoginInfo.on(this, this.showInfo);
			gameEventBus.sevenDayLoginRewardGet.on(this, this.rewardGet);
		}
		/** 移除事件监听 */
		private unregisterEventListeners(): void {
			gameEventBus.sevenDayLoginInfo.off(this, this.showInfo);
			gameEventBus.sevenDayLoginRewardGet.off(this, this.rewardGet);
		}
		/**
		 * 7日登陆信息显示
		 * @param sevenDayData         七日登陆活动信息
		 */
		private showInfo(sevenDayData: NetMsg.SevenDayActQueryData) {
			this.initData();
			const numLen = this._listSevenDay.numChildren;
			// 第几天数
			let dayLen = 1;
			let dayNum = 0; // sevenDayData.ItemDict.length;
			// 记录服务器信息，登陆活动天数奖励数量
			tableMgr.sevenDayLoginTable.AllRows().forEach((sDayVo, index) => {
				if (sevenDayData.ItemDict[index]) {
					dayNum++;
				}
			});

			let sevenDayRewardItem: Laya.Node;
			// 记录每一天登陆奖励信息
			let sevenDayItemData: NetMsg.ISevenDayItemData;
			for (let i = 0; i < numLen; i++) {
				sevenDayRewardItem = this._listSevenDay.getChildAt(i);
				if (sevenDayRewardItem instanceof SevenDayLoginRewardItem) {
					sevenDayItemData = sevenDayData.ItemDict[dayLen];
					dayLen++;
					// 通过sevenDayItemData.AwardFlag来记录每一天的领取状态
					if (sevenDayItemData) {
						sevenDayRewardItem.jieRiRewardGiftGainState = JieRiRewardGiftGainState.Gained ===
							sevenDayItemData.AwardFlag ? JieRiRewardGiftGainState.Gained : JieRiRewardGiftGainState.CanGain;
					} else {
						sevenDayRewardItem.jieRiRewardGiftGainState = i < dayNum ? JieRiRewardGiftGainState.OverTime : JieRiRewardGiftGainState.CanNotGain;
					}
				}
			}
		}
		/**
		 * 遍历7天的奖励
		 */
		private initData() {
			tableMgr.sevenDayLoginTable.AllRows().forEach((sevenDayVo, index) => {
				const sevenDayItem = new SevenDayLoginRewardItem();
				sevenDayItem.initDayData(sevenDayVo);
				sevenDayItem.x = index * (sevenDayItem.width + 15);
				this._listSevenDay.addChild(sevenDayItem);
			});
		}
		/**
		 * 领取奖励
		 * @param position         领取奖励的位置(第几天) 
		 */
		private rewardGet(position: number) {
			let dayRewardItem: Laya.Node;
			// 记录是否有未完成的领取状态
			let aFinished = true;
			const rewardListLen = this._listSevenDay.numChildren;
			// 记录整个活动领取结果的状态
			for (let i = 0; i < rewardListLen; i++) {
				dayRewardItem = this._listSevenDay.getChildAt(i);
				if (dayRewardItem instanceof SevenDayLoginRewardItem) {
					// 记录当前item的领取状态
					if (position === dayRewardItem.itemDays)
						dayRewardItem.jieRiRewardGiftGainState = JieRiRewardGiftGainState.Gained;
					// 判断一下item的领取状态是否有未完成领取的
					if (dayRewardItem.jieRiRewardGiftGainState !== JieRiRewardGiftGainState.Gained
						&& dayRewardItem.jieRiRewardGiftGainState !== JieRiRewardGiftGainState.OverTime) {
						aFinished = false;
					}
				}
			}
			Super.GData.sevenDayLoginActFinished = aFinished;
		}
		/**
		 * 更新模型
		 */
		private async updateCharacterView() {
			if (!this.mCharacterView) {
				this.mUiScene = Laya.Scene.load(Global.getMapPath("ui_character"));
				this.addChild(this.mUiScene);
				const sklUrl = Global.getMonsterActorPath("Monster_008_01");
				this.mCharacterView = new Logic.CharacterView(sklUrl, undefined);
				this.mCharacterView._transform.localScale = new Laya.Vector3(0.5, 0.5, 0.5);
				this.mCharacterView._transform.localPosition = new Laya.Vector3(this.mCharacterView._transform.localPosition.x, this.mCharacterView._transform.localPosition.y + 0.7, this.mCharacterView._transform.localPosition.z);
				// this.m_characterView.setDefaultAni(Logic.Player.aniName_Stand); // 设置默认的动作为站立
				this.mUiScene.addChild(this.mCharacterView);
			}
			// this.m_characterView.changeEquip(Global.Data.roleData.GoodsDataList);
		}
	}
}