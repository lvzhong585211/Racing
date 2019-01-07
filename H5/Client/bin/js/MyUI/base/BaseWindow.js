var MyUI;
(function (MyUI) {
    /**
     * 窗口对象的基类
     */
    class BaseWindow extends ui.BaseWindowUI {
        constructor() {
            super();
            /** 已经注册的子界面类名字列表 */
            this.mPartClsNameList = [];
            /** 保存共享同一个界面的页签映射Map（页签打开的是同一个界面） */
            this.mSharedPartTabDic = new Map();
            /** 存储已经实例化的子界面Part的Map */
            this.mPartInstanceMap = new Map();
            /**
             * 将要打开的页签Id，用来确认外部打开窗口时需要显示的页签对应的界面 </br>
             * 注意：该值只是用来确认外部第一次打开界面时要求显示哪个页签，当界面打开后该值就失效了
             */
            this.willOpenTabId = WindowID.Invalid;
            this.initializeTabs();
        }
        /** @override */
        destroy(destroyChild) {
            // 清除注册的类名字
            this.mPartClsNameList.forEach(element => delete Laya.ClassUtils._classMap[element]);
            this.mPartClsNameList.length = 0;
            this.mSharedPartTabDic.clear();
            this.mPartInstanceMap.clear();
            super.destroy(destroyChild);
            this.mPartClsNameList = null;
            this.mSharedPartTabDic = null;
            this.mPartInstanceMap = null;
            this.mTabDataList = null;
        }
        /**
         * 初始化窗口页签显示
         */
        initializeTabs() {
            this._lstTab.vScrollBarSkin = "";
            this._lstTab.mouseHandler = new Laya.Handler(this, this.onTabItemClick);
            // 初始化时刷新一次页签显示
            this.updateTabs(false);
        }
        /**
         * 更新窗口页签显示（页签需要变化的时候，比如动态增加或减少）
         * @param bQuantityChange 是否页签数量发生变化（动态增加或减少）
         */
        updateTabs(bQuantityChange = true) {
            this.mTabDataList = this.createTabDataList();
            this.mTabDataList.forEach(// 设置页签的索引
            (value, index) => value.index = index);
            this._lstTab.array = this.mTabDataList;
            if (bQuantityChange) {
                Global.Log.Assert(this.mTabDataList.length !== 0, `Window(${typeof this}) no tab!!!`);
                // 页签数量发生变化的时候如果上一个页签不存在了则刷新一下窗口显示
                const datTab = this.getSelectedTabData();
                if (!datTab) {
                    this.showPartWithFindIfNotExist(this.mTabDataList[0].tabId);
                }
            }
        }
        /**
         * 页签点击处理
         * @param e 事件对象
         * @param nIdx 页签索引
         */
        onTabItemClick(e, nIdx) {
            if (e.type !== Laya.Event.CLICK) {
                return;
            }
            const itmTab = e.currentTarget;
            itmTab && this.showPart(itmTab.tabId);
        }
        /**
         * 创建页签数据列表
         */
        createTabDataList() {
            const aDatas = [];
            return aDatas;
        }
        /**
         * 构造一个页签数据
         * @param nTabId 页签Id（对应WindowID）
         * @param nTabLabel 页签名称
         * @param clsPart 页签对应的子界面类对象。如果该参数赋值的话，则nSharedTabId参数不需要赋值
         * @param nSharedTabId 和指定的页签共享同一个子界面（即这两个页签打开的界面都是同一个实例）。该参数和clsPart参数互斥（即只需一个赋值即可）
         */
        createTabData(nTabId, nTabLabel, clsPart = null, nSharedTabId = WindowID.Invalid) {
            if (clsPart !== null) {
                const sClsName = this.getPartClassName(nTabId);
                if (!Laya.ClassUtils.getRegClass(sClsName)) {
                    Laya.ClassUtils.regClass(sClsName, clsPart);
                    this.mPartClsNameList.push(sClsName);
                }
            }
            else {
                if (nSharedTabId !== WindowID.Invalid) {
                    this.mSharedPartTabDic.set(nTabId, nSharedTabId);
                }
            }
            return new MyUI.TabItemRenderData(nTabId, nTabLabel);
        }
        /**
         * 获取页签对应的子界面注册的类名字
         * @param nTabId 页签Id
         */
        getPartClassName(nTabId) {
            return `Part_${WindowID[nTabId]}`;
        }
        /**
         * 获取指定的页签是否已经注册了显示界面
         * @param nTabId 页签Id
         */
        getTabIsRegisteredPart(nTabId) {
            const sClsName = this.getPartClassName(nTabId);
            if (Laya.ClassUtils.getRegClass(sClsName)) {
                return true;
            }
            else {
                if (this.mSharedPartTabDic.has(nTabId)) {
                    return this.getTabIsRegisteredPart(this.mSharedPartTabDic.get(nTabId));
                }
            }
            return false;
        }
        /** @override */
        set dataSource(value) {
            super.dataSource = value;
            this.showPartWillOpenTab();
        }
        /**
         * 显示打开窗口时外部调用要求打开的页签界面
         */
        showPartWillOpenTab() {
            if (this.willOpenTabId !== WindowID.Invalid) {
                let nTabId = this.willOpenTabId;
                if (nTabId >= Math.pow(WINDOW_PART_BASE_ID, 2)) {
                    // 注意：BaseWindow窗口只支持到三级页签的查找及显示
                    nTabId = Math.floor(nTabId / WINDOW_PART_BASE_ID);
                }
                this.showPartWithFindIfNotExist(nTabId);
            }
        }
        /**
         * 如果指定页签的界面不存在则查找一个存在的界面显示
         * @param nTabId 页签Id
         */
        showPartWithFindIfNotExist(nTabId) {
            let bFindPart = false; // 是否需要查找有界面的页签
            if (!this.getTabData(nTabId)) { // 要显示的页签不存在，则找一个有页面的页签显示
                bFindPart = true;
            }
            else { // 页签对应的界面不存在，则找一个有页面的页签显示
                bFindPart = !this.getTabIsRegisteredPart(nTabId);
            }
            if (bFindPart) {
                for (const datTab of this.mTabDataList) {
                    if (this.getTabIsRegisteredPart(datTab.tabId)) {
                        nTabId = datTab.tabId;
                        this.willOpenTabId = WindowID.Invalid; // 如果是查找确定的页签则说明外部要求打开的页签已无效
                        break;
                    }
                    else {
                        nTabId = WindowID.Invalid;
                    }
                }
            }
            nTabId !== WindowID.Invalid && this.showPart(nTabId);
        }
        /**
         * 界面打开完成后，调用此方法（如果有弹出动画，则在动画完成后执行）
         */
        onOpened() {
        }
        /**
         * 关闭完成后，调用此方法（如果有关闭动画，则在动画完成后执行）
         * @param type 关闭类型
         */
        onClosed(type) {
        }
        /**
         * 显示页签内容
         * @param nTabId 页签Id（和窗口ID对应）
         */
        showPart(nTabId) {
            if (!this.getTabIsRegisteredPart(nTabId)) { // 如果对应页签界面不存在则提示未开放
                uiMgr.hintText(ConfigLoca.UI_COMMON_FunNoOpen);
                return false;
            }
            // List中ItemRender为延迟更新，所以需要用到Item数据的时候延迟调用
            Laya.timer.callLater(this, this.updatePartUI, [nTabId]);
            return true;
        }
        /**
         * 实际显示页签内容的逻辑
         * @param nTabId 页签Id（和窗口ID对应）
         * @returns 更新成功则返回子界面Part实例，更新失败则返回null
         */
        updatePartUI(nTabId) {
            // 设置页签显示状态
            this.updateTabSelected(nTabId);
            // 设置子界面显示状态
            this.mPartInstanceMap.forEach((value, key) => value.visible = nTabId === key);
            // 获取或设置子界面的实例
            let vewPart = this.getPartInstance(nTabId);
            if (!vewPart) {
                vewPart = this.createPartInstance(nTabId);
            }
            if (!vewPart) {
                const sClsName = this.getPartClassName(nTabId);
                uiMgr.hintText(`${sClsName}(${nTabId}) hasn't registered!!!`);
                return null;
            }
            // 初始化子界面的数据
            if (!vewPart.visible) {
                vewPart.visible = true;
            }
            if ("willOpenTabId" in vewPart) {
                vewPart["willOpenTabId"] = this.willOpenTabId;
            }
            if (super.dataSource && "dataSource" in vewPart) {
                vewPart["dataSource"] = super.dataSource;
            }
            vewPart.enterPart();
            this.willOpenTabId = WindowID.Invalid; // 窗口的子界面显示完成后外部传入的值就无效了
            return vewPart;
        }
        /**
         * 获取子界面Part的实例
         * @param nTabId 页签Id
         */
        getPartInstance(nTabId) {
            let vewPart = this.mPartInstanceMap.get(nTabId);
            if (vewPart || !this.mSharedPartTabDic.has(nTabId)) {
                return vewPart;
            }
            vewPart = this.getPartInstance(this.mSharedPartTabDic.get(nTabId));
            if (vewPart) {
                this.mPartInstanceMap.set(nTabId, vewPart);
            }
            return vewPart;
        }
        /**
         * 创建子界面Part的实例
         * @param nTabId 页签Id
         */
        createPartInstance(nTabId) {
            const sClsName = this.getPartClassName(nTabId);
            if (Laya.ClassUtils.getRegClass(sClsName)) {
                const vewPart = Laya.ClassUtils.getInstance(sClsName);
                this.addChild(vewPart);
                this.mPartInstanceMap.set(nTabId, vewPart);
                this.afterCreatePartInstance(nTabId, vewPart);
                return vewPart;
            }
            if (this.mSharedPartTabDic.has(nTabId)) {
                const vewPart = this.createPartInstance(this.mSharedPartTabDic.get(nTabId));
                if (vewPart) {
                    this.mPartInstanceMap.set(nTabId, vewPart);
                }
                return vewPart;
            }
            return null;
        }
        /**
         * 创建完子界面Part实例后调用，方便做些初始化操作
         * @param nTabId 页签Id
         * @param vewPart 子界面Part的实例
         */
        afterCreatePartInstance(nTabId, vewPart) {
        }
        /**
         * 更新页签的选中状态
         * @param nTabId 页签Id
         */
        updateTabSelected(nTabId) {
            const datCurSelected = this.getSelectedTabData();
            if (datCurSelected) {
                if (datCurSelected.tabId === nTabId) {
                    return;
                }
                datCurSelected.setSelectedState(false) && this._lstTab.changeItem(datCurSelected.index, datCurSelected);
            }
            const datWillSelected = this.getTabData(nTabId);
            if (datWillSelected) {
                datWillSelected.setSelectedState(true) && this._lstTab.changeItem(datWillSelected.index, datWillSelected);
                this._txtTitle.text = datWillSelected.label;
            }
        }
        /**
         * 更新页签的小红点状态
         * @param nTabId
         * @param bState
         */
        updateTabRedState(nTabId, bState) {
            const datTab = this.getTabData(nTabId);
            if (datTab) {
                datTab.setRedState(bState) && this._lstTab.changeItem(datTab.index, datTab);
            }
        }
        /**
         * 获取指定页签Id的页签数据
         * @param nTabId 页签Id
         */
        getTabData(nTabId) {
            return this.mTabDataList.find(value => value.tabId === nTabId);
        }
        /**
         * 获取当前选中的页签的数据
         */
        getSelectedTabData() {
            return this.mTabDataList.find(value => value.getSelectedState());
        }
        /**
         * 获取当前选中的页签Id
         */
        getSelectedTabId() {
            const datTab = this.getSelectedTabData();
            if (datTab) {
                return datTab.tabId;
            }
            return WindowID.Invalid;
        }
    }
    MyUI.BaseWindow = BaseWindow;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=BaseWindow.js.map