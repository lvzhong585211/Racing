namespace MyUI {

	/**
	 * 选择角色项
	 */
	export class RoleSelectorItem extends ui.Components.RoleSelectorItemUI {
		/** 角色数据 */
		private m_dtRole: RoleSelectorItemData;

		constructor() {
			super();
			this.clearMe();

			this._txtStatCreate.text = ConfigLoca.UI_LOGIN_CREATE_STAT_CREATE;
			this._btnDelete.clickHandler = Laya.Handler.create(this, this.onDeleteButtonClick, undefined, false);
		}

		/**
		 * 删除按钮点击处理
		 * @param e 
		 */
		private onDeleteButtonClick() {
			if (this.m_dtRole) {
				this.event("EvtDeleteRoleItem", this.m_dtRole.roleID);
			}
		}

		/**
		 * 获取角色数据
		 */
		getRoleData(): RoleSelectorItemData { return this.m_dtRole; }

		/**
		 * 获取角色ID
		 */
		getRoleID(): number {
			if (this.m_dtRole) {
				return this.m_dtRole.roleID;
			}
			return 0;
		}

		/**
		 * 更新Item
		 * @param value 
		 */
		updateMe(value: RoleSelectorItemData) {
			this.m_dtRole = value;
			if (value) {
				this.updateUI();
			} else {
				this.clearMe();
			}
		}

		/**
		 * 设置是否选中
		 * @param value 是否选中
		 */
		setSelected(value: boolean) {
			this._btnRole.selected = value;
			this._btnAvatar.selected = value;
			if (this.m_dtRole) {
				this._txtLevel.color = value ? "#ffd460" : "#735d04";
				if (this.m_dtRole.delRemainingSec > 0) {
					this._btnDelete.visible = false;
				} else {
					this._btnDelete.visible = value;
				}
			}
		}

		/**
		 * 更新界面显示
		 */
		private updateUI() {
			if (this.m_dtRole) {
				this._btnAvatar.skin = Global.getLoginAtlasImgPath(`btn_avatar_${this.m_dtRole.roleOccupation}`);
				this._txtLevel.text = Global.String.Format(ConfigLoca.UI_LOGIN_SELECT_LEVEL, this.m_dtRole.roleLevel, this.m_dtRole.roleChangeLife);
				this._btnRole.label = this.m_dtRole.roleName;
				this._txtStatCreate.visible = false;
				this.setSelected(this._btnRole.selected);
			}
		}

		/**
		 * 清空Item
		 */
		clearMe() {
			this._btnAvatar.skin = null;
			this._btnAvatar.label = "";
			this._txtLevel.text = "";
			this._btnRole.label = "";
			this._btnDelete.visible = false;
			this._txtStatCreate.visible = true;
			this.m_dtRole = null;
		}

		public destroy(destroyChild?: boolean) {
			this._btnDelete.clickHandler.recover();
			this.offAll();
			this.clearMe();
			super.destroy(destroyChild);
		}
	}
}