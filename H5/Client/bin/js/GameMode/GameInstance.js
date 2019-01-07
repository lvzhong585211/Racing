var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var GameMode;
(function (GameMode) {
    var Log = Global.Log;
    /**
     * 保存GameInstance相关的数据,方便管理数据与复制.
     * 注: 对应原来的Session类
     */
    class GameState {
        constructor() {
            this.UserIsAdult = 0; // 用户是否成人
            this.RoleRandToken = -1; // 游戏服务器的随机令牌
            this.RoleID = -1; // 当前的角色ID
            this.RoleSex = 0; // 角色性别
            this.RoleName = ""; // 角色名称
            this.GmCommandState = 1; // GM命令标记
            /** 角色是否已经正式登陆 */
            this.PlayGame = false;
            /** 是否存在二级密码 */
            this.HasSecondPassword = -1;
            /** 是否需要验证二级密码 */
            this.NeedVerifySecondPassword = -1;
        }
        /**
         * 查找对应NPCID的任务状态
         * @param npcID 指定要获取任务状态的NPCID
         */
        getNPCTaskState(npcID) {
            if (this.roleData.NPCTaskStateList) {
                for (let index = this.roleData.NPCTaskStateList.length - 1; index >= 0; --index) {
                    const taskState = this.roleData.NPCTaskStateList[index];
                    if (taskState.NPCID === npcID)
                        return taskState;
                }
            }
            return null;
        }
    }
    /** 是否实现了帧调用接口 */
    function isFrameMoveImp(value) {
        return value.frameMove !== undefined;
    }
    GameMode.isFrameMoveImp = isFrameMoveImp;
    /** 是否实现了慢速帧调用接口 */
    function isSlowUpdateImp(value) {
        return value.slowUpdate !== undefined;
    }
    GameMode.isSlowUpdateImp = isSlowUpdateImp;
    /**
     * @desc 游戏管理器,总入口
     */
    class GameInstance extends GameMode.ModeManager {
        constructor() {
            super();
            this._chargeServerUrl = null; // 充值服务器的地址
            this.mPersistentLevel = null; // 持久关卡,同时只能存在一个,即加载一个新的PersistentLevel时会卸载当前的.
            this.mPersistentLevelUrl = null; // 持久关卡的路径
            this.mLevelLoadCount = 0; // 保存当前关卡的加载计数.注:只有当关卡计数相等时才表示加载成功的关卡有效,否则应该丢弃掉
            this.mGameState = new GameState(); // 保存GameInstance相关的数据
            this.mTcpToGameServer = null; // 到GameServer的Tcp连接
        }
        set chargeServerUrl(value) {
            this._chargeServerUrl = value;
        }
        /**
         * @desc 初始化本实例
         */
        build() {
            if (!super.build())
                return false;
            // 实例化管理器和全局数据
            this.mUIMgr = new MyUI.UIManager();
            this.mTableMgr = new tables.DataTableManager();
            this.mAtlasMgr = new MyUI.AtlasManager();
            Global.Data = new Data.GData();
            Super.GData = new Data.SuperData();
            this.mParticlesManager = new Logic.ParticlesManager();
            // 赋值全局引用对象
            gameIns = this;
            uiMgr = this.mUIMgr;
            tableMgr = this.mTableMgr;
            atlasMgr = this.mAtlasMgr;
            windowMgr = this.mUIMgr.windowMgr;
            particleMgr = this.mParticlesManager;
            return true;
        }
        /**
         * 返回游戏状态(数据)
         */
        get gameState() {
            return this.mGameState;
        }
        /**
         * @desc 重载此函数,以便创建传入类型的模块实例
         * @param eGameMode
         */
        createMode(eGameMode) {
            let modeToCreate = null;
            switch (eGameMode) {
                case EnumGameMode.Logo:
                    modeToCreate = new GameMode.LogoMode();
                    break;
                case EnumGameMode.Loading:
                    modeToCreate = new GameMode.LoadingMode();
                    break;
                case EnumGameMode.Login:
                    modeToCreate = new GameMode.LoginMode();
                    break;
                case EnumGameMode.Selector:
                    modeToCreate = new GameMode.SelectorMode();
                    break;
                case EnumGameMode.Creator:
                    modeToCreate = new GameMode.CreatorMode();
                    break;
                case EnumGameMode.Playing:
                    modeToCreate = new GameMode.PlayingMode();
                    break;
                case EnumGameMode.RobotTesting:
                    modeToCreate = new GameMode.RobotTesting();
                    break;
            }
            return modeToCreate;
        }
        /**
         * @desc 1秒种最多执行5次的更新函数.适合不及时的逻辑,如AI决策等.
         * @param elapsedTime 上次调用以来经过的时间
         */
        slowUpdate(elapsedTime) {
            super.slowUpdate(elapsedTime);
            if (this.mUIMgr) { // UI的慢速帧调用
                this.mUIMgr.slowUpdate(elapsedTime);
            }
        }
        /**
         * @desc 每帧调用
         * @param elapsedTime 上次调用以来经过的时间
         * 重载
         */
        frameMove(elapsedTime) {
            super.frameMove(elapsedTime);
            if (this.mUIMgr) { // UI的帧调用
                this.mUIMgr.frameMove(elapsedTime);
            }
        }
        /**
         * 加载持久关卡,这种关卡同时只能存在一个,加一个新的会卸载当前的.
         * 一般用于主关卡,正常切换.
         * @param url 指定要加载的关卡资源路径
         * @param progress 资源加载进度回调，回调参数值为当前资源加载的进度信息(0-1)。
         * @param bForceLoad 是否强制加载，true表示即使当前场景和要加载的是同一个，也重新进行加载
         * 注: 这个函数因为是异步执行的,所以可能会被重入,即上一次执行因为加载慢还没执行完成,下一次调用又进来了.
         * 注: 如果需要依赖场景加载成功才能进行下一步处理,必须通过判定返回值为true来决定,不可以通过gameIns.persistentLevel不为null来判定,因为场景是异步加载的,很可能不是同一个场景.
         */
        loadPersistentLevel(url, progress, bForceLoad = false) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.mPersistentLevelUrl === url) { // 场景已经存在了，不需要再次加载
                    return true;
                }
                // 场景资源url
                url = Global.getMapPath(url);
                // 判断当前场景和要加载的场景是否同一个，如果是同一个则不进行重新加载
                if (!bForceLoad && this.mPersistentLevel) {
                    if (this.mPersistentLevel.url.indexOf(url) !== -1) {
                        return true;
                    }
                }
                const tryEnter = Global.ReEnterCheck.tryEnter;
                const leave = Global.ReEnterCheck.leave;
                if (!tryEnter(this.loadPersistentLevel, false)) { // 检测上一个关卡是否正在加载
                    Laya.loader.cancelLoadByUrl(this.mPersistentLevelUrl); // 取消当前正在加载的关卡
                    leave(this.loadPersistentLevel, false);
                    tryEnter(this.loadPersistentLevel, false);
                }
                this.unloadPersistentLevel(); // 释放掉旧的持久关卡            
                const levelLoadCount = ++this.mLevelLoadCount; // 场景加载版本号++,并记录到临时变量中,以后加载完成后校验
                let loadingLevel = null;
                this.mPersistentLevelUrl = url;
                const loadPromise = new Promise((resolve, reject) => {
                    // 构造加载资源完成的回调函数. retData的具体内容见 Laya.loader.create() 中的说明                
                    const completeFun = () => {
                        resolve();
                    };
                    this.mPersistentLevel = loadingLevel = Laya.loader.create(url, Laya.Handler.create(null, completeFun), progress);
                });
                yield loadPromise; // 等待加载完成
                if (levelLoadCount !== this.mLevelLoadCount) { // 这个加载已经无效了,可能因为新的关卡加载已经开始了. 注: 这个检查必须放在最前面,因为无论关卡是否加载成功,如果我们不需要它了,都要释放掉它.
                    // to do ... 释放占用的资源. 纹理?模型 等?
                    // 这里必须使用loadingLevel来释放,因为this._persistentLevel可能已经被设置成新的关卡了
                    loadingLevel.destroy();
                    loadingLevel = null;
                    leave(this.loadPersistentLevel, false);
                    return false; // 返回失败
                }
                else if (!loadingLevel.loaded) {
                    Global.Log.Error(`关卡(${url})加载失败!`);
                }
                else {
                    // 添加到舞台                
                    Laya.stage.addChild(this.mPersistentLevel);
                    Laya.stage.setChildIndex(this.mPersistentLevel, 0); // 设置到最底层,以免挡住UI
                    if (Laya.stage.frameRate !== Laya.Stage.FRAME_FAST) {
                        // 由于引擎有Bug,如果赶巧到  var isDoubleLoop=(this._renderCount % 2===0); 场景会崩溃,所以加载场景后前两帧一定要切换成快速模式
                        const oldFrameMode = Laya.stage.frameRate;
                        Laya.stage.frameRate = Laya.Stage.FRAME_FAST;
                        Laya.stage.frameOnce(2, null, () => Laya.stage.frameRate = oldFrameMode); // 2帧后再还原回来!
                    }
                }
                leave(this.loadPersistentLevel, false);
                return true;
            });
        }
        /**
         * 返回当前的持久关卡,有可能为null
         * 注: 不可以在外面直接删除此对象,如调用 destroy() 函数
         */
        get persistentLevel() {
            return this.mPersistentLevel;
        }
        /**
         * 手动卸载掉当前的持久关卡
         */
        unloadPersistentLevel() {
            if (!this.mPersistentLevel) {
                return;
            }
            // to do ... 释放旧场景占用的资源,如图片啊?模型啊,什么的...
            this.mPersistentLevel.destroy();
            this.mPersistentLevel = null;
            this.mPersistentLevelUrl = null;
        }
        /** 实现对内在泄漏的检测。注：这发生在模块切换时 */
        checkMemoryLeak() {
            let haveMemoryLeak = 0;
            haveMemoryLeak |= Global.GroupProgress.checkMemoryLeak() ? 1 : 0;
            return haveMemoryLeak !== 0;
        }
        /**
         * 异步登录到给定的GameServer
         * @param gsUrl 指定要连接到的GameServer
         * @param userId 用户Id
         * @param userName 用户名称
         * @param userToken 用户令牌
         * @param onError 当有错误发生时使用的回调. onError(err:string)
         */
        loginToGameServer(gsUrl, userId, userName, userToken, onError) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.mTcpToGameServer) {
                    Log.Assert(false, "已经存在一个到GameServer的连接!!!");
                    return false;
                }
                Global.ReEnterCheck.tryEnter(this.loginToGameServer);
                let errInfo = null;
                const webTcp = new Net.Socket4Message();
                do {
                    // 连接到GameServer
                    const connectRet = yield webTcp.connectByUrl(gsUrl);
                    if (!connectRet) {
                        errInfo = ConfigLoca.UI_CONNECT_GS_FAILED;
                        break;
                    }
                    this.mGameState.UserId = userId;
                    this.mGameState.UserName = userName;
                    this.mGameState.UserToken = userToken;
                    // 偿试登录
                    let loginInfo = `${userId}:${userName}:${userToken}:${this.mGameState.RoleRandToken}:${Global.VersionInfo.appVersion}:${this.mGameState.UserIsAdult}:`;
                    loginInfo = Logic.KuaFuLoginManager.GetKuaFuLoginString(loginInfo); // 追加跨服登录信息
                    loginInfo = `${loginInfo}::-1`;
                    // 发送登录消息
                    webTcp.sendString(EMessageType.CMD_LOGIN, loginInfo);
                    // 等待登录返回
                    const loginRet = yield webTcp.WaitStringMessage(EMessageType.CMD_LOGIN, 2000);
                    if (loginRet == null) {
                        errInfo = ConfigLoca.UI_LOGIN_GS_TIMEOUT;
                        break;
                    }
                    const dataFields = loginRet.split(":");
                    let randToken = -1;
                    if (dataFields.length > 0) {
                        randToken = parseInt(dataFields[0]);
                    }
                    if (randToken === StdErrorCode.Error_Token_Expired2) {
                        errInfo = ConfigLoca.UI_LOGIN_TOKEN_TIMEOUT; // 登陆游戏服务器时失败, 已经超过了口令最长有效时间, 请退出游戏重新进入...
                        break;
                    }
                    else if (StdErrorCode.Error_Connection_Closing2 === randToken || StdErrorCode.Error_Connection_Closing === randToken) {
                        errInfo = ConfigLoca.UI_LOGIN_GS_USEREXIST; // 登陆的用户名已经在线，请稍后重新刷新登陆
                        break;
                    }
                    else if (StdErrorCode.Error_Version_Not_Match2 === randToken) {
                        errInfo = ConfigLoca.UI_LOGIN_VERSIONWRONG; // 登陆游戏服务器时失败, 客户端的版本太旧，请更新客户端后再重新登陆
                        break;
                    }
                    else if (-10 === randToken) {
                        errInfo = ConfigLoca.UI_LOGIN_GS_USERBAN; // 登陆游戏服务器时失败, 你已经被游戏管理员禁止登陆
                        break;
                    }
                    else if (StdErrorCode.Error_Server_Connections_Limit === randToken) {
                        errInfo = ConfigLoca.UI_LOGIN_GS_USERFULL; // 当前服务器在线爆满，您可登录其他服务器进行游戏
                        break;
                    }
                    else if (randToken < 0) {
                        // 其它失败原因
                        errInfo = Global.String.Format(ConfigLoca.UI_LOGIN_GS_FAILED, randToken);
                        break;
                    }
                    // 登录成功
                    this.mGameState.GmCommandState = Number(dataFields[2]);
                    this.mGameState.RoleRandToken = randToken;
                    webTcp.onMsg(EMessageType.CMD_SOCKET_DISCONNECT, this, this.onDisconnectFromGameServer); // 网络断开消息
                    webTcp.onMsg(EMessageType.CMD_SOCKET_DEFAULT, this, this.onRecvGameServerMsgPacket); // 监听所有的网络消息
                    this.mTcpToGameServer = webTcp;
                    // 发送版本信息
                    const verMsg = `${this.mGameState.RoleID}:2:20181230:20181230`; // 版本信息暂时没有用,先随便填写吧
                    this.sendStringToGS(EMessageType.CMD_SPR_PUSH_VERSION, verMsg);
                    // 开始向服务器定时发送心跳消息
                    Laya.timer.loop(60 * 1000, this, this.sendHeartToGS);
                    Global.ReEnterCheck.leave(this.loginToGameServer);
                    return true;
                } while (false);
                Global.ReEnterCheck.leave(this.loginToGameServer);
                if (errInfo != null) { // 有错误发生
                    webTcp.close();
                    if (onError)
                        onError(errInfo);
                    return false;
                }
            });
        }
        /**
         * 向服务器发送心跳
         */
        sendHeartToGS() {
            const clientHeart = new NetMsg.SCClientHeart({
                RoleID: this.gameState.RoleID,
                RandToken: this.gameState.RoleRandToken,
                Ticks: 0,
                ReportCliRealTick: Date.now(),
            });
            this.sendDataToGS(EMessageType.CMD_SPR_CLIENTHEART, clientHeart);
        }
        /**
         * @desc    处理来自GameServer的消息
         * @param   uMsgType 指定要处理的消息类型
         * @param   msgData 指定消息包数据
         * @return 如果消息处理过了,返回true,否则返回false
         */
        onRecvGameServerMsgPacket(uMsgType, msgReader) {
            if (this.CurrentMode != null) {
                return this.CurrentMode.onRecvGameServerMsgPacket(uMsgType, msgReader);
            }
            return false;
        }
        /**
         * @desc  当与GameServer网络连接断开调用
         */
        onDisconnectFromGameServer() {
            Laya.timer.clear(this, this.sendHeartToGS); // 清除心跳发送
            this.mTcpToGameServer = null;
            // to do ... 自动重连?
            Log.Error("与GameServer的连接断开了,这个还没处理呢?");
        }
        /**
         * 返回与GameServer是否连接上了
         */
        isConnected() {
            return this.mTcpToGameServer != null;
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
         * 发送指定的字符串消息到GameServer
         * @param msgType
         * @param msgData
         */
        sendStringToGS(msgType, msgData) {
            this.mTcpToGameServer.sendString(msgType, msgData);
        }
        /**
         * 等待GameServer字符串类型的返回消息
         * @param msgType 指定要等待的消息Id
         * @param timeOut (可选)指定等待的超时时间
         * @return 返回值为null或对应的字符串消息内容
         * * 注: 此函数不应该同时大量使用,估计会有性能问题
         */
        WaitGSStringMessage(msgType, timeOut) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.mTcpToGameServer.WaitStringMessage(msgType, timeOut);
            });
        }
        /**
         * 等待GameServer字符串类型的返回消息
         * @param msgType 指定要等待的消息Id
         * @param timeOut (可选)指定等待的超时时间
         * @return 返回值为null或对应的字符串已经使用 : 分隔开的消息内容
         * * 注: 此函数不应该同时大量使用,估计会有性能问题
         */
        WaitGSStringMsgFields(msgType, timeOut) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.mTcpToGameServer.WaitStringMsgFields(msgType, timeOut);
            });
        }
        /**
         * 等待GameServer的返回消息
         * @param msgType 指定要等待的消息类型
         * @param timeOut 指定等待的超时时间(秒)
         * @return 如果指定了timeOut,超时时会返回 null,否则会返回接收到消息数据 Uint8Array
         * 注: 如果在等待时网络断开了,会返回 null
         * 注: 此函数不应该同时大量使用,估计会有性能问题
         */
        WaitMessage(msgType, timeOut) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.mTcpToGameServer.WaitMessage(msgType, timeOut);
            });
        }
        /**
         * 从GameServer服务器登出,如断开到GameServer的tcp连接等
         */
        logoutGameServer() {
            if (this.mTcpToGameServer) {
                Laya.timer.clear(this, this.sendHeartToGS); // 清除心跳发送
                this.mTcpToGameServer.close();
                this.mTcpToGameServer = null;
            }
        }
        /**
         * 获取字符串类型返回消息的数据数组
         * @param msgReader 包含消息数据内容的二进制对象
         * @return 返回值为拆分后的数据数组
         */
        getStringMsgFields(msgReader) {
            if (msgReader == null) {
                return null;
            }
            const sMsg = msgReader.rawstring();
            if (Global.String.IsNullOrWhiteSpace(sMsg)) {
                return null;
            }
            return sMsg.split(":");
        }
        /**
         * 向GS发送时间同步消息,并等待消息返回
         */
        TimeSynchronization() {
            return __awaiter(this, void 0, void 0, function* () {
                if (!this.mTcpToGameServer) {
                    return;
                }
                const strcmd = `${this.gameState.RoleID}:${TimeManager.now()}`;
                this.sendStringToGS(EMessageType.CMD_SYNC_TIME, strcmd);
                // 等待并解析同步时间消息
                const syncTimeInfo = yield this.WaitGSStringMsgFields(EMessageType.CMD_SYNC_TIME);
                const clientOldTime = parseInt(syncTimeInfo[1]); // 客户端发送时间同步消息时的时间(毫秒)
                const clientNowTime = TimeManager.now(); // 客户端的当前时间(毫秒)
                const serverTimeTicks = Long.fromString(syncTimeInfo[2]); // 服务器端时间(Ticks)
                const pingTime = (clientNowTime - clientOldTime) / 2; // 取得消息延迟,即本次同步时间的消息到服务器的时间(毫秒)
                let serverTime = serverTimeTicks.divide(10000).toNumber(); // 把Ticks转换成毫秒. ,见C#的DateTime.Ticks            
                serverTime = serverTime + pingTime; // 服务器时间加上消息发送的延迟时间. 注:这可能不太准,但在延迟不大的情况下,误差可以接受            
                const serverTimeOff = clientNowTime - serverTime; // 服务器时间减去本地时间
                TimeManager.syncServerTime(serverTimeOff);
            });
        }
    }
    GameMode.GameInstance = GameInstance;
})(GameMode || (GameMode = {}));
//# sourceMappingURL=GameInstance.js.map