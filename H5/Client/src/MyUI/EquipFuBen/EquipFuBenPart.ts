module MyUI {
	/**
	* 装备副本Part 
	*/
	export class EquipFuBenPart extends ui.EquipFuBen.EquipFuBenPartUI {
		constructor() {
			super();
			this._textTitle.text = ConfigLoca.UI_SysName_FuBen_Equip;
			this.registerEventListeners();
			this.initData();
		}
		/** 添加事件监听 */
		private registerEventListeners(): void {
			this.on(Laya.Event.CLICK, this, this.onClickStage);
			gameEventBus.equipFuBenDataRefresh.on(this, this.fuBenDataRefresh);
		}
		/** 移除事件监听 */
		private unregisterEventListeners(): void {
			this.off(Laya.Event.CLICK, this, this.onClickStage);
			gameEventBus.equipFuBenDataRefresh.off(this, this.fuBenDataRefresh);
		}
		destroy(destroyChild?: boolean): void {
			this.unregisterEventListeners();
			super.destroy(destroyChild);
		}
		enterPart(): void {
			this.initData();
		}

		private initData(): void {
			this._boxFuBenInfo.initInfoData();
			this._boxFuBenList.initListData();
			let eFuBenItemData = null;
			this._boxFuBenList.dPSelectedItem = (s, e) => {
				eFuBenItemData = e.Data as EquipFuBenItemData;
				this._boxFuBenInfo.setCurrMode(0);
				this._boxFuBenInfo.setFuBenModeData(eFuBenItemData);
				this._boxFuBenInfo.showInfo();
				this.sendFuBenMode(eFuBenItemData);
			};
			eFuBenItemData = this._boxFuBenList._listFuBenItemRender.array[0] as EquipFuBenItemData;
			this._boxFuBenInfo.setFuBenModeData(eFuBenItemData);
			this._boxFuBenInfo.showInfo();
			this.sendFuBenMode(eFuBenItemData);

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
					windowMgr.closeWindow(WindowID.EquipFuBen);
					break;
			}
		}
		/**
		 * 副本数据更新
		 * @param data 
		 */
		private fuBenDataRefresh(data: EquipFuBenServerData): void {
			this._boxFuBenInfo.fuBenDataRefresh(data);
			this._boxFuBenList.fuBenDataRefresh(data);
		}
		/**
		 * 发送请求副本的3种模式信息
		 * @param mData 
		 */
		private sendFuBenMode(mData: EquipFuBenItemData): void {
			mData.fuBenModeMap.forEach((iData) => {
				Net.sendGetQureyFuBenInfo(iData.fuBenMapCode, iData.fuBenId);
			});
		}
	}
}