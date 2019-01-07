/**
* 提示框类型枚举
*/
var PromptEnum;
(function (PromptEnum) {
    PromptEnum[PromptEnum["PromptSingle"] = 0] = "PromptSingle";
    PromptEnum[PromptEnum["PromptDouble"] = 1] = "PromptDouble";
    // 往下可添加其他类型提示框，看需求
})(PromptEnum || (PromptEnum = {}));
/**
* 提示框按钮枚举
*/
var PromptBtnCallEnum;
(function (PromptBtnCallEnum) {
    PromptBtnCallEnum[PromptBtnCallEnum["PromptConfirm"] = 1] = "PromptConfirm";
    PromptBtnCallEnum[PromptBtnCallEnum["PromptCancel"] = 2] = "PromptCancel";
    PromptBtnCallEnum[PromptBtnCallEnum["PromptClose"] = 3] = "PromptClose";
    // 往下可添加其他类型按钮，看需求
})(PromptBtnCallEnum || (PromptBtnCallEnum = {}));
//# sourceMappingURL=PromptEnum.js.map