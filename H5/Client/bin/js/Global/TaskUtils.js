var Task;
(function (Task) {
    /**
     * 任务的完成状态
     */
    let ETaskCompleteState;
    (function (ETaskCompleteState) {
        ETaskCompleteState[ETaskCompleteState["ZuanshiNotEnough"] = -1004] = "ZuanshiNotEnough";
        ETaskCompleteState[ETaskCompleteState["JinbiNotEnough"] = -1002] = "JinbiNotEnough";
        ETaskCompleteState[ETaskCompleteState["NotInRiding"] = -300] = "NotInRiding";
        ETaskCompleteState[ETaskCompleteState["BagFull"] = -2] = "BagFull";
    })(ETaskCompleteState = Task.ETaskCompleteState || (Task.ETaskCompleteState = {}));
    /**
     * 与指定的Npc对话
     * @param mapCode 要点击的NPC所在的关卡ID
     * @param roleId 要点击的NPC的角色ID
     * @param extensionId 与点击相关的扩展数据
     */
    function talkToNpc(mapCode, roleId, extensionId) {
        // to do ... 播放与Npc对话的语音?
        // 
        Net.sendClickOnNPC(mapCode, roleId, extensionId);
    }
    Task.talkToNpc = talkToNpc;
    /**
     * 根据任务ID获取任务的数据
     * @param id 指定要获取数据的任务Id
     * @param outIndex 如果传入,则用于返回查找到的任务的索引
     */
    function getTaskDataById(id, outIndex) {
        const taskDataList = gameIns.gameState.roleData.TaskDataList;
        if (null == taskDataList)
            return null;
        for (let i = 0; i < taskDataList.length; i++) {
            if (id === taskDataList[i].DoingTaskID) {
                if (outIndex) {
                    outIndex.index = i;
                }
                return taskDataList[i];
            }
        }
        return null;
    }
    Task.getTaskDataById = getTaskDataById;
    /**
     * 由任务id返回对应当前语言的标题描述
     * @param taskId 指定要获取本地语言标题的任务
     */
    function getTaskTitleByID(taskId) {
        const title = tableMgr.tasksTable.getTaskTitle(taskId);
        return Loca.getLang(title);
    }
    Task.getTaskTitleByID = getTaskTitleByID;
    /**
     * 查找下一个可用的指定类型的任务
     * @param taskClass 指定要查找的任务类型
     * @returns {}
     */
    function FindNextTask(taskClass) {
        let taskID = 0;
        let taskVO = null;
        const roleData = gameIns.gameState.roleData;
        const tasksTable = tableMgr.tasksTable;
        if (taskClass === TaskClasses.Main) {
            taskID = roleData.CompletedMainTaskID;
            if (taskID <= 0) {
                taskID = tableMgr.sysParamsTable.getParamInt("FirstMainTaskID");
            }
            else {
                taskVO = tasksTable.getTaskVo(taskID);
                if (null == taskVO) {
                    return null;
                }
                taskID = taskVO.NextTask;
                if (taskID <= 0) {
                    return null;
                }
            }
            taskVO = tasksTable.getTaskVo(taskID);
            if (null == taskVO) {
                return null;
            }
        }
        else if (taskClass === TaskClasses.GuideTask) {
            taskID = roleData.CompletedMainTaskID;
            if (taskID <= 0) {
                return null;
            }
            else {
                taskVO = tasksTable.getTaskVo(taskID);
                if (null == taskVO) {
                    return null;
                }
                taskID = taskVO.NextGuideTask;
                if (taskID <= 0) {
                    return null;
                }
            }
            taskVO = tasksTable.getTaskVo(taskID);
            if (null == taskVO) {
                return null;
            }
        }
        else {
            taskVO = tasksTable.getTaskByClass(taskClass);
            if (null == taskVO || taskVO.ID <= 0) {
                return null;
            }
            taskID = taskVO.ID;
        }
        return taskVO;
    }
    Task.FindNextTask = FindNextTask;
    /**
     * 返回给定的任务类型是否忽略第二个任务目标
     * @param taskType
     */
    function isIgnoreJudgeSecondTargetType(taskType) {
        let isIgnore = false;
        switch (taskType) {
            case TaskTypes.JoinFamily:
            case TaskTypes.AddFriend:
            case TaskTypes.CompleteOnceDailyTask: // 日常任务
            case TaskTypes.JoinJingjichang: // 参加竞技场
            case TaskTypes.WinJingjichang: // 竞技场中胜利
            case TaskTypes.GetEquipFromChouJiang: // 通关抽奖获得装备
            case TaskTypes.JoinBuluoyingdi: // 参加部落营地
            case TaskTypes.JoinLuohanxingzhen: // 参加罗汉星阵
            case TaskTypes.MergeHighlevelLingdan: // 合成高级灵丹
            case TaskTypes.XingyaoGuhuangShengjie: // 星耀孤皇升阶
            case TaskTypes.JoinDouJiZhiWang: // 参加斗鸡之王
            case TaskTypes.SuoMoTa: // 打万魔塔到指定层数
                isIgnore = true;
                break;
            default:
                isIgnore = false;
                break;
        }
        return isIgnore;
    }
    /**
     * 判断任务目标是否已经完成(忽略TargetNpc)
     */
    function JudgeGuideTaskTargetComplete(taskVO, num, taskVal) {
        let targetNum = 0;
        if (num === 1) {
            targetNum = taskVO.TargetNum1;
        }
        else if (num === 2) {
            return true;
        }
        if (targetNum <= 0) {
            targetNum = 1;
        }
        return (taskVal >= targetNum);
    }
    /**
        * 检测给定的任务是否已经完成了
        * @param taskVo
        * @param num
        * @param taskVal
        */
    function jugeTaskTargetComplete(taskVo, num, taskVal) {
        let targetNum = 0;
        if (num === 1) {
            if (taskVo.TargetNPC1 < 0) {
                return true;
            }
            targetNum = taskVo.TargetNum1;
        }
        else if (num === 2) {
            if (taskVo.TargetNPC2 < 0) {
                return true;
            }
            targetNum = taskVo.TargetNum2;
        }
        if (targetNum <= 0) {
            targetNum = 1;
        }
        return (taskVal >= targetNum);
    }
    Task.jugeTaskTargetComplete = jugeTaskTargetComplete;
    /**
     * 给定的任务是否已经完成了?
     * @param taskVo
     * @param taskVal1
     * @param taskVal2
     */
    function jugeTaskComplete(taskVo, taskVal1, taskVal2) {
        if (taskVo == null)
            return false;
        if (isIgnoreJudgeSecondTargetType(taskVo.TargetType1)) {
            return (JudgeGuideTaskTargetComplete(taskVo, 1, taskVal1) && JudgeGuideTaskTargetComplete(taskVo, 2, taskVal2));
        }
        else {
            return (jugeTaskTargetComplete(taskVo, 1, taskVal1) && jugeTaskTargetComplete(taskVo, 2, taskVal2));
        }
    }
    Task.jugeTaskComplete = jugeTaskComplete;
    /**
     * 获取跑环任务相关的信息
     * @param taskClass
     * @param out
     */
    function canDoPaoHuanTask(taskClass, out) {
        // to do ... 继续实现
        Global.Log.Assert(false);
        return false;
    }
    Task.canDoPaoHuanTask = canDoPaoHuanTask;
    /**
     * 获取给定任务的后续主线任务Id
     * @param taskId 要获取后续主线任务的任务Id
     */
    function getNextMainTask(taskId) {
        let taskVo = tableMgr.tasksTable.getTaskVo(taskId);
        if (null == taskVo) {
            return -1;
        }
        if (taskVo.TaskClass !== TaskClasses.Main) {
            return -1;
        }
        // 查找后续主线任务
        const rows = tableMgr.tasksTable.allRowsRef();
        if (rows instanceof Map) {
            for (const rowData of rows) {
                taskVo = rowData[1];
                if (taskVo.TaskClass !== TaskClasses.Main)
                    continue;
                if (taskVo.PrevTask === taskId) {
                    return taskVo.ID;
                }
            }
        }
        return -1;
    }
    Task.getNextMainTask = getNextMainTask;
    /**
     * 自动接受指定的任务Id
     * @param taskId 指定要接受的任务
     */
    function autoAcceptTask(taskId) {
        const taskVo = tableMgr.tasksTable.getTaskVo(taskId);
        const toNpcId = taskVo.SourceNPC;
        if (toNpcId <= 0) {
            return;
        }
        const npcRoleId = SpriteBaseIds.calcNpcRoleId(toNpcId);
        Net.sendNewTask(npcRoleId, taskId);
    }
    Task.autoAcceptTask = autoAcceptTask;
    /**
     * 获得任务文本信息
     * @param taskId
     * @param talkName
     * @returns {}
     */
    function getTaskTalkTextInfo(taskId, talkName) {
        let talkTextNode = new Array();
        const taskVo = tableMgr.tasksTable.getTaskVo(taskId);
        if (taskVo == null) {
            return talkTextNode;
        }
        let talktext = "";
        if (talkName === "AcceptTalk") {
            talktext = taskVo.AcceptTalk;
        }
        else if (talkName === "CompleteTalk") {
            talktext = taskVo.CompleteTalk;
        }
        else if (talkName === "DoingTalk") {
            talktext = taskVo.DoingTalk;
        }
        if (talktext === "") {
            return null;
        }
        talkTextNode = parseTalkTextInfo(talktext);
        return talkTextNode;
    }
    Task.getTaskTalkTextInfo = getTaskTalkTextInfo;
    function parseTalkTextInfo(talkText) {
        const list = new Array();
        if (Global.String.IsNullOrEmpty(talkText)) {
            return list;
        }
        let charIndex = 0;
        let inc = false;
        let lastCharIndex = 0;
        let node = null;
        while (charIndex < talkText.length) {
            if ("," === talkText[charIndex]) {
                if (!inc) {
                    if (charIndex > lastCharIndex) {
                        const node = new TalkTextNode();
                        node.npcId = parseInt(talkText.substring(lastCharIndex, charIndex));
                        lastCharIndex = charIndex + 1;
                    }
                }
            }
            else if ("[" === talkText[charIndex]) {
                if (null == node) {
                    node = new TalkTextNode();
                    node.npcId = Number.parseInt(talkText.substring(lastCharIndex, charIndex));
                }
                inc = true;
                lastCharIndex = charIndex + 1;
            }
            else if ("]" === talkText[charIndex]) {
                inc = false;
                if (charIndex > lastCharIndex && null != node) {
                    node.talkText = talkText.substring(lastCharIndex, charIndex);
                    list.push(node);
                    node = null;
                    lastCharIndex = charIndex + 1;
                }
            }
            charIndex++;
        }
        return list;
    }
    Task.parseTalkTextInfo = parseTalkTextInfo;
    /**
     * 获得talk npc 名字
     * @param talkList
     * @returns {}
     */
    function formatTaskTalkNpcName(talkList) {
        let str = "";
        for (let i = 0; i < talkList.length; i++) {
            const npcId = talkList[i].npcId;
            const name = npcId <= 0 ? Global.formatRoleNameZoneid(Global.Data.roleData.ZoneID, Global.Data.roleData.RoleName) : TableUtils.getNPCNameByID(npcId);
            const colorStr = npcId <= 0 ? MyUI.ColorCode.value : MyUI.ColorCode.value;
            str += MyUI.ColorCode.encodingText(name, colorStr);
        }
        return str + ":";
    }
    Task.formatTaskTalkNpcName = formatTaskTalkNpcName;
    /**
     * 获得任务talktext
     * @param talkList
     * @returns {}
     */
    function formatTaskTalkText(talkList) {
        let str = "";
        for (const talk of talkList) {
            const colorStr = talk.npcId <= 0 ? MyUI.ColorCode.value : MyUI.ColorCode.value;
            if (str.length > 0) {
                str += "<br><br>";
            }
            str += Loca.getLang(talk.talkText);
        }
        return str;
    }
    Task.formatTaskTalkText = formatTaskTalkText;
    /**
     * 获得当前任务类型
     * @param taskVo
     * @param num
     * @returns {}
     */
    function getTaskTargetType(taskVo, num) {
        return num === 1 ? taskVo.TargetType1 : taskVo.TargetType2;
    }
    Task.getTaskTargetType = getTaskTargetType;
    /**
     * 获取任务付传送点
     * @param taskId
     * @returns {}
     */
    function getTaskTeleportsById(taskId) {
        const taskVo = tableMgr.tasksTable.getTaskVo(taskId);
        if (null == taskVo) {
            return 0;
        }
        return taskVo.Teleports;
    }
    Task.getTaskTeleportsById = getTaskTeleportsById;
    /**
     * 任务node类
     */
    class TalkTextNode {
        constructor() {
            this.npcId = -1;
            this.talkText = "";
        }
    }
    Task.TalkTextNode = TalkTextNode;
    /**获取任务title */
    function getTaskTitleById(id) {
        const taskVo = tableMgr.tasksTable.getTaskVo(id);
        if (taskVo == null) {
            return null;
        }
        // 这个地方的返回需要本地化todo....
        return taskVo.Title;
    }
    Task.getTaskTitleById = getTaskTitleById;
    /**
     * 检测是否可以传送到指定的关卡
     * @param mapCode 要传送到的关卡Id
     * @param allowThisMap 是否允许本关卡传送
     * @param forceTransGoods
     */
    function canTransport(mapCode, allowThisMap = false, forceTransGoods = true) {
        const roleData = gameIns.gameState.roleData;
        if (!allowThisMap && roleData.MapCode === mapCode) {
            uiMgr.hintText(ConfigLoca.Transport_Failed_SameMap);
            return false;
        }
        // to do... 继续实现其它传送检测
        return false;
    }
    Task.canTransport = canTransport;
    // 返回获得的物品奖励
    function parseAwardsItemList(awardsItemDataList) {
        const GoodList = new Array();
        if (null == awardsItemDataList) {
            return null;
        }
        for (let i = 0; i < awardsItemDataList.length; i++) {
            const canAdd = true;
            const awardData = awardsItemDataList[i];
            const goodData = this.ParseAwardsItem(awardData, true, true);
            if (goodData != null)
                GoodList.push(goodData);
        }
        return GoodList;
    }
    Task.parseAwardsItemList = parseAwardsItemList;
    function ParseAwardsItem(awardsItemData, occupation, sex) {
        // let GoodList:Array<NetMsg.GoodsData> = new Array<NetMsg.GoodsData>();
        let canAdd = true;
        const Id = awardsItemData.GoodsID;
        const goodVo = tableMgr.goodsTable.Find(Id);
        let goodData = null;
        if (null != goodVo) {
            if (0 === ((1 << Global.CalcOriginalOccupationID(Global.Data.roleData.Occupation)) & goodVo.ToOccupation)) {
                canAdd = false;
                return;
            }
            if (sex && goodVo.ToSex >= 0) {
                if (Global.Data.roleData.RoleSex !== goodVo.ToSex) {
                    canAdd = false;
                    return;
                }
            }
        }
        if (true === canAdd) {
            goodData = Global.GetDummyGoodsDataEx(Id, awardsItemData.Level, awardsItemData.Quality, awardsItemData.Binding, awardsItemData.GoodsNum, awardsItemData.BornIndex);
        }
        return goodData;
    }
    Task.ParseAwardsItem = ParseAwardsItem;
})(Task || (Task = {}));
//# sourceMappingURL=TaskUtils.js.map