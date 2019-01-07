/**
 * 界面使用的数据类
 */
namespace Data {
	export class SuperData {
		/** 文本内容队列 */
		public RoleTextQueue = new Array<ShowTextItem>();

		/** 角色正在使用的装备列表 */
		public RoleUsingGoodsDataList = new Map<number, NetMsg.IGoodsData>();

		/** 技能配置页列表信息 */
		public MainQuickKeyItems = new Array<SkillQuickKeyPageInfo>(3);

		/** 当前选择的技能配置页 */
		public m_nChoosePage = 0;

		/** 配置的其他快捷列表 */
		public OtherQuickKeyItems = new Array<QuickKeyItem>(5);

		/** 新获得物品列表 (用于快捷提示引导)*/
		public NewEquipInfoList = new Array<NewEquipGoodsInfo>();

		/** 引导类动画正在显示*/
		waitingForSystemHelp = false;
		/** 七日登陆活动是否完成 */
		sevenDayLoginActFinished = false;
	}
}