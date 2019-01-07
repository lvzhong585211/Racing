var MyUI;
(function (MyUI) {
    /**
     * 地图上的对象点
     */
    class MapPoint extends ui.Components.MapPointUI {
        constructor() {
            super();
            // 因为地图做了180度旋转处理，所以地图上的点先做180度旋转，
            // 然后加到地图上后随父节点旋转刚好抵消掉显示正常
            this.rotation = 180;
        }
        /**
         * 设置对象点名称
         */
        set title(value) {
            this._txtName.text = value;
        }
        /**
         * 设置对象点名称颜色
         */
        set titleColor(value) {
            this._txtName.color = value;
        }
        /**
         * 设置图片名称
         */
        set imgName(value) {
            this._imgPoint.skin = Global.getCommonAtlasImgPath(value);
        }
    }
    MyUI.MapPoint = MapPoint;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=MapPoint.js.map