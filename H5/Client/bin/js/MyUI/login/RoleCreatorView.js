var MyUI;
(function (MyUI) {
    var Handler = laya.utils.Handler;
    var Event = laya.events.Event;
    /**
     * 创建角色界面
     */
    class RoleCreatorView extends ui.login.RoleCreatorUI {
        constructor(preMode) {
            super();
            this.uiEventActorChanged = "eventActorChanged"; // 当选中的角色改变时,通过 event 发送
            this.uiEventReturn = "eventReturn"; // 当点击返回按钮时,通过 event 发送
            // 龙胆职业
            this.comLongDan.setOccupation(EnumOccupation.LongDan)
                .setOccuName(ConfigLoca.UI_OCCUPATION_LongDan)
                .setOccuDesc(ConfigLoca.UI_OCCUPATION_LongDan_Desc)
                .setOccuSex(EnumSex.Male)
                .on(Event.CLICK, this, this.onItemOccupationClick);
            // 花灵职业
            this.comHuaLing.setOccupation(EnumOccupation.HuaLing)
                .setOccuName(ConfigLoca.UI_OCCUPATION_HuaLing)
                .setOccuDesc(ConfigLoca.UI_OCCUPATION_HuaLing_Desc)
                .setOccuSex(EnumSex.Female)
                .on(Event.CLICK, this, this.onItemOccupationClick);
            // 巧工职业
            this.comQiaoGong.setOccupation(EnumOccupation.QiaoGong)
                .setOccuName(ConfigLoca.UI_OCCUPATION_QiaoGong)
                .setOccuDesc(ConfigLoca.UI_OCCUPATION_QiaoGong_Desc)
                .setOccuSex(EnumSex.Female)
                .on(Event.CLICK, this, this.onItemOccupationClick);
            if (preMode === EnumGameMode.Login) {
                this._btnReturn.label = ConfigLoca.UI_LOGIN_CREATE_ReturnLogin;
            }
            else {
                this._btnReturn.label = ConfigLoca.UI_LOGIN_CREATE_ReturnSelectorMode;
            }
            // 按钮监听
            this._btnRandom.clickHandler = Handler.create(this, this.onRandomButtonClick, undefined, false);
            this._btnCreate.clickHandler = Handler.create(this, this.onCreateButtonClick, undefined, false);
            this._btnReturn.clickHandler = Handler.create(this, this.onReturnButtonClick, undefined, false);
            this.resetMe();
        }
        /**
         * 重置显示
         */
        resetMe() {
            this._inputName.text = "";
            // 默认选中第一个
            const evt = new Event();
            evt.setTo(Event.CLICK, this.comLongDan, this.comLongDan);
            this.comLongDan.event(Event.CLICK, evt);
        }
        /**
         * 职业条点击处理
         * @param e
         */
        onItemOccupationClick(e) {
            if (!e || !(e.target instanceof MyUI.RoleCreatorItem)) {
                return;
            }
            if (this.m_itmSelected === e.target) {
                return;
            }
            // 更新选中效果
            if (this.m_itmSelected) {
                this.m_itmSelected.setSelected(false);
            }
            this.m_itmSelected = e.target;
            this.m_itmSelected.setSelected(true);
            // 更新职业描述文本显示
            const nOccuID = this.m_itmSelected.getOccupation();
            this._imgBadge.skin = Global.getLoginAtlasImgPath(`badge_${nOccuID}`);
            this._txtOccuName.text = this.m_itmSelected.getOccuName();
            this._txtOccuInfo.text = this.m_itmSelected.getOccuDesc();
            this.onRandomButtonClick();
            // 发送选中角色改变事件
            this.event(this.uiEventActorChanged, this.m_itmSelected.getOccupation());
        }
        /**
         * 随机名称按钮点击处理
         */
        onRandomButtonClick() {
            // tableMgr.getTableAsync(tables.T_Random_Name).then(
            //     objTb => {
            //         console.log(objTb);
            //         // TODO:
            //     }
            // )
            if (!this.m_lsSurname) {
                this.m_lsSurname = [];
                this.m_lsMaleName = [];
                this.m_lsFemaleName = [];
                const lsNodes = tableMgr.RandomNameTable.AllRows();
                lsNodes.forEach(element => {
                    if (element.xing)
                        this.m_lsSurname.push(element.xing);
                    if (element.nan)
                        this.m_lsMaleName.push(element.nan);
                    if (element.nv)
                        this.m_lsFemaleName.push(element.nv);
                });
            }
            let nIdx = Math.trunc(Math.random() * this.m_lsSurname.length);
            const sXing = this.m_lsSurname[nIdx];
            let sMing;
            if (this.m_itmSelected.getOccuSex() === EnumSex.Male) {
                nIdx = Math.trunc(Math.random() * this.m_lsMaleName.length);
                sMing = this.m_lsMaleName[nIdx];
            }
            else {
                nIdx = Math.trunc(Math.random() * this.m_lsFemaleName.length);
                sMing = this.m_lsFemaleName[nIdx];
            }
            this._inputName.text = (sXing + sMing).trim();
        }
        /**
         * 创建按钮点击处理
         */
        onCreateButtonClick() {
            if (Date.now() - this.m_nLastClickTime < 1500) {
                return;
            }
            if (!this.m_itmSelected) {
                return;
            }
            this.m_nLastClickTime = Date.now();
            let sRoleName = this._inputName.text;
            if (sRoleName === "") {
                // 抱歉,请输入的您要创建的角色名称
                uiMgr.hintText(ConfigLoca.UI_LOGIN_CREATE_NAME_EMPTY);
                return;
            }
            if (sRoleName.search(/[`~!@#$%^&*()_+\\\-=\[\]\{\}:";',.<>\?\/\|\s]/) !== -1) {
                // 抱歉,您的昵称当中含有非法字符，请重新输入
                uiMgr.hintText(ConfigLoca.UI_LOGIN_CREATE_NAME_ILLEGAL);
                return;
            }
            // TODO: 敏感字符读表
            // uiMgr.hintText("敏感字符");
            if (sRoleName.length < 2) {
                // 抱歉,您输入的角色昵称不能少于2个字，请重新输入
                uiMgr.hintText(ConfigLoca.UI_LOGIN_CREATE_NAME_LESS);
                return;
            }
            if (sRoleName.length > 7) {
                // 抱歉,您输入的角色昵称已超过7个字，请重新输入
                uiMgr.hintText(ConfigLoca.UI_LOGIN_CREATE_NAME_MORE);
                return;
            }
            // TODO: 选区不一致
            // uiMgr.hintText("");
            // 消息数据
            const sUserID = gameIns.gameState.UserId;
            const sUserName = gameIns.gameState.UserName;
            const nOccuSex = this.m_itmSelected.getOccuSex();
            const nOccupation = this.m_itmSelected.getOccupation();
            const nServerID = gameIns.gameState.serverInfo.id; // 服务器ID
            const nLiOrZhi = 1; // 原始版本始终为1
            const sPlatformName = ""; // 平台名字
            sRoleName = `${sRoleName}${sPlatformName}`;
            // 发送创建角色消息
            const sCmdInfo = `${sUserID}:${sUserName}:${nOccuSex}:${nOccupation}:${sRoleName}:${nServerID}:${nLiOrZhi}`;
            gameIns.sendStringToGS(EMessageType.CMD_CREATE_ROLE, sCmdInfo);
            uiMgr.showNetWaiting(); // 等待角色创建返回
            // TODO: 平台保存角色
        }
        /**
         * 返回按钮点击处理
         */
        onReturnButtonClick() {
            this.event(this.uiEventReturn);
        }
        destroy(destroyChild) {
            if (this.m_lsSurname) {
                this.m_lsSurname.length = 0;
                this.m_lsSurname = null;
            }
            if (this.m_lsMaleName) {
                this.m_lsMaleName.length = 0;
                this.m_lsMaleName = null;
            }
            if (this.m_lsFemaleName) {
                this.m_lsFemaleName.length = 0;
                this.m_lsFemaleName = null;
            }
            this._btnCreate.clickHandler.recover();
            this._btnReturn.clickHandler.recover();
            this._btnRandom.clickHandler.recover();
            this.offAll();
            this.comLongDan.destroy();
            this.comHuaLing.destroy();
            this.comQiaoGong.destroy();
            super.destroy(destroyChild);
        }
    }
    MyUI.RoleCreatorView = RoleCreatorView;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=RoleCreatorView.js.map