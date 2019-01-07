var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var tables;
(function (tables) {
    var Loader = laya.net.Loader;
    /**
     * 数据表管理类 <br>
     * 保存了引用的表可以直接通过引用访问，如任务表通过`tableMgr.tasksTable`访问 <br>
     * 没有保存引用的表通过`tableMgr.getTable(T_System_Tasks)`访问 <br>
     */
    class DataTableManager {
        constructor() {
            // ==== 各个数据表 ====
            this.languageTable = new tables.LanguageTable(); // 多语言表
            this.sysParamsTable = new tables.SystemParamsTable(); // 系统参数表
            this.tasksTable = new tables.SystemTasksTable(); // 任务表
            this.RandomNameTable = new tables.DataTable("name"); // 随机名字表
            this.goodsTable = new tables.GoodsTable(); // 物品表
            this.npcsTable = new tables.DataTable("npcs", "ID", 1, undefined, tables.json2NPCInfoVO); // NPC表
            this.levelSettingTable = new tables.DataTable("Settings", "Code", 1, tables.SettingMapVO); // 地图相关的配置表
            this.levelConfigTable = new tables.DataTable("LevelConfig", "ID", 1, tables.LevelConfigInfo); // 关卡相关的基础配置表
            this.monstersTable = new tables.DataTable("Monsters", "ID", 1, undefined, tables.json2MonsterInfoVO); // Monster表
            this.teleportsTable = new tables.DataTable("LevelTeleports", "MapID", 1); // 传送点表
            this.xiLianTypeTable = new tables.DataTable("XiLianType", "ID"); // 洗炼属性类型表
            this.xiLianShuXingTable = new tables.DataTable("XiLianShuXing", "ID", ""); // 洗炼属性表
            this.petLevelUpTable = new tables.DataTable("PetLevelUp"); // 宠物升级信息表
            this.petSkillLevelUpTable = new tables.DataTable("PetSkillLevelup", "Level", 1); // 宠物技能升级信息表
            this.systemOpenTable = new tables.DataTable("SystemOpen", "ID", 1); // 功能开启表
            this.shiZhuangLevelUpTable = new tables.DataTable("ShiZhuangLevelup", "ID", 1); // 时装升级表
            this.shiZhuangResTable = new tables.DataTable("ShiZhuangRes", "ID", 1); // 时装资源信息表
            this.occuBaseAttrTable = new tables.DataTable("Roles/OccupationBaseAttr", "occuID", 1); // 职业基础属性表
            this.qiangHuaTable = new tables.DataTable("QiangHua", "ID", 1); // 强化表
            this.magicsTable = new tables.DataTable("Magics", "ID", 1); // 技能表
            this.magicLevelsTable = new tables.DataTable("MagicLevels"); // 技能升级表
            this.magicAttacksTable = new tables.DataTable("MagicAttacks", "ID", 1); // 技能攻击表
            this.levelUpTable = new tables.DataTable("LevelUp", "Level", 1); // 升级信息表
            this.decorationTable = new tables.DataTable("Decorations", "Code", 1); // 特效表
            this.adventureGiftsTable = new tables.DataTable("AdventureGifts", "Id", 1); // 活动类型、产出表
            this.fuBenTabTable = new tables.DataTable("FuBenTab", "TabId", 1); // 活动副本Tab表
            this.funOpenTiShiTable = new tables.DataTable("FunOpenTiShi", "Id", 1); // 功能开启提示表
            this.guiZuTable = new tables.DataTable("GuiZu", "VipLevel", 1); // Vip表
            this.vipDailyAwardsTable = new tables.DataTable("VipDailyAwards", "AwardId", 1); // Vip特权表
            this.onlineRewardTable = new tables.DataTable("Gifts/LoongNewRoleGift"); // 在线奖励表
            this.sevenDayLoginTable = new tables.DataTable("SevenDayLogin", "Id", 1); // 七日活动表
            this.gradeRewardTable = new tables.DataTable("Gifts/UpLevelGift"); // 等级奖励表
            this.mingXiangTable = new tables.DataTable("MingXiang", "ID"); // 冥想经验表
            // ==== End ====		
            this.levelNpcTablesDict = new Map(); // 动态加载的关卡上Npc信息的数据表
            this.levelMonstersTablesDict = new Map(); // 动态加载的关卡上怪物信息的数据表
        }
        /**
         * 获取需要预加载的表列表（Loading模块加载的表）
         */
        getPreloadResources() {
            const aLoadCfgs = [];
            // 把所有的表文件添加到预加载表里面
            tables.DataTable.mAllTables.forEach((dataTable) => {
                aLoadCfgs.push({ url: Global.getDataTablePath(dataTable.mTableName), type: Loader.JSON });
            });
            return aLoadCfgs;
        }
        /**
         * Loading模块加载完数据表后的处理
         */
        handleAfterResLoaded() {
            // 加载完成后把表对象数据填充一下			
            tables.DataTable.mAllTables.forEach((dataTable) => {
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
        getLevelNpcTable(levelId) {
            return __awaiter(this, void 0, void 0, function* () {
                let table = this.levelNpcTablesDict.get(levelId);
                if (table) {
                    return table;
                }
                // 没找到缓冲的,开始加载吧
                const tablePath = Global.getLevelJsonPath(levelId, "npcs");
                yield Global.Utils.LoadRes(tablePath); // 等待数据表加载完成
                // 重新检测一下数据表是否已经被别人加载完成了
                table = this.levelNpcTablesDict.get(levelId);
                if (table) {
                    return table;
                }
                table = new tables.DataTable("npcs", "Code", 1);
                table.loadTable(tablePath);
                this.levelNpcTablesDict.set(levelId, table);
                return table;
            });
        }
        /**
         * 获取指定Id的关卡的怪物数据表
         * @param levelId 指定要获取Monster表的关卡Id
         * 注: 这个获取是有可能是异步的,因为数据表可能还没有加载
         * 注: 此函数支持重入
         */
        getLevelMonstersTable(levelId) {
            return __awaiter(this, void 0, void 0, function* () {
                let table = this.levelMonstersTablesDict.get(levelId);
                if (table) {
                    return table;
                }
                // 没找到缓冲的,开始加载吧
                const tablePath = Global.getLevelJsonPath(levelId, "Monsters");
                yield Global.Utils.LoadRes(tablePath); // 等待数据表加载完成
                // 重新检测一下数据表是否已经被别人加载完成了
                table = this.levelMonstersTablesDict.get(levelId);
                if (table) {
                    return table;
                }
                table = new tables.DataTable("Monsters");
                table.loadTable(tablePath);
                this.levelMonstersTablesDict.set(levelId, table);
                return table;
            });
        }
    }
    tables.DataTableManager = DataTableManager;
})(tables || (tables = {}));
//# sourceMappingURL=DataTableManager.js.map