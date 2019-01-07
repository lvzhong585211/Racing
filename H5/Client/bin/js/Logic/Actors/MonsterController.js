var Logic;
(function (Logic) {
    let MonsterFsmState;
    (function (MonsterFsmState) {
        /** 自动寻路状态 */
        class AutoPath extends Logic.CharacterFsmState.Moving {
            /**
             * 当进入一个状态时调用
             * @param controller 用于传入状态所在的控制器
             * @param enterParams 外部传入的参数 {action:播放的动作(GActions之一)}
             */
            onEnterState(controller, enterParams) {
                let action = GActions.Walk;
                if (enterParams && enterParams.action) {
                    action = enterParams.action;
                }
                const monsterController = controller;
                // 设置动作播放速率. 注:目前怪物的速度是死的,不可以在运行时进行修改.
                const monster = monsterController.getCharacter();
                // const rate = storyBoard.getRealMoveSpeed() / monster.getMonsterVO().WalkSpeed;
                const playRate = monster.getMonsterVO().WalkSpeed / 100; // 走路速度是100/秒
                // 开始播放移动动作
                const actionPlayer = monsterController.getActionPlayer();
                actionPlayer.playAction(action, playRate);
                // 开始移动
                enterParams.moveFunction && enterParams.moveFunction();
            }
            /**
             * 每帧调用，以处理逻辑
             * @param controller 用于传入状态所在的控制器
             * @param deltaTime 上次调用以来经过的时间
             */
            onTick(controller, deltaTime) {
                // 不停的从寻路故事板中更新位置及朝向
                const monsterContoller = controller;
                const monster = monsterContoller.getCharacter();
                const storyBoard = monster.getStoryBoard();
                if (storyBoard) {
                    // 从故事板中读取并更新角色的位置                    
                    const coord2D = storyBoard.getCoordinate();
                    // 更新朝向
                    monsterContoller.faceToPoint(coord2D.x, coord2D.y, false);
                    monsterContoller.setControlPosition(coord2D.x, coord2D.y);
                }
            }
            /**
            * 当退出一个状态时调用
            * @param controller 用于传入状态所在的控制器
            */
            onExitState(controller) {
                super.onExitState(controller);
                const monsterController = controller;
                // 还原播放速度
                const actionPlayer = monsterController.getActionPlayer();
                actionPlayer.updatePlayRate(GActions.Walk, 1);
            }
        }
        MonsterFsmState.AutoPath = AutoPath;
    })(MonsterFsmState || (MonsterFsmState = {}));
    /**
     * 实现怪物的基本控制器
     */
    class MonsterController extends Logic.ACharacterController {
        constructor() {
            super();
            // 初始化控制器的状态
            const states = this.m_states;
            states[Logic.EControllerStateId.AutoPath] = new MonsterFsmState.AutoPath();
            states[Logic.EControllerStateId.Dead] = new Logic.CharacterFsmState.Death(1500);
            states[Logic.EControllerStateId.ServerRunAction] = new Logic.CharacterFsmState.ServerRunActionState();
        }
    }
    Logic.MonsterController = MonsterController;
})(Logic || (Logic = {}));
//# sourceMappingURL=MonsterController.js.map