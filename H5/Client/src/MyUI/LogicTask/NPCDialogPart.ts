namespace MyUI {
    interface ButtonOperationInfo {
        /** 操作Id */
        Id: number;
        /** 操作类型 */
        IdType: number;
        /** 按钮文本 */
        text: string;
        /** 按钮图标 */
        imgIcon?: string;
    }

    /**
     * NPC对话窗口
     */
    export class NPCDialogPart extends ui.Task.NPCDialogPartUI {

        private mNpcId: number; // NPC唯一Id
        private mNpcExtensionId: number; // NPC表中的模板Id
        private mButtonInfoList: ButtonOperationInfo[] = []; // 操作信息列表

        /**
         * 显示NPC对话窗口
         * @param datNpc NPC数据
         */
        public static open(datNpc: NetMsg.NPCData) {
            const win = windowMgr.openWindow<NPCDialogPart>(WindowID.NPCDialog, true, false);
            win && win.updateUI(datNpc);
        }

        constructor() {
            super();

            Style.prepareHtmlFont18Left(this._txtNpcTalk, ColorCode.normalH);
            this._txtTitleFunc.text = ConfigLoca.UI_Common_Title_Function;
            this._buttonList.renderHandler = new Laya.Handler(this, (cell: Laya.Box, index: number) => {
                const info = this.mButtonInfoList[index];
                const btn = cell as Laya.Button;
                const img = cell.getChildByName("_imgIcon") as Laya.Image;
                btn.label = Loca.getLang(info.text);
                img.skin = Global.isNullOrUndefined(info.imgIcon) ? null : Global.getOperationImagePath(info.imgIcon);
            }, null, false);
            this._buttonList.mouseHandler = new Laya.Handler(this, (e: Laya.Event, index: number) => {
                if (e.type !== Laya.Event.CLICK) return;
                windowMgr.closeWindow(WindowID.NPCDialog, null, false);
                // TODO: 各种弹窗处理
            }, null, false);
            this._btnClose.clickHandler = new Laya.Handler(this, () => {
                this.close(null, false);
            }, null, false);
            this._groupOperation.visible = false;
        }

        /** @override */
        public destroy(destroyChild?: boolean) {
            this.mButtonInfoList.length = 0;
            super.destroy(destroyChild);
            this.mButtonInfoList = null;
        }

        /**
         * 更新窗口显示
         * @param datNpc Npc数据
         */
        public updateUI(datNpc: NetMsg.NPCData) {
            Global.Log.Assert(!Global.isNullOrUndefined(datNpc), "datNpc not existed!!!");
            if (datNpc.NPCID === this.mNpcId) return;
            const voNpc = tableMgr.npcsTable.Find(datNpc.ExtensionID);
            Global.Log.Assert(!Global.isNullOrUndefined(voNpc), `${datNpc.ExtensionID} not existed!!!`);
            this.mNpcId = datNpc.NPCID;
            this.mNpcExtensionId = datNpc.ExtensionID;

            // 更新Npc对话内容
            if (!Global.String.IsNullOrWhiteSpace(voNpc.SName)) {
                this._txtNpcName.text = Loca.getLang(voNpc.SName);
            } else {
                this._txtNpcName.text = "";
            }
            if (!Global.String.IsNullOrWhiteSpace(voNpc.Talk)) {
                const aTalks = voNpc.Talk.split("|");
                this._txtNpcTalk.innerHTML = aTalks.length > 0 ? Loca.getLang(aTalks[Math.random() * aTalks.length | 0]) : "";
            } else {
                this._txtNpcTalk.innerHTML = "";
            }

            // 更新操作按钮列表
            this.mButtonInfoList.length = 0;
            if (!Global.isNullOrUndefined(datNpc.OperationIDs) && datNpc.OperationIDs.length > 0) {
                datNpc.OperationIDs.forEach(
                    nOperationId => {
                        if (nOperationId <= 0) return;
                        const vo = tableMgr.systemOperationTable.Find(nOperationId);
                        if (!vo) return;
                        if (UIHelper.AvalidLevel2(vo.MinLevel, vo.MaxLevel, vo.MinZhuanSheng, vo.MaxZhuanSheng) !== 0) return;
                        if (this.filterOperationID(nOperationId)) {
                            this.mButtonInfoList.push({ Id: nOperationId, IdType: 2, text: vo.Title, imgIcon: vo.Icon });
                        }
                    }
                );
            }
            if (!Global.isNullOrUndefined(datNpc.ScriptIDs) && datNpc.ScriptIDs.length > 0) {
                datNpc.ScriptIDs.forEach(
                    nScriptId => {
                        if (nScriptId <= 0) return;
                        const vo = tableMgr.npcScriptTable.Find(nScriptId);
                        if (!vo) return;
                        if (UIHelper.AvalidLevel2(vo.MinLevel, vo.MaxLevel, vo.MinZhuanSheng, vo.MaxZhuanSheng) !== 0) return;
                        if (this.filterOperationID(nScriptId)) {
                            this.mButtonInfoList.push({ Id: nScriptId, IdType: 3, text: vo.Title });
                        }
                    }
                );
            }
            if (!Global.String.IsNullOrWhiteSpace(voNpc.SaleID)) {
                const aSaleIds = voNpc.SaleID.split(",");
                aSaleIds.forEach(
                    sSaleId => {
                        const nSaleId = Number.parseInt(sSaleId);
                        if (Number.isNaN(nSaleId) || nSaleId <= 0) return;
                        const vo = tableMgr.npcSaleTable.Find(nSaleId);
                        if (!vo) return;
                        if (this.filterOperationID(nSaleId)) {
                            this.mButtonInfoList.push({ Id: nSaleId, IdType: 4, text: vo.Description });
                        }
                    }
                );
            }

            // 更新按钮显示
            if (this.mButtonInfoList.length > 0) {
                this._groupOperation.visible = true;
                this._buttonList.array = this.mButtonInfoList;
            } else {
                this._groupOperation.visible = false;
            }
        }

        /**
         * 过滤下ID，只有指定的ID可以显示出来
         * @param nOperationId 操作Id
         */
        private filterOperationID(nOperationId: number): boolean {
            // TODO: 因为下面的功能都还未做好，所以显示暂时都屏蔽掉
            nOperationId = -1;

            switch (nOperationId) {
                case 31:   // 药店 - 绑金
                case 60:   // 仓库服务
                case 1010: // 重生
                case 5000: // 龙城普通宴会
                case 5001: // 龙城丰盛宴会
                case 5002: // 龙城豪华宴会
                case 5100: // 婚礼宴会
                case 5200: // 祝福宴会
                case 5300: // 祝福榜
                case 7000: // 金币兑换
                case 7100: // 交易行
                    return true;
            }
            return false;
        }
    }
}