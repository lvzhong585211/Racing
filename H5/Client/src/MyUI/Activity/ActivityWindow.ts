namespace MyUI.Activity {
	/**
	 * 活动窗口类 (冒险、各类活动等)
	 */
	export class ActivityWindow extends MyUI.BaseWindow {
		constructor() {
			super();
			this.registerEventListeners();
		}

		/** @override */
		protected updateUI(nWinId: WindowID): IWindowPart {
			if (nWinId === WindowID.ZhanChang) {
				let vewChild = this.mChildInstanceMap.get(nWinId);
				if (!vewChild) { // 战场和冒险共用同一个界面
					vewChild = this.getChildInstance(WindowID.MaoXian);
					this.mChildInstanceMap.set(WindowID.ZhanChang, vewChild);
				}
			}

			const vewChild = super.updateUI(nWinId);
			if (nWinId === WindowID.MaoXian || nWinId === WindowID.ZhanChang) {
				const actPart = vewChild as ActivityPart;
				actPart.init(nWinId);
			}
			return vewChild;
		}

		/** @override */
		protected doAfterCreateChildInstance(nWinId: WindowID, vewChild: IWindowPart) {
			if (nWinId === WindowID.MaoXian) {
				const actPart = vewChild as ActivityPart;
				actPart.setMxDataList = this.getMaoXianActivityDataList();
				actPart.setZcDataList = this.getZhanChangActivityDataList();
				actPart.setXsDataList = this.getXianShiActivityDataList();
			}
		}

		/** 添加事件监听 */
		private registerEventListeners() {

		}

		/** 移除事件监听 */
		private unregisterEventListeners() {

		}

		/** @override */
		onClosed(type?: string) {
			this.unregisterEventListeners();
		}

		destroy(destroyChild?: boolean) {
			this.unregisterEventListeners();
			super.destroy(destroyChild);
		}

		/**
		 * 冒险活动Data列表
		 * @returns {} 
		 */
		private getMaoXianActivityDataList(): ActivityItemData[] {
			return [
				new ActivityItemData(ActivityTypeEnum.Story, "Adv_Tab_000"),
				new ActivityItemData(ActivityTypeEnum.BangpaiBoss, "Adv_Tab_402"),
				new ActivityItemData(ActivityTypeEnum.Exp, "Adv_Tab_002"),
				new ActivityItemData(ActivityTypeEnum.Coin, "Adv_Tab_001"),
				new ActivityItemData(ActivityTypeEnum.PaTa, "Adv_Tab_003"),
				new ActivityItemData(ActivityTypeEnum.WorldBoss, "Adv_Tab_101"),
				new ActivityItemData(ActivityTypeEnum.GoldBoss, "Adv_Tab_102"),
				new ActivityItemData(ActivityTypeEnum.Demon, "Adv_Tab_100"),
				new ActivityItemData(ActivityTypeEnum.Bloodcastle, "Adv_Tab_103"),
				new ActivityItemData(ActivityTypeEnum.GuZhanChang, "Adv_Tab_104"),
				new ActivityItemData(ActivityTypeEnum.Longjing, "Adv_Tab_105"),
				new ActivityItemData(ActivityTypeEnum.AngelTemple, "Adv_Tab_106"),
				new ActivityItemData(ActivityTypeEnum.KaLiMaTemple, "Adv_Tab_201"),
				new ActivityItemData(ActivityTypeEnum.EMoLaiXi, "Adv_Tab_202"),
				/*new ActivityItemData(ActivityTypeEnum.LoveFuBen, "Adv_Tab_203"),*/
				new ActivityItemData(ActivityTypeEnum.LuolanFazhen, "Adv_Tab_204"),
				new ActivityItemData(ActivityTypeEnum.TianShaZhiZhan, "Adv_Tab_205"),
				new ActivityItemData(ActivityTypeEnum.YuansuShiLian, "Adv_Tab_206")
			];
		}

		/**
		 * 战场活动Data列表
		 * @returns {} 
		 */
		private getZhanChangActivityDataList(): ActivityItemData[] {
			return [
				new ActivityItemData(ActivityTypeEnum.Arena, "Adv_Tab_300"),
				new ActivityItemData(ActivityTypeEnum.PkCamp, "Adv_Tab_302"),
				new ActivityItemData(ActivityTypeEnum.PkKing, "Adv_Tab_301"),
				new ActivityItemData(ActivityTypeEnum.LuoLanChengZhan, "Adv_Tab_400"),
				/*new ActivityItemData(ActivityTypeEnum.ShengYuZhengBa, "Adv_Tab_401"),*/
				new ActivityItemData(ActivityTypeEnum.HuanYingShiYuan, "Adv_Tab_501"),
				new ActivityItemData(ActivityTypeEnum.TianTiArena, "Adv_Tab_502"),
				new ActivityItemData(ActivityTypeEnum.YongzheZhanChang, "Adv_Tab_503"),
				new ActivityItemData(ActivityTypeEnum.HuoDongBoss, "Adv_Tab_504"),
				new ActivityItemData(ActivityTypeEnum.LoveFuBen, "Adv_Tab_505")
			];
		}

		/**
		 * 限时活动Data列表
		 * @returns {} 
		 */
		private getXianShiActivityDataList(): ActivityItemData[] {
			return [
				new ActivityItemData(ActivityTypeEnum.Demon, "Adv_Tab_100"),
				new ActivityItemData(ActivityTypeEnum.Bloodcastle, "Adv_Tab_103"),
				new ActivityItemData(ActivityTypeEnum.PkCamp, "Adv_Tab_302"),
				new ActivityItemData(ActivityTypeEnum.PkKing, "Adv_Tab_301"),
				new ActivityItemData(ActivityTypeEnum.LuoLanChengZhan, "Adv_Tab_400"),
				new ActivityItemData(ActivityTypeEnum.AngelTemple, "Adv_Tab_106")
			];
		}
	}
}