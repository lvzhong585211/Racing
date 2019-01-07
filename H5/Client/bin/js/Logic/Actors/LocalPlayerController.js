var Logic;
(function (Logic) {
    /**
     * 自动寻路项
     */
    class RoadItem {
    }
    /** 任务自动寻路状态 */
    class AutoPathForTask extends Logic.ControllerStateBase {
        constructor() {
            super(...arguments);
            // == 初始值
            this.mMapCode = -1; // 关卡Id
            this.mAutoRoadExtActionType = ExtActionTypes.EXTACTION_NONE; // 寻路完成后需要执行的动作
            this.mTargetPos = new Laya.Point(); // 目标坐标(格子坐标系)
            this.mAutoRoadOffset = 0; // 在离目标的这个距离范围内就算寻路结束
            this.mAutoFindRoadTargetRoleId = -1; // 保存已经找到第一目标
            this.mAutoFindRoadTargetDistanceSq = Number.MAX_VALUE; // 保存到第一目标的距离的平方
        }
        /**
         * 获取自动寻路节点列表
         */
        get autoRoadItemsList() {
            return this.mAutoRoadItemsList;
        }
        /**
         * 设置目标坐标
         * @param targetPos 指定要设置的目标坐标(格子坐标系)
         * @param offset 指定寻路结束的范围(厘米). 注: 允许使用误差可能会导致与服务器间的不同步
         */
        setTargetPos(targetPos, offset) {
            this.mTargetPos.setTo(targetPos.x, targetPos.y);
            this.mAutoRoadOffset = offset;
        }
        /**
         * 当进入一个状态时调用
         * @param controller 用于传入状态所在的控制器
         * @param enterParams 传入初始信息
         */
        onEnterState(controller, enterParams) {
            this.restart(controller, enterParams);
        }
        /**
         * 重新开始寻路
         * @param controller 用于传入状态所在的控制器
         */
        restart(controller, enterParams) {
            // 设置数据
            this.mMapCode = enterParams.mapCode;
            this.mTargetPos = enterParams.targetPos;
            this.mTargetID = enterParams.extActionInfo.targetID;
            this.mAutoRoadExtActionType = enterParams.extActionInfo.actionType;
            this.setTargetPos(enterParams.targetPos, enterParams.autoRoadOffset);
            // 偿试移除掉旧的故事板,寻路信息旧了
            const player = controller.getPlayer();
            const level = player.getLevel();
            level.removeStoryBoard(player.getRoleID());
            // 查找路径信息
            this.mAutoRoadItemsList = this.findAutoRoadItems(level.levelId, this.mMapCode, this.mTargetPos);
            // 强制走一次逻辑,以便开始寻路. 注: 有些寻路可能还没开始就结束了,即满足结束条件,如距离够近
            this.slowUpdate(controller, 0.0);
        }
        /**
         * 1秒种最多执行5次的更新函数.适合不及时的逻辑,如AI决策等.
         * @param controller 用于传入状态所在的控制器
         * @param elapsedTime 上次调用以来经过的时间
         */
        slowUpdate(controller, elapsedTime) {
            // 检测寻路是否结束
            if (this.isAutoEnd(controller)) {
                return;
            }
            const player = controller.getPlayer();
            const level = player.getLevel();
            // 如果已经存在AI寻路角色,则不再重新发起寻路了
            const storyBoard = level.findStoryBoard(player.getState().RoleID);
            if (storyBoard) {
                if (storyBoard.isCompleted()) { // 寻路结束                    
                    this.processExtAction(controller);
                }
                return;
            }
            // 还没有寻路AI,发起新的寻路            
            // 查找当前关卡的寻路信息
            let roadItem = null;
            for (const _roadItem of this.mAutoRoadItemsList) {
                if (_roadItem.MapID === level.levelId) {
                    roadItem = _roadItem;
                    break;
                }
            }
            if (!roadItem) { // 找不到对应的寻路点,直接返回
                controller.SetState(Logic.EControllerStateId.Idling);
                return;
            }
            // 注: 寻路是一个关卡一个关卡寻路的
            // 本次寻路的目标点
            let p = roadItem.ToPos;
            // 到目标的误差范围. 注: 只有最终的目标点才允许使用误差范围
            const offset = (roadItem === this.mAutoRoadItemsList[this.mAutoRoadItemsList.length - 1]) ? this.mAutoRoadOffset : 0;
            if (offset <= 0) {
                // 如果不允许有误差,则校正一下目标位置,使它一定在一个合法的坐标点
                p = level.currentMapData.getAGridPointIn4DirectionWithWorldCoord(p);
            }
            if (!level.linearMoveByRunTo(player, p, offset, GActions.Run, this.mAutoRoadExtActionType)) {
                controller.SetState(Logic.EControllerStateId.Idling); // 寻路失败,切换到idling状态
            }
            else {
                // 播放跑步动作
                controller.getActionPlayer().playAction(GActions.Run);
            }
        }
        /**
         * 每帧调用，以处理逻辑
         * @param controller 用于传入状态所在的控制器
         * @param deltaTime 上次调用以来经过的时间
         */
        onTick(controller, deltaTime) {
            const playerControler = controller;
            const player = playerControler.getPlayer();
            const level = player.getLevel();
            const storyBoard = level.findStoryBoard(player.getState().RoleID);
            if (storyBoard) {
                // 从故事板中读取并更新角色的位置
                const oldCoord = playerControler.getControlPosition();
                const coord2D = storyBoard.getCoordinate();
                // 更新朝向                
                playerControler.faceToPoint(coord2D.x, coord2D.y, false);
                playerControler.setControlPosition(coord2D.x, coord2D.y);
            }
        }
        /**
         * 当退出一个状态时调用
         * @param controller 用于传入状态所在的控制器
         */
        onExitState(controller) {
            // 移除寻路故事板
            const player = controller.getPlayer();
            const level = player.getLevel();
            level.removeStoryBoard(player.getRoleID());
            this.mAutoRoadItemsList = null;
            this.mAutoRoadExtActionType = ExtActionTypes.EXTACTION_NONE;
            this.mMapCode = -1;
            this.mTargetID = null;
            // 离开寻路状态后更新下路径点显示
            MyUI.MapUI.updateMapLinePoints();
        }
        /**
         * 检测寻路是否要结束了
         * @return 如果结束了,返回true,否则返回false
         */
        isAutoEnd(controller) {
            const player = controller.getPlayer();
            const level = player.getLevel();
            if (level.levelId !== this.mMapCode) {
                return false; // 目标关卡Id不同,不需要下面的检测
            }
            if (ExtActionTypes.EXTACTION_ATTACKBOSS === this.mAutoRoadExtActionType ||
                ExtActionTypes.EXTACTION_KILLMONSTER === this.mAutoRoadExtActionType) {
                // 如果寻路的后续动作是击杀Boss或击杀怪物,则偿试查找攻击目标,如果找到,且在合理的范围内,则结束寻路
                const SeekDistance = 1500;
                let enemy = null;
                let autoFindMonsterID = this.mTargetID;
                if (ExtActionTypes.EXTACTION_ATTACKBOSS === this.mAutoRoadExtActionType) {
                    enemy = level.seekMonsterToLock(player, true, this.mTargetID, SeekDistance);
                    if (enemy == null) {
                        enemy = level.seekMonsterToLock(player, true, -1, SeekDistance);
                        autoFindMonsterID = -1;
                    }
                }
                else if (ExtActionTypes.EXTACTION_KILLMONSTER === this.mAutoRoadExtActionType) {
                    enemy = level.seekMonsterToLock(player, true, this.mTargetID, SeekDistance);
                }
                if (enemy != null) {
                    if (enemy instanceof Logic.Monster && enemy.getMonsterType() === MonsterTypes.Boss) {
                        this.processExtAction(controller); // Boss怪找到就可以开打了,不需要再进一步的检测
                        return true;
                    }
                    /* to do ... 攻击其它玩家
                    if (enemy.getType() == EActorType.NetPlayer){
                        this.processExtAction(controller); // Boss怪找到就可以开打了,不需要再进一步的检测
                        return true;
                    }
                    */
                }
                if (this.mAutoFindRoadTargetRoleId !== -1) { // 已经有目标了,检测目标是否合适作为挂机的目标
                    do {
                        if (enemy != null) { // 进一步检查怪的距离,是否合适.
                            const localCoord = player.getCoordinate();
                            const enemyCoord = enemy.getCoordinate();
                            const curDistSq = (localCoord.x - enemyCoord.x) * (localCoord.x - enemyCoord.x) + (localCoord.y - enemyCoord.y) * (localCoord.y - enemyCoord.y);
                            const targetObj = level.findCharacter(this.mAutoFindRoadTargetRoleId);
                            if (targetObj == null || curDistSq < this.mAutoFindRoadTargetDistanceSq) { // 找到新的目标怪
                                this.mAutoFindRoadTargetDistanceSq = curDistSq;
                                this.mAutoFindRoadTargetRoleId = enemy.getRoleID();
                                enemy = null;
                                break;
                            }
                        }
                        // 使用当前目标作为挂机目标.
                        enemy = level.findCharacter(this.mAutoFindRoadTargetRoleId);
                        this.mAutoFindRoadTargetRoleId = -1;
                        this.mAutoFindRoadTargetDistanceSq = Number.MAX_VALUE;
                    } while (false);
                }
                else { // 没有目标,偿试设置当前找到的怪物为挂机目标
                    if (enemy != null) {
                        // 找到新的目标怪
                        const localCoord = player.getCoordinate();
                        const enemyCoord = enemy.getCoordinate();
                        const curDistSq = (localCoord.x - enemyCoord.x) * (localCoord.x - enemyCoord.x) + (localCoord.y - enemyCoord.y) * (localCoord.y - enemyCoord.y);
                        this.mAutoFindRoadTargetDistanceSq = curDistSq;
                        this.mAutoFindRoadTargetRoleId = enemy.getRoleID();
                        enemy = null;
                    }
                }
                if (enemy != null) { // 找到攻击目标,停止寻路
                    this.processExtAction(controller);
                    return true;
                }
                return false;
            }
            if (this.mAutoRoadOffset && level.levelId === this.mMapCode) {
                // 如果已经是目标关卡,则检测是否走到了目标点允许的误差范围内                
                if (Global.inCircle(player.getCoordinate(), this.mTargetPos, this.mAutoRoadOffset)) {
                    this.processExtAction(controller);
                    return true;
                }
            }
            return false;
        }
        /**
         * 查找到目标关卡的跨地图寻路信息
         * @param curMapCode 当前所在的关卡Id
         * @param toMapCode 指定要寻路到的关卡Id
         * @param pos 指定起始位置
         */
        findAutoRoadItems(curMapCode, toMapCode, pos) {
            const roadItemsList = new Array();
            // 如果就在当前关卡,则直接添加目标点,返回
            if (toMapCode === curMapCode) {
                const roadItem = {
                    MapID: toMapCode,
                    ToPos: pos,
                    TeleportKey: -1
                };
                roadItemsList.push(roadItem);
                return roadItemsList;
            }
            // 不在当前关卡,需要查找关卡传送点
            this.findRoadItems(curMapCode, toMapCode, pos, roadItemsList);
            return roadItemsList;
        }
        /**
         * 递归查找由当前关卡到目标关卡的传送点列表
         * @param currentMapCode 当前关卡的Id
         * @param toMapCode 目标关卡的Id
         * @param pos 目标位置
         * @param roadItemsList 用于返回查找到的关卡寻路信息
         */
        findRoadItems(currentMapCode, toMapCode, pos, roadItemsList, mapDict) {
            const mapTeleports = TableUtils.getMapTeleports(currentMapCode);
            if (!mapTeleports || !mapTeleports.TeleportsList)
                return false;
            // 查找到目标关卡的传送点
            for (let i = 0; i < mapTeleports.TeleportsList.length; i++) {
                const teleports = mapTeleports.TeleportsList[i];
                if (toMapCode === teleports.ToMapID) {
                    let roadItem = {
                        MapID: currentMapCode,
                        ToPos: new Laya.Point(teleports.TeleportPos.X, teleports.TeleportPos.Y),
                        TeleportKey: teleports.TeleportKey,
                    };
                    roadItemsList.push(roadItem);
                    roadItem = {
                        MapID: toMapCode,
                        ToPos: pos,
                        TeleportKey: -1
                    };
                    roadItemsList.push(roadItem);
                    return true;
                }
            }
            if (!mapDict) {
                mapDict = new Map([[currentMapCode, true]]); // 默认添加起始的查找关卡到词典中,以便无限递归
            }
            // 如果没有找到
            for (let i = 0; i < mapTeleports.TeleportsList.length; i++) {
                const teleport = mapTeleports.TeleportsList[i];
                if (mapDict.has(teleport.ToMapID)) {
                    continue;
                }
                mapDict.set(teleport.ToMapID, true);
                const roadItem = {
                    MapID: currentMapCode,
                    ToPos: new Laya.Point(teleport.TeleportPos.X, teleport.TeleportPos.Y),
                    TeleportKey: teleport.TeleportKey
                };
                roadItemsList.push(roadItem);
                if (this.findRoadItems(teleport.ToMapID, toMapCode, pos, roadItemsList, mapDict)) {
                    return true;
                }
                roadItemsList.pop();
            }
            return false;
        }
        /**
         * 移动完毕后的扩展行为处理
         * @param controller 控制器
         */
        processExtAction(controller) {
            const extAction = this.mAutoRoadExtActionType;
            switch (extAction) {
                case ExtActionTypes.EXTACTION_NPCDLG:
                    {
                        // 给服务器发送与NPC对话的消息
                        const npcRoleID = SpriteBaseIds.calcNpcRoleId(this.mTargetID);
                        Task.talkToNpc(this.mMapCode, npcRoleID, this.mTargetID);
                        break;
                    }
                case ExtActionTypes.EXTACTION_KILLMONSTER:
                case ExtActionTypes.EXTACTION_ATTACKBOSS:
                    { // 请求挂机杀怪
                        const playerController = controller;
                        // 设置自动战斗的目标怪物的数据表Id
                        playerController.setAutoFightingTargetMonsterId(this.mTargetID, extAction === ExtActionTypes.EXTACTION_ATTACKBOSS ? AutoFightTypes.AUTOFIGHT_ATTACKBOSS : AutoFightTypes.AUTOFIGHT_NONE);
                        // 向服务器请求自动挂机行为
                        Net.sendAutoFight(AutoFightCmds.Start, Global.Data.AutoFightData.getAutoGetThingsFlag());
                        break;
                    }
                default:
            }
            controller.SetState(Logic.EControllerStateId.Idling);
        }
    }
    Logic.AutoPathForTask = AutoPathForTask;
    // 自动挂机类型 目前分为普通和BOSS   (BOSS一般为剧情副本时用）
    let AutoFightTypes;
    (function (AutoFightTypes) {
        AutoFightTypes[AutoFightTypes["AUTOFIGHT_NONE"] = 0] = "AUTOFIGHT_NONE";
        AutoFightTypes[AutoFightTypes["AUTOFIGHT_ATTACKBOSS"] = 1] = "AUTOFIGHT_ATTACKBOSS";
    })(AutoFightTypes || (AutoFightTypes = {}));
    /** 定义自动挂机的阶段 */
    let AutoFightSteps;
    (function (AutoFightSteps) {
        AutoFightSteps[AutoFightSteps["Invalid"] = 0] = "Invalid";
        AutoFightSteps[AutoFightSteps["MoveToTarget"] = 1] = "MoveToTarget";
        AutoFightSteps[AutoFightSteps["MoveAndKill"] = 2] = "MoveAndKill";
        AutoFightSteps[AutoFightSteps["Killing"] = 3] = "Killing"; // 击杀
    })(AutoFightSteps || (AutoFightSteps = {}));
    class AutoFightingRuntimeData {
        constructor() {
            this.mFightPoint = new Laya.Point(); // 开始挂机时的起始坐标
            this.mBossCoord = undefined; // 缓冲的Boss的坐标
            this.mStep = AutoFightSteps.Invalid; // 自动挂机处于的阶段
        }
        reset() {
            this.mBossCoord = undefined;
            this.mStep = AutoFightSteps.Invalid;
        }
    }
    /**
     * 支持自动挂机的玩家控制器
     */
    class ALocalPlayerController extends Logic.APlayerController {
        constructor() {
            super();
            this.mAutoFighting = false; // 是否在自动挂机
            this.mAutoFightingTargetMonsterId = -1; // 自动挂机的目标怪物的数据表Id
            this.mAutoFightType = AutoFightTypes.AUTOFIGHT_NONE; // 自动挂机的类型
            this.mFocusedRoleId = -1; // 当前的焦点(选择)目标的角色Id        
            this.mAIBehavior = null; // AI行为函数,控制如挂机,纯输入等操作
            // 自动挂机逻辑的协程
            this.mAutoFightingCoroutine = new Base.CoroutineWrapper(this.autoFightingBehaviorLoop.bind(this)); // 注意在回调函数中绑定本实例,否则协程函数中的this不正确!
            this.mAFRuntimeData = new AutoFightingRuntimeData(); // 缓冲一次挂机行为中的运行时数据
            this.mInAutoFightingStack = false; // 指定是否在自动挂机的执行栈上,这时,变更角色状态并不会取消自动挂机
            // 初始化控制器的状态
            const states = this.m_states;
            states[Logic.EControllerStateId.Dead] = new Logic.PlayerFsmState.LocalPlayerDeath();
            states[Logic.EControllerStateId.AutoPathForTask] = new AutoPathForTask();
            states[Logic.EControllerStateId.SkillAttacking] = new Logic.PlayerFsmState.LocalPlayerSkillState();
            // 默认的行为只是简单的处理玩家的输入操作
            this.mAIBehavior = this.aiRawInput.bind(this);
        }
        /**
         * @desc    每帧被调用
         * @param   elapsedTime 上次调用以来经过的时间(秒)
         */
        frameMove(elapsedTime) {
            super.frameMove(elapsedTime);
            this.mAIBehavior(elapsedTime);
        }
        SetState(newStateId, enterParams, forceReEnter = false) {
            super.SetState(newStateId, enterParams, forceReEnter);
            // 如果不在自动挂机的执行栈上,则取消自动挂机
            if (!this.mInAutoFightingStack && newStateId !== Logic.EControllerStateId.Idling) {
                this.cancelAutoFight();
            }
        }
        /**
         * 自动寻路到目标点
         * @param mapCode 目标点所在的关卡Id
         * @param pos 目标点坐标,内部会引用,所以外面不可以再修改此变量
         * @param offset 指定离目标点多远可以停止或执行后续动作. 注: 使用误差可能会导致与服务器间位置的不同步,因为客户端会提前中止寻路
         * @param extActionType 指定到达目标点后执行的动作
         * 注: 这个函数会取消自动挂机行为!因为开始寻路逻辑了
         */
        autoFindRoad(mapCode, pos, offset, extActionInfo = { actionType: ExtActionTypes.EXTACTION_NONE }) {
            // 是否可移动的状态的检测
            if (!this.isLeaderCanMove())
                return;
            const level = this.getPlayer().getLevel();
            if (mapCode === level.levelId) {
                // 判断如果当前格子能呆，就用原位置，不然用格子间隔转换一下之后相差太大
                pos = level.currentMapData.getAGridPointIn4DirectionWithWorldCoord(pos);
            }
            // 设置寻路状态需要的数据
            const info = {
                mapCode: mapCode,
                targetPos: pos,
                autoRoadOffset: offset,
                extActionInfo: extActionInfo
            };
            if (this.GetState() === Logic.EControllerStateId.AutoPathForTask) {
                const autoPathForTask = this.GetStateById(Logic.EControllerStateId.AutoPathForTask);
                autoPathForTask.restart(this, info);
            }
            else {
                // 切换到自动寻路状态
                this.SetState(Logic.EControllerStateId.AutoPathForTask, info);
            }
        }
        /** 专门给挂机状态使用的寻路函数 */
        AF_AutoFindRoad(mapCode, pos, offset) {
            this.mInAutoFightingStack = true;
            this.autoFindRoad(mapCode, pos, offset);
            this.mInAutoFightingStack = false;
        }
        /**
         * 偿试释放指定的技能.如果没有指定目标,则会自动查找一个可攻击的目标,如果找不到,则原地向当前面朝方向释放技能
         * 注:这主要由界面来调用,但由于玩家处于某些行为中(如已经在释放某个技能了),会忽略此次调用!
         * 注:如果成功释放了技能,会向服务器发送释放技能的消息,并播放对应的技能动作.
         * 注:这个函数也处理普攻的逻辑
         * @param skillId 指定要释放的技能
         * @param target 如果指定了,则攻击此目标
         * @param firedCallback 如果给定了,在释放成功时,会调用此函数
         */
        trySkillAttack(skillId, target, firedCallback) {
            // 玩家主动释放技能,如果正在挂机,则会导致挂机暂停,技能释放结束后再恢复
            let callback = firedCallback;
            if (this.mAutoFighting) {
                this.pauseAutoFighting(); // 暂停挂机
                callback = () => {
                    this.resumeAutoFighting(); // 恢复挂机
                    if (firedCallback) {
                        firedCallback();
                    }
                };
            }
            return this._skillAttack(skillId, target, callback);
        }
        /**
         * 内部用的技能释放函数
         */
        _skillAttack(skillId, target, firedCallback) {
            // 设置技能释放状态的数据
            const skillState = this.GetStateById(Logic.EControllerStateId.SkillAttacking);
            skillState.setToFireSkill(skillId, target, firedCallback);
            // 偿试切换到技能释放状态
            this.SetState(Logic.EControllerStateId.SkillAttacking);
        }
        /**
         * 开始自动战斗挂机，如果通过检查会向服务器发送开始挂机请求
         * @param eCmdType 挂机命令
         * @param bHint 是否提示
         */
        startAutoFight(eCmdType = AutoFightCmds.Start, bHint = true) {
            if (this.mAutoFighting) {
                return false;
            }
            if (this.getPlayer().isDead()) {
                return false;
            }
            if (Global.IsDongJieSprite(this.getPlayer())) {
                return false;
            }
            const currentLevel = this.getPlayer().getLevel();
            const coordinate = this.getPlayer().getCoordinate();
            if (currentLevel && currentLevel.currentMapData.inSafeRegion(coordinate.x, coordinate.y)) {
                if (bHint) {
                    uiMgr.hintText("2276"); // 安全区不能使用挂机功能！
                }
                return false;
            }
            const getThingFlag = Global.Data.AutoFightData.getAutoGetThingsFlag();
            Net.sendAutoFight(eCmdType, getThingFlag);
            return true;
        }
        /**
         * 取消自动战斗挂机，如果通过检查会向服务器发送取消挂机请求
         * @param eCmdType 挂机命令
         * @param nEndFlag 结束参数
         */
        cancelAutoFight(eCmdType = AutoFightCmds.End, nEndType = 0) {
            if (!this.mAutoFighting) {
                return false;
            }
            Net.sendAutoFight(eCmdType, nEndType);
            return true;
        }
        /**
         * 服务器通知开始挂机行为
         * @param targetMonsterId 如果有效,则指定挂机时要优先击杀的怪物的数据表Id
         * 注:　这个函数表示真正的开始挂机了，即服务器已经同意了．这个函数不应该再向服务器发送任何消息
         */
        serverStartAutoFight(targetMonsterId) {
            // 不管是不是已经开始了挂机行为,总是会更新当前的挂机目标Id
            if (targetMonsterId !== undefined) {
                this.setAutoFightingTargetMonsterId(targetMonsterId);
            }
            if (this.mAutoFighting) {
                return;
            }
            this.mAutoFighting = true;
            this.mAFRuntimeData.reset(); // 重置一下挂机的运行时数据
            // 记录一下挂机的起始坐标
            this.getControlPositionRef(this.mAFRuntimeData.mFightPoint);
            // 重置挂机逻辑的执行
            this.mAutoFightingCoroutine.reset();
            // 切换到挂机行为
            this.mAIBehavior = this.aiAutoFighting.bind(this);
            // 发送挂机状态改变的消息
            gameEventBus.autoFightEvent.event(AutoFightCmds.Start);
        }
        /**
         * 设置自动挂机时优先击杀的怪物的数据表Id.
         * @param targetMonsterId 指定自动挂机要优先击杀的怪物的数据表Id
         * 注: 比如做任务时要挂机击杀指定怪物
         */
        setAutoFightingTargetMonsterId(targetMonsterId, autoFightType) {
            this.mAutoFightingTargetMonsterId = targetMonsterId;
            autoFightType && (this.mAutoFightType = autoFightType);
        }
        /**
         * 设置自动挂机时手动选择的攻击目标的角色Id
         * @param targetRoleId 指定手动选择的挂机目标的角色Id
         */
        setFocusedRoleId(focusedRoleId) {
            if (this.mFocusedRoleId === focusedRoleId) {
                return;
            }
            this.mFocusedRoleId = focusedRoleId;
            gameEventBus.focusedActorChanged.event(focusedRoleId); // 发送焦点目标改变事件
        }
        /**
        * 暂停挂机行为
        */
        pauseAutoFighting() {
            this.mAutoFightingCoroutine.Pause(true);
        }
        /**
         * 恢复挂机行为
         */
        resumeAutoFighting() {
            if (this.mAutoFighting) { // 还处于挂机状态中,需要恢复挂机行为!
                this.mAutoFightingCoroutine.Pause(false);
            }
        }
        /**
         * 结束挂机行为
         * 注: 服务器停止了挂机行为.这个函数不应该再向服务器发送任何消息
         */
        serverEndAutoFight() {
            if (!this.mAutoFighting) {
                return;
            }
            this.mInAutoFightingStack = false;
            this.mAutoFighting = false;
            this.mAutoFightType = AutoFightTypes.AUTOFIGHT_NONE;
            this.mAutoFightingTargetMonsterId = -1; // 清除掉当前的挂机目标Id
            this.mAIBehavior = this.aiRawInput.bind(this); // 切换回接受玩家输入行为
            // 发送挂机状态改变的消息
            gameEventBus.autoFightEvent.event(AutoFightCmds.End);
        }
        /**
         * 角色是否可以移动
         */
        isLeaderCanMove() {
            // to do ... 状态的检测
            return true;
        }
        /**
         * 是否在自动战斗中
         */
        isAutoFighting() {
            return this.mAutoFighting;
        }
        /**
         * 是否在潜心修炼中
         */
        static isMingXiang() {
            if (Global.Data.MeditateState <= 0) {
                return false;
            }
            return true;
        }
        /**
         * 只是简单的处理玩家的输入操作的函数
         */
        aiRawInput() {
            if (this.GetState() !== Logic.EControllerStateId.AutoPathForTask) {
                // 测试代码
                const level = this.getPlayer().getLevel();
                if (!level) {
                    return;
                }
                let dest = null;
                if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.W)) {
                    dest = this.getControlPosition();
                    dest.y -= 400;
                }
                else if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.S)) {
                    dest = this.getControlPosition();
                    dest.y += 400;
                }
                else if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.A)) {
                    dest = this.getControlPosition();
                    dest.x += 400;
                }
                else if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.D)) {
                    dest = this.getControlPosition();
                    dest.x -= 400;
                }
                if (dest) {
                    this.autoFindRoad(level.levelId, dest, 0, { actionType: ExtActionTypes.EXTACTION_NONE });
                }
            }
        }
        /**
         * 挂机的行为
         * @param elapsedTime 上次调用以来经过的时间(秒)
         */
        aiAutoFighting(elapsedTime) {
            if (this.mAutoFightingCoroutine.tick(elapsedTime)) { // 挂机结束
                this.mAIBehavior = this.aiRawInput.bind(this); // 切换到原生输入
            }
        }
        /**
        * 自动挂机的循环逻辑
        * 通过 Generator 来实现挂机逻辑
        * 注: 此函数会被重复执行,所以一些挂机初始化的逻辑代码不可以放在本函数中,应该放到beginAutoFightingBehavior()函数中去!
        */
        *autoFightingBehaviorLoop(wrapper) {
            let targetRoleId = -1; // 缓冲当前的攻击目标的角色Id
            const attacker = this.getPlayer();
            const level = attacker.getLevel();
            const fightRadiusSq = Global.Data.AutoFightData.FightRadius * Global.Data.AutoFightData.FightRadius;
            let targetCharacter = null;
            // 一直挂机,直到玩家取消挂机行为
            while (true) {
                // === 下面是挂机的一次行为
                const preTargetRoleId = targetCharacter;
                // 1. 查找一个可以攻击的目标
                targetCharacter = yield* this.findAutoFightingTarget(targetCharacter);
                if (targetCharacter == null) {
                    continue;
                }
                // 2. 更换目标与离挂机地点太远了,自动回去
                if (preTargetRoleId !== targetCharacter) {
                    if (preTargetRoleId) { // 目标变换了,需要检测是否离挂机点太远了,需要回去                        
                        const FightPoint = this.mAFRuntimeData.mFightPoint;
                        if (attacker.get2DDistanceSq(FightPoint.x, FightPoint.y) > fightRadiusSq) {
                            this.AF_AutoFindRoad(level.levelId, FightPoint, 100);
                            while (this.GetState() !== Logic.EControllerStateId.Idling) {
                                yield;
                            }
                            targetRoleId = -1; // 清除掉目标,重新查找
                            continue; // 重新查找
                        }
                    }
                    this.setFocusedRoleId(targetCharacter.getRoleID()); // 切换焦点目标
                }
                // 3. 查找一个可以使用的技能
                const skillIdToUsed = this.findToUsedSkillId();
                // 4 .获取技能的攻击距离
                const skillAttackRange = 350; // 厘米,服务器坐标系
                // 5. 走到可以攻击目标的地方
                const closedEnough = yield* this.closeToTarget(targetCharacter, skillAttackRange, level);
                if (!closedEnough) {
                    continue; // 靠近失败了,重新查找目标吧
                }
                // 6. 释放技能攻击目标
                if (targetCharacter.destroyed) {
                    // 目标无效了,继续查找
                    targetRoleId = -1;
                    continue;
                }
                let attackedEnd = false;
                this.mInAutoFightingStack = true;
                this._skillAttack(skillIdToUsed, targetCharacter, () => {
                    attackedEnd = true;
                }); // 使用内部的技能释放函数,以免防止打断了挂机状态
                this.mInAutoFightingStack = false;
                // 7. 等待技能释放结束
                while (!attackedEnd) {
                    yield;
                }
            }
        }
        /**
         * 一直循环,查找任何的攻击目标
         * @param attacker
         * @param level
         */
        *findAnyTarget(attacker, level) {
            while (true) {
                // 等待一会再找,节省性能!
                yield* this.mAutoFightingCoroutine.waitTime(1 / 5); // 1秒只执行5次
                const target = level.seekMonsterToLock(attacker, true);
                if (target != null) {
                    return target; // 返回这个目标,先攻击它!攻击完成后再重新执行查找流程!
                }
            }
        }
        /**
         * 一直查找自动挂机的可攻击目标,直到找到为止
         * @param hintTargetId 优先考虑的攻击目标的角色Id
         * @return 返回查找到攻击目标的roleId
         * 注: 写协程注意保存的引用的有效性,因为协程是隔帧执行的,即之前保存的引用可能在运行期间会被删除掉!
         */
        *findAutoFightingTarget(hintTarget) {
            const attacker = this.getPlayer();
            const level = attacker.getLevel();
            // TODO: 采集怪的查找?
            // 1. 手动选择的目标总是最先作为查找目标
            if (this.mFocusedRoleId > 0) {
                const target = level.findCharacter(this.mFocusedRoleId);
                if (!target || !target.canBeAttacked(attacker)) {
                    this.setFocusedRoleId(-1); // 目标无效了,清除掉
                }
                else {
                    return target; // 手动目标有效,直接返回
                }
            }
            // 2. 检测给定的目标是否有效
            if (hintTarget && hintTarget.getRoleID() !== this.mFocusedRoleId) {
                if (hintTarget && hintTarget.canBeAttacked(attacker)) {
                    return hintTarget;
                }
            }
            // 3. 在周围查找可攻击的目标
            let target = level.seekMonsterToLock(attacker, true, this.mAutoFightingTargetMonsterId);
            if (target) {
                return target;
            }
            // 4. 没有找到合适的攻击目标
            const afRuntimeData = this.mAFRuntimeData;
            if (this.mAutoFightType === AutoFightTypes.AUTOFIGHT_ATTACKBOSS) { // 处理Boss的挂机
                Global.Log.Assert(this.mAutoFightingTargetMonsterId >= 0);
                if (afRuntimeData.mStep === AutoFightSteps.Invalid) {
                    // 如果自动挂机的目标是Boss,则从地图配置中读取Boss的坐标
                    const waitPromise = Global.GetMonsterPointByID(level.levelId, this.mAutoFightingTargetMonsterId);
                    afRuntimeData.mBossCoord = yield* Base.CoroutineWrapper.waitPromise(waitPromise);
                    afRuntimeData.mFightPoint = this.mAFRuntimeData.mBossCoord; // Boss挂机时不需要返回到初始的挂机地点
                    const mapType = TableUtils.getMapType(level.levelId);
                    if (mapType === MapTypes.Normal) {
                        // 如果公共场景,需要等待走到Boss坐标点,然后再以Boss坐标点为挂机中心点坐标开始挂机
                        this.AF_AutoFindRoad(level.levelId, this.mAFRuntimeData.mBossCoord, 0);
                        while (this.GetState() !== Logic.EControllerStateId.Idling) {
                            yield;
                        }
                        afRuntimeData.mStep = AutoFightSteps.Killing;
                        return null; // 直接返回-1,以Boss坐标点为中心开始挂机啦!
                    }
                    else {
                        // 副本场景,直接进入边走边杀状态
                        afRuntimeData.mStep = AutoFightSteps.MoveAndKill;
                    }
                }
                // 随便找一只怪打,找到就砍它
                target = level.seekMonsterToLock(attacker, true);
                if (target != null) {
                    return target;
                }
                // 没找到怪,需要区分不同的阶段做不同的逻辑
                if (afRuntimeData.mStep === AutoFightSteps.MoveAndKill) {
                    this.AF_AutoFindRoad(level.levelId, this.mAFRuntimeData.mBossCoord, 0); // 优先向目的地移动
                    // 边走边找怪砍
                    while (this.GetState() !== Logic.EControllerStateId.Idling) {
                        // 等待一会再找,节省性能!                        
                        yield* this.mAutoFightingCoroutine.waitTime(1 / 5); // 1秒只执行5次
                        target = level.seekMonsterToLock(attacker, true);
                        if (target != null) {
                            return target; // 返回这个目标,先攻击它!攻击完成后再重新执行查找Boss流程!
                        }
                    }
                    afRuntimeData.mStep = AutoFightSteps.Killing; // 走到目的地了,开始进入砍怪
                }
                else if (afRuntimeData.mStep === AutoFightSteps.Killing) {
                    return yield* this.findAnyTarget(attacker, level);
                }
                return null; // 直接返回无效值,这样外面会重新走挂机目标的查找流程!
            }
            else { // 普通怪的挂机                
                // 向服务器查询挂机点周围的普通怪
                this.mInAutoFightingStack = true;
                this.SetState(Logic.EControllerStateId.Idling); // 切换到Idle状态,等待后续处理
                this.mInAutoFightingStack = false;
                afRuntimeData.mStep = AutoFightSteps.Killing; // 开始砍怪
                // 没有找到需要攻击的目标,偿试从服务器查询吧
                let tryCount = 0; // 向服务器请求的次数
                while (true) {
                    // 向服务器请求挂机目标
                    const fightPoint = this.mAFRuntimeData.mFightPoint;
                    Net.sendFindMonster(fightPoint.x, fightPoint.y, 400, []);
                    // 等待怪物查找返回的消息
                    const reader = yield* Base.CoroutineWrapper.waitPromise(gameIns.WaitMessage(EMessageType.CMD_SPR_FINDMONSTER, 1));
                    if (reader) {
                        const monsterFindInfo = NetMsg.SCFindMonster.decode(reader);
                        if (monsterFindInfo.excludeMonsterIDs.length > 0) {
                            // 向服务器返回的目标点移动
                            const targetPos = new Laya.Point(monsterFindInfo.X, monsterFindInfo.Y);
                            this.AF_AutoFindRoad(level.levelId, targetPos, 100); // 向目的地移动
                            return yield* this.findAnyTarget(attacker, level); // 边走边找怪
                        }
                    }
                    let waitSecond = 10; // 每10秒向服务器请求一次挂机目标
                    if (tryCount < 10) {
                        waitSecond = 1; // 头10次请求,每秒向服务器请求一次,之后每10秒请求一次,以减少服务器的压力                        
                    }
                    tryCount++;
                    // 等一会再继续查询
                    yield* this.mAutoFightingCoroutine.waitTime(waitSecond);
                }
            }
        }
        /**
         * 查找一个可用的技能Id
         */
        findToUsedSkillId() {
            // TODO: 实现可能技能的查找
            return 10000;
        }
        /**
         * 走到离目标足够近的距离
         * @param targetRoleId 目标角色Id
         * @param distance 到目标点的距离
         * @return 走到了返回true,否则返回false(目标死亡或不存在了?)
         */
        *closeToTarget(targetRole, distance, level) {
            const targetCoord = targetRole.getCoordinate();
            let distSq = distance * distance;
            if (this.get2DDistanceSq(targetCoord.x, targetCoord.y) <= distSq) {
                return true;
            }
            distance -= 100;
            distSq = distance * distance;
            this.AF_AutoFindRoad(level.levelId, targetCoord, 0);
            while (this.get2DDistanceSq(targetCoord.x, targetCoord.y) > distSq) {
                yield;
            }
            return true;
        }
    }
    Logic.ALocalPlayerController = ALocalPlayerController;
})(Logic || (Logic = {}));
//# sourceMappingURL=LocalPlayerController.js.map