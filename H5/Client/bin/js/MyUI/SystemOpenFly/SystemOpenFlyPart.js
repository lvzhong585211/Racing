var MyUI;
(function (MyUI) {
    /**
    * 功能开启Part
    */
    class SystemOpenFlyPart extends ui.SystemOpenFying.SystemOpenFyingPartUI {
        constructor() {
            super();
        }
        /**
         * 飞往的目标
         * @param value
         * @returns {}
         */
        set flyTarget(value) {
            this.targetBtn = value;
        }
        /**
         * 功能开启信息
         * @param sVo
         */
        initData(sVo) {
            if (sVo === null || sVo === undefined) {
                return;
            }
            // 功能图标
            this._oneImage.skin = Global.getFunOpenTiShiImagePath(sVo.ImageOne, ""); // 配置文件里的图片名称包含了png后缀
            // 功能名称
            this._sOpenName.text = sVo.Name;
            // 功能描述
            this._sOpenDesc.text = sVo.Description;
            // 播放音乐
            this.playMusicStr = sVo.Music;
            this._needHideBox.visible = true;
            this._oneImage.x = this._oneImage.y = 0;
            // 图标飞行
            this.flyImage();
        }
        /**
         * 图标飞行
         */
        flyImage() {
            Laya.timer.once(2000, this, this.hidebox);
            const point = this.targetBtn.localToGlobal(new Laya.Point(this.targetBtn.x, this.targetBtn.y));
            Laya.Tween.to(this._oneImage, { x: point.x - 589 - 35, y: point.y - 210 - 30 }, /** 这里的589 - 35 是point转换的位置减去这个起飞的位置，得到的正确飞行目标位置，后面的也一样 */ 1000, Laya.Ease.linearIn, Laya.Handler.create(this, () => {
                this.dPSelectedItem(this, new DPSelectedItemEventArgs());
            }), 2000);
        }
        /**
         * 隐藏下面Box
        */
        hidebox() {
            this._needHideBox.visible = false;
            Laya.timer.clear(this, this.hidebox);
        }
        destroy(destroyChild) {
            super.destroy(destroyChild);
        }
    }
    MyUI.SystemOpenFlyPart = SystemOpenFlyPart;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=SystemOpenFlyPart.js.map