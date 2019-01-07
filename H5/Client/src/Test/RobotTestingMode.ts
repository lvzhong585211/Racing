namespace GameMode {
    import Utils = Global.Utils;
    import Log = Global.Log;

    /**
     * @desc机器人测试模块
     */
    export class RobotTesting extends ModeBase {
        constructor() {
            super(EnumGameMode.RobotTesting);
        }

        /**
        * @desc 当模块被初始化时调用
        * @param preModule 指定由哪个模块切换来的
        * @return 初始化成功返回true,否则返回false
        */
        public async Build(preModule: EnumGameMode): Promise<boolean> {
            // 启动机器人测试
            AutoTest.robotRandomMove();
            return true;
        }

        /**
         * @desc    处理来自GameServer的消息
         * @param   uMsgType 指定要处理的消息类型
         * @param   msgData 指定消息包数据
         * @return 如果消息处理过了,返回true,否则返回false
         */
        public onRecvGameServerMsgPacket(uMsgtype: EMessageType, msgReader: protobuf.Reader): boolean {
            return false;
        }

        /**
         * @desc      当模块被释放时调用
         */
        public Release(): void {
            super.Release();
        }
    }
}