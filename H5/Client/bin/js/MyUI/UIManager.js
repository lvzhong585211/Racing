var MyUI;
(function (MyUI) {
    var Handler = laya.utils.Handler;
    /**
     * UI管理器类
     * 用来管理UI相关调用
     * 全局实例对象为UIMgr
     */
    class UIManager {
        constructor() {
            this.createChildren();
        }
        /** 获取窗口管理器 */
        get windowMgr() { return this.m_windowMgr; }
        /** 获取系统快捷引导栏管理器 */
        get systemWizardMgr() { return this.m_systemWizardMgr; }
        /**
         * 获取需要预加载的资源列表（Loading模块预加载的资源）
         */
        getPreloadResources() {
            const aLoadCfgs = [];
            // 在这里统一加载资源,以便正确的显示加载的进度条!!!
            // 示例如下:
            // aLoadCfgs.push({ url: Global.fontsPath + "bmFont.fnt", type: Laya.Loader.XML });
            // aLoadCfgs.push({ url: Global.fontsPath + "bmFont.png", type: Laya.Loader.IMAGE });
            return aLoadCfgs;
        }
        /**
         * 子对象初始化
         */
        createChildren() {
            this.m_lstLayer = [];
            this.m_hintMgr = new HintManager();
            this.m_windowMgr = new MyUI.WindowManager();
            this.m_systemWizardMgr = new MyUI.SystemWizardManager();
            Dialog.manager = this.m_windowMgr;
            this.createUILayer();
            // 重新设置功能窗口管理器的父容器
            this.addChild(this.m_windowMgr, UILayer.Window);
        }
        /**
         * UI层初始化
         */
        createUILayer() {
            const nMin = UILayer.Invalid + 1; // 0
            const nMax = UILayer.Max;
            let layer;
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
                this.m_lstLayer[nIdx] = layer;
                Laya.stage.addChild(layer);
            }
        }
        /**
         * 资源加载完后的处理
         */
        handleAfterResLoaded() {
            this.m_lstLayer[UILayer.NetWaiting].handleAfterResLoaded();
        }
        /**
         * 1秒种最多执行5次的更新函数.适合不及时的逻辑
         * @param elapsedTime 上次调用以来经过的时间(秒)
         */
        slowUpdate(elapsedTime) {
            this.m_lstLayer.forEach(layer => {
                layer._childs.forEach(child => {
                    if (!child.destroyed) {
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
        frameMove(elapsedTime) {
            this.m_lstLayer.forEach(layer => {
                layer._childs.forEach(child => {
                    if (!child.destroyed) {
                        if (GameMode.isFrameMoveImp(child)) {
                            child.frameMove(elapsedTime);
                        }
                    }
                });
            });
        }
        /**
         * 提示一条消息
         * @param sText 提示内容
         * @param args 格式化的参数,见 Global.String.Format() 函数的说明
         */
        hintText(sText, ...args) {
            if (args) {
                const hint = Global.String.Format(sText, args);
                this.m_hintMgr.hint(hint);
                return;
            }
            //TODO:支持html文本
            this.m_hintMgr.hint(sText);
        }
        /**
         * 生成一个提示框(使用方法看PromptBox的注释)
         * @param tDesc 提示内容
         * @param handle 回调函数(点击按钮类型)
         * @param pEnum	提示框按钮类型(单按钮，双按钮)
         * @param confirmtext 确认键名称
         * @param canceltext 取消键名称
         */
        createPrompt(tDesc, handle, pEnum = PromptEnum.PromptSingle, confirmtext = "", canceltext = "") {
            const pBox = windowMgr.openWindow(WindowID.PromptBox);
            pBox.InitPromptBox(new MyUI.PromptData(tDesc, confirmtext, canceltext, pEnum));
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
        createSystemOpenFlyPart(sVo, targetBtn) {
            const fPart = windowMgr.openWindow(WindowID.SystemOpenFlyPart);
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
        retrieveNewEquipSystemWizard() {
            // 如果已有提示引导在显示，不执行
            if (this.m_systemWizardMgr.isShowStates)
                return;
            const nEequipList = Super.GData.NewEquipInfoList;
            // 无新获得的装备
            if (nEequipList.length <= 0)
                return;
            const nEquipData = nEequipList[0];
            // 移除第一个元素
            Super.GData.NewEquipInfoList.splice(0, 1);
            this.m_systemWizardMgr.goodsDbId = nEquipData.goodsDbID;
            this.m_systemWizardMgr.zhanLiUp = nEquipData.zhanLiUp;
            // 装备系统引导提示事件
            gameEventBus.newEquipSystemWizard.event(SystemWizardEnum.NewEquip);
        }
        /**
         * 显示消息等待
         */
        showNetWaiting() {
            this.showLayer(UILayer.NetWaiting);
        }
        /**
         * 隐藏消息等待
         */
        hideNetWaiting() {
            this.hideLayer(UILayer.NetWaiting);
        }
        /**
         * 添加子对象到View层
         * @param childNode
         */
        addChildToView(childNode) {
            return this.addChild(childNode, UILayer.View);
        }
        /**
         * 从View层移除子对象
         * @param childNode
         */
        removeChildFromView(childNode) {
            return this.removeChild(childNode, UILayer.View);
        }
        /**
         * 添加子对象到指定的层
         * @param childNode
         * @param eLayer
         */
        addChild(childNode, eLayer) {
            if (this.getLayerIsValid(eLayer)) {
                this.m_lstLayer[eLayer].addChild(childNode);
                return true;
            }
            return false;
        }
        /**
         * 从指定的层移除子对象
         * @param childNode
         * @param eLayer
         */
        removeChild(childNode, eLayer) {
            if (this.getLayerIsValid(eLayer)) {
                this.m_lstLayer[eLayer].removeChild(childNode);
                return true;
            }
            return false;
        }
        /**
         * 显示指定的层
         * @param eLayer
         */
        showLayer(eLayer) {
            if (this.getLayerIsValid(eLayer)) {
                this.m_lstLayer[eLayer].visible = true;
            }
        }
        /**
         * 隐藏指定的层
         * @param eLayer
         */
        hideLayer(eLayer) {
            if (this.getLayerIsValid(eLayer)) {
                this.m_lstLayer[eLayer].visible = false;
            }
        }
        /**
         * 获取是否有效层
         * @param eLayer
         */
        getLayerIsValid(eLayer) {
            return eLayer > UILayer.Invalid && eLayer < UILayer.Max;
        }
        /**
         * 管理器销毁
         */
        destroy() {
            this.m_hintMgr.destroy();
            this.m_hintMgr = null;
            this.m_windowMgr.destroy();
            this.m_windowMgr = null;
            this.m_systemWizardMgr.destroy();
            this.m_systemWizardMgr = null;
        }
    }
    MyUI.UIManager = UIManager;
    /************************************************************************************************************************
     ***************************** 上面的类和方法为UIManager导出类和导出方法，供外部调用 ****************************************
     ***************************** 下面的为内部实现类和方法（无export导出），可以不用了解 ***************************************
     ************************************************************************************************************************/
    //#region======================================= Hint相关:Start =========================================================
    /**
     * 文本提示信息
     */
    class HintText extends laya.ui.Label {
        constructor() {
            super();
            this.m_bUsing = false; // 是否正在使用
        }
        /** 获取该文本提示是否正在使用 */
        get isUsing() { return this.m_bUsing; }
        initialize() {
            super.initialize();
            this.size(560, 24);
            this.color = "#eceaff";
            this.fontSize = 20;
            this.bold = false;
            this.align = "center";
            this.overflow = "hidden";
            this.stroke = 2;
            this.strokeColor = "#191414";
            this.mouseEnabled = false;
            this.reset();
        }
        /**
         * 设置提示文本
         * @param value
         */
        setText(value) {
            this.changeText(value);
            this.m_bUsing = true;
        }
        /**
         * 重置该文本对象
         */
        reset() {
            this.changeText("");
            this.centerX = 0;
            this.centerY = 0;
            this.m_bUsing = false;
            // this.pos(360, 400);
        }
    }
    /**
     * 文本提示信息管理
     */
    class HintManager {
        constructor() {
            this.MAX_HINT_COUNT = 10; // 最大提示数量
            this.m_lstObjHint = []; // 可用的提示对象列表
            this.m_lstText = []; // 要进行提示的文本列表
            this.m_bPlaying = false; // 帧检测是否正在进行
        }
        /**
         * 提示一条信息
         * @param sText 提示内容
         */
        hint(sText) {
            this.m_lstText.push(sText);
            if (!this.m_bPlaying) {
                this.m_bPlaying = true;
                this.onFrameLoopCaller();
                Laya.timer.frameLoop(10, this, this.onFrameLoopCaller);
            }
        }
        /**
         * 帧函数回调
         */
        onFrameLoopCaller() {
            let objHint = null;
            if (this.m_lstText.length > 0) {
                objHint = this.getUnusedHint();
                if (!objHint) {
                    return;
                }
                const sText = this.m_lstText.shift();
                objHint.setText(sText);
                uiMgr.addChild(objHint, UILayer.Hint);
                Laya.Tween.to(objHint, { y: 270 }, 1600, Laya.Ease.linearInOut, Handler.create(this, this.onTweenComplete, [objHint]));
            }
            if (this.m_lstText.length === 0) {
                Laya.timer.clear(this, this.onFrameLoopCaller);
                this.m_bPlaying = false;
            }
        }
        /**
         * 获取一个未使用的提示对象
         */
        getUnusedHint() {
            let objHint = this.m_lstObjHint.find(value => !value.isUsing);
            if (!objHint) {
                if (this.m_lstObjHint.length < this.MAX_HINT_COUNT) {
                    objHint = new HintText();
                    this.m_lstObjHint.push(objHint);
                }
            }
            return objHint;
        }
        /**
         * 提示完成回调
         * @param objHint 回调参数
         */
        onTweenComplete(objHint) {
            if (objHint == null) {
                return;
            }
            objHint.reset();
            if (objHint.parent) {
                objHint.parent.removeChild(objHint);
            }
        }
        /**
         * 管理器销毁
         */
        destroy() {
            this.m_lstObjHint.forEach(element => {
                if (element.parent)
                    element.parent.removeChild(element);
            });
            this.m_lstObjHint = null;
        }
    }
    //#endregion========================================= Hint相关:End ========================================================
    //#region========================================= UI层相关:Start =========================================================
    /**
     * UI层基类
     */
    class BaseUILayer extends laya.ui.Component {
        constructor() {
            super();
            // this.width = Global.VIEW_WIDTH;
            // this.height = Global.VIEW_HEIGHT;
            this.left = 0;
            this.top = 0;
            this.right = 0;
            this.bottom = 0;
            this.mouseThrough = true;
        }
        /**
         * 资源加载完后的处理
         */
        handleAfterResLoaded() {
        }
    }
    /**
     * 消息等待层
     */
    class NetWaitingLayer extends BaseUILayer {
        constructor() {
            super();
            this.mouseEnabled = true;
            this.mouseThrough = false;
            this.visible = false;
        }
        get waitingView() {
            if (!this.m_vewWaiting) {
                this.m_vewWaiting = new ui.MainUI.NetWaitingViewUI();
                this.addChild(this.m_vewWaiting);
            }
            return this.m_vewWaiting;
        }
        get visible() {
            return super.visible;
        }
        set visible(value) {
            super.visible = value;
            if (super.visible) {
                this.waitingView.ani1.play();
            }
            else {
                this.waitingView.ani1.stop();
            }
        }
    }
    //#endregion========================================= UI层相关:End =========================================================
})(MyUI || (MyUI = {}));
//# sourceMappingURL=UIManager.js.map