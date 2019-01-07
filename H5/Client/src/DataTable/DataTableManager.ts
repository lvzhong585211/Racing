namespace tables {
	import Loader = laya.net.Loader;
	import Log = Global.Log;

	export type LevelNpcInfoTable = DataTable<LevelNpcInfoVO, number>;			// 关卡上种植的NPC的数据表定义
	export type LevelMonsterInfoTable = DataTable<LevelMonstersInfoVO, null>;	// 关卡上种植的怪物的数据表定义	

	/**
	 * 数据表管理类 <br>
	 * 保存了引用的表可以直接通过引用访问，如任务表通过`tableMgr.tasksTable`访问 <br>
	 * 没有保存引用的表通过`tableMgr.getTable(T_System_Tasks)`访问 <br>
	 */
	export class DataTableManager implements Base.IPreloadResource {

		// ==== 各个数据表 ====
		public readonly languageTable = new LanguageTable();								// 多语言表
		public readonly sysParamsTable = new SystemParamsTable();							// 系统参数表
		public readonly tasksTable = new tables.SystemTasksTable();							// 任务表
		public readonly RandomNameTable = new DataTable<RandomNameVO, undefined>("name");	// 随机名字表
		public readonly goodsTable = new GoodsTable(); 										// 物品表
		public readonly npcsTable = new DataTable<NPCInfoVO, number>("npcs", "ID", 1, undefined, json2NPCInfoVO);	// NPC表
		public readonly levelSettingTable = new DataTable<SettingMapVO, number>("Settings", "Code", 1, SettingMapVO); // 地图相关的配置表
		public readonly levelConfigTable = new DataTable<LevelConfigInfo, number>("LevelConfig", "ID", 1, LevelConfigInfo);	        // 关卡相关的基础配置表
		public readonly monstersTable = new DataTable<MonsterVO, number>("Monsters", "ID", 1, undefined, json2MonsterInfoVO);  // Monster表
		public readonly teleportsTable = new DataTable<MapTeleports, number>("LevelTeleports", "MapID", 1);   		// 传送点表
		public readonly xiLianTypeTable = new DataTable<XiLianTypeVO, string>("XiLianType", "ID");	 				// 洗炼属性类型表
		public readonly xiLianShuXingTable = new DataTable<XiLianShuXingVO, string>("XiLianShuXing", "ID", ""); 	// 洗炼属性表
		public readonly petLevelUpTable = new DataTable<PetLevelUpVO, number>("PetLevelUp"); 		 				// 宠物升级信息表
		public readonly petSkillLevelUpTable = new DataTable<PetSkillLevelupVO, number>("PetSkillLevelup", "Level", 1);			// 宠物技能升级信息表
		public readonly systemOpenTable = new DataTable<SystemOpenVO, number>("SystemOpen", "ID", 1); 							// 功能开启表
		public readonly shiZhuangLevelUpTable = new DataTable<ShiZhuangLevelupVO, number>("ShiZhuangLevelup", "ID", 1);			// 时装升级表
		public readonly shiZhuangResTable = new DataTable<ShiZhuangResVO, number>("ShiZhuangRes", "ID", 1); 					// 时装资源信息表
		public readonly occuBaseAttrTable = new DataTable<OccupationBaseAttrVO, number>("Roles/OccupationBaseAttr", "occuID", 1); // 职业基础属性表
		public readonly qiangHuaTable = new DataTable<QiangHuaVO, number>("QiangHua", "ID", 1); 								// 强化表
		public readonly magicsTable = new DataTable<MagicInfoVO, number>("Magics", "ID", 1); 									// 技能表
		public readonly magicLevelsTable = new DataTable<MagicLevelVO, number>("MagicLevels"); 									// 技能升级表
		public readonly magicAttacksTable = new DataTable<MagicAttackInfoVO, number>("MagicAttacks", "ID", 1); 	 				// 技能攻击表
		public readonly levelUpTable = new DataTable<LevelUpVO, number>("LevelUp", "Level", 1);									// 升级信息表
		public readonly decorationTable = new DataTable<DecorationVO, number>("Decorations", "Code", 1);						// 特效表
		public readonly adventureGiftsTable = new DataTable<AdventureGiftsVO, number>("AdventureGifts", "Id", 1);	// 活动类型、产出表
		public readonly fuBenTabTable = new DataTable<FuBenTabVO, number>("FuBenTab", "TabId", 1);					// 活动副本Tab表
		public readonly funOpenTiShiTable = new DataTable<FunOpenTiShiVO, number>("FunOpenTiShi", "Id", 1);			// 功能开启提示表
		readonly guiZuTable = new DataTable<GuiZuVO, number>("GuiZu", "VipLevel", 1);								// Vip表
		readonly vipDailyAwardsTable = new DataTable<VipDailyAwardsVO, number>("VipDailyAwards", "AwardId", 1);		// Vip特权表
		readonly onlineRewardTable = new DataTable<OnlineRewardItemVO, null>("Gifts/LoongNewRoleGift"); 			// 在线奖励表
		readonly sevenDayLoginTable = new DataTable<SevenDayLoginVO, number>("SevenDayLogin", "Id", 1);				// 七日活动表
		readonly gradeRewardTable = new DataTable<GradeRewardItemVO, null>("Gifts/UpLevelGift"); 					// 等级奖励表
		readonly mingXiangTable = new DataTable<MingXiangVO, number>("MingXiang", "ID"); 							// 冥想经验表
		readonly firstChargeTable = new DataTable<FirstChargeVO, number>("FirstCharge", "Id"); 						// 首充表
		readonly systemOperationTable = new DataTable<SystemOperationVO, number>("SystemOperations", "ID", 1);		// 功能操作表
		readonly npcScriptTable = new DataTable<NPCScriptVO, number>("NPCScripts", "ID", 1);						// NPC执行脚本表
		readonly npcSaleTable = new DataTable<NPCSaleListVO, number>("NPCSaleList", "ID", 1);						// NPC商店表
		readonly extPropIndexsTable = new ExtPropIndexesTable(); 													// 人物属性表
		readonly dayChongZhiTable = new DataTable<DayChongZhiVO, number>("DayChongZhi", "Id"); 							// 每日充值表
		readonly leiJiChargeTable = new DataTable<LeiJiChongZhiVO, number>("LeiJiChongZhi", "Id"); 							// 累计充值表
		readonly leiJiConsumeTable = new DataTable<LeiJiXiaoFeiVO, number>("LeiJiXiaoFei", "Id"); 							// 累计消费表
		readonly dragonTotemTable = new DataTable<DragonTotemVO, number>("DragonTotem", "ID"); 							// 图腾数据位置表
		readonly dragonTotemTypeTable = new DataTable<DragonTotemTypeVO, number>("DragonTotemType", "ID"); 						// 图腾标签数据位置
		readonly totemMagicTable = new DataTable<TotemMagicVO, number>("TotemMagic", "ID"); 							// 图腾标签数据位置
		readonly duiHuanItemsTable = new DataTable<DuiHuanItemsVO, number>("DuiHuanItems", "ID"); 							// 商人兑换商品表
		readonly duiHuanTypeTable = new DataTable<DuiHuanTypeVO, number>("DuiHuanType", "ID"); 							// 商人商品类型
		readonly fuBenTable = new DataTable<FuBenVO, number>("FuBen", "ID"); 															// 副本
		readonly fuBenMapTable = new DataTable<FuBenMapVO, number>("FuBenMap", "MapCode"); 									// 副本地图
		readonly monsterGoodsListTable = new DataTable<MonsterGoodsListVO, number>("MonsterGoodsList", "ID"); 				// 怪物掉落表

		// ==== End ====		
		private levelNpcTablesDict = new Map<number, LevelNpcInfoTable>();			// 动态加载的关卡上Npc信息的数据表
		private levelMonstersTablesDict = new Map<number, LevelMonsterInfoTable>();	// 动态加载的关卡上怪物信息的数据表

		constructor() {
		}

		/**
		 * 获取需要预加载的表列表（Loading模块加载的表）
		 */
		public getPreloadResources(): LoadConfig[] {
			const aLoadCfgs: LoadConfig[] = [];

			// 把所有的表文件添加到预加载表里面
			DataTable.mAllTables.forEach((dataTable) => {
				aLoadCfgs.push({ url: Global.getDataTablePath(dataTable.mTableName), type: Loader.JSON });
			});

			return aLoadCfgs;
		}

		/**
		 * Loading模块加载完数据表后的处理
		 */
		public handleAfterResLoaded() {
			// 加载完成后把表对象数据填充一下			
			DataTable.mAllTables.forEach((dataTable) => {
				dataTable.loadTable();
			});

			// 表读取完后可以初始化多语言相关的配置
			ConfigLoca = new Loca.LanguageConfig();
		}

		/**
		 * 获取指定Id的关卡的NPC数据表
		 * @param levelId 指定要获取Npc表的关卡Id
		 * 注: 这个获取是有可能是异步的,因为数据表可能还没有加载
		 * 注: 此函数支持重入
		 */
		public async getLevelNpcTable(levelId: number): Promise<LevelNpcInfoTable> {
			let table = this.levelNpcTablesDict.get(levelId);
			if (table) {
				return table;
			}

			// 没找到缓冲的,开始加载吧
			const tablePath = Global.getLevelJsonPath(levelId, "npcs");
			await Global.Utils.LoadRes(tablePath);	// 等待数据表加载完成

			// 重新检测一下数据表是否已经被别人加载完成了
			table = this.levelNpcTablesDict.get(levelId);
			if (table) {
				return table;
			}

			table = new DataTable<LevelNpcInfoVO, number>("npcs", "Code", 1);
			table.loadTable(tablePath);
			this.levelNpcTablesDict.set(levelId, table);
			return table;
		}

		/**
		 * 获取指定Id的关卡的怪物数据表
		 * @param levelId 指定要获取Monster表的关卡Id
		 * 注: 这个获取是有可能是异步的,因为数据表可能还没有加载
		 * 注: 此函数支持重入
		 */
		public async getLevelMonstersTable(levelId: number): Promise<LevelMonsterInfoTable> {
			let table = this.levelMonstersTablesDict.get(levelId);
			if (table) {
				return table;
			}

			// 没找到缓冲的,开始加载吧
			const tablePath = Global.getLevelJsonPath(levelId, "Monsters");
			await Global.Utils.LoadRes(tablePath);	// 等待数据表加载完成

			// 重新检测一下数据表是否已经被别人加载完成了
			table = this.levelMonstersTablesDict.get(levelId);
			if (table) {
				return table;
			}

			table = new DataTable<LevelMonstersInfoVO, null>("Monsters");
			table.loadTable(tablePath);
			this.levelMonstersTablesDict.set(levelId, table);
			return table;
		}
	}
}