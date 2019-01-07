namespace Task {

    /**
     * 任务的完成状态
     */
    export enum ETaskCompleteState {
        ZuanshiNotEnough = -1004,   // 钻石不够
        JinbiNotEnough = -1002,     // 金币不够
        NotInRiding = -300,         // 不是骑乘状态
        BagFull = -2,               // 背包满了
    }

    /**
     * 与指定的Npc对话
     * @param mapCode 要点击的NPC所在的关卡ID
     * @param roleId 要点击的NPC的角色ID
     * @param extensionId 与点击相关的扩展数据
     */
    export function talkToNpc(mapCode: number, roleId: number, extensionId: number): void {
        // to do ... 播放与Npc对话的语音?
        // 

        Net.sendClickOnNPC(mapCode, roleId, extensionId);
    }
    /**
	 * 根据任务ID获取任务的数据
	 * @param id 指定要获取数据的任务Id
     * @param outIndex 如果传入,则用于返回查找到的任务的索引
	 */
    export function getTaskDataById(id: number, outIndex?: { index: number }): NetMsg.ITaskData {
        const taskDataList = gameIns.gameState.roleData.TaskDataList;
        if (null == taskDataList)
            return null;

        for (let i: number = 0; i < taskDataList.length; i++) {
            if (id === taskDataList[i].DoingTaskID) {
                if (outIndex) {
                    outIndex.index = i;
                }
                return taskDataList[i];
            }
        }

        return null;
    }

    /**
     * 由任务id返回对应当前语言的标题描述
     * @param taskId 指定要获取本地语言标题的任务
     */
    export function getTaskTitleByID(taskId: number) {
        const title = tableMgr.tasksTable.getTaskTitle(taskId);
        return Loca.getLang(title);
    }

    /**
     * 查找下一个可用的指定类型的任务
     * @param taskClass 指定要查找的任务类型
     * @returns {} 
     */
    export function FindNextTask(taskClass: TaskClasses): tables.TaskVo {
        let taskID: number = 0;
        let taskVO: tables.TaskVo = null;

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

    /**
     * 返回给定的任务类型是否忽略第二个任务目标
     * @param taskType
     */
    function isIgnoreJudgeSecondTargetType(taskType: TaskTypes): boolean {
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
    function JudgeGuideTaskTargetComplete(taskVO: tables.TaskVo, num: number, taskVal: number): boolean {
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
    export function jugeTaskTargetComplete(taskVo: tables.TaskVo, num: number, taskVal: number): boolean {
        let targetNum: number = 0;
        if (num === 1) {
            if (taskVo.TargetNPC1 < 0) {
                return true;
            }
            targetNum = taskVo.TargetNum1;
        } else if (num === 2) {
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

    /**
     * 给定的任务是否已经完成了?
     * @param taskVo
     * @param taskVal1
     * @param taskVal2
     */
    export function jugeTaskComplete(taskVo: tables.TaskVo, taskVal1: number, taskVal2: number): boolean {
        if (taskVo == null)
            return false;

        if (isIgnoreJudgeSecondTargetType(taskVo.TargetType1)) {
            return (JudgeGuideTaskTargetComplete(taskVo, 1, taskVal1) && JudgeGuideTaskTargetComplete(taskVo, 2, taskVal2));
        }
        else {
            return (jugeTaskTargetComplete(taskVo, 1, taskVal1) && jugeTaskTargetComplete(taskVo, 2, taskVal2));
        }
    }

    /**
     * 获取跑环任务相关的信息
     * @param taskClass
     * @param out
     */
    export function canDoPaoHuanTask(taskClass: TaskClasses, out: { recNum: number, dailyTaskMaxNum: number }): boolean {

        // to do ... 继续实现
        Global.Log.Assert(false);
        return false;
    }

    /**
     * 获取给定任务的后续主线任务Id
     * @param taskId 要获取后续主线任务的任务Id
     */
    export function getNextMainTask(taskId: number): number {
        let taskVo = tableMgr.tasksTable.getTaskVo(taskId);
        if (null === taskVo) {
            return -1;
        }

        if (TableUtils.getFieldNumber(taskVo.TaskClass) !== TaskClasses.Main) {
            return -1;
        }

        // 查找后续主线任务
        const rows = tableMgr.tasksTable.allRowsRef();
        if (rows instanceof Map) {
            for (const rowData of rows) {
                taskVo = rowData[1];
                if (TableUtils.getFieldNumber(taskVo.TaskClass) !== TaskClasses.Main)
                    continue;

                if (taskVo.PrevTask === taskId) {
                    return taskVo.ID;
                }
            }
        }

        return -1;
    }

    /**
     * 自动接受指定的任务Id
     * @param taskId 指定要接受的任务
     */
    export function autoAcceptTask(taskId: number): void {
        const taskVo = tableMgr.tasksTable.getTaskVo(taskId);

        const toNpcId = taskVo.SourceNPC;
        if (toNpcId <= 0) {
            return;
        }

        const npcRoleId = SpriteBaseIds.calcNpcRoleId(toNpcId);
        Net.sendNewTask(npcRoleId, taskId);
    }
	/**
	 * 获得任务文本信息
	 * @param taskId 
	 * @param talkName 
	 * @returns {} 
	 */
    export function getTaskTalkTextInfo(taskId: number, talkName: string): TalkTextNode[] {

        let talkTextNode = new Array<TalkTextNode>();
        const taskVo = tableMgr.tasksTable.getTaskVo(taskId);
        if (taskVo == null) {
            return talkTextNode;
        }

        let talktext = "";
        if (talkName === "AcceptTalk") {
            talktext = taskVo.AcceptTalk;
        } else if (talkName === "CompleteTalk") {
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

    export function parseTalkTextInfo(talkText: string) {
        const list: TalkTextNode[] = new Array<TalkTextNode>();
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

	/**
	 * 获得talk npc 名字
	 * @param talkList 
	 * @returns {} 
	 */
    export function formatTaskTalkNpcName(talkList: TalkTextNode[]): string {
        let str = "";
        for (let i = 0; i < talkList.length; i++) {
            const npcId = talkList[i].npcId;
            const name = npcId <= 0 ? Global.formatRoleNameZoneid(Global.Data.roleData.ZoneID, Global.Data.roleData.RoleName) : TableUtils.getNPCNameByID(npcId);
            const colorStr = npcId <= 0 ? MyUI.ColorCode.value : MyUI.ColorCode.value;
            str += MyUI.ColorCode.encodingText(name, colorStr);
        }
        return str + ":";
    }

	/**
	 * 获得任务talktext
	 * @param talkList 
	 * @returns {} 
	 */
    export function formatTaskTalkText(talkList: TalkTextNode[]): string {
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

	/**
	 * 获得当前任务类型
	 * @param taskVo 
	 * @param num 
	 * @returns {} 
	 */
    export function getTaskTargetType(taskVo: tables.TaskVo, num: number) {
        return num === 1 ? taskVo.TargetType1 : taskVo.TargetType2;
    }

	/**
	 * 获取任务付传送点
	 * @param taskId 
	 * @returns {} 
	 */
    export function getTaskTeleportsById(taskId: number) {
        const taskVo = tableMgr.tasksTable.getTaskVo(taskId);
        if (null == taskVo) {
            return 0;
        }
        return taskVo.Teleports;
    }

	/**
	 * 任务node类
	 */
    export class TalkTextNode {
        public npcId = -1;
        public talkText = "";
    }

    /**获取任务title */
    export function getTaskTitleById(id: number): string {
        const taskVo = tableMgr.tasksTable.getTaskVo(id);
        if (taskVo == null) {
            return null;
        }

        // 这个地方的返回需要本地化todo....
        return taskVo.Title;
    }

    /**
     * 检测是否可以传送到指定的关卡
     * @param mapCode 要传送到的关卡Id 
     * @param allowThisMap 是否允许本关卡传送
     * @param forceTransGoods 
     */
    export function canTransport(mapCode: number, allowThisMap = false, forceTransGoods = true): boolean {
        const roleData = gameIns.gameState.roleData;
        if (!allowThisMap && roleData.MapCode === mapCode) {
            uiMgr.hintText(ConfigLoca.Transport_Failed_SameMap);
            return false;
        }

        // to do... 继续实现其它传送检测
        return false;
    }

    // 返回获得的物品奖励
    export function parseAwardsItemList(awardsItemDataList: NetMsg.IAwardsItemData[]): NetMsg.GoodsData[] {
        const GoodList: NetMsg.GoodsData[] = new Array<NetMsg.GoodsData>();

        if (null == awardsItemDataList) {
            return null;
        }

        for (let i = 0; i < awardsItemDataList.length; i++) {
            const canAdd = true;
            const awardData = awardsItemDataList[i] as NetMsg.IAwardsItemData;
            const goodData = this.ParseAwardsItem(awardData, true, true);
            if (goodData != null)
                GoodList.push(goodData);
        }

        return GoodList;
    }

    export function ParseAwardsItem(awardsItemData: NetMsg.IAwardsItemData, occupation: boolean, sex: boolean) {
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
            goodData = Global.GetDummyGoodsDataEx(Id, awardsItemData.Level, awardsItemData.Quality, awardsItemData.Binding, awardsItemData.GoodsNum, awardsItemData.BornIndex) as NetMsg.GoodsData;
        }
        return goodData;
    }
    /**
     * 尝试提交图腾任务
     * @param taskId 任务Id 
     */
    export function toCompTaskOfTaskId(taskId: number): boolean {
        const taskData = Task.getTaskDataById(taskId);
        const taskVO = tableMgr.tasksTable.Find(taskId);
        if (null !== taskData && null !== taskVO && taskVO.TargetNum1 <= taskData.DoingTaskVal1) {
            Net.sendCompleteTask(-1, taskId, taskData.DbID, 0);
            return true;
        }
        return false;
    }
    /**
     * 支线任务主动接取下一个任务，根据前后任务关系
     * @param taskId 任务Id
     */
    export function autoPickLineTask(taskId: number): void {
        const taskVo = getNextTaskOfTaskId(taskId);
        if (taskVo != null) {
            Net.sendNewTask(-1, taskVo.ID);
        }
    }
    /**
     * 获得下一个任务Vo
     * @param taskId 
     */
    export function getNextTaskOfTaskId(taskId: number): tables.TaskVo {
        let taskVo = tableMgr.tasksTable.Find(taskId);
        if (taskVo === null) {
            return null;
        }

        if (taskVo.NextTask == -1) {
            return null;
        }

        taskVo = tableMgr.tasksTable.Find(taskVo.NextTask);

        if (taskVo == null) {
            return null;
        }

        return taskVo;
    }
    /** 
     * 获取一个当前的图腾任务数据 
     */
    export function getCurrentTotemTaskData(): NetMsg.ITaskData {
        let taskData = null;
        if (gameIns.gameState === null || gameIns.gameState.roleData === null || gameIns.gameState.roleData.TaskDataList === null) {
            return null;
        }
        const count = gameIns.gameState.roleData.TaskDataList.length
        for (let i = 0; i < count; i++) {
            taskData = Global.Data.roleData.TaskDataList[i];
            const taskVo = tableMgr.tasksTable.getTaskVo(taskData.DoingTaskID);
            if (taskVo !== null && TableUtils.getFieldNumber(taskVo.TaskClass) == TaskClasses.TotemTask) {
                break;
            }
            taskData = null;
        }
        return taskData;
    }
}