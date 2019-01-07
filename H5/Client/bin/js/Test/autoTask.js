var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/** 放一些自动测试的函数,如自动接收与发送任务
 * 注: 这个文件在项目发布时可以删除掉,因为全是测试用的代码
 */
var AutoTest;
(function (AutoTest) {
    /**
     * 自动完成并接收下一个任务
     * @param npcRoleID 接受任务的NPC角色Id
     * @param taskID 要完成的任务Id
     * @param npcExenstionID 要完成的任务数据表Id
     */
    function submitAndAskTask(npcRoleID, taskID, npcExenstionID) {
        Global.Log.Info("自动接受任务(npcRoleId:%d, taskId:%d, npcExenstionID:%d),并继续下一个...", npcRoleID, taskID, npcExenstionID);
        const taskData = Task.getTaskDataById(taskID);
        const nextMainTaskId = Task.getNextMainTask(taskID);
        // 发送任务完成消息
        Net.sendCompleteTask(npcRoleID, taskID, taskData.DbID, 0);
        // 自动接收下一个消息
        if (nextMainTaskId > 0) {
            Task.autoAcceptTask(nextMainTaskId);
        }
    }
    AutoTest.submitAndAskTask = submitAndAskTask;
    /**
     * 从当前页面的url中获取参数信息,即 ? 后的参数.比如说一个url：http://i.cnblogs.com/?robotCount=10 ,我们想得到参数robotCount的值
     * @param paramName 要获取值的参数名称
     */
    function getQueryString(paramName) {
        let reg = new RegExp(`(^|&)${paramName}=([^&]*)(&|$)`, "i");
        let r = window.location.search.substr(1).match(reg); // 获取url中"?"符后的字符串并正则匹配
        let context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context === "" || context === "undefined" ? "" : context;
    }
    /**
     * 获取ws的url地址
     * @param paramName 参数名称
     * @param defaultValue 默认值
     */
    function getWSUrl(paramName, defaultValue) {
        let ret = getQueryString(paramName);
        if (Global.String.IsNullOrEmpty(ret)) {
            ret = defaultValue;
        }
        if (ret.indexOf("ws://") < 0) {
            ret = "ws://" + ret;
        }
        return ret;
    }
    /**
     * 机器人的基础逻辑
     */
    class RobotBase {
        constructor() {
            this.mTcpToGameServer = null; // 到GameServer的Tcp连接
            this.mRoleId = -1; // 角色的Id
            this.mStoped = false; // 此机器人是否停止了
            this.mRoleData = null; // 机器人角色的数据
            this.mOrgCoord = null; // 机器人的初始坐标
        }
        /**
         * 登录到UserLoginServer与GameServer
         * @param account 使用的帐号,密码同帐号
         */
        loginToServer(account) {
            return __awaiter(this, void 0, void 0, function* () {
                let socketToLoginServer = new Net.Socket4Message();
                console.log("   .连接LoginServer");
                const connectResult = yield socketToLoginServer.connectByUrl(_loginServerUrl);
                if (!connectResult) {
                    // 显示连接LoginServer失败
                    console.error("(%s)连接 %s 失败!", account, _loginServerUrl);
                    return false;
                }
                const timeOut = 10; // 超时时间
                this.mAccount = account;
                // 开始登录UserLoginServer
                const msgLogin = new NetMsg.CToGS_Login();
                msgLogin.Info = `${Global.VersionInfo.appVersion}:${account}:${account}`; // 拼接字符串-- 版本号:帐号:密码
                const msgType = EMessageType.LS_LOGIN_ON;
                socketToLoginServer.sendString(msgType, msgLogin.Info);
                // 等待登录返回        
                const retData = yield socketToLoginServer.WaitStringMessage(msgType, timeOut);
                socketToLoginServer.close(); // 关闭到LoginServer的连接     
                socketToLoginServer = null;
                if (!retData) {
                    console.error(ConfigLoca.UI_CONNECT_LOGINSERVER_FAILED);
                    return false;
                }
                // 拿到了登录Token
                let dataFields = retData.split(":");
                // 错误码到提示的影射
                const errMap = {
                    "-1": ConfigLoca.UI_LOGIN_USERWRONG,
                    "-2": ConfigLoca.UI_LOGIN_VERSIONWRONG,
                    "-3": ConfigLoca.UI_LOGIN_USER_NOTEXIST,
                    "-4": ConfigLoca.UI_LOGIN_USER_NOTEXIST_PLATFORM,
                    "-100": ConfigLoca.UI_LOGIN_TOKEN_TIMEOUT,
                };
                const err = errMap[dataFields[0]];
                if (err) { // 有错误,输出提示
                    console.error(err);
                    return false;
                }
                const userId = dataFields[0];
                const userName = dataFields[1];
                const userToken = dataFields[2];
                // GameServer的url
                if (this.mTcpToGameServer) {
                    this.mTcpToGameServer.close();
                    this.mTcpToGameServer = null;
                }
                const webTcp = new Net.Socket4Message();
                // 连接到GameServer
                console.log("   .连接GameServer");
                const connectRet = yield webTcp.connectByUrl(_gameServerUrl);
                if (!connectRet) {
                    console.error("(%s)连接到GameServer(%s)失败!", account, _gameServerUrl);
                    return false;
                }
                // 网络断开消息
                webTcp.onMsg(EMessageType.CMD_SOCKET_DISCONNECT, null, () => {
                    this.mStoped = true;
                    console.error("帐号(%s)与GameServer断开连接", account);
                    webTcp.close();
                });
                const clientHeartId = -1;
                // 偿试登录
                const RoleRandToken = -1;
                let loginInfo = `${userId}:${userName}:${userToken}:${RoleRandToken}:${Global.VersionInfo.appVersion}:1`;
                loginInfo = Logic.KuaFuLoginManager.GetKuaFuLoginString(loginInfo); // 追加跨服登录信息
                // 发送登录消息
                webTcp.sendString(EMessageType.CMD_LOGIN, loginInfo);
                // 等待登录返回
                dataFields = yield webTcp.WaitStringMsgFields(EMessageType.CMD_LOGIN, timeOut);
                if (dataFields == null) {
                    console.error(ConfigLoca.UI_LOGIN_GS_TIMEOUT);
                    return false;
                }
                let randToken = -1;
                if (dataFields.length > 0) {
                    randToken = parseInt(dataFields[0]);
                }
                if (randToken < 0) {
                    console.error("(%s)登录到GameServer失败(err=%d)", account, randToken);
                    return false;
                }
                // 监听所有的网络消息
                webTcp.onMsg(EMessageType.CMD_SOCKET_DEFAULT, null, (uMsgType, msgReader) => {
                });
                // 发送版本信息
                const verMsg = `${0}:2:20181230:20181230:100`; // 版本信息暂时没有用,先随便填写吧
                webTcp.sendString(EMessageType.CMD_SPR_PUSH_VERSION, verMsg);
                // 请求角色列表
                const nServerID = 0;
                const roleQueryMsg = `${userId}:${nServerID}`;
                webTcp.sendString(EMessageType.CMD_ROLE_LIST, roleQueryMsg);
                // 等待角色列表返回
                const roleListFields = yield webTcp.WaitStringMsgFields(EMessageType.CMD_ROLE_LIST, timeOut);
                const roleCountOrErrCdoe = parseInt(roleListFields[0]); // 字段0表示角色数量或错误码
                const sRoleList = roleListFields[1]; // 字段1表示角色列表信息
                if (roleCountOrErrCdoe < 0) { // 返回了错误码
                    if (-1 === roleCountOrErrCdoe) { // 人满了,需要排队                    
                        console.assert(false);
                        return false;
                    }
                    else if (-2 === roleCountOrErrCdoe) { // 服务器爆满,排队都满了,提示玩家换其它服务器
                        console.error(ConfigLoca.UI_LOGIN_GS_USERFULL);
                    }
                    return false;
                }
                const aRoleList = sRoleList.split("|");
                let dtRole = MyUI.RoleSelectorItemDataList.parseOneRoleData(aRoleList[0]);
                if (!dtRole) {
                    // 没有角色,创建一个
                    const sUserName = userId;
                    const nOccuSex = EnumSex.Male;
                    const nOccupation = EnumOccupation.LongDan;
                    const nLiOrZhi = 1; // 原始版本始终为1
                    const sPlatformName = ""; // 平台名字
                    // if( ) Global.randomIndex == null )
                    const allCharacter = `abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
                    // const sRoleName = `${account}_0_${userId}`;
                    let sRoleName = ``;
                    for (let i = 0; i < 7; i++) {
                        const curIndex = Math.floor(Math.random() * allCharacter.length);
                        sRoleName += allCharacter[curIndex];
                    }
                    console.log(`尝试创建角色名称(${sRoleName})`);
                    // 发送创建角色消息
                    const sCmdInfo = `${userId}:${sUserName}:${nOccuSex}:${nOccupation}:${sRoleName}:${nServerID}:${nLiOrZhi}`;
                    webTcp.sendString(EMessageType.CMD_CREATE_ROLE, sCmdInfo);
                    // 等待创建角色返回
                    const roleListFields = yield webTcp.WaitStringMsgFields(EMessageType.CMD_CREATE_ROLE, timeOut);
                    const nRoleCnt = parseInt(roleListFields[0]); // 角色个数
                    if (nRoleCnt < 0) {
                        console.error(`创建角色失败(${sCmdInfo}),可能角色名称重复?`);
                        return false;
                    }
                    const sRole = roleListFields[1]; // 角色信息数据
                    dtRole = MyUI.RoleSelectorItemDataList.parseOneRoleData(sRole);
                }
                this.mRoleId = dtRole.roleID;
                // 开始登入游戏世界
                const sCmdMsg = `${userId}:${dtRole.roleID}`; // 后两个参数先不传
                webTcp.sendString(EMessageType.CMD_INIT_GAME, sCmdMsg);
                // 等待登入返回
                const msgReader = yield webTcp.WaitMessage(EMessageType.CMD_INIT_GAME, timeOut);
                const roleData = NetMsg.RoleData.decode(msgReader);
                if (roleData.RoleID < 0) {
                    console.error("(%s)登入游戏世界失败(err = %d)", account, roleData.RoleID);
                    return false;
                }
                // 通知服务器,加载关卡结束,可以开始游戏逻辑了
                const msgData = `${roleData.RoleID}`;
                webTcp.sendString(EMessageType.CMD_PLAY_GAME, msgData);
                // 保存机器人角色的数据
                this.mRoleData = roleData;
                this.mOrgCoord = new Laya.Point(roleData.PosX, roleData.PosY);
                this.mTcpToGameServer = webTcp;
                // 发送心跳
                const _heartFun = () => {
                    const clientHeart = new NetMsg.SCClientHeart({
                        RoleID: roleData.RoleID,
                        RandToken: randToken,
                        Ticks: 0,
                        ReportCliRealTick: Date.now(),
                    });
                    this.sendDataToGS(EMessageType.CMD_SPR_CLIENTHEART, clientHeart);
                };
                Laya.timer.loop(60 * 1000, this, _heartFun);
                const _loop = () => {
                    if (this.mStoped) {
                        this.mTcpToGameServer.close();
                        this.mTcpToGameServer = null;
                        Laya.timer.clear(this, _loop);
                        Laya.timer.clear(this, _heartFun);
                        return;
                    }
                    // 每帧循环逻辑
                    this._frameLoop();
                };
                // 循环,直到退出
                Laya.timer.loop(1000 / 5, this, _loop); // 每秒5帧即可
                return true;
            });
        }
        /**
         * @desc 发送消息包给GameServer
         * @param msgType 指定消息类型
         * @param msgObject 指定消息包的数据对象
         * @param encode 可以传入编码函数,一般为 T 数据类型的 encode() 函数
         */
        sendDataToGS(msgType, msgObject, encode) {
            this.mTcpToGameServer.sendData(msgType, msgObject, encode);
        }
        /**
          * @desc 发送字符串消息包给GameServer
          * @param msgType 指定消息类型
          * @param msgObject 指定消息包的数据对象
          * @param encode 可以传入编码函数,一般为 T 数据类型的 encode() 函数
          */
        sendStringToGS(msgType, msgData) {
            this.mTcpToGameServer.sendString(msgType, msgData);
        }
        /**
         * 使用指定的函数来发送消息
         * @param args 消息的参数
         */
        sendMsgToGS(sendFn, ...args) {
            // 为了复用代码,我们这里重新设定一下游戏实例
            const oldGameIns = gameIns;
            gameIns = {
                gameState: { RoleID: this.mRoleId },
                sendDataToGS: (msgType, msgObject, encode) => {
                    this.sendDataToGS(msgType, msgObject, encode);
                },
                sendStringToGS: (msgType, msgData) => {
                    this.sendStringToGS(msgType, msgData);
                },
            };
            sendFn(...args); // 调用真正的消息发送函数
            gameIns = oldGameIns;
        }
        /**
         * 每帧逻辑
         */
        _frameLoop() {
        }
    }
    /**
     * 等待指定的时间
     * @param time 等待的时间(毫秒)
     */
    function sleep(time) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve();
                }, time);
            });
        });
    }
    let _mapDatas; // 缓冲加载的关卡寻路信息
    /** 获取指定关卡的寻路数据 */
    function getMapData(levelId, sceneId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_mapDatas == null) {
                _mapDatas = new Array();
            }
            let mapData = _mapDatas[levelId];
            if (!mapData) { // 如果关卡寻路信息不存在,则加载
                mapData = new Logic.GMapData();
                _mapDatas[levelId] = mapData;
                yield mapData.load(levelId, sceneId);
            }
            return mapData;
        });
    }
    let moveRange = 6; // 机器人的寻路范围
    /** 机器人类型枚举 */
    let EnumRobotType;
    (function (EnumRobotType) {
        EnumRobotType[EnumRobotType["LoginRobot"] = 0] = "LoginRobot";
        EnumRobotType[EnumRobotType["MoveRobot"] = 1] = "MoveRobot";
        EnumRobotType[EnumRobotType["FightRobot"] = 2] = "FightRobot";
    })(EnumRobotType || (EnumRobotType = {}));
    let robotType = EnumRobotType.MoveRobot;
    /**
     * 随机战斗的机器人
     */
    class RobotRandomFight extends RobotBase {
        /**
 * 登录到UserLoginServer与GameServer
 * @param account 使用的帐号,密码同帐号
 */
        loginToServer(account) {
            const _super = name => super[name];
            return __awaiter(this, void 0, void 0, function* () {
                const ret = yield _super("loginToServer").call(this, account);
                if (ret) {
                    // 开始随机战斗的逻辑
                    this.randomFight();
                }
                return ret;
            });
        }
        /**
        * 随机找怪，释放技能
        */
        randomFight() {
            return __awaiter(this, void 0, void 0, function* () {
                while (!this.mStoped) {
                    const waitTime = 4000 + Math.random() * 3000; // 随机等待一定的时间
                    yield sleep(waitTime); // 等待
                    // 向服务器获取怪物坐标
                    this.sendMsgToGS(Net.sendFindMonster, this.mRoleData.PosX, this.mRoleData.PosY, 400, []);
                    console.log("=== 正在获取怪物位置机器人(%s)", this.mAccount);
                    // 等待怪物查找返回的消息
                    const reader = yield this.mTcpToGameServer.WaitMessage(EMessageType.CMD_SPR_FINDMONSTER, 1);
                    if (reader) {
                        const monsterFindInfo = NetMsg.SCFindMonster.decode(reader);
                        // 简单把位置 = 过来
                        this.mRoleData.PosX = monsterFindInfo.X;
                        this.mRoleData.PosY = monsterFindInfo.Y;
                        this.sendMsgToGS(Net.sendChat, 0, ``, ``, `-moveto ${this.mRoleData.MapCode} ${monsterFindInfo.X} ${monsterFindInfo.Y}`, 0);
                        console.log("=== 获取怪物位置机器人(%s), 开始跳转(%d,%d)", this.mAccount, monsterFindInfo.X, monsterFindInfo.Y);
                    }
                    const curPos = new Laya.Point(this.mRoleData.PosX, this.mRoleData.PosY);
                    // const readerChangePos = await this.mTcpToGameServer.WaitMessage(EMessageType.CMD_SPR_CHANGEPOS, 1);
                    this.sendMsgToGS(Net.sendRobotAction, this.mRoleData.RoleID, this.mRoleData.MapCode, 1, GActions.Attack, curPos, curPos, 0);
                    console.log("=== 机器人(%s), 开始技能动作", this.mAccount);
                    this.sendMsgToGS(Net.sendRobotSpriteAttack, this.mRoleData.RoleID, curPos, curPos, 10000);
                    console.log("=== 机器人(%s), 开始技能攻击", this.mAccount);
                    // const waitTime1 = 24000 + Math.random() * 3000; // 随机等待一定的时间
                    // await sleep(waitTime1);  // 等待
                    // // const levelSetting = tableMgr.levelSettingTable.Find(this.mRoleData.MapCode);
                    // // const sceneId = levelSetting.PicCode;
                    // // const mapData = await getMapData(this.mRoleData.MapCode, sceneId);  // 获取关卡信息
                    // // // 随机一个坐标点
                    // // // 服务器坐标
                    // // const startCoord = new Laya.Point(this.mRoleData.PosX, this.mRoleData.PosY);
                    // // const offset = moveRange*100;                
                    // // const destCoord = new Laya.Point(this.mOrgCoord.x + Math.floor((Math.random() - 0.5) * offset), this.mOrgCoord.y + Math.floor((Math.random() - 0.5) * offset));
                    // // // 转换成格子坐标
                    // // const start = mapData.toGridCoordFrom2D(startCoord);
                    // // const end = mapData.toGridCoordFrom2D(destCoord);
                    // // const moveComponent: Logic.IMoveComponent = { Coordinate: startCoord, SpriteType: EActorType.LocalPlayer };
                    // // // 查找路径
                    // // const path = mapData.findPath(moveComponent, start, end);
                    // // if (null == path || path.length <= 0) {
                    // //     continue;
                    // // }
                    // // // 给服务器发送移动消息
                    // // const rolePathString = Logic.Level.transPathToString(path);
                    // // this.sendMsgToGS(Net.sendMoveToMsg, sceneId, startCoord, destCoord, GActions.Run, ExtActionTypes.EXTACTION_NONE, rolePathString);
                    // // // console.log("(%s) 机器人从(%d,%d)移动到(%d,%d)", this.mAccount, startCoord.x, startCoord.y, destCoord.x, destCoord.y);
                    // // // 把自己直接跳到目标点
                    // // this.mRoleData.PosX = destCoord.x;
                    // // this.mRoleData.PosY = destCoord.y;
                }
            });
        }
    }
    /** 随机移动的机器人 */
    class RobotRandomMove extends RobotBase {
        /**
         * 登录到UserLoginServer与GameServer
         * @param account 使用的帐号,密码同帐号
         */
        loginToServer(account) {
            const _super = name => super[name];
            return __awaiter(this, void 0, void 0, function* () {
                const ret = yield _super("loginToServer").call(this, account);
                if (ret) {
                    // 开始随机移动的逻辑
                    this.randomMove();
                }
                return ret;
            });
        }
        /**
         * 随机移动
         */
        randomMove() {
            return __awaiter(this, void 0, void 0, function* () {
                while (!this.mStoped) {
                    const waitTime = 4000 + Math.random() * 3000; // 随机等待一定的时间
                    yield sleep(waitTime); // 等待
                    const levelSetting = tableMgr.levelSettingTable.Find(this.mRoleData.MapCode);
                    const sceneId = levelSetting.PicCode;
                    const mapData = yield getMapData(this.mRoleData.MapCode, sceneId); // 获取关卡信息
                    // 随机一个坐标点
                    // 服务器坐标
                    const startCoord = new Laya.Point(this.mRoleData.PosX, this.mRoleData.PosY);
                    const offset = moveRange * 100;
                    const destCoord = new Laya.Point(this.mOrgCoord.x + Math.floor((Math.random() - 0.5) * offset), this.mOrgCoord.y + Math.floor((Math.random() - 0.5) * offset));
                    // 转换成格子坐标
                    const start = mapData.toGridCoordFrom2D(startCoord);
                    const end = mapData.toGridCoordFrom2D(destCoord);
                    const moveComponent = { Coordinate: startCoord, SpriteType: EActorType.LocalPlayer };
                    // 查找路径
                    const path = mapData.findPath(moveComponent, start, end);
                    if (null == path || path.length <= 0) {
                        continue;
                    }
                    // 给服务器发送移动消息
                    const rolePathString = Logic.Level.transPathToString(path);
                    this.sendMsgToGS(Net.sendMoveToMsg, sceneId, startCoord, destCoord, GActions.Run, ExtActionTypes.EXTACTION_NONE, rolePathString);
                    // console.log("(%s) 机器人从(%d,%d)移动到(%d,%d)", this.mAccount, startCoord.x, startCoord.y, destCoord.x, destCoord.y);
                    // 把自己直接跳到目标点
                    this.mRoleData.PosX = destCoord.x;
                    this.mRoleData.PosY = destCoord.y;
                }
            });
        }
        _frameLoop() {
        }
    }
    const _webTcp = null; // 拦截消息发送用的socket
    let _loginServerUrl = null; // loginServer的地址
    let _gameServerUrl = null; // GameServer的地址
    function _robotType(account, robotType) {
        return __awaiter(this, void 0, void 0, function* () {
            if (robotType === EnumRobotType.MoveRobot) {
                return _robotRandomMove(account);
            }
            else if (robotType === EnumRobotType.FightRobot) {
                return _robotRandomFight(account);
            }
        });
    }
    /**
     * 使用指定的帐号登录机器人角色,并随机走动
     * @param loginName 使用的登录帐号,密码相同
     */
    function _robotRandomMove(account) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("=== 正在登录随机移动机器人(%s)", account);
            const robot = new RobotRandomMove();
            const ret = yield robot.loginToServer(account);
            if (ret) {
                console.log(" == 随机移动机器人(%s)登录成功!", account);
            }
            return ret;
        });
    }
    /**
     *   使用指定的帐号登录机器人角色,并随机战斗
     * @param account  使用的登录账号,密码相同
     */
    function _robotRandomFight(account) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("=== 正在登录随机战斗机器人(%s)", account);
            const robot = new RobotRandomFight();
            const ret = yield robot.loginToServer(account);
            if (ret) {
                console.log(" == 随机战斗机器人(%s)登录成功!", account);
            }
            return ret;
        });
    }
    /**
     * 自动登录,在主城自由走动的机器人
     */
    function robotRandomMove() {
        return __awaiter(this, void 0, void 0, function* () {
            let robotCount = 10; // 机器人数量
            const sRobotCount = getQueryString("robotCount");
            if (sRobotCount) {
                robotCount = parseInt(sRobotCount);
            }
            if (robotCount > 255) {
                console.error("指定的机器人数量(%d)不可以超过 255", robotCount);
                return;
            }
            const sMoveRange = getQueryString("moveRange");
            if (sMoveRange) {
                moveRange = parseInt(sMoveRange);
            }
            console.log("寻路范围: %d", moveRange);
            const sRobotType = getQueryString("robotType");
            if (sRobotType) {
                robotType = parseInt(sRobotType);
            }
            console.log("机器人类型: %d", robotType);
            _loginServerUrl = getWSUrl("ls", GameConfig.LoginServerUrl);
            _gameServerUrl = getWSUrl("gs", GameConfig.DevGameServer);
            console.log("url: " + window.location.search);
            console.log("Robot's count: " + robotCount);
            console.log("loginServer url: " + _loginServerUrl);
            console.log("gameServer url: " + _gameServerUrl);
            let robotStartIndex = 0; // 机器人登录的起始帐号
            const sStartIndex = getQueryString("startIndex");
            if (sStartIndex) {
                robotStartIndex = parseInt(sStartIndex);
            }
            else {
                console.error("没有指定有效的机器人起始帐号,如: \
            \n http://192.168.88.66:8901/bin/index.html?startIndex=1&robotCount=50&moveRange=6&robotType=1&ls=192.168.88.66:4412&gs=192.168.88.66:4404 \
            \n startIndex 机器人起始帐号 \
            \n robotCount 机器人数量 \
            \n moveRange 机器人的随机移动范围,以机器上线时的坐标为中心 \
            \n robotType 机器人类型  0 基础登录机器人 1 随机移动机器人 2 随机战斗机器人 \
            \n ls LoginServer的websocket地址 \
            \n gs GameServer的websocket地址 \
            \n注：ls与gs配置可以省略,默认会从config.js中读取");
                return;
            }
            console.log("Robot's 起始帐号: " + robotStartIndex);
            console.log("登录到的服务器: %s", GameConfig["DevGameServer"]);
            let loginedRobot = 0;
            // 启动每个机器人,目前是逐个登录
            for (let index = robotStartIndex, endIndex = robotStartIndex + robotCount; index < endIndex;) {
                // const ret = await _robotRandomMove("robot" + index);
                const ret = yield _robotType("robot" + index, robotType);
                if (ret) {
                    loginedRobot++;
                    ++index;
                }
            }
            console.log("%c********** (%d)个机器人登录成功, 帐号区间 robot(%d ~ %d)! **********", "color:blue", loginedRobot, robotStartIndex, robotStartIndex + robotCount);
        });
    }
    AutoTest.robotRandomMove = robotRandomMove;
})(AutoTest || (AutoTest = {}));
//# sourceMappingURL=autoTask.js.map