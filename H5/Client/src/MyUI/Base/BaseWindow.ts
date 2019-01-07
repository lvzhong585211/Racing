namespace MyUI {
	/**
	 * 带页签的窗口对象基类
	 */
	export class BaseWindow extends ui.BaseWindowUI {
		/** 
		 * 用来确定将要显示的子窗口 </br>
		 * 注意：该值只是用来确认打开窗口时显示哪个子窗口，当子窗口打开后该值就失效了
		 */
		public willOpenWinId: WindowID = WindowID.Invalid;

		/** 窗口的子窗口字典 */
		protected mChildInstanceMap = new Map<WindowID, IWindowPart>();
		/** 窗口页签数据列表 */
		protected mTabDataList: TabItemRenderData[] = [];

		/** 页签小红点处理 */
		private mTabRedDotHandler: Laya.Handler;

		constructor() {
			super();
			this.initializeTabs();
		}

		/** @override */
		public destroy(destroyChild?: boolean) {
			this.unregTabListRedDot();
			this.mChildInstanceMap.clear();
			super.destroy(destroyChild);
			this.mChildInstanceMap = null;
			this.mTabDataList = null;
			this.mTabRedDotHandler = null;
		}

		/**
		 * 初始化窗口页签显示
		 */
		private initializeTabs() {
			this._lstTab.vScrollBarSkin = "";
			this._lstTab.mouseHandler = new Laya.Handler(this, this.onTabItemClick);
			this.mTabRedDotHandler = new Laya.Handler(this, this.onTabRedDotHandler, null, false);
		}

		/**
		 * 页签点击处理
		 * @param e 事件对象
		 * @param nIdx 页签索引
		 */
		private onTabItemClick(e: Laya.Event, nIdx: number) {
			if (e.type !== Laya.Event.CLICK) {
				return;
			}
			const itmTab = e.currentTarget as TabItemRender;
			itmTab && itmTab.winId !== WindowID.Invalid && this.showPart(itmTab.winId);
		}

		/**
		 * 页签小红点处理
		 * @param type 活动提示类型
		 * @param data 活动提示数据
		 */
		protected onTabRedDotHandler(type: ActivityTipTypes, data: ActivityTipItem): void {
			const nWinId = windowMgr.getWindowIDByActivityTipType(type);
			if (nWinId !== WindowID.Invalid) {
				this.updateTabRedState(nWinId, data.IsActive);
			}
		}

		/** @override */
		public get dataSource(): WindowData {
			return super.dataSource;
		}
		/** @override */
		public set dataSource(value: WindowData) {
			super.dataSource = value;
			this.updateTabList();
			this.showPartWithCheck(this.willOpenWinId);
		}

		/**
		 * 更新窗口页签列表显示
		 */
		protected updateTabList() {
			// 更新页签列表显示
			this.unregTabListRedDot(); // 取消上次页签列表注册的小红点
			this.mTabDataList.length = 0;
			const aChildWinIds = this.dataSource.childWinIds;
			Global.Log.Assert(aChildWinIds && aChildWinIds.length > 0, `updateTabList(${this.name}) no child!!!`);
			aChildWinIds.forEach(
				element => {
					const datWin = windowMgr.getWindowData(element);
					datWin.canOpen(false) && this.mTabDataList.push(new TabItemRenderData(datWin.winId, datWin.title));
				}
			);
			Global.Log.Assert(this.mTabDataList.length !== 0, `updateTabList(${this.name}) no tab!!!`);
			this.mTabDataList.forEach((value, index) => value.index = index); // 设置页签的索引
			this._lstTab.array = this.mTabDataList;
			this.regTabListRedDot(); // 注册页签列表的小红点

			// 上一个选中的页签不存在了则选中第一个页签（页签数量发生变化的时候可能上一个选中的页签不存在了）
			const datTab = this.getSelectedTabData();
			!datTab && this.showPartWithCheck(this.mTabDataList[0].winId);
		}

		/**
		 * 注册页签列表的小红点
		 */
		private regTabListRedDot() {
			this.mTabDataList.forEach(
				element => {
					const type = windowMgr.getActivityTipTypeByWindowID(element.winId);
					if (type !== ActivityTipTypes.Invalid) {
						ActivityTipManager.regActivityTipItem(type, this.mTabRedDotHandler);
					}
				}
			);
		}

		/**
		 * 反注册（取消）页签列表的小红点
		 */
		private unregTabListRedDot() {
			this.mTabDataList.forEach(
				element => {
					const type = windowMgr.getActivityTipTypeByWindowID(element.winId);
					if (type !== ActivityTipTypes.Invalid) {
						ActivityTipManager.unregActivityTipItem(type, this.mTabRedDotHandler);
					}
				}
			);
		}

		/**
		 * 显示子窗口（如果要显示的子窗口对应的页签不存在或者子窗口不满足打开条件则查找一个满足条件的子窗口显示）
		 * @param nWinId 窗口Id（要显示的子窗口Id）
		 */
		protected showPartWithCheck(nWinId: WindowID) {
			const nRootWinId = this.dataSource.winId;
			let datWin = windowMgr.getWindowData(nWinId);
			if (nWinId !== nRootWinId) {
				while (datWin.parentWinId !== nRootWinId) {
					datWin = windowMgr.getWindowData(datWin.parentWinId);
				}
				Global.Log.Assert(datWin.parentWinId === nRootWinId, `showPartWithCheck(${WindowID[nWinId]}) not existed!!!`);
			}
			let nOpenId = WindowID.Invalid;
			const bNeedFind = !this.getTabData(datWin.winId) || !datWin.canOpen(false);
			if (bNeedFind) {
				const datTab = this.mTabDataList.find(element => windowMgr.getWindowCanOpen(element.winId));
				datTab && (nOpenId = datTab.winId);
			} else {
				nOpenId = datWin.winId;
			}
			Global.Log.Assert(nOpenId !== WindowID.Invalid, `showPartWithCheck(${WindowID[nWinId]}) not found!!!`);
			this.showPart(nOpenId);
		}

		/**
		 * 显示子窗口
		 * @param nWinId 窗口Id（要显示的子窗口Id）
		 */
		public showPart(nWinId: WindowID) {
			// 子窗口合法性验证
			const nRootWinId = this.dataSource.winId;
			const datWin = windowMgr.getWindowData(nWinId);
			Global.Log.Assert(datWin.parentWinId === nRootWinId, `showPart(${WindowID[nWinId]}) not existed!!!`);

			// List中ItemRender为延迟更新，所以需要用到Item数据的时候延迟调用
			Laya.timer.callLater(this, this.updateUI, [nWinId]);
		}

		/**
		 * 更新窗口界面显示（包含页签和子窗口的显示更新）
		 * @param nWinId 窗口Id（要显示的子窗口Id）
		 */
		protected updateUI(nWinId: WindowID): IWindowPart {
			// 设置页签显示状态
			this.updateTabSelected(nWinId);
			// 设置子窗口显示状态
			this.mChildInstanceMap.forEach((value, key) => value.visible = key === nWinId);

			// 设置子窗口实例
			const vewChild = this.getChildInstance(nWinId);
			!vewChild.visible && (vewChild.visible = true);
			("willOpenWinId" in vewChild) && (vewChild["willOpenWinId"] = this.willOpenWinId);
			vewChild.dataSource = windowMgr.getWindowData(nWinId);
			vewChild.enterPart();
			this.willOpenWinId = WindowID.Invalid;
			return vewChild;
		}

		/**
		 * 获取子窗口实例（如果实例不存在的话会进行实例化）
		 * @param nWinId 窗口Id
		 */
		protected getChildInstance(nWinId: WindowID): IWindowPart {
			let vewChild = this.mChildInstanceMap.get(nWinId);
			if (!vewChild) {
				vewChild = windowMgr.instanceWindow(nWinId);
				this.addChild(vewChild);
				this.mChildInstanceMap.set(nWinId, vewChild);
				this.doAfterCreateChildInstance(nWinId, vewChild);
			}
			return vewChild;
		}

		/**
		 * 创建完子窗口实例后调用，方便子类做些初始化操作
		 * @param nWinId 窗口Id
		 * @param vewChild 窗口对象
		 */
		protected doAfterCreateChildInstance(nWinId: WindowID, vewChild: IWindowPart) {

		}

		/**
		 * 获取页签数据
		 * @param nWinId 窗口Id
		 */
		protected getTabData(nWinId: WindowID): TabItemRenderData {
			return this.mTabDataList.find(value => value.winId === nWinId);
		}

		/**
		 * 获取当前选中的页签的数据
		 */
		protected getSelectedTabData(): TabItemRenderData {
			return this.mTabDataList.find(value => value.getSelectedState());
		}

		/**
		 * 更新页签的选中状态
		 * @param nWinId 窗口Id
		 */
		protected updateTabSelected(nWinId: WindowID) {
			const datCurSelected = this.getSelectedTabData();
			if (datCurSelected) {
				if (datCurSelected.winId === nWinId) {
					return;
				}
				datCurSelected.setSelectedState(false) && this._lstTab.changeItem(datCurSelected.index, datCurSelected);
			}
			const datWillSelected = this.getTabData(nWinId);
			if (datWillSelected) {
				datWillSelected.setSelectedState(true) && this._lstTab.changeItem(datWillSelected.index, datWillSelected);
				this._txtTitle.text = datWillSelected.label;
			}
		}

		/**
		 * 更新页签的小红点状态
		 * @param nWinId 窗口Id
		 * @param bState 小红点显示状态
		 */
		protected updateTabRedState(nWinId: WindowID, bState: boolean) {
			const datTab = this.getTabData(nWinId);
			if (datTab) {
				datTab.setRedState(bState) && this._lstTab.changeItem(datTab.index, datTab);
			}
		}
	}
}