namespace MyUI {
	import Handler = laya.utils.Handler;
	import Button = laya.ui.Button;

	/**
	 * 右下角区域显示状态
	 */
	enum BottomRightState {
		/** 无效显示（什么都不需要显示） */
		Invalid,
		/** NPC对话按钮显示 */
		NPCTalk,
		/** 技能显示 */
		Skill,
		/** 潜心修炼显示 */
		Meditation
	}

	/**
	 * 主界面
	 */
	export class MainView extends ui.MainUI.MainViewUI {
		private skillIcon: MainSkillIcon[]; // 技能图标列表

		private nCurSkillPage = -1; // 当前使用的技能页索引

		private m_lstAutoOffEvent: Base.MyEventAutoOff[] = []; // 事件监听列表

		private funOrderTop1Map = new Map<number, Button>();	// 上面1排功能Order表
		private funOrderTop2Map = new Map<number, Button>();	// 上面2排功能Order表
		private funOrderRight1Map = new Map<number, Button>();	// 右面1排功能Order表
		private funOrderRight2Map = new Map<number, Button>();	// 右面2排功能Order表
		private mBottomRightState: BottomRightState; // 右下角区域显示状态
		private mLeaderInSafe: boolean; // 主角是否在安全区
		private mLeaderNearNpc: boolean; // 主角附近是否有Npc
		private mMeditation: MeditationUI; // 主界面潜心修炼显示
		private mWindowID2ButtonMap: Map<WindowID, Button>; // 窗口Id对应的按钮字典
		private mFirstChargeHandler: Laya.Handler;	//首充状态Handler

		constructor() {
			super();

			this.name = MainView.name;
			this.mouseThrough = true;
			this.mWindowID2ButtonMap = new Map<WindowID, Button>();
			this._meditationHint.visible = false;
			this._redDotRefer.visible = true;
			this.skillIcon = [this._skillIcon0, this._skillIcon1, this._skillIcon2, this._skillIcon3, this._skillIcon4];
			this.initFunBtn();
			// 主界面按钮点击处理
			this.on(Laya.Event.CLICK, this, this._onViewClick);
			// 切换技能按钮点击处理
			this._btnPage.clickHandler = new Handler(this, () => {
				// if (!GongnengYugaoMgr.HintGongNengOpened(GongNengIDs.SkillSetup)) {
				// 	return;
				// }

				// TODO:
				let nPageIdx = Super.GData.m_nChoosePage;
				const nMaxPage = Super.GData.MainQuickKeyItems.length;
				let bHaveSkill = false;
				for (let i = 0; i < nMaxPage; ++i) {
					if (i !== nPageIdx) {
						bHaveSkill = Super.GData.MainQuickKeyItems[i].IsHaveSkill();
						if (bHaveSkill) break;
					}
				}
				if (!bHaveSkill) {
					uiMgr.hintText(Loca.getLang("只有一个技能组合，无法切换!"));
					return;
				}

				while (true) {
					nPageIdx += 1;
					if (nPageIdx >= nMaxPage) nPageIdx = 0;
					if (nPageIdx === Super.GData.m_nChoosePage) {
						return;
					} else {
						if (Super.GData.MainQuickKeyItems[nPageIdx].IsHaveSkill()) {
							break;
						}
					}
				}
				Super.GData.m_nChoosePage = nPageIdx;
				Super.SaveSkillQuickBar();
			});
			// 功能切换按钮点击处理
			this._btnSwitch.on(Laya.Event.CHANGE, this, () => { this.toggleFuncGroup(this._btnSwitch.selected); });
			// Npc对话按钮点击处理
			this._btnNpcTalk.clickHandler = new Handler(this, () => {
				// TODO: 等待NPCDialogPart完成后补上
			}, null, false);
			// 技能快捷配置更新处理
			this.m_lstAutoOffEvent.push(gameEventBus.quickKeyChange.on(this, this._refreshSkillIcon));
			// 经验更新处理
			this.m_lstAutoOffEvent.push(gameEventBus.expChange.on(this, this._updateExpBarUI));
			// 技能学习更新
			this.m_lstAutoOffEvent.push(gameEventBus.skillAdd.on(this, this.addLearnedSkill));
			// 功能开启提示
			this.m_lstAutoOffEvent.push(gameEventBus.funOpenTiShi.on(this, this.updateFunOpenTiShiShow));
			// 通知技能冷却
			Global.NotifyAddCoolDown = new Handler(this, this._notifySkillCooldown);
			// 功能开启提示显示状态
			this.m_lstAutoOffEvent.push(gameEventBus.funOpenTiShiShowState.on(this, this.showFunOpenTiShiObjState));
			// 功能按钮区域刷新
			this.m_lstAutoOffEvent.push(gameEventBus.mainViewBtnBoxRefresh.on(this, this.refreshFunBtnLocation));
			// 安全区通知事件
			this.m_lstAutoOffEvent.push(gameEventBus.safeRegionNotify.on(this, this.onSafeRegionNotify));
			// 潜心修炼时间通知
			this.m_lstAutoOffEvent.push(gameEventBus.meditationSecsNotify.on(this, this.onMeditationSecsNotify));

			// 初始化时更新显示
			this._refreshSkillIcon();
			this._updateExpBarUI();
			this._miniTask.refreshTasks();
			this._miniTask.refreshToTemInfo();
			if (this._btnSwitch.selected) {
				this._btnSwitch.selected = false;
			} else {
				this.toggleFuncGroup(false);
			}
		}

		/** @override */
		public destroy(destroyChild?: boolean) {
			ActivityTipManager.unregActivityTipItem(ActivityTipTypes.ShouCiChongZhi_YiLingQu, this.mFirstChargeHandler);
			ActivityTipManager.unregActivityTipItem(ActivityTipTypes.MeiRiChongZhi_YiLingQu, this.mFirstChargeHandler);
			ActivityTipManager.unregActivityTipItem(ActivityTipTypes.TeHuiHaoLiChongZhi_YiWanCheng, this.mFirstChargeHandler);
			ActivityTipManager.unregActivityTipItem(ActivityTipTypes.MeiRiLiBao_YiWanCheng, this.mFirstChargeHandler);
			this.mWindowID2ButtonMap.clear();
			this.m_lstAutoOffEvent.forEach(element => element.off());
			this.m_lstAutoOffEvent.length = 0;
			super.destroy(destroyChild);
			this.nCurSkillPage = -1;
			this.mWindowID2ButtonMap = null;
			this.mFirstChargeHandler = null;
		}

		/**
		 * 初始化功能按钮相关
		 */
		private initFunBtn() {
			// 存储功能按钮
			this.setFunOpenOrderMap(this._topGroup1, this.funOrderTop1Map);
			this.setFunOpenOrderMap(this._topGroup2, this.funOrderTop2Map);
			// this.setFunOpenOrderMap(this._groupFun, this.funOrderRight1Map);
			this.setFunOpenOrderMap(this._rightGroup1, this.funOrderRight2Map);
			this.setRight1BtnRedPoint();

			// 功能按钮的开启显示
			GongnengYugaoMgr.updateIcons();
			// 刷新功能按钮的位置(防止比如老号造成的功能开启问题会出现空档)
			this.topFunBtnLocation(this.funOrderTop1Map);
			this.topFunBtnLocation(this.funOrderTop2Map);
			this.rightFunBtnLocation();

			// 注册主界面按钮的小红点
			for (const [key, value] of this.mWindowID2ButtonMap) {
				const type = windowMgr.getActivityTipTypeByWindowID(key);
				if (type !== ActivityTipTypes.Invalid) {
					ActivityTipManager.regActivityTipRedDot(type, attachRedDotToSprite(value, 50, 6));
				}
			}
			this.mFirstChargeHandler = new Laya.Handler(this, () => {
				this.getFirstChargeBtnState();
			}, null, false);
			ActivityTipManager.regActivityTipItem(ActivityTipTypes.ShouCiChongZhi_YiLingQu, this.mFirstChargeHandler);
			ActivityTipManager.regActivityTipItem(ActivityTipTypes.MeiRiChongZhi_YiLingQu, this.mFirstChargeHandler);
			ActivityTipManager.regActivityTipItem(ActivityTipTypes.TeHuiHaoLiChongZhi_YiWanCheng, this.mFirstChargeHandler);
			ActivityTipManager.regActivityTipItem(ActivityTipTypes.MeiRiLiBao_YiWanCheng, this.mFirstChargeHandler);
		}

		/**
         * 1秒种最多执行5次的更新函数.适合不及时的逻辑
         * @param elapsedTime 上次调用以来经过的时间(秒)
         */
		public slowUpdate(elapsedTime: number): void {

		}

		/**
         * 每帧被调用
         * @param   elapsedTime 上次调用以来经过的时间(秒)
         */
		frameMove(elapsedTime: number): void {
			// 雷达图刷新
			this._radarMap && this._radarMap.frameMove(elapsedTime);
			// 小红点动画基准索引更新
			this._redDotRefer && this._redDotRefer.updateBenchmarkIndex();
		}

		/**
		 * 更新雷达图显示
		 * @param nLevelID 关卡ID
		 */
		updateRadarMap(nLevelId: number): void {
			this._radarMap.updateUI(nLevelId);
		}

		/**
		 * 显示Actor头像
		 * @param actor actor对象
		 */
		showActorHead(actor: Logic.CharacterBaseActor) {
			if (actor.isMonster()) {
				this._headNetPlayer.visible = false;
				this._headMonster.visible = true;
				this._headMonster.updateUI(actor);
			} else if (actor.isNetPlayer()) {
				this._headMonster.visible = false;
				this._headNetPlayer.visible = true;
				this._headNetPlayer.updateUI(actor);
			}
		}

		/**
		 * 隐藏Actor头像
		 * @param nActorID 如果传入了ActorID，则只有当前显示的ActorID一致时才隐藏
		 */
		public hideActorHead(nActorId: number) {
			if (Global.isNullOrUndefined(nActorId)) {
				this._headMonster.visible = false;
				this._headNetPlayer.visible = false;
				return;
			}

			if (nActorId === this._headMonster.monsterId) {
				this._headMonster.visible = false;
			} else if (nActorId === this._headNetPlayer.roleID) {
				this._headNetPlayer.visible = false;
			}
		}

		/**
		 * 主界面点击处理
		 * @param e 
		 */
		private _onViewClick(e: Laya.Event) {
			// 过滤功能按钮点击
			if (!(e.target instanceof Button)) return;
			const sName = e.target.name;
			if (!sName.startsWith("btnFunc_")) return;
			// 找出功能按钮对应的窗口
			const aNames = sName.split("_");
			const nBtnId = parseInt(aNames[1]);
			this.showWindow(nBtnId);
			// 首充、特惠豪礼、每日充值按钮点击后小红点隐藏
			if (nBtnId === WindowID.FirstCharge)
				this.setRedDotShowState(this.mWindowID2ButtonMap.get(33), false);
		}

		/**
		 * 显示窗口
		 * @param nWinID 窗口Id
		 */
		private showWindow(nWinId: number) {
			windowMgr.openWindow(nWinId);
		}

		/**
		 * 更新技能图标
		 */
		private _refreshSkillIcon() {
			// 解析技能配置
			Super.InitMainQuickKeys();
			Super.ParseMainQuickKeys(gameIns.gameState.roleData.MainQuickBarKeys);
			if (this.nCurSkillPage === -1) {
				this.nCurSkillPage = Super.GData.m_nChoosePage;
			}

			const nPageIdx = Super.GData.m_nChoosePage;
			const theQuickKeyItems = Super.GData.MainQuickKeyItems[nPageIdx].MainQuickKeyItems;
			const nLength = theQuickKeyItems.length;
			for (let i = 0; i < nLength; i++) {
				const quickKeyItem = theQuickKeyItems[i];
				if (quickKeyItem) {
					this.skillIcon[i].updateUI(Global.GetSkillDataByID(quickKeyItem.ID));
				} else {
					this.skillIcon[i].updateUI();
				}
			}

			if (this.nCurSkillPage !== nPageIdx) {
				this.nCurSkillPage = nPageIdx;
				const kThisInfo = Super.GData.MainQuickKeyItems[nPageIdx];
				let sName = "";
				if (Global.String.IsNullOrWhiteSpace(kThisInfo.sPageName)) {
					sName = Global.String.Format(Loca.getLang("技能组合{0}"), (nPageIdx + 1));
				} else {
					sName = kThisInfo.sPageName;
				}
				const sTishi = Global.String.Format(Loca.getLang("成功切换至{0}"), sName);
				uiMgr.hintText(sTishi);
			}

			this._btnPage.label = (nPageIdx + 1).toString();
			if (Global.Data.roleData.IsFlashPlayer === 0) {
				let skillCount = 0;
				if (Global.Data.roleData.SkillDataList) {
					for (let j = 0; j < Global.Data.roleData.SkillDataList.length; ++j) {
						const xmlItme = tableMgr.magicsTable.Find(Global.Data.roleData.SkillDataList[j].SkillID);
						if (xmlItme) {
							const actionIndex = xmlItme.ActionIndex;
							if (actionIndex >= 1000) { // 使用但是不显示的技能
								continue;
							}
							++skillCount;
						}
					}
					this.setSkillIconCount(skillCount);
				}
			}
		}

		/**
		 * 设置显示的技能按钮个数
		 * @param count 
		 */
		private setSkillIconCount(count: number) {
			this.skillIcon[1].lock = !(count > 0);
			this.skillIcon[2].lock = !(count > 1);
			this.skillIcon[0].lock = !(count > 2);
			this.skillIcon[3].lock = !(count > 3);
			this.skillIcon[4].lock = !(count > 4);
		}

		/**
		 * 通知技能冷却
		 * @param nSkillID 技能ID
		 * @param nCooldown 冷却时间
		 */
		private _notifySkillCooldown(nSkillId: number, nCooldown: number) {
			this.skillIcon.forEach(
				element => {
					if (element.skillID === nSkillId) {
						element.totalCooldown = nCooldown;
					}
				}
			);
		}

		/**
		 * 更新经验条显示
		 */
		private _updateExpBarUI() {
			const datLeader = Global.Data.roleData;
			const nMaxExp = TableUtils.getExpByLevel(datLeader.Level, datLeader.ChangeLifeCount);
			this._txtExp.text = `${datLeader.Experience} / ${nMaxExp}`;
			this._progBarExp.value = <number>datLeader.Experience / nMaxExp;
		}
		/**
		 * 学会新技能
		 * @param skillID    技能ID
		 */
		addLearnedSkill(skillId: number) {
			const skillData = Global.GetSkillDataByID(skillId);
			if (null != skillData) {
				// 查找技能空位
				const quickKeyItemIndex = this.findBlankItem();
				if (quickKeyItemIndex >= 0) {
					const xmlItem = tableMgr.magicsTable.Find(skillId);
					const magAttInfo = tableMgr.magicAttacksTable.Find(xmlItem.FirstMagicAttackID);
					if (magAttInfo != null) {
						const magicType = magAttInfo.MagicAttackType;
						const actionIndex = xmlItem.ActionIndex;
						if (magicType >= 0 && magicType < 3 && actionIndex < 1000) { // 如果是被动技能或者自动触发的技能, 则不加入
							this.addLearnedSkillReal(skillId, quickKeyItemIndex, magicType);
						}
					}
				}
			}
		}
		// 查找技能空位
		private findBlankItem(): number {
			const nChoosePage = Super.GData.m_nChoosePage;
			const quickKeyItems = Super.GData.MainQuickKeyItems[nChoosePage].MainQuickKeyItems;
			// 优先选择位置1
			if (null == quickKeyItems[1] || quickKeyItems[1].ItemType < 0)
				return 1;
			else if (null == quickKeyItems[2] || quickKeyItems[2].ItemType < 0)
				return 2;
			else if (null == quickKeyItems[0] || quickKeyItems[0].ItemType < 0)
				return 0;
			else if (null == quickKeyItems[3] || quickKeyItems[3].ItemType < 0)
				return 3;
			else if (null == quickKeyItems[4] || quickKeyItems[4].ItemType < 0)
				return 4;
			return -1;
		}
		/**
		 * 学会新技能并记录配置
		 * @param skillID    技能ID
		 * @param index    		技能位置
		 * @param magicType    技能招式类型
		 */
		private addLearnedSkillReal(skillId: number, index: number, magicType: number) {
			const nChoosePage = Super.GData.m_nChoosePage;
			const quickKeyItems = Super.GData.MainQuickKeyItems/*.Clone() as SkillQuickKeyPageInfo[]*/;
			const pagequickKeyItems = quickKeyItems[nChoosePage].MainQuickKeyItems;
			// 如果对应位置有技能存在，则该位置重置
			for (let i = 0; i < pagequickKeyItems.length; ++i) {
				const item = pagequickKeyItems[i];
				if (null != item && item.ID === skillId) {
					item.ItemType = -1;
					item.ID = 0;
				}
			}
			// 对应位置记录技能
			pagequickKeyItems[index] = new QuickKeyItem();
			// with(quickKeyItems[index])
			{
				pagequickKeyItems[index].ItemType = 0;
				pagequickKeyItems[index].ID = skillId;
			}
			// trace("AddLearnedSkillReal, skillId=" + skillId);
			const keys = Super.GetSkillQuickKeys(quickKeyItems);
			gameIns.gameState.roleData.MainQuickBarKeys = keys; // 不能等待返回，否则，如果连续的学习，会导致前边的被后边的覆盖掉
			Super.ParseMainQuickKeys(Global.Data.roleData.MainQuickBarKeys);
			// trace("AddLearnedSkillReal, keys=" + keys);
			// GameInstance.Game.SpriteModKeys(0, keys);
			Net.sendModKeys(0, keys);
			if (1 === magicType || 2 === magicType) {
				// if (ConfigMagicInfos.CanSkillByBangDing(skillId, false))
				// {
				// 	Global.Data.GameScene.SetDefaultSkillID(skillId);
				// }
			}
			this._refreshSkillIcon();
		}
		/**
		 * 更新功能开启提示显示
		 * @param openId           功能开启ID
		 * @param taskNums         功能开启任务数量
		 * @param pickUpState      达成状态
		 * @returns {} 
		 */
		private updateFunOpenTiShiShow(openId: number, taskNums: number, pickUpState: boolean) {
			this._funOpenTiShiBox.updateFunOpenTiShiShow(openId, taskNums, pickUpState);
		}
		/**
		 * 功能开启提示显示状态
		 * @param isShowState          
		 * @returns {} 
		 */
		private showFunOpenTiShiObjState(isShowState: boolean) {
			this._funOpenTiShiBox.showFunOpenTiShiObjState(isShowState);
		}
		/**
		 * 注册主界面里的对应功能按钮到功能开启显示与飞图标 和 位置管理列表
		 * @param hBox		按钮所在容器
		 * @param btnMap	按钮管理列表
		 * @returns {} 
		 */
		private setFunOpenOrderMap(hBox: Laya.Box, btnMap: Map<number, Button>) {
			let cBtn = null;
			let aNames: string[];
			let btnNameId: number;
			const hLen = hBox.numChildren;
			for (let i = 0; i < hLen; i++) {
				cBtn = hBox.getChildAt(i);
				if (!(cBtn instanceof Button)) continue;
				cBtn.visible = false;
				if (Global.String.IsNullOrWhiteSpace(cBtn.name)) continue;
				aNames = cBtn.name.split("_");
				if (aNames[0] !== "btnFunc") continue;
				btnNameId = parseInt(aNames[1]);
				if (Number.isNaN(btnNameId)) continue;
				Global.Log.Assert(!this.mWindowID2ButtonMap.has(btnNameId), `${WindowID[btnNameId]} in mWindowID2ButtonMap already existed!!!`);
				this.mWindowID2ButtonMap.set(btnNameId, cBtn);
				btnMap.set(this.getBtnOrderId(btnNameId), cBtn);
				GongnengYugaoMgr.addIcon(this.getBtnOrderId(btnNameId), cBtn);
				cBtn.visible = btnNameId === WindowID.FirstCharge;
			}
		}
		/**
		 * 返回对应功能按钮的OrderId  
		 * @param btnNameId		(按钮name格式  btnFunc_1000 1000为按钮功能代号，并不是功能开启ID)
		 * @returns {} 
		 */
		private getBtnOrderId(btnNameId: number): number {
			switch (btnNameId) {
				case WindowID.Role:
				case WindowID.Parcel: return SystemOpenOrderEnum.RenWu;              // 人物
				case WindowID.ZunTianLu: return SystemOpenOrderEnum.ZhuangBeiDaZao;      // 尊天炉
				case WindowID.ActivityWindow: return SystemOpenOrderEnum.QingQiuMiJing;     // 冒险
				case WindowID.WelfareWindow: return SystemOpenOrderEnum.FuLi;              // 福利
				case WindowID.ZuoQiWindow: return SystemOpenOrderEnum.QiChong;             // 骑宠
				case WindowID.MallWindow: return SystemOpenOrderEnum.ShangCheng;           // 商城	
				case WindowID.EquipFuBen: return SystemOpenOrderEnum.QingQiuMiJing;		// 装备副本	
			}
			return -1;
		}
		/**
		 * 功能按钮区域位置刷新
		 * @param orderId      功能orderId
		 */
		private refreshFunBtnLocation(orderId: number) {
			// 判断哪个区域的按钮，刷新
			if (this.funOrderTop1Map.get(orderId)) {
				this.topFunBtnLocation(this.funOrderTop1Map);
			}
			else if (this.funOrderTop2Map.get(orderId)) {
				this.topFunBtnLocation(this.funOrderTop2Map);
			}
			else if (this.funOrderRight2Map.get(orderId)) {
				this.rightFunBtnLocation();
				if (this._bottomRightGroup.visible) {
					this.toggleFuncGroup(true);
				}
			}
		}
		/**
		 * 上边按钮区域刷新位置
		 * @param btnMap 	  按钮列表
		 */
		private topFunBtnLocation(btnMap: Map<number, Button>) {
			let index = 0;
			for (const [keys, value] of btnMap) {
				if (value.visible) {
					value.x = index * (-value.width - 1);
					index++;
				}
			}
		}
		/**
		 * 右边按钮区域刷新位置
		 */
		private rightFunBtnLocation() {
			let index = 0;        // 统计开启显示的数量
			let line = 0;			// 行数
			let column = 0;		// 列数
			for (const [keys, value] of this.funOrderRight2Map) {
				if (value.visible) {
					line = Math.floor(index / 3);
					column = index % 3;
					value.x = column * (-value.width - 1);
					value.y = line * (value.height + 1);
					// Global.Log.Error("keys = " + keys + "   line = " + line + "   column = " + column + "    width = " + (-value.width - 1) + "      value.y  = " + value.y );
					index++;
				}
			}
		}

		/**
		 * 设置右下角区域显示状态
		 * @param eState 显示状态
		 */
		public setBottomRightState(eState: BottomRightState) {
			if (this.mBottomRightState !== eState) {
				this.mBottomRightState = eState;
				this._groupSkill.visible = eState === BottomRightState.Skill;
				this._btnNpcTalk.visible = eState === BottomRightState.NPCTalk;
				// 此处只控制潜心修炼的隐藏和显示，模块的销毁的创建由消息控制
				this.mMeditation && (this.mMeditation.visible = eState === BottomRightState.Meditation);
			}
		}
		/**
		 * 右边_groupFun功能按钮
		 */
		private setRight1BtnRedPoint() {
			let cBtn = null;
			let aNames: string[];
			let btnNameId: number;
			const hLen = this._groupFun.numChildren;
			for (let i = 0; i < hLen; i++) {
				cBtn = this._groupFun.getChildAt(i);
				if (!(cBtn instanceof Button)) continue;
				if (Global.String.IsNullOrWhiteSpace(cBtn.name)) continue;
				aNames = cBtn.name.split("_");
				if (aNames[0] !== "btnFunc") continue;
				btnNameId = parseInt(aNames[1]);
				if (Number.isNaN(btnNameId)) continue;
				this.mWindowID2ButtonMap.set(btnNameId, cBtn);
			}
		}
		/**
		 * 首充状态改变
		 */
		private getFirstChargeBtnState() {
			// 首次充值-已领取
			const chargeBtn = this.mWindowID2ButtonMap.get(33);
			let chargeItem = ActivityTipManager.GetActivityTipItem(ActivityTipTypes.ShouCiChongZhi_YiLingQu);
			if (!chargeItem.IsActive) {
				this.setRedDotShowState(chargeBtn, true);
				chargeBtn.label = ConfigLoca.UI_SysName_FirstCharge;
				chargeBtn.skin = Global.getMainAtlasImgPath("btn_func_shouchong");
				return;
			}
			// 特惠豪礼-已完成
			chargeItem = ActivityTipManager.GetActivityTipItem(ActivityTipTypes.TeHuiHaoLiChongZhi_YiWanCheng);
			if (!chargeItem.IsActive) {
				this.setRedDotShowState(chargeBtn, true);
				chargeBtn.label = ConfigLoca.UI_SysName_TeHuiHaoLi;
				chargeBtn.skin = Global.getMainAtlasImgPath("btn_func_zhoumojiazeng");
				return;
			}
			// 每日礼包-已全部完成
			chargeItem = ActivityTipManager.GetActivityTipItem(ActivityTipTypes.MeiRiLiBao_YiWanCheng);
			if (!chargeItem.IsActive) {
				this.setRedDotShowState(chargeBtn, true);
				chargeBtn.label = ConfigLoca.UI_SysName_DayGift;
				chargeBtn.skin = Global.getMainAtlasImgPath("btn_func_meirichongzhi");
				return;
			}
			this.setRedDotShowState(chargeBtn);
			chargeBtn.label = ConfigLoca.UI_VIP_ChongZhiTitle;
			chargeBtn.skin = Global.getMainAtlasImgPath("btn_func_chongzhi");
		}
		/**
		 * 按钮小红点显示状态(只用于1次性显示的，如首充这样上线就显示，触发一次就隐藏的)
		 * @param btn 按钮
		 * @param state 小红点显示状态
		 */
		private setRedDotShowState(btn: Laya.Button, state: boolean = false): void {
			const rDot = attachRedDotToSprite(btn, 50, 6);
			rDot.visible = state;
		}

		/**
		 * 显示或隐藏功能按钮组
		 * @param value true=显示、false=隐藏
		 */
		private toggleFuncGroup(value: boolean) {
			Laya.Tween.clearAll(this._rightGroup1);
			if (value) {
				this._bottomRightGroup.visible = false;
				Laya.Tween.to(this._rightGroup1, { x: -10 }, 500, null, null, 0, true);
			} else {
				const handler = new Laya.Handler(this, () => { this._bottomRightGroup.visible = true; });
				Laya.Tween.to(this._rightGroup1, { x: 220 }, 500, null, handler, 0, true);
			}
		}

		/**
		 * 安全区变更
		 * @param bInSafe true=进入安全区、false=离开安全区
		 * @param bNearNpc 附近是否有Npc
		 */
		private onSafeRegionNotify(bInSafe: boolean, bNearNpc: boolean) {
			this.mLeaderInSafe = bInSafe;
			this.mLeaderNearNpc = bNearNpc;
			if (bNearNpc) {
				this.setBottomRightState(BottomRightState.NPCTalk);
			} else {
				this.setBottomRightState(bInSafe ? BottomRightState.Invalid : BottomRightState.Skill);
			}
		}

		/**
		 * 打开或关闭主界面潜心修炼
		 * @param bToggle true=打开、false=关闭
		 */
		public toggleMeditation(bToggle: boolean) {
			if (bToggle) {
				if (!this.mMeditation) {
					this.mMeditation = new MeditationUI();
					this._bottomRightGroup.addChild(this.mMeditation);
					this.mMeditation.right = 24;
					this.mMeditation.bottom = 4;
				}
				this.setBottomRightState(BottomRightState.Meditation);
				this._meditationHint.visible = true;
				this.onMeditationSecsNotify();
			} else {
				if (this.mMeditation) {
					this.mMeditation.destroy(true);
					this.mMeditation = null;
				}
				this._meditationHint.visible = false;
				this.onSafeRegionNotify(this.mLeaderInSafe, this.mLeaderNearNpc);
			}
		}

		/**
		 * 潜心修炼时间通知
		 */
		private onMeditationSecsNotify() {
			if (this.mMeditation) {
				this.mMeditation.setRewardInfo(Global.Data.MeditateSecs1, Global.Data.MeditateSecs2);
			}
		}
	}
}