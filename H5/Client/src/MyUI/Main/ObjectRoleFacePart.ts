namespace MyUI {
	/**
	 * 其他玩家头像
	 */
	export class ObjectRoleFacePart extends ui.MainUI.ObjectRoleFacePartUI {
		private m_nRoleID: number; // 玩家ID

		constructor() {
			super();
			this.visible = false;
		}

		public destroy(destroyChild?: boolean) {
			gameEventBus.lifeChange.off(this, this._onHeadLifeUpdated);
			super.destroy(destroyChild);
		}

		/**
		 * 获取玩家ID
		 */
		public get roleID(): number {
			return this.m_nRoleID;
		}

		public get visible(): boolean { return super.visible; }
		public set visible(value: boolean) {
			super.visible = value;
			if (value) gameEventBus.lifeChange.on(this, this._onHeadLifeUpdated);
			else gameEventBus.lifeChange.off(this, this._onHeadLifeUpdated);
		}

		/**
		 * 头像血量更新
		 * @param argImp
		 */
		private _onHeadLifeUpdated(argImp: IRoleLifeEventArgs) {
			if (this.visible && argImp.roleID === this.m_nRoleID) {
				this.updateLifeUI(argImp.curLifeV, argImp.maxLifeV);
				this.updateMagicUI(argImp.curMagicV, argImp.maxMagicV);
			}
		}

		/**
		 * 更新显示
		 * @param actor 角色对象
		 */
		public updateUI(actor: Logic.CharacterBaseActor) {
			const datState = actor.getState() as Logic.PlayerState;
			if (this.m_nRoleID !== datState.RoleID) {
				this.m_nRoleID = datState.RoleID;
				this._imgHead.skin = Global.getAvatarImgPath(datState.Occupation, "occu");
				this._txtName.text = datState.VSName;
				this._txtLevel.text = Global.formatRoleLevel(Logic.getLevelV(actor), Logic.getChangeLifeCount(actor));
			}
			this.updateLifeUI(Logic.getLifeV(actor), Logic.getMaxLifeV(actor));
			this.updateMagicUI(Logic.getMagicV(actor), Logic.getMaxMagicV(actor));
		}

		/**
		 * 更新血值显示
		 * @param nLifeV 
		 * @param nMaxLifeV 
		 */
		private updateLifeUI(nLifeV: number, nMaxLifeV: number) {
			this._progBarLife.value = nLifeV / nMaxLifeV;
			this._txtLife.text = `${nLifeV}/${nMaxLifeV}`;
		}

		/**
		 * 更新蓝值显示
		 * @param nMagicV 
		 * @param nMaxMagicV 
		 */
		private updateMagicUI(nMagicV: number, nMaxMagicV: number) {
			this._progBarMagic.value = nMagicV / nMaxMagicV;
			this._txtMagic.text = `${nMagicV}/${nMaxMagicV}`;
		}
	}
}