var MyUI;
(function (MyUI) {
    /**
     * 页签项数据类
     */
    class TabItemRenderData {
        /**
         * 页签数据构造函数
         * @param nTabId 页签ID
         * @param sLabel 页签文本
         */
        constructor(nTabId, sLabel) {
            /** 页签索引 */
            this.index = 0;
            /** 页签ID */
            this.tabId = 0;
            this._selected = false;
            this._redState = false;
            if (!Global.isNullOrUndefined(nTabId)) {
                this.tabId = nTabId;
            }
            if (!Global.isNullOrUndefined(sLabel)) {
                this.label = sLabel;
            }
        }
        /** 获取页签选中状态 */
        getSelectedState() {
            return this._selected;
        }
        /** 设置页签选中状态 */
        setSelectedState(bState) {
            if (this._selected !== bState) {
                this._selected = bState;
                return true;
            }
            return false;
        }
        /** 获取小红点显示状态 */
        getRedState() {
            return this._redState;
        }
        /** 设置小红点显示状态 */
        setRedState(bState) {
            if (this._redState !== bState) {
                this._redState = bState;
                return true;
            }
            return false;
        }
    }
    MyUI.TabItemRenderData = TabItemRenderData;
    /**
     * 页签渲染项
     */
    class TabItemRender extends ui.Components.TabItemRenderUI {
        constructor() {
            super();
            /** 页签ID */
            this.tabId = 0;
            this.selectedVisibility = false;
            this.redMarkVisibility = false;
        }
        /** ItemRender数据源 */
        get dataSource() { return super._dataSource; }
        set dataSource(value) {
            super._dataSource = value;
            if (value) {
                this.tabId = value.tabId;
                this.label = value.label;
                this.selectedVisibility = value.getSelectedState();
                this.redMarkVisibility = value.getRedState();
            }
        }
        /** 页签文本 */
        get label() {
            return this._btnTab.label;
        }
        set label(sLabel) {
            this._btnTab.label = sLabel;
        }
        /** 页签选中效果是否显示 */
        get selectedVisibility() {
            return this._btnTab.selected;
        }
        set selectedVisibility(value) {
            if (this._btnTab.selected !== value) {
                this._btnTab.selected = value;
            }
        }
        /** 页签小红点是否显示 */
        get redMarkVisibility() {
            return this._aniRedMark.visible;
        }
        set redMarkVisibility(value) {
            if (this._aniRedMark.visible !== value) {
                if (!value)
                    this._aniRedMark.stop();
                this._aniRedMark.visible = value;
                if (value)
                    this._aniRedMark.play(0, true);
            }
        }
        //#region =================== 扩展脚本属性设置 ===================
        /** 页签皮肤 */
        get tabSkin() {
            return this._btnTab.skin;
        }
        set tabSkin(value) {
            this._btnTab.skin = value;
        }
        /** 页签文本颜色，设置方式类似Button.labelColors */
        get tabLabelColors() {
            return this._btnTab.labelColors;
        }
        set tabLabelColors(value) {
            this._btnTab.labelColors = value;
        }
        /** 页签文本字体大小 */
        get tabLabelSize() {
            return this._btnTab.labelSize;
        }
        set tabLabelSize(value) {
            this._btnTab.labelSize = value;
        }
    }
    MyUI.TabItemRender = TabItemRender;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=TabItemRender.js.map