namespace Logic {

    type ResouceLoadType = Laya.Sprite3D;  // 定义要加载的资源类型

    /**
     * 定义挂接点
     */
    enum ESlotType {
        Invalid = -1,               // 无效值
        Weapon_Left = 0,    // 左手武器
        Weapon_Right,       // 右手武器
        Wing,               // 翅膀
        Weapon_Back_Right,  // 背部
        Max
    }

    /**
     * 角色事件定义
     */
    export enum EActorEvent {
        postInit = 0,   // 当初始化完成时触发. 注：这里角色已经可以显示了
        animatorReady,  // 当Animator加载完成时触发
        coordChanged    // 当角色的Coord发生变化时触发. 参数为 Character 实例及新的坐标cx,cy,如 (actor:ICharacter, cx:number, cy:number)=>{}

        // 继续添加其它角色相关的事件定义
    }

    /**
     * 定义要切换的装备信息
     */
    export interface IEquipLoadInfo {
        GoodsID?: number; // 物品ID
        Id?: number;      // 数据库流水ID
        Using?: number;   // 是否正在使用
    }

    // 定义武器与翅膀挂接的骨骼名称,必须与ESlotType对应(武器左、武器右、翅膀、背部)
    const Slot_Bone_Names = ["Bip01 L Hand", "Bip01 R Hand", "Bip01 R Hand", "Weapon_Bone"];

    /**
     * 封装与角色图形显示相关的数据与操作,如骨骼,皮肤,动画等的加载与管理
     * 注: 从Laya.Sprite3D派生方便使用统一的LayaBox生命周期管理
     * 注: 目前没有再为玩家,NPC,Monster细分这个类,因为目前看虽然NPC与Monster不需要更换装备,武器,但带着这些功能也浪费不了多少内存,但留下了扩展性.
     *     如果以后玩家的功能越来越复杂,可以再考虑分开成多个层级的类
     */
    export class CharacterView extends Laya.Sprite3D {
        private mSkeleton: Laya.Sprite3D = null;                     // 骨架对象
        private mAnimator: Laya.Animator;                           // 动作控制器
        private mInitShow: boolean = true;                          // 控制加载完装备模型的显示
        private mNakeBodyResName = new Array<string>();             // 保存默认的装备名称
        private mSlotSprites = new Array<Laya.Sprite3D>(ESlotType.Max); // 保存武器等挂接类型的装备实例
        private mLoadVersion: number = 0;                            // 用来保存加载的版本号,以识别加载的资源是否还有效

        // 缓冲的当前身上配备的道具列表,以便刷新道具加载
        private mEquipGoodsDataList: IEquipLoadInfo[] = null;        // 保存当前的装备道具列表
        private mToEquipGoodsDataList: IEquipLoadInfo[] = null;      // 保存待加载的装备道具列表
        private mToLoadSlotsDataList: IEquipLoadInfo[] = null;       // 保存待加载挂接类道具的列表(武器,翅膀等)
        private mWingData: NetMsg.WingData = null;                   // 保存当前配备的翅膀道具

        private mEquipLoading: boolean = false;                      // 标识装备是否正在加载中

        // === 定义各种事件
        public static readonly eventPostInit = EActorEvent[EActorEvent.postInit];               // 当初始化完成时触发. 注：这里角色已经可以显示了
        public static readonly eventAnimatorReady = EActorEvent[EActorEvent.animatorReady];     // 当Animator加载完成时触发

        /**
         * 初始化函数
         * @param parent 指定要挂接到的父节点
         * @param sklResName 指定要加载的资源的骨架名称. 注: 骨架中允许包含模型及动作等. 目前只有玩家才需要把骨架与装备分开加载,NPC与怪物并没有分开,即同时包含了骨架,装备,动作等.
         * @param progress 更新加载进度
         * @param nakeBodyRes 指定使用默认装备资源名称.当换装时,如果有装配位空着时会使用此资源. 注:传入的数组不可以再修改,否则会影响内部使用
         * 注：骨架不允许更换，如果要更换必须重新创建一个新的CharacterView对象
         */
        public constructor(sklResUrl: string, progress?: Laya.Handler, nakeBodyResName?: string[]) {
            super();

            if (nakeBodyResName)
                this.mNakeBodyResName = nakeBodyResName;

            // 开始加载骨架
            if (sklResUrl) {
                this.loadSkeleton(sklResUrl, progress);
            }

            // to do ... 也许加载骨架过程中,需要先显示一个默认的对象来代替.以提示玩家图形正在加载过程中?
        }

        /**
         * 异步加载资源的函数.
         * @param resUrl 指定要加载的资源的url
         * @param progress 更新加载进度         
         * 注: 封装这个函数因为当资源异步加载时,有可能对象已经被删除了,所以这时我们不会再调用完成函数.免得每个加载资源的地方都需要处理对象被删除的逻辑
         */
        protected _createResTask(resUrl: string, progress?: Laya.Handler): Promise<ResouceLoadType> {
            // to do ... 是否需要自己做资源对象的缓冲?以避免磁盘资源的加载?
            return new Promise<ResouceLoadType>((resolve, reject) => {
                // 构造加载资源完成的回调函数. retData的具体内容见 Laya.loader.create() 中的说明                
                const completeFun = () => {
                    const retData = Laya.loader.getRes(resUrl);
                    if (!retData) {
                        resolve(null);
                        return;
                    }

                    // to do ... 资源的释放

                    if ((retData instanceof Laya.Sprite3D)) {

                        if (!retData.loaded) {
                            Global.Log.Error(`没有加载成功(${retData}, url = ${resUrl})`);
                            retData.destroy();
                            resolve(null);
                            return;
                        }

                        if (this.destroyed) {   // 需要使用资源的对象自己已经释放了,不再需要这个加载完成的资源
                            retData.destroy();  // 释放不再使用的资源
                            resolve(null);
                        }
                        else {
                            const clonedRes = retData.clone() as Laya.Sprite3D;  // 我们需要复制一个出来,因为后续的处理很可能会修改这个对象.比如移动子节点等
                            clonedRes.name = resUrl;    // 记录下使用的资源url
                            resolve(clonedRes);
                        }

                        // to do ... retData 资源的释放?
                    }
                    else {
                        Global.Log.Error(`${retData} 资源类型不是 Laya.Sprite3D, url = ${resUrl}`);
                        retData.destroy();
                        resolve(null);
                    }
                };
                Laya.loader.create(resUrl, Laya.Handler.create(this, completeFun), progress);
            });
        }

        /**
         * 递归查找指定名称的挂接点
         * @param rootNode 要查找挂接点的根节点
         * @param slotName 指定要查找的挂接点名称
         */
        private findSlot(rootNode: Laya.Node, slotName: string): Laya.Node {
            let childNode = rootNode.getChildByName(slotName);
            if (childNode)
                return childNode;

            for (let index = rootNode.numChildren - 1; index >= 0; --index) {
                childNode = rootNode.getChildAt(index);
                childNode = this.findSlot(childNode, slotName);
                if (childNode)
                    return childNode;
            }

            return null;
        }

        /**
         * 加载指定的骨架
         * @param skeleonUrl 指定要加载的骨架资源的url
         * @param progress 更新加载进度
         * 注: 此函数应该只调用一次
         */
        public loadSkeleton(skeleonUrl: string, progress?: Laya.Handler): void {
            Global.Log.Assert(this.mSkeleton == null);
            this.mEquipLoading = true;      // 设置正在加载装备,因为骨架还在加载中,还不可以加载装备

            // 资源加载完成后调用的函数.注: 这样的架构是为了避免后面维护的同学没有考虑资源异步加载过程中本对象可能会被销毁的情况.
            this._createResTask(skeleonUrl, progress).then((retData) => {
                if (!retData) {
                    return false;
                }

                if (!(retData instanceof Laya.Sprite3D)) {  // 资源类型不正确?                
                    Global.Log.Error(`非法的资源类型(${retData}, url = ${skeleonUrl})`);
                    return false;
                }

                const sklTemplate = retData.getChildAt(0);
                if (!(sklTemplate instanceof Laya.Sprite3D)) {
                    Global.Log.Error(`非法的资源类型(${sklTemplate}, url = ${skeleonUrl})`);
                    return false;
                }

                this.mSkeleton = Laya.Sprite3D.instantiate(sklTemplate as Laya.Sprite3D);       // 这里新复制一个骨架实例.不可以直接使用共享的资源
                this.mAnimator = this.mSkeleton.getComponentByType(Laya.Animator) as Laya.Animator;
                if (!this.mAnimator) {
                    Global.Log.Error(`找不到 Animator,无法加载骨架(skl = ${sklTemplate}, url = ${skeleonUrl})`);
                    return false;
                }

                // 开启或关闭动作缓冲,即通过内存换取性能
                this.mAnimator.isCache = SystemConfig.graphic_AnimationCache;

                this.mAnimator.playOnWake = true;   // 默认强制激活时播放. 注: 在下面的 CharacterView.eventAnimatorReady 事件中如果需要播放动作,可以关闭这个.

                // 派发动作播放器准备好的事件. 注:这个事件需要在  this.addChild(this.mSkeleton); 之前触发,因为底层在AddChild()时会触发Active播放默认的动作
                this.event(CharacterView.eventAnimatorReady);

                this.addChild(this.mSkeleton);      // 添加到父对象中

                // 需要转180度,因为美术导出的模型是看向Unity的Z轴正方向,而LayaBox需要面向Z轴负方向
                const localRotate = new Laya.Quaternion();
                Laya.Quaternion.createFromYawPitchRoll(Math.PI, 0, 0, localRotate);
                this.mSkeleton.transform.localRotation = localRotate;

                // 检测是否需要加载装备. 有可能在加载骨架过程中外部需要加载装备
                this.mEquipLoading = false;
                if (this.mToEquipGoodsDataList != null) {   // 延时执行装备的加载
                    this.mSkeleton.active = false;  // 隐藏骨架.等到加载完装备后才可以显示,以免出现刚加载完装备就刷新的现象
                    this.frameOnce(0, this, this._loadEquip, undefined, true);
                }
                else {   // 没有装备需要加载,直接显示模型吧
                    this.onPostInit();
                }

                // 如果已经存在挂接点,则挂上它.这发生在加载骨架过程中,已经加载完武器或翅膀的情况下.
                this.mSlotSprites.forEach((slotSprite, slotType) => {
                    if (slotSprite && !slotSprite.active) {
                        this.addChild(slotSprite);
                        this.mAnimator.linkSprite3DToAvatarNode(Slot_Bone_Names[slotType], slotSprite);
                        slotSprite.active = true;
                    }
                });

            });
        }

        /**
         * 计算并添加碰撞盒
         */
        public calculateAndAddBoxCollider() {
            if (!this.mSkeleton || this.mSkeleton.numChildren === 0) {
                return;
            }

            // 不需要动态计算并添加包围盒，改为组件形式添加Sprite3D的包围盒
            // let collider = this.getComponentByType(Laya.BoxCollider) as Laya.BoxCollider;
            // if (collider == null) {
            //     collider = this.addComponent(Laya.BoxCollider) as Laya.BoxCollider;
            // }
            // let bound = Global.getMeshBoundBox(this.mSkeleton);
            // collider.setFromBoundBox(bound);
            // collider.center.toDefault();

            // Debug...
            const collider = this.getComponentByType(Laya.BoxCollider) as Laya.BoxCollider;
            if (collider != null) {
                const debugMsh = new Laya.MeshSprite3D(new Laya.BoxMesh(collider.size.x, collider.size.z, collider.size.y));
                debugMsh.transform.localPosition = collider.center;
                this.addChild(debugMsh);
            }
        }

        /**
         * 设置是否激活动作播放的缓冲功能. 注: 以内存占用来换取性能提升,但表现效果会下降
         * @param bCachedAni 是否激活动作的缓冲功能. 默认激活.
         */
        public enableAniCache(bCachedAni: boolean): void {
            if (this.mAnimator) {
                this.mAnimator.isCache = bCachedAni;
            }
        }

        /**
         * 检测给定的装备列表是否需要加载
         * @param equipGoodsDataList 指定要检测的装备列表
         * 注: 内部用函数
         */
        private _checkEquipIsNeedToLoad(equipGoodsDataList: IEquipLoadInfo[]): boolean {
            // 检测两个列表是否相同
            if (equipGoodsDataList === this.mEquipGoodsDataList) {
                return true;
            }

            if (equipGoodsDataList.length !== this.mEquipGoodsDataList.length) {
                return false;
            }

            // 检测两个列表的装备是否相同
            for (const newData of equipGoodsDataList) {
                let hasIt = false;
                for (const oldData of this.mEquipGoodsDataList) {
                    if (oldData.GoodsID === newData.GoodsID
                        || oldData.Id === newData.Id
                        || oldData.Using === newData.Using
                    )
                        hasIt = true;
                }

                if (!hasIt) {
                    return true;
                }
            }
        }

        /**
         * 切换装备
         * @param goodsDataList 指定要切换的装备的道具列表.注:应该包含了身上需要切换的所有装备,如果包含了武器也会自动加载
         * @param CalcSlotTypeFun 回调函数(做武器挂点判断，因为可能会有多种武器不同位置放置，所以在函数里做判断，不在换装的底层判断)
         */
        public changeEquip(goodsDataList: IEquipLoadInfo[], CalcSlotTypeFun: Function = CharacterView.CalcSlotTypeDefault): void {
            const equipGoodsDataList: IEquipLoadInfo[] = [];
            goodsDataList.forEach(
                element => {
                    if (element.Using > 0) { // 只处理正在使用的装备
                        equipGoodsDataList.push(element);
                    }
                }
            );

            const slotDataList = [];
            // 把列表中的武器与翅膀等类型的道具拿出去,单独加载
            equipGoodsDataList.forEach(goodData => {
                const categoriey = tableMgr.goodsTable.getCategoriy(goodData.GoodsID);
                const isWeapon = Global.isWeapon(categoriey);
                if (isWeapon || categoriey === ItemCategories.ChiBang) {
                    slotDataList.push(goodData);
                }
            });

            if (slotDataList.length > 0) {   // 有武器需要更换,加载它
                this.loadWeapon(slotDataList, CalcSlotTypeFun);
            }

            // 检测装备是否需要重新加载
            if (this.mEquipGoodsDataList == null || this._checkEquipIsNeedToLoad(equipGoodsDataList)) {
                this.mToEquipGoodsDataList = [...equipGoodsDataList];

                // 开始加载装备
                if (!this.mEquipLoading) {   // 如果没有正在加载装备中,则执行装备的加载
                    this.frameOnce(0, this, this._loadEquip, undefined, true);
                }
            }
        }

        public static CalcSlotTypeDefault(categoriey: ItemCategories): ESlotType {
            let slotType: ESlotType;
            const isWeapon = Global.isWeapon(categoriey);
            if (isWeapon) {   // 武器
                slotType = ESlotType.Weapon_Right;

                // to do ... 一把武器支持挂到左右手上
            }
            else if (categoriey === ItemCategories.ChiBang && slotType != ESlotType.Invalid) {// 翅膀
                slotType = ESlotType.Wing;
            }
            else {
                Global.Log.Assert(false);
                return;
            }

            return slotType;
        }

        public static CalcSlotTypeLogin(categoriey: ItemCategories): ESlotType {
            return ESlotType.Weapon_Back_Right;
        }

        /**
         * 装备(切换)武器
         * @param equipGoodsDataList 指定要切换的武器的道具列表
         * @param CalcSlotTypeFun 回调函数(做武器挂点判断，因为可能会有多种武器不同位置放置，所以在函数里做判断，不在换装的底层判断)
         */
        public loadWeapon(weaponGoodsDataList: Array<{ GoodsID: number }>, CalcSlotTypeFun: Function = CharacterView.CalcSlotTypeDefault): void {

            weaponGoodsDataList.forEach((weaponData) => {

                const categoriey = tableMgr.goodsTable.getCategoriy(weaponData.GoodsID);
                const resName = tableMgr.goodsTable.getGoods3DResNameByID(weaponData.GoodsID);
                if (!resName) {
                    return;
                }

                const slotType = CalcSlotTypeFun(categoriey);

                // 获取资源url
                const resUrl = Global.getEquipResPath(resName);

                const loadVersion = (this.mLoadVersion++).toString();    // 保存加载的版本号

                // 加载资源
                const completeFun = () => {
                    const retData = Laya.loader.getRes(resUrl);

                    // to do ... 资源的释放

                    if ((retData instanceof Laya.Sprite3D)) {

                        if (!retData.loaded) {
                            Global.Log.Error(`没有加载成功(${retData}, url = ${resUrl})`);
                            retData.destroy();
                            return;
                        }

                        let slotSprite = this.mSlotSprites[slotType];
                        if (slotSprite && (slotSprite.destroyed || slotSprite.name !== loadVersion)) { // 需要使用资源的对象自己已经释放了或者加载的版本已经旧了,不再需要了,不再需要这个加载完成的资源
                            // retData.destroy();  // 释放不再使用的资源 注:暂时不可以释放,因为引擎的资源管理是共享的,释放了会导致别的正在使用的这个资源的地方出现bug.
                        }
                        else {
                            const clonedRes = retData.clone() as Laya.Sprite3D; // 我们需要复制一个出来,因为后续的处理很可能会修改这个对象.比如移动子节点等

                            // 如果挂接点还不存在,则创建一个
                            if (!slotSprite) {
                                slotSprite = this.mSlotSprites[slotType] = new Laya.Sprite3D();
                                if (this.mAnimator) {
                                    // 挂接点
                                    this.addChild(slotSprite);
                                    this.mAnimator.linkSprite3DToAvatarNode(Slot_Bone_Names[slotType], slotSprite);
                                }
                                else {
                                    slotSprite.active = false;  // 在没有加载完动作之前先隐藏绑定点.                                    
                                }
                            }
                            else {
                                slotSprite.destroyChildren();      // 移除所有的子对象
                            }

                            slotSprite.addChild(clonedRes);
                        }

                        // to do ... retData 资源的释放?
                    }
                    else {
                        Global.Log.Error(`${retData} 资源类型不是 Laya.Sprite3D, url = ${resUrl}`);
                        if (retData) retData.destroy();
                    }
                };

                if (this.mSlotSprites[slotType]) {
                    this.mSlotSprites[slotType].name = loadVersion;  // 保存最新的版本号
                }
                Laya.loader.create(resUrl, Laya.Handler.create(this, completeFun));

            });
        }

        /**
         * 卸载指定的武器
         * @param weaponGoodsDataList 指定要卸载的武器道具列表
         */
        public unloadWeapon(weaponGoodsDataList: Array<{ GoodsID: number }>): void {
            Global.Log.Assert(false);
        }

        /**
         * 设置默认播放的动作
         * @param aniName 指定要设置的默认播放的动作名称. 注: 当对象刚刚加载完成或active发生变化时会自动播放默认的动作
         */
        public setDefaultAni(aniName: string) {
            let setNow = false;    // 是否可以设置默认播放的动作.注:有可能this.mAnimator还没有加载完成,现在还设置不了,等加载完成后再设置
            if (this.mAnimator) {
                setNow = true;
            }

            // 真正的设置函数
            const playFun = () => {
                this.mAnimator.defaultClip = aniName;
            };

            if (setNow) {
                playFun();
            }
            else {
                this.once(CharacterView.eventAnimatorReady, this, playFun); // 加入到等待播放动作列表
            }
        }

        /**
         * 播放指定名称的动作
         * @param aniName 指定要播放的动作名称,不带后缀名
         * @param playbackRate 播放速率
         */
        public playAni(aniName: string, playbackRate?: number) {
            let playNow = false;    // 是否可以立即播放动作.注:有可能this.mAnimator还没有加载完成,现在播放不了,等加载完成后再播放
            if (this.mAnimator) {
                playNow = true;
            }

            if (playNow) {
                this.mAnimator.play(aniName, playbackRate);
            }
            else {
                // 真正的播放函数
                const playFun = () => {
                    this.mAnimator.playOnWake = false;  // 关闭自动播放.如果开启,会冲掉我们已经播放的动作
                    this.mAnimator.play(aniName, playbackRate);
                };

                this.offAll(CharacterView.eventAnimatorReady);              // 先移除之前加入的相同事件
                this.once(CharacterView.eventAnimatorReady, this, playFun); // 加入到等待播放动作列表
            }
        }

        /**
         * 监听 一个动作播放完成的事件 Laya.Event.STOPPED
         * @param caller 回调函数拥有者
         * @param listener 回调函数
         * @param args 传递给回调函数的参数.具体见 mAnimator.once() 函数
         * 注: 这里只支持监听一次!!!
         */
        public onAniStop(caller: any, listener: Function, args?: any[]): Laya.EventDispatcher {
            if (this.mAnimator) {
                return this.mAnimator.once(laya.events.Event.STOPPED, caller, listener, args);
            } else {
                this.once(CharacterView.eventAnimatorReady,
                    this,
                    () => this.mAnimator.once(Laya.Event.STOPPED, caller, listener, args)    // 等待mAnimator创建成功后再监听
                );
            }
        }

        /**
         * 停止监听动作播放完成的事件. 应该与 onAniStop() 函数中传入的参数对应!
         * @param caller 回调函数拥有者
         * @param listener 回调函数
         */
        public offAniStop(caller: any, listener: Function): Laya.EventDispatcher {
            if (this.mAnimator) {
                return this.mAnimator.off(laya.events.Event.STOPPED, caller, listener, true);
            } else {
                this.offAll(CharacterView.eventAnimatorReady);  // Animator还没创建成功,全部移除吧.注: 这样简化了逻辑,但有时可能会出错.
            }
        }

        /**
         * 设置动作的播放速率
         * @param playbackRate 指定动作的播放速率
         */
        public setPlaybackRate(playbackRate: number): void {
            if (this.mAnimator) {
                this.mAnimator.playbackRate = playbackRate;
            }
        }

        /**
         * 用来延迟执行加载装备的逻辑
         */
        private _loadEquip() {
            Global.Log.Assert(!this.mEquipLoading);     // 不应该正在加载装备中.重入了?

            this.mEquipLoading = true;                              // 设置正在加载装备中...            
            this.mEquipGoodsDataList = this.mToEquipGoodsDataList;
            this.mToEquipGoodsDataList = null;                      // 清空待加载的装备列表

            const resLoaders: Array<Promise<Laya.Sprite3D>> = [];

            // 保存要装备的资源.对应装配位
            const bodyEquipResName = new Array<string>(BodyPartIDs.Max);

            // 从默认装备中复制默认的装备
            for (let index = 0; index < bodyEquipResName.length; index++) {
                if (index < this.mNakeBodyResName.length) {
                    bodyEquipResName[index] = this.mNakeBodyResName[index];
                } else
                    bodyEquipResName[index] = null;
            }

            // 遍历整个要装备的道具列表
            for (const equipData of this.mEquipGoodsDataList) {
                if (equipData.Using <= 0) { // 只处理正在使用的装备
                    continue;
                }

                const categoriey = tableMgr.goodsTable.getCategoriy(equipData.GoodsID);
                if (categoriey !== ItemCategories.KaiJia && categoriey !== ItemCategories.TouKui) {
                    continue;   // 目前只处理铠甲及头盔的模型加载
                }

                // 获取装备对应的资源url
                const resName = tableMgr.goodsTable.getGoods3DResNameByID(equipData.GoodsID);
                if (!resName) {
                    continue;
                }

                const bodySlot = Global.getBodySlotByItemCategoriy(categoriey);
                if (bodySlot === BodyPartIDs.Invalid) {
                    Global.Log.Assert(false);
                    continue;   // 非法的装配位
                }

                bodyEquipResName[bodySlot] = resName;
            }

            // 加载真正需要加载的装备
            bodyEquipResName.forEach((resName) => {
                if (!resName)
                    return;
                const resUrl = Global.getEquipResPath(resName);
                const childEquipNode = this.mSkeleton.getChildByName(resUrl);
                if (childEquipNode)
                    return; // 资源相同,不需要重复加载

                resLoaders.push(this._createResTask(resUrl, undefined));   // 加载装备资源,同时给定一个名称
            });

            // 清理函数
            const clearFun = () => {

                if (this.mInitShow) { // 第一次加载完装备,需要显示模型
                    this.mSkeleton.active = true;
                    this.onPostInit();
                }

                // ===== 下面的代码尽量放在最后 =====
                this.mEquipLoading = false; // 加载装备完成
                if (this.mToEquipGoodsDataList != null) { // 有新的装备需要加载,继续
                    this.frameOnce(0, this, this._loadEquip, undefined, true);
                }
                else {

                }
            };

            if (resLoaders.length > 0) {
                // 等待装备加载完成
                Promise.all(resLoaders).then((allEquipsRes) => {
                    // 遍历所有的装备
                    allEquipsRes.forEach((equipRes) => {
                        if (!equipRes) {
                            return; // 资源没加载成功?
                        }

                        // 移除所有相同名称(相同装备位)的子节点                        
                        const resUrl = equipRes.name;
                        for (let nodeIndex = this.mSkeleton.numChildren - 1; nodeIndex >= 0; --nodeIndex) {
                            const childNode = this.mSkeleton.getChildAt(nodeIndex);
                            if (childNode.name === resUrl) {
                                this.mSkeleton.removeChildAt(nodeIndex);
                                childNode.destroy();        // 销毁节点
                            }
                        }

                        const root = equipRes.getChildAt(0);
                        for (let index = 0; index < root.numChildren; index++) {
                            const skinMesh = root.getChildAt(index);
                            if (skinMesh instanceof Laya.SkinnedMeshSprite3D) {
                                skinMesh.name = resUrl;  // 使用根对象的url作为名称,以便忽略装备资源的重复加载
                                this.mSkeleton.addChild(skinMesh);
                            }
                        }

                        equipRes.destroy(); // 销毁掉资源吧,我们不需要了
                    });

                    clearFun();
                });
            }
            else {
                clearFun();
            }
        }

        /**
         * 当初始化完成后调用
         */
        private onPostInit(): void {
            Global.Log.Assert(this.mInitShow);
            this.mInitShow = false;

            // 添加动作的事件处理脚本
            this.mSkeleton.addComponent(ActionEventComponent);

            // 派发初始化完成事件
            this.event(CharacterView.eventPostInit);
        }

        public destroy(destroyChild?: boolean): void {
            // 销毁此对象时由于资源(如骨架)是异步加载的,所以存在两种情况:
            // 1. 对象资源(如骨架等)已经加载完成
            // 2. 对象资源还在加载中
            this.mSlotSprites.forEach(sprite => {
                if (this.mAnimator) { // 如果已经存在骨架,则偿试删除绑定的链接
                    this.mAnimator.unLinkSprite3DToAvatarNode(sprite);
                }
                sprite.destroy();
            });
            this.mSlotSprites = undefined;
            this.mAnimator = undefined;
            if (this.mSkeleton) {
                this.mSkeleton.destroy();
                this.mSkeleton = null;
            }

            super.destroy(destroyChild);
        }
    }
}