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
    /**
     * @desc机器人测试模块
     */
    class RobotTesting extends GameMode.ModeBase {
        constructor() {
            super(EnumGameMode.RobotTesting);
        }
        /**
        * @desc 当模块被初始化时调用
        * @param preModule 指定由哪个模块切换来的
        * @return 初始化成功返回true,否则返回false
        */
        Build(preModule) {
            return __awaiter(this, void 0, void 0, function* () {
                // 启动机器人测试
                AutoTest.robotRandomMove();
                return true;
            });
        }
        /**
         * @desc    处理来自GameServer的消息
         * @param   uMsgType 指定要处理的消息类型
         * @param   msgData 指定消息包数据
         * @return 如果消息处理过了,返回true,否则返回false
         */
        onRecvGameServerMsgPacket(uMsgtype, msgReader) {
            return false;
        }
        /**
         * @desc      当模块被释放时调用
         */
        Release() {
            super.Release();
        }
    }
    GameMode.RobotTesting = RobotTesting;
})(GameMode || (GameMode = {}));
//# sourceMappingURL=RobotTestingMode.js.map