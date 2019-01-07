/**
*  系统道具获得框 
*/
namespace MyUI {
	import Handle = laya.utils.Handler;
	export class SystemWizardItem extends ui.SystemWizard.SystemWizardItemUI {
		// UI操作执行回调函数
		public dPSelectedItem: DPSelectedItemEventHandler;
		private autoTimer: number = 0;			  // 自动佩带倒计时数
		private autoTimerText: string;				// 自动佩带合计时时间文本
		private goodsData: NetMsg.IGoodsData;
		constructor() {
			super();
			this.init();
		}

		private init() {
			Style.prepareHtmlFont18Center(this._goodsDesc, ColorCode.normalH);
			// 确认点击事件(佩带等)
			this._btnConfirm.clickHandler = Handle.create(null, () => {
				this.dPSelectedItem(this, new DPSelectedItemEventArgs(1));
			}, undefined, false);
			// 关闭点击事件
			this._btnClose.clickHandler = Handle.create(null, () => {
				this.dPSelectedItem(this, new DPSelectedItemEventArgs(2));
			}, undefined, false);
			this._goodsIcon.ownerType = GoodsOwnerTypes.FallGoods;
		}

		/**按钮名称 */
		public set buttonName(value: string) {
			this._btnConfirm.label = value;
		}
		/**道具描述 */
		public set itemDesc(value: string) {
			this._goodsDesc.innerHTML = value;
		}
		public set aTimerText(value: string) {
			this.autoTimer = 5;
			this.autoTimerText = value;
			this._autoTimer.text = `${this.autoTimer} ${this.autoTimerText}`;
			this.startCountDown();
		}
		public get getGoodsData() {
			return this.goodsData;
		}
		/**
		 * 道具信息显示
		 * @param gData      道具Data
		 */
		public initPartData(gData: NetMsg.IGoodsData) {
			this.goodsData = gData;
			if (gData.Id > 0) {
				const voGoods = tableMgr.goodsTable.Find(gData.GoodsID);
				// Log.Assert(voGoods != null, `can't find goodsVO!!! (goodsID = ${gData.GoodsID})`);
				const sColor = ColorCode.value;
				//#region ======== 道具名字 ========
				this._goodsName.color = `#${voGoods.GoodsColor}`;
				this._goodsName.text = Loca.getLang(voGoods.Title);
				//#endregion
				//#region ======== 道具图标 ========
				this._goodsIcon.updateByGoodsData(gData);
				// this._goodsIcon.updateByGoodsVO(voGoods);
			}
			else {
				// 活跃度这个以后再说
				// _Count.Text = goodsData.GCount.ToString();
				// HuoYueLab1.text = Global.GetLang("活跃度 +") + goodsData.GCount;
				// _Icon.BodyURL = new ImageURL(Global.GetGoodsIconString(goodsData.GoodsID));
			}
		}
		/** 开始倒计时*/
		public startCountDown() {
			Laya.timer.loop(1000, this, this.autoTimeGo);
		}
		/** 计时器递减*/
		private autoTimeGo() {
			this.autoTimer--;
			this._autoTimer.text = `${this.autoTimer} ${this.autoTimerText}`;
			if (this.autoTimer <= 0) {
				// 倒计时结束，清理计时器
				// this.clearTimer();
				// 倒计时结束，自动佩带
				this.dPSelectedItem(this, new DPSelectedItemEventArgs(1));
			}
		}
		// 清理计时器
		public clearTimer() {
			Laya.timer.clear(this, this.autoTimeGo);
		}
	}
}