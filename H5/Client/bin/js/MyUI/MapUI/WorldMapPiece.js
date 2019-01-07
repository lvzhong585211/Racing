var MyUI;
(function (MyUI) {
    var MapUI;
    (function (MapUI) {
        /**
         * 世界地图上的地图块
         */
        class WorldMapPiece extends ui.MapUI.WorldMapPieceUI {
            constructor() {
                super();
                this._imgPiece.once(Laya.Event.LOADED, this, this.onPieceSkinLoaded);
            }
            destroy(destroyChild) {
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
            onPieceSkinLoaded() {
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
            onPieceClick(evt) {
                if (this.clickHandler) {
                    this.clickHandler.runWith(this.mapID);
                }
            }
            /**
             * 地图块显示状态，0=正常状态、1=选中状态、2=置灰状态
             */
            set pieceState(value) {
                this.pieceSkin = Global.getWorldMapPieceImagePath(`${this.mapID}_${value}`);
                if (this.mPieceState !== value) {
                    this.mPieceState = value;
                    if (value === 2) { // 置灰状态不可以点击
                        this._evtRegion.offAll();
                    }
                    else {
                        this._evtRegion.on(Laya.Event.CLICK, this, this.onPieceClick);
                    }
                }
            }
            /**
             * 地图块皮肤
             */
            get pieceSkin() {
                return this.mPieceSkin;
            }
            set pieceSkin(value) {
                if (this.mPieceSkin !== value) {
                    this.mPieceSkin = value;
                    this._imgPiece.skin = value;
                }
            }
            /**
             * 地图块标识
             */
            get pieceIcon() {
                return this.mPieceIcon;
            }
            set pieceIcon(value) {
                if (this.mPieceIcon !== value) {
                    this.mPieceIcon = value;
                    this._iconPiece.skin = value;
                }
            }
            /**
             * 地图块名称
             */
            get pieceName() {
                return this.mPieceName;
            }
            set pieceName(value) {
                this.mPieceName = value;
                this._txtPiece.text = value;
            }
        }
        MapUI.WorldMapPiece = WorldMapPiece;
    })(MapUI = MyUI.MapUI || (MyUI.MapUI = {}));
})(MyUI || (MyUI = {}));
//# sourceMappingURL=WorldMapPiece.js.map