/**
* 主界面功能开启提示界面
*/
var MyUI;
(function (MyUI) {
    class MainFunOpenTiShi extends ui.MainUI.MainFunOpenTiShiUI {
        constructor() {
            super();
            this.funOpenId = 0; // 功能开启ID
            this.funOpenTaskNums = 0; // 功能开启任务数量
            this.funOpenPickUpState = false; // 功能开启奖励领取状态
            this.init();
        }
        init() {
            this.visible = false;
            MyUI.prepareCSSStyle(this._tishiName.style, "center", 18);
            this.on(laya.events.Event.CLICK, this, this.onClickStage);
        }
        /**
         * 点击弹出功能开启获取面板
         * @param e
         */
        onClickStage(e) {
            const fPart = windowMgr.openWindow(WindowID.FunOpenTiShiPart);
            fPart.initPartData(this.funOpenId, this.funOpenTaskNums, this.funOpenPickUpState);
        }
        /**
         * 更新功能开启提示显示
         * @param openId 			功能开启ID
         * @param taskNums 			功能开启任务数量
         * @param pickUpState		达成状态
         */
        updateFunOpenTiShiShow(openId, taskNums, pickUpState) {
            // FXGO.gameObject.SetActive(false);
            // pSystem.gameObject.SetActive(false);
            let isShow = false;
            tableMgr.funOpenTiShiTable.AllRows().forEach(fOpenTiShi => {
                if (fOpenTiShi.Id === openId) {
                    if (fOpenTiShi.Type === 1) { // 等级开启
                        if (pickUpState) {
                            // {49BD1B}已完成{-}\r\n点击领取奖励
                            this._tishiName.innerHTML = Loca.getLang(fOpenTiShi.Name.toString()) + ConfigLoca.UI_COMMON_REACHCLICKRECEIVE;
                            // FXGO.gameObject.SetActive(true);
                            // pSystem.gameObject.SetActive(true);
                        }
                        else {
                            const levelList = fOpenTiShi.FOpenId.split(",");
                            // 达到{0}重{1}级后\r\n解锁
                            this._tishiName.innerHTML = Loca.getLang(Global.String.Format(ConfigLoca.UI_COMMON_达成等级解锁, levelList[0], levelList[1])) +
                                Global.GetColorStringForNGUIText("70B7FF", Loca.getLang(fOpenTiShi.Name.toString()));
                            // taskInfoStr += Global.String.Format(Loca.ConfigLoca.UI_TASK_NEEDLEVEL, Global.GetColorStringForNGUIText(MyUI.ColorCode.red, UIHelper.FormatLevelLimit(limitLevel, limitZhuanSheng)));
                        }
                    }
                    else { // 任务开启
                        if (pickUpState) {
                            // {49BD1B}已完成{-}\r\n点击领取奖励
                            this._tishiName.innerHTML = Loca.getLang(fOpenTiShi.Name.toString()) + ConfigLoca.UI_COMMON_REACHCLICKRECEIVE;
                            // FXGO.gameObject.SetActive(true);
                            // pSystem.gameObject.SetActive(true);
                        }
                        else {
                            // 完成{0}个任务后\r\n解锁
                            const str = Global.String.Format(ConfigLoca.UI_COMMON_完成任务条件获得, taskNums);
                            this._tishiName.innerHTML = str + Global.GetColorStringForNGUIText("70B7FF", Loca.getLang(fOpenTiShi.Name.toString()));
                        }
                    }
                    this.funOpenId = fOpenTiShi.Id;
                    this.funOpenTaskNums = taskNums;
                    this.funOpenPickUpState = pickUpState;
                    const strPicArray = fOpenTiShi.FIconId.split("|");
                    let strImage = strPicArray.length > 0 ? strPicArray[0] : "";
                    if (strPicArray.length > 1) {
                        let occupation = Global.Data.roleData.Occupation;
                        if (occupation === EnumOccupation.DouXian) {
                            occupation = 3;
                        }
                        strImage = strPicArray.length > occupation ? strPicArray[occupation] : "";
                    }
                    this._tiShiImage.skin = Global.getFunOpenTiShiImagePath(strImage, ""); // 配置文件里的图片名称包含了png后缀
                    isShow = true;
                }
            });
            if (isShow && openId !== -1 && this.visible === false)
                this.visible = true;
        }
        /**
         * 功能开启提示显示状态
         * @param isShowState
         * @returns {}
         */
        showFunOpenTiShiObjState(isShowState) {
            this.funOpenId = -1;
            // FXGO.gameObject.SetActive(false);
            // pSystem.gameObject.SetActive(false);
            this.visible = isShowState;
        }
    }
    MyUI.MainFunOpenTiShi = MainFunOpenTiShi;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=MainFunOpenTiShi.js.map