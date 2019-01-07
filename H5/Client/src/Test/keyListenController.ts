module MyUI {
	/**
     * 键盘GM命令控制器 
     */
	export class KeyListenController extends Laya.Component {
		// F4键
		private f4 = 115;
		// 数字键1
		private numer1: number = 49;

		private static instance: KeyListenController = null;
		constructor() {
			super();
		}
		/**
		 * 注册键盘监听事件
		 */
		init() {
			this.stage.on(Laya.Event.KEY_DOWN, this, this.keyEvent);
		}

		static get getInstance() {
			if (this.instance === null) {
				this.instance = new KeyListenController();
			}
			return KeyListenController.instance;
		}

		private keyEvent(e: Laya.Event) {
			// Global.Log.Error("e.keyCode = " + e.keyCode);
			switch (e.keyCode) {
				case this.f4:		// 跳转地图
					GmCommand.setMoveTo();
					break;
				case this.numer1:		// 提升战力
					if (e.ctrlKey) {
						GmCommand.setZhanLi();
					}
					break;
			}
		}
	}
}