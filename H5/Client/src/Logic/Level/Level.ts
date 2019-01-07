namespace Logic {
    type RoleID = number;  // 定义角色ID类型

    /**
     * 封装与关卡相关的逻辑.
     * 注: 关卡包含scene,Player,Monster,寻路数据,关卡相关的特殊UI等等
     * 注: 对应原来的GScene类
     * 注: 在本游戏中一个scene仅仅包含了关卡的图形显示部分,不涉及到其它游戏相关的逻辑
     */
    export class Level {
        protected mLevelId: number = -1;		    // 关卡ID
        protected mSceneId: number = -1;		    // 关卡使用的地图ID.注: 不同的关卡可能使用同一张地图,以共享图形显示
        protected mScene: Laya.Scene = null;	    // 在使用的场景
        protected mTerrain: Laya.Terrain = null;	    // 在使用的地形.注:一般应该只有一个地形
        protected mCurrentMapData: GMapData = null;   // 当前关卡的逻辑模板数据,如障碍物信息

        // 角色的RoleID与角色实例映射
        // 注: 我们把角色全部放在关卡实例中,是假设任何角色都只能存在于某一个关卡中,方便管理与释放资源        
        protected mActorsMap = new Map<RoleID, AActor>();
        protected mToDelActors = new Array<AActor>();   // 保存要删除的角色.注: 当调用delActor()函数时,我们并不会立即删除角色,因为这有可能会引起本帧正在引用的逻辑处理过于复杂,会等到本帧结束再删除
        protected mEntitiesCollection = new ECS.EntitiesCollection();   // 支持组件的实体的集合
        private mLastTeleportKey = -1; // 上次设置的传送点ID（用来判断防止触发多次传送）

        // 可被攻击的对象集合
        protected mCanBeAttackedCollection = ECS.EntitiesSearchCache.from(this.mEntitiesCollection).componentsContainsAll([
            ActorState.Life // 生命组件
        ]);

        // 角色的RoleId与AI故事板间的映射
        protected mStoryBoardMap = new Map<RoleID, StoryBoard>();

        private mFollowTargetMgr: Logic.UIFollowTargetManager; // 跟随对象管理器
        private mCurLevelTaskState: Map<Number, NPCTaskStates> = new Map<Number, NPCTaskStates>(); // 保存当前地图npc的任务状态
        private m_lstAutoOffEvent: Base.MyEventAutoOff[] = []; // 事件监听列表
        private mInput: LevelInput; // 用户输入
        private mLastNearNpc: boolean; // 上次是否在Npc附近

        constructor(levelId: number) {
            this.mLevelId = levelId;

            // 用户输入初始化
            this.mInput = new LevelInput();
        }

        /**
         * 获取关卡ID
         */
        public get levelId() {
            return this.mLevelId;
        }

        /**
         * 获取当前关卡的逻辑模板数据
         */
        public get currentMapData() {
            return this.mCurrentMapData;
        }

        /**
         * 加载关卡. 地图,寻路数据等
         * @param progress 更新加载进度的回调函数
         */
        public async load(progress?: Laya.Handler): Promise<boolean> {
            Global.ReEnterCheck.tryEnter(this.load);

            const groupProgress = new Global.GroupProgress([1, 1], progress);    // 进度

            const levelSetting = tableMgr.levelSettingTable.Find(this.mLevelId);
            this.mSceneId = levelSetting.PicCode;
            const sceneResUrl = levelSetting.ResName;

            const obstructioLoadProgress = groupProgress.getProgressHandler(0);
            const levelLoadProgress = groupProgress.getProgressHandler(1);

            // 关卡逻辑数据
            this.mCurrentMapData = new GMapData();

            // 加载障碍物信息
            const mapDataPromise = this.mCurrentMapData.load(this.mLevelId, this.mSceneId, obstructioLoadProgress);

            // 加载场景
            const levelPromise = gameIns.loadPersistentLevel(sceneResUrl, levelLoadProgress);

            // 等待所有的加载完成. 注:统一等待,以减少等待时间,因为已经把所有的加载都提交了
            const sceneDataLoaded = await mapDataPromise;
            const levelLoaded = await levelPromise;

            this.mScene = gameIns.persistentLevel;

            // 添加角色列表中的角色到关卡中
            this.mActorsMap.forEach(actor => actor.addToLevel(this));

            // 添加角色头顶名称显示
            this.mFollowTargetMgr = new Logic.UIFollowTargetManager;
            this.mFollowTargetMgr.visualNameCollection = ECS.EntitiesSearchCache.from(this.mEntitiesCollection).componentsContainsAll([ActorState.VisualName]);

            // 查找地形对象
            for (let index = this.mScene.numChildren - 1; index >= 0; --index) {
                const childNode = this.mScene.getChildAt(index);
                if (childNode instanceof Laya.Terrain) {
                    this.mTerrain = childNode;
                    break;
                }
            }

            // 初始化关卡传送点
            this.initializeTeleports();
            // 事件注册
            this._registerEventListeners();
            // 在这里写各种清理处理
            Global.ReEnterCheck.leave(this.load);       // 重入检测退出
            groupProgress.destroy();                    // 释放进度条占用的资源

            return levelLoaded;
        }

        /**
         * 注册事件侦听器
         */
        private _registerEventListeners() {
            this.m_lstAutoOffEvent.push(gameEventBus.equipLoad.on(this, this.PlayerChangeEquip));
            this.m_lstAutoOffEvent.push(gameEventBus.equipUnload.on(this, this.PlayerChangeEquip));
        }

        /**
         * 初始化所有的传送点
         */
        private initializeTeleports() {
            if (Global.GetMapSceneUIClass() === SceneUIClasses.LuolanFazhen) {
                return; // 迷阵八卦的传送点由服务器控制
            }
            if (this.mLevelId <= 0) {
                return;
            }
            const voMapTeleport = tableMgr.teleportsTable.Find(this.mLevelId);
            if (!voMapTeleport) {
                return;
            }
            const aTeleports = voMapTeleport.TeleportsList;
            if (!aTeleports || aTeleports.length === 0) {
                return;
            }

            for (let nIdx = 0; nIdx < aTeleports.length; nIdx++) {
                const datTeleport = aTeleports[nIdx];
                const actor = new Teleport();
                actor.load(datTeleport);
                // 添加ECS组件
                const compVName = new ActorState.VisualName(Loca.getLang(datTeleport.Tip), 3, 0, "#73dcff");
                actor.components.add(compVName);
                this.mEntitiesCollection.add(actor);
                // 添加到关卡中
                actor.addToLevel(this);
                // 添加到场景对象列表中
                this.mActorsMap.set(SpriteBaseIds.calcTeleportActorID(datTeleport.TeleportKey), actor);
                // 设置地图数据中的传送点数据
                this.mCurrentMapData.setTeleport(datTeleport.TeleportPos.X, datTeleport.TeleportPos.Y, datTeleport.Radius, datTeleport.TeleportKey);
                this.mCurrentMapData.mapGrid.moveObject(datTeleport.TeleportPos.X, datTeleport.TeleportPos.Y, actor);
            }
        }

        /**
         * 创建一个玩家实例,并自动添加到关卡中
         * @param type 指定要创建的玩家的类型
         * @param playerState 指定玩家的状态数据. 注: 此状态数据会被一直保存,所以外面不可以再修改它
         * @param life 玩家的生命组件. 注: 此状态数据会被一直保存,所以外面不可以再修改它
         * @param magic 玩家的魔法组件. 注: 此状态数据会被一直保存,所以外面不可以再修改它
         */
        public createPlayer(type: EActorType.LocalPlayer | EActorType.NetPlayer, playerState: PlayerState,
            life: ActorState.Life, magic: ActorState.Magic, level: ActorState.Level): Player {
            // 创建玩家实例
            const player = new Logic.Player(type, playerState);

            // 添加ECS组件
            player.components.add(life);
            player.components.add(magic);
            player.components.add(level);
            switch (playerState.Occupation) {
                case EnumOccupation.LongDan:
                    type === EActorType.NetPlayer && (player.components.add(new ActorState.Collider(new Laya.Vector3(0, 1.05, 0), new Laya.Vector3(1, 2, 1))));
                    player.components.add(new ActorState.VisualName(playerState.VSName, 2.5));
                    break;
                case EnumOccupation.HuaLing:
                    type === EActorType.NetPlayer && (player.components.add(new ActorState.Collider(new Laya.Vector3(0, 1.05, 0), new Laya.Vector3(1, 2, 1))));
                    player.components.add(new ActorState.VisualName(playerState.VSName, 2.5));
                    break;
                case EnumOccupation.QiaoGong:
                    type === EActorType.NetPlayer && (player.components.add(new ActorState.Collider(new Laya.Vector3(0, 1.05, 0), new Laya.Vector3(1, 2, 1))));
                    player.components.add(new ActorState.VisualName(playerState.VSName, 2.5));
                    break;
                case EnumOccupation.DouXian:
                    type === EActorType.NetPlayer && (player.components.add(new ActorState.Collider(new Laya.Vector3(0, 1.05, 0), new Laya.Vector3(1, 2, 1))));
                    player.components.add(new ActorState.VisualName(playerState.VSName, 2.5));
                    break;
                default:
                    Global.Log.Assert(false);   // 找不到对应的职业?
            }

            this.mActorsMap.set(playerState.RoleID, player);    // 添加到角色列表
            this.mEntitiesCollection.add(player);

            if (this.mScene) {    // 如果场景已经加载完了,直接添加到场景
                player.addToLevel(this);
            }
            return player;
        }

        /**
         * 查找指定ID的NPC
         * @param roleID 指定要查找的NPC的ID
         */
        public findNpc(roleID: number): NPC {
            const npc = this.mActorsMap.get(roleID);
            if (npc) {
                Global.Log.Assert(npc.isNPC());
                return npc as NPC;
            }
            return null;
        }

        /**
         * 查找指定Id的Monster
         * @param roleId 指定要查找的怪物的实例
         */
        public findMonster(roleId: number): Monster {
            const monster = this.mActorsMap.get(roleId);
            if (monster) {
                Global.Log.Assert(monster.getType() === EActorType.Monster);
                return monster as Monster;
            }
            return null;
        }

        /**
         * 查找指定Id的角色
         * @param roleId 指定要查找的角色实例
         */
        public findCharacter(roleId: number): CharacterBaseActor {
            const retCharacter = this.mActorsMap.get(roleId);
            if (retCharacter) {
                Global.Log.Assert(retCharacter instanceof Character);
                return retCharacter as Character<ActorState.CharacterBase>;
            }
            return null;
        }
        /**
         * 查找指定actorID的Player角色
         * @param actorID 
         */
        public findPlayer(actorID: number): Player {
            const player = this.mActorsMap.get(actorID);
            if (player != null) {
                Global.Log.Assert(player instanceof Player);
                return player as Player;
            }
            return null;
        }

        /**
         * 添加一个NPC到关卡中
         * @param npcRole 指定要创建的NPC的信息
         */
        public addNpc(npcRole: NetMsg.NPCRole): void {
            if (gameIns.gameState.roleData.MapCode !== npcRole.MapCode)
                return; // 和当前角色不在同一个地图，直接返回

            const npcElement = Global.Utils.parseXMLFromString(npcRole.RoleString);
            const npcID = Global.Utils.getElementAttributeInt(npcElement, "ID");
            const roleId = SpriteBaseIds.calcNpcRoleId(npcID);
            if (this.findNpc(roleId)) {
                return; // NPC已经存在了,不需要再次创建
            }

            const gridX = Math.floor(npcRole.PosX / this.mCurrentMapData.gridSizeX);
            const gridY = Math.floor(npcRole.PosY / this.mCurrentMapData.gridSizeY);

            const npcInfo = TableUtils.getNPCVOByID(npcID);
            if (npcInfo.IsSafe > 0) {  // 为地图中的某点设置安全区
                this.mCurrentMapData.setPartialSafeRegion(gridX, gridY, 2);
            }

            // 增加动态碰撞
            this.mCurrentMapData.setPartialCollideRegion(gridX, gridY, npcInfo);

            // 创建NPC角色
            const npcState = {} as NPCState;
            npcState.npcID = npcID;
            npcState.RoleID = roleId;
            npcState.Name = `Role_NPC_${roleId}`;

            // NPC头顶名称计算
            npcState.VSName = Loca.getLang(npcElement.getAttribute("SName"));
            const functionDesc = Loca.getLang(npcElement.getAttribute("Function"));
            if (!Global.String.IsNullOrWhiteSpace(functionDesc)) {
                npcState.VSName = `${functionDesc}•${npcState.VSName}`;
            }
            if (!npcState.VSName) {
                Global.Log.Error("npc name is null, check it over!!! (%s)", npcRole.RoleString);
            }
            const compVName = new ActorState.VisualName(npcState.VSName, 2.5, 0, "#49bd1b");
            npcState.RoleSex = <EnumSex>Global.Utils.getElementAttributeInt(npcElement, "Sex");
            // 添加碰撞组件
            const collider = new ActorState.Collider(new Laya.Vector3(0, 1.15, 0), new Laya.Vector3(1.5, 2, 1.5));
            // npcState.EquipmentBody = Global.Utils.getElementAttributeInt(npcElement,"Code");

            /* to do ... NPC的音效读取
            string playSoundURL = ConfigNPCs.GetNPCSoundByID(npcID));
            if (playSoundURL.Length > 0)
            {
                playSoundURL = StringUtil.substitute("Audio/Npc/{0}", playSoundURL);
                Debug.Log("playSoundURL=" + playSoundURL);
            }

            string talkSoundURL = ConfigNPCs.GetNPCTalkSoundByID(npcID));
            if (talkSoundURL.Length > 0)
            {
                //修改NPC有第二段音效时不播放音效问题
                string[] tempStr = talkSoundURL.Split('|');

                npc.PlayNpcTalkSoundURLs = new string[tempStr.Length];

                for (int i = 0; i < tempStr.Length; i++)
                {
                    npc.PlayNpcTalkSoundURLs[i] = StringUtil.substitute("Audio/Npc/{0}", tempStr[i]);
                }

                //talkSoundURL = StringUtil.substitute("Audio/Npc/{0}", talkSoundURL);
                Debug.Log("talkSoundURL=" + talkSoundURL);
            }
            */

            const actorNpc = new NPC(npcState);
            actorNpc.load();    // 加载npc资源

            // 添加NPC所需的ECS组件
            actorNpc.components.add(compVName);
            actorNpc.components.add(collider);
            this.mEntitiesCollection.add(actorNpc);

            this.mActorsMap.set(roleId, actorNpc);
            if (this.mScene) {    // 如果场景已经加载完了,直接添加到场景
                actorNpc.addToLevel(this);
                this.UpdateNpcState(roleId, actorNpc);
            }

            // 设置坐标            
            actorNpc.setCoordinate(npcRole.PosX, npcRole.PosY);

            // 设置方向
            const rotation = Global.GetQuaternionByDir(npcRole.Dir);
            actorNpc.setRotation(rotation);

            // UpdateNaviDeco(npc);
            // HandleSheLiZhiYuanNPCDeco(npc);

            // 添加到地图格子中
            this.mCurrentMapData.mapGrid.moveObject(npcRole.PosX, npcRole.PosY, actorNpc);
        }

        // 更新一下npc的任务状态
        public UpdateNpcState(roleId: number, actorNpc: NPC) {
            if (this.mCurLevelTaskState.has(roleId)) {
                actorNpc.updateTaskState(this.mCurLevelTaskState.get(roleId));
            }
        }

        /**
         * 删除NPC
         * @param npcID 在当前关卡中删除指定Id的NPC
         * @param mapCode 要删除的NPC所在的关卡ID,如果与当前关卡的ID不相同,则不会被删除
         */
        public delNPC(npcID: number, mapCode: number): boolean {
            if (mapCode !== this.levelId) {
                return false;   // 指令发送过来时,客户端可能已经切换关卡了
            }

            const roleId = SpriteBaseIds.calcNpcRoleId(npcID);
            this.delActor(roleId);
        }

        /**
         * 创建并添加一个怪物到场景中
         * @param monsterData 要创建的怪物的信息
         */
        public addMonster(monsterData: NetMsg.MonsterData) {
            let monster = this.findMonster(monsterData.RoleID);
            if (monster != null) {
                Global.Log.Assert(false); // 已经存在了???
                return;
            }

            // 设置Monster的属性
            const monsterState = {} as MonsterState;
            monsterState.monsterID = monsterData.ExtensionID;
            monsterState.RoleID = monsterData.RoleID;
            monsterState.Name = `Role_NPC_${monsterData.RoleID}`;
            monsterState.VSName = monsterData.RoleName;
            monsterState.BattleWitchSide = monsterData.BattleWitchSide;
            monsterState.MonsterType = monsterData.MonsterType;

            // 创建怪物实例
            monster = new Monster(monsterState);

            // 添加ECS组件
            monster.components.add(new ActorState.Life(monsterData.LifeV, monsterData.MaxLifeV));
            monster.components.add(new ActorState.Level(monsterData.Level));
            // 添加碰撞组件
            let collider: ActorState.Collider = null;
            const voMonster = TableUtils.getMonsterXmlNodeByID(monsterData.ExtensionID);
            if (voMonster === null) {
                Global.Log.Assert(true, "怪物不存在  monsterId = " + monsterData.ExtensionID);
                return;
            }
            if (voMonster.IsCollide) {
                collider = new ActorState.Collider(voMonster.CollideCenter.clone(), voMonster.CollideSize.clone());
            } else {
                collider = new ActorState.Collider(new Laya.Vector3(0, 1.15, 0), new Laya.Vector3(1.5, 2, 1.5));
            }
            monster.components.add(collider);

            monster.load();
            this.mActorsMap.set(monsterData.RoleID, monster);
            this.mEntitiesCollection.add(monster);

            // 添加控制器
            const controller = new MonsterController();
            controller.setOwner(monster);

            // 设置行为处理器
            controller.setActionPlayType(Logic.CharacterActionPlay);

            if (this.mScene) { // 如果场景已经加载完了,直接添加到场景
                monster.addToLevel(this);
            }

            monster.on(EActorEvent.coordChanged, this, this.onMonsterCoordChanged);
            monster.setCoordinate(monsterData.PosX, monsterData.PosY);

            // 设置方向
            const rotation = Global.GetQuaternionByDir(monsterData.RoleDirection);
            monster.setRotation(rotation);
        }

        /**
         * 删除指定的怪物
         * @param monsterRoleId 指定要删除的怪物的角色Id
         */
        public delMonster(monsterRoleId: number): void {
            return this.delActor(monsterRoleId);
        }

        /**
         * 怪物位置发生变化
         * @param monster 位置发生变化的怪物
         * @param cx 新的位置坐标(2D坐标系)
         * @param cy 新的位置坐标(2D坐标系)
         */
        private onMonsterCoordChanged(monster: Monster, cx: number, cy: number) {
            // 添加到地图格子中
            this.mCurrentMapData.mapGrid.moveObject(cx, cy, monster);
        }

        /**
         * 添加一个网络玩家到场景中
         * @param datRole 角色数据
         */
        public addNetPlayer(datRole: NetMsg.RoleData) {
            let tPlayer = this.findCharacter(datRole.RoleID) as Player;
            if (tPlayer) {
                Global.Log.Assert(false); // 已经存在了???
                return;
            }

            // 设置Monster的属性
            const playerState = {} as PlayerState;
            playerState.RoleID = datRole.RoleID;
            playerState.Name = `Role_${datRole.RoleID}`;
            playerState.VSName = datRole.RoleName;
            playerState.Occupation = datRole.Occupation;

            tPlayer = this.createPlayer(EActorType.NetPlayer, playerState,
                new ActorState.Life(datRole.LifeV, datRole.MaxLifeV),
                new ActorState.Magic(datRole.MagicV, datRole.MaxMagicV),
                new ActorState.Level(datRole.Level, datRole.ChangeLifeCount));
            tPlayer.load();

            // 添加控制器
            const controller = new APlayerController();
            controller.setOwner(tPlayer);

            // 设置行为处理器
            controller.setActionPlayType(Logic.PlayerActionPlay);

            tPlayer.on(EActorEvent.coordChanged, this, this.onNetPlayerCoordChanged);
            controller.setControlPosition(datRole.PosX, datRole.PosY);

            // 设置方向
            controller.setGSDirection(datRole.RoleDirection);

            // 装备加载
            tPlayer.changeEquip(datRole.GoodsDataList);
        }

        /**
         * 网络玩家位置发生改变
         * @param actor 位置发生变化的玩家
         * @param cx 新的位置坐标(2D坐标系)
         * @param cy 新的位置坐标(2D坐标系)
         */
        private onNetPlayerCoordChanged(actor: Player, cx: number, cy: number) {
            const bMoveRet = this.mCurrentMapData.mapGrid.moveObject(cx, cy, actor);
            if (bMoveRet) {
                this.judgeSafeRegion(actor, cx, cy);
            }
        }

        /**
         * 删除指定的角色(玩家)
         * @param roleId 指定要删除的角色Id
         * 注: 删除由 addNetPlayer(),addMonster(),createPlayer()函数创建的角色
         */
        public delActor(roleId: number): void {
            const actor = this.mActorsMap.get(roleId);
            if (!actor) {
                return;
            }

            // 删除故事板(移动相关)
            this.removeStoryBoard(roleId);

            // 放入到待删除列表中
            this.mToDelActors.push(actor);

            // 从地图格子中移除
            this.mCurrentMapData.mapGrid.removeObject(actor);

            // 从实体集合中移除
            this.mEntitiesCollection.remove(actor);
            this.mActorsMap.delete(roleId);

            // 隐藏头像显示
            gameEventBus.focusedActorChanged.event(roleId);
        }

        /**
         * 主角位置发生改变
         * @param actor 位置发生变化的玩家
         * @param cx 新的位置坐标(2D坐标系)
         * @param cy 新的位置坐标(2D坐标系)
         */
        public onLeaderCoordChanged(actor: Player, cx: number, cy: number) {
            const bMoveRet = this.mCurrentMapData.mapGrid.moveObject(cx, cy, actor);
            if (!bMoveRet) {
                return;
            }
            // 判断进入或离开安全区
            let bSafeChange = false;
            if (this.judgeSafeRegion(actor, cx, cy)) {
                bSafeChange = true;
            }
            const bInSafe = actor.inSafeRegion;
            let bNearNpc = false;
            if (bInSafe) {
                bNearNpc = this.SeekSpriteToLock(true, 500) !== null;
            }
            let bNearNpcChange = false;
            if (this.mLastNearNpc !== bNearNpc) {
                this.mLastNearNpc = bNearNpc;
                bNearNpcChange = true;
            }
            if (bSafeChange || bNearNpcChange) {
                gameEventBus.safeRegionNotify.event(bInSafe, bNearNpc);
            }
            // 传送点检测
            const nTeleportKey = this.mCurrentMapData.getCellFlag(cx, cy);
            if (nTeleportKey >= 10 && nTeleportKey < 100) {
                if (this.mLastTeleportKey !== nTeleportKey) {
                    this.mLastTeleportKey = nTeleportKey;
                    if (this.isLocalMapTrans(nTeleportKey)) {
                        // TODO: 本地图传送
                    } else if (this.canMapConversionByTeleportCode(nTeleportKey)) {
                        if (!Global.Data.WaitingForMapChange) { // 如果正在传送中，则不能再次触发
                            if (Global.CanBeTransport(gameIns.gameState.roleData.MapCode, nTeleportKey)) {
                                actor.getController().SetState(EControllerStateId.Idling);
                                this.toMapConversionByTeleportCode(nTeleportKey);
                                return;
                            }
                        }
                    }
                }
            } else {
                this.mLastTeleportKey = -1;
            }
        }

        /**
         * 判断Actor位置是否进行了安全区变更
         * @param actor Actor对象
         * @param nPosX Actor位置X
         * @param nPosY Actor位置Y
         */
        private judgeSafeRegion(actor: Player, nPosX: number, nPosY: number): boolean {
            const bInSafe = this.mCurrentMapData.inSafeRegion(nPosX, nPosY);
            if (actor.inSafeRegion !== bInSafe) {
                actor.inSafeRegion = bInSafe;
                return true;
            }
            return false;
        }

        /**
         * 是否是本地图内的传送
         * @param nTeleportKey 传送点ID
         */
        private isLocalMapTrans(nTeleportKey: number): boolean {
            const nActorID = SpriteBaseIds.calcTeleportActorID(nTeleportKey);
            const teleport = this.mActorsMap.get(nActorID) as Teleport;
            // modify by neo 如果地图移动类型为1，表示是本地地图传送
            if (teleport && teleport.data.MoveType === 1) {
                return true;
            }
            return false;
        }

        /**
         * 是否可以通过传送点切换地图
         * @param nTeleportKey 传送点ID
         */
        private canMapConversionByTeleportCode(nTeleportKey: number): boolean {
            const nActorID = SpriteBaseIds.calcTeleportActorID(nTeleportKey);
            const teleport = this.mActorsMap.get(nActorID) as Teleport;
            if (!teleport) {
                return;
            }

            if (Global.IsInKuaFuHuoDongWangZhe(this.mLevelId)) {
                // TODO: 待处理逻辑
                return false;
            }

            // 获取地图的等级和重生次数限制
            const objLevel = TableUtils.getMapMinLevelAndZhuanSheng(teleport.data.ToMapID);
            if (!Global.validLevel(objLevel.minZhuanSheng, objLevel.minLevel)) {
                uiMgr.hintText(ConfigLoca.UI_Transfer_Failure_Because_RoleLv, objLevel.minZhuanSheng, objLevel.minLevel); // 等级未达到{0}重{1}级无法传送
                return false;
            }
            return true;
        }

        /**
         * 通过传送点切换地图
         * @param nTeleportKey 传送点ID
         */
        private toMapConversionByTeleportCode(nTeleportKey: number) {
            const nActorId = SpriteBaseIds.calcTeleportActorID(nTeleportKey);
            const teleport = this.mActorsMap.get(nActorId) as Teleport;
            if (!teleport) {
                return;
            }

            const datTeleport = teleport.data;
            if (datTeleport.ToMapID === 50 || datTeleport.ToMapID === 60) {
                // TODO: 打开跨服地图界面
            } else {
                Net.sendMapConversion(datTeleport.TeleportKey, datTeleport.ToMapID, datTeleport.ToMapPos.X, datTeleport.ToMapPos.Y, datTeleport.ToDirection);
            }
        }

        /**
         * 通过地图ID切换地图
         * @param nMapCode 地图ID
         * @param nMapX 切换地图后角色位置X
         * @param nMapY 切换地图后角色位置Y
         * @param nDir 切换地图后角色方向
         * @param nRelife 是否复活角色
         */
        public toMapConversionByMapCode(nMapCode: number, nMapX: number, nMapY: number, nDir: number, nRelife: number) {
            if (nRelife > 0) {
                const datRole = gameIns.gameState.roleData;
                datRole.LifeV = datRole.MaxLifeV;
                datRole.MagicV = datRole.MaxMagicV;
            }
            if (nMapCode === 50 || nMapCode === 60) {
                // TODO: 打开跨服地图界面
            } else {
                Net.sendMapConversion(-1, nMapCode, nMapX, nMapY, nDir);
            }
        }

        /**
         * 更新NPC身上的任务状态
         * @param npcRoleId 指定要更新任务状态的NPC的ID
         * @param state 指定任务的状态
         */
        public serverUpdateNPCTaskState(npcRoleId: number, state: number): void {
            const npcTaskState = gameIns.gameState.getNPCTaskState(SpriteBaseIds.calcNpcId(npcRoleId));
            if (npcTaskState)
                npcTaskState.TaskState = state;

            const npc = this.findNpc(npcRoleId);
            if (!npc) {
                // 如果npc没有创建成功那需要保存一下状态
                this.SaveNpcTaskState(npcRoleId, state);
                return;
            }

            npc.updateTaskState(npcTaskState.TaskState);
        }

        public SaveNpcTaskState(npcRoleId: number, state: NPCTaskStates): void {
            if (state !== 0) {
                this.mCurLevelTaskState.set(npcRoleId, state);
            }
        }

        /** 
         * 返回正在使用的场景
         */
        public getScene(): Laya.Scene {
            return this.mScene;
        }

		/**
		 * 返回指定x,z坐标的高度
		 * @param posX 指定要获取高度的坐标
		 * @param posZ 指定要获取高度的坐标
		 */
        public getHeight(posX: number, posZ: number): number {
            if (this.mTerrain) {
                const localHeight = this.mTerrain.getHeightXZ(posX, posZ);    // 获取相对于地形节点的高度
                return this.mTerrain.transform.position.y + localHeight;    // 把高度转换成世界坐标系
            }
            return 0;
        }

        /**
         * 把GameServer服务器的坐标转换成对应的Laya坐标系
         * @param posX 指定要转换的服务器坐标X
         * @param posY 指定要转换的服务器坐标Y
         */
        public GSCoord2Laya(posX: number, posY: number): Laya.Vector3 {
            const ret = Global.GSCoord2Laya(posX, posY);
            ret.y = this.getHeight(ret.x, ret.z);
            return ret;
        }

        /**
         * @desc    1秒种最多执行5次的更新函数.适合不及时的逻辑,如AI决策等.
         * @param elapsedTime 上次调用以来经过的时间
         */
        public slowUpdate(elapsedTime: number): void {
            // 角色控制器的帧逻辑
            this.mActorsMap.forEach((actor) => {
                const controller = actor.getController();
                if (controller)
                    controller.slowUpdate(elapsedTime);
            });
        }

        private _debug_action = [0, 0];
        private _debug_keyClick = [0, 0];

        /**
         * @desc    每帧被调用
         * @param   elapsedTime 上次调用以来经过的时间(秒)
         */
        public frameMove(elapsedTime: number): void {
            // 故事板的帧逻辑(寻路?). 注: 故事板的逻辑要在下面 actor.getController() 的逻辑之前执行,因为故事板逻辑的结果(如角色位置更新等)需要被角色的Controller使用.
            this.mStoryBoardMap.forEach((storyBoard) => {
                storyBoard.frameMove(elapsedTime);
            });

            // 角色控制器的帧逻辑
            this.mActorsMap.forEach((actor) => {
                const controller = actor.getController();
                if (controller) {
                    controller.frameMove(elapsedTime);
                }
            });

            // 删除待删除的角色
            if (this.mToDelActors.length > 0) {
                // 派发场景中要删除的Actor列表
                gameEventBus.delActorsInScene.event(this.mToDelActors);
                // 开始进行删除
                this.mToDelActors.forEach(actor => {
                    actor.destroy();
                });
                this.mToDelActors = [];
            }
        }

        /**
         * 循环处理Actors列表中的对象
         * @param caller 调用者（this指向）
         * @param callBackFn 回调处理函数
         */
        public foreachActorsMap(caller: any, callBackFn: { (actor: AActor, roleID: number): void }) {
            this.mActorsMap.forEach((actor, roleID) => {
                callBackFn.call(caller, actor, roleID);
            });
        }

        /**
         * 查找指定Id的角色的故事板
         * @param roleId 指定要查找故事板的角色
         * @return 返回查找到的故事板.
         * 注: 返回的故事板不要长时间保存,因为关卡清理时会删除它
         */
        public findStoryBoard(roleId: RoleID): StoryBoard {
            return this.mStoryBoardMap.get(roleId);
        }

        /**
         * 移除指定的故事板. 注: 这将停止一切故事的逻辑,如寻路等
         * @param roleId 指定要移除的故事板的角色
         */
        public removeStoryBoard(roleId: RoleID): void {
            this.mStoryBoardMap.delete(roleId);
        }

        /**
         * 场景中的角色点击处理
         * @param nActorId 角色Id
         */
        public onActorInLevelClick(nActorId: number): void {
            const actor = this.findCharacter(nActorId);
            if (!actor) return;

            switch (actor.getType()) {
                case EActorType.NetPlayer:
                case EActorType.Monster:
                    GameMode.getLocalPlayerController().setFocusedRoleId(nActorId);	// 设置玩家手动选择的目标
                    break;
                case EActorType.NPC:
                    GameMode.getLocalPlayerController().autoFindRoad(this.mLevelId, actor.getCoordinate(), Global.AutoFindRoadOffset60, { targetID: SpriteBaseIds.calcNpcId(nActorId), actionType: ExtActionTypes.EXTACTION_NPCDLG });
                    break;
                default:
                    break;
            }
        }

        /**
         * 停止指定角色的寻路
         * @param roleId 指定要停止寻路的角色
         * @param stopIndex 指定要停止到路径点索引
         */
        public stopOnNextGrid(roleId: RoleID, stopIndex = -1): number {
            const storyBoard = this.findStoryBoard(roleId);
            if (storyBoard) {
                return storyBoard.stopOnNextGrid(stopIndex);
            }
            return -1;
        }

        /**
         * 供主角使用，自动搜索并锁定
         * @param isNPC 是否是搜索NPC
         * @param radius 搜索半径
         */
        private SeekSpriteToLock(isNPC: boolean, radius: number): AActor {
            if (Global.GetMapSceneUIClass() === SceneUIClasses.JingJiChang) {
                return this._SeekSpriteToLock(isNPC, 1200, 360);
            }
            return this._SeekSpriteToLock(isNPC, radius, 360); // 直接在360度里找最近的
        }

        /**
         * 供主角使用，自动搜索并锁定
         * @param isNPC 是否是搜索NPC
         * @param radius 搜索半径
         * @param angleLimit 角度范围限制
         */
        private _SeekSpriteToLock(isNPC: boolean, radius: number, angleLimit: number = 0.0): AActor {
            if (gameIns.gameState.roleData.LifeV <= 0) {
                return null;
            }

            let npc: AActor = null;
            let monster: AActor = null;
            let otherRole: AActor = null;
            let lastDistance4NPC = 2147483647;
            let lastDistance4Monster = 2147483647;
            let lastDistance4Role = 2147483647;
            const controller = GameMode.getLocalPlayerController();
            const objAngle = Global.GetAngleRangeByDirection(Global.GetYAngle(controller.getControlRotation()), angleLimit);
            const loAngle = objAngle.loAngle;
            const hiAngle = objAngle.hiAngle;
            const coordActor = new Laya.Point();
            const coordLeader = new Laya.Point();
            GameMode.getLocalPlayer().getCoordinateRef(coordLeader);
            for (const [nRoleId, actor] of this.mActorsMap) {
                if (actor.getType() === EActorType.LocalPlayer || !(actor instanceof Character)) {
                    continue;
                }
                actor.getCoordinateRef(coordActor);
                if (!Global.InCircleByAngle(coordActor, coordLeader, radius, loAngle, hiAngle)) {
                    continue;
                }
                const eType = actor.getType();
                // TODO: 搜索类型只搜索了NPC、怪物、网络玩家，其他的军旗、假人等类型等用到的时候在添加
                if (isNPC) {
                    if (eType === EActorType.NPC && !(actor as NPC).isStatueStand()) {
                        const dist = Global.GetTwoPointDistance(coordLeader, coordActor);
                        if (dist < lastDistance4NPC) {
                            lastDistance4NPC = dist;
                            npc = actor;
                        }
                    }
                } else {
                    if (eType === EActorType.Monster) {
                        const dist = Global.GetTwoPointDistance(coordLeader, coordActor);
                        if (dist <= radius && dist < lastDistance4Monster) {
                            lastDistance4Monster = dist;
                            monster = actor;
                        }
                    } else if (eType === EActorType.NetPlayer) {
                        const dist = Global.GetTwoPointDistance(coordLeader, coordActor);
                        if (dist <= radius && dist < lastDistance4Role) {
                            lastDistance4Role = dist;
                            otherRole = actor;
                        }
                    }
                }
            }

            if (isNPC) {
                return npc;
            }
            if (monster !== null) {
                return monster;
            }
            return otherRole;
        }

        /**
         * 查找可以供玩家锁定的怪物
         * @param attacker 指定查找目标的攻击者
         * @param isAutoFighting 指定查找到的目标是否是供自动战斗用
         * @param targetMonsterID 指定要特定查找的目标的模板Id(ExcelId)
         * @param seedRadius 指定查找半径(2D坐标系)
         */
        public seekMonsterToLock(attacker: Character<ActorState.CharacterBase>, isAutoFighting = true, targetMonsterID = -1, seedRadius = -1): Character<ActorState.CharacterBase> {
            if (attacker == null) {
                return;
            }

            let lastDistanceSQ = 2147483647;
            if (seedRadius > 0)
                lastDistanceSQ = seedRadius * seedRadius;

            let enemy: Character<ActorState.CharacterBase> = null;
            const attackerCoord = attacker.getCoordinate();
            // const pkMode = this.currentMapData.Config.settings.PKMode;
            const actorCoord = new Laya.Point();

            // 注: 客户端的可被攻击的对象的数量应该是非常有限的,一般最多为几十个,所以直接遍历即可!
            for (const actor of this.mCanBeAttackedCollection.entities) {
                if (actor instanceof Character) {   // 必须是Character派生
                    if (actor === attacker) {
                        continue;
                    }

                    actor.getCoordinateRef(actorCoord);
                    if (this.currentMapData.inSafeRegion(actorCoord.x, actorCoord.y)) {
                        continue; // 安全区不能释放技能,所以忽略在安全区的目标
                    }

                    if (targetMonsterID >= 0 && targetMonsterID !== actor.getExtensionID()) {
                        continue;
                    }

                    // 注: 后续需要重载具体对象的此函数,以正确的判定是否可以进行攻击
                    if (!actor.canBeAttacked(attacker)) {   // 不可以被攻击,忽略
                        continue;
                    }

                    // 选择离得最近的可攻击目标
                    const distanceSq = (attackerCoord.x - actorCoord.x) * (attackerCoord.x - actorCoord.x) + (attackerCoord.y - actorCoord.y) * (attackerCoord.y - actorCoord.y);
                    if (distanceSq < lastDistanceSQ) {
                        lastDistanceSQ = distanceSq;
                        enemy = actor;
                    }
                }
            }

            return enemy;
        }

        /**
         * 为给定的角色开始一段寻路,即构造一个 StoryBoard 对象,并通知服务器开始走路
         * @param character 指定要开始寻路的角色
         * @param targetPos 指定目标点(2D坐标系)
         * @param offset 到目标点的误差
         * @param action 发送给服务器的寻路过程中的动作
         * @param extAction 发送给服务器的寻路完成后的行为
         * 注: 此函数会校正目标点(如果目标点在障碍物上),并且会向服务器发送移动消息.
         * 注: 是给本地玩家使用的寻路函数
         */
        public linearMoveByRunTo(character: ICharacter, targetPos: Laya.Point, offset: number, action: number, extAction: number): boolean {
            const mapData = this.currentMapData;
            const charCoord = character.getCoordinate();
            targetPos = mapData.getAStepPoint(targetPos, charCoord, offset <= 0 ? 0 : offset);
            if (mapData.onObstruction(targetPos)) {
                // 目标点在障碍物上,需要重新查找一下目标点
                const maxPoint = mapData.findLinearNoObsMaxPoint(mapData.toGridCoordFrom2D(charCoord), targetPos);
                if (maxPoint)
                    targetPos = maxPoint;
            }

            const rolePathString = this.astarMove(character, targetPos, action);
            MyUI.MapUI.updateMapLinePoints();
            if (rolePathString) {
                // 发送移动消息到服务器
                Net.sendMoveToMsg(this.mLevelId, character.getCoordinate(), targetPos, action, extAction, rolePathString);
                return true;
            }
            return false;
        }

        /**
         * 开始向目标点直线移动
         * @param sprite 指定要移动的角色
         * @param to 指定目标点
         * @param action 发送给服务器的寻路过程中的动作
         * @param extAction 发送给服务器的寻路完成后的行为
         */
        public linearMove(sprite: ICharacter, to: Laya.Point, action: number, extAction: number, ): boolean {
            const rolePathString = this.astarMove(sprite, to, action);
            if (rolePathString) {
                return true;
            }
            return false;
        }

        /**
         * 处理来自服务器的角色寻路消息
         * @param moveData 角色的寻路数据
         */
        public ServerLinearMove(moveData: NetMsg.SpriteNotifyOtherMoveData): void {
            if (moveData.mapCode !== this.levelId) {
                return;    // 关卡已经切换了,忽略此消息吧
            }

            const actor = this.mActorsMap.get(moveData.roleID);
            if (!actor) {
                return;
            }

            if (!(actor instanceof Character)) {
                return;
            }

            if (actor.isDead()) {
                return;    // 死亡了,直接返回.
            }

            // 这里只是缓冲数据,真正的寻路逻辑会在 

            let moveCost = moveData.moveCost;
            const dest = new Laya.Point(moveData.toX, moveData.toY);

            const unZipPathString = window.atob(moveData.pathString);

            // 切换到移动状态
            const controller = actor.getController();

            // 移动的回调函数. 注: 直接在这里写移动的函数是为了简化逻辑实现,要不得在 MonsterFsmState.AutoPath 中做大量的复杂的调用
            const moveFunction = () => {

                // 我们直接在这里寻路,而不在状态中.注: 合理来讲,应该在状态中来做寻路.这里为了简单,直接在这里做了
                this.astarMove(actor, dest, moveData.action, unZipPathString, 0);

                const storyBoard = this.findStoryBoard(moveData.roleID);
                if (storyBoard) {
                    if (actor.isMonster()) { // 根据服务器位置和客户端实际位置计算改变怪物的移动，来趋近于服务器的位置同步
                        if (moveData.toX >= 0 && moveData.toY >= 0) {
                            const clientCoord = actor.getCoordinate();
                            const clientDistance = dest.distance(clientCoord.x, clientCoord.y);
                            const serverDistance = dest.distance(moveData.fromX, moveData.fromY);
                            if (serverDistance > 0.001) {
                                moveCost *= clientDistance / serverDistance;
                            }
                        }

                        storyBoard.setMovingSpeed(1);
                    }

                    // 更新移动缩放
                    storyBoard.setMovingScale(moveCost);
                }
            };

            // 必须使用回调函数,因为状态的切换不是立即执行的.
            if (controller.GetState() !== EControllerStateId.AutoPath) {
                // 切换到自动寻路状态
                controller.SetState(EControllerStateId.AutoPath, { action: moveData.action, moveFunction: moveFunction });
            }
            else {
                // 已经是自动寻路状态了,直接移动吧
                moveFunction();
            }
        }

        /**
         * 开始A*的寻路
         * @param sprite 指定要开始寻路的角色
         * @param targetPos 指定目标点(2D坐标系)
         * @param action 指定寻路的动作
         * @param pathString 字符串格式的路径点集合,如果不为null,则使用此路径点来寻路
         * @param currentPathIndex 如果>=0,指定起始路径点,应该与 pathString 配合使用
         * @return 如果寻路成功,返回对应的路径点描述,否则返回null
         */
        private astarMove(sprite: ICharacter, targetPos: Laya.Point, action: number, pathString: string = null, currentPathIndex: number = -1): string {
            const coord = sprite.getCoordinate();
            if (coord.x === targetPos.x && coord.y === targetPos.y) {
                return null;    // 坐标相同,不需要寻路
            }

            let path: ANode[] = null;
            if (!Global.String.IsNullOrEmpty(pathString)) {
                path = Level.transStringToPathArr(pathString);
                if (path.length <= 0) {
                    path = null;    // 路径无效?
                }

                if (null != path) {
                    if (currentPathIndex > 0 && currentPathIndex < path.length) {
                        path.splice(0, currentPathIndex);
                    }

                    // if ((sprite.getType() == EActorType.LocalPlayer && Global.nCameraOpType == 0) || (p.x == -1 && p.x == -1))//modify by neo 锁定视角才改变终点位置到格子中心
                    //    p = new Point(path[path.Count - 1].x * CurrentMapData.GridSizeX + CurrentMapData.GridSizeX / 2, path[path.Count - 1].y * CurrentMapData.GridSizeY + CurrentMapData.GridSizeY / 2);
                }
            }

            const currentMapData = this.currentMapData;
            const start = this.currentMapData.toGridCoordFrom2D(coord);
            const end = currentMapData.toGridCoordFrom2D(targetPos);

            const moveComponent: IMoveComponent = { Coordinate: coord, SpriteType: sprite.getType() };
            // 外部没有传入路径列表 或者传入路径列表且查找路径失败时才需要自己寻路
            if (null == path) {
                path = currentMapData.findPath(moveComponent, start, end);
            }

            if (null == path || path.length <= 0) {
                // 没找到路径
                if (sprite.getType() === EActorType.LocalPlayer) {
                    // 本地玩家直接返回失败
                    return null;
                } else {
                    // 其它的角色偿试向目标点周围移动
                    return null;    // to do ... 
                    /*
                    path = currentMapData.findAPointIn4Direction(moveComponent,
                        p,
                        currentMapData.gridSizeX * 1.5);

                    if (!path) {    // 继续查找直线上的最近点
                        path = currentMapData.findLinearNoObsMaxPoint(coord, end)
                    }
                    */
                }
            }

            const retPathDesc = Level.transPathToString(path);

            // 构造寻路对象
            const roleId = sprite.getRoleID();
            let storyBoard = this.findStoryBoard(roleId);
            if (!storyBoard) {
                storyBoard = new StoryBoard();
                this.mStoryBoardMap.set(roleId, storyBoard);
            }

            if (path.length > 1) {
                path.shift();   // 删除第一个格子，因为无必要
            }

            // 开始走路吧
            storyBoard.start(coord, path, currentMapData.gridSizeX, this.mCurrentMapData.gridSizeY, targetPos.x, targetPos.y);
            return retPathDesc;
        }

        /**
         * 将字符串转换为路径列表
         * @param pathStr 指定要转换的路径点列表
         */
        public static transStringToPathArr(pathStr: string): ANode[] {
            const path = new Array<ANode>();
            if (Global.String.IsNullOrEmpty(pathStr))
                return path;

            // 分隔出所有的点
            const points = pathStr.split("|");

            // 遍历所有的点
            for (let n = 0; n < points.length; n++) {
                const point = points[n];

                // 分隔每一个点的xy坐标
                const pt = point.split("_");

                // 出错
                if (pt.length !== 2) {
                    continue;
                }

                const node = new ANode(0, 0);
                node.x = parseInt(pt[0]);
                node.y = parseInt(pt[1]);
                path.push(node);
            }
            return path;
        }

        /**
         * AStar 寻路缓存 相关 将路径转换为字符串
         */
        public static transPathToString(path: ANode[]): string {
            let pathStr = "";
            for (let n = 0; n < path.length; n++) {
                const node = path[n];
                if (pathStr.length > 0) {
                    pathStr += "|";
                }
                pathStr += `${node.x}_${node.y}`;
            }

            return pathStr;
        }

        /**
         * 调试用的函数. 返回所有角色的内部Id
         */
        public debugAllCharacterIds(): Array<{ character: ICharacter, innerId: number, pos: Laya.Vector3 }> {
            const retArray = new Array<{ character: ICharacter, innerId: number, pos: Laya.Vector3 }>();
            this.mActorsMap.forEach(actor => {
                if (actor instanceof Character) {
                    const actorInfo = {
                        character: actor,
                        innerId: actor.getInnerId(),
                        pos: actor.getPosition()
                    };

                    retArray.push(actorInfo);
                }
            });

            return retArray;
        }

        /**
         * Debug所有非Character类型的Actor
         */
        public debugAllNonCharacterIds(): IDebugInnerID[] {
            const retArray = new Array<IDebugInnerID>();
            this.mActorsMap.forEach(actor => {
                if (!(actor instanceof Character)) {
                    if (isDebugInnerID(actor)) {
                        retArray.push(actor);
                    }
                }
            });
            return retArray;
        }

        /**
         * 获取角色名字
         * @param nActorID 角色ID
         */
        private _getActorName(nActorID: number): string {
            const tActor = this.mActorsMap.get(nActorID);
            if (tActor) {
                Global.Log.Assert(tActor instanceof Character);
                const datActor = (tActor as Character<ActorState.CharacterBase>).getState();
                return datActor.VSName;
            }
            return null;
        }

        /**
         * 更新角色血值和蓝值
         * @param nActorID 角色ID
         * @param nLifeV 当前血值
         * @param nMaxLifeV 最大血值
         * @param nMagicV 当前蓝值
         * @param nMaxMagicV 最大蓝值
         */
        public updateActorLifeAndMagic(nActorID: number, nLifeV: number, nMaxLifeV?: number, nMagicV?: number, nMaxMagicV?: number) {
            const tActorImp = this.findCharacter(nActorID);
            if (!tActorImp) return;

            // 血量更新
            if (nActorID === gameIns.gameState.RoleID) {
                const datLeader = gameIns.gameState.roleData;
                nLifeV !== undefined && (datLeader.LifeV = nLifeV);
                nMaxLifeV !== undefined && (datLeader.MaxLifeV = nMaxLifeV);
                nMagicV !== undefined && (datLeader.MagicV = nMagicV);
                nMaxMagicV !== undefined && (datLeader.MaxMagicV = nMaxMagicV);
            }

            if (nLifeV !== undefined) {
                setLifeV(tActorImp, nLifeV, nMaxLifeV);
            }
            if (nMagicV !== undefined) {
                setMagicV(tActorImp, nMagicV, nMaxMagicV);
            }
            // 通知血量更新
            const tLifeImp: IRoleLifeEventArgs = {
                roleID: nActorID,
                curLifeV: getLifeV(tActorImp),
                curMagicV: nMagicV !== undefined ? getMagicV(tActorImp) : 0,
                maxLifeV: getMaxLifeV(tActorImp),
                maxMagicV: nMagicV !== undefined ? getMaxMagicV(tActorImp) : 0
            };
            gameEventBus.lifeChange.event(tLifeImp);

            // 角色死亡
            if (tLifeImp.curLifeV <= 0) {
                tActorImp.getController().SetState(EControllerStateId.Dead);
            }
        }

        /**
         * 执行服务器端返回的被敌人伤害的指令(同时处理物理和魔法攻击)
         * @param datInjured 伤害Data
         */
        public serverInjured(datInjured: NetMsg.SpriteInjuredData): void {
            const tAttacker = this.mActorsMap.get(datInjured.attackerRoleID);
            const tInjurer = this.findCharacter(datInjured.injuredRoleID);
            if (!tInjurer) {
                return;
            }
            const nLeaderID = Global.Data.roleData.RoleID;
            if (datInjured.injuredRoleID === nLeaderID) { // 主角自己受伤
                if (datInjured.attackerRoleID > 0) {
                    Global.Data.nAttackRoleID = datInjured.attackerRoleID;
                    Global.Data.strAttackName = this._getActorName(datInjured.attackerRoleID);
                }
                if (tInjurer) {
                    const tActionPlayer = (tInjurer.getController() as ACharacterController).getActionPlayer();
                    if (tActionPlayer.getCurAtion() === GActions.Stand) {
                        if (datInjured.injure > 0) {
                            if (tAttacker && tAttacker.getType() !== EActorType.Monster) {
                                // TODO: 进入受伤动作（切换State?）
                            }
                        }
                    }
                    if (datInjured.hitToGridX > 0 && datInjured.hitToGridY > 0) {
                        // TODO: 击飞
                    }
                }
                if (datInjured.attackerRoleID !== nLeaderID) {
                    if (!tAttacker) {
                        // TODO: 查找正在加载的列表和已加载缓存，如果没有的话就加载攻击者（可能是人物、也可能是怪物）
                    }
                }
                if (tAttacker) {
                    // this.AttackingMeMonsterID = datInjured.attackerRoleID;
                    // TODO: 根据服务器端的伤害值矫正攻击动作的间隔
                }
            } else {
                if (datInjured.attackerRoleID !== nLeaderID) {
                    MyUI.DamageHudManager.instance().showDamage(tInjurer.getPositionRef(), datInjured.injure, datInjured.burst);
                }
                // 下面的逻辑看起来和上面差不多，等补充的差不多了考虑整理一下
            }
        }

        /**
         * 执行服务器端返回的释放招式指令
         * @param datAttack 攻击Data
         */
        public serverMagicAttack(datAttack: NetMsg.SpriteMagicAttackData) {
            const tAttacker = this.mActorsMap.get(datAttack.attackerRoleID);
            const voAttack = tableMgr.magicAttacksTable.Find(datAttack.magicAttackID);
            if (tAttacker && voAttack) {
                // TODO: 播放攻击效果
            }
        }

        /**
         * 执行服务器端返回的被敌人命中指令（同时处理物理和魔法攻击）
         * @param datHited 受击Data
         */
        public serverHited(datHited: NetMsg.SpriteHitedData) {
            // TODO: 受击特效
        }

        /**
         * 处理角色复活
         * @param nActorID 角色ID
         * @param nPosX 位置X
         * @param nPosY 位置Y
         * @param nDir 方向
         */
        public serverRealive(nActorID: number, nPosX: number, nPosY: number, nDir: number) {
            const tActorImp = this.findCharacter(nActorID);
            if (!tActorImp) return;
            // 复活之后设置血值为最大
            this.updateActorLifeAndMagic(nActorID, undefined, undefined, undefined, undefined);
            // 设置复活之后的位置和方向
            tActorImp.getController().SetState(EControllerStateId.Idling);
            tActorImp.setCoordinate(nPosX, nPosY);
            tActorImp.setRotation(Global.GetQuaternionByDir(nDir));
        }

        /**
         * 场景人物模型切换装备
         * @param actorID         角色ID
         * @param dtGoods       切换装备IGoodsData
         */
        private PlayerChangeEquip(dtGoods: NetMsg.IGoodsData, actorID: number) {
            if (gameIns.gameState.RoleID === actorID)
                GameMode.getLocalPlayer().changeEquip(gameIns.gameState.roleData.GoodsDataList);
            else {
                const player = this.findPlayer(actorID);
                if (player != null) {
                    const playerData = Global.Data.OtherRoles.get(actorID);
                    if (playerData != null)
                        player.changeEquip(playerData.GoodsDataList);
                }
            }
        }
        /**
         *  服务器返回换衣服和武器的消息
         * @param changeEquipData   换装Data数据
         */
        public ServerChangeCode(changeEquipData: NetMsg.ChangeEquipData) {
            let goodsData: NetMsg.IGoodsData = null;
            const otherRoleData = Global.Data.OtherRoles.get(changeEquipData.RoleID);
            if (otherRoleData != null) {
                if (changeEquipData.EquipGoodsData != null) {
                    goodsData = Global.GetGoodsDataByDbID(changeEquipData.EquipGoodsData.Id);
                    if (goodsData == null) {
                        if (otherRoleData.GoodsDataList == null) {
                            otherRoleData.GoodsDataList = new Array<NetMsg.IGoodsData>();
                        }
                        otherRoleData.GoodsDataList.push(changeEquipData.EquipGoodsData);
                    }
                    else {
                        const index = otherRoleData.GoodsDataList.indexOf(goodsData);
                        otherRoleData.GoodsDataList[index] = changeEquipData.EquipGoodsData;
                    }
                    goodsData = changeEquipData.EquipGoodsData;
                    // 穿上装备事件(其他地方也可知道换装数据，如UI界面)
                    if (changeEquipData.nChangeType === ModGoodsTypes.EquipLoad) {
                        gameEventBus.equipLoad.event(changeEquipData.EquipGoodsData, changeEquipData.RoleID);
                    }
                    // 卸载装备
                    else if (changeEquipData.nChangeType === ModGoodsTypes.EquipUnload) {
                        gameEventBus.equipUnload.event(changeEquipData.EquipGoodsData, changeEquipData.RoleID);
                    }
                }
                if (changeEquipData.UsingWinData != null) {
                    otherRoleData.MyWingData = changeEquipData.UsingWinData;
                }
            }

            /// todo    翅膀后续！！！
        }

        /**
         * 服务器更新角色位置
         * @param roleID 角色ID
         * @param x 新位置X
         * @param y 新位置Y
         * @param direction 角色方向
         * @param animation 移动的动画方式
         */
        public serverChangePos(roleID: number, x: number, y: number, direction: number, animation: number) {
            const actor = this.findCharacter(roleID);
            if (!actor) {
                return;
            }

            const bLeader = roleID === gameIns.gameState.RoleID; // 是否是主角
            if (bLeader && animation === 2) { // 跑动到目标点
                this.linearMoveByRunTo(actor, new Laya.Point(x, y), 0, GActions.Run, ExtActionTypes.EXTACTION_NONE);
                return;
            }

            actor.getController().SetState(EControllerStateId.Idling);
            actor.setCoordinate(x, y);
            actor.setRotation(Global.GetQuaternionByDir(direction));
            if (bLeader) {
                const tick = TimeManager.getCorrectLocalTime();
                Net.sendLocalPlayerPosition(new Laya.Point(x, y), tick);
            }
        }

        /**
         * 销毁关卡,释放占用的资源
         */
        public destroy() {
            // 删除事件侦听器
            this.m_lstAutoOffEvent.forEach(element => element.off());
            this.m_lstAutoOffEvent = [];
            if (this.mInput) { // 释放输入
                this.mInput.destroy();
                this.mInput = null;
            }
            if (this.mFollowTargetMgr) {
                this.mFollowTargetMgr.destroy();
                this.mFollowTargetMgr = null;
            }
            // 释放角色
            this.mCurrentMapData = null;
            this.mActorsMap.forEach(actor => actor.destroy());
            this.mStoryBoardMap = null;
            this.mActorsMap = null;
            this.mEntitiesCollection = null;
            this.mScene = null;
            this.mTerrain = null;
        }
    }
}