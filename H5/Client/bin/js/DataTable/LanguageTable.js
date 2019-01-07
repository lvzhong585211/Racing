var tables;
(function (tables) {
    /**
     * 多语言表
     */
    class LanguageTable extends tables.DataTable {
        // private m_mapTextKey: Map<string, string>;
        constructor() {
            super("Language", "IDKey", "");
            // this.mRowConverter = this.handleJsonRowData;
            // this.m_mapTextKey = new Map<string, string>();
        }
    }
    tables.LanguageTable = LanguageTable;
})(tables || (tables = {}));
//# sourceMappingURL=LanguageTable.js.map