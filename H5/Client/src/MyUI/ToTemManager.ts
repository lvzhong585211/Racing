/**
* 图腾管理器 
*/
module MyUI {
	export class ToTemManager {
		private static _instance: ToTemManager;
		/** 跳转图腾界面时候，需要选中的图腾，展示动画 */
		private static _showTotemGetEffect: boolean = false;

		private totemNet: ToTemNet;

		private totemMap: Map<number, Array<tables.DragonTotemVO>>;
		/** 跳转图腾界面时候，需要选中的图腾，展示动画 */
		static getNewTotemStatus: Map<number, boolean> = new Map<number, boolean>();
		constructor() {

		}

		static getInstance(): ToTemManager {
			if (this._instance === undefined) {
				this._instance = new ToTemManager();
				this._instance.totemMap = new Map<number, Array<tables.DragonTotemVO>>();
				this._instance.initDataMap();
				this._instance.initNetMap();
			}
			return this._instance;
		}

		initDataMap(): void {
			const checkIDMap: Map<number, tables.DragonTotemVO> = new Map<number, tables.DragonTotemVO>();
			let totemList: Array<tables.DragonTotemVO>;
			tableMgr.dragonTotemTable.AllRows().forEach((dTotemVo, index) => {
				if (dTotemVo.visibility === 1) {
					const totemVo = this.totemMap.get(dTotemVo.TotemType);

					if (totemVo === undefined) {
						totemList = new Array<tables.DragonTotemVO>();
					}
					totemList.push(dTotemVo);
					this.totemMap.set(dTotemVo.TotemType, totemList);

					if (checkIDMap.has(dTotemVo.ID)) {
						Global.Log.Error("DragonTotem.xml 图腾配置中出现相同ID：" + dTotemVo.ID);
					}
					checkIDMap.set(dTotemVo.TotemType, dTotemVo);
				}
			});
			// tableMgr.dragonTotemTable.Find() 
		}
		/**
		 * 获取对应类型的图腾列表
		 * @param type 图腾类型
		 */
		getToTemItemListOfType(type: number): tables.DragonTotemVO[] {
			const dTotemList: tables.DragonTotemVO[] = [];
			tableMgr.dragonTotemTable.AllRows().forEach((dTotemVo, index) => {
				if (dTotemVo.visibility === 1) {
					if (type === dTotemVo.TotemType) {
						dTotemList.push(dTotemVo);
					}
				}
			});
			return dTotemList;
		}
		/** 增加新的图腾 */
		setTotemNetItem(item: NetMsg.TotemNetItem): boolean {
			this.initNetMap();
			let result: boolean = false;
			if (this.getTotemNetItemOfKey(item.ToTemID)) {
				result = true;
			} else {
				if (gameIns.gameState.roleData.activatedTotemList === null) {
					gameIns.gameState.roleData.activatedTotemList = new Array<NetMsg.TotemNetItem>();
					result = false;
				} else {
					for (let nItem of gameIns.gameState.roleData.activatedTotemList) {
						if (nItem !== null && nItem !== undefined) {
							if (nItem.ToTemID === item.ToTemID) {
								result = true;
								break;
							}
						}
					}
					// result = gameIns.gameState.roleData.activatedTotemList.find(e => e.ToTemID === item.ToTemID) === null ? false : true;
				}

				if (!result) {
					gameIns.gameState.roleData.activatedTotemList.push(item);
				}
			}
			return result;
		}
		/**
		 * 获取图腾 根据唯一Key
		 * @param key 图腾唯一Id
		 */
		getToTemItemOfKey(key: number): tables.DragonTotemVO {
			if (this.totemMap === null || this.totemMap === undefined) {
				Global.Log.Error("图腾本地数据出错");
				return null;
			}
			let abstotemList: tables.DragonTotemVO[];
			let totemItem: tables.DragonTotemVO;
			this.totemMap.forEach((itemList, index) => {
				abstotemList = itemList;
				abstotemList.forEach((item) => {
					if (item.ID === key) {
						totemItem = item;
						return item;
					}
				});
			});
			return totemItem;
		}
		/**
		 * 根据Key获取图腾解锁信息
		 * @param key 图腾唯一Id
		 */
		getTotemNetItemOfKey(key: number): NetMsg.ITotemNetItem {
			this.initNetMap();
			if (this.totemNet.activatedTotemMap === null) {
				Global.Log.Error("图腾网络数据出错");
				return null;
			}
			let iTotemNetItem: NetMsg.ITotemNetItem = null;
			this.totemNet.activatedTotemMap.forEach((itemList) => {
				itemList.forEach((item) => {
					if (item.ToTemID === key) {
						iTotemNetItem = item;
					}
				});
			});
			return iTotemNetItem;
		}
		/**
		 * 根据Type,Key获取图腾解锁信息
		 * @param type 图腾类型
		 * @param key 图腾唯一Id
		 */
		getTotemNetItemOfTypeOfKey(type: number, key: number): NetMsg.ITotemNetItem {
			this.initNetMap();
			if (this.totemNet.activatedTotemMap === null) {
				Global.Log.Error("图腾网络数据出错");
				return null;
			}
			const totemNetItem = this.totemNet.activatedTotemMap.get(type);
			if (totemNetItem) {
				for (let item of totemNetItem) {
					if (item.ToTemID === key) {
						return item;
					}
				}
			}
			return null;
		}
		/**
		 * 触发说明
		 * @param totemData 
		 */
		getStringOfParamsKeyOfParamsValue(totemData: tables.DragonTotemVO): string {
			let msg = "";
			const parameters: string[] = totemData.Parameters.split(',');
			const sHelpModes = totemData.TriggerCondition;
			switch (sHelpModes) {
				case SystemHelpModes.CompTask:
					parameters.forEach((pStr, index) => {
						const taskVO: tables.TaskVo = tableMgr.tasksTable.getTaskVo(parseInt(parameters[index]));
						if (taskVO != null) {
							msg += Loca.getLang(taskVO.Title);
						}
						else {
							Global.Log.Error(Global.String.Format("任务列表中没有找到DragToTem.xml中任务配置： ToTemID{0} parameters{1}", totemData.TotemType, totemData.Parameters));
							// break;
						}
					})
					msg = Global.String.Format(ConfigLoca.UI_COMMON_FinishTask, msg);
					break;
				case SystemHelpModes.ToLevel:
					if (parameters.length == 2) {
						msg = UIHelper.FormatLevelLimit(parseInt(parameters[1]), parseInt(parameters[0]));
					}
					else {
						msg = UIHelper.FormatLevelLimit(100, 100);
					}
					msg = Global.String.Format(ConfigLoca.UI_COMMON_LevelAchieve, msg);
					break;
				case SystemHelpModes.VipLevel:
					msg = parameters[0];
					msg = Global.String.Format(ConfigLoca.UI_COMMON_VipAchieve, msg);
					break;
				case SystemHelpModes.FirstLogin:
					break;
				case SystemHelpModes.ToMap:
					break;
				default:
					Global.Log.Error("图腾系统中未包含的处理方式，TriggerCondition：" + totemData.TriggerCondition);
					break;
			}

			msg = Loca.getLang(`${totemData.params_value_describle}`);

			return msg;
		}
		/**
		 * 技能说明
		 * @param magicItemVO 
		 */
		getStringOfMagicVO(magicInfoVO: tables.MagicInfoVO): string {
			let description: string = Loca.getLang(magicInfoVO.Description);
			if (magicInfoVO.preWeakMagicId != -1) {
				return description;
			}
			let voLevel = Global.getMagicLevelVO(magicInfoVO.ID, 1);
			if (voLevel === null) {
				Global.Log.Error(Global.String.Format("技能ID为 {0} 找不到", magicInfoVO.ID));
				return description;
			}
			return Global.GetRealDesc(description, voLevel.DescriptionParams);
		}
		/** 
		 * 返回当前将要展示的图腾ID 进度
		 * return totemId 图腾Id
		 * return completeTasks 进行的任务
		 * return allTasks 所有任务数量
		 */
		getTaskIDListOfTaskID2TaskID(): { totemId: number, completeTasks: number, allTasks: number } {
			let _totemId = 0;
			let _completeTasks = 0;
			let _allTasks = 0;
			let taskIDList: Array<number> = new Array<number>();
			let taskId2LimitDragonTotemMap: Map<number, number> = new Map<number, number>();
			//定位下一个任务ID
			let nextTaskId: number = 0;
			for (let tVo of tableMgr.tasksTable.AllRows()) {
				//tableMgr.tasksTable.AllRows().forEach((tVo) => {
				if (TableUtils.getFieldNumber(tVo.TaskClass) === TaskClasses.Main) {
					if (gameIns.gameState.roleData.CompletedMainTaskID >= tVo.ID) {
						if (tVo.LimitDragonTotem !== -1) {
							_totemId = tVo.LimitDragonTotem;
							if (MyUI.ToTemManager.getInstance().getTotemNetItemOfKey(tVo.LimitDragonTotem) !== null) {
								_completeTasks = 0;
								_allTasks = 0;
							}
						}
						_completeTasks++;
					}
					else if (tVo.LimitDragonTotem !== -1) {
						_totemId = tVo.LimitDragonTotem;
						if (MyUI.ToTemManager.getInstance().getTotemNetItemOfKey(tVo.LimitDragonTotem) !== null) {
							_completeTasks = 0;
						}
						else {
							break;
						}
					}
					nextTaskId = tVo.NextTask;
					_allTasks++;
				}
			}

			if (nextTaskId === -1) {
				_totemId = -1;
				_completeTasks = _allTasks;
			}

			if (_allTasks === 0) {
				_allTasks = 1;
			}
			return { totemId: _totemId, completeTasks: _completeTasks, allTasks: _allTasks };
		}

		/**
		 * 换角色清理数据
		 */
		static clearShowInfo(): void {
			ToTemManager.getNewTotemStatus = new Map<number, boolean>();
		}

		set showTotemGetEffect(value: boolean) {
			ToTemManager._showTotemGetEffect = value;
		}
		get showTotemGetEffect() {
			/** 保证值只会被用一次 */
			const value: boolean = ToTemManager._showTotemGetEffect;
			ToTemManager._showTotemGetEffect = false;
			return ToTemManager._showTotemGetEffect;
		}

		/** 初始化服务器图腾数据 */
		private initNetMap(): void {
			this.totemNet = new ToTemNet();
			this.totemNet.roleId = Global.Data.roleData.RoleID;
			this.totemNet.activatedTotemMap = new Map<number, NetMsg.TotemNetItem[]>();

			if (gameIns.gameState.roleData.activatedTotemList !== null) {
				gameIns.gameState.roleData.activatedTotemList.forEach((item) => {
					const toTemData = this.getToTemItemOfKey(item.ToTemID);
					if (toTemData === null) {
						Global.Log.Error("服务器数据中包含客户端表中不存在的图腾ID：" + item.ToTemID);
					} else {
						let netItemList: NetMsg.ITotemNetItem[] = this.totemNet.activatedTotemMap.get(toTemData.TotemType);
						if (netItemList === null || netItemList === undefined) {
							netItemList = new Array<NetMsg.ITotemNetItem>();
						}
						netItemList.push(item);
						this.totemNet.activatedTotemMap.set(toTemData.TotemType, netItemList);
					}
				});
			}
		}
	}
}