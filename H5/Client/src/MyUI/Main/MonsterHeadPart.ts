namespace MyUI {
	/**
	 * 怪物头像
	 */
	export class MonsterHeadPart extends ui.MainUI.MonsterHeadPartUI {
		private mNMonsterId: number = 0; // 怪物ID

		constructor() {
			super();
			this.visible = false;
		}

		/** @override */
		public destroy(destroyChild?: boolean) {
			gameEventBus.lifeChange.off(this, this._onHeadLifeUpdated);
			super.destroy(destroyChild);
		}

		/**
		 * 获取怪物ID
		 */
		public get monsterId(): number {
			return this.mNMonsterId;
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
			if (this.visible && argImp.roleID === this.mNMonsterId) {
				this.lifePercent = argImp.curLifeV / argImp.maxLifeV;
			}
		}

		/**
		 * 更新显示
		 * @param staMonster 怪物State
		 */
		public updateUI(character: Logic.CharacterBaseActor) {
			const staMonster = character.getState();
			if (this.mNMonsterId !== staMonster.RoleID) {
				this.mNMonsterId = staMonster.RoleID;
				let sName = Loca.getLang(staMonster.VSName);
				if (SystemConfig.debugShowInnerId) {
					sName = `${sName}-${character.getRoleID()}`;
				}
				this._txtName.text = sName;
				this._txtLevel.text = Global.String.Format(Loca.getLang("94"), Logic.getLevelV(character)); // {0}级
			}
			this.lifePercent = Logic.getLifeV(character) / Logic.getMaxLifeV(character);
		}

		/**
		 * 设置怪物血量比例
		 */
		private set lifePercent(value: number) {
			this._progBarLife.value = value;
		}
	}
}