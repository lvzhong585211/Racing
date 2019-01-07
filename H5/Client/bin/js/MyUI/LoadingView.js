var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var MyUI;
(function (MyUI) {
    class LoadingView extends ui.LoadingViewUI {
        constructor() {
            super();
        }
        updateProgress(nProgressNum) {
            this.compProgress.value = nProgressNum;
            nProgressNum *= 100;
            this.txtProgress.text = nProgressNum.toFixed(1) + "%";
        }
        destroy(destroyChild) {
            this.imgBg.dispose();
            super.destroy(destroyChild);
        }
        /**
         * 显示加载界面
         * @param hint 显示在加载界面上的提示文本
         * @param bgPicUrl 加载界面的背景图片的url
         */
        static Show(hint, bgPicUrl) {
            return __awaiter(this, void 0, void 0, function* () {
                if (LoadingView.mInstance != null) {
                    return;
                }
                LoadingView.mInstance = new MyUI.UIObject(MyUI.LoadingView, "LoadingUI_");
                yield LoadingView.mInstance.Load(Global.getAtlasPath("loading"), undefined, undefined, undefined, UILayer.Loading);
            });
        }
        /**
         * 更新当前的进度
         * @param progress 指定当前进度[0,1]
         */
        static updateProgress(progress) {
            if (LoadingView.mInstance == null) {
                return;
            }
            LoadingView.mInstance.uiView.updateProgress(progress);
        }
        /**
         * 隐藏加载界面
         */
        static Hide() {
            if (LoadingView.mInstance == null) {
                return;
            }
            LoadingView.mInstance.ClearRes();
            LoadingView.mInstance = null;
        }
    }
    LoadingView.mInstance = null; // 单例
    MyUI.LoadingView = LoadingView;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=LoadingView.js.map