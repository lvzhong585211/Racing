var Logic;
(function (Logic) {
    /**
     * 是否实现了调试Actor的接口
     */
    function isDebugInnerID(value) {
        return value.getInnerId !== undefined
            && value.getCoordinate !== undefined
            && value.getPosition !== undefined;
    }
    Logic.isDebugInnerID = isDebugInnerID;
    /**
     * 指定的对象是否实现了IViewActor接口
     */
    function isViewActor(value) {
        return value.getView !== undefined
            && value.getRoleID !== undefined
            && value.getCoordinateRef !== undefined;
    }
    Logic.isViewActor = isViewActor;
    /**
     * 定义所有世界对象的基类,如NPC,玩家,掉落道具,机关等
     */
    class AActor extends ECS.Entity {
        /**
         * @param type 指定本对象的类型
         */
        constructor(type) {
            super();
            this.mInnerId = -1; // 只在本实例唯一的ID,方便调试用
            this.mType = EActorType.Invalid; // 类型
            this.mLevel = null; // 保存Actor所属于的level
            this.mType = type;
            this.mInnerId = AActor.mAllocId++; // 分配一个唯一的Id,方便调试与查找
        }
        /**
         * 返回当前已经分配的Actor的个数
         */
        static getAllocId() {
            return AActor.mAllocId;
        }
        /**
         * [只读]是否已经销毁。对象销毁后不能再使用。
         * @return
         */
        get destroyed() { return this.mInnerId === -2; } // -2表示释放过了
        /**
         * 获取内部的唯一Id,仅供调试用
         */
        getInnerId() {
            return this.mInnerId;
        }
        /**
         * 返回角色的类型
         */
        getType() {
            return this.mType;
        }
        /**
         * 返回是否是NPC
         */
        isNPC() {
            return this.mType === EActorType.NPC;
        }
        /**
         * 返回是否是怪物
         */
        isMonster() {
            return this.mType === EActorType.Monster;
        }
        /**
         * 返回是否是一个玩家,包含本地玩家与网络玩家
         */
        isPlayer() {
            return this.mType === EActorType.LocalPlayer || this.mType === EActorType.NetPlayer;
        }
        /**
         * 返回是否是一个本地玩家
         */
        isLocalPlayer() {
            return this.mType === EActorType.LocalPlayer;
        }
        /**
         * 返回是否是一个网络玩家
         */
        isNetPlayer() {
            return this.mType === EActorType.NetPlayer;
        }
        /**
        * 添加自己到指定的场景
        * @param scene 指定要添加到场景
        * 注: 只有添加到场景后,角色才会显示
        */
        addToLevel(level) {
            this.mLevel = level;
        }
        /**
         * 从关卡中移除自己
         */
        removeFromLevel() {
            this.mLevel = null;
        }
        /**
         * 返回角色所属于的Level
         */
        getLevel() {
            return this.mLevel;
        }
        /**
         * 返回绑定的控制器.注:派生类会重载此函数
         */
        getController() {
            return null;
        }
        /**
         * 释放占用的资源
         */
        destroy() {
            this.mInnerId = -2; // -2表示释放过了
            this.removeFromLevel();
        }
    }
    AActor.mAllocId = 0; // 记录总共分配的Actor的个数
    Logic.AActor = AActor;
})(Logic || (Logic = {}));
//# sourceMappingURL=Actor.js.map