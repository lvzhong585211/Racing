var tables;
(function (tables) {
    /**
     * 任务表
     */
    class SystemTasksTable extends tables.DataTable {
        constructor() {
            super("SystemTasks", "ID", 1);
        }
        /**
         * 通过任务id获得对应的任务数据
         * @param taskId 指定要获取任务数据的任务ID
         */
        getTaskVo(taskId) {
            return super.Find(taskId);
        }
        /**
         * 通过任务ID获取任务title
         * @param goodsID 任务ID
         */
        getTaskTitle(taskId) {
            const vo = super.Find(taskId);
            if (vo)
                return vo.Title;
            return "";
        }
        /**
         * 通过任务ID获取任务类型
         * @param goodsID 指定要获取资源名称的物品ID
         */
        getTaskClassById(taskId) {
            const vo = super.Find(taskId);
            if (vo)
                return vo.TaskClass;
            return -1;
        }
        /**通过当前任务获得下一个任务ID */
        getNextTaskId(taskId) {
            const vo = super.Find(taskId);
            if (vo)
                return vo.NextTask;
            return -1;
        }
        /**
         * 查找一个给定类型的任务
         * @param taskClass 指定要获取的任务的类型
         */
        getTaskByClass(taskClass) {
            const lsNodes = tableMgr.tasksTable.AllRows();
            for (const taskVo of lsNodes) {
                if (taskVo.TaskClass === taskClass)
                    return taskVo;
            }
            return null;
        }
    }
    tables.SystemTasksTable = SystemTasksTable;
})(tables || (tables = {}));
//# sourceMappingURL=SystemTasks.js.map