/**
* 冒险、战场界面 
*/
namespace MyUI.Activity {

	export class ActivityPart extends ui.ActivityPart.ActivityPartUI implements IWindowPart {
		private mxDataList: ActivityItemData[];			// 冒险活动Data列表
		private zcDataList: ActivityItemData[];			// 战场活动Data列表
		constructor() {
			super();
			this._mxActivityItemRenderList.vScrollBarSkin = "";
			this._zcActivityItemRenderList.vScrollBarSkin = "";
			this._xsActivityItemRenderList.vScrollBarSkin = "";
		}

		/** @implements */
		enterPart() {

		}

		/**
		 * 活动类型显示
		 * @param activityType 
		 */
		init(activityType: number) {
			// const type = activityType >= ActivityTypeEnum.Battlefield ? 1 : 0;
			// _checkTypeStr = Global.GetLang("12955");        //默认优先显示单人 
			// _maoXianSelectStr = _zhanChangSelectStr = Global.GetLang("12955");        //默认优先显示单人 
			if (activityType === WindowID.MaoXian) {
				this.setUpDataList(this.mxDataList, this._mxActivityItemRenderList);
			}
			else {
				this.setUpDataList(this.zcDataList, this._zcActivityItemRenderList);
			}
			this.showActivityStatePanel(activityType);
		}

		/**
		 * 活动类型Panel显示
		 * @param activityType      类型(冒险、战场)
		 */
		private showActivityStatePanel(activityType: number) {
			this._mxActivityItemRenderList.visible = activityType === WindowID.MaoXian;
			this._zcActivityItemRenderList.visible = activityType === WindowID.ZhanChang;
		}
		/**
		 * 冒险活动列表
		 * @param value 
		 * @returns {} 
		 */
		public set setMxDataList(value: ActivityItemData[]) {
			this.mxDataList = value;
		}
		/**
		 * 战场活动列表
		 * @param value 
		 * @returns {} 
		 */
		public set setZcDataList(value: ActivityItemData[]) {
			this.zcDataList = value;
		}
		/**
		 * 限时活动列表
		 * @param value 
		 * @returns {} 
		 */
		public set setXsDataList(value: ActivityItemData[]) {
			this.setUpDataList(value, this._xsActivityItemRenderList);
		}
		/**
		 * 设置活动对应的列表数据
		 * @param dList 
		 * @param pList 
		 * @returns {} 
		 */
		private setUpDataList(dList: ActivityItemData[], pList: Laya.List) {
			if (pList.array === null) {
				pList.array = dList;
				// 接收活动Render里的进入与排序事件
				pList.cells.forEach(render => {
					(render as ActivityItemRender).dPSelectedItem = (s, e) => {
						if (e.IDType === 1) {
							uiMgr.hintText(`${"别点了，还没功能"}`);
						} else {

						}
					};
				});
			}
		}

		destroy(destroyChild?: boolean) {
			super.destroy(destroyChild);
		}
	}
}