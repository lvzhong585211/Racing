/**
* 系统快捷引导栏管理器
*/
namespace MyUI {
	export class SystemWizardManager {
		zhanLiUp = 0;			// 新装备的战力提升值
		private equipTipsTime = 15;
		private alphaTime = 1;
		private gDbId = 0;
		private isShowState = false;			// 是否已有提示引导在显示
		constructor() {
			this.registerEventListeners();
		}
		public set goodsDbId(value: number) { this.gDbId = value; }
		public get goodsDbId() { return this.gDbId; }
		public set isShowStates(value: boolean) { this.isShowState = value; }
		public get isShowStates() { return this.isShowState; }
		/**
		* 注册事件侦听器
		*/
		private registerEventListeners() {
			gameEventBus.newEquipSystemWizard.on(this, this.initPartData);
		}
		/**
         * 取消注册的事件侦听器
         */
		private unregisterEventListeners() {
			gameEventBus.newEquipSystemWizard.off(this, this.initPartData);
		}
		/**
		 * 道具提示引导显示
		 * @param wizardType 道具提示类型
		 */
		public initPartData(wizardType: number) {
			// 目前仅显示以下几种
			switch (wizardType) {
				case SystemWizardEnum.NewEquip:
					break;
				case SystemWizardEnum.HintMUTiShiGoods:
					break;
				case SystemWizardEnum.HintMUNewChengJiu:
					break;
				case SystemWizardEnum.HintMUNewHuoYue:
					break;
				default:
					return;
			}
			const str = "";
			switch (wizardType) {
				case SystemWizardEnum.NewEquip:
					const goodsData = Global.GetGoodsDataByDbID(this.goodsDbId);
					const catetoriy = tableMgr.goodsTable.getCategoriy(goodsData.GoodsID);
					if ((ItemCategories.ShouHuChong !== catetoriy) && (ItemCategories.MengChongWu !== catetoriy)
						&& (ItemCategories.ChongWu !== catetoriy) && (ItemCategories.Fashion !== catetoriy)) {
						this.addWizardItem(goodsData, SystemWizardEnum.NewEquip, this.equipTipsTime, this.alphaTime);
					}
					break;
			}
		}
		/**
		 * 道具提示引导Item添加
		 * @param goodsData 
		 * @param type 
		 * @param delay 
		 * @param during 
		 */
		public addWizardItem(goodsData: NetMsg.IGoodsData, type: SystemWizardEnum, delay: number = -1, during: number = -1): SystemWizardItem {
			let item: SystemWizardItem = null;
			if (null != goodsData) {
				item = new SystemWizardItem(); // .AddWizardItem(/*_ListBox.ItemsSource, */DPSelectItemHandler);
				uiMgr.addChild(item, UILayer.Window);
				item.dPSelectedItem = (s, e) => {
					if (e.IDType === 1) {
						Global.ToUseGoods(item.getGoodsData);
					}
					item.clearTimer();
					uiMgr.removeChild(item, UILayer.Window);
					item = null;
					this.isShowState = false;
					uiMgr.retrieveNewEquipSystemWizard();
				};
				item.buttonName = tableMgr.goodsTable.getName(goodsData.GoodsID); // UIHelper.FormatGoodsName(goodsData);
				if (SystemWizardEnum.NewEquip === type) {
					item.buttonName = Loca.getLang("73");	// 佩戴
					const zhanLiUpDesc = Loca.getLang("5516") /* ▲*/ + this.zhanLiUp;
					item.itemDesc = Global.GetColorStringForNGUIText(ColorCode.white, Loca.getLang("781") /*战力:*/ + Global.GetGoodsDataZhanLi(goodsData), ColorCode.green, zhanLiUpDesc);
					// 判断是否需要倒计时自动佩带
					if (this.bShowAutoEquipTips(goodsData)) {
						item.aTimerText = Loca.getLang("12483");	// 秒后自动佩戴
					}

					if (this.zhanLiUp <= 0) {
						// item._Button.gameObject.SetActive(false);
					}
				}
				else if (SystemWizardEnum.HintMUTiShiGoods === type) {
					// item.ButtonName = Global.GetLang("查看");
					item.buttonName = Loca.getLang("90");	// 使用
					item.itemDesc = Global.GetColorStringForNGUIText(ColorCode.yellow, Loca.getLang("5517"));	// 获得新物品
				}
				else if (SystemWizardEnum.HintMUNewChengJiu === type) {
					// item.ButtonName = Global.GetLang("查看");
					// item.Desc = ColorCode.EncodingText(Loca.getLang("获得成就"), ColorCode.orange);
					// item.Name = ColorCode.EncodingText(Loca.getLang(NewChengJiuName), ColorCode.orange);
					// item._Button.gameObject.SetActive(false);
					// item.GetComponent<Collider>().enabled = false;
				}
				else if (SystemWizardEnum.HintMUNewHuoYue === type) {
					// item.ButtonName = Global.GetLang("查看");
					// item.Desc = ColorCode.EncodingText(Loca.getLang("完成活跃"), ColorCode.orange);
					// item.Name = ColorCode.EncodingText(Loca.getLang(NewChengJiuName), ColorCode.orange);
					// item._Button.gameObject.SetActive(false);
					// item.GetComponent<Collider>().enabled = false;
					// item.EquipObj.gameObject.SetActive(false);
					// item.HuoYueObj.gameObject.SetActive(true);
				}
				item.initPartData(goodsData);
				this.isShowState = true;
			}
			return item;
		}
		/**
		 * 是否提示5秒后自动装备
		 * @param goodsData 	物品数据
		 */
		private bShowAutoEquipTips(goodsData: NetMsg.IGoodsData): Boolean {
			const goodVo = tableMgr.goodsTable.Find(goodsData.GoodsID);
			if (null == goodVo)
				return false;
			const category = goodVo.Categoriy;
			if (category >= 0 && category < ItemCategories.EquipMax) {
				const actionType = goodVo.ActionType; // 佩戴方式
				const handType = goodVo.HandType; // 放置位置 
				let gdList: NetMsg.IGoodsData[] = null; // 准备卸载下来的装备
				if (category >= ItemCategories.WuQi_Jian && category <= ItemCategories.WuQi_NuJianTong) { // 判断要佩戴的道具否是武器
					gdList = Super.FindWuQi(category, actionType, handType);
				}
				else {
					// 找出要除武器外要卸载的装备
					gdList = Super.FindEquip(category);
				}
				// 没有需要卸载的装备,提示自动装备
				if (gdList === undefined || gdList === null || gdList.length <= 0)
					return true;
			}
			return false;
		}

		destroy(): void {
			this.unregisterEventListeners();
		}
	}
}