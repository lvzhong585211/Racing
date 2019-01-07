namespace MyUI {
	/** 
	 * 窗口数据
	 */
	export class WindowData {
		/** 窗口Id */
		public winId: WindowID = WindowID.Invalid;
		/** 窗口标题 */
		public title: string;
		/** 子窗口Id列表 */
		public childWinIds: WindowID[];
		/** 父窗口Id */
		public parentWinId: WindowID = WindowID.Invalid;

		/** 获取父窗口是否存在 */
		public get parentIsExistence(): boolean {
			return this.parentWinId !== WindowID.Invalid;
		}

		/**
		 * 添加子窗口Id
		 * @param nWinId 窗口Id
		 */
		public addChildWinId(nWinId: number): void {
			!this.childWinIds && (this.childWinIds = []);
			Global.Log.Assert(this.childWinIds.indexOf(nWinId) === -1, `addChildWinId(${WindowID[nWinId]}) already existed!!!`);
			this.childWinIds.push(nWinId);
		}

		/** @private */
		private mCheckHandler: Laya.Handler;
		/**
		 * 设置检查该窗口可以打开需要满足的条件的Handler </br>
		 * 参数：nWinId=窗口Id、bHint=是否提示信息
		 * function(nWinId : WindowID, bHint : boolean) : boolean </br>
		 * 返回：true=满足打开条件、false=不满足打开条件
		 */
		public setCheckHandler(chkHandler: Laya.Handler): WindowData {
			this.mCheckHandler = chkHandler;
			return this;
		}

		/**
		 * 设置检查该窗口可以打开需要满足的条件的Function </br>
		 * 参数：nWinId=窗口Id、bHint=是否提示信息
		 * function(nWinId : WindowID, bHint : boolean) : boolean </br>
		 * 返回：true=满足打开条件、false=不满足打开条件
		 */
		public setCheckFunction(chkFunc: Function): WindowData {
			this.mCheckHandler = new Laya.Handler(this, chkFunc, null, false);
			return this;
		}

		/**
		 * 窗口是否可以打开（满足checkHandler的打开条件）
		 * @param bHint 是否提示不满足的条件
		 */
		public canOpen(bHint: boolean): boolean {
			let bValid = true;
			if (this.mCheckHandler) {
				bValid = this.mCheckHandler.runWith([this.winId, bHint]);
			}
			return bValid;
		}
	}

	/**
	 * 功能窗口管理器
	 */
	export class WindowManager extends laya.ui.DialogManager {
		/** 窗口对象字典，key=窗口Id、value=窗口对象 */
		private mWindowInstanceMap: Map<WindowID, Laya.Dialog>;
		/** 窗口数据对象字典，key=窗口Id、value=窗口数据对象 */
		private mWindowDataMap: Map<WindowID, WindowData>;
		/** 窗口类原型字典，key=窗口Id、value=类原型 */
		private mWindowClassMap: Map<WindowID, { new () }>;

		/** 小红点类型到窗口Id的映射字典 */
		private mActivityTipType2WindowIDMap: Map<ActivityTipTypes, WindowID>;
		/** 窗口Id到小红点类型的映射字典 */
		private mWindowID2ActivityTipTypeMap: Map<WindowID, ActivityTipTypes>;

		constructor() {
			super();

			this.name = WindowManager.name;
			this.mouseThrough = true;
			this.mWindowInstanceMap = new Map<WindowID, Laya.Dialog>();
			this.mWindowDataMap = new Map<WindowID, WindowData>();
			this.mWindowClassMap = new Map<WindowID, { new () }>();
			this.mActivityTipType2WindowIDMap = new Map<ActivityTipTypes, WindowID>();
			this.mWindowID2ActivityTipTypeMap = new Map<WindowID, ActivityTipTypes>();
			Laya.stage.on(Laya.Event.RESIZE, this, (e) => {
				this.size(Laya.stage.width, Laya.stage.height);
				this.event(Laya.Event.RESIZE);
			}, null);
			this.visible = false;
		}

		/** @override */
		public destroy(destroyChild?: boolean) {
			this.mWindowInstanceMap.forEach(value => value.destroy(destroyChild));
			this.mWindowInstanceMap.clear();
			this.mWindowDataMap.clear();
			this.mWindowClassMap.clear();
			this.mActivityTipType2WindowIDMap.clear();
			this.mWindowID2ActivityTipTypeMap.clear();
			super.destroy(destroyChild);
			this.mWindowInstanceMap = null;
			this.mWindowDataMap = null;
			this.mWindowClassMap = null;
			this.mActivityTipType2WindowIDMap = null;
			this.mWindowID2ActivityTipTypeMap = null;
		}

		/**
		 * 初始化管理器
		 */
		public initializeManager() {
			this.registerWindows();
			this.registerActivityTipTypes();
		}

		/**
		 * 注册所有窗口
		 */
		private registerWindows() {
			this.regWin(WindowID.RoleWindow, MyUI.Role.RoleWindow);
			this.regWin(WindowID.Parcel, MyUI.Role.ParcelPart, ConfigLoca.UI_SysName_Parcel, WindowID.RoleWindow);
			this.regWin(WindowID.Role, MyUI.Role.RolePart, ConfigLoca.UI_SysName_Role, WindowID.RoleWindow);
			this.regWin(WindowID.Skill, MyUI.Role.SkillPart, ConfigLoca.UI_SysName_Skill, WindowID.RoleWindow);
			this.regWin(WindowID.GoodsTip, MyUI.GoodsTip);
			this.regWin(WindowID.EquipTip, MyUI.EquipTip);
			this.regWin(WindowID.NpcDoingTask, MyUI.NpcDoingTaskPart);
			this.regWin(WindowID.ZunTianLu, MyUI.Forge.ForgeWindow).
				setCheckFunction(this.checkWindowIsOpen);
			this.regWin(WindowID.PromptBox, MyUI.PromptBox);
			this.regWin(WindowID.ActivityWindow, MyUI.Activity.ActivityWindow);
			this.regWin(WindowID.MaoXian, MyUI.Activity.ActivityPart, ConfigLoca.UI_SysName_Activity_Adventure, WindowID.ActivityWindow);
			this.regWin(WindowID.ZhanChang, null, ConfigLoca.UI_SysName_Activity_BattleGround, WindowID.ActivityWindow);
			this.regWin(WindowID.Map, MyUI.MapUI.MapWindow);
			this.regWin(WindowID.FunOpenTiShiPart, MyUI.FunOpenTiShiPart);
			this.regWin(WindowID.SystemOpenFlyPart, MyUI.SystemOpenFlyPart);
			this.regWin(WindowID.Vip, MyUI.VipPart);
			this.regWin(WindowID.WelfareWindow, MyUI.Welfare.WelfareWindow);
			this.regWin(WindowID.SevenLogin, MyUI.Welfare.SevenDayLoginPart, ConfigLoca.UI_SysName_Welfare_SevenLogin, WindowID.WelfareWindow);
			this.regWin(WindowID.DailyWelfare, MyUI.Welfare.DailyWelfarePart, ConfigLoca.UI_SysName_Welfare_DailyWelfare, WindowID.WelfareWindow);
			this.regWin(WindowID.OnlineReward, MyUI.Welfare.OnlineRewardPart, ConfigLoca.UI_SysName_Welfare_OnlineReward, WindowID.DailyWelfare);
			this.regWin(WindowID.GradeReward, MyUI.Welfare.GradeRewardPart, ConfigLoca.UI_SysName_Welfare_GradeReward, WindowID.DailyWelfare);
			this.regWin(WindowID.MeditationReward, MyUI.Welfare.MeditationPart, ConfigLoca.UI_SysName_Welfare_Meditation, WindowID.DailyWelfare);
			this.regWin(WindowID.MallWindow, MyUI.Mall.MallWindow);
			this.regWin(WindowID.Mall, MyUI.Mall.MallPart, ConfigLoca.UI_SysName_Activity_Mall, WindowID.MallWindow);
			this.regWin(WindowID.Business, MyUI.BusinessPart, ConfigLoca.UI_SysName_BusinessMan, WindowID.MallWindow);
			this.regWin(WindowID.FirstCharge, MyUI.FirstChargePart);
			this.regWin(WindowID.ZuoQiWindow, null).
				setCheckFunction(this.checkWindowIsOpen);
			this.regWin(WindowID.NPCDialog, MyUI.NPCDialogPart);
			this.regWin(WindowID.PropertyWindow, MyUI.Role.PropertyWindow);
			this.regWin(WindowID.AttributePoint, MyUI.Role.AttributePointWindow);
			this.regWin(WindowID.ChargeWelfare, MyUI.Welfare.ChargeWelfarePart, ConfigLoca.UI_SysName_Welfare_ChargeWelfare, WindowID.WelfareWindow);
			this.regWin(WindowID.Totem, MyUI.TotemWindow);
			this.regWin(WindowID.QiuLongTotem, MyUI.TotemPart, ConfigLoca.UI_SysName_Totem_QiuLong, WindowID.Totem);
			this.regWin(WindowID.JiaoLongTotem, null, ConfigLoca.UI_SysName_Totem_JiaoLong, WindowID.Totem);
			this.regWin(WindowID.LiLongTotem, null, ConfigLoca.UI_SysName_Totem_LiLong, WindowID.Totem);
			this.regWin(WindowID.EquipFuBen, MyUI.EquipFuBenPart, ConfigLoca.UI_SysName_FuBen_Equip);
		}

		/**
		 * 注册活动提示类型（小红点）</br>
		 * 注意：并不是所有窗口都需要注册小红点，如果确实需要再注册
		 */
		private registerActivityTipTypes() {
			this.regTip(WindowID.WelfareWindow, ActivityTipTypes.MainFuLiIcon);
			this.regTip(WindowID.DailyWelfare, ActivityTipTypes.FuLiDailyWelfare);
			this.regTip(WindowID.SevenLogin, ActivityTipTypes.SevenDayLogin);

			this.regTip(WindowID.Parcel, ActivityTipTypes.MainRoleIcon);
			this.regTip(WindowID.Skill, ActivityTipTypes.RoleSkillLevel);
		}

		/**
		 * 注册窗口
		 * @param nWinId 窗口Id
		 * @param clsWin 窗口类原型
		 * @param sTitle 窗口标题
		 * @param nParentId 父窗口Id
		 */
		private regWin(nWinId: WindowID, clsWin: { new () }, sTitle = "", nParentId = WindowID.Invalid): WindowData {
			// 重复注册检查
			Global.Log.Assert(!this.mWindowDataMap.has(nWinId), `Window(${WindowID[nWinId]}) in mWindowDataMap already existed!!!`);
			if (clsWin) {
				Global.Log.Assert(!this.mWindowClassMap.has(nWinId), `Window(${WindowID[nWinId]}) in mWindowClassMap already existed!!!`);
				this.mWindowClassMap.set(nWinId, clsWin);
			}

			// 实例化窗口数据
			const datWin = new WindowData();
			datWin.winId = nWinId;
			datWin.title = sTitle;
			datWin.parentWinId = nParentId;
			this.mWindowDataMap.set(nWinId, datWin);
			if (nParentId !== WindowID.Invalid) {
				const winParent = this.getWindowData(nParentId);
				winParent.addChildWinId(nWinId);
			}
			return datWin;
		}

		/**
		 * 注册窗口和对应的活动提示类型（小红点）
		 * @param nWinId 窗口Id
		 * @param type 活动提示类型（小红点）
		 */
		private regTip(nWinId: WindowID, type: ActivityTipTypes) {
			Global.Log.Assert(!this.mWindowID2ActivityTipTypeMap.has(nWinId), `${WindowID[nWinId]} in mWindowID2TipTypeMap already existed!!!`);
			this.mWindowID2ActivityTipTypeMap.set(nWinId, type);
			this.mActivityTipType2WindowIDMap.set(type, nWinId);
		}

		/**
		 * 通过窗口Id获取活动提示类型（小红点）
		 * @param nWinId 窗口Id
		 */
		public getActivityTipTypeByWindowID(nWinId: WindowID): ActivityTipTypes {
			if (this.mWindowID2ActivityTipTypeMap.has(nWinId)) {
				return this.mWindowID2ActivityTipTypeMap.get(nWinId);
			}
			return ActivityTipTypes.Invalid;
		}

		/**
		 * 通过活动提示类型（小红点）获取窗口Id
		 * @param type 活动提示类型（小红点）
		 */
		public getWindowIDByActivityTipType(type: ActivityTipTypes): WindowID {
			if (this.mActivityTipType2WindowIDMap.has(type)) {
				return this.mActivityTipType2WindowIDMap.get(type);
			}
			return WindowID.Invalid;
		}

		/**
		 * 获取窗口Id对应的窗口数据
		 * @param nWinId 窗口Id
		 */
		public getWindowData(nWinId: WindowID): WindowData {
			Global.Log.Assert(this.mWindowDataMap.has(nWinId), `Window(${WindowID[nWinId]}) in mWindowDataMap not existed!!!`);
			return this.mWindowDataMap.get(nWinId);
		}

		/**
		 * 获取窗口Id对应的根节点窗口数据
		 * @param nWinId 窗口Id
		 */
		public getRootWindowData(nWinId: WindowID): WindowData {
			let datWin = this.getWindowData(nWinId);
			while (datWin.parentIsExistence) {
				datWin = this.getWindowData(datWin.parentWinId);
			}
			return datWin;
		}

		/**
		 * 窗口是否可以打开（满足checkHandler条件）
		 * @param nWinId 窗口Id
		 * @param bHint 是否提示不能打开的原因，默认值true
		 */
		public getWindowCanOpen(nWinId: WindowID, bHint = true): boolean {
			return this.getWindowData(nWinId).canOpen(bHint);
		}

		/**
		 * 打开一个窗口（根据窗口Id打开）
		 * @param nWinId 窗口Id
		 * @param closeOther 是否关闭其它的对话框，若值为true则关闭其它对话框，默认值false
		 * @param showEffect 是否显示弹出效果，默认值true
		 */
		public openWindow<T extends Laya.Dialog>(nWinId: WindowID, closeOther: boolean = false, showEffect: boolean = true): T {
			if (nWinId === WindowID.Invalid || !this.getWindowCanOpen(nWinId)) {
				return null;
			}

			const datRoot = this.getRootWindowData(nWinId);
			let win = this.mWindowInstanceMap.get(datRoot.winId);
			if (!win) {
				this.destroyUnusedWindow();
				win = this.instanceWindow(datRoot.winId);
				win.name = `${WindowID[datRoot.winId]}`;
				this.enlargeCloseHitArea(win);
				this.mWindowInstanceMap.set(datRoot.winId, win);
			}

			("willOpenWinId" in win) && (win["willOpenWinId"] = nWinId);
			win.dataSource = datRoot;
			win.popup(closeOther, showEffect);
			this.visible = true;
			return win as T;
		}

		/**
		 * 打开一个窗口（根据类原型打开）
		 * @param cls 类原型
		 * @param closeOther 是否关闭其它的对话框，若值为true则关闭其它对话框
		 * @param showEffect 是否显示弹出效果
		 */
		public openWindow2<T extends Laya.Dialog>(cls: { new () }, closeOther: boolean = false, showEffect: boolean = true): T {
			let nWinId = WindowID.Invalid;
			for (const [key, value] of this.mWindowClassMap) {
				if (value === cls) {
					nWinId = key;
					break;
				}
			}
			return this.openWindow<T>(nWinId, closeOther, showEffect);
		}

		/**
		 * 关闭一个窗口
		 * @param nWinId 窗口Id
		 * @param type 如果是点击默认关闭按钮触发，则传入关闭按钮的名字(name)，否则为null
		 * @param showEffect 是否显示关闭效果
		 */
		public closeWindow(nWinId: WindowID, type: string = null, showEffect: boolean = true) {
			const win = this.getWindow(nWinId);
			if (win && win.isPopup) {
				win.close(type, showEffect);
			}
		}

		/** @override */
		public doClose(dialog: Dialog, type: string = null): void {
			super.doClose(dialog, type);
			this.visible = this.numChildren > 0;
		}

		/**
		 * 获取一个窗口（如果窗口没有初始化，则返回undefined）
		 * @param nWinId 窗口Id
		 */
		public getWindow<T extends Dialog>(nWinId: WindowID): T {
			const datWin = this.getRootWindowData(nWinId);
			Global.Log.Assert(!Global.isNullOrUndefined(datWin), `getWindow(${nWinId}) not existed!!!`);
			return this.mWindowInstanceMap.get(datWin.winId) as T;
		}

		/**
		 * 实例化一个窗口Id对应的对象实例
		 * @param nWinId 窗口Id
		 */
		public instanceWindow(nWinId: WindowID): any {
			Global.Log.Assert(this.mWindowClassMap.has(nWinId), `instantiationWindow(${WindowID[nWinId]}) not existed!!!`);
			const ctor = this.mWindowClassMap.get(nWinId);
			return new ctor();
		}

		/**
		 * 切换场景时关闭打开的窗口
		 */
		public closeWindowsWhenChangeLevel() {
			this.closeWindows(); // 如果有需要保留的窗口以后可以传进方法里面
		}

		/**
		 * 关闭所有打开的窗口
		 * @param aExcludeWinIds 不需要关闭的窗口Id列表
		 */
		private closeWindows(aExcludeWinIds?: WindowID[]) {
			const aKeys: WindowID[] = []; // 全局不需要关闭的窗口Id可以直接写在数组里面
			if (!Global.isNullOrUndefined(aExcludeWinIds)) {
				aExcludeWinIds.forEach(
					element => {
						const datWin = this.getRootWindowData(element);
						if (aKeys.indexOf(datWin.winId) === -1) {
							aKeys.push(datWin.winId);
						}
					}
				);
			}
			// 关闭所有不需要保持打开的窗口
			this.mWindowInstanceMap.forEach(
				(value, key) => {
					if (aKeys.indexOf(key) === -1 && value.isPopup) {
						value.close(null, false);
					}
				}
			);
		}

		/**
		 * 1秒种最多执行5次的更新函数.适合不及时的逻辑
		 * @param elapsedTime 上次调用以来经过的时间(秒)
		 */
		public slowUpdate(elapsedTime: number): void {
			this._childs.forEach(child => {
				if (!(child as Laya.Dialog).destroyed) {
					if (child.isPopup && GameMode.isSlowUpdateImp(child)) {
						child.slowUpdate(elapsedTime);
					}
				}
			});
		}

		/**
		 * 每帧被调用
		 * @param elapsedTime 上次调用以来经过的时间(秒)
		 */
		public frameMove(elapsedTime: number): void {
			this._childs.forEach(child => {
				if (!(child as Laya.Dialog).destroyed) {
					if (child.isPopup && GameMode.isFrameMoveImp(child)) {
						child.frameMove(elapsedTime);
					}
				}
			});
		}

		/**
		 * 扩大关闭按钮的点击区域
		 * @param win 窗口实例
		 */
		private enlargeCloseHitArea(win: Laya.Sprite) {
			if (win["_btnClose"]) {
				const btnClose = win["_btnClose"] as Laya.Sprite;
				enlargeHitArea(btnClose, 80, 80);
			}
		}

		/**
		 * 销毁不使用的窗口
		 */
		private destroyUnusedWindow() {
			// 找到所有已经初始化但是没有显示的窗口，destroy掉
			const aDels: WindowID[] = [];
			this.mWindowInstanceMap.forEach(
				(value, key) => {
					if (!value.isPopup && this.canDestroy(key)) {
						value.destroy(true);
						aDels.push(key);
					}
				}
			);

			// 从窗口字典里面移除掉
			aDels.forEach(element => {
				this.mWindowInstanceMap.delete(element);
			});
		}

		/**
		 * 是否可以销毁
		 * @param nWinId 窗口Id
		 */
		private canDestroy(nWinId: WindowID): boolean {
			switch (nWinId) {
				case WindowID.GoodsTip:
				case WindowID.EquipTip:
					return false;
			}
			return true;
		}

		//#region ======================== CheckHandler =========================

		/**
		 * 检查窗口是否可以打开
		 * @param nWinId 窗口Id
		 * @param bHint 是否提示不满足打开条件的信息
		 */
		private checkWindowIsOpen(nWinId: WindowID, bHint: boolean): boolean {
			if (bHint) {
				uiMgr.hintText(ConfigLoca.UI_COMMON_FunNoOpen);
			}
			return false;
		}

		//#endregion ======================== CheckHandler =========================
	}
}