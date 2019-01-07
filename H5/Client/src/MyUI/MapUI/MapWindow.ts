namespace MyUI.MapUI {

	/**
	 * 更新地图路径点显示
	 */
	export function updateMapLinePoints() {
		const win = windowMgr.getWindow<MapWindow>(WindowID.Map);
		if (win && win.isPopup) {
			win.initializeLinePoints();
		}
	}

	/** 传送项数据 */
	class TransferItemData {
		public id: number;
		public title: string;
		public tag: string;
	}

	/**
	 * 地图窗口
	 */
	export class MapWindow extends ui.MapUI.MapWindowUI {
		private mWorldPiecesList: WorldMapPiece[]; // 世界地图块列表
		private mMapActorPointsList: MapPoint[]; // 区域地图上的对象点列表
		private mMapLinePointsList: MapPoint[]; // 区域地图上的路径点列表
		private mMapPointsCachePool: MapPoint[]; // 区域地图上的对象点缓存列表（缓存暂时不用的对象点）
		private mTransferItemsDic: Map<number, TransferItemData[]>; // 传送数据列表
		private mEnableLocalMap: boolean; // 是否显示区域地图
		private mCurLevelId: number; // 当前关卡ID
		private mScaleX: number; // 实际地图和区域小地图的横向比例大小
		private mScaleY: number; // 实际地图和区域小地图的纵向比例大小
		private mCacheLeader: Logic.Player; // 缓存一个主角的引用方便使用
		private mCacheLevel: Logic.Level; // 缓存一个关卡的引用方便使用
		private mLastLeaderPos = new Laya.Point(); // 上次设置的主角位置
		private mCurrLeaderPos = new Laya.Point(); // 主角当前所处的位置
		private mVec3Rotation = new Laya.Vector3(); // 角色旋转四元数输出向量值

		constructor() {
			super();
			this.mWorldPiecesList = [];
			this.mMapActorPointsList = [];
			this.mMapLinePointsList = [];
			this.mMapPointsCachePool = [];
			this.mTransferItemsDic = new Map<number, TransferItemData[]>();
			this._chckNPC.label = ConfigLoca.UI_ACTOR_TYPE_NPC;
			this._chckMonster.label = ConfigLoca.UI_ACTOR_TYPE_MONSTER;
			this._chckTeleport.label = ConfigLoca.UI_ACTOR_TYPE_TELEPORT;
			this._txtTransferTip.text = ConfigLoca.UI_MAP_TRANSFER_TIP;
			this._txtDropTip.text = ConfigLoca.UI_TITLE_DROP_PREVIEW;
			this._transferList.vScrollBarSkin = "";
			this._goodsList.hScrollBarSkin = "";
			this.initializeWorldGroup();
			this.enableLocalMap = true;
			this._imgLocal.rotation = 180;

			Laya.stage.on(Laya.Event.RESIZE, this, this.onStageResize);
			this._chckNPC.clickHandler = Laya.Handler.create(this, () => { this.initializeTransfers(EActorType.NPC); }, null, false);
			this._chckMonster.clickHandler = Laya.Handler.create(this, () => { this.initializeTransfers(EActorType.Monster); }, null, false);
			this._chckTeleport.clickHandler = Laya.Handler.create(this, () => { this.initializeTransfers(EActorType.Teleport); }, null, false);
			this._transferList.mouseHandler = Laya.Handler.create(this, this.onTransferListSelected, null, false);
			this._btnGoto.clickHandler = Laya.Handler.create(this, () => { this.enableLocalMap = !this.mEnableLocalMap; }, null, false);
			this._btnBack.clickHandler = Laya.Handler.create(this, () => {
				if (!this.mEnableLocalMap) {
					this.enableLocalMap = true;
				} else {
					this.close("close");
				}
			}, null, false);
			this._imgLocal.on(Laya.Event.CLICK, this, (e: Laya.Event) => {
				const tmpPoint = this._imgLocal.globalToLocal(new Laya.Point(e.stageX, e.stageY));
				tmpPoint.x /= this.mScaleX;
				tmpPoint.y = (this._imgLocal.height - tmpPoint.y) / this.mScaleY;
				tmpPoint.x |= 0;
				tmpPoint.y |= 0;
				GameMode.getLocalPlayerController().autoFindRoad(this.mCurLevelId, tmpPoint, 0, { actionType: ExtActionTypes.EXTACTION_NONE });
			});
			this.onStageResize(null);
		}

		/**
		 * 舞台大小变化监听
		 * @param e Event事件
		 */
		private onStageResize(e: Laya.Event) {
			this.size(Laya.stage.width, Laya.stage.height);
			this.pos(0, 0);
		}

		public destroy(destroyChild?: boolean) {
			Laya.stage.off(Laya.Event.RESIZE, this, this.onStageResize);
			this._chckNPC.clickHandler.recover();
			this._chckMonster.clickHandler.recover();
			this._chckTeleport.clickHandler.recover();
			this._btnGoto.clickHandler.recover();
			super.destroy(destroyChild);
			this.mWorldPiecesList = null;
			this.mMapActorPointsList = null;
			this.mMapLinePointsList = null;
			this.mMapPointsCachePool = null;
			this.mTransferItemsDic = null;
			this.mCacheLeader = null;
			this.mLastLeaderPos = null;
			this.mCurrLeaderPos = null;
			this.mVec3Rotation = null;
		}

		/**
		 * 初始化世界地图部分
		 */
		private initializeWorldGroup() {
			// 注意：_panelWorld是最终显示世界地图部分的容器，_groupWorld只是他的子对象
			this._panelWorld.addChild(this._groupWorld);
			this._panelWorld.hScrollBarSkin = "";
			this._panelWorld.vScrollBarSkin = "";
			// 设置职业头像
			this._imgOccu.skin = Global.getAvatarImgPath(gameIns.gameState.roleData.Occupation, "circle");
			this._groupPlace.visible = false;
			// 初始化世界地图地图块
			this._groupWorld._childs.forEach(
				element => {
					if (element instanceof WorldMapPiece) {
						if (element.mapID > 0) { // 不开放的地图已经置为了-1，不需要处理
							element.clickHandler = Laya.Handler.create(this, this.onWorldMapPieceClick, null, false);
							let sMapName = TableUtils.getMapNameByCodeEx(element.mapID);
							const objLevel = TableUtils.getMapMinLevelAndZhuanSheng(element.mapID);
							if (objLevel) {
								sMapName += `\n${UIHelper.FormatLevelLimit(objLevel.minLevel, objLevel.minZhuanSheng)}`;
							}
							element.pieceName = sMapName;
							this.mWorldPiecesList.push(element);
						}
					}
				}
			);
		}

		/**
		 * 世界地图地图块点击处理
		 * @param nMapId 地图Id
		 */
		private onWorldMapPieceClick(nMapId: number): void {
			if (gameIns.gameState.roleData.LifeV <= 0) {
				return;
			}
			if (nMapId === this.mCurLevelId) {
				uiMgr.hintText(ConfigLoca.UI_Transfer_Failure_Same_Map);
				return;
			}
			if (Global.onPreChangeMap(nMapId)) {
				return;
			}
			Net.sendGoToMap(nMapId);
		}

		/** @override */
		public set dataSource(value: any) {
			super.dataSource = value;
			this.mCacheLeader = GameMode.getLocalPlayer();
			this.mCacheLevel = GameMode.getMainLevel();
			this.updateLocalMapUI();
			this.updateWorldPiecesUI();
			this.enableLocalMap = true;
		}

		/**
		 * 界面打开完成后，调用此方法（如果有弹出动画，则在动画完成后执行）
		 */
		public onOpened() {
			super.onOpened();
		}

		/**
		 * true=显示区域地图、false=显示世界地图
		 */
		private set enableLocalMap(value: boolean) {
			if (this.mEnableLocalMap !== value) {
				this.mEnableLocalMap = value;
				this._groupLocal.visible = value;
				this._panelWorld.visible = !value; // 注意：_panelWorld是世界地图显示的容器
				this._btnGoto.skin = Global.getCommonAtlasImgPath(value ? "btn_map_world" : "btn_map_local");
				this._btnBack.label = value ? ConfigLoca.UI_MapName_Type_Local : ConfigLoca.UI_MapName_Type_World;
			}
		}

		/**
		 * 更新区域地图显示
		 */
		private updateLocalMapUI() {
			const nLevelId = gameIns.gameState.roleData.MapCode;
			if (this.mCurLevelId === nLevelId) {
				this.initializeLinePoints();
				return;
			}
			this.mCurLevelId = nLevelId;
			const voLevel = tableMgr.levelSettingTable.Find(nLevelId);
			this._imgLocal.skin = Global.getMiniMapImagePath(voLevel.PicCode);
			this._txtLocalName.text = Loca.getLang(voLevel.Name);
			this._imgLocalIcon.skin = Global.getCommonAtlasImgPath(`map_icon_${nLevelId}`);
			this._imgLocalIcon.x = this._txtLocalName.x - this._txtLocalName.width / 2 - 5;

			this.clearMapActorPoints();
			// 计算比例大小
			const datMap = GameMode.getMainLevel().currentMapData;
			this.mScaleX = this._imgLocal.width / datMap.mapWidth;
			this.mScaleY = this._imgLocal.height / datMap.mapHeight;
			// 初始化地图点显示
			this.initializeNpcs(nLevelId);
			this.initializeTeleports(nLevelId);
			this.initializeMonsters(nLevelId);
			this.initializeGoodsList(nLevelId);
			this.initializeLinePoints();
		}

		/**
		 * 初始化传送点显示
		 * @param nLevelId 关卡ID
		 */
		private initializeTeleports(nLevelId: number) {
			const voMapTeleport = tableMgr.teleportsTable.Find(nLevelId);
			if (!voMapTeleport) {
				return;
			}
			const aTeleports = voMapTeleport.TeleportsList;
			if (!aTeleports || aTeleports.length === 0) {
				return;
			}

			let aTransDatas = this.mTransferItemsDic.get(EActorType.Teleport);
			if (!aTransDatas) {
				aTransDatas = [];
				this.mTransferItemsDic.set(EActorType.Teleport, aTransDatas);
			}
			aTransDatas.length = 0;

			for (let nIdx = 0; nIdx < aTeleports.length; nIdx++) {
				const point = this.createMapPoint();
				const datTeleport = aTeleports[nIdx];
				const sTitle = Loca.getLang(datTeleport.Tip);
				point.title = sTitle;
				point.titleColor = `#${ColorCode.blue1}`;
				point.imgName = Global.getMapPointImgName(EActorType.Teleport);
				const nPosX = datTeleport.TeleportPos.X * this.mScaleX;
				const nPosY = this._imgLocal.height - datTeleport.TeleportPos.Y * this.mScaleY;
				point.pos(nPosX, nPosY, true);
				this._imgLocal.addChild(point);
				this.mMapActorPointsList.push(point);

				const datTrans = new TransferItemData();
				datTrans.id = datTeleport.TeleportKey;
				datTrans.title = sTitle;
				datTrans.tag = `${datTeleport.Code},${datTeleport.TeleportPos.X},${datTeleport.TeleportPos.Y}`;
				aTransDatas.push(datTrans);
			}
		}

		/**
		 * 初始化怪物点显示
		 * @param nLevelId 关卡ID
		 */
		private async initializeMonsters(nLevelId: number) {
			const table = await tableMgr.getLevelMonstersTable(nLevelId);
			const aRows = table.AllRows();
			const mapExisted = new Map<number, number>(); // 已经设置过的怪物
			let aTransDatas = this.mTransferItemsDic.get(EActorType.Monster);
			if (!aTransDatas) {
				aTransDatas = [];
				this.mTransferItemsDic.set(EActorType.Monster, aTransDatas);
			}
			aTransDatas.length = 0;

			aRows.forEach(
				element => {
					if (mapExisted.has(element.Code)) {
						return;
					}
					mapExisted.set(element.Code, 1);
					const voMonster = tableMgr.monstersTable.Find(element.Code);
					if (!voMonster || !voMonster.Display || voMonster.Display <= 0) {
						return;
					}
					if (voMonster.MonsterType === MonsterTypes.DaDao || voMonster.MonsterType === MonsterTypes.QiBao) {
						return;
					}

					const point = this.createMapPoint();
					const sTitle = Loca.getLang(voMonster.SName);
					point.title = sTitle;
					point.titleColor = `#${ColorCode.value}`;
					point.imgName = Global.getMapPointImgName(EActorType.Monster);
					const nPosX = element.X * this.mScaleX;
					const nPosY = this._imgLocal.height - element.Y * this.mScaleY;
					point.pos(nPosX, nPosY, true);
					this._imgLocal.addChild(point);
					this.mMapActorPointsList.push(point);

					const datTrans = new TransferItemData();
					datTrans.id = element.Code;
					datTrans.title = sTitle;
					datTrans.tag = `${element.ID},${element.X},${element.Y}`;
					aTransDatas.push(datTrans);
				}
			);

			// 保证主角的显示在最上层
			this._imgLocal.addChild(this._imgLeader);
		}

		/**
		 * 初始化NPC点显示
		 * @param nLevelId 关卡ID
		 */
		private async initializeNpcs(nLevelId: number) {
			const table = await tableMgr.getLevelNpcTable(nLevelId);
			const aRows = table.AllRows();
			let aTransDatas = this.mTransferItemsDic.get(EActorType.NPC);
			if (!aTransDatas) {
				aTransDatas = [];
				this.mTransferItemsDic.set(EActorType.NPC, aTransDatas);
			}
			aTransDatas.length = 0;

			aRows.forEach(
				element => {
					const voNpc = tableMgr.npcsTable.Find(element.Code);
					if (!voNpc || !voNpc.Display || voNpc.Display <= 0) {
						return;
					}

					const point = this.createMapPoint();
					let sTitle = Loca.getLang(voNpc.SName);
					if (!Global.String.IsNullOrWhiteSpace(voNpc.Function)) {
						sTitle = `${Loca.getLang(voNpc.Function)}·${sTitle}`;
					}
					point.title = ""; // sTitle;
					// point.titleColor = `#${ColorCode.value}`;
					point.imgName = Global.getMapPointImgName(EActorType.NPC);
					const nPosX = element.X * this.mScaleX;
					const nPosY = this._imgLocal.height - element.Y * this.mScaleY;
					point.pos(nPosX, nPosY, true);
					this._imgLocal.addChild(point);
					this.mMapActorPointsList.push(point);

					const datTrans = new TransferItemData();
					datTrans.id = voNpc.ID;
					datTrans.title = sTitle;
					datTrans.tag = `${voNpc.ID},${element.X},${element.Y}`;
					aTransDatas.push(datTrans);
				}
			);

			// 默认选中NPC列表
			this.initializeTransfers(EActorType.NPC);
		}

		/**
		 * 初始化传送列表显示
		 */
		private initializeTransfers(eActor: EActorType) {
			this._chckNPC.selected = eActor === EActorType.NPC;
			this._chckMonster.selected = eActor === EActorType.Monster;
			this._chckTeleport.selected = eActor === EActorType.Teleport;
			const aTransDatas = this.mTransferItemsDic.get(eActor);
			const aSources = new Array<object>();
			if (aTransDatas) {
				aTransDatas.forEach(
					element => { aSources.push({ label: element.title, name: element.tag }); }
				);
			}
			this._transferList.dataSource = aSources;
			this._transferList.selectedIndex = -1;
		}

		/**
		 * 列表选中处理
		 * @param e 事件对象
		 * @param nIdx 选中的Item的索引
		 */
		private onTransferListSelected(e: Laya.Event, nIdx: number) {
			if (e.type !== Laya.Event.CLICK) return;
			const itmSelected = this._transferList.selection;
			if (!itmSelected) return;
			const aFields = itmSelected.name.split(",");
			if (aFields.length !== 3) return;

			const nLevelId = gameIns.gameState.roleData.MapCode;
			const bCanTrans = Super.getCanVIPTransfer() && Super.canTransport(nLevelId, true, false);
			const nTargetNpcId = parseInt(aFields[0]);
			const point = new Laya.Point(parseInt(aFields[1]), parseInt(aFields[2]));
			if (this._chckNPC.selected) { // NPC到达目标点后位置进行一定的偏移
				GameMode.getLocalPlayerController().autoFindRoad(nLevelId, point, Global.AutoFindRoadOffset60, { targetID: nTargetNpcId, actionType: ExtActionTypes.EXTACTION_NPCDLG });
			} else if (this._chckMonster.selected) {
				GameMode.getLocalPlayerController().autoFindRoad(nLevelId, point, 0, { targetID: nTargetNpcId, actionType: ExtActionTypes.EXTACTION_KILLMONSTER });
			} else {
				GameMode.getLocalPlayerController().autoFindRoad(nLevelId, point, 0, { actionType: ExtActionTypes.EXTACTION_NONE });
			}
			if (bCanTrans) {
				Net.sendTaskTransport(nLevelId, point.x, point.y);
			}
		}

		/**
		 * 初始化道具掉落展示列表
		 * @param nLevelId 关卡ID
		 */
		private initializeGoodsList(nLevelId: number) {
			const voSetting = tableMgr.levelSettingTable.Find(nLevelId);
			if (voSetting && voSetting.Goods) {
				const aGoodsDatas = UIHelper.parseRewardGoodsList(voSetting.Goods);
				this._goodsList.dataSource = aGoodsDatas;
			} else {
				this._goodsList.dataSource = null;
			}
		}

		/**
		 * 初始化路径点列表
		 */
		public initializeLinePoints() {
			this.clearMapLinePoints();
			if (!this.mCacheLevel) {
				return;
			}
			if (GameMode.getLocalPlayerController().GetState() !== Logic.EControllerStateId.AutoPathForTask) {
				return;
			}
			const board = this.mCacheLevel.findStoryBoard(gameIns.gameState.RoleID);
			if (!board || board.isCompleted()) {
				return;
			}

			const datMap = this.mCacheLevel.currentMapData;
			const aOrgNodes = board.getPathNodes(); // 原始路径点
			let aExpandNodes: number[][] = [];
			aOrgNodes.forEach(element => { aExpandNodes.push([element.x, element.y]); });
			const currCoord = datMap.toGridCoordFrom2D(this.mCacheLeader.getCoordinate());
			aExpandNodes.unshift([currCoord.x, currCoord.y]); // 把角色当前位置加到路径点第一个
			aExpandNodes = PathFinding.core.Util.expandPath(aExpandNodes); // 把压缩后的路径点展开
			const aFinalNodes: number[][] = []; // 存储最终的路径点
			aExpandNodes.forEach(
				(value, index) => {
					if (index % 3 === 0) { // 展开之后路径点太密了，疏散一下
						aFinalNodes.push(value);
					}
				}
			);
			const nCellX = datMap.gridSizeX;
			const nCellY = datMap.gridSizeY;
			aFinalNodes.forEach(
				(element, index) => {
					const point = this.createMapPoint();
					point.name = `${index}`;
					point.title = "";
					point.imgName = Global.getMapPointImgName(EActorType.Invalid);
					const nPosX = element[0] * nCellX * this.mScaleX;
					const nPosY = this._imgLocal.height - element[1] * nCellY * this.mScaleY;
					point.pos(nPosX, nPosY, true);
					this._imgLocal.addChild(point);
					this.mMapLinePointsList.push(point);
				}
			);

			// 清除走过的路径点
			this.clearHadPassedLinePoints();
		}

	    /**
		 * 清除地图上的对象点显示
		 */
		private clearMapActorPoints() {
			if (this.mMapActorPointsList.length > 0) {
				this._clearMapPoints(this.mMapActorPointsList);
			}
		}

		/**
		 * 清除地图上的路径点显示
		 */
		private clearMapLinePoints() {
			if (this.mMapLinePointsList.length > 0) {
				this._clearMapPoints(this.mMapLinePointsList);
			}
		}

		/**
		 * 清除已经经过的路径点
		 */
		private clearHadPassedLinePoints() {
			const leaderPosPoint = new Laya.Point(this._imgLeader.x, this._imgLeader.y);
			const nLinePointNum = this.mMapLinePointsList.length;
			if (nLinePointNum > 0) {
				for (let nIdx = 0; nIdx < nLinePointNum; nIdx++) {
					const element = this.mMapLinePointsList[nIdx];
					if (element.parent) {
						if (leaderPosPoint.distance(element.x, element.y) < 4) {
							for (let nInnerIdx = 0; nInnerIdx <= nIdx; nInnerIdx++) {
								this.mMapLinePointsList[nInnerIdx].removeSelf();
							}
							break;
						}
					}
				}
			}
		}

		/**
		 * 清除地图上的对象点显示
		 */
		private _clearMapPoints(aPoints: MapPoint[]) {
			for (let nIdx = aPoints.length - 1; nIdx >= 0; nIdx--) {
				const point = aPoints[nIdx];
				point.removeSelf();
				this.mMapPointsCachePool.push(point);
			}
			aPoints.length = 0;
		}

		/**
		 * 生成一个地图上的对象点
		 */
		private createMapPoint(): MapPoint {
			if (this.mMapPointsCachePool.length > 0) {
				return this.mMapPointsCachePool.shift();
			}
			return new MapPoint();
		}

		/**
		 * 更新世界地图块显示
		 */
		private updateWorldPiecesUI() {
			let piecePlace: WorldMapPiece = null;
			this.mWorldPiecesList.forEach(
				element => {
					element.posInitedHandler = null;
					if (element.mapID === gameIns.gameState.roleData.MapCode) {
						piecePlace = element; // 玩家所在的地图块
						element.posInitedHandler = Laya.Handler.create(this, this.updateLeaderPlacePos);
						element.pieceState = 1;
						return;
					}
					const objLevel = TableUtils.getMapMinLevelAndZhuanSheng(element.mapID);
					if (objLevel) {
						element.pieceState = Global.validLevel(objLevel.minZhuanSheng, objLevel.minLevel) ? 0 : 2;
					} else {
						element.pieceState = 2;
					}

					// ---------------------------------------------------------------------------------
					// 目前只导出了前三张地图，所以不是这三张地图的暂时锁死，等地图都导出完成后这段代码可以删掉
					if (element.mapID !== 1 && element.mapID !== 2 && element.mapID !== 3) {
						element.pieceState = 2;
					}
					// ---------------------------------------------------------------------------------
				}
			);

			// 更新主角头像所在地图块显示
			this.updateLeaderPlacePos(piecePlace);
		}

		/**
		 * 更新主角头像在世界地图上的显示位置
		 * @param piece 要显示在的地图块
		 */
		private updateLeaderPlacePos(piece: WorldMapPiece = null) {
			if (piece) {
				this._groupPlace.visible = true;
				this._groupPlace.pos(piece.x + piece._evtRegion.x, piece.y + piece._evtRegion.y - 30);
			} else {
				this._groupPlace.visible = false;
			}
		}

		/**
         * 每帧被调用
         * @param elapsedTime 上次调用以来经过的时间(秒)
         */
		public frameMove(elapsedTime: number): void {
			if (!this.mCacheLeader) {
				return;
			}
			if (this.mCacheLeader.destroyed) { // 如果对象已经销毁了则置空这里的引用
				this.mCacheLeader = null;
				this.mCacheLevel = null;
				return;
			}
			const view = this.mCacheLeader.getView();
			if (!view || view.destroyed) {
				return;
			}

			// 设置雷达图角色标识朝向
			view.transform.rotation.getYawPitchRoll(this.mVec3Rotation);
			this._imgLeader.rotation = -Laya.Utils.toAngle(this.mVec3Rotation.x);
			// 设置雷达图小地图位置
			this.mCacheLeader.getCoordinateRef(this.mCurrLeaderPos);
			if (this.mCurrLeaderPos.x === this.mLastLeaderPos.x && this.mCurrLeaderPos.y === this.mLastLeaderPos.y) {
				return;
			}
			this.mLastLeaderPos.setTo(this.mCurrLeaderPos.x, this.mCurrLeaderPos.y);
			const nPosX = this.mCurrLeaderPos.x * this.mScaleX;
			const nPosY = this._imgLocal.height - this.mCurrLeaderPos.y * this.mScaleY;
			this._imgLeader.pos(nPosX, nPosY, true);

			// 清除走过的路径点
			this.clearHadPassedLinePoints();
		}

		/**
		 * 关闭完成后，调用此方法（如果有关闭动画，则在动画完成后执行）
		 * @param type 关闭类型
		 */
		public onClosed(type?: string) {
			super.onClosed(type);
			this.mCacheLeader = null;
			this.mCacheLevel = null;
		}
	}
}