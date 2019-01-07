/**
 * 存放和地图（关卡）相关的全局函数
 */
var Global;
(function (Global) {
    /**
     * 获取角色所在地图的的场景UI类型
     */
    function GetMapSceneUIClass() {
        const nMapCode = gameIns.gameState.roleData.MapCode;
        return TableUtils.getMapSceneUIClass(nMapCode);
    }
    Global.GetMapSceneUIClass = GetMapSceneUIClass;
    Global.mapCode_YanhuangZhanchang = 0;
    /**
     * 当前是否在阵营战地图中
     * @param nLevelID 关卡ID
     */
    function isBattleMap(nLevelID) {
        if (Global.mapCode_YanhuangZhanchang === 0) {
            Global.mapCode_YanhuangZhanchang = tableMgr.sysParamsTable.getParamInt("BattleMapCode");
        }
        if (nLevelID === Global.mapCode_YanhuangZhanchang) {
            return true;
        }
        else {
            if (Global.IsInKuafuHuodongYongZheZhanChang(nLevelID)) {
                return true;
            }
            if (Global.IsInKuaFuHuoDongWangZhe(nLevelID)) {
                return true;
            }
        }
        return false;
    }
    Global.isBattleMap = isBattleMap;
    /**
     * 是否在决死战场
     * @param nLevelID 关卡ID
     */
    function IsInKuafuHuodongYongZheZhanChang(nLevelID) {
        if ((nLevelID >= 80000 && nLevelID <= 80006)) {
            return true;
        }
        return false;
    }
    Global.IsInKuafuHuodongYongZheZhanChang = IsInKuafuHuodongYongZheZhanChang;
    /**
     * 是否在跨服活动-独尊战场
     * @param nLevelID 关卡ID
     */
    function IsInKuaFuHuoDongWangZhe(nLevelID) {
        if ((nLevelID >= 81000 && nLevelID <= 81006)) {
            return true;
        }
        return false;
    }
    Global.IsInKuaFuHuoDongWangZhe = IsInKuaFuHuoDongWangZhe;
    /**
     * 获取是否在城战地图中
     * @param nLevelID 关卡ID
     */
    function isLuoLanChengZhanMapCode(nLevelID) {
        // TODO: 读取城战地图配置
        return false;
    }
    Global.isLuoLanChengZhanMapCode = isLuoLanChengZhanMapCode;
    /**
     * 判断是否是跨服活动的场景UI
     * @param sceneUI 指定要判定的场景UI类型
     */
    function isKuaFuHuoDongMapSceneUIClass(sceneUI) {
        let isKuafuHuodong = false;
        if (sceneUI === SceneUIClasses.HuanYingSiYuan
            || sceneUI === SceneUIClasses.TianTi
            || sceneUI === SceneUIClasses.YongZheZhanChang
            || sceneUI === SceneUIClasses.KuaFuWangZhe
            || sceneUI === SceneUIClasses.ElementWar
            || sceneUI === SceneUIClasses.MoRiJudge
            || sceneUI === SceneUIClasses.CopyWolf
            || sceneUI === SceneUIClasses.KuaFuBoss
            || sceneUI === SceneUIClasses.ZhongShenZhengBa
            || sceneUI === SceneUIClasses.PKLovers) {
            isKuafuHuodong = true;
        }
        return isKuafuHuodong;
    }
    Global.isKuaFuHuoDongMapSceneUIClass = isKuaFuHuoDongMapSceneUIClass;
    /**
     * 屏蔽跨服操作
     * @param showHint
     * @param checkFuBen
     */
    function IsOperateUnPermitInKuaFuMapCheck(showHint = false, checkFuBen = false) {
        let ret = false;
        if (GetMapSceneUIClass() === SceneUIClasses.KuaFuMap ||
            GetMapSceneUIClass() === SceneUIClasses.HuanShuYuan) {
            ret = true;
        }
        if (checkFuBen) {
            if (isKuaFuHuoDongMapSceneUIClass(GetMapSceneUIClass())) {
                ret = true;
            }
        }
        if (ret && showHint) {
            uiMgr.hintText(Loca.getLang("跨服地图中不能使用此功能！"));
        }
        return ret;
    }
    Global.IsOperateUnPermitInKuaFuMapCheck = IsOperateUnPermitInKuaFuMapCheck;
    /**
     * 需要切换地图的操作前调用此函数,询问是否允许执行操作。
     * true=不允许切换地图，false=允许切换地图
     * @param nMapCode 地图ID
     */
    function onPreChangeMap(nMapCode = -1) {
        if (nMapCode > 0) {
            const objLevel = TableUtils.getMapMinLevelAndZhuanSheng(nMapCode);
            if (!Global.validLevel(objLevel.minZhuanSheng, objLevel.minLevel)) {
                uiMgr.hintText(ConfigLoca.UI_Transfer_Failure_Because_RoleLv, objLevel.minZhuanSheng, objLevel.minLevel); // 等级未达到{0}重{1}级无法传送
                return true;
            }
        }
        if (Global.isKuaFuHuoDongMapSceneUIClass(Global.GetMapSceneUIClass())) {
            // TODO: 提示退出副本
            return true;
        }
        return false;
    }
    Global.onPreChangeMap = onPreChangeMap;
    /**
     * 如果是在自动寻路中，则判断当前的传送点是否是自己需要的传送点
     * @param nMapID 地图ID
     * @param nTeleportKey 传送点ID
     */
    function CanBeTransport(nMapID, nTeleportKey) {
        if (!Global.Data.PlayGame) {
            return false;
        }
        if (GameMode.getLocalPlayerController().isAutoFighting()) {
            return false; // 自动挂机时不让传送
        }
        const eStateID = GameMode.getLocalPlayerController().GetState();
        if (eStateID !== Logic.EControllerStateId.AutoPathForTask) {
            return true; // 没有在自动寻路中，则传送
        }
        const staAuto = GameMode.getLocalPlayerController().GetStateById(eStateID);
        if (!staAuto || !staAuto.autoRoadItemsList || staAuto.autoRoadItemsList.length === 0) {
            return true;
        }
        // 查找传送点的键值
        for (let i = 0; i < staAuto.autoRoadItemsList.length; i++) {
            if (nMapID !== staAuto.autoRoadItemsList[i].MapID) {
                continue;
            }
            if (staAuto.autoRoadItemsList[i].TeleportKey === nTeleportKey) {
                return true;
            }
        }
        // 最后一张图不可能有传送点，所以可以传送
        if (staAuto.autoRoadItemsList[staAuto.autoRoadItemsList.length - 1].MapID === nMapID) {
            return true;
        }
        return false;
    }
    Global.CanBeTransport = CanBeTransport;
})(Global || (Global = {}));
//# sourceMappingURL=GlobalMapFunction.js.map