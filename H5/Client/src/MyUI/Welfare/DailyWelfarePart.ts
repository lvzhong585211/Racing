namespace MyUI.Welfare {
    /**
     * 每日福利界面
     */
    export class DailyWelfarePart extends ui.Welfare.DailyWelfarePartUI implements IWindowPart {
        /** 
		 * 用来确定将要显示的子窗口 </br>
		 * 注意：该值只是用来确认打开窗口时显示哪个子窗口，当界面打开后该值就失效了
		 */
        public willOpenWinId: WindowID = WindowID.Invalid;

        private mOnlinePart: OnlineRewardPart; // 在线奖励界面
        private mGradePart: GradeRewardPart; // 等级奖励界面
        private mMeditationPart: MeditationPart; // 潜心修炼界面

        private mPartPos: Laya.Point = new Laya.Point(6, 255); // 子界面的位置

        private mOnlineTipHandler: Laya.Handler; // 在线奖励小红点处理

        constructor() {
            super();

            Style.prepareTabItemRender1(this._tabOnline, WindowID.OnlineReward);
            Style.prepareTabItemRender1(this._tabGrade, WindowID.GradeReward);
            Style.prepareTabItemRender1(this._tabMeditation, WindowID.MeditationReward);
            this._tabOnline.label = ConfigLoca.UI_SysName_Welfare_OnlineReward;
            this._tabGrade.label = ConfigLoca.UI_SysName_Welfare_GradeReward;
            this._tabMeditation.label = ConfigLoca.UI_SysName_Welfare_Meditation;
            this._tabOnline.on(Laya.Event.CLICK, this, this.onTabClick);
            this._tabGrade.on(Laya.Event.CLICK, this, this.onTabClick);
            this._tabMeditation.on(Laya.Event.CLICK, this, this.onTabClick);

            // 在线奖励小红点处理（使用注册Handler的方式）
            this.mOnlineTipHandler = new Laya.Handler(this, (type: ActivityTipTypes, data: ActivityTipItem) => {
                this._tabOnline.redDotVisibility = data.IsActive;
            }, null, false);
            ActivityTipManager.regActivityTipItem(ActivityTipTypes.FuLiMeiRiZaiXian, this.mOnlineTipHandler);
            // 等级奖励小红点处理（使用注册RedDot的方式）
            ActivityTipManager.regActivityTipRedDot(ActivityTipTypes.FuLiUpLevelGift, this._tabGrade.redDot);
            ActivityTipManager.regActivityTipRedDot(ActivityTipTypes.MainMingXiangIcon, this._tabMeditation.redDot);
        }

        destroy(destroyChild?: boolean) {
            ActivityTipManager.unregActivityTipItem(ActivityTipTypes.FuLiMeiRiZaiXian, this.mOnlineTipHandler);
            ActivityTipManager.unregActivityTipRedDot(ActivityTipTypes.FuLiUpLevelGift, this._tabGrade.redDot);
            ActivityTipManager.unregActivityTipRedDot(ActivityTipTypes.MainMingXiangIcon, this._tabMeditation.redDot);
            this._tabOnline.off(Laya.Event.CLICK, this, this.onTabClick);
            this._tabGrade.off(Laya.Event.CLICK, this, this.onTabClick);
            this._tabMeditation.off(Laya.Event.CLICK, this, this.onTabClick);
            super.destroy(destroyChild);
            this.mOnlineTipHandler = null;
        }

        /** @implements */
        enterPart() {
            if (this.willOpenWinId !== WindowID.Invalid) {
                this.showPart(this.willOpenWinId);
            } else {
                this.showPart(WindowID.OnlineReward);
            }
        }

        /**
         * 页签点击处理
         * @param e 事件类型
         */
        private onTabClick(e: Laya.Event) {
            const itmTab = e.target as TabItemRender;
            this.showPart(itmTab.winId);
        }

        /**
         * 显示页签Id对应的界面
         * @param nTabId 页签Id
         */
        private showPart(nTabId: number) {
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
        private showOnlinePart() {
            this._imgBak.skin = Global.getPlateImagePath("dailywelfare_online");
            if (!this.mOnlinePart) {
                this.mOnlinePart = new OnlineRewardPart();
                this.mOnlinePart.pos(this.mPartPos.x, this.mPartPos.y, true);
                this.addChild(this.mOnlinePart);
            }
            this.mOnlinePart.enterPart();
        }

        /**
         * 显示等级奖励界面
         */
        private showGradePart() {
            this._imgBak.skin = Global.getPlateImagePath("dailywelfare_grade");
            if (!this.mGradePart) {
                this.mGradePart = new GradeRewardPart();
                this.mGradePart.pos(this.mPartPos.x, this.mPartPos.y, true);
                this.addChild(this.mGradePart);
            }
            this.mGradePart.enterPart();
        }

        /**
         * 显示潜心修炼界面
         */
        private showMeditationPart() {
            this._imgBak.skin = Global.getPlateImagePath("dailywelfare_xiulian");
            if (!this.mMeditationPart) {
                this.mMeditationPart = new MeditationPart();
                this.mMeditationPart.pos(this.mPartPos.x, this.mPartPos.y, true);
                this.addChild(this.mMeditationPart);
            }
            this.mMeditationPart.enterPart();
        }
    }
}