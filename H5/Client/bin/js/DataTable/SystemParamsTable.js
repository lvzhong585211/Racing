var tables;
(function (tables) {
    /**
     * 系统参数表
     */
    class SystemParamsTable extends tables.DataTable {
        constructor() {
            super("SystemParams", "Name");
        }
        /**
         * 获取参数名字对应的参数值
         * @param sName
         */
        getParam(sName) {
            const findParam = super.Find(sName);
            if (findParam) {
                return findParam.Value;
            }
            return null;
        }
        /**
         * 获取参数名字对应的浮点型数字
         * @param sName
         */
        getParamDouble(sName) {
            const sParam = this.getParam(sName);
            if (Global.String.IsNullOrWhiteSpace(sParam)) {
                return 0;
            }
            return parseFloat(sParam);
        }
        /**
           * 获取参数名字对应的整数型数字
           * @param sName
           */
        getParamInt(sName) {
            const sParam = this.getParam(sName);
            if (Global.String.IsNullOrWhiteSpace(sParam)) {
                return 0;
            }
            return parseInt(sParam);
        }
        /**
         * 获取参数名字对应的整数数组
         * @param sName
         * @param sSplitChar
         */
        getParamIntArray(sName, sSplitChar = ",") {
            let sParam = this.getParam(sName);
            if (Global.String.IsNullOrWhiteSpace(sParam)) {
                return null;
            }
            sParam = sParam.trim();
            const aInt = [];
            const aParam = sParam.split(sSplitChar);
            aParam.forEach((element) => {
                aInt.push(parseInt(element));
            });
            return aInt;
        }
        /**
         * 获取参数名字对应的浮点型数字数组
         * @param sName
         * @param sSplitChar
         */
        getParamDoubleArray(sName, sSplitChar = ",") {
            let sParam = this.getParam(sName);
            if (Global.String.IsNullOrWhiteSpace(sParam)) {
                return null;
            }
            sParam = sParam.trim();
            const aDouble = [];
            const aParam = sParam.split(sSplitChar);
            aParam.forEach((element) => {
                aDouble.push(parseFloat(element));
            });
            return aDouble;
        }
    }
    tables.SystemParamsTable = SystemParamsTable;
})(tables || (tables = {}));
//# sourceMappingURL=SystemParamsTable.js.map