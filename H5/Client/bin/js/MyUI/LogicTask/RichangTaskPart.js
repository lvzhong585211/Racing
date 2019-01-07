/**
* name
*/
var Task;
(function (Task) {
    let PanelType;
    (function (PanelType) {
        PanelType[PanelType["taskInfo"] = 0] = "taskInfo";
        PanelType[PanelType["sceneInfo"] = 1] = "sceneInfo";
        PanelType[PanelType["campBattle"] = 2] = "campBattle";
        PanelType[PanelType["PaTa"] = 3] = "PaTa";
        PanelType[PanelType["PanelNum"] = 4] = "PanelNum";
    })(PanelType || (PanelType = {}));
    class RichangTaskPart {
        /**界面相关变量end*/
        constructor() {
            this.dailyTaskData = null; /**日常任务环信息*/
            this.TaskClass = 8; /**任务类型(总是8)*/
            this.NeedYuanBao = 0;
            this.CompleteTaskNeedYuanBao = 0; /**一键完成20环,每环需要钻石数*/
            this.CompleteEveryTaskNeedYuanBao = 0; /**完个单个任务领取双倍经验时需要的钻石数*/
            this.maxCount = Global.maxMuRiChangDailyNum;
            this.IsCompleted = false; /** 任务完成状态*/
            this.TaskIcon = null; /** 日常任务图标*/
            this.TaskLine = null; /**日常任务前进线*/
            this.IsTodayCompleted = false; /**是否日常任务跑环完成*/
        }
        /**刷新任务*/
        RefreshTask(newTaskID = -1) {
        }
    }
    Task.RichangTaskPart = RichangTaskPart;
})(Task || (Task = {}));
//# sourceMappingURL=RichangTaskPart.js.map