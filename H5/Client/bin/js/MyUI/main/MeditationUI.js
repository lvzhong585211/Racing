var MyUI;
(function (MyUI) {
    /**
     * 主界面潜心修炼逻辑
     */
    class MeditationUI extends ui.MainUI.MeditationUIUI {
        constructor() {
            super();
            this.ProgHeight = 116; // 进度总高度
            this._txtTimeTitle.text = ConfigLoca.UI_Meditation_Title_HadMeditationTime;
            this._txtExpTitle.text = Global.String.Format(ConfigLoca.UI_Format_Hint_GetExp2, "");
            this._txtXingHunTitle.text = ConfigLoca.UI_Meditation_Title_Get_XingHun;
            this._evtRegion.on(Laya.Event.CLICK, this, () => {
                windowMgr.openWindow(WindowID.MeditationReward);
            });
        }
        destroy(destroyChild) {
            super.destroy(destroyChild);
        }
        /**
         * 设置潜心修炼奖励信息
         * @param nSecs1 安全区潜心修炼时间（秒）
         * @param nSecs2 非安全区潜心修炼时间（秒）
         */
        setRewardInfo(nSecs1, nSecs2) {
            const objVal = TableUtils.getMingXiangValuePerMinute();
            const nTotalSecs = nSecs1 + nSecs2;
            const fPercent = nTotalSecs / Global.Data.MeditateMaxTime;
            this._imgWater.height = fPercent * this.ProgHeight;
            this._imgWaterLevel.y = this.ProgHeight - this._imgWater.height;
            this._txtPercent.text = Global.String.Format(ConfigLoca.UI_Format_Percent, (fPercent * 100 | 0));
            let sTime = TimeManager.formatMillisecondsShort(nTotalSecs * 1000, ConfigLoca.UI_Meditation_NoMeditationTime);
            if (nTotalSecs >= Global.Data.MeditateMaxTime) {
                sTime += ConfigLoca.UI_MingXiang_Time_Full;
            }
            this._txtTime.text = sTime;
            this.setExpText((nTotalSecs / 60) * objVal.expPerMin | 0);
            this.setXingHunText((nTotalSecs / 60) * objVal.xingHunPerMin | 0);
        }
        /**
         * 设置经验值文本
         * @param value 经验值
         */
        setExpText(value) {
            this._txtExp.text = NationHelper.FormatNumber(value);
        }
        /**
         * 设置星魂值文本
         * @param value 星魂值
         */
        setXingHunText(value) {
            this._txtXingHun.text = NationHelper.FormatNumber(value);
        }
    }
    MyUI.MeditationUI = MeditationUI;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=MeditationUI.js.map