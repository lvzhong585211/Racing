namespace MyUI {
	/**
	 * 页签项数据类
	 */
	export class TabItemRenderData {
		/** 页签索引 */
		index: number = 0;
		/** 页签对应的窗口Id */
		winId: WindowID = WindowID.Invalid;
		/** 页签文本 */
		label: string;

		private _selected: boolean = false;
		/** 获取页签选中状态 */
		public getSelectedState(): boolean {
			return this._selected;
		}
		/** 设置页签选中状态 */
		public setSelectedState(bState: boolean): boolean {
			if (this._selected !== bState) {
				this._selected = bState;
				return true;
			}
			return false;
		}

		private _redState: boolean = false;
		/** 获取小红点显示状态 */
		public getRedState(): boolean {
			return this._redState;
		}
		/** 设置小红点显示状态 */
		public setRedState(bState: boolean): boolean {
			if (this._redState !== bState) {
				this._redState = bState;
				return true;
			}
			return false;
		}

		/**
		 * 页签数据构造函数
		 * @param nWinId 页签对应的子窗口Id
		 * @param sLabel 页签文本
		 */
		constructor(nWinId: WindowID, sText: string) {
			this.winId = nWinId;
			this.label = sText;
		}
	}

	/** 
	 * 页签渲染项
	 */
	export class TabItemRender extends ui.Components.TabItemRenderUI {
		/** 页签对应的窗口Id */
		winId: WindowID = WindowID.Invalid;

		/** 小红点对象 */
		public redDot: RedDot; // 小红点对象

		constructor() {
			super();
			this.selectedVisibility = false;
			this.redDotLeftTop = "138,6";
		}

		/** ItemRender数据源 */
		public get dataSource(): TabItemRenderData { return super._dataSource; }
		public set dataSource(value: TabItemRenderData) {
			super._dataSource = value;
			if (value) {
				this.winId = value.winId;
				this.label = value.label;
				this.selectedVisibility = value.getSelectedState();
				this.redDotVisibility = value.getRedState();
			} else {
				this.winId = WindowID.Invalid;
			}
		}

		/** 页签文本 */
		public get label(): string {
			return this._btnTab.label;
		}
		public set label(sLabel: string) {
			this._btnTab.label = sLabel;
		}

		/** 页签选中效果是否显示 */
		public get selectedVisibility(): boolean {
			return this._btnTab.selected;
		}
		public set selectedVisibility(value: boolean) {
			if (this._btnTab.selected !== value) {
				this._btnTab.selected = value;
			}
		}

		/** 页签小红点是否显示 */
		public get redDotVisibility(): boolean {
			return this.redDot.visible;
		}
		public set redDotVisibility(value: boolean) {
			this.redDot.visible = value;
		}

		//#region =================== 扩展脚本属性设置 ===================

		/** 页签皮肤 */
		public get tabSkin(): string {
			return this._btnTab.skin;
		}
		public set tabSkin(value: string) {
			this._btnTab.skin = value;
		}

		/** 页签文本颜色，设置方式类似Button.labelColors */
		public get tabLabelColors(): string {
			return this._btnTab.labelColors;
		}
		public set tabLabelColors(value: string) {
			this._btnTab.labelColors = value;
		}

		/** 页签文本字体大小 */
		public get tabLabelSize(): number {
			return this._btnTab.labelSize;
		}
		public set tabLabelSize(value: number) {
			this._btnTab.labelSize = value;
		}

		/** 小红点距左边和上边的距离，格式xxx,xxx */
		public get redDotLeftTop(): string {
			return `${this.redDot.left},${this.redDot.top}`;
		}
		public set redDotLeftTop(value: string) {
			Global.Log.Assert(!Global.String.IsNullOrWhiteSpace(value), "value is error!!!");
			const aVals = value.split(",");
			Global.Log.Assert(aVals.length === 2, `${value} is error!!!`);
			const left = parseInt(aVals[0]);
			const top = parseInt(aVals[1]);
			Global.Log.Assert(!Number.isNaN(left) && !Number.isNaN(top), `${value} is error!!!`);
			this.redDot = attachRedDotToSprite(this, left, top);
		}

		//#endregion ===================================================
	}
}