namespace TableUtils {
    /**
     * 获取表字段字符串类型的值（如果字段不存在，则返回空字符串）
     * @param sFieldVal 字符串值
     */
    export function getFieldString(sFieldVal: string) {
        if (sFieldVal === null || sFieldVal === undefined) {
            return "";
        }
        return sFieldVal;
    }

    /**
     * 获取表字段数字类型的值（如果字段不存在，则返回0）
     * @param sAttr 数字值
     */
    export function getFieldNumber(nFieldVal: number) {
        if (nFieldVal === null || nFieldVal === undefined) {
            return 0;
        }
        return nFieldVal;
    }

	/**
	 * 返回指定的关卡引用的地图Id
	 * @param levelId 指定要获取地图Id的关卡Id
	 */
    export function getLevelMapId(levelId: number): number {
        const levelSetting = tableMgr.levelSettingTable.Find(levelId);
        return levelSetting.PicCode;
    }

	/**
	 * 根据给定的NPCID查找NPC的模板信息
	 * @param npcID 指定要查找的NPC
	 */
    export function getNPCVOByID(npcID: number): tables.NPCInfoVO {
        return tableMgr.npcsTable.Find(npcID);
    }

    /**
     * 由NPC的ID返回对应的NPC名称(本地化后的名称)
     * @param npcID 指定要查找名称的NPC
     */
    export function getNPCNameByID(npcID: number): string {
        const vo = getNPCVOByID(npcID);
        if (vo) {
            return Loca.getLang(vo.SName);
        }
        return "";
    }

    /**
     * 由给定的MonsterID查找对应的Monster模板信息
     * @param monsterID 指定要查找的Monster
     */
    export function getMonsterXmlNodeByID(monsterID: number): tables.MonsterVO {
        return tableMgr.monstersTable.Find(monsterID);
    }

	/**
	 * 从给定的字符串中读取Laya.Vector3对象
	 * @param vec3Fields 指定要从中读取Vector3数值的字符串
	 */
    export function getVector3(vec3Fields: string) {
        const s = vec3Fields.split(",");
        return new Laya.Vector3(parseFloat(s[0]), parseFloat(s[1]), parseFloat(s[2]));
    }

    /**
     * 查询指定Id的地图类型
     * @param mapCode 指定要获取地图类型的地图Id
     */
    export function getMapType(mapCode: number): MapTypes {
        const voConfig = tableMgr.levelConfigTable.Find(mapCode);
        if (voConfig && voConfig.settings && voConfig.settings.IsolatedMap) {
            if (voConfig.settings.IsolatedMap >= 0) {
                return voConfig.settings.IsolatedMap;
            }
        }
        return MapTypes.Normal;
    }

    /**
     * 获取地图的名称(带颜色代码)
     * @param mapCode 指定要获取地图名称的地图
     * @param showColor 指定是否带颜色
     */
    export function getMapNameByCodeEx(mapCode: number, showColor: boolean = false) {
        const settingMapVO = tableMgr.levelSettingTable.Find(mapCode);
        if (!settingMapVO)
            return "";

        if (showColor)
            return Loca.getLangWithColor(settingMapVO.Name, MyUI.ColorCode.white3);
        else
            return Loca.getLang(settingMapVO.Name);
    }

    /**
    * 获取指定地图的UI类型
    * @param mapCode 指定要获取地图UI类型的地图
    */
    export function getMapSceneUIClass(mapCode: number): SceneUIClasses {
        const mapSetting = tableMgr.levelSettingTable.Find(mapCode);
        if (mapSetting) {
            return mapSetting.MapType as SceneUIClasses;
        } else {
            return SceneUIClasses.Normal;
        }
    }

    /**
     * 获取指定关卡的最低等级及转生限制
     * @param mapCode 指定要获取等级信息的关卡Id
     */
    export function getMapMinLevelAndZhuanSheng(mapCode: number): { minLevel: number, minZhuanSheng: number } | undefined {
        const levelConfigVO = tableMgr.levelConfigTable.Find(mapCode);
        if (!levelConfigVO) {
            return undefined;
        }
        return { minLevel: levelConfigVO.limits.minLevel, minZhuanSheng: levelConfigVO.limits.minZhuanSheng };
    }

    /**
     * 查找指定Id的关卡的传送点信息
     * @param mapCode 关卡ID
     */
    export function getMapTeleports(mapCode: number): tables.MapTeleports {
        return tableMgr.teleportsTable.Find(mapCode);
    }

    /**
     * 获取对应等级的经验
     * @param nLevel 等级
     * @param nChangeLife 重生等级
     */
    export function getExpByLevel(nLevel: number, nChangeLife: number): number {
        const voLevel = tableMgr.levelUpTable.Find(nLevel);
        if (voLevel && nChangeLife < voLevel.ChangeLifeList.length) {
            return voLevel.ChangeLifeList[nChangeLife];
        }
        return 0;
    }

    /**
     * 获取玩家当前等级每分钟获得的经验值和星魂值
     * @returns { expPerMin: number, xingHunPerMin: number } expPerMin=每分钟经验值、xingHunPerMin=每分钟星魂值
     */
    export function getMingXiangValuePerMinute(): { expPerMin: number, xingHunPerMin: number } {
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
            } else if (ret < 0) {
                high = middle - 1;
            } else {
                low = middle + 1;
            }
        }
        return { expPerMin: 0, xingHunPerMin: 0 };
    }
}