var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
* name
*/
var LogicTask;
(function (LogicTask) {
    /**
     * 一直显示在屏幕左边的迷你任务界面
     */
    class TaskBoxMini extends ui.Task.TaskBoxMiniUI {
        constructor() {
            super();
            this.mBShowTask = true; // 当前显示任务还是队伍
            this.mTeamIcon = null; // 队伍按钮*/
            this.mTeamSprite = null; // ???? 
            this.mTaskSprite = null;
            this.mLevelLimited = false; // 是否被等级限制了,这样当点击时就不会执行任务
            this.mHaveMainTask = false; // 当前人物身上是否有主任务
            this.mRoadMainTaskId = -1; // 主任务寻路ID
            this.mTaskCompleted = false;
            this.mOldMainTaskInfoStr = null;
            // 主任务引导目标信息
            this.TargetType = -1; // 当前任务的目标类型
            this.TaskID = -1; // 当前任务的Id
            this.NpcID = -1; // 当前任务的Npc
            this.MapCode = -1; // 当前任务所在的关卡Id
            this.ToPosX = -1; // 任务的目标位置
            this.ToPosY = -1; // 任务的目标位置
            this.mAutoOffEvents = []; //  自动移除的事件
            this.mBtnTaskIcon.clickHandler = new laya.utils.Handler(this, this.onTaskClick);
            // 设置一些无法在编辑器中设置的字体属性
            const style = this.mTxtTaskInfo.style;
            style.fontFamily = MyUI.DefaultFont;
            style.color = "#" + MyUI.ColorCode.white;
            style.fontSize = 18;
            style.leading = 8;
            // this.mTxtTaskInfo.innerHTML = "<font color='#f2b308'>[主]前往城外啊<br/></font>去[皇都原]找<font color='#49bd1b'>王云</font>对话<font color='#e73722'>(0/1)<br/></font>";
            // 监听任务更新事件
            this.mAutoOffEvents.push(gameEventBus.taskUpdate.on(this, taskId => this.refreshTasks(taskId, 1)));
            // 监听任务完成事件
            this.mAutoOffEvents.push(gameEventBus.taskCompleted.on(this, completedTask => this.refreshTasks(completedTask.taskID, 2)));
            // 监听接受新任务的事件
            this.mAutoOffEvents.push(gameEventBus.newTask.on(this, taskData => this.refreshTasks(taskData.DoingTaskID, 0)));
            // 监听等级变化事件
            this.mAutoOffEvents.push(gameEventBus.levelChange.on(this, () => { this.refreshTasks(); }));
        }
        destroy(destroyChild) {
            // 移除事件监听
            this.mAutoOffEvents.forEach((event) => event.off());
            this.mAutoOffEvents = [];
            super.destroy(destroyChild);
        }
        /**
         * 不同任务的处理函数
         * @returns {}
         */
        onTaskClick(type) {
            this.bodyClick();
        }
        /**
         * 点击了任务区域的处理函数
         */
        bodyClick() {
            if (this.TaskID < 0)
                return false;
            if (10001 === this.TargetType) {
                // to do ... 押镖任务
                // GameInstance.Game.SpriteFindBiaoChe();
                return true;
            }
            else if (10002 === this.TargetType) {
                // to do ... 打开宝典
                // Global.GlobalEventDispatcher.dispatchEvent(U3DUtils.NEW<PlayGameContolEvent>());
                return true;
            }
            // 如果是地图id或者目标类型都是空，则返回接结束
            if (-1 === this.TargetType || -1 === this.MapCode) {
                return true;
            }
            const mapCode = this.MapCode;
            const roleData = gameIns.gameState.roleData;
            const sceneUIClass = TableUtils.getMapSceneUIClass(roleData.MapCode);
            if (50 === mapCode && sceneUIClass !== SceneUIClasses.KuaFuMap) {
                // to do ...
                // PlayZone.GlobalPlayZone.OpenKuafuMapView(TargetType, -1, NpcID, mapCode, ToPosX, ToPosY);
                return true;
            }
            if (60 === mapCode && sceneUIClass !== SceneUIClasses.HuanShuYuan) {
                // to do ...
                // PlayZone.GlobalPlayZone.OpenKuafuMapView(TargetType, -1, NpcID, mapCode, ToPosX, ToPosY);
                return true;
            }
            if (this.TargetType === EActorType.NPC) {
                if (roleData.IsFlashPlayer >= 1 && this.TaskID <= 105 && this.TaskID > 100) { // 非新人阶段,105及以前的任务无视距离
                    // to do ...
                    // 直接调用场景中的函数显示npc对话框
                    // if (null != Global.Data.GameScene) {
                    //    Global.Data.GameScene.ExternalCallNpcDialog(NpcID, 20000);
                    // }
                    return true;
                }
            }
            return this.findRoad(mapCode);
        }
        /**
         * 添加指定类型的任务
         * @param taskClass 指定要添加的任务类型
         */
        addWaitingTask(taskClass) {
            const taskId = 0;
            const taskVo = Task.FindNextTask(taskClass);
            if (null == taskVo) {
                return false;
            }
            if (TaskClasses.Main === taskClass) {
                let taskInfoStr = "";
                // 级别不够
                const limitLevel = taskVo.LimitLevel;
                const limitZhuanSheng = taskVo.LimitZhuanSheng;
                if (!UIHelper.AvalidLevel(limitLevel, limitZhuanSheng)) {
                    taskInfoStr += Global.String.Format(ConfigLoca.UI_TASK_NEEDLEVEL, Global.GetColorStringForNGUIText(MyUI.ColorCode.red, UIHelper.FormatLevelLimit(limitLevel, limitZhuanSheng)));
                    this.mLevelLimited = false;
                }
                else {
                    if (!UIHelper.AvalidLevel(taskVo.MinLevel, taskVo.MinZhuanSheng)) {
                        taskInfoStr += Global.String.Format(ConfigLoca.UI_TASK_NEEDLEVEL, Global.GetColorStringForNGUIText(MyUI.ColorCode.red, UIHelper.FormatLevelLimit(taskVo.MinLevel, taskVo.MinZhuanSheng)));
                        this.mLevelLimited = false;
                    }
                    else
                        this.mLevelLimited = true;
                }
                const txt = taskInfoStr + TaskBoxMini.getTaskSourceNPCDesc(taskVo);
                this.mTxtTaskInfo.innerHTML = txt;
                if (txt.length > 0) {
                    const srcNPCName = TaskBoxMini.getTaskSourceNPCName(taskVo);
                    if ("" !== srcNPCName) {
                        const outRef = {
                            mapCode: -1,
                            npcType: -1,
                            npcID: -1
                        };
                        TaskBoxMini.getTaskSourceNPCID(taskVo, outRef);
                        this.setTargetPos(outRef.npcType, taskId, outRef.npcID, outRef.mapCode);
                    }
                }
                // 滑动任务栏主线文本更改 to do ...
                // UpdateScrollTaskInfo(TaskClasses.Main, MainTaskInfo.Text);
            }
            else if (TaskClasses.DailyTask === taskClass) {
                const taskName = Global.GetColorStringForNGUIText(Loca.getLang("日常任务"), "");
                // OtherTaskInfo.Text = String.Format("{0}\n{1}", taskName, Loca.getLang("点击接取日常任务")/*Super.GetTaskSourceNPCDesc(taskVO)*/);
            }
            else if (TaskClasses.PriceTask === taskClass) {
                // TaoFaTaskInfo.Text = Super.GetTaskSourceNPCDesc(taskVO);
            }
            return true;
        }
        /**
         * 返回要接取的任务的描述
         * @param TaskVO 指定要获取的任务
         */
        static getTaskSourceNPCDesc(taskVO) {
            let ret = "";
            const destNPC = taskVO.SourceNPC;
            if (destNPC !== -1) {
                const vo = TableUtils.getNPCVOByID(destNPC);
                const mapName = this.EncodingTaskDescMapName(vo.MapCode);
                const SName = this.EncodingTaskDescSName(Loca.getLang(vo.SName));
                ret = Global.String.Format(ConfigLoca.UI_TASK_FindAndAsk, mapName, SName);
            }
            return ret;
        }
        /**
         * 获取要拉取任务的NPC的名称描述
         * @param taskVO 指定任务
         */
        static getTaskSourceNPCName(taskVO) {
            let ret;
            const sourceNPC = taskVO.SourceNPC;
            if (sourceNPC !== -1) {
                const vo = TableUtils.getNPCVOByID(sourceNPC);
                ret = Loca.getLang(vo.SName);
            }
            return ret;
        }
        /**
         *  取得任务指定目标的描述
         * @param taskData 任务数据
         * @param taskVo 任务的信息
         * @param targetId 任务目标索引
         */
        getTaskInfoPartStr(taskData, taskVo, targetId) {
            let str = "";
            const mapCode = -1;
            const targetNum = TaskBoxMini.getTaskTargetNum(taskVo, taskData.DoingTaskVal1, targetId);
            str = TaskBoxMini.getTaskTargetDesc(taskVo, targetId, this.mLevelLimited);
            if (str.length > 0) {
                const targetName = TaskBoxMini.getTaskTargetName(taskVo, targetId);
                if (!Global.String.IsNullOrWhiteSpace(targetName)) {
                    // 寻路到任务目标
                    const sTaskInfo = TaskBoxMini.getTaskTargetId(taskVo, targetId, false);
                    if (mapCode !== gameIns.gameState.roleData.MapCode && TableUtils.getMapType(mapCode) !== MapTypes.Normal) {
                        // 任务副本,任务SourceNPC处					
                        TaskBoxMini.getTaskDestNpcid(taskVo, sTaskInfo);
                        this.setTargetPos(sTaskInfo.npcType, taskData.DoingTaskID, sTaskInfo.npcID, sTaskInfo.mapCode);
                    }
                    else {
                        this.setTargetPos(sTaskInfo.npcType, taskData.DoingTaskID, sTaskInfo.npcID, sTaskInfo.mapCode, sTaskInfo.posX, sTaskInfo.posY);
                    }
                }
                if (!Global.String.IsNullOrWhiteSpace(targetNum)) {
                    str = str + Global.GetColorStringForNGUIText(MyUI.ColorCode.red, targetNum);
                }
            }
            return str;
        }
        /**
         * 接到新任务的动画效果
         * @param taskID
         * @param newTaskStr
         * @param trigerType
         * @param tasktype
         * @returns {}
         */
        switchToTask(taskId, newTaskStr, trigerType = -1, tasktype = TaskClasses.Main) {
            if (TaskClasses.Main === tasktype) {
                this.mTxtTaskInfo.innerHTML = newTaskStr;
                // 滑动任务栏主线任务失败文本更改
                // UpdateScrollTaskInfo(TaskClasses.Main, MainTaskInfo.Text);
            }
            else if (TaskClasses.DailyTask === tasktype) {
                Global.Log.Assert(false);
                // OtherTaskInfo.Text = newTaskStr;
                // 滑动任务栏日程任务文本更新
                // UpdateScrollTaskInfo(TaskClasses.DailyTask, OtherTaskInfo.Text);
            }
            else if (TaskClasses.PriceTask === tasktype) {
                Global.Log.Assert(false);
                // TaoFaTaskInfo.Text = newTaskStr;
            }
            else if (TaskClasses.GuideTask === tasktype) {
                Global.Log.Assert(false);
                // GuideTaskInfo.Text = newTaskStr;
                // 滑动任务栏主线任务失败文本更改
                // UpdateScrollTaskInfo(TaskClasses.GuideTask, GuideTaskInfo.Text, taskID);
            }
            if (trigerType === 0) {
                // OnTaskNew(tasktype);			
            }
        }
        /**
         * 设置任务的目标位置
         * @param targetType 目标类型
         * @param taskId 任务Id
         * @param targetId 目标Id(NPC?)
         * @param mapCode 目标所在地图的Id
         * @param toPosX 目标坐标
         * @param toPosY 目标坐标
         */
        setTargetPos(targetType, taskID, targetID, mapCode, toPosX = -1, toPosY = -1) {
            this.MapCode = mapCode;
            this.TargetType = targetType;
            this.NpcID = targetID;
            this.TaskID = taskID;
            this.ToPosX = toPosX;
            this.ToPosY = toPosY;
        }
        /**
         * 由当前的任务信息来更新下任务目标位置
         * 注: 由于地图的NPC文件是动态加载的,所以无法阻塞式直接读取到任务目标位置,有可能需要先下载再读取
         */
        updateTaskTargetPos() {
            return __awaiter(this, void 0, void 0, function* () {
                const targetType = this.TargetType;
                const mapCode = this.MapCode;
                const targetID = this.NpcID;
                if (10001 === targetType || 10002 === targetType) {
                    // 押镖任务 或 打开宝典
                    return true;
                }
                if (-1 === targetType || -1 === mapCode) {
                    return true;
                }
                let pt;
                if (targetType === EActorType.Monster) {
                    pt = yield Global.GetMonsterPointByID(mapCode, targetID);
                }
                else if (targetType === EActorType.NPC) {
                    pt = yield Global.getNPCPointByID(mapCode, targetID);
                    this.ToPosX = pt.x;
                    this.ToPosY = pt.y;
                }
                else {
                    pt = new Laya.Point(1, -1);
                }
                if (pt.x >= 0 && pt.y >= 0) {
                    this.ToPosX = pt.x;
                    this.ToPosY = pt.y;
                }
                return true;
            });
        }
        /**
         * 查找玩家身上是否有指定类型的正在做的任务
         * @param taskClass 指定要查找的任务类型
         */
        static findHavingMainTask(taskClass) {
            const taskDataData = gameIns.gameState.roleData.TaskDataList;
            if (null == taskDataData) {
                return null;
            }
            for (let i = 0; i < taskDataData.length; i++) {
                const taskVo = tableMgr.tasksTable.getTaskVo(taskDataData[i].DoingTaskID);
                if (null == taskVo) {
                    continue;
                }
                if (taskVo.TaskClass === taskClass) {
                    return taskDataData[i];
                }
            }
            return null;
        }
        /**
         * 刷新任务
         * @param newTaskId 指定要刷新的任务ID,如果为-1,则表示自动显示可用的主线任务
         * @param triggerType 指定任务的状态 0:新任务 1:状态修改 2:提交任务 -1:初始化任务
         * @returns {}
         */
        refreshTasks(newTaskId = -1, triggerType = -1) {
            let taskMainData;
            let taskOtherData = null;
            let taskTaoFaData = null;
            let taskGuideTaskData = null;
            const taskData = Task.getTaskDataById(newTaskId);
            if (taskData == null) { // 没有找到指定的任务,开始做默认的主线任务
                // to do ...
                // if (gameIns.gameState.roleData.TaskDataList == null) {
                //    this.addWaitingTask(TaskClasses.Main);
                // }
                // 查找身上是否有主线任务
                taskMainData = TaskBoxMini.findHavingMainTask(TaskClasses.Main);
                if (null == taskMainData) { // 还没有主线任务,添加一个
                    this.mHaveMainTask = false;
                    this.addWaitingTask(TaskClasses.Main);
                }
                // to do ... 日常任务的检测?
                // InitGuideTask(); // 查找引导型任务?
            }
            else { // 处理指定的任务
                const taskVO = tableMgr.tasksTable.getTaskVo(newTaskId);
                if (!taskVO) {
                    Global.Log.Error("错误的任务Id(%d),在任务表中找不到定义", newTaskId);
                    return;
                }
                if (TaskClasses.Main === taskVO.TaskClass) {
                    taskMainData = taskData;
                }
                else if (TaskClasses.DailyTask === taskVO.TaskClass) {
                    taskOtherData = taskData;
                }
                else if (TaskClasses.PriceTask === taskVO.TaskClass) {
                    taskTaoFaData = taskData;
                }
                else if (TaskClasses.GuideTask === taskVO.TaskClass) {
                    taskGuideTaskData = taskData;
                }
                else {
                    return;
                }
            }
            // 刷新主线任务
            if (null != taskMainData) {
                this.mHaveMainTask = true;
                this.mRoadMainTaskId = taskMainData.DoingTaskID;
                const taskVo = tableMgr.tasksTable.getTaskVo(taskMainData.DoingTaskID);
                const title = taskVo.Title;
                const taskClass = taskVo.TaskClass;
                const taskTarget1Completed = Task.jugeTaskTargetComplete(taskVo, 1, taskMainData.DoingTaskVal1);
                const taskTarget2Completed = Task.jugeTaskTargetComplete(taskVo, 2, taskMainData.DoingTaskVal2);
                // 总的任务介绍
                let taskInfoStr = "";
                const limitLevel = taskVo.LimitLevel;
                const limitZhuanSheng = taskVo.LimitZhuanSheng;
                // 检测级别是否足够
                if (!UIHelper.AvalidLevel(limitLevel, limitZhuanSheng)) {
                    const colorText = Global.GetColorStringForNGUIText(MyUI.ColorCode.red, UIHelper.FormatLevelLimit(limitLevel, limitZhuanSheng));
                    taskInfoStr += Global.String.Format(ConfigLoca.UI_TASK_NEEDLEVEL, colorText); // 等级达到{0}后\r\n
                    this.mLevelLimited = false;
                }
                else {
                    if (!UIHelper.AvalidLevel(taskVo.MinLevel, taskVo.MinZhuanSheng)) {
                        const colorText = Global.GetColorStringForNGUIText(MyUI.ColorCode.red, UIHelper.FormatLevelLimit(taskVo.MinLevel, taskVo.MinZhuanSheng));
                        taskInfoStr += Global.String.Format(ConfigLoca.UI_TASK_NEEDLEVEL, colorText); // 等级达到{0}后\r\n
                        this.mLevelLimited = false;
                    }
                    else
                        this.mLevelLimited = true;
                }
                let isContinue = true;
                // 如果未完成未完成
                if (!taskTarget1Completed || !taskTarget2Completed) {
                    // 判断任务是否失败
                    let failed = false;
                    const taskMaxOverTime = taskVo.Taketime;
                    const taskaddTime = taskMainData.AddDateTime;
                    if (taskMaxOverTime > 0 && (TimeManager.getCorrectLocalTime() - taskaddTime >= (taskMaxOverTime * 1000))) {
                        // 任务超时,失败
                        failed = true;
                        taskInfoStr = `${title}${Global.GetColorStringForNGUIText(MyUI.ColorCode.red, ConfigLoca.UI_TASK_FAILURE)}`;
                    }
                    const pubStartTime = taskVo.PubStartTime;
                    const pubEndTime = taskVo.PubEndTime;
                    if (!Global.String.IsNullOrWhiteSpace(pubStartTime) && !Global.String.IsNullOrWhiteSpace(pubEndTime)) {
                        const nowTicks = TimeManager.getCorrectLocalTime();
                        const startTime = TimeManager.safeConvertToTicks(pubStartTime);
                        const endTime = TimeManager.safeConvertToTicks(pubEndTime);
                        if (nowTicks < startTime || nowTicks > endTime) {
                            // 任务不在有效时间段了
                            failed = true;
                            taskInfoStr = `${title}${Global.GetColorStringForNGUIText(MyUI.ColorCode.red, ConfigLoca.UI_TASK_FAILURE)}`;
                        }
                    }
                    if (failed) {
                        // 任务失败
                        this.mTxtTaskInfo.innerHTML = taskInfoStr;
                        // 滑动任务栏主线任务失败文本更改
                        // UpdateScrollTaskInfo(TaskClasses.Main, MainTaskInfo.Text);
                        isContinue = false;
                    }
                }
                if (isContinue) {
                    // 任务未完成
                    if (!taskTarget1Completed) {
                        taskInfoStr += this.getTaskInfoPartStr(taskMainData, taskVo, 1);
                    }
                    else if (!taskTarget2Completed) {
                        taskInfoStr += this.getTaskInfoPartStr(taskMainData, taskVo, 2);
                    }
                    else {
                        this.mTaskCompleted = true;
                        if (triggerType === 1) {
                            /**
                             * TODO:
                             */
                            // this.OnTaskOK(TaskClasses.Main);
                        }
                        // 任务完成
                        taskInfoStr += TaskBoxMini.getTaskDestNpcDesc(taskVo);
                        if (taskInfoStr.length > 0) {
                            const destNpcName = TaskBoxMini.getTaskDestNpcName(taskVo);
                            if (destNpcName != null) {
                                const destNpcInfo = { mapCode: 0, npcType: 0, npcID: 0 };
                                TaskBoxMini.getTaskDestNpcid(taskVo, destNpcInfo);
                                this.setTargetPos(destNpcInfo.npcType, taskMainData.DoingTaskID, destNpcInfo.npcID, destNpcInfo.mapCode);
                            }
                        }
                        /**
                        if (Global.Data.roleData.IsFlashPlayer >= 1) //如果是新人，并且不是第一个任务，则自动去交
                        {
                            if (101 <= taskMainData.DoingTaskID && taskMainData.DoingTaskID <= 105)
                            {
                                if (!PlayGameGuide.singleton.Visibility) //如果已经在显示了剧情中，则不显示
                                {
                                    BodyClick();
                                }
                            }
                        } */
                    }
                    this.switchToTask(taskMainData.DoingTaskID, taskInfoStr, triggerType, TaskClasses.Main);
                    this.mOldMainTaskInfoStr = this.mTxtTaskInfo.text;
                }
            }
        }
        /**
         * 取得任务类型对应的名称前缀
         * @param taskClass 指定要获取名称前缀的任务类型
         */
        static getTaskClassName(taskClass) {
            switch (taskClass) {
                case TaskClasses.Main:
                    return ConfigLoca.UI_TASKNAME_TYPE_MAIN;
                case TaskClasses.DailyTask:
                    return ConfigLoca.UI_TASKNAME_TYPE_DailyTask;
                case TaskClasses.GuideTask:
                    return ConfigLoca.UI_TASKNAME_TYPE_GuideTask;
                default:
                    return "";
            }
        }
        static getTaskGoodsName(taskXml, num) {
            const goodsName = "";
            const forgeLevel = 0;
            const quality = 0;
            if (num === 1) {
                Global.ParsePropNameInfo(taskXml.PropsName1, goodsName, forgeLevel, quality);
            }
            else {
                Global.ParsePropNameInfo(taskXml.PropsName2, goodsName, forgeLevel, quality);
            }
            return goodsName;
        }
        /**
         * 得到目标任务名称
         * @param taskXml 任务信息
         * @param num 任务目标的索引
         */
        static getTaskTargetName(taskXml, num) {
            let targetType;
            let targetNpc;
            if (num === 1) {
                targetType = taskXml.TargetType1;
                targetNpc = taskXml.TargetNPC1;
            }
            else if (num === 2) {
                targetType = taskXml.TargetType2;
                targetNpc = taskXml.TargetNPC2;
            }
            let ret = "";
            switch (targetType) {
                case TaskTypes.Talk:
                    if (-1 !== targetNpc) {
                        const vo = TableUtils.getNPCVOByID(targetNpc);
                        ret = Loca.getLang(vo.SName);
                    }
                    break;
                case TaskTypes.MonsterSomething:
                case TaskTypes.CaiJiGoods:
                case TaskTypes.KillMonster:
                    if (-1 !== targetNpc) {
                        const monsterVO = TableUtils.getMonsterXmlNodeByID(targetNpc);
                        ret = Loca.getLang(monsterVO.SName);
                    }
                    break;
                case TaskTypes.KillMonsterForLevel:
                    if (-1 !== targetNpc) {
                        ret = "KillMonsterForLevel";
                    }
                    break;
                case TaskTypes.ZhiLiao:
                case TaskTypes.FangHuo:
                case TaskTypes.UseSomething:
                case TaskTypes.NeedYuanBao:
                    if (-1 !== targetNpc) {
                        const vo = TableUtils.getNPCVOByID(targetNpc);
                        ret = Loca.getLang(vo.SName);
                    }
                    break;
                default:
                    // to do ... 其它的任务类型
                    Global.Log.Assert(false);
                    break;
            }
            return ret;
        }
        /**
         * 由传入的任务信息获取对应的目标NPC的信息
         * @param taskVo 指定任务信息
         * @param refObj 用于输出获取的结果
         */
        static getTaskDestNpcid(taskVo, refObj) {
            const destNPC = taskVo.DestNPC;
            const vo = TableUtils.getNPCVOByID(destNPC);
            refObj.mapCode = Global.getNPCOrMonsterMapCodeByID(vo.MapCode);
            refObj.npcID = vo.ID;
            refObj.npcType = EActorType.NPC;
        }
        /**
         * 获取接受任务的信息
         * @param taskVO 指定任务信息
         * @param outRef 用于输出获取的结果
         */
        static getTaskSourceNPCID(taskVO, outRef) {
            outRef.npcType = EActorType.NPC;
            const vo = TableUtils.getNPCVOByID(taskVO.SourceNPC);
            outRef.mapCode = vo.MapCode;
            outRef.npcID = vo.ID;
            return true;
        }
        /**
         * 获取任务目标的描述
         * @param taskVo 指定要获取描述的任务信息
         * @param num 指定目标索引
         * @param isShowTaskType 指定是否显示任务类型
         */
        static getTaskTargetDesc(taskVo, num, isShowTaskType = true) {
            let ret = "";
            let targetType = 0;
            let targetNPC = 0;
            if (num === 1) {
                targetType = taskVo.TargetType1;
                targetNPC = taskVo.TargetNPC1;
            }
            else if (num === 2) {
                targetType = taskVo.TargetType2;
                targetNPC = taskVo.TargetNPC2;
            }
            // 格式化任务名称
            const taskTypeStr = (taskVo.TaskClass === TaskClasses.Main) ? ConfigLoca.UI_TASKNAME_TYPE_MAIN : "";
            let taskName = "";
            if (taskVo.TaskClass === TaskClasses.PriceTask) {
                taskName = Global.GetColorStringForNGUIText(MyUI.ColorCode.purple, taskTypeStr + Loca.getLang(taskVo.Title));
            }
            else if (taskVo.TaskClass === TaskClasses.DailyTask) {
                taskName = Global.GetColorStringForNGUIText(MyUI.ColorCode.blue, taskTypeStr + Loca.getLang(taskVo.Title));
            }
            else if (taskVo.TaskClass === TaskClasses.GuideTask) {
                const taskTitleStr = ConfigLoca.UI_TASKNAME_TYPE_GuideTask;
                taskName = taskTitleStr + Loca.getLangWithColor(taskVo.Title, "dc76d6");
            }
            else {
                taskName = Global.GetColorStringForNGUIText(MyUI.ColorCode.yellow, taskTypeStr + Loca.getLang(taskVo.Title));
            }
            // 格式化任务描述
            let vo = null;
            switch (targetType) {
                case TaskTypes.Talk: // 与NPC对话
                    if (-1 !== targetNPC) {
                        vo = TableUtils.getNPCVOByID(targetNPC);
                        const mapName = this.EncodingTaskDescMapName(vo.MapCode);
                        const SName = this.EncodingTaskDescSName(Loca.getLang(vo.SName));
                        ret = Global.String.Format(ConfigLoca.UI_TASK_FindAndTalk, mapName, SName);
                    }
                    break;
                case TaskTypes.KillMonster: // 击杀指定的怪物
                    if (-1 !== targetNPC) {
                        const monsterVO = TableUtils.getMonsterXmlNodeByID(targetNPC);
                        const mapName = TaskBoxMini.EncodingTaskDescMapName(monsterVO.MapCode);
                        const SName = TaskBoxMini.EncodingTaskDescMonsterName(Loca.getLang(monsterVO.SName));
                        ret = Global.String.Format(ConfigLoca.UI_TASK_Target_KillMonster, mapName, SName);
                    }
                    break;
                case TaskTypes.KillMonsterForLevel: // 击杀指定等级的怪物
                    if (-1 !== targetNPC) {
                        ret = Global.String.Format(ConfigLoca.UI_TASK_Target_KillMonsterForLevel, targetNPC);
                    }
                    break;
                case TaskTypes.MonsterSomething: // 击杀指定怪物获取道具
                    if (-1 !== targetNPC) {
                        const monsterVO = TableUtils.getMonsterXmlNodeByID(targetNPC);
                        const mapName = TaskBoxMini.EncodingTaskDescMapName(monsterVO.MapCode);
                        const SName = TaskBoxMini.EncodingTaskDescMonsterName(Loca.getLang(monsterVO.SName));
                        ret = Global.String.Format(ConfigLoca.UI_TASK_Target_MonsterSomething, mapName, SName, TaskBoxMini.getTaskGoodsName(taskVo, num));
                    }
                    break;
                default:
                    // to do ... 其它任务的描述
                    Global.Log.Assert(false);
                    break;
            }
            if (isShowTaskType) {
                return `${taskName}<br/>${ret}`;
            }
            else {
                return ret;
            }
        }
        /**
         * 获取地图名称的描述
         * @param mapcode 指定要获取描述的地图
         */
        static EncodingTaskDescMapName(mapcode) {
            return TableUtils.getMapNameByCodeEx(Global.getNPCOrMonsterMapCodeByID(mapcode));
        }
        /**
         * 格式化任务描述中的NPC名称
         * @param sName 指定要格式化的NPC名称
         */
        static EncodingTaskDescSName(sName) {
            return Global.GetColorStringForNGUIText(MyUI.ColorCode.green, sName);
        }
        /**
         * 格式化任务描述中怪物的名称
         * @param sName 指定要格式化的怪物名称
         */
        static EncodingTaskDescMonsterName(sName) {
            return Global.GetColorStringForNGUIText(MyUI.ColorCode.red, sName);
        }
        /**
         * 获取任务目标完成情况的描述
         * @param taskVO 指定任务信息
         * @param isShowTaskType 是否显示任务类型
         */
        static getTaskDestNpcDesc(taskVO, isShowTaskType = true) {
            let ret = "";
            const destNPC = taskVO.DestNPC;
            if (destNPC !== -1) {
                const vo = TableUtils.getNPCVOByID(destNPC);
                const mapName = this.EncodingTaskDescMapName(vo.MapCode);
                const SName = this.EncodingTaskDescSName(Loca.getLang(vo.SName));
                let taskTypeStr = (taskVO.TaskClass === TaskClasses.Main) ? ConfigLoca.UI_TASKNAME_TYPE_MAIN : "";
                let taskName = "";
                ret = Global.String.Format(ConfigLoca.UI_TASK_FindAndSubmit, mapName, SName);
                if (taskVO.TaskClass === TaskClasses.PriceTask) {
                    taskName = Global.GetColorStringForNGUIText("ff37f7", taskTypeStr + Loca.getLang(taskVO.Title));
                }
                else if (taskVO.TaskClass === TaskClasses.DailyTask) {
                    taskName = Global.GetColorStringForNGUIText(MyUI.ColorCode.blue, taskTypeStr + Loca.getLang(taskVO.Title));
                    ret = ConfigLoca.UI_TASK_CompleteAndAward; // 任务已完成，点击领取奖励
                }
                else if (taskVO.TaskClass === TaskClasses.GuideTask) {
                    taskTypeStr = MyUI.ColorCode.encodingText(ConfigLoca.UI_TASKNAME_TYPE_GuideTask, "dc76d6"); // 文本：[引导]
                    taskName = taskTypeStr + Loca.getLangWithColor(taskVO.Title, "dc76d6");
                    ret = ConfigLoca.UI_TASK_CompleteAndAward; // 文本：任务已完成，点击领取奖励
                }
                else {
                    taskName = Global.GetColorStringForNGUIText("fac60d", taskTypeStr + Loca.getLang(taskVO.Title));
                }
                // ret = StringUtil.substitute(Loca.getLang("去[{0}]找{1}提交"), mapName, SName);
                if (isShowTaskType) {
                    ret = `${taskName}<br>${ret}`;
                }
            }
            else if (taskVO.TaskClass === TaskClasses.GuideTask) {
                const taskTypeStr = MyUI.ColorCode.encodingText(ConfigLoca.UI_TASKNAME_TYPE_GuideTask, "dc76d6"); // 文本：[引导]
                const taskName = taskTypeStr + Loca.getLangWithColor(taskVO.Title, "dc76d6");
                ret = ConfigLoca.UI_TASK_CompleteAndAward; // 文本：任务已完成，点击领取奖励
                if (isShowTaskType) {
                    ret = `${taskName}<br>${ret}`;
                }
            }
            return ret;
        }
        static getTaskDestNpcName(taskVo) {
            let ret = null;
            const destNpcId = taskVo.DestNPC;
            if (destNpcId !== -1) {
                const vo = TableUtils.getNPCVOByID(destNpcId);
                ret = Loca.getLang(vo.SName);
            }
            return ret;
        }
        /**
         * 由给定的参数返回指定任务目标数量的完成情况的描述
         * @param taskVO 要完成的任务信息
         * @param doingVal 当前已经完成的数量
         * @param num 要完成的目标索引
         */
        static getTaskTargetNum(taskVO, doingVal, num) {
            let targetType = 0;
            let targetNum = 0;
            if (num === 1) {
                targetType = taskVO.TargetType1;
                targetNum = taskVO.TargetNum1;
            }
            else if (num === 2) {
                targetType = taskVO.TargetType2;
                targetNum = taskVO.TargetNum2;
            }
            if (targetNum <= 0) {
                targetNum = 1;
            }
            if (targetType !== TaskTypes.MonsterSomething &&
                targetType !== TaskTypes.KillMonster &&
                targetType !== TaskTypes.CaiJiGoods &&
                targetType !== TaskTypes.KillMonsterForLevel) {
                if (doingVal > targetNum) {
                    doingVal = targetNum;
                }
            }
            return `(${doingVal}/${targetNum})`;
        }
        /**
         * 返回任务目标的信息
         * @param taskVO 任务信息
         * @param num 指定要获取任务的哪个目标的信息
         * @param replaceFuBen
         */
        static getTaskTargetId(taskVO, num, replaceFuBen) {
            const isFuBen = 0;
            let mapCode = -1;
            let npcType = EActorType.NPC;
            let npcID = -1;
            let posX = -1;
            let posY = -1;
            let targetType = 0;
            let targetNPC = 0;
            if (num === 1) {
                targetType = taskVO.TargetType1;
                targetNPC = taskVO.TargetNPC1;
            }
            else if (num === 2) {
                targetType = taskVO.TargetType2;
                targetNPC = taskVO.TargetNPC2;
            }
            if (targetType === TaskTypes.Talk) { // NPC对话任务
                if (-1 !== targetNPC) {
                    const vo = TableUtils.getNPCVOByID(targetNPC);
                    mapCode = Global.getNPCOrMonsterMapCodeByID(vo.MapCode);
                    npcType = EActorType.NPC;
                    npcID = vo.ID;
                }
            }
            else if (targetType === TaskTypes.KillMonster) { // 杀怪任务
                if (-1 !== targetNPC) {
                    const monsterVO = TableUtils.getMonsterXmlNodeByID(targetNPC);
                    mapCode = Global.getNPCOrMonsterMapCodeByID(monsterVO.MapCode);
                    npcType = EActorType.Monster;
                    npcID = monsterVO.ID;
                }
            }
            else if (targetType === TaskTypes.KillMonsterForLevel) {
                if (-1 !== targetNPC) {
                    mapCode = taskVO.TargetMapCode1;
                    npcType = EActorType.Monster;
                    // npcType = TaskTypes.KillMonsterForLevel;
                    const posStr = taskVO.TargetPos1;
                    if (!Global.String.IsNullOrEmpty(posStr)) {
                        const pos = posStr.split(",");
                        if (pos.length === 2) {
                            posX = parseInt(pos[0]);
                            posY = parseInt(pos[1]);
                        }
                    }
                }
            }
            else if (targetType === TaskTypes.MonsterSomething) {
                if (-1 !== targetNPC) {
                    const monsterVO = TableUtils.getMonsterXmlNodeByID(targetNPC);
                    mapCode = Global.getNPCOrMonsterMapCodeByID(monsterVO.MapCode);
                    npcType = EActorType.Monster;
                    npcID = monsterVO.ID;
                }
            }
            else if (targetType === TaskTypes.UseSomething) {
            }
            else if (targetType === TaskTypes.TransferSomething) {
                if (-1 !== targetNPC) {
                    const vo = TableUtils.getNPCVOByID(targetNPC);
                    mapCode = Global.getNPCOrMonsterMapCodeByID(vo.MapCode);
                    npcType = EActorType.NPC;
                    npcID = vo.ID;
                }
            }
            else if (targetType === TaskTypes.NeedYuanBao) {
                if (-1 !== targetNPC) {
                    const vo = TableUtils.getNPCVOByID(targetNPC);
                    mapCode = Global.getNPCOrMonsterMapCodeByID(vo.MapCode);
                    npcType = EActorType.NPC;
                    npcID = vo.ID;
                }
            }
            else if (targetType === TaskTypes.CaiJiGoods) {
                if (-1 !== targetNPC) {
                    const monsterVO = TableUtils.getMonsterXmlNodeByID(targetNPC);
                    mapCode = Global.getNPCOrMonsterMapCodeByID(monsterVO.MapCode);
                    npcType = EActorType.Monster;
                    npcID = monsterVO.ID;
                }
            }
            else if (targetType === TaskTypes.ZhiLiao) {
                if (-1 !== targetNPC) {
                    const vo = TableUtils.getNPCVOByID(targetNPC);
                    mapCode = Global.getNPCOrMonsterMapCodeByID(vo.MapCode);
                    npcType = EActorType.NPC;
                    npcID = vo.ID;
                }
            }
            else if (targetType === TaskTypes.FangHuo) {
                if (-1 !== targetNPC) {
                    const vo = TableUtils.getNPCVOByID(targetNPC);
                    mapCode = Global.getNPCOrMonsterMapCodeByID(vo.MapCode);
                    npcType = EActorType.NPC;
                    npcID = vo.ID;
                }
            }
            else if (targetType === TaskTypes.JoinFamily
                || targetType === TaskTypes.AddFriend
                || targetType === TaskTypes.CompleteOnceDailyTask
                || targetType === TaskTypes.JoinJingjichang
                || targetType === TaskTypes.WinJingjichang
                || targetType === TaskTypes.GetEquipFromChouJiang
                || targetType === TaskTypes.JoinBuluoyingdi
                || targetType === TaskTypes.JoinLuohanxingzhen
                || targetType === TaskTypes.MergeHighlevelLingdan
                || targetType === TaskTypes.XingyaoGuhuangShengjie
                || targetType === TaskTypes.JoinDouJiZhiWang
                || targetType === TaskTypes.SuoMoTa) {
            }
            else if (targetType !== TaskTypes.UseSomething) {
                if (-1 !== targetNPC) {
                    const vo = TableUtils.getNPCVOByID(targetNPC);
                    mapCode = Global.getNPCOrMonsterMapCodeByID(vo.MapCode);
                    npcType = EActorType.NPC;
                    npcID = vo.ID;
                }
            }
            if (posX < 0 && posY < 0) {
                let posStr = "";
                if (num === 1) {
                    posStr = taskVO.TargetPos1;
                }
                else if (num === 2) {
                    posStr = taskVO.TargetPos2;
                }
                if (!Global.String.IsNullOrEmpty(posStr)) {
                    if (mapCode < 0) {
                        if (num === 1) {
                            mapCode = taskVO.TargetMapCode1;
                        }
                        else if (num === 2) {
                            mapCode = taskVO.TargetMapCode2;
                        }
                    }
                    const pos = posStr.split(",");
                    if (pos.length === 2) {
                        posX = parseInt(pos[0]);
                        posY = parseInt(pos[1]);
                    }
                }
            }
            const retObj = {
                isFuBen: isFuBen,
                mapCode: mapCode,
                npcType: npcType,
                npcID: npcID,
                posX: posX,
                posY: posY
            };
            // 处理在副本中的目标
            if (replaceFuBen) {
                TaskBoxMini.ProcessFuBenNPCOrMonster(taskVO, mapCode, retObj);
            }
            return retObj;
        }
        // 处理副本
        static ProcessFuBenNPCOrMonster(taskVO, currentMapCode, refObj) {
            refObj.isFuBen = 0;
            if (-1 === currentMapCode) {
                return;
            }
            if (MapTypes.Normal === TableUtils.getMapType(currentMapCode)) {
                return;
            }
            refObj.isFuBen = 1;
            TaskBoxMini.getTaskDestNpcid(taskVO, refObj);
        }
        static setLeadTargetPos(mapCode, pos) {
            /**
             * TODO:.
            if (pos.x >= 0 && pos.z > 0)
            {
                //Debug.Log(string.Format("设置光圈: MapCode[{0}], pos[{1}]", mapCode, pos.ToString()));
                this.GData.MyLeadInfo.MapCode = mapCode;
                this.GData.MyLeadInfo.TaskTargetPos = pos;
            }
            else
            {
                this.GData.MyLeadInfo.MapCode = -1;
            }*/
        }
        /**
         * 开始到指定关卡的寻路
         * @param mapCode 要寻路到的关卡
         * 注意: 这是个异步函数
         */
        findRoad(mapCode) {
            return __awaiter(this, void 0, void 0, function* () {
                // 等待更新目标位置完成
                uiMgr.showNetWaiting();
                const result = yield this.updateTaskTargetPos();
                uiMgr.hideNetWaiting();
                if (!result) {
                    return false;
                }
                if (this.ToPosX === -1 || this.ToPosY === -1) {
                    // to do ...
                    // GGameInfocs.AddGameInfoMessage(GameInfoTypeIndexes.Error, ShowGameInfoTypes.ErrAndBox, StringUtil.substitute(Loca.getLang("路径信息格式错误 ,无法自动寻路")));
                    return true;
                }
                const pt = new Laya.Point(this.ToPosX, this.ToPosY);
                const TargetType = this.TargetType;
                const roleData = gameIns.gameState.roleData;
                if (TargetType === EActorType.Monster && roleData.IsFlashPlayer === 0) {
                    const monsterVO = TableUtils.getMonsterXmlNodeByID(this.NpcID);
                    if (monsterVO.MonsterType === MonsterTypes.Boss)
                        TaskBoxMini.autoFindRoad(mapCode, pt, 0, ExtActionTypes.EXTACTION_ATTACKBOSS, this.NpcID);
                    else
                        TaskBoxMini.autoFindRoad(mapCode, pt, 0, ExtActionTypes.EXTACTION_KILLMONSTER, this.NpcID);
                }
                else if (TargetType === EActorType.NPC) {
                    const extDistance = (this.NpcID === 60900) ? 30 : 0;
                    TaskBoxMini.autoFindRoad(mapCode, pt, SystemConfig.autoFindRoadOffset100 + extDistance, ExtActionTypes.EXTACTION_NPCDLG, this.NpcID);
                }
                else {
                    TaskBoxMini.autoFindRoad(mapCode, pt, 0, ExtActionTypes.EXTACTION_NONE);
                }
                return true;
            });
        }
        /**
         * 由界面发起的寻路到目标点
         * @param mapCode 目标关卡Id
         * @param pos 目标位置
         * @param offset 到达这个范围就停止寻路
         * @param extActionType 寻路停止后执行的动作
         * @param targetId 指定与extActionType相关的目标Id
         */
        static autoFindRoad(mapCode, pos, offset, extActionType, targetId) {
            Global.Log.Assert(extActionType !== ExtActionTypes.EXTACTION_NPCDLG || (extActionType === ExtActionTypes.EXTACTION_NPCDLG && targetId !== undefined), "如果与Npc对话,则必须传入 targetId!!!");
            const levelInfo = TableUtils.getMapMinLevelAndZhuanSheng(mapCode);
            if ((Global.Data.roleData.ChangeLifeCount * 400 + Global.Data.roleData.Level) < (levelInfo.minZhuanSheng * 400 + levelInfo.minLevel)) {
                // 等级不够
                uiMgr.hintText(ConfigLoca.UI_TASK_LevelNotEnough);
                return;
            }
            // 开启本地玩家的自动寻路逻辑
            const localPlayerController = GameMode.getLocalPlayerController();
            localPlayerController.autoFindRoad(mapCode, pos, offset, { actionType: extActionType, targetID: targetId });
        }
        /**
         * 根据给定Id的任务信息自动寻路,去做完成任务
         * @param taskID 要自动寻路的任务
         * @param dontEnterFuBen 是否进入副本
         * @param autoTransport 是否自动传送
         * 注: 此函数是异步执行的. 支持重入
         */
        static prccessAutoTaskFindRoad(taskID, dontEnterFuBen = false, autoTransport = true) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!MyUI.SystemHelpMgr.canAutoRoad()) {
                    return;
                }
                const taskVO = tableMgr.tasksTable.getTaskVo(taskID);
                const taskData = Task.getTaskDataById(taskID);
                const buttonID = taskVO.Teleports;
                let mapCode = -1;
                let npcType = -1;
                let npcID = -1;
                let toMapPos = new Laya.Point(0, 0);
                let complete = false;
                if (!Task.jugeTaskComplete(taskVO, taskData.DoingTaskVal1, taskData.DoingTaskVal2)) {
                    let targetIndex = 2;
                    let targetPos = taskVO.TargetPos2;
                    let targetMapCode = taskVO.TargetMapCode2;
                    if (!Task.jugeTaskTargetComplete(taskVO, 1, taskData.DoingTaskVal1)) { // 第一个任务目标还没有完成,需要先完成第一个目标
                        targetIndex = 1;
                        targetPos = taskVO.TargetPos1;
                        targetMapCode = taskVO.TargetMapCode1;
                    }
                    const taskTargetInfo = TaskBoxMini.getTaskTargetId(taskVO, targetIndex, true);
                    // to do ... 跨服?
                    // if (50 == mapCode && Global.GetMapSceneUIClass() != SceneUIClasses.KuaFuMap) {
                    //    PlayZone.GlobalPlayZone.OpenKuafuMapView(targetType, -1, npcID, mapCode, posX, posY);
                    //    return;
                    // }
                    // if (60 == mapCode && Global.GetMapSceneUIClass() != SceneUIClasses.HuanShuYuan) {
                    //    PlayZone.GlobalPlayZone.OpenKuafuMapView(targetType, -1, npcID, mapCode, posX, posY);
                    //    return;
                    // }
                    mapCode = taskTargetInfo.mapCode;
                    npcType = taskTargetInfo.npcType;
                    npcID = taskTargetInfo.npcID;
                    if (!dontEnterFuBen && taskTargetInfo.isFuBen === 1) {
                        Net.sendEnterTaskFuBen(taskID); // 通知服务器进入副本
                        return;
                    }
                    // 任务目标及目标点? 注: 原来的代码没看懂.
                    if (-1 === mapCode) {
                        if (targetMapCode >= 0) {
                            if (!Global.String.IsNullOrEmpty(targetPos)) {
                                const pts = Global.String2IntArray(targetPos, ",");
                                if (pts && pts.length === 2) {
                                    toMapPos = new Laya.Point(pts[0], pts[1]);
                                    mapCode = targetMapCode;
                                    npcType = -1;
                                }
                            }
                        }
                    }
                }
                else {
                    complete = true;
                    const destNpcInfo = { mapCode: 0, npcType: 0, npcID: 0 };
                    TaskBoxMini.getTaskDestNpcid(taskVO, destNpcInfo);
                    mapCode = destNpcInfo.mapCode;
                    npcType = destNpcInfo.npcType;
                    npcID = destNpcInfo.npcID;
                }
                if (-1 === mapCode) {
                    return; // 没有目标关卡Id
                }
                const ver = ++this.autoTaskFindRoadVer; // 检测此版本号,用来识别之前的执行是否还有效
                let pt = null;
                if (npcType === EActorType.Monster) {
                    pt = yield Global.GetMonsterPointByID(mapCode, npcID);
                }
                else if (npcType === EActorType.NPC) {
                    pt = yield Global.getNPCPointByID(mapCode, npcID);
                }
                else {
                    pt = toMapPos;
                }
                if (ver !== this.autoTaskFindRoadVer) { // 版本号已经无效了,不需要再继续执行,因为新的执行已经开始了
                    return;
                }
                if (pt.x === -1 || pt.y === -1) {
                    uiMgr.hintText(ConfigLoca.UI_TASK_Failed_InvalidPath);
                    return;
                }
                // 开始寻路
                if (npcType === EActorType.Monster) {
                    TaskBoxMini.autoFindRoad(mapCode, pt, 0, ExtActionTypes.EXTACTION_KILLMONSTER, npcID);
                    if (0 < buttonID && !complete && autoTransport) {
                        if (Task.canTransport(mapCode)) {
                            Net.sendGoToMap(mapCode);
                        }
                    }
                }
                else if (npcType === EActorType.NPC) {
                    TaskBoxMini.autoFindRoad(mapCode, pt, SystemConfig.autoFindRoadOffset100, ExtActionTypes.EXTACTION_NPCDLG, npcID);
                    if (0 < buttonID && !complete && autoTransport && Task.canTransport(mapCode, true, false)) {
                        Net.sendTaskTransport2(taskID);
                    }
                }
                else {
                    TaskBoxMini.autoFindRoad(mapCode, pt, 0, ExtActionTypes.EXTACTION_NONE);
                    if (0 < buttonID && !complete && autoTransport && Task.canTransport(mapCode, true)) {
                        Net.sendTaskTransport2(taskID);
                    }
                }
            });
        }
    }
    TaskBoxMini.autoTaskFindRoadVer = 0; // 用来支持 prccessAutoTaskFindRoad() 函数的重入
    LogicTask.TaskBoxMini = TaskBoxMini;
})(LogicTask || (LogicTask = {}));
//# sourceMappingURL=TaskBoxMini.js.map