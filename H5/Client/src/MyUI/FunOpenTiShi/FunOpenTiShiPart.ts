/**
* 功能开启提示领取面板 
*/
namespace MyUI {
	export class FunOpenTiShiPart extends ui.FunOpenTiShi.FunOpenTiShiPartUI {
		private funOpenId = 0;                // 功能开启ID
		private funOpenTaskNums = 0;          // 功能开启任务数量
		constructor() {
			super();
			this._getRewardBtn.label = ConfigLoca.UI_COMMON_确定;
		}

		/** 添加事件监听 */
		private registerEventListeners() {
			this._getRewardBtn.clickHandler = laya.utils.Handler.create(this, () => {
				// 领取功能开启奖励
				Net.sendFunOpenTiShiRewardPickUp(this.funOpenId);
			}, undefined, false);
			this._btnClose.on(laya.events.Event.CLICK, this, this.closePart);
			gameEventBus.funOpenTiShiGetReward.on(this, this.completeGetReward);

		}
		/** 移除事件监听 */
		private unregisterEventListeners() {
			this._getRewardBtn.clickHandler.recover();
			this._btnClose.off(laya.events.Event.CLICK, this, this.closePart);
			gameEventBus.funOpenTiShiGetReward.off(this, this.completeGetReward);
		}
		/**
		 * 领取功能结束
		 * @returns {} 
		 */
		private completeGetReward() {
			this.closePart(null);
		}
		/** 
		 * 关闭界面
		*/
		private closePart(e: laya.events.Event) {
			this.unregisterEventListeners();
			windowMgr.closeWindow(WindowID.FunOpenTiShiPart);
		}

		destroy(destroyChild?: boolean): void {
			this.unregisterEventListeners();
			super.destroy(destroyChild);
		}
		/**
		 * 设置功能开启参数
		 * @param openId             功能开启ID
		 * @param taskNums           功能开启任务数量
		 * @param pickUpState        是否有领取的物品
		 * @returns {} 
		 */
		initPartData(openId: number, taskNums: number, pickUpState: boolean) {
			this.registerEventListeners();
			this.funOpenId = openId;
			this.funOpenTaskNums = taskNums;
			let goodsRewar = "";
			let goodsDataStr: string[];       // 物品奖励Str
			const tMgrFunOpenTiSho = tableMgr.funOpenTiShiTable;
			const aRows = tMgrFunOpenTiSho.AllRows();
			tableMgr.funOpenTiShiTable.AllRows().forEach(fOpenTiShi => {
				if (fOpenTiShi.Id === openId) {
					goodsRewar = fOpenTiShi.Rewar;
					this._textDesc.text = Loca.getLang(fOpenTiShi.DescId.toString());
					// 有未领取的奖励
					if (pickUpState) {
						this._getRewardBtn.visible = true;
						this._textFinish.visible = false;
					} else {
						// 没有奖励可领取
						if (fOpenTiShi.Type === 1) { // 等级开启 达到X重X级时
							const levelList = fOpenTiShi.FOpenId.split(",");
							this._textFinish.text = Global.String.Format(ConfigLoca.UI_COMMON_REACHRECEIVE, levelList[0], levelList[1]); // 达到{0}重{1}级后领取
						}
						else { // 任务开启
							this._textFinish.text = Global.String.Format(ConfigLoca.UI_COMMON_REACHTASKRECEIVE, this.funOpenTaskNums); // 完成{0}个任务后领取
						}
						this._getRewardBtn.visible = false;
						this._textFinish.visible = true;
					}

					const strPicArray = fOpenTiShi.Pic.split("|");
					let strImage = strPicArray.length > 0 ? strPicArray[0] : "";
					if (strPicArray.length > 1) {
						let occupation = gameIns.gameState.roleData.Occupation;
						if (occupation === EnumOccupation.DouXian) {
							occupation = 3;
						}
						strImage = strPicArray.length > occupation ? strPicArray[occupation] : "";
					}
					this._showImage.skin = Global.getFunOpenTiShiImagePath(strImage);
					this._textImage.skin = Global.getFunOpenTiShiImagePath(fOpenTiShi.Pic2.toString());

					let isOcc = false;
					// 没有公共的奖励的时候，读取职业区分奖励
					if (Global.String.IsNullOrEmpty(goodsRewar)) {
						isOcc = true;
						goodsRewar = fOpenTiShi.RewarTwo;
					}

					goodsDataStr = goodsRewar.split("|");
					goodsDataStr.forEach(strGoods => {
						const str = strGoods.split(",");
						// 奖励显示
						if (str.length > 0) {
							const goodVo = tableMgr.goodsTable.Find(parseInt(str[0]));
							if (goodVo !== null && goodVo !== undefined) {
								if (isOcc) {
									// 职业区分的奖励
									if (gameIns.gameState.roleData.Occupation === goodVo.MainOccupation) {
										const goodData = Global.GetDummyGoodsDataMu(parseInt(str[0]), parseInt(str[3]), parseInt(str[4]), parseInt(str[6]), parseInt(str[5]),
											parseInt(str[2]), parseInt(str[1]));
										// this._getGoodIcon.updateByGoodsVO(goodVo);
										this._getGoodIcon.updateByGoodsData(goodData);
									}
								} else {
									// 公共的奖励
									this._getGoodIcon.updateByGoodsVO(goodVo);
								}
							}
						}
					});
				}
			});
		}
	}
}