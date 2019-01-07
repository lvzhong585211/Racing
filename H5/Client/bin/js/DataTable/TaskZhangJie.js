/**
* name
*/
var tables;
(function (tables) {
    class TaskZhangJieVo {
        constructor() {
        }
    }
    tables.TaskZhangJieVo = TaskZhangJieVo;
    /**
 * 任务章节类
 */
    class SystemTaskZhangJieTable extends tables.DataTable {
        constructor() {
            super("SystemTaskZhangJieTable", "ID");
        }
        /**
         * 通过任务ID获取任务章节名称
         * @param goodsID 任务ID
         */
        getTaskZhangjiemName(taskZhangJieId) {
            const vo = super.Find(taskZhangJieId);
            if (vo)
                return vo.zhangJieName;
            return "";
        }
    }
    tables.SystemTaskZhangJieTable = SystemTaskZhangJieTable;
})(tables || (tables = {}));
//# sourceMappingURL=TaskZhangJie.js.map