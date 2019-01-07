var Logic;
(function (Logic) {
    let CharacterFsmState;
    (function (CharacterFsmState) {
        /**
         * Idling状态
         */
        class Idling extends Logic.ControllerStateBase {
            /**
             * 当进入一个状态时调用
             * @param controller 用于传入状态所在的控制器
             */
            onEnterState(controller) {
                // 移除掉寻路故事板
                const character = controller.getOwner();
                const level = character.getLevel();
                level.removeStoryBoard(character.getRoleID());
                // 开始播放休闲动作
                controller.getActionPlayer().playAction(GActions.Stand);
            }
        }
        CharacterFsmState.Idling = Idling;
        /**
         * 基础的移动状态
         */
        class Moving extends Logic.ControllerStateBase {
            /**
             * 当进入一个状态时调用
             * @param controller 用于传入状态所在的控制器
             */
            onEnterState(controller) {
                // 开始播放移动动作
                controller.getActionPlayer().playAction(GActions.Walk);
            }
            /**
             * 当退出一个状态时调用
             * @param controller 用于传入状态所在的控制器
             */
            onExitState(controller) {
                // 移除掉寻路故事板
                const character = controller.getOwner();
                const level = character.getLevel();
                level.removeStoryBoard(character.getRoleID());
            }
            /**
             * 每帧调用，以处理逻辑
             * @param controller 用于传入状态所在的控制器
             * @param deltaTime 上次调用以来经过的时间
             */
            onTick(controller, deltaTime) {
                // 不停的从寻路故事板中更新位置及朝向
                const playerControler = controller;
                const player = playerControler.getCharacter();
                const storyBoard = player.getStoryBoard();
                if (storyBoard) {
                    // 从故事板中读取并更新角色的位置                    
                    const coord2D = storyBoard.getCoordinate();
                    // 更新朝向
                    playerControler.faceToPoint(coord2D.x, coord2D.y, false);
                    playerControler.setControlPosition(coord2D.x, coord2D.y);
                }
            }
            /**
             * 1秒种最多执行5次的更新函数.适合不及时的逻辑,如AI决策等.
             * @param controller 用于传入状态所在的控制器
             * @param elapsedTime 上次调用以来经过的时间
             */
            slowUpdate(controller, elapsedTime) {
                // 检测寻路是否结束(到达目标点?)
                const character = controller.getOwner();
                const level = character.getLevel();
                const storyBoard = level.findStoryBoard(character.getRoleID());
                if (storyBoard) {
                    if (storyBoard.isCompleted()) { // 寻路结束
                        controller.SetState(Logic.EControllerStateId.Idling);
                    }
                    return;
                }
            }
        }
        CharacterFsmState.Moving = Moving;
        /**
         * 表演来自服务器的动作(释放技能或打招呼等动作?)
         */
        class ServerRunActionState extends Logic.ControllerStateBase {
            /**
             * 当进入一个状态时调用
             * @param controller 用于传入状态所在的控制器
             * @param 外部传入的切换参数
             */
            onEnterState(controller, enterParams) {
                const action = enterParams.action; // 要求传入一{action:GActions}的参数
                const characterController = controller;
                const actionPlayer = characterController.getActionPlayer();
                actionPlayer.playAction(action, 1, true);
                this.mAniStoped = false;
                actionPlayer.onAniStop(this, this.onAniStop, [characterController]); // 等待动作播放完成
            }
            onAniStop(characterController) {
                // 动作播放完成了,自动切换到idle状态吧
                characterController.SetState(Logic.EControllerStateId.Idling);
                this.mAniStoped = true;
            }
            /**
             * 当退出一个状态时调用
             * @param controller 用于传入状态所在的控制器
             */
            onExitState(controller) {
                if (!this.mAniStoped) { // 移除用来监听动作播放完成的事件
                    const characterController = controller;
                    const actionPlayer = characterController.getActionPlayer();
                    actionPlayer.offAniStop(this, this.onAniStop);
                }
                super.onExitState(controller);
            }
        }
        CharacterFsmState.ServerRunActionState = ServerRunActionState;
        /**
         * 死亡状态
         */
        class Death extends Logic.ControllerStateBase {
            /**
             * @param nDelay 死亡延时（死亡多少秒后移除）
             */
            constructor(nDelay) {
                super();
                /** 死亡延时（死亡多少秒后移除） */
                this.m_nDeathDelay = 3000;
                /** 死亡时间（进入死亡状态的时间） */
                this.m_nDeathTime = 0;
                if (nDelay !== null && nDelay !== undefined) {
                    this.m_nDeathDelay = nDelay;
                }
            }
            /**
             * 当进入一个状态时调用
             * @param controller 用于传入状态所在的控制器
             */
            onEnterState(controller) {
                // 移除掉寻路故事板
                const character = controller.getOwner();
                const level = character.getLevel();
                level.removeStoryBoard(character.getRoleID());
                this.m_nDeathTime = TimeManager.getCorrectLocalTime();
                controller.getActionPlayer().playAction(GActions.Death);
            }
            /**
             * 每帧调用，以处理逻辑
             * @param controller 用于传入状态所在的控制器
             * @param deltaTime 上次调用以来经过的时间
             */
            onTick(controller, deltaTime) {
                super.onTick(controller, deltaTime);
                if (TimeManager.getCorrectLocalTime() - this.m_nDeathTime >= this.m_nDeathDelay) {
                    // 通知角色死亡
                    const nRoleID = controller.getOwner().getRoleID();
                    gameEventBus.actorDeath.event(nRoleID);
                }
            }
        }
        CharacterFsmState.Death = Death;
    })(CharacterFsmState = Logic.CharacterFsmState || (Logic.CharacterFsmState = {}));
})(Logic || (Logic = {}));
//# sourceMappingURL=CharacterFsmStates.js.map