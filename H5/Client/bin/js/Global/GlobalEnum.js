// 这个文件中放置一些全局定义的枚举
/** 游戏模块枚举 */
var EnumGameMode;
(function (EnumGameMode) {
    EnumGameMode[EnumGameMode["Invalid"] = -1] = "Invalid";
    EnumGameMode[EnumGameMode["Logo"] = 0] = "Logo";
    EnumGameMode[EnumGameMode["ShowStartupAlerts"] = 1] = "ShowStartupAlerts";
    EnumGameMode[EnumGameMode["Loading"] = 2] = "Loading";
    EnumGameMode[EnumGameMode["Login"] = 3] = "Login";
    EnumGameMode[EnumGameMode["Selector"] = 4] = "Selector";
    EnumGameMode[EnumGameMode["Creator"] = 5] = "Creator";
    EnumGameMode[EnumGameMode["Playing"] = 6] = "Playing";
    EnumGameMode[EnumGameMode["RobotTesting"] = 7] = "RobotTesting";
})(EnumGameMode || (EnumGameMode = {}));
/** UI层枚举.注: 值越小越先渲染,值越大越后渲染 */
var UILayer;
(function (UILayer) {
    UILayer[UILayer["Invalid"] = -1] = "Invalid";
    /** 调试信息显示层 */
    UILayer[UILayer["Debug"] = 0] = "Debug";
    /**头顶图标层 */
    UILayer[UILayer["RoleTitle"] = 1] = "RoleTitle";
    /**伤害数字显示层*/
    UILayer[UILayer["Hurt"] = 2] = "Hurt";
    /** View界面层,如左上角的角色头像等不可以被关闭,常驻的界面 */
    UILayer[UILayer["View"] = 3] = "View";
    /** 功能窗口层,如背包,NPC对话界面 */
    UILayer[UILayer["Window"] = 4] = "Window";
    /** 加载进度层 */
    UILayer[UILayer["Loading"] = 5] = "Loading";
    /** 网络消息等待层 */
    UILayer[UILayer["NetWaiting"] = 6] = "NetWaiting";
    /** 提示层 */
    UILayer[UILayer["Hint"] = 7] = "Hint";
    /** 层个数 */
    UILayer[UILayer["Max"] = 8] = "Max";
})(UILayer || (UILayer = {}));
/**
* 职业枚举
*/
var EnumOccupation;
(function (EnumOccupation) {
    EnumOccupation[EnumOccupation["Invalid"] = -1] = "Invalid";
    EnumOccupation[EnumOccupation["LongDan"] = 0] = "LongDan";
    EnumOccupation[EnumOccupation["HuaLing"] = 1] = "HuaLing";
    EnumOccupation[EnumOccupation["QiaoGong"] = 2] = "QiaoGong";
    EnumOccupation[EnumOccupation["DouXian"] = 4] = "DouXian";
    /** 职业个数 */
    EnumOccupation[EnumOccupation["Max"] = 3] = "Max";
    EnumOccupation[EnumOccupation["OpenedNumber"] = 3] = "OpenedNumber";
})(EnumOccupation || (EnumOccupation = {}));
/**
 * 性别枚举
 */
var EnumSex;
(function (EnumSex) {
    /** 无效值 */
    EnumSex[EnumSex["Invalid"] = -1] = "Invalid";
    /** 男性 */
    EnumSex[EnumSex["Male"] = 0] = "Male";
    /** 女性 */
    EnumSex[EnumSex["Female"] = 1] = "Female";
})(EnumSex || (EnumSex = {}));
/** 身体的部分ID */
var BodyPartIDs;
(function (BodyPartIDs) {
    BodyPartIDs[BodyPartIDs["Invalid"] = -1] = "Invalid";
    BodyPartIDs[BodyPartIDs["Head"] = 0] = "Head";
    BodyPartIDs[BodyPartIDs["Chest"] = 1] = "Chest";
    BodyPartIDs[BodyPartIDs["Hand"] = 2] = "Hand";
    BodyPartIDs[BodyPartIDs["Leg"] = 3] = "Leg";
    BodyPartIDs[BodyPartIDs["Foot"] = 4] = "Foot";
    BodyPartIDs[BodyPartIDs["Max"] = 5] = "Max";
})(BodyPartIDs || (BodyPartIDs = {}));
/** 物品种类 */
var ItemCategories;
(function (ItemCategories) {
    /** 无效种类 */
    ItemCategories[ItemCategories["Invalid"] = -1] = "Invalid";
    /** 任务道具 */
    ItemCategories[ItemCategories["ItemTask"] = 50] = "ItemTask";
    /** 骑宠类 */
    ItemCategories[ItemCategories["ItemHorsePet"] = 60] = "ItemHorsePet";
    /** 书籍类 */
    ItemCategories[ItemCategories["ItemBook"] = 70] = "ItemBook";
    /** 杂物类 */
    ItemCategories[ItemCategories["ItemOther"] = 80] = "ItemOther";
    /** 宝石类 */
    ItemCategories[ItemCategories["ItemJewel"] = 90] = "ItemJewel";
    /** 卷轴类 */
    ItemCategories[ItemCategories["ItemMagic"] = 100] = "ItemMagic";
    /** 合成材料类 */
    ItemCategories[ItemCategories["ItemMakings"] = 110] = "ItemMakings";
    /** 消耗材料类 (包括装备、坐骑等进阶强化等需要消耗的材料) */
    ItemCategories[ItemCategories["ItemMaterial"] = 120] = "ItemMaterial";
    /** 萌宠蛋类 */
    ItemCategories[ItemCategories["ItemMengchongEgg"] = 130] = "ItemMengchongEgg";
    /** 药品类 */
    ItemCategories[ItemCategories["ItemDrug"] = 180] = "ItemDrug";
    /** 一次性增加属性 (经验、灵力、货币等直接给角色增加数值) */
    ItemCategories[ItemCategories["ItemAddVal"] = 230] = "ItemAddVal";
    /** 包括临时加攻、防等道具，以及储备类、双倍经验、灵力类的道具 */
    ItemCategories[ItemCategories["ItemBuffer"] = 250] = "ItemBuffer";
    /** 经脉类物品 */
    ItemCategories[ItemCategories["JingMai"] = 251] = "JingMai";
    /** 武学类物品 */
    ItemCategories[ItemCategories["WuXue"] = 252] = "WuXue";
    /** 成就类物品 */
    ItemCategories[ItemCategories["ChengJiu"] = 253] = "ChengJiu";
    /** 荣耀护体 */
    ItemCategories[ItemCategories["RongYuHuTi"] = 255] = "RongYuHuTi";
    /** 战魂护体 */
    ItemCategories[ItemCategories["ZhanHunHuTi"] = 256] = "ZhanHunHuTi";
    /** 战旗护体 */
    ItemCategories[ItemCategories["BangQiHuTi"] = 258] = "BangQiHuTi";
    /** 普通包裹 */
    ItemCategories[ItemCategories["ItemNormalPack"] = 301] = "ItemNormalPack";
    /** 升级包裹 */
    ItemCategories[ItemCategories["ItemUpPack"] = 302] = "ItemUpPack";
    /** 银两包 */
    ItemCategories[ItemCategories["YinLiangPack"] = 401] = "YinLiangPack";
    /** 金币包 */
    ItemCategories[ItemCategories["MoneyPack"] = 501] = "MoneyPack";
    /** 神龙大陆怪物精魄 */
    ItemCategories[ItemCategories["MonsterSoul"] = 600] = "MonsterSoul";
    /** 绑定金币符 */
    ItemCategories[ItemCategories["BindMoneyFu"] = 601] = "BindMoneyFu";
    /** 宝箱类型 -- 点击后掉落物品在地上 */
    ItemCategories[ItemCategories["TreasureBox"] = 701] = "TreasureBox";
    /** 元素之心定义开始 */
    ItemCategories[ItemCategories["HeartStart"] = 800] = "HeartStart";
    /** 钢铁之心 */
    ItemCategories[ItemCategories["GangtieHeart"] = 800] = "GangtieHeart";
    /** 愤怒之心 */
    ItemCategories[ItemCategories["FengnuHeart"] = 801] = "FengnuHeart";
    /** 王者之心 */
    ItemCategories[ItemCategories["WangzeHeart"] = 802] = "WangzeHeart";
    /** 坚韧之心 */
    ItemCategories[ItemCategories["JianrenHeart"] = 803] = "JianrenHeart";
    /** 守护之心 */
    ItemCategories[ItemCategories["ShouhuHeart"] = 804] = "ShouhuHeart";
    /** 强壮之心 */
    ItemCategories[ItemCategories["QiangzhuangHeart"] = 805] = "QiangzhuangHeart";
    /** 强攻之心 */
    ItemCategories[ItemCategories["QianggongHeart"] = 806] = "QianggongHeart";
    /** 不屈之心 */
    ItemCategories[ItemCategories["BuquHeart"] = 807] = "BuquHeart";
    /** 平静之心 */
    ItemCategories[ItemCategories["PingjinHeart"] = 808] = "PingjinHeart";
    /** 警觉之心 */
    ItemCategories[ItemCategories["JingjueHeart"] = 809] = "JingjueHeart";
    /** 厌恶之心 */
    ItemCategories[ItemCategories["YanwuHeart"] = 810] = "YanwuHeart";
    /** 元素之心定义结束 */
    ItemCategories[ItemCategories["HeartEnd"] = 810] = "HeartEnd";
    /** 时装-翅膀 */
    ItemCategories[ItemCategories["Fashion_Wing"] = 700] = "Fashion_Wing";
    /** 时装-称号 */
    ItemCategories[ItemCategories["Fashion_Title"] = 702] = "Fashion_Title";
    /** 荧光宝石 */
    ItemCategories[ItemCategories["FluorescentDiamond"] = 901] = "FluorescentDiamond";
    /** 魂石定义开始 */
    ItemCategories[ItemCategories["SoulCometStoneStart"] = 910] = "SoulCometStoneStart";
    /** 魂石精华 */
    ItemCategories[ItemCategories["SoulCometStone_Essence"] = 910] = "SoulCometStone_Essence";
    /** 魂石-火 */
    ItemCategories[ItemCategories["SoulCometStone_Fire"] = 911] = "SoulCometStone_Fire";
    /** 魂石-雷 */
    ItemCategories[ItemCategories["SoulCometStone_Thurder"] = 912] = "SoulCometStone_Thurder";
    /** 魂石-风 */
    ItemCategories[ItemCategories["SoulCometStone_Wind"] = 913] = "SoulCometStone_Wind";
    /** 魂石-水 */
    ItemCategories[ItemCategories["SoulCometStone_Water"] = 914] = "SoulCometStone_Water";
    /** 魂石-冰 */
    ItemCategories[ItemCategories["SoulCometStone_Ice"] = 915] = "SoulCometStone_Ice";
    /** 魂石-土 */
    ItemCategories[ItemCategories["SoulCometStone_Earth"] = 916] = "SoulCometStone_Earth";
    /** 魂石-光 */
    ItemCategories[ItemCategories["SoulCometStone_Guang"] = 917] = "SoulCometStone_Guang";
    /** 魂石-电 */
    ItemCategories[ItemCategories["SoulCometStone_Dian"] = 918] = "SoulCometStone_Dian";
    /** 魂石-极 */
    ItemCategories[ItemCategories["SoulCometStone_Ji"] = 919] = "SoulCometStone_Ji";
    /** 魂石-冷 */
    ItemCategories[ItemCategories["SoulCometStone_Leng"] = 920] = "SoulCometStone_Leng";
    /** 魂石-霜 */
    ItemCategories[ItemCategories["SoulCometStone_Shuang"] = 921] = "SoulCometStone_Shuang";
    /** 魂石-热 */
    ItemCategories[ItemCategories["SoulCometStone_Re"] = 922] = "SoulCometStone_Re";
    /** 魂石-爆 */
    ItemCategories[ItemCategories["SoulCometStone_Bao"] = 923] = "SoulCometStone_Bao";
    /** 魂石-云 */
    ItemCategories[ItemCategories["SoulCometStone_Yun"] = 924] = "SoulCometStone_Yun";
    /** 魂石-漫 */
    ItemCategories[ItemCategories["SoulCometStone_Man"] = 925] = "SoulCometStone_Man";
    /** 魂石-雪 */
    ItemCategories[ItemCategories["SoulCometStone_Xue"] = 926] = "SoulCometStone_Xue";
    /** 魂石-封 */
    ItemCategories[ItemCategories["SoulCometStone_Feng"] = 927] = "SoulCometStone_Feng";
    /** 魂石-赤 */
    ItemCategories[ItemCategories["SoulCometStone_Chi"] = 928] = "SoulCometStone_Chi";
    /** 魂石定义结束 */
    ItemCategories[ItemCategories["SoulCometStoneEnd"] = 928] = "SoulCometStoneEnd";
    // 新的命名故意使用拼音命名，来避免和以前的混淆，防止修改时无法发现出错
    /** 头盔 */
    ItemCategories[ItemCategories["TouKui"] = 0] = "TouKui";
    /** 铠甲 */
    ItemCategories[ItemCategories["KaiJia"] = 1] = "KaiJia";
    /** 护手 */
    ItemCategories[ItemCategories["HuShou"] = 2] = "HuShou";
    /** 护腿 */
    ItemCategories[ItemCategories["HuTui"] = 3] = "HuTui";
    /** 靴子 */
    ItemCategories[ItemCategories["XueZi"] = 4] = "XueZi";
    /** 项链 */
    ItemCategories[ItemCategories["XiangLian"] = 5] = "XiangLian";
    /** 戒指 */
    ItemCategories[ItemCategories["JieZhi"] = 6] = "JieZhi";
    /** 坐骑 */
    ItemCategories[ItemCategories["JieHunJieZhi"] = 7] = "JieHunJieZhi";
    /** 翅膀 */
    ItemCategories[ItemCategories["ChiBang"] = 8] = "ChiBang";
    /** 守护宠物 */
    ItemCategories[ItemCategories["ShouHuChong"] = 9] = "ShouHuChong";
    /** 跟随宠物 */
    ItemCategories[ItemCategories["ChongWu"] = 10] = "ChongWu";
    //#region 武器类型
    /** 武器类型开始 */
    ItemCategories[ItemCategories["WeaponStart"] = 11] = "WeaponStart";
    /** 武器-剑 */
    ItemCategories[ItemCategories["WuQi_Jian"] = 11] = "WuQi_Jian";
    /** 武器-斧 */
    ItemCategories[ItemCategories["WuQi_Fu"] = 12] = "WuQi_Fu";
    /** 武器-槌 */
    ItemCategories[ItemCategories["WuQi_Chui"] = 13] = "WuQi_Chui";
    /** 武器-弓 */
    ItemCategories[ItemCategories["WuQi_Gong"] = 14] = "WuQi_Gong";
    /** 武器-弩 */
    ItemCategories[ItemCategories["WuQi_Nu"] = 15] = "WuQi_Nu";
    /** 武器-矛 */
    ItemCategories[ItemCategories["WuQi_Mao"] = 16] = "WuQi_Mao";
    /** 武器-杖 */
    ItemCategories[ItemCategories["WuQi_Zhang"] = 17] = "WuQi_Zhang";
    /** 武器-盾 */
    ItemCategories[ItemCategories["WuQi_Dun"] = 18] = "WuQi_Dun";
    /** 武器-刀 */
    ItemCategories[ItemCategories["WuQi_Dao"] = 19] = "WuQi_Dao";
    /** 武器-弓箭筒 */
    ItemCategories[ItemCategories["WuQi_GongJianTong"] = 20] = "WuQi_GongJianTong";
    /** 武器-弩箭筒 */
    ItemCategories[ItemCategories["WuQi_NuJianTong"] = 21] = "WuQi_NuJianTong";
    /** 武器类型结束 */
    ItemCategories[ItemCategories["WeaponEnd"] = 21] = "WeaponEnd";
    //#endregion 武器类型
    /** 护身符 */
    ItemCategories[ItemCategories["HuFu"] = 22] = "HuFu";
    /** 饰品 */
    ItemCategories[ItemCategories["Decoration"] = 23] = "Decoration";
    /** 时装（周年庆） */
    ItemCategories[ItemCategories["Fashion"] = 24] = "Fashion";
    /** 萌宠 */
    ItemCategories[ItemCategories["MengChongWu"] = 25] = "MengChongWu";
    /** 装备最大值 */
    ItemCategories[ItemCategories["EquipMax"] = 26] = "EquipMax";
})(ItemCategories || (ItemCategories = {}));
/** 道具品质枚举 */
var GoodsQuality;
(function (GoodsQuality) {
    GoodsQuality[GoodsQuality["White"] = 0] = "White";
    GoodsQuality[GoodsQuality["Green"] = 1] = "Green";
    GoodsQuality[GoodsQuality["Blue"] = 2] = "Blue";
    GoodsQuality[GoodsQuality["Purple"] = 3] = "Purple";
    GoodsQuality[GoodsQuality["FlashPurple"] = 4] = "FlashPurple";
    GoodsQuality[GoodsQuality["Gold"] = 5] = "Gold";
    GoodsQuality[GoodsQuality["Max"] = 6] = "Max";
})(GoodsQuality || (GoodsQuality = {}));
var GoodsColor;
(function (GoodsColor) {
    GoodsColor[GoodsColor["White"] = 1] = "White";
    GoodsColor[GoodsColor["Green"] = 2] = "Green";
    GoodsColor[GoodsColor["Blue"] = 3] = "Blue";
    GoodsColor[GoodsColor["Purple"] = 4] = "Purple";
    GoodsColor[GoodsColor["Gold"] = 5] = "Gold";
    GoodsColor[GoodsColor["Max"] = 6] = "Max";
})(GoodsColor || (GoodsColor = {}));
/**
 * 定义角色的类型
 */
var EActorType;
(function (EActorType) {
    EActorType[EActorType["Invalid"] = -1] = "Invalid";
    EActorType[EActorType["LocalPlayer"] = 0] = "LocalPlayer";
    EActorType[EActorType["NetPlayer"] = 1] = "NetPlayer";
    EActorType[EActorType["Monster"] = 2] = "Monster";
    EActorType[EActorType["NPC"] = 3] = "NPC";
    EActorType[EActorType["Pet"] = 4] = "Pet";
    EActorType[EActorType["BiaoChe"] = 5] = "BiaoChe";
    EActorType[EActorType["JunQi"] = 6] = "JunQi";
    EActorType[EActorType["FakeRole"] = 7] = "FakeRole";
    EActorType[EActorType["GoodsPack"] = 8] = "GoodsPack";
    // 下面是新加的Actor类型（因为目前所有世界对象都是基于AActor，所以会比之前多一些类型）
    /** 传送点 */
    EActorType[EActorType["Teleport"] = 9] = "Teleport";
})(EActorType || (EActorType = {}));
/**
 * 外部设置的强制阻挡的类型位设置
 */
var ForceHoldBitSets;
(function (ForceHoldBitSets) {
    ForceHoldBitSets[ForceHoldBitSets["None"] = 0] = "None";
    ForceHoldBitSets[ForceHoldBitSets["HoldRole"] = 1] = "HoldRole";
    ForceHoldBitSets[ForceHoldBitSets["HoldMonster"] = 2] = "HoldMonster";
    ForceHoldBitSets[ForceHoldBitSets["HoldNPC"] = 4] = "HoldNPC";
})(ForceHoldBitSets || (ForceHoldBitSets = {}));
/**
 * NPC的任务状态类型
 */
var NPCTaskStates;
(function (NPCTaskStates) {
    NPCTaskStates[NPCTaskStates["NONE"] = 0] = "NONE";
    NPCTaskStates[NPCTaskStates["NEWTASK"] = 1] = "NEWTASK";
    NPCTaskStates[NPCTaskStates["DOINGTASK"] = 2] = "DOINGTASK";
    NPCTaskStates[NPCTaskStates["OKTASK"] = 3] = "OKTASK";
})(NPCTaskStates || (NPCTaskStates = {}));
/**
 * 对象ID的类型分配的区间范围
 * 32位整数最大值为2,147,483,648
 * ==========Client-Only========
 * 6F00 0000 = 1,862,270,976
 * 6F50 0000 = 1,867,513,856
 * ==========Server-Syn=========
 * 7F00 0000 = 2,130,706,432
 * 7F01 0000 = 2,130,771,968
 * 7F40 0000 = 2,134,900,736
 * 7F41 0000 = 2,134,966,272
 * 7F42 0000 = 2,135,031,808
 * 7F43 0000 = 2,135,097,344
 * 7F50 0000 = 2,135,949,312
 */
var SpriteBaseIds;
(function (SpriteBaseIds) {
    // ======================= Client使用的BaseId ============================
    const ClientBaseId = 0x6F000000; // Client的BaseId开始
    SpriteBaseIds.TeleportBaseId = ClientBaseId;
    const ClientEndBaseId = 0x6F500000; // Client的BaseId结束
    // ======================= Server同步的BaseId ============================
    const ServerSynBaseId = 0x7F000000; // Server同步的BaseId开始
    // export const RoleBaseId      = 0;
    SpriteBaseIds.NpcBaseId = ServerSynBaseId;
    SpriteBaseIds.MonsterBaseId = 0x7F010000;
    SpriteBaseIds.PetBaseId = 0x7F400000;
    SpriteBaseIds.BiaoCheBaseId = 0x7F410000;
    SpriteBaseIds.JunQiBaseId = 0x7F420000;
    SpriteBaseIds.FakeRoleBaseId = 0x7F430000;
    SpriteBaseIds.MaxId = 0x7F500000;
    const ServerSynEndBaseId = SpriteBaseIds.MaxId; // Server同步的BaseId结束
    /**
     * 获取传送点在当前场景中的唯一对象ID（当前场景中的所有对象ID都是唯一的）
     * @param nTeleportID 传送点在数据表中的ID（注：一个关卡中该ID是唯一的）
     */
    function calcTeleportActorID(nTeleportID) {
        return SpriteBaseIds.TeleportBaseId + nTeleportID;
    }
    SpriteBaseIds.calcTeleportActorID = calcTeleportActorID;
    /**
     * 获取传送点的在数据表中的ID
     * @param nTeleportActorID 传送点在当前场景中的唯一对象ID
     */
    function calcTeleportID(nTeleportActorID) {
        return nTeleportActorID - SpriteBaseIds.TeleportBaseId;
    }
    SpriteBaseIds.calcTeleportID = calcTeleportID;
    /**
     * 计算NPC的角色ID
     * @param npcID 指定要计算角色ID的NPC的数据表ID.注: 一个关卡中NPC的数据表ID是唯一的.
     */
    function calcNpcRoleId(npcID) {
        return SpriteBaseIds.NpcBaseId + npcID;
    }
    SpriteBaseIds.calcNpcRoleId = calcNpcRoleId;
    /**
     * 由Npc的角色ID计算出NPC的数据表Id
     * @param npcRoleId 指定要计算数据表Id的NPC的角色ID
     */
    function calcNpcId(npcRoleId) {
        return npcRoleId - SpriteBaseIds.NpcBaseId;
    }
    SpriteBaseIds.calcNpcId = calcNpcId;
})(SpriteBaseIds || (SpriteBaseIds = {}));
/**
 * 场景UI类型定义,每种类型包括一组mapCode
 */
var SceneUIClasses;
(function (SceneUIClasses) {
    SceneUIClasses[SceneUIClasses["Normal"] = 0] = "Normal";
    SceneUIClasses[SceneUIClasses["NormalCopy"] = 1] = "NormalCopy";
    SceneUIClasses[SceneUIClasses["DianJiangCopy"] = 2] = "DianJiangCopy";
    SceneUIClasses[SceneUIClasses["CaiShenMiaoCopy"] = 3] = "CaiShenMiaoCopy";
    SceneUIClasses[SceneUIClasses["TaskCopy"] = 4] = "TaskCopy";
    SceneUIClasses[SceneUIClasses["BloodCastle"] = 5] = "BloodCastle";
    SceneUIClasses[SceneUIClasses["Demon"] = 6] = "Demon";
    SceneUIClasses[SceneUIClasses["Battle"] = 7] = "Battle";
    SceneUIClasses[SceneUIClasses["NewPlayerMap"] = 8] = "NewPlayerMap";
    SceneUIClasses[SceneUIClasses["JingYanFuBen"] = 9] = "JingYanFuBen";
    SceneUIClasses[SceneUIClasses["KaLiMaTemple"] = 10] = "KaLiMaTemple";
    SceneUIClasses[SceneUIClasses["EMoLaiXiCopy"] = 11] = "EMoLaiXiCopy";
    SceneUIClasses[SceneUIClasses["PKKing"] = 12] = "PKKing";
    SceneUIClasses[SceneUIClasses["AngelTemple"] = 13] = "AngelTemple";
    SceneUIClasses[SceneUIClasses["BossFamily"] = 14] = "BossFamily";
    SceneUIClasses[SceneUIClasses["HuangJinShengDian"] = 15] = "HuangJinShengDian";
    SceneUIClasses[SceneUIClasses["JingJiChang"] = 16] = "JingJiChang";
    SceneUIClasses[SceneUIClasses["PaTa"] = 17] = "PaTa";
    SceneUIClasses[SceneUIClasses["JinBiFuBen"] = 18] = "JinBiFuBen";
    SceneUIClasses[SceneUIClasses["QiJiMiJing"] = 19] = "QiJiMiJing";
    SceneUIClasses[SceneUIClasses["GuZhanChang"] = 20] = "GuZhanChang";
    SceneUIClasses[SceneUIClasses["ShuiJingHuanJing"] = 21] = "ShuiJingHuanJing";
    SceneUIClasses[SceneUIClasses["FamilyBoss"] = 22] = "FamilyBoss";
    SceneUIClasses[SceneUIClasses["LuolanFazhen"] = 23] = "LuolanFazhen";
    SceneUIClasses[SceneUIClasses["LuoLanChengZhan"] = 24] = "LuoLanChengZhan";
    SceneUIClasses[SceneUIClasses["HuanYingSiYuan"] = 25] = "HuanYingSiYuan";
    SceneUIClasses[SceneUIClasses["TianTi"] = 26] = "TianTi";
    SceneUIClasses[SceneUIClasses["YongZheZhanChang"] = 27] = "YongZheZhanChang";
    SceneUIClasses[SceneUIClasses["ElementWar"] = 28] = "ElementWar";
    SceneUIClasses[SceneUIClasses["MoRiJudge"] = 29] = "MoRiJudge";
    SceneUIClasses[SceneUIClasses["LoveFuBen"] = 30] = "LoveFuBen";
    SceneUIClasses[SceneUIClasses["KuaFuBoss"] = 31] = "KuaFuBoss";
    SceneUIClasses[SceneUIClasses["KuaFuMap"] = 32] = "KuaFuMap";
    SceneUIClasses[SceneUIClasses["OnePiece"] = 33] = "OnePiece";
    SceneUIClasses[SceneUIClasses["CopyWolf"] = 34] = "CopyWolf";
    SceneUIClasses[SceneUIClasses["LangHunLingYu"] = 35] = "LangHunLingYu";
    SceneUIClasses[SceneUIClasses["ZhongShenZhengBa"] = 36] = "ZhongShenZhengBa";
    SceneUIClasses[SceneUIClasses["HuanShuYuan"] = 37] = "HuanShuYuan";
    SceneUIClasses[SceneUIClasses["PKLovers"] = 38] = "PKLovers";
    SceneUIClasses[SceneUIClasses["KuaFuWangZhe"] = 39] = "KuaFuWangZhe";
    SceneUIClasses[SceneUIClasses["BaoShiFuBen"] = 1000] = "BaoShiFuBen";
    SceneUIClasses[SceneUIClasses["VIPFuBen"] = 1001] = "VIPFuBen";
    SceneUIClasses[SceneUIClasses["ShaBaKeChengZhan"] = 1002] = "ShaBaKeChengZhan";
    SceneUIClasses[SceneUIClasses["KFXuHuanFuBen"] = 1003] = "KFXuHuanFuBen";
    //  其他
    SceneUIClasses[SceneUIClasses["UnDefined"] = 9999] = "UnDefined";
    //  自定义组仅程序使用- 请不要在Settings.xml表中配置这些类型
    SceneUIClasses[SceneUIClasses["All"] = 10000] = "All";
    SceneUIClasses[SceneUIClasses["KuaFuCopy"] = 10001] = "KuaFuCopy";
    // 自定义组仅程序使用- 请不要在Settings.xml表中配置这些类型
})(SceneUIClasses || (SceneUIClasses = {}));
/**
 * 定义任务类型
 */
var TaskClasses;
(function (TaskClasses) {
    TaskClasses[TaskClasses["Invalid"] = -1] = "Invalid";
    TaskClasses[TaskClasses["Main"] = 0] = "Main";
    TaskClasses[TaskClasses["DailyTask"] = 8] = "DailyTask";
    TaskClasses[TaskClasses["PriceTask"] = 9] = "PriceTask";
    TaskClasses[TaskClasses["GuideTask"] = 10] = "GuideTask";
})(TaskClasses || (TaskClasses = {}));
/**
 * 地图类型定义
 */
var MapTypes;
(function (MapTypes) {
    MapTypes[MapTypes["Normal"] = 0] = "Normal";
    MapTypes[MapTypes["NormalCopy"] = 1] = "NormalCopy";
    MapTypes[MapTypes["DianJiangCopy"] = 2] = "DianJiangCopy";
    MapTypes[MapTypes["CaiShenMiaoCopy"] = 3] = "CaiShenMiaoCopy";
    MapTypes[MapTypes["TaskCopy"] = 4] = "TaskCopy";
    MapTypes[MapTypes["JingJiChang"] = 5] = "JingJiChang";
    MapTypes[MapTypes["HuanYingSiYuan"] = 6] = "HuanYingSiYuan";
    MapTypes[MapTypes["MarriageCopy"] = 7] = "MarriageCopy";
    MapTypes[MapTypes["Max"] = 8] = "Max";
})(MapTypes || (MapTypes = {}));
var GongNengIDs;
(function (GongNengIDs) {
    GongNengIDs[GongNengIDs["None"] = -1] = "None";
    GongNengIDs[GongNengIDs["QiFu"] = 1] = "QiFu";
    GongNengIDs[GongNengIDs["BaiTan"] = 2] = "BaiTan";
    GongNengIDs[GongNengIDs["Friend"] = 4] = "Friend";
    GongNengIDs[GongNengIDs["MoYanDong"] = 5] = "MoYanDong";
    GongNengIDs[GongNengIDs["LianLu"] = 6] = "LianLu";
    GongNengIDs[GongNengIDs["HeCheng"] = 8] = "HeCheng";
    GongNengIDs[GongNengIDs["PaiHangBang"] = 10] = "PaiHangBang";
    GongNengIDs[GongNengIDs["JingJiChang"] = 11] = "JingJiChang";
    GongNengIDs[GongNengIDs["ZhamMeng"] = 12] = "ZhamMeng";
    GongNengIDs[GongNengIDs["MingXiang"] = 14] = "MingXiang";
    GongNengIDs[GongNengIDs["GuaJi"] = 15] = "GuaJi";
    GongNengIDs[GongNengIDs["Demon"] = 16] = "Demon";
    GongNengIDs[GongNengIDs["BloodCastle"] = 18] = "BloodCastle";
    GongNengIDs[GongNengIDs["GamePayerRolePartChiBang"] = 19] = "GamePayerRolePartChiBang";
    GongNengIDs[GongNengIDs["JinBiFuBen"] = 20] = "JinBiFuBen";
    GongNengIDs[GongNengIDs["PaTa"] = 21] = "PaTa";
    GongNengIDs[GongNengIDs["GuZhanChang"] = 22] = "GuZhanChang";
    GongNengIDs[GongNengIDs["ZuDuiFuBen"] = 23] = "ZuDuiFuBen";
    GongNengIDs[GongNengIDs["AngelTemple"] = 30] = "AngelTemple";
    GongNengIDs[GongNengIDs["XiLian"] = 31] = "XiLian";
    GongNengIDs[GongNengIDs["GamePayerRolePartXingZuo"] = 32] = "GamePayerRolePartXingZuo";
    GongNengIDs[GongNengIDs["FengYunZhi"] = 33] = "FengYunZhi";
    GongNengIDs[GongNengIDs["RiChangRenWu"] = 35] = "RiChangRenWu";
    GongNengIDs[GongNengIDs["GuideRenWu"] = 36] = "GuideRenWu";
    GongNengIDs[GongNengIDs["ZhuiJia"] = 37] = "ZhuiJia";
    GongNengIDs[GongNengIDs["JingYanFuBen"] = 38] = "JingYanFuBen";
    GongNengIDs[GongNengIDs["PKKing"] = 39] = "PKKing";
    GongNengIDs[GongNengIDs["Honour"] = 40] = "Honour";
    GongNengIDs[GongNengIDs["TaoFaRenWu"] = 41] = "TaoFaRenWu";
    GongNengIDs[GongNengIDs["ShuiJingHuanJing"] = 42] = "ShuiJingHuanJing";
    GongNengIDs[GongNengIDs["YuanSuHeart"] = 43] = "YuanSuHeart";
    GongNengIDs[GongNengIDs["JingLingSystem"] = 44] = "JingLingSystem";
    GongNengIDs[GongNengIDs["LieQuYuanSu"] = 45] = "LieQuYuanSu";
    GongNengIDs[GongNengIDs["LingYU"] = 50] = "LingYU";
    GongNengIDs[GongNengIDs["ZhuLing"] = 51] = "ZhuLing";
    GongNengIDs[GongNengIDs["ZhuHun"] = 52] = "ZhuHun";
    GongNengIDs[GongNengIDs["ChengJiuFuWen"] = 53] = "ChengJiuFuWen";
    GongNengIDs[GongNengIDs["ZaiZao"] = 54] = "ZaiZao";
    GongNengIDs[GongNengIDs["ShengWangXunZhang"] = 55] = "ShengWangXunZhang";
    GongNengIDs[GongNengIDs["KuafuHuanyingsiyuan"] = 57] = "KuafuHuanyingsiyuan";
    GongNengIDs[GongNengIDs["Marray"] = 58] = "Marray";
    GongNengIDs[GongNengIDs["GuardStatue"] = 60] = "GuardStatue";
    GongNengIDs[GongNengIDs["MeiLanZhiShu"] = 61] = "MeiLanZhiShu";
    GongNengIDs[GongNengIDs["TianTiJingSai"] = 62] = "TianTiJingSai";
    GongNengIDs[GongNengIDs["MoriShenPan"] = 63] = "MoriShenPan";
    GongNengIDs[GongNengIDs["YuansuShiLian"] = 64] = "YuansuShiLian";
    GongNengIDs[GongNengIDs["KuafuHuodongBOSS"] = 65] = "KuafuHuodongBOSS";
    GongNengIDs[GongNengIDs["YongZheZhanChang"] = 66] = "YongZheZhanChang";
    GongNengIDs[GongNengIDs["ShengWuXiTong"] = 67] = "ShengWuXiTong";
    GongNengIDs[GongNengIDs["FluorescentDiamond"] = 68] = "FluorescentDiamond";
    GongNengIDs[GongNengIDs["DailyPrivilege"] = 69] = "DailyPrivilege";
    GongNengIDs[GongNengIDs["LingDI"] = 70] = "LingDI";
    GongNengIDs[GongNengIDs["LangHunLingYu"] = 71] = "LangHunLingYu";
    GongNengIDs[GongNengIDs["SoulCometStonePowder"] = 73] = "SoulCometStonePowder";
    GongNengIDs[GongNengIDs["LangHunYaoSai"] = 74] = "LangHunYaoSai";
    GongNengIDs[GongNengIDs["GrowFund"] = 75] = "GrowFund";
    GongNengIDs[GongNengIDs["JingLingJiNeng"] = 76] = "JingLingJiNeng";
    GongNengIDs[GongNengIDs["BangHuiShenDian"] = 77] = "BangHuiShenDian";
    GongNengIDs[GongNengIDs["KuaFuWangZhe"] = 78] = "KuaFuWangZhe";
    GongNengIDs[GongNengIDs["PKLovers"] = 80] = "PKLovers";
    GongNengIDs[GongNengIDs["FashionBag"] = 81] = "FashionBag";
    GongNengIDs[GongNengIDs["CouleWish"] = 82] = "CouleWish";
    GongNengIDs[GongNengIDs["MengchongPart"] = 83] = "MengchongPart";
    GongNengIDs[GongNengIDs["ZhuanBeiHuiShou"] = 84] = "ZhuanBeiHuiShou";
    GongNengIDs[GongNengIDs["MengchongHuasheng"] = 85] = "MengchongHuasheng";
    GongNengIDs[GongNengIDs["SkillSetup"] = 3000] = "SkillSetup";
    GongNengIDs[GongNengIDs["HideTaskBoxJianTou"] = 10000] = "HideTaskBoxJianTou";
})(GongNengIDs || (GongNengIDs = {}));
/**
 * 战斗阵营类型
 */
var BattleWhichSides;
(function (BattleWhichSides) {
    BattleWhichSides[BattleWhichSides["Sui"] = 1] = "Sui";
    BattleWhichSides[BattleWhichSides["Tang"] = 2] = "Tang";
})(BattleWhichSides || (BattleWhichSides = {}));
/**
 * 任务类型
 */
var TaskTypes;
(function (TaskTypes) {
    TaskTypes[TaskTypes["None"] = -1] = "None";
    TaskTypes[TaskTypes["Talk"] = 0] = "Talk";
    TaskTypes[TaskTypes["KillMonster"] = 1] = "KillMonster";
    TaskTypes[TaskTypes["MonsterSomething"] = 2] = "MonsterSomething";
    TaskTypes[TaskTypes["BuySomething"] = 3] = "BuySomething";
    TaskTypes[TaskTypes["UseSomething"] = 4] = "UseSomething";
    TaskTypes[TaskTypes["TransferSomething"] = 5] = "TransferSomething";
    TaskTypes[TaskTypes["GetSomething"] = 6] = "GetSomething";
    TaskTypes[TaskTypes["NeedYuanBao"] = 7] = "NeedYuanBao";
    TaskTypes[TaskTypes["CaiJiGoods"] = 8] = "CaiJiGoods";
    TaskTypes[TaskTypes["ZhiLiao"] = 9] = "ZhiLiao";
    TaskTypes[TaskTypes["FangHuo"] = 10] = "FangHuo";
    TaskTypes[TaskTypes["KillMonsterForLevel"] = 11] = "KillMonsterForLevel";
    TaskTypes[TaskTypes["JoinFamily"] = 12] = "JoinFamily";
    TaskTypes[TaskTypes["CompleteOnceDailyTask"] = 13] = "CompleteOnceDailyTask";
    TaskTypes[TaskTypes["JoinJingjichang"] = 14] = "JoinJingjichang";
    TaskTypes[TaskTypes["WinJingjichang"] = 15] = "WinJingjichang";
    TaskTypes[TaskTypes["GetEquipFromChouJiang"] = 16] = "GetEquipFromChouJiang";
    TaskTypes[TaskTypes["JoinBuluoyingdi"] = 17] = "JoinBuluoyingdi";
    TaskTypes[TaskTypes["JoinLuohanxingzhen"] = 18] = "JoinLuohanxingzhen";
    TaskTypes[TaskTypes["MergeHighlevelLingdan"] = 19] = "MergeHighlevelLingdan";
    TaskTypes[TaskTypes["AddFriend"] = 20] = "AddFriend";
    TaskTypes[TaskTypes["XingyaoGuhuangShengjie"] = 21] = "XingyaoGuhuangShengjie";
    TaskTypes[TaskTypes["JoinDouJiZhiWang"] = 22] = "JoinDouJiZhiWang";
    TaskTypes[TaskTypes["SuoMoTa"] = 23] = "SuoMoTa";
})(TaskTypes || (TaskTypes = {}));
/** 物品使用限制的类型 */
class GoodRequirementTypes {
}
GoodRequirementTypes.VIP = "VIP"; // vip对应的值不管,默认采用-1
GoodRequirementTypes.WingSuit = "WingSuit"; // 翅膀阶级
GoodRequirementTypes.EquipSuit = "EquipSuit"; // 装备阶数
GoodRequirementTypes.QiangHuaLevel = "QiangHuaLevel"; // 强化等级
GoodRequirementTypes.ZhuiJiaLevel = "ZhuiJiaLevel"; // 追加等级
GoodRequirementTypes.ChengJiuLevel = "ChengJiuLevel"; // 成就阶数
GoodRequirementTypes.JunXianLevel = "JunXianLevel"; // 军衔阶数
GoodRequirementTypes.ZhuanShengLevel = "ZhuanShengLevel"; // 转身等级
GoodRequirementTypes.Level = "Level"; // 角色等级
GoodRequirementTypes.HuFuSuit = "HuFuSuit"; // 护身符阶数
GoodRequirementTypes.PetLevel = "PetLevel"; // 宠物等级
GoodRequirementTypes.YuanSuZhiXinLevel = "YuanSuZhiXinLevel"; // 元素之心等级
GoodRequirementTypes.DaTianShiSuit = "DaTianShiSuit"; // 大天使阶数
GoodRequirementTypes.NeedTask = "NeedTask"; // 需要完成X转X级主线任务XXXX
GoodRequirementTypes.CanNotBeyondLevel = "CanNotBeyondLevel"; // 达到等级以上无法使用
GoodRequirementTypes.FEIANQUANQU = "FEIANQUANQU"; // 不能在安全区使用
GoodRequirementTypes.NeedMarry = "NeedMarry"; // 已结婚
GoodRequirementTypes.NeedBangHui = "NeedBangHui"; // 加入帮会
GoodRequirementTypes.PKKingFinals = "PKKingFinals"; // 斗技之王决赛
/** 角色通用属性索引  */
var RoleCommonUseIntParamsIndexs;
(function (RoleCommonUseIntParamsIndexs) {
    /** 成就 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["ChengJiu"] = 0] = "ChengJiu";
    /** 装备积分 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["ZhuangBeiJiFen"] = 1] = "ZhuangBeiJiFen";
    /** 猎杀值 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["LieShaZhi"] = 2] = "LieShaZhi";
    /** 悟性值 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["WuXingZhi"] = 3] = "WuXingZhi";
    /** 真气值 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["ZhenQiZhi"] = 4] = "ZhenQiZhi";
    /** 天地精元值 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["TianDiJingYuan"] = 5] = "TianDiJingYuan";
    /** 试炼令值 ==>通天令 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["ShiLianLing"] = 6] = "ShiLianLing";
    /** 经脉等级值---通过真气值升级 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["JingMaiLevel"] = 7] = "JingMaiLevel";
    /** 武学等级值---通过悟性值升级 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["WuXueLevel"] = 8] = "WuXueLevel";
    /** 钻皇等级值---通过累积充值升级 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["ZuanHuangLevel"] = 9] = "ZuanHuangLevel";
    /** 系统激活项值---用于记录界面相关元素 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["SystemOpenValue"] = 10] = "SystemOpenValue";
    /** 军功值，玩家做任务获取 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["JunGong"] = 11] = "JunGong";
    /** 开服在线奖励DayID */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["KaiFuOnlineDayID"] = 12] = "KaiFuOnlineDayID";
    /** 达到60或者100级的记忆 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["To60or100"] = 13] = "To60or100";
    /** 战魂值 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["ZhanHun"] = 14] = "ZhanHun";
    /** 荣耀值 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["RongYu"] = 15] = "RongYu";
    /** 战魂等级 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["ZhanHunLevel"] = 16] = "ZhanHunLevel";
    /** 荣耀等级 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["RongYuLevel"] = 17] = "RongYuLevel";
    /** 声望 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["ShengWang"] = 18] = "ShengWang";
    /** 声望等级 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["ShengWangLevel"] = 19] = "ShengWangLevel";
    /** 锁魔塔当前层编号 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["WanMoTaCurrLayerOrder"] = 20] = "WanMoTaCurrLayerOrder";
    /** 星曜值 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["StarSoulValue"] = 21] = "StarSoulValue";
    /** 成就等级 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["ChengJiuLevel"] = 22] = "ChengJiuLevel";
    /** 元素值 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["YuansuFenmo"] = 23] = "YuansuFenmo";
    /** 精灵积分 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["PetJiFen"] = 24] = "PetJiFen";
    /** 魔核 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["MoHeValue"] = 25] = "MoHeValue";
    /** 时装-翅膀 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["FashionWingsID"] = 26] = "FashionWingsID";
    /** 再造点 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["ZaizaoDian"] = 27] = "ZaizaoDian";
    /** 月卡奖励是否开启 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["MonthCard"] = 28] = "MonthCard";
    /** 守护雕像 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["GuardStatue"] = 29] = "GuardStatue";
    /** 时装-称号 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["TitleID"] = 30] = "TitleID";
    /** 荧光宝石 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["FluorescentPoint"] = 31] = "FluorescentPoint";
    /** 藏宝积分 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["TreasureJiFen"] = 32] = "TreasureJiFen";
    /** 藏宝血钻 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["TreasureXueZuan"] = 33] = "TreasureXueZuan";
    /** 狼魂粉末 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["LangHunFenMo"] = 34] = "LangHunFenMo";
    /** 众神争霸武道点数 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["ZhengBaPoint"] = 35] = "ZhengBaPoint";
    /** 视频聊天按钮 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["VideoButton"] = 36] = "VideoButton";
    /** 独尊战场点数 */
    RoleCommonUseIntParamsIndexs[RoleCommonUseIntParamsIndexs["KingOfBattlePoint"] = 37] = "KingOfBattlePoint";
})(RoleCommonUseIntParamsIndexs || (RoleCommonUseIntParamsIndexs = {}));
/**
 * 跑步或者走路后附加的操作类型
 */
var ExtActionTypes;
(function (ExtActionTypes) {
    ExtActionTypes[ExtActionTypes["EXTACTION_NONE"] = 0] = "EXTACTION_NONE";
    ExtActionTypes[ExtActionTypes["EXTACTION_NPCDLG"] = 1] = "EXTACTION_NPCDLG";
    ExtActionTypes[ExtActionTypes["EXTACTION_KILLMONSTER"] = 2] = "EXTACTION_KILLMONSTER";
    ExtActionTypes[ExtActionTypes["EXTACTION_GETGOODSPACK"] = 3] = "EXTACTION_GETGOODSPACK";
    ExtActionTypes[ExtActionTypes["EXTACTION_CAIJI"] = 4] = "EXTACTION_CAIJI";
    ExtActionTypes[ExtActionTypes["EXTACTION_ATTACKENEMY"] = 5] = "EXTACTION_ATTACKENEMY";
    ExtActionTypes[ExtActionTypes["EXTACTION_ATTACKBOSS"] = 6] = "EXTACTION_ATTACKBOSS";
})(ExtActionTypes || (ExtActionTypes = {}));
/**自动战斗时间类型 */
var EnumAutoFight_EventType;
(function (EnumAutoFight_EventType) {
    EnumAutoFight_EventType[EnumAutoFight_EventType["EnumAutoFight_EventType_null"] = -1] = "EnumAutoFight_EventType_null";
    EnumAutoFight_EventType[EnumAutoFight_EventType["EnumAutoFight_EventType_FindRoadEnd"] = 0] = "EnumAutoFight_EventType_FindRoadEnd";
    EnumAutoFight_EventType[EnumAutoFight_EventType["EnumAutoFight_EventType_Num"] = 1] = "EnumAutoFight_EventType_Num";
})(EnumAutoFight_EventType || (EnumAutoFight_EventType = {}));
/** 物品所属类型 */
var GoodsOwnerTypes;
(function (GoodsOwnerTypes) {
    /** 无数据支持 */
    GoodsOwnerTypes[GoodsOwnerTypes["None"] = -1] = "None";
    /** 自己背包中的 */
    GoodsOwnerTypes[GoodsOwnerTypes["SelfBag"] = 0] = "SelfBag";
    /** 其他人的(角色栏中) */
    GoodsOwnerTypes[GoodsOwnerTypes["OtherRole"] = 1] = "OtherRole";
    /** 掉落的 */
    GoodsOwnerTypes[GoodsOwnerTypes["FallGoods"] = 2] = "FallGoods";
    /** 物品交易窗口中的 */
    GoodsOwnerTypes[GoodsOwnerTypes["Exchange"] = 3] = "Exchange";
    /** 自己摆摊窗口中的 */
    GoodsOwnerTypes[GoodsOwnerTypes["SelfStall"] = 4] = "SelfStall";
    /** 他人摆摊窗口中的 */
    GoodsOwnerTypes[GoodsOwnerTypes["OtherStall"] = 5] = "OtherStall";
    /** 自己随身仓库窗口 */
    GoodsOwnerTypes[GoodsOwnerTypes["SelfPet"] = 6] = "SelfPet";
    /** 临时解开的物品包 */
    GoodsOwnerTypes[GoodsOwnerTypes["GoodsPack"] = 7] = "GoodsPack";
    /** 自己挂售窗口中的 */
    GoodsOwnerTypes[GoodsOwnerTypes["SelfOnSale"] = 8] = "SelfOnSale";
    /** 他人挂售窗口中的 */
    GoodsOwnerTypes[GoodsOwnerTypes["OtherOnSale"] = 9] = "OtherOnSale";
    /** 挂售物品列表中的 */
    GoodsOwnerTypes[GoodsOwnerTypes["AllOthersOnSale"] = 10] = "AllOthersOnSale";
    /** 挖宝得到的物品 */
    GoodsOwnerTypes[GoodsOwnerTypes["WaBaoGoods"] = 11] = "WaBaoGoods";
    /** 系统送礼中的物品 */
    GoodsOwnerTypes[GoodsOwnerTypes["SysGifts"] = 12] = "SysGifts";
    /** 进阶后的物品 */
    GoodsOwnerTypes[GoodsOwnerTypes["UpgradeEquip"] = 13] = "UpgradeEquip";
    /** 其他人的(排行榜中) */
    GoodsOwnerTypes[GoodsOwnerTypes["OtherRole2"] = 14] = "OtherRole2";
    /** 任务信息 */
    GoodsOwnerTypes[GoodsOwnerTypes["ViewTaskInfo"] = 15] = "ViewTaskInfo";
    /** 杨公宝库 */
    GoodsOwnerTypes[GoodsOwnerTypes["YangGongBK"] = 16] = "YangGongBK";
    /** 快速精炼 */
    GoodsOwnerTypes[GoodsOwnerTypes["QuickEnchance"] = 17] = "QuickEnchance";
    /** 快速锻造 */
    GoodsOwnerTypes[GoodsOwnerTypes["QuickForge"] = 18] = "QuickForge";
    /** 聊天中的物品 */
    GoodsOwnerTypes[GoodsOwnerTypes["ChatGoods"] = 19] = "ChatGoods";
    /** email附件中的物品 */
    GoodsOwnerTypes[GoodsOwnerTypes["EmailFujian"] = 20] = "EmailFujian";
    /** npc出售列表中的物品 */
    GoodsOwnerTypes[GoodsOwnerTypes["NPCSale"] = 21] = "NPCSale";
    /** npc出售列表中的物品 */
    GoodsOwnerTypes[GoodsOwnerTypes["BaoKuJiangLi"] = 22] = "BaoKuJiangLi";
    /** 商城出售列表中的物品 */
    GoodsOwnerTypes[GoodsOwnerTypes["mallSale"] = 23] = "mallSale";
    /** 自己背包中的物品但不显示菜单，比如炼炉、合成等界面中使用 */
    GoodsOwnerTypes[GoodsOwnerTypes["SelfBagNoMenu"] = 24] = "SelfBagNoMenu";
    /** 炼炉列表中的物品 */
    GoodsOwnerTypes[GoodsOwnerTypes["Lianlu"] = 25] = "Lianlu";
    /** 新手引导中的物品 */
    GoodsOwnerTypes[GoodsOwnerTypes["Guide"] = 26] = "Guide";
    /** 交易所中的物品 */
    GoodsOwnerTypes[GoodsOwnerTypes["JiaoYiShuo"] = 27] = "JiaoYiShuo";
    /** 元素背包中的物品 */
    GoodsOwnerTypes[GoodsOwnerTypes["YuansuBag"] = 28] = "YuansuBag";
    /** 荧光宝石背包中的物品 */
    GoodsOwnerTypes[GoodsOwnerTypes["FluorescentDiamondBag"] = 29] = "FluorescentDiamondBag";
    /** 魂石背包中的物品 */
    GoodsOwnerTypes[GoodsOwnerTypes["SoulCometStoneBag"] = 30] = "SoulCometStoneBag";
    /** 王者商城中的物品 */
    GoodsOwnerTypes[GoodsOwnerTypes["WangZheShangCheng"] = 31] = "WangZheShangCheng";
    /** 老玩家 */
    GoodsOwnerTypes[GoodsOwnerTypes["LaoWanJiaShangCheng"] = 32] = "LaoWanJiaShangCheng";
    /** 骑宠栏的物品 */
    GoodsOwnerTypes[GoodsOwnerTypes["QichongBag"] = 33] = "QichongBag";
    /** 斗气商人,帮会商人,寻龙商人,归属 */
    GoodsOwnerTypes[GoodsOwnerTypes["DuiHuanBusinessmanOwner"] = 34] = "DuiHuanBusinessmanOwner";
})(GoodsOwnerTypes || (GoodsOwnerTypes = {}));
/** 物品价格单位类型 */
var GoodsPriceUnitTypes;
(function (GoodsPriceUnitTypes) {
    /** 无 */
    GoodsPriceUnitTypes[GoodsPriceUnitTypes["None"] = -1] = "None";
    /** 金币 */
    GoodsPriceUnitTypes[GoodsPriceUnitTypes["Jinbi"] = 0] = "Jinbi";
    /** 积分 */
    GoodsPriceUnitTypes[GoodsPriceUnitTypes["Jifen"] = 1] = "Jifen";
    /** 钻石 */
    GoodsPriceUnitTypes[GoodsPriceUnitTypes["Zhuanshi"] = 2] = "Zhuanshi";
    /** 绑定钻石 */
    GoodsPriceUnitTypes[GoodsPriceUnitTypes["BindZhuanshi"] = 3] = "BindZhuanshi";
    /** 绑定金币 */
    GoodsPriceUnitTypes[GoodsPriceUnitTypes["BindJinBi"] = 4] = "BindJinBi";
    /** 王者点数 */
    GoodsPriceUnitTypes[GoodsPriceUnitTypes["KingOfBattlePoint"] = 5] = "KingOfBattlePoint";
})(GoodsPriceUnitTypes || (GoodsPriceUnitTypes = {}));
/** 货币类型 */
var MoneyTypes;
(function (MoneyTypes) {
    MoneyTypes[MoneyTypes["None"] = 0] = "None";
    /** 金币 => 现在叫绑定金币 */
    MoneyTypes[MoneyTypes["TongQian"] = 1] = "TongQian";
    /** 银两 => 现在叫金币 */
    MoneyTypes[MoneyTypes["YinLiang"] = 8] = "YinLiang";
    /** 精元值 => 现在叫斗气 */
    MoneyTypes[MoneyTypes["JingYuanZhi"] = 13] = "JingYuanZhi";
    /** 军功值 */
    MoneyTypes[MoneyTypes["JunGongZhi"] = 14] = "JunGongZhi";
    /** 猎杀值 */
    MoneyTypes[MoneyTypes["LieShaZhi"] = 20] = "LieShaZhi";
    /** 积分值 */
    MoneyTypes[MoneyTypes["JiFenZhi"] = 30] = "JiFenZhi";
    /** 钻石 */
    MoneyTypes[MoneyTypes["YuanBao"] = 40] = "YuanBao";
    /** 绑定钻石 */
    MoneyTypes[MoneyTypes["BindYuanBao"] = 50] = "BindYuanBao";
    /** 战魂值 */
    MoneyTypes[MoneyTypes["ZhanHun"] = 90] = "ZhanHun";
    /** 宝藏积分 */
    MoneyTypes[MoneyTypes["BaoZangJiFen"] = 110] = "BaoZangJiFen";
    /** 宝藏血钻 */
    MoneyTypes[MoneyTypes["BaoZangXueZuan"] = 111] = "BaoZangXueZuan";
    /** 王者点数 */
    MoneyTypes[MoneyTypes["KingOfBattlePoint"] = 112] = "KingOfBattlePoint";
})(MoneyTypes || (MoneyTypes = {}));
/** 怪物的类型 */
var MonsterTypes;
(function (MonsterTypes) {
    MonsterTypes[MonsterTypes["None"] = 0] = "None";
    MonsterTypes[MonsterTypes["Noraml"] = 101] = "Noraml";
    MonsterTypes[MonsterTypes["Task"] = 201] = "Task";
    MonsterTypes[MonsterTypes["Rarity"] = 301] = "Rarity";
    MonsterTypes[MonsterTypes["Boss"] = 401] = "Boss";
    MonsterTypes[MonsterTypes["DaDao"] = 501] = "DaDao";
    MonsterTypes[MonsterTypes["QiBao"] = 601] = "QiBao";
    MonsterTypes[MonsterTypes["NoAttack"] = 701] = "NoAttack";
    MonsterTypes[MonsterTypes["BiaoChe"] = 801] = "BiaoChe";
    MonsterTypes[MonsterTypes["ShengXiaoYunCheng"] = 901] = "ShengXiaoYunCheng";
    MonsterTypes[MonsterTypes["DSPetMonster"] = 1001] = "DSPetMonster";
    MonsterTypes[MonsterTypes["CaiJi"] = 1101] = "CaiJi";
    MonsterTypes[MonsterTypes["CityGuard"] = 1201] = "CityGuard";
    MonsterTypes[MonsterTypes["XianFactionGuard"] = 1301] = "XianFactionGuard";
    MonsterTypes[MonsterTypes["MoFactionGuard"] = 1302] = "MoFactionGuard";
    MonsterTypes[MonsterTypes["CivilianMonster"] = 1401] = "CivilianMonster";
    MonsterTypes[MonsterTypes["JUSTMOVE"] = 1501] = "JUSTMOVE";
    MonsterTypes[MonsterTypes["CaiJiByTime"] = 1601] = "CaiJiByTime";
    MonsterTypes[MonsterTypes["BloodCastleGateAndCrystal"] = 1701] = "BloodCastleGateAndCrystal";
    MonsterTypes[MonsterTypes["JingJiChangRobot"] = 1801] = "JingJiChangRobot";
})(MonsterTypes || (MonsterTypes = {}));
/**
 * 奖励类型
 */
var AwardsTypes;
(function (AwardsTypes) {
    AwardsTypes[AwardsTypes["None"] = 0] = "None";
    AwardsTypes[AwardsTypes["Exp"] = 1] = "Exp";
    AwardsTypes[AwardsTypes["JinBi"] = 2] = "JinBi";
    AwardsTypes[AwardsTypes["BindJinBi"] = 3] = "BindJinBi";
    AwardsTypes[AwardsTypes["ZuanShi"] = 4] = "ZuanShi";
    AwardsTypes[AwardsTypes["BindZuanShi"] = 5] = "BindZuanShi";
    AwardsTypes[AwardsTypes["MoJing"] = 6] = "MoJing";
    AwardsTypes[AwardsTypes["ShengWang"] = 7] = "ShengWang";
    AwardsTypes[AwardsTypes["ZhanGong"] = 8] = "ZhanGong";
    AwardsTypes[AwardsTypes["ChengJiu"] = 9] = "ChengJiu";
    AwardsTypes[AwardsTypes["XingHun"] = 10] = "XingHun";
    AwardsTypes[AwardsTypes["CangBaoXueZuan"] = 11] = "CangBaoXueZuan";
    AwardsTypes[AwardsTypes["CangBaoJiFen"] = 12] = "CangBaoJiFen";
    AwardsTypes[AwardsTypes["ZhenQi"] = 13] = "ZhenQi";
    AwardsTypes[AwardsTypes["JunGong"] = 14] = "JunGong";
    AwardsTypes[AwardsTypes["RongYao"] = 15] = "RongYao";
    AwardsTypes[AwardsTypes["FenMo"] = 16] = "FenMo";
    AwardsTypes[AwardsTypes["Max"] = 17] = "Max";
})(AwardsTypes || (AwardsTypes = {}));
/** 一级属性 */
class UnitPropIndexes {
}
UnitPropIndexes.Strength = 0; // 力量--物理攻击力 物理防御 魔法技能增幅(新增)
UnitPropIndexes.Intelligence = 1; // 智力--魔法攻击力 魔法防御 物理技能增幅(新增)
UnitPropIndexes.Dexterity = 2; // 敏捷--命中       闪避     攻击速度(新增)
UnitPropIndexes.Constitution = 3; // 体力--生命上限   魔法上限 
UnitPropIndexes.Max = 4;
UnitPropIndexes.Names = [
    "力量", "智力", "敏捷", "体力"
];
/** 扩展属性索引值 */
class ExtPropIndexes {
    GetPropIndex(propName) {
        return ExtPropIndexes.ExtPropIndexNames.indexOf(propName.toLowerCase());
    }
}
ExtPropIndexes.Strong = 0; // 耐久
ExtPropIndexes.AttackSpeed = 1; // 攻击速度
ExtPropIndexes.MoveSpeed = 2; // 移动速度
ExtPropIndexes.MinDefense = 3; // 最小物防	
ExtPropIndexes.MaxDefense = 4; // 最大物防	
ExtPropIndexes.MinMDefense = 5; // 最小魔防	
ExtPropIndexes.MaxMDefense = 6; // 最大魔防	
ExtPropIndexes.MinAttack = 7; // 最小物攻	
ExtPropIndexes.MaxAttack = 8; // 最大物攻	
ExtPropIndexes.MinMAttack = 9; // 最小魔攻	
ExtPropIndexes.MaxMAttack = 10; // 最大魔攻
ExtPropIndexes.IncreasePhyAttack = 11; // 物理攻击提升
ExtPropIndexes.IncreaseMagAttack = 12; // 魔法攻击提升
ExtPropIndexes.MaxLifeV = 13; // 生命上限	
ExtPropIndexes.MaxLifePercent = 14; // 生命上限加成比例(百分比)	
ExtPropIndexes.MaxMagicV = 15; // 魔法上限
ExtPropIndexes.MaxMagicPercent = 16; // 魔法上限加成比例(百分比)
ExtPropIndexes.Lucky = 17; // 幸运
ExtPropIndexes.HitV = 18; // 准确
ExtPropIndexes.Dodge = 19; // 闪避
ExtPropIndexes.LifeRecoverPercent = 20; // 生命恢复(百分比)
ExtPropIndexes.MagicRecoverPercent = 21; // 魔法恢复(百分比)
ExtPropIndexes.LifeRecover = 22; // 单位时间恢复的生命恢复(固定值)
ExtPropIndexes.MagicRecover = 23; // 单位时间恢复的魔法恢复(固定值)      
ExtPropIndexes.SubAttackInjurePercent = 24; // 伤害吸收魔法/物理(百分比)
ExtPropIndexes.SubAttackInjure = 25; // 伤害吸收魔法/物理(固定值)
ExtPropIndexes.AddAttackInjurePercent = 26; // 伤害加成魔法/物理(百分比)
ExtPropIndexes.AddAttackInjure = 27; // 伤害加成魔法/物理(固定值) => 改名为：附加伤害
ExtPropIndexes.IgnoreDefensePercent = 28; // 无视攻击对象的物理/魔法防御(概率)
ExtPropIndexes.DamageThornPercent = 29; // 伤害反弹(百分比)
ExtPropIndexes.DamageThorn = 30; // 伤害反弹(固定值)
ExtPropIndexes.PhySkillIncreasePercent = 31; // 物理技能增幅(百分比)
ExtPropIndexes.PhySkillIncrease = 32; // 物理技能增幅(固定值)    
ExtPropIndexes.MagicSkillIncreasePercent = 33; // 魔法技能增幅(百分比)
ExtPropIndexes.MagicSkillIncrease = 34; // 魔法技能增幅(固定值)
ExtPropIndexes.FatalAttack = 35; // 卓越一击
ExtPropIndexes.DoubleAttack = 36; // 双倍一击
ExtPropIndexes.DecreaseInjurePercent = 37; // 伤害减少百分比(物理、魔法)
ExtPropIndexes.DecreaseInjureValue = 38; // 伤害减少数值(物理、魔法) => 改名为：抵挡伤害
ExtPropIndexes.CounteractInjurePercent = 39; // 伤害抵挡百分比(物理、魔法)
ExtPropIndexes.CounteractInjureValue = 40; // 伤害抵挡数值(物理、魔法)
ExtPropIndexes.IgnoreDefenseRate = 41; // 无视防御的比例
ExtPropIndexes.IncreasePhyDefense = 42; // 物理防御提升
ExtPropIndexes.IncreaseMagDefense = 43; // 魔法防御提升
ExtPropIndexes.LifeSteal = 44; // 击中恢复(固定值)
ExtPropIndexes.AddAttack = 45; // 攻击力(固定值，最小物攻、最大物攻、最小魔攻、最大魔攻，4个值同时加)
ExtPropIndexes.AddDefense = 46; // 防御力(固定值，最小魔攻、最大魔攻、最小物攻、最大魔攻，4个值同时加)  
ExtPropIndexes.StateDingShen = 47; // 定身状态加成 ChenXiaojun
ExtPropIndexes.StateMoveSpeed = 48; // 速度改变状态 ChenXiaojun
ExtPropIndexes.StateJiTui = 49; // 击退状态 ChenXiaojun
ExtPropIndexes.StateHunMi = 50; // 昏迷状态 ChenXiaojun
ExtPropIndexes.DeLucky = 51; // 抵抗幸运一击
ExtPropIndexes.DeFatalAttack = 52; // 抵抗卓越一击
ExtPropIndexes.DeDoubleAttack = 53; // 抵抗双倍一击
ExtPropIndexes.HitPercent = 54; // 增加命中百分比 [XSea 2015/5/12]
ExtPropIndexes.DodgePercent = 55; // 增加闪避百分比 [XSea 2015/5/12]        
ExtPropIndexes.FrozenPercent = 56; // 冰冻几率
ExtPropIndexes.PalsyPercent = 57; // 麻痹几率
ExtPropIndexes.SpeedDownPercent = 58; // 减速几率
ExtPropIndexes.BlowPercent = 59; // 重击几率
ExtPropIndexes.AutoRevivePercent = 60; // 自动重生几率
ExtPropIndexes.SavagePercent = 61; // 野蛮一击
ExtPropIndexes.ColdPercent = 62; // 冷血一击
ExtPropIndexes.RuthlessPercent = 63; // 无情一击
ExtPropIndexes.DeSavagePercent = 64; // 抵抗野蛮一击
ExtPropIndexes.DeColdPercent = 65; // 抵抗冷血一击
ExtPropIndexes.DeRuthlessPercent = 66; // 抵抗无情一击
ExtPropIndexes.LifeStealPercent = 67; // 击中恢复百分比
ExtPropIndexes.Potion = 68; // 药水效果
ExtPropIndexes.FireAttack = 69; // 火系固定伤害
ExtPropIndexes.WaterAttack = 70; // 水系固定伤害
ExtPropIndexes.LightningAttack = 71; // 雷系固定伤害
ExtPropIndexes.SoilAttack = 72; // 土系固定伤害
ExtPropIndexes.IceAttack = 73; // 冰系固定伤害
ExtPropIndexes.WindAttack = 74; // 风系固定伤害
ExtPropIndexes.FirePenetration = 75; // 火伤穿透
ExtPropIndexes.WaterPenetration = 76; // 水伤穿透
ExtPropIndexes.LightningPenetration = 77; // 雷伤穿透
ExtPropIndexes.SoilPenetration = 78; // 土伤穿透
ExtPropIndexes.IcePenetration = 79; // 冰伤穿透
ExtPropIndexes.WindPenetration = 80; // 风伤穿透
ExtPropIndexes.DeFirePenetration = 81; // 抵抗火伤穿透
ExtPropIndexes.DeWaterPenetration = 82; // 抵抗水伤穿透
ExtPropIndexes.DeLightningPenetration = 83; // 抵抗雷伤穿透
ExtPropIndexes.DeSoilPenetration = 84; // 抵抗土伤穿透
ExtPropIndexes.DeIcePenetration = 85; // 抵抗冰伤穿透
ExtPropIndexes.DeWindPenetration = 86; // 抵抗风伤穿透
ExtPropIndexes.Holywater = 87; // [bing] 圣水效果：HolyWater，百分比 圣水：GoodsID=1000、1001、1002、1100、1101、1102 效果：基础效果（1+ X.X）
ExtPropIndexes.RecoverLifeV = 88; // [bing] 自动恢复生命效果：RecoverLifeV，百分比 效果：基础恢复生命效果*（1+X.X）
ExtPropIndexes.RecoverMagicV = 89; // [bing] 自动恢复魔法效果：RecoverMagicV，百分比 效果：基础恢复魔法效果+X.X
ExtPropIndexes.Fatalhurt = 90; // [bing] 卓越伤害加成：FatalHurt，百分比 效果：卓越一击伤害加成*（1+X.X）
ExtPropIndexes.AddAttackPercent = 91; // [bing] 攻击力提升：AddAttackPercent，百分比 
ExtPropIndexes.AddDefensePercent = 92; // [bing] 防御力提升：AddDefensePercent，百分比 
ExtPropIndexes.InjurePenetrationPercent = 93; // 伤害穿透
ExtPropIndexes.ElementInjurePercent = 94; // 元素伤害加成
ExtPropIndexes.IgnorePhyAttackPercent = 95; // 物理免疫几率
ExtPropIndexes.IgnoreMagyAttackPercent = 96; // 魔法免疫几率
ExtPropIndexes.Max = 97;
// 各个属性对应的英文名字，配置文件中会用到 比如QiangHua.xml 全部是小写，非常重要 前缀min去掉
ExtPropIndexes.ExtPropIndexNames = [
    "strong", "accackspeed", "speed",
    "defense", "maxdefense", "mdefense", "maxmdefense",
    "attack", "maxattack", "mattack", "maxmattack",
    "increasephyattack", "increasemagattack",
    "maxlifev", "maxlifepercent",
    "maxmagicv", "maxmagicpercent",
    "lucky", "hitv", "dodge",
    "liferecoverpercent", "magicrecoverpercent",
    "liferecover", "magicrecover",
    "subattackinjurepercent", "subattackinjure",
    "addattackinjurepercent", "addattackinjure",
    "ignoredefensepercent",
    "damagethornpercent", "damagethorn",
    "physkillincreasepercent", "physkillincrease",
    "magicskillincreasepercent", "magicskillincrease",
    "fatalattack", "doubleattack",
    "decreaseinjurepercent", "decreaseinjurevalue",
    "counteractinjurepercent", "counteractinjurevalue",
    "ignoredefenserate",
    "increasephydefense", "increasemagdefense",
    "lifesteal", "addattack", "adddefense", "hitpercent", "dodgepercent", "savagepercent",
    "coldpercent", "ruthlesspercent", "desavagepercent", "decoldpercent", "deruthlesspercent",
    "lifestealpercent", "potion",
    "fireattack",
    "waterattack",
    "lightningattack",
    "soilattack",
    "iceattack",
    "windattack",
    "firepenetration",
    "waterpenetration",
    "lightningpenetration",
    "soilpenetration",
    "icepenetration",
    "windpenetration",
    "defirepenetration",
    "dewaterpenetration",
    "delightningpenetration",
    "desoilpenetration",
    "deicepenetration",
    "dewindpenetration",
    "holywater",
    "recoverlifev",
    "recovermagicv",
    "fatalhurt",
    "addattackpercent",
    "adddefensepercent",
    "injurepenetrationpercent",
    "elementinjurepercent",
    "ignorephyattackpercent",
    "ignoremagyattackpercent",
];
ExtPropIndexes.ChineseNames = [
    "耐久", "攻击速度", "移动速度",
    "最小物防", "最大物防", "最小魔防", "最大魔防",
    "最小物攻", "最大物攻", "最小魔攻", "最大魔攻",
    "物理攻击提升", "魔法攻击提升",
    "生命上限", "生命上限加成",
    "魔法上限", "魔法上限加成",
    "幸    运", "命    中", "闪    避",
    "生命恢复", /*百分比*/ "魔法恢复",
    "生命恢复", /*固定值*/ "魔法恢复",
    "伤害吸收", /*百分比*/ "伤害吸收",
    "伤害加成", /*百分比*/ "附加伤害",
    "无视防御概率",
    "伤害反弹", /*百分比*/ "伤害反弹",
    "物理技能增幅", /*百分比*/ "物理技能增幅",
    "魔法技能增幅", /*百分比*/ "魔法技能增幅",
    "极限一击概率", /*百分比*/ "双倍一击概率",
    "伤害减少", /*百分比*/ "抵挡伤害",
    "伤害抵挡", /*百分比*/ "伤害抵挡",
    "无视防御比例",
    "物理防御提升", /*百分比*/ "魔法防御提升",
    "击中恢复", /*固定值*/ "攻击力　", /*固定值*/ "防御力　",
    "定身状态加成", /**/ "速度改变状态", /**/ "击退状态", /**/ "昏迷状态",
    "抵抗幸运一击", /**/ "抵抗极限一击", /**/ "抵抗双倍一击",
    "增加命中百分比", "增加闪避百分比",
    "冰冻几率", /**/ "麻痹几率", /**/ "减速几率", /**/ "重击几率", /**/ "自动重生几率",
    "野蛮一击", "冷血一击",
    "无情一击", "抵抗野蛮一击", "抵抗冷血一击", "抵抗无情一击",
    "击中恢复百分比", "药水效果", "火系伤害", "水系伤害",
    "雷系伤害", "土系伤害", "冰系伤害", "风系伤害",
    "火系伤害穿透", /**/ "水系伤害穿透",
    "雷系伤害穿透", /**/ "土系伤害穿透",
    "冰系伤害穿透", /**/ "风系伤害穿透",
    "火系抵抗", /**/ "水系抵抗",
    "雷系抵抗", /**/ "土系抵抗",
    "冰系抵抗", /**/ "风系抵抗",
    "圣水效果", "自动恢复生命效果", "自动恢复魔法效果", "卓越伤害提升",
    "攻击力提升", "防御力提升",
    "伤害穿透",
    "元素伤害加成",
    "物理免疫几率",
    "魔法免疫几率",
];
/** 各个属性对应的中文名字，主要用于界面显示，同时，界面显示时，需要带上Loca.getLang("")进行语言转换,考虑到存在最大最小，
    界面不显示最大最小，因此，最小不配置最小，只有最大值配置最大,这样便于界面统一处理 */
ExtPropIndexes.ExtPropIndexChineseNames = [
    "耐久", "攻击速度", "移动速度", "最小物防", "最大物防", "最小魔防", "最大魔防",
    "最小物攻", "最大物攻", "最小魔攻", "最大魔攻", "物理攻击提升", "魔法攻击提升",
    "生命上限", "生命上限加成", /*百分比*/ "魔法上限", "魔法上限加成",
    "幸    运", "命    中", "闪    避", "生命恢复", /*百分比*/ "魔法恢复",
    "生命恢复", /*固定值*/ "魔法恢复", /*固定值*/ "伤害吸收", /*百分比*/ "伤害吸收",
    "伤害加成", /*百分比*/ "附加伤害", /*固定值*/ "无视防御概率", /*百分比*/ "伤害反弹", /*百分比*/ "伤害反弹",
    "物理技能增幅", /*百分比*/ "物理技能增幅", /*固定值*/ "魔法技能增幅", /*百分比*/ "魔法技能增幅",
    "极限一击概率", /*百分比*/ "双倍一击概率", /*百分比*/ "伤害减少", /*百分比*/ "抵挡伤害",
    "伤害抵挡", /*百分比*/ "伤害抵挡", /*固定值*/ "无视防御比例", /*百分比*/ "物理防御提升", /*百分比*/ "魔法防御提升",
    "击中恢复", /*固定值*/ "攻击力　", /*固定值*/ "防御力　", /*固定值*/ "定身状态加成", /**/ "速度改变状态", /**/ "击退状态", /**/ "昏迷状态",
    "抵抗幸运一击", /**/ "抵抗极限一击", /**/ "抵抗双倍一击", /**/ "增加命中百分比", /**/ "增加闪避百分比",
    "冰冻几率", /**/ "麻痹几率", /**/ "减速几率", /**/ "重击几率", /**/ "自动重生几率",
    "野蛮一击", /**/ "冷血一击", /**/ "无情一击", /**/ "抵抗野蛮一击", /**/ "抵抗冷血一击", /**/ "抵抗无情一击",
    "击中恢复百分比", /**/ "药水效果", /**/ "火系伤害", /**/ "水系伤害",
    "雷系伤害", /**/ "土系伤害", /**/ "冰系伤害", /**/ "风系伤害", /**/ "火系伤害穿透", /**/ "水系伤害穿透",
    "雷系伤害穿透", /**/ "土系伤害穿透", /**/ "冰系伤害穿透", /**/ "风系伤害穿透", /**/ "火系抵抗", /**/ "水系抵抗",
    "雷系抵抗", /**/ "土系抵抗", /**/ "冰系抵抗", /**/ "风系抵抗", /**/ "圣水效果", "自动恢复生命效果", "自动恢复魔法效果", "卓越伤害提升",
    "攻击力提升", "防御力提升", /**/ "伤害穿透", "元素伤害加成", "物理免疫几率", "魔法免疫几率"
];
/** 用于判断是否百分比，0表示不是百分比数据， 1表示是百分比数据，如果是百分比数据，显示时需要加百分号 */
ExtPropIndexes.ExtPropIndexPercents = [
    0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    1, 1,
    0, 1,
    0, 1,
    0, 0, 0,
    1, 1,
    0, 0,
    1, 0,
    1, 0,
    1,
    1, 0,
    1, 0,
    1, 0,
    1, 1,
    1, 0,
    1, 0,
    1,
    1, 1,
    0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    1, 1,
    0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1,
    1, 0,
    0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0,
    1, 1,
    0,
    0, 0, 0
];
/** 格式化Buff效果描述需要解析的属性索引 */
ExtPropIndexes.ExtPropIndexShows = [1, 2, 3, 7, 11, 13, 14, 15, 16];
/** 各个属性对应的中文名字，主要用于界面显示，同时，界面显示时，需要带上Loca.getLang("")进行语言转换,考虑到存在最大最小，
    界面不显示最大最小，因此，最小不配置最小，只有最大值配置最大,这样便于界面统一处理 */
ExtPropIndexes.ExtPropIndexBuffNames = [
    "耐久", "攻击速度提升", "移动速度提升",
    "防御提升", "最大物防", "魔法防御提升", "最大魔防",
    "攻击提升", "最大物攻", "魔法攻击提升", "最大魔攻",
    "攻击提升", "魔法攻击提升",
    "生命上限加成", "生命上限加成",
    "魔法上限加成", "魔法上限加成",
    "幸运提升", "命中提升", "闪避提升",
    "生命恢复提升", /*百分比*/ "魔法恢复提升",
    "生命恢复提升", /*固定值*/ "魔法恢复提升",
    "伤害吸收提升", /*百分比*/ "伤害吸收提升",
    "伤害加成提升", /*百分比*/ "伤害加成提升",
    "无视防御概率提升",
    "伤害反弹提升", /*百分比*/ "伤害反弹提升",
    "物理技能增幅提升", /*百分比*/ "物理技能增幅提升",
    "魔法技能增幅提升", /*百分比*/ "魔法技能增幅提升",
    "极限一击概率提升", /*百分比*/ "双倍一击概率提升",
    "伤害减少提升", /*百分比*/ "伤害减少提升",
    "伤害抵挡提升", /*百分比*/ "伤害抵挡提升",
    "无视防御比例提升",
    "物理防御提升", /*百分比*/ "魔法防御提升" /*百分比*/ // 41
];
ExtPropIndexes.ShengWuIndexNames = [
    "Constitution", "Dexterity", "Intelligence", "Strength", "Strong", "AttackSpeed", "MoveSpeed", "MinDefense", "MaxDefense", "MinMDefense",
    "MaxMDefense", "MinAttack", "MaxAttack", "MinMAttack", "MaxMAttack", "IncreasePhyAttack", "IncreaseMagAttack", "MaxLifeV", "MaxLifePercent",
    "MaxMagicV", "MaxMagicPercent", "Lucky", "HitV", "Dodge", "LifeRecoverPercent", "MagicRecoverPercent", "LifeRecover", "MagicRecover",
    "SubAttackInjurePercent", "SubAttackInjure", "AddAttackInjurePercent", "AddAttackInjure", "IgnoreDefensePercent", "DamageThornPercent",
    "DamageThorn", "PhySkillIncreasePercent", "PhySkillIncrease", "MagicSkillIncreasePercent", "MagicSkillIncrease", "FatalAttack",
    "DoubleAttack", "DecreaseInjurePercent", "DecreaseInjureValue", "CounteractInjurePercent", "CounteractInjureValue", "IgnoreDefenseRate",
    "IncreasePhyDefense", "IncreaseMagDefense", "LifeSteal", "AddAttack", "AddDefense", "StateDingShen", "StateMoveSpeed", "StateJiTui",
    "StateHunMi", "DeLucky", "DeFatalAttack", "DeDoubleAttack", "HitPercent", "DodgePercent", "FrozenPercent", "PalsyPercent", "SpeedDownPercent",
    "BlowPercent", "AutoRevivePercent", "SavagePercent", "ColdPercent", "RuthlessPercent", "DeSavagePercent", "DeColdPercent", "DeRuthlessPercent",
    "LifeStealPercent", "Potion", "FireAttack", "WaterAttack", "LightningAttack", "SoilAttack", "IceAttack", "WindAttack", "FirePenetration",
    "WaterPenetration", "LightningPenetration", "SoilPenetration", "IcePenetration", "WindPenetration", "DeFirePenetration", "DeWaterPenetration",
    "DeLightningPenetration", "DeSoilPenetration", "DeIcePenetration", "DeWindPenetration", "HolyWater", "RecoverLifeV", "RecoverMagicV", "FatalHurt"
];
ExtPropIndexes.ShengWuChineseNames = [
    "体    力", "敏    捷", "智    力", "力    量", "耐    久",
    "攻击速度", "移动速度", "最小物防", "最大物防", "最小魔防",
    "最大魔防", "最小物攻", "最大物攻", "最小魔攻", "最大魔攻",
    "物理攻击", "魔法攻击", "生命上限", "生命上限加成", "魔法上限",
    "魔法上限", "幸    运", "命    中", "闪    避", "生命恢复",
    "魔法恢复", "生命恢复", "魔法恢复", "伤害吸收", "伤害吸收",
    "伤害加成", "伤害加成", "无视防御几率", "伤害反弹", "伤害反弹",
    "物理技能伤害", "物理技能伤害", "魔法技能伤害", "魔法技能伤害", "极限一击几率",
    "致命一击几率", "伤害减少", "伤害减少", "抵挡伤害", "抵挡伤害",
    "无视防御的比例", "物理防御", "魔法防御", "击中恢复", "攻 击 力",
    "防 御 力", "定身状态", "速度改变", "击退状态", "昏迷状态",
    "抵抗幸运一击", "抵抗极限一击", "抵抗双倍一击", "命中提升", "闪避提升",
    "冰冻几率", "麻痹几率", "减速几率", "重击几率", "自动重生几率",
    "野蛮一击几率", "冷血一击几率", "无情一击几率", "抵抗野蛮几率", "抵抗冷血几率",
    "抵抗无情几率", "击中恢复", "药水效果", "火系伤害", "水系伤害",
    "雷系伤害", "土系伤害", "冰系伤害", "风系伤害", "火伤穿透",
    "水伤穿透", "雷伤穿透", "土伤穿透", "冰伤穿透", "风伤穿透",
    "火系抗性", "水系抗性", "雷系抗性", "土系抗性", "冰系抗性",
    "风系抗性", "圣水效果", "自动恢复生命效果", "自动恢复魔法效果", "卓越伤害提升"
];
/** 卓越属性索引值 */
class ZhuoyuePropIndexes {
}
ZhuoyuePropIndexes.FatalAttack = 0; // 卓越一击几率
ZhuoyuePropIndexes.MaxAttack = 1; // 攻击力	
ZhuoyuePropIndexes.MaxMAttack = 2; // 攻击力 
ZhuoyuePropIndexes.IncreasePhyAttack = 3; // 攻击力提升
ZhuoyuePropIndexes.IncreaseMagAttack = 4; // 攻击力提升
ZhuoyuePropIndexes.AttackSpeed = 5; // 伤害加成
ZhuoyuePropIndexes.LifeRecoverKillMonster = 6; // 命中
ZhuoyuePropIndexes.MagicRecoverKillMonster = 7; // 无视防御比例
ZhuoyuePropIndexes.MaxLifePercent = 8; // 生命上限加成(百分比)
ZhuoyuePropIndexes.MaxMagicPercent = 9; // 防御力(百分比)
ZhuoyuePropIndexes.DamageDecrease = 10; // 伤害减少
ZhuoyuePropIndexes.DamageThornPercent = 11; // 伤害反弹(百分比)
ZhuoyuePropIndexes.Dodge = 12; // 闪避
ZhuoyuePropIndexes.DropMoneyKillMonster = 13; // 防御力(增加百分比)
ZhuoyuePropIndexes.IgnoreDefensePercent = 14; // 无视防御几率(概率)
ZhuoyuePropIndexes.LifeRecoverPercent = 15; // 生命完全恢复几率(百分比)
ZhuoyuePropIndexes.MagicRecoverPercent = 16; // 魔法完全恢复几率(百分比)
ZhuoyuePropIndexes.LuckyAttackPercent = 17; // 幸运一击几率+5%
ZhuoyuePropIndexes.FatalAttackPercent = 18; // 卓越一击几率+5%
ZhuoyuePropIndexes.HitVPercent = 19; // 命中+5%
ZhuoyuePropIndexes.MaxLifeUpPercent = 20; // 生命上限加成+5%
ZhuoyuePropIndexes.AddAttackInjurePercent = 21; // 伤害增加+5%
ZhuoyuePropIndexes.SubAttackInjurePercent = 22; // 伤害减少+5%
ZhuoyuePropIndexes.DoubleAttackPercent = 23; // 致死一击几率+5%
ZhuoyuePropIndexes.MaxAttackPercent = 24; // 攻击力+5%
ZhuoyuePropIndexes.DodgePercent = 25; // 闪避+5%
ZhuoyuePropIndexes.IgnoreDefensePercentNew = 26; // 无视防御几率+5%
ZhuoyuePropIndexes.DefensePercent = 27; // 防御力+5%
ZhuoyuePropIndexes.DamageThornPercentNew = 28; // 伤害反弹+5%
ZhuoyuePropIndexes.CounteractLuckyAttack = 29; // 抵抗幸运一击率+5%
ZhuoyuePropIndexes.CounteractFatalAttack = 30; // 抵抗卓越一击率+5%
ZhuoyuePropIndexes.CounteractDoubleAttack = 31; // 抵抗致死一击率+5%
ZhuoyuePropIndexes.ZhuoyuePropIndexChineseNames = [
    "极限一击几率",
    "攻击力",
    "攻击力",
    "攻击力提升",
    "攻击力提升",
    "伤害加成",
    "命中值",
    "无视防御比例",
    "生命上限加成",
    "防御力",
    "伤害减少",
    "伤害反弹",
    "闪避值",
    "防御力",
    "无视防御几率",
    "生命完全恢复几率",
    "魔法完全恢复几率",
    "幸运一击几率",
    "极限一击几率",
    "命中值",
    "生命上限加成",
    "伤害加成",
    "伤害减少",
    "致命一击几率",
    "攻击力",
    "闪避值",
    "无视防御几率",
    "防御力",
    "伤害反弹",
    "抵抗幸运一击率",
    "抵抗极限一击率",
    "抵抗致命一击率"
];
/** 1表示百分比数据，0表示数值 */
ZhuoyuePropIndexes.ZhuoyuePropIndexPercents = [
    1,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
];
/** 卓越属性 */
ZhuoyuePropIndexes.ZhuoyuePropIndexValues = [
    2,
    20,
    20,
    2,
    2,
    2,
    2,
    2,
    2,
    20,
    2,
    2,
    2,
    2,
    3,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5
];
/** 对于Enum类型的扩展 */
class ExtPropIndexesExt {
}
/** 各个属性对应的英文名字，配置文件中会用到 比如QiangHua.Xml 全部是小写，非常重要 前缀min去掉 */
ExtPropIndexesExt.ExtPropIndexNames = [
    "weight", "strong", "defense", "maxdefense", "mdefense", "maxmdefense",
    "attack", "maxattack", "mattack", "maxmattack", "dsattack", "maxdsattack", "maxlifev", "maxlifepercent",
    "maxmagicv", "lucky", "curse", "hitv",
    "dodge", "magicdodgepercent", "poisoningreoverpercent", "poisoningdodge", "liferecoverpercent", "magicrecoverpercent",
    "subattackinjurepercent", "submattackinjurepercent",
    "maxmagicpercent", "ignoredefensepercent",
    "ignoremdefensepercent"
];
/**各个属性对应的中文名字，主要用于界面显示，同时，界面显示时，需要带上Loca.getLang进行语言转换,考虑到存在最大最小，
   界面不显示最大最小，因此，最小不配置最小，只有最大值配置最大,这样便于界面统一处理*/
ExtPropIndexesExt.ExtPropIndexChineseNames = [
    "重量", "耐久", "最小物防", "最大物防", "最小魔防", "最大魔防",
    "最小物攻", "最大物攻", "最小魔攻", "最大魔攻",
    "最小道攻", "最大道攻", "生命上限", "生命上限",
    "魔法上限", "幸    运", "诅    咒", "准    确",
    "闪    避", "魔法闪避", "中毒恢复", "中毒闪避",
    "生命恢复", "魔法恢复", "物伤吸收", "魔伤吸收",
    "魔法上限", "无视物防", "无视魔防"
];
/** 用于判断是否百分比，0表示不是百分比数据， 1表示是百分比数据，如果是百分比数据，显示时需要加百分号 */
ExtPropIndexesExt.ExtPropIndexPercents = [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0,
    0, 1, 1, 1, 1, 1,
    1, 1,
    1, 1,
    1
];
/** Tip类型 */
var TipTypes;
(function (TipTypes) {
    /** 安全文字提示 */
    TipTypes[TipTypes["NormalText"] = 0] = "NormalText";
    /** 物品提示 */
    TipTypes[TipTypes["GoodsText"] = 1] = "GoodsText";
    /** 技能提示 */
    TipTypes[TipTypes["SkillText"] = 2] = "SkillText";
    /** 经脉提示 */
    TipTypes[TipTypes["JingMaiText"] = 3] = "JingMaiText";
    /** 外部的格式化文本 */
    TipTypes[TipTypes["ExternalTip"] = 4] = "ExternalTip";
    /** DBBuffer项的提示 */
    TipTypes[TipTypes["BufferTip"] = 5] = "BufferTip";
    /** 经验条的提示 */
    TipTypes[TipTypes["ExperienceTip"] = 6] = "ExperienceTip";
    /** 灵力条的提示 */
    TipTypes[TipTypes["LingLiTip"] = 7] = "LingLiTip";
    /** 血条自动恢复的提示 */
    TipTypes[TipTypes["LifeSliderTip"] = 8] = "LifeSliderTip";
    /** 蓝条自动恢复的提示 */
    TipTypes[TipTypes["MagicSliderTip"] = 9] = "MagicSliderTip";
    /** 加成提示 */
    TipTypes[TipTypes["BonusTip"] = 10] = "BonusTip";
    /** 摆摊提示 */
    TipTypes[TipTypes["StallTip"] = 11] = "StallTip";
    /** 元素背包提示 */
    TipTypes[TipTypes["YuansuBagTip"] = 12] = "YuansuBagTip";
    /** 守护之灵提示 */
    TipTypes[TipTypes["SoulGuardTip"] = 13] = "SoulGuardTip";
    /** 荧光宝石背包提示 */
    TipTypes[TipTypes["FluorescentDiamondBagTip"] = 14] = "FluorescentDiamondBagTip";
    /** 魂石背包提示 */
    TipTypes[TipTypes["SoulCometStoneBagTip"] = 15] = "SoulCometStoneBagTip";
})(TipTypes || (TipTypes = {}));
/** Tip操作类型 */
var TipsOperationTypes;
(function (TipsOperationTypes) {
    /** 关闭 */
    TipsOperationTypes[TipsOperationTypes["Close"] = 0] = "Close";
    /** 佩戴 */
    TipsOperationTypes[TipsOperationTypes["Peidai"] = 1] = "Peidai";
    /** 卸下 */
    TipsOperationTypes[TipsOperationTypes["Xiexia"] = 2] = "Xiexia";
    /** 加工 */
    TipsOperationTypes[TipsOperationTypes["Jiagong"] = 3] = "Jiagong";
    /** 出售 */
    TipsOperationTypes[TipsOperationTypes["Chushou"] = 4] = "Chushou";
    /** 放入 */
    TipsOperationTypes[TipsOperationTypes["Fangru"] = 5] = "Fangru";
    /** 取回 */
    TipsOperationTypes[TipsOperationTypes["Quhui"] = 6] = "Quhui";
    /** 使用 */
    TipsOperationTypes[TipsOperationTypes["Shiyong"] = 7] = "Shiyong";
    /** 购买 */
    TipsOperationTypes[TipsOperationTypes["Goumai"] = 8] = "Goumai";
    /** 切换左右手 */
    TipsOperationTypes[TipsOperationTypes["SwitchHand"] = 9] = "SwitchHand";
    /** 拆分 */
    TipsOperationTypes[TipsOperationTypes["Caifen"] = 10] = "Caifen";
    /** 斗气回收 */
    TipsOperationTypes[TipsOperationTypes["Huishou"] = 11] = "Huishou";
    /** 上架 */
    TipsOperationTypes[TipsOperationTypes["ShangJia"] = 12] = "ShangJia";
    /** 购买其它玩家物品 */
    TipsOperationTypes[TipsOperationTypes["OtherStallGouMai"] = 13] = "OtherStallGouMai";
    /** 购买交易所物品 */
    TipsOperationTypes[TipsOperationTypes["JiaoYiShuoGouMai"] = 14] = "JiaoYiShuoGouMai";
    /** 使用宠物 */
    TipsOperationTypes[TipsOperationTypes["UsePet"] = 15] = "UsePet";
    /** 查看宠物 */
    TipsOperationTypes[TipsOperationTypes["CheckPet"] = 16] = "CheckPet";
    /** 最大 */
    TipsOperationTypes[TipsOperationTypes["Max"] = 17] = "Max";
    /** 替换 */
    TipsOperationTypes[TipsOperationTypes["Replace"] = 18] = "Replace";
    /** 分解 */
    TipsOperationTypes[TipsOperationTypes["Pulverize"] = 19] = "Pulverize";
    /** 王者商城 */
    TipsOperationTypes[TipsOperationTypes["KingOfBattle"] = 20] = "KingOfBattle";
    /** 使用宠物 */
    TipsOperationTypes[TipsOperationTypes["UseMengchong"] = 21] = "UseMengchong";
})(TipsOperationTypes || (TipsOperationTypes = {}));
/** 武器的手持状态 */
var HandTypes;
(function (HandTypes) {
    /** 非武器配置 */
    HandTypes[HandTypes["None"] = -1] = "None";
    /** 左手 */
    HandTypes[HandTypes["ZuoShou"] = 0] = "ZuoShou";
    /** 右手 */
    HandTypes[HandTypes["YouShou"] = 1] = "YouShou";
    /** 左右手 */
    HandTypes[HandTypes["ZuoYouShou"] = 2] = "ZuoYouShou";
})(HandTypes || (HandTypes = {}));
/** 持有武器的动作状态 */
var WeaponStates;
(function (WeaponStates) {
    /** 空手 */
    WeaponStates[WeaponStates["K"] = 0] = "K";
    /** 单手 */
    WeaponStates[WeaponStates["D"] = 1] = "D";
    /** 双手 */
    WeaponStates[WeaponStates["S"] = 2] = "S";
    /** 持弓 */
    WeaponStates[WeaponStates["G"] = 3] = "G";
    /** 持弩 */
    WeaponStates[WeaponStates["N"] = 4] = "N";
    /** 长柄 */
    WeaponStates[WeaponStates["C"] = 5] = "C";
    /** 双持（单手） */
    WeaponStates[WeaponStates["SD"] = 6] = "SD";
    /** 双手巨剑 */
    WeaponStates[WeaponStates["MJ"] = 7] = "MJ";
})(WeaponStates || (WeaponStates = {}));
/**
 * 精灵动作
 */
var GActions;
(function (GActions) {
    GActions[GActions["None"] = -1] = "None";
    GActions[GActions["Stand"] = 0] = "Stand";
    GActions[GActions["Walk"] = 1] = "Walk";
    GActions[GActions["Run"] = 2] = "Run";
    GActions[GActions["Attack"] = 3] = "Attack";
    GActions[GActions["Injured"] = 4] = "Injured";
    GActions[GActions["Magic"] = 6] = "Magic";
    GActions[GActions["Bow"] = 9] = "Bow";
    GActions[GActions["Death"] = 12] = "Death";
    GActions[GActions["HorseStand"] = 14] = "HorseStand";
    GActions[GActions["HorseRun"] = 16] = "HorseRun";
    GActions[GActions["HorseDead"] = 20] = "HorseDead";
    GActions[GActions["Sit"] = 23] = "Sit";
    GActions[GActions["PreAttack"] = 24] = "PreAttack";
    GActions[GActions["IdleStand"] = 25] = "IdleStand";
    GActions[GActions["Italic"] = 26] = "Italic";
    GActions[GActions["Collect"] = 27] = "Collect";
    GActions[GActions["Wenhao"] = 28] = "Wenhao";
    GActions[GActions["Genwolai"] = 29] = "Genwolai";
    GActions[GActions["Guzhang"] = 30] = "Guzhang";
    GActions[GActions["Huanhu"] = 31] = "Huanhu";
    GActions[GActions["Jushang"] = 32] = "Jushang";
    GActions[GActions["Xingli"] = 33] = "Xingli";
    GActions[GActions["Chongfeng"] = 34] = "Chongfeng";
    GActions[GActions["Mobai"] = 35] = "Mobai";
    GActions[GActions["Tiaoxin"] = 36] = "Tiaoxin";
    GActions[GActions["Zuoxia"] = 37] = "Zuoxia";
    GActions[GActions["Shuijiao"] = 38] = "Shuijiao";
    GActions[GActions["ZS_Orz"] = 39] = "ZS_Orz";
    GActions[GActions["GS_Orz"] = 40] = "GS_Orz";
    GActions[GActions["FS_Orz"] = 41] = "FS_Orz";
    GActions[GActions["MJ_Orz"] = 42] = "MJ_Orz";
    GActions[GActions["WingShow"] = 43] = "WingShow";
    GActions[GActions["MonsterBirth"] = 44] = "MonsterBirth";
    GActions[GActions["QG_RideJJ"] = 45] = "QG_RideJJ";
    GActions[GActions["Magic_1"] = 100] = "Magic_1";
    GActions[GActions["Magic_2"] = 101] = "Magic_2";
    GActions[GActions["Magic_3"] = 102] = "Magic_3";
    GActions[GActions["Magic_4"] = 103] = "Magic_4";
    GActions[GActions["Attack1"] = 104] = "Attack1";
    GActions[GActions["Attack2"] = 105] = "Attack2";
    GActions[GActions["Attack3"] = 106] = "Attack3";
    GActions[GActions["Attack4"] = 107] = "Attack4";
    GActions[GActions["Attack5"] = 108] = "Attack5";
    //  添加动作枚举时，请保持与Server端一致（GS中相同的文件名），防止出现问题
    GActions[GActions["MaxAction"] = 109] = "MaxAction";
})(GActions || (GActions = {}));
/**
 * 系统帮助发生时机
 */
var SystemHelpModes;
(function (SystemHelpModes) {
    SystemHelpModes[SystemHelpModes["None"] = 0] = "None";
    SystemHelpModes[SystemHelpModes["ToLevel"] = 1] = "ToLevel";
    SystemHelpModes[SystemHelpModes["ToMap"] = 2] = "ToMap";
    SystemHelpModes[SystemHelpModes["FirstLogin"] = 3] = "FirstLogin";
    SystemHelpModes[SystemHelpModes["FirstGoods"] = 4] = "FirstGoods";
    SystemHelpModes[SystemHelpModes["Login"] = 5] = "Login";
    SystemHelpModes[SystemHelpModes["NewTask"] = 6] = "NewTask";
    SystemHelpModes[SystemHelpModes["CompTask"] = 7] = "CompTask";
    SystemHelpModes[SystemHelpModes["TaskOk"] = 8] = "TaskOk";
    SystemHelpModes[SystemHelpModes["BeforeCompTask"] = 9] = "BeforeCompTask";
    SystemHelpModes[SystemHelpModes["LeaveSafeArea"] = 10] = "LeaveSafeArea";
    SystemHelpModes[SystemHelpModes["ShowText"] = 11] = "ShowText";
    SystemHelpModes[SystemHelpModes["LeaveMap"] = 12] = "LeaveMap";
    SystemHelpModes[SystemHelpModes["WinUpGrade"] = 14] = "WinUpGrade";
    SystemHelpModes[SystemHelpModes["ChengJiuLv"] = 15] = "ChengJiuLv";
    SystemHelpModes[SystemHelpModes["ShengWangLevel"] = 16] = "ShengWangLevel";
    SystemHelpModes[SystemHelpModes["Max"] = 17] = "Max";
})(SystemHelpModes || (SystemHelpModes = {}));
/** Buffer项的类型 */
var BufferItemTypes;
(function (BufferItemTypes) {
    BufferItemTypes[BufferItemTypes["None"] = 0] = "None";
    BufferItemTypes[BufferItemTypes["DblExperience"] = 1] = "DblExperience";
    BufferItemTypes[BufferItemTypes["DblMoney"] = 2] = "DblMoney";
    BufferItemTypes[BufferItemTypes["DblLingLi"] = 3] = "DblLingLi";
    BufferItemTypes[BufferItemTypes["LifeVReserve"] = 4] = "LifeVReserve";
    BufferItemTypes[BufferItemTypes["MagicVReserve"] = 5] = "MagicVReserve";
    BufferItemTypes[BufferItemTypes["AddTempAttack"] = 6] = "AddTempAttack";
    BufferItemTypes[BufferItemTypes["AddTempDefense"] = 7] = "AddTempDefense";
    BufferItemTypes[BufferItemTypes["UpLifeLimit"] = 8] = "UpLifeLimit";
    BufferItemTypes[BufferItemTypes["UpMagicLimit"] = 9] = "UpMagicLimit";
    BufferItemTypes[BufferItemTypes["LingLiVReserve"] = 10] = "LingLiVReserve";
    BufferItemTypes[BufferItemTypes["AntiBoss"] = 11] = "AntiBoss";
    BufferItemTypes[BufferItemTypes["AntiRole"] = 12] = "AntiRole";
    BufferItemTypes[BufferItemTypes["MonthVIP"] = 13] = "MonthVIP";
    BufferItemTypes[BufferItemTypes["SheLiZhiYuan"] = 14] = "SheLiZhiYuan";
    BufferItemTypes[BufferItemTypes["DiWanZhiYou"] = 15] = "DiWanZhiYou";
    BufferItemTypes[BufferItemTypes["JunQi"] = 16] = "JunQi";
    BufferItemTypes[BufferItemTypes["DblSkillUp"] = 17] = "DblSkillUp";
    BufferItemTypes[BufferItemTypes["ThreeExperience"] = 18] = "ThreeExperience";
    BufferItemTypes[BufferItemTypes["ThreeMoney"] = 19] = "ThreeMoney";
    BufferItemTypes[BufferItemTypes["AutoFightingProtect"] = 20] = "AutoFightingProtect";
    BufferItemTypes[BufferItemTypes["TimeExp"] = 21] = "TimeExp";
    BufferItemTypes[BufferItemTypes["TimeAddDefense"] = 22] = "TimeAddDefense";
    BufferItemTypes[BufferItemTypes["TimeAddMDefense"] = 23] = "TimeAddMDefense";
    BufferItemTypes[BufferItemTypes["TimeAddAttack"] = 24] = "TimeAddAttack";
    BufferItemTypes[BufferItemTypes["TimeAddMAttack"] = 25] = "TimeAddMAttack";
    BufferItemTypes[BufferItemTypes["TimeAddDSAttack"] = 26] = "TimeAddDSAttack";
    BufferItemTypes[BufferItemTypes["TimeAddLifeMagic"] = 27] = "TimeAddLifeMagic";
    BufferItemTypes[BufferItemTypes["WaWaExp"] = 28] = "WaWaExp";
    BufferItemTypes[BufferItemTypes["ZhuFu"] = 29] = "ZhuFu";
    BufferItemTypes[BufferItemTypes["FallTianSheng"] = 30] = "FallTianSheng";
    BufferItemTypes[BufferItemTypes["ChengJiu"] = 31] = "ChengJiu";
    BufferItemTypes[BufferItemTypes["JingMai"] = 32] = "JingMai";
    BufferItemTypes[BufferItemTypes["WuXue"] = 33] = "WuXue";
    BufferItemTypes[BufferItemTypes["GuMuTimeLimit"] = 34] = "GuMuTimeLimit";
    BufferItemTypes[BufferItemTypes["MingJieMapLimit"] = 35] = "MingJieMapLimit";
    BufferItemTypes[BufferItemTypes["FiveExperience"] = 36] = "FiveExperience";
    BufferItemTypes[BufferItemTypes["TimeAddLifeNoShow"] = 37] = "TimeAddLifeNoShow";
    BufferItemTypes[BufferItemTypes["TimeAddMagicNoShow"] = 38] = "TimeAddMagicNoShow";
    BufferItemTypes[BufferItemTypes["PKKingBuffer"] = 39] = "PKKingBuffer";
    BufferItemTypes[BufferItemTypes["DSTimeAddLifeNoShow"] = 40] = "DSTimeAddLifeNoShow";
    BufferItemTypes[BufferItemTypes["DSTimeHideNoShow"] = 41] = "DSTimeHideNoShow";
    BufferItemTypes[BufferItemTypes["DSTimeShiDuNoShow"] = 42] = "DSTimeShiDuNoShow";
    BufferItemTypes[BufferItemTypes["DSTimeAddDefenseNoShow"] = 43] = "DSTimeAddDefenseNoShow";
    BufferItemTypes[BufferItemTypes["DSTimeAddMDefenseNoShow"] = 44] = "DSTimeAddMDefenseNoShow";
    BufferItemTypes[BufferItemTypes["FSAddHuDunNoShow"] = 45] = "FSAddHuDunNoShow";
    BufferItemTypes[BufferItemTypes["MutilExperience"] = 46] = "MutilExperience";
    BufferItemTypes[BufferItemTypes["JieRiChengHao"] = 47] = "JieRiChengHao";
    BufferItemTypes[BufferItemTypes["ErGuoTou"] = 48] = "ErGuoTou";
    BufferItemTypes[BufferItemTypes["ZuanHuang"] = 49] = "ZuanHuang";
    BufferItemTypes[BufferItemTypes["ZhanHun"] = 50] = "ZhanHun";
    BufferItemTypes[BufferItemTypes["RongYu"] = 51] = "RongYu";
    // 属性改造 begin
    BufferItemTypes[BufferItemTypes["ADDTEMPStrength"] = 52] = "ADDTEMPStrength";
    BufferItemTypes[BufferItemTypes["ADDTEMPIntelligsence"] = 53] = "ADDTEMPIntelligsence";
    BufferItemTypes[BufferItemTypes["ADDTEMPDexterity"] = 54] = "ADDTEMPDexterity";
    BufferItemTypes[BufferItemTypes["ADDTEMPConstitution"] = 55] = "ADDTEMPConstitution";
    BufferItemTypes[BufferItemTypes["ADDTEMPATTACKSPEED"] = 56] = "ADDTEMPATTACKSPEED";
    BufferItemTypes[BufferItemTypes["ADDTEMPLUCKYATTACK"] = 57] = "ADDTEMPLUCKYATTACK";
    BufferItemTypes[BufferItemTypes["ADDTEMPFATALATTACK"] = 58] = "ADDTEMPFATALATTACK";
    BufferItemTypes[BufferItemTypes["ADDTEMPDOUBLEATTACK"] = 59] = "ADDTEMPDOUBLEATTACK";
    // 属性改造 end
    // MU项目BUFF begin
    BufferItemTypes[BufferItemTypes["SLDL_SUBDAMAGEPERCENTTIMER"] = 60] = "SLDL_SUBDAMAGEPERCENTTIMER";
    BufferItemTypes[BufferItemTypes["SLDL_MAXLIFEPERCENT"] = 61] = "SLDL_MAXLIFEPERCENT";
    BufferItemTypes[BufferItemTypes["SLDL_ADDDEFENSETIMER"] = 62] = "SLDL_ADDDEFENSETIMER";
    BufferItemTypes[BufferItemTypes["SLDL_ADDATTACKTIMER"] = 63] = "SLDL_ADDATTACKTIMER";
    BufferItemTypes[BufferItemTypes["SLDL_ADDLUCKYATTACKPERCENTTIMER"] = 64] = "SLDL_ADDLUCKYATTACKPERCENTTIMER";
    BufferItemTypes[BufferItemTypes["SLDL_ADDFATALATTACKPERCENTTIMER"] = 65] = "SLDL_ADDFATALATTACKPERCENTTIMER";
    BufferItemTypes[BufferItemTypes["SLDL_ADDDOUBLEATTACKPERCENTTIMER"] = 66] = "SLDL_ADDDOUBLEATTACKPERCENTTIMER";
    BufferItemTypes[BufferItemTypes["SLDL_ADDMAXHPVALUE"] = 67] = "SLDL_ADDMAXHPVALUE";
    BufferItemTypes[BufferItemTypes["SLDL_ADDMAXMPVALUE"] = 68] = "SLDL_ADDMAXMPVALUE";
    BufferItemTypes[BufferItemTypes["SLDL_ADDLIFERECOVERPERCENT"] = 69] = "SLDL_ADDLIFERECOVERPERCENT";
    BufferItemTypes[BufferItemTypes["SLDL_FRESHPLAYERBUFF"] = 70] = "SLDL_FRESHPLAYERBUFF";
    BufferItemTypes[BufferItemTypes["SLDL_SUBDAMAGEPERCENTTIMER1"] = 71] = "SLDL_SUBDAMAGEPERCENTTIMER1";
    // 3期新增 Begin
    BufferItemTypes[BufferItemTypes["SLDL_SUBATTACKPERCENTTIMER"] = 72] = "SLDL_SUBATTACKPERCENTTIMER";
    BufferItemTypes[BufferItemTypes["SLDL_ADDATTACKPERCENTTIMER"] = 73] = "SLDL_ADDATTACKPERCENTTIMER";
    BufferItemTypes[BufferItemTypes["SLDL_SUBATTACKVALUETIMER"] = 74] = "SLDL_SUBATTACKVALUETIMER";
    BufferItemTypes[BufferItemTypes["SLDL_ADDATTACKVALUETIMER"] = 75] = "SLDL_ADDATTACKVALUETIMER";
    BufferItemTypes[BufferItemTypes["SLDL_SUBDEFENSEPERCENTTIMER"] = 76] = "SLDL_SUBDEFENSEPERCENTTIMER";
    BufferItemTypes[BufferItemTypes["SLDL_ADDDEFENSEPERCENTTIMER"] = 77] = "SLDL_ADDDEFENSEPERCENTTIMER";
    BufferItemTypes[BufferItemTypes["SLDL_SUBDEFENSEVALUETIMER"] = 78] = "SLDL_SUBDEFENSEVALUETIMER";
    BufferItemTypes[BufferItemTypes["SLDL_ADDDEFENSEVALUETIMER"] = 79] = "SLDL_ADDDEFENSEVALUETIMER";
    BufferItemTypes[BufferItemTypes["SLDL_SUBMOVESPEEDPERCENTTIMER"] = 80] = "SLDL_SUBMOVESPEEDPERCENTTIMER";
    BufferItemTypes[BufferItemTypes["SLDL_ADDMAXLIFEPERCENTANDVALUE"] = 81] = "SLDL_ADDMAXLIFEPERCENTANDVALUE";
    BufferItemTypes[BufferItemTypes["SLDL_SUBHITPERCENTTIMER"] = 82] = "SLDL_SUBHITPERCENTTIMER";
    BufferItemTypes[BufferItemTypes["SLDL_SUBDAMAGEPERCENTVALUETIMER"] = 83] = "SLDL_SUBDAMAGEPERCENTVALUETIMER";
    BufferItemTypes[BufferItemTypes["SLDL_ADDATTACKANDDEFENSEEPERCENTVALUETIMER"] = 84] = "SLDL_ADDATTACKANDDEFENSEEPERCENTVALUETIMER";
    BufferItemTypes[BufferItemTypes["SLDL_ANGELTEMPLEBUFF1"] = 85] = "SLDL_ANGELTEMPLEBUFF1";
    BufferItemTypes[BufferItemTypes["SLDL_ANGELTEMPLEBUFF2"] = 86] = "SLDL_ANGELTEMPLEBUFF2";
    BufferItemTypes[BufferItemTypes["SLDL_JINGJICHANG_JUNXIAN"] = 87] = "SLDL_JINGJICHANG_JUNXIAN";
    // 3期新增 End
    // MU项目BUFF end
    BufferItemTypes[BufferItemTypes["SLDL_ZHANMENGBUILD_ZHANQI"] = 88] = "SLDL_ZHANMENGBUILD_ZHANQI";
    BufferItemTypes[BufferItemTypes["SLDL_ZHANMENGBUILD_JITAN"] = 89] = "SLDL_ZHANMENGBUILD_JITAN";
    BufferItemTypes[BufferItemTypes["SLDL_ZHANMENGBUILD_JUNXIE"] = 90] = "SLDL_ZHANMENGBUILD_JUNXIE";
    BufferItemTypes[BufferItemTypes["SLDL_ZHANMENGBUILD_GUANGHUAN"] = 91] = "SLDL_ZHANMENGBUILD_GUANGHUAN";
    BufferItemTypes[BufferItemTypes["SLDL_REDNAME_DEBUFF"] = 92] = "SLDL_REDNAME_DEBUFF";
    BufferItemTypes[BufferItemTypes["TimeFEIXUENoShow"] = 93] = "TimeFEIXUENoShow";
    BufferItemTypes[BufferItemTypes["TimeZHONGDUNoShow"] = 94] = "TimeZHONGDUNoShow";
    BufferItemTypes[BufferItemTypes["TimeLINGHUNoShow"] = 95] = "TimeLINGHUNoShow";
    BufferItemTypes[BufferItemTypes["TimeRANSHAONoShow"] = 96] = "TimeRANSHAONoShow";
    BufferItemTypes[BufferItemTypes["TimeHUZHAONoShow"] = 97] = "TimeHUZHAONoShow";
    BufferItemTypes[BufferItemTypes["TimeWUDIHUZHAONoShow"] = 98] = "TimeWUDIHUZHAONoShow";
    BufferItemTypes[BufferItemTypes["SLDL_WORLDLEVEL"] = 99] = "SLDL_WORLDLEVEL";
    BufferItemTypes[BufferItemTypes["SLDL_SPECMACH_EXP"] = 100] = "SLDL_SPECMACH_EXP";
    /// 跨服
    BufferItemTypes[BufferItemTypes["Kuafu_Huanying"] = 101] = "Kuafu_Huanying";
    // 魔剑士技能Buff
    BufferItemTypes[BufferItemTypes["SLDL_ADD_HIT_DODGE_PERCENT"] = 102] = "SLDL_ADD_HIT_DODGE_PERCENT";
    BufferItemTypes[BufferItemTypes["LangHunLingYu_ChengHao"] = 103] = "LangHunLingYu_ChengHao";
    BufferItemTypes[BufferItemTypes["ZhongShenZhiShen_ChengHao"] = 111] = "ZhongShenZhiShen_ChengHao";
    BufferItemTypes[BufferItemTypes["SLDL_LUOLANCHENGZHAN_QIZHI1"] = 2000805] = "SLDL_LUOLANCHENGZHAN_QIZHI1";
    BufferItemTypes[BufferItemTypes["SLDL_LUOLANCHENGZHAN_QIZHI2"] = 2000806] = "SLDL_LUOLANCHENGZHAN_QIZHI2";
    BufferItemTypes[BufferItemTypes["SLDL_LUOLANCHENGZHAN_QIZHI3"] = 2000807] = "SLDL_LUOLANCHENGZHAN_QIZHI3";
    BufferItemTypes[BufferItemTypes["SLDL_LANGHUNLINGYU_QIZHI1"] = 2000810] = "SLDL_LANGHUNLINGYU_QIZHI1";
    BufferItemTypes[BufferItemTypes["SLDL_LANGHUNLINGYU_QIZHI2"] = 2000811] = "SLDL_LANGHUNLINGYU_QIZHI2";
    BufferItemTypes[BufferItemTypes["SLDL_LANGHUNLINGYU_QIZHI3"] = 2000812] = "SLDL_LANGHUNLINGYU_QIZHI3";
    BufferItemTypes[BufferItemTypes["CoupleArena_ZhenAi_Buff"] = 2080010] = "CoupleArena_ZhenAi_Buff";
    BufferItemTypes[BufferItemTypes["CoupleArena_YongQi_Buff"] = 2080011] = "CoupleArena_YongQi_Buff";
    // 独尊战场Buffer
    BufferItemTypes[BufferItemTypes["KingOfBattleCrystal"] = 2080001] = "KingOfBattleCrystal";
    BufferItemTypes[BufferItemTypes["KingOfBattleBoss_GJDZY"] = 2080007] = "KingOfBattleBoss_GJDZY";
    BufferItemTypes[BufferItemTypes["KingOfBattleBoss_GJDJX"] = 2080008] = "KingOfBattleBoss_GJDJX";
    BufferItemTypes[BufferItemTypes["KingOfBattleBoss_GJDNH"] = 2080009] = "KingOfBattleBoss_GJDNH";
    BufferItemTypes[BufferItemTypes["SLDL_PKKING_SAFE_BUFF"] = 2080012] = "SLDL_PKKING_SAFE_BUFF";
    BufferItemTypes[BufferItemTypes["MaxVal"] = 2080013] = "MaxVal";
})(BufferItemTypes || (BufferItemTypes = {}));
/** 魔剑士类型 */
var MJSSkillType;
(function (MJSSkillType) {
    MJSSkillType[MJSSkillType["Strength_Sword"] = 0] = "Strength_Sword";
    MJSSkillType[MJSSkillType["Magic_Sword"] = 1] = "Magic_Sword";
})(MJSSkillType || (MJSSkillType = {}));
/** vip类型 */
var VIPTypes;
(function (VIPTypes) {
    /** 非vip */
    VIPTypes[VIPTypes["NoVip"] = 0] = "NoVip";
    /** 月卡vip 1月卡 */
    VIPTypes[VIPTypes["Month"] = 1] = "Month";
    /** 季卡vip 3月卡 */
    VIPTypes[VIPTypes["Season"] = 3] = "Season";
    /** 半年卡vip 6月卡 */
    VIPTypes[VIPTypes["HalfYear"] = 6] = "HalfYear";
})(VIPTypes || (VIPTypes = {}));
/**
 * 单次奖励掩码值，用于定位64位变量中的相应位，扩展时将16进制的每一个数字设置成1、2、4、8就能保证
 * 为了支持64位，不用enum，enum是int32类型
 */
class OnceAwardMask {
}
/** 下载微端 */
OnceAwardMask.DownloadTinyClient = 0x0000000000000001;
/** 第一次使用vip月卡奖励 */
OnceAwardMask.UseMonthVipCard = 0x0000000000000002;
/** 第一次使用vip季卡奖励 */
OnceAwardMask.UseSeasonVipCard = 0x0000000000000004;
/** 第一次使用vip半年卡奖励 */
OnceAwardMask.UseHalfYearVipCard = 0x0000000000000008;
/** 其它 */
OnceAwardMask.Other = 0x4000000000000000;
/** 换装类型 */
var ModEquipTypes;
(function (ModEquipTypes) {
    ModEquipTypes[ModEquipTypes["Mod_Equip_None"] = -1] = "Mod_Equip_None";
    ModEquipTypes[ModEquipTypes["Mod_Equip_Body"] = 0] = "Mod_Equip_Body";
    ModEquipTypes[ModEquipTypes["Mod_Equip_Weapon"] = 1] = "Mod_Equip_Weapon";
    ModEquipTypes[ModEquipTypes["Mod_Equip_Wing"] = 2] = "Mod_Equip_Wing";
    ModEquipTypes[ModEquipTypes["Mod_Equip_Horse"] = 3] = "Mod_Equip_Horse";
    ModEquipTypes[ModEquipTypes["Mod_Equip_JiJia"] = 4] = "Mod_Equip_JiJia";
    ModEquipTypes[ModEquipTypes["Mod_Equip_All"] = 100] = "Mod_Equip_All"; // 全换
})(ModEquipTypes || (ModEquipTypes = {}));
/** 修改物品的操作类型 */
var ModGoodsTypes;
(function (ModGoodsTypes) {
    ModGoodsTypes[ModGoodsTypes["Abandon"] = 0] = "Abandon";
    ModGoodsTypes[ModGoodsTypes["EquipLoad"] = 1] = "EquipLoad";
    ModGoodsTypes[ModGoodsTypes["EquipUnload"] = 2] = "EquipUnload";
    ModGoodsTypes[ModGoodsTypes["ModValue"] = 3] = "ModValue";
    ModGoodsTypes[ModGoodsTypes["Destroy"] = 4] = "Destroy";
    ModGoodsTypes[ModGoodsTypes["SaleToNpc"] = 5] = "SaleToNpc";
    ModGoodsTypes[ModGoodsTypes["DoSplit"] = 6] = "DoSplit";
    ModGoodsTypes[ModGoodsTypes["DoFuhua"] = 7] = "DoFuhua";
    ModGoodsTypes[ModGoodsTypes["DoGetMengchong"] = 8] = "DoGetMengchong"; // 领取萌宠
})(ModGoodsTypes || (ModGoodsTypes = {}));
/** 返回出售中的物品列表的最大数 */
var SaleGoodsConsts;
(function (SaleGoodsConsts) {
    /** 出售中的物品的ID */
    SaleGoodsConsts[SaleGoodsConsts["SaleGoodsID"] = -1] = "SaleGoodsID";
    /** 随身仓库中的物品ID */
    SaleGoodsConsts[SaleGoodsConsts["PortableGoodsID"] = -1000] = "PortableGoodsID";
    /** 普通背包 */
    SaleGoodsConsts[SaleGoodsConsts["NormalBag"] = 0] = "NormalBag";
    /** 同时出售的物品数量 */
    SaleGoodsConsts[SaleGoodsConsts["MaxSaleNum"] = 16] = "MaxSaleNum";
    /** 返回列表的最大数量 */
    SaleGoodsConsts[SaleGoodsConsts["MaxReturnNum"] = 250] = "MaxReturnNum";
    /** 金蛋仓库位置【0表示背包，-1000表示随身仓库，这个值2000表示砸金蛋的仓库】 */
    SaleGoodsConsts[SaleGoodsConsts["JinDanGoodsID"] = 2000] = "JinDanGoodsID";
    /** 元素背包 */
    SaleGoodsConsts[SaleGoodsConsts["YuanShuGoodsID"] = 3000] = "YuanShuGoodsID";
    /** 已装备元素 */
    SaleGoodsConsts[SaleGoodsConsts["YuanShuGoodsIDByUsed"] = 3001] = "YuanShuGoodsIDByUsed";
    /** 精灵装备栏 */
    SaleGoodsConsts[SaleGoodsConsts["PetBagGoodsID"] = 4000] = "PetBagGoodsID";
    /** 精灵装备栏 */
    SaleGoodsConsts[SaleGoodsConsts["UsingDemonGoodsID"] = 5000] = "UsingDemonGoodsID";
    /** 特殊的摆摊金币物品ID */
    SaleGoodsConsts[SaleGoodsConsts["BaiTanJinBiGoodsID"] = 50200] = "BaiTanJinBiGoodsID";
    /** 时装类物品ID */
    SaleGoodsConsts[SaleGoodsConsts["FashionGoodsID"] = 6000] = "FashionGoodsID";
    /** 荧光宝石背包 */
    SaleGoodsConsts[SaleGoodsConsts["FluorescentDiamondGoodsID"] = 7000] = "FluorescentDiamondGoodsID";
    /** 已装备元素 */
    SaleGoodsConsts[SaleGoodsConsts["EquipedFluorescentDiamondGoodsID"] = 7001] = "EquipedFluorescentDiamondGoodsID";
    /** 魂石背包 */
    SaleGoodsConsts[SaleGoodsConsts["SoulStoneBag"] = 8000] = "SoulStoneBag";
    /** 魂石装备栏 */
    SaleGoodsConsts[SaleGoodsConsts["SoulStoneEquip"] = 8001] = "SoulStoneEquip";
    /** 萌宠背包 */
    SaleGoodsConsts[SaleGoodsConsts["MengchongStoneBag"] = 9000] = "MengchongStoneBag";
})(SaleGoodsConsts || (SaleGoodsConsts = {}));
/** 弹出包括复选框提示的窗口的类型 */
var MessBoxIsHintTypes;
(function (MessBoxIsHintTypes) {
    MessBoxIsHintTypes[MessBoxIsHintTypes["None"] = -1] = "None";
    MessBoxIsHintTypes[MessBoxIsHintTypes["SkillUpNeedMoJing"] = 0] = "SkillUpNeedMoJing";
    MessBoxIsHintTypes[MessBoxIsHintTypes["EquipHuishouNeedHint"] = 1] = "EquipHuishouNeedHint";
    MessBoxIsHintTypes[MessBoxIsHintTypes["ImportantGoodsSaleNeedHint"] = 2] = "ImportantGoodsSaleNeedHint";
    MessBoxIsHintTypes[MessBoxIsHintTypes["YuansuQianghuaSelectNeedHint"] = 3] = "YuansuQianghuaSelectNeedHint";
    MessBoxIsHintTypes[MessBoxIsHintTypes["HuaFeiZuanShiNeedHint"] = 4] = "HuaFeiZuanShiNeedHint";
    MessBoxIsHintTypes[MessBoxIsHintTypes["ChengJiuHuaFeiZuanShiNeedHint"] = 5] = "ChengJiuHuaFeiZuanShiNeedHint";
    MessBoxIsHintTypes[MessBoxIsHintTypes["JieHunHuaFeiZuanShiNeedHint"] = 6] = "JieHunHuaFeiZuanShiNeedHint";
    MessBoxIsHintTypes[MessBoxIsHintTypes["CangBaoMiJingEventHint"] = 7] = "CangBaoMiJingEventHint";
    MessBoxIsHintTypes[MessBoxIsHintTypes["SoulCometStoneEventHint"] = 8] = "SoulCometStoneEventHint";
    MessBoxIsHintTypes[MessBoxIsHintTypes["SoulCometStoneSwallowHigherLevelEventHint"] = 9] = "SoulCometStoneSwallowHigherLevelEventHint";
    MessBoxIsHintTypes[MessBoxIsHintTypes["SoulCometStoneUplevelOverflowEventHint"] = 10] = "SoulCometStoneUplevelOverflowEventHint";
    MessBoxIsHintTypes[MessBoxIsHintTypes["PulverizeDiamondEventHint"] = 11] = "PulverizeDiamondEventHint";
    MessBoxIsHintTypes[MessBoxIsHintTypes["JjingLingSkillAwarkHint"] = 12] = "JjingLingSkillAwarkHint";
    MessBoxIsHintTypes[MessBoxIsHintTypes["SelectPKModeAllType"] = 13] = "SelectPKModeAllType";
    MessBoxIsHintTypes[MessBoxIsHintTypes["JinglingSkillGraspType"] = 14] = "JinglingSkillGraspType";
    MessBoxIsHintTypes[MessBoxIsHintTypes["JinBiCostTipsType"] = 15] = "JinBiCostTipsType";
    MessBoxIsHintTypes[MessBoxIsHintTypes["MengchongEggFuhuaType"] = 16] = "MengchongEggFuhuaType";
    MessBoxIsHintTypes[MessBoxIsHintTypes["OpenBossFight"] = 17] = "OpenBossFight";
    MessBoxIsHintTypes[MessBoxIsHintTypes["ZuanShiCostTipsType"] = 18] = "ZuanShiCostTipsType";
    MessBoxIsHintTypes[MessBoxIsHintTypes["TypeEnd"] = 19] = "TypeEnd"; // 结束
})(MessBoxIsHintTypes || (MessBoxIsHintTypes = {}));
/** 一键操作类型 */
var OneKeyOTypes;
(function (OneKeyOTypes) {
    /** 无定义 */
    OneKeyOTypes[OneKeyOTypes["None"] = 0] = "None";
    /** 批量出售 */
    OneKeyOTypes[OneKeyOTypes["BatchSaleOut"] = 1] = "BatchSaleOut";
    /** 批量回收 */
    OneKeyOTypes[OneKeyOTypes["BatchSaleBack"] = 2] = "BatchSaleBack";
    /** 批量回收精灵 */
    OneKeyOTypes[OneKeyOTypes["BatchSaleDamon"] = 3] = "BatchSaleDamon";
    /** 批量回收仓库里的精灵 */
    OneKeyOTypes[OneKeyOTypes["BatchSaleStoreDamon"] = 4] = "BatchSaleStoreDamon";
})(OneKeyOTypes || (OneKeyOTypes = {}));
/** 图片文本的颜色的类型 */
var PicTextColors;
(function (PicTextColors) {
    PicTextColors[PicTextColors["White"] = 0] = "White";
    PicTextColors[PicTextColors["Red"] = 1] = "Red";
    PicTextColors[PicTextColors["Yellow"] = 2] = "Yellow";
    PicTextColors[PicTextColors["Blue"] = 3] = "Blue";
    PicTextColors[PicTextColors["Green"] = 4] = "Green";
    PicTextColors[PicTextColors["Purple"] = 5] = "Purple";
    PicTextColors[PicTextColors["Max"] = 6] = "Max";
})(PicTextColors || (PicTextColors = {}));
/** GoodsIcon右上角显示文本的类型，如可显示：强化级别、追加级别、重生级别 */
var IconTextTypes;
(function (IconTextTypes) {
    /** 无 */
    IconTextTypes[IconTextTypes["None"] = -1] = "None";
    /** 强化 */
    IconTextTypes[IconTextTypes["Qianghua"] = 0] = "Qianghua";
    /** 追加 */
    IconTextTypes[IconTextTypes["Zhuijia"] = 1] = "Zhuijia";
    /** 重生 */
    IconTextTypes[IconTextTypes["Zhuansheng"] = 2] = "Zhuansheng";
})(IconTextTypes || (IconTextTypes = {}));
/**
 * 精灵的类型
 */
var GSpriteTypes;
(function (GSpriteTypes) {
    GSpriteTypes[GSpriteTypes["None"] = -1] = "None";
    GSpriteTypes[GSpriteTypes["Leader"] = 0] = "Leader";
    GSpriteTypes[GSpriteTypes["Other"] = 1] = "Other";
    GSpriteTypes[GSpriteTypes["Monster"] = 2] = "Monster";
    GSpriteTypes[GSpriteTypes["Npc"] = 3] = "Npc";
    GSpriteTypes[GSpriteTypes["Pet"] = 4] = "Pet";
    GSpriteTypes[GSpriteTypes["BiaoChe"] = 5] = "BiaoChe";
    GSpriteTypes[GSpriteTypes["JunQi"] = 6] = "JunQi";
    GSpriteTypes[GSpriteTypes["FakeRole"] = 7] = "FakeRole";
})(GSpriteTypes || (GSpriteTypes = {}));
/**图标标识枚举 */
var ERoleTitleType;
(function (ERoleTitleType) {
    ERoleTitleType[ERoleTitleType["None"] = -1] = "None";
    ERoleTitleType[ERoleTitleType["Banghui"] = 0] = "Banghui";
    ERoleTitleType[ERoleTitleType["Team"] = 1] = "Team";
    ERoleTitleType[ERoleTitleType["Chengjiu"] = 2] = "Chengjiu";
    ERoleTitleType[ERoleTitleType["PKKing"] = 3] = "PKKing";
    ERoleTitleType[ERoleTitleType["JunXian"] = 4] = "JunXian";
    ERoleTitleType[ERoleTitleType["Baitan"] = 5] = "Baitan";
    ERoleTitleType[ERoleTitleType["LongYingChengZhan"] = 6] = "LongYingChengZhan";
})(ERoleTitleType || (ERoleTitleType = {}));
/// <summary>
/// 精灵(角色/怪)的PK模式
/// </summary>
var GPKModes;
(function (GPKModes) {
    /// <summary>
    /// 普通模式(用户无法攻击其他玩家，也不会被其他玩家所攻击; 玩家对怪物不受此规则限制)
    /// </summary>
    GPKModes[GPKModes["Normal"] = 0] = "Normal";
    /// <summary>
    /// 全体模式(打开后在系统允许的区域（非安全区）可自由攻击其他所有非安全模式下的用户（和攻击怪物一致）; 等级低于10级的用户不能被攻击，也不能攻击其他用户)
    /// </summary>
    GPKModes[GPKModes["Whole"] = 1] = "Whole";
    /// <summary>
    /// 帮派模式(对于怪无意义)
    /// </summary>
    GPKModes[GPKModes["Faction"] = 2] = "Faction";
    /// <summary>
    /// 组队模式(对于怪无意义)
    /// </summary>
    GPKModes[GPKModes["Team"] = 3] = "Team";
    /// <summary>
    /// 善恶模式(只可对红名玩家发起PK)
    /// </summary>
    GPKModes[GPKModes["Kind"] = 4] = "Kind";
})(GPKModes || (GPKModes = {}));
/*
 * 角色自动挂机战斗指令类型定义
 */
var AutoFightCmds;
(function (AutoFightCmds) {
    AutoFightCmds[AutoFightCmds["None"] = 0] = "None";
    AutoFightCmds[AutoFightCmds["Start"] = 1] = "Start";
    AutoFightCmds[AutoFightCmds["Update"] = 2] = "Update";
    AutoFightCmds[AutoFightCmds["End"] = 3] = "End";
    AutoFightCmds[AutoFightCmds["Notify"] = 4] = "Notify";
    AutoFightCmds[AutoFightCmds["PlayerClickStart"] = 5] = "PlayerClickStart";
    AutoFightCmds[AutoFightCmds["PlayerClickEnd"] = 6] = "PlayerClickEnd";
})(AutoFightCmds || (AutoFightCmds = {}));
/**
 * 定义挂机要拾取的类型
 */
var GetThingsIndexes;
(function (GetThingsIndexes) {
    GetThingsIndexes[GetThingsIndexes["Color_Bai"] = 0] = "Color_Bai";
    GetThingsIndexes[GetThingsIndexes["Color_Lv"] = 1] = "Color_Lv";
    GetThingsIndexes[GetThingsIndexes["Color_Lan"] = 2] = "Color_Lan";
    GetThingsIndexes[GetThingsIndexes["Color_Zi"] = 3] = "Color_Zi";
    GetThingsIndexes[GetThingsIndexes["BaoShi"] = 24] = "BaoShi";
    GetThingsIndexes[GetThingsIndexes["YuMao"] = 25] = "YuMao";
    GetThingsIndexes[GetThingsIndexes["YaoPin"] = 26] = "YaoPin";
    GetThingsIndexes[GetThingsIndexes["JinBi"] = 27] = "JinBi";
    GetThingsIndexes[GetThingsIndexes["MenPiaoCaiLiao"] = 28] = "MenPiaoCaiLiao";
    GetThingsIndexes[GetThingsIndexes["QiTaDaoJu"] = 29] = "QiTaDaoJu";
    GetThingsIndexes[GetThingsIndexes["Nothing"] = 30] = "Nothing";
})(GetThingsIndexes || (GetThingsIndexes = {}));
/**
 * 伤害类型
 */
var DamageType;
(function (DamageType) {
    DamageType[DamageType["DAMAGETYPE_DEFAULT"] = 0] = "DAMAGETYPE_DEFAULT";
    DamageType[DamageType["DAMAGETYPE_IGNOREDEFENCE"] = 1] = "DAMAGETYPE_IGNOREDEFENCE";
    DamageType[DamageType["DAMAGETYPE_DOUBLEATTACK"] = 2] = "DAMAGETYPE_DOUBLEATTACK";
    DamageType[DamageType["DAMAGETYPE_EXCELLENCEATTACK"] = 3] = "DAMAGETYPE_EXCELLENCEATTACK";
    DamageType[DamageType["DAMAGETYPE_LUCKYATTACK"] = 4] = "DAMAGETYPE_LUCKYATTACK";
    DamageType[DamageType["DAMAGETYPE_THORNDAMAGE"] = 5] = "DAMAGETYPE_THORNDAMAGE";
    DamageType[DamageType["DAMAGETYPE_RUTHLESS"] = 6] = "DAMAGETYPE_RUTHLESS";
    DamageType[DamageType["DAMAGETYPE_COLD"] = 7] = "DAMAGETYPE_COLD";
    DamageType[DamageType["DAMAGETYPE_SAVAGE"] = 8] = "DAMAGETYPE_SAVAGE";
    DamageType[DamageType["DAMAGETYPE_IGNOREPHY"] = 9] = "DAMAGETYPE_IGNOREPHY";
    DamageType[DamageType["DAMAGETYPE_IGNOREMAGIC"] = 10] = "DAMAGETYPE_IGNOREMAGIC";
    DamageType[DamageType["DAMAGETYPE_MAX"] = 11] = "DAMAGETYPE_MAX";
})(DamageType || (DamageType = {}));
/**
 * 系统喊话的类型. 为提升体验添加的系统喊话系统
 */
var SystemTalkTriggerType;
(function (SystemTalkTriggerType) {
    SystemTalkTriggerType[SystemTalkTriggerType["AcceptTask"] = 1] = "AcceptTask";
    SystemTalkTriggerType[SystemTalkTriggerType["KillMonsterComplete"] = 2] = "KillMonsterComplete";
})(SystemTalkTriggerType || (SystemTalkTriggerType = {}));
/**
 * 活动界面页签枚举
 */
var EAdventureTab;
(function (EAdventureTab) {
    EAdventureTab[EAdventureTab["Daily"] = 0] = "Daily";
    EAdventureTab[EAdventureTab["SinglePk"] = 1] = "SinglePk";
    EAdventureTab[EAdventureTab["MeiRiHuoYue"] = 2] = "MeiRiHuoYue";
    EAdventureTab[EAdventureTab["XianShiHuoDong"] = 3] = "XianShiHuoDong";
    EAdventureTab[EAdventureTab["Max"] = 4] = "Max";
})(EAdventureTab || (EAdventureTab = {}));
/**
 * 活动界面所有ID枚举，应对的是EAdventureItem
 */
var ActivityTypeEnum;
(function (ActivityTypeEnum) {
    ActivityTypeEnum[ActivityTypeEnum["Adventure"] = 0] = "Adventure";
    ActivityTypeEnum[ActivityTypeEnum["DailyItem"] = 0] = "DailyItem";
    ActivityTypeEnum[ActivityTypeEnum["Story"] = 1] = "Story";
    ActivityTypeEnum[ActivityTypeEnum["BangpaiBoss"] = 2] = "BangpaiBoss";
    ActivityTypeEnum[ActivityTypeEnum["Exp"] = 3] = "Exp";
    ActivityTypeEnum[ActivityTypeEnum["Coin"] = 4] = "Coin";
    ActivityTypeEnum[ActivityTypeEnum["PaTa"] = 5] = "PaTa";
    ActivityTypeEnum[ActivityTypeEnum["ActivityItem"] = 100] = "ActivityItem";
    ActivityTypeEnum[ActivityTypeEnum["WorldBoss"] = 101] = "WorldBoss";
    ActivityTypeEnum[ActivityTypeEnum["GoldBoss"] = 102] = "GoldBoss";
    ActivityTypeEnum[ActivityTypeEnum["Demon"] = 103] = "Demon";
    ActivityTypeEnum[ActivityTypeEnum["Bloodcastle"] = 104] = "Bloodcastle";
    ActivityTypeEnum[ActivityTypeEnum["GuZhanChang"] = 105] = "GuZhanChang";
    ActivityTypeEnum[ActivityTypeEnum["Longjing"] = 106] = "Longjing";
    ActivityTypeEnum[ActivityTypeEnum["AngelTemple"] = 107] = "AngelTemple";
    ActivityTypeEnum[ActivityTypeEnum["ActivityItemMax"] = 199] = "ActivityItemMax";
    ActivityTypeEnum[ActivityTypeEnum["TeamItem"] = 200] = "TeamItem";
    ActivityTypeEnum[ActivityTypeEnum["KaLiMaTemple"] = 201] = "KaLiMaTemple";
    ActivityTypeEnum[ActivityTypeEnum["EMoLaiXi"] = 202] = "EMoLaiXi";
    ActivityTypeEnum[ActivityTypeEnum["LoveFuBen"] = 203] = "LoveFuBen";
    ActivityTypeEnum[ActivityTypeEnum["LuolanFazhen"] = 204] = "LuolanFazhen";
    ActivityTypeEnum[ActivityTypeEnum["TianShaZhiZhan"] = 205] = "TianShaZhiZhan";
    ActivityTypeEnum[ActivityTypeEnum["YuansuShiLian"] = 206] = "YuansuShiLian";
    ActivityTypeEnum[ActivityTypeEnum["TeamItemMax"] = 299] = "TeamItemMax";
    // ================================== 战场界面 ==============================================
    ActivityTypeEnum[ActivityTypeEnum["Battlefield"] = 300] = "Battlefield";
    ActivityTypeEnum[ActivityTypeEnum["SinglePkItem"] = 300] = "SinglePkItem";
    ActivityTypeEnum[ActivityTypeEnum["Arena"] = 301] = "Arena";
    ActivityTypeEnum[ActivityTypeEnum["PkCamp"] = 302] = "PkCamp";
    ActivityTypeEnum[ActivityTypeEnum["PkKing"] = 303] = "PkKing";
    ActivityTypeEnum[ActivityTypeEnum["SinglePkItemMax"] = 399] = "SinglePkItemMax";
    ActivityTypeEnum[ActivityTypeEnum["UnionPkItem"] = 400] = "UnionPkItem";
    ActivityTypeEnum[ActivityTypeEnum["LuoLanChengZhan"] = 401] = "LuoLanChengZhan";
    ActivityTypeEnum[ActivityTypeEnum["ShengYuZhengBa"] = 402] = "ShengYuZhengBa";
    ActivityTypeEnum[ActivityTypeEnum["UnionPkItemMax"] = 499] = "UnionPkItemMax";
    ActivityTypeEnum[ActivityTypeEnum["CrossPkItem"] = 20000] = "CrossPkItem";
    ActivityTypeEnum[ActivityTypeEnum["HuanYingShiYuan"] = 20000] = "HuanYingShiYuan";
    ActivityTypeEnum[ActivityTypeEnum["TianTiArena"] = 20001] = "TianTiArena";
    ActivityTypeEnum[ActivityTypeEnum["YongzheZhanChang"] = 20002] = "YongzheZhanChang";
    ActivityTypeEnum[ActivityTypeEnum["HuoDongBoss"] = 20003] = "HuoDongBoss";
    ActivityTypeEnum[ActivityTypeEnum["ZhongShenZhengBa"] = 20004] = "ZhongShenZhengBa";
    ActivityTypeEnum[ActivityTypeEnum["PkLovers"] = 20005] = "PkLovers";
    ActivityTypeEnum[ActivityTypeEnum["DouZuZhanChang"] = 20006] = "DouZuZhanChang";
    ActivityTypeEnum[ActivityTypeEnum["CrossPkItemMax"] = 20099] = "CrossPkItemMax";
})(ActivityTypeEnum || (ActivityTypeEnum = {}));
/**
 * 功能开启Order所有ID枚举，应对的是SystemOpenVo
 */
var SystemOpenOrderEnum;
(function (SystemOpenOrderEnum) {
    SystemOpenOrderEnum[SystemOpenOrderEnum["RenWu"] = 70] = "RenWu";
    SystemOpenOrderEnum[SystemOpenOrderEnum["ChengJiu"] = 2] = "ChengJiu";
    SystemOpenOrderEnum[SystemOpenOrderEnum["PaiHang"] = 7] = "PaiHang";
    SystemOpenOrderEnum[SystemOpenOrderEnum["ShangCheng"] = 9] = "ShangCheng";
    SystemOpenOrderEnum[SystemOpenOrderEnum["QingLvZhuFu"] = 66] = "QingLvZhuFu";
    SystemOpenOrderEnum[SystemOpenOrderEnum["ChengZhangJiJin"] = 63] = "ChengZhangJiJin";
    SystemOpenOrderEnum[SystemOpenOrderEnum["SheZhi"] = 10] = "SheZhi";
    SystemOpenOrderEnum[SystemOpenOrderEnum["GongNeng"] = 12] = "GongNeng";
    SystemOpenOrderEnum[SystemOpenOrderEnum["FuLi"] = 13] = "FuLi";
    SystemOpenOrderEnum[SystemOpenOrderEnum["QianXinXiuLian"] = 12] = "QianXinXiuLian";
    SystemOpenOrderEnum[SystemOpenOrderEnum["GuaJi"] = 40] = "GuaJi";
    SystemOpenOrderEnum[SystemOpenOrderEnum["XiDian"] = 70] = "XiDian";
    SystemOpenOrderEnum[SystemOpenOrderEnum["TianFu"] = 57] = "TianFu";
    SystemOpenOrderEnum[SystemOpenOrderEnum["XuanFengZhan"] = 70] = "XuanFengZhan";
    SystemOpenOrderEnum[SystemOpenOrderEnum["BingHuaMan"] = 70] = "BingHuaMan";
    SystemOpenOrderEnum[SystemOpenOrderEnum["HongLeiHuoPao"] = 70] = "HongLeiHuoPao";
    SystemOpenOrderEnum[SystemOpenOrderEnum["JinFengTui"] = 70] = "JinFengTui";
    SystemOpenOrderEnum[SystemOpenOrderEnum["BengShanJi"] = 70] = "BengShanJi";
    SystemOpenOrderEnum[SystemOpenOrderEnum["CuiZaoTeng"] = 70] = "CuiZaoTeng";
    SystemOpenOrderEnum[SystemOpenOrderEnum["HuXingDianChang"] = 70] = "HuXingDianChang";
    SystemOpenOrderEnum[SystemOpenOrderEnum["BaXiangZhen"] = 70] = "BaXiangZhen";
    SystemOpenOrderEnum[SystemOpenOrderEnum["ShangGuSuoLian"] = 70] = "ShangGuSuoLian";
    SystemOpenOrderEnum[SystemOpenOrderEnum["FengYeSha"] = 70] = "FengYeSha";
    SystemOpenOrderEnum[SystemOpenOrderEnum["BingHuoPenWu"] = 70] = "BingHuoPenWu";
    SystemOpenOrderEnum[SystemOpenOrderEnum["BaiLiePoKong"] = 70] = "BaiLiePoKong";
    SystemOpenOrderEnum[SystemOpenOrderEnum["QiuLongXiao"] = 70] = "QiuLongXiao";
    SystemOpenOrderEnum[SystemOpenOrderEnum["GanLinRun"] = 70] = "GanLinRun";
    SystemOpenOrderEnum[SystemOpenOrderEnum["ChuanJiaZiDan"] = 70] = "ChuanJiaZiDan";
    SystemOpenOrderEnum[SystemOpenOrderEnum["MingJingZhenYan"] = 70] = "MingJingZhenYan";
    SystemOpenOrderEnum[SystemOpenOrderEnum["QiChong"] = 44] = "QiChong";
    SystemOpenOrderEnum[SystemOpenOrderEnum["HaoYou"] = 5] = "HaoYou";
    SystemOpenOrderEnum[SystemOpenOrderEnum["ZhuangBeiDaZao"] = 4] = "ZhuangBeiDaZao";
    SystemOpenOrderEnum[SystemOpenOrderEnum["ZhuangBeiHuiShou"] = 70] = "ZhuangBeiHuiShou";
    SystemOpenOrderEnum[SystemOpenOrderEnum["ShanHaiQuanShu"] = 8] = "ShanHaiQuanShu";
    SystemOpenOrderEnum[SystemOpenOrderEnum["YiChu"] = 70] = "YiChu";
    SystemOpenOrderEnum[SystemOpenOrderEnum["HeCheng"] = 4] = "HeCheng";
    SystemOpenOrderEnum[SystemOpenOrderEnum["BuLuoYingDi"] = 16] = "BuLuoYingDi";
    SystemOpenOrderEnum[SystemOpenOrderEnum["QingQiuMiJing"] = 16] = "QingQiuMiJing";
    SystemOpenOrderEnum[SystemOpenOrderEnum["BangHui"] = 6] = "BangHui";
    SystemOpenOrderEnum[SystemOpenOrderEnum["MengChong"] = 44] = "MengChong";
    SystemOpenOrderEnum[SystemOpenOrderEnum["SuiHunTiaoYue"] = 70] = "SuiHunTiaoYue";
    SystemOpenOrderEnum[SystemOpenOrderEnum["PiaoLingBu"] = 70] = "PiaoLingBu";
    SystemOpenOrderEnum[SystemOpenOrderEnum["ZhanLueJuLi"] = 70] = "ZhanLueJuLi";
    SystemOpenOrderEnum[SystemOpenOrderEnum["XianZongXi"] = 70] = "XianZongXi";
    SystemOpenOrderEnum[SystemOpenOrderEnum["JiNengPeiZhi"] = 70] = "JiNengPeiZhi";
    SystemOpenOrderEnum[SystemOpenOrderEnum["LuoHanXingZhen"] = 16] = "LuoHanXingZhen";
    SystemOpenOrderEnum[SystemOpenOrderEnum["HuaSheng"] = 44] = "HuaSheng";
    SystemOpenOrderEnum[SystemOpenOrderEnum["ShaQiuMoKu"] = 16] = "ShaQiuMoKu";
    SystemOpenOrderEnum[SystemOpenOrderEnum["ShiLianChou"] = 22] = "ShiLianChou";
    SystemOpenOrderEnum[SystemOpenOrderEnum["BianQiang"] = 23] = "BianQiang";
    SystemOpenOrderEnum[SystemOpenOrderEnum["ChiBang"] = 70] = "ChiBang";
    SystemOpenOrderEnum[SystemOpenOrderEnum["SuoMoTa"] = 16] = "SuoMoTa";
    SystemOpenOrderEnum[SystemOpenOrderEnum["LeiTingFeiFu"] = 70] = "LeiTingFeiFu";
    SystemOpenOrderEnum[SystemOpenOrderEnum["CaiDieNu"] = 70] = "CaiDieNu";
    SystemOpenOrderEnum[SystemOpenOrderEnum["YiDongSheJi"] = 70] = "YiDongSheJi";
    SystemOpenOrderEnum[SystemOpenOrderEnum["QianZhenQuan"] = 70] = "QianZhenQuan";
    SystemOpenOrderEnum[SystemOpenOrderEnum["RiChangRenWu"] = 10] = "RiChangRenWu";
    SystemOpenOrderEnum[SystemOpenOrderEnum["JingJiChang"] = 16] = "JingJiChang";
    SystemOpenOrderEnum[SystemOpenOrderEnum["ZhuangBeiFuJia"] = 4] = "ZhuangBeiFuJia";
    SystemOpenOrderEnum[SystemOpenOrderEnum["DouShouChang"] = 16] = "DouShouChang";
    SystemOpenOrderEnum[SystemOpenOrderEnum["JiaoYiHang"] = 20] = "JiaoYiHang";
    SystemOpenOrderEnum[SystemOpenOrderEnum["XingYao"] = 8] = "XingYao";
    SystemOpenOrderEnum[SystemOpenOrderEnum["KuaFuTuTeng"] = 70] = "KuaFuTuTeng";
    SystemOpenOrderEnum[SystemOpenOrderEnum["AnHunMeng"] = 70] = "AnHunMeng";
    SystemOpenOrderEnum[SystemOpenOrderEnum["XuanZhuanDaoShan"] = 70] = "XuanZhuanDaoShan";
    SystemOpenOrderEnum[SystemOpenOrderEnum["SongZhongPo"] = 70] = "SongZhongPo";
    SystemOpenOrderEnum[SystemOpenOrderEnum["SiKuDao"] = 16] = "SiKuDao";
    SystemOpenOrderEnum[SystemOpenOrderEnum["DouJiZhiWang"] = 18] = "DouJiZhiWang";
    SystemOpenOrderEnum[SystemOpenOrderEnum["CangJinGuMu"] = 16] = "CangJinGuMu";
    SystemOpenOrderEnum[SystemOpenOrderEnum["GuHunYiJi"] = 16] = "GuHunYiJi";
    SystemOpenOrderEnum[SystemOpenOrderEnum["TuanDuiFuBen"] = 16] = "TuanDuiFuBen";
    SystemOpenOrderEnum[SystemOpenOrderEnum["LongJingKuangChang"] = 16] = "LongJingKuangChang";
    SystemOpenOrderEnum[SystemOpenOrderEnum["LingDiXiTong"] = 58] = "LingDiXiTong";
    SystemOpenOrderEnum[SystemOpenOrderEnum["YinYuan"] = 11] = "YinYuan";
    SystemOpenOrderEnum[SystemOpenOrderEnum["YuanSuZhiXin"] = 41] = "YuanSuZhiXin";
    SystemOpenOrderEnum[SystemOpenOrderEnum["FengMoLianZhan"] = 70] = "FengMoLianZhan";
    SystemOpenOrderEnum[SystemOpenOrderEnum["HongHuangLi"] = 70] = "HongHuangLi";
    SystemOpenOrderEnum[SystemOpenOrderEnum["GaoSheDaoDan"] = 70] = "GaoSheDaoDan";
    SystemOpenOrderEnum[SystemOpenOrderEnum["JueDuiLingYu"] = 70] = "JueDuiLingYu";
    SystemOpenOrderEnum[SystemOpenOrderEnum["ShanHaiShuLing"] = 8] = "ShanHaiShuLing";
    SystemOpenOrderEnum[SystemOpenOrderEnum["QiChongLieQu"] = 41] = "QiChongLieQu";
    SystemOpenOrderEnum[SystemOpenOrderEnum["ZhuanHuan"] = 24] = "ZhuanHuan";
    SystemOpenOrderEnum[SystemOpenOrderEnum["BangHuiShenDian"] = 6] = "BangHuiShenDian";
    SystemOpenOrderEnum[SystemOpenOrderEnum["DouZhenZhengBa"] = 18] = "DouZhenZhengBa";
    SystemOpenOrderEnum[SystemOpenOrderEnum["TianQiZhiLun"] = 8] = "TianQiZhiLun";
    SystemOpenOrderEnum[SystemOpenOrderEnum["TianTiSai"] = 18] = "TianTiSai";
    SystemOpenOrderEnum[SystemOpenOrderEnum["LongHai"] = 8] = "LongHai";
    SystemOpenOrderEnum[SystemOpenOrderEnum["TianShaZhiZhan"] = 16] = "TianShaZhiZhan";
    SystemOpenOrderEnum[SystemOpenOrderEnum["MeiRiZhuanXiang"] = 23] = "MeiRiZhuanXiang";
    SystemOpenOrderEnum[SystemOpenOrderEnum["JueSiZhanChang"] = 18] = "JueSiZhanChang";
    SystemOpenOrderEnum[SystemOpenOrderEnum["BaiLianZhanChang"] = 18] = "BaiLianZhanChang";
    SystemOpenOrderEnum[SystemOpenOrderEnum["QingLvJingJi"] = 18] = "QingLvJingJi";
    SystemOpenOrderEnum[SystemOpenOrderEnum["YingGuangBaoShi"] = 61] = "YingGuangBaoShi";
    SystemOpenOrderEnum[SystemOpenOrderEnum["LingGeXiuLian"] = 16] = "LingGeXiuLian";
    SystemOpenOrderEnum[SystemOpenOrderEnum["CangBaoMiJing"] = 62] = "CangBaoMiJing";
    SystemOpenOrderEnum[SystemOpenOrderEnum["DuZunZhanChang"] = 17] = "DuZunZhanChang";
    SystemOpenOrderEnum[SystemOpenOrderEnum["WuXingPai"] = 64] = "WuXingPai";
    SystemOpenOrderEnum[SystemOpenOrderEnum["QiChongJiNeng"] = 41] = "QiChongJiNeng";
    SystemOpenOrderEnum[SystemOpenOrderEnum["ShenQiZaiZao"] = 4] = "ShenQiZaiZao";
    SystemOpenOrderEnum[SystemOpenOrderEnum["ChiBangHuanYu"] = 50] = "ChiBangHuanYu";
    SystemOpenOrderEnum[SystemOpenOrderEnum["ChiBangYangLing"] = 51] = "ChiBangYangLing";
    SystemOpenOrderEnum[SystemOpenOrderEnum["ChiBangYinLIng"] = 52] = "ChiBangYinLIng";
    SystemOpenOrderEnum[SystemOpenOrderEnum["ChengJiuWenZhang"] = 55] = "ChengJiuWenZhang";
    SystemOpenOrderEnum[SystemOpenOrderEnum["JunXianXunZhang"] = 56] = "JunXianXunZhang";
    SystemOpenOrderEnum[SystemOpenOrderEnum["LangYanZhanChang"] = 6] = "LangYanZhanChang";
    SystemOpenOrderEnum[SystemOpenOrderEnum["GuaShi"] = 61] = "GuaShi";
    SystemOpenOrderEnum[SystemOpenOrderEnum["JinDiXiuLian"] = 16] = "JinDiXiuLian";
})(SystemOpenOrderEnum || (SystemOpenOrderEnum = {}));
/** 主界面功能按钮区域enum */
var MainViewBoxEnum;
(function (MainViewBoxEnum) {
    MainViewBoxEnum[MainViewBoxEnum["TopBtnBox1"] = 1] = "TopBtnBox1";
    MainViewBoxEnum[MainViewBoxEnum["TopBtnBox2"] = 2] = "TopBtnBox2";
    MainViewBoxEnum[MainViewBoxEnum["RightBtnBox"] = 3] = "RightBtnBox"; // 右边区域
})(MainViewBoxEnum || (MainViewBoxEnum = {}));
/**
 * Vip特权类型
 */
var VipPrivilegeEnum;
(function (VipPrivilegeEnum) {
    VipPrivilegeEnum[VipPrivilegeEnum["SuiShenXiuLi"] = 4001] = "SuiShenXiuLi";
    VipPrivilegeEnum[VipPrivilegeEnum["SuiShenCangKu"] = 5001] = "SuiShenCangKu";
    VipPrivilegeEnum[VipPrivilegeEnum["SuiShenYaoDian"] = 6001] = "SuiShenYaoDian";
    VipPrivilegeEnum[VipPrivilegeEnum["ZiDongHuiShou"] = 7001] = "ZiDongHuiShou"; // 自动回收
})(VipPrivilegeEnum || (VipPrivilegeEnum = {}));
/** 福利活动类型 对应 ActivityTypes */
var FuLiActivityEnum;
(function (FuLiActivityEnum) {
    FuLiActivityEnum[FuLiActivityEnum["QiRiKuangHuanLogin"] = 1] = "QiRiKuangHuanLogin";
    FuLiActivityEnum[FuLiActivityEnum["QiRiKuangHuanChongZhi"] = 2] = "QiRiKuangHuanChongZhi";
    FuLiActivityEnum[FuLiActivityEnum["QiRiKuangHuanGoal"] = 3] = "QiRiKuangHuanGoal";
    FuLiActivityEnum[FuLiActivityEnum["QiRiKuangHuanBuy"] = 4] = "QiRiKuangHuanBuy";
})(FuLiActivityEnum || (FuLiActivityEnum = {}));
/**
 * 节日活动的相关领取状态
 */
var JieRiRewardGiftGainState;
(function (JieRiRewardGiftGainState) {
    JieRiRewardGiftGainState[JieRiRewardGiftGainState["CanGain"] = 0] = "CanGain";
    JieRiRewardGiftGainState[JieRiRewardGiftGainState["Gained"] = 1] = "Gained";
    JieRiRewardGiftGainState[JieRiRewardGiftGainState["CanNotGain"] = 2] = "CanNotGain";
    JieRiRewardGiftGainState[JieRiRewardGiftGainState["OverTime"] = 3] = "OverTime";
    JieRiRewardGiftGainState[JieRiRewardGiftGainState["NotNeedGain"] = 4] = "NotNeedGain";
})(JieRiRewardGiftGainState || (JieRiRewardGiftGainState = {}));
/** 奖励状态 */
var RewardState;
(function (RewardState) {
    /** 无效标识（未赋值） */
    RewardState[RewardState["Invalid"] = 0] = "Invalid";
    /** 未领取状态（未达成） */
    RewardState[RewardState["Not"] = 1] = "Not";
    /** 可领取状态 */
    RewardState[RewardState["Can"] = 2] = "Can";
    /** 已领取状态 */
    RewardState[RewardState["Had"] = 3] = "Had";
})(RewardState || (RewardState = {}));
/**
 * 商城类型
 */
var MallType;
(function (MallType) {
    MallType[MallType["BuyLimit"] = 100000] = "BuyLimit";
    MallType[MallType["Diamond"] = 100] = "Diamond";
    MallType[MallType["BindingDiamond"] = 10000] = "BindingDiamond";
    MallType[MallType["Silver"] = 20000] = "Silver"; // 银币商城	
})(MallType || (MallType = {}));
//# sourceMappingURL=GlobalEnum.js.map