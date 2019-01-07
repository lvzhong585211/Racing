var Logic;
(function (Logic) {
    /**
     * 传送点的3D模型
     */
    class Teleport3DView extends Logic.Actor3DBase {
        constructor() {
            super(true);
        }
    }
    /**
     * 传送点对象
     */
    class Teleport extends Logic.ActorWithView {
        constructor() {
            super(EActorType.Teleport, Teleport3DView);
        }
        /**
         * 获取传送点数据
         */
        get data() {
            return this.m_data;
        }
        /**
         * 加载传送点特效
         * @param datTeleport 传送点数据
         */
        load(datTeleport) {
            this.m_data = datTeleport;
            const nDecorationCode = datTeleport.Code;
            if (nDecorationCode < 0) {
                return;
            }
            const voDecoration = tableMgr.decorationTable.Find(nDecorationCode);
            if (voDecoration) {
                super.loadView(Global.getDecorationResPath(voDecoration.ResName));
            }
        }
        /**
         * 添加自己到指定的场景
         * @param scene 指定要添加到场景
         * 注: 只有添加到场景后,模型才会显示
         */
        addToLevel(level) {
            if (!super.addToLevel(level)) {
                return false;
            }
            if (this.m_view && this.m_data) {
                const v3WorldPos = level.GSCoord2Laya(this.m_data.TeleportPos.X, this.m_data.TeleportPos.Y);
                this.m_view.transform.position = v3WorldPos;
                Logic.setVisualNameWorldPos(this, v3WorldPos);
            }
            return true;
        }
        /** 返回角色Id */
        getRoleID() {
            if (this.m_data) {
                return SpriteBaseIds.calcTeleportActorID(this.m_data.TeleportKey);
            }
            return 0;
        }
        /**
         * 返回二维平台坐标
         * 注: 此函数效率会比 getCoordinate() 函数高,且少了内存分配
         */
        getCoordinateRef(outCoord) {
            if (this.m_data) {
                outCoord.x = this.m_data.TeleportPos.X;
                outCoord.y = this.m_data.TeleportPos.Y;
            }
        }
        /**
         * 返回二维平面坐标
         * 注: 不要频繁调用此函数,以免带来性能问题
         */
        getCoordinate() {
            if (this.m_data) {
                return new Laya.Point(this.m_data.TeleportPos.X, this.m_data.TeleportPos.Y);
            }
            return new Laya.Point();
        }
        /**
         * 返回世界位置(Laya坐标系)
         */
        getPosition() {
            if (this.m_view) {
                return this.m_view.transform.position.clone();
            }
            return new Laya.Vector3();
        }
        destroy() {
            super.destroy();
            this.m_data = null;
        }
    }
    Logic.Teleport = Teleport;
})(Logic || (Logic = {}));
//# sourceMappingURL=Teleport.js.map