namespace GameMode {
    import Log = Global.Log;

    // 描述:      定义游戏模块的基本接口与属性
    export abstract class ModeBase {
        private autoClearResourceObjects: Base.ResourceObject[] = [];  // 需要自动清除资源对象的列表
        readonly eGameModule: EnumGameMode = EnumGameMode.Invalid;     // 定义本模块的类型

        protected constructor(eGameModule: EnumGameMode) {
            this.eGameModule = eGameModule;
        }

        /**
         * @desc 当模块被初始化时调用
         * @param preModule 指定由哪个模块切换来的
         * @param param 切换模块时传入的参数,由派生的具体的模块来决定
         * @return 初始化成功返回true,否则返回false
         * 注: 派生类重载此函数时可以使用 async 函数,以方便在 Build() 函数中异步加载资源,在异步加载时,只有Build()返回后才会真正切换完成模块.
         */
        public abstract Build(preModule: EnumGameMode, param?: any): boolean | Promise<boolean>;

        /**
         * 添加资源对象到自动清除列表,在ModeBase.Release()函数会自动清除加入到本列表中的资源对象
         * @param resObject 指定要加入的资源对象
         * 注: 不要把多个功能共享的资源对象指针加入进来,会导致释放掉共享的资源,使得渲染不正确了.
         */
        protected AddToAutoClear(resObject: Base.ResourceObject) {
            this.autoClearResourceObjects.push(resObject);
        }

        /**
         * @desc    1秒种最多执行5次的更新函数.适合不及时的逻辑,如AI决策等.
         * @param elapsedTime 上次调用以来经过的时间
         */
        public SlowUpdate(elapsedTime: number): void {
        }

        /**
         * @desc    每帧被调用
         * @param   elapsedTime 上次调用以来经过的时间(秒)
         */
        public FrameMove(elapsedTime: number): void {
        }

        /**
         * @desc      当模块被释放时调用
         */
        public Release(): void {
            // 清除在资源列表中的对象.
            Log.Info(`> 清除模块(${EnumGameMode[this.eGameModule]}, ResCount=${this.autoClearResourceObjects.length})自动列表的资源...`);
            for (const resObject of this.autoClearResourceObjects) {
                resObject.ClearRes();
            }
        }

        /**
         * @desc    处理来自GameServer的消息
         * @param   uMsgType 指定要处理的消息类型
         * @param   msgData 指定消息包数据
         * @return 如果消息处理过了,返回true,否则返回false
         */
        public abstract onRecvGameServerMsgPacket(uMsgtype: EMessageType, msgReader: protobuf.Reader): boolean;
    }
}