namespace tables {
    /**
     * 人物属性VO（ExtPropIndexes.xml）
     */
    export interface ExtPropIndexesVO {
        ID: number;
        Word: string;
        Description: string;
        ShowList: number;
        /** 是否是百分比属性 */
        Percent: number;
    }

    export class ExtPropIndexesTable extends DataTable<ExtPropIndexesVO, number> {

        private mWord2IndexVOMap = new Map<string, ExtPropIndexesVO>(); // 名字对VO对象的映射Map

        constructor() {
            super("ExtPropIndexes", "ID", 1);
        }

        /** @override */
        protected addRowDataToMap(key: number, value: ExtPropIndexesVO) {
            super.addRowDataToMap(key, value);
            this.mWord2IndexVOMap.set(value.Word, value);
        }

        /**
         * 根据Word获取属性是否是百分比属性
         * @param word 属性名称
         */
        public getPercentByWord(word: string): boolean {
            let percent = 0;
            if (this.mWord2IndexVOMap.has(word)) {
                const vo = this.mWord2IndexVOMap.get(word);
                vo && (percent = TableUtils.getFieldNumber(vo.Percent));
            }
            return percent === 1;
        }

        /**
         * 根据ID获取属性是否是百分比属性
         * @param ID 属性ID
         */
        public getPercentByID(ID: number): boolean {
            let percent = 0;
            const vo = this.Find(ID);
            vo && (percent = TableUtils.getFieldNumber(vo.Percent));
            return percent === 1;
        }

        /**
         * 根据ID获取ShowList
         * @param ID 属性ID
         */
        public getShowListByID(ID: number): number {
            const vo = this.Find(ID);
            return vo ? TableUtils.getFieldNumber(vo.ShowList) : 0;
        }

        /**
         * 根据ID获取Description
         * @param ID 属性ID
         */
        public getDescriptionByID(ID: number): string {
            let desc: string;
            const vo = this.Find(ID);
            vo && (desc = TableUtils.getFieldString(vo.Description));
            return Global.String.IsNullOrWhiteSpace(desc) ? "" : Loca.getLang(desc);
        }
    }
}