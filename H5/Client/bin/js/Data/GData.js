var Data;
(function (Data) {
    /**
     * 游戏全局数据，对应GData
     */
    class GData {
        constructor() {
            /**
             * 是否正在切换地图（客户端已经发送了切换地图的请求，服务器还未返回或者客户端正在切换地图的Loading过程中）
             */
            this.WaitingForMapChange = false;
            /** 精灵备战列表 */
            this.equipPet = null;
            /** 跑环的数据列表 */
            this.MyDailyTaskDataList = null;
            /** 存放时装和title */
            this.fashionAndTitleList = null;
            /** 从服务器返回的商城销售数据MallSaleData */
            this.MallData = null;
            /**显示的获得物品的列表 */
            this.viewTaskInfoGoodsDatatList = null;
            /** 攻击者的ID */
            this.nAttackRoleID = 0;
            /** 攻击者名称 */
            this.strAttackName = "";
            /** 其他玩家角色 */
            this.OtherRoles = new Map();
            /** 其他玩家角色(通过名字索引) */
            this.OtherRolesByName = new Map();
            /** 系统怪物角色 */
            this.SystemMonsters = new Map();
            /**
             * 自动战斗的配置项
             */
            this.AutoFightData = new Data.LocalAutoFightData();
            //#region ======================= 潜心修炼 =========================
            /** 潜心修炼最大修炼时间（秒） */
            this.MeditateMaxTime = 12 * 3600;
            /** 潜心修炼状态，1=潜心修炼中、0=非潜心修炼状态 */
            this.MeditateState = 0;
            /** 潜心修炼累计时间（安全区） */
            this.MeditateSecs1 = 0;
            /** 潜心修炼累计时间（非安全区） */
            this.MeditateSecs2 = 0;
            this.MeditateHintVisible = false; // 潜心修炼提示是否显示
            this.MeditateShowHintTime = 0; // 潜心修炼需要提示所需求的时间
            //#endregion ====================== 潜心修炼 ========================
            /** 当前的角色的属性数据 */
            this.CurrentRolePropFields = null;
            //#region 保存玩家在当前地图操作玩家移动前是否是挂机状态
            this.bPlayerGuaJiStateBeforeMove = false;
            this.bWaitingSetGuaJi = false;
            //#endregion
            /** 活动数据 */
            this.MyHuoDongData = null;
        }
        /** 当前主角色角色数据 */
        get roleData() { return gameIns.gameState.roleData; }
        /** 角色是否已经正式登陆 */
        get PlayGame() { return gameIns.gameState.PlayGame; }
        /** 结婚数据 */
        get MarryData() { return gameIns.gameState.MarriageData; }
        /** 对方结婚数据 */
        get MarryOtherData() { return gameIns.gameState.OtherMarriageData; }
        /**
         * 是否在摆摊状态中
         */
        IsInStalling() {
            // TODO: 该方法先临时放到这里，等以后再挪到合适的位置
            // //如果是正在摆摊中，则无法自动寻路
            // //如果正在摆摊中，则不允许移动
            // if (Leader.StallName != "" && Leader.StallName != null) {
            // 	return true;
            // }
            return false;
        }
    }
    Data.GData = GData;
})(Data || (Data = {}));
//# sourceMappingURL=GData.js.map