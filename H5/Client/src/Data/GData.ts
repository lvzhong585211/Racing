namespace Data {
	/**
	 * 游戏全局数据，对应GData
	 */
	export class GData {
		/**
		 * 是否正在切换地图（客户端已经发送了切换地图的请求，服务器还未返回或者客户端正在切换地图的Loading过程中）
		 */
		public WaitingForMapChange: boolean = false;

		/** 精灵备战列表 */
		public equipPet: NetMsg.GoodsData[] = null;

		/** 当前主角色角色数据 */
		public get roleData(): NetMsg.RoleData { return gameIns.gameState.roleData; }

		/** 角色是否已经正式登陆 */
		public get PlayGame(): boolean { return gameIns.gameState.PlayGame; }

		/** 结婚数据 */
		public get MarryData(): NetMsg.MarriageData { return gameIns.gameState.MarriageData; }

		/** 对方结婚数据 */
		public get MarryOtherData(): NetMsg.MarriageData_EX { return gameIns.gameState.OtherMarriageData; }

		/** 跑环的数据列表 */
		public MyDailyTaskDataList: DailyTaskData[] = null;

		/** 存放时装和title */
		public fashionAndTitleList: NetMsg.GoodsData[] = null;

		/** 从服务器返回的商城销售数据MallSaleData */
		public MallData: NetMsg.MallSaleData = null;

		/**显示的获得物品的列表 */
		public viewTaskInfoGoodsDatatList: NetMsg.GoodsData[] = null;

		/** 攻击者的ID */
		public nAttackRoleID = 0;

		/** 攻击者名称 */
		public strAttackName = "";

		/** 其他玩家角色 */
		public OtherRoles = new Map<number, NetMsg.RoleData>();

		/** 其他玩家角色(通过名字索引) */
		public OtherRolesByName = new Map<string, NetMsg.RoleData>();

		/** 系统怪物角色 */
		public SystemMonsters = new Map<number, NetMsg.MonsterData>();

		/**
		 * 自动战斗的配置项
		 */
		public AutoFightData = new Data.LocalAutoFightData();

		//#region ======================= 潜心修炼 =========================

		/** 潜心修炼最大修炼时间（秒） */
		public MeditateMaxTime = 12 * 3600;
		/** 潜心修炼状态，1=潜心修炼中、0=非潜心修炼状态 */
		public MeditateState = 0;
		/** 潜心修炼累计时间（安全区） */
		public MeditateSecs1 = 0;
		/** 潜心修炼累计时间（非安全区） */
		public MeditateSecs2 = 0;

		public MeditateHintVisible = false; // 潜心修炼提示是否显示
		public MeditateShowHintTime = 0;    // 潜心修炼需要提示所需求的时间

		//#endregion ====================== 潜心修炼 ========================

		/** 当前的角色的属性数据 */
		public CurrentRolePropFields: number[] = null;

		/**
		 * 是否在摆摊状态中
		 */
		public IsInStalling(): boolean {
			// TODO: 该方法先临时放到这里，等以后再挪到合适的位置
			// //如果是正在摆摊中，则无法自动寻路
			// //如果正在摆摊中，则不允许移动
			// if (Leader.StallName != "" && Leader.StallName != null) {
			// 	return true;
			// }
			return false;
		}

		//#region 保存玩家在当前地图操作玩家移动前是否是挂机状态
		public bPlayerGuaJiStateBeforeMove = false;
		public bWaitingSetGuaJi = false;
		//#endregion

		/** 活动数据 */
		public MyHuoDongData: NetMsg.HuodongData = null;
		/** 日常副本数据 */
		RiChangFuBenItemDataDict: MyUI.RiChangFuBenItemData[] = new Array<MyUI.RiChangFuBenItemData>();
	}
}