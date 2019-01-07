/**
 * 服务器开放状态
 */
var EServerState;
(function (EServerState) {
    /** 正常开放状态 */
    EServerState[EServerState["Open"] = 0] = "Open";
    /** 维护中 */
    EServerState[EServerState["Close"] = 1] = "Close";
})(EServerState || (EServerState = {}));
/**
 * 封装服务器的信息
 */
class GameServerInfo {
}
/**
 * 定义一些系统相关的配置项
 */
var SystemConfig;
(function (SystemConfig) {
    // ----- 系统相关配置
    SystemConfig.development = true; // 是否是开发版
    SystemConfig.npcHeadEffectOffset = 2.5; // NPC头顶特效的偏移量(米)
    SystemConfig.autoFindRoadOffset100 = 150; // 原来的60离NPC太近,改大一些
    // ----- 图形(性能)相关配置
    SystemConfig.graphic_AnimationCache = false; // 是否开启动作的缓冲. 开启后消耗内存换取性能,且动作效果会下降一些!注:本地玩家的动作一定是没有开启缓冲的,为了效果好看!
    // ----- 调试相关配置
    SystemConfig.debugShowInnerId = false; // 是否显示调试用的InnerId
    SystemConfig.debugShowPlayerAxis = false; // 是否显示角色脚底的坐标轴
    SystemConfig.debugShowMonsterAxis = false; // 是否显示怪物脚底的坐标轴
    SystemConfig.debugShowActor3DAxis = true; // 显示3D模型的坐标轴
    SystemConfig.debugBTDebugger = false; // 是否开启行为树的调试器. 注:通过在控制台(console)输入 FBT.Debugger.debug( btInstance /*要调试的行为树的实例*/ ), 执行,来实现对某个行为树实例的调试显示
})(SystemConfig || (SystemConfig = {}));
/**
 * 战力计算表配置信息<br>
 * CombatForceInfo.xml表中的配置信息<br>
 * 由于表中数据较少，所以直接转为对象写到这里
 */
class CombatForceInfo {
}
CombatForceInfo.ID = 1;
CombatForceInfo.LifeV = 2.5;
CombatForceInfo.MagicV = 100000000;
CombatForceInfo.MinDefenseV = 1;
CombatForceInfo.MaxDefenseV = 1;
CombatForceInfo.MinMDefenseV = 1;
CombatForceInfo.MaxMDefenseV = 1;
CombatForceInfo.MinAttackV = 0.5;
CombatForceInfo.MaxAttackV = 0.5;
CombatForceInfo.MinMAttackV = 0.5;
CombatForceInfo.MaxMAttackV = 0.5;
CombatForceInfo.HitV = 5;
CombatForceInfo.Dodge = 5;
CombatForceInfo.AddAttackInjure = 0.5;
CombatForceInfo.DecreaseInjureValue = 0.5;
CombatForceInfo.LifeSteal = 0.25;
CombatForceInfo.AddAttack = 0.25;
CombatForceInfo.AddDefense = 0.5;
CombatForceInfo.FireAttack = 0.5;
CombatForceInfo.WaterAttack = 0.5;
CombatForceInfo.LightningAttack = 0.5;
CombatForceInfo.SoilAttack = 0.5;
CombatForceInfo.IceAttack = 0.5;
CombatForceInfo.WindAttack = 0.5;
//# sourceMappingURL=SystemConfig.js.map