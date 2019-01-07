namespace MyUI.MapUI {
	/**
	 * 世界地图上的地图块
	 */
	export class WorldMapPiece extends ui.MapUI.WorldMapPieceUI {
		private mPieceSkin: string; // 地图块皮肤
		private mPieceIcon: string; // 地图块标识
		private mPieceName: string; // 地图块名称

		/** 地图ID，在设计界面通过扩展脚本赋值 */
		public mapID: number;
		/** 点击回调处理，函数定义：(nMapID: number) => void */
		public clickHandler: Laya.Handler;
		/** 地图名字位置初始化后回调，函数定义：(piece: WorldMapPiece) => void */
		public posInitedHandler: Laya.Handler;

		private mPieceState: number; // 地图块状态

		constructor() {
			super();
			this._imgPiece.once(Laya.Event.LOADED, this, this.onPieceSkinLoaded);
		}

		public destroy(destroyChild?: boolean) {
			this._imgPiece.offAll();
			this._evtRegion.offAll();
			if (this.clickHandler) {
				this.clickHandler.recover();
				this.clickHandler = null;
			}
			if (this.posInitedHandler) {
				this.posInitedHandler.recover();
				this.posInitedHandler = null;
			}
			super.destroy(destroyChild);
		}

		/**
		 * 地图块皮肤加载完毕处理
		 */
		private onPieceSkinLoaded() {
			// 设置地图名字显示居中
			const nPosX = this._imgPiece.width / 2 >> 0;
			const nPosY = (this._imgPiece.height / 2 >> 0) - 10;
			this._evtRegion.pos(nPosX, nPosY, true);
			if (this.posInitedHandler) { // 位置设置完后的回调
				this.posInitedHandler.runWith(this);
			}
		}

		/**
		 * 地图块点击处理
		 * @param evt Event事件
		 */
		private onPieceClick(evt: Laya.Event) {
			if (this.clickHandler) {
				this.clickHandler.runWith(this.mapID);
			}
		}

		/**
		 * 地图块显示状态，0=正常状态、1=选中状态、2=置灰状态
		 */
		public set pieceState(value: number) {
			this.pieceSkin = Global.getWorldMapPieceImagePath(`${this.mapID}_${value}`);
			if (this.mPieceState !== value) {
				this.mPieceState = value;
				if (value === 2) { // 置灰状态不可以点击
					this._evtRegion.offAll();
				} else {
					this._evtRegion.on(Laya.Event.CLICK, this, this.onPieceClick);
				}
			}
		}

		/**
		 * 地图块皮肤
		 */
		public get pieceSkin(): string {
			return this.mPieceSkin;
		}
		public set pieceSkin(value: string) {
			if (this.mPieceSkin !== value) {
				this.mPieceSkin = value;
				this._imgPiece.skin = value;
			}
		}

		/**
		 * 地图块标识
		 */
		public get pieceIcon(): string {
			return this.mPieceIcon;
		}
		public set pieceIcon(value: string) {
			if (this.mPieceIcon !== value) {
				this.mPieceIcon = value;
				this._iconPiece.skin = value;
			}
		}

		/**
		 * 地图块名称
		 */
		public get pieceName() {
			return this.mPieceName;
		}
		public set pieceName(value: string) {
			this.mPieceName = value;
			this._txtPiece.text = value;
		}
	}
}