/**
* name
*/
var MyUI;
(function (MyUI) {
    var Handler = laya.utils.Handler;
    class ActivityItemData {
        constructor(aId, sIconName) {
            this.activityId = aId;
            this.sIconName = sIconName;
        }
    }
    MyUI.ActivityItemData = ActivityItemData;
    class ActivityItemRender extends ui.Components.ActivityItemRenderUI {
        constructor() {
            super();
            this.infoRed = "c62e29";
            this.infoGray = "737991";
            this.infoGreen = "49bd1b";
            this.infoBlue = "9aaac4";
            this.infoWhite = "d4dee9";
            this._enterBtn.label = Loca.getLang("11586");
        }
        /**
         * 副本类型图片(右上角)
         * @param value
         * @returns {}
         */
        set setFuBenSprStr(value) {
            this._fuBenTypeSpr.visible = !(value === "");
            this._fuBenTypeSpr.skin = value === "" ? "" : Global.getCommonAtlasImgPath(value);
        }
        /** ItemRender数据源 */
        get dataSource() { return this._dataSource; }
        set dataSource(value) {
            if (value == null)
                return;
            this._dataSource = value;
            this.getFuBenTypes(value.activityId);
            this._activityName.text = value.activityName + value.fuBenType1;
            this._text1.innerHTML = "123456789";
            this._text2.innerHTML = "995162321";
            this._fuBenType2Name.text = this.dataSource.fuBenType2;
            this._enterBtn.clickHandler = Handler.create(this, () => {
                // 进入副本
                this.dPSelectedItem(this, new DPSelectedItemEventArgs(1));
            }, undefined, false);
        }
        /**
         * 获得副本类型文本
         * @param aId           ActivityTypeEnum 枚举ID
         */
        getFuBenTypes(aId) {
            const aGiftTab = tableMgr.adventureGiftsTable.Find(aId);
            if (aGiftTab !== null && aGiftTab !== undefined) {
                this.dataSource.activityName = aGiftTab.Name;
                this.dataSource.fuBenType1 = aGiftTab.FuBenType1 === "-1" ? "" : `  (${aGiftTab.FuBenType1})`;
                this.dataSource.fuBenType2 = aGiftTab.FuBenType2 === "-1" ? "" : `${aGiftTab.FuBenType2}`;
                this.getGifts(aGiftTab.GiftsId);
                this.setFuBenSprStr = this.getFuBenTypeSprStr(this.dataSource.fuBenType2);
            }
        }
        /**
         * 获得产出字符串显示
         * @param gifts
         * @returns {}
         */
        getGifts(gifts) {
            const giftList = gifts.split("|");
            this._giftsListBox.repeatX = giftList.length;
            giftList.forEach((goodsId, index) => {
                const goodIcon = new MyUI.GoodsIcon();
                goodIcon.scaleX = goodIcon.scaleY = 0.5;
                goodIcon.x = index * (goodIcon.width * 0.5 + 5);
                goodIcon.updateByGoodsID(parseInt(goodsId));
                this._giftsListBox.addChild(goodIcon);
            });
        }
        set activityTypeId(aTypeId) {
            switch (aTypeId) {
                case ActivityTypeEnum.Story: // 剧情副本
                    break;
                case ActivityTypeEnum.Exp: // 经验（斗兽场）	
                    break;
                case ActivityTypeEnum.Coin: // 金币（藏金古墓）
                    break;
                case ActivityTypeEnum.PaTa: // 爬塔（锁魔塔）	
                    break;
                case ActivityTypeEnum.BangpaiBoss: // 帮派boss
                    break;
                case ActivityTypeEnum.Demon: // 部落营地
                    break;
                case ActivityTypeEnum.Bloodcastle: // 血色墓地（罗汉星阵）
                    break;
                case ActivityTypeEnum.WorldBoss: // 世界Boss	
                    break;
                case ActivityTypeEnum.GoldBoss: // 灵魂狩猎（灵魂狩猎）
                    break;
                case ActivityTypeEnum.GuZhanChang: // 孤魂遗迹（孤魂遗迹）	
                    break;
                case ActivityTypeEnum.KaLiMaTemple: // 石魔峡谷
                    break;
                case ActivityTypeEnum.EMoLaiXi: // 百魔夜行
                    break;
                case ActivityTypeEnum.LoveFuBen: // 比翼庭院(情侣副本)
                    break;
                case ActivityTypeEnum.Arena: // 竞技场	
                    break;
                case ActivityTypeEnum.PkKing: // 斗技之王
                    break;
                case ActivityTypeEnum.PkCamp: // 阵营大战
                    break;
                case ActivityTypeEnum.LuoLanChengZhan: // 龙城城战
                    break;
                case ActivityTypeEnum.Longjing: // 龙晶矿场
                    break;
                case ActivityTypeEnum.HuanYingShiYuan: // 斗阵争霸
                    break;
                case ActivityTypeEnum.TianTiArena: // 跨服天梯赛
                    break;
                case ActivityTypeEnum.YongzheZhanChang: // 决死战场
                    break;
                case ActivityTypeEnum.HuoDongBoss: // 百炼战场	
                    break;
                case ActivityTypeEnum.ZhongShenZhengBa: // 勇者争霸
                    break;
                case ActivityTypeEnum.PkLovers: // 夫妻竞技
                    break;
                case ActivityTypeEnum.DouZuZhanChang: // 独尊战场
                    break;
                case ActivityTypeEnum.AngelTemple: // 死骷岛
                    break;
            }
        }
        /**
         * 剧情副本显示
         * @returns {}
         */
        setInfoJuQingFuBen() {
            // this._text1.innerHTML = Global.GetColorStringForNGUIText(this.infoGray, Loca.getLang("1721"));
            // let tabID = tableMgr.fuBenTabTable.Find() Global.GetXElementAttributeInt(xmlItem, "TabID");
            // let fuBenType = Global.GetXElementAttributeInt(xmlItem, "FuBenType");
            // if (fuBenType !== (int)ActivityCategorys.JuQingFuBen)
            // {
            // 	continue;
            // }
            // let tLen = tableMgr.fuBenTabTable.AllRows().length;
            // tableMgr.fuBenTabTable.AllRows().forEach();
            // TODO
        }
        /**
         * 获取副本类型图片名称
         * @param fuBenTypeStr   副本类型
         * @returns {}
         */
        getFuBenTypeSprStr(fuBenTypeStr) {
            if (fuBenTypeStr === Loca.getLang("12949")) // 必做
                return "activity_bizuo";
            if (fuBenTypeStr === Loca.getLang("12951")) // 帮会
                return "activity_bangpai_zi";
            if (fuBenTypeStr === Loca.getLang("12950")) // 限时
                return "activity_xianshi";
            if (fuBenTypeStr === Loca.getLang("12953")) // 团体
                return "activity_tuandui_lv";
            if (fuBenTypeStr === Loca.getLang("12952")) // 情侣
                return "activity_qinglv_fen";
            if (fuBenTypeStr === Loca.getLang("12954")) // 对战
                return "activity_duizhan";
            return "";
        }
    }
    MyUI.ActivityItemRender = ActivityItemRender;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=ActivityItemRender.js.map