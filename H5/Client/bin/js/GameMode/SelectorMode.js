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
     * 用来存储角色模型的组件
     */
    class RolesViewComponent extends Laya.Script {
        constructor() {
            super(...arguments);
            this.mActorsView = new Map();
        }
    }
    /**
     * @desc 选择角色模块
     */
    class SelectorMode extends GameMode.ModeBase {
        constructor() {
            super(EnumGameMode.Selector);
            this.DirectLogin = false; // 是否直接登录
        }
        Build(preModule, param) {
            return __awaiter(this, void 0, void 0, function* () {
                Log.Assert(param, "build selector mode must have param!!!");
                // 是否传入了默认选中的角色索引
                let focusIndex = 0;
                if (param instanceof MyUI.RoleSelectorItemDataList) {
                    this.m_dtRoleDataList = param; // 参数为角色列表数据
                }
                else { // 见：onRoleCreateMsg()函数
                    focusIndex = param.focusIndex;
                    this.m_dtRoleDataList = param.roleList;
                }
                this.m_dtRoleDataList.requestRoleUseGoodsData();
                // 加载场景与角色模型
                this._loadSceneAndActors();
                // 选择角色界面
                this.m_vewSelector = new MyUI.RoleSelectorView();
                this.m_vewSelector.on("EvtChangeToCreator", this, this.onChangeToCreatorMode);
                this.m_vewSelector.on(this.m_vewSelector.uiEventActorChanged, this, this.onSelectedActor);
                // 如果是从创建角色界面转过来的，则默认选中
                this.m_vewSelector.updateItemList(this.m_dtRoleDataList, focusIndex);
                uiMgr.addChildToView(this.m_vewSelector);
                return true;
            });
        }
        /**
         * 切换到创建角色模块
         */
        onChangeToCreatorMode() {
            gameIns.ChangeToMode(EnumGameMode.Creator, this.m_dtRoleDataList);
        }
        /**
         * 当选中一个角色时调用
         * @param index
         */
        onSelectedActor(roleID) {
            this.mActorsView.forEach(actorView => actorView.active = false); // 先隐藏所有的角色
            // 显示当前选择的角色
            const actorView = this.mActorsView.get(roleID);
            actorView.active = true;
            // this.actorsShow[index].play("Fly");  // Fly 动作目前导出有问题，先不用了
        }
        /**
         * 内部用函数,用来异步加载场景与角色
         */
        _loadSceneAndActors() {
            return __awaiter(this, void 0, void 0, function* () {
                let rolesViewComponent = null;
                // 查找已经存在的角色模型映射表
                if (gameIns.persistentLevel != null) {
                    rolesViewComponent = gameIns.persistentLevel.getScriptByType(RolesViewComponent);
                    if (rolesViewComponent) {
                        this.mActorsView = rolesViewComponent.mActorsView;
                    }
                }
                if (!this.mActorsView) {
                    this.mActorsView = new Map();
                }
                // 加载角色
                for (const roleData of this.m_dtRoleDataList.getRoleDataList()) {
                    if (this.mActorsView.get(roleData.roleID)) { // 已经存在了,不需要再次创建
                        continue;
                    }
                    const sklResName = Global.getSkeletonNameByOccupation(roleData.roleOccupation);
                    const sklUrl = Global.getSkeletonResPath(sklResName);
                    const nakeBodyRes = Global.getNakePartsList(roleData.roleOccupation);
                    const charView = new Logic.CharacterView(sklUrl, undefined, nakeBodyRes);
                    charView.setDefaultAni(Logic.Player.aniName_Stand); // 设置默认的动作为站立
                    this.mActorsView.set(roleData.roleID, charView);
                    charView.active = false;
                }
                // 加载角色创建场景 . to do ... 进度条? 注意: 这里并没有等待场景加载完成
                const loadSuccess = yield gameIns.loadPersistentLevel("xuanjue");
                if (!loadSuccess) {
                    return; // 加载场景失败,下面的逻辑不再处理了.
                }
                if (!rolesViewComponent) { // 存储共享模型的脚本还不存在,添加一个
                    rolesViewComponent = gameIns.persistentLevel.addScript(RolesViewComponent);
                    rolesViewComponent.mActorsView = this.mActorsView;
                }
                const playerRoot = gameIns.persistentLevel.getChildByName("PlayerRoot"); // PlayerRoot用来定位角色位置
                // 如果角色还不在场景中,则添加到场景中
                this.mActorsView.forEach((actorView) => {
                    if (!actorView.scene) {
                        playerRoot.addChild(actorView);
                        const localRotate = new Laya.Quaternion();
                        Laya.Quaternion.createFromYawPitchRoll(Math.PI, 0, 0, localRotate);
                        actorView.transform.localRotation = localRotate; // 需要转180度,因为美术导出角色的默认朝向Unity的Z轴,而LayaBox需要朝向Z轴负方向. 
                        // 底层已经转过骨架了,但这里共用了一个PlayerRoot,所以需要再转一次.见 CharacterView.loadSkeleton() 函数
                    }
                });
            });
        }
        /**
         * @desc    处理来自GameServer的消息
         * @param   uMsgType 指定要处理的消息类型
         * @param   msgData 指定消息包数据
         * @return 如果消息处理过了,返回true,否则返回false
         */
        onRecvGameServerMsgPacket(uMsgtype, msgReader) {
            switch (uMsgtype) {
                case EMessageType.CMD_PREREMOVE_ROLE: { // 预删除角色消息
                    const aStrField = gameIns.getStringMsgFields(msgReader);
                    Log.Assert(aStrField && aStrField.length === 2, "preremove role msg error!!!");
                    this.onPreremoveRoleMsg(aStrField);
                    return true;
                }
                case EMessageType.CMD_REMOVE_ROLE: { // 删除角色
                    const aStrField = gameIns.getStringMsgFields(msgReader);
                    Log.Assert(aStrField && aStrField.length === 1, "remove role msg error!!!");
                    this.onRemoveRoleMsg(aStrField);
                    return true;
                }
                case EMessageType.CMD_SPR_GETROLEUSINGGOODSDATALIST: { // 角色使用的物品列表
                    const roleData = NetMsg.RoleData4Selector.decode(msgReader);
                    Global.Log.Assert(this.mActorsView.has(roleData.RoleID));
                    const charView = this.mActorsView.get(roleData.RoleID);
                    // to do ... 以后也许还要做时装道具的填充与替换
                    Global.changePlayerEquip(charView, roleData.GoodsDataList); // 换装
                    return true;
                }
                // case EMessageType.CMD_INIT_GAME: { // 初始化游戏
                //     let roleData = NetMsg.RoleData.decode(msgReader);
                //     Global.Data.WaitingForMapChange = false;
                //     Global.g_nLoginTime = Date.now(); // TODO: 这里应该使用同步服务器的时间
                //     this.onInitGame(roleData);
                //     break;
                // }
                // case EMessageType.CMD_SYNC_TIME: { // 同步时间
                //     // TODO:
                //     uiMgr.hideNetWaiting();
                //     if (!this.DirectLogin) {
                //         // To do 向服务器发送进入游戏消息，暂时先直接切换场景，方便测试
                //         //	当前主城场景还有问题，先用选角的替代 1_PT_ZhuCheng_01
                //         gameIns.ChangeToMode(GameMode.EnumGameMode.Playing, "1_PT_ZhuCheng_01.ls");
                //     }
                //     break;
                // }
                default:
                    break;
            }
            return false;
        }
        /**
         * 预删除角色消息处理
         * @param aStrField
         */
        onPreremoveRoleMsg(aStrField) {
            const nRoleID = parseInt(aStrField[0]);
            const nDelRemainingTime = parseInt(aStrField[1]);
            // TODO: 错误提示
            this.m_dtRoleDataList.updateDelRemainingSec(nRoleID, nDelRemainingTime);
            this.m_vewSelector.updateItemList(this.m_dtRoleDataList);
        }
        /**
         * 删除角色消息处理
         * @param aStrField
         */
        onRemoveRoleMsg(aStrField) {
            const nRoleID = parseInt(aStrField[0]);
            this.m_dtRoleDataList.removeRoleData(nRoleID);
            this.m_vewSelector.updateItemList(this.m_dtRoleDataList);
            // 删除角色模型显示
            const roleView = this.mActorsView.get(nRoleID);
            if (roleView) {
                roleView.destroy();
                this.mActorsView.delete(nRoleID);
            }
        }
        /**
         * @desc 当模块被释放时调用
         */
        Release() {
            // 界面销毁
            if (this.m_vewSelector) {
                this.m_vewSelector.destroy();
            }
            this.m_vewSelector = null;
            this.m_dtRoleDataList = null;
            // 隐藏所有的模型,为了与选择角色场景共享,这里并不需要删除模型.注: 最终模型会在场景删除时而被删除掉.
            this.mActorsView.forEach(element => {
                element.active = false;
            });
            super.Release();
        }
    }
    GameMode.SelectorMode = SelectorMode;
})(GameMode || (GameMode = {}));
//# sourceMappingURL=SelectorMode.js.map