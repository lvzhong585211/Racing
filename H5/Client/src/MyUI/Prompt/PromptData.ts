/**
* 提示框显示数据
*/
namespace MyUI {
	export class PromptData {
		// 提示框内容
		private txtDesc: string = "";
		// 确认按钮名称(有需要才设置)
		private confirmText: string = "";
		// 取消按钮名称(有需要才设置)
		private cancelText: string = "";
		// 提示框类型(默认单按钮的)
		private pType: PromptEnum = PromptEnum.PromptSingle;
		constructor(tDesc: string, confirmtext: string = "", canceltext: string = "", pEnum: PromptEnum = PromptEnum.PromptSingle) {
			this.txtDesc = tDesc;
			this.confirmText = confirmtext;
			this.cancelText = canceltext;
			this.pType = pEnum;
		}
		public get PType(): PromptEnum { return this.pType; }
		public get TxtDesc(): string { return this.txtDesc; }
		public get ConfirmText(): string { return this.confirmText; }
		public get CancelText(): string { return this.cancelText; }
	}
}