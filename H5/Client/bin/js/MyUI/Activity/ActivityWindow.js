var MyUI;
(function (MyUI) {
    var Activity;
    (function (Activity) {
        /**
         * 活动窗口类 (冒险、各类活动等)
         */
        class ActivityWindow extends MyUI.BaseWindow {
            constructor() {
                super();
                this.registerEventListeners();
            }
            /** @override */
            createTabDataList() {
                return [
                    this.createTabData(WindowID.MaoXian, ConfigLoca.UI_SysName_Activity_Adventure, Activity.ActivityPart),
                    this.createTabData(WindowID.ZhanChang, ConfigLoca.UI_SysName_Activity_BattleGround, null, WindowID.MaoXian),
                    this.createTabData(WindowID.MeiRiHuoYue, ConfigLoca.UI_SysName_Activity_DailyLiveness)
                ];
            }
            /** @override */
            updatePartUI(nTabId) {
                const vewPart = super.updatePartUI(nTabId);
                if (!vewPart) {
                    return null;
                }
                if (nTabId === WindowID.MaoXian || nTabId === WindowID.ZhanChang) {
                    const actPart = vewPart;
                    actPart.init(nTabId);
                }
            }
            /** @override */
            afterCreatePartInstance(nTabId, vewPart) {
                switch (nTabId) {
                    case WindowID.MaoXian:
                    case WindowID.ZhanChang:
                        const actPart = vewPart;
                        actPart.setMxDataList = this.getMaoXianActivityDataList();
                        actPart.setZcDataList = this.getZhanChangActivityDataList();
                        actPart.setXsDataList = this.getXianShiActivityDataList();
                        break;
                    default:
                        break;
                }
            }
            /** 添加事件监听 */
            registerEventListeners() {
            }
            /** 移除事件监听 */
            unregisterEventListeners() {
            }
            /** @override */
            onClosed(type) {
                this.unregisterEventListeners();
            }
            destroy(destroyChild) {
                this.unregisterEventListeners();
                super.destroy(destroyChild);
            }
            /**
             * 冒险活动Data列表
             * @returns {}
             */
            getMaoXianActivityDataList() {
                return [
                    new MyUI.ActivityItemData(ActivityTypeEnum.Story, "Adv_Tab_000"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.BangpaiBoss, "Adv_Tab_402"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.Exp, "Adv_Tab_002"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.Coin, "Adv_Tab_001"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.PaTa, "Adv_Tab_003"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.WorldBoss, "Adv_Tab_101"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.GoldBoss, "Adv_Tab_102"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.Demon, "Adv_Tab_100"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.Bloodcastle, "Adv_Tab_103"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.GuZhanChang, "Adv_Tab_104"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.Longjing, "Adv_Tab_105"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.AngelTemple, "Adv_Tab_106"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.KaLiMaTemple, "Adv_Tab_201"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.EMoLaiXi, "Adv_Tab_202"),
                    /*new ActivityItemData(ActivityTypeEnum.LoveFuBen, "Adv_Tab_203"),*/
                    new MyUI.ActivityItemData(ActivityTypeEnum.LuolanFazhen, "Adv_Tab_204"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.TianShaZhiZhan, "Adv_Tab_205"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.YuansuShiLian, "Adv_Tab_206")
                ];
            }
            /**
             * 战场活动Data列表
             * @returns {}
             */
            getZhanChangActivityDataList() {
                return [
                    new MyUI.ActivityItemData(ActivityTypeEnum.Arena, "Adv_Tab_300"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.PkCamp, "Adv_Tab_302"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.PkKing, "Adv_Tab_301"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.LuoLanChengZhan, "Adv_Tab_400"),
                    /*new ActivityItemData(ActivityTypeEnum.ShengYuZhengBa, "Adv_Tab_401"),*/
                    new MyUI.ActivityItemData(ActivityTypeEnum.HuanYingShiYuan, "Adv_Tab_501"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.TianTiArena, "Adv_Tab_502"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.YongzheZhanChang, "Adv_Tab_503"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.HuoDongBoss, "Adv_Tab_504"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.LoveFuBen, "Adv_Tab_505")
                ];
            }
            /**
             * 限时活动Data列表
             * @returns {}
             */
            getXianShiActivityDataList() {
                return [
                    new MyUI.ActivityItemData(ActivityTypeEnum.Demon, "Adv_Tab_100"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.Bloodcastle, "Adv_Tab_103"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.PkCamp, "Adv_Tab_302"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.PkKing, "Adv_Tab_301"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.LuoLanChengZhan, "Adv_Tab_400"),
                    new MyUI.ActivityItemData(ActivityTypeEnum.AngelTemple, "Adv_Tab_106")
                ];
            }
        }
        Activity.ActivityWindow = ActivityWindow;
    })(Activity = MyUI.Activity || (MyUI.Activity = {}));
})(MyUI || (MyUI = {}));
//# sourceMappingURL=ActivityWindow.js.map