module LogicTask {
	/**
	* 主界面任务快捷栏--图腾Box 
	*/
	export class TaskBoxMiniTotem extends ui.Task.Components.TaskBoxMiniTotemUI {
		// 图腾信息
		totemData: tables.DragonTotemVO;

		totemMrg: MyUI.ToTemManager;
		constructor() {
			super();
			//弹出图腾界面
			this._btnTotemPanel.clickHandler = Laya.Handler.create(this, () => {
				const totemPart = windowMgr.openWindow<MyUI.TotemPart>(WindowID.Totem);
				if (totemPart instanceof MyUI.TotemWindow)
					totemPart.setTotemId(this.totemData);
			}, undefined, false);
		}

		setTotemData(): void {
			this._textTotemName.text = "";
			this._textProValue.text = "";
			this._proTotem.value = 0;
			this._imageTotemIcon.skin = Global.getTotemImagePath("");
		}

		refreshToTemInfo(isShowTotemEffect: boolean = false): boolean {
			const infoObj = MyUI.ToTemManager.getInstance().getTaskIDListOfTaskID2TaskID();
			const totemID: number = infoObj.totemId;			// 图腾Id
			const completeTasks: number = infoObj.completeTasks; // 进行任务
			const allTasks: number = infoObj.allTasks; // 所有任务数量
			let sliderValue = (completeTasks * 1) / (allTasks * 1);
			if (sliderValue >= 1) {
				sliderValue = 1;
				//TODO  特效以后加
				/*if (_ToTem_Effect != null) {
					if (!_ToTem_ParticleSystem.isPlaying) {
						_ToTem_ParticleSystem.Play();
						_ToTem_Effect.gameObject.SetActive(true);
					}
				}*/
			}
			else {
				if (sliderValue <= 0) {
					sliderValue = 0;
				}
				//TODO  特效以后加
				/*if (_ToTem_Effect != null) {
					if (!_ToTem_ParticleSystem.isStopped) {
						_ToTem_ParticleSystem.Stop();
						_ToTem_Effect.gameObject.SetActive(false);
					}
				}*/
			}

			if (isShowTotemEffect) {
				// endTotemValue = sliderValue;
				// CreateTotemEffect();
			}
			else {
				this._proTotem.value = sliderValue;
				this._textProValue.text = `${Math.round(100 * sliderValue)}` + "%";
			}

			this.totemData = MyUI.ToTemManager.getInstance().getToTemItemOfKey(totemID);
			if (this.totemData !== null && this.totemData !== undefined) {
				this._imageTotemIcon.skin = Global.getTotemImagePath("Totem_Max_" + `${this.totemData.Icon}`);
				this._textTotemName.text = Loca.getLang(`${this.totemData.Title}`);
				this._proTotem.visible = true;
			}
			else {
				/*if (_ToTem_Effect != null) {
					if (!_ToTem_ParticleSystem.isStopped) {
						_ToTem_ParticleSystem.Stop();
						_ToTem_Effect.gameObject.SetActive(false);
					}
				}*/
				this._proTotem.visible = false;
			}

			return this._proTotem.visible;
		}
	}
}