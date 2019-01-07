namespace GameMode {
    import UIObject = MyUI.UIObject;
    import Log = Global.Log;

    /**
     * @desc 创建角色模块
     */
    export class CreatorMode extends ModeBase {
        private m_vewCreator: MyUI.RoleCreatorView; // 创建角色界面
        private m_dtRoleDataList: MyUI.RoleSelectorItemDataList; // 角色列表数据

        private scene: Laya.Scene;                  // 场景
        private actorsShow: Logic.ActorShow[] = [];  // 保存待创建的职业的角色展示

        private mPreModule: EnumGameMode = EnumGameMode.Invalid;  // 保存从哪个模块跳转来的

        constructor() {
            super(EnumGameMode.Creator);
        }

        public async Build(preModule: EnumGameMode, param?: any): Promise<boolean> {
            Log.Assert(param, "build creator mode must have param!!!");
            this.m_dtRoleDataList = param; // 参数为角色列表数据

            this.mPreModule = preModule;

            // 加载场景与角色模型
            this._loadSceneAndActors();

            // 创建角色界面
            const viewCreator = new MyUI.RoleCreatorView(preModule);
            uiMgr.addChildToView(viewCreator);
            viewCreator.on(viewCreator.uiEventActorChanged, this, this.onSelectedPlayer);
            viewCreator.on(viewCreator.uiEventReturn, this, this.onReturn);
            this.m_vewCreator = viewCreator;
            return true;
        }

        /**
         * 切换到跳转来的模块,如登录模块或选择角色模块
         */
        private onReturn() {
            gameIns.ChangeToMode(this.mPreModule, this.m_dtRoleDataList);
        }

        /**
         * 内部用函数,用来异步加载场景与角色
         */
        private async _loadSceneAndActors() {
            // 定义角色资源的路径
            const actorPath: string[] = [
                "npc/zs.lh",
                "npc/fs.lh",
                "npc/gs.lh",
            ];

            // 加载角色
            for (let index = 0; index < EnumOccupation.OpenedNumber; index++) {  // 目前只创建三个职业
                this.actorsShow[index] = new Logic.ActorShow();
                this.actorsShow[index].load(Global.actorsPath + actorPath[index]);
            }

            // 默认选中龙胆
            this.onSelectedPlayer(EnumOccupation.LongDan);

            // 加载角色创建场景 . to do ... 进度条? 注意: 这里并没有等待场景加载完成
            await gameIns.loadPersistentLevel("xuanjue");

            if (!this.actorsShow) {
                return; // 已经释放了? 由于上面的资源加载是异步的,所以走到这里时有机会Release()函数已经调用过了
            }

            // 添加角色到场景中            
            const playerRoot = gameIns.persistentLevel.getChildByName("PlayerRoot") as Laya.Sprite3D; // PlayerRoot用来定位角色位置
            Global.Log.Assert(playerRoot != null);
            for (let index = 0; index < EnumOccupation.OpenedNumber; index++) {  // 目前只创建三个职业
                playerRoot.addChild(this.actorsShow[index]);
            }
        }

        /**
         * 当选中一个角色时调用
         * @param index
         */
        private onSelectedPlayer(index: EnumOccupation) {
            for (const actor of this.actorsShow) {
                actor.active = false;
            }
            this.actorsShow[index].active = true;
            // this.actorsShow[index].play("Fly");  // Fly 动作目前导出有问题，先不用了
        }

        /**
         * @desc    处理来自GameServer的消息
         * @param   uMsgType 指定要处理的消息类型
         * @param   msgData 指定消息包数据
         * @return 如果消息处理过了,返回true,否则返回false
         */
        public onRecvGameServerMsgPacket(uMsgtype: EMessageType, msgReader: protobuf.Reader): boolean {
            switch (uMsgtype) {
                case EMessageType.CMD_CREATE_ROLE: { // 创建角色
                    const aStrField = gameIns.getStringMsgFields(msgReader);
                    Log.Assert(aStrField && aStrField.length === 2, "create role msg error!!!");
                    uiMgr.hideNetWaiting();         // 隐藏等待界面
                    this.onRoleCreateMsg(aStrField);
                    return true;
                }
                default:
                    break;
            }
            return false;
        }

        /**
         * 创建角色消息处理
         * @param aStrField 
         */
        private onRoleCreateMsg(aStrField: string[]) {
            const nRoleCnt = parseInt(aStrField[0]); // 角色个数
            const sRole = aStrField[1]; // 角色信息数据
            if (nRoleCnt > 0) { // 创建角色成功，切换到选择角色列表
                const dtRole = this.m_dtRoleDataList.addRoleData(sRole);
                // 直接进入游戏世界
                MyUI.RoleSelectorView.enterGameWorld(dtRole.roleID, dtRole.roleSex, dtRole.roleName);
            } else {
                uiMgr.hintText("TODO: 创建出错，名字重复？||特殊字符？");
            }
        }

        /**
         * @desc 当模块被释放时调用
         */
        public Release(): void {
            // 界面销毁
            if (this.m_vewCreator) {
                this.m_vewCreator.destroy();
            }
            this.m_vewCreator = null;
            this.m_dtRoleDataList = null;

            // 释放角色资源
            for (const actorShow of this.actorsShow) {
                actorShow.destroy();
            }
            this.actorsShow = null;

            super.Release();
        }
    }
}