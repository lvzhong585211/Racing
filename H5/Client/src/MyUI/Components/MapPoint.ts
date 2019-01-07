namespace MyUI {
	/**
	 * 地图上的对象点
	 */
	export class MapPoint extends ui.Components.MapPointUI {
		constructor() {
			super();

			// 因为地图做了180度旋转处理，所以地图上的点先做180度旋转，
			// 然后加到地图上后随父节点旋转刚好抵消掉显示正常
			this.rotation = 180;
		}

		/**
		 * 设置对象点名称
		 */
		public set title(value: string) {
			this._txtName.text = value;
		}

		/**
		 * 设置对象点名称颜色
		 */
		public set titleColor(value: string) {
			this._txtName.color = value;
		}

		/**
		 * 设置图片名称
		 */
		public set imgName(value: string) {
			this._imgPoint.skin = Global.getCommonAtlasImgPath(value);
		}
	}
}