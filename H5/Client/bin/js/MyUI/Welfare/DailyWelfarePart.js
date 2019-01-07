var MyUI;
(function (MyUI) {
    var Welfare;
    (function (Welfare) {
        /**
         * 每日福利界面
         */
        class DailyWelfarePart extends ui.Welfare.DailyWelfarePartUI {
            constructor() {
                super();
                /**
                 * 将要打开的页签Id，用来确认外部打开窗口时需要显示的页签对应的界面 </br>
                 * 注意：该值只是用来确认外部第一次打开界面时要求显示哪个页签，当界面打开后该值就失效了
                 */
                this.willOpenTabId = WindowID.Invalid;
                this.mPartPos = new Laya.Point(228, 343); // 子界面的位置
                MyUI.prepareTabItemRenderStyle1(this._tabOnline, WindowID.OnlineReward);
                MyUI.prepareTabItemRenderStyle1(this._tabGrade, WindowID.GradeReward);
                MyUI.prepareTabItemRenderStyle1(this._tabMeditation, WindowID.MeditationReward);
                this._tabOnline.label = ConfigLoca.UI_SysName_Welfare_OnlineReward;
                this._tabGrade.label = ConfigLoca.UI_SysName_Welfare_GradeReward;
                this._tabMeditation.label = ConfigLoca.UI_SysName_Welfare_XiuLianReward;
                this._tabOnline.on(Laya.Event.CLICK, this, this.onTabClick);
                this._tabGrade.on(Laya.Event.CLICK, this, this.onTabClick);
                this._tabMeditation.on(Laya.Event.CLICK, this, this.onTabClick);
            }
            destroy(destroyChild) {
                this._tabOnline.off(Laya.Event.CLICK, this, this.onTabClick);
                this._tabGrade.off(Laya.Event.CLICK, this, this.onTabClick);
                this._tabMeditation.off(Laya.Event.CLICK, this, this.onTabClick);
                super.destroy(destroyChild);
            }
            /** @implements */
            enterPart() {
                switch (this.willOpenTabId) {
                    case WindowID.OnlineReward:
                    case WindowID.GradeReward:
                    case WindowID.MeditationReward:
                        this.showPart(this.willOpenTabId);
                        break;
                    default:
                        this.showPart(WindowID.OnlineReward);
                        break;
                }
            }
            /**
             * 页签点击处理
             * @param e 事件类型
             */
            onTabClick(e) {
                const itmTab = e.target;
                this.showPart(itmTab.tabId);
            }
            /**
             * 显示页签Id对应的界面
             * @param nTabId 页签Id
             */
            showPart(nTabId) {
                const bOnline = nTabId === WindowID.OnlineReward;
                const bGrade = nTabId === WindowID.GradeReward;
                const bMeditation = nTabId === WindowID.MeditationReward;
                this._tabOnline.selectedVisibility = bOnline;
                this._tabGrade.selectedVisibility = bGrade;
                this._tabMeditation.selectedVisibility = bMeditation;
                this.mOnlinePart && (this.mOnlinePart.visible = bOnline);
                this.mGradePart && (this.mGradePart.visible = bGrade);
                this.mMeditationPart && (this.mMeditationPart.visible = bMeditation);
                bOnline && this.showOnlinePart();
                bGrade && this.showGradePart();
                bMeditation && this.showMeditationPart();
            }
            /**
             * 显示在线奖励界面
             */
            showOnlinePart() {
                this._imgBak.skin = Global.getPlateImagePath("dailywelfare_online");
                if (!this.mOnlinePart) {
                    this.mOnlinePart = new Welfare.OnlineRewardPart();
                    this.mOnlinePart.pos(this.mPartPos.x, this.mPartPos.y, true);
                    this.addChild(this.mOnlinePart);
                }
                this.mOnlinePart.enterPart();
            }
            /**
             * 显示等级奖励界面
             */
            showGradePart() {
                this._imgBak.skin = Global.getPlateImagePath("dailywelfare_grade");
                if (!this.mGradePart) {
                    this.mGradePart = new Welfare.GradeRewardPart();
                    this.mGradePart.pos(this.mPartPos.x, this.mPartPos.y, true);
                    this.addChild(this.mGradePart);
                }
                this.mGradePart.enterPart();
            }
            /**
             * 显示潜心修炼界面
             */
            showMeditationPart() {
                this._imgBak.skin = Global.getPlateImagePath("dailywelfare_xiulian");
                if (!this.mMeditationPart) {
                    this.mMeditationPart = new Welfare.MeditationPart();
                    this.mMeditationPart.pos(this.mPartPos.x, this.mPartPos.y, true);
                    this.addChild(this.mMeditationPart);
                }
                this.mMeditationPart.enterPart();
            }
        }
        Welfare.DailyWelfarePart = DailyWelfarePart;
    })(Welfare = MyUI.Welfare || (MyUI.Welfare = {}));
})(MyUI || (MyUI = {}));
//# sourceMappingURL=DailyWelfarePart.js.map