namespace GameMode {

    import Handler = laya.utils.Handler;
    import Utils = Global.Utils;
    import UIObject = MyUI.UIObject;

    /**
     * @desc Loading模块
     */
    export class LoadingMode extends ModeBase {

        private m_loadingUI: UIObject<MyUI.LoadingView>; // Loading界面

        constructor() {
            super(EnumGameMode.Loading);
        }

        public async Build(preModule: EnumGameMode, param?: any): Promise<boolean> {
            await MyUI.LoadingView.Show();

            // 预加载公共资源数组
            const preloaders: Base.IPreloadResource[] = [
                tableMgr,
                uiMgr,
                // to do ... 继续添加其它预加载资源
            ];

            // 合并所有待预加载的资源列表
            let aAssets: LoadConfig[] = [];
            preloaders.forEach(resLoader => {
                const childAssets = resLoader.getPreloadResources();
                if (childAssets) {
                    aAssets = aAssets.concat(childAssets);
                }
            });

            // 开始加载资源
            await Utils.LoadRes(aAssets, Handler.create(MyUI.LoadingView, MyUI.LoadingView.updateProgress, undefined, false));

            // 资源加载完后的处理
            preloaders.forEach(resLoader => {
                resLoader.handleAfterResLoaded();
            });

            // 切换到下一个模块
            if (param) {
                gameIns.ChangeToMode(param.nextMode);   // 切换到传入的模块
            }
            else {
                gameIns.ChangeToMode(EnumGameMode.Login);
            }

            return true;
        }

        private onLoadingProgress(nProgressNum: number): void {
            this.m_loadingUI.uiView.updateProgress(nProgressNum);
        }

        /**
         * @desc    处理来自GameServer的消息
         * @param   uMsgType 指定要处理的消息类型
         * @param   msgData 指定消息包数据
         * @return 如果消息处理过了,返回true,否则返回false
         */
        onRecvGameServerMsgPacket(uMsgtype: EMessageType, msgReader: protobuf.Reader): boolean {
            return false;
        }

        /**
         * @desc      当模块被释放时调用
         */
        public Release(): void {
            MyUI.LoadingView.Hide();
            super.Release();
        }

    }
}