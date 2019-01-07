namespace MyUI {
	import Event = laya.events.Event;
	import List = laya.ui.List;
	import Handler = laya.utils.Handler;
	import Log = Global.Log;

	/**
	 * 显示道具格子的Box，该Box为显示GoodsIcon列表（List）的管理类 <br>
	 * 因为List的渲染方式，所以格子的索引和道具Data的索引期望的展示方式是不同的，需要转换一下 <br>
	 * <p>
	 * GoodsData中的索引（BagIndex）期望展示方式如下：<br>
	 *  0  1  2  3  4 | 25 26 27 28 29 | 50 51 52 . .
	 *  5  6  7  8  9 | 30 31 32 33 34 |  .  .  . . .
	 * 10 11 12 13 14 | 35 36 37 38 39 |
	 * 15 16 17 18 19 | 40 41 42 43 44 |
	 * 20 21 22 23 24 | 45 46 47 48 49 |
	 * </p>
	 * <p>
	 * List中格子实际展示方式如下：<br>
	 *  0  5 10 15 20 | 25 30 35 40 45 | 50 .
	 *  1  6 11 16 21 | 26 31 36 41 46 | 51 .
	 *  2  7 12 17 22 | 27 32 37 42 47 | 52 .
	 *  3  8 13 18 23 | 28 33 38 43 48 |  . .
	 *  4  9 14 19 24 | 29 34 39 44 49 |  . .
	 * </p>
	 * <p>
	 * 转换列表如下：<br>
	 * 0 ->  0   5 ->  1   10 ->  2   ...
	 * 1 ->  5   6 ->  6   11 ->  7   ...
	 * 2 -> 10   7 -> 11   12 -> 12
	 * 3 -> 15   8 -> 16   13 -> 17
	 * 4 -> 20   9 -> 21   14 -> 22
	 * 转换公式如下：<br>
	 * GridIdx = BagIdx - ((RowIdx - ColIdx) * 4)
	 * </p>
	 * <p>
	 * 注意：道具图标更新的时候尽量使用数据驱动，即使用List的setItem、addItem、deleteItem、changeItem接口 <br>
	 * 尽量不要直接获取GoodsIcon对象，因为List使用延迟渲染和对象复用，只有可视区域才有格子（GoodsIcon）对象 <br>
	 * 可视区域外格子（GoodsIcon）对象是不存在的
	 * </p>
	 */
	export class GoodsBox {
		private m_lstGoodsIcon: List; // GoodsIcon的List
		private m_bEnableMouse: boolean = true; // 是否激活鼠标响应
		private m_nScrollStartIndex: number = 0; // 滚动开始的格子Index

		private m_handlerMouseEvent: Handler; // 鼠标事件处理函数
		private m_handlerPageChange: Handler; // 处理翻页函数

		constructor() {

		}

		/** 是否激活鼠标响应，默认为true */
		public set enableMouse(value: boolean) { this.m_bEnableMouse = value; }
		/** 处理鼠标事件 */
		public set mouseEventHandler(value: Handler) { this.m_handlerMouseEvent = value; }
		/** 处理翻页函数 */
		public set pageChangeHandler(value: Handler) { this.m_handlerPageChange = value; }

		/** 设置/获取该Box管理的道具List */
		public get list() { return this.m_lstGoodsIcon; }
		public set list(value: List) {
			this.m_lstGoodsIcon = value;
			// List默认属性设置
			value.hScrollBarSkin = "";
			value.scrollBar.elasticDistance = 20;
			value.scrollBar.elasticBackTime = 200;
			value.itemRender = GoodsIcon;
			value.mouseHandler = new Handler(this, this._onMouseHandler);
			value.scrollBar.on(Event.START, this, this._onListScrollStart);
			value.scrollBar.on(Event.END, this, this._onListScrollEnd);
		}

		private _onMouseHandler(e: Event, nIdx: number) {
			if (!this.m_bEnableMouse) return;
			if (e.type !== Event.CLICK) return;

			if (this.m_handlerMouseEvent) {
				this.m_handlerMouseEvent.runWith([e, nIdx]);
			} else {
				GTipServiceEx.ShowTip(this.m_lstGoodsIcon.getCell(nIdx) as GoodsIcon, TipTypes.GoodsText, GoodsOwnerTypes.SelfBag, this.m_lstGoodsIcon.getItem(nIdx).goodsData);
			}
		}

		/**
		 * 滚动开始
		 */
		private _onListScrollStart() {
			this.m_nScrollStartIndex = this.m_lstGoodsIcon.startIndex;
		}

		/**
		 * 滚动结束
		 */
		private _onListScrollEnd() {
			// let nPageIdx = Math.floor(this.m_nScrollStartIndex / (Global.BAG_PAGE_ROWS * Global.BAG_PAGE_COLS));
			// let nStartIdx = this.m_lstGoodsIcon.startIndex;
			// if (nStartIdx > this.m_nScrollStartIndex) { // 下一页
			// 	if (nPageIdx + 1 < Global.BAG_PAGES) nPageIdx += 1;
			// } else if (nStartIdx < this.m_nScrollStartIndex) { // 上一页
			// 	if (nPageIdx - 1 >= 0) nPageIdx -= 1;
			// }
			// let nToIdx = nPageIdx * (Global.BAG_PAGE_ROWS * Global.BAG_PAGE_COLS);
			// this.m_lstGoodsIcon.tweenTo(nToIdx);
			// if (this.m_handlerPageChange) {
			// 	this.m_handlerPageChange.runWith(nPageIdx);
			// }

			const nStartIdx = this.m_lstGoodsIcon.startIndex;
			const nPageIdx = Math.floor(nStartIdx / (Global.BAG_PAGE_ROWS * Global.BAG_PAGE_COLS));
			if (this.m_handlerPageChange) {
				this.m_handlerPageChange.runWith(nPageIdx);
			}
		}

		/**
		 * 设置List的数据源
		 */
		public set dataSource(value: GoodsIconDataSource[]) {
			this.m_lstGoodsIcon.array = value;
		}

		public findByGoodsDbID(dbID: number) {
			const aSources: GoodsIconDataSource[] = this.m_lstGoodsIcon.array;
			aSources.find(
				value => value.goodsData && value.goodsData.Id === dbID
			);
		}

		public destroy() {
			if (this.m_lstGoodsIcon) {
				this.m_lstGoodsIcon.destroy();
			}
			this.m_handlerMouseEvent = null;
			this.m_handlerPageChange = null;
		}
	}
}