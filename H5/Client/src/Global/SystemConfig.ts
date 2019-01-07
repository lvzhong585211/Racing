/**
 * 资源加载配置接口类
 */
interface LoadConfig {
    url: string; // 资源地址
    type: string; // 资源类型
}

/**
 * 服务器开放状态
 */
enum EServerState {
    /** 正常开放状态 */
    Open = 0,
    /** 维护中 */
    Close = 1
}

/**
 * 封装服务器的信息
 */
class GameServerInfo {
    /** 服务器ID */
    id: number;
    /** 服务器名字 */
    name: string;
    /** IP地址 */
    url: string;
    /** 服务器状态 */
    state: EServerState;
}

/**
 * 定义一些系统相关的配置项
 */
namespace SystemConfig {
    // ----- 系统相关配置
    export const development: boolean = true;   // 是否是开发版
    export const npcHeadEffectOffset = 2.5;     // NPC头顶特效的偏移量(米)

    export const autoFindRoadOffset100 = 150;   // 原来的60离NPC太近,改大一些

    // ----- 图形(性能)相关配置
    export const graphic_AnimationCache: boolean = false; // 是否开启动作的缓冲. 开启后消耗内存换取性能,且动作效果会下降一些!注:本地玩家的动作一定是没有开启缓冲的,为了效果好看!

    // ----- 调试相关配置
    export const debugShowInnerId: boolean = false;      // 是否显示调试用的InnerId
    export const debugShowPlayerAxis: boolean = false;   // 是否显示角色脚底的坐标轴
    export const debugShowMonsterAxis: boolean = false;	 // 是否显示怪物脚底的坐标轴
    export const debugShowActor3DAxis: boolean = true;  // 显示3D模型的坐标轴
    export const debugBTDebugger: boolean = false;       // 是否开启行为树的调试器. 注:通过在控制台(console)输入 FBT.Debugger.debug( btInstance /*要调试的行为树的实例*/ ), 执行,来实现对某个行为树实例的调试显示
    export const keyGMIsOpen: boolean = true;      // 快捷键GM命令是否开启
}

/**
 * 战力计算表配置信息<br>
 * CombatForceInfo.xml表中的配置信息<br>
 * 由于表中数据较少，所以直接转为对象写到这里
 */
class CombatForceInfo {
    static readonly ID = 1;
    static readonly LifeV = 2.5;
    static readonly MagicV = 100000000;
    static readonly MinDefenseV = 1;
    static readonly MaxDefenseV = 1;
    static readonly MinMDefenseV = 1;
    static readonly MaxMDefenseV = 1;
    static readonly MinAttackV = 0.5;
    static readonly MaxAttackV = 0.5;
    static readonly MinMAttackV = 0.5;
    static readonly MaxMAttackV = 0.5;
    static readonly HitV = 5;
    static readonly Dodge = 5;
    static readonly AddAttackInjure = 0.5;
    static readonly DecreaseInjureValue = 0.5;
    static readonly LifeSteal = 0.25;
    static readonly AddAttack = 0.25;
    static readonly AddDefense = 0.5;
    static readonly FireAttack = 0.5;
    static readonly WaterAttack = 0.5;
    static readonly LightningAttack = 0.5;
    static readonly SoilAttack = 0.5;
    static readonly IceAttack = 0.5;
    static readonly WindAttack = 0.5;
}