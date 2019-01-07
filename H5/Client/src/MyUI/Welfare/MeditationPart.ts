namespace MyUI.Welfare {
    /**
     * 福利-潜心修炼界面
     */
    export class MeditationPart extends ui.Welfare.MeditationPartUI implements IWindowPart {

        private readonly ProgHeight = 170; // 进度总高度

        private UseGoldPerMinite = 0; // 每分钟需要金币数
        private UseZuanShiPerMinite = 0; // 每分钟需要钻石数
        private mEarningExp = 0; // 经验收益
        private mEarningXingHun = 0; // 星魂收益
        private mNeedMoney = 0; // 领取需要的花费

        constructor() {
            super();

            this._txtTitleEarning.text = ConfigLoca.UI_Meditation_Title_Earning;
            this._txtTitleConsume.text = ConfigLoca.UI_Title_Consumption_With_Colon;
            this._radioGroup.labels = `${ConfigLoca.UI_Meditation_Radio_Free},${ConfigLoca.UI_Meditation_Radio_Double},${ConfigLoca.UI_Meditation_Radio_Quadruple}`;
            this._btnGet.label = ConfigLoca.UI_COMMON_LingQu;

            // 事件监听
            this._radioGroup.selectHandler = new Laya.Handler(this, (index) => {
                this.onMeditationSecsNotify();
            }, null, false);
            this._btnGet.clickHandler = new OpIntervalHandler(500, this, this.onGetButtonClick, null, false);
            gameEventBus.meditationSecsNotify.on(this, this.onMeditationSecsNotify);
            // 数据初始化
            const aNums = tableMgr.sysParamsTable.getParamDoubleArray("MingXiangLingQu");
            this.UseGoldPerMinite = aNums[0];
            this.UseZuanShiPerMinite = aNums[1];
            Net.sendGetMeditateTimeInfoCmd();
        }

        /** @override */
        public destroy(destroyChild?: boolean) {
            gameEventBus.meditationSecsNotify.off(this, this.onMeditationSecsNotify);
            super.destroy(destroyChild);
        }

        /**
         * 领取按钮点击处理
         */
        private onGetButtonClick() {
            if (this.mEarningExp <= 0) {
                uiMgr.hintText(ConfigLoca.UI_Meditation_Get_Failure_NoExp);
                return;
            }
            let nGetFlag = 0; // 获取几倍经验标识，0=免费1倍、1=2倍、2=4倍
            const nRadioSelectedIdx = this._radioGroup.selectedIndex;
            if (nRadioSelectedIdx === 1) { // 2倍
                nGetFlag = 1;
                const nNeedVipLv = tableMgr.sysParamsTable.getParamInt("VIPMingXiang2Times");
                const nTotal = gameIns.gameState.roleData.Money1 + gameIns.gameState.roleData.YinLiang;
                if (gameIns.gameState.roleData.VIPLevel < nNeedVipLv) {
                    if (Global.IsOperateUnPermitInKuaFuMapCheck(false, true)) {
                        uiMgr.hintText(ConfigLoca.UI_Meditation_NeedVip_CanntTopup_BecCross);
                    } else {
                        uiMgr.createPrompt(Global.String.Format(ConfigLoca.UI_Format_NeedVipLevel_IfGoToTopup, nNeedVipLv), (s, e) => {
                            if (e.IDType === PromptBtnCallEnum.PromptConfirm) {
                                // TODO: 打开充值窗口
                                uiMgr.hintText("TODO: 打开充值窗口");
                            }
                        }, PromptEnum.PromptDouble);
                    }
                    return;
                } else if (nTotal < this.mNeedMoney) {
                    // TODO: 弹出获取途径窗口
                    uiMgr.hintText(ConfigLoca.UI_Get_Failure_GoldNotEnough);
                    return;
                }
            } else if (nRadioSelectedIdx === 2) { // 4倍
                nGetFlag = 2;
                const nNeedVipLv = tableMgr.sysParamsTable.getParamInt("VIPMingXiang4Times");
                const nTotal = gameIns.gameState.roleData.UserMoney + gameIns.gameState.roleData.Gold;
                if (gameIns.gameState.roleData.VIPLevel < nNeedVipLv) {
                    if (Global.IsOperateUnPermitInKuaFuMapCheck(false, true)) {
                        uiMgr.hintText(ConfigLoca.UI_Meditation_NeedVip_CanntTopup_BecCross);
                    } else {
                        uiMgr.createPrompt(Global.String.Format(ConfigLoca.UI_Format_NeedVipLevel_IfGoToTopup, nNeedVipLv), (s, e) => {
                            if (e.IDType === PromptBtnCallEnum.PromptConfirm) {
                                // TODO: 打开充值窗口
                                uiMgr.hintText("TODO: 打开充值窗口");
                            }
                        }, PromptEnum.PromptDouble);
                    }
                    return;
                } else if (nTotal < this.mNeedMoney) {
                    // TODO: 弹出获取途径窗口
                    uiMgr.hintText(ConfigLoca.UI_Get_Failure_DiamondNotEnough);
                    return;
                }
            }

            // TODO: 金币或钻石的获取途径
            // TODO: 花费金币或钻石的确认
            Net.sendGetMeditateExpCmd(nGetFlag);
        }

        /**
         * 潜心修炼时间变化通知
         */
        private onMeditationSecsNotify() {
            const objVal = TableUtils.getMingXiangValuePerMinute();
            const nTotalSecs = Global.Data.MeditateSecs1 + Global.Data.MeditateSecs2;
            this.mEarningExp = (nTotalSecs / 60) * objVal.expPerMin | 0;
            this.mEarningXingHun = (nTotalSecs / 60) * objVal.xingHunPerMin | 0;
            const nSelectedIdx = this._radioGroup.selectedIndex;
            // 更新消耗显示
            let nMultiple = 1; // 倍数
            if (nSelectedIdx === 0) { // 1倍
                nMultiple = 1;
                this.mNeedMoney = 0;
                this._imgMoney.skin = null;
                this._txtMoney.text = "";
            } else if (nSelectedIdx === 1) { // 2倍
                nMultiple = 2;
                this._imgMoney.skin = Global.getAwardIconPath(AwardsTypes.BindJinBi);
                this.mNeedMoney = nTotalSecs / 60 * this.UseGoldPerMinite | 0;
                this._txtMoney.text = `${this.mNeedMoney}`;
                this._txtMoney.color = gameIns.gameState.roleData.Money1 < this.mNeedMoney ? `#${ColorCode.no}` : `#${ColorCode.value}`;
            } else if (nSelectedIdx === 2) { // 4倍
                nMultiple = 4;
                this._imgMoney.skin = Global.getAwardIconPath(AwardsTypes.ZuanShi);
                this.mNeedMoney = nTotalSecs / 60 * this.UseZuanShiPerMinite | 0;
                this._txtMoney.text = `${this.mNeedMoney}`;
                this._txtMoney.color = gameIns.gameState.roleData.UserMoney < this.mNeedMoney ? `#${ColorCode.no}` : `#${ColorCode.value}`;
            }
            // 更新收益显示
            this._txtExp.text = NationHelper.FormatNumber(this.mEarningExp * nMultiple);
            this._txtXingHun.text = NationHelper.FormatNumber(this.mEarningXingHun * nMultiple);
            // 更新进度显示
            const fPercent = nTotalSecs / Global.Data.MeditateMaxTime;
            this._imgWater.height = fPercent * this.ProgHeight;
            this._imgWaterLevel.y = this.ProgHeight - this._imgWater.height;
            this._txtTime.text = TimeManager.formatMillisecondsShort(nTotalSecs * 1000, ConfigLoca.UI_Meditation_NoMeditationTime);
        }

        /** @implements */
        public enterPart() {
            this.onMeditationSecsNotify();
        }
    }
}