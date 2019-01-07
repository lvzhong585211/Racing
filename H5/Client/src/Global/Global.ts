/***************************************************************************************
 ****************** 全局对象，保存全局引用和一些类似静态的方法，对应Global *****************
 ***************************************************************************************/

///////////////////////////////////// 管理器全局引用（方便使用） //////////////////////////////////
/** GameInstance实例对象 */
let gameIns: GameMode.GameInstance;

/** UIManager实例对象 */
let uiMgr: MyUI.UIManager;

/** DataTableManager实例对象 */
let tableMgr: tables.DataTableManager;

/** AtlasManager实例对象 */
let atlasMgr: MyUI.AtlasManager;

/** 特效管理器 */
let particleMgr: Logic.ParticlesManager;

/** WindowManager实例对象 */
let windowMgr: MyUI.WindowManager;

/** 功能开启Manager */
let GongnengYugaoMgr = MyUI.GongnengYugaoMgr;

/** 多语言配置 */
let ConfigLoca: Loca.LanguageConfig;

////////////////////////////////// 一些全局属性和方法，对应Global //////////////////////////////////
namespace Global {
    /** 游戏全局数据 */
    export let Data: Data.GData;

    /** 登陆时间点 */
    export let g_nLoginTime: number = 0;

    /**日常任务的每日次数上限*/
    export let maxMuRiChangDailyNum = 10;

    /*讨伐任务的每日次数上限*/
    export let maxMuTaoFaDailyNum = 5;

    /** 追加属性的最大级别 */
    export const MaxZhuijiaLevel = 80;

    /** 重生的最大级别 */
    export const MaxZhuanshengLevel = 10;
    export const ConstPKNeedLevel = 60;

    /** 最大强化级别，最原始的最大值为15，后因systemparams属性增加，扩充到20 */
    export function MaxForgeLevel(): number {
        const forgeOpen = tableMgr.sysParamsTable.getParam("ForgeMaxOpen");
        if (String.IsNullOrWhiteSpace(forgeOpen)) {
            return 15;
        }
        const aOpen = forgeOpen.split(",");
        const nOpen = parseInt(aOpen[0]);
        return nOpen === 0 ? 15 : 20;
    }

    /** 通知客户端耐久度发生变化的值 */
    export const MaxNotifyEquipStrongValue = 500;

    /** 当前魔剑士类型 */
    export let currentMJSType: MJSSkillType = MJSSkillType.Strength_Sword;

    /** Tip显示摧毁按钮 */
    export let g_bIsTipsShowCuiHuiBtn = false;

    //#region ======== 守护雕像, 用来计算物品Tips属性值 ========

    /** 默认级数0 */
    export let guardStatueLevel = 0;
    /** 默认阶数1 */
    export let guardStatueGrade = 1;

    //#endregion ============================================

    /** 神器再造起始ID */
    export let ShenqiZaizaoSuit = 10;

    /**特殊任务处理配置 */
    export let specTaskGuide_Wings = -1; // 翅膀展示任务

    /** 切换地图时记录上次所在地图编号 */
    export let nLastMapCode = -1;

    /**
     * 判断角色是否在冻结中
     * @param me 判断的对象
     */
    export function IsDongJieSprite(me: Logic.Character<Logic.ActorState.CharacterBase>): boolean {
        if (null == me) {
            return true;
        }

        let roleData: NetMsg.RoleData = null;
        if (me.getType() === EActorType.LocalPlayer) {
            roleData = Global.Data.roleData;
        }
        else if (me.getType() === EActorType.NetPlayer) {
            roleData = Global.Data.OtherRoles.get(me.getState().RoleID);
        }

        if (null == roleData) {
            // if (roleData.DongJieStart <= 0) {
            //     return false;
            // }
            //  if (Global >= (RoleData.DongJieStart + (RoleData.DongJieSeconds. * 1000)))
            // {
            //     return false;
            // }
        }
        else {
            if (roleData.DongJieStart <= 0) {
                return false;
            }
        }
        return true;
    }

    //#region ================ 地图传送管理 ================

    /** 地图间传送需要的物品ID */
    export let MapTransGoodsID: number = 32000;

    /** 地图间传送需要的物品ID2 */
    export let MapTransGoodsID2: number = 32003;

    //#endregion ============================================

    /**
     * 自动寻路到达目标点后的偏移值
     * 老版本中原来的常量60,这里统一起来避免两个寻路距离不同导致的不必要走动
     */
    export let AutoFindRoadOffset60: number = 150;
}