/**
* name 
*/
namespace Data {

	// 任务数据
	export class TaskData {

		/** 数据库ID */
		public dbId = 0;
		/** 已经接受的任务列表 */
		public doingTaskId = 0;
		/** 已经接受的任务数值列表1 */
		public doingTaskVal1 = 0;
		/** 已经接受的任务数值列表2 */
		public doingTaskVal2 = 0;
		/** 已经接受的任务追踪列表 */
		public doingTaskFocus = 0;
		/** 任务添加的时间(单位秒)*/
		public addDateTime = 0;
		/** 任务奖励数据 */
		public taskAwards: TaskAwardsData;
		/** 已经做过的次数 */
		public doneCount: number = 0;
		/** 任务星级信息 */
		public starLevel: number = 0;

		constructor() {

		}
	}

	// 任务奖励数据
	export class TaskAwardsData {

		/** 任务奖励 */
		taskawardList: AwardsItemData[] = null;
		/** 任务其他奖励 */
		otherTaskawardList: AwardsItemData[] = null;
		/** 任务金币奖励*/
		moneyaward = 0;
		/** 任务经验奖励 */
		public experienceaward = 0;
		/** 任务银两奖励 */
		yinLiangaward = 0;
		/** 任务灵力奖励*/
		lingLiaward = 0;
		/** 任务绑定钻石奖励*/
		bindYuanBaoaward = 0;
		/** 真气奖励 */
		zhenQiaward = 0;
		/** 猎杀值奖励 */
		lieShaaward = 0;
		/** 悟性值奖励 */
		wuXingaward = 0;
		/** 钻石完成需要消耗钻石 */
		needYuanBao = 0;
		/** 军功值奖励 */
		junGongaward = 0;
		/** 荣誉奖励 */
		rongYuaward = 0;
		/** 任务改造 新增日常跑环任务 Begin  [12/5/2013 LiaoWei]
        说明--以下数据只有任务类型(taskclass)为8的任务才有意义
        完成所有环额外经验奖励*/
		addExperienceForDailyCircleTask = 0;
		/** 完成所有环额外斗气奖励 */
		addMoJingForDailyCircleTask = 0;
		/** 完成所有环额外物品奖励 */
		addGoodsForDailyCircleTask = "";
		/** 斗气奖励 */
		moJingaward = 0;
		/** 星魂奖励 */
		xingHunaward = 0;
		/** 粉末奖励 */
		fenMoAward = 0;
		/** 声望奖励 */
		shengwangAward = 0;

		constructor() {

		}
	}

	// 任务单个item奖励数据
	export class AwardsItemData {

		/** 职业标识 */
		occupation = 0;
		/** 物品ID*/
		goodsId = 0;
		/** 物品数量*/
		goodsNum = 0;
		/** 是否绑定物品*/
		binding = 0;
		/** 物品的级别*/
		level = 0;
		/** 物品的品质 */
		quality = 0;
		/** 物品的截止时间*/
		endTime = 0;
		/** 物品的天生 */
		bornIndex = 0;
		/** 性别标示 */
		roleSex = 0;
		/** 物品追加等级 */
		appendLev = 0;
		/** 是否有幸运 */
		isHaveLuckyProp = 0;
		/** 卓越属性值 */
		excellencePorpValue = 0;

		constructor() {

		}
	}

	// 日常任务额外奖励数据
	export class AllTaskAwardsData {

		/** 完成所有环额外经验奖励*/
		addExperienceForDailyCircleTask = 0;
		/** 完成所有环额外斗气奖励 */
		addMoJingForDailyCircleTask = 0;
		/** 完成所有环额外物品奖励*/
		addGoodsForDailyCircleTask = "";
		/** 是否可以领取*/
		nCanApply = 0;
		/** 是否领取过日常额外奖励 */
		nRecFlag = 0;

		constructor() {

		}
	}

	// 公告消息数据
	export class DailyTaskData {

		/**环的ID*/
		huanId = 0;
		/** 跑环的日子 */
		recTime = "";
		/** 跑环的次数*/
		recNum = 0;
		/** 跑环的任务类型*/
		taskClass = 0;
		/** 额外的次数天ID */
		extDayId = 0;
		/** 额外的次数天ID */
		extNum = 0;

		constructor() {

		}
	}

}