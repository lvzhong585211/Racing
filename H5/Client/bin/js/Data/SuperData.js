/**
 * 界面使用的数据类
 */
var Data;
(function (Data) {
    class SuperData {
        constructor() {
            /** 文本内容队列 */
            this.RoleTextQueue = new Array();
            /** 角色正在使用的装备列表 */
            this.RoleUsingGoodsDataList = new Map();
            /** 技能配置页列表信息 */
            this.MainQuickKeyItems = new Array(3);
            /** 当前选择的技能配置页 */
            this.m_nChoosePage = 0;
            /** 配置的其他快捷列表 */
            this.OtherQuickKeyItems = new Array(5);
            /** 新获得物品列表 (用于快捷提示引导)*/
            this.NewEquipInfoList = new Array();
            /** 引导类动画正在显示*/
            this.waitingForSystemHelp = false;
            /** 七日登陆活动是否完成 */
            this.sevenDayLoginActFinished = false;
        }
    }
    Data.SuperData = SuperData;
})(Data || (Data = {}));
//# sourceMappingURL=SuperData.js.map