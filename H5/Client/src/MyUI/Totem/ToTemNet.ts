module MyUI {
	/**
	* 玩家已经开启的图腾字典数据定义
	*/
	export class ToTemNet {
		/** 当前的角色ID */
		roleId: number = 0;
		/** 当前的开启的图腾字典  图腾Type， 图腾List */
		activatedTotemMap: Map<number, NetMsg.ITotemNetItem[]>;

	}
}