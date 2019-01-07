var GameMode;
(function (GameMode) {
    var Log = Global.Log;
    // 描述:      定义游戏模块的基本接口与属性
    class ModeBase {
        constructor(eGameModule) {
            this.autoClearResourceObjects = []; // 需要自动清除资源对象的列表
            this.eGameModule = EnumGameMode.Invalid; // 定义本模块的类型
            this.eGameModule = eGameModule;
        }
        /**
         * 添加资源对象到自动清除列表,在ModeBase.Release()函数会自动清除加入到本列表中的资源对象
         * @param resObject 指定要加入的资源对象
         * 注: 不要把多个功能共享的资源对象指针加入进来,会导致释放掉共享的资源,使得渲染不正确了.
         */
        AddToAutoClear(resObject) {
            this.autoClearResourceObjects.push(resObject);
        }
        /**
         * @desc    1秒种最多执行5次的更新函数.适合不及时的逻辑,如AI决策等.
         * @param elapsedTime 上次调用以来经过的时间
         */
        SlowUpdate(elapsedTime) {
        }
        /**
         * @desc    每帧被调用
         * @param   elapsedTime 上次调用以来经过的时间(秒)
         */
        FrameMove(elapsedTime) {
        }
        /**
         * @desc      当模块被释放时调用
         */
        Release() {
            // 清除在资源列表中的对象.
            Log.Info(`> 清除模块(${EnumGameMode[this.eGameModule]}, ResCount=${this.autoClearResourceObjects.length})自动列表的资源...`);
            for (const resObject of this.autoClearResourceObjects) {
                resObject.ClearRes();
            }
        }
    }
    GameMode.ModeBase = ModeBase;
})(GameMode || (GameMode = {}));
//# sourceMappingURL=ModeBase.js.map