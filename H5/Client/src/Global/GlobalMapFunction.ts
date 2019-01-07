/**
 * 存放和地图（关卡）相关的全局函数
 */
namespace Global {
    /**
     * 获取角色所在地图的的场景UI类型
     */
    export function GetMapSceneUIClass(): SceneUIClasses {
        const nMapCode = gameIns.gameState.roleData.MapCode;
        return TableUtils.getMapSceneUIClass(nMapCode);
    }

    export let mapCode_YanhuangZhanchang = 0;
    /**
     * 当前是否在阵营战地图中
     * @param nLevelID 关卡ID
     */
    export function isBattleMap(nLevelID: number): boolean {
        if (mapCode_YanhuangZhanchang === 0) {
            mapCode_YanhuangZhanchang = tableMgr.sysParamsTable.getParamInt("BattleMapCode");
        }
        if (nLevelID === mapCode_YanhuangZhanchang) {
            return true;
        } else {
            if (Global.IsInKuafuHuodongYongZheZhanChang(nLevelID)) {
                return true;
            }
            if (Global.IsInKuaFuHuoDongWangZhe(nLevelID)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 是否在决死战场
     * @param nLevelID 关卡ID
     */
    export function IsInKuafuHuodongYongZheZhanChang(nLevelID: number): boolean {
        if ((nLevelID >= 80000 && nLevelID <= 80006)) {
            return true;
        }
        return false;
    }

    /**
     * 是否在跨服活动-独尊战场
     * @param nLevelID 关卡ID
     */
    export function IsInKuaFuHuoDongWangZhe(nLevelID: number): boolean {
        if ((nLevelID >= 81000 && nLevelID <= 81006)) {
            return true;
        }
        return false;
    }

    /**
     * 获取是否在城战地图中
     * @param nLevelID 关卡ID
     */
    export function isLuoLanChengZhanMapCode(nLevelID: number): boolean {
        // TODO: 读取城战地图配置
        return false;
    }

    /**
     * 判断是否是跨服活动的场景UI
     * @param sceneUI 指定要判定的场景UI类型
     */
    export function isKuaFuHuoDongMapSceneUIClass(sceneUI: SceneUIClasses): boolean {
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

    /**
     * 屏蔽跨服操作
     * @param showHint 
     * @param checkFuBen 
     */
    export function IsOperateUnPermitInKuaFuMapCheck(showHint: boolean = false, checkFuBen: boolean = false): boolean {
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

    /**
     * 需要切换地图的操作前调用此函数,询问是否允许执行操作。
     * true=不允许切换地图，false=允许切换地图
     * @param nMapCode 地图ID
     */
    export function onPreChangeMap(nMapCode: number = -1): boolean {
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

    /**
     * 如果是在自动寻路中，则判断当前的传送点是否是自己需要的传送点
     * @param nMapID 地图ID
     * @param nTeleportKey 传送点ID
     */
    export function CanBeTransport(nMapID: number, nTeleportKey: number): boolean {
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
        const staAuto = GameMode.getLocalPlayerController().GetStateById(eStateID) as Logic.AutoPathForTask;
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
    /**
     * 更新副本数据
     * @param fuBenId 副本Id
     * @param dayId 
     * @param enterNum 进入次数
     * @param finishNum 完成次数
     */
    export function UpdateFuBenData(fuBenId: number, dayId: number, enterNum: number, finishNum: number): void {
        let fuBenData = Global.GetFuBenData(fuBenId);
        if (null == fuBenData) {
            fuBenData = Global.AddFuBenData(fuBenId, dayId, enterNum, finishNum);
        }
        else {
            fuBenData.FuBenID = fuBenId;
            fuBenData.DayID = dayId;
            fuBenData.EnterNum = enterNum;
            fuBenData.FinishNum = finishNum;
        }
    }

    /**
     * 副本管理
     * @param fuBenId 副本Id
     */
    export function GetFuBenData(fuBenId: number): NetMsg.IFuBenData {
        if (null === Global.Data || null === Global.Data.roleData) {
            return null;
        }
        if (null == Global.Data.roleData.FuBenDataList) {
            return null;
        }
        for (let i = 0; i < Global.Data.roleData.FuBenDataList.length; i++) {
            if (Global.Data.roleData.FuBenDataList[i].FuBenID == fuBenId) {
                return Global.Data.roleData.FuBenDataList[i];
            }
        }
        return null;
    }
    /**
     * 添加一个副本数据
     * @param fuBenId 副本Id
     * @param dayId 
     * @param enterNum 进入次数
     * @param finishNum 完成次数
     */
    export function AddFuBenData(fuBenId: number, dayId: number, enterNum: number, finishNum: number): NetMsg.IFuBenData {
        if (null === Global.Data.roleData.FuBenDataList) {
            Global.Data.roleData.FuBenDataList = new Array<NetMsg.IFuBenData>();
        }
        const fuBenData = new NetMsg.FuBenData();
        {
            fuBenData.FuBenID = fuBenId;
            fuBenData.DayID = dayId;
            fuBenData.EnterNum = enterNum;
            fuBenData.FinishNum = finishNum;
        }

        Global.Data.roleData.FuBenDataList.push(fuBenData);
        return fuBenData;
    }
    /** */
    export function OnQueryFuBenInfoResult(fuBenData: NetMsg.FuBenData, strName: string, nBestTimer: number) {
        let item: MyUI.RiChangFuBenItemData = Global.Data.RiChangFuBenItemDataDict[fuBenData.FuBenID];
        // const dayOfYear = Global.getCorrectDateTime().DayOfYear;
        // if (dayID != dayOfYear && (dayID < dayOfYear || Math.Abs(dayID - dayOfYear) > 300)) {
        //     nEnterNum = 0;
        //     nFinishNum = 0;
        // }
        if (item === undefined || item === null) {
            item = new MyUI.RiChangFuBenItemData();
            item.EnterNum = fuBenData.EnterNum;
            item.FinishNum = fuBenData.FinishNum;
            item.MyTopTime = fuBenData.QuickPassTimer;
            if (nBestTimer > 0) {
                item.TopName = strName;
                item.TopTime = nBestTimer;
            }

            item.LevelAllow = UIHelper.AvalidLevel(item.MinLevel, item.MinZhuanSheng, true);
            item.ZhanLiAllow = item.ZhanLi <= Global.Data.roleData.CombatForce;

            //TODO            
            // ActivityTipItem activityTipItem = GetActivityTipItemByFuBenID(item.CopyID);
            // if (null != activityTipItem) {
            //     int count = (item.MaxEnterNum < 0 || item.MaxEnterNum > item.EnterNum) && (item.MaxFinishNum < 0 || item.MaxFinishNum > item.FinishNum) && item.LevelAllow ? 1 : 0;
            //     ChangeItemData(activityTipItem, count, true);
            // }
        }
        Global.Data.RiChangFuBenItemDataDict[fuBenData.FuBenID] = item;
    }
}