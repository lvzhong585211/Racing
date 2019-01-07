namespace MyUI.Welfare {
    /**
     * 等级奖励项数据
     */
    export class GradeItemData {
        /** 奖励Id */
        public itemId: number;
        /** 领奖需要等级 */
        public needLevel: number;
        /** 领奖需要重生级别 */
        public needChangeLife: number;
        /** 奖励斗气 */
        public douQi: number;
        /** 奖励金币 */
        public bindGold: number;
        /** 奖励道具列表 */
        public goodsDataList: NetMsg.GoodsData[];
        /** 领奖状态 */
        public state: RewardState;
    }

    /**
     * 等级奖励列表项
     */
    export class GradeItemRender extends ui.Welfare.Components.GradeItemRenderUI {

        private mItemId: number; // 奖励Id

        constructor() {
            super();

            this._btnGet.label = ConfigLoca.UI_Reward_Literal_Get;
            this._txtNotGet.text = ConfigLoca.UI_Reward_NotReach;
            this._iconDouQi.updateByGoodsID(2034);
            this._iconMoney.updateByGoodsID(8014);
            this._btnGet.clickHandler = Laya.Handler.create(this, () => {
                this._btnGet.disabled = true;
                Net.sendGetUpLevelGiftFlagList(this.mItemId);
                Laya.timer.once(1000, this, this.restoreGetButtonDisabled);
            }, null, false);
        }

        /** @override */
        public destroy(destroyChild?: boolean) {
            Laya.timer.clear(this, this.restoreGetButtonDisabled);
            this._btnGet.clickHandler.recover();
            super.destroy(destroyChild);
        }

        /**
         * 恢复领奖按钮的可用状态
         */
        private restoreGetButtonDisabled() {
            this._btnGet.disabled = false;
        }

        /** @override */
        public set dataSource(value: GradeItemData) {
            if (!value) {
                return;
            }
            Laya.timer.clear(this, this.restoreGetButtonDisabled);
            super.dataSource = value;
            this.mItemId = value.itemId;
            const sLevel = UIHelper.FormatLevelLimit(value.needLevel, value.needChangeLife);
            this._txtGrade.text = Global.String.Format(ConfigLoca.UI_Format_Need_Condition, sLevel);
            this._iconDouQi.updateTxtContent(value.douQi + "");
            this._iconMoney.updateTxtContent(value.bindGold + "");
            this._goodsList.array = value.goodsDataList;
            this._btnGet.visible = value.state === RewardState.Can;
            this._btnGet.visible && (this._btnGet.disabled = false);
            this._txtNotGet.visible = value.state === RewardState.Not;
            this._imgHadGet.visible = value.state === RewardState.Had;
        }
    }
}