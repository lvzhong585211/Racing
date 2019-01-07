var tables;
(function (tables) {
    var Log = Global.Log;
    /**
     * 定义数据表的基本描述
     * @param TRowType 指定行数据的对象类型
     * @param TKeyType 指定数据表索引字段的类型，可以传入null，如果不需要的索引字段
     */
    class DataTable {
        /**
         * @param tableName 指定数据表的名称,相对于 Global.dataTablesPath 且不包括 .json 扩展名
         * 					注：定义表名字，res/datatables路径下的表，子目录中的表需要写上子目录的名字，如:config/activity
         * @param keyFieldName 指定用作索引的字段名称，如果没有指定，则使用数组类型来存储。
         * @param keyType 指定索引字段的类型,如果传入了,则会进行数据类型的检测,以免不小心传入了错误的字段数据
         * @param rowCtor 指定行对象的构造器,如果传入了,则会把每行的数据复制到使用此函数构造的对象中
         * @param rowConverter 把读取到的json行数据转换成行对象的函数.注:如果数据表中数据格式与内存中的行数据对象不一致时需要提供此函数来进行转换
         */
        constructor(tableName, keyFieldName, keyType, rowCtor, rowConverter) {
            this.mTableName = tableName;
            this.mKeyFieldName = keyFieldName;
            DataTable.mAllTables.push(this); // 添加到数据表列表中
            if (keyType !== undefined) {
                this.mKeyType = typeof keyType;
            }
            if (rowCtor !== undefined) {
                this.mRowCtor = rowCtor;
            }
            this.mRowConverter = rowConverter;
        }
        /**
         * 加载数据表
         * @param tableResPath 指定传入了,则表示优先使用此路径来加载数据表
         * 注： 这必须在加载了对应的表资源后才可以
         * 注： 仅仅供DataTableManager调用
         */
        loadTable(tableResUrl) {
            Log.Assert(!this.rowDataCache);
            let sUrl = tableResUrl;
            if (!sUrl)
                sUrl = Global.getDataTablePath(this.mTableName);
            const jsonData = Laya.loader.getRes(sUrl);
            Log.Assert(jsonData); // 资源sUrl应该已经加载过了
            Log.Assert(Array.isArray(jsonData)); // 应该是个数组
            if (this.mKeyFieldName) {
                // 指定要索引列，把数据缓冲到map表，加速查找
                this.rowDataCache = new Map();
                const rowDataMap = this.rowDataCache;
                jsonData.forEach((rowData, index) => {
                    let rowObj = rowData;
                    if (this.mRowConverter) {
                        rowObj = this.mRowConverter(rowData);
                    }
                    if (this.mRowCtor !== undefined) { // 由行构造函数创建一个新的行数据对象
                        const realRowObj = new this.mRowCtor();
                        // 把数据复制过去
                        for (const prop in rowObj) {
                            realRowObj[prop] = rowObj[prop];
                        }
                        rowObj = realRowObj;
                    }
                    let key = rowObj[this.mKeyFieldName];
                    if (!key) {
                        if (this.mKeyType === "number") {
                            key = 0;
                        }
                    }
                    Global.Log.Assert(!this.mKeyType || typeof key === this.mKeyType, `表(${this.mTableName})第${index}行的 key 的数据类型不匹配,指定是(${this.mKeyType}),读取到的是(${typeof key})`);
                    rowDataMap.set(key, rowObj);
                });
            }
            else {
                this.rowDataCache = jsonData;
            }
            // 清除掉资源吧，我们已经保存了，应该不需要了
            Laya.loader.clearRes(sUrl);
            return true;
        }
        /**
         * 查找指定值的行数据
         * @param keyField 指定要查找的索引字段的值
         * @return 如果找到，则返回对应的行数据对象，否则返回null
         */
        Find(keyFieldValue) {
            if (this.rowDataCache instanceof Map) {
                const retRow = this.rowDataCache.get(keyFieldValue);
                if (!retRow) {
                    return null;
                }
                return retRow;
            }
            else {
                Log.Assert(false); // 没有指定索引列，不支持查找
                return null;
            }
        }
        /**
         * 根据属性名字和对应的属性值查找一个vo对象（用于不是主键查找的时候）
         * @param attr 属性名字
         * @param val 属性值
         */
        FindByAttrAndValue(attr, val) {
            if (this.rowDataCache instanceof Map) {
                for (const [key, element] of this.rowDataCache) {
                    if (element[attr] && element[attr].toString() === val) {
                        return element;
                    }
                }
            }
            else {
                return this.rowDataCache.find((element) => element[attr] && element[attr].toString() === val);
            }
            return null;
        }
        /**
         * 根据属性名字和对应的属性值查找所有的vo对象（返回符合条件的对象的数组）
         * @param attr 属性名字
         * @param val 属性值
         */
        FindArrayByAttrAndValue(attr, val) {
            const lst = [];
            if (this.rowDataCache instanceof Map) {
                for (const [key, element] of this.rowDataCache) {
                    if (element[attr] && element[attr].toString() === val) {
                        lst.push(element);
                    }
                }
            }
            else {
                this.rowDataCache.forEach((element) => {
                    if (element[attr] && element[attr].toString() === val) {
                        lst.push(element);
                    }
                });
            }
            return lst;
        }
        /**
         * 以数组形式返回所有的数据表数据.
         * 注： 指定了keyFieldNamer的数据表会比较慢
         */
        AllRows() {
            if (this.rowDataCache instanceof Map) {
                const retData = new Array();
                this.rowDataCache.forEach((value) => {
                    retData.push(value);
                });
                return retData;
            }
            else {
                return this.rowDataCache;
            }
        }
        /**
         * 以引用方式返回行数据.
         * 注: 一定要不修改此数据,否则会导致致命的错误
         */
        allRowsRef() {
            return this.rowDataCache;
        }
    }
    DataTable.mAllTables = new Array(); // 保存所有的数据表对象，仅供DataTableManager使用
    tables.DataTable = DataTable;
})(tables || (tables = {}));
//# sourceMappingURL=DataTableObject.js.map