var tables;
(function (tables) {
    /************************************************************************************************************
     * 定义表中行数据模型
     * 有自定义表对象的表可以把VO放到表对象的文件里面，比如TaskVO可以定义到SystemTasksTable里面
     * 不需要自定义表对象的可以把VO定义到这里
     * 注意1：定义对象时属性名字需要与表里的属性名字完全一致
     * 注意2：表里有些列的属性会配置为空，定义这种属性时要定义成可选属性，即在名字后面加`?`符号
     * 注意3：定义为number的属性一定要确保表中的数据为数字格式，如GoodsVO中的ItemQuality定义为number，
     * 		但是表中使用的是字符格式“4”，导致程序运行时出现了内存格式错误（运行正常，死活找不出错误）
     ************************************************************************************************************/
    /**
     * 把json数据转换成NPCInfoVO
     * @param jsonRowData 要转换的json数据
     */
    function json2NPCInfoVO(jsonRowData) {
        const rowRet = jsonRowData;
        // 只需要转换Vector3这种自定义格式的数据即可
        if (jsonRowData.CollideCenter) {
            rowRet.CollideCenter = TableUtils.getVector3(jsonRowData.CollideCenter);
            rowRet.CollideSize = TableUtils.getVector3(jsonRowData.CollideSize);
        }
        return rowRet;
    }
    tables.json2NPCInfoVO = json2NPCInfoVO;
    /**
     * 把json数据转换成 MonsterVO
     * @param jsonRowData 要转换的json数据
     */
    function json2MonsterInfoVO(jsonRowData) {
        const rowRet = jsonRowData;
        // 只需要转换Vector3这种自定义格式的数据即可
        if (jsonRowData.CollideCenter) {
            rowRet.CollideCenter = TableUtils.getVector3(jsonRowData.CollideCenter);
            rowRet.CollideSize = TableUtils.getVector3(jsonRowData.CollideSize);
        }
        return rowRet;
    }
    tables.json2MonsterInfoVO = json2MonsterInfoVO;
    /**
     * "Settings.xml" 中Map对应的VO对象
     */
    class SettingMapVO {
        constructor() {
            this.PicCode = -1; // 关卡使用的地图Id
        }
    }
    tables.SettingMapVO = SettingMapVO;
    /**
     * 关卡上种植的NPC信息
     */
    class LevelNpcInfoVO {
    }
    tables.LevelNpcInfoVO = LevelNpcInfoVO;
    /**
     * 关卡上种植的怪物信息
     */
    class LevelMonstersInfoVO {
    }
    tables.LevelMonstersInfoVO = LevelMonstersInfoVO;
    /**
     * 关卡的配置信息
     */
    class LevelConfigInfo {
        set limits(value) {
            if (!("minZhuanSheng" in value)) {
                value["minZhuanSheng"] = 0;
            }
            this._limits = value;
        }
        get limits() {
            return this._limits;
        }
    }
    tables.LevelConfigInfo = LevelConfigInfo;
    /**
     * 技能表（Magics.xml）
     */
    class MagicInfoVO {
        get FirstMagicAttackData() {
            return tableMgr.magicAttacksTable.Find(this.FirstMagicAttackID);
        }
    }
    tables.MagicInfoVO = MagicInfoVO;
})(tables || (tables = {}));
//# sourceMappingURL=DataTableRowTypes.js.map