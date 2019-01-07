/**
 * 界面使用的静态公用类
 */
namespace Super {
	/** 全局的界面游戏静态数据 */
	export let GData: Data.SuperData;

	/** 弹窗是否提示 */
	export let MessageBoxIsHint = new Int8Array(MessBoxIsHintTypes.TypeEnd);

	/**
	 * 检测数组里是否有需要的值
	 * @param T 
	 * @param array 
	 * @param T 
	 */
	export function CheckArrayHaveValue<T>(array: T[], value: T): boolean {
		if (array && array.length > 0) {
			for (let i = 0; i < array.length; ++i) {
				if (array[i] === value) {
					return true;
				}
			}
		}
		return false;
	}

	//#region ======== 装备管理 ========
	/**
	 * 对于戒指和手镯特殊处理，获取其要能放置的位置
	 * @param categoriy 
	 */
	export function FindEquipBagIndex(categoriy: number): number {
		// 如果是通过TIPS佩戴装备时，优先根据TIPS选中的左右手来替换
		if (MyUI.GTipServiceEx.HandValue === HandTypes.ZuoShou) {
			return 1;
		} else if (MyUI.GTipServiceEx.HandValue === HandTypes.YouShou) {
			return 0;
		}

		if (categoriy === ItemCategories.JieZhi) {
			if (null == FindUsingEuip(categoriy, HandTypes.ZuoShou)) { // 戒指的左右手与武器的左右手标示是反的
				return 0;
			} else if (null == FindUsingEuip(categoriy, HandTypes.YouShou)) {
				return 1;
			}
		} else {
			if (null == FindUsingEuip(categoriy, HandTypes.YouShou)) {
				return 0;
			} else if (null == FindUsingEuip(categoriy, HandTypes.ZuoShou)) {
				return 1;
			}
		}
		return 0;
	}

	/**
	 * 获取人物身上佩戴的指定装备
	 * @param categoriy 道具分类
	 * @param handType 手持状态
	 */
	export function FindUsingEuip(categoriy: number, handType: number): NetMsg.IGoodsData {
		if (null == Super.GData.RoleUsingGoodsDataList) {
			return null;
		}
		const lstGoodsData = Super.GData.RoleUsingGoodsDataList;
		for (const [key, value] of lstGoodsData) {
			const gd = value;

			const goodVO = tableMgr.goodsTable.Find(gd.GoodsID);
			if (!goodVO) {
				continue;
			}
			const usingcategoriy = goodVO.Categoriy;
			const usingactionType = goodVO.ActionType;
			let usinghandType = 0;
			if ((3 === Global.Data.roleData.Occupation) && (WeaponStates.D === goodVO.ActionType) && (ItemCategories.WuQi_Zhang === usingcategoriy)) { // 增加魔剑士特殊处理，魔剑士可以装备两把单手杖
				usinghandType = HandTypes.ZuoYouShou;
			} else {
				usinghandType = goodVO.HandType;
			}

			if (categoriy >= ItemCategories.WuQi_Jian && categoriy <= ItemCategories.WuQi_NuJianTong) { // 判断要佩戴的道具否是武器
				if (usingcategoriy >= ItemCategories.WuQi_Jian && usingcategoriy <= ItemCategories.WuQi_NuJianTong) { // 判断要佩戴的道具否是武器
					if (usinghandType === handType) { // 如果身上的与要装备的是在同一个位置
						return gd;
					} else if (usinghandType === HandTypes.ZuoYouShou) { // 如果身上的装备左右都可以放
						if (handType === HandTypes.ZuoShou) {
							if (gd.BagIndex === 1) { // 左手武器
								return gd;
							}
						} else if (handType === HandTypes.YouShou) {
							if (gd.BagIndex === 0) { // 右手武器
								return gd;
							}
						}
					}
				}
			} else if (categoriy === ItemCategories.JieZhi) {
				if (usingcategoriy === ItemCategories.JieZhi) {
					if (handType === HandTypes.ZuoShou) {
						if (gd.BagIndex === 0) { // 左手武器
							return gd;
						}
					} else if (handType === HandTypes.YouShou) {
						if (gd.BagIndex === 1) { // 右手武器
							return gd;
						}
					}
				}
			} else if (categoriy === ItemCategories.ChongWu || categoriy === ItemCategories.ShouHuChong) { // 守护宠和宠物共占同一个位置，同时只能佩戴一种
				return gd;
			} else {
				if (categoriy === usingcategoriy) {
					return gd;
				}
			}
		}
		return null;
	}

	/**
	 * 查找装备的武器列表
	 * @param equipCategory 
	 * @param actionType 
	 * @param handType 
	 */
	export function FindWuQi(equipCategory: number, actionType: number = -1, handType: number = -1): NetMsg.IGoodsData[] {
		const unGoodsList: NetMsg.IGoodsData[] = [];
		const gdLeft = FindUsingEuip(equipCategory, HandTypes.ZuoShou); // 0为左手佩戴-右侧武器栏 1为右手佩戴-左侧武器栏
		const gdRight = FindUsingEuip(equipCategory, HandTypes.YouShou); // 0为左手佩戴-右侧武器栏 1为右手佩戴-左侧武器栏
		if (equipCategory >= (<number>ItemCategories.WuQi_Jian) && equipCategory <= (<number>ItemCategories.WuQi_NuJianTong)) { // 判断要佩戴的道具否是武器
			// 如果要佩戴的是剑\斧\槌\矛\刀
			if (equipCategory === ItemCategories.WuQi_Jian || equipCategory === ItemCategories.WuQi_Fu
				|| equipCategory === ItemCategories.WuQi_Chui || equipCategory === ItemCategories.WuQi_Mao
				|| equipCategory === ItemCategories.WuQi_Dao) {
				if (actionType === WeaponStates.D) { // 如果是单手武器
					let isUnLeft = false;
					let isUnRight = false;
					if (gdLeft != null) {
						const gdLeftVO = tableMgr.goodsTable.Find(gdLeft.GoodsID);
						const iLeftCategoriy = gdLeftVO.Categoriy;
						let iLeftHandType = gdLeftVO.HandType;
						if ((3 === Global.Data.roleData.Occupation) && (WeaponStates.D === gdLeftVO.ActionType) && (ItemCategories.WuQi_Zhang === gdLeftVO.Categoriy)) {
							iLeftHandType = HandTypes.ZuoYouShou;
						}
						if (iLeftCategoriy !== <number>ItemCategories.WuQi_Jian || iLeftCategoriy !== <number>ItemCategories.WuQi_Fu
							|| iLeftCategoriy !== <number>ItemCategories.WuQi_Chui || iLeftCategoriy !== <number>ItemCategories.WuQi_Mao
							|| iLeftCategoriy !== <number>ItemCategories.WuQi_Dao) {
							if (iLeftCategoriy !== <number>ItemCategories.WuQi_Dun) { // 如果不是盾
								if (iLeftHandType !== <number>HandTypes.ZuoYouShou) { // 如果不是上述装备并且 HandType类型不是左右手
									unGoodsList.push(gdLeft);
								} else {
									isUnLeft = true; // 当左手装备不是盾并且没有符合要卸载的装备
								}
							} else if (MyUI.GTipServiceEx.HandValue === <number>HandTypes.ZuoShou) { // 如果当前佩戴的是盾并且由TIPS指定替换左手
								unGoodsList.push(gdLeft);
							} else { // 当左手有东西并且根据佩戴装备没有符合要卸载的装备时
								isUnLeft = true;
							}
						}
					}
					if (gdRight != null) {
						const gdRightVO = tableMgr.goodsTable.Find(gdRight.GoodsID);
						const iRightCategoriy = gdRightVO.Categoriy;
						let iRightHandType = gdRightVO.HandType;
						const iRightActionType = gdRightVO.ActionType;
						if ((3 === Global.Data.roleData.Occupation) && (WeaponStates.D === gdRightVO.ActionType) && (ItemCategories.WuQi_Zhang === gdRightVO.Categoriy)) { // 增加魔剑士特殊处理 魔剑士可以装备两把单手杖
							iRightHandType = HandTypes.ZuoYouShou;
						}
						if (iRightActionType === WeaponStates.S) { // 如果右手是双手武器就卸
							unGoodsList.push(gdRight);
						} else if (iRightCategoriy !== <number>ItemCategories.WuQi_Jian || iRightCategoriy !== <number>ItemCategories.WuQi_Fu
							|| iRightCategoriy !== <number>ItemCategories.WuQi_Chui || iRightCategoriy !== <number>ItemCategories.WuQi_Mao
							|| iRightCategoriy !== <number>ItemCategories.WuQi_Dao) {
							if (iRightCategoriy !== <number>ItemCategories.WuQi_Dun) { // 如果不是盾
								if (iRightHandType !== <number>HandTypes.ZuoYouShou) { // 如果不是上述装备并且 HandType类型不是左右手
									unGoodsList.push(gdRight);
								} else {
									isUnRight = true;
								}
							}
						}
					}
					if (isUnLeft && isUnRight) { // 如果左右两边都有装备并具都不满卸载条件那就把右手装备卸下
						if (MyUI.GTipServiceEx.HandValue === <number>HandTypes.ZuoShou) {
							unGoodsList.push(gdLeft);
						} else {
							unGoodsList.push(gdRight);
						}
					}
				} else if (actionType === <number>WeaponStates.S || actionType === <number>WeaponStates.C || actionType === <number>WeaponStates.MJ) { // 如果是双手或长柄武器或者魔剑士双手巨剑
					if (gdLeft != null) {
						unGoodsList.push(gdLeft);
					}
					if (gdRight != null) {
						unGoodsList.push(gdRight);
					}
				}
			} else if (equipCategory === <number>ItemCategories.WuQi_Gong) { // 武器-弓
				if (actionType === <number>WeaponStates.G) {
					if (gdLeft != null) {
						unGoodsList.push(gdLeft);
					}
					if (gdRight != null) {
						const gdRightVO = tableMgr.goodsTable.Find(gdRight.GoodsID);
						const iRightCategoriy = gdRightVO.Categoriy;
						if (iRightCategoriy !== <number>ItemCategories.WuQi_GongJianTong) {
							unGoodsList.push(gdRight);
						}
					}
				}
			} else if (equipCategory === <number>ItemCategories.WuQi_Nu) { // 武器-弩
				if (actionType === <number>WeaponStates.N) {
					if (gdLeft != null) {
						const gdLeftVO = tableMgr.goodsTable.Find(gdLeft.GoodsID);
						const iLeftCategoriy = gdLeftVO.Categoriy;
						if (iLeftCategoriy !== <number>ItemCategories.WuQi_NuJianTong) {
							unGoodsList.push(gdLeft);
						}
					}
					if (gdRight != null) {
						unGoodsList.push(gdRight);
					}
				}
			} else if (equipCategory === <number>ItemCategories.WuQi_Zhang) { // 武器-杖
				if (actionType === <number>WeaponStates.D) { // 如果是单手武器
					if (3 === Global.Data.roleData.Occupation) {
						let isUnLeft = false;
						let isUnRight = false;
						if (gdLeft) {
							const gdLeftVO = tableMgr.goodsTable.Find(gdLeft.GoodsID);
							const iLeftCategoriy = gdLeftVO.Categoriy;
							let iLeftHandType = gdLeftVO.HandType;
							if ((<number>ItemCategories.WuQi_Zhang === gdLeftVO.Categoriy) && (<number>WeaponStates.D === gdLeftVO.ActionType)) {
								iLeftHandType = <number>HandTypes.ZuoYouShou;
							}
							if (iLeftCategoriy !== <number>ItemCategories.WuQi_Dun) { // 如果不是盾
								if (iLeftHandType !== <number>HandTypes.ZuoYouShou) { // 如果不是上述装备并且 HandType类型不是左右手
									unGoodsList.push(gdLeft);
								} else {
									isUnLeft = true; // 当左手装备不是盾并且没有符合要卸载的装备
								}
							} else if (MyUI.GTipServiceEx.HandValue === <number>HandTypes.ZuoShou) { // 如果当前佩戴的是盾并且由TIPS指定替换左手
								unGoodsList.push(gdLeft);
							} else { // 当左手有东西并且根据佩戴装备没有符合要卸载的装备时
								isUnLeft = true;
							}
						}
						if (gdRight) {
							const gdRightVO = tableMgr.goodsTable.Find(gdRight.GoodsID);
							const iRightCategoriy = gdRightVO.Categoriy;
							let iRightHandType = gdRightVO.HandType;
							const iRightActionType = gdRightVO.ActionType;
							if ((<number>ItemCategories.WuQi_Zhang === gdRightVO.Categoriy) && (<number>WeaponStates.D === gdRightVO.ActionType)) {
								iRightHandType = <number>HandTypes.ZuoYouShou;
							}
							if (iRightActionType === <number>WeaponStates.S) { // 如果右手是双手武器就卸
								unGoodsList.push(gdRight);
							} else if (iRightCategoriy !== <number>ItemCategories.WuQi_Jian || iRightCategoriy !== <number>ItemCategories.WuQi_Fu
								|| iRightCategoriy !== <number>ItemCategories.WuQi_Chui || iRightCategoriy !== <number>ItemCategories.WuQi_Mao
								|| iRightCategoriy !== <number>ItemCategories.WuQi_Dao) {
								if (iRightCategoriy !== <number>ItemCategories.WuQi_Dun) { // 如果不是盾
									if (iRightHandType !== <number>HandTypes.ZuoYouShou) { // 如果不是上述装备并且 HandType类型不是左右手
										unGoodsList.push(gdRight);
									} else {
										isUnRight = true;
									}
								}
							}
						}
						if (isUnLeft && isUnRight) {
							if (MyUI.GTipServiceEx.HandValue === <number>HandTypes.ZuoShou) {// 如果左右两边都有装备并具都不满卸载条件那就把右手装备卸下
								unGoodsList.push(gdLeft);
							} else {
								unGoodsList.push(gdRight);
							}
						}
					} else {
						if (gdLeft != null) {
							const gdLeftVO = tableMgr.goodsTable.Find(gdLeft.GoodsID);
							const iLeftCategoriy = gdLeftVO.Categoriy;
							if (iLeftCategoriy !== <number>ItemCategories.WuQi_Dun) {
								unGoodsList.push(gdLeft);
							}
						}
						if (gdRight != null) {
							unGoodsList.push(gdRight);
						}
					}
				} else if (actionType === <number>WeaponStates.S || actionType === <number>WeaponStates.C || actionType === <number>WeaponStates.MJ) { // 如果是双手或长柄武器
					if (gdLeft != null) {
						unGoodsList.push(gdLeft);
					}
					if (gdRight != null) {
						unGoodsList.push(gdRight);
					}
				}
			} else if (equipCategory === <number>ItemCategories.WuQi_Dun) { // 武器-盾
				if (actionType === <number>WeaponStates.D) { // 如果是单手武器
					if (gdLeft != null) {
						unGoodsList.push(gdLeft);
					}
					if (gdRight != null) {
						const gdRightVO = tableMgr.goodsTable.Find(gdRight.GoodsID);
						const iRightCategoriy = gdRightVO.Categoriy;
						const iRightHandType = gdRightVO.HandType;
						const iRightActionType = gdRightVO.ActionType;
						if (iRightActionType === <number>WeaponStates.S) { // 如果右手是双手武器就卸
							unGoodsList.push(gdRight);
						} else if (iRightCategoriy !== <number>ItemCategories.WuQi_Jian || iRightCategoriy !== <number>ItemCategories.WuQi_Fu
							|| iRightCategoriy !== <number>ItemCategories.WuQi_Chui || iRightCategoriy !== <number>ItemCategories.WuQi_Mao
							|| iRightCategoriy !== <number>ItemCategories.WuQi_Dao) {
							if (iRightCategoriy !== <number>ItemCategories.WuQi_Zhang) {
								if (iRightHandType !== <number>HandTypes.ZuoYouShou) { // 如果不是上述装备并且 HandType类型不是左右手
									unGoodsList.push(gdRight);
								}
							}
						}
					}
				}
			} else if (equipCategory === <number>ItemCategories.WuQi_GongJianTong) { // 武器-弓箭筒
				if (actionType === <number>WeaponStates.D) {
					if (gdLeft != null) {
						const gdLeftVO = tableMgr.goodsTable.Find(gdLeft.GoodsID);
						const iLeftCategoriy = gdLeftVO.Categoriy;
						if (iLeftCategoriy !== <number>ItemCategories.WuQi_Gong) {
							unGoodsList.push(gdLeft);
						}
					}
					if (gdRight != null) {
						unGoodsList.push(gdRight);
					}
				}
			} else if (equipCategory === <number>ItemCategories.WuQi_NuJianTong) {
				if (actionType === <number>WeaponStates.D) {
					if (gdLeft) {
						unGoodsList.push(gdLeft);
					}
					if (gdRight) {
						const gdRightVO = tableMgr.goodsTable.Find(gdRight.GoodsID);
						const iRightCategoriy = gdRightVO.Categoriy;
						const iRightActionType = gdRightVO.ActionType;
						if (iRightActionType === <number>WeaponStates.S) { // 如果右手是双手武器就卸
							unGoodsList.push(gdRight);
						} else if (iRightCategoriy !== <number>ItemCategories.WuQi_Nu) {
							unGoodsList.push(gdRight);
						}
					}
				}
			}
		}
		return unGoodsList;
	}

	/**
	 * 为了兼容2个戒指和2个手镯，必须做一下处理
	 * @param equipCategory 
	 */
	export function FindEquip(equipCategory: number): NetMsg.IGoodsData[] {
		const unGoodsList: NetMsg.IGoodsData[] = [];
		if (equipCategory !== ItemCategories.JieZhi) { // 如果不是戒指
			const gd = _FindEquip(equipCategory, -1);
			if (gd) {
				unGoodsList.push(gd);
			}
			return unGoodsList;
		}
		const gdLeft = FindUsingEuip(equipCategory, HandTypes.ZuoShou);
		const gdRight = FindUsingEuip(equipCategory, HandTypes.YouShou);
		if (null == gdLeft || null == gdRight) {
			return unGoodsList;
		}
		if (gdLeft && gdRight) {
			if (MyUI.GTipServiceEx.HandValue === HandTypes.ZuoShou) { // 戒指的左右手与武器是反的
				unGoodsList.push(gdRight);
			} else {
				unGoodsList.push(gdLeft);
			}
			return unGoodsList;
		}
		return unGoodsList;
	}

	function _FindEquip(equipCategory: number, bagIndex: number = -1): NetMsg.IGoodsData {
		if (!Super.GData.RoleUsingGoodsDataList) {
			return null;
		}
		const mapUsingGoods = Super.GData.RoleUsingGoodsDataList;
		for (const [key, value] of mapUsingGoods) {
			const goodsData = value;
			if (!goodsData) continue;
			if (goodsData.Using <= 0) continue;
			if (bagIndex >= 0) {
				if (goodsData.BagIndex !== bagIndex) {
					continue;
				}
			}
			const goodVO = tableMgr.goodsTable.Find(goodsData.GoodsID);
			if (!goodVO) continue;
			let categoriy = goodVO.Categoriy;
			if (ItemCategories.ChongWu === equipCategory) {
				equipCategory = ItemCategories.ShouHuChong;
			}
			if (ItemCategories.ChongWu === categoriy) {
				categoriy = ItemCategories.ShouHuChong;
			}
			if (equipCategory === categoriy) {
				return goodsData;
			}
		}
		return null;
	}
	/**
	 * 判断装备对比是否增加战力
	 * @param dbID 
	 * @param goodsID 
	 * @return [战力增长状态， 战力值]
	 */
	export function canHintEquipGoods(dbId: number, goodsId: number): [Boolean, number] {
		let zhanLiUp = 0;
		const goodVo = tableMgr.goodsTable.Find(goodsId);
		if (null === goodVo)
			return [false, zhanLiUp];
		const toSex = goodVo.ToSex;
		if (-1 !== toSex) {
			if (toSex !== Global.Data.roleData.RoleSex)
				return [false, zhanLiUp];
		}
		const toOccup = goodVo.ToOccupation;
		if (!this.validOccupation(toOccup))
			return [false, zhanLiUp];
		const toLevel = goodVo.ToLevel;
		if (toLevel > Global.Data.roleData.Level)
			return [false, zhanLiUp];

		const categoriy = goodVo.Categoriy;
		if (categoriy < (ItemCategories.TouKui) || categoriy >= (ItemCategories.EquipMax))
			return [false, zhanLiUp];

		if (!Global.CanUseGoodsAttr(goodsId, false))// 判断属性佩戴条件
			return [false, zhanLiUp];

		let bShow = false;
		// 如果战力值比自己身上佩戴的装备低时不提示
		const goodsData = Global.GetGoodsDataByDbID(dbId);
		if (null != goodsData) {
			const result = Global.GetCompareAttributeInfo(goodsData);
			if (result.get(ExtPropIndexes.Strong)) {
				zhanLiUp = result[ExtPropIndexes.Strong];
				if (zhanLiUp > 0) {
					if (this.IsHigherZhuoYueLv(goodsData))
						bShow = true;
					else
						bShow = false;
				}
				else {
					bShow = false;
				}
			}
			else {
				zhanLiUp = Global.GetGoodsDataZhanLi(goodsData);
				bShow = true;
			}
		}

		if (bShow) {
			// 品质判断
			return [true, zhanLiUp];
		}
		return [false, zhanLiUp];
	}
	/**
	 * 获取道具品质与人物身上装备品质高低
	 * @param goodsData 
	 */
	export function isHigherZhuoYueLv(goodsData: NetMsg.GoodsData): Boolean {
		if (goodsData != null) {
			const goodVo = tableMgr.goodsTable.Find(goodsData.GoodsID);
			if (null === goodVo)
				return false;

			const category = goodVo.Categoriy;

			if (category >= 0 && category < (ItemCategories.EquipMax)) {
				const actionType = goodVo.ActionType; // 佩戴方式
				const handType = goodVo.HandType; // 放置位置 
				let gdList = null; // 准备卸载下来的装备
				if (category >= ItemCategories.WuQi_Jian && category <= ItemCategories.WuQi_NuJianTong) {
					gdList = Super.FindWuQi(category, actionType, handType);
				}
				else {
					// 找出要除武器外要卸载的装备
					gdList = Super.FindEquip(category);
				}

				if (gdList != null && gdList.Count > 0) {
					const oldEquipZhuoYueVal = Global.GetZhuoyueAttributeCount(gdList[0].ExcellenceInfo);
					const newEquipZhuoYueVal = Global.GetZhuoyueAttributeCount(goodsData.ExcellenceInfo);
					if (oldEquipZhuoYueVal <= newEquipZhuoYueVal)
						return true;
					else
						return false;
				}
				else {
					return true;
				}
			}
			else {
				return true;
			}
		}
		else {
			return false;
		}
	}
	/**
	 * 判断转职等级是否有效
	 * @param toOccupation 
	 * @param myOccupation 
	 */
	export function validOccupation(toOccupation: number, myOccupation: number = -1): Boolean {
		if (toOccupation < 0)
			return true;
		if (myOccupation < 0)
			myOccupation = Global.Data.roleData.Occupation;
		if (0 !== (toOccupation & (1 << myOccupation)))
			return true;
		let orig = calcOriginalOccupationId(myOccupation);
		do {
			if (0 !== (toOccupation & (1 << orig))) {
				return true;
			}
			orig = calcOriginalOccupationId(orig);
		} while (orig <= toOccupation);

		return false;
	}
	/**
	 * 计算原始的职业ID(现有职业+1)*10 + 转职次数
	 * @param Occupation 
	 */
	export function calcOriginalOccupationId(occupation: number): number {
		// 如果还没转过职
		const nCurOcc = occupation;
		if (nCurOcc < 10)
			return nCurOcc;
		// 取得转职次数
		const nCount = nCurOcc % 10;
		return (nCurOcc - nCount) / 10 - 1;
	}
	//#endregion ======== 装备管理 ========

	/**
	 * 尝试自动寻路
	 * @param taskId 
	 * @param dontEnterFuBen 
	 * @param autoTransport 
	 * @returns {} 
	 */
	export function prccessAutotTaskFindRoad(taskId: number, dontEnterFuBen: boolean = false, autoTransport: boolean = true) {
		if (Global.Data.roleData.MapCode === 6090) {
			return; // 如果是新人 引导中，则不自动寻路
		}

		if (null == GameMode.getLocalPlayer()) {
			return;
		}

		const curLevel = GameMode.getLocalPlayer().getLevel();
		if (null == curLevel) {
			return;
		}

		const taskvo = tableMgr.tasksTable.getTaskVo(taskId);
		if (null == taskvo) {
			return;
		}

		const taskData = Task.getTaskDataById(taskId);
		if (null == taskData) {
			return;
		}

		const buttonId = Task.getTaskTeleportsById(taskId);
		if (!Task.jugeTaskComplete(taskvo, taskData.DoingTaskVal1, taskData.DoingTaskVal2)) {
			if (!Task.jugeTaskTargetComplete(taskvo, 1, taskData.DoingTaskVal1)) {
				const taskInfo = LogicTask.TaskBoxMini.getTaskTargetId(taskvo, 1, false);

				if (50 === taskInfo.mapCode && Global.GetMapSceneUIClass() !== SceneUIClasses.KuaFuMap) {
					// 跨服TODO:
					// PlayZone.GlobalPlayZone.OpenKuafuMapView(0, -1, taskInfo.npcID, taskInfo.mapCode, taskInfo.posX, taskInfo.posY);
					return;
				}
				if (60 === taskInfo.mapCode && Global.GetMapSceneUIClass() !== SceneUIClasses.HuanShuYuan) {
					// 跨服TODO:
					// PlayZone.GlobalPlayZone.OpenKuafuMapView(0, -1, taskInfo.npcID, taskInfo.mapCode, taskInfo.posX, taskInfo.posY);
					return;
				}

				if (!dontEnterFuBen && 1 === taskInfo.isFuBen) {
					// 进入指定的任务副本
					// gameIns.Game.spriteEnterTaskFuBen(taskId);
					return;
				}

				let targetType = 0;
				let toMapPos;
				if (-1 === Global.Data.roleData.MapCode) {
					if (taskvo.TargetMapCode1 >= 0) {
						targetType = taskvo.TargetType1;
						const targetMapCode1 = taskvo.TargetMapCode1;
						const targetPos1 = taskvo.TargetPos1.toString();
						if ("" !== targetPos1) {
							const pts: number[] = Global.String2IntArray(targetPos1, ",");
							if (null != pts && pts.length === 2) {
								toMapPos = new Laya.Point(
									(pts[0] / curLevel.currentMapData.gridSizeX) * curLevel.currentMapData.gridSizeX +
									curLevel.currentMapData.gridSizeX / 2,
									(pts[1] / curLevel.currentMapData.gridSizeY) * curLevel.currentMapData.gridSizeY +
									curLevel.currentMapData.gridSizeY / 2);
								taskInfo.mapCode = targetMapCode1;
								taskInfo.npcType = -1;
							}
						}
					}
				}
				else {

					const taskInfo = LogicTask.TaskBoxMini.getTaskTargetId(taskvo, 2, false);

					if (!dontEnterFuBen && 1 === taskInfo.isFuBen) {
						// 进入指定的任务副本
						// gameIns.Game.spriteEnterTaskFuBen(taskId);
						return;
					}
					if (taskInfo.mapCode === -1) {
						if (taskvo.TargetMapCode2 >= 0) {
							targetType = taskvo.TargetType2;
							const targetMapCode2 = taskvo.TargetMapCode2;
							const targetPos2 = taskvo.TargetPos2;
							if ("" !== targetPos2) {
								const pts: number[] = Global.String2IntArray(targetPos2, ",");
								if (null != pts && pts.length === 2) {
									// toMapPos = new Laya.Point((pts[0] / curLevel.currentMapData.gridSizeX) * curLevel.currentMapData.gridSizeX + curLevel.currentMapData.gridSizeX / 2, pts[1] / curLevel.currentMapData.gridSizeY) * curLevel.currentMapData.gridSizeY + curLevel.currentMapData.gridSizeY / 2);
									// mapCode = targetMapCode2;
									// npcType = -1;
								}
							}
						}
					}
				}
			}
		}
	}

	/**
	 * 得到下一个的引导任务
	 * @param taskId 
	 * @returns {} 
	 */
	export function getNextGuideTask(taskId: number): number {
		return -1;
		// 引导任务todo
	}

	/**
	 * 物品是否能出售
	 * @param gd 
	 */
	export function CanSaleOutGoods(gd: NetMsg.IGoodsData): boolean {
		const goodVO = tableMgr.goodsTable.Find(gd.GoodsID);
		if (goodVO.NoSaleOut === 1) return false;
		if (goodVO.Categoriy === ItemCategories.ItemTask) return false;
		return true;
	}

	/**
	 * 显示精灵回收提示
	 * @param Content 上方的描述文字
	 * @param AwardDescribe 回收所得描述
	 * @param money 回收所得
	 * @param hander 回调
	 * @param btnStr 按钮上的字
	 */
	export function ShowJingLingHuiShouMessageBox(Content: string, AwardDescribe: string[], money: number[], hander: DPSelectedItemBoolEventHandler, btnStr: string[] = null): void {
		// TODO: 精灵回收弹窗
	}

	/**
	 * 角色属性变化通知
	 * @param newPropFiles 新属性列表
	 */
	export function CalcRolePropsText(newPropFiles: number[]): void {
		if (!Global.Data.CurrentRolePropFields) return;
		if (Global.Data.CurrentRolePropFields.length !== newPropFiles.length) return;
		for (let i = 0; i < Global.Data.CurrentRolePropFields.length; i++) {
			if (newPropFiles[i] !== Global.Data.CurrentRolePropFields[i]) {
				const index = i - 1;
				if (0 === index) {
					const val = newPropFiles[i] - Global.Data.CurrentRolePropFields[i];
					if (val > 0) {

					}
				} else if (1 === index) {
					const val1 = Math.max(0, newPropFiles[i - 1] - Global.Data.CurrentRolePropFields[i - 1]);
					const val = newPropFiles[i] - Global.Data.CurrentRolePropFields[i];
					if (val > 0 || val1 > 0) {
						const showTextItem = new ShowTextItem();
						showTextItem.PicTextColor = PicTextColors.Yellow;
						showTextItem.Text = Loca.getLang("物攻");
						showTextItem.NumType = val >= 0 ? 0 : 1;
						showTextItem.NumVal = val;
						showTextItem.NumVal2 = Math.abs(val1);
						showTextItem.NumFormat = 1;
						Super.GData.RoleTextQueue.push(showTextItem);
					}
				} else if (2 === index) {
					const val = newPropFiles[i] - Global.Data.CurrentRolePropFields[i];
					if (val > 0) {

					}
				} else if (3 === index) {
					const val1 = Math.max(0, newPropFiles[i - 1] - Global.Data.CurrentRolePropFields[i - 1]);
					const val = newPropFiles[i] - Global.Data.CurrentRolePropFields[i];
					if (val > 0 || val1 > 0) {
						const showTextItem = new ShowTextItem();
						showTextItem.PicTextColor = PicTextColors.Red;
						showTextItem.Text = Loca.getLang("魔攻");
						showTextItem.NumType = val >= 0 ? 0 : 1;
						showTextItem.NumVal = val;
						showTextItem.NumVal2 = Math.abs(val1);
						showTextItem.NumFormat = 1;
						Super.GData.RoleTextQueue.push(showTextItem);
					}
				} else if (4 === index) {
					const val = newPropFiles[i] - Global.Data.CurrentRolePropFields[i];
					if (val > 0) {

					}
				} else if (5 === index) {
					const val1 = Math.max(0, newPropFiles[i - 1] - Global.Data.CurrentRolePropFields[i - 1]);
					const val = newPropFiles[i] - Global.Data.CurrentRolePropFields[i];
					if (val > 0 || val1 > 0) {
						const showTextItem = new ShowTextItem();
						showTextItem.PicTextColor = PicTextColors.Blue;
						showTextItem.Text = Loca.getLang("物防");
						showTextItem.NumType = val >= 0 ? 0 : 1;
						showTextItem.NumVal = val;
						showTextItem.NumVal2 = Math.abs(val1);
						showTextItem.NumFormat = 1;
						Super.GData.RoleTextQueue.push(showTextItem);
					}
				} else if (6 === index) {
					const val = newPropFiles[i] - Global.Data.CurrentRolePropFields[i];
					if (val > 0) {

					}
				} else if (7 === index) {
					const val1 = Math.max(0, newPropFiles[i - 1] - Global.Data.CurrentRolePropFields[i - 1]);
					const val = ((newPropFiles[i + 1] + newPropFiles[i]) / 2) - ((Global.Data.CurrentRolePropFields[i + 1] + Global.Data.CurrentRolePropFields[i]) / 2);
					if (val > 0 || val1 > 0) {
						const showTextItem = new ShowTextItem();
						showTextItem.PicTextColor = PicTextColors.Blue;
						showTextItem.Text = Loca.getLang("魔防");
						showTextItem.NumType = val >= 0 ? 0 : 1;
						showTextItem.NumVal = val;
						showTextItem.NumVal2 = Math.abs(val1);
						showTextItem.NumFormat = 1;
						Super.GData.RoleTextQueue.push(showTextItem);
					}
				} else if (8 === index) {
					const val = newPropFiles[i] - Global.Data.CurrentRolePropFields[i];
					if (val > 0) {

					}
				} else if (9 === index) {
					const val1 = Math.max(0, newPropFiles[i - 1] - Global.Data.CurrentRolePropFields[i - 1]);
					const val = newPropFiles[i] - Global.Data.CurrentRolePropFields[i];
					if (val > 0 || val1 > 0) {
						const showTextItem = new ShowTextItem();
						showTextItem.PicTextColor = PicTextColors.Yellow;
						showTextItem.Text = Loca.getLang("道攻");
						showTextItem.NumType = val >= 0 ? 0 : 1;
						showTextItem.NumVal = val;
						showTextItem.NumVal2 = Math.abs(val1);
						showTextItem.NumFormat = 1;
						Super.GData.RoleTextQueue.push(showTextItem);
					}
				} else if (10 === index) {
					const val = newPropFiles[i] - Global.Data.CurrentRolePropFields[i];
					if (val > 0) {

					}
				} else if (11 === index) {
					const val = newPropFiles[i] - Global.Data.CurrentRolePropFields[i];
					if (val > 0) {

					}
				} else if (12 === index) {
					const val = newPropFiles[i] - Global.Data.CurrentRolePropFields[i];
					if (val > 0) {

					}
				} else if (14 === index) {
					const val = newPropFiles[i] - Global.Data.CurrentRolePropFields[i];
					if (val > 0) {

					}
				} else if (16 === index) {
					const val = newPropFiles[i] - Global.Data.CurrentRolePropFields[i];
					if (val > 0) {

					}
				} else if (17 === index) {
					const val = newPropFiles[i] - Global.Data.CurrentRolePropFields[i];
					if (val > 0) {
						const showTextItem = new ShowTextItem();
						showTextItem.PicTextColor = PicTextColors.Yellow;
						showTextItem.Text = Loca.getLang("最大生命值");
						showTextItem.NumType = val >= 0 ? 0 : 1;
						showTextItem.NumVal = Math.abs(val);
						Super.GData.RoleTextQueue.push(showTextItem);
					}
				} else if (19 === index) {
					const val = newPropFiles[i] - Global.Data.CurrentRolePropFields[i];
					if (val > 0) {

					}
				}
			}
		}
	}

	//#region ======== 技能配置数据 ========
	/**
	 * 保存技能配置
	 */
	export function SaveSkillQuickBar() {
		const oldKeys = Global.Data.roleData.MainQuickBarKeys;
		const newKeys = Super.GetSkillQuickKeys(Super.GData.MainQuickKeyItems);
		if (newKeys !== oldKeys) {
			Global.Data.roleData.MainQuickBarKeys = newKeys;
			Net.sendModKeys(0, newKeys);
		}
	}

	/**
	 * 解析主快捷使用字符串
	 * @param keys 字符串
	 * @param forceSave 是否强制保存
	 */
	export function ParseMainQuickKeys(keys: string, forceSave: boolean = false) {
		for (let i = 0; i < Super.GData.MainQuickKeyItems.length; i++) {
			Super.GData.MainQuickKeyItems[i] = null;
		}
		if (Global.String.IsNullOrWhiteSpace(keys)) {
			return;
		}

		const sPages = keys.split("_");
		if (sPages.length < 4) { // 兼容旧版本-- modify by CYW 修改为4(3页，每页5个,最后一个是选择的页签(1,2,3))
			Super.GData.m_nChoosePage = 0;
		} else if (sPages.length === 4) {
			const nNewPage = parseInt(sPages[3]);
			if (Super.GData.m_nChoosePage !== nNewPage) {
				Super.GData.m_nChoosePage = nNewPage;
			}
		} else {
			return;
		}

		for (let i = 0; i < Super.GData.MainQuickKeyItems.length; i++) {
			const kThisInfo = new SkillQuickKeyPageInfo();
			const sPageStr = (i < sPages.length) ? sPages[i] : "";
			kThisInfo.myString = sPageStr;
			Super.GData.MainQuickKeyItems[i] = kThisInfo;
		}
		const newKeys = Super.GetSkillQuickKeys(Super.GData.MainQuickKeyItems);
		if (newKeys !== keys || forceSave) {
			Global.Data.roleData.MainQuickBarKeys = newKeys;
			Net.sendModKeys(0, newKeys);
		}
	}

	/**
	 * 解析配置的其他快捷列表
	 * @param keys 字符串
	 */
	export function ParseOtherQuickKeys(keys: string) {
		for (let i = 0; i < Super.GData.OtherQuickKeyItems.length; i++) {
			Super.GData.OtherQuickKeyItems[i] = null;
		}
		if (Global.String.IsNullOrWhiteSpace(keys)) {
			return;
		}
		const fields = keys.split("|");
		if (fields.length < 4) { // modify by neo 应该为5，兼容旧版本，暂时为4
			return;
		}
		for (let i = 0; i < fields.length && i < Super.GData.OtherQuickKeyItems.length; i++) {
			Super.GData.OtherQuickKeyItems[i] = ParseQuickKeyItem(fields[i]);
		}
	}

	/**
	 * 解析快捷使用项（将字符串解析成QuickKeyItem）
	 * @param item 技能配置字符串
	 */
	export function ParseQuickKeyItem(item: string): QuickKeyItem {
		if (Global.String.IsNullOrWhiteSpace(item)) {
			return null;
		}
		if ("undefined@undefined" === item.trim()) {
			return null;
		}

		const fields = item.split("@");
		if (fields.length !== 2) return null;
		const skillType = parseInt(fields[0].trim());
		if (skillType < 0) return null;
		const skillID = parseInt(fields[1].trim());
		if (!Global.GetSkillDataByID(skillID)) return null;

		const quickKeyItem = new QuickKeyItem();
		quickKeyItem.ID = skillID;
		quickKeyItem.ItemType = skillType;
		return quickKeyItem;
	}

	/**
	 * 获取技能配置的字符串
	 * @param quickKeyItems 
	 */
	export function GetSkillQuickKeys(quickKeyItems: SkillQuickKeyPageInfo[]): string {
		if (!quickKeyItems || quickKeyItems.length < 3) return "";
		let ret = "";
		for (let i = 0; i < quickKeyItems.length; i++) {
			if (!quickKeyItems[i]) {
				if (ret.length > 0) ret += "_";
				ret += "-1@0";
			} else {
				if (ret.length > 0) ret += "_";
				ret += quickKeyItems[i].myString;
			}
		}
		ret += `_${GData.m_nChoosePage}`;
		return ret;
	}

	/**
	 * 技能配置为空时，初始化技能配置
	 */
	export function InitMainQuickKeys() {
		if (!Global.String.IsNullOrEmpty(Global.Data.roleData.MainQuickBarKeys)) {
			return;
		}
		if (EnumOccupation.LongDan === Global.Data.roleData.Occupation) {
			Global.Data.roleData.MainQuickBarKeys = "-1@0|1@10000|-1@0|-1@0|-1@0";
		} else if (EnumOccupation.HuaLing === Global.Data.roleData.Occupation) {
			Global.Data.roleData.MainQuickBarKeys = "-1@0|1@11000|-1@0|-1@0|-1@0";
		} else if (EnumOccupation.QiaoGong === Global.Data.roleData.Occupation) {
			Global.Data.roleData.MainQuickBarKeys = "-1@0|1@12000|-1@0|-1@0|-1@0";
		} else if (EnumOccupation.DouXian === Global.Data.roleData.Occupation) {
			Global.Data.roleData.MainQuickBarKeys = "-1@0|1@14000|-1@0|-1@0|-1@0";
		}
	}
	//#endregion ======== 技能配置数据 ========

	/**
	 * 获取是否可以进行VIP传送
	 */
	export function getCanVIPTransfer(): boolean {
		const nNeedLv = tableMgr.sysParamsTable.getParamInt("VIPChuanSong");
		return gameIns.gameState.roleData.VIPLevel >= nNeedLv;
	}

	/**
     * 检测是否可以传送到指定的关卡
     * @param mapCode 要传送到的关卡Id 
     * @param allowThisMap 是否允许本关卡传送
     * @param forceTransGoods 是否消耗传送道具
     */
	export function canTransport(mapCode: number, allowThisMap = false, forceTransGoods = true): boolean {
		const roleData = gameIns.gameState.roleData;
		if (!allowThisMap && roleData.MapCode === mapCode) {
			return false;
		}
		if (Global.isBattleMap(roleData.MapCode)) {
			uiMgr.hintText(ConfigLoca.UI_Transfer_Failure_In_BattleMap);
			return false;
		}

		// TODO: 这里有一个扬州城的逻辑是什么？

		if (Global.isLuoLanChengZhanMapCode(roleData.MapCode)) {
			uiMgr.hintText(ConfigLoca.UI_Transfer_Failure_In_ChengZhan);
			return false;
		}
		if (forceTransGoods) {
			if (Global.ProcessMonthVIP() <= 0 && Global.GetGoodsDataByID(Global.MapTransGoodsID) == null
				&& Global.GetGoodsDataByID(Global.MapTransGoodsID2) == null) {
				return false;
			}
		}
		// 传送时取消自动战斗
		GameMode.getLocalPlayerController().cancelAutoFight();
		return true;
	}
}