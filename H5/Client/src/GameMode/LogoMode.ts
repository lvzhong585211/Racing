namespace GameMode {

    /**
     * @desc Logo模块
     */
    export class LogoMode extends ModeBase {
        constructor() {
            super(EnumGameMode.Logo);
        }

        /**
        * @desc 当模块被初始化时调用
        * @param preModule 指定由哪个模块切换来的
        * @return 初始化成功返回true,否则返回false
        */
        public async Build(preModule: EnumGameMode): Promise<boolean> {

            // 目前功能仅仅是切换到下一个模块，以后可能会加闪屏之类
            gameIns.ChangeToMode(EnumGameMode.Loading);

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