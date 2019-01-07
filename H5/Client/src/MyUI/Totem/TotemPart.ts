module MyUI {
	/**
	* 图腾Part 
	*/
	export class TotemPart extends ui.Totem.TotemPartUI {
		public willOpenWinId: WindowID = WindowID.Invalid;
		private tweenIndexState: number = 0;
		private totemManager: ToTemManager;
		// 图腾Id
		private mTotemId: number;
		// 
		private totemDataList: tables.DragonTotemVO[];
		// 当前的图腾大类型
		private totemType: TotemTypeEnum;
		// 当前显示的TotemInfoBox
		private mTotemInfoBox: TotemInfoBox;
		constructor() {
			super();
			this.totemManager = ToTemManager.getInstance();
			this.registerEventListeners();
		}
		/** 添加事件监听 */
		private registerEventListeners(): void {
			gameEventBus.totemRefresh.on(this, this.refreshItemOfTotemId);
		}
		/** 移除事件监听 */
		private unregisterEventListeners(): void {
			gameEventBus.totemRefresh.off(this, this.refreshItemOfTotemId);
		}
		destroy(destroyChild?: boolean): void {
			Laya.timer.clear(this, this.tweenImageIcon);
			this.unregisterEventListeners();
			super.destroy(destroyChild);
		}

		totemId(value: number) {
			this.mTotemId = value;
		}
		enterPart(): void {
			this._boxJiaoLong.visible = false;
			this._boxQiuLong.visible = false;
			this._boxLiLong.visible = false;
		}
		/**
		 * init图腾界面数据
		 * @param wId 界面Id
		 */
		init(wId: WindowID, totemVo: tables.DragonTotemVO): void {
			let dTotemList: tables.DragonTotemVO[];
			// 通过Id获取对应的数据列表
			if (wId !== WindowID.Invalid && wId !== WindowID.Totem) {
				this.totemType = this.getTotemType(wId);
				this.getTotemUIList(wId);
				dTotemList = this.totemManager.getToTemItemListOfType(this.totemType);
			}
			else {
				this.totemType = this.getTotemType(WindowID.QiuLongTotem);
				this.getTotemUIList(WindowID.QiuLongTotem);
				dTotemList = this.totemManager.getToTemItemListOfType(this.totemType);
			}
			// 选择图腾时替换主界面的Icon与背景
			this.mTotemInfoBox.dPSelectedItem = (s, e) => {
				this.totemIconSkin(e.Data as tables.DragonTotemVO);
			};
			this.totemDataList = this.totemManager.getToTemItemListOfType(this.totemType);
			// 显示页签内容时判断是否打开过，存在缓存，存在则显示缓存
			if (!this.mTotemInfoBox.isOpenState) {
				this.mTotemInfoBox.initTotemIconList(dTotemList);
				// this.mTotemInfoBox.initTotemInfo(totemVo);
				// this.totemIconSkin(totemVo);
			} else {
				this.totemIconSkin(this.mTotemInfoBox.getCurrTotemVo());
			}
			this.tweenLoopImageIcon();
		}
		/**
		 * 刷新传入ID图腾的状态
		 * @param totemId 图腾唯一Id
		 */
		private refreshItemOfTotemId(totemId: number): void {
			this.mTotemInfoBox.refreshItemOfTotemId(totemId);
		}
		/**
		 * 刷新图腾进度
		 * @param totemId 图腾Id
		 */
		private refreshTotemSchedule(totemId: number): void {

		}
		/**
		 * 图腾图标Icon显示(带动画)
		 * @param tVo DragonTotemVO
		 */
		private totemIconSkin(totemVo: tables.DragonTotemVO): void {
			this._imageTotem.skin = Global.getTotemImagePath("Totem_Max_" + totemVo.Icon);
			this._imageTotemBG.skin = Global.getTotemImagePath("Totem_Max_Type_" + totemVo.TotemType);
		}
		/** 图腾图标动画开启 */
		private tweenLoopImageIcon() {
			this.tweenImageIcon();
			Laya.timer.loop(2000, this, this.tweenImageIcon, null);
		}
		/** 图腾图标动画执行 */
		private tweenImageIcon() {
			if (this.tweenIndexState === 0) {
				this.tweenIndexState = 1;
				Laya.Tween.to(this._imageTotem, { y: this._imageTotem.y + 15 }, 2000, Laya.Ease.linearIn);
			} else {
				this.tweenIndexState = 0;
				Laya.Tween.to(this._imageTotem, { y: this._imageTotem.y - 15 }, 2000, Laya.Ease.linearIn);
			}
		}
		/**
		 * 获取对应图腾在表中的类型
		 * @param winId 
		 */
		private getTotemType(winId: WindowID): number {
			if (winId === WindowID.QiuLongTotem)
				return TotemTypeEnum.QiuLong;
			if (winId === WindowID.JiaoLongTotem)
				return TotemTypeEnum.JiaoLong;
			if (winId === WindowID.LiLongTotem)
				return TotemTypeEnum.LiLong;
			return -1;
		}

		/**
		 * 获取对应图腾的显示List
		 * @param winId 
		 */
		private getTotemUIList(winId: WindowID): void {
			if (winId === WindowID.QiuLongTotem)
				this.mTotemInfoBox = this._boxQiuLong;
			if (winId === WindowID.JiaoLongTotem)
				this.mTotemInfoBox = this._boxJiaoLong;
			if (winId === WindowID.LiLongTotem)
				this.mTotemInfoBox = this._boxLiLong;
			this.mTotemInfoBox.visible = true;
		}
	}
}