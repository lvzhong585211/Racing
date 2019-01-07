namespace MyUI {
	/**
	* Vip权限Item 
	*/
	export class VipQuanXianItem extends ui.Vip.VipQuanXianItemUI {
		constructor() {
			super();
			Style.prepareHtmlFont20Left(this._descText, ColorCode.normalH);
		}
		/**
		 * 权限描述
		 * @param text 
		 * @returns {} 
		 */
		setText(text: string): void {
			this._descText.innerHTML = text;
		}
	}
}