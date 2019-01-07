namespace MyUI {
	export class LoadingView extends ui.LoadingViewUI {
		constructor() {
			super();
		}

		public updateProgress(nProgressNum: number): void {
			this.compProgress.value = nProgressNum;
			nProgressNum *= 100;
			this.txtProgress.text = nProgressNum.toFixed(1) + "%";
		}

		public destroy(destroyChild?: boolean) {
			this.imgBg.dispose();
			super.destroy(destroyChild);
		}

		private static mInstance: UIObject<MyUI.LoadingView> = null;	// 单例

		/**
		 * 显示加载界面
		 * @param hint 显示在加载界面上的提示文本
		 * @param bgPicUrl 加载界面的背景图片的url
		 */
		public static async Show(hint?: string, bgPicUrl?: string): Promise<any> {
			if (LoadingView.mInstance != null) {
				return;
			}
			LoadingView.mInstance = new UIObject<MyUI.LoadingView>(MyUI.LoadingView, "LoadingUI_");
			await LoadingView.mInstance.Load(Global.getAtlasPath("loading"), undefined, undefined, undefined, UILayer.Loading);
		}

		/**
		 * 更新当前的进度
		 * @param progress 指定当前进度[0,1]
		 */
		public static updateProgress(progress: number): void {
			if (LoadingView.mInstance == null) {
				return;
			}
			LoadingView.mInstance.uiView.updateProgress(progress);
		}

		/**
		 * 隐藏加载界面
		 */
		public static Hide(): void {
			if (LoadingView.mInstance == null) {
				return;
			}
			LoadingView.mInstance.ClearRes();
			LoadingView.mInstance = null;
		}
	}
}