module MyUI {
	/**
	* 图腾右边BoxInfo 
	*/
	export class TotemInfoBox extends ui.Totem.TotemInfoBoxUI {
		// 图腾数据管理
		private totemManager: ToTemManager;
		// UI操作执行回调函数
		dPSelectedItem: DPSelectedItemEventHandler;
		// 是否已打开过(用于判断是否存在缓存)
		isOpenState: boolean;
		// 图腾Icon显示数量
		private columns: number = 6;
		// 当前显示的图腾数据
		private currTotemVo: tables.DragonTotemVO;
		constructor() {
			super();
			Style.prepareHtmlFont18Left(this._htmlDesc2, ColorCode.normal);
			this._listTotemIcon.vScrollBarSkin = "";
			this._btnLook.label = ConfigLoca.UI_COMMON_LookTitle;
			this.totemManager = ToTemManager.getInstance();
			this._btnGoChallenge.clickHandler = Laya.Handler.create(this, this.onClickGoChallenge, null, false);
		}
		/**
		 * 图腾Icon列表显示
		 * @param tIconList 图腾类型列表
		 */
		initTotemIconList(tIconList: tables.DragonTotemVO[]): void {
			let totemId = 0; // 记录当前选中的图腾Id
			let isHasSelected = false; // 记录选中的图腾(除非图腾全部开启，否则选中当前进行中的图腾)
			let totemIndex = 0;	//记录当前开启中的图腾位置
			const totemTypeList: TotemIconData[] = [];
			tIconList.forEach((dTotemVo, dIndex) => {
				if (dTotemVo.visibility === 1) {
					const dTotemData: TotemIconData = new TotemIconData();
					dTotemData.tData = dTotemVo;
					const totemNetItem: NetMsg.ITotemNetItem = this.totemManager.getTotemNetItemOfTypeOfKey(dTotemVo.TotemType, dTotemVo.ID);
					// 当前的选中状态的图腾
					if (totemNetItem !== null) {
						if (!isHasSelected) {
							isHasSelected = true;
						}
						totemIndex++;
					} else {
						if (isHasSelected && totemId === 0) {
							totemId = dTotemVo.ID;
						}
					}
					dTotemData.tNetItem = totemNetItem;
					totemTypeList.push(dTotemData);
				}
			});
			// 如果没正在进行中或者开启的图腾，默认选中第一个
			let totemVo: TotemIconData;
			if (!isHasSelected) {
				totemVo = totemTypeList[0];
				totemVo.selected = true;
			} else if (totemId !== 0) {
				totemVo = totemTypeList[totemIndex];
				totemVo.selected = true;
			}
			this.dpsEventArgs(totemVo.tData);
			this.initTotemInfo(totemVo.tData, totemVo.tNetItem);
			this._listTotemIcon.repeatY = totemTypeList.length;
			this._listTotemIcon.array = totemTypeList;
			this._listTotemIcon.cells.forEach((item, cIndex) => {
				(item as TotemIconRender).dPSelectedItem = (s, e) => {
					const tData: tables.DragonTotemVO = item.dataSource.tData;
					const tNetItem: NetMsg.TotemNetItem = item.dataSource.tNetItem;
					// 选中图腾
					if (tData.ID === e.IDType) {
						item.setSelected(true);
						// 选中render通知上层事件
						this.dpsEventArgs(tData);
						// 右边信息显示
						this.initTotemInfo(tData, tNetItem);
						// 未选中刷新
						this._listTotemIcon.cells.forEach((item, cIndex) => {
							if ((item as TotemIconRender).dataSource !== null && (item as TotemIconRender).dataSource.tData.ID !== e.IDType) {
								item.setSelected(false);
							}
						});
					}
				};
			});
			// 0.1秒的延迟，防止开始刷新出问题
			Laya.timer.once(100, this, () => {
				if (this.isOpenState)
					return;
				this.isOpenState = true;
				// 判断条件1：显示数量不足6个时，不做位置跳转
				// 判断条件2：是否有开启或正在进行中的图腾，有才做跳转
				if (totemIndex > this.columns && isHasSelected)
					this._listTotemIcon.scrollTo(totemIndex - 1);
				this.refreshItemOfTotemId(totemId);
			});
		}
		/**
		 * 刷新传入ID图腾的状态
		 * @param totemId 图腾唯一Id
		 */
		refreshItemOfTotemId(totemId: number): void {
			let startSelectedIndex = 0;
			for (let item of this._listTotemIcon.cells) {
				//this._listTotemIcon.cells.forEach((item, cIndex) => {
				/** 查询服务器数据 */
				if (item instanceof TotemIconRender && (item as TotemIconRender).dataSource !== null && (item as TotemIconRender).dataSource.tData.ID === totemId) {
					const totemNetItem: NetMsg.ITotemNetItem = this.totemManager.getTotemNetItemOfTypeOfKey((item as TotemIconRender).dataSource.tData.TotemType, (item as TotemIconRender).dataSource.tData.ID);
					// 不存在就是未开启
					if (totemNetItem === null) {
						item.setTotemStute(true);
					} else {
						item.setTotemStute(false);
					}
				}
			}
			// if (_AllTotemMap.TryGetValue(_ToTemDataList[i].getKey(), out _ToTemItem)) {
			// 	if (_TotemNetItem == null) {
			// 		if (_ToTemDataList[i].triggerCondition == (int)SystemHelpModes.CompTask)
			// 		{
			// 			_ToTemItem.SetToTemStute = ToTemStute.JinXingZhong;
			// 		}
			// 		startSelectedIndex = i;
			// 		break;
			// 	}
			// 	else {
			// 		_ToTemItem.SetToTemStute = (ToTemStute)_TotemNetItem.ToTemStute;
			// 	}
			// }

			// if (totemID != 0) {
			// 	for (int i = 0; i < _ToTemDataList.Count; i++)
			// 	{
			// 		if (totemID == _ToTemDataList[i].getKey()) {
			// 			startSelectedIndex = i;
			// 			break;
			// 		}
			// 	}
			// }
		}
		/**
		 * 显示图腾右部信息
		 * @param totemIndex 
		 */
		private refreshRightTotemInfo(totemVo: tables.DragonTotemVO): void {
			if (totemVo === null)
				return;
			const job_Skill_Ids: string[] = totemVo.params_value.split(',');
			let magVo: tables.MagicInfoVO = null;
			for (let jobStr of job_Skill_Ids) {
				magVo = tableMgr.magicsTable.Find(parseInt(jobStr));
				if (magVo !== null) {
					if (magVo.ToOcuupation === gameIns.gameState.roleData.Occupation) {
						break;
					}
				}
			}
			if (magVo === null)
				return;
			this._textTotemName.text = Loca.getLang(`${totemVo.Title}`);
			this._htmlDesc1.innerHTML = Global.GetColorStringForNGUIText(ColorCode.totemDescTitle, Global.String.Format(ConfigLoca.UI_COMMON_TotemDescTitle, Loca.getLang(`${totemVo.Describle}`)));
			this._htmlDesc2.innerHTML = Global.GetColorStringForNGUIText(ColorCode.totemDescTitle, Global.String.Format(ConfigLoca.UI_COMMON_TotemGetSkillTitle, Loca.getLang(magVo.Name), "<br>" + Global.GetColorStringForNGUIText(ColorCode.normal, this.totemManager.getStringOfMagicVO(magVo))));
			this._htmlTotemTuJing.innerHTML = this.totemManager.getStringOfParamsKeyOfParamsValue(totemVo);//Global.GetColorStringForNGUIText(ColorCode.totemDescTitle, this.totemManager.getStringOfParamsKeyOfParamsValue(totemVo));
			this._imageRightSmall.skin = Global.getSkillIconPath(magVo.MagicIcon);
		}

		/**
		 * 显示Vip图腾右部信息
		 * @param totemIndex 
		 */
		private refreshRightVipTotemInfo(totemVo: tables.DragonTotemVO): void {
			if (totemVo === null)
				return;
			let tMagicVo: tables.TotemMagicVO = tableMgr.totemMagicTable.Find(parseInt(totemVo.params_value));
			if (tMagicVo === null)
				return;
			switch (tMagicVo.Key) {
				case TotemMagicTypes.AddBuff:
					break;
				case TotemMagicTypes.VIP:

					break;
				case TotemMagicTypes.Battle:
					break;
			}
			this._textTotemName.text = Loca.getLang(`${totemVo.Title}`);
			this._htmlDesc1.innerHTML = Global.GetColorStringForNGUIText(ColorCode.totemDescTitle, Global.String.Format(ConfigLoca.UI_COMMON_TotemDescTitle, Loca.getLang(`${totemVo.Describle}`)));
			this._htmlDesc2.innerHTML = Loca.getLang(`${tMagicVo.Describle}`);// "<font color='#97caf1' >【图腾效果】</font> <font color='#97caf1' >拾取装备自动回收。</font >"; // Global.GetColorStringForNGUIText(ColorCode.totemDescTitle, Loca.getLang(`${tMagicVo.Describle}`));
			this._htmlTotemTuJing.innerHTML = this.totemManager.getStringOfParamsKeyOfParamsValue(totemVo);
			this._imageRightSmall.skin = Global.getTotemImagePath(`${tMagicVo.Icon}`);
		}
		/**
		 * 图腾Info显示
		 * @param totemId 
		 */
		initTotemInfo(totemVo: tables.DragonTotemVO, tNetItem: NetMsg.ITotemNetItem): void {
			if (totemVo.TotemType === TotemTypeEnum.QiuLong || totemVo.TotemType === TotemTypeEnum.JiaoLong)
				this.refreshRightTotemInfo(totemVo);
			else
				this.refreshRightVipTotemInfo(totemVo);
			this.currTotemVo = totemVo;
			// 判断是否需要进行挑战图腾
			this._btnGoChallenge.visible = false;
			if (tNetItem === null) {
				// 螭龙图腾里不显示挑战按钮
				if (totemVo.params_key === TotemTypeEnum.LiLong) {
					this._btnGoChallenge.visible = false;
				} else {
					if (totemVo.params_key === ToTemAwardTypes.MainSkill) {
						const infoObj = this.totemManager.getTaskIDListOfTaskID2TaskID();
						const totemID: number = infoObj.totemId;			// 图腾Id
						const completeTasks: number = infoObj.completeTasks; // 进行任务
						const allTasks: number = infoObj.allTasks; // 所有任务数量
						let sliderValue = (completeTasks * 1) / (allTasks * 1);		//进度值
						if (sliderValue >= 1) {
							sliderValue = 1;
						}
						else {
							if (sliderValue <= 0) {
								sliderValue = 0;
							}
						}
						if (sliderValue === 1) {
							let taskVo = tableMgr.tasksTable.Find(parseInt(totemVo.Parameters));
							if (taskVo !== null && TableUtils.getFieldNumber(taskVo.TaskClass) === TaskClasses.TotemTask) {
								// 当选中的图腾是未开启、进度是100%的、图腾任务是正在做的，挑战按钮开放，反之隐藏
								if (totemVo.ID === totemID) {
									this._btnGoChallenge.visible = true;
								} else {
									this._btnGoChallenge.visible = false;
								}
							}
						}
					} else {
						this._btnGoChallenge.visible = true;
					}
				}
			}
		}
		/** 返回当前的显示图腾数据 */
		getCurrTotemVo(): tables.DragonTotemVO {
			return this.currTotemVo;
		}
		/** 选中render通知上层事件 */
		private dpsEventArgs(totemVo: tables.DragonTotemVO) {
			let dpsEventArgs = new DPSelectedItemEventArgs();
			dpsEventArgs.Data = totemVo;
			this.dPSelectedItem(this, dpsEventArgs);
		}

		/** 挑战图腾任务 */
		private onClickGoChallenge(): void {
			if (this.currTotemVo === null) {
				Global.Log.Error("当前图腾的效果跳转失败，错误的图腾信息");
				return;
			}
			const job_Skill_Ids: string[] = this.currTotemVo.params_value.split(',');
			let magVo: tables.MagicInfoVO = null;
			// magVo = tableMgr.magicsTable.Find(parseInt(jobStr));
			switch (this.currTotemVo.params_key) {
				case ToTemAwardTypes.MainSkill:
					const taskData: NetMsg.ITaskData = Task.getCurrentTotemTaskData();
					if (taskData !== null) {
						GmCommand.setOpenTotem(this.currTotemVo.ID);
						// 寻路完成任务 TODO 当前无怪，以后开
						// LogicTask.TaskBoxMini.prccessAutoTaskFindRoad(taskData.DoingTaskID);
					}
					break;
				case ToTemAwardTypes.PassiveSkill:
					GmCommand.setOpenTotem(this.currTotemVo.ID);
					//TODO 当前无爬塔功能，以后开
					return;
					if (TableUtils.getMapSceneUIClass(gameIns.gameState.roleData.MapCode) === SceneUIClasses.Normal) {
						const refObj = GongnengYugaoMgr.IsGongNengOpened(GongNengIDs.PaTa);
						if (refObj.isOpen) {
							uiMgr.hintText(UIHelper.HintGongNengOpenCondition(GongNengIDs.PaTa, refObj.trigger, refObj.param1, refObj.param2, false));
						}
					}
					break;
				case ToTemAwardTypes.ToTemMagic:

					break;
			}
		}
	}
}