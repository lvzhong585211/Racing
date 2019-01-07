/**
 * 存放一些和Buff相关的全局函数
 */
var Global;
(function (Global) {
    /**
     * 判断当前的buff列表中是否存在同名goodsID的buff，只对经验卡有效
     * @param goodsID
     */
    function GetBufferDataByGoodsID(goodsID) {
        if (!Global.Data.roleData.BufferDataList) {
            return null;
        }
        let bufferData = null;
        let id = 0;
        let multiExpNum = 0;
        for (let i = 0; i < Global.Data.roleData.BufferDataList.length; i++) {
            bufferData = Global.Data.roleData.BufferDataList[i];
            if (bufferData.BufferID === BufferItemTypes.MutilExperience) { // 多倍经验卡
                multiExpNum = (bufferData.BufferVal & 0x00000000FFFFFFFF);
                id = ((bufferData.BufferVal - multiExpNum) / Math.pow(2, 32));
                if (id === goodsID) {
                    return bufferData;
                }
            }
            else {
                id = bufferData.BufferVal;
                if (id === goodsID) {
                    return bufferData;
                }
            }
        }
        return null;
    }
    Global.GetBufferDataByGoodsID = GetBufferDataByGoodsID;
    /**
     * 根据BufferID获取buffer的数据
     * @param bufferID
     */
    function GetBufferDataByID(bufferID) {
        const aBuffs = gameIns.gameState.roleData.BufferDataList;
        if (aBuffs === null || aBuffs === undefined) {
            return null;
        }
        for (let i = 0; i < aBuffs.length; i++) {
            if (aBuffs[i].BufferID === bufferID) {
                return aBuffs[i];
            }
        }
        return null;
    }
    Global.GetBufferDataByID = GetBufferDataByID;
    /**
     * 根据BufferID和角色数据，获取buffer的数据
     * @param bufferID
     * @param roleData
     */
    function GetBufferDataByIDAndRoleData(bufferID, roleData) {
        if (!roleData.BufferDataList) {
            return null;
        }
        for (let i = 0; i < roleData.BufferDataList.length; i++) {
            if (roleData.BufferDataList[i].BufferID === bufferID) {
                return roleData.BufferDataList[i];
            }
        }
        return null;
    }
    Global.GetBufferDataByIDAndRoleData = GetBufferDataByIDAndRoleData;
    let VisiableBuffCount = 0; // 可见的Buff数量
    /**
     * 获取可见Buff的数量
     */
    function GetVisibalBufferCount() {
        if (!Global.Data.roleData.BufferDataList) {
            return 0;
        }
        VisiableBuffCount = 0;
        const count = Global.Data.roleData.BufferDataList.length;
        for (let j = 0; j < count; ++j) {
            const bufferData = Global.Data.roleData.BufferDataList[j];
            if (IsDummyBuffer(bufferData.BufferID))
                continue;
            if (IsBufferDataOver(bufferData, TimeManager.getCorrectLocalTime())) {
                continue;
            }
            VisiableBuffCount++;
        }
        return VisiableBuffCount;
    }
    Global.GetVisibalBufferCount = GetVisibalBufferCount;
    /**
     * 添加buffer数据到列表中
     * @param bufferData
     */
    function AddBufferData(bufferData) {
        if (!Global.Data.roleData.BufferDataList) {
            Global.Data.roleData.BufferDataList = new Array();
        }
        let findIndex = -1;
        for (let i = 0; i < Global.Data.roleData.BufferDataList.length; i++) {
            if (Global.Data.roleData.BufferDataList[i].BufferID === bufferData.BufferID) {
                findIndex = i;
                break;
            }
        }
        if (findIndex < 0) {
            Global.Data.roleData.BufferDataList.push(bufferData);
        }
        else {
            Global.Data.roleData.BufferDataList[findIndex] = bufferData;
        }
    }
    Global.AddBufferData = AddBufferData;
    /**
     * 恢复buff时间
     * @param bufferData
     */
    function RestoreBufferDataBufferSecs(bufferData) {
        if (bufferData.BufferID === BufferItemTypes.PKKingBuffer) {
            bufferData.BufferSecs = 24 * 60 * 60;
            return true;
        }
        return false;
    }
    /**
     * 检测Buffer项的显示是否结束
     * @param bufferData
     * @param nowTicks
     * @param ignoreBufferType
     */
    function IsBufferDataOver(bufferData, nowTicks = 0, ignoreBufferType = false) {
        if (bufferData.BufferID === BufferItemTypes.LifeVReserve || bufferData.BufferID === BufferItemTypes.MagicVReserve || bufferData.BufferID === BufferItemTypes.LingLiVReserve) {
            return (bufferData.BufferVal <= 0);
        }
        else if (bufferData.BufferID === BufferItemTypes.WaWaExp) {
            return (bufferData.BufferVal <= 0);
        }
        else if (bufferData.BufferID === BufferItemTypes.ErGuoTou) {
            return (bufferData.BufferSecs <= 0);
        }
        else if (bufferData.BufferID === BufferItemTypes.SLDL_SPECMACH_EXP) {
            return false;
        }
        else if (bufferData.BufferID === BufferItemTypes.SLDL_WORLDLEVEL) {
            return (bufferData.BufferVal <= 0);
        }
        else if (bufferData.BufferID === BufferItemTypes.Kuafu_Huanying) {
            return (bufferData.BufferVal <= 0);
        }
        else if (bufferData.BufferID === BufferItemTypes.LangHunLingYu_ChengHao) {
            return (bufferData.BufferVal <= 0);
        }
        else if (bufferData.BufferID === BufferItemTypes.ZhongShenZhiShen_ChengHao) {
            return (bufferData.BufferVal <= 0);
        }
        else if (bufferData.BufferID === BufferItemTypes.CoupleArena_ZhenAi_Buff) {
            return (bufferData.BufferVal <= 0);
        }
        else if (bufferData.BufferID === BufferItemTypes.CoupleArena_YongQi_Buff) {
            return (bufferData.BufferVal <= 0);
        }
        else if (bufferData.BufferID === BufferItemTypes.KingOfBattleCrystal ||
            bufferData.BufferID === BufferItemTypes.KingOfBattleBoss_GJDZY ||
            bufferData.BufferID === BufferItemTypes.KingOfBattleBoss_GJDJX ||
            bufferData.BufferID === BufferItemTypes.KingOfBattleBoss_GJDNH) {
            return (bufferData.BufferVal <= 0);
        }
        else if (bufferData.BufferID === BufferItemTypes.GuMuTimeLimit) {
            if (bufferData.StartTime !== TimeManager.getDayOfYear(new Date())) { // 日不一样就过期了
                return (bufferData.BufferSecs <= 0);
            }
            else {
                return ((bufferData.BufferVal + bufferData.BufferSecs) <= 0);
            }
        }
        else if (bufferData.BufferID === BufferItemTypes.ZuanHuang) {
            return false;
        }
        else if (bufferData.BufferID === BufferItemTypes.SLDL_JINGJICHANG_JUNXIAN) {
            return false;
        }
        else {
            if (bufferData.BufferID === BufferItemTypes.SLDL_JINGJICHANG_JUNXIAN) {
                bufferData.BufferID = bufferData.BufferID;
            }
            if (bufferData.BufferType <= 0 || ignoreBufferType) { // 因为有些临时的buffer走的也是时间消失机制
                if (bufferData.BufferSecs >= 0) {
                    if (nowTicks <= 0) {
                        nowTicks = TimeManager.getCorrectLocalTime();
                    }
                    const leftTicks = (bufferData.BufferSecs) * 1000;
                    if ((nowTicks - bufferData.StartTime) < leftTicks) {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            else {
                if (bufferData.StartTime > 0) {
                    if (bufferData.BufferSecs > 0) {
                        if (nowTicks <= 0) {
                            nowTicks = TimeManager.getCorrectLocalTime();
                        }
                        const leftTicks = (bufferData.BufferSecs) * 1000;
                        if ((nowTicks - bufferData.StartTime) < leftTicks) {
                            return false;
                        }
                    }
                    else {
                        return true;
                    }
                }
                return true;
            }
        }
        return true;
    }
    Global.IsBufferDataOver = IsBufferDataOver;
    /**
     * 物品对应相关buffer是否存在，不仅仅是物品直接关联的buffer，物品间接关联的buffer也会被判断
     * 比如 不同物品对应的vip  这个函数主要用于判断自动战斗使用buffer物品时的重复判断
     * @param goodsID
     */
    function IsGoodsRelateBufferExist(goodsID) {
        const goodsBufferId = Global.GetGoodsBindBufferID(goodsID);
        // 没有绑定buffer，通过验证
        if (goodsBufferId < 0) {
            return false;
        }
        // VIP
        if (BufferItemTypes.MonthVIP === goodsBufferId) {
            if (IsVip()) { // 是vip就已经存在
                return true;
            }
            return false;
        }
        // VIP
        if (BufferItemTypes.ErGuoTou === goodsBufferId) {
            const bufferData = GetBufferDataByID(goodsBufferId);
            if (!bufferData) {
                return false;
            }
            // 过时了则表示不存在
            if (IsBufferDataOver(bufferData, 0, false)) {
                return false;
            }
            const multiExpNum = (bufferData.BufferVal & 0x00000000FFFFFFFF);
            const goodsID2 = ((bufferData.BufferVal - multiExpNum) / Math.pow(2, 32));
            if (goodsID === goodsID2) {
                return false;
            }
            return true;
        }
        // 经验buffer,经验buffer的bufferid有好几个，任何一个存在都表示存在
        // 五倍经验 三倍经验 和 双倍经验特殊处理一下
        const expArr = [BufferItemTypes.MutilExperience, BufferItemTypes.FiveExperience, BufferItemTypes.ThreeExperience, BufferItemTypes.DblExperience];
        const currIndex = expArr.toString().indexOf(goodsBufferId.toString());
        if (currIndex >= 0) {
            let existExpBuffer = false;
            for (let n = 0; n < expArr.length; n++) {
                if (IsBufferExist(expArr[n])) {
                    existExpBuffer = true;
                }
            }
            // 不存在其他的经验buffer，通过验证
            if (existExpBuffer) {
                return true;
            }
            return false;
        }
        // 对于其它的buffer，只要存在，就返回true
        if (IsBufferExist(goodsBufferId)) {
            return true;
        }
        return false;
    }
    Global.IsGoodsRelateBufferExist = IsGoodsRelateBufferExist;
    /**
     * 攻击符咒类buffer是否存在
     */
    function IsAttackFuZhouBufferExist() {
        const typeArr = [BufferItemTypes.TimeAddAttack, BufferItemTypes.TimeAddDSAttack, BufferItemTypes.TimeAddMAttack];
        for (let n = 0; n < typeArr.length; n++) {
            if (IsBufferExist(typeArr[n])) {
                return true;
            }
        }
        return false;
    }
    Global.IsAttackFuZhouBufferExist = IsAttackFuZhouBufferExist;
    /**
     * 经验类buffer是否存在
     */
    function IsExpBufferExist() {
        const typeArr = [BufferItemTypes.MutilExperience, BufferItemTypes.FiveExperience, BufferItemTypes.ThreeExperience, BufferItemTypes.DblExperience];
        for (let n = 0; n < typeArr.length; n++) {
            if (IsBufferExist(typeArr[n])) {
                return true;
            }
        }
        return false;
    }
    Global.IsExpBufferExist = IsExpBufferExist;
    /**
     * 判断是否傀儡buffer，这类buffer不需要进行图标显示，在后台悄悄起作用
     * 比如冥界地图的1小时buffer，这类buffer能方便各种小功能的实现
     * @param bufferID
     */
    function IsDummyBuffer(bufferID) {
        switch (bufferID) {
            case BufferItemTypes.SLDL_FRESHPLAYERBUFF:
            case BufferItemTypes.JunQi:
            case BufferItemTypes.MingJieMapLimit:
            case BufferItemTypes.GuMuTimeLimit:
            case BufferItemTypes.DSTimeAddLifeNoShow:
            case BufferItemTypes.DSTimeHideNoShow:
            case BufferItemTypes.DSTimeShiDuNoShow:
            case BufferItemTypes.DSTimeAddDefenseNoShow:
            case BufferItemTypes.DSTimeAddMDefenseNoShow:
            case BufferItemTypes.FSAddHuDunNoShow:
            // case BufferItemTypes.TimeAddLifeNoShow:
            // case BufferItemTypes.TimeAddMagicNoShow:
            case BufferItemTypes.TimeFEIXUENoShow:
            case BufferItemTypes.TimeZHONGDUNoShow:
            case BufferItemTypes.TimeLINGHUNoShow:
            case BufferItemTypes.TimeRANSHAONoShow:
            case BufferItemTypes.TimeHUZHAONoShow:
            case BufferItemTypes.TimeWUDIHUZHAONoShow:
            case BufferItemTypes.LangHunLingYu_ChengHao:
            case BufferItemTypes.ZhongShenZhiShen_ChengHao:
            // 以下系统线性类属性加成不需要显示：
            case BufferItemTypes.ChengJiu: // 成就
            case BufferItemTypes.SLDL_JINGJICHANG_JUNXIAN: // 竞技场军衔
            case BufferItemTypes.ZuanHuang: // 钻皇Vip
                return true;
        }
        return false;
    }
    Global.IsDummyBuffer = IsDummyBuffer;
    /**
     * 判断是否临时的技能加的buffer，这类buffer在下边以小图标的方式显示
     * @param bufferID
     */
    function IsLittleBuffer(bufferID) {
        switch (bufferID) {
            case BufferItemTypes.DSTimeAddLifeNoShow:
            case BufferItemTypes.DSTimeHideNoShow:
            case BufferItemTypes.DSTimeShiDuNoShow:
            case BufferItemTypes.DSTimeAddDefenseNoShow:
            case BufferItemTypes.DSTimeAddMDefenseNoShow:
            case BufferItemTypes.FSAddHuDunNoShow:
                return true;
        }
        return false;
    }
    Global.IsLittleBuffer = IsLittleBuffer;
    /**
     * 判断buffer是否存在【必须有效】
     * @param bufferID
     */
    function IsBufferExist(bufferID) {
        const bufferData = GetBufferDataByID(bufferID);
        if (!bufferData)
            return false;
        // 过时了则表示不存在
        if (IsBufferDataOver(bufferData, 0, false))
            return false;
        return true;
    }
    Global.IsBufferExist = IsBufferExist;
    /**
     * 判断某角色的buffer是否存在【必须有效】
     * @param bufferID
     * @param roleData
     */
    function IsBufferExist2(bufferID, roleData) {
        const bufferData = GetBufferDataByIDAndRoleData(bufferID, roleData);
        if (!bufferData)
            return false;
        // 过时了则表示不存在
        if (IsBufferDataOver(bufferData, 0, false))
            return false;
        return true;
    }
    Global.IsBufferExist2 = IsBufferExist2;
    /**
     * 获取PK之王Sprite名字
     * @param roleData
     */
    function GetPKKingSpriteName(roleData) {
        return IsBufferExist2(BufferItemTypes.PKKingBuffer, roleData) ? "PKKing" : null;
    }
    Global.GetPKKingSpriteName = GetPKKingSpriteName;
    /**
     * 处理VIP月卡
     */
    function ProcessMonthVIP() {
        let ret = 0;
        const bufferData = GetBufferDataByID(BufferItemTypes.MonthVIP);
        if (!bufferData)
            return ret;
        if (!IsBufferDataOver(bufferData, 0, false)) {
            ret = 1;
        }
        return ret;
    }
    Global.ProcessMonthVIP = ProcessMonthVIP;
    /**
     * 返回vip类型，用于判断是月vip，季卡vip还是半年卡vip
     */
    function GetVipType() {
        const bufferData = GetBufferDataByID(BufferItemTypes.MonthVIP);
        if (null == bufferData) {
            return VIPTypes.NoVip;
        }
        if (IsBufferDataOver(bufferData, 0, false)) {
            return VIPTypes.NoVip;
        }
        return bufferData.BufferVal; // 这个值是vip具体类型
    }
    Global.GetVipType = GetVipType;
    /**
     * 是否vip
     */
    function IsVip() {
        return Global.Data.roleData.VIPLevel > 0;
    }
    Global.IsVip = IsVip;
    /**
     * 是否月vip
     */
    function IsVipOfMonth() {
        return GetVipType() === VIPTypes.Month;
    }
    Global.IsVipOfMonth = IsVipOfMonth;
    /**
     * 是否季节vip
     */
    function IsVipOfSeason() {
        return GetVipType() === VIPTypes.Season;
    }
    Global.IsVipOfSeason = IsVipOfSeason;
    /**
     * 是否半年卡vip
     */
    function IsVipOfHalfYear() {
        return GetVipType() === VIPTypes.HalfYear;
    }
    Global.IsVipOfHalfYear = IsVipOfHalfYear;
    /**
     * 返回vip的中文名称
     */
    function GetVipTypeNameString() {
        if (IsVipOfMonth())
            return Loca.getLang("白银贵族");
        else if (IsVipOfSeason())
            return Loca.getLang("黄金贵族");
        else if (IsVipOfHalfYear())
            return Loca.getLang("钻石贵族");
        return "";
    }
    Global.GetVipTypeNameString = GetVipTypeNameString;
    /**
     * 返回vip 单次奖励标志位
     */
    function GetVipOnceAwardFlagField() {
        if (IsVipOfMonth()) {
            return OnceAwardMask.UseMonthVipCard;
        }
        else if (IsVipOfSeason()) {
            return OnceAwardMask.UseSeasonVipCard;
        }
        else if (IsVipOfHalfYear()) {
            return OnceAwardMask.UseHalfYearVipCard;
        }
        return 0;
    }
    Global.GetVipOnceAwardFlagField = GetVipOnceAwardFlagField;
    /**
     * 返回当前vip状态对应的物品ID
     */
    function GetVipBindGoodsID() {
        const bufferData = GetBufferDataByID(BufferItemTypes.MonthVIP);
        if (null == bufferData) {
            return -1;
        }
        if (bufferData.BufferVal === VIPTypes.Month) {
            return 30000;
        }
        else if (bufferData.BufferVal === VIPTypes.Season) {
            return 30001;
        }
        else if (bufferData.BufferVal === VIPTypes.HalfYear) {
            return 30002;
        }
        return -1;
    }
    Global.GetVipBindGoodsID = GetVipBindGoodsID;
})(Global || (Global = {}));
//# sourceMappingURL=GlobalBufferFunction.js.map