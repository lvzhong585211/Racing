/**
* 冒险、战场界面
*/
var MyUI;
(function (MyUI) {
    var Activity;
    (function (Activity) {
        class ActivityPart extends ui.ActivityPart.ActivityPartUI {
            constructor() {
                super();
                this._mxActivityItemRenderList.vScrollBarSkin = "";
                this._zcActivityItemRenderList.vScrollBarSkin = "";
                this._xsActivityItemRenderList.vScrollBarSkin = "";
            }
            /** @implements */
            enterPart() {
            }
            /**
             * 活动类型显示
             * @param activityType
             */
            init(activityType) {
                // const type = activityType >= ActivityTypeEnum.Battlefield ? 1 : 0;
                // _checkTypeStr = Global.GetLang("12955");        //默认优先显示单人 
                // _maoXianSelectStr = _zhanChangSelectStr = Global.GetLang("12955");        //默认优先显示单人 
                if (activityType === WindowID.MaoXian) {
                    this.setUpDataList(this.mxDataList, this._mxActivityItemRenderList);
                }
                else {
                    this.setUpDataList(this.zcDataList, this._zcActivityItemRenderList);
                }
                this.showActivityStatePanel(activityType);
            }
            showMaoXianActivity() {
            }
            showZhanChangActivity() {
            }
            /**
             * 活动类型Panel显示
             * @param activityType      类型(冒险、战场)
             */
            showActivityStatePanel(activityType) {
                this._mxActivityItemRenderList.visible = activityType === WindowID.MaoXian;
                this._zcActivityItemRenderList.visible = activityType === WindowID.ZhanChang;
            }
            /**
             * 冒险活动列表
             * @param value
             * @returns {}
             */
            set setMxDataList(value) {
                this.mxDataList = value;
            }
            /**
             * 战场活动列表
             * @param value
             * @returns {}
             */
            set setZcDataList(value) {
                this.zcDataList = value;
            }
            /**
             * 限时活动列表
             * @param value
             * @returns {}
             */
            set setXsDataList(value) {
                this.setUpDataList(value, this._xsActivityItemRenderList);
            }
            /**
             * 设置活动对应的列表数据
             * @param dList
             * @param pList
             * @returns {}
             */
            setUpDataList(dList, pList) {
                if (pList.array === null) {
                    pList.array = dList;
                    // 接收活动Render里的进入与排序事件
                    pList.cells.forEach(render => {
                        render.dPSelectedItem = (s, e) => {
                            if (e.IDType === 1) {
                                uiMgr.hintText(`${"别点了，还没功能"}`);
                            }
                            else {
                            }
                        };
                    });
                }
            }
            destroy(destroyChild) {
                super.destroy(destroyChild);
            }
        }
        Activity.ActivityPart = ActivityPart;
    })(Activity = MyUI.Activity || (MyUI.Activity = {}));
})(MyUI || (MyUI = {}));
//# sourceMappingURL=ActivityPart.js.map