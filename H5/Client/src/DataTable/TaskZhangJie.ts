/**
* name 
*/
namespace tables {
	export class TaskZhangJieVo {
		/** 章节 ID */
		id: number;
		/** 章节名称 */
		zhangJieName: string;
		/**章节描述*/
		zhangJieMiaoShu: string;
		/**结束任务ID*/
		endTaskId: number;
		/**无用*/
		needTaskNum: number;
		/**获得的物品ID*/
		glGoodsId: number;
		constructor() {

		}
	}

	/**
 * 任务章节类
 */
	export class SystemTaskZhangJieTable extends tables.DataTable<TaskZhangJieVo, number> {
		constructor() {
			super("SystemTaskZhangJieTable", "ID");
		}

		/**
		 * 通过任务ID获取任务章节名称
		 * @param goodsID 任务ID
		 */
		public getTaskZhangjiemName(taskZhangJieId: number): string {
			const vo = super.Find(taskZhangJieId);
			if (vo) return vo.zhangJieName;
			return "";
		}
	}
}