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
     * 实现普通的怪物,不包含Boss或有特殊处理的怪物,如海滩上的乌龟等.
     */
    class Monster extends Logic.CharacterEx {
        /**
         * @param state 指定初始化使用的Monster状态.注:这里是引用,即外面修改 npcState 的数值时会修改本玩家的状态值.外面不应该再使用此变量!
         */
        constructor(state) {
            super(EActorType.Monster, state);
            this.mMonsterVO = null;
        }
        /**
         * 加载Monster实例,并显示到场景中
         * @param progress 用于接收加载进度
         * 注: Monster在没加载完成前是不会显示的,但并不影响对Monster的操作,包括换装等操作.
         */
        load(progress) {
            const _super = name => super[name];
            return __awaiter(this, void 0, void 0, function* () {
                // 注意: 不要把纯逻辑(不需要加载资源的逻辑)放在等待的代码之后.理论上只有图形需要等待加载
                this.mMonsterVO = TableUtils.getMonsterXmlNodeByID(this.mState.monsterID);
                const resUrl = Global.getMonsterActorPath(this.mMonsterVO.ResName);
                const retPromise = _super("_load").call(this, resUrl, progress);
                // 调试代码
                if (SystemConfig.debugShowMonsterAxis) {
                    const box = this.mView.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.1, 0.1, 0.1)));
                    box.addComponent(Logic.DebugShowAxisComponent);
                }
                return retPromise;
            });
        }
        /** 获取怪物的模板数据 */
        getMonsterVO() {
            return this.mMonsterVO;
        }
        /**
         * 获取扩展Id,不同的类型对应不同的值,一般来讲应该存储了NPC或怪物的数据表ID
         */
        getExtensionID() {
            return this.mState.monsterID;
        }
        /** 返回怪物的类型 */
        getMonsterType() {
            return this.mState.MonsterType;
        }
        /** 获取所属阵营 */
        getBattleWitchSide() {
            return this.mState.BattleWitchSide;
        }
        /**
         * 检测是否可以被指定的角色攻击
         * @param Attacker 攻击者
         */
        canBeAttacked(Attacker) {
            if (this.isDead()) {
                return false;
            }
            const selfType = this.getMonsterType();
            if (MonsterTypes.CaiJi === selfType || MonsterTypes.CaiJiByTime === selfType) {
                return false;
            }
            const battleWitchSide = this.getBattleWitchSide();
            if (battleWitchSide !== 0 && battleWitchSide === Attacker.getBattleWitchSide()) {
                return false;
            }
            return true;
        }
        /**
         * 释放占用的资源
         */
        destroy() {
            super.destroy();
        }
    }
    Logic.Monster = Monster;
})(Logic || (Logic = {}));
//# sourceMappingURL=Monster.js.map