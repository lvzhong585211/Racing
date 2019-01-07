var TableUtils;
(function (TableUtils) {
    /**
     * 获取表字段字符串类型的值（如果字段不存在，则返回空字符串）
     * @param sFieldVal 字符串值
     */
    function getFieldString(sFieldVal) {
        if (sFieldVal === null || sFieldVal === undefined) {
            return "";
        }
        return sFieldVal;
    }
    TableUtils.getFieldString = getFieldString;
    /**
     * 获取表字段数字类型的值（如果字段不存在，则返回-1）
     * @param sAttr 数字值
     */
    function getFieldNumber(nFieldVal) {
        if (nFieldVal === null || nFieldVal === undefined) {
            return 0;
        }
        return nFieldVal;
    }
    TableUtils.getFieldNumber = getFieldNumber;
    /**
     * 返回指定的关卡引用的地图Id
     * @param levelId 指定要获取地图Id的关卡Id
     */
    function getLevelMapId(levelId) {
        const levelSetting = tableMgr.levelSettingTable.Find(levelId);
        return levelSetting.PicCode;
    }
    TableUtils.getLevelMapId = getLevelMapId;
    /**
     * 根据给定的NPCID查找NPC的模板信息
     * @param npcID 指定要查找的NPC
     */
    function getNPCVOByID(npcID) {
        return tableMgr.npcsTable.Find(npcID);
    }
    TableUtils.getNPCVOByID = getNPCVOByID;
    /**
     * 由NPC的ID返回对应的NPC名称(本地化后的名称)
     * @param npcID 指定要查找名称的NPC
     */
    function getNPCNameByID(npcID) {
        const vo = getNPCVOByID(npcID);
        if (vo) {
            return Loca.getLang(vo.SName);
        }
        return "";
    }
    TableUtils.getNPCNameByID = getNPCNameByID;
    /**
     * 由给定的MonsterID查找对应的Monster模板信息
     * @param monsterID 指定要查找的Monster
     */
    function getMonsterXmlNodeByID(monsterID) {
        return tableMgr.monstersTable.Find(monsterID);
    }
    TableUtils.getMonsterXmlNodeByID = getMonsterXmlNodeByID;
    /**
     * 从给定的字符串中读取Laya.Vector3对象
     * @param vec3Fields 指定要从中读取Vector3数值的字符串
     */
    function getVector3(vec3Fields) {
        const s = vec3Fields.split(",");
        return new Laya.Vector3(parseFloat(s[0]), parseFloat(s[1]), parseFloat(s[2]));
    }
    TableUtils.getVector3 = getVector3;
    /**
     * 查询指定Id的地图类型
     * @param mapCode 指定要获取地图类型的地图Id
     */
    function getMapType(mapCode) {
        const voConfig = tableMgr.levelConfigTable.Find(mapCode);
        if (voConfig && voConfig.settings && voConfig.settings.IsolatedMap) {
            if (voConfig.settings.IsolatedMap >= 0) {
                return voConfig.settings.IsolatedMap;
            }
        }
        return MapTypes.Normal;
    }
    TableUtils.getMapType = getMapType;
    /**
     * 获取地图的名称(带颜色代码)
     * @param mapCode 指定要获取地图名称的地图
     * @param showColor 指定是否带颜色
     */
    function getMapNameByCodeEx(mapCode, showColor = false) {
        const settingMapVO = tableMgr.levelSettingTable.Find(mapCode);
        if (!settingMapVO)
            return "";
        if (showColor)
            return Loca.getLangWithColor(settingMapVO.Name, MyUI.ColorCode.white3);
        else
            return Loca.getLang(settingMapVO.Name);
    }
    TableUtils.getMapNameByCodeEx = getMapNameByCodeEx;
    /**
    * 获取指定地图的UI类型
    * @param mapCode 指定要获取地图UI类型的地图
    */
    function getMapSceneUIClass(mapCode) {
        const mapSetting = tableMgr.levelSettingTable.Find(mapCode);
        if (mapSetting) {
            return mapSetting.MapType;
        }
        else {
            return SceneUIClasses.Normal;
        }
    }
    TableUtils.getMapSceneUIClass = getMapSceneUIClass;
    /**
     * 获取指定关卡的最低等级及转生限制
     * @param mapCode 指定要获取等级信息的关卡Id
     */
    function getMapMinLevelAndZhuanSheng(mapCode) {
        const levelConfigVO = tableMgr.levelConfigTable.Find(mapCode);
        if (!levelConfigVO) {
            return undefined;
        }
        return { minLevel: levelConfigVO.limits.minLevel, minZhuanSheng: levelConfigVO.limits.minZhuanSheng };
    }
    TableUtils.getMapMinLevelAndZhuanSheng = getMapMinLevelAndZhuanSheng;
    /**
     * 查找指定Id的关卡的传送点信息
     * @param mapCode 关卡ID
     */
    function getMapTeleports(mapCode) {
        return tableMgr.teleportsTable.Find(mapCode);
    }
    TableUtils.getMapTeleports = getMapTeleports;
    /**
     * 获取对应等级的经验
     * @param nLevel 等级
     * @param nChangeLife 重生等级
     */
    function getExpByLevel(nLevel, nChangeLife) {
        const voLevel = tableMgr.levelUpTable.Find(nLevel);
        if (voLevel && nChangeLife < voLevel.ChangeLifeList.length) {
            return voLevel.ChangeLifeList[nChangeLife];
        }
        return 0;
    }
    TableUtils.getExpByLevel = getExpByLevel;
    /**
     * 获取玩家当前等级每分钟获得的经验值和星魂值
     * @returns { expPerMin: number, xingHunPerMin: number } expPerMin=每分钟经验值、xingHunPerMin=每分钟星魂值
     */
    function getMingXiangValuePerMinute() {
        const kvRows = tableMgr.mingXiangTable.allRowsRef();
        if (!(kvRows instanceof Map)) {
            return;
        }
        let low = 1;
        let high = kvRows.size;
        let middle;
        while (low <= high) {
            middle = (low + high) / 2 | 0;
            const vo = kvRows.get(middle);
            const ret = UIHelper.AvalidLevel2(vo.MinLevel, vo.MaxLevel, vo.MinZhuanSheng, vo.MaxZhuanSheng);
            if (0 === ret) {
                return { expPerMin: vo.Experience, xingHunPerMin: vo.Xinghun };
            }
            else if (ret < 0) {
                high = middle - 1;
            }
            else {
                low = middle + 1;
            }
        }
        return { expPerMin: 0, xingHunPerMin: 0 };
    }
    TableUtils.getMingXiangValuePerMinute = getMingXiangValuePerMinute;
})(TableUtils || (TableUtils = {}));
//# sourceMappingURL=DataTableUtils.js.map