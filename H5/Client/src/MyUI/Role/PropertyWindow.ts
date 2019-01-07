namespace MyUI.Role {
    /** 属性数据 */
    class PropertyStr {
        ShowList: number;
        Percent: boolean;
        Str: string;
        Att: number;
    }

    /**
     * 属性窗口
     */
    export class PropertyWindow extends ui.PlayerBag.PropertyWindowUI {

        /**
         * 打开角色详细属性窗口
         * @param datAttr 属性数据
         */
        public static openRoleAttribute(datAttr: NetMsg.SecondaryAttributeData) {
            // 更新属性数据
            const aAttrs = datAttr.attrList;
            const aProps: PropertyStr[] = [];
            for (let i = 1; i < ExtPropIndexes.Max; i++) {
                if (aAttrs.length > i && aAttrs[i] > 0) {
                    const nShowList = tableMgr.extPropIndexsTable.getShowListByID(i);
                    if (nShowList > 0) {
                        const item = new PropertyStr();
                        item.ShowList = nShowList;
                        item.Str = tableMgr.extPropIndexsTable.getDescriptionByID(i);
                        item.Percent = tableMgr.extPropIndexsTable.getPercentByID(i);
                        item.Att = aAttrs[i];
                        aProps.push(item);
                    }
                }
            }
            aProps.sort((a, b) => a.ShowList - b.ShowList);
            let sAttr: string = "";
            for (let i = 0; i < aProps.length; i++) {
                const item = aProps[i];
                if (item.Percent) {
                    sAttr += `${item.Str}: ${((item.Att * 100) | 0) / 100}%\n`;
                } else {
                    if (item.Att > 1) { // 策划说要向下取整，小于1的取出来是0，所以不显示
                        sAttr += `${item.Str}: ${NationHelper.FormatAttribute(item.Att | 0)}\n`;
                    }
                }
            }

            // 打开窗口
            const win = windowMgr.openWindow<PropertyWindow>(WindowID.PropertyWindow);
            win && win.updateUI(ConfigLoca.UI_Role_Title_Button_Detail, sAttr);
        }

        constructor() {
            super();
        }

        /** @override */
        public destroy(destroyChild?: boolean) {
            super.destroy(destroyChild);
        }

        /**
         * 更新界面显示
         * @param sHeadline 标题
         * @param sAttr 属性内容
         */
        public updateUI(sHeadline: string, sAttr: string) {
            this._txtHeadline.text = sHeadline;
            this._txtContent.text = sAttr;
        }
    }
}