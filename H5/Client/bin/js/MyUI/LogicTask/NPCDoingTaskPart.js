/**
* name npc接取任务界面
*/
var MyUI;
(function (MyUI) {
    let TaskStates;
    (function (TaskStates) {
        TaskStates[TaskStates["None"] = 0] = "None";
        TaskStates[TaskStates["Accepted"] = 1] = "Accepted";
        TaskStates[TaskStates["Faild"] = 2] = "Faild";
        TaskStates[TaskStates["Complete"] = 3] = "Complete";
    })(TaskStates = MyUI.TaskStates || (MyUI.TaskStates = {}));
    /**
     * NPC任务对话类
     */
    class NpcDoingTaskPart extends ui.Task.NPCDoingTaskPartUI {
        constructor() {
            super();
            /**
             * 指定任务NPC的数据表Id
             */
            this.mNpcExtensionId = -1;
            /**
             * 保存当前任务的目标类型
             */
            this.mTargetType = -1;
            /**
             * 当前显示的任务id
             */
            this.mTaskId = -1;
            /**
             * 是否能转生
             */
            this.mNeedZhuanSheng = false;
            /**
             * 提交任务必须打到的重生级别和等级
             */
            this.mLimitZhuanSheng = -1;
            /**
             * 领取任务领取的等级限制
             */
            this.mLimitLevel = -1;
            /**
             * 下一个任务id
             */
            this.mNextMainTaskId = -1;
            /**
             * 当前任务是否限制等级
             */
            this.mLevelLimited = false;
            this.mAutoNextTimer = 0; // 自动模拟提交
            /**
            * 当前任务的状态
            */
            this.mTaskState = TaskStates.None;
            /**
             * 保存数据库ID
             */
            this.mDbId = -1;
            /**
             * 保存npcid
             */
            this.mNpcId = -1;
            /**
             * 保存需要的元宝数量
             */
            this.mNeedYuanBao = 0;
            // 设置html文本的字体,因为在编辑器中设置不了
            const style = this._NPCText.style;
            style.fontFamily = MyUI.DefaultFont;
            style.color = "#" + MyUI.ColorCode.white;
            style.fontSize = 24;
            style.leading = 8;
            const style2 = this._TalkText.style;
            style2.fontFamily = MyUI.DefaultFont;
            style2.color = "#" + MyUI.ColorCode.white;
            style2.fontSize = 18;
            style2.leading = 8;
            this._Submit.on(Laya.Event.CLICK, this, this.OnSubmit);
        }
        /**
         * 打开NPC对话界面
         * @param taskId 指定任务Id
         * @param newTask
         */
        static Open(taskId, mNpcExtensionId, newTask = true) {
            const self = windowMgr.openWindow(WindowID.NpcDoingTask, null, true, false);
            self.getNewData(taskId, newTask);
        }
        /**
         * 刷新任务界面获得信息
         */
        refreshTaskAwardsData(taskAwardsData) {
            const arrayAwardsText = UIHelper.addAwardData(taskAwardsData, "CTextAwards2");
            let index = 0;
            for (const [key, value] of arrayAwardsText) {
                if (index === 0) {
                    this._UpText.text = value.toString();
                    this._UpIcon.skin = Global.getCommonAtlasImgPath(this.getImageName(key));
                }
                else {
                    this._DownText.text = value.toString();
                    this._DownIcon.skin = Global.getCommonAtlasImgPath(this.getImageName(key));
                }
                index++;
            }
            this.addAwardGoods(taskAwardsData);
        }
        RefreshTaskData() {
        }
        /**
         * 通过类型获得图标名称
         * @returns {}
         */
        getImageName(taskAwards) {
            if (taskAwards === AwardsTypes.Exp) { // 经验
                return "exp";
            }
            if (taskAwards === AwardsTypes.BindJinBi) { // 绑定金币
                return "money_gold_binding";
            }
            if (taskAwards === AwardsTypes.JinBi) { // 银两
                return "money_gold";
            }
            if (taskAwards === AwardsTypes.BindZuanShi) { // 绑定钻石
                return "money_diamond_binding";
            }
            return "";
        }
        // 设置奖励物品信息
        addAwardGoods(taskAwards) {
            const goodsDataList = Task.parseAwardsItemList(taskAwards.TaskawardList);
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
        setState(completed) {
            let taskId = this.mTaskId;
            let submitText = "";
            if (this.mNeedZhuanSheng) {
                submitText = ConfigLoca.UI_TASK_立即重生;
            }
            else if (this.mTaskState === TaskStates.None) {
            }
            else {
                if (completed) {
                    taskId = this.mNextMainTaskId;
                    submitText = ConfigLoca.UI_TASK_领取奖励;
                }
                else {
                    submitText = ConfigLoca.UI_TASK_立即前往;
                }
            }
            this._Submit.label = submitText;
            this._Submit.disabled = this.mLevelLimited || this.mNeedZhuanSheng;
            if (this._Submit.disabled) {
                this.mAutoNextTimer = 5;
            }
        }
        close(type, showEffect) {
            super.close(type, false); // 取消最小化时缩放效果
        }
        OnSubmit() {
            if (this.mTaskId === -1) {
                return;
            }
            if (this.mNeedZhuanSheng) {
                // 转生相关todo.....
            }
            else if (this.mTaskState === TaskStates.None) {
                Net.sendNewTask(this.mNpcId, this.mTaskId);
            }
            else if (this.mTaskState === TaskStates.Accepted) {
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
        getNewData(taskId, newTask = true) {
            if (-1 !== taskId) {
                const taskVo = tableMgr.tasksTable.getTaskVo(taskId);
                let completeTask = false;
                if (taskVo !== null) {
                    const taskclass = taskVo.TaskClass;
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
                }
                else {
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
                    }
                    else {
                        completeTask = false;
                        const talkList = Task.getTaskTalkTextInfo(taskId, "DoingTalk");
                        this._NPCText.innerHTML = Task.formatTaskTalkNpcName(talkList);
                        this._TalkText.innerHTML += Task.formatTaskTalkText(talkList);
                        if (!target1Complete) {
                            this.mTargetType = Task.getTaskTargetType(taskVo, 1);
                            targetId = taskVo.TargetNPC1;
                        }
                        else {
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
    MyUI.NpcDoingTaskPart = NpcDoingTaskPart;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=NPCDoingTaskPart.js.map