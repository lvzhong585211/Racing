module MyUI {
	/**
	* 装备副本难度Item 
	*/
	export class EquipFuBenDifficultyItem extends ui.EquipFuBen.Components.EquipFuBenDifficultyItemUI {
		constructor() {
			super();
			this._imageSelected.visible = false;
		}
		/**
		 * 设置选中状态
		 * @param value 
		 */
		setSelected(value: boolean): void {
			this._imageSelected.visible = value;
		}
		/**
		 * 设置难度副本模式名称
		 * @param value 
		 */
		setModeFuBenName(value: string): void {
			this._textFuBenDiffMode.text = value;
		}
		/**
		 * 设置难度副本完成次数
		 * @param isOpen 副本是否开启
		 * @param fuBenName 副本名称
		 * @param enterNums 进入次数
		 * @param maxNums 最大次数
		 */
		setFuBenStrNums(isOpen: boolean, fuBenName: string, enterNums: number = 0, maxNums: number = 2): void {
			this._textFuBenNums.color = (!isOpen || enterNums >= maxNums) ? `#${ColorCode.red}` : `#${ColorCode.white}`;
			this._textFuBenNums.text = isOpen ? ConfigLoca.UI_EquipFuBen_CompleteNums + `${enterNums}/${maxNums}` : Global.String.Format(ConfigLoca.UI_EquipFuBen_TongGuanText, fuBenName);
		}
		/**
		 * 设置难度副本开启状态
		 * @param value 
		 */
		setFuBenOpenState(value: boolean): void {
			this._imageSuo.visible = !value;
			this._imageFuBenDiff.disabled = !value;
		}
	}
}