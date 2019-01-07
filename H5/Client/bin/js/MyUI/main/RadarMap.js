var MyUI;
(function (MyUI) {
    /**
     * 主界面雷达图
     */
    class RadarMap extends ui.MainUI.RadarMapUI {
        constructor() {
            super();
            this.m_bakCenterPos = new Laya.Point(); // 地图圆框中心点位置（主角需要始终定位于此）
            this.m_lastLeaderPos = new Laya.Point(); // 上次设置的主角位置
            this.m_currLeaderPos = new Laya.Point(); // 主角当前所处的位置
            this.m_vec3Rotation = new Laya.Vector3(); // 角色旋转四元数输出向量值
            this.m_currOtherPos = new Laya.Point(); // 其他对象当前所处的位置
            this.m_nUpdateAccuTime = 0; // 刷新累计时间
            this.m_mapPoints = new Map(); // 雷达图上对象点的列表
            this.m_lstPointsPool = new Array(); // 回收暂时不用的对象点
            this.m_lstWaitingDels = new Array(); // 待删除的对象点列表
            // 因为Laya和Unity坐标系不一致，导致人物在场景上的移动与雷达图上的移动感官上感觉不一致，
            // 所以雷达图做180度旋转处理，以使雷达图上的人物移动与场景上的实际表现一致
            this._imgMap.rotation = 180;
            this.m_bakCenterPos.setTo(this._imgBak.x + this._imgBak.width / 2, this._imgBak.y + this._imgBak.height / 2);
            gameEventBus.delActorsInScene.on(this, this.deleteActors);
            this._imgBak.on(Laya.Event.CLICK, this, () => {
                windowMgr.openWindow(WindowID.Map);
            });
        }
        destroy(destroyChild) {
            gameEventBus.delActorsInScene.off(this, this.deleteActors);
            super.destroy(destroyChild);
            this.m_cacheLeader = null;
            this.m_cacheLevel = null;
        }
        /**
         * 更新界面显示
         * @param nLevelID 关卡ID
         */
        updateUI(nLevelID) {
            const voLevel = tableMgr.levelSettingTable.Find(nLevelID);
            this._imgMap.skin = Global.getMiniMapImagePath(voLevel.PicCode);
            this._txtName.text = Loca.getLang(voLevel.Name);
            // 缓存一些引用
            this.m_cacheLeader = GameMode.getLocalPlayer();
            this.m_cacheLevel = GameMode.getMainLevel();
            // 计算比例大小
            const datMap = GameMode.getMainLevel().currentMapData;
            this.m_fScaleX = this._imgMap.width / datMap.mapWidth;
            this.m_fScaleY = this._imgMap.height / datMap.mapHeight;
        }
        /**
         * 每帧被调用
         * @param   elapsedTime 上次调用以来经过的时间(秒)
         */
        frameMove(elapsedTime) {
            if (!this.m_cacheLeader) {
                return;
            }
            if (this.m_cacheLeader.destroyed) { // 如果对象已经销毁了则置空这里的引用
                this.m_cacheLeader = null;
                this.m_cacheLevel = null;
                return;
            }
            const view = this.m_cacheLeader.getView();
            if (!view || view.destroyed) {
                return;
            }
            this.m_nUpdateAccuTime += elapsedTime;
            if (this.m_nUpdateAccuTime > 1) { // 一秒钟刷新一次地图上的其他显示对象
                // 设置地图上其他对象的显示
                this.m_cacheLevel.foreachActorsMap(this, this.addPoint);
                // 保证主角显示在最上层
                this._imgMap.addChild(this._imgLeader);
                // 删除不需要的对象点
                if (this.m_lstWaitingDels.length > 0) {
                    this.m_lstWaitingDels.forEach(point => {
                        point.removeSelf();
                        this.m_lstPointsPool.push(point);
                    });
                    this.m_lstWaitingDels = [];
                }
                this.m_nUpdateAccuTime = 0;
            }
            // 设置雷达图角色标识朝向
            view.transform.rotation.getYawPitchRoll(this.m_vec3Rotation);
            this._imgLeader.rotation = -Laya.Utils.toAngle(this.m_vec3Rotation.x);
            // 设置雷达图小地图位置
            this.m_cacheLeader.getCoordinateRef(this.m_currLeaderPos);
            if (this.m_currLeaderPos.x === this.m_lastLeaderPos.x && this.m_currLeaderPos.y === this.m_lastLeaderPos.y) {
                return;
            }
            this.m_lastLeaderPos.setTo(this.m_currLeaderPos.x, this.m_currLeaderPos.y);
            let nPosX = this.m_currLeaderPos.x * this.m_fScaleX;
            let nPosY = this._imgMap.height - this.m_currLeaderPos.y * this.m_fScaleY;
            this._imgLeader.pos(nPosX, nPosY, true);
            nPosX = this.m_bakCenterPos.x - 256 + nPosX;
            nPosY = this.m_bakCenterPos.y - 256 + nPosY;
            this._imgMap.pos(nPosX, nPosY, true);
            this._txtPosition.text = `${(this.m_currLeaderPos.x / 100).toFixed(0)}:${(this.m_currLeaderPos.y / 100).toFixed(0)}`;
        }
        /**
         * 场景中删除了Actor对象
         * @param aActors 删除了的Actor列表
         */
        deleteActors(aActors) {
            aActors.forEach(actor => {
                if (Logic.isViewActor(actor)) {
                    this.deletePoint(actor.getRoleID());
                }
            });
        }
        /**
         * 雷达图上添加对象点
         * @param actor 场景中的Actor对象
         * @param roleID 角色ID
         */
        addPoint(actor, roleID) {
            if (Logic.isViewActor(actor)) {
                actor.getCoordinateRef(this.m_currOtherPos);
                if (actor.destroyed || this.m_currLeaderPos.distance(this.m_currOtherPos.x, this.m_currOtherPos.y) > 5000) { // 和主角位置超过一定距离后就删除掉
                    this.deletePoint(roleID);
                }
                else {
                    let point = this.m_mapPoints.get(roleID);
                    if (!point) {
                        const sImgName = Global.getMapPointImgName(actor.getType());
                        if (sImgName) {
                            point = this.createPoint();
                            point.title = "";
                            point.imgName = sImgName;
                            this._imgMap.addChild(point);
                            this.m_mapPoints.set(roleID, point);
                        }
                    }
                    if (point) {
                        const nPosX = this.m_currOtherPos.x * this.m_fScaleX;
                        const nPosY = this._imgMap.height - this.m_currOtherPos.y * this.m_fScaleY;
                        point.pos(nPosX, nPosY);
                    }
                }
            }
        }
        /**
         * 删除一个对象点
         * @param nRoleID 对象点对应的ID
         */
        deletePoint(nRoleID) {
            if (this.m_mapPoints.has(nRoleID)) {
                this.m_lstWaitingDels.push(this.m_mapPoints.get(nRoleID));
                this.m_mapPoints.delete(nRoleID);
            }
        }
        /**
         * 生成一个地图上的对象点
         */
        createPoint() {
            if (this.m_lstPointsPool.length > 0) {
                return this.m_lstPointsPool.shift();
            }
            return new MyUI.MapPoint();
        }
    }
    MyUI.RadarMap = RadarMap;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=RadarMap.js.map