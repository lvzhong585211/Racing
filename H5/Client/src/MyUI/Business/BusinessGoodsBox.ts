module MyUI {
	/**
	* 商人Goods Box 
	*/
	export class BusinessGoodsBox extends ui.Business.BusinessGoodsBoxUI {
		/** Box列表加载状态 */
		private mIsOpenState: boolean = false;
		/** 商品列数 */
		private mColumn: number = 5;
		/** 帮会等级 */
		private mBangHuiLevel: number;
		/** 商品兑换信息 */
		private mGoodsDuiHuanList: Map<number, number> = new Map<number, number>();
		constructor() {
			super();
			this._listGoods.vScrollBarSkin = "";
			this._ItemHuoBi.huoBiJumpBtnShow = false;
		}
		/**
		 * 商人商品Data显示
		 * @param bType 商人类型(DuiHuanType表里的SaleType)
		 */
		init(bType: number): void {
			this.moneyType(bType);
			this.tishiTextType(bType);
			const goodsIdTypeList: string[] = [];
			tableMgr.duiHuanTypeTable.AllRows().forEach((dVo) => {
				// 查找相同类型的商人
				if (TableUtils.getFieldNumber(dVo.SaleType) === bType) {
					// 查找相同职业的类型和通用类型
					if (dVo.OccupCondition === -1 || TableUtils.getFieldNumber(dVo.OccupCondition) === gameIns.gameState.roleData.Occupation) {
						goodsIdTypeList.push(dVo.ID.toString());
					}
				}
			});

			if (goodsIdTypeList.length === 0) {
				Global.Log.Assert(false, Global.String.Format("DuiHuanType表里没有 {0} 类型的商品ID", bType));
			}
			// 设置List组件需要的数据源
			const businessGoodsDataList: BusinessGoodsData[] = [];
			tableMgr.duiHuanItemsTable.AllRows().forEach((dVo) => {
				for (const tId of goodsIdTypeList) {
					if (dVo.ID.toString().substring(0, 3) === tId) {
						const bGoodsData = new BusinessGoodsData();
						bGoodsData.id = dVo.ID;
						bGoodsData.newGoods = dVo.NewGoods;
						bGoodsData.douQi = dVo.MoJing;
						bGoodsData.bangGong = dVo.ZhanGong;
						bGoodsData.xunLongJiFen = dVo.QiFuJiFen;
						bGoodsData.bangHuiNeedLevel = dVo.NeedZhanMengLevel;
						bGoodsData.bangHuiCurrLevel = this.mBangHuiLevel;
						bGoodsData.goodsCount = dVo.DayDuiHuanNum;
						bGoodsData.businessType = TableUtils.getFieldNumber(dVo.DuiHuanType);
						bGoodsData.duiHuanNum = this.getGoodsDuiHuanNums(bGoodsData.id);
						bGoodsData.busMoneyNums = this.getBusMoneyNums();
						businessGoodsDataList.push(bGoodsData);
						break;
					}
				}
			});
			this._listGoods.itemRender = BusinessGoodsRender;
			this._listGoods.repeatX = this.mColumn;
			this._listGoods.array = businessGoodsDataList;
			this.mIsOpenState = true;
		}
		/**
		 * 商人的货币类型与提示
		 * @param bType 商人类型(DuiHuanType表里的SaleType)
		 */
		private moneyType(bType: number): void {
			switch (bType) {
				case BussinessTypeEnum.BussinessDouQi:
					this._ItemHuoBi.itemType = MoneyTypes.JingYuanZhi;
					break;
				case BussinessTypeEnum.BussinessBangHui:
					// Net.sendQueryBangHuiDetail(gameIns.gameState.roleData.Faction);
					this._ItemHuoBi.itemType = MoneyTypes.BangGong;
					break;
				case BussinessTypeEnum.BussinessXunLong:			// 抽奖积分特殊，不是在缓存里，是跟服务器请求的
					Net.sendGetZaJinDanJiFen();
					this._ItemHuoBi._imageHuoBi.skin = Global.getMoneyIconPath(MoneyTypes.QiFuJiFen);
					this._ItemHuoBi._textHuoBiNums.text = "0";
					break;
			}
		}
		/**
		 * 提示文本显示
		 * @param bType 商人类型(DuiHuanType表里的SaleType)
		 */
		private tishiTextType(bType: number): void {
			switch (bType) {
				case BussinessTypeEnum.BussinessDouQi:
				case BussinessTypeEnum.BussinessBangHui:
					this._textTiShi.text = "";
					break;
				case BussinessTypeEnum.BussinessXunLong:
					this._textTiShi.text = ConfigLoca.UI_Bussiness_XunLongTiShiTetxt;
					break;
			}
		}
		/**
		 * 积分更新(仅限寻龙商人)
		 * @param jfNums 积分数量
		 */
		refreshHuoBi(jfNums: number): void {
			this._ItemHuoBi._textHuoBiNums.text = `${jfNums}`;
			this.refreshListCondition(jfNums);
		}
		/**
		 * 刷新商品列表的条件状态(货币)
		 * @param jfNums 货币数量
		 */
		refreshListCondition(jfNums: number): void {
			this._listGoods.cells.forEach((item) => {
				if (item instanceof BusinessGoodsRender && item.dataSource !== null) {
					item.refreshCondition(jfNums);
				}
			});
		}
		/**
		 * 商品兑换后数量更新
		 * @param listMap 
		 */
		refreshDuiHuanNums(listMap: Map<number, number>): void {
			this._listGoods.cells.forEach((item) => {
				if (item instanceof BusinessGoodsRender && item.dataSource !== null) {
					const value = listMap[item.dataSource.id];
					//if (!item.refreshBHLevelCondition(this.mBangHuiLevel))
					item.refreshGoodsCountCondition(value, parseInt(this._ItemHuoBi._textHuoBiNums.text));
				}
			});
		}
		/**
		 * 商品购买条件更新
		 * @param goodsDuiHuanList 商品购买数量列表
		 */
		refreshGoodsCondition(goodsDuiHuanList: Map<number, number>): void {
			this.setGoodsDuiHuanList(goodsDuiHuanList);
			//Laya.timer.once(100, this, () => {
			this._listGoods.cells.forEach((item) => {
				if (item instanceof BusinessGoodsRender && item.dataSource !== null) {
					if (!item.refreshBHLevelCondition(this.mBangHuiLevel)) {
						const value = goodsDuiHuanList[item.dataSource.id];
						item.refreshGoodsCountCondition(value, parseInt(this._ItemHuoBi._textHuoBiNums.text));
					}
				}
			});
			//	});
		}
		/**
		 * 是否加载过商品信息
		 */
		getIsOpenState(): boolean {
			return this.mIsOpenState;
		}
		/**
		 * 设置帮会等级
		 * @param bhLevel 帮会等级
		 */
		setBangHuiLevel(bhLevel: number): void {
			this.mBangHuiLevel = bhLevel;
		}
		/**
		 * 设置商品兑换数据(如已存在，更新数据)
		 * @param goodsDuiHuanList 商品兑换列表<兑换Id，兑换数量>
		 */
		setGoodsDuiHuanList(goodsDuiHuanList: Map<number, number>): void {
			this.mGoodsDuiHuanList = goodsDuiHuanList;
			if (this._listGoods.array !== null) {
				this._listGoods.array.forEach((bData) => {
					if (bData instanceof BusinessGoodsData) {
						for (const key in goodsDuiHuanList) {
							if (key !== undefined && bData.id === parseInt(key)) {
								const value = goodsDuiHuanList[key];
								bData.duiHuanNum = value;
							}
						}
					}
					bData.busMoneyNums = this.getBusMoneyNums();
				});
			}
		}
		/**
		 * 获取商品已兑换的数量
		 * @param duiHuanId 商品兑换Id 
		 */
		getGoodsDuiHuanNums(duiHuanId: number): number {
			const duiHuanNums = this.mGoodsDuiHuanList[duiHuanId];
			return duiHuanNums === undefined ? 0 : duiHuanNums;
		}
		/**
		 * 获取当前商店拥有的货币数量
		 */
		getBusMoneyNums(): number {
			return parseInt(this._ItemHuoBi._textHuoBiNums.text);
		}

		destroy(destroyChild?: boolean): void {
			super.destroy(destroyChild);
		}
	}
}