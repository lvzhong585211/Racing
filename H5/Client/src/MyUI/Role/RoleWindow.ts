namespace MyUI.Role {
	/**
	 * 角色窗口类
	 */
	export class RoleWindow extends BaseWindow {
		private mEquipPart: EquipPart; // 装备界面

		constructor() {
			super();
		}

		/** @override */
		public onClosed(type?: string) {
			super.onClosed(type);
			// 关闭面板时保存一下技能配置
			Super.SaveSkillQuickBar();
		}

		/** @override */
		protected updateUI(nWinId: WindowID): IWindowPart {
			const vewChild = super.updateUI(nWinId);

			// 是否需要显示装备界面
			const bShowEquipPart = nWinId === WindowID.Role || nWinId === WindowID.Parcel;
			if (bShowEquipPart) {
				if (!this.mEquipPart) {
					this.mEquipPart = new EquipPart();
					this.addChild(this.mEquipPart);
				}
				this.mEquipPart.enterPart();
			}

			// 装备界面的显示状态
			this.mEquipPart && (this.mEquipPart.visible = bShowEquipPart);

			// 切换页签时要保存一下技能配置(因为可能是设置完技能直接切页签)
			Super.SaveSkillQuickBar();
			return vewChild;
		}
	}
}