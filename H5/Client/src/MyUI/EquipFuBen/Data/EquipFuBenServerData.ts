module MyUI {
	/**
	 * 装备副本服务器Data(副本次数，通关时间等数据)
	 */
	export class EquipFuBenServerData {
		copyID: number;	// 副本Id
		nClientSec: number;	// 我的速度通关时间
		nEnterNum: number;	// 副本进入次数
		strName: string;	// 最快通关玩家名称(全服)
		nBestTimer: number;	// 最快通关时间(全服)
		nFinishNum: number;	// 完成次数
		bIsOpen: boolean;		// 是否开启
		nHighestKillMonster: number;	// 金币副本最高杀怪数量的记录
		sHighestKillMonsterPlayer: string;	// 金币副本最高杀怪数量的记录的获得者
		nMyHighestKillCount: number;	// 金币副本我的杀怪的最高记录
	}
	/**
	 * 日常副本Data
	 */
	export class RiChangFuBenItemData {
		ItemName;
		Level;
		CopyType;
		FuBenType;
		CopyID;
		TabID;
		MapCode;
		DisplayID;
		MinLevel;
		MaxLevel;
		MinZhuanSheng;
		MaxZhuanSheng;
		MaxEnterNum;
		MaxFinishNum;
		EnterGoods;
		GoodsNumber;
		MinSaoDangTime;
		NeedYuanBao;

		ZhanLi;
		EnterNum;
		FinishNum;

		LevelAllow = false;
		SaoDangAllow = false;
		NumberAllow = false;
		ZhanLiAllow = false;

		RewardExplains = "";
		RewardGoods = "";
		Preview2;
		Remind = 0;
		PreQuery = false;
		MyTopTime;
		TopName;
		TopTime;

		SequenceTab;
		SequenceCopyID;

		MinNeedRoleNum;

	}
}