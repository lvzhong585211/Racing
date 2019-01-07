module MyUI {
	/**
	* 图腾Window 
	*/
	export class TotemWindow extends MyUI.BaseWindow {
		private mTotemVo: tables.DragonTotemVO;
		constructor() {
			super();
		}

		/** @override */
		protected updateUI(nWinId: WindowID): IWindowPart {
			if (nWinId === WindowID.JiaoLongTotem || nWinId === WindowID.LiLongTotem) {
				let vewChild = this.mChildInstanceMap.get(nWinId);
				if (!vewChild) { // 战场和冒险共用同一个界面
					vewChild = this.getChildInstance(WindowID.QiuLongTotem);
					this.mChildInstanceMap.set(nWinId, vewChild);
				}
			}

			const vewChild = super.updateUI(nWinId);
			if (nWinId === WindowID.QiuLongTotem || nWinId === WindowID.JiaoLongTotem || nWinId === WindowID.LiLongTotem) {
				const actPart = vewChild as TotemPart;
				actPart.init(nWinId, this.mTotemVo);
			}
			return vewChild;
		}

		setTotemId(totemVo: tables.DragonTotemVO): void {
			this.mTotemVo = totemVo;
		}
	}
}