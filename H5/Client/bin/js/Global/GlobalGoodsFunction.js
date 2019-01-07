/**
 * 存放一些和物品相关的全局函数
 */
var Global;
(function (Global) {
    /** 默认的物品结束时间 */
    Global.ConstGoodsEndTime = "1900-01-01 12:00:00";
    /** 背包总页数 */
    Global.BAG_PAGES = 5;
    /** 背包每页行数 */
    Global.BAG_PAGE_ROWS = 5;
    /** 背包每页列数 */
    Global.BAG_PAGE_COLS = 5;
    /** 背包最大的格子数量 */
    Global.MaxBagGridNum = Global.BAG_PAGES * Global.BAG_PAGE_ROWS * Global.BAG_PAGE_COLS; // 125;
    /** 获取背包格子的最大个数（已解锁可用的格子数） */
    function GetTotalMaxBagGridCount() {
        if (gameIns.gameState.roleData.BagNum > Global.MaxBagGridNum) {
            return Global.MaxBagGridNum;
        }
        return gameIns.gameState.roleData.BagNum;
    }
    Global.GetTotalMaxBagGridCount = GetTotalMaxBagGridCount;
    /** Data索引到格子索引的映射（key:BagIndex => value:GridIndex） */
    let mapBagIndex;
    /** 格子索引到Data索引的映射（key:GridIndex => value:BagIndex） */
    let mapGridIndex;
    /**
     * 初始化列表索引映射关系（预先设置N个索引的对应关系，方便使用） <br>
     * 具体原因可以参考`GoodsBox.ts`文件里的注释 <br>
     * 主要有两种映射：<br>
     * key: BagIndex => value: GridIndex <br>
     * key: GridIndex => value: BagIndex <br>
     * @param nPages 总页数
     * @param nPageRows 每页的行数
     * @param nPageCols 每页的列数
     */
    function initListIndexMapping(nPages, nPageRows, nPageCols) {
        mapBagIndex = new Map();
        mapGridIndex = new Map();
        for (let nPageIdx = 0; nPageIdx < nPages; nPageIdx++) {
            for (let nRowIdx = 0; nRowIdx < nPageRows; nRowIdx++) {
                for (let nColIdx = 0; nColIdx < nPageCols; nColIdx++) {
                    const nBagIdx = nPageIdx * (nPageRows * nPageCols) +
                        (nRowIdx * nPageCols + nColIdx);
                    const nGridIdx = nBagIdx - (nRowIdx - nColIdx) * 4;
                    mapBagIndex.set(nBagIdx, nGridIdx);
                    mapGridIndex.set(nGridIdx, nBagIdx);
                }
            }
        }
    }
    /**
     * 根据Data索引（BagIndex）获取对应的格子索引
     * @param nBagIdx 数据索引
     */
    function getGridIndexByBagIndex(nBagIdx) {
        if (!mapBagIndex) {
            // 注意：暂时三个参数都使用背包的，后期有更大的列表时可以考虑扩大
            initListIndexMapping(Global.BAG_PAGES, Global.BAG_PAGE_ROWS, Global.BAG_PAGE_COLS);
        }
        if (mapBagIndex.has(nBagIdx)) {
            return mapBagIndex.get(nBagIdx);
        }
        Global.Log.Assert(false, "BagIdx beyond range!!!");
        return -1;
    }
    Global.getGridIndexByBagIndex = getGridIndexByBagIndex;
    /**
     * 根据格子索引获取对应的Data索引（BagIndex）
     * @param nGridIdx 格子索引
     */
    function getBagIndexByGridIndex(nGridIdx) {
        if (!mapGridIndex) {
            // 注意：暂时三个参数都使用背包的，后期有更大的列表时可以考虑扩大
            initListIndexMapping(Global.BAG_PAGES, Global.BAG_PAGE_ROWS, Global.BAG_PAGE_COLS);
        }
        if (mapGridIndex.has(nGridIdx)) {
            return mapGridIndex.get(nGridIdx);
        }
        Global.Log.Assert(false, "GridIdx beyond range!!!");
        return -1;
    }
    Global.getBagIndexByGridIndex = getBagIndexByGridIndex;
    /**
     * 摧毁物品
     * @param gd 道具数据
     */
    function DestroyGoods(gd) {
        // TODO: 发送消息
        // GameInstance.Game.SpriteModGoods((int)(ModGoodsTypes.Destroy), gd.Id, gd.GoodsID, gd.Using, gd.Site, gd.GCount, gd.BagIndex, "");
    }
    Global.DestroyGoods = DestroyGoods;
    /**
     * 获取物品在商城中一次性最大购买数量
     * @param goodsId 物品ID
     */
    function GetGoodsGridNumByIDOfMall(goodsId) {
        if (Global.Data.MallData) {
            if (!Global.String.IsNullOrWhiteSpace(Global.Data.MallData.MallXmlString)) {
                const xmlDom = Global.Utils.parseXMLElementListFromString(Global.Data.MallData.MallXmlString);
                const nodeLen = xmlDom.length;
                for (let i = 0; i < nodeLen; i++) {
                    const element = xmlDom.item(i);
                    const eGoodsId = Global.Utils.getElementAttributeInt(element, "GoodsID");
                    if (eGoodsId === goodsId) {
                        return Global.Utils.getElementAttributeInt(element, "GridNum");
                    }
                }
            }
        }
        return 0;
    }
    Global.GetGoodsGridNumByIDOfMall = GetGoodsGridNumByIDOfMall;
    /**
     * 背包是否已经满？是否可以添加指定的物品
     * @param goodsID
     * @param newGoodsNum
     * @param binding
     * @param endTime
     * @param useOldGrid
     */
    function CanAddGoods(goodsID, newGoodsNum, binding, endTime = Global.ConstGoodsEndTime, useOldGrid = false) {
        if (Global.Data.roleData.GoodsDataList == null) {
            return true;
        }
        // 获取物品是否可以叠加的值
        const gridNum = tableMgr.goodsTable.getGridNum(goodsID);
        let findOldGrid = false;
        let totalGridNum = 0;
        for (let i = 0; i < Global.Data.roleData.GoodsDataList.length; i++) {
            if (Global.Data.roleData.GoodsDataList[i].Using > 0) {
                continue;
            }
            totalGridNum++;
            if (useOldGrid && gridNum > 1) { // 是否可以共占
                if (Global.Data.roleData.GoodsDataList[i].GoodsID === goodsID &&
                    Global.Data.roleData.GoodsDataList[i].Binding === binding &&
                    DateTimeEqual(Global.Data.roleData.GoodsDataList[i].Endtime, endTime)) {
                    if ((Global.Data.roleData.GoodsDataList[i].GCount + newGoodsNum) <= gridNum) {
                        findOldGrid = true;
                        break;
                    }
                }
            }
        }
        if (findOldGrid) {
            return true;
        }
        const totalMaxGridCount = GetTotalMaxBagGridCount();
        return (totalGridNum < totalMaxGridCount);
    }
    Global.CanAddGoods = CanAddGoods;
    /**
     * 包裹是否已经满
     */
    function IsBagFull() {
        if (Global.Data.roleData.GoodsDataList == null) {
            return false;
        }
        let totalGridNum = 0;
        for (let i = 0; i < Global.Data.roleData.GoodsDataList.length; i++) {
            if (Global.Data.roleData.GoodsDataList[i].Using > 0) {
                continue;
            }
            totalGridNum++;
        }
        const totalMaxGridCount = GetTotalMaxBagGridCount();
        return (totalGridNum >= totalMaxGridCount);
    }
    Global.IsBagFull = IsBagFull;
    /**
     * 获取包裹剩余空格数量
     */
    function GetBaoGuoSpaceCount() {
        const aGoodsDatas = gameIns.gameState.roleData.GoodsDataList;
        const nTotalGridCnt = GetTotalMaxBagGridCount();
        if (!aGoodsDatas) {
            return nTotalGridCnt;
        }
        let nUsedCnt = 0;
        for (let i = 0; i < aGoodsDatas.length; i++) {
            if (aGoodsDatas[i].Using <= 0) {
                nUsedCnt++;
            }
        }
        return (nTotalGridCnt - nUsedCnt);
    }
    Global.GetBaoGuoSpaceCount = GetBaoGuoSpaceCount;
    /**
     * 根据道具ID查找包裹中总的数量
     * @param goodsID 道具ID
     */
    function GetTotalGoodsCountByID(goodsID) {
        if (null == Global.Data.roleData.GoodsDataList) {
            return 0;
        }
        let nCount = 0;
        const lstGoodsData = Global.Data.roleData.GoodsDataList;
        lstGoodsData.forEach(element => {
            if (element.GoodsID === goodsID && !IsGoodsTimeOver(element)) {
                nCount += element.GCount;
            }
        });
        return nCount;
    }
    Global.GetTotalGoodsCountByID = GetTotalGoodsCountByID;
    /**
     * 根据道具ID查找包裹中总的绑定道具的数量
     * @param goodsID 道具ID
     */
    function GetTotalBindingGoodsCountByID(goodsID) {
        if (null == Global.Data.roleData.GoodsDataList)
            return 0;
        let nCount = 0;
        const lstGoodsData = Global.Data.roleData.GoodsDataList;
        lstGoodsData.forEach(element => {
            if (element.GoodsID === goodsID && element.Binding > 0 && !IsGoodsTimeOver(element)) {
                nCount += element.GCount;
            }
        });
        return nCount;
    }
    Global.GetTotalBindingGoodsCountByID = GetTotalBindingGoodsCountByID;
    /**
     * 根据道具配置文件当中的条件来判断包裹中的符合条件的道具数量
     * @param strRequire
     */
    function GetTotalGoodsCountByRequire(strRequire = "") {
        if (null == Global.Data.roleData.GoodsDataList)
            return 0;
        let goodsID = -1;
        let goodsCont = 1;
        let bangding = 0;
        let qiangHua = 0;
        let zhuijia = 0;
        let xingyun = 0;
        let zhuoyue = 0;
        let ret = 0;
        if (strRequire !== "") {
            const strArr = strRequire.split(",");
            if (strArr.length !== 7) {
                return ret;
            }
            goodsID = parseInt(strArr[0]);
            goodsCont = parseInt(strArr[1]);
            bangding = parseInt(strArr[2]);
            qiangHua = parseInt(strArr[3]);
            zhuijia = parseInt(strArr[4]);
            xingyun = parseInt(strArr[5]);
            zhuoyue = parseInt(strArr[6]);
            const lstGoodsData = Global.Data.roleData.GoodsDataList;
            for (let i = 0; i < lstGoodsData.length; i++) {
                const gd = lstGoodsData[i];
                if (gd.GoodsID !== goodsID)
                    continue;
                if (IsGoodsTimeOver(gd))
                    continue; // 如果已经超时
                if (gd.Quality >= qiangHua && gd.AppendPropLev >= zhuijia && gd.Lucky >= xingyun && gd.ExcellenceInfo >= zhuoyue) {
                    ret += lstGoodsData[i].GCount;
                }
            }
        }
        return ret;
    }
    Global.GetTotalGoodsCountByRequire = GetTotalGoodsCountByRequire;
    /**
     * 根据物品数据库ID获取物品信息
     * @param dbID
     * @param goodsDataList
     */
    function GetGoodsDataByDbID(dbID, goodsDataList = null) {
        if (null == goodsDataList)
            goodsDataList = Global.Data.roleData.GoodsDataList;
        if (null == goodsDataList)
            return null;
        for (let i = 0; i < goodsDataList.length; i++) {
            if (goodsDataList[i].Id === dbID) {
                return goodsDataList[i];
            }
        }
        return null;
    }
    Global.GetGoodsDataByDbID = GetGoodsDataByDbID;
    /**
     * 根据物品ID获取物品信息
     * @param goodsID
     */
    function GetGoodsDataByID(goodsID) {
        if (null == Global.Data.roleData.GoodsDataList)
            return null;
        const lstGoodsData = Global.Data.roleData.GoodsDataList;
        for (let i = 0; i < lstGoodsData.length; i++) {
            if (lstGoodsData[i].GoodsID === goodsID) {
                return lstGoodsData[i];
            }
        }
        return null;
    }
    Global.GetGoodsDataByID = GetGoodsDataByID;
    /**
     * 根据物品ID获取物品信息，优先获取绑定的或是非绑定的
     * @param goodsID
     * @param isBind
     */
    function GetIsBindGoodsDataByID(goodsID, isBind) {
        if (null == Global.Data.roleData.GoodsDataList)
            return null;
        const lstGoodsData = Global.Data.roleData.GoodsDataList;
        let fristBindIndex = -1;
        let firstNotBindIndex = -1;
        for (let i = 0; i < lstGoodsData.length; i++) {
            if (-1 !== fristBindIndex && -1 !== firstNotBindIndex) {
                break;
            }
            if (lstGoodsData[i].GoodsID === goodsID) {
                if (lstGoodsData[i].Binding === 1) {
                    fristBindIndex = i;
                }
                else {
                    firstNotBindIndex = i;
                }
            }
        }
        if (isBind) {
            if (-1 !== fristBindIndex) {
                return lstGoodsData[fristBindIndex];
            }
            else if (-1 !== firstNotBindIndex) {
                return lstGoodsData[firstNotBindIndex];
            }
        }
        else {
            if (-1 !== firstNotBindIndex) {
                return lstGoodsData[firstNotBindIndex];
            }
            else if (-1 !== fristBindIndex) {
                return lstGoodsData[fristBindIndex];
            }
        }
        return null;
    }
    Global.GetIsBindGoodsDataByID = GetIsBindGoodsDataByID;
    /**
     * 添加物品
     * @param goodsData 指定新添加的道具的数据信息
     */
    function AddGoodsData(goodsData) {
        if (null == Global.Data.roleData.GoodsDataList) {
            Global.Data.roleData.GoodsDataList = [];
        }
        Global.Data.roleData.GoodsDataList.push(goodsData);
        // 触发道具添加事件
        gameEventBus.addGood.event(goodsData);
        // TODO: 应该处理上面的添加道具的事件.不是直接放在这里调用.以减少代码耦合度 物品变化检测
        // Global.CheckWingCanUpgradeWhenGoodsChange(goodsData);
        // //道具数量变化时，更新已打开UI消耗道具数量
        // Global.RefreshCostGoodsUIWhenGoodsChange(goodsData);
    }
    Global.AddGoodsData = AddGoodsData;
    /**
     * 删除物品
     * @param goodsData
     */
    function RemoveGoodsData(goodsData) {
        if (null == Global.Data.roleData.GoodsDataList)
            return;
        const lstGoodsData = Global.Data.roleData.GoodsDataList;
        const nIdx = lstGoodsData.indexOf(goodsData);
        if (nIdx !== -1) {
            lstGoodsData.splice(nIdx, 1);
        }
        // TODO: 物品变化检测
        // Global.CheckWingCanUpgradeWhenGoodsChange(goodsData);
        // //道具数量变化时，更新已打开UI消耗道具数量
        // Global.RefreshCostGoodsUIWhenGoodsChange(goodsData);
    }
    Global.RemoveGoodsData = RemoveGoodsData;
    /**
     * 判断背包空格是否能提交接受新的物品 用于判断 背包空间是否足够
     * @param newGoodsCount
     */
    function CanTakeNewGoodsByGridNum(newGoodsCount) {
        const haveGoodsCount = GetGoodsUsedGrid();
        const totalMaxGridCount = GetTotalMaxBagGridCount();
        return (((newGoodsCount) + haveGoodsCount) <= totalMaxGridCount);
    }
    Global.CanTakeNewGoodsByGridNum = CanTakeNewGoodsByGridNum;
    /**
     * 获取物品占用的包裹格子数量(已经装备的不算占用)
     */
    function GetGoodsUsedGrid() {
        if (Global.Data.roleData.GoodsDataList == null)
            return 0;
        const lstGoodsData = Global.Data.roleData.GoodsDataList;
        let ret = 0;
        for (let i = 0; i < lstGoodsData.length; i++) {
            if (lstGoodsData[i].Using <= 0) {
                ret++;
            }
        }
        return ret;
    }
    /**
     * 使用物品
     * @param goodsID
     */
    function UsingGoodsByID(goodsID) {
        const gd = GetGoodsDataByID(goodsID);
        if (null != gd && gd.GCount > 0) {
            const canUseGoods = tableMgr.goodsTable.getUsingMode(goodsID) > 0;
            if (canUseGoods) {
                if (!GoodsCoolDown(gd.GoodsID)) { // 如果不在冷却状态则可以使用
                    ToUseGoods(gd);
                    return true;
                }
            }
        }
        return false;
    }
    Global.UsingGoodsByID = UsingGoodsByID;
    /**
     * 获取物品在包裹中的索引
     * @param dbID
     * @param ignoreUsing
     */
    function GetGoodsDataIndexByDbID(dbID, ignoreUsing = true) {
        if (null == Global.Data.roleData.GoodsDataList)
            return -1;
        const lstGoodsData = Global.Data.roleData.GoodsDataList;
        let index = -1;
        for (let i = 0; i < lstGoodsData.length; i++) {
            if (ignoreUsing && lstGoodsData[i].Using > 0) {
                continue;
            }
            index++;
            if (lstGoodsData[i].Id === dbID) {
                break;
            }
        }
        return index;
    }
    Global.GetGoodsDataIndexByDbID = GetGoodsDataIndexByDbID;
    /**
     * 根据传入的物品的类型，定位第一个同样的物品的数据
     * @param dbID
     * @param goodsID
     * @param isusing
     */
    function GetGoodsDataByType(dbID, goodsID, isusing = 0) {
        if (Global.Data.roleData.GoodsDataList == null)
            return null;
        let goodVO = tableMgr.goodsTable.Find(goodsID);
        if (null == goodVO)
            return null;
        const lstGoodsData = Global.Data.roleData.GoodsDataList;
        const categoriy1 = goodVO.Categoriy;
        for (let i = 0; i < lstGoodsData.length; i++) {
            if (lstGoodsData[i].Id === dbID)
                continue;
            if (isusing !== lstGoodsData[i].Using)
                continue;
            goodVO = tableMgr.goodsTable.Find(lstGoodsData[i].GoodsID);
            if (null == goodVO)
                continue;
            const categoriy2 = goodVO.Categoriy;
            if (categoriy1 !== categoriy2) {
                continue;
            }
            return lstGoodsData[i];
        }
        return null;
    }
    Global.GetGoodsDataByType = GetGoodsDataByType;
    /**
     * 物品能否直接双击使用
     * @param goodsID
     * @param errHint
     */
    function CanDirectUseGoods(goodsID, errHint = true) {
        const goodVO = tableMgr.goodsTable.Find(goodsID);
        if (!goodVO)
            return false;
        const categoriy = goodVO.Categoriy;
        if (categoriy >= ItemCategories.TouKui && categoriy < ItemCategories.EquipMax)
            return true;
        const glui = goodVO.GlUI;
        if (glui > 0)
            return true;
        const goodsName = Loca.getLang(goodVO.Title);
        const usingMode = goodVO.UsingMode;
        if (usingMode <= 0) {
            if (errHint) {
                uiMgr.hintText(Global.String.Format(Loca.getLang("【{0}】不能被直接使用"), goodsName));
            }
            return false;
        }
        return true;
    }
    Global.CanDirectUseGoods = CanDirectUseGoods;
    /**
     * 返回物品totype限制的字符串词典，键是需求中文字符串，值表示是否满足，不满足的外部可能用红字表示
     * @param goodsID 道具ID
     */
    function GetGoodsToTypeLimitString(goodsID) {
        const requireMap = new Map();
        const goodVO = tableMgr.goodsTable.Find(goodsID);
        if (!goodVO) {
            return requireMap;
        }
        // 特殊的额外限制，由ToType 决定 ToTypeProperty值的意义，不同项用逗号隔开
        const toType = goodVO.ToType.toString();
        const toTypeProperty = goodVO.ToTypeProperty.toString();
        // 这样表示没限制
        if ("-1" === toType || toType.length <= 0) {
            return requireMap;
        }
        const typeArr = toType.split(",");
        const propertyArr = toTypeProperty.split(",");
        // 配置有错误，仍旧表示没限制
        if (typeArr.length !== propertyArr.length) {
            return requireMap;
        }
        for (let index = 0; index < typeArr.length; index++) {
            const type = typeArr[index];
            const gateValue = propertyArr[index];
            if (!IsRoleReachLimit(type, gateValue)) {
                requireMap[GetEquipLimitString(type, gateValue)] = 0;
            }
            else {
                requireMap[GetEquipLimitString(type, gateValue)] = 1;
            }
        }
        return requireMap;
    }
    Global.GetGoodsToTypeLimitString = GetGoodsToTypeLimitString;
    /**
     * 通过额外属性字段判断物品是否可以被使用，EquipRequirementTypes中的各个字段共同判定
     * @param toType
     * @param toTypeProperty
     * @param errHint
     */
    function CanUseGoodsByExtraTypeProperty(toType, toTypeProperty, errHint = true) {
        // 这样表示没限制
        if ("-1" === toType || toType.length <= 0)
            return true;
        const typeArr = toType.split(",");
        const propertyArr = toTypeProperty.split(",");
        // 配置有错误，仍旧表示没限制
        if (typeArr.length !== propertyArr.length)
            return true;
        for (let index = 0; index < typeArr.length; index++) {
            const type = typeArr[index];
            const gateValue = propertyArr[index];
            if (!IsRoleReachLimit(type, gateValue)) {
                if (errHint) {
                    uiMgr.hintText(Global.String.Format(Loca.getLang("需要{0}才能使用"), GetEquipLimitString(type, gateValue)));
                }
                return false;
            }
        }
        return true;
    }
    /**
     * 判断主角是否达到条件限制，装备方面
     * @param type
     * @param gateValue
     */
    function IsRoleReachLimit(type, gateValue) {
        // 限制值用整数值
        const theGateValue = parseInt(gateValue);
        let curValue = theGateValue + 1; // 默认让可以使用，客户端暂时不好取这些值
        if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.WingSuit)) { // 翅膀阶级
            if (Global.Data.roleData.MyWingData != null) {
                curValue = Global.Data.roleData.MyWingData.WingID;
            }
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.ChengJiuLevel)) { // 成就阶数
            curValue = Global.GetRoleCommonUseParamsValue(RoleCommonUseIntParamsIndexs.ChengJiu);
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.JunXianLevel)) { // 军衔阶数
            curValue = Global.GetRoleCommonUseParamsValue(RoleCommonUseIntParamsIndexs.ShengWangLevel);
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.ZhuanShengLevel)) { // 角色重生等级
            curValue = Global.Data.roleData.ChangeLifeCount;
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.Level)) { // 角色等级
            curValue = Global.Data.roleData.Level;
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.HuFuSuit)) { // 护身符阶数
            curValue = Global.GetHuShengFuLevel();
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.DaTianShiSuit)) { // 大天使阶数
            curValue = Global.GetMaxDaTianShiLevel();
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.VIP)) { // VIP等级
            curValue = Global.GetVIPLeve();
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.NeedMarry)) { // 需要结婚
            // TODO: byMarrytype原来是sbyte类型的，这里换成int32不知道会不会有问题，待检测
            if (!Global.Data.MarryData || !Global.Data.MarryOtherData || Global.Data.MarryData.byMarrytype === -1) {
                curValue = 0;
            }
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.NeedBangHui)) { // 需要加入帮会
            if (!Global.IsHavingBangHui(Global.Data.roleData)) {
                curValue = 0;
            }
        }
        // 避免因为最大类型攻击值客户端没有而物品无法点击
        if (curValue < 0) {
            return true;
        }
        return curValue >= theGateValue;
    }
    /**
     * 返回限制字符串
     * @param type
     * @param gateValue
     */
    function GetEquipLimitString(type, gateValue) {
        // 限制值用整数
        const theGateValue = parseInt(gateValue);
        let curValue = "";
        if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.WingSuit)) { // 翅膀阶数
            curValue = Global.String.Format(Loca.getLang("翅膀阶数{0}"), theGateValue);
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.EquipSuit)) { // 装备阶数
            curValue = Global.String.Format(Loca.getLang("装备阶数{0}"), theGateValue);
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.QiangHuaLevel)) { // 强化等级
            curValue = Global.String.Format(Loca.getLang("强化等级{0}"), theGateValue);
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.ZhuiJiaLevel)) { // 附加等级
            curValue = Global.String.Format(Loca.getLang("附加等级{0}"), theGateValue);
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.ChengJiuLevel)) { // 成就阶数
            curValue = Global.String.Format(Loca.getLang("成就阶数{0}"), theGateValue);
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.JunXianLevel)) { // 军衔阶数
            curValue = Global.String.Format(Loca.getLang("军衔阶数{0}"), theGateValue);
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.ZhuanShengLevel)) { // 角色重生数
            curValue = Global.String.Format(Loca.getLang("角色重生数{0}"), theGateValue);
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.Level)) { // 角色等级
            curValue = Global.String.Format(Loca.getLang("角色等级{0}"), theGateValue);
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.HuFuSuit)) { // 护身符阶数
            curValue = Global.String.Format(Loca.getLang("护身符阶数{0}"), theGateValue);
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.PetLevel)) { // 宠物等级
            curValue = Global.String.Format(Loca.getLang("宠物等级{0}"), theGateValue);
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.YuanSuZhiXinLevel)) { // 元素之心等级
            curValue = Global.String.Format(Loca.getLang("元素之心等级{0}"), theGateValue);
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.DaTianShiSuit)) { // 大天使阶数
            curValue = Global.String.Format(Loca.getLang("传说装阶数{0}"), theGateValue);
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.VIP)) { // VIP等级
            curValue = Global.String.Format(Loca.getLang("贵族等级{0}"), theGateValue);
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.NeedTask)) { // 主线任务
            const voTask = tableMgr.tasksTable.Find(theGateValue);
            if (voTask) {
                curValue = Global.String.Format(Loca.getLang("需要完成{0}重{1}级主线任务{2}"), voTask.MinZhuanSheng, voTask.MinLevel, voTask.Title);
            }
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.CanNotBeyondLevel)) { // 等级
            const aStrVal = gateValue.split("|");
            curValue = Global.String.Format(Loca.getLang("达到{0}重{1}级以上无法使用"), aStrVal[0], aStrVal[1]);
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.FEIANQUANQU)) { // 安全区
            curValue = Loca.getLang("不能在安全区使用");
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.NeedMarry)) { // 需要结婚
            curValue = Loca.getLang("结婚");
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.NeedBangHui)) { // 需要帮会
            curValue = Loca.getLang("加入帮会");
        }
        if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.JunXianLevel)) { // 要对军衔进行特殊处理
            // TODO: 军衔表暂时没有
            // XElement xml = Global.GetGameResXml(Global.GAME_CONFIG_JUNXIAN_FILE);
            // Dictionary < string, string > DcJunxianXml = new Dictionary<string, string>();
            // if (null != xml) {
            //     List < XElement > JunxianXmlList = (List<XElement>)Global.GetXElementList(Global.GetXElement(xml, "Config"), "*");
            //     for (int j = 0; j < JunxianXmlList.Count; ++j )
            //     // foreach (var item in JunxianXmlList)
            //     {
            //         XElement item = JunxianXmlList[j];
            //         DcJunxianXml.Add(item.Attribute("Level").Value, item.Attribute("Name").Value);
            //     }
            // }
            // curValue = curValue.Replace(gateValue, DcJunxianXml[gateValue]);
        }
        else if (Global.String.isEqualIgnoreCase(type, GoodRequirementTypes.ChengJiuLevel)) {
            const aCJiuGoodsIDs = tableMgr.sysParamsTable.getParamIntArray("ChengJiuBufferGoodsIDs");
            if (aCJiuGoodsIDs) {
                curValue = curValue.replace(gateValue, tableMgr.goodsTable.getName(aCJiuGoodsIDs[theGateValue]));
            }
        }
        return curValue;
    }
    /**
     * 是否判断职业
     * @param goodsID 道具ID
     */
    function JugeOccupationGoodsID(goodsID) {
        const skillBooksGoodsIDs = tableMgr.sysParamsTable.getParam("SkillBooksGoodsIDs");
        const goodsIDList = skillBooksGoodsIDs.split(",");
        for (let i = 0; i < goodsIDList.length; i++) {
            if (goodsIDList[i] === goodsID.toString()) {
                return true;
            }
        }
        return false;
    }
    Global.JugeOccupationGoodsID = JugeOccupationGoodsID;
    /**
     * 是否够使用物品的条件
     * @param goodsID
     * @param errHint
     * @param jugeOccupation
     * @param bJudgeAttr 是否包含属性条件判断
     */
    function CanUseGoods(goodsID, errHint = true, jugeOccupation = true, bJudgeAttr = true) {
        const goodVO = tableMgr.goodsTable.Find(goodsID);
        if (!goodVO)
            return false;
        const goodsName = Loca.getLang(goodVO.Title);
        const categoriy = goodVO.Categoriy;
        const toOccupation = goodVO.ToOccupation;
        const toLevel = goodVO.ToLevel;
        const execMagic = TableUtils.getFieldString(goodVO.ExecMagic);
        const toSex = goodVO.ToSex; /// 0男 1女
        const tozhuangsheng = goodVO.ToZhuanSheng;
        // 特殊的额外限制，由ToType 决定 ToTypeProperty值的意义，不同项用逗号隔开
        const toType = goodVO.ToType.toString();
        const toTypeProperty = goodVO.ToTypeProperty.toString();
        const baoguoID = goodVO.BaoguoID.toString();
        if (!jugeOccupation) {
            jugeOccupation = JugeOccupationGoodsID(goodsID);
        }
        if (jugeOccupation) {
            if (toOccupation >= 0) {
                if (0 === ((1 << Global.CalcOriginalOccupationID(Global.Data.roleData.Occupation)) & toOccupation)) {
                    if (errHint) {
                        uiMgr.hintText(Loca.getLang("职业不对应，不能使用！"));
                    }
                    return false;
                }
            }
        }
        if (bJudgeAttr) {
            if (!CanUseGoodsAttr(goodsID, errHint)) {
                return false;
            }
        }
        if (ItemCategories.Fashion === categoriy) {
            if (Global.IsOperateUnPermitInKuaFuMapCheck(errHint, true)) {
                return false;
            }
        }
        if (errHint) {
            const autoAddLifeVGoodsIDs = tableMgr.sysParamsTable.getParam("AutoAddLifeVGoodsIDs");
            if (-1 !== autoAddLifeVGoodsIDs.indexOf(goodsID.toString())) {
                if (Global.Data.roleData.LifeV >= Global.Data.roleData.MaxLifeV || Global.Data.roleData.LifeV <= 0) {
                    uiMgr.hintText(Loca.getLang("您当前的状态无需使用生命药品！"));
                    return false;
                }
            }
            const autoAddMagicVGoodsIDs = tableMgr.sysParamsTable.getParam("AutoAddMagicVGoodsIDs");
            if (-1 !== autoAddMagicVGoodsIDs.indexOf(goodsID.toString())) {
                if (Global.Data.roleData.MagicV >= Global.Data.roleData.MaxMagicV || Global.Data.roleData.LifeV <= 0) {
                    uiMgr.hintText(Loca.getLang("您当前的状态无需使用魔法药品！"));
                    return false;
                }
            }
            if (execMagic && -1 !== execMagic.indexOf("SUB_ZUIEZHI")) {
                if (Global.Data.roleData.PKValue <= 0) {
                    uiMgr.hintText(Global.String.Format(Loca.getLang("罪恶值已经为0，不需要使用【{0}】"), goodsName));
                    return false;
                }
            }
        }
        const mapLimit = GetGoodsToTypeLimitString(goodsID);
        for (const [key, value] of mapLimit) {
            if (value !== 1) { // 条件不成立
                return false;
            }
        }
        return true;
    }
    Global.CanUseGoods = CanUseGoods;
    /**
     * 属性条件判断是否够使用物品
     * @param goodsID
     * @param errHint
     */
    function CanUseGoodsAttr(goodsID, errHint) {
        const goodVO = tableMgr.goodsTable.Find(goodsID);
        if (!goodVO)
            return false;
        const categoriy = goodVO.Categoriy;
        const toOccupation = Global.CalcOriginalOccupationID(goodVO.ToOccupation);
        const toLevel = goodVO.ToLevel;
        const toSex = goodVO.ToSex; /// 0男 1女
        const tozhuangsheng = goodVO.ToZhuanSheng;
        // 特殊的额外限制，由ToType 决定 ToTypeProperty值的意义，不同项用逗号隔开
        const toType = goodVO.ToType.toString();
        const toTypeProperty = goodVO.ToTypeProperty.toString();
        const baoguoID = goodVO.BaoguoID;
        // 首先判断通用限制条件是否满足
        if (!CanUseGoodsByExtraTypeProperty(toType, toTypeProperty, errHint)) {
            if (baoguoID === -1) {
                return false;
            }
        }
        if (toSex >= 0) {
            if (Global.Data.roleData.RoleSex !== toSex) {
                if (errHint)
                    uiMgr.hintText(Loca.getLang("性别不对应，不能使用！"));
                return false;
            }
        }
        if (tozhuangsheng >= 0) {
            if (categoriy !== ItemCategories.ItemNormalPack && categoriy !== ItemCategories.ItemUpPack) {
                if (Global.Data.roleData.ChangeLifeCount === tozhuangsheng) {
                    if (toLevel >= 0) {
                        if (Global.Data.roleData.Level < toLevel) {
                            if (errHint)
                                uiMgr.hintText(Loca.getLang("只有等级达到要求才能可使用！"));
                            return false;
                        }
                    }
                }
                else if (Global.Data.roleData.ChangeLifeCount < tozhuangsheng) {
                    if (errHint)
                        uiMgr.hintText(Loca.getLang("只有重生等级达到要求才能可使用！"));
                    return false;
                }
            }
        }
        if (categoriy >= 0 && categoriy < ItemCategories.EquipMax) {
            if (Global.GetCurrentRoleProp(1, UnitPropIndexes.Strength) < goodVO.Strength) {
                if (errHint)
                    uiMgr.hintText(Loca.getLang("您当前的力量值不够，无法佩戴！"));
                return false;
            }
            else if (Global.GetCurrentRoleProp(1, UnitPropIndexes.Intelligence) < goodVO.Intelligence) {
                if (errHint)
                    uiMgr.hintText(Loca.getLang("您当前的智力值不够，无法佩戴！"));
                return false;
            }
            else if (Global.GetCurrentRoleProp(1, UnitPropIndexes.Dexterity) < goodVO.Dexterity) {
                if (errHint)
                    uiMgr.hintText(Loca.getLang("您当前的敏捷值不够，无法佩戴！"));
                return false;
            }
            else if (Global.GetCurrentRoleProp(1, UnitPropIndexes.Constitution) < goodVO.Constitution) {
                if (errHint)
                    uiMgr.hintText(Loca.getLang("您当前的体力值不够，无法佩戴！"));
                return false;
            }
        }
        return true;
    }
    Global.CanUseGoodsAttr = CanUseGoodsAttr;
    /**
     * 获取物品项(数量可能大于1)的价格
     * @param goodsData
     * @param calcTotal
     */
    function GetGoodsDataPrice(goodsData, calcTotal = true) {
        if (null == goodsData)
            return 0;
        if (goodsData.GCount <= 0)
            return 0;
        const goodVO = tableMgr.goodsTable.Find(goodsData.GoodsID);
        if (null == goodVO)
            return 0;
        const suitID = goodVO.SuitID;
        let level = goodsData.ForgeLevel;
        if (level > Global.MaxForgeLevel()) { // 防止作弊
            level = 0;
        }
        let totalLevel = 0;
        for (let i = 0; i <= level && i <= Global.MaxForgeLevel(); i++) {
            totalLevel += i;
        }
        let quality = goodsData.Quality;
        if (quality >= GoodsQuality.Max) {
            quality = GoodsQuality.Gold;
        }
        let totalQuality = 0;
        for (let i = 0; i <= quality; i++) {
            totalQuality += i;
        }
        const origPrice = -1;
        const value = origPrice + origPrice * ((totalQuality * 0.20) + (totalLevel * 0.05));
        let equipPrice = Math.floor(value);
        if (level > Global.MaxForgeLevel()) { // 10级一下单独计算属性
            equipPrice += Math.floor((0.50 + (level - 9) * 0.01) * (level - 10) * origPrice);
        }
        if (calcTotal) {
            equipPrice *= goodsData.GCount;
        }
        equipPrice = Math.abs(equipPrice);
        return equipPrice;
    }
    Global.GetGoodsDataPrice = GetGoodsDataPrice;
    /**
     * 判断两个时间是否相等
     * @param strDateTime1 时间1
     * @param strDateTime2 时间2
     */
    function DateTimeEqual(strDateTime1, strDateTime2) {
        const date1 = Date.parse(strDateTime1);
        if (isNaN(date1)) {
            return false;
        }
        const date2 = Date.parse(strDateTime2);
        if (isNaN(date2)) {
            return false;
        }
        return date1 === date2;
    }
    /**
     * 是否限制时间的物品
     * @param goodsData
     */
    function IsTimeLimitGoods(goodsData) {
        if (Global.String.IsNullOrWhiteSpace(goodsData.Endtime)) {
            return false;
        }
        if (DateTimeEqual(goodsData.Endtime, Global.ConstGoodsEndTime)) {
            return false;
        }
        return true;
    }
    Global.IsTimeLimitGoods = IsTimeLimitGoods;
    /**
     * 限制时间的物品是否过期
     * @param goodsData
     */
    function IsGoodsTimeOver(goodsData) {
        if (!IsTimeLimitGoods(goodsData)) { // 如果非限时物品
            return false;
        }
        const nowTicks = TimeManager.getCorrectLocalTime();
        const goodsEndTicks = TimeManager.safeConvertToTicks(goodsData.Endtime);
        return nowTicks >= goodsEndTicks;
    }
    Global.IsGoodsTimeOver = IsGoodsTimeOver;
    /**
     * 根据物品id返回一个傀儡物品对象，用于tips显示，当自己背包里面没有该物品时使用
     * @param goodsID
     */
    function GetDummyGoodsData(goodsID) {
        const goodVO = tableMgr.goodsTable.Find(goodsID);
        if (null == goodVO)
            return null;
        const goodsData = new NetMsg.GoodsData();
        goodsData.Id = -1;
        goodsData.GoodsID = goodsID;
        goodsData.Using = -1;
        goodsData.ForgeLevel = 0;
        goodsData.Starttime = Global.ConstGoodsEndTime;
        goodsData.Endtime = Global.ConstGoodsEndTime;
        goodsData.Site = 0; // 假定在背包，反正不用
        goodsData.Quality = 0;
        goodsData.Props = "";
        goodsData.GCount = Math.max(1, goodVO.UsingNum);
        goodsData.Binding = 0;
        goodsData.Jewellist = "";
        goodsData.BagIndex = 0;
        goodsData.AddPropIndex = 0;
        goodsData.BornIndex = 0;
        goodsData.Lucky = 0;
        goodsData.Strong = 0;
        goodsData.ExcellenceInfo = 0;
        goodsData.AppendPropLev = 0;
        goodsData.ChangeLifeLevForEquip = 0;
        return goodsData;
    }
    Global.GetDummyGoodsData = GetDummyGoodsData;
    /**
     * 返回一个傀儡物品对象
     * @param goodsID
     * @param forgeLevel
     * @param quality
     * @param binding
     * @param gcount
     * @param bornIndex
     */
    function GetDummyGoodsDataEx(goodsID, forgeLevel, quality, binding, gcount, bornIndex) {
        const goodsData = new NetMsg.GoodsData();
        goodsData.Id = -1;
        goodsData.GoodsID = goodsID;
        goodsData.Using = 0;
        goodsData.ForgeLevel = forgeLevel;
        goodsData.Starttime = Global.ConstGoodsEndTime;
        goodsData.Endtime = Global.ConstGoodsEndTime;
        goodsData.Site = 0;
        goodsData.Quality = quality;
        goodsData.Props = "";
        goodsData.GCount = gcount;
        goodsData.Binding = binding;
        goodsData.Jewellist = "";
        goodsData.BagIndex = 0;
        goodsData.SaleMoney1 = 0;
        goodsData.SaleYuanBao = 0;
        goodsData.SaleYinPiao = 0;
        goodsData.AddPropIndex = 0;
        goodsData.BornIndex = bornIndex;
        goodsData.Lucky = 0;
        goodsData.Strong = 0;
        goodsData.ExcellenceInfo = 0;
        goodsData.AppendPropLev = 0;
        goodsData.ChangeLifeLevForEquip = 0;
        return goodsData;
    }
    Global.GetDummyGoodsDataEx = GetDummyGoodsDataEx;
    /**
     * 返回一个傀儡物品对象，如果不需要此属性，默认写0
     * @param goodsID
     * @param forgeLevel
     * @param zhuijiaLevel
     * @param zhuoyueIndex
     * @param lucky
     * @param binding
     * @param gcount
     * @param zhuanshengLevel
     * @param washProps
     * @param startTime
     * @param endTime
     */
    function GetDummyGoodsDataMu(goodsID, forgeLevel = 0, zhuijiaLevel = 0, zhuoyueIndex = 0, lucky = 0, binding = 0, gcount = 0, zhuanshengLevel = 0, washProps = null, startTime = Global.ConstGoodsEndTime, endTime = Global.ConstGoodsEndTime) {
        const goodsData = new NetMsg.GoodsData();
        goodsData.Id = -1;
        goodsData.GoodsID = goodsID;
        goodsData.Using = -1;
        goodsData.Starttime = startTime;
        goodsData.Endtime = endTime;
        goodsData.Site = 0;
        goodsData.Props = "";
        goodsData.Jewellist = "";
        goodsData.BagIndex = 0;
        goodsData.SaleMoney1 = 0;
        goodsData.SaleYuanBao = 0;
        goodsData.SaleYinPiao = 0;
        goodsData.AddPropIndex = 0;
        goodsData.Strong = 0;
        goodsData.ForgeLevel = forgeLevel;
        goodsData.AppendPropLev = zhuijiaLevel;
        goodsData.ExcellenceInfo = zhuoyueIndex;
        goodsData.Lucky = lucky;
        goodsData.Binding = binding;
        goodsData.GCount = gcount;
        goodsData.ChangeLifeLevForEquip = zhuanshengLevel;
        goodsData.WashProps = washProps;
        return goodsData;
    }
    Global.GetDummyGoodsDataMu = GetDummyGoodsDataMu;
    /**
     * 通过传人字符串解析数值内容
     * @param value "2002,2,1,0,0,0,0" => 道具ID，数量，绑定，强化，追加，幸运，卓越属性
     */
    function GetDummyGoodsDataStr(value) {
        const values = value.split(",");
        if (values.length >= 7) {
            return GetDummyGoodsDataMu(parseInt(values[0]), parseInt(values[3]), parseInt(values[4]), parseInt(values[6]), parseInt(values[5]), parseInt(values[2]), parseInt(values[1]));
        }
        else {
            return null;
        }
    }
    Global.GetDummyGoodsDataStr = GetDummyGoodsDataStr;
    /**
     * 克隆一个假的goodsdata
     * @param gd
     * @param bCloneUsing
     */
    function CloneGoodsData(gd, bCloneUsing = false) {
        const goodsData = new NetMsg.GoodsData();
        goodsData.Id = bCloneUsing ? gd.Id : -1;
        goodsData.GoodsID = gd.GoodsID;
        goodsData.Using = bCloneUsing ? gd.Using : -1;
        goodsData.Starttime = Global.ConstGoodsEndTime;
        goodsData.Endtime = Global.ConstGoodsEndTime;
        goodsData.Site = gd.Site;
        goodsData.Props = gd.Props;
        goodsData.Jewellist = gd.Jewellist;
        goodsData.BagIndex = gd.BagIndex;
        goodsData.SaleMoney1 = gd.SaleMoney1;
        goodsData.SaleYuanBao = gd.SaleYuanBao;
        goodsData.SaleYinPiao = gd.SaleYinPiao;
        goodsData.AddPropIndex = gd.AddPropIndex;
        goodsData.Strong = gd.Strong;
        goodsData.ForgeLevel = gd.ForgeLevel;
        goodsData.AppendPropLev = gd.AppendPropLev;
        goodsData.ExcellenceInfo = gd.ExcellenceInfo;
        goodsData.Lucky = gd.Lucky;
        goodsData.Binding = gd.Binding;
        goodsData.GCount = gd.GCount;
        goodsData.ChangeLifeLevForEquip = gd.ChangeLifeLevForEquip;
        goodsData.WashProps = gd.WashProps;
        goodsData.ElementhrtsProps = gd.ElementhrtsProps;
        return goodsData;
    }
    Global.CloneGoodsData = CloneGoodsData;
    /**
     * 得到一个假的装备物品数据
     * @param goodsID
     * @param forge_Level
     * @param bagIndex
     */
    function GetFakeEquipGoodsData(goodsID, forge_Level, bagIndex = 0) {
        const goodsData = GetDummyGoodsData(goodsID);
        if (!goodsData) {
            return null;
        }
        goodsData.ForgeLevel = forge_Level;
        goodsData.Using = 1;
        goodsData.BagIndex = bagIndex;
        return goodsData;
    }
    Global.GetFakeEquipGoodsData = GetFakeEquipGoodsData;
    /**
     * 获取人物身上的装备列表
     */
    function GetUsingGoodsDataList() {
        Super.GData.RoleUsingGoodsDataList.clear();
        const dic = Super.GData.RoleUsingGoodsDataList;
        // 添加正在使用的时装
        let lst = GetRoleFashionList();
        for (let i = 0; i < lst.length; ++i) {
            if (lst[i].Using > 0) {
                dic.set(lst[i].Id, lst[i]);
                break; // 时装正在穿的只可能有1个
            }
        }
        // 添加正在使用的道具
        lst = Global.Data.roleData.GoodsDataList;
        if (lst) {
            for (let i = 0; i < lst.length; i++) {
                if (lst[i].Using > 0) {
                    dic.set(lst[i].Id, lst[i]);
                }
            }
        }
        // 添加正在使用的骑宠
        lst = Global.Data.equipPet;
        if (lst) {
            for (let i = 0; i < lst.length; i++) {
                if (lst[i].Using > 0) {
                    dic.set(lst[i].Id, lst[i]);
                }
            }
        }
        return Super.GData.RoleUsingGoodsDataList;
    }
    Global.GetUsingGoodsDataList = GetUsingGoodsDataList;
    /**
     * 时装装的表独立出来了，在这个清理下
     */
    function ClearFashionAndTitleData() {
        Global.Data.fashionAndTitleList = null;
    }
    Global.ClearFashionAndTitleData = ClearFashionAndTitleData;
    /**
     * 更新身上已装备列表
     * @param gd
     */
    function UpdateRoleUsingGoodsDataList(gd) {
        if (!gd)
            return;
        if (Super.GData.RoleUsingGoodsDataList.has(gd.Id)) {
            Super.GData.RoleUsingGoodsDataList.set(gd.Id, gd);
        }
    }
    Global.UpdateRoleUsingGoodsDataList = UpdateRoleUsingGoodsDataList;
    const GoodsShaderIDsCachingDict = new Map(); // 物品的ShaderID列表缓存字典
    /**
     * 根据物品ID获取shaderID列表
     * @param goodsID 道具ID
     */
    function GetGoodsShaderIDArraysByID(goodsID) {
        let shaderIDs = null;
        if (GoodsShaderIDsCachingDict.has(goodsID)) {
            shaderIDs = GoodsShaderIDsCachingDict.get(goodsID);
            return shaderIDs;
        }
        const goodVO = tableMgr.goodsTable.Find(goodsID);
        if (!goodVO)
            return null;
        const shaderID = goodVO.ShaderID;
        shaderIDs = Global.String2IntArray(shaderID, ",");
        if (!shaderIDs)
            return null;
        GoodsShaderIDsCachingDict.set(goodsID, shaderIDs);
        return shaderIDs;
    }
    /**
     * 根据物品ID和强化等级获取shaderID
     * @param goodsID
     * @param forge_Level
     */
    function GetGoodsShaderIDsByID(goodsID, forge_Level) {
        if (forge_Level <= 0) {
            return 0;
        }
        const shaderIDs = GetGoodsShaderIDArraysByID(goodsID);
        if (!shaderIDs || forge_Level > shaderIDs.length) {
            return 0;
        }
        return shaderIDs[forge_Level - 1];
    }
    Global.GetGoodsShaderIDsByID = GetGoodsShaderIDsByID;
    /**
     * 计算武器的持有状态 <br/>
     * TODO:
     * 注意：weaponGameObjectList的类型原来为List<GameObject>，此处为了编译通过先改成Object[]，使用的人请注意
     * @param weaponGoodsDataList
     * @param weaponGameObjectList
     * @param occupation
     */
    function CalcWeaponState(weaponGoodsDataList, weaponGameObjectList, occupation) {
        if (weaponGoodsDataList == null || weaponGoodsDataList.length <= 0) {
            return WeaponStates.K;
        }
        let weaponState = WeaponStates.K;
        for (let i = 0; i < weaponGoodsDataList.length; i++) {
            const goodVO = tableMgr.goodsTable.Find(weaponGoodsDataList[i].GoodsID);
            if (!goodVO)
                continue;
            const categoriy = goodVO.Categoriy;
            if (categoriy >= ItemCategories.WuQi_Jian && categoriy <= ItemCategories.WuQi_Dao) {
                if (ItemCategories.WuQi_Dun === categoriy) {
                    continue;
                }
                const tempWS = Global.GetGoodsActionNameByID(weaponGoodsDataList[i].GoodsID);
                if (i > 0 && tempWS === WeaponStates.D && weaponState === WeaponStates.D) {
                    weaponState = WeaponStates.SD;
                    break;
                }
                weaponState = tempWS;
                if (weaponState !== WeaponStates.D) {
                    break;
                }
            }
        }
        if (0 === Global.CalcOriginalOccupationID(occupation)) { // 如果是战士
            if (weaponGameObjectList && weaponGameObjectList.length > 0) {
                for (let j = 0; j < weaponGameObjectList.length; j++) {
                    if (!weaponGameObjectList[j] || !weaponGameObjectList[j]["transform"] || !weaponGameObjectList[j]["transform"]["parent"]) {
                        continue;
                    }
                    if (weaponGameObjectList[j]["transform"]["parent"]["name"] === "zuoshou") {
                        weaponState = WeaponStates.SD;
                        break;
                    }
                }
            }
        }
        return weaponState;
    }
    Global.CalcWeaponState = CalcWeaponState;
    /**
     * 使用物品的通用接口,传入GoodsDBId
     * @param goodsDBId
     * @param needCheck
     */
    function ToUseGoodsDBId(goodsDBId, needCheck = true) {
        const goodsData = GetGoodsDataByDbID(goodsDBId);
        if (goodsData) {
            ToUseGoods(goodsData, needCheck);
        }
    }
    Global.ToUseGoodsDBId = ToUseGoodsDBId;
    /**
     * 当前地图是否显示跟随宠物
     */
    function IsShowPetInCurMap() {
        const vo = tableMgr.levelSettingTable.Find(Global.Data.roleData.MapCode);
        if (vo && vo.AllowShowPetType === 1) {
            return true;
        }
        return false;
    }
    Global.IsShowPetInCurMap = IsShowPetInCurMap;
    /**
     * 获取使用的骑乘
     */
    function GetActiveHorseGoodsData() {
        if (!Global.Data.equipPet)
            return null;
        for (let i = 0; i < Global.Data.equipPet.length; i++) {
            if (Global.Data.equipPet[i].Using === 1) {
                return Global.Data.equipPet[i];
            }
        }
        return null;
    }
    /**
     * 使用坐骑
     * @param failHint
     */
    function TryRideHorseOn(failHint = false) {
        // TODO:
    }
    Global.TryRideHorseOn = TryRideHorseOn;
    /**
     * 卸下坐骑
     */
    function TryRideHorseOff() {
        // TODO:
    }
    Global.TryRideHorseOff = TryRideHorseOff;
    /**
     * 快速骑乘机甲
     * @param failHint
     */
    function TryRideJiJiaOnFast(failHint = false) {
        // TODO:
    }
    Global.TryRideJiJiaOnFast = TryRideJiJiaOnFast;
    /**
     * 骑乘机甲
     * @param failHint
     * @param offHorse
     */
    function TryRideJiJiaOn(failHint = false, offHorse = true) {
        // TODO:
    }
    Global.TryRideJiJiaOn = TryRideJiJiaOn;
    /**
     * 下机甲
     * @param failHint
     */
    function TryRideJiJiaOff(failHint = false) {
        // TODO:
    }
    /**
     * 切换机甲
     * @param failHint
     */
    function TrySwitchJiJia(failHint = false) {
        // TODO:
    }
    Global.TrySwitchJiJia = TrySwitchJiJia;
    /**
     * 切换骑乘状态
     * @param failHint
     */
    function TrySwitchHorse(failHint = false) {
        // TODO:
        return true;
    }
    Global.TrySwitchHorse = TrySwitchHorse;
    /**
     * 获取是否正在骑乘状态
     */
    function GetIsRidingHorse() {
        const curHorseData = GetActiveHorseGoodsData();
        return curHorseData && curHorseData.Using === 1 && Global.Data.roleData.HorseDbID > 0;
    }
    Global.GetIsRidingHorse = GetIsRidingHorse;
    /**
     * 该接口仅获取当前主角是否骑乘机甲， 并不是获取当前是否是机甲状态
     */
    function GetIsRidingJiJia() {
        // TODO:
        return false;
    }
    Global.GetIsRidingJiJia = GetIsRidingJiJia;
    /**
     * 使用物品通用接口
     * @param goodsData
     * @param needCheck
     * @param isBatchUse
     * @param sParam
     */
    function ToUseGoods(goodsData, needCheck = true, isBatchUse = false, sParam = "") {
        if (needCheck) {
            if (!CanUseGoods(goodsData.GoodsID, true))
                return;
            if (!CanDirectUseGoods(goodsData.GoodsID, true))
                return;
            // 如果是buffer类物品，判断是否存在覆盖 和 需要覆盖提示
            if (!CheckBuffer(goodsData)) {
                return;
            }
        }
        const goodVO = tableMgr.goodsTable.Find(goodsData.GoodsID);
        if (!goodVO)
            return;
        let category = goodVO.Categoriy;
        if (category >= 0 && category < ItemCategories.EquipMax) {
            const actionType = goodVO.ActionType; // 佩戴方式
            const handType = goodVO.HandType; // 放置位置 
            let gdList = null;
            if (category >= ItemCategories.WuQi_Jian && category <= ItemCategories.WuQi_NuJianTong) { // 判断要佩戴的道具否是武器
                gdList = Super.FindWuQi(category, actionType, handType);
                Global.currentMJSType = Global.GetMJSType();
            }
            else {
                // 找出要除武器外要卸载的装备
                gdList = Super.FindEquip(category);
            }
            if (ItemCategories.MengChongWu !== category && ItemCategories.ChongWu !== category
                && ItemCategories.ShouHuChong !== category && ItemCategories.Fashion !== category) {
                const iEmptyGridCount = GetBaoGuoSpaceCount();
                // 如果包裹剩余空间小于要卸载装备的数量时不让卸载
                if (iEmptyGridCount < gdList.length) {
                    uiMgr.hintText(Loca.getLang("背包已满，请先清理出空闲位置后，再卸载装备..."));
                    return;
                }
            }
            for (let i = 0; i < gdList.length; i++) {
                if (null != gdList[i]) {
                    const gdBagIndex = goodsData.BagIndex; // goodsBox.FindByGoodsDbID(goodsData.Id);
                    if (gdList[i].Using === 1) {
                        gdList[i].Using = 0;
                        const unhandType = tableMgr.goodsTable.Find(gdList[i].GoodsID).HandType;
                        const ListgoodVO = tableMgr.goodsTable.Find(gdList[i].GoodsID);
                        if (ItemCategories.JieZhi !== category && unhandType !== HandTypes.ZuoYouShou) { // 戒指和手镯特殊处理，使用BagIndex标示左右, 0左, 1右
                            gdList[i].BagIndex = gdBagIndex; // 将位置替换
                        }
                        if (ItemCategories.Fashion !== category) {
                            Net.sendModGoods(ModGoodsTypes.EquipUnload, gdList[i].Id, gdList[i].GoodsID, gdList[i].Using, gdList[i].Site, gdList[i].GCount, gdList[i].BagIndex);
                            // 先删除身上装备列表,(卸载返回接口也会检测删除，这里这么做是为了因佩戴所引起的卸载会出现卸载指令还未返回就执行佩戴操作了，这样导致佩戴位置计算有问题)
                            if (Super.GData.RoleUsingGoodsDataList.has(gdList[i].Id)) {
                                Super.GData.RoleUsingGoodsDataList.delete(gdList[i].Id);
                            }
                        }
                    }
                }
            }
            if (goodsData.Using === 0) {
                goodsData.Using = ItemCategories.Fashion === category ? goodsData.Using : 1;
                // 穿戴前做装备条件判断========
                if (ItemCategories.JieZhi === category || handType === HandTypes.ZuoYouShou) { // 戒指和手镯特殊处理，使用BagIndex标示左右, 0左, 1右
                    // 对于戒指和手镯特殊处理，获取其要能放置的位置
                    if (category >= ItemCategories.WuQi_Jian && category <= ItemCategories.WuQi_NuJianTong) {
                        category = ItemCategories.WuQi_Jian;
                    }
                    if (category === ItemCategories.ChongWu) { // 守护宠和宠物共占同一个位置，同时只能佩戴一种
                        category = ItemCategories.ShouHuChong;
                    }
                    goodsData.BagIndex = Super.FindEquipBagIndex(category);
                }
                if ((3 === Global.Data.roleData.Occupation) && ItemCategories.WuQi_Zhang === category) { // 魔剑士装备魔杖时做特殊处理
                    goodsData.BagIndex = Super.FindEquipBagIndex(category);
                }
                if (ItemCategories.Fashion === category) {
                    let bCanSendActivateFashion = true;
                    const lst = GetRoleFashionList();
                    if (0 < lst.length) {
                        for (let j = 0; j < lst.length; ++j) {
                            if (goodsData.GoodsID === lst[j].GoodsID) {
                                bCanSendActivateFashion = false;
                                break;
                            }
                        }
                    }
                    const vo = tableMgr.shiZhuangLevelUpTable.FindByAttrAndValue("GoodsID", goodsData.GoodsID.toString());
                    if (vo && vo.Time !== -1) {
                        bCanSendActivateFashion = true;
                    }
                    if (bCanSendActivateFashion) {
                        const fashionInfo = GetFashionInfo();
                        if (fashionInfo.has(goodsData.GoodsID)) {
                            const outShiZhuangRes = fashionInfo.get(goodsData.GoodsID);
                            const occupation = Global.CalcOriginalOccupationID(Global.Data.roleData.Occupation);
                            if (outShiZhuangRes.has(occupation)) {
                                Net.sendActivateFashion(goodsData.Id);
                            }
                        }
                    }
                    else {
                        // TODO: 显示角色窗口
                        // (Super.GData.PlayZoneRoot as PlayZone).ShowGamePayerRoleWindow(GamePayerRolePart_PartID.GamePayerRolePart_ShiZhuang_Title, goodsData.GoodsID);
                    }
                }
                else {
                    Net.sendModGoods(ModGoodsTypes.EquipLoad, goodsData.Id, goodsData.GoodsID, goodsData.Using, goodsData.Site, goodsData.GCount, goodsData.BagIndex, sParam);
                }
            }
        }
        else {
            const stalling = Global.Data.IsInStalling();
            if (!stalling) {
                const gd = goodsData;
                if (gd) {
                    const canUseGoods = tableMgr.goodsTable.getUsingMode(gd.GoodsID) > 0;
                    if (canUseGoods) {
                        if (!Global.GoodsCoolDown(gd.GoodsID)) {
                            if (isBatchUse && gd.GCount > 1) {
                                // TODO: 显示某弹窗
                                // (Super.GData.PlayZoneRoot as PlayZone).ToShowUI(gd.Id);
                            }
                            else {
                                Net.sendUseGoods(gd.Id, gd.GoodsID);
                            }
                        }
                        else {
                            const goodsName = tableMgr.goodsTable.getName(gd.GoodsID);
                            uiMgr.hintText(Global.String.Format(Loca.getLang("【{0}】在冷却中, 无法使用"), goodsName));
                        }
                    }
                    else {
                        const uiGuanLianType = goodVO.GlUI;
                        if (uiGuanLianType > 0) {
                            // TODO: 显示某弹窗
                            // (Super.GData.PlayZoneRoot as PlayZone).ToShowUI(uiGuanLianType, gd.GoodsID);
                        }
                    }
                }
            }
        }
    }
    Global.ToUseGoods = ToUseGoods;
    /**
     * 判断物品是否绑定buffer,以及buffer是否存在和需要提示
     * @param GoodsData
     */
    function CheckBuffer(goodsData) {
        const goodsBufferId = GetGoodsBufferID(goodsData.GoodsID);
        // 没有绑定buffer，通过验证
        if (goodsBufferId < 0)
            return true;
        // 可以叠加的直接通过
        // 可以叠加的buffer很少，只有烤火，同类型vip, 不同类型vip会进行覆盖，同类型 和 不同类型的经验buffer不能叠加
        // 烤火
        if (BufferItemTypes.ZhuFu === goodsBufferId) {
            return true;
        }
        let hasCheck = false;
        // VIP
        if (BufferItemTypes.MonthVIP === goodsBufferId) {
            return true;
        }
        // 二锅头, 生命/魔法圣水, 幸运/卓越神水
        if (BufferItemTypes.ErGuoTou === goodsBufferId ||
            BufferItemTypes.TimeAddLifeNoShow === goodsBufferId ||
            BufferItemTypes.TimeAddMagicNoShow === goodsBufferId ||
            BufferItemTypes.SLDL_ADDLUCKYATTACKPERCENTTIMER === goodsBufferId ||
            BufferItemTypes.SLDL_ADDFATALATTACKPERCENTTIMER === goodsBufferId) {
            const bufferData = Global.GetBufferDataByID(goodsBufferId);
            if (null == bufferData) {
                return true;
            }
            // 过时了则表示不存在
            if (Global.IsBufferDataOver(bufferData)) {
                return true;
            }
            const multiExpNum = (bufferData.BufferVal & 0x00000000FFFFFFFF);
            const goodsID2 = (bufferData.BufferVal - multiExpNum) / Math.pow(2, 32);
            if (goodsData.GoodsID === goodsID2) {
                return true;
            }
            else {
                const bufferGoodsID = bufferData.BufferVal;
                if (goodsData.GoodsID === bufferGoodsID) {
                    return true;
                }
            }
            hasCheck = true;
        }
        // 经验buffer,经验buffer的bufferid有好几个，任何一个存在都不行
        // 五倍经验 三倍经验 和 双倍经验特殊处理一下
        const expArr = [
            BufferItemTypes.MutilExperience,
            BufferItemTypes.FiveExperience,
            BufferItemTypes.ThreeExperience,
            BufferItemTypes.DblExperience
        ];
        let currIndex = expArr.indexOf(goodsBufferId);
        if (currIndex >= 0) {
            let existExpBuffer = false;
            if (Global.GetBufferDataByGoodsID(goodsData.GoodsID) != null) {
                existExpBuffer = false;
            }
            else {
                for (let n = 0; n < expArr.length; n++) {
                    if (Global.IsBufferExist(expArr[n])) {
                        existExpBuffer = true;
                    }
                }
            }
            // 不存在其他的经验buffer，通过验证
            if (!existExpBuffer) {
                return true;
            }
            hasCheck = true;
        }
        // 如果是增加攻击力类型buffer，只要存在pk王buffer，则不能用
        const attackArr = [
            BufferItemTypes.TimeAddAttack,
            BufferItemTypes.TimeAddDSAttack,
            BufferItemTypes.TimeAddMAttack
        ];
        currIndex = attackArr.indexOf(goodsBufferId);
        if (currIndex >= 0 && Global.IsBufferExist(BufferItemTypes.PKKingBuffer)) {
            uiMgr.hintText(Loca.getLang("您已拥有怒斩·PK王BUFFER,不能使用该物品"));
            return false; // 直接返回不允许使用
        }
        // 对于其它的buffer，只要不存在，就返回true
        if (!hasCheck && !Global.IsBufferExist(goodsBufferId)) {
            return true;
        }
        // TODO: 确认窗口        
        // let goodVO = tableMgr.goodsTable.Find(goodsData.GoodsID);
        // if (goodVO) {
        //     let name = Loca.getLang(goodVO.Title);
        //     if (null != Super._ParcelPart) {
        //         GChildWindow messageBoxWindow = Super.ShowMessageBox(Super._ParcelPart.Container, 1, Loca.getLang("提示"), StringUtil.substitute(Loca.getLang("{0}关联buffer已经存在，使用后将覆盖原有状态，继续使用吗？"), name), (int)(((Super._ParcelPart.Width - 253) / 2)), (int)(((Super._ParcelPart.Height - 171) / 2)), (int)(Super._ParcelPart.Width), (int)(Super._ParcelPart.Height), 0.01, -Super._ParcelPart.transform.parent.localPosition);
        //         messageBoxWindow.ChildWindowClose = (s1, e1) => {
        //             int messageBoxReturn = messageBoxWindow.MessageBoxReturn;
        //             Super.CloseMessageBox(Super._ParcelPart.Container, messageBoxWindow);
        //             if (messageBoxReturn == 0) {
        //                 //通知服务器使用物品
        //                 ToUseGoods(goodsData, false);
        //             }
        //             else if (messageBoxReturn == 1) {
        //                 //Super.CloseChildWindow(Root, messageBoxWindow);
        //             }
        //             return true;
        //         };
        //     }
        // }
        return false;
    }
    /**
     * 判断是否是装备
     * @param goodsID
     */
    function IsEquip(goodsID) {
        const cat = Global.GetCategoriyByGoodsID(goodsID);
        if (cat >= ItemCategories.TouKui && cat < ItemCategories.EquipMax && cat !== ItemCategories.JieZhi && cat !== ItemCategories.XiangLian) {
            return true;
        }
        return false;
    }
    Global.IsEquip = IsEquip;
    /**
     * 判断换类型
     * @param goodsID
     */
    function GetChangeType(goodsID) {
        if (goodsID === -1) {
            return ModEquipTypes.Mod_Equip_All;
        }
        const categoriy = Global.GetCategoriyByGoodsID(goodsID);
        if (categoriy >= ItemCategories.WuQi_Jian && categoriy < ItemCategories.EquipMax) {
            return ModEquipTypes.Mod_Equip_Weapon;
        }
        else if (categoriy >= ItemCategories.TouKui && categoriy <= ItemCategories.XueZi) {
            return ModEquipTypes.Mod_Equip_Body;
        }
        else if (categoriy === ItemCategories.ChiBang) {
            return ModEquipTypes.Mod_Equip_Wing;
        }
        return ModEquipTypes.Mod_Equip_None;
    }
    Global.GetChangeType = GetChangeType;
    /**
     * 根据人物身上佩戴的装备对比背包、仓库和回收等装备的战斗力对比显示状态
     * @param icon
     * @param goodsData
     */
    function SetEquipGoodsZhanLiStat(icon, goodsData) {
        if (!icon || !goodsData) {
            return;
        }
        const goodVO = tableMgr.goodsTable.Find(goodsData.GoodsID);
        if (!goodVO)
            return;
        const category = goodVO.Categoriy;
        if (category >= ItemCategories.TouKui && category < ItemCategories.EquipMax) {
            // 特殊的额外限制，由ToType 决定 ToTypeProperty值的意义，不同项用逗号隔开
            const toType = goodVO.ToType.toString();
            const toTypeProperty = goodVO.ToTypeProperty.toString();
            const baoguoID = goodVO.BaoguoID.toString();
            // 首先判断通用限制条件是否满足
            if (!CanUseGoodsByExtraTypeProperty(toType, toTypeProperty, false)) {
                if (Global.String.IsNullOrEmpty(baoguoID)) {
                    return;
                }
            }
            // 判断职业
            if (0 === ((1 << Global.CalcOriginalOccupationID(Global.Data.roleData.Occupation)) & goodVO.ToOccupation)) {
                return;
            }
            let iEquipZl = 0;
            const actionType = goodVO.ActionType; // 佩戴方式
            const handType = goodVO.HandType; // 放置位置 
            let gdList = null;
            if (category >= ItemCategories.WuQi_Jian && category <= ItemCategories.WuQi_NuJianTong) { // 判断要佩戴的道具否是武器
                gdList = Super.FindWuQi(category, actionType, handType);
            }
            else { // 找出要除武器外要卸载的装备
                gdList = Super.FindEquip(category);
            }
            for (let i = 0; i < gdList.length; i++) {
                if (gdList[i] != null) {
                    iEquipZl += Global.GetGoodsDataZhanLi(gdList[i]);
                }
            }
            const zl = Global.GetGoodsDataZhanLi(goodsData);
            // TODO: 道具图标战力上升下降的标识更新
            // if (zl > iEquipZl) {
            // 	icon.ZhanLiSprite.spriteName = "xiangshang";
            // 	icon.ZhanLiSprite.gameObject.SetActive(true);
            // } else if (zl < iEquipZl) {
            // 	icon.ZhanLiSprite.spriteName = "xiangxia";
            // 	icon.ZhanLiSprite.gameObject.SetActive(true);
            // } else {
            // 	icon.ZhanLiSprite.gameObject.SetActive(false);
            // }
        }
    }
    Global.SetEquipGoodsZhanLiStat = SetEquipGoodsZhanLiStat;
    let CanUseGoodsByTaskDict = null;
    /**
     * 判断物品是否能够使用
     * 只有在功能没有开启的情况下，才返回false，默认返回true
     * @param goodsID
     */
    function IsCanUseGoodsByGongnengID(goodsID) {
        if (null == CanUseGoodsByTaskDict) {
            const str = tableMgr.sysParamsTable.getParam("ItemUse");
            if (Global.String.IsNullOrEmpty(str)) {
                return true;
            }
            const strArr = str.split("|");
            if (!strArr) {
                return true;
            }
            CanUseGoodsByTaskDict = new Map();
            for (let i = 0; i < strArr.length; i++) {
                const fields = strArr[i].split(",");
                const key = parseInt(fields[0]);
                const value = parseInt(fields[1]);
                if (!CanUseGoodsByTaskDict.has(key)) {
                    CanUseGoodsByTaskDict.set(key, value);
                }
            }
        }
        let id = 0;
        if (CanUseGoodsByTaskDict.has(goodsID)) {
            id = CanUseGoodsByTaskDict.get(goodsID);
            return GongnengYugaoMgr.HintGongNengOpened(id);
        }
        return true;
    }
    Global.IsCanUseGoodsByGongnengID = IsCanUseGoodsByGongnengID;
    //#region ////////////// 角色装备属性 //////////////
    // 锻造的加成属性比例    
    let ForgeLevelAddAttackRates = null; // 加成攻击
    let ForgeLevelAddDefenseRates = null; // 加成防御
    let ForgeLevelAddMaxLifeVRates = null; // 加成生命上限
    let ForgeLevelPet = null; // 宠物属性加成
    let ChiBangForgeLevelAddDefenseRates = null; // 翅膀加成防御
    let ChiBangForgeLevelAddShangHaiJiaCheng = null; // 翅膀伤害加成
    let ChiBangForgeLevelAddShangHaiXiShou = null; // 翅膀伤害吸收
    const EnchanceLevelAddRates = null; // 提品的的成功概率
    /**
     * 返回装备强化激活的附加值---->这个附加值，如果直接读取配置文件，并将激活的相关项进行累加，
     * 可能强化+3 加了 100 生命，强化+5 又激活了200生命，则总共激活 300生命，
     * 如果是加最大生命百分比的，则可能出现 0.02 + 0.05 = 0.07 的返回值，这个返回值，可直接
     * 用于强化激活列表显示，在角色基础属性部分，除去生命之外，其它的加成显示采用这个返回值就行，
     * 对于生命，得采用特殊的计算方式，因为生命增加有 绝对值增加和 百分比增加两种情况，需要统一起来
     * @param gd
     * @param extPropIndex
     */
    function GetEquipForgeAddActiveExtraValue(gd, extPropIndex) {
        // 不满足条件的直接返回
        if (gd.ForgeLevel <= 0 || gd.ForgeLevel > Global.MaxForgeLevel()) {
            return 0;
        }
        if (extPropIndex < 0 || extPropIndex >= ExtPropIndexes.Max) {
            return 0;
        }
        // 属性key 带最大最小的攻击防御需要去掉前缀，当然，生命最大上限不能去
        let extPropKey = ExtPropIndexesExt.ExtPropIndexNames[extPropIndex]; // Lee
        extPropKey = extPropKey.toLowerCase(); // 转换为小写
        let isMaxProp = false;
        if (extPropIndex >= ExtPropIndexes.MinDefense && extPropIndex <= ExtPropIndexes.MaxMAttack
            && extPropKey.length > 3 && (0 === extPropKey.indexOf("min") || 0 === extPropKey.indexOf("max"))) { // 有最大最小的，将前缀 max 和 min去掉
            isMaxProp = ("max" === extPropKey.substring(0, 3)); // 如果有max前缀，激活的附加值需要取后半部分
            extPropKey = extPropKey.substring(3);
        }
        const goodsForgeLevel = gd.ForgeLevel;
        let ret = 0;
        // 得到激活列表，然后一个一个比较
        const activateList = GetEquipForgeAddActivateList(gd.GoodsID);
        for (let index = 0; index < activateList.length; index++) {
            const activateItem = activateList[index].toString().split(",");
            if (3 !== activateItem.length)
                continue;
            const level = parseInt(activateItem[0]);
            const key = activateItem[1].toString().toLowerCase();
            // 强化等级大于等于设定值，且属性索引一致
            if (goodsForgeLevel >= level && extPropKey === key) {
                let addValue = 0;
                // 兼容两种格式 最大值时取后面的值，否则统一取前面的值 5,Mdefense,20-40  3,MaxLifePercent,0.05
                if (isMaxProp && 2 === activateItem[2].toString().split("-").length) {
                    addValue = parseInt(activateItem[2].split("-")[1]);
                }
                else {
                    addValue = parseInt(activateItem[2].split("-")[0]);
                }
                ret += addValue;
            }
        }
        return ret;
    }
    Global.GetEquipForgeAddActiveExtraValue = GetEquipForgeAddActiveExtraValue;
    /**
     * 返回装备因强化增加的额外生命值---包括绝对生命值 和 百分比生命值的加成值
     * @param gd
     */
    function GetEquipForgeAddActiveExtraLifeValue(gd) {
        const baseLifeV = Global.GetRoleBaseLifeV(Global.Data.roleData.Occupation, Global.Data.roleData.Level);
        const absAddLife = Global.GetEquipForgeAddActiveExtraValue(gd, ExtPropIndexes.MaxLifeV); // Lee
        const percentAddLife = Global.GetEquipForgeAddActiveExtraValue(gd, ExtPropIndexes.MaxLifePercent);
        const absPercentAdd = baseLifeV * percentAddLife;
        return Math.floor(absAddLife + absPercentAdd);
    }
    Global.GetEquipForgeAddActiveExtraLifeValue = GetEquipForgeAddActiveExtraLifeValue;
    /**
     * 返回角色的基础生命值，由职业和等级决定
     * @param occupation
     * @param level
     */
    function GetRoleBaseLifeV(occupation, level) {
        const vo = tableMgr.occuBaseAttrTable.Find(occupation);
        // TODO: 这个表在转换出来的时候省略掉了值为0的属性，所以这里到时候需要验证一下职业为0的时候能否取到VO
        if (!vo)
            return 0;
        const voLevel = vo.levelBaseAttrList[level];
        if (!voLevel)
            return 0;
        return voLevel.LifeV;
    }
    Global.GetRoleBaseLifeV = GetRoleBaseLifeV;
    /**
     * 返回物品的装备属性列表，除非没配置，否则起码会返回0列表，返回double list，这个函数绝不返回null
     * @param goodsID
     */
    function GetGoodsEquipPropsDoubleList(goodsID) {
        let equipFields = [];
        // 查找物品项，找到相关强化索引参数ExecMagic
        const voGoods = tableMgr.goodsTable.Find(goodsID);
        if (voGoods) {
            equipFields = voGoods.EquipProps; // 物品的装备属性
        }
        while (equipFields.length < ExtPropIndexes.Max) {
            equipFields.push(0); // 不断的塞0填充就行了 作为装备，不配置，当然全部用默认值0了
        }
        return equipFields;
    }
    Global.GetGoodsEquipPropsDoubleList = GetGoodsEquipPropsDoubleList;
    /**
     * 根据buffer类型 和 索引类型找到buffer对应物品的ID，主要用于经脉 武学 成就buffer
     * index == level -1 这很重要，配置文件中就是这个顺序配置的
     * @param bufferType
     * @param index
     */
    function GetBufferGoodsID(bufferType, index) {
        if (index < 0)
            return 0;
        let paramName = "";
        if (bufferType === BufferItemTypes.ChengJiu) {
            paramName = "ChengJiuBufferGoodsIDs";
        }
        else if (bufferType === BufferItemTypes.JingMai) {
            paramName = "JingMaiBufferGoodsIDs";
        }
        else if (bufferType === BufferItemTypes.WuXue) {
            paramName = "WuXueBufferGoodsIDs";
        }
        else if (bufferType === BufferItemTypes.ZuanHuang) {
            paramName = "ZhuanhuangBufferGoodsIDs";
        }
        else if (bufferType === BufferItemTypes.ZhanHun) {
            paramName = "ZhanhunBufferGoodsIDs";
        }
        else if (bufferType === BufferItemTypes.RongYu) {
            paramName = "RongyaoBufferGoodsIDs";
        }
        else if (bufferType === BufferItemTypes.JunQi) {
            paramName = "JunQiBufferGoodsIDs";
        }
        else if (bufferType === BufferItemTypes.SLDL_ANGELTEMPLEBUFF2) {
            paramName = "AngelTempleGoldBuffGoodsID";
        }
        else if (bufferType === BufferItemTypes.ZuanHuang) {
            paramName = "ZhuanhuangBufferGoodsIDs";
        }
        else if (bufferType === BufferItemTypes.SLDL_ZHANMENGBUILD_ZHANQI) {
            paramName = "ZhanMengZhanQiBUFF";
        }
        else if (bufferType === BufferItemTypes.SLDL_ZHANMENGBUILD_JITAN) {
            paramName = "ZhanMengJiTanBUFF";
        }
        else if (bufferType === BufferItemTypes.SLDL_ZHANMENGBUILD_JUNXIE) {
            paramName = "ZhanMengJunXieBUFF";
        }
        else if (bufferType === BufferItemTypes.SLDL_ZHANMENGBUILD_GUANGHUAN) {
            paramName = "ZhanMengGuangHuanBUFF";
        }
        else if (bufferType === BufferItemTypes.PKKingBuffer) {
            paramName = "PkKingBuff";
        }
        else if (bufferType === BufferItemTypes.SLDL_JINGJICHANG_JUNXIAN) {
            paramName = "JunXianBufferGoodsIDs";
        }
        else if (bufferType === BufferItemTypes.SLDL_ANGELTEMPLEBUFF1 || bufferType === BufferItemTypes.SLDL_ANGELTEMPLEBUFF2) {
            paramName = "AngelTempleGoldBuffGoodsID";
        }
        else if (bufferType === BufferItemTypes.LangHunLingYu_ChengHao) {
            paramName = "LangHunLingYuBuff"; // LangHunLingYuBuff  狼魂领域称号以Buff的形式添加
        }
        else if (bufferType === BufferItemTypes.ZhongShenZhiShen_ChengHao) {
            paramName = "ZhongShenZhiShenBuff"; // ZhongShenZhiShenBuff  众神争霸称号以Buff的形式添加
        }
        else if (bufferType === BufferItemTypes.CoupleArena_YongQi_Buff) {
            paramName = "CoupleBuffSpecificHurt";
        }
        else if (bufferType === BufferItemTypes.CoupleArena_ZhenAi_Buff) {
            paramName = "CoupleVictoryNeedTime";
        }
        if (paramName.length <= 0)
            return 0;
        const buffGoodsIDs = tableMgr.sysParamsTable.getParamIntArray(paramName);
        if (!buffGoodsIDs || index > buffGoodsIDs.length - 1) {
            return 0;
        }
        return buffGoodsIDs[index];
    }
    Global.GetBufferGoodsID = GetBufferGoodsID;
    /**
     * 返回用于buffer显示用的附加属性描述字符串
     * @param goodsID
     */
    function GetGoodsEquipPropsStringForBufferTips(goodsID) {
        const propsList = Global.GetGoodsEquipPropsDoubleList(goodsID);
        let stringDesc = "";
        for (let n = 0; n < propsList.length; n++) {
            if (propsList[n] > 0) {
                const name = Loca.getLang(ExtPropIndexes.ExtPropIndexChineseNames[n]);
                let value = (propsList[n]).toString();
                if (ExtPropIndexes.ExtPropIndexPercents[n] > 0) { // 带百分比的值
                    value = `+${propsList[n] * 100}%`;
                }
                else if (n >= 2 && n <= 10) { // 攻击防御都是最大最小值
                    value = `${value}-${propsList[n + 1]}`;
                    n++;
                }
                if (stringDesc.length > 0) {
                    stringDesc += "\n";
                }
                stringDesc += `${name}: ${value}\n`;
            }
        }
        return stringDesc;
    }
    Global.GetGoodsEquipPropsStringForBufferTips = GetGoodsEquipPropsStringForBufferTips;
    /**
     * 返回物品的强化激活列表 每一项都是 5,Mdefense,20-40 或者 3,MaxLifePercent,0.05 没找到则返回空列表
     * 强化列表内各项全部转换成小写
     * @param goodsID
     */
    function GetEquipForgeAddActivateList(goodsID) {
        // 查找物品项，找到相关强化索引参数ExecMagic
        const goodVO = tableMgr.goodsTable.Find(goodsID);
        if (!goodVO)
            return null;
        // DB_ADD_YINYONG(1,1) 也可能只有一个参数，第一个是强化标签，第二个是天生标签 分别对应 QiangHua.Xml 和 另外的xml
        const execMagicString = TableUtils.getFieldString(goodVO.ExecMagic);
        if (execMagicString.indexOf("DB_ADD_YINYONG") < 0) {
            return null;
        }
        const posLeftBracket = execMagicString.indexOf("(");
        const posDot = execMagicString.indexOf(",");
        if (posDot - (posLeftBracket + 1) <= 0) {
            return null;
        }
        // 得到强化索引
        const forgeIndex = parseInt(execMagicString.substring(posLeftBracket + 1, posDot - (posLeftBracket + 1)));
        if (forgeIndex < 0) {
            return null;
        }
        const vo = tableMgr.qiangHuaTable.Find(forgeIndex);
        if (!vo)
            return null;
        return vo.QiangHua.split("|");
    }
    Global.GetEquipForgeAddActivateList = GetEquipForgeAddActivateList;
    /**
     * 返回装备强化增加的基础值
     * @param gd 装备数据
     * @param extPropIndex 属性索引
     */
    function GetEquipForgeAddBaseValue(gd, extPropIndex) {
        const forgeLevel = gd.ForgeLevel;
        // 由于强化开关处于关掉状态，装备在15阶以上，Tips里的属性强化值为0，所以将此处的最大等级条件限制写死为20，原为(Global.MaxForgeLevel)
        const nCategory = Global.GetCategoriyByGoodsID(gd.GoodsID);
        if ((forgeLevel > 20 || forgeLevel <= 0) && (ItemCategories.ChongWu !== nCategory && ItemCategories.ShouHuChong !== nCategory)) {
            return 0;
        }
        if (nCategory === ItemCategories.ChiBang) { // 如果获取的是翅膀的强化信息
            if (extPropIndex === ExtPropIndexes.MaxDefense || extPropIndex === ExtPropIndexes.MaxMDefense) {
                if (null == ChiBangForgeLevelAddDefenseRates) { // 防御
                    ChiBangForgeLevelAddDefenseRates = tableMgr.sysParamsTable.getParamDoubleArray("WingForgeLevelAddDefenseRates");
                }
                return ChiBangForgeLevelAddDefenseRates[forgeLevel];
            }
            else if (extPropIndex === ExtPropIndexes.AddAttackInjurePercent) {
                if (null == ChiBangForgeLevelAddShangHaiJiaCheng) { // 伤害加成百分比
                    ChiBangForgeLevelAddShangHaiJiaCheng = tableMgr.sysParamsTable.getParamDoubleArray("WingForgeLevelAddShangHaiJiaCheng");
                }
                return ChiBangForgeLevelAddShangHaiJiaCheng[forgeLevel];
            }
            else if (extPropIndex === ExtPropIndexes.SubAttackInjurePercent) {
                if (null == ChiBangForgeLevelAddShangHaiXiShou) { // 伤害吸收百分比
                    ChiBangForgeLevelAddShangHaiXiShou = tableMgr.sysParamsTable.getParamDoubleArray("WingForgeLevelAddShangHaiXiShou");
                }
                return ChiBangForgeLevelAddShangHaiXiShou[forgeLevel];
            }
        }
        else if (ItemCategories.ChongWu === nCategory || ItemCategories.ShouHuChong === nCategory) {
            if (null == ForgeLevelPet) {
                ForgeLevelPet = [];
                const value = tableMgr.sysParamsTable.getParam("PetQiangHuaProps");
                const valueArr = value.split("|");
                for (let i = 0; i < valueArr.length; i++) {
                    const attribAttr = valueArr[i].split(",");
                    ForgeLevelPet[parseInt(attribAttr[0])] = parseFloat(attribAttr[1]);
                }
            }
            return ForgeLevelPet[extPropIndex] * gd.ForgeLevel;
        }
        else {
            if (extPropIndex === ExtPropIndexes.MaxAttack || extPropIndex === ExtPropIndexes.MaxMAttack) {
                if (null == ForgeLevelAddAttackRates) { // 攻击
                    ForgeLevelAddAttackRates = tableMgr.sysParamsTable.getParamDoubleArray("ForgeLevelAddAttackRates");
                }
                return ForgeLevelAddAttackRates[forgeLevel];
            }
            else if (extPropIndex === ExtPropIndexes.MaxDefense || extPropIndex === ExtPropIndexes.MaxMDefense) {
                if (null == ForgeLevelAddDefenseRates) { // 防御
                    ForgeLevelAddDefenseRates = tableMgr.sysParamsTable.getParamDoubleArray("ForgeLevelAddDefenseRates");
                }
                return ForgeLevelAddDefenseRates[forgeLevel];
            }
            else if (extPropIndex === ExtPropIndexes.MaxLifeV) {
                if (null == ForgeLevelAddMaxLifeVRates) { // 生命上限加成比例
                    ForgeLevelAddMaxLifeVRates = tableMgr.sysParamsTable.getParamDoubleArray("ForgeLevelAddMaxLifeVRates");
                }
                return ForgeLevelAddMaxLifeVRates[forgeLevel];
            }
        }
        return 0;
    }
    Global.GetEquipForgeAddBaseValue = GetEquipForgeAddBaseValue;
    let ZhuoYueAddDefenseRates = null;
    /**
     * 获得卓越装备增加的防御力加成比例
     * @param flag 卓越信息
     */
    function GetZhuoYueAddDefenseRates(flag) {
        if (null == ZhuoYueAddDefenseRates) {
            ZhuoYueAddDefenseRates = tableMgr.sysParamsTable.getParamDoubleArray("ZhuoYueAddDefenseRates");
        }
        return ZhuoYueAddDefenseRates[GetZhuoYueAddIndex(flag)];
    }
    Global.GetZhuoYueAddDefenseRates = GetZhuoYueAddDefenseRates;
    let ZhuoYueAddAttackRates = null;
    /**
     * 获得卓越装备增加的攻击力加成比例
     * @param flag 卓越信息
     */
    function GetZhuoYueAddAttackRates(flag) {
        if (null == ZhuoYueAddAttackRates) {
            ZhuoYueAddAttackRates = tableMgr.sysParamsTable.getParamDoubleArray("ZhuoYueAddAttackRates");
        }
        return ZhuoYueAddAttackRates[GetZhuoYueAddIndex(flag)];
    }
    Global.GetZhuoYueAddAttackRates = GetZhuoYueAddAttackRates;
    /**
     * 辅助函数，获取卓越装备加成的索引
     * @param flag 卓越信息
     */
    function GetZhuoYueAddIndex(flag) {
        const zhuoyueNum = GetZhuoyueAttributeCount(flag);
        if ((zhuoyueNum > 0) && (zhuoyueNum <= 2)) {
            return 0;
        }
        else if ((zhuoyueNum >= 3) && (zhuoyueNum <= 4)) {
            return 1;
        }
        else if ((zhuoyueNum >= 5) && (zhuoyueNum <= 6)) {
            return 2;
        }
        return 0;
    }
    Global.GetZhuoYueAddIndex = GetZhuoYueAddIndex;
    /**
     * 根据天生属性字段，获取攻击力的值 最大物理攻击0， 最大魔法攻击1， 最大道术攻击2
     * @param bornIndex
     * @param attackType
     */
    function GetBornAttackValue(bornIndex, attackType) {
        bornIndex = (bornIndex >> (attackType * 8));
        return (bornIndex & 0x000000FF);
    }
    Global.GetBornAttackValue = GetBornAttackValue;
    /**
     * 返回装备天生增加的基础值
     * @param gd
     * @param extPropIndex
     */
    function GetEquipBornAddBaseValue(gd, extPropIndex) {
        // 如果不是最大攻击属性，直接返回,强化 天生 等只影响最大攻击属性【激活的除外】
        if (extPropIndex !== ExtPropIndexes.MaxAttack && extPropIndex !== ExtPropIndexes.MaxMAttack) {
            return 0.0;
        }
        if (gd.BornIndex <= 0) {
            return 0.0;
        }
        /// 只有基础属性某项最大攻击配置值大于0，天生才有效，比如没有配魔法攻击的刀的魔法天生效果没有
        const lsEquipProp = GetGoodsEquipPropsDoubleList(gd.GoodsID);
        if (!lsEquipProp || lsEquipProp[extPropIndex] <= 0.0) {
            return 0.0;
        }
        let index = 0;
        // 最大物理攻击0， 最大魔法攻击1， 最大道术攻击2
        if (extPropIndex === ExtPropIndexes.MaxAttack) {
            index = 0;
        }
        else if (extPropIndex === ExtPropIndexes.MaxMAttack) {
            index = 1;
        }
        return GetBornAttackValue(gd.BornIndex, index);
    }
    Global.GetEquipBornAddBaseValue = GetEquipBornAddBaseValue;
    let ZhuijiaLevelAddAttackRates = null; // 追加增加的攻击属性
    let ZhuijiaLevelAddDefenseRates = null; // 追加增加的防御属性
    /**
     * 返回装备追加属性增加的基础值
     * @param gd 装备数据
     * @param extPropIndex 属性索引
     */
    function GetEquipZhuijiaAddBaseValue(gd, extPropIndex) {
        const zhuijiaLevel = gd.AppendPropLev;
        if (zhuijiaLevel > Global.MaxZhuijiaLevel || zhuijiaLevel < 0) {
            return 0;
        }
        // 如果属性是防御属性
        // 表中配置的属性实际是生命上限，但属性名用的是ZhuiJiaLevelAddDefenseRates
        if (extPropIndex === ExtPropIndexes.MaxLifeV) {
            if (null == ZhuijiaLevelAddDefenseRates) {
                ZhuijiaLevelAddDefenseRates = tableMgr.sysParamsTable.getParamDoubleArray("ZhuiJiaLevelAddDefenseRates");
            }
            return ZhuijiaLevelAddDefenseRates[zhuijiaLevel];
        }
        else if (extPropIndex === ExtPropIndexes.MaxAttack || extPropIndex === ExtPropIndexes.MaxMAttack) {
            if (null == ZhuijiaLevelAddAttackRates) {
                ZhuijiaLevelAddAttackRates = tableMgr.sysParamsTable.getParamDoubleArray("ZhuiJiaLevelAddAttackRates");
            }
            return ZhuijiaLevelAddAttackRates[zhuijiaLevel];
        }
        else {
            return 0;
        }
    }
    Global.GetEquipZhuijiaAddBaseValue = GetEquipZhuijiaAddBaseValue;
    let ZhuanshengLevelAddAttackRates = null; // 重生加的攻击属性
    let ZhuanshengLevelAddDefenseRates = null; // 重生增加的防御属性
    /**
     * 返回装备重生属性增加的基础值
     * @param gd 装备数据
     * @param extPropIndex 属性索引
     */
    function GetEquipZhuanshengAddBaseValue(gd, extPropIndex) {
        const zhuanshengLevel = gd.ChangeLifeLevForEquip;
        if (zhuanshengLevel > Global.MaxZhuanshengLevel || zhuanshengLevel < 0) {
            return 0;
        }
        // 如果属性是防御属性
        if (extPropIndex === ExtPropIndexes.MaxDefense || extPropIndex === ExtPropIndexes.MaxMDefense) {
            if (null == ZhuanshengLevelAddDefenseRates) {
                ZhuanshengLevelAddDefenseRates = tableMgr.sysParamsTable.getParamDoubleArray("EquipZhuanShengAddDefenseRates");
            }
            return ZhuanshengLevelAddDefenseRates[zhuanshengLevel];
        }
        else if (extPropIndex === ExtPropIndexes.MaxAttack || extPropIndex === ExtPropIndexes.MaxMAttack) {
            if (null == ZhuanshengLevelAddAttackRates) {
                ZhuanshengLevelAddAttackRates = tableMgr.sysParamsTable.getParamDoubleArray("EquipZhuanShengAddAttackRates");
            }
            return ZhuanshengLevelAddAttackRates[zhuanshengLevel];
        }
        else {
            return 0;
        }
    }
    Global.GetEquipZhuanshengAddBaseValue = GetEquipZhuanshengAddBaseValue;
    /**
     * 基础属性字符串, defaultExpression 是否使用默认值, false 使用公式计算属性值, fillCount用于属性名称和数值间距, 填充中文空格, 3表示填充3个空格
     * @param equipFields
     * @param defaultExpression
     * @param fillCount
     */
    function GetBaseAttributeStrFromPropertyList(equipFields, defaultExpression = true, fillCount = 0) {
        let str = "";
        let extPropName = "";
        const fontColor = MyUI.ColorCode.normal;
        let subIndex = 0;
        let extPropIndexMin;
        let extPropIndexMax;
        const level = Global.guardStatueLevel;
        const grade = Global.guardStatueGrade;
        let blankStr = "";
        const blank = " ";
        for (let k = 0; k < fillCount; k++) {
            blankStr += blank;
        }
        for (subIndex = ExtPropIndexes.AttackSpeed; subIndex <= ExtPropIndexes.MaxMAttack; subIndex += 2) {
            if (equipFields[subIndex] !== 0) {
                extPropName = Loca.getLang(ExtPropIndexes.ExtPropIndexChineseNames[subIndex]);
                // 属性域颜色
                extPropName = Global.GetColorStringForNGUIText(fontColor, extPropName + blankStr);
                // 基础值
                const originValue = equipFields[subIndex];
                if (subIndex === ExtPropIndexes.AttackSpeed) {
                    if (equipFields[subIndex] !== 0.0) {
                        str += `${extPropName}       ${equipFields[subIndex]}%`;
                        str += "\n";
                    }
                }
                else {
                    extPropIndexMin = subIndex;
                    extPropIndexMax = subIndex + 1;
                    if (equipFields[extPropIndexMin] !== 0.0 || equipFields[extPropIndexMax] !== 0.0) {
                        // 装备基础属性
                        const minOriginValue = equipFields[extPropIndexMin]; // 最小值
                        const maxOriginValue = equipFields[extPropIndexMax]; // 最大值
                        const tempVal = defaultExpression ? maxOriginValue : CalStatueExpress(maxOriginValue, grade, level);
                        str += `${extPropName}       ${tempVal}`;
                    }
                }
                str += "\n";
            }
        }
        for (subIndex = ExtPropIndexes.IncreasePhyAttack; subIndex < ExtPropIndexes.Max; subIndex++) {
            if (equipFields[subIndex] !== 0) {
                extPropName = Loca.getLang(ExtPropIndexes.ExtPropIndexChineseNames[subIndex]);
                // 属性域颜色
                extPropName = Global.GetColorStringForNGUIText(fontColor, extPropName + blankStr);
                // 基础值
                const originValue = equipFields[subIndex];
                if (ExtPropIndexes.ExtPropIndexPercents[subIndex] === 1) {
                    // 百分比
                    const pecent = defaultExpression ? originValue * 100 : CalStatueExpress(originValue, grade, level) * 100;
                    if (subIndex === ExtPropIndexes.MaxLifePercent || subIndex === ExtPropIndexes.MaxMagicPercent) {
                        str += `${extPropName}   ${pecent.toFixed(2)}%`;
                    }
                    else {
                        str += `${extPropName}       ${pecent.toFixed(2)}%`;
                    }
                }
                else if (ExtPropIndexes.ExtPropIndexPercents[subIndex] === 0) {
                    const tempVal = defaultExpression ? originValue : CalStatueExpress(originValue, grade, level);
                    str += `${extPropName}       ${tempVal}`;
                }
                str += "\n";
            }
        }
        return ProcessStr(str);
    }
    Global.GetBaseAttributeStrFromPropertyList = GetBaseAttributeStrFromPropertyList;
    /**
     * 根据阶数, 级数, 计算属性值
     * @param baseAttr
     * @param grade
     * @param level
     */
    function CalStatueExpress(baseAttr, grade, level) {
        let levelFactor = 0;
        let gradeFactor = 0;
        const levelFac = tableMgr.sysParamsTable.getParam("ShouHuLevel");
        const gradeFac = tableMgr.sysParamsTable.getParam("ShouHuSuit");
        // 升级属性系数
        if (!Global.String.IsNullOrEmpty(levelFac)) {
            levelFactor = parseFloat(levelFac);
        }
        // 升阶属性系数
        if (!Global.String.IsNullOrEmpty(gradeFac)) {
            gradeFactor = parseFloat(gradeFac);
        }
        return CalStatueExpression(baseAttr, grade, level, gradeFactor, levelFactor);
    }
    Global.CalStatueExpress = CalStatueExpress;
    /**
     * 计算公式: 基础值 * ( 1 + (等级-1) * 升级属性系数 + 阶数*升级属性系数 )
     * @param baseAttr
     * @param grade
     * @param level
     * @param gradeFactor
     * @param levelFactor
     */
    function CalStatueExpression(baseAttr, grade, level, gradeFactor = 0, levelFactor = 0) {
        return baseAttr * (1 + level * levelFactor + (grade - 1) * gradeFactor);
    }
    Global.CalStatueExpression = CalStatueExpression;
    /**
     * 处理最后一个换行符
     * @param str
     */
    function ProcessStr(str) {
        if (Global.String.IsNullOrEmpty(str))
            return "";
        if (str.length > 0) {
            if (str.substring(str.length - 1) === "\n") {
                str = str.substring(0, str.length - 1);
            }
        }
        return str;
    }
    Global.ProcessStr = ProcessStr;
    /**
     * 获取指定的装备的指定扩展属性 返回 基础值 + 天生值 + 强化附加值
     * @param gd
     * @param da
     * @param itemIndex
     * @param goodVO
     */
    function GetEquipExtPropsItemVal(gd, da, itemIndex, goodVO) {
        if (null == goodVO)
            return 0.0;
        if (null == gd)
            return 0.0;
        // 套装相关---暂时不起作用
        const suitID = goodVO.SuitID;
        // 装备原始属性
        let origExtProp = da[itemIndex];
        // 如果不是最大攻击属性，直接返回,强化 天生 等只影响最大攻击属性
        if (itemIndex !== ExtPropIndexes.MaxAttack &&
            itemIndex !== ExtPropIndexes.MaxMAttack) {
            return origExtProp;
        }
        // 增加天生属性增加的基础值
        origExtProp += Global.GetEquipBornAddBaseValue(gd, itemIndex);
        // 增加强化等级增加的基础值
        origExtProp += Global.GetEquipForgeAddBaseValue(gd, itemIndex);
        return Math.floor(origExtProp);
    }
    Global.GetEquipExtPropsItemVal = GetEquipExtPropsItemVal;
    /**
     * 重新计算装备属性
     * @param goodVO
     * @param goodsData
     * @param sa
     */
    function RecalcEquipProp(goodVO, goodsData, sa) {
        if (null == goodsData) {
            return sa;
        }
        for (let j = 0; j < ExtPropIndexes.Max; j++) {
            sa[j] = GetEquipExtPropsItemVal(goodsData, sa, j, goodVO);
        }
        return sa;
    }
    Global.RecalcEquipProp = RecalcEquipProp;
    /**
     * 获取已激活的卓越属性条数
     * @param gd
     */
    function GetZhuoyueAttributeCountByGoodsData(gd) {
        return Global.GetZhuoyueAttributeCount(gd.ExcellenceInfo);
    }
    Global.GetZhuoyueAttributeCountByGoodsData = GetZhuoyueAttributeCountByGoodsData;
    /**
     * 获取已激活的卓越属性条数
     * @param excellenceInfo 卓越信息
     */
    function GetZhuoyueAttributeCount(excellenceInfo) {
        if (excellenceInfo <= 0) {
            return 0;
        }
        let count = 0;
        // 卓越属性最多24条属性，用一个24位的整数表示卓越属性是否激活的状态，
        const maxNum = 32;
        for (let i = 0; i < maxNum; i++) {
            if (Global.GetIntSomeBit(excellenceInfo, i) === 1) {
                count = count + 1;
            }
        }
        return count;
    }
    Global.GetZhuoyueAttributeCount = GetZhuoyueAttributeCount;
    /**
     * 获取装备最大的追加级别
     * @param goodsData 装备数据
     */
    function GetMaxZhuijiaLevelByGoodsData(goodsData) {
        const zhuoyueNum = GetZhuoyueAttributeCount(goodsData.ExcellenceInfo);
        if (zhuoyueNum === 0) {
            return 20;
        }
        if ((zhuoyueNum > 0) && (zhuoyueNum <= 2)) {
            return 40;
        }
        else if ((zhuoyueNum >= 3) && (zhuoyueNum <= 4)) {
            return 60;
        }
        else if ((zhuoyueNum >= 5) && (zhuoyueNum <= 6)) {
            return 80;
        }
        return 0;
    }
    Global.GetMaxZhuijiaLevelByGoodsData = GetMaxZhuijiaLevelByGoodsData;
    /**
     * 获取装备最大的洗炼属性条数
     * @param goodsData
     */
    function GetMaxWashPropsCountByGoodsData(goodsData) {
        const zhuoyueNum = GetZhuoyueAttributeCount(goodsData.ExcellenceInfo);
        if (zhuoyueNum === 0) {
            return 0;
        }
        if ((zhuoyueNum > 0) && (zhuoyueNum <= 2)) {
            return 2;
        }
        else if ((zhuoyueNum >= 3) && (zhuoyueNum <= 4)) {
            return 4;
        }
        else if ((zhuoyueNum >= 5) && (zhuoyueNum <= 6)) {
            return 6;
        }
        return 0;
    }
    Global.GetMaxWashPropsCountByGoodsData = GetMaxWashPropsCountByGoodsData;
    /**
     * 根据goodsdata返回颜色
     * @param goodsData 道具数据
     */
    function GetColorByGoodsData(goodsData) {
        let fontColor = 0xa5a9b2;
        const zhuoyueNum = GetZhuoyueAttributeCount(goodsData.ExcellenceInfo);
        if ((zhuoyueNum > 0) && (zhuoyueNum <= 2)) {
            fontColor = 0x749a29;
        }
        else if ((zhuoyueNum >= 3) && (zhuoyueNum <= 4)) {
            fontColor = 0x3574bd;
        }
        else if ((zhuoyueNum >= 5) && (zhuoyueNum <= 6)) {
            fontColor = 0x9b49db;
        }
        return fontColor;
    }
    Global.GetColorByGoodsData = GetColorByGoodsData;
    /**
     * 根据goodsdata返回颜色
     * @param goodsData
     */
    function GetStrColorByGoodsData(goodsData) {
        let fontColor = "ffffff";
        const nCategory = tableMgr.goodsTable.getCategoriy(goodsData.GoodsID);
        if (nCategory >= ItemCategories.TouKui && nCategory <= ItemCategories.HuFu) { // 判断否是是装备
            const zhuoyueNum = GetZhuoyueAttributeCount(goodsData.ExcellenceInfo);
            if ((zhuoyueNum > 0) && (zhuoyueNum <= 2)) {
                fontColor = "00ff00";
            }
            else if ((zhuoyueNum >= 3) && (zhuoyueNum <= 4)) {
                fontColor = "0099ff";
            }
            else if ((zhuoyueNum >= 5) && (zhuoyueNum <= 6)) {
                fontColor = "ff08ff";
            }
        }
        else {
            fontColor = tableMgr.goodsTable.getGoodsColor(goodsData.GoodsID);
        }
        return fontColor;
    }
    Global.GetStrColorByGoodsData = GetStrColorByGoodsData;
    /**
     * 获取道具颜色枚举
     * @param goodsData 道具数据
     */
    function GetGoodsColorByGoodsData(goodsData) {
        const result = GoodsColor.White;
        const zhuoyueNum = GetZhuoyueAttributeCount(goodsData.ExcellenceInfo);
        if ((zhuoyueNum > 0) && (zhuoyueNum <= 2)) {
            return GoodsColor.Green;
        }
        else if ((zhuoyueNum >= 3) && (zhuoyueNum <= 4)) {
            return GoodsColor.Blue;
        }
        else if ((zhuoyueNum >= 5) && (zhuoyueNum <= 6)) {
            return GoodsColor.Purple;
        }
        return result;
    }
    Global.GetGoodsColorByGoodsData = GetGoodsColorByGoodsData;
    //#endregion //////////////  角色装备属性 //////////////
    //#region ////////////// 物品表 ExecMagic 字段的通用解析 //////////////
    // #########################################################################################################
    // 物品表 ExecMagic 字段的通用解析，主要用于装备tips中buffer的显示,要求逗号隔开的各个部分都是整数
    // #########################################################################################################
    /**
     * 返回goods表中ExecMagic字段对应各个参数的整数列表，funcName为空就不验证具体脚本函数名
     * @param goodsId
     * @param funcName
     */
    function GetGoodsExecMagicdoubleParamsList(goodsId, funcName = "") {
        const intArr = [];
        const goodVO = tableMgr.goodsTable.Find(goodsId);
        if (!goodVO)
            return intArr;
        // 格式:FUNCTIONTEST(1,22,323,9)
        const excuteMagic = TableUtils.getFieldString(goodVO.ExecMagic);
        // 比较函数，判断是否所需函数
        if (funcName.length > 0 && excuteMagic.indexOf(funcName) < 0) {
            return intArr;
        }
        const leftPos = excuteMagic.indexOf("(");
        const rightPos = excuteMagic.indexOf(")");
        // 判断括弧
        if (leftPos < 0 || rightPos <= 0 || rightPos - leftPos < 1 || leftPos + 1 >= excuteMagic.length) {
            return intArr;
        }
        // 解析整数列表
        const realParams = excuteMagic.substring(leftPos + 1, rightPos);
        const pairs = realParams.split(",");
        for (let n = 0; n < pairs.length; n++) {
            intArr.push(parseFloat(pairs[n]));
        }
        return intArr;
    }
    Global.GetGoodsExecMagicdoubleParamsList = GetGoodsExecMagicdoubleParamsList;
    /**
     * 返回goods的bufferid
     * @param goodsId
     */
    function GetGoodsBufferID(goodsId) {
        const goodVO = tableMgr.goodsTable.Find(goodsId);
        if (!goodVO)
            return -1;
        // 格式:FUNCTIONTEST(1,22,323,9)
        const excuteMagic = TableUtils.getFieldString(goodVO.ExecMagic);
        const leftPos = excuteMagic.indexOf("(");
        let funcName = excuteMagic;
        // 判断括弧
        if (leftPos > 0) {
            funcName = excuteMagic.substring(0, leftPos);
        }
        let bufferId = GetBufferIdByFuncName(funcName);
        if (-1 === bufferId && !Global.String.IsNullOrEmpty(funcName)) {
            // 生命圣水, 魔法圣水 等 DB TIME NOSHOW 类型
            if (funcName === "DB_TIME_LIFE_NOSHOW") {
                bufferId = BufferItemTypes.TimeAddLifeNoShow;
            }
            else if (funcName === "DB_TIME_MAGIC_NOSHOW") {
                bufferId = BufferItemTypes.TimeAddMagicNoShow;
            }
        }
        return bufferId;
    }
    /**
     * 返回goods绑定的bufferid
     * @param goodsId
     */
    function GetGoodsBindBufferID(goodsId) {
        const goodVO = tableMgr.goodsTable.Find(goodsId);
        if (!goodVO)
            return -1;
        // 格式:FUNCTIONTEST(1,22,323,9)
        const excuteMagic = TableUtils.getFieldString(goodVO.ExecMagic);
        const leftPos = excuteMagic.indexOf("(");
        let funcName = excuteMagic;
        // 判断括弧
        if (leftPos > 0) {
            funcName = excuteMagic.substring(0, leftPos);
        }
        const bufferId = GetBufferIdByFuncName(funcName);
        return bufferId;
    }
    Global.GetGoodsBindBufferID = GetGoodsBindBufferID;
    /**
     * 根据脚本函数名称返回bufferid
     * @param funcName
     */
    function GetBufferIdByFuncName(funcName) {
        const mapFunc = GetFuncNameToBufferIdMap();
        for (const [key, value] of mapFunc) {
            if (Global.String.isEqualIgnoreCase(key, funcName)) {
                return value;
            }
        }
        return -1;
    }
    let FuncNameToBufferIdMap = null; // 脚本函数到bufferid的映射
    /**
     *  脚本函数到bufferid的映射
     */
    function GetFuncNameToBufferIdMap() {
        if (null == FuncNameToBufferIdMap) {
            FuncNameToBufferIdMap = new Map();
            FuncNameToBufferIdMap["DB_ADD_MAXATTACKV"] = BufferItemTypes.TimeAddAttack;
            FuncNameToBufferIdMap["DB_ADD_MAXMATTACKV"] = BufferItemTypes.TimeAddMAttack;
            FuncNameToBufferIdMap["DB_ADD_MAXDSATTACKV"] = BufferItemTypes.TimeAddDSAttack;
            FuncNameToBufferIdMap["DB_ADD_MAXDEFENSEV"] = BufferItemTypes.TimeAddDefense;
            FuncNameToBufferIdMap["DB_ADD_MAXMDEFENSEV"] = BufferItemTypes.TimeAddMDefense;
            FuncNameToBufferIdMap["DB_ADD_DBL_MONEY"] = BufferItemTypes.DblMoney;
            FuncNameToBufferIdMap["DB_ADD_DBL_LINGLI"] = BufferItemTypes.DblLingLi;
            FuncNameToBufferIdMap["DB_ADD_DBL_EXP"] = BufferItemTypes.DblExperience; // 双倍经验
            FuncNameToBufferIdMap["DB_ADD_THREE_EXP"] = BufferItemTypes.ThreeExperience; // 三倍经验
            FuncNameToBufferIdMap["DB_ADD_FIVE_EXP"] = BufferItemTypes.FiveExperience; // 五倍经验
            FuncNameToBufferIdMap["DB_ADD_MULTIEXP"] = BufferItemTypes.MutilExperience; // 多倍经验
            // vip相关
            FuncNameToBufferIdMap["DB_ADD_MONTHVIP"] = BufferItemTypes.MonthVIP;
            FuncNameToBufferIdMap["DB_ADD_SEASONVIP"] = BufferItemTypes.MonthVIP;
            FuncNameToBufferIdMap["DB_ADD_HALFYEARVIP"] = BufferItemTypes.MonthVIP;
            // 循环增加魔法和生命
            FuncNameToBufferIdMap["DB_TIME_LIFE_MAGIC"] = BufferItemTypes.TimeAddLifeMagic;
            // 烤火
            FuncNameToBufferIdMap["DB_NEW_ADD_ZHUFUTIME"] = BufferItemTypes.ZhuFu;
            // 二锅头
            FuncNameToBufferIdMap["DB_ADD_ERGUOTOU"] = BufferItemTypes.ErGuoTou; // 二锅头
            // 幸运神水
            FuncNameToBufferIdMap["DB_ADD_LUCKYATTACKPERCENTTIMER"] = BufferItemTypes.SLDL_ADDLUCKYATTACKPERCENTTIMER;
            // 卓越神水
            FuncNameToBufferIdMap["DB_ADD_FATALATTACKPERCENTTIMER"] = BufferItemTypes.SLDL_ADDFATALATTACKPERCENTTIMER;
        }
        return FuncNameToBufferIdMap;
    }
    //#endregion ////////////// 物品表 ExecMagic 字段的通用解析 //////////////
    //#region ////////////// 物品CoolDown 冷却管理 //////////////
    /** 添加新的物品cooldown通知 */
    Global.NotifyGoodsAddCoolDown = null;
    const GoodsCoolDownDict = new Map();
    /**
     * 判断物品是否处于冷却状态
     * @param goodsID
     */
    function GoodsCoolDown(goodsID) {
        let coolDownItem = null;
        if (!GoodsCoolDownDict.has(goodsID)) {
            coolDownItem = GoodsCoolDownDict.get(goodsID);
            return false;
        }
        const ticks = TimeManager.getCorrectLocalTime();
        if (ticks > (coolDownItem.StartTicks + coolDownItem.CDTicks)) {
            return false;
        }
        return true;
    }
    Global.GoodsCoolDown = GoodsCoolDown;
    /**
     * 获取物品还剩余的冷却时间
     * @param goodsID
     */
    function GetGoodsCoolDownTicks(goodsID) {
        let coolDownItem = null;
        if (!GoodsCoolDownDict.has(goodsID)) {
            coolDownItem = GoodsCoolDownDict.get(goodsID);
            return 0;
        }
        const ticks = TimeManager.getCorrectLocalTime();
        if (ticks > (coolDownItem.StartTicks + coolDownItem.CDTicks)) {
            return 0;
        }
        return ((coolDownItem.StartTicks + coolDownItem.CDTicks) - ticks);
    }
    Global.GetGoodsCoolDownTicks = GetGoodsCoolDownTicks;
    /**
     * 添加物品冷却
     * @param goodsID
     */
    function AddGoodsCoolDown(goodsID) {
        if (!Global.Data.roleData.GoodsDataList) {
            return;
        }
        let goodVO = tableMgr.goodsTable.Find(goodsID);
        if (!goodVO)
            return;
        const cdTime = goodVO.CDTime;
        if (cdTime <= 0) { // 不需要CD时间
            return;
        }
        const pubCDTime = goodVO.PubCDTime;
        const cdGroup = goodVO.ShareGroupID;
        const nowTicks = TimeManager.getCorrectLocalTime();
        const itm = new CoolDownItem();
        itm.ID = goodsID,
            itm.StartTicks = nowTicks,
            itm.CDTicks = cdTime * 1000,
            GoodsCoolDownDict.set(goodsID, itm);
        Global.AddCoolDownItem(GoodsCoolDownDict, goodsID, nowTicks, cdTime * 1000);
        if (cdGroup > 0) {
            for (let i = 0; i < Global.Data.roleData.GoodsDataList.length; i++) {
                const goodsData = Global.Data.roleData.GoodsDataList[i];
                if (!goodsData)
                    continue;
                if (goodsData.Using > 0)
                    continue;
                goodVO = tableMgr.goodsTable.Find(goodsData.GoodsID);
                if (!goodVO)
                    continue;
                if (cdGroup === goodVO.ShareGroupID) { // 同组
                    Global.AddCoolDownItem(GoodsCoolDownDict, goodsData.GoodsID, nowTicks, pubCDTime * 1000);
                }
            }
        }
        // 通知外部
        if (Global.NotifyGoodsAddCoolDown) {
            Global.NotifyGoodsAddCoolDown(null, DPSelectedItemEventArgs.Empty);
        }
    }
    Global.AddGoodsCoolDown = AddGoodsCoolDown;
    //#endregion ////////////// 物品CoolDown 冷却管理 //////////////
    //#region ////////////// 时装相关 //////////////
    /**
     * 时装（周年庆）的装备物品列表
     * @param GoodsID
     * @param occupation
     * @param FashionForgeLev
     */
    function GetFashionEquipGoodsDataList(GoodsID, occupation, FashionForgeLev) {
        const equipGoodsDataList = new Array();
        const forgeLevel = FashionForgeLev + 1; // （这里得加1级，因为在获取时装的shaderID是返回的数组中将等级减了1 导致时装的shaderID取的错了一个位置）forgeLevel  默认等级与真正的等级之间有1级的差距
        occupation = Global.CalcOriginalOccupationID(occupation);
        const dic = GetFashionInfo();
        let szriDic = null;
        if (dic.has(GoodsID)) {
            szriDic = dic.get(GoodsID);
            equipGoodsDataList.push(GetFakeEquipGoodsData(szriDic[occupation].TouRes, forgeLevel));
            equipGoodsDataList.push(GetFakeEquipGoodsData(szriDic[occupation].XiongRes, forgeLevel));
            equipGoodsDataList.push(GetFakeEquipGoodsData(szriDic[occupation].ShouRes, forgeLevel));
            equipGoodsDataList.push(GetFakeEquipGoodsData(szriDic[occupation].TuiRes, forgeLevel));
            equipGoodsDataList.push(GetFakeEquipGoodsData(szriDic[occupation].XieRes, forgeLevel));
        }
        return equipGoodsDataList;
    }
    Global.GetFashionEquipGoodsDataList = GetFashionEquipGoodsDataList;
    const shiZhuangDic = new Map(); // 时装字典信息
    /**
     * 获取时装字典信息
     */
    function GetFashionInfo() {
        if (shiZhuangDic.size > 0)
            return shiZhuangDic;
        const aVORes = tableMgr.shiZhuangResTable.AllRows();
        aVORes.forEach(element => {
            if (!shiZhuangDic.has(element.GoodsID)) {
                const dic = new Map();
                dic.set(element.MainOccupation, element);
                shiZhuangDic.set(element.GoodsID, dic);
            }
            else {
                shiZhuangDic.get(element.GoodsID).set(element.MainOccupation, element);
            }
        });
        return shiZhuangDic;
    }
    Global.GetFashionInfo = GetFashionInfo;
    /**
     * 获取时装列表
     */
    function GetRoleFashionList() {
        const lst = [];
        if (Global.Data.fashionAndTitleList) {
            for (let i = 0; i < Global.Data.fashionAndTitleList.length; ++i) {
                const data = Global.Data.fashionAndTitleList[i];
                if (!data)
                    continue;
                if (ItemCategories.Fashion === Global.GetCategoriyByGoodsID(data.GoodsID)) {
                    if (1 === data.Using)
                        lst.unshift(data);
                    else
                        lst.push(data);
                }
            }
        }
        return lst;
    }
    Global.GetRoleFashionList = GetRoleFashionList;
    //#endregion ////////////// 时装相关 //////////////
    //#region ////////////// 装备洗炼 //////////////
    /**
     * 获取洗炼表节点对象
     * @param id 节点ID
     */
    function GetXilianXmlNode(id) {
        return tableMgr.xiLianShuXingTable.Find(id);
    }
    Global.GetXilianXmlNode = GetXilianXmlNode;
    const washPropsNames = ["MaxLifeV", "AddAttackInjure", "DecreaseInjureValue", "AddAttack", "AddDefense", "HitV", "Dodge", "LifeSteal"];
    /**
     * 获取某件装备的洗炼属性上限
     * @param gd 装备数据
     */
    function GetXilianPropsUpLimitDict(gd) {
        const goodVO = tableMgr.goodsTable.Find(gd.GoodsID);
        if (!goodVO)
            return null;
        const voXiLian = GetXilianXmlNode(goodVO.XiLian.toString());
        if (!voXiLian)
            return null;
        const dict = new Map();
        for (let i = 0; i < washPropsNames.length; i++) {
            let keyStr = washPropsNames[i].toLowerCase();
            if (keyStr.substring(0, 3) === "min") {
                keyStr = keyStr.substring(3);
            }
            const key = ExtPropIndexes.ExtPropIndexNames.indexOf(keyStr);
            const value = parseInt(voXiLian[washPropsNames[i]]);
            if (!dict.has(key)) {
                dict.set(key, value);
            }
        }
        return dict;
    }
    Global.GetXilianPropsUpLimitDict = GetXilianPropsUpLimitDict;
    let XilianPropsUpFactorDict = null;
    /**
     * 获取洗炼属性因子
     * @param gd
     */
    function GetXilianPropsUpFactor(gd) {
        const factor = 0;
        if (null == XilianPropsUpFactorDict) {
            XilianPropsUpFactorDict = new Map();
            const lst = tableMgr.xiLianTypeTable.AllRows();
            lst.forEach(element => {
                const key = parseInt(element.ID);
                const value = parseInt(element.Multiplying);
                XilianPropsUpFactorDict.set(key, value);
            });
        }
        const k = GetGoodsColorByGoodsData(gd);
        if (XilianPropsUpFactorDict.has(k)) {
            return XilianPropsUpFactorDict.get(k);
        }
        return factor;
    }
    Global.GetXilianPropsUpFactor = GetXilianPropsUpFactor;
    /**
     * 判断装备是否达到了洗炼属性上限
     * @param gd 道具数据
     */
    function IsToXilianPropsUpLimit(gd) {
        if (!gd)
            return false;
        const dict = GetXilianPropsUpLimitDict(gd);
        const factor = GetXilianPropsUpFactor(gd);
        if (!dict)
            return false;
        if (gd.WashProps) {
            let key = 0;
            let value = 0;
            let upLimitValue = 0;
            for (let i = 0; i < gd.WashProps.length; i += 2) {
                key = gd.WashProps[i];
                value = gd.WashProps[i + 1];
                if (dict.has(key)) {
                    upLimitValue = dict.get(key);
                    upLimitValue = Math.floor(upLimitValue * factor);
                    if (value < upLimitValue) {
                        return false;
                    }
                }
            }
        }
        else {
            return false;
        }
        return true;
    }
    /**
     * 获取身上所有装备的洗炼属性值相加的和
     */
    function GetSumOfAllEquipXilianValue() {
        let result = 0;
        const usingGoodsDataList = GetUsingGoodsDataList();
        if (!usingGoodsDataList || usingGoodsDataList.size <= 0) {
            return result;
        }
        for (const [key, value] of usingGoodsDataList) {
            if (value.WashProps) {
                for (let i = 0; i < value.WashProps.length; i += 2) {
                    result += value.WashProps[i + 1];
                }
            }
        }
        return result;
    }
    /**
     * 获取身上所有装备的追加等级相加的和
     */
    function GetSumOfAllEquipZhuijiaValue() {
        let result = 0;
        const usingGoodsDataList = GetUsingGoodsDataList();
        if (!usingGoodsDataList || usingGoodsDataList.size <= 0) {
            return result;
        }
        for (const [key, value] of usingGoodsDataList) {
            const goodVO = tableMgr.goodsTable.Find(value.GoodsID);
            if (!goodVO)
                continue;
            const categoriy = goodVO.Categoriy;
            if (categoriy === ItemCategories.ShouHuChong
                || categoriy === ItemCategories.ChongWu
                || categoriy === ItemCategories.JieHunJieZhi) {
                continue;
            }
            result += value.AppendPropLev;
        }
        return result;
    }
    /**
     * 获取身上所有装备的强化等级相加的和
     */
    function GetSumOfAllEquipQianghuaValue() {
        let result = 0;
        const usingGoodsDataList = GetUsingGoodsDataList();
        if (!usingGoodsDataList || usingGoodsDataList.size <= 0) {
            return result;
        }
        for (const [key, value] of usingGoodsDataList) {
            const goodVO = tableMgr.goodsTable.Find(value.GoodsID);
            if (!goodVO)
                continue;
            const categoriy = goodVO.Categoriy;
            if (categoriy === ItemCategories.ShouHuChong
                || categoriy === ItemCategories.ChongWu
                || categoriy === ItemCategories.JieHunJieZhi
                || categoriy === ItemCategories.Fashion) {
                continue;
            }
            result += value.ForgeLevel;
        }
        return result;
    }
    /**
     * 判断装备1的洗炼属性，是否大于装备2的洗炼属性上限(任意一条大于都返回true)
     * @param gd1 装备数据1
     * @param gd2 装备数据2
     */
    function IsXilianProps1MoreThan2UpLimit(gd1, gd2) {
        if (!gd1)
            return false;
        if (!gd1.WashProps)
            return false;
        const dict2 = GetXilianPropsUpLimitDict(gd2);
        const factor2 = GetXilianPropsUpFactor(gd2);
        if (!dict2)
            return false;
        for (let i = 0; i < gd1.WashProps.length; i += 2) {
            const value1 = gd1.WashProps[i + 1];
            let upLimitValue2 = 0;
            if (dict2.has(gd1.WashProps[i])) {
                upLimitValue2 = dict2.get(gd1.WashProps[i]);
                upLimitValue2 = Math.floor(upLimitValue2 * factor2);
                if (value1 > upLimitValue2) {
                    return true;
                }
            }
        }
        return false;
    }
    let DBIdsDictByXilian = null;
    /**
     * 字典中是否包含指定ID
     * @param dbID
     */
    function IsContainDBIDByXilian(dbID) {
        if (!DBIdsDictByXilian)
            return false;
        if (DBIdsDictByXilian.has(dbID))
            return true;
        return false;
    }
    /**
     * 添加指定ID到字典中
     * @param dbID
     */
    function AddDBIdToDictByXilian(dbID) {
        if (!DBIdsDictByXilian)
            DBIdsDictByXilian = new Map();
        if (!DBIdsDictByXilian.has(dbID)) {
            DBIdsDictByXilian.set(dbID, 0);
        }
    }
    /**
     * 从字典中删除指定ID
     * @param dbID
     */
    function RemoveDBIdFromDictByXilian(dbID) {
        if (!DBIdsDictByXilian)
            return;
        if (DBIdsDictByXilian.has(dbID)) {
            DBIdsDictByXilian.delete(dbID);
        }
    }
    /**
     * 清空字典
     */
    function ClearDictByXilian() {
        if (!DBIdsDictByXilian)
            return;
        DBIdsDictByXilian.clear();
    }
    //#endregion //////////////  装备洗炼 //////////////
    //#region ////////////// 装备出售相关 //////////////
    /**
     * 返回物品出售给npc的价格
     * @param goodsData
     */
    function GetGoodsSaleToNpcPrice(goodsData) {
        let needYinLiang = 0;
        const voGoods = tableMgr.goodsTable.Find(goodsData.GoodsID);
        if (voGoods) {
            let priceTwo = voGoods.PriceTwo; // 出售给系统的价格
            priceTwo = Math.max(0, priceTwo);
            const categoriy = voGoods.Categoriy;
            if (categoriy < ItemCategories.TouKui || categoriy > ItemCategories.EquipMax) {
                if (voGoods.UsingNum <= 1) {
                    return Math.floor((priceTwo / 5.0) * goodsData.GCount);
                }
                return Math.floor(priceTwo / 5.0);
            }
            // 计算价格
            const equipPropsArray = GetGoodsEquipPropsDoubleList(goodsData.GoodsID);
            if (equipPropsArray.length >= 2) {
                let fMaxStrong = equipPropsArray[0]; // 采用number，省得考虑除0
                fMaxStrong = Math.max(fMaxStrong, 1);
                if (fMaxStrong <= 1) { // 避免配置错误
                    return 0;
                }
                // 出售给系统的金币=（购买金币/3）*(耐久值/耐久上限值) 
                needYinLiang = Math.floor((priceTwo / 5.0) * Math.max(0, (fMaxStrong - goodsData.Strong)) / fMaxStrong); // 浮点计算，分母为0 也无所谓
                if (voGoods.UsingNum <= 1) {
                    needYinLiang = goodsData.GCount * needYinLiang;
                }
            }
        }
        // 物品不能叠加，直接返回就行
        return needYinLiang;
    }
    Global.GetGoodsSaleToNpcPrice = GetGoodsSaleToNpcPrice;
    /**
     * 返回物品出售给npc的再造点数
     * @param goodsData
     */
    function GetGoodsSaleToNpcZaizao(goodsData) {
        let result = 0;
        const voGoods = tableMgr.goodsTable.Find(goodsData.GoodsID);
        if (voGoods) {
            const sXiShu = tableMgr.sysParamsTable.getParam("ZhuoYueHuiShouZaiZaoXiShu");
            if (Global.String.IsNullOrWhiteSpace(sXiShu)) {
                return result;
            }
            result = voGoods.ChangeZaiZao;
            const strZhuoYueHuiShouXiShu = sXiShu.split(",");
            let ExcellenceCount = GetZhuoyueAttributeCount(goodsData.ExcellenceInfo);
            if (ExcellenceCount > 0) {
                ExcellenceCount = Math.min(ExcellenceCount, strZhuoYueHuiShouXiShu.length);
                result = Math.floor(result * parseFloat(strZhuoYueHuiShouXiShu[ExcellenceCount - 1]));
            }
            result = Math.max(0, result);
        }
        return result;
    }
    Global.GetGoodsSaleToNpcZaizao = GetGoodsSaleToNpcZaizao;
    /**
     * 返回物品出售给npc的积分
     * @param goodsData 道具数据
     */
    function GetGoodsSaleToNpJiFen(goodsData) {
        let needYinLiang = 0;
        const goodVO = tableMgr.goodsTable.Find(goodsData.GoodsID);
        if (goodVO) {
            // 获取卓越属性对应的加成比例
            const strZhuoYueHuiShouXiShu = tableMgr.sysParamsTable.getParam("ZhuoYueHuiShouXiShu").split(",");
            // 出售给系统的价格
            needYinLiang = goodVO.ChangeJinYuan;
            let ExcellenceCount = GetZhuoyueAttributeCount(goodsData.ExcellenceInfo);
            if (ExcellenceCount > 0) {
                ExcellenceCount = Math.min(ExcellenceCount, strZhuoYueHuiShouXiShu.length);
                needYinLiang = Math.floor(needYinLiang * parseFloat(strZhuoYueHuiShouXiShu[ExcellenceCount - 1]));
            }
            needYinLiang = Math.max(0, needYinLiang);
        }
        // 物品不能叠加，直接返回就行
        return needYinLiang;
    }
    Global.GetGoodsSaleToNpJiFen = GetGoodsSaleToNpJiFen;
    let PetExp = null; // 计算宠物兑换斗气缓存各级经验链表
    /**
     * 计算宠物兑换斗气
     * @param goodsData 道具数据
     */
    function GetPetPrice(goodsData) {
        const goodVO = tableMgr.goodsTable.Find(goodsData.GoodsID);
        let EXP = goodVO.ZhanHunPrice;
        if (!PetExp) {
            const aVO = tableMgr.petLevelUpTable.AllRows();
            PetExp = new Array(aVO.length + 1);
            aVO.forEach(element => {
                PetExp[element.Level] = element.NeedExp;
            });
        }
        for (let i = 1; i < goodsData.ForgeLevel + 2; i++) {
            EXP += PetExp[i];
        }
        if (goodsData.ElementhrtsProps) {
            for (let i = 0; i < goodsData.ElementhrtsProps.length; ++i) {
                if (1 === i % 3) {
                    const levskill = goodsData.ElementhrtsProps[i];
                    for (let j = 1; j <= levskill; ++j) {
                        const vo = tableMgr.petSkillLevelUpTable.Find(j);
                        if (vo)
                            EXP += vo.Cost;
                    }
                }
            }
        }
        return EXP;
    }
    Global.GetPetPrice = GetPetPrice;
    //#endregion ////////////// 装备出售相关 //////////////
})(Global || (Global = {}));
//# sourceMappingURL=GlobalGoodsFunction.js.map