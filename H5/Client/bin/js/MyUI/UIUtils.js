/**
* name 相当于”GUIUtils“
*/
var MyUI;
(function (MyUI) {
    MyUI.DefaultFont = "Microsoft YaHei"; // 默认字体中不可以带大小,否则html的字体大小就不正确了
    MyUI.DebugFont = "14px Microsoft YaHei"; // 用于输出调试信息的字体
    /**
     * 定义常用的颜色
     */
    class ColorCode {
        /**
         * 用给定的颜色格式化文本
         * @param text 指定要格式化的文本
         * @param color 要使用的颜色
         */
        static encodingText(text, color = ColorCode.green) {
            return `<font color='#${color}'>${text}</font>`;
        }
    }
    // ARGB颜色值
    ColorCode.Orange = 0xffff9d08;
    ColorCode.Green = 0xff49bd1b;
    ColorCode.Gray = 0xff999999;
    ColorCode.White = 0xffffffff;
    ColorCode.Red = 0xffe73722;
    ColorCode.White2 = 0xffdac7ae;
    ColorCode.Yellow = 0xfff2b308;
    ColorCode.Yellow2 = 0xffffd460;
    ColorCode.Yellow3 = 0xffc39550;
    ColorCode.Blue1 = 0xff73dcff;
    ColorCode.Blue2 = 0xffACF6FF;
    ColorCode.Blue3 = 0xff4997bc;
    ColorCode.Green2 = 0xff3aab1f;
    ColorCode.Cyan = 0xff00b9c5;
    ColorCode.Gray2 = 0xff5e5e5e;
    ColorCode.Cyan2 = 0xff4997bc;
    ColorCode.Blue = 0xff53bdec;
    ColorCode.Purple = 0xffdc76d6;
    ColorCode.Normal = 0xff99a2b1;
    ColorCode.Value = 0xffdae8f5;
    ColorCode.Value1 = 0xffafbacd;
    ColorCode.No = 0xffc62e29;
    ColorCode.TabColor = 0xff737991;
    ColorCode.TabColor1 = 0xffd4dee9;
    ColorCode.Title = 0xffd6dfe8;
    ColorCode.Name = 0xffa7b9ce;
    ColorCode.Button = 0xfffcfafd;
    ColorCode.ZhuoYue0 = 0xffa5a9b2;
    ColorCode.ZhuoYue1 = 0xff749a29;
    ColorCode.ZhuoYue2 = 0xff3574bd;
    ColorCode.ZhuoYue3 = 0xff9b49db;
    ColorCode.blue_string = 0x53bdec;
    // NGUI颜色代码字符串值
    ColorCode.orange = "ff9d08";
    ColorCode.orange2 = "e3b36c";
    ColorCode.green = "49bd1b";
    ColorCode.gray = "666666";
    ColorCode.red = "e73722";
    ColorCode.red2 = "d21616";
    ColorCode.white = "fffffe";
    ColorCode.white2 = "edecea";
    ColorCode.white3 = "ffffff";
    ColorCode.yellow = "f2b308";
    ColorCode.yellow2 = "ffd460";
    ColorCode.yellow3 = "c39550";
    ColorCode.yellow4 = "F2E2BD";
    ColorCode.yellow5 = "ffeb65";
    ColorCode.blue1 = "73dcff";
    ColorCode.blue2 = "ACF6FF";
    ColorCode.blue3 = "4997bc";
    ColorCode.green2 = "3aab1f";
    ColorCode.cyan = "00b9c5";
    ColorCode.gray2 = "5e5e5e";
    ColorCode.cyan2 = "4997bc";
    ColorCode.blue = "53bdec";
    ColorCode.purple = "dc76d6";
    ColorCode.normal = "99a2b1";
    ColorCode.value = "dae8f5";
    ColorCode.no = "c62e29";
    ColorCode.tabColor = "737991";
    ColorCode.tabColor1 = "d4dee9";
    ColorCode.title = "d6dfe8";
    ColorCode.name_string = "a7b9ce";
    ColorCode.button = "fcfafd";
    ColorCode.value1 = "afbacd";
    ColorCode.zhuoYue0 = "a5a9b2";
    ColorCode.zhuoYue1 = "749a29";
    ColorCode.zhuoYue2 = "3574bd";
    ColorCode.zhuoYue3 = "9b49db";
    ColorCode.friendLineGrey = "7f7f7f"; // 好友界面离线灰色
    ColorCode.friendLineBlue = "337ed7"; // 好友界面在线蓝色
    ColorCode.sevenDayNoActive = "475c6c"; // 7日天数文本不可领取
    ColorCode.sevenDayActive = "8fb8d8"; // 7日天数文本可领取
    // NGUI颜色代码关闭符
    ColorCode.close = "-";
    MyUI.ColorCode = ColorCode;
    /**
     * 显示或隐藏所有子对象
     * @param parent
     * @param bState
     */
    function setActiveChildren(parent, bState) {
        const nCnt = parent.numChildren;
        for (let nIdx = 0; nIdx < nCnt; nIdx++) {
            const node = parent.getChildAt(nIdx);
            if (bState)
                showNodeWithLayout(node);
            else
                hideNodeWithLayout(node);
        }
    }
    MyUI.setActiveChildren = setActiveChildren;
    /**
     * 显示/隐藏节点
     * @param node
     * @param bState
     */
    function toggleNodeWithLayout(node, bState) {
        if (bState) {
            showNodeWithLayout(node);
        }
        else {
            hideNodeWithLayout(node);
        }
    }
    MyUI.toggleNodeWithLayout = toggleNodeWithLayout;
    /**
     * 显示节点，如果是Component启用布局
     * @param node
     */
    function showNodeWithLayout(node) {
        if (node instanceof laya.ui.Component) {
            node.layoutEnabled = node.visible = true;
        }
        else {
            node.visible = true;
        }
    }
    MyUI.showNodeWithLayout = showNodeWithLayout;
    /**
     * 隐藏节点，如果是Component不启用布局
     * @param node
     */
    function hideNodeWithLayout(node) {
        if (node instanceof laya.ui.Component) {
            node.layoutEnabled = node.visible = false;
        }
        else {
            node.visible = false;
        }
    }
    MyUI.hideNodeWithLayout = hideNodeWithLayout;
    /**
     * 设置CSSStyle样式
     * @param style
     * @param align
     * @param fontSize
     * @param color
     * @param bold
     */
    function prepareCSSStyle(style, align = "left", fontSize = 18, color = `#${ColorCode.normal}`, bold = false) {
        style.align = align;
        style.fontSize = fontSize;
        style.color = color;
        style.bold = bold;
    }
    MyUI.prepareCSSStyle = prepareCSSStyle;
    /**
     * 扩大指定对象的点击区域
     * @param spr 对象
     * @param nHitW 点击区域宽
     * @param nHitH 点击区域高
     */
    function enlargeHitArea(spr, nHitW, nHitH) {
        if (!spr)
            return;
        const nOffsetX = (nHitW - spr.width) / 2;
        const nOffsetY = (nHitH - spr.height) / 2;
        spr.hitArea = new Laya.Rectangle(-nOffsetX, -nOffsetY, nHitW, nHitH);
        // // Debug...
        // let debugSp = new Laya.Sprite();
        // debugSp.graphics.drawRect(-nOffsetX, -nOffsetY, nHitW, nHitH, "#ffff00");
        // debugSp.alpha = 0.2;
        // spr.addChild(debugSp);
    }
    MyUI.enlargeHitArea = enlargeHitArea;
    /**
     * 设置页签样式1 </br>
     * 最终显示效果可以参考每日福利界面里面的页签显示样式
     * @param itmTab 要设置的页签
     * @param nTabId 页签Id
     */
    function prepareTabItemRenderStyle1(itmTab, nTabId = 0) {
        itmTab.tabId = nTabId;
        itmTab._btnTab.skin = Global.getCommonAtlasImgPath("btn_common_tab_style1");
        itmTab._btnTab.sizeGrid = "8,8,8,8";
        itmTab._btnTab.labelColors = "#dae8f5,#dae8f5,#dae8f5,#dae8f5";
        itmTab._btnTab.labelSize = 22;
    }
    MyUI.prepareTabItemRenderStyle1 = prepareTabItemRenderStyle1;
    //#region ======================== class的定义可以放到这里 ========================
    /**
     * 有操作间隔的Handler（操作太快会进行提示）
     * 注意：该类型的Handler不能通过Handler.create创建
     */
    class OpIntervalHandler extends Laya.Handler {
        /**
         * 有操作间隔的Handler（操作太快会进行提示）
         * @param nInterval 允许的操作间隔时间（毫秒）
         * @param caller 执行域
         * @param method 处理函数
         * @param args 函数参数
         * @param once 是否只执行一次
         */
        constructor(nInterval, caller, method, args, once, bHint = true) {
            super(caller, method, args, once);
            this.m_nOpInterval = 0; // 操作间隔时间（毫秒）
            this.m_bHint = true; // 是否需要进行提示
            this.m_nLastOpTime = 0; // 上次操作时间
            this.m_nOpInterval = nInterval;
            this.m_bHint = bHint;
        }
        /**
         * 执行处理器。
         */
        run() {
            if (this.isValid()) {
                super.run();
            }
        }
        /**
         * 执行处理器，携带额外数据。
         * @param	data 附加的回调数据，可以是单数据或者Array(作为多参)。
         */
        runWith(data) {
            if (this.isValid()) {
                super.runWith(data);
            }
        }
        /**
         * 操作是否有效
         */
        isValid() {
            const nCurTime = Date.now();
            if (nCurTime - this.m_nLastOpTime >= this.m_nOpInterval) {
                this.m_nLastOpTime = nCurTime;
                return true;
            }
            uiMgr.hintText(Loca.getLang("12810")); // 您的操作太快，请稍后再试
            return false;
        }
    }
    MyUI.OpIntervalHandler = OpIntervalHandler;
    //#endregion ====================================================================
})(MyUI || (MyUI = {}));
//# sourceMappingURL=UIUtils.js.map