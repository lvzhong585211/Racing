var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var MyUI;
(function (MyUI) {
    var LocalStorage = Laya.LocalStorage;
    var Log = Global.Log;
    // @desc 登录界面
    class LoginView extends ui.login.LoginViewUI {
        constructor() {
            super();
            this.gameServerList = null; // GameServer的列表信息
            this.QueryGameServerList();
            // to do ... 限制输入内容. 下面的逻辑不知道为什么不能起作用 *&&%#$
            this.textAccount.restrict = "0123456789_.[]{}";
            // 读取本地存储的上次输入的账号与密码
            const account = LocalStorage.getItem("ui_Account");
            const pwd = LocalStorage.getItem("ui_pwd");
            if (account && pwd) {
                this.textAccount.text = account;
                this.textPassward.text = pwd;
            }
            this.btnLogin.clickHandler = new MyUI.OpIntervalHandler(1000, this, this.OnLoginBtnClick);
            this.btnSpeedy.clickHandler = new MyUI.OpIntervalHandler(1000, this, this.OnSpeedyBtnClick);
            this.btnRegister.clickHandler = new MyUI.OpIntervalHandler(1000, this, this.OnRegisterBtnClick);
        }
        /**
         * 获取GameServer的列表
         */
        QueryGameServerList() {
            if (GameConfig["DevGameServer"] != null) { // 开发版本中优先使用本地服务器
                Log.Info(` ===== 正在使用本地 GameServer(${GameConfig["DevGameServer"]}) 服务器,仅供开发用 =====`);
                // 填充开发用的服务器信息
                const devServerInfo = new GameServerInfo();
                devServerInfo.id = 1;
                devServerInfo.name = "DevGameServer";
                devServerInfo.state = EServerState.Open;
                devServerInfo.url = GameConfig["DevGameServer"];
                gameIns.gameState.serverInfo = devServerInfo;
                return;
            }
            const httpQuery = `${GameConfig.ListServerUrl}/serverlist`;
            // 获取GameServer服务器列表
            const xhr = new Laya.HttpRequest();
            xhr.http.timeout = 5000; // 5秒超时
            xhr.once(Laya.Event.COMPLETE, this, (data) => {
                const serverListObj = JSON.parse(data);
                this.gameServerList = serverListObj; // new Array<GameServerInfo>();
                if (!this.gameServerList || this.gameServerList.length === 0) {
                    Log.Error("server list is empty!!!");
                    return;
                }
                let selectedServer;
                const sServerID = LocalStorage.getItem("gameServerID");
                if (sServerID) { // 选择上次登录的服务器
                    const nServerID = parseInt(sServerID);
                    selectedServer = this.gameServerList.find(value => value.id === nServerID);
                }
                if (!selectedServer) {
                    // 本地没有保存的上次登录服务器ID，则默认选择第一个服务器作为本次登录的服务器
                    // 以后可能会根据服务器状态，比如默认选择推荐服或新开的服
                    selectedServer = this.gameServerList[0];
                }
                gameIns.gameState.serverInfo = selectedServer;
                // to do ... 更新服务器列表界面
            });
            xhr.on(Laya.Event.ERROR, this, (err) => {
                Log.Error(`请求服务器列表失败(err= ${err})`);
                Global.Log.Assert(!this.destroyed);
                // 1秒再次重试
                Laya.timer.once(1000, this, () => {
                    xhr.send(httpQuery, "", "get", "text");
                });
            }); // 有错误,再次发送吧.
            // 发送获取列表的请求
            xhr.send(httpQuery, "", "get", "text");
        }
        /**
         * 获取要连接的GameServer的url
         */
        getGameServerUrl() {
            if (!gameIns.gameState.serverInfo) {
                return null;
            }
            return gameIns.gameState.serverInfo.url;
        }
        /**
         * @desc 点击登录按钮时调用
         */
        OnLoginBtnClick() {
            const account = this.textAccount.text;
            const pwd = this.textPassward.text;
            // 帐号或密码为空检查
            if (!(account && account !== "" && pwd && pwd !== "")) {
                uiMgr.hintText(Loca.getLang("5777")); // 请输入正确的用户名和密码
                return;
            }
            // 连接到LoginServer,以拿到登录到GameServer的Token
            this.LoginServerNow(account, pwd);
            // 保存帐号、密码、登录的服务器ID到本地. to do ... 也许以后要加密?
            LocalStorage.setItem("ui_Account", account);
            LocalStorage.setItem("ui_pwd", pwd);
            LocalStorage.setItem("gameServerID", gameIns.gameState.serverInfo.id.toString());
        }
        /**
         * @desc 连接到登录服务器,验证帐号密码,拿到登录GameServer的Token
         */
        LoginServerNow(account, pwd) {
            return __awaiter(this, void 0, void 0, function* () {
                // 注意: 下面的代码实现是异步执行的!!!
                // 获取要连接的GameServer
                const gameServerUrl = this.getGameServerUrl();
                if (gameServerUrl == null) { // 没有服务器列表
                    uiMgr.hintText(ConfigLoca.UI_CONNECT_SERVERLIST_FAILED);
                    return;
                }
                // 显示连接服务器的转圈界面
                uiMgr.showNetWaiting();
                try {
                    // 连接到 LoginServer
                    let socketToLoginServer = new Net.Socket4Message();
                    const connectResult = yield socketToLoginServer.connectByUrl(GameConfig.LoginServerUrl);
                    if (!connectResult) {
                        // 显示连接LoginServer失败
                        uiMgr.hintText(ConfigLoca.UI_CONNECT_LOGINSERVER_FAILED);
                        return;
                    }
                    let msgType = EMessageType.CMD_INVALID;
                    // 发送登录消息到LoginServer
                    const msgLogin = new NetMsg.CToGS_Login();
                    if (account) { // 正常登录
                        msgLogin.Info = `${Global.VersionInfo.appVersion}:${account}:${pwd}`; // 拼接字符串-- 版本号:帐号:密码
                        msgType = EMessageType.LS_LOGIN_ON;
                    }
                    else { // 快速登录                    
                        msgLogin.Info = `${Global.VersionInfo.appVersion}`; // 拼接字符串-- 版本号
                        msgType = EMessageType.LS_LOGIN_SPEEDY_LOGIN;
                    }
                    socketToLoginServer.sendString(msgType, msgLogin.Info);
                    // 等待返回消息
                    const retData = yield socketToLoginServer.WaitStringMessage(msgType, 3);
                    socketToLoginServer.close(); // 关闭到LoginServer的连接     
                    socketToLoginServer = null;
                    if (retData != null) {
                        // 拿到了登录Token
                        const dataFields = retData.split(":");
                        // 错误码到提示的影射
                        const errMap = {
                            "-1": ConfigLoca.UI_LOGIN_USERWRONG,
                            "-2": ConfigLoca.UI_LOGIN_VERSIONWRONG,
                            "-3": ConfigLoca.UI_LOGIN_USER_NOTEXIST,
                            "-4": ConfigLoca.UI_LOGIN_USER_NOTEXIST_PLATFORM,
                            "-100": ConfigLoca.UI_LOGIN_TOKEN_TIMEOUT // 登录口令过期
                        };
                        const err = errMap[dataFields[0]];
                        if (err) { // 有错误,输出提示
                            uiMgr.hintText(err);
                        }
                        else { // 登录成功
                            if (dataFields[3] === "2") { // 保存快速登录账号
                                LocalStorage.setItem("ui_SpeedyUserName", dataFields[0]);
                                LocalStorage.setItem("ui_SpeedyPassward", dataFields[1]);
                            }
                            const userId = dataFields[0];
                            const userName = dataFields[1];
                            const userToken = dataFields[2];
                            if (dataFields.length === 7) {
                                // 充值服务器地址
                                gameIns.chargeServerUrl = `${dataFields[4]}:${dataFields[5]}:${dataFields[6]}`;
                            }
                            // 获取到登录GameServer的Token,连接到GameServer.
                            const loginRet = yield gameIns.loginToGameServer(gameServerUrl, userId, userName, userToken, (errInfo) => {
                                uiMgr.hintText(errInfo); // 提示错误
                            });
                            if (!loginRet)
                                return;
                            // 请求角色列表
                            const nServerID = gameIns.gameState.serverInfo.id;
                            const roleQueryMsg = `${userId}:${nServerID}`;
                            gameIns.sendStringToGS(EMessageType.CMD_SECOND_PASSWORD_CHECK_STATE, roleQueryMsg);
                            gameIns.sendStringToGS(EMessageType.CMD_ROLE_LIST, roleQueryMsg);
                        }
                    }
                    else {
                        // 超时?没有拿到登录Token
                        uiMgr.hintText(ConfigLoca.UI_CONNECT_LOGINSERVER_FAILED);
                    }
                    if (socketToLoginServer) {
                        socketToLoginServer.close();
                        socketToLoginServer = null;
                    }
                }
                finally {
                    // 确保会关闭掉连接界面
                    uiMgr.hideNetWaiting();
                }
            });
        }
        /**
         * @desc 当快速登录按钮被点击时调用
         */
        OnSpeedyBtnClick() {
            const account = LocalStorage.getItem("ui_SpeedyUserName");
            const pwd = LocalStorage.getItem("ui_SpeedyPassward");
            // 连接到LoginServer,以拿到登录到GameServer的Token
            this.LoginServerNow(account, pwd);
        }
        /**
         * @desc 当注册按钮被点击时调用
         */
        OnRegisterBtnClick() {
            // to do ...
        }
        destroy(destroyChild) {
            this.imgBg.dispose();
            super.destroy(destroyChild);
        }
    }
    MyUI.LoginView = LoginView;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=LoginView.js.map