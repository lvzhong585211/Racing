var Global;
(function (Global) {
    //////////////////////// 视窗的宽高（同时也是设计分辨率） ////////////////////////
    /** view width */
    Global.VIEW_WIDTH = 1280;
    /** view height */
    Global.VIEW_HEIGHT = 720;
    //////////////////////// 定义一些全局的路径 ////////////////////////
    /** 基础资源路径 */
    Global.resPath = "res/";
    /** ui图集所在路径 */
    Global.uiAtlasPath = Global.resPath + "atlas/ui/";
    /** 配置文件所在路径 */
    Global.configPath = Global.resPath + "config/";
    /** 数据表文件所在路径 */
    Global.dataTablesPath = Global.resPath + "datatables/";
    /** 地图所在的路径*/
    Global.mapResPath = Global.resPath + "LogicData/Map/"; // 对应原来项目的 MapConfig 目录
    Global.levelResPath = Global.resPath + "LogicData/Level/"; // 对应原来项目的 Map 目录
    // 角色资源所在的路径
    Global.actorsPath = Global.resPath + "actors/";
    Global.equipResPath = Global.resPath + "equips/"; // 装备资源目录
    Global.skeletonResPath = Global.actorsPath + "skeleton/"; // 骨架的资源目录
    Global.decorationsPath = Global.resPath + "decorations/"; // 装饰物(物资)的资源目录
    Global.fontsPath = "ui/Fonts/"; // 字体根目录
    /**
     * 获取数据表路径
     * @param sName 数据表名称
     * @param sSuffix 数据表后缀，默认值为“.json”
     */
    function getDataTablePath(sName, sSuffix = ".json") {
        return `${Global.dataTablesPath}${sName}${sSuffix}`;
    }
    Global.getDataTablePath = getDataTablePath;
    /**
     * 获取ui图集路径
     * @param sName 图集名称
     * @param sSuffix 图集后缀，默认值为".atlas"
     */
    function getAtlasPath(sName, sSuffix = ".atlas") {
        return `${Global.uiAtlasPath}${sName}${sSuffix}`;
    }
    Global.getAtlasPath = getAtlasPath;
    /**
     * 获取头像图片路径
     * @param nOccuID 职业
     * @param sPrefix 前缀，例如"btn"，默认不填写
     */
    function getAvatarImgPath(eOccu, sPrefix = "") {
        if (sPrefix !== "")
            sPrefix += "_";
        return `ui/occupation/${sPrefix}avatar_${eOccu}.png`; // ui/Icons/occupation/avatar_0.png
    }
    Global.getAvatarImgPath = getAvatarImgPath;
    /** 获取登录图集（login）图片路径 */
    function getLoginAtlasImgPath(sImgName) {
        return `ui/login/${sImgName}.png`;
    }
    Global.getLoginAtlasImgPath = getLoginAtlasImgPath;
    /** 获取公用图集（common）图片路径 */
    function getCommonAtlasImgPath(sImgName) {
        return `ui/common/${sImgName}.png`;
    }
    Global.getCommonAtlasImgPath = getCommonAtlasImgPath;
    /** 获取主界面图集（main）图片路径 */
    function getMainAtlasImgPath(sImgName) {
        return `ui/main/${sImgName}.png`;
    }
    Global.getMainAtlasImgPath = getMainAtlasImgPath;
    /** 获取福利图集（welfare）图片路径 */
    function getWelfareAtlasImgPath(sImgName, sSuffix = ".png") {
        return `ui/welfare/${sImgName}${sSuffix}`;
    }
    Global.getWelfareAtlasImgPath = getWelfareAtlasImgPath;
    /**
     * 返回装备资源的url
     * @param equipResName 指定装备的资源名称.注: 不带文件后缀名
     */
    function getEquipResPath(equipResName) {
        return `${Global.equipResPath}${equipResName}.lh`;
    }
    Global.getEquipResPath = getEquipResPath;
    /**
     * 返回decorations(装饰物)的资源Url
     * @param decoResName 指定要获取路径的decorations
     */
    function getDecorationResPath(decoResName) {
        return `${Global.decorationsPath}${decoResName}.lh`;
    }
    Global.getDecorationResPath = getDecorationResPath;
    /**
     * 由骨架的名称返回骨架对应的资源路径.注:不带文件后缀名
     * @param sklResName 指定骨架的资源名称
     */
    function getSkeletonResPath(sklResName) {
        return `${Global.skeletonResPath}${sklResName}.lh`;
    }
    Global.getSkeletonResPath = getSkeletonResPath;
    /**
     * 获取NPC角色资源的路径
     * @param npcResName 指定要获取NPC角色路径的NPC资源名称
     */
    function getNPCActorPath(npcResName) {
        return `${Global.actorsPath}NPC/${npcResName}.lh`;
    }
    Global.getNPCActorPath = getNPCActorPath;
    /**
     * 获取Monster角色资源的路径
     * @param monsterResName 指定要获取Monster角色路径的Monster资源名称
     */
    function getMonsterActorPath(monsterResName) {
        return `${Global.actorsPath}Monster/${monsterResName}.lh`;
    }
    Global.getMonsterActorPath = getMonsterActorPath;
    /**
     * 由地图资源名称返回对应的路径.注:不带文件后缀名
     * @param mapResName 指定要获取路径的地图的名称.
     */
    function getMapPath(mapResName) {
        return `${Global.mapResPath}${mapResName}.ls`;
    }
    Global.getMapPath = getMapPath;
    /**
     * 获取场景的图形及物理数据的路径
     * @param mapPicCode 指定要获取场景逻辑信息的场景ID
     * @param jsonName 指定要获取的信息文件的名称.注:不带后缀名
     * 如: LogicData/Map/1/obs.json
     */
    function getMapJsonPath(mapPicCode, jsonName) {
        return `${Global.mapResPath}${mapPicCode}/${jsonName}.json`;
    }
    Global.getMapJsonPath = getMapJsonPath;
    /**
     * 获取关卡逻辑数据文件的路径
     * @param mapCode 指定要获取关卡逻辑信息的关卡ID
     * @param jsonName 指定要获取的信息文件的名称.注:不带后缀名
     * 如: LogicData/Level/1/npcs.json
     */
    function getLevelJsonPath(mapCode, jsonName) {
        return `${Global.levelResPath}${mapCode}/${jsonName}.json`;
    }
    Global.getLevelJsonPath = getLevelJsonPath;
    /**
     * 获取动态加载的用作底板图片的路径
     * @param sImgName 图片名称
     * @param sSuffix 图片类型后缀
     */
    function getPlateImagePath(sImgName, sSuffix = ".png") {
        return `ui/netImages/plate/${sImgName}${sSuffix}`; // res/netImages/plate/dailywelfare_online.png;
    }
    Global.getPlateImagePath = getPlateImagePath;
    /**
     * 获取道具图标图片路径
     * @param sIconID 图标ID
     * @param sSuffix 图片类型后缀
     */
    function getGoodsIconPath(sIconID, sSuffix = ".png") {
        return `ui/netImages/goods/${sIconID}${sSuffix}`; // res/netImages/goods/1000.png;
    }
    Global.getGoodsIconPath = getGoodsIconPath;
    /**
     * 获取技能图标图片路径
     * @param nIconID 图标ID
     * @param sSuffix 图片类型后缀
     */
    function getSkillIconPath(nIconID, sSuffix = ".png") {
        return `ui/netImages/skills/${nIconID}${sSuffix}`; // res/netImages/skills/10000.png;
    }
    Global.getSkillIconPath = getSkillIconPath;
    /**
     * 获取主界面雷达图中的小地图图片资源路径
     * @param nPicID 图片ID
     * @param sSuffix 图片类型后缀
     */
    function getMiniMapImagePath(nPicID, sSuffix = ".png") {
        return `ui/netImages/miniMap/${nPicID}${sSuffix}`; // res/netImages/miniMap/1.png;
    }
    Global.getMiniMapImagePath = getMiniMapImagePath;
    /**
     * 获取世界地图块图片地址
     * @param sImgName 图片名称
     * @param sSuffix 图片类型后缀
     */
    function getWorldMapPieceImagePath(sImgName, sSuffix = ".png") {
        return `ui/netImages/map/${sImgName}${sSuffix}`;
    }
    Global.getWorldMapPieceImagePath = getWorldMapPieceImagePath;
    /**
     * 获取功能开启提示（funOpenTiShi）图片路径
     * @param sImgName 图片名称
     * @param sSuffix 图片类型后缀
     */
    function getFunOpenTiShiImagePath(sImgName, sSuffix = ".png") {
        return `ui/netImages/funOpenTiShi/${sImgName}${sSuffix}`;
    }
    Global.getFunOpenTiShiImagePath = getFunOpenTiShiImagePath;
    /**
     * 获取副利活动里的（welfare）图片路径
     * @param sImgName 图片名称
     * @param sSuffix 图片类型后缀
     */
    function getWelfareImagePath(sImgName, sSuffix = ".png") {
        return `ui/netImages/welfare/${sImgName}${sSuffix}`;
    }
    Global.getWelfareImagePath = getWelfareImagePath;
    /**
     * 获取对应Actor类型的对象在地图上显示点图片名称
     */
    function getMapPointImgName(value) {
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
    Global.getMapPointImgName = getMapPointImgName;
    /**
     * 获取道具品质框图片路径
     * @param eQuality 品质枚举
     * @param bMonsterSoul 是否怪物精魄
     */
    function getGoodsQualityPath(nQuality, bMonsterSoul = false) {
        let sImgName = "icon_quality_bai";
        if (bMonsterSoul) {
            sImgName = "icon_quality_monstersoul_bai";
            switch (nQuality) {
                case GoodsQuality.Green:
                    sImgName = "icon_quality_monstersoul_lv";
                    break;
                case GoodsQuality.Blue:
                    sImgName = "icon_quality_monstersoul_lan";
                    break;
                case GoodsQuality.Purple:
                case GoodsQuality.FlashPurple:
                    sImgName = "icon_quality_monstersoul_zi";
                    break;
            }
        }
        else {
            switch (nQuality) {
                case GoodsQuality.Green:
                    sImgName = "icon_quality_lv";
                    break;
                case GoodsQuality.Blue:
                    sImgName = "icon_quality_lan";
                    break;
                case GoodsQuality.Purple:
                case GoodsQuality.FlashPurple:
                    sImgName = "icon_quality_zi";
                    break;
            }
        }
        return getCommonAtlasImgPath(sImgName);
    }
    Global.getGoodsQualityPath = getGoodsQualityPath;
    /**
     * 获取奖励名称
     * @param awardType 奖励类型
     * @param nameType 显示名称类型 0=文字、1=图标
     */
    function getMoneyImagePath(eType) {
        let sImgName = null;
        switch (eType) {
            case AwardsTypes.Exp:
                sImgName = "money_exp";
                break;
            case AwardsTypes.JinBi:
                sImgName = "money_gold";
                break;
            case AwardsTypes.BindJinBi:
                sImgName = "money_gold_binding";
                break;
            case AwardsTypes.ZuanShi:
                sImgName = "money_diamond";
                break;
            case AwardsTypes.BindZuanShi:
                sImgName = "money_diamond_binding";
                break;
            case AwardsTypes.MoJing:
                sImgName = "money_mojing";
                break;
            case AwardsTypes.ShengWang:
                sImgName = "money_shengwang";
                break;
            case AwardsTypes.ZhanGong:
                sImgName = "";
                break;
            case AwardsTypes.ChengJiu:
                sImgName = "money_chengjiu";
                break;
            case AwardsTypes.XingHun:
                sImgName = "money_xinghun";
                break;
            case AwardsTypes.FenMo:
                sImgName = "";
                break;
            case AwardsTypes.CangBaoXueZuan:
                sImgName = "";
                break;
            case AwardsTypes.CangBaoJiFen:
                sImgName = "";
                break;
        }
        if (Global.String.IsNullOrWhiteSpace(sImgName)) {
            return null;
        }
        else {
            return getCommonAtlasImgPath(sImgName);
        }
    }
    Global.getMoneyImagePath = getMoneyImagePath;
})(Global || (Global = {}));
//# sourceMappingURL=GlobalPath.js.map