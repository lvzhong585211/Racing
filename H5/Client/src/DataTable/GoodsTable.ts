namespace tables {
	/** 
	 * 物品表数据，对应Goods.json
	 */
	export class GoodsVO {
		/** 物品ID */
		ID: number;
		/** 物品分类 */
		Categoriy: number;
		/** 左右手类型 */
		HandType: number;
		/** 动作类型 */
		ActionType: number;
		/** 物品名称 */
		Title: string;
		/** 资源名称 */
		ResName: string;
		/** 挂接点 */
		GuaJieDian: string;
		/** 挂接特效 */
		GuaJieTeXiao: string;
		/** ShaderID(共20个，分别对应每个装备的强化等级） */
		ShaderID: string;
		/** 物品描述 */
		Description: string;
		/** 最大叠加数 */
		GridNum: number;
		/** 价格1 */
		PriceOne: number;
		/** 价格2 */
		PriceTwo: number;
		/** 冷却时间 */
		CDTime: number;
		/** 公共冷却时间 */
		PubCDTime: number;
		/** 公共冷却组 */
		ShareGroupID: number;
		/** 第几阶装备 */
		SuitID: number;
		/** 饰品套装ID */
		ShouShiSuitID: number;
		/** 品质ID */
		QualityID: number;
		/** 图标ID */
		IconCode: string;
		/** 掉落片 */
		FallGoodsIcon: string;
		/** 物品名称的颜色 */
		GoodsColor: string;
		/** 掉落颜色 */
		FallGoodsColor: string;
		/** 物品需要的重生等级 */
		ToZhuanSheng: number = 0;
		/** 物品需要的等级  */
		ToLevel: number = 1;
		/** 物品需要的职业 */
		ToOccupation: number;
		/** 物品需要的性别 */
		ToSex: number;
		/** 特殊的额外限制，物品需要的类型限制 */
		ToType: string;
		/** 由ToType决定，ToTypeProperty值的意义，不同项用逗号隔开 */
		ToTypeProperty: string;
		/** 物品能否直接双击使用 */
		UsingMode: number;
		/** 是否可以批量使用 */
		PiLiangUse: boolean;
		/** 使用数量 */
		UsingNum: number;
		/** 附带技能 */
		ExecMagic: string;
		/** 洗炼 */
		XiLian: number;
		/** 包裹ID */
		BaoguoID: number;
		/** 关联UI */
		GlUI: number;
		/** 猎杀值 */
		LieShaPrice: number;
		/** 斗气值（精元值） */
		JinYuanPrice: number;
		/** 军功值 */
		JunGongPrice: number;
		/** 积分值 */
		JiFenPrice: number;
		/** 战魂值 */
		ZhanHunPrice: number;
		/** 兑换精元值 */
		ChangeJinYuan: number;
		/** 声音 */
		Sound: string;
		/** 掉落音效 */
		DropSound: string;
		/** 获得音效 */
		GetSound: string;
		/** 所需力量 */
		Strength: number;
		/** 所需敏捷 */
		Dexterity: number;
		/** 所需智力 */
		Intelligence: number;
		/** 所需体力 */
		Constitution: number;
		/** 进阶ID */
		JinJie: number;
		/** 兑换再造点 */
		ChangeZaiZao: number;
		/** 物品需要的原始职业 */
		MainOccupation: number = 0;
		/** 兑换荧光粉末 */
		PulverizedFluorescentPowderNum: number;
		/** 物品边框颜色 */
		ItemQuality: number;
		/** 配置为1时，物品变为不可出售 */
		NoSaleOut: number;
		/** 物品字段为1时，提示贵重物品的二次提示弹窗 */
		Valuables: number;
		/** 装备属性 */
		EquipProps: number[];
	}

	/**
	 * 物品表
	 */
	export class GoodsTable extends DataTable<GoodsVO, number> {
		constructor() {
			super("Goods", "ID", 1, GoodsVO);
			this.mRowConverter = this.json2GoodsVO;
		}

		/**
		 * 把json数据转换成GoodsVO
		 * @param jsonRowData 要转换的json数据 
		 */
		private json2GoodsVO(jsonRowData: any): GoodsVO {
			const rowRet = jsonRowData as GoodsVO;
			if (jsonRowData.PiLiangUse) {
				rowRet.PiLiangUse = parseInt(jsonRowData.PiLiangUse) > 0;
			} else {
				rowRet.PiLiangUse = false;
			}
			return rowRet;
		}

		/**
		 * 获取道具名称
		 * @param goodsID 道具ID
		 * @param bColor 是否包含品质颜色
		 */
		public getName(goodsID: number, bColor: boolean = false): string {
			const vo = super.Find(goodsID);
			if (vo) {
				if (bColor) return Global.GetColorStringForNGUIText(vo.GoodsColor, Loca.getLang(vo.Title));
				else return Loca.getLang(vo.Title);
			}
			return ConfigLoca.UI_LITERAL_NONE;
		}

		/**
		 * 获取道具描述
		 * @param goodsID 道具ID
		 */
		public getDesc(goodsID: number): string {
			const vo = super.Find(goodsID);
			if (vo) return vo.Description;
			return "";
		}

		/**
		 * 获取道具分类
		 * @param goodsID 道具ID
		 */
		public getCategoriy(goodsID: number): ItemCategories {
			const vo = super.Find(goodsID);
			if (vo) return TableUtils.getFieldNumber(vo.Categoriy);
			return ItemCategories.Invalid;
		}

		/**
		 * 获取道具的3d资源名称
		 * @param goodsID 道具ID
		 */
		public getGoods3DResNameByID(goodsID: number): string {
			const vo = super.Find(goodsID);
			if (vo) return vo.ResName;
			return null;
		}

		/**
		 * 获取道具品质
		 * @param goodsID 道具ID
		 */
		public getQuality(goodsID: number): GoodsQuality {
			const vo = super.Find(goodsID);
			if (vo) return vo.ItemQuality;
			return GoodsQuality.White;
		}

		/**
		 * 获取道具再造点
		 * @param goodsID 道具ID
		 */
		public getZaiZaoDian(goodsID: number): number {
			const vo = super.Find(goodsID);
			if (vo) return vo.ChangeZaiZao;
			return 0;
		}

		/**
		 * 获取道具可以叠加的值
		 * @param goodsID 道具ID
		 */
		public getGridNum(goodsID: number): number {
			const vo = super.Find(goodsID);
			if (vo) return vo.GridNum;
			return 1;
		}

		/**
		 * 获取道具的职业
		 * @param goodsID 道具ID
		 */
		public getOccupation(goodsID: number): number {
			const vo = super.Find(goodsID);
			if (vo) return vo.ToOccupation;
			return -1;
		}

		/**
		 * 获取道具图片
		 * @param goodsID 道具ID
		 */
		public getIconCode(goodsID: number): number {
			const vo = super.Find(goodsID);
			if (vo) return parseInt(vo.IconCode);
			return -1;
		}

		/**
		 * 获取道具声音
		 * @param goodsID 道具ID
		 */
		public getSound(goodsID: number): string {
			const vo = super.Find(goodsID);
			if (vo) return vo.Sound;
			return "";
		}

		/**
		 * 获取掉落音效
		 * @param goodsID 道具ID
		 */
		public getDropSound(goodsID: number): string {
			const vo = super.Find(goodsID);
			if (vo) return vo.DropSound;
			return "";
		}

		/**
		 * 获取拾取音效
		 * @param goodsID 道具ID
		 */
		public getGetSound(goodsID: number): string {
			const vo = super.Find(goodsID);
			if (vo) return vo.GetSound;
			return "";
		}

		/**
		 * 道具字符串颜色
		 * @param goodsID 道具ID
		 */
		public getGoodsColor(goodsID: number): string {
			const vo = super.Find(goodsID);
			if (vo) return vo.GoodsColor;
			return "ffffff";
		}

		/**
		 * 获取道具的使用模式(是否允许双击使用)
		 * @param goodsID 道具ID
		 */
		public getUsingMode(goodsID: number): number {
			const vo = super.Find(goodsID);
			if (vo) return vo.UsingMode;
			return 0;
		}

		/**
		 * 获取道具针对的性别
		 * @param goodsID 道具ID
		 */
		public getToSex(goodsID: number): number {
			const vo = super.Find(goodsID);
			if (vo) return vo.ToSex; // 0男 1女
			return -1;
		}

		/**
		 * 获取掉落道具的3d资源名称
		 * @param goodsID 道具ID
		 */
		public getFallGoods3DResName(goodsID: number): string {
			const vo = super.Find(goodsID);
			if (vo) return vo.FallGoodsIcon;
			return "";
		}

		/**
		 * 是否是贵重的物品
		 * @param goodsID 道具ID
		 */
		public isValuable(goodsID: number): boolean {
			const vo = super.Find(goodsID);
			if (vo) return vo.Valuables === 1;
			return false;
		}
	}
}