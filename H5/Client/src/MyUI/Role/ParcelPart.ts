namespace MyUI.Role {
	/**
	 * 背包界面
	 */
	export class ParcelPart extends ui.PlayerBag.ParcelPartUI implements IWindowPart {
		private m_goodsBox: GoodsBox; // 道具列表容器
		private m_dataSource: GoodsIconDataSource[]; // 道具列表数据源
		private m_nLastSortTime: number = 0; // 上次整理按钮点击时间
		private m_lstPageDots: laya.ui.Image[]; // 翻页点列表

		constructor() {
			super();
		}

		createChildren() {
			super.createChildren();
			this.m_lstPageDots = [this._imgDot0, this._imgDot1, this._imgDot2, this._imgDot3, this._imgDot4];
			this.m_goodsBox = new GoodsBox();
			this.m_goodsBox.list = this._lstGoodsIcon;
			this.m_goodsBox.pageChangeHandler = new Laya.Handler(this, this._updatePageDots);
			this._updatePageDots(0);

			// 按钮多语言文本
			this._btnEquipRecycle.label = Loca.getLang("4075"); // 装备回收
			this._btnRideRecycle.label = Loca.getLang("269"); // 骑宠回收
			this._btnSort.label = Loca.getLang("1365"); // 整理
			this._btnEquipRecycle.disabled = true;
			this._btnRideRecycle.disabled = true;
			this._itemDiamond.itemType = MoneyTypes.YuanBao;
			this._itemBindDiamond.itemType = MoneyTypes.BindYuanBao;
			this._itemGold.itemType = MoneyTypes.YinLiang;
			this._itemBindGold.itemType = MoneyTypes.TongQian;

			// 事件注册
			this._btnSort.clickHandler = new Laya.Handler(null, () => {
				if (Date.now() - this.m_nLastSortTime < 3000) {
					uiMgr.hintText(Loca.getLang("11576")); // 请不要过于频繁操作
					return;
				}
				Net.sendResetBag(SaleGoodsConsts.NormalBag);
				this.m_nLastSortTime = Date.now();
			});
			gameEventBus.updateParcel.on(this, this.updateGoods);
		}

		/** @override */
		public destroy(destroyChild?: boolean) {
			gameEventBus.updateParcel.off(this, this.updateGoods);
			super.destroy(destroyChild);
		}

		/** @implements */
		public enterPart() {
			this.updateGoods();
		}

		/**
		 * 更新道具，参数为空时需刷新整个背包的道具
		 * @param dtGoods 道具数据
		 */
		private updateGoods(dtGoods?: NetMsg.IGoodsData) {
			if (!this.visible) return; // 隐藏的时候不刷新，节省性能

			if (!dtGoods) {
				if (Global.Data.roleData.GoodsDataList) {
					this.SortGoodsBagIndex(); // 物品索引排序
				}
				this.ShowPageEx();
			} else {
				const source = this.m_dataSource.find(element => element.dbID === dtGoods.Id);
				if (source) {
					if (dtGoods.GCount <= 0 || dtGoods.Using > 0 || dtGoods.Site !== 0) {
						source.goodsData = null;
					}
					this.m_goodsBox.list.setItem(source.gridIndex, source);
				}
			}
		}

		public ShowPageEx(startIndex: number = 0, isStep: boolean = false) {
			// 把道具列表按键值对存储起来（key:BagIndex => value:GoodsData）
			const mapGoodsData = new Map<number, NetMsg.IGoodsData>();
			const lstGoodsData = gameIns.gameState.roleData.GoodsDataList;
			lstGoodsData.forEach(element => {
				if (element && element.GCount > 0 && element.Using === 0 && element.Site === 0) {
					mapGoodsData.set(element.BagIndex, element);
				}
			});

			// 初始化道具列表数据源
			const nValidGridNum = gameIns.gameState.roleData.BagNum; // 当前已解锁的格子数
			if (!this.m_dataSource) this.m_dataSource = [];
			for (let nIdx = 0; nIdx < Global.MaxBagGridNum; nIdx++) {
				let source = this.m_dataSource[nIdx];
				if (!source) {
					source = new GoodsIconDataSource();
					source.gridIndex = nIdx;
					source.bagIndex = Global.getBagIndexByGridIndex(nIdx);
					this.m_dataSource.push(source);
				}
				// 设置格子的开启状态
				if (source.bagIndex < nValidGridNum) source.iconState = IconState.Unlocked;
				else if (source.bagIndex === nValidGridNum) source.iconState = IconState.Opening;
				else source.iconState = IconState.Locked;
				// 设置格子对应的GoodsData
				if (mapGoodsData.has(source.bagIndex)) source.goodsData = mapGoodsData.get(source.bagIndex);
				else source.goodsData = null;
			}
			this.m_goodsBox.dataSource = this.m_dataSource;

			// // 查找设置索引字典类
			// // 索引字典类，第一个number，是物品所在的格子。第二个number，是在Global.Data.roleData.GoodsDataList中的索引值。
			// let indexDict: Map<number, number> = new Map<number, number>();
			// if (lstGoodsData) {
			// 	let count = lstGoodsData.length;
			// 	for (let subIndex = 0; subIndex < count; subIndex++) {
			// 		let gd = lstGoodsData[subIndex];
			// 		if (gd && gd.GCount > 0 && gd.Using == 0 && gd.Site == 0) {
			// 			indexDict.set(gd.BagIndex, subIndex);
			// 		}
			// 	}
			// }

			// let nBagNum = gameIns.gameState.roleData.BagNum;
			// let counter = 0;
			// for (let i = startIndex; i < nBagNum; i++) {
			// 	counter++;
			// 	let icon = this._goodsBox.getGoodsIcon(i);
			// 	let dataIndex = -1;
			// 	if (indexDict.has(i)) {
			// 		dataIndex = indexDict.get(i);
			// 		if (dataIndex < lstGoodsData.length) {
			// 			let gd = lstGoodsData[dataIndex];
			// 			icon.updateByGoodsData(gd);
			// 			// TODO: Add Event.CLICK
			// 			// TODO: Super.InitGoodsGIcon(icon, gd);
			// 			// TODO: Equip Compare
			// 		}
			// 	} else {
			// 		icon.clearMe();
			// 	}
			// }

			// this.ShowDisableGrid();
		}

		private SortGoodsBagIndex() {
			const myGoodsList = gameIns.gameState.roleData.GoodsDataList;
			const tmpList: NetMsg.IGoodsData[] = [];
			const repterIndexList: NetMsg.IGoodsData[] = [];
			const cannotShowList: NetMsg.IGoodsData[] = [];
			for (let startIndex = 0; startIndex < myGoodsList.length; startIndex++) {
				const curGoodsObj = myGoodsList[startIndex];
				if (-1 === curGoodsObj.BagIndex) curGoodsObj.BagIndex = 0; // 明确索引值，不要让它未定义
				if (!this.CanShowGoodsInPacel(curGoodsObj)) { // 正在装备和不能使用的物品
					cannotShowList.push(curGoodsObj);
				} else if (!this.ExistBagIndex(tmpList, curGoodsObj.BagIndex)) { // 索引不存在
					tmpList.push(curGoodsObj); // 一旦加入，就是排过序的
				} else {
					repterIndexList.push(curGoodsObj);
				}
			}

			// 对重复的索引项重新生成索引，这些索引尽量从后面开始生成，让中间的位置空出来
			let repeaterIndex = 0;
			for (repeaterIndex = 0; repeaterIndex < repterIndexList.length; repeaterIndex++) {
				const curGoodsObj = repterIndexList[repeaterIndex];
				const oldIndex = curGoodsObj.BagIndex;
				const newIndex = this.GenerateNewBagIndex(tmpList);
				if (newIndex < 0) { // 生成失败，已经没有必要再生成了
					break;
				}
				curGoodsObj.BagIndex = newIndex;
				tmpList.push(curGoodsObj);
			}

			// 依次按照各个字段排序
			// ["BagIndex", "GoodsID", "GCount"], [Array.NUMERIC, Array.NUMERIC, Array.NUMERIC]
			tmpList.sort((x, y) => {
				if (x.BagIndex !== y.BagIndex) {
					return x.BagIndex - y.BagIndex;
				} else {
					if (x.GoodsID !== y.GoodsID) {
						return x.GoodsID - y.GoodsID;
					} else {
						return x.GCount - y.GCount;
					}
				}
			});

			// 装备的或者无效的物品，直接存入列表，不用管，显示时会进行过滤判断的
			for (let n = 0; n < cannotShowList.length; n++) {
				const curGoodsObj = cannotShowList[n];
				tmpList.push(curGoodsObj);
			}
			// 更新全局物品列表
			gameIns.gameState.roleData.GoodsDataList = tmpList;
		}

		/**
		 * 判断物品能否在背包内部显示，正在装备和数量为0的不显示
		 * @param dtGoods 
		 */
		private CanShowGoodsInPacel(dtGoods: NetMsg.IGoodsData) {
			if (!dtGoods || dtGoods.Using > 0 || dtGoods.GCount <= 0) {
				return false;
			}
			return true;
		}

		/**
		 * 判断列表中是否有某个bagindex
		 * @param tmpList 
		 * @param bagIndex 
		 */
		private ExistBagIndex(tmpList: NetMsg.IGoodsData[], bagIndex: number) {
			return tmpList.some(value => value.BagIndex === bagIndex);
		}

		/**
		 * 根据有效的索引列表生成新的背包索引，优先插入空位置
		 * @param existSortedList 
		 * @param minIndex 
		 */
		private GenerateNewBagIndex(existSortedList: NetMsg.IGoodsData[], minIndex: number = 0) {
			if (!existSortedList) return minIndex;

			// 先存储索引列表
			const indexList: number[] = [];
			for (let n = 0; n < existSortedList.length; n++) {
				const curGoodsObj = existSortedList[n];
				if (!this.CanShowGoodsInPacel(curGoodsObj)) { // 碰到无效物品或者装备物品，直接跳过
					continue;
				}

				const tmpIndex = curGoodsObj.BagIndex;
				if (indexList.indexOf(tmpIndex) < 0) {
					indexList.push(tmpIndex);
				}
			}

			// 找寻空位置
			for (let i = minIndex; i < Global.GetTotalMaxBagGridCount(); i++) {
				if (indexList.indexOf(i) < 0) {
					return i; // 返回该值作为索引值
				}
			}
			// 这意味着，空间不够
			return -1;
		}

		/**
		 * 更新翻页点
		 * @param nPageIdx
		 */
		private _updatePageDots(nPageIdx: number) {
			if (nPageIdx < 0 || nPageIdx >= this.m_lstPageDots.length) {
				return;
			}
			for (let nIdx = 0; nIdx < this.m_lstPageDots.length; nIdx++) {
				const element = this.m_lstPageDots[nIdx];
				if (nPageIdx === nIdx) {
					element.skin = Global.getCommonAtlasImgPath("flip_dot");
				} else {
					element.skin = Global.getCommonAtlasImgPath("flip_dot_bg");
				}
			}
		}
	}
}