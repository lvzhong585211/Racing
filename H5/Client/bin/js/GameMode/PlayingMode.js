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
    //#region =============== 一些简化调用的方法，方便外部使用 ==============================
    /**
     * 获取当前关卡 </br>
     * 简化对MainLevel的访问
     */
    function getMainLevel() {
        return PlayingMode.instance.mainLevel;
    }
    GameMode.getMainLevel = getMainLevel;
    /**
     * 获取本地玩家（主角Player）</br>
     * 简化对LocalPlayer的访问
     */
    function getLocalPlayer() {
        return PlayingMode.instance.localPlayer;
    }
    GameMode.getLocalPlayer = getLocalPlayer;
    /**
     * 获取本地玩家的控制器 </br>
     * 简化对LocalPlayerController的访问
     */
    function getLocalPlayerController() {
        return PlayingMode.instance.localPlayerController;
    }
    GameMode.getLocalPlayerController = getLocalPlayerController;
    //#endregion =========================================================================
    /**
     * 游戏中模块. 打怪,做任务,进出副本等.
     */
    class PlayingMode extends GameMode.ModeBase {
        constructor() {
            super(EnumGameMode.Playing);
            this.mMainLevel = null; // 当前的关卡
            this.mLocalPlayer = null; // 本地玩家实例.注:本地玩家某些时候可能跨越关卡存在,如任务地图切换并不会导致本地玩家重新创建,但进出副本会
            this.mPlayerCamera = null; // 跟随玩家的摄像机
            this.mMainView = null; // 主界面
            this.mNetMsgPart = null; // PlayingMode网络消息处理部分
            this.mNextTimeToSyncLocalPos = 2; // 下一次向GameServer同步本地玩家的位置的时间
            this.mIsLoadingLevel = false; // 是否正在切换关卡
            this.mOnlineSecondTicks = 0; // 在线时长的Tick（秒）
            Global.Log.Assert(PlayingMode.mInstance == null);
            this.mNetMsgPart = new GameMode.PlayingMode_NetMsg();
            this.mNetMsgPart.registerNetMsgHandler(this);
            PlayingMode.mInstance = this;
        }
        /** 返回全局实例 */
        static get instance() { return PlayingMode.mInstance; }
        /** 获取3D主摄像机 */
        static getMainCamera() { return PlayingMode.mInstance.mPlayerCamera; }
        /** 返回当前关卡的实例 */
        get mainLevel() { return this.mMainLevel; }
        /** 返回主界面的实例 */
        get mainView() { return this.mMainView; }
        /** 返回本地玩家的实例 */
        get localPlayer() { return this.mLocalPlayer; }
        /** 返回本地玩家的控制器 */
        get localPlayerController() {
            const controller = this.mLocalPlayer.getPlayerController();
            if (controller instanceof Logic.ALocalPlayerController)
                return controller;
            else
                return null;
        }
        Build(preModule, param) {
            return __awaiter(this, void 0, void 0, function* () {
                // 显示Loading界面
                yield MyUI.LoadingView.Show();
                // 加载UI界面
                yield this.initGameInterface();
                // 加载关卡
                yield this.startChangeLevel(gameIns.gameState.roleData.MapCode, false);
                // 进入游戏只请求一次的消息
                this.requestMessageWhenEnterGame();
                // 注册所有的事件侦听器
                this._registerEventListeners();
                // 隐藏Loading界面
                MyUI.LoadingView.Hide();
                // 调试代码
                if (SystemConfig.debugShowInnerId) {
                    MyUI.ShowActorIdSprite.Instance.show();
                }
                return true;
            });
        }
        /**
         * 进入游戏只请求一次的消息放在这里
         */
        requestMessageWhenEnterGame() {
            Net.sendGetHuoDongData(); // 请求一次活动数据
            Net.sendGetMeditateTimeInfoCmd();
            // 重登或重连,服务器潜心修炼状态总是会被清除，客户端也清除，包括换角色的情况
            Net.sendStartMeditateCmd(0);
        }
        /**
         * 每次切换完关卡都需要请求一次的消息放在这里
         */
        requestMessageAfterChangeLevel() {
            Net.startPlayGame(); // 通知服务器,加载关卡结束,可以开始游戏逻辑了
        }
        /**
         * 初始化游戏的界面
         */
        initGameInterface() {
            return __awaiter(this, void 0, void 0, function* () {
                // 初始化主界面
                this.mMainView = new MyUI.MainView();
                uiMgr.addChildToView(this.mMainView);
                // 实例化摇杆控制器
                // Laya.stage.addChild(new MyUI.RockerView(Laya.stage));
                // 实例化伤害数字的管理器
                MyUI.DamageHudManager.create();
            });
        }
        /**
         * 注册事件侦听器
         */
        _registerEventListeners() {
            gameEventBus.focusedActorChanged.on(this, this._onActorSelected); // 角色选中处理
            gameEventBus.actorDeath.on(this, this._onActorDeath); // 角色死亡处理
        }
        /**
         * 取消注册的事件侦听器
         */
        _unregisterEventListeners() {
            gameEventBus.focusedActorChanged.off(this, this._onActorSelected); // 角色选中处理
            gameEventBus.actorDeath.off(this, this._onActorDeath); // 角色死亡处理
        }
        /**
         * 场景中的角色选中处理
         * @param nActorID 角色ID
         */
        _onActorSelected(nActorID) {
            if (this.mMainLevel == null) {
                return;
            }
            const actor = this.mMainLevel.findCharacter(nActorID);
            if (actor != null) {
                this.mainView.showActorHead(actor);
            }
            else {
                this.mainView.hideActorHead(nActorID);
            }
        }
        /**
         * 角色死亡处理
         * @param nActorID 角色ID
         */
        _onActorDeath(nActorID) {
            if (this.mMainLevel) {
                this.mMainLevel.delActor(nActorID);
            }
            // TODO: 等小地图做完后，需要注册gameEventBus.actorDeath或者在这里处理
            // 用来删除地图上的角色小点
        }
        /**
         * @desc    1秒种最多执行5次的更新函数.适合不及时的逻辑,如AI决策等.
         * @param elapsedTime 上次调用以来经过的时间(秒)
         */
        SlowUpdate(elapsedTime) {
            super.SlowUpdate(elapsedTime);
            // 关卡的更新
            if (!this.mIsLoadingLevel) {
                this.mMainLevel.slowUpdate(elapsedTime);
                // 暂时不需要了,因为服务器修改了同步算法
                // 每两秒向GameServer同步一次本地玩家的位置
                // if (this.localPlayer && gameIns.isConnected()) {
                //    this.mNextTimeToSyncLocalPos -= elapsedTime;
                //    if (this.mNextTimeToSyncLocalPos <= 0) {
                //        this.mNextTimeToSyncLocalPos = 2;   // 每两秒同步一次
                //        const coord = this.localPlayer.getCoordinate();
                //          Net.sendLocalPlayerPosition(coord, 0);
                //    }
                // }
            }
            // 在线时长的更新
            this.mOnlineSecondTicks += elapsedTime;
            if (this.mOnlineSecondTicks >= 1) {
                const nSecs = this.mOnlineSecondTicks | 0;
                gameIns.gameState.roleData.DayOnlineSecond += nSecs;
                this.mOnlineSecondTicks -= nSecs;
                gameEventBus.onlineTimeUpdated.event();
            }
        }
        /**
         * @desc    每帧被调用
         * @param   elapsedTime 上次调用以来经过的时间(秒)
         */
        FrameMove(elapsedTime) {
            super.FrameMove(elapsedTime);
            if (!this.mIsLoadingLevel) {
                this.mMainLevel.frameMove(elapsedTime);
                // 处理摄像机的跟随,必须在最后调用.即修改过主角的位置再调用.否则会出现抖动!
                this.mPlayerCamera.ProcessInput();
            }
        }
        /**
         * 开始切换关卡
         * @param nLevelID 要切换的关卡ID
         * @param bNeedLoading 是否需要显示Loading界面，默认为true
         */
        startChangeLevel(nLevelID, bNeedLoading = true) {
            return __awaiter(this, void 0, void 0, function* () {
                // 设置正在切换关卡
                this.mIsLoadingLevel = true;
                // 显示Loading界面
                if (bNeedLoading) {
                    yield MyUI.LoadingView.Show();
                }
                // 切换之前要先释放旧的关卡资源
                this.Reset();
                // 切换到新的关卡
                yield this.changeLevel(nLevelID);
                // 切换完关卡需要请求的消息
                this.requestMessageAfterChangeLevel();
                // 隐藏Loading界面
                if (bNeedLoading) {
                    MyUI.LoadingView.Hide();
                }
                // 重置地图切换标识
                this.mIsLoadingLevel = false;
                Global.Data.WaitingForMapChange = false;
                // 更新主界面雷达图显示
                if (this.mMainView) {
                    this.mMainView.updateRadarMap(nLevelID);
                }
            });
        }
        /**
         * 真正的切换关卡逻辑（加载关卡数据和图形显示）
         * @param nLevelID 指定要切换到的关卡Id
         */
        changeLevel(nLevelID) {
            return __awaiter(this, void 0, void 0, function* () {
                const roleData = gameIns.gameState.roleData;
                const groupProgress = new Global.GroupProgress([0.5, 0.5], MyUI.LoadingView.updateProgress); // 更新界面上的进度
                // 加载主界面UI资源
                const fnCalcProgress_0 = groupProgress.getProgressHandler(0);
                const fnCalcProgress_1 = groupProgress.getProgressHandler(1);
                // 加载关卡,同时关卡会加载主角
                const level = new Logic.Level(nLevelID);
                const levelLoadingPromise = level.load(fnCalcProgress_0);
                this.mMainLevel = level;
                // 加载本地玩家
                const playerPromise = this.loadLocalPlayer(fnCalcProgress_1);
                // 统一等待,提高加载效率及方便对结果进行处理
                const levelLoaded = yield levelLoadingPromise;
                const playerLoaded = yield playerPromise;
                if (levelLoaded && playerLoaded) {
                    // 设置本地玩家的朝向与位置
                    const localPlayerController = this.mLocalPlayer.getPlayerController();
                    this.mLocalPlayer.on(Logic.EActorEvent.coordChanged, this.mMainLevel, this.mMainLevel.onLeaderCoordChanged);
                    localPlayerController.setControlPosition(roleData.PosX, roleData.PosY);
                    localPlayerController.setGSDirection(roleData.RoleDirection);
                    // 开启本地玩家到GameServer的位置同步. 注:GameServer要求每隔一定时间同步一次本地玩家的位置
                    // 添加摄像机
                    const camera = new Logic.RPGCamera(undefined, 0.01, 100);
                    camera.fieldOfView = 35;
                    camera.Collides = false;
                    camera.Follow = false;
                    camera.FollowFixed = true;
                    camera.Zoom = true;
                    camera.InitialYaw = Laya.Utils.toRadian(45.0);
                    camera.InitialPitch = Laya.Utils.toRadian(-55.0);
                    camera.MinimumPitch = Laya.Utils.toRadian(-89.0);
                    camera.MaximumPitch = Laya.Utils.toRadian(-10.0);
                    camera.CameraDistance = 15.0;
                    camera.MinimalDistance = 4.0;
                    camera.MaximalDistance = 20.0;
                    camera.RelativeLookAtHeight = 0.65;
                    camera.CameraSensitivity = 40.0;
                    // camera.MoveSmoothness = 0.05;
                    // camera.Stiffness = 0.3;		// 控制摄像机平滑移动的速度
                    camera.MoveSmoothness = 0.0;
                    camera.Stiffness = 0.0; // 控制摄像机平滑移动的速度
                    // 跟随玩家                
                    camera.setTarget(this.mLocalPlayer);
                    camera.SetEnabled(true);
                    this.mMainLevel.getScene().addChild(camera);
                    this.mPlayerCamera = camera;
                }
                // 回收进度显示函数
                groupProgress.destroy();
            });
        }
        /**
         * 加载本地玩家
         * @param progress 用于更新加载进度
         */
        loadLocalPlayer(progress) {
            return __awaiter(this, void 0, void 0, function* () {
                const roleData = gameIns.gameState.roleData;
                // 填充玩家的状态数据
                const localPlayerState = {
                    Name: roleData.RoleName,
                    VSName: roleData.RoleName,
                    RoleID: roleData.RoleID,
                    Occupation: roleData.Occupation,
                };
                // 创建本地玩家到关卡中
                this.mLocalPlayer = this.mMainLevel.createPlayer(EActorType.LocalPlayer, localPlayerState, new Logic.ActorState.Life(roleData.LifeV, roleData.MaxLifeV), new Logic.ActorState.Magic(roleData.MagicV, roleData.MaxMagicV), new Logic.ActorState.Level(roleData.Level, roleData.ChangeLifeCount));
                const promise = this.mLocalPlayer.load(progress); // 加载角色
                // 设置玩家的控制器
                const localPlayerController = new Logic.ALocalPlayerController(); // 本地玩家的Controller
                localPlayerController.setOwner(this.mLocalPlayer);
                // 设置行为处理器
                localPlayerController.setActionPlayType(Logic.PlayerActionPlay);
                // to do ... 时装等道具列表的考虑?
                // 换装
                this.mLocalPlayer.changeEquip(roleData.GoodsDataList);
                return promise.then(() => {
                    this.mLocalPlayer.enableAniCache(false);
                    return true;
                }, () => { return false; });
            });
        }
        /**
         * @desc   处理来自GameServer的消息
         * @param  uMsgType 指定要处理的消息类型
         * @param  msgData 指定消息包数据
         * @return 如果消息处理过了,返回true,否则返回false
         */
        onRecvGameServerMsgPacket(uMsgtype, msgReader) {
            return this.mNetMsgPart && this.mNetMsgPart.processNetMsgHandler(uMsgtype, msgReader);
        }
        /**
         * 重置一些数据,方便在切换关卡时使用
         */
        Reset() {
            this.mLocalPlayer = null;
            if (this.mMainLevel) {
                this.mMainLevel.destroy();
                this.mMainLevel = null;
            }
            if (this.mPlayerCamera) {
                this.mPlayerCamera.destroy();
                this.mPlayerCamera = null;
            }
            Global.Data.OtherRoles.clear();
            Global.Data.OtherRolesByName.clear();
            Global.Data.SystemMonsters.clear();
        }
        /**
         * @desc 当模块被释放时调用
         */
        Release() {
            if (SystemConfig.debugShowInnerId) {
                MyUI.ShowActorIdSprite.Instance.hide();
            }
            // 销毁伤害数字管理器
            MyUI.DamageHudManager.destroy();
            this._unregisterEventListeners();
            if (this.mNetMsgPart) {
                this.mNetMsgPart.destroy();
                this.mNetMsgPart = null;
            }
            if (this.mMainView) {
                this.mMainView.destroy();
                this.mMainView = null;
            }
            this.Reset();
            super.Release();
            PlayingMode.mInstance = null;
        }
    }
    PlayingMode.mInstance = null; // 本类的唯一实例
    GameMode.PlayingMode = PlayingMode;
})(GameMode || (GameMode = {}));
//# sourceMappingURL=PlayingMode.js.map