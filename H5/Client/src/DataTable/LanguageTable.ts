namespace tables {
	/**
     * 多语言表（Language.xml）
     */
	interface LanguageVO {
		IDKey: string;
		TextKey: string;
		Chinese: string;
		Korean: string;
	}

	/**
	 * 多语言表
	 */
	export class LanguageTable extends DataTable<LanguageVO, string> {
		// private m_mapTextKey: Map<string, string>;

		constructor() {
			super("Language", "IDKey", "");
			// this.mRowConverter = this.handleJsonRowData;
			// this.m_mapTextKey = new Map<string, string>();
		}

		// /**
		//  * 处理行数据
		//  * @param jsonRowData json原始数据
		//  */
		// private handleJsonRowData(jsonRowData: any): LanguageVO {
		// 	const rowRet = jsonRowData as LanguageVO;
		// 	if (Loca.curLanguage == Loca.EnumLanguage.Chinese) this.m_mapTextKey.set(rowRet.TextKey, rowRet.Chinese);
		// 	else if (Loca.curLanguage == Loca.EnumLanguage.Korean) this.m_mapTextKey.set(rowRet.TextKey, rowRet.Korean);
		// 	return rowRet;
		// }

		// /**
		//  * 获取key对应的多语言文本
		//  * @param key 多语言key
		//  */
		// public getLang(key: string) {
		// 	if (/^\d+$/.test(key)) { // 如果key为数字，则从ID为key的列表里查找
		// 		let vo = this.Find(key);
		// 		if (Loca.curLanguage == Loca.EnumLanguage.Chinese) return vo.Chinese;
		// 		else if (Loca.curLanguage == Loca.EnumLanguage.Korean) return vo.Korean;
		// 	} else { // 如果key不为数字，则从文本为key的列表里查找
		// 		if (this.m_mapTextKey.has(key)) {
		// 			return this.m_mapTextKey.get(key);
		// 		}
		// 	}
		// 	return key;
		// }
	}
}