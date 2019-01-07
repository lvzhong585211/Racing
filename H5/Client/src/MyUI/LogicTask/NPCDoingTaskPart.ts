/**
* name npc接取任务界面
*/
namespace MyUI {

	export enum TaskStates { None, Accepted, Faild, Complete, }

	/**
	 * NPC任务对话类
	 */
	export class NpcDoingTaskPart extends ui.Task.NPCDoingTaskPartUI {
		/**
		 * 指定任务NPC的数据表Id
		 */
		public mNpcExtensionId: number = -1;

		/**
		 * 保存当前任务的目标类型
		 */
		private mTargetType = -1;

		/**
		 * 当前显示的任务id
		 */
		private mTaskId = -1;

		/**
		 * 是否能转生
		 */
		private mNeedZhuanSheng: boolean = false;

		/**
		 * 提交任务必须打到的重生级别和等级
		 */
		private mLimitZhuanSheng = -1;

		/**
		 * 领取任务领取的等级限制
		 */
		private mLimitLevel = -1;

		/**
		 * 下一个任务id
		 */
		private mNextMainTaskId = -1;

		/**
		 * 当前任务是否限制等级
		 */
		private mLevelLimited = false;

		private mAutoNextTimer: number = 0; // 自动模拟提交

		/**
		* 当前任务的状态
		*/
		private mTaskState: TaskStates = TaskStates.None;

		/**
		 * 保存数据库ID
		 */
		private mDbId: number = -1;

		/**
		 * 保存npcid
		 */
		public mNpcId: number = -1;

		/**
		 * 保存需要的元宝数量
		 */
		private mNeedYuanBao: number = 0;

		/**
		 * 打开NPC对话界面
		 * @param taskId 指定任务Id
		 * @param newTask 
		 */
		public static Open(taskId: number, mNpcExtensionId: number, newTask: Boolean = true) {
			const self = windowMgr.openWindow<NpcDoingTaskPart>(WindowID.NpcDoingTask, true, false);
			self.getNewData(taskId, newTask);
		}

		constructor() {
			super();

			Style.prepareHtmlFont24Left(this._NPCText, ColorCode.valueH);
			Style.prepareHtmlFont18Left(this._TalkText, ColorCode.normalH);
			this._txtTitleReward.text = ConfigLoca.UI_Common_TItle_TaskReward;
			this._Submit.on(Laya.Event.CLICK, this, this.OnSubmit);
		}

		/**
		 * 刷新任务界面获得信息
		 */
		public refreshTaskAwardsData(taskAwardsData: NetMsg.ITaskAwardsData) {
			const arrayAwardsText = UIHelper.addAwardData(taskAwardsData, "CTextAwards2");
			let index = 0;
			for (const [key, value] of arrayAwardsText) {
				if (index === 0) {
					this._UpText.text = value.toString();
					this._UpIcon.skin = Global.getAwardIconPath(key);
				}
				else {
					this._DownText.text = value.toString();
					this._DownIcon.skin = Global.getAwardIconPath(key);
				}
				index++;
			}

			this.addAwardGoods(taskAwardsData);
		}

		public RefreshTaskData(): void {

		}

		// 设置奖励物品信息
		protected addAwardGoods(taskAwards: NetMsg.ITaskAwardsData) {
			const goodsDataList: NetMsg.GoodsData[] = Task.parseAwardsItemList(taskAwards.TaskawardList);
			const otherDataList = Task.parseAwardsItemList(taskAwards.OtherTaskawardList);
			for (let i = 0; i < otherDataList.length; i++) {
				if (otherDataList[i] !== undefined)
					goodsDataList.push(otherDataList[i]);
			}
			Global.Data.viewTaskInfoGoodsDatatList = goodsDataList;
			if (null != goodsDataList && goodsDataList.length > 0) {
				for (let i = 0; i < goodsDataList.length; i++) {
					if (goodsDataList.length > 1) {
						this._Icon1.updateByGoodsData(goodsDataList[0]);
						this._Icon2.updateByGoodsData(goodsDataList[1]);
						this._Icon1.visible = true;
						this._Icon2.visible = true;

						break;
					}
					else {
						this._Icon1.visible = true;
						this._Icon1.updateByGoodsData(goodsDataList[0]);
						break;
					}
				}
			}
		}

		/**
		 * 设置任务状态
		 * @returns {} 
		 */
		private setState(completed: boolean): void {

			let taskId = this.mTaskId;
			let submitText = "";
			if (this.mNeedZhuanSheng) {
				submitText = ConfigLoca.UI_TASK_立即重生;
			}
			else if (this.mTaskState === TaskStates.None) {

			} else {
				if (completed) {
					taskId = this.mNextMainTaskId;
					submitText = ConfigLoca.UI_TASK_领取奖励;
				} else {
					submitText = ConfigLoca.UI_TASK_立即前往;
				}
			}
			this._Submit.label = submitText;
			this._Submit.disabled = this.mLevelLimited || this.mNeedZhuanSheng;

			if (this._Submit.disabled) {
				this.mAutoNextTimer = 5;
			}
		}

		close(type?: string, showEffect?: boolean) {
			super.close(type, false);		// 取消最小化时缩放效果
		}

		private OnSubmit(): void {

			if (this.mTaskId === -1) {
				return;
			}

			if (this.mNeedZhuanSheng) {
				// 转生相关todo.....
			} else if (this.mTaskState === TaskStates.None) {
				Net.sendNewTask(this.mNpcId, this.mTaskId);
			} else if (this.mTaskState === TaskStates.Accepted) {
				// 开始寻路
				Super.prccessAutotTaskFindRoad(this.mTaskId);
			}
			else if (this.mTaskState === TaskStates.Complete) {
				Net.sendCompleteTask(this.mNpcId, this.mTaskId, this.mDbId, this.mNeedYuanBao);

				// 自动接收下主线任务
				if (this.mNextMainTaskId > 0) {
					Task.autoAcceptTask(this.mNextMainTaskId);
				}

				// 引导任务todo....
				// 如果当前完成的主线任务有后置开启的引导任务,则自动接受引导任务
				// int NextGuideTaskID = Super.GetNextGuideTask(TaskID);
				// if (NextGuideTaskID > 0)
				// {
				// 	Super.AutoAcceptGuideTask(NextGuideTaskID, "SourceNPC");
				// }
			}

			this.close();
		}

		/**
		 * 获得任务信息
		 */
		public getNewData(taskId: number, newTask: Boolean = true): void {

			if (-1 !== taskId) {
				const taskVo: tables.TaskVo = tableMgr.tasksTable.getTaskVo(taskId);
				let completeTask = false;
				if (taskVo !== null) {
					const taskclass: number = TableUtils.getFieldNumber(taskVo.TaskClass);
					this.mLimitZhuanSheng = taskVo.LimitZhuanSheng;
					this.mLimitLevel = taskVo.LimitLevel;
					this.mNeedZhuanSheng = this.mLimitZhuanSheng > Global.Data.roleData.ChangeLifeCount;
				}
				this._Icon1.visible = false;
				this._Icon2.visible = false;
				this.mNextMainTaskId = Task.getNextMainTask(taskId);
				this.mTaskId = taskId;

				if (newTask) {
					/**
					 * 向服务器请求任务奖励信息
					 */
					Net.sendGetTaskAwards(taskId);
					completeTask = true;
					const talkList = Task.getTaskTalkTextInfo(taskId, "AcceptTalk");
					this._NPCText.innerHTML = Task.formatTaskTalkNpcName(talkList);
					this._TalkText.innerHTML += Task.formatTaskTalkText(talkList);
					this.mTargetType = Task.getTaskTargetType(taskVo, 1);
					this.setState(false);
				} else {

					this.mTaskState = TaskStates.Accepted;
					const taskData = Task.getTaskDataById(taskId);
					if (taskData == null) {
						return;
					}

					this.mDbId = taskData.DbID;

					this.refreshTaskAwardsData(taskData.TaskAwards);

					let targetId = -1;
					const target1Complete = Task.jugeTaskTargetComplete(taskVo, 1, taskData.DoingTaskVal1);
					const target2Complete = Task.jugeTaskTargetComplete(taskVo, 2, taskData.DoingTaskVal2);
					if (target1Complete && target2Complete) {
						this.mTaskState = TaskStates.Complete;
						completeTask = true;
						const talkList = Task.getTaskTalkTextInfo(taskId, "CompleteTalk");
						this._NPCText.innerHTML = Task.formatTaskTalkNpcName(talkList);
						this._TalkText.innerHTML = Task.formatTaskTalkText(talkList);

						this.setState(true);
					} else {
						completeTask = false;
						const talkList = Task.getTaskTalkTextInfo(taskId, "DoingTalk");
						this._NPCText.innerHTML = Task.formatTaskTalkNpcName(talkList);
						this._TalkText.innerHTML += Task.formatTaskTalkText(talkList);

						if (!target1Complete) {
							this.mTargetType = Task.getTaskTargetType(taskVo, 1);
							targetId = taskVo.TargetNPC1;
						} else {
							this.mTargetType = Task.getTaskTargetType(taskVo, 2);
							targetId = taskVo.TargetNPC2;
						}

						// 按现有逻辑，并不会再走进boss副本相关代码，这儿就不添加了
						this.setState(false);
					}
				}
			}
		}
	}
}