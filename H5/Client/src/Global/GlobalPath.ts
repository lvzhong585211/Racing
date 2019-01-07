
namespace Global {
    //////////////////////// 视窗的宽高（同时也是设计分辨率） ////////////////////////
    /** view width */
    export const VIEW_WIDTH: number = 1280;
    /** view height */
    export const VIEW_HEIGHT: number = 720;

    //////////////////////// 定义一些全局的路径 ////////////////////////
    /** 基础资源路径 */
    export const resPath = "res/";
    /** ui图集所在路径 */
    export const uiAtlasPath = resPath + "atlas/ui/";
    /** 配置文件所在路径 */
    export const configPath = resPath + "config/";
    /** 数据表文件所在路径 */
    export const dataTablesPath = resPath + "datatables/";
    /** 地图所在的路径*/
    export const mapResPath = resPath + "LogicData/Map/";       // 对应原来项目的 MapConfig 目录
    export const levelResPath = resPath + "LogicData/Level/";   // 对应原来项目的 Map 目录
    // 角色资源所在的路径
    export const actorsPath = resPath + "actors/";
    export const equipResPath = resPath + "equips/";            // 装备资源目录
    export const skeletonResPath = actorsPath + "skeleton/";    // 骨架的资源目录
    export const decorationsPath = resPath + "decorations/";    // 装饰物(物资)的资源目录
    export const fontsPath = "ui/Fonts/";                       // 字体根目录

    /**
     * 获取数据表路径
     * @param sName 数据表名称
     * @param sSuffix 数据表后缀，默认值为“.json”
     */
    export function getDataTablePath(sName: string, sSuffix: string = ".json"): string {
        return `${dataTablesPath}${sName}${sSuffix}`;
    }

    /**
     * 获取ui图集路径
     * @param sName 图集名称
     * @param sSuffix 图集后缀，默认值为".atlas"
     */
    export function getAtlasPath(sName: string, sSuffix: string = ".atlas"): string {
        return `${uiAtlasPath}${sName}${sSuffix}`;
    }

    /**
     * 获取头像图片路径
     * @param nOccuID 职业
     * @param sPrefix 前缀，例如"btn"，默认不填写
     */
    export function getAvatarImgPath(eOccu: EnumOccupation, sPrefix = ""): string {
        if (sPrefix !== "") sPrefix += "_";
        return `ui/occupation/${sPrefix}avatar_${eOccu}.png`; // ui/Icons/occupation/avatar_0.png
    }

    /** 获取登录图集（login）图片路径 */
    export function getLoginAtlasImgPath(sImgName: string): string {
        return `ui/login/${sImgName}.png`;
    }

    /** 获取公用图集（common）图片路径 */
    export function getCommonAtlasImgPath(sImgName: string): string {
        return `ui/common/${sImgName}.png`;
    }

    /** 获取主界面图集（main）图片路径 */
    export function getMainAtlasImgPath(sImgName: string): string {
        return `ui/main/${sImgName}.png`;
    }

    /** 获取福利图集（welfare）图片路径 */
    export function getWelfareAtlasImgPath(sImgName: string, sSuffix: string = ".png"): string {
        return `ui/welfare/${sImgName}${sSuffix}`;
    }

    /**
     * 返回装备资源的url
     * @param equipResName 指定装备的资源名称.注: 不带文件后缀名
     */
    export function getEquipResPath(equipResName: string): string {
        return `${equipResPath}${equipResName}.lh`;
    }

    /**
     * 返回decorations(装饰物)的资源Url
     * @param decoResName 指定要获取路径的decorations
     */
    export function getDecorationResPath(decoResName: string): string {
        return `${decorationsPath}${decoResName}.lh`;
    }

    /**
     * 由骨架的名称返回骨架对应的资源路径.注:不带文件后缀名
     * @param sklResName 指定骨架的资源名称
     */
    export function getSkeletonResPath(sklResName: string): string {
        return `${skeletonResPath}${sklResName}.lh`;
    }

    /**
     * 获取NPC角色资源的路径
     * @param npcResName 指定要获取NPC角色路径的NPC资源名称
     */
    export function getNPCActorPath(npcResName: string): string {
        return `${actorsPath}NPC/${npcResName}.lh`;
    }

    /**
     * 获取Monster角色资源的路径
     * @param monsterResName 指定要获取Monster角色路径的Monster资源名称
     */
    export function getMonsterActorPath(monsterResName: string): string {
        return `${actorsPath}Monster/${monsterResName}.lh`;
    }
    /**
     * 获取坐骑资源的路径
     * @param rideResName 指定要获取ZuoQi路径的ZuoQi资源名称
     */
    export function getRideActorPath(rideResName: string): string {
        return `${actorsPath}ZuoQi/${rideResName}.lh`;
    }

    /**
     * 由地图资源名称返回对应的路径.注:不带文件后缀名
     * @param mapResName 指定要获取路径的地图的名称.
     */
    export function getMapPath(mapResName: string): string {
        return `${mapResPath}${mapResName}.ls`;
    }

    /**
     * 获取场景的图形及物理数据的路径
     * @param mapPicCode 指定要获取场景逻辑信息的场景ID
     * @param jsonName 指定要获取的信息文件的名称.注:不带后缀名
     * 如: LogicData/Map/1/obs.json
     */
    export function getMapJsonPath(mapPicCode: number, jsonName: string): string {
        return `${mapResPath}${mapPicCode}/${jsonName}.json`;
    }

    /**
     * 获取关卡逻辑数据文件的路径
     * @param mapCode 指定要获取关卡逻辑信息的关卡ID
     * @param jsonName 指定要获取的信息文件的名称.注:不带后缀名
     * 如: LogicData/Level/1/npcs.json
     */
    export function getLevelJsonPath(mapCode: number, jsonName: string): string {
        return `${levelResPath}${mapCode}/${jsonName}.json`;
    }

    /**
     * 获取动态加载的用作底板图片的路径
     * @param sImgName 图片名称
     * @param sSuffix 图片类型后缀
     */
    export function getPlateImagePath(sImgName: string, sSuffix: string = ".png"): string {
        return `ui/netImages/plate/${sImgName}${sSuffix}`; // res/netImages/plate/dailywelfare_online.png;
    }

    /**
     * 获取道具图标图片路径
     * @param sIconID 图标ID
     * @param sSuffix 图片类型后缀
     */
    export function getGoodsIconPath(sIconID: string, sSuffix: string = ".png"): string {
        return `ui/netImages/goods/${sIconID}${sSuffix}`; // res/netImages/goods/1000.png;
    }

    /**
     * 获取技能图标图片路径
     * @param nIconID 图标ID
     * @param sSuffix 图片类型后缀
     */
    export function getSkillIconPath(nIconID: number, sSuffix: string = ".png"): string {
        return `ui/netImages/skills/${nIconID}${sSuffix}`; // res/netImages/skills/10000.png;
    }

    /**
     * 获取主界面雷达图中的小地图图片资源路径
     * @param nPicID 图片ID
     * @param sSuffix 图片类型后缀
     */
    export function getMiniMapImagePath(nPicID: number, sSuffix: string = ".png"): string {
        return `ui/netImages/miniMap/${nPicID}${sSuffix}`; // res/netImages/miniMap/1.png;
    }

    /**
     * 获取世界地图块图片地址
     * @param sImgName 图片名称
     * @param sSuffix 图片类型后缀
     */
    export function getWorldMapPieceImagePath(sImgName: string, sSuffix: string = ".png"): string {
        return `ui/netImages/map/${sImgName}${sSuffix}`;
    }

    /**
     * 获取功能开启提示（funOpenTiShi）图片路径
     * @param sImgName 图片名称
     * @param sSuffix 图片类型后缀
     */
    export function getFunOpenTiShiImagePath(sImgName: string, sSuffix: string = ".png"): string {
        return `ui/netImages/funOpenTiShi/${sImgName}${sSuffix}`;
    }
    /**
     * 获取副利活动里的（welfare）图片路径
     * @param sImgName 图片名称
     * @param sSuffix 图片类型后缀
     */
    export function getWelfareImagePath(sImgName: string, sSuffix: string = ".png"): string {
        return `ui/netImages/welfare/${sImgName}${sSuffix}`;
    }

    /**
     * 获取功能操作图片路径
     * @param sImgName 图片名称
     */
    export function getOperationImagePath(sImgName: string): string {
        return `ui/netImages/operation/${sImgName}`;
    }

    /**
     * 获取副本活动图片路径
     * @param sImgName 图片名称
     */
    export function getFuBenActivityImagePath(sImgName: string, sSuffix: string = ".png"): string {
        return `ui/netImages/activity/${sImgName}${sSuffix}`;
    }

    /**
     * 获取图腾图片路径
     * @param sImgName 图片名称
     */
    export function getTotemImagePath(sImgName: string, sSuffix: string = ".png"): string {
        return `ui/netImages/totem/${sImgName}${sSuffix}`;
    }

    /**
     * 获取对应Actor类型的对象在地图上显示点图片名称
     */
    export function getMapPointImgName(value: EActorType): string {
        switch (value) {
            case EActorType.Invalid:
                return "map_point_line";
            case EActorType.NPC:
                return "map_point_npc";
            case EActorType.Monster:
                return "map_point_monster";
            case EActorType.NetPlayer:
                return "map_point_member";
            case EActorType.Teleport:
                return "map_point_teleport";
        }
        return null;
    }

    /**
     * 获取道具品质框图片路径
     * @param eQuality 品质枚举
     * @param bMonsterSoul 是否怪物精魄
     */
    export function getGoodsQualityPath(nQuality: GoodsQuality, bMonsterSoul: boolean = false): string {
        let sImgName = "icon_quality_bai";
        if (bMonsterSoul) {
            sImgName = "icon_quality_monstersoul_bai";
            switch (nQuality) {
                case GoodsQuality.Green: sImgName = "icon_quality_monstersoul_lv"; break;
                case GoodsQuality.Blue: sImgName = "icon_quality_monstersoul_lan"; break;
                case GoodsQuality.Purple:
                case GoodsQuality.FlashPurple: sImgName = "icon_quality_monstersoul_zi"; break;
            }
        } else {
            switch (nQuality) {
                case GoodsQuality.Green: sImgName = "icon_quality_lv"; break;
                case GoodsQuality.Blue: sImgName = "icon_quality_lan"; break;
                case GoodsQuality.Purple:
                case GoodsQuality.FlashPurple: sImgName = "icon_quality_zi"; break;
            }
        }
        return getCommonAtlasImgPath(sImgName);
    }

    /**
	 * 获取货币类型图标路径
	 * @param type 货币类型
	 */
    export function getMoneyIconPath(type: MoneyTypes) {
        switch (type) {
            case MoneyTypes.TongQian: return getAwardIconPath(AwardsTypes.BindJinBi);
            case MoneyTypes.YinLiang: return getAwardIconPath(AwardsTypes.JinBi);
            case MoneyTypes.JingYuanZhi: return getAwardIconPath(AwardsTypes.MoJing);
            case MoneyTypes.YuanBao: return getAwardIconPath(AwardsTypes.ZuanShi);
            case MoneyTypes.BindYuanBao: return getAwardIconPath(AwardsTypes.BindZuanShi);
            case MoneyTypes.BangGong: return getAwardIconPath(AwardsTypes.BangGong);
            case MoneyTypes.QiFuJiFen: return getAwardIconPath(AwardsTypes.QiFuJiFen);
        }
        return null;
    }

    /**
	 * 获取奖励类型图标路径
	 * @param type 奖励类型
	 */
    export function getAwardIconPath(type: AwardsTypes): string {
        let sImgName: string = null;
        switch (type) {
            case AwardsTypes.Exp: sImgName = "money_exp"; break;
            case AwardsTypes.JinBi: sImgName = "money_gold"; break;
            case AwardsTypes.BindJinBi: sImgName = "money_gold_binding"; break;
            case AwardsTypes.ZuanShi: sImgName = "money_diamond"; break;
            case AwardsTypes.BindZuanShi: sImgName = "money_diamond_binding"; break;
            case AwardsTypes.MoJing: sImgName = "money_mojing"; break;
            case AwardsTypes.ShengWang: sImgName = "money_shengwang"; break;
            case AwardsTypes.ZhanGong: sImgName = ""; break;
            case AwardsTypes.ChengJiu: sImgName = "money_chengjiu"; break;
            case AwardsTypes.XingHun: sImgName = "money_xinghun"; break;
            case AwardsTypes.FenMo: sImgName = ""; break;
            case AwardsTypes.CangBaoXueZuan: sImgName = ""; break;
            case AwardsTypes.CangBaoJiFen: sImgName = ""; break;
            case AwardsTypes.BangGong: sImgName = "money_gongxian"; break;
            case AwardsTypes.QiFuJiFen: sImgName = "money_jifen"; break;
        }

        if (String.IsNullOrWhiteSpace(sImgName)) {
            return null;
        } else {
            return getCommonAtlasImgPath(sImgName);
        }
    }
}