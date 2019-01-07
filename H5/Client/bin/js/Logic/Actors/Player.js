var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Logic;
(function (Logic) {
    /**
     * 定义一个玩家类，以后控制本地玩家与网络玩家
     */
    class Player extends Logic.CharacterEx {
        /**
         * @param type 指定本对象的类型
         * @param playerState 指定初始化使用的玩家状态.注:这里是引用,即外面修改playerState的数值时会修改本玩家的状态值.外面不应该再使用此变量!
         */
        constructor(type, playerState) {
            super(type, playerState);
        }
        /**
         * 是否在安全区
         */
        get inSafeRegion() { return this.mInSafeRegion; }
        set inSafeRegion(value) {
            if (this.mInSafeRegion !== value) {
                this.mInSafeRegion = value;
                this.changeWeaponsPosition(value);
            }
        }
        /**
         * 加载玩家实例,并显示到场景中
         * @param progress 用于接收加载进度
         * 注: 玩家在没加载完成前是不会显示的,但并不影响对Player的操作,包括换装等操作.
         */
        load(progress) {
            const _super = name => super[name];
            return __awaiter(this, void 0, void 0, function* () {
                // 注意: 不要把纯逻辑(不需要加载资源的逻辑)放在等待的代码之后.理论上只有图形需要等待加载
                const sklResName = Global.getSkeletonNameByOccupation(this.mState.Occupation);
                const skeResUrl = Global.getSkeletonResPath(sklResName);
                const nakeBodyResNames = Global.getNakePartsList(this.mState.Occupation);
                // 开始加载骨架
                const retPromise = _super("_load").call(this, skeResUrl, progress, nakeBodyResNames);
                // 调试代码
                if (SystemConfig.debugShowPlayerAxis) {
                    const box = this.mView.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.1, 0.1, 0.1)));
                    box.addComponent(Logic.DebugShowAxisComponent);
                }
                const loadSuccess = yield retPromise; // 等待加载完成
                if (!loadSuccess) {
                    return false;
                }
                // 预加载资源
                const particlesToCached = new Array();
                switch (this.mState.Occupation) {
                    case EnumOccupation.LongDan:
                        {
                            particlesToCached.push("ZS_shuang_attack_1", "ZS_shuang_attack_2", "ZS_shuang_attack_3", "ZS_shuang_attack_4", "ZS_shuang_attack_5");
                            break;
                        }
                    // TODO: 继续添加其它职业的预缓冲特效
                }
                particleMgr.preCacheParticles(particlesToCached);
                // to do ... 加载各种特效?
                // LoadPKloversBuffer(); 
                return true;
            });
        }
        /** 返回绑定的玩家控制器 */
        getPlayerController() {
            return this.mController;
        }
        /**
         * 切换装备
         * @param equipGoodsDataList 指定要切换的装备的道具列表.注:应该包含了身上需要切换的所有装备,如果包含了武器也会自动加载
         */
        changeEquip(equipGoodsDataList) {
            this.mView.changeEquip(equipGoodsDataList);
        }
        /**
         * 根据是否在安全区修改角色的武器的位置
         * @param bInSafe 是否在安全区
         */
        changeWeaponsPosition(bInSafe) {
            // TODO: 更改武器位置
        }
        /**
         * 获取坐骑对人物的高度提升(厘米)
         */
        GetMountHeight() {
            return 0;
        }
        /** 获取所属阵营 */
        getBattleWitchSide() {
            if (this.isLocalPlayer()) {
                return gameIns.gameState.roleData.BattleWhichSide;
            }
            return super.getBattleWitchSide();
        }
        /**
         * 释放占用的资源
         */
        destroy() {
            super.destroy();
        }
    }
    // === 定义玩家使用的动作的名称
    Player.aniName_Stand = "Stand"; // 非攻击状态下的站立动作
    Logic.Player = Player;
})(Logic || (Logic = {}));
//# sourceMappingURL=Player.js.map