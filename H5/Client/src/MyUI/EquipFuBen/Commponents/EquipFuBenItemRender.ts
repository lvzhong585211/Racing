module MyUI {
	/**
	 * 装备副本ItemData
	 */
	export class EquipFuBenItemData {
		/** 副本Id */
		fuBenId: number;
		/** 副本地图Id */
		fuBenMapCode: number;
		/** 副本Icon图片Name */
		fuBenIcon: number;
		/** 副本名称 */
		fuBenName: string;
		/** 副本需求等级 */
		fuBenNeedLevel: number;
		/** 副本转生等级 */
		fuBenZhuanShengLevel: number;
		/** 副本阶数 */
		fuBenJieNums: number;
		/** 副本开启状态 */
		fuBenOpenState: boolean;
		/** 副本未开启提示 */
		fuBenNoOpenTiShiText: string;
		/** 存放副本难度模式对象 */
		fuBenModeMap: Map<number, EquipFuBenModeData>;
	}
	/**
	 * 副本模式Data(副本模式分为普通、困难、炼狱)
	 */
	export class EquipFuBenModeData {
		/** 副本Id */
		fuBenId: number;
		/** 副本模式 */
		fuBenModeType: number;
		/** 副本已进入次数  */
		fuBenModeEnterNums: number;
		/** 副本最大进入次数  */
		fuBenModeMaxNums: number;
		/** 副本开启等级 */
		fuBenOpenLevel: string;
		/** 副本推荐战力 */
		fuBenTJZhanLi: number;
		/** 副本扫荡要求 */
		fuBenSaoDangYaoQiu: string;
		/** 开启状态 */
		fuBenModeOpenState: boolean;
		/** BossId */
		fuBenBoosId: number;
		/** 副本Boss掉落 */
		fuBenBossDrop: string;
		/** 副本名称 */
		fuBenName: string;
		/** 副本地图Id */
		fuBenMapCode: number;
		/** 我的速度通关时间 */
		fuBenClientSec: number;
		/** 最快通关玩家名称(全服) */
		fuBenStrName: string;
		/** 最快通关时间(全服) */
		fuBenBestTimer: number;
		constructor(fuBenId: number, fuBenModeType: number, fuBenModeEnterNums: number, fuBenModeMaxNums: number, fuBenOpenLevel: string, fuBenTJZhanLi: number, fuBenSaoDangYaoQiu: string,
			fuBenModeOpenState: boolean, fuBenBoosId: number, fuBenBossDrop: string, fuBenName: string, fuBenMapCode: number) {
			this.fuBenId = fuBenId;
			this.fuBenModeType = fuBenModeType;
			this.fuBenModeEnterNums = fuBenModeEnterNums;
			this.fuBenModeMaxNums = fuBenModeMaxNums;
			this.fuBenOpenLevel = fuBenOpenLevel;
			this.fuBenModeOpenState = fuBenModeOpenState;
			this.fuBenTJZhanLi = fuBenTJZhanLi;
			this.fuBenSaoDangYaoQiu = fuBenSaoDangYaoQiu;
			this.fuBenBoosId = fuBenBoosId;
			this.fuBenBossDrop = fuBenBossDrop;
			this.fuBenName = fuBenName;
			this.fuBenMapCode = fuBenMapCode;
		}
	}
	/**
	* 装备副本ItemRender 
	*/
	export class EquipFuBenItemRender extends ui.EquipFuBen.Components.EquipFuBenItemRenderUI {
		modeNumsList: Laya.Label[];
		constructor() {
			super();
			this._imageSuo.visible = false;
			this._imageSelected.visible = false;
			this.modeNumsList = new Array<Laya.Label>();
			this.modeNumsList[1] = this._textFuBenPuTongNums;
			this.modeNumsList[2] = this._textFuBenKunNanNums;
			this.modeNumsList[3] = this._textFuBenLianYuNums;
		}

		/** ItemRender数据源 */
		get dataSource(): EquipFuBenItemData { return this._dataSource; }
		set dataSource(value: EquipFuBenItemData) {
			super.dataSource = value;
			if (value === null)
				return;

			// 副本名称
			this._textFuBenName.text = Loca.getLang(this.dataSource.fuBenName.toString());
			// 副本需求等级
			this._textFuBenNeedLevel.text = UIHelper.FormatLevelLimit(this.dataSource.fuBenNeedLevel, this.dataSource.fuBenZhuanShengLevel);
			// 副本阶数
			this._textFuBenJie.text = Global.String.Format(ConfigLoca.UI_Tips_TextFormat_Jie, this.dataSource.fuBenJieNums);

			let modeData = this.dataSource.fuBenModeMap.get(0);
			// 副本普通模式次数
			this.setFuBenModeNums(this._textFuBenPuTongNums, 0, modeData.fuBenModeEnterNums);
			modeData = this.dataSource.fuBenModeMap.get(1);
			// 副本困难模式次数
			this.setFuBenModeNums(this._textFuBenKunNanNums, 1, modeData.fuBenModeEnterNums);
			modeData = this.dataSource.fuBenModeMap.get(2);
			// 副本炼狱模式次数
			this.setFuBenModeNums(this._textFuBenLianYuNums, 2, modeData.fuBenModeEnterNums);
			// 副本开启状态
			this._imageSuo.visible = !this.dataSource.fuBenOpenState;
			// 副本图片
			this._imageFuBenItem.skin = Global.getFuBenActivityImagePath(this.dataSource.fuBenIcon.toString());
			this._imageFuBenItem.disabled = !this.dataSource.fuBenOpenState;
		}
		/**
		 * 设置副本进入次数更新
		 * @param modeLab 模式数量文本组件
		 * @param type 模式类型(FuBen表记录模式是1、2、3，存储时数组记录时是按0、1、2，传参时加1或减1)
		 * @param enterNums 进入次数 
		 */
		setFuBenModeNums(modeLab: Laya.Label, type: number, enterNums: number): void {
			const modeData = this.dataSource.fuBenModeMap.get(type);
			modeLab.text = `${enterNums}/${modeData.fuBenModeMaxNums}`;
		}
		/**
		 * 设置itemRender选中状态
		 * @param value 
		 */
		setItemRenderSelected(value: boolean): void {
			this._imageSelected.visible = value;
		}
	}
}