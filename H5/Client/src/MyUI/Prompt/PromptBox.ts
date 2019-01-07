/**
* 公共提示框Box() 
*/
namespace MyUI {
	import Handler = laya.utils.Handler;
	export class PromptBox extends ui.PromptBox.PromptBoxUI {
		// UI操作执行回调函数
		public DPSelectedItem: DPSelectedItemEventHandler;
		constructor() {
			super();
		}
		/** 
		 * 显示提示框布局内容
		 * @param pData		提示框类型pType、内容txtDesc、确认按钮名称confirmText、取消按钮名称cancelText设置
		*/
		public InitPromptBox(pData: PromptData): void {
			// 按钮间距
			let xSpacing = 0;
			// 单按钮提示框
			if (pData.PType === PromptEnum.PromptSingle) {
				xSpacing = this.width / 2;
				this._btnConfirm.x = xSpacing - this._btnConfirm.width / 2;
				this._btnCancel.visible = false;
			}
			// 双按钮提示框
			else {
				xSpacing = this.width / 4;
				this._btnConfirm.x = xSpacing - this._btnConfirm.width / 2;
				this._btnCancel.x = xSpacing * 3 - this._btnCancel.width / 2;
				// 取消按钮点击
				this._btnCancel.clickHandler = Handler.create(this, () => {
					this.DPSelectedItem(this, new DPSelectedItemEventArgs(PromptBtnCallEnum.PromptCancel));
				}, undefined, false);
				// new Handler(null, ()=>{		
				// 	this.DPSelectedItem(this, new DPSelectedItemEventArgs(PromptBtnCallEnum.PromptCancel));
				// });
			}
			// 确定按钮点击
			this._btnConfirm.clickHandler = Handler.create(this, () => {
				this.DPSelectedItem(this, new DPSelectedItemEventArgs(PromptBtnCallEnum.PromptConfirm));
			}, undefined, false);
			this._btnClose.clickHandler = Handler.create(this, () => {
				this.DPSelectedItem(this, new DPSelectedItemEventArgs(PromptBtnCallEnum.PromptClose));
			}, undefined, false);
			// 提示内容
			this._txtDesc.text = pData.TxtDesc;
			// 确认按钮文本
			this._btnConfirm.label = pData.ConfirmText === "" ? Loca.getLang("1") /*确定*/ : pData.ConfirmText;
			// 取消按钮文本
			this._btnCancel.label = pData.CancelText === "" ? Loca.getLang("3") /*取消*/ : pData.CancelText;
		}
		/** 
		 *  清理事件(垃圾回收)
		*/
		public destroy(destroyChild?: boolean) {
			this._btnConfirm.clickHandler.recover();
			this._btnCancel.clickHandler.recover();
			this._btnClose.clickHandler.recover();
			super.destroy(true);
		}
	}
	// 使用事例
	// uiMgr.CreatePrompt("提示内容", (s,e)=>{
	// 					if (e.IDType == PromptBtnCallEnum.PromptConfirm){
	// 					}
	// 					else if (e.IDType == PromptBtnCallEnum.PromptCancel){
	// 					}
	// 					else{
	// 					}
	// 				},"","");
}