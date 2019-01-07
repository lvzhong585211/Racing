namespace MyUI {
	/**
	* 功能开启Part 
	*/
	export class SystemOpenFlyPart extends ui.SystemOpenFying.SystemOpenFyingPartUI {
		// UI操作执行回调函数
		public dPSelectedItem: DPSelectedItemEventHandler;
		private targetBtn: Laya.Component;			// 飞往目标
		private playMusicStr;		// 播放音乐名称
		private mSystemVo: tables.SystemOpenVO;   // 功能开启Vo
		constructor() {
			super();
		}
		/**
		 * 飞往的目标
		 * @param value 
		 * @returns {} 
		 */
		set flyTarget(value: Laya.Component) {
			this.targetBtn = value;
		}
		/**
		 * 功能开启信息
		 * @param sVo 
		 */
		initData(sVo: tables.SystemOpenVO) {
			this.mSystemVo = sVo;
			if (this.mSystemVo === null || this.mSystemVo === undefined) {
				return;
			}
			// 功能图标
			this._oneImage.skin = Global.getFunOpenTiShiImagePath(this.mSystemVo.ImageOne, ""); // 配置文件里的图片名称包含了png后缀
			// 功能名称
			this._sOpenName.text = this.mSystemVo.Name;
			// 功能描述
			this._sOpenDesc.text = this.mSystemVo.Description;
			// 播放音乐
			this.playMusicStr = this.mSystemVo.Music;
			this._needHideBox.visible = true;
			this._oneImage.x = 589;
			this._oneImage.y = 215;
			// 图标飞行延迟2秒
			Laya.timer.once(2000, this, this.flyImage);
		}

		onOpened() {

		}
		/** 
		 * 图标飞行
		 */
		private flyImage() {
			// 隐藏下面Box
			this._needHideBox.visible = false;
			let point = this.targetBtn.localToGlobal(new Laya.Point(0, 0));
			point = this.globalToLocal(point);
			// const widthX = (Laya.stage.width - this._oneImage.width) * .5;
			// const heightY = (Laya.stage.height - Global.VIEW_HEIGHT) * .5 + 215 + this._oneImage.height * .5;
			Laya.Tween.to(this._oneImage,
				{ x: point.x, y: point.y },
				1000,
				Laya.Ease.linearIn,
				Laya.Handler.create(this,
					() => {
						this.dPSelectedItem(this, new DPSelectedItemEventArgs());
					}),
			);
			Laya.timer.clear(this, this.flyImage);
		}

		destroy(destroyChild?: boolean): void {
			this.mSystemVo = null;
			super.destroy(destroyChild);
		}
	}
}