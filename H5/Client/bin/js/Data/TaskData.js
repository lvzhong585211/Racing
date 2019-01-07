/**
* name
*/
var Data;
(function (Data) {
    // 任务数据
    class TaskData {
        constructor() {
            /** 数据库ID */
            this.dbId = 0;
            /** 已经接受的任务列表 */
            this.doingTaskId = 0;
            /** 已经接受的任务数值列表1 */
            this.doingTaskVal1 = 0;
            /** 已经接受的任务数值列表2 */
            this.doingTaskVal2 = 0;
            /** 已经接受的任务追踪列表 */
            this.doingTaskFocus = 0;
            /** 任务添加的时间(单位秒)*/
            this.addDateTime = 0;
            /** 已经做过的次数 */
            this.doneCount = 0;
            /** 任务星级信息 */
            this.starLevel = 0;
        }
    }
    Data.TaskData = TaskData;
    // 任务奖励数据
    class TaskAwardsData {
        constructor() {
            /** 任务奖励 */
            this.taskawardList = null;
            /** 任务其他奖励 */
            this.otherTaskawardList = null;
            /** 任务金币奖励*/
            this.moneyaward = 0;
            /** 任务经验奖励 */
            this.experienceaward = 0;
            /** 任务银两奖励 */
            this.yinLiangaward = 0;
            /** 任务灵力奖励*/
            this.lingLiaward = 0;
            /** 任务绑定钻石奖励*/
            this.bindYuanBaoaward = 0;
            /** 真气奖励 */
            this.zhenQiaward = 0;
            /** 猎杀值奖励 */
            this.lieShaaward = 0;
            /** 悟性值奖励 */
            this.wuXingaward = 0;
            /** 钻石完成需要消耗钻石 */
            this.needYuanBao = 0;
            /** 军功值奖励 */
            this.junGongaward = 0;
            /** 荣誉奖励 */
            this.rongYuaward = 0;
            /** 任务改造 新增日常跑环任务 Begin  [12/5/2013 LiaoWei]
            说明--以下数据只有任务类型(taskclass)为8的任务才有意义
            完成所有环额外经验奖励*/
            this.addExperienceForDailyCircleTask = 0;
            /** 完成所有环额外斗气奖励 */
            this.addMoJingForDailyCircleTask = 0;
            /** 完成所有环额外物品奖励 */
            this.addGoodsForDailyCircleTask = "";
            /** 斗气奖励 */
            this.moJingaward = 0;
            /** 星魂奖励 */
            this.xingHunaward = 0;
            /** 粉末奖励 */
            this.fenMoAward = 0;
            /** 声望奖励 */
            this.shengwangAward = 0;
        }
    }
    Data.TaskAwardsData = TaskAwardsData;
    // 任务单个item奖励数据
    class AwardsItemData {
        constructor() {
            /** 职业标识 */
            this.occupation = 0;
            /** 物品ID*/
            this.goodsId = 0;
            /** 物品数量*/
            this.goodsNum = 0;
            /** 是否绑定物品*/
            this.binding = 0;
            /** 物品的级别*/
            this.level = 0;
            /** 物品的品质 */
            this.quality = 0;
            /** 物品的截止时间*/
            this.endTime = 0;
            /** 物品的天生 */
            this.bornIndex = 0;
            /** 性别标示 */
            this.roleSex = 0;
            /** 物品追加等级 */
            this.appendLev = 0;
            /** 是否有幸运 */
            this.isHaveLuckyProp = 0;
            /** 卓越属性值 */
            this.excellencePorpValue = 0;
        }
    }
    Data.AwardsItemData = AwardsItemData;
    // 日常任务额外奖励数据
    class AllTaskAwardsData {
        constructor() {
            /** 完成所有环额外经验奖励*/
            this.addExperienceForDailyCircleTask = 0;
            /** 完成所有环额外斗气奖励 */
            this.addMoJingForDailyCircleTask = 0;
            /** 完成所有环额外物品奖励*/
            this.addGoodsForDailyCircleTask = "";
            /** 是否可以领取*/
            this.nCanApply = 0;
            /** 是否领取过日常额外奖励 */
            this.nRecFlag = 0;
        }
    }
    Data.AllTaskAwardsData = AllTaskAwardsData;
    // 公告消息数据
    class DailyTaskData {
        constructor() {
            /**环的ID*/
            this.huanId = 0;
            /** 跑环的日子 */
            this.recTime = "";
            /** 跑环的次数*/
            this.recNum = 0;
            /** 跑环的任务类型*/
            this.taskClass = 0;
            /** 额外的次数天ID */
            this.extDayId = 0;
            /** 额外的次数天ID */
            this.extNum = 0;
        }
    }
    Data.DailyTaskData = DailyTaskData;
})(Data || (Data = {}));
//# sourceMappingURL=TaskData.js.map