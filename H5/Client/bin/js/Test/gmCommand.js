/**
* GM命令控制器
*/
var GmCommand;
(function (GmCommand) {
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
    function addGoods(goodsId, count, bind = 0, goodsLevel = 0, appLev = 0, luck = 0, excellence = 0) {
        const tStr = `-addid ${gameIns.gameState.RoleName} ${goodsId} ${count} ${bind} ${goodsLevel} ${appLev} ${luck} ${excellence}`;
        Net.sendChat(0, "", "", tStr, 0);
    }
    GmCommand.addGoods = addGoods;
    /**
     * 跳转任务
     * @param taskId              任务ID
     * @returns {}
     */
    function jumpTaskId(taskId = 6000) {
        const tStr = `-setmaintask ${gameIns.gameState.RoleName} ${taskId}`;
        Net.sendChat(0, "", "", tStr, 0);
    }
    GmCommand.jumpTaskId = jumpTaskId;
    /**
     * 设置VIP等级
     * @param vipLevel            要设置的VIP等级
     */
    function setVipLevel(vipLevel) {
        const tStr = `-setviplev ${gameIns.gameState.RoleName} ${vipLevel}`;
        Net.sendChat(0, "", "", tStr, 0);
    }
    GmCommand.setVipLevel = setVipLevel;
    /**
     * 设置人物等级
     * @param level               要设置的人物等级
     * @param liftLevel           要设置的人物转生等级
     */
    function setRoleLevel(level, liftLevel) {
        const tStr = `-setlev ${gameIns.gameState.RoleName} ${level} ${liftLevel}`;
        Net.sendChat(0, "", "", tStr, 0);
    }
    GmCommand.setRoleLevel = setRoleLevel;
    /**
         * 设置钻石数量
         * @param nums             要设置的钻石数量
         */
    function setZuanShi(nums) {
        const tStr = `-adddj ${gameIns.gameState.RoleName} ${nums}`;
        Net.sendChat(0, "", "", tStr, 0);
    }
    GmCommand.setZuanShi = setZuanShi;
    /**
         * 设置红钻数量
         * @param nums             要设置的红钻数量
         */
    function setBingZuanShi(nums) {
        const tStr = `-addgold ${gameIns.gameState.RoleName} ${nums}`;
        Net.sendChat(0, "", "", tStr, 0);
    }
    GmCommand.setBingZuanShi = setBingZuanShi;
    /**
         * 设置金币数量
         * @param nums             要设置的金币数量
         */
    function setJinBi(nums) {
        const tStr = `-addyl ${gameIns.gameState.RoleName} ${nums}`;
        Net.sendChat(0, "", "", tStr, 0);
    }
    GmCommand.setJinBi = setJinBi;
    /**
         * 设置银币数量
         * @param nums             要设置的银币数量
         */
    function setYinBi(nums) {
        const tStr = `-addmoney ${gameIns.gameState.RoleName} ${nums}`;
        Net.sendChat(0, "", "", tStr, 0);
    }
    GmCommand.setYinBi = setYinBi;
    // TODO:GM后续添加，对应神龙大陆的GM指令，去找对应的关键字与拼接方法
    // 在Developer Tools 里输入对应的GM指令，例如GmCommond.addGoods(1005101,1)，回车即可;
})(GmCommand || (GmCommand = {}));
//# sourceMappingURL=gmCommand.js.map