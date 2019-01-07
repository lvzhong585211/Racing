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
    var Handler = laya.utils.Handler;
    var Utils = Global.Utils;
    /**
     * @desc Loading模块
     */
    class LoadingMode extends GameMode.ModeBase {
        constructor() {
            super(EnumGameMode.Loading);
        }
        Build(preModule, param) {
            return __awaiter(this, void 0, void 0, function* () {
                yield MyUI.LoadingView.Show();
                // 预加载公共资源数组
                const preloaders = [
                    tableMgr,
                    uiMgr,
                ];
                // 合并所有待预加载的资源列表
                let aAssets = [];
                preloaders.forEach(resLoader => {
                    aAssets = aAssets.concat(resLoader.getPreloadResources());
                });
                // 开始加载资源
                yield Utils.LoadRes(aAssets, Handler.create(MyUI.LoadingView, MyUI.LoadingView.updateProgress, undefined, false));
                // 资源加载完后的处理
                preloaders.forEach(resLoader => {
                    resLoader.handleAfterResLoaded();
                });
                // 切换到下一个模块
                if (param) {
                    gameIns.ChangeToMode(param.nextMode); // 切换到传入的模块
                }
                else {
                    gameIns.ChangeToMode(EnumGameMode.Login);
                }
                return true;
            });
        }
        onLoadingProgress(nProgressNum) {
            this.m_loadingUI.uiView.updateProgress(nProgressNum);
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
            MyUI.LoadingView.Hide();
            super.Release();
        }
    }
    GameMode.LoadingMode = LoadingMode;
})(GameMode || (GameMode = {}));
//# sourceMappingURL=LoadingMode.js.map