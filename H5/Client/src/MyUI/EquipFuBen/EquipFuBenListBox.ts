module MyUI {
	/**
	* 装备副本Item列表Box 
	*/
	export class EquipFuBenListBox extends ui.EquipFuBen.EquipFuBenListBoxUI {
		// UI操作执行回调函数
		dPSelectedItem: DPSelectedItemEventHandler;

		constructor() {
			super();
			this._listFuBenItemRender.vScrollBarSkin = "";
			this.on(Laya.Event.CLICK, this, this.onStageClick)
		}

		initListData(): void {
			const fuBenItemDataList = new Array<EquipFuBenItemData>();
			let needTimeStr = "";
			let minSaoDangTime = 0;
			let enterNum = 0;
			// tableMgr.fuBenTable.AllRows().forEach((fBVo) => {
			tableMgr.fuBenTabTable.AllRows().forEach((fBTabVo) => {
				// 筛选剧情副本类型
				if (TableUtils.getFieldNumber(fBTabVo.FuBenType) === ActivityCategorys.JuQingFuBen) {
					const fuBenItemData = new EquipFuBenItemData();
					const fuBenModeMap = new Map<number, EquipFuBenModeData>();
					const fNoOpenTiShiText = this.fuBenItemTaskOpen(fBTabVo.TabId);
					fuBenItemData.fuBenOpenState = fNoOpenTiShiText === "" ? true : false;
					fuBenItemData.fuBenNoOpenTiShiText = fNoOpenTiShiText;
					let fIndex = 0;
					for (const fBVo of tableMgr.fuBenTable.AllRows()) {
						fuBenItemData.fuBenId = fBVo.ID;
						fuBenItemData.fuBenName = fBTabVo.Name;
						fuBenItemData.fuBenMapCode = fBVo.MapCode;
						fuBenItemData.fuBenIcon = fBTabVo.Preview;
						// 筛选副本与副本类型表 TabID 类型一致的副本数据
						if (fBTabVo.TabId === fBVo.TabID) {
							fuBenItemData.fuBenJieNums = fBTabVo.CopyGrade;
							fuBenItemData.fuBenNeedLevel = fBVo.MinLevel;
							fuBenItemData.fuBenZhuanShengLevel = fBVo.MinZhuanSheng;
							minSaoDangTime = tableMgr.fuBenMapTable.Find(fBVo.MapCode).MinSaoDangTime;
							needTimeStr = minSaoDangTime === -1 ? "-" : Global.String.Format(ConfigLoca.UI_EquipFuBen_Seconds_TongGuan, UIHelper.FormatSecs(tableMgr.fuBenMapTable.Find(fBVo.MapCode).MinSaoDangTime * 60));
							enterNum = Global.Data.RiChangFuBenItemDataDict[fBVo.ID] === undefined ? 0 : Global.Data.RiChangFuBenItemDataDict[fBVo.ID].EnterNum;
							// 记录每个副本里的各种模式数据
							fuBenModeMap.set(fIndex, new EquipFuBenModeData(fBVo.ID, fBVo.FuBenLevel, enterNum, fBVo.FinishNumber,
								UIHelper.FormatLevelLimit(fBVo.MinLevel, fBVo.MinZhuanSheng), fBVo.ZhanLi, needTimeStr, false, fBVo.BossID, fBVo.RewardGoods, fBVo.CopyName, fBVo.MapCode));
							fIndex++;
							// 每个剧情副本有3个模式, 达到跳出
							if (fIndex == 3) {
								break;
							}
						}
					}
					fuBenItemData.fuBenModeMap = fuBenModeMap;
					fuBenItemDataList.push(fuBenItemData);
				}
			});
			// });
			this._listFuBenItemRender.itemRender = EquipFuBenItemRender;
			this._listFuBenItemRender.repeatY = fuBenItemDataList.length;
			this._listFuBenItemRender.array = fuBenItemDataList;
			// 加个小延迟默认显示第一个副本，如有需求自动跳到某个副本再说
			Laya.timer.once(100, this, () => {
				this.fuBenItemRenderSelected(fuBenItemDataList[0]);
			});
		}
		/**
		 * 副本列表点击
		 * @param e 
		 */
		private onStageClick(e: Laya.Event): void {
			const clickObj = e.target as Laya.Component;
			if (clickObj instanceof EquipFuBenItemRender) {
				// 点击副本Item抛出委托
				this.dPSelecedItemData(clickObj.dataSource);
				this.fuBenItemRenderSelected(clickObj.dataSource);
			}
		}
		/**
		 * 副本信息显示委托
		 * @param data 副本Data
		 */
		private dPSelecedItemData(data: EquipFuBenItemData): void {
			const dpsArgs = new DPSelectedItemEventArgs();
			dpsArgs.Data = data;
			this.dPSelectedItem(this, dpsArgs);
		}
		/**
		 * 显示服务器副本数据(如副本次数、通关时间等)
		 * @param data 
		 */
		fuBenDataRefresh(data: EquipFuBenServerData): void {
			this._listFuBenItemRender.array.forEach((fDataRender) => {
				if (fDataRender instanceof EquipFuBenItemRender && fDataRender.dataSource != null) {
					fDataRender.dataSource.fuBenModeMap.forEach((mData) => {
						if (mData.fuBenId === data.copyID) {
							mData.fuBenModeOpenState = data.bIsOpen;
							mData.fuBenModeEnterNums = data.nEnterNum;
							fDataRender.setFuBenModeNums(fDataRender.modeNumsList[mData.fuBenModeType], mData.fuBenModeType - 1, data.nEnterNum);
						}
					})
				}
			});
		}
		/**
		 * 左则副本ItemRender选中
		 * @param itemRender 
		 */
		fuBenItemRenderSelected(itemRenderData: EquipFuBenItemData): void {
			this._listFuBenItemRender.cells.forEach((itemRender) => {
				if (itemRender instanceof EquipFuBenItemRender && itemRender.dataSource != null) {
					if (itemRender.dataSource.fuBenId === itemRenderData.fuBenId) {
						itemRender.setItemRenderSelected(true);
					} else {
						itemRender.setItemRenderSelected(false);
					}
				}
			});
		}
		/**
		 * 判断副本是否开启(开启返回空字符串，未开启返回提示文本)
		 * @param tabId 
		 */
		private fuBenItemTaskOpen(tabId: number): string {
			// 副本解锁条件
			const fuBenNeedMap = Global.getSystemParamIntDict1ByName("FuBenNeed");
			if (fuBenNeedMap != undefined && fuBenNeedMap != null) {
				let taskId = 0;
				if (fuBenNeedMap.has(tabId)) {
					taskId = parseInt(fuBenNeedMap.get(tabId)[1]);
					if (gameIns.gameState.roleData.CompletedMainTaskID < taskId) {
						return ConfigLoca.UI_Task_NeedFinishMianTask + Global.String.Format(ConfigLoca.UI_Common_FuHao, Task.getTaskTitleById(taskId));
					}
				}
			}
			return "";
		}
	}
}