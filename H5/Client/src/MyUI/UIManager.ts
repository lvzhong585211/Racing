namespace MyUI {
	import Node = laya.display.Node;
	import Handler = laya.utils.Handler;

	/**
	 * UI管理器类
	 * 用来管理UI相关调用
	 * 全局实例对象为UIMgr
	 */
	export class UIManager implements Base.IPreloadResource {
		private mLayerList: BaseUILayer[]; // UI层列表
		private mHintMgr: HintManager; // 文本提示
		private m_windowMgr: WindowManager; // 功能窗口管理
		private m_systemWizardMgr: SystemWizardManager;	// 系统快捷引导栏管理

		private mNetWaitingLayer: NetWaitingLayer; // 网络消息等待层

		public constructor() {
			this.createChildren();
		}

		/** 获取窗口管理器 */
		public get windowMgr() { return this.m_windowMgr; }
		/** 获取系统快捷引导栏管理器 */
		public get systemWizardMgr() { return this.m_systemWizardMgr; }
	    /**
         * 获取需要预加载的资源列表（Loading模块预加载的资源）
         */
		public getPreloadResources(): LoadConfig[] {
			const aLoadCfgs: LoadConfig[] = [];

			// 在这里统一加载资源,以便正确的显示加载的进度条!!!
			// 示例如下:
			// aLoadCfgs.push({ url: Global.fontsPath + "bmFont.fnt", type: Laya.Loader.XML });
			// aLoadCfgs.push({ url: Global.fontsPath + "bmFont.png", type: Laya.Loader.IMAGE });
			return aLoadCfgs;
		}

		/**
		 * 子对象初始化
		 */
		private createChildren() {
			this.mLayerList = [];
			this.mHintMgr = new HintManager();
			this.m_windowMgr = new WindowManager();
			this.m_systemWizardMgr = new SystemWizardManager();
			Dialog.manager = this.m_windowMgr;
			this.createUILayer();
			// 重新设置功能窗口管理器的父容器
			this.addChild(this.m_windowMgr, UILayer.Window);
		}

		/**
		 * UI层初始化
		 */
		private createUILayer() {
			const nMin = UILayer.Invalid + 1; // 0
			const nMax = UILayer.Max;
			let layer: BaseUILayer;
			for (let nIdx = nMin; nIdx < nMax; nIdx++) {
				switch (nIdx) {
					case UILayer.NetWaiting:
						layer = new NetWaitingLayer();
						break;
					default:
						layer = new BaseUILayer();
						break;
				}
				layer.name = `Layer_${UILayer[nIdx]}`;
				this.mLayerList[nIdx] = layer;
				Laya.stage.addChild(layer);
			}

			// UI各层响应鼠标事件的设置
			this.mNetWaitingLayer = this.mLayerList[UILayer.NetWaiting] as NetWaitingLayer;
			this.mLayerList[UILayer.Interaction].visible = true;
			this.mLayerList[UILayer.Interaction].mouseEnabled = true;
			this.mLayerList[UILayer.Interaction].mouseThrough = false;
			this.mLayerList[UILayer.Debug].mouseEnabled = false;
			this.mLayerList[UILayer.RoleTitle].mouseEnabled = false;
			this.mLayerList[UILayer.Hurt].mouseEnabled = false;
			this.mLayerList[UILayer.Loading].mouseEnabled = true;
			this.mLayerList[UILayer.Loading].mouseThrough = false;
			this.mLayerList[UILayer.NetWaiting].mouseEnabled = true;
			this.mLayerList[UILayer.NetWaiting].mouseThrough = false;
			this.mLayerList[UILayer.Hint].mouseEnabled = false;
		}

		/** 获取交互层 */
		public get interactionLayer(): BaseUILayer {
			return this.mLayerList[UILayer.Interaction];
		}

		/**
		 * 资源加载完后的处理
		 */
		public handleAfterResLoaded(): void {
			this.mLayerList[UILayer.NetWaiting].handleAfterResLoaded();
			this.m_windowMgr.initializeManager();
		}

		/**
         * 1秒种最多执行5次的更新函数.适合不及时的逻辑
         * @param elapsedTime 上次调用以来经过的时间(秒)
         */
		public slowUpdate(elapsedTime: number): void {
			this.mLayerList.forEach(layer => {
				layer._childs.forEach(child => {
					if (!(child as Laya.Node).destroyed) {
						if (GameMode.isSlowUpdateImp(child)) {
							child.slowUpdate(elapsedTime);
						}
					}
				});
			});
		}

		/**
         * 每帧被调用
         * @param   elapsedTime 上次调用以来经过的时间(秒)
         */
		public frameMove(elapsedTime: number): void {
			this.mLayerList.forEach(layer => {
				layer._childs.forEach(child => {
					if (!(child as Laya.Node).destroyed) {
						if (GameMode.isFrameMoveImp(child)) {
							child.frameMove(elapsedTime);
						}
					}
				});
			});
		}

		/**
		 * 提示普通文本信息
		 * @param text 提示文本信息
         * @param args 格式化的参数,见 Global.String.Format() 函数的说明
		 */
		public hintText(text: string, ...args) {
			if (args && args.length > 0) {
				text = Global.String.Format(text, args);
				this.mHintMgr.hint(text, false);
				return;
			}
			this.mHintMgr.hint(text, false);
		}

		/**
		 * 提示Html文本信息
		 * @param text 提示文本信息
		 * @param args 格式化的参数,见 Global.String.Format() 函数的说明
		 */
		public hintHtmlText(text: string, ...args) {
			if (args && args.length > 0) {
				text = Global.String.Format(text, args);
				this.mHintMgr.hint(text, true);
				return;
			}
			this.mHintMgr.hint(text, true);
		}

		/**
		 * 生成一个提示框(使用方法看PromptBox的注释)
		 * @param tDesc 提示内容
		 * @param handle 回调函数(点击按钮类型)
		 * @param pEnum	提示框按钮类型(单按钮，双按钮)
		 * @param confirmtext 确认键名称
		 * @param canceltext 取消键名称
		 */
		public createPrompt(tDesc: string, handle: DPSelectedItemEventHandler, pEnum: PromptEnum = PromptEnum.PromptSingle, confirmtext: string = "", canceltext: string = ""): void {
			const pBox = windowMgr.openWindow<PromptBox>(WindowID.PromptBox);
			pBox.InitPromptBox(new PromptData(tDesc, confirmtext, canceltext, pEnum));
			pBox.DPSelectedItem = (s, d) => {
				handle(this, new DPSelectedItemEventArgs(d.IDType));
				windowMgr.closeWindow(WindowID.PromptBox);
			};
		}
		/**
		 * 生成一个功能开启飞图标Part
		 * @param sVo		SystemOpenVO表数据
		 * @returns {} 
		 */
		createSystemOpenFlyPart(sVo: tables.SystemOpenVO, targetBtn: Laya.Component) {
			const fPart = windowMgr.openWindow<SystemOpenFlyPart>(WindowID.SystemOpenFlyPart, false, false);
			fPart.flyTarget = targetBtn;
			fPart.initData(sVo);
			fPart.dPSelectedItem = (s, e) => {
				windowMgr.closeWindow(WindowID.SystemOpenFlyPart, null, false);
				Super.GData.waitingForSystemHelp = false;
			};
		}
		/** 
		 * 检索是否有新获得的装备
		*/
		public retrieveNewEquipSystemWizard() {
			// 如果已有提示引导在显示，不执行
			if (this.m_systemWizardMgr.isShowStates)
				return;
			const nEequipList = Super.GData.NewEquipInfoList;
			// 无新获得的装备
			if (nEequipList.length <= 0)
				return;
			const nEquipData: NewEquipGoodsInfo = nEequipList[0];
			// 移除第一个元素
			Super.GData.NewEquipInfoList.splice(0, 1);
			this.m_systemWizardMgr.goodsDbId = nEquipData.goodsDbID;
			this.m_systemWizardMgr.zhanLiUp = nEquipData.zhanLiUp;
			// 装备系统引导提示事件
			gameEventBus.newEquipSystemWizard.event(SystemWizardEnum.NewEquip);
		}

		/** 显示消息等待 */
		public showNetWaiting(): void {
			this.mNetWaitingLayer.visible = true;
			this.mNetWaitingLayer.playWaiting();

		}

		/** 隐藏消息等待 */
		public hideNetWaiting(): void {
			this.mNetWaitingLayer.stopWaiting();
			this.mNetWaitingLayer.visible = false;
		}

		/**
		 * 添加子对象到View层
		 * @param childNode
		 */
		public addChildToView(childNode: Node): boolean {
			return this.addChild(childNode, UILayer.View);
		}

		/**
		 * 从View层移除子对象
		 * @param childNode
		 */
		public removeChildFromView(childNode: Node): boolean {
			return this.removeChild(childNode, UILayer.View);
		}

		/**
		 * 添加子对象到指定的层
		 * @param childNode
		 * @param eLayer
		 */
		public addChild(childNode: Node, eLayer: UILayer): boolean {
			Global.Log.Assert(eLayer !== UILayer.Interaction, "UILayer Interaction can't add child!!!");
			if (this.getLayerIsValid(eLayer)) {
				this.mLayerList[eLayer].addChild(childNode);
				return true;
			}
			return false;
		}

		/**
		 * 从指定的层移除子对象
		 * @param childNode
		 * @param eLayer
		 */
		public removeChild(childNode: Node, eLayer: UILayer): boolean {
			if (this.getLayerIsValid(eLayer)) {
				this.mLayerList[eLayer].removeChild(childNode);
				return true;
			}
			return false;
		}

		/**
		 * 获取是否有效层
		 * @param eLayer 
		 */
		private getLayerIsValid(eLayer: UILayer): boolean {
			return eLayer > UILayer.Invalid && eLayer < UILayer.Max;
		}

		/**
		 * 管理器销毁
		 */
		public destroy() {
			this.mHintMgr.destroy();
			this.mHintMgr = null;
			this.m_windowMgr.destroy();
			this.m_windowMgr = null;
			this.m_systemWizardMgr.destroy();
			this.m_systemWizardMgr = null;
		}
	}

	/************************************************************************************************************************
	 ***************************** 上面的类和方法为UIManager导出类和导出方法，供外部调用 ****************************************
	 ***************************** 下面的为内部实现类和方法（无export导出），可以不用了解 ***************************************
	 ************************************************************************************************************************/

	//#region ================== HintManager ==================

	/** 提示信息数据 */
	class HintTextData {
		public text: string; // 提示文本
		public isHtml: boolean; // 是否是Html文本
		public ticks: number; // 提示出现事件（毫秒）
	}

	/** 提示信息Item项 */
	class HintTextItem extends Laya.Box {
		private mTextLabel: Laya.Label; // 普通文本Label
		private mTextHtml: Laya.HTMLDivElement; // Html文本对象
		private mUsing: boolean; // Item是否正在使用

		constructor() {
			super();
			this.mouseEnabled = false;
			this.mUsing = false;
			this.centerX = 0;
			this.size(560, 20);
		}

		/** @override */
		public destroy(destroyChild?: boolean) {
			this.mTextLabel.destroy(true);
			this.mTextHtml.destroy(true);
			super.destroy(destroyChild);
			this.mTextLabel = null;
			this.mTextHtml = null;
		}

		/** Item是否正在使用 */
		public get isUsing(): boolean { return this.mUsing; }

		/** 设置Item的提示文本数据 */
		public set textData(value: HintTextData) {
			if (value.isHtml) {
				this.initializeTextHtml(value.text);
			} else {
				this.initializeTextLabel(value.text);
			}
			this.mUsing = true;
		}

		/**
		 * 初始化普通文本提示Label
		 * @param text 提示文本内容
		 */
		private initializeTextLabel(text: string) {
			if (!this.mTextLabel) {
				this.mTextLabel = new Laya.Label();
				this.mTextLabel.fontSize = 18;
				this.mTextLabel.color = "#eceaff";
				this.mTextLabel.align = "center";
				this.mTextLabel.stroke = 2;
				this.mTextLabel.strokeColor = "#191414";
				this.mTextLabel.size(this.width, this.height);
			}
			this.mTextLabel.text = text;
			this.addChild(this.mTextLabel);
		}

		/**
		 * 初始化Html文本提示对象
		 * @param text 提示文本内容
		 */
		private initializeTextHtml(text: string) {
			if (!this.mTextHtml) {
				this.mTextHtml = new Laya.HTMLDivElement();
				this.mTextHtml.size(this.width, this.height);
				this.mTextHtml.style.stroke = 2;
				this.mTextHtml.style.strokeColor = "#191414";
				Style.prepareHtmlFont18Center(this.mTextHtml, "#eceaff");
			}
			this.mTextHtml.innerHTML = text;
			this.addChild(this.mTextHtml);
		}

		/** 重置Item项 */
		public reset() {
			this.mTextLabel && this.mTextLabel.removeSelf();
			this.mTextHtml && this.mTextHtml.removeSelf();
			this.mUsing = false;
		}
	}

	/**
	 * 文本提示信息管理
	 */
	class HintManager {
		private readonly MaxHintCount: number = 10; // 最大提示数量
		private mHintItemList: HintTextItem[]; // 提示Item项列表
		private mHintDataList: HintTextData[]; // 提示文本数据列表
		private mHintDataCache: HintTextData[]; // 提示文本数据缓存列表
		private mPlaying: boolean; // 动画是否正在播放

		constructor() {
			this.mHintItemList = [];
			this.mHintDataList = [];
			this.mHintDataCache = [];
			this.mPlaying = false;
		}

		/** 管理器销毁 */
		public destroy() {
			this.mHintItemList.forEach(element => element.destroy(true));
			this.mHintItemList = null;
			this.mHintDataList = null;
			this.mHintDataCache = null;
		}

		/**
		 * 提示文本信息
		 * @param text 信息内容
		 * @param isHtml 是否Html文本
		 */
		public hint(text: string, isHtml: boolean) {
			const datHint = this.getHintData();
			datHint.text = text;
			datHint.isHtml = isHtml;
			datHint.ticks = TimeManager.getCorrectLocalTime();
			this.mHintDataList.push(datHint);

			if (!this.mPlaying) {
				this.mPlaying = true;
				Laya.timer.frameLoop(10, this, this.onFrameLoopHandler);
			}
		}

		/** @private */
		private getHintData(): HintTextData {
			let datHint = this.mHintDataCache.shift();
			!datHint && (datHint = new HintTextData());
			return datHint;
		}

		/** @private */
		private onFrameLoopHandler() {
			if (this.mHintDataList.length === 0) {
				this.stopPlaying();
				return;
			}

			const itmHint = this.getHintItem();
			if (itmHint) {
				const datHint = this.mHintDataList.shift();
				itmHint.textData = datHint;
				itmHint.centerY = 0;
				uiMgr.addChild(itmHint, UILayer.Hint);
				this.mHintDataCache.push(datHint);
				Laya.Tween.to(itmHint, { y: itmHint.y - 130 }, 1400, Laya.Ease.linearInOut,
					Handler.create(this, this.onTweenComplete, [itmHint]));
			}
		}

		/** @private */
		private getHintItem(): HintTextItem {
			let itmHint = this.mHintItemList.find(element => !element.isUsing);
			if (!itmHint && this.mHintItemList.length < this.MaxHintCount) {
				itmHint = new HintTextItem();
				this.mHintItemList.push(itmHint);
			}
			return itmHint;
		}

		/** @private */
		private onTweenComplete(itmHint: HintTextItem) {
			if (itmHint) {
				itmHint.reset();
				itmHint.removeSelf();
			}
		}

		/** @private */
		private stopPlaying() {
			if (this.mPlaying) {
				Laya.timer.clear(this, this.onFrameLoopHandler);
				this.mPlaying = false;
			}
		}
	}

	//#endregion ==========================================

	//#region ================== BaseUILayer ==================

	/**
	 * UI层基类
	 */
	class BaseUILayer extends Laya.Component {

		constructor() {
			super();
			// this.width = Global.VIEW_WIDTH;
			// this.height = Global.VIEW_HEIGHT;
			this.left = 0;
			this.top = 0;
			this.right = 0;
			this.bottom = 0;
			this.mouseThrough = true;
			this.visible = false;
		}

		/** @override */
		protected _childChanged(child?: Laya.Node) {
			super._childChanged(child);
			this.visible = this.numChildren > 0;
		}

		/** 资源加载完后的处理 */
		public handleAfterResLoaded(): void {

		}
	}

	/**
	 * 消息等待层
	 */
	class NetWaitingLayer extends BaseUILayer {

		private mWaitingUI: ui.MainUI.NetWaitingUI; // 网络消息动画

		constructor() {
			super();
		}

		/**
		 * 播放网络消息等待动画
		 */
		public playWaiting() {
			if (!this.mWaitingUI) {
				this.mWaitingUI = new ui.MainUI.NetWaitingUI();
				this.addChild(this.mWaitingUI);
			}
			this.mWaitingUI.ani1.play();
		}

		/**
		 * 停止网络消息等待动画
		 */
		public stopWaiting() {
			this.mWaitingUI && this.mWaitingUI.ani1.stop();
		}
	}

	//#endregion ==========================================
}