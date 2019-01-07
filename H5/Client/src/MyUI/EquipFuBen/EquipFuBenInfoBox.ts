module MyUI {
	/**
	* 装备副本信息Box 
	*/
	export class EquipFuBenInfoBox extends ui.EquipFuBen.EquipFuBenInfoBoxUI {
		// UI操作执行回调函数
		dPSelectedItem: DPSelectedItemEventHandler;
		private fuBenData: EquipFuBenItemData;
		/** 当前选中的模式 */
		private currSelectedMode = 0;
		/** 3个模式Item列表 */
		private diffItemList: EquipFuBenDifficultyItem[] = null;
		constructor() {
			super();
			this._checkDouQiHuiShou.label = ConfigLoca.UI_EquipFuBen_DouQiHuiShouText;
			this._btnEnter.label = ConfigLoca.UI_EquipFuBen_TiaoZhanText;
			this._btnSweeping.label = ConfigLoca.UI_EquipFuBen_SaoDangText;
			this.diffItemList = [this._itemModePT, this._itemModeKN, this._itemModeLY];
			// 挑战按钮点击
			this._btnEnter.clickHandler = Laya.Handler.create(this, this.btnEnterClick, null, false);
			// 扫荡按钮点击
			this._btnSweeping.clickHandler = Laya.Handler.create(this, this.btnSweepingClick, null, false);
		}
		/**
		 * 设置当前显示模式
		 * @param value 
		 */
		setCurrMode(value: number): void {
			this.currSelectedMode = value;
		}
		/**
		 * 设置副本数据
		 * @param value 
		 */
		setFuBenModeData(itemData: EquipFuBenItemData): void {
			this.fuBenData = itemData;
		}
		/**
		 * 初始化副本Info信息
		 */
		initInfoData(): void {
			// 设置3个模式Item的背景图片
			this._itemModePT._imageFuBenDiff.skin = Global.getFuBenActivityImagePath("101");
			this._itemModeKN._imageFuBenDiff.skin = Global.getFuBenActivityImagePath("102");
			this._itemModeLY._imageFuBenDiff.skin = Global.getFuBenActivityImagePath("103");
			// 设置3个模式的名称
			this._itemModePT.setModeFuBenName(ConfigLoca.UI_EquipFuBen_Mode_TuTong);
			this._itemModeKN.setModeFuBenName(ConfigLoca.UI_EquipFuBen_Mode_KunNan);
			this._itemModeLY.setModeFuBenName(ConfigLoca.UI_EquipFuBen_Mode_LianYu);
			// 3个模式的点击选中
			this._itemModePT.on(Laya.Event.CLICK, this, () => {
				this.currSelectedMode = 0;
				this.clickModeItem();
			});
			this._itemModeKN.on(Laya.Event.CLICK, this, () => {
				this.currSelectedMode = 1;
				this.clickModeItem();
			});
			this._itemModeLY.on(Laya.Event.CLICK, this, () => {
				this.currSelectedMode = 2;
				this.clickModeItem();
			});
		}
		/**
		 * 显示服务器副本数据(如副本次数、通关时间等)
		 * @param data 
		 */
		fuBenDataRefresh(data: EquipFuBenServerData): void {
			const modeType = tableMgr.fuBenTable.Find(data.copyID).FuBenLevel - 1;
			const diffItem = this.diffItemList[modeType];
			const modeData = this.fuBenData.fuBenModeMap.get(modeType);
			modeData.fuBenClientSec = data.nClientSec;
			modeData.fuBenBestTimer = data.nBestTimer;
			modeData.fuBenStrName = data.strName;
			// 副本是否开启
			if (data.bIsOpen) {
				diffItem.setFuBenOpenState(true);
				diffItem.setFuBenStrNums(true, "", data.nEnterNum, modeData.fuBenModeMaxNums);
			} else {
				diffItem.setFuBenOpenState(false);
				diffItem.setFuBenStrNums(false, modeData.fuBenName);
			}
			this.fuBenData.fuBenModeMap[modeType] = modeData;
			this.showInfo();
		}
		/**
		 * 显示副本信息
		 */
		showInfo(): void {
			// this.showFuBenModeNums();
			const modeData = this.fuBenData.fuBenModeMap.get(this.currSelectedMode);
			// 副本开启等级
			this._textFuBenLevel.text = modeData.fuBenOpenLevel;
			// 副本推荐战力
			this._textFuBenZhanLiNums.text = `${modeData.fuBenTJZhanLi}`;
			// 副本扫荡要求
			this._textFuBenRequire.text = modeData.fuBenSaoDangYaoQiu;
			const fuBenDropStrList = modeData.fuBenBossDrop.split("|");  //tableMgr.monsterGoodsListTable.Find(modeData.fuBenBoosId).GoodsID.split("|");
			UIHelper.createGoodsList(this._listFuBenDrop, fuBenDropStrList, 0.8, fuBenDropStrList.length, 1);
			// 当前选中的模式
			this._textFuBenFastestTG.text = modeData.fuBenStrName;
			this._textFuBenFastestTGTimes.text = UIHelper.FormatSecs(modeData.fuBenBestTimer);
			this._textFuBenMyFastestTG.text = gameIns.gameState.RoleName;
			this._textFuBenMyFastestTGTimes.text = UIHelper.FormatSecs(modeData.fuBenClientSec);
			this.modeItemSelected();
		}
		/**
		 * 设置副本不同模式的进入次数
		 */
		showFuBenModeNums(): void {
			let modeData = this.fuBenData.fuBenModeMap.get(0);
			this._itemModePT.setFuBenStrNums(true, "", modeData.fuBenModeEnterNums, modeData.fuBenModeMaxNums);
			modeData = this.fuBenData.fuBenModeMap.get(1);
			this._itemModeKN.setFuBenStrNums(true, "", modeData.fuBenModeEnterNums, modeData.fuBenModeMaxNums);
			modeData = this.fuBenData.fuBenModeMap.get(2);
			this._itemModeLY.setFuBenStrNums(true, "", modeData.fuBenModeEnterNums, modeData.fuBenModeMaxNums);
		}
		/**
		 * 选中副本模式Item
		 */
		private clickModeItem(): void {
			this.modeItemSelected();
			this.showInfo();
		}
		/**
		 * 模式Items选中状态
		 */
		private modeItemSelected(): void {
			this._itemModePT.setSelected(this.currSelectedMode === 0 ? true : false);
			this._itemModeKN.setSelected(this.currSelectedMode === 1 ? true : false);
			this._itemModeLY.setSelected(this.currSelectedMode === 2 ? true : false);
		}
		/**
		 * 挑战副本
		 */
		private btnEnterClick(): void {
			const richangItemData = Global.Data.RiChangFuBenItemDataDict[this.fuBenData.fuBenId];
			if (richangItemData != null && richangItemData != undefined) {
				if (!richangItemData.LevelAllow) {
					uiMgr.hintText(ConfigLoca.UI_EquipFuBen_NoCanEnter_Level);			// 未达到副本进入等级条件，无法进入该副本
					return;
				}
				else if ((richangItemData.MaxEnterNum > 0 && richangItemData.EnterNum >= richangItemData.MaxEnterNum) ||
					(richangItemData.MaxFinishNum > 0 && richangItemData.FinishNum >= richangItemData.MaxFinishNum)) {
					if (richangItemData.NeedYuanBao <= 0) {
						uiMgr.hintText(ConfigLoca.UI_EquipFuBen_FuBenNameNoCanEnter_Nums);		// 您今天进入【{0}】副本的次数已经达到了最大限制,不允许扫荡!
						return;
					}
				}
			}
			uiMgr.hintText(ConfigLoca.UI_COMMON_FunNoOpen);			// 未开放
			// Net.sendGetEnterFuBen(this.fuBenData.fuBenModeMap.get(this.currSelectedMode).fuBenId);
		}
		/**
		 * 扫荡副本
		 */
		private btnSweepingClick(): void {
			const richangItemData = Global.Data.RiChangFuBenItemDataDict[this.fuBenData.fuBenId];
			if (richangItemData != null && richangItemData != undefined) {
				if (!richangItemData.LevelAllow) {
					uiMgr.hintText(ConfigLoca.UI_EquipFuBen_NoCanSaoDangFuBen);			// 未达到扫荡该副本的条件
					return;
				}
				else if ((richangItemData.MaxEnterNum > 0 && richangItemData.EnterNum >= richangItemData.MaxEnterNum) ||
					(richangItemData.MaxFinishNum > 0 && richangItemData.FinishNum >= richangItemData.MaxFinishNum)) {
					uiMgr.hintText(ConfigLoca.UI_EquipFuBen_FuBenEnterNumsCeiling);			// 副本进入次数达到上限,无法扫荡副本
					return;
				}

			}
			uiMgr.hintText(ConfigLoca.UI_COMMON_FunNoOpen);			// 未开放
			return;
			// Net.sendGetSaoDangFuBen(this.fuBenData.fuBenMapCode, this.fuBenData.fuBenModeMap.get(this.currSelectedMode).fuBenId, this._checkDouQiHuiShou.selected ? 1 : 0);
		}

		destroy(destroyChild?: boolean): void {
			this._btnEnter.clickHandler.recover();
			this._btnSweeping.clickHandler.recover();
			super.destroy(destroyChild);
		}
	}
}