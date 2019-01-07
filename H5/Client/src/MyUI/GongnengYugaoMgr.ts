namespace MyUI {
	/**
	 * 功能开启相关接口
	 */
	export class GongnengYugaoMgr {
		/**
		 * 根据开启功能 Key:order ID  Value:对应按钮Button 存储的Map列表
		 */
		private static iconsDict = new Map<number, Laya.Component>();
		/**
		 * 根据开启功能 Key:order ID  Value:对应按钮Button的显示状态 存储的Map列表
		 */
		private static iconsOpenDictReal = new Map<number, boolean>();
		// 记录当前时间，延迟时间调用
		private static startTimes = 0;

		constructor() {

		}

		/**
		 * 获取功能名称
		 * @param id 功能ID
		 */
		static GetGongNengName(id: GongNengIDs): string {
			const vo = tableMgr.systemOpenTable.Find(id);
			if (vo) {
				return Loca.getLang(vo.Name);
			}
			return Loca.getLang("该");
		}

		/**
		 * 功能是否开启
		 * @param id 功能ID
		 */
		static IsGongNengOpened(id: GongNengIDs): { isOpen: boolean, trigger: number, param1: number, param2: number } {
			const vo = tableMgr.systemOpenTable.Find(id);
			if (vo) {
				return { isOpen: vo.IsOpened, trigger: vo.TriggerCondition, param1: vo.TimeParameters, param2: vo.TimeParameters2 };
			}
			return { isOpen: true, trigger: 0, param1: 0, param2: 0 };
		}

		/**
		 * 功能是否开启并提示开启条件，true=开启、false=未开启（同时会提示开启条件）
		 * @param id 功能ID
		 */
		static HintGongNengOpened(id: GongNengIDs): boolean {
			const obj = GongnengYugaoMgr.IsGongNengOpened(id);
			!obj.isOpen && UIHelper.HintGongNengOpenCondition(id, obj.trigger, obj.param1, obj.param2);
			return obj.isOpen;
		}

		/**
		 * 当完成一个任务时,检查这个任务有没有新开启的功能,返回功能唯一ID
		 * @param completedMainTaskId		主线ID
		 * @returns {} 
		 */
		static getNewIconOnCompleteTask(completedMainTaskId: number): number {
			let newId = -1;
			const len = tableMgr.systemOpenTable.AllRows().length;
			for (let i = 0; i < len; i++) {
				const item = tableMgr.systemOpenTable.AllRows()[i];
				if (!this.validateOccupation(item.Occupation)) {
					continue;
				}
				// 判断功能开启的类型条件是否符合
				if (item.TriggerCondition === SystemHelpModes.CompTask) {
					// 判断功能开启的任务ID是否符合
					if (item.TimeParameters === completedMainTaskId) {
						if (item.Cartoon <= 0) {
							item.IsOpened = true;
							continue;
						}
						this.iconsOpenDictReal[item.Order] = true;
						if (item.SpecialOpenType === 0) {
							newId = item.ID;
						}
					} else if (item.TimeParameters > completedMainTaskId) {
						break; // 条件有序的限定可以省去一半的遍历运算量,如果策略能接受的话
					}
				}
			}
			return newId;
		}
		/**
		 * 判断职业是否符合开启功能要求
		 * @param needOccupation         功能开启要求的职业
		 */
		static validateOccupation(needOccupation: number): boolean {
			if (needOccupation < 0 ||
				needOccupation === Global.CalcOriginalOccupationID(Global.Data.roleData.Occupation)) {
				return true;
			} else {
				return false;
			}
		}

		/**
		 * 当升级时,检查这个级别区间内有没有新开启的功能,返回功能唯一ID
		 * @param oldLevel		升级前的等级
		 * @param newLevel      升级后的等级
		 * @returns {} 
		 */
		static getNewIconOnLevelUp(oldLevel: number, newLevel: number): number {
			let newId = -1;
			if (gameIns.gameState.roleData.IsFlashPlayer !== 0)
				return -1;

			let fromLevel = oldLevel;
			let toLevel = newLevel;
			const changeLifeCount = Global.Data.roleData.ChangeLifeCount;
			if (oldLevel < newLevel) {
				fromLevel = Global.GetUnionLevel(changeLifeCount, fromLevel);
				toLevel = Global.GetUnionLevel(changeLifeCount, toLevel);
			} else {
				fromLevel = Global.GetUnionLevel(changeLifeCount - 1, fromLevel);
				toLevel = Global.GetUnionLevel(changeLifeCount, toLevel);
			}

			const len = tableMgr.systemOpenTable.AllRows().length;
			for (let i = 0; i < len; i++) {
				const item = tableMgr.systemOpenTable.AllRows()[i];
				if (!this.validateOccupation(item.Occupation)) {
					continue;
				}
				// 判断功能开启的类型条件是否符合
				if (item.TriggerCondition === SystemHelpModes.ToLevel) {
					const needUnionLevel = Global.GetUnionLevel(item.TimeParameters, item.TimeParameters2);
					if (fromLevel >= needUnionLevel) {
						this.iconsOpenDictReal[item.Order] = true;
						continue;
					} else if (needUnionLevel <= toLevel) {
						if (item.Cartoon <= 0) {
							item.IsOpened = true;
							continue;
						}
						this.iconsOpenDictReal[item.Order] = true;
						if (item.SpecialOpenType === 0) {
							newId = item.ID;
						}
					} else if (needUnionLevel > toLevel) {
						break; // 条件有序的限定可以省去一半的遍历运算量,如果策略能接受的话()
					}
				}
			}
			return newId;
		}

		/**
		 * 声望是否开启功能
		 * @param shengWangLevel		声望等级
		 * @returns {} 
		 */
		static getNewIconOnShengWangLevelUp(shengWangLevel: number): number {
			const ret = -1;
			const len = tableMgr.systemOpenTable.AllRows().length;
			for (let i = 0; i < len; i++) {
				const item = tableMgr.systemOpenTable.AllRows()[i];
				if (!this.validateOccupation(item.Occupation)) {
					continue;
				}
				// 判断功能开启的类型条件是否符合
				if (item.TriggerCondition === SystemHelpModes.ShengWangLevel) {
					// 判断功能开启的声望等级是否符合
					if (item.TimeParameters < shengWangLevel) {
						item.IsOpened = true;
						this.iconsOpenDictReal[item.Order] = true;
						continue;
					}
					if (false === item.IsOpened && (item.TimeParameters === shengWangLevel)) {
						item.IsOpened = true;
						this.iconsOpenDictReal[item.Order] = true;
						return item.ID;
					}
				}
			}
			return ret;
		}

		/**
		 * 设置图标可见性
		 * @param showState		设定所有图标的可见性
		 * @returns {} 
		 */
		static updateIcons(showState: boolean = false) {
			let newId = -1;
			const unionLevel = Global.GetUnionLevel();
			const completedMainTaskId = gameIns.gameState.roleData.CompletedMainTaskID;
			const winId = gameIns.gameState.roleData.MyWingData.WingID;
			const showList = new Array<number>();
			const len = tableMgr.systemOpenTable.AllRows().length;
			for (let i = 0; i < len; i++) {
				const item = tableMgr.systemOpenTable.AllRows()[i];
				let iconOpen = false;
				if (!this.validateOccupation(item.Occupation)) {
					continue;
				}
				if (!item.IsOpened) {
					let gongNengOpen = false;
					// 判断功能开启的等级条件是否符合
					if (item.TriggerCondition === SystemHelpModes.ToLevel) {
						const needUnionLevel = Global.GetUnionLevel(item.TimeParameters, item.TimeParameters2);
						if (needUnionLevel <= unionLevel) {
							gongNengOpen = true;
						}
					}
					// 判断功能开启的任务条件是否符合
					else if (item.TriggerCondition === SystemHelpModes.CompTask) {
						if (item.TimeParameters <= completedMainTaskId) {
							gongNengOpen = true;
						}
					}
					// 判断功能开启的翅膀进阶条件是否符合
					else if (item.TriggerCondition === SystemHelpModes.WinUpGrade) {
						if (item.TimeParameters <= winId) {
							gongNengOpen = true;
						}
					}
					// 判断功能开启的成就条件是否符合
					else if (item.TriggerCondition === SystemHelpModes.ChengJiuLv) {
						if (Global.GetRoleCommonUseParamsValue(RoleCommonUseIntParamsIndexs.ChengJiuLevel) >=
							item.TimeParameters) {
							gongNengOpen = true;
						}
					}
					// 判断功能开启的声望等级条件是否符合
					else if (item.TriggerCondition === SystemHelpModes.ShengWangLevel) {
						const shengwangLevel =
							Global.GetRoleCommonUseParamsValue(RoleCommonUseIntParamsIndexs.ShengWangLevel);
						if (shengwangLevel >= item.TimeParameters) {
							gongNengOpen = true;
						}
					}

					item.IsOpened = gongNengOpen;
				}
				iconOpen = this.iconsOpenDictReal.get(item.Order);
				if (!iconOpen) {
					this.iconsOpenDictReal.set(item.Order, item.IsOpened);
				} else {
					continue;
				}

				if (item.IsOpened || item.Cartoon <= 0/* || item.Order !== SystemOpenOrderEnum.BianQiang*/) {
					this.iconsOpenDictReal[item.Order] = true;
					showList.push(item.Order);
				}
			}

			if (showState) {
				for (const [key, value] of this.iconsOpenDictReal) {
					this.setIcon(value, key);
				}
			} else {
				showList.sort();
				for (const id of showList) {
					if (id !== newId) {
						newId = id;
						this.setIcon(true, id);
					}
				}
			}

			// TODO   图标可见设置完成后，排序
			// Global.GlobalEventDispatcher.dispatchEvent(new PlayGameContolEvent(PlayGameControlEvents.EventTopIconBoxRefresh, 0));
			// Global.GlobalEventDispatcher.dispatchEvent(new PlayGameContolEvent(PlayGameControlEvents.EventMenuIconBoxAddIcon, 0));
		}

		/**
		 * 设置未开启过按钮的显示或隐藏
		 * @param visible     按钮的显示或隐藏
		 * @param id          id==-1表示所有管理的按钮显隐，否则是单一按钮显隐
		 */
		static setIcon(visible: boolean, id: number = -1) {
			let comp = null;
			if (id === -1) {
				// 获取开启到的ID
				const index = Global.getMaxActiveSystemIndex();
				Global.Log.Error("获取开启到的ID     index = " + index);
				for (const [key, value] of this.iconsDict) {
					if (key > index) {
						comp = this.iconsDict.get(id);
						if (comp) {
							this.setCompVisibility(comp, visible);
						}
					}
				}
			} else {
				comp = this.iconsDict.get(id);
				if (comp)
					this.setCompVisibility(comp, visible);
			}
		}
		/**
		 * 组件的显隐状态
		 * @param comp          这里用any是因为以后控制的组件不一定是一种，例如按钮、玩家左上角头像 				
		 * @param visible       显隐状态   
		 */
		static setCompVisibility(comp: Laya.Component, visible: boolean) {
			if (null !== comp) {
				comp.visible = visible;
			}
		}
		/**
		 * 显示全部功能图标
		 * @returns {} 
		 */
		static showAllIcon(): void {
			for (const [key, value] of this.iconsOpenDictReal) {
				this.iconsOpenDictReal.set(key, true);
				this.setIcon(true, key);
			}
		}
		/**
		 * 图标飞的动画
		 * @param systemOpenVoId 		systemOpenVo里功能ID
		 * @returns {} 
		 */
		static readyFlyingImgAnimation(systemOpenVoId: number): boolean {
			const ticks = TimeManager.now(); // TimeManager.getCorrectLocalTime();
			if (this.startTimes > 0 && ticks - this.startTimes < 10000) {
				this.startTimes = 0;
				return false;
			}
			this.startTimes = ticks;
			this.updateIcons();
			// 表里systemOpenVo ID是否存在
			const itemData = tableMgr.systemOpenTable.Find(systemOpenVoId);
			if (null == itemData) {
				this.startTimes = 0;
				return false;
			}
			// 表里systemOpenVo OrderID是否存在对应的功能按钮项
			const target = GongnengYugaoMgr.getIconById(itemData.Order);
			if (target == null) {
				this.startTimes = 0;
				return false;
			}
			// 生成一个开启飞图标功能
			uiMgr.createSystemOpenFlyPart(itemData, target);
			// 功能图标对应显示
			this.setIcon(true, itemData.Order);
			// 主界面功能按钮刷新
			gameEventBus.mainViewBtnBoxRefresh.event(itemData.Order);
			return true;
		}

		/**
		 * 根据唯一功能ID获取控件的组件基类对象句柄
		 * @param orderId		systemOpenVo  对应OrderId
		 * @returns {} 
		 */
		static getIconById(orderId: number): Laya.Component {
			const compoent = this.iconsDict.get(orderId);
			return compoent;
		}
		/**
		 * 把按钮添加到字典中
		 * @param id 			功能orderId
		 * @param btn          对应功能按钮
		 */
		static addIcon(id: number, btn: Laya.Component) {
			if (btn != null) {
				this.iconsDict.set(id, btn);
			}
			else {
				this.iconsDict.delete(id);
			}
		}
	}
}