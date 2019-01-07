namespace MyUI {
	/**
	 * 首充Part 
	 */
	export class FirstChargePart extends ui.FirstRecharge.FirstRechargePartUI {
		// 首充奖励领取状态(0是未达到领取条件，1是可领取，2已领取)
		private mState: number;
		// 模型加载View
		private mCharacterView: Logic.CharacterView;
		// 存放模型的容器
		private mUiScene: Laya.Scene;
		constructor() {
			super();
			Net.sendQueryPayActiveInfo(FuLiActivityEnum.InputFirst);
			this.registerEventListeners();
			this.initGoodsData();
			this.updateCharacterView();
			// 充值和领取都是一个文本
			this._btnChongZhi.label = this._btnGetReward.label = ConfigLoca.UI_COMMON_PromptlyGet;
			this._btnChongZhi.visible = this._btnGetReward.visible = this._imageYiLingQu.visible = false;
		}

		/** 添加事件监听 */
		private registerEventListeners() {
			gameEventBus.firstChongZhiStateRefresh.on(this, this.refurbishUi);
			this._btnChongZhi.clickHandler = Laya.Handler.create(this, () => {
				uiMgr.hintText("没有充值功能");
			}, undefined, false);
			this._btnGetReward.clickHandler = Laya.Handler.create(this, () => {
				Net.sendGetChongZhiJiangLi(FuLiActivityEnum.InputFirst, AwardType.Normal);
				this.closePart(null);
			}, undefined, false);
			this._btnClose.on(laya.events.Event.CLICK, this, this.closePart);
		}
		/** 移除事件监听 */
		private unregisterEventListeners() {
			gameEventBus.firstChongZhiStateRefresh.off(this, this.refurbishUi);
			this._btnChongZhi.clickHandler.recover();
			this._btnGetReward.clickHandler.recover();
			this._btnClose.off(laya.events.Event.CLICK, this, this.closePart);
		}

		destroy(destroyChild?: boolean): void {
			this.unregisterEventListeners();
			if (this.mCharacterView) this.mCharacterView.destroy(destroyChild);
			if (this.mUiScene) this.mUiScene.destroy(destroyChild);
			super.destroy(destroyChild);
		}
		/**
		 * 奖励显示
		 */
		private initGoodsData() {
			tableMgr.firstChargeTable.AllRows().forEach((chargeVo, index) => {
				const goodsOneList = chargeVo.GoodsOne.split("|");
				const goodsLen = goodsOneList.length;
				for (let i = 0; i < goodsLen; i++) {
					const strList = goodsOneList[i].split(",");
					const goodsId = parseInt(strList[0]);
					const isEquip = Global.goodsIsEquip(goodsId);
					// 是装备
					if (isEquip) {
						const goodVo = tableMgr.goodsTable.Find(goodsId);
						// 这里判断一下如果不是本职业的装备停止，进行下一次的筛选(因为表里会把所有职业的和通用的都配到一起)
						if (gameIns.gameState.roleData.Occupation !== goodVo.MainOccupation) {
							continue;
						}
					}
					const goodsData = Global.GetDummyGoodsDataMu(goodsId, parseInt(strList[3]), parseInt(strList[4]), parseInt(strList[6]), parseInt(strList[5]), parseInt(strList[2]), parseInt(strList[1]));
					const goodsIcon = new GoodsIcon();
					goodsIcon.setImageBack1(true);
					goodsIcon.scale(0.95, 0.95);
					const row = Math.floor((index) / 5);
					if (row === 0) {
						goodsIcon.x = index * (goodsIcon.width + 10);
					} else {
						goodsIcon.x = (index - 5) * (goodsIcon.width + 10) + 45;
					}
					goodsIcon.y = row * (goodsIcon.height + 5);
					goodsIcon.updateByGoodsData(goodsData);
					this._listGoods.addChild(goodsIcon);
					index++;
				}
			});
		}
		/** 
		 * 关闭界面
		 */
		private closePart(e: laya.events.Event) {
			windowMgr.closeWindow(WindowID.FirstCharge);
		}
		/**
		 * 领取状态更新
		 * @param nState 状态值
		 */
		refurbishUi(nState: number): void {
			if (this.mState === nState) {
				return;
			}
			this.mState = nState;
			if (0 === nState) {
				this.getStateShow(false, true, false);
			}
			if (1 === nState) {
				// m_BtnLingQv.isEnabled = true;
				this.getStateShow(true, false, false);
			}
			if (2 === nState) {
				this.getStateShow(false, false, true);
			}
		}
		/**
		 * 领取状态显示
		 * @param gBtnState 领取按钮显示状态
		 * @param cZBtnStae 充值按钮显示状态
		 * @param yImageStae 已领取图片显示状态
		 */
		private getStateShow(gBtnState: boolean, cZBtnStae: boolean, yImageStae: boolean) {
			this._btnGetReward.visible = gBtnState;
			this._btnChongZhi.visible = cZBtnStae;
			this._imageYiLingQu.visible = yImageStae;
		}
		/**
		 * 更新模型
		 */
		private async updateCharacterView() {
			if (!this.mCharacterView) {
				this.mUiScene = Laya.Scene.load(Global.getMapPath("ui_character"));
				this.addChild(this.mUiScene);
				const sklUrl = Global.getMonsterActorPath("Monster_012");
				this.mCharacterView = new Logic.CharacterView(sklUrl, undefined);
				this.mCharacterView._transform.localScale = new Laya.Vector3(0.5, 0.5, 0.5);
				this.mCharacterView._transform.localPosition = new Laya.Vector3(this.mCharacterView._transform.localPosition.x + 0.5, this.mCharacterView._transform.localPosition.y + 0.7, this.mCharacterView._transform.localPosition.z);
				// this.m_characterView.setDefaultAni(Logic.Player.aniName_Stand); // 设置默认的动作为站立
				this.mUiScene.addChild(this.mCharacterView);
			}
			// this.m_characterView.changeEquip(Global.Data.roleData.GoodsDataList);
		}
	}
}