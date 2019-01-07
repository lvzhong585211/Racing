var Net;
(function (Net) {
    /** 是否主动断开的连接 */
    Net.ActiveDisconnect = false;
    /**
     * 发送移动消息到服务器
     * @param from 指定起始坐标(2D坐标系)
     * @param to 指定目标坐标(2D坐标系)
     * @param action 指定寻路过程中的动作
     * @param extAction 指定寻路结束后的行为
     * @param rolePathString 指定寻路的路径点信息
     */
    function sendMoveToMsg(mapCode, from, to, action, extAction, rolePathString) {
        const zipPathString = window.btoa(rolePathString); // 把字符串转换成64位编码的字符串
        const csReq = new NetMsg.SpriteMoveData({
            roleID: gameIns.gameState.RoleID,
            mapCode: mapCode,
            action: action,
            toX: to.x | 0,
            toY: to.y | 0,
            extAction: extAction,
            fromX: from.x | 0,
            fromY: from.y | 0,
            startMoveTicks: Long.fromNumber(TimeManager.getCorrectLocalTime()),
            pathString: zipPathString
        });
        gameIns.sendDataToGS(EMessageType.CMD_SPR_MOVE, csReq);
    }
    Net.sendMoveToMsg = sendMoveToMsg;
    /**
     * 发送点击到NPC的消息给服务器,以便与NPC对话
     * @param mapCode 要点击的NPC所在的关卡ID
     * @param roleId 要点击的NPC的角色ID
     * @param extensionId 与点击相关的扩展数据
     */
    function sendClickOnNPC(mapCode, roleId, extensionId) {
        const clickOn = new NetMsg.CS_ClickOn({
            RoleId: gameIns.gameState.RoleID,
            MapCode: mapCode,
            NpcId: roleId,
            ExtId: extensionId
        });
        gameIns.sendDataToGS(EMessageType.CMD_SPR_CLICKON, clickOn);
    }
    Net.sendClickOnNPC = sendClickOnNPC;
    /**
     * 发送任务完成的消息给服务器
     * @param npcRoleId 指定任务对应的NPC的角色ID
     * @param taskId 指定完成的任务Id
     * @param dbID 指定完成的任务的数据库Id
     * @param useYuanBao 需要元宝数
     */
    function sendCompleteTask(npcRoleId, taskId, taskDBId, useYuanBao) {
        const playerRoleId = gameIns.gameState.RoleID;
        const strcmd = `${playerRoleId}:${npcRoleId}:${taskId}:${taskDBId}:${useYuanBao}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_COMPTASK, strcmd);
    }
    Net.sendCompleteTask = sendCompleteTask;
    /**
     * 发送接受新的任务的消息给服务器
     * @param npcRoleId 指定要接受的新的任务的NPC的Id
     * @param taskId 指定新的任务的Id
     */
    function sendNewTask(npcRoleId, taskId) {
        const strcmd = `${gameIns.gameState.RoleID}:${npcRoleId}:${taskId}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_NEWTASK, strcmd);
    }
    Net.sendNewTask = sendNewTask;
    /**
     * 发送修改道具消息
     * @param modType 修改类型（枚举）
     * @param id 道具DBID
     * @param goodsId 道具ID
     * @param isusing 是否正在使用
     * @param site 所处容器位置（背包/仓库...）
     * @param gcount 道具个数
     * @param bagIndex 背包位置
     * @param extraParams 参数
     */
    function sendModGoods(modType, id, goodsId, isusing, site, gcount, bagIndex, extraParams = "") {
        if (!Global.Data.PlayGame) {
            return;
        }
        const strcmd = `${gameIns.gameState.RoleID}:${modType}:${id}:${goodsId}:${isusing}:${site}:${gcount}:${bagIndex}:${extraParams}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_MOD_GOODS, strcmd);
    }
    Net.sendModGoods = sendModGoods;
    /**
     * 发送使用道具消息
     * @param id 道具DBID
     * @param goodsId 道具ID
     * @param usenum 使用个数
     */
    function sendUseGoods(id, goodsId, usenum = 1) {
        const data = new NetMsg.CS_SprUseGoods();
        data.RoleId = gameIns.gameState.RoleID;
        data.DbId = id;
        data.GoodsId = goodsId;
        data.UseNum = usenum;
        gameIns.sendDataToGS(EMessageType.CMD_SPR_USEGOODS, data);
    }
    Net.sendUseGoods = sendUseGoods;
    /**
     * 发送自动战斗相关的消息到服务器
     * @param fightType 自动挂机行为的类型. AutoFightCmds 之一
     * @param fightFlags 自动挂机相关的标识, 为 GetThingsIndexes 标识的组合
     */
    function sendAutoFight(fightType, fightFlags) {
        const strcmd = `${gameIns.gameState.RoleID}:${fightType}:${fightFlags}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_AUTOFIGHT, strcmd);
    }
    Net.sendAutoFight = sendAutoFight;
    /**
     * 接取新任务时，获取任务的奖励信息
     * @param taskId 任务ID
     */
    function sendGetTaskAwards(taskId) {
        if (!Global.Data.PlayGame) {
            return;
        }
        const strcmd = `${gameIns.gameState.RoleID}:${taskId}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_GETTASKAWARDS, strcmd);
    }
    Net.sendGetTaskAwards = sendGetTaskAwards;
    /**
     * 给npc交付物品
     * @param taskId 任务ID
     */
    function sendTransferSomething(taskId) {
        if (!Global.Data.PlayGame) {
            return;
        }
        const strcmd = `${gameIns.gameState.RoleID}:${taskId}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_TRANSFERSOMETHING, strcmd);
    }
    Net.sendTransferSomething = sendTransferSomething;
    /**
     * 进入任务副本
     * @param taskId 任务ID
     */
    function sendEnterTaskFuBen(taskId) {
        if (!Global.Data.PlayGame) {
            return;
        }
        const strcmd = `${gameIns.gameState.RoleID}:${taskId}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_ENTERTASKFUBEN, strcmd);
    }
    Net.sendEnterTaskFuBen = sendEnterTaskFuBen;
    /**
     * 跳转关卡
     * @param toMapCode 目标关卡ID
     */
    function sendGoToMap(toMapCode) {
        const strcmd = `${gameIns.gameState.RoleID}:${toMapCode}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_GOTOMAP, strcmd);
    }
    Net.sendGoToMap = sendGoToMap;
    /**
     * 跳转到给定任务的NPC处
     * @param taskId 要跳转到的NPC处
     */
    function sendTaskTransport2(taskId) {
        const strcmd = `${gameIns.gameState.RoleID}:${taskId}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_TASKTRANSPORT2, strcmd);
    }
    Net.sendTaskTransport2 = sendTaskTransport2;
    /**
     * 激活时装
     * @param dBid 道具DBID
     */
    function sendActivateFashion(dBid) {
        if (!Global.Data.PlayGame) {
            return;
        }
        const strcmd = `${gameIns.gameState.RoleID}:${dBid}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_FASHION_ACTIVE, strcmd);
    }
    Net.sendActivateFashion = sendActivateFashion;
    /**
     * 出售道具
     * @param oType 一键操作类型，对应OneKeyOTypes
     * @param goodsDbIds 道具DBID
     */
    function sendOneKeyQuickSaleOut(oType, goodsDbIds) {
        // TODO:
    }
    Net.sendOneKeyQuickSaleOut = sendOneKeyQuickSaleOut;
    /**
     * 请求角色属性
     */
    function sendGetAttrib2() {
        if (!Global.Data.PlayGame) {
            return;
        }
        const strcmd = `${gameIns.gameState.RoleID}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_GETATTRIB2, strcmd);
    }
    Net.sendGetAttrib2 = sendGetAttrib2;
    /**
     * 背包整理
     * @param nSite
     */
    function sendResetBag(nSite) {
        if (!Global.Data.PlayGame)
            return;
        const strcmd = `${gameIns.gameState.RoleID}:${nSite}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_RESETBAG, strcmd);
    }
    Net.sendResetBag = sendResetBag;
    /**
     * 请求技能信息
     */
    function sendGetSkillInfoCmd() {
        if (!Global.Data.PlayGame)
            return;
        const strcmd = `${Global.Data.roleData.RoleID}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_GETSKILLINFO, strcmd);
    }
    Net.sendGetSkillInfoCmd = sendGetSkillInfoCmd;
    /**
     * 发送技能升级
     * @param skillDbID 技能DBID
     * @param type 技能升级的类型（3=普通升级、1=一键升级）
     * @param isBindGold 是否绑定金币消耗（0=绑定金币、1=绑定金币与非绑定金币一起消耗）
     */
    function sendUpSkillLevel(skillDbID, type, isBindGold = 0) {
        if (!Global.Data.PlayGame)
            return;
        const strcmd = `${Global.Data.roleData.RoleID}:${skillDbID}:${type}:${isBindGold}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_UPSKILLLEVEL, strcmd);
    }
    Net.sendUpSkillLevel = sendUpSkillLevel;
    /**
     * 同步主角的位置到GameServer
     * @param to 到达的位置
     * @param ticks 帧时间
     */
    function sendLocalPlayerPosition(to, ticks) {
        const data = new NetMsg.PositionData();
        data.RoleID = gameIns.gameState.RoleID;
        data.toX = to.x;
        data.toY = to.y;
        data.currentPosTicks = ticks;
        data.MapCode = gameIns.gameState.roleData.MapCode;
        gameIns.sendDataToGS(EMessageType.CMD_SPR_POSITION, data);
    }
    Net.sendLocalPlayerPosition = sendLocalPlayerPosition;
    /**
     * 修改快捷使用配置
     * @param type 类型，0=技能、1=物品
     * @param keys 配置内容
     */
    function sendModKeys(type, keys) {
        if (!Global.Data.PlayGame)
            return;
        const strcmd = `${gameIns.gameState.RoleID}:${type}:${keys}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_MODKEYS, strcmd);
    }
    Net.sendModKeys = sendModKeys;
    /**
     * 向GS发送开始一个动作(如释放技能,普攻,打招呼等社交交互动作)的消息
     * @param direction 释放动作时的朝向. 一般由函数 getDirectionByTan() 获取
     * @param action 行为
     * @param selfPos 主角的位置
     * @param targetPos 技能释放的目标点
     * @param yAngle 朝向? 一般由函数 Global.GetYAngle() 获取
     */
    function sendAction(direction, action, selfPos, targetPos, yAngle) {
        const actionMsg = new NetMsg.SpriteActionData({
            roleID: gameIns.gameState.RoleID,
            mapCode: GameMode.getLocalPlayer().getLevel().levelId,
            direction: direction,
            action: action,
            toX: selfPos.x,
            toY: selfPos.y,
            targetX: targetPos.x,
            targetY: targetPos.y,
            yAngle: yAngle
        });
        gameIns.sendDataToGS(EMessageType.CMD_SPR_ACTTION, actionMsg);
    }
    Net.sendAction = sendAction;
    /**
 * 机器人向GS发送开始一个动作(如释放技能,普攻,打招呼等社交交互动作)的消息
 * @param direction 释放动作时的朝向. 一般由函数 getDirectionByTan() 获取
 * @param action 行为
 * @param selfPos 主角的位置
 * @param targetPos 技能释放的目标点
 * @param yAngle 朝向? 一般由函数 Global.GetYAngle() 获取
 */
    function sendRobotAction(roleId, mapCode, direction, action, selfPos, targetPos, yAngle) {
        const actionMsg = new NetMsg.SpriteActionData({
            roleID: roleId,
            mapCode: mapCode,
            direction: direction,
            action: action,
            toX: selfPos.x,
            toY: selfPos.y,
            targetX: targetPos.x,
            targetY: targetPos.y,
            yAngle: yAngle
        });
        gameIns.sendDataToGS(EMessageType.CMD_SPR_ACTTION, actionMsg);
    }
    Net.sendRobotAction = sendRobotAction;
    /**
     * 发送一次机器人攻击消息给服务器
     * @param roleId 攻击者roleId
     * @param srcPos 攻击者位置
     * @param targetPos 目标点(服务器坐标系)
     * @param magicCode 使用的技能的Id
     */
    function sendRobotSpriteAttack(roleId, srcPos, targetPos, magicCode) {
        const attackInfo = new NetMsg.SpriteAttackData();
        attackInfo.roleID = roleId;
        attackInfo.roleX = srcPos.x;
        attackInfo.roleY = srcPos.y;
        //  机器人不用选目标
        // if(targetX && targetY){ // 如果有攻击目标
        //     attackInfo.enemy = target.getRoleID();
        //     const enemyCoord = target.getCoordinate();
        //     attackInfo.enemyX = enemyCoord.x;
        //     attackInfo.enemyY = enemyCoord.y;
        // }
        // else{ // 没有攻击目标,直接对目标点进行攻击
        attackInfo.enemy = -1;
        attackInfo.enemyX = -1;
        attackInfo.enemyY = -1;
        // }
        attackInfo.realEnemyX = targetPos.x;
        attackInfo.realEnemyY = targetPos.y;
        attackInfo.magicCode = magicCode;
        gameIns.sendDataToGS(EMessageType.CMD_SPR_ATTACK, attackInfo);
    }
    Net.sendRobotSpriteAttack = sendRobotSpriteAttack;
    /**
     * 发送一次攻击消息给服务器
     * @param attacker 攻击者(一般为本地玩家)
     * @param targetPos 目标点(服务器坐标系)
     * @param magicCode 使用的技能的Id
     * @param target 目标对象(可以没有)
     */
    function sendSpriteAttack(attacker, targetPos, magicCode, target) {
        const attackInfo = new NetMsg.SpriteAttackData();
        attackInfo.roleID = attacker.getRoleID();
        const attackerCoord = attacker.getCoordinate();
        attackInfo.roleX = attackerCoord.x;
        attackInfo.roleY = attackerCoord.y;
        if (target) { // 如果有攻击目标
            attackInfo.enemy = target.getRoleID();
            const enemyCoord = target.getCoordinate();
            attackInfo.enemyX = enemyCoord.x;
            attackInfo.enemyY = enemyCoord.y;
        }
        else { // 没有攻击目标,直接对目标点进行攻击
            attackInfo.enemy = -1;
            attackInfo.enemyX = -1;
            attackInfo.enemyY = -1;
        }
        attackInfo.realEnemyX = targetPos.x;
        attackInfo.realEnemyY = targetPos.y;
        attackInfo.magicCode = magicCode;
        gameIns.sendDataToGS(EMessageType.CMD_SPR_ATTACK, attackInfo);
    }
    Net.sendSpriteAttack = sendSpriteAttack;
    /**
     * 同步技能信息
     * @param magicCode 技能id
     */
    function sendMagicCode(magic) {
        if (!Global.Data.PlayGame)
            return;
        const mapCode = GameMode.getLocalPlayer().getLevel().levelId;
        const MgiacCodeData = new NetMsg.MgiacCodeData({
            RoleID: gameIns.gameState.RoleID,
            mapCode: mapCode,
            magicCode: magic,
            targetRoleID: 0
        });
        gameIns.sendDataToGS(EMessageType.CMD_SPR_MAGICCODE, MgiacCodeData);
    }
    Net.sendMagicCode = sendMagicCode;
    /**
     * 发送停止移动
     * @param index 节点索引
     */
    function sendStopMove(index) {
        if (!Global.Data.PlayGame)
            return;
        const strcmd = `${gameIns.gameState.RoleID}:${index}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_STOPMOVE, strcmd);
    }
    Net.sendStopMove = sendStopMove;
    /**
     * 设置自动分配加点
     * @param nFlag 1=自动分配、0=不自动分配
     */
    function sendSetAutoAssignPropertyPointCmd(nFlag) {
        if (!Global.Data.PlayGame)
            return;
        const strcmd = `${gameIns.gameState.RoleID}:${nFlag}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_SETAUTOASSIGNPROPERTYPOINT, strcmd);
    }
    Net.sendSetAutoAssignPropertyPointCmd = sendSetAutoAssignPropertyPointCmd;
    /**
     * 发送推荐加点
     * @param nStrengthPoint // 力量
     * @param nIntelligencePoint // 智力
     * @param nDexterityPoint // 敏捷
     * @param nConstitutionPoint // 体力
     */
    function sendRecommendPoint(nStrengthPoint, nIntelligencePoint, nDexterityPoint, nConstitutionPoint) {
        if (!Global.Data.PlayGame)
            return;
        const PropAddPoint = new NetMsg.CSPropAddPoint();
        PropAddPoint.RoleID = gameIns.gameState.RoleID;
        PropAddPoint.Strength = nStrengthPoint;
        PropAddPoint.Intelligence = nIntelligencePoint;
        PropAddPoint.Dexterity = nDexterityPoint;
        PropAddPoint.Constitution = nConstitutionPoint;
        gameIns.sendDataToGS(EMessageType.CMD_SPR_EXECUTERECOMMENDPROPADDPOINT, PropAddPoint);
    }
    Net.sendRecommendPoint = sendRecommendPoint;
    /**
     * 发送以给定点为中心查找怪物的消息
     * @param centerX 查找怪物的中心点坐标(服务器坐标系)
     * @param centerY 查找怪物的中心点坐标(服务器坐标系)
     * @param radiusGridNum 查找半径(格子坐标系)
     * @param excludeMonsterIDs 要排除掉的怪物的Id
     */
    function sendFindMonster(centerX, centerY, radiusGridNum, excludeMonsterIDs) {
        const findMonsterMsg = new NetMsg.SCFindMonster({
            RoleID: gameIns.gameState.RoleID,
            X: centerX,
            Y: centerY,
            radiusGridNum: radiusGridNum,
            excludeMonsterIDs: excludeMonsterIDs,
            ExcludeBoss: Global.Data.AutoFightData.DontAttackBigBoss ? 1 : 0
        });
        gameIns.sendDataToGS(EMessageType.CMD_SPR_FINDMONSTER, findMonsterMsg);
    }
    Net.sendFindMonster = sendFindMonster;
    function sendChat(index, fromRoleName, toRoleName, text, chatType) {
        // if (!Global.Data.PlayGame) return;
        const strcmd = `${gameIns.gameState.RoleID}:${fromRoleName}:0:${toRoleName}:${index}:${text}:${chatType}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_CHAT, strcmd);
    }
    Net.sendChat = sendChat;
    /**
     * 发送切换地图
     * @param teleportID 传送点ID
     * @param toMapCode 传送到的地图ID
     * @param toMapX 传送到的地图坐标X
     * @param toMapY 传送到的地图坐标Y
     * @param toDirection 传送到的地图角色朝向
     */
    function sendMapConversion(teleportID, toMapCode, toMapX, toMapY, toDirection) {
        if (!Global.Data.PlayGame || Global.Data.WaitingForMapChange) {
            return;
        }
        if (!gameIns.gameState.roleData || gameIns.gameState.roleData.LifeV <= 0) {
            return; // 角色死亡时不允许切换地图
        }
        // 清空客户端的移动消息发送队列
        // Global.theMovePool.Clear();
        // 清空缓存移动数据
        Global.ClearLastMoveData();
        // 防止正在自动战斗中，终止自动战斗
        GameMode.getLocalPlayerController().cancelAutoFight();
        Global.Data.WaitingForMapChange = true;
        uiMgr.showNetWaiting();
        const mapChange = new NetMsg.SCMapChange();
        mapChange.RoleID = gameIns.gameState.RoleID;
        mapChange.TeleportID = teleportID;
        mapChange.NewMapCode = toMapCode;
        mapChange.ToNewMapX = toMapX;
        mapChange.ToNewMapY = toMapY;
        mapChange.ToNewDiection = toDirection;
        gameIns.sendDataToGS(EMessageType.CMD_SPR_MAPCHANGE, mapChange);
        // TODO: 传送之前把本地缓存操作提示信息清空
        // PlayZone.GlobalPlayZone.ClearGetGoodsHintEx();
    }
    Net.sendMapConversion = sendMapConversion;
    /**
     * 发送开始游戏
     */
    function startPlayGame() {
        const strcmd = `${gameIns.gameState.RoleID}`;
        gameIns.sendStringToGS(EMessageType.CMD_PLAY_GAME, strcmd);
    }
    Net.startPlayGame = startPlayGame;
    /**
     * 功能开启提示奖励领取
     * @param funOpenId            功能开启的Id
     */
    function sendFunOpenTiShiRewardPickUp(funOpenId) {
        const strcmd = `${gameIns.gameState.RoleID}:${funOpenId}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_ClientFunOpenTiShiRewardPickUp, strcmd);
    }
    Net.sendFunOpenTiShiRewardPickUp = sendFunOpenTiShiRewardPickUp;
    /**
     * 请求地图传送
     * @param mapCode 传送到的地图ID
     * @param toPosX 传送到的位置X
     * @param toPosY 传送到的位置Y
     * @param useChuanSongJuan 是否消耗道具
     */
    function sendTaskTransport(mapCode, toPosX, toPosY, useChuanSongJuan = 0) {
        // 如果是在mapchanging就不应该在发送转换位置的消息了
        if (Global.Data.WaitingForMapChange) {
            return;
        }
        if (Global.onPreChangeMap(mapCode)) {
            return;
        }
        const strcmd = `${gameIns.gameState.RoleID}:${mapCode}:${toPosX}:${toPosY}:${useChuanSongJuan}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_TASKTRANSPORT, strcmd);
    }
    Net.sendTaskTransport = sendTaskTransport;
    /**
     * 获取VIP详细数据
     * @returns {}
     */
    function sendGetVipInfo() {
        const strcmd = `${gameIns.gameState.RoleID}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_GETVIPINFO, strcmd);
    }
    Net.sendGetVipInfo = sendGetVipInfo;
    /**
     * VIP对应等级领取的奖励
     * @param vipLevel      领取奖励的Vip等级
     * @returns {}
     */
    function sendGetVipReward(vipLevel) {
        const strcmd = `${gameIns.gameState.RoleID}:${vipLevel}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_GETVIPLEVELAWARD, strcmd);
    }
    Net.sendGetVipReward = sendGetVipReward;
    /**
     * 查询7日节日登录信息
     * @param actType       活动类型  对应FuLiActivityEnum
     */
    function sendSevenDayActInfo(actType) {
        const strcmd = `${gameIns.gameState.RoleID}:${actType}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_SEVEN_DAY_ACT_QUERY, strcmd);
    }
    Net.sendSevenDayActInfo = sendSevenDayActInfo;
    /**
     * 领取活动奖励
     * @param actType       活动类型  对应FuLiActivityEnum
     * @param day           领取对应天数
     */
    function sendGetActivityReward(actType, day) {
        const strcmd = `${gameIns.gameState.RoleID}:${actType}:${day}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_SEVEN_DAY_ACT_GET_AWARD, strcmd);
    }
    Net.sendGetActivityReward = sendGetActivityReward;
    /**
     * 请求活动数据
     */
    function sendGetHuoDongData() {
        const strcmd = `${gameIns.gameState.RoleID}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_GETHUODONGDATA, strcmd);
    }
    Net.sendGetHuoDongData = sendGetHuoDongData;
    /**
     * 请求每日在线信息
     */
    function sendQureyeEverydayOnlineAwardGiftInfo() {
        const strcmd = `${gameIns.gameState.RoleID}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_UPDATEEVERYDAYONLINEAWARDGIFTINFO, strcmd);
    }
    Net.sendQureyeEverydayOnlineAwardGiftInfo = sendQureyeEverydayOnlineAwardGiftInfo;
    /**
     * 点击每日在线抽奖
     * @param nTimer 1=服务器把抽中的奖品ID发给客户端，2=服务器把物品给玩家并且置抽奖的状态
     */
    function sendGetEveryDayOnLineAwardGiftCmd(nTimer) {
        const strcmd = `${gameIns.gameState.RoleID}:${nTimer}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_GETEVERYDAYONLINEAWARDGIFT, strcmd);
    }
    Net.sendGetEveryDayOnLineAwardGiftCmd = sendGetEveryDayOnLineAwardGiftCmd;
    /**
     * 查询等级奖励领取信息
     */
    function sendQueryUpLevelGiftFlagList() {
        const strcmd = `${gameIns.gameState.RoleID}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_QUERYUPLEVELGIFTINFO, strcmd);
    }
    Net.sendQueryUpLevelGiftFlagList = sendQueryUpLevelGiftFlagList;
    /**
     * 领取等级奖励的奖励
     * @param itemId 奖励Id
     */
    function sendGetUpLevelGiftFlagList(itemId) {
        const strcmd = `${gameIns.gameState.RoleID}:${itemId}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_GETUPLEVELGIFTAWARD, strcmd);
    }
    Net.sendGetUpLevelGiftFlagList = sendGetUpLevelGiftFlagList;
    /**
     * 返回商城数据
     * @param dataType         0 表示取回所有数据， 1表示 mall.Xml 2表示 malltab.Xml 3 表示抢购数据
     */
    function sendGetMallData(dataType = 0) {
        const strcmd = `${gameIns.gameState.RoleID}:${dataType}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_FETCHMALLDATA, strcmd);
    }
    Net.sendGetMallData = sendGetMallData;
    /**
     * 抢购商城购买
     * @param qiangGouId     抢购Id
     * @param goodsNum       物品数量
     * @param autoUseGold    是否自动使用金币
     * @param goodsId        物品Id
     * @returns {}
     */
    function sendMallBuyLimitBuy(qiangGouId, goodsNum, autoUseGold, goodsId) {
        const strcmd = `${gameIns.gameState.RoleID}:${qiangGouId}:${goodsNum}:${autoUseGold}:${goodsId}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_MALLQIANGGOUBUYGOODS, strcmd);
    }
    Net.sendMallBuyLimitBuy = sendMallBuyLimitBuy;
    /**
     * 钻石、银币商城商品购买
     * @param mallId             商城商品Id
     * @param goodsNum      商品数量
     * @param autoUseGold  自动使用金币
     */
    function sendMallBuy(mallId, goodsNum, autoUseGold) {
        const strcmd = `${gameIns.gameState.RoleID}:${mallId}:${goodsNum}:${autoUseGold ? 1 : 0}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_MALL_BUY, strcmd);
    }
    Net.sendMallBuy = sendMallBuy;
    /**
    * 绑钻商城商品购买
    * @param mallId             商城商品Id
    * @param goodsNum      商品数量
    * @param autoUseGold  自动使用金币
    */
    function sendMallBindDiamondBuy(mallId, goodsNum) {
        const strcmd = `${gameIns.gameState.RoleID}:${mallId}:${goodsNum}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_MALLZHENQIBUY, strcmd);
    }
    Net.sendMallBindDiamondBuy = sendMallBindDiamondBuy;
    /**
     * 开始潜心修炼
     * @param meditateState 0=停止修炼、1=开始修炼
     */
    function sendStartMeditateCmd(meditateState) {
        const strcmd = `${gameIns.gameState.RoleID}:${meditateState}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_STARTMEDITATE, strcmd);
    }
    Net.sendStartMeditateCmd = sendStartMeditateCmd;
    /**
     * 获取潜心修炼时间
     */
    function sendGetMeditateTimeInfoCmd() {
        const strcmd = `${gameIns.gameState.RoleID}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_GETMEDITATETIMEINFO, strcmd);
    }
    Net.sendGetMeditateTimeInfoCmd = sendGetMeditateTimeInfoCmd;
    /**
     * 领取潜心修炼经验奖励
     * @param nStep 倍率选择，0=免费领取、1=消耗金币双倍经验、2=为消耗钻石四倍经验
     */
    function sendGetMeditateExpCmd(nStep) {
        const strcmd = `${gameIns.gameState.RoleID}:${nStep}`;
        gameIns.sendStringToGS(EMessageType.CMD_SPR_GETMEDITATEEXP, strcmd);
    }
    Net.sendGetMeditateExpCmd = sendGetMeditateExpCmd;
})(Net || (Net = {}));
//# sourceMappingURL=SendMessages.js.map