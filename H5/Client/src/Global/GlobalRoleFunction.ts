/**
 * 存放一些和角色相关的全局函数
 */
namespace Global {

	/**
     * 获取是否有效的等级（满足需要的等级条件）
     * @param nNeedLifeCnt 需要的转生次数
     * @param nNeedLv 需要的等级
     */
	export function validLevel(nNeedLifeCnt: number, nNeedLv: number) {
		const datRole = gameIns.gameState.roleData;
		if (datRole === null || datRole === undefined) {
			return false;
		}

		const nLifeCnt = datRole.ChangeLifeCount;
		const nLevel = datRole.Level;
		const nRealLv = nLevel + nLifeCnt * 0x10000;
		const nNeedCondi = nNeedLv + nNeedLifeCnt * 0x10000;
		return nRealLv >= nNeedCondi;
	}

	/**
     * 获取重生和等级的合并值
     * @param zhuanSheng 重生
     * @param level 等级
     */
	export function GetUnionLevel(zhuanSheng: number = -1, level: number = -1): number {
		if (zhuanSheng >= 0 && level >= 0) {
			return zhuanSheng * 0x10000 + level;
		}

		const datRole = gameIns.gameState.roleData;
		if (Global.isNullOrUndefined(datRole)) {
			return 1;
		} else {
			return datRole.ChangeLifeCount * 0x10000 + datRole.Level;
		}
	}

	/**
	 * 格式化玩家等级显示
	 * @param nLevel 
	 * @param nChangeLifeCnt 
	 */
	export function formatRoleLevel(nLevel: number, nChangeLifeCnt: number): string {
		if (Global.isBattleMap(gameIns.gameState.roleData.MapCode)) {
			return ""; // 阵营战内不显示等级
		}
		return String.Format(ConfigLoca.UI_Role_Level_With_ChangeLife, nChangeLifeCnt, nLevel); // {0}重{1}级
	}

	//#region ================== 角色属性 ==================

	/**
	 * 返回角色常用参数 RoleCommonUseIntParamsIndexs.ZhuangBeiJiFen 对应索引值 如 ChengJiu = 0,//成就
	 * @param index 对应索引值 如 ChengJiu = 0, // 成就
	 */
	export function GetRoleCommonUseParamsValue(index: number): number {
		if (index >= 0 && index < Global.Data.roleData.RoleCommonUseIntPamams.length) {
			return Global.Data.roleData.RoleCommonUseIntPamams[index];
		}
		return 0;
	}

	/**
	 * 获取成就等级
	 */
	export function GetChengJiuLevel(): number {
		return GetRoleCommonUseParamsValue(RoleCommonUseIntParamsIndexs.ChengJiuLevel);
	}

	/**
     * 佩戴的大天使阶数
     */
	export function GetMaxDaTianShiLevel(): number {
		let totalLevel = 0;
		let tempLevel = 0;
		if (Super.GData.RoleUsingGoodsDataList.size <= 0) {
			GetUsingGoodsDataList(); // 获取所有已装备在身上的物品
		}
		const DaTianShi = tableMgr.sysParamsTable.getParam("DaTianShi");
		let DaTianShi_: string[] = null;
		if (!String.IsNullOrWhiteSpace(DaTianShi)) {
			DaTianShi_ = DaTianShi.split(",");
		}
		const lstGoodsData = Super.GData.RoleUsingGoodsDataList;
		for (const [key, value] of lstGoodsData) {
			const voGoods = tableMgr.goodsTable.Find(value.GoodsID);
			if (voGoods && Super.CheckArrayHaveValue(DaTianShi_, voGoods.ID.toString())) {
				tempLevel = voGoods.SuitID;
				if (tempLevel > totalLevel) { // 取最大值
					totalLevel = tempLevel;
				}
			}
		}
		return totalLevel;
	}

	/**
	 * 护身符的等级
	 */
	export function GetHuShengFuLevel(): number {
		let totalLevel = 0;
		if (Super.GData.RoleUsingGoodsDataList.size <= 0) {
			GetUsingGoodsDataList(); // 获取所有已装备在身上的物品
		}
		const lstGoodsData = Super.GData.RoleUsingGoodsDataList;
		for (const [key, value] of lstGoodsData) {
			const voGoods = tableMgr.goodsTable.Find(value.GoodsID);
			if (voGoods && voGoods.Categoriy === ItemCategories.HuFu) {
				totalLevel = voGoods.SuitID;
				break;
			}
		}
		return totalLevel;
	}

	/**
     * 返回自己角色VIP等级
     */
	export function GetVIPLeve(): number {
		return Global.Data.roleData.VIPLevel;
	}

    /**
     * 判断是否具有帮会
     * @param RoleData 
     */
	export function IsHavingBangHui(roleData: NetMsg.RoleData): boolean {
		return (roleData.Faction > 0 && !String.IsNullOrWhiteSpace(roleData.BHName));
	}

	//#endregion ================== 角色属性 ==================

	/**
	 * 根据Leader装备获取魔剑士是力魔还是法魔
	 */
	export function GetMJSType(): MJSSkillType {
		let ret = MJSSkillType.Strength_Sword;
		if (!Data || !Data.roleData.GoodsDataList) {
			return ret;
		}

		for (let i = 0; i < Data.roleData.GoodsDataList.length; i++) {
			if (Data.roleData.GoodsDataList[i].Using > 0) {
				const goodVO = tableMgr.goodsTable.Find(Data.roleData.GoodsDataList[i].GoodsID);
				if (!goodVO) continue;
				if (goodVO.Categoriy >= <number>ItemCategories.WuQi_Jian && goodVO.Categoriy <= <number>ItemCategories.WuQi_NuJianTong) {
					if (goodVO.Intelligence > goodVO.Strength) {
						ret = MJSSkillType.Magic_Sword;
						if (0 === Data.roleData.GoodsDataList[i].BagIndex) {
							break;
						}
					} else {
						ret = MJSSkillType.Strength_Sword;
						if (0 === Data.roleData.GoodsDataList[i].BagIndex) {
							break;
						}
					}
				}
			}
		}
		return ret;
	}

	/**
     * 将RoleDataMini类型转换为RoleData类型（通知其他角色使用）
     * @param roleDataMini 
     */
	export function ClientDataToRoleDataMini(roleDataMini: NetMsg.RoleDataMini): NetMsg.RoleData {
		const roleData = new NetMsg.RoleData({
			RoleID: roleDataMini.RoleID,
			RoleName: roleDataMini.RoleName,
			RoleSex: roleDataMini.RoleSex,
			Occupation: roleDataMini.Occupation,
			Level: roleDataMini.Level,
			Faction: roleDataMini.Faction,
			PKMode: roleDataMini.PKMode,
			PKValue: roleDataMini.PKValue,
			MapCode: roleDataMini.MapCode,
			RoleDirection: roleDataMini.RoleDirection,
			PosX: roleDataMini.PosX,
			PosY: roleDataMini.PosY,
			MaxLifeV: roleDataMini.MaxLifeV,
			LifeV: roleDataMini.LifeV,
			MaxMagicV: roleDataMini.MagicV,
			MagicV: roleDataMini.MagicV,
			BodyCode: roleDataMini.BodyCode,
			WeaponCode: roleDataMini.WeaponCode,
			OtherName: roleDataMini.OtherName,
			TeamID: roleDataMini.TeamID,
			TeamLeaderRoleID: roleDataMini.TeamLeaderRoleID,
			PKPoint: roleDataMini.PKPoint,
			StartPurpleNameTicks: roleDataMini.StartPurpleNameTicks,
			BattleNameStart: roleDataMini.BattleNameStart,
			BattleNameIndex: roleDataMini.BattleNameIndex,
			ZoneID: roleDataMini.ZoneID,
			BHName: roleDataMini.BHName,
			BHVerify: roleDataMini.BHVerify,
			BHZhiWu: roleDataMini.BHZhiWu,
			FSHuDunStart: roleDataMini.FSHuDunStart,
			BattleWhichSide: roleDataMini.BattleWhichSide,
			DSHideStart: roleDataMini.DSHideStart,
			FSHuDunSeconds: roleDataMini.FSHuDunSeconds,
			ZhongDuStart: roleDataMini.ZhongDuStart,
			ZhongDuSeconds: roleDataMini.ZhongDuSeconds,
			JieriChengHao: roleDataMini.JieriChengHao,
			DongJieStart: roleDataMini.DongJieStart,
			DongJieSeconds: roleDataMini.DongJieSeconds,
			GoodsDataList: roleDataMini.GoodsDataList,
			ChangeLifeCount: roleDataMini.ChangeLifeLev,
			StallName: roleDataMini.StallName,
			MyWingData: roleDataMini.MyWingData,
			SettingBitFlags: roleDataMini.SettingBitFlags,
			SpouseId: roleDataMini.SpouseId,
			HorseDbID: roleDataMini.HorseRideState,
			nIsOnJiJia: roleDataMini.nIsOnJiJia,
		});

		// 初始化buff列表
		roleData.BufferDataList = [];
		if (null != roleDataMini.BufferMiniInfo) {
			for (let i = 0; i < roleDataMini.BufferMiniInfo.length; i++) {
				const temp = roleDataMini.BufferMiniInfo[i];
				const bd = new NetMsg.BufferData({
					BufferID: temp.BufferID,
					StartTime: temp.StartTime,
					BufferSecs: temp.BufferSecs,
					BufferVal: temp.BufferVal,
					BufferType: temp.BufferType,
				});
				if (bd.BufferID === BufferItemTypes.PKKingBuffer) bd.BufferSecs = 24 * 60 * 60;
				roleData.BufferDataList.push(bd);
			}
		}

		roleData.IsVIP = roleDataMini.IsVIP;
		roleData.BodyCode = roleDataMini.BodyCode;
		roleData.WeaponCode = roleDataMini.WeaponCode;
		roleData.RoleCommonUseIntPamams = roleDataMini.RoleCommonUseIntPamams;
		return roleData;
	}
}