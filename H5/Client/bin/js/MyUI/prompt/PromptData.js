/**
* 提示框显示数据
*/
var MyUI;
(function (MyUI) {
    class PromptData {
        constructor(tDesc, confirmtext = "", canceltext = "", pEnum = PromptEnum.PromptSingle) {
            // 提示框内容
            this.txtDesc = "";
            // 确认按钮名称(有需要才设置)
            this.confirmText = "";
            // 取消按钮名称(有需要才设置)
            this.cancelText = "";
            // 提示框类型(默认单按钮的)
            this.pType = PromptEnum.PromptSingle;
            this.txtDesc = tDesc;
            this.confirmText = confirmtext;
            this.cancelText = canceltext;
            this.pType = pEnum;
        }
        get PType() { return this.pType; }
        get TxtDesc() { return this.txtDesc; }
        get ConfirmText() { return this.confirmText; }
        get CancelText() { return this.cancelText; }
    }
    MyUI.PromptData = PromptData;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=PromptData.js.map