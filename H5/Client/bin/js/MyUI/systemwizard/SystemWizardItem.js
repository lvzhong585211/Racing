/**
*  系统道具获得框
*/
var MyUI;
(function (MyUI) {
    var Handle = laya.utils.Handler;
    class SystemWizardItem extends ui.SystemWizard.SystemWizardItemUI {
        constructor() {
            super();
            this.autoTimer = 0; // 自动佩带倒计时数
            this.init();
        }
        init() {
            MyUI.prepareCSSStyle(this._goodsDesc.style, "center");
            // 确认点击事件(佩带等)
            this._btnConfirm.clickHandler = Handle.create(null, () => {
                this.dPSelectedItem(this, new DPSelectedItemEventArgs(1));
            }, undefined, false);
            // 关闭点击事件
            this._btnClose.clickHandler = Handle.create(null, () => {
                this.dPSelectedItem(this, new DPSelectedItemEventArgs(2));
            }, undefined, false);
            this._goodsIcon.ownerType = GoodsOwnerTypes.FallGoods;
        }
        /**按钮名称 */
        set buttonName(value) {
            this._btnConfirm.label = value;
        }
        /**道具描述 */
        set itemDesc(value) {
            this._goodsDesc.innerHTML = value;
        }
        set aTimerText(value) {
            this.autoTimer = 5;
            this.autoTimerText = value;
            this._autoTimer.text = `${this.autoTimer} ${this.autoTimerText}`;
            this.startCountDown();
        }
        get getGoodsData() {
            return this.goodsData;
        }
        /**
         * 道具信息显示
         * @param gData      道具Data
         */
        initPartData(gData) {
            this.goodsData = gData;
            if (gData.Id > 0) {
                const voGoods = tableMgr.goodsTable.Find(gData.GoodsID);
                // Log.Assert(voGoods != null, `can't find goodsVO!!! (goodsID = ${gData.GoodsID})`);
                const sColor = MyUI.ColorCode.value;
                //#region ======== 道具名字 ========
                this._goodsName.color = `#${voGoods.GoodsColor}`;
                this._goodsName.text = Loca.getLang(voGoods.Title);
                //#endregion
                //#region ======== 道具图标 ========
                this._goodsIcon.updateByGoodsData(gData);
                // this._goodsIcon.updateByGoodsVO(voGoods);
            }
            else {
                // 活跃度这个以后再说
                // _Count.Text = goodsData.GCount.ToString();
                // HuoYueLab1.text = Global.GetLang("活跃度 +") + goodsData.GCount;
                // _Icon.BodyURL = new ImageURL(Global.GetGoodsIconString(goodsData.GoodsID));
            }
        }
        /** 开始倒计时*/
        startCountDown() {
            Laya.timer.loop(1000, this, this.autoTimeGo);
        }
        /** 计时器递减*/
        autoTimeGo() {
            this.autoTimer--;
            this._autoTimer.text = `${this.autoTimer} ${this.autoTimerText}`;
            if (this.autoTimer <= 0) {
                // 倒计时结束，清理计时器
                // this.clearTimer();
                // 倒计时结束，自动佩带
                this.dPSelectedItem(this, new DPSelectedItemEventArgs(1));
            }
        }
        // 清理计时器
        clearTimer() {
            Laya.timer.clear(this, this.autoTimeGo);
        }
    }
    MyUI.SystemWizardItem = SystemWizardItem;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=SystemWizardItem.js.map