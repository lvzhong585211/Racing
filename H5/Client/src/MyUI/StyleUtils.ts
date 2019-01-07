
/**********************************************************
 **************** UI标准规格（样式）辅助函数 ****************
 **********************************************************/

namespace MyUI.Style {

    //#region ================== 页签样式 ==================

    /**
     * 设置页签样式1 </br>
     * 最终显示效果可以参考 <福利-每日福利-在线奖励|等级奖励|潜心修炼> 的显示样式
     * @param itmTab 要设置的页签
     * @param nWinId 窗口Id
     */
    export function prepareTabItemRender1(itmTab: TabItemRender, nWinId: WindowID = 0) {
        itmTab.winId = nWinId;
        itmTab._btnTab.skin = Global.getCommonAtlasImgPath("btn_tab1");
        itmTab._btnTab.sizeGrid = "8,8,8,8";
        itmTab._btnTab.labelColors = "#dae8f5,#dae8f5,#dae8f5,#dae8f5";
        itmTab._btnTab.labelSize = 22;
    }

    //#endregion ==========================================

    //#region ================== Html文本样式 ==================

    /**
     * 设置Html文本框样式
     * @param element Html文本框对象
     * @param align 布局位置（可设置"left"、"right"、"center"）
     * @param fontSize 字体大小
     * @param color 文本颜色
     * @param leading 行间距
     */
    function prepareHtmlElementStyle(element: Laya.HTMLDivElement, align: string, fontSize: number, color: string, leading: number) {
        const style = element.style;
        style.align = align;
        style.fontSize = fontSize;
        style.color = color;
        style.leading = leading;
    }

    /**
     * 设置Html文本框样式：18号字体、居左显示
     * @param element Html文本框对象
     * @param color 文本颜色
     */
    export function prepareHtmlFont18Left(element: Laya.HTMLDivElement, color: string) {
        prepareHtmlElementStyle(element, "left", 18, color, 6);
    }

    /**
     * 设置Html文本框样式：18号字体、居右显示
     * @param element Html文本框对象
     * @param color 文本颜色
     */
    export function prepareHtmlFont18Right(element: Laya.HTMLDivElement, color: string) {
        prepareHtmlElementStyle(element, "right", 18, color, 6);
    }

    /**
     * 设置Html文本框样式：18号字体、居中显示
     * @param element Html文本框对象
     * @param color 文本颜色
     */
    export function prepareHtmlFont18Center(element: Laya.HTMLDivElement, color: string) {
        prepareHtmlElementStyle(element, "center", 18, color, 6);
    }

    /**
     * 设置Html文本框样式：20号字体、居左显示
     * @param element Html文本框对象
     * @param color 文本颜色
     */
    export function prepareHtmlFont20Left(element: Laya.HTMLDivElement, color: string) {
        prepareHtmlElementStyle(element, "left", 20, color, 6);
    }

    /**
     * 设置Html文本框样式：20号字体、居右显示
     * @param element Html文本框对象
     * @param color 文本颜色
     */
    export function prepareHtmlFont20Right(element: Laya.HTMLDivElement, color: string) {
        prepareHtmlElementStyle(element, "right", 20, color, 6);
    }

    /**
     * 设置Html文本框样式：20号字体、居中显示
     * @param element Html文本框对象
     * @param color 文本颜色
     */
    export function prepareHtmlFont20Center(element: Laya.HTMLDivElement, color: string) {
        prepareHtmlElementStyle(element, "center", 20, color, 6);
    }

    /**
     * 设置Html文本框样式：22号字体、居左显示
     * @param element Html文本框对象
     * @param color 文本颜色
     */
    export function prepareHtmlFont22Left(element: Laya.HTMLDivElement, color: string) {
        prepareHtmlElementStyle(element, "left", 22, color, 6);
    }

    /**
     * 设置Html文本框样式：22号字体、居右显示
     * @param element Html文本框对象
     * @param color 文本颜色
     */
    export function prepareHtmlFont22Right(element: Laya.HTMLDivElement, color: string) {
        prepareHtmlElementStyle(element, "right", 22, color, 6);
    }

    /**
     * 设置Html文本框样式：22号字体、居中显示
     * @param element Html文本框对象
     * @param color 文本颜色
     */
    export function prepareHtmlFont22Center(element: Laya.HTMLDivElement, color: string) {
        prepareHtmlElementStyle(element, "center", 22, color, 6);
    }

    /**
     * 设置Html文本框样式：24号字体、居左显示
     * @param element Html文本框对象
     * @param color 文本颜色
     */
    export function prepareHtmlFont24Left(element: Laya.HTMLDivElement, color: string) {
        prepareHtmlElementStyle(element, "left", 24, color, 6);
    }

    /**
     * 设置Html文本框样式：24号字体、居右显示
     * @param element Html文本框对象
     * @param color 文本颜色
     */
    export function prepareHtmlFont24Right(element: Laya.HTMLDivElement, color: string) {
        prepareHtmlElementStyle(element, "right", 24, color, 6);
    }

    /**
     * 设置Html文本框样式：24号字体、居中显示
     * @param element Html文本框对象
     * @param color 文本颜色
     */
    export function prepareHtmlFont24Center(element: Laya.HTMLDivElement, color: string) {
        prepareHtmlElementStyle(element, "center", 24, color, 6);
    }

    //#endregion ==============================================
}