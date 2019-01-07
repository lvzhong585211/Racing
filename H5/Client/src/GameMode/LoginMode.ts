namespace GameMode {
    import Log = Global.Log;

    /**
     * @desc 登录模块
     */
    export class LoginMode extends ModeBase {
        private m_loginVew: MyUI.LoginView; // 登录界面

        constructor() {
            super(EnumGameMode.Login);
        }

        public async Build(preModule: EnumGameMode): Promise<boolean> {
            // 不管从哪里切换过来的,都释放掉当前的场景,因为我们不需要
            gameIns.unloadPersistentLevel();
            // 偿试从GameServer登出
            gameIns.logoutGameServer();

            // 登录界面
            this.m_loginVew = new MyUI.LoginView();
            uiMgr.addChildToView(this.m_loginVew);

            return true;
        }

        /**
         * @desc    处理来自GameServer的消息
         * @param   uMsgType 指定要处理的消息类型
         * @param   msgData 指定消息包数据
         * @return 如果消息处理过了,返回true,否则返回false
         */
        public onRecvGameServerMsgPacket(uMsgtype: EMessageType, msgReader: protobuf.Reader): boolean {
            switch (uMsgtype) {
                case EMessageType.CMD_SECOND_PASSWORD_CHECK_STATE: { // 二级密码状态消息
                    const aStrField = gameIns.getStringMsgFields(msgReader);
                    if (aStrField != null) {
                        const gameState = gameIns.gameState;
                        gameState.HasSecondPassword = parseInt(aStrField[0]);
                        gameState.NeedVerifySecondPassword = parseInt(aStrField[1]);
                    }
                    return true;
                }
                case EMessageType.CMD_ROLE_LIST: { // 角色列表消息
                    const aStrField = gameIns.getStringMsgFields(msgReader);
                    if (aStrField != null) {
                        this.onRoleListMsg(aStrField);
                    }
                    return true;
                }
                default:
                    break;
            }
            return false;
        }

        /**
         * 处理角色列表消息
         * @param roleListFields
         */
        private onRoleListMsg(roleListFields: string[]): boolean {
            if (roleListFields.length < 2) {
                // to do ... 没处理的情况?
                Log.Assert(false);
                return false;
            }

            // 具体见 GameDBServer 的 ProcessGetRoleListCmd()函数
            const roleCountOrErrCdoe = parseInt(roleListFields[0]); // 字段0表示角色数量或错误码
            const sRoleList = roleListFields[1]; // 字段1表示角色列表信息

            if (roleCountOrErrCdoe < 0) { // 返回了错误码
                if (-1 === roleCountOrErrCdoe) { // 人满了,需要排队
                    // to do ... 排队等待界面 见: ShowWaitingQueue
                    Log.Assert(false);
                } else if (-2 === roleCountOrErrCdoe) { // 服务器爆满,排队都满了,提示玩家换其它服务器
                    uiMgr.hintText(ConfigLoca.UI_LOGIN_GS_USERFULL);
                }
                return false;
            }

            const lstDataRole = new MyUI.RoleSelectorItemDataList();
            lstDataRole.initRoleDataList(roleListFields[1]); // 角色列表解析
            if (roleCountOrErrCdoe > 0) { // 有角色，进入选择角色模块
                gameIns.ChangeToMode(EnumGameMode.Selector, lstDataRole);
            } else if (roleCountOrErrCdoe === 0) { // 没有角色，进入创建角色模块
                gameIns.ChangeToMode(EnumGameMode.Creator, lstDataRole);
            }
            return true;
        }

        /**
         * @desc      当模块被释放时调用
         */
        public Release(): void {
            if (this.m_loginVew) {
                this.m_loginVew.destroy();
            }

            super.Release();
        }
    }
}