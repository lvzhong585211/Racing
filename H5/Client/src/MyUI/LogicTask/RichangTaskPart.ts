/**
* name 
*/
namespace Task {

	enum PanelType { taskInfo, sceneInfo, campBattle, PaTa, PanelNum }

	export class RichangTaskPart {

		public dailyTaskData: Data.DailyTaskData = null; 						/**日常任务环信息*/

		private TaskClass: number = 8;											/**任务类型(总是8)*/

		private NeedYuanBao: number = 0;
		private CompleteTaskNeedYuanBao: number = 0; 							/**一键完成20环,每环需要钻石数*/
		private CompleteEveryTaskNeedYuanBao: number = 0; 						/**完个单个任务领取双倍经验时需要的钻石数*/
		private maxCount: number = Global.maxMuRiChangDailyNum;
		private IsCompleted: boolean = false;									/** 任务完成状态*/
		public TaskIcon: laya.ui.Image[] = null;							/** 日常任务图标*/
		public TaskLine: laya.ui.Image[] = null;							/**日常任务前进线*/
		private IsTodayCompleted: boolean = false;								/**是否日常任务跑环完成*/

		/**界面相关变量*/

		/** 20环一键完成需要钻石*/
		public Ex_NeedZuanShi: laya.ui.Label;

		/** 20环一键完成*/
		public Ex_YiJianWanCheng: laya.ui.Button;

		/**界面相关变量end*/

		constructor() {

		}

		/**刷新任务*/
		public RefreshTask(newTaskID: number = -1): void {

		}

		/**更新任务数量信息
		public UpdateTaskCountInfo(): number {
			var recNum: number = 1;
			var dailyRecNum: number = 0;
			this.dailyTaskData = Global.FindDailyTaskDataByTaskClass(this.TaskClass);
			if (null != this.dailyTaskData) {
				dailyRecNum = this.dailyTaskData.RecNum + 1;
				this.maxCount = Global.GetMaxDailyTaskNum(this.TaskClass, this.dailyTaskData);
				recNum = Math.min(dailyRecNum, this.maxCount);

				//任务环数,可能为以前的遗留任务
				//_Count.text = string.Format(Loca.getLang("第{0}环"), Global.GetNumberLan(recNum));

				//if (this.dailyTaskData.RecTime != Global.GetCorrectDateTime().ToString("yyyy-MM-dd")) {
				//	recNum = 0;
				//}

				//Ex_Count.text = Loca.getLang("已完成环数:") + ColorCode.EncodingText(string.Format("{0}/{1}", recNum, maxCount), ColorCode.value);
				if (null == this.dailyTaskData || this.dailyTaskData.RecTime != Global.GetCorrectDateTime().ToString("yyyy-MM-dd")) //当前任务是第一个任务或跨天任务
				{
					this.NeedYuanBao = (this.CompleteTaskNeedYuanBao + this.CompleteEveryTaskNeedYuanBao) * this.maxCount;
				}
				else {
					this.NeedYuanBao = (this.CompleteTaskNeedYuanBao + this.CompleteEveryTaskNeedYuanBao) * (this.maxCount - this.dailyTaskData.RecNum);
				}
				this.NeedYuanBao = Math.max(0, this.NeedYuanBao);
				this.Ex_NeedZuanShi.text = this.NeedYuanBao.toString();
				this.Ex_YiJianWanCheng.visible = this.NeedYuanBao > 0;

				var nDoneIndex: number = this.IsCompleted ? recNum : recNum - 1;

				for (let i = 0; i < 10; i++) {
					if (i < nDoneIndex) {
						this.TaskIcon[i].skin = "_0009_huan_lan";
					}
					else
						this.TaskIcon[i].skin = "_0008_huan_hui";
					if (i < recNum - 1) {
						this.TaskLine[i].skin = "_0007_chang98vgao110_liang";
					}
					else
						this.TaskLine[i].skin = "_0006_chang98vgao110_an";
				}

				if (this.IsTodayCompleted) {
					// if ((TaskBoxMini.nRecRiChangAward == 0) && particleCanRec.isStopped)
					//     particleCanRec.Play();
					this.TaskIcon[9].skin = "_0009_huan_lan";
					this.TaskLine[9].skin = "_0007_chang98vgao110_liang";
				}

				return recNum;
			}
		}
		*/
	}
}