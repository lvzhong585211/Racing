/**
* GM命令控制器 
*/
namespace GmCommand {
	/**
	 * 添加物品指令(*必填)
	 * @param	goodsId				物品ID*
	 * @param	count				  物品数量*
	 * @param	bind				   是否绑定，0:默认不绑定  1:绑定
	 * @param	goodsLevel	     强化等级 最大15
	 * @param	appLev              附加等级
	 * @param	luck				   幸运值(如果有需要，1即可)
	 * @param	excellence		   随机属性(根据二进制可以调出想要的属性，一般需要紫色属性的话直接填写：攻击属性：235防御属性：16128)
	 */
	export function addGoods(goodsId: number, count: number, bind: number = 0, goodsLevel: number = 0, appLev: number = 0, luck: number = 0, excellence: number = 0): void {
		const tStr = `-addid ${gameIns.gameState.RoleName} ${goodsId} ${count} ${bind} ${goodsLevel} ${appLev} ${luck} ${excellence}`;
		Net.sendChat(0, "", "", tStr, 0);
	}
	/**
	 * 跳转任务
	 * @param taskId              任务ID		
	 * @returns {} 
	 */
	export function jumpTaskId(taskId: number = 6000) {
		const tStr = `-setmaintask ${gameIns.gameState.RoleName} ${taskId}`;
		Net.sendChat(0, "", "", tStr, 0);
	}
	/**
	 * 设置VIP等级
	 * @param vipLevel            要设置的VIP等级
	 */
	export function setVipLevel(vipLevel: number): void {
		const tStr = `-setviplev ${gameIns.gameState.RoleName} ${vipLevel}`;
		Net.sendChat(0, "", "", tStr, 0);
	}
	/**
	 * 设置人物等级
	 * @param level               要设置的人物等级
	 * @param liftLevel           要设置的人物转生等级
	 */
	export function setRoleLevel(level: number, liftLevel: number): void {
		const tStr = `-setlev ${gameIns.gameState.RoleName} ${level} ${liftLevel}`;
		Net.sendChat(0, "", "", tStr, 0);
	}
	/**
		 * 设置钻石数量
		 * @param nums             要设置的钻石数量
		 */
	export function setZuanShi(nums: number): void {
		const tStr = `-adddj ${gameIns.gameState.RoleName} ${nums}`;
		Net.sendChat(0, "", "", tStr, 0);
	}
	/**
		 * 设置红钻数量
		 * @param nums             要设置的红钻数量
		 */
	export function setBingZuanShi(nums: number): void {
		const tStr = `-addgold ${gameIns.gameState.RoleName} ${nums}`;
		Net.sendChat(0, "", "", tStr, 0);
	}
	/**
		 * 设置金币数量
		 * @param nums             要设置的金币数量
		 */
	export function setJinBi(nums: number): void {
		const tStr = `-addyl ${gameIns.gameState.RoleName} ${nums}`;
		Net.sendChat(0, "", "", tStr, 0);
	}
	/**
		 * 设置银币数量
		 * @param nums             要设置的银币数量
		 */
	export function setYinBi(nums: number): void {
		const tStr = `-addmoney ${gameIns.gameState.RoleName} ${nums}`;
		Net.sendChat(0, "", "", tStr, 0);
	}
	/**
	 * 跳转地图
	 */
	export function setMoveTo(): void {
		const eStateId = GameMode.getLocalPlayerController().GetState();
		let tStr = "";
		const staAuto = GameMode.getLocalPlayerController().GetStateById(eStateId) as Logic.AutoPathForTask;
		const point = staAuto.getTargetPos();
		// 寻路跳转
		if (eStateId === Logic.EControllerStateId.AutoPath || eStateId === Logic.EControllerStateId.AutoPathForTask) {
			tStr = `-moveto ${staAuto.getMapCode()} ${point.x} ${point.y}`;
		}
		Net.sendChat(0, "", "", tStr, 0);
	}
	/**
	 * 图腾任务完成
	 * @param totemId 图腾Id
	 */
	export function setOpenTotem(totemId: number): void {
		const tStr = `-opentotems ${gameIns.gameState.RoleName} ${totemId}`;
		Net.sendChat(0, "", "", tStr, 0);
	}
	/**
	 * 增加战力
	 */
	export function setZhanLi() {
		let tStr = `-addattack ${gameIns.gameState.RoleName} ${5000}`;
		Net.sendChat(0, "", "", tStr, 0);
		tStr = `-adddefense ${gameIns.gameState.RoleName} ${5000}`;
		Net.sendChat(0, "", "", tStr, 0);
		tStr = `-testdata ${gameIns.gameState.RoleName} ${500000}`;
		Net.sendChat(0, "", "", tStr, 0);
	}
	/**
	 * 增加斗气
	 * @param nums 数量
	 */
	export function setDouQi(nums: number = 100000): void {
		const tStr = `-modifyparams ${gameIns.gameState.RoleName} 5 ${nums}`;
		Net.sendChat(0, "", "", tStr, 0);
	}

	// TODO:GM后续添加，对应神龙大陆的GM指令，去找对应的关键字与拼接方法
	// 在Developer Tools 里输入对应的GM指令，例如GmCommond.addGoods(1005101,1)，回车即可;
}