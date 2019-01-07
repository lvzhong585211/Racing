namespace MyUI {
	/**
	 * 货币Item  需要设置货币类型，数量以及是否需要跳转按钮 , 也可以在编辑器里直接设置
	 */
	export class HuoBiItem extends ui.Components.HuoBiItemUI {

		private mItemType: MoneyTypes; // Item的货币类型
		private mAutoOffEvent: Base.MyEventAutoOff; // 事件监听

		constructor() {
			super();
			this.huoBiJumpBtnShow = false;
			this.mAutoOffEvent = gameEventBus.huoBiNumsRefresh.on(this, (type) => {
				type === this.mItemType && this.updateMoney();
			});
		}

		/** @override */
		public destroy(destroyChild?: boolean) {
			this.mAutoOffEvent.off();
			super.destroy(destroyChild);
			this.mAutoOffEvent = null;
		}

		/**
		 * 设置跳转按钮是否显示
		 */
		public set huoBiJumpBtnShow(value: boolean) {
			this._btnJump.visible = value;
		}

		/**
		 * Item的货币类型
		 */
		public get itemType(): MoneyTypes { return this.mItemType; }
		public set itemType(value: MoneyTypes) {
			this.mItemType = value;
			this._imageHuoBi.skin = Global.getMoneyIconPath(value);
			this.updateMoney();
		}

		/**
		 * 更新货币数目显示
		 */
		public updateMoney() {
			this._textHuoBiNums.text = NationHelper.FormatNumber(Global.GetRoleOwnNumByMoneyType(this.mItemType));
		}
	}
}