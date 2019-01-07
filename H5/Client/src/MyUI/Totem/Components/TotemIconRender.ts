module MyUI {
	/** 图腾IconRenderData */
	export class TotemIconData {
		/** 图腾数据 */
		tData: tables.DragonTotemVO;
		/** 图腾Net数据 */
		tNetItem: NetMsg.ITotemNetItem;
		/** 选中状态 */
		selected: boolean;
	}
	/**
	* 图腾IconRender
	*/
	export class TotemIconRender extends ui.Totem.Components.TotemIconRenderUI {
		/** 进度 */
		private mToTemStute: ToTemStateEnum = ToTemStateEnum.WeiHuoDe;
		// UI操作执行回调函数
		dPSelectedItem: DPSelectedItemEventHandler;
		// 图腾状态
		private mSetToTemStute: ToTemStateEnum;

		constructor() {
			super();
			this._imageSelected.visible = false;
			this.on(Laya.Event.CLICK, this, this.iconClick);
		}

		get dataSource(): TotemIconData { return this._dataSource; }
		set dataSource(value: TotemIconData) {
			super._dataSource = value;
			if (value === null)
				return;
			// 图腾图标
			this._imageIcon.skin = Global.getTotemImagePath("Totem_Mini_" + `${this.dataSource.tData.Icon}`);
			this.setSelected(this.dataSource.selected)
			// 不存在就是未开启
			if (this.dataSource.tNetItem === null) {
				this.setTotemStute(true);
			} else {
				this.setTotemStute(false);
			}
		}
		/** render选中状态 */
		setSelected(state: boolean): void {
			this._imageSelected.visible = state;
		}
		/**
		 * Icon点击触发
		 * @param e 
		 */
		private iconClick(e: Laya.Event) {
			this.dPSelectedItem(this, new DPSelectedItemEventArgs(this.dataSource.tData.ID));
		}
		/** 设置图腾图标的开启状态 */
		setTotemStute(value: boolean): void {
			this._imageIcon.disabled = value;
			// this.mSetToTemStute = value;
			// switch (value) {
			// 	case ToTemStateEnum.JinXingZhong:
			// 		this._imageIcon.disabled = true;
			// 		break;
			// 	case ToTemStateEnum.KeHuoDe:
			// 	case ToTemStateEnum.YiHuoDe:
			// 		this._imageIcon.disabled = false;
			// 		break;
			// 	case ToTemStateEnum.WeiHuoDe:
			// 	default:
			// 		this._imageIcon.disabled = true;
			// 		break;
			// }
		}


		destroy(destroyChild?: boolean): void {
			this.off(Laya.Event.CLICK, this, this.iconClick);
			super.destroy(destroyChild);
		}
	}
}