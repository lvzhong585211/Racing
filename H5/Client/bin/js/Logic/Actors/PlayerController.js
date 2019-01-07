var Logic;
(function (Logic) {
    let PlayerFsmState;
    (function (PlayerFsmState) {
        /** 处理来自服务器的自动寻路状态 */
        class AutoPath extends Logic.CharacterFsmState.Moving {
            /**
             * 当进入一个状态时调用
             * @param controller 用于传入状态所在的控制器
             * @param enterParams 外部传入的参数 {action:播放的动作(GActions之一)}
             * @override
             */
            onEnterState(controller, enterParams) {
                let action = GActions.Run;
                if (enterParams && enterParams.action) {
                    action = enterParams.action;
                }
                const characterController = controller;
                // 开始播放移动动作
                const actionPlayer = characterController.getActionPlayer();
                actionPlayer.playAction(action);
                // 开始移动
                enterParams.moveFunction && enterParams.moveFunction();
            }
        }
        PlayerFsmState.AutoPath = AutoPath;
    })(PlayerFsmState = Logic.PlayerFsmState || (Logic.PlayerFsmState = {}));
})(Logic || (Logic = {}));
//# sourceMappingURL=PlayerController.js.map