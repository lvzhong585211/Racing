namespace MyUI {
	/**
	 * 7日登陆每日奖励Item 
	 */
	export class SevenDayLoginRewardItem extends ui.Welfare.Components.SevenLoginRewardItemUI {
		// 未开启状态
		private mRewardGiftGainState = JieRiRewardGiftGainState.NotNeedGain;
		// 第几天
		private mDays: number = 1;
		// 物品Data
		private goodsData: NetMsg.IGoodsData;
		constructor() {
			super();
			this.init();
		}

		private init(): void {
			this._imgNoGet.visible = this._imgGained.visible = this._imgOverTime.visible = this._rewardEffect.visible = false;
		}

		destroy(destroyChild?: boolean) {
			this._imgGoods.off(Laya.Event.CLICK, this, this.clickGoods);
			super.destroy(destroyChild);
		}
		/**
		 * item对应的天数
		 */
		get itemDays() { return this.mDays; }
		set itemDays(value: number) { this.mDays = value; }
		/**
		 * 奖励领取状态
		 */
		get jieRiRewardGiftGainState() { return this.mRewardGiftGainState; }
		set jieRiRewardGiftGainState(value: JieRiRewardGiftGainState) {
			this.mRewardGiftGainState = value;
			// 已领取图标
			this._imgGained.visible = (value === JieRiRewardGiftGainState.Gained);
			// 超时图标
			this._imgOverTime.visible = (value === JieRiRewardGiftGainState.OverTime);
			// 不可领取遮挡图标
			this._imgNoGet.visible = (value === JieRiRewardGiftGainState.Gained || value === JieRiRewardGiftGainState.OverTime);
			// 可领取特效(临时的)
			this._rewardEffect.visible = (value === JieRiRewardGiftGainState.CanGain);
			// 日期天数显示颜色
			if (this._imgNoGet.visible) {
				this._labDays.color = `#${ColorCode.sevenDayNoActive}`;
			} else {
				this._labDays.color = `#${ColorCode.sevenDayActive}`;
			}
		}
		/**
		 * 显示每日奖励内容
		 * @param dayId                 每日Id 
		 * @param rewardGoods           每日奖励Goods
		 */
		initDayData(sevenDayVo: tables.SevenDayLoginVO): void {
			this._labDays.text = ConfigLoca.UI_SEVENDAYLOGIN_第X天.replace("{0}", sevenDayVo.Id.toString());
			this.itemDays = sevenDayVo.Id;
			let goodVo: tables.GoodsVO;
			// 记录一下goods的字符串结构(物品ID,.,.,.,)
			let goodsDataList = [];
			// 下面几处用到物品，单独存一下
			let goodsId = 0;
			// 通用奖励
			if (!Global.String.IsNullOrEmpty(sevenDayVo.GoodsOne)) {
				goodsDataList = sevenDayVo.GoodsOne.split(",");
				goodsId = parseInt(goodsDataList[0]);
			}
			// 职业奖励
			else {
				// 拆分所配的职业奖励配置(铁蛋|花灵|...)
				const goodsTwoList = sevenDayVo.GoodsTwo.split("|");
				for (let i = 0; i < goodsTwoList.length; i++) {
					goodsDataList = goodsTwoList[i].split(",");
					goodsId = parseInt(goodsDataList[0]);
					goodVo = tableMgr.goodsTable.Find(goodsId);
					// 找到本职业奖励中止
					if (gameIns.gameState.roleData.Occupation === goodVo.MainOccupation) {
						break;
					}
				}
			}
			// 模拟出一个显示的物品GoodData 因为点击的不是正经的GoodsIcon，所以以下要设置显示的图标Icon和点击弹出Tips
			this.goodsData = Global.GetDummyGoodsDataMu(goodsId,
				parseInt(goodsDataList[3]),
				parseInt(goodsDataList[4]),
				parseInt(goodsDataList[6]),
				parseInt(goodsDataList[5]),
				parseInt(goodsDataList[2]),
				parseInt(goodsDataList[1]));
			// 物品图标显示
			this._imgGoods.skin = Global.getWelfareImagePath("fuli_qiri_" + goodsId);
			// 物品Tips
			this._imgGoods.on(Laya.Event.CLICK, this, this.clickGoods);
		}
		/**
		 * 点击奖励图标
		 */
		private clickGoods() {
			if (this.jieRiRewardGiftGainState === JieRiRewardGiftGainState.CanGain)
				Net.sendGetActivityReward(FuLiActivityEnum.QiRiKuangHuanLogin, this.mDays);
			else
				GTipServiceEx.ShowTip(null, TipTypes.GoodsText, GoodsOwnerTypes.SysGifts, this.goodsData);
		}
	}
}