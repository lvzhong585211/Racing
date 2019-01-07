namespace MyUI {
	/**
	 * 商品容器Part 
	 */
	export class MallGoodsPart extends ui.Mall.MallGoodsPartUI {
		/** 是否打开过 */
		private mIsOpen = false;

		constructor() {
			super();
			this._listgoods.vScrollBarSkin = "";
		}
		/**
		 * 商城商品的Data列表
		 * @param mallGoodsDataArr          商品的Data数组
		 */
		initData(mallGoodsDataArr: MallGoodsData[]): void {
			this._listgoods.array = mallGoodsDataArr;
			this.mIsOpen = true;
		}
		/**
		 * 是否打开过(用来判断是否已加载商品)
		 */
		get isOpen() {
			return this.mIsOpen;
		}
		/**
		 * 商品列表是否有商品，影响抢购界面感叹号显示
		 */
		get isHasGoods() {
			return this._listgoods.array.length === 0;
		}
		/**
		 * 设置商品显示列数
		 */
		set listRepeatX(value: number) {
			this._listgoods.repeatX = value;
		}
	}
}