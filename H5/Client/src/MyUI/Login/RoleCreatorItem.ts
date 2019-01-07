namespace MyUI {
    import Button = laya.ui.Button;
    import Image = laya.ui.Image;

	/**
	 * 角色创建界面上角色标签组件
	 */
    export class RoleCreatorItem extends ui.Components.RoleCreatorItemUI {
        private m_eOccuSex: EnumSex = EnumSex.Invalid; // 性别
        private m_eOccupation: EnumOccupation = EnumOccupation.Invalid; // 职业
        private m_sOccuDesc: string; // 职业描述

        constructor() {
            super();
        }

        /** 获取职业性别 */
        getOccuSex() { return this.m_eOccuSex; }
        /** 获取职业 */
        getOccupation() { return this.m_eOccupation; }
        /** 获取职业名称 */
        getOccuName() { return this._btnRole.label; }
        /** 获取职业描述 */
        getOccuDesc() { return this.m_sOccuDesc; }

        /**
		 * 设置职业性别
		 * @param value 职业性别
		 */
        setOccuSex(value: EnumSex) {
            this.m_eOccuSex = value;
            return this;
        }

        /**
		 * 设置职业
		 * @param value 职业
		 */
        setOccupation(value: EnumOccupation) {
            this.m_eOccupation = value;
            this._btnAvatar.skin = Global.getLoginAtlasImgPath(`btn_avatar_${this.m_eOccupation}`);
            return this;
        }

        /**
		 * 设置职业名称
		 * @param value 职业名称
		 */
        setOccuName(value: string) {
            this._btnRole.label = value;
            return this;
        }

        /**
		 * 设置职业描述
		 * @param value 职业描述
		 */
        setOccuDesc(value: string) {
            this.m_sOccuDesc = value;
            return this;
        }

        /**
		 * 设置是否选中
		 * @param value 是否选中
		 */
        setSelected(value: boolean) {
            this._btnRole.selected = value;
            this._btnAvatar.selected = value;
        }

        public destroy(destroyChild?: boolean) {
            this.offAll();
            super.destroy(destroyChild);
        }
    }
}