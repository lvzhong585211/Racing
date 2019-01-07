namespace Logic {
    /** 简化泛型写法（Character<ActorState.CharacterBase>） */
    export type CharacterBaseActor = Character<ActorState.CharacterBase>;

    /**
     * 定义Character必须实现的接口
     */
    export interface ICharacter {
        /** 返回角色Id */
        getRoleID(): number;

        /** 返回世界旋转 */
        getPosition(): Laya.Vector3;

        /** 返回世界旋转 */
        getRotation(): Laya.Quaternion;

        /** 添加到关卡 */
        addToLevel(level: Logic.Level);

        /** 返回服务器平面坐标 */
        getCoordinate(): Laya.Point;

        /** 返回绑定的控制器.注: 重载基类的函数 */
        getController(): AController;

        /** 设置服务器平面坐标 */
        setCoordinate(cx: number, cy: number);

        /** 设置世界旋转 */
        setRotation(rotateInWorld: Laya.Quaternion);

        /** 获取角色移动速度 */
        getMoveSpeed(): number;

        /** 获取地图ID */
        getLevelID(): number;

        /** 获取所属阵营 */
        getBattleWitchSide(): number;

        /** 是否死亡 */
        isDead(): boolean;

        /** 检测是否可以被指定的角色攻击 */
        canBeAttacked(Attacker: ICharacter): boolean;

        /** 返回对应的故事板 */
        getStoryBoard(): StoryBoard;

        /**
         * 播放指定名称的动作
         * @param aniName 指定要播放的动作名称,不带后缀名
         * @param playbackRate 播放速率
         */
        playAni(aniName: string, playbackRate?: number);

        /**
         * 设置动作的播放速率
         * @param playbackRate 指定动作的播放速率
         */
        setPlaybackRate(playbackRate: number): void;

        /**
         * 监听 一个动作播放完成的事件 Laya.Event.STOPPED
         * @param caller 回调函数拥有者
         * @param listener 回调函数
         * @param args 传递给回调函数的参数.具体见 mAnimator.once() 函数
         * 注: 这里只支持监听一次!!!
         */
        onAniStop(
            caller: any,
            listener: Function,
            args?: any[]
        ): Laya.EventDispatcher;

        /**
         * 停止监听动作播放完成的事件. 应该与 onAniStop() 函数中传入的参数对应!
         * @param caller 回调函数拥有者
         * @param listener 回调函数
         */
        offAniStop(caller: any, listener: Function): Laya.EventDispatcher;

        /**
         * 设置默认播放的动作
         * @param aniName 指定要设置的默认播放的动作名称. 注: 当对象刚刚加载完成或active发生变化时会自动播放默认的动作
         */
        setDefaultAni(aniName: string);

        /** 销毁函数,释放占用的资源 */
        destroy(): void;

        /** 返回角色的类型 */
        getType(): EActorType;
    }

    /**
     * 定义带有骨骼动画显示的角色的基类，如Player,NPC等.封装一些共享的数据与逻辑
     * @param TStateType 指定角色状态的类型.它用来保存角色的运行时数据,方便进行复制等操作
     */
    export class Character<TStateType extends ActorState.CharacterBase>
        extends AActor
        implements ICharacter, IDebugInnerID, IViewActor {
        protected mView: CharacterView = null; // 角色的图形表现,如模型,动画,特效等
        protected mState: TStateType = null; // 保存角色的数据
        protected mController: AController = null; // 角色的控制器
        private mCX: number = -9999; // 服务器坐标X
        private mCY: number = -9999; // 服务器坐标Y
        protected mTargetDir = new Laya.Quaternion(); // 角色的目标方向.角色会插值到目标方向,即慢慢旋转过去.

        /**
         * @param type 指定本对象的类型
         * @param state 指定角色的初始化数据.注:这里是引用,即外面修改state的数值时会修改本角色的状态值.外面不应该再使用此变量!
         */
        protected constructor(type: EActorType, state: TStateType) {
            super(type);
            this.mState = state;
        }

        /** 返回角色Id */
        public getRoleID(): number {
            return this.mState.RoleID;
        }

        /** 获取地图ID */
        public getLevelID(): number {
            if (this.getLevel() == null) return -1;
            return this.getLevel().levelId;
        }

        /** 获取3D显示对象 */
        public getView(): Laya.Sprite3D {
            return this.mView;
        }

        /** 返回对应的故事板 */
        getStoryBoard(): StoryBoard {
            return this.mLevel.findStoryBoard(this.getRoleID());
        }

        /** 获取角色移动速度 */
        public getMoveSpeed(): number {
            // TODO:
            return 1.0;
        }

        /**
         * 获取扩展Id,不同的类型对应不同的值,一般来讲应该存储了NPC或怪物的数据表ID
         */
        public getExtensionID(): number {
            return -1;
        }

        /** 获取所属阵营 */
        public getBattleWitchSide(): number {
            return 0;
        }

        /**
         * 设置本角色的控制器
         * @param controller 指定要绑定的控制器
         */
        public setController(controller: AController) {
            this.mController = controller;
        }

        /**
         * 返回绑定的控制器.注: 重载基类的函数
         */
        public getController(): AController {
            return this.mController;
        }

        /** 返回角色的状态数据 */
        public getState(): TStateType {
            return this.mState;
        }

        /** 返回是否死亡了 */
        public isDead(): boolean {
            if (this.destroyed) {
                return true;
            }

            const lifeComponent = this.components.get(ActorState.Life);
            if (lifeComponent) {
                return lifeComponent.VLife <= 0;
            }
            return false;
        }

        /**
         * 检测是否可以被指定的角色攻击
         * @param Attacker 攻击者
         */
        public canBeAttacked(Attacker: ICharacter): boolean {
            return false;
        }

        /**
         * 获取Laya坐标系的变换
         * 注: 切记只可以读,别写入
         */
        public getTransform(): Laya.Transform3D {
            return this.mView.transform;
        }

        /** 设置世界位置(Laya坐标系) */
        private setPosition(posInWorld: Laya.Vector3) {
            this.mView.transform.position = posInWorld;
            setVisualNameWorldPos(this, posInWorld);
        }

        /** 返回世界位置(Laya坐标系) */
        public getPosition(): Laya.Vector3 {
            return this.mView.transform.position.clone();
        }

        /**
         * 返回世界坐标系(Layabox坐标系)的位置
         * 注: 如果不确定是否真得需要直接修改位置,千万不要使用这个函数,免得小心修改了底层的位置
         * 注: 因为是引用,所以会比 getPosition() 函数快一些,保险起见一般应该使用getPosition()函数
         */
        public getPositionRef(): Laya.Vector3 {
            return this.mView.transform.position;
        }

        /** 设置世界旋转(Layabox坐标系) */
        public setRotation(rotateInWorld: Laya.Quaternion) {
            this.mView.transform.rotation = rotateInWorld.clone();
        }

        /** 返回世界旋转(Layabox坐标系) */
        public getRotation(): Laya.Quaternion {
            if (this.mView === null) {
                Global.Log.Assert(false, "this.mView 不存在");
                return null;
            }
            return this.mView.transform.rotation.clone();
        }

        /**
         * 取得服务器坐标系的旋转( 0 ~ 360 度)
         * 注: 频繁调用会导致性能问题
         */
        public GetYAngle(): number {
            const yawPitchRoll = new Laya.Vector3();
            this.mView.transform.rotation.getYawPitchRoll(yawPitchRoll);
            let angle = Laya.Utils.toAngle(yawPitchRoll.x);
            if (angle < 0) {
                // 把angle转换到0 ~ 360度之间
                angle = 360 + angle;
            }
            angle = 360 - angle + 180; // 转换到服务器坐标系(服务器的x轴与Layabox的坐标轴相反的)
            return angle;
        }

        /**
         * 获取服务器坐标系的面向方向
         * 注:这里是方向引用,外面千万不要修改
         * 不要频繁调用,以免带来性能问题
         */
        public getForwardCoord(): Laya.Point {
            const retPoint = new Laya.Point();
            const trans = Global.LayaCoord2GS(this.mView.transform.forward);
            retPoint.x = trans.x;
            retPoint.y = trans.y;
            retPoint.normalize();
            return retPoint;
        }

        /**
         * 获取世界坐标系旋转的引用
         * 注: 如果不确定是否真得需要直接修改旋转,千万不要使用这个函数,免得小心修改了底层的旋转
         * 注: 因为是引用,所以会比 getRotation() 函数快一些,保险起见一般应该使用 getRotation()函数
         */
        public getRotationRef(): Laya.Quaternion {
            return this.mView.transform.rotation;
        }

        /**
         * 返回二维平面坐标
         * 注: 不要频繁调用此函数,以免带来性能问题
         */
        public getCoordinate(): Laya.Point {
            return new Laya.Point(this.mCX, this.mCY);
        }

        /**
         * 返回二维平台坐标
         * 注: 此函数效率会比 getCoordinate() 函数高,且少了内存分配
         */
        public getCoordinateRef(outCoord: Laya.Point): void {
            outCoord.x = this.mCX;
            outCoord.y = this.mCY;
        }

        /** 设置二维平面坐标 */
        public setCoordinate(cx: number, cy: number) {
            if (cx === this.mCX && cy === this.mCY) return; // 坐标相同

            this.mCX = cx;
            this.mCY = cy;
            const pos = this.getLevel().GSCoord2Laya(cx, cy);
            this.setPosition(pos);

            // 触发位置改变事件
            this.mView.event(EActorEvent[EActorEvent.coordChanged], [
                this,
                cx,
                cy
            ]);
        }

        /**
         * 返回到给定目标点的2D距离的平方
         * @param cx 目标点的x(服务器坐标系)
         * @param cy 目标点的y(服务器坐标系)
         */
        public get2DDistanceSq(cx: number, cy: number): number {
            const offX = this.mCX - cx;
            const offY = this.mCY - cy;
            return offX * offX + offY * offY;
        }

        /**
         * 添加自己到指定的场景
         * @param scene 指定要添加到场景
         * 注: 只有添加到场景后,角色才会显示
         */
        public addToLevel(level: Logic.Level) {
            if (level && this.mView)
                // 如果存在图形,则直接添加图形到场景中
                level.getScene().addChild(this.mView);
            super.addToLevel(level);
        }

        /** 从关卡中移除自己 */
        protected removeFromLevel() {
            if (this.mView && this.mLevel)
                // 如果存在图形,则直接从场景中移除图形
                this.mLevel.getScene().removeChild(this.mView);
            super.removeFromLevel();
        }

        /**
         * 播放指定名称的动作
         * @param aniName 指定要播放的动作名称,不带后缀名
         * @param playbackRate 播放速率
         */
        public playAni(aniName: string, playbackRate?: number): void {
            this.mView.playAni(aniName, playbackRate);
        }

        /**
         * 监听 一个动作播放完成的事件 Laya.Event.STOPPED
         * @param caller 回调函数拥有者
         * @param listener 回调函数
         * @param args 传递给回调函数的参数.具体见 mAnimator.once() 函数
         * 注: 这里只支持监听一次!!!
         */
        public onAniStop(
            caller: any,
            listener: Function,
            args?: any[]
        ): Laya.EventDispatcher {
            return this.mView.onAniStop(caller, listener, args);
        }

        /**
         * 停止监听动作播放完成的事件. 应该与 onAniStop() 函数中传入的参数对应!
         * @param caller 回调函数拥有者
         * @param listener 回调函数
         */
        public offAniStop(
            caller: any,
            listener: Function
        ): Laya.EventDispatcher {
            return this.mView.offAniStop(caller, listener);
        }

        /**
         * 设置动作的播放速率
         * @param playbackRate 指定动作的播放速率
         */
        public setPlaybackRate(playbackRate: number): void {
            this.mView.setPlaybackRate(playbackRate);
        }

        /**
         * 是否激活骨骼动画的缓冲,以内存换取性能提升
         * @param bCacheAni 是否激活骨骼动画的缓冲,以内存换取性能提升
         */
        public enableAniCache(bCacheAni: boolean): void {
            this.mView.enableAniCache(bCacheAni);
        }

        /**
         * <p>增加事件侦听器，以使侦听器能够接收事件通知。</p>
         * <p>如果侦听鼠标事件，则会自动设置自己和父亲节点的属性 mouseEnabled 的值为 true(如果父节点mouseEnabled=false，则停止设置父节点mouseEnabled属性)。</p>
         * @param	type		事件的类型。
         * @param	caller		事件侦听函数的执行域。
         * @param	listener	事件侦听函数。
         * @param	args		（可选）事件侦听函数的回调参数。
         * @return 此 EventDispatcher 对象。
         */
        public on(
            type: EActorEvent,
            caller: any,
            listener: Function,
            args?: any[]
        ): Character<TStateType> {
            this.mView.on(EActorEvent[type], caller, listener, args);
            return this;
        }

        /**
         * <p>增加事件侦听器，以使侦听器能够接收事件通知，此侦听事件响应一次后则自动移除侦听。</p>
         * <p>如果侦听鼠标事件，则会自动设置自己和父亲节点的属性 mouseEnabled 的值为 true(如果父节点mouseEnabled=false，则停止设置父节点mouseEnabled属性)。</p>
         * @param	type		事件的类型。
         * @param	caller		事件侦听函数的执行域。
         * @param	listener	事件侦听函数。
         * @param	args		（可选）事件侦听函数的回调参数。
         * @return 此 EventDispatcher 对象。
         */
        public once(
            type: EActorEvent,
            caller: any,
            listener: Function,
            args?: any[]
        ): Character<TStateType> {
            this.mView.once(EActorEvent[type], caller, listener, args);
            return this;
        }

        /**
         * 从 EventDispatcher 对象中删除侦听器。
         * @param type		事件的类型。
         * @param caller	事件侦听函数的执行域。
         * @param listener	事件侦听函数。
         * @param onceOnly	（可选）如果值为 true ,则只移除通过 once 方法添加的侦听器。
         * @return 此 EventDispatcher 对象。
         */
        public off(
            type: EActorEvent,
            caller: any,
            listener: Function,
            onceOnly?: boolean
        ): Character<TStateType> {
            this.mView.off(EActorEvent[type], caller, listener, onceOnly);
            return this;
        }

        /**
         * 设置默认播放的动作
         * @param aniName 指定要设置的默认播放的动作名称. 注: 当对象刚刚加载完成或active发生变化时会自动播放默认的动作
         */
        public setDefaultAni(aniName: string) {
            this.mView.setDefaultAni(aniName);
        }

        /**
         * 销毁函数,释放占用的资源
         */
        public destroy(): void {
            if (this.mController != null) {
                this.mController.destroy();
                this.mController = null;
            }

            // 释放图形表现资源
            if (this.mView != null) {
                this.mView.destroy();
                this.mView = null;
            }

            super.destroy();
            this.mState = null;
        }
    }

    // -----------------------------------------------------------------------------------------------------------------------

    /**
     * 封装了一些固定功能实现的角色基类,以复用代码,增加可维护性.如模型加载等
     */
    export class CharacterEx<
        TStateType extends ActorState.CharacterBase
        > extends Logic.Character<TStateType> {
        /**
         * @param type 指定本对象的类型
         * @param state 指定角色的初始化数据.注:这里是引用,即外面修改state的数值时会修改本角色的状态值.外面不应该再使用此变量!
         */
        protected constructor(type: EActorType, state: TStateType) {
            super(type, state);
        }

        private _load_checker = new Global.ReEnterCheck("load");

        /**
         * 加载Character实例,并显示到场景中
         * @param progress 用于接收加载进度
         * 注: Monster在没加载完成前是不会显示的,但并不影响对Monster的操作,包括换装等操作.
         */
        protected async _load(
            resUrl: string,
            progress?: Laya.Handler,
            nakeBodyResName?: string[]
        ): Promise<boolean> {
            this._load_checker.tryEnter();

            // 注意: 不要把纯逻辑(不需要加载资源的逻辑)放在等待的代码之后.理论上只有图形需要等待加载
            // 注: 如果以后Monster的资源比较多,导致加载慢,可以考虑把Monster的动作与特效等加载分开来加载,这样,可以把Monster快速的显示出来.以带来更好的游戏体验!
            const charView = new Logic.CharacterView(null, null, nakeBodyResName);
            charView.name = this.getState().RoleID.toString();
            this.mView = charView;

            if (this.mLevel) {
                // 已经存在关卡了,需要添加到关卡中,因为之前mView并不存在
                this.addToLevel(this.mLevel);
            }

            // 等待角色加载完成
            return new Promise<boolean>(resolve => {
                const completeFun = () => {
                    resolve(charView.loaded);
                    this.handleAfterCharacterViewLoaded();
                    this._load_checker.leave();
                };

                // 监听角色加载完成事件
                charView.once(
                    Logic.CharacterView.eventPostInit,
                    this,
                    completeFun
                );

                // 开始加载骨架
                charView.loadSkeleton(resUrl, progress);
            });
        }

        /**
         * 模型加载完毕的处理
         */
        protected handleAfterCharacterViewLoaded() {
            // 添加碰撞盒
            this.addColliderToCharacterView();
        }

        /**
         * 模型添加碰撞盒
         */
        protected addColliderToCharacterView() {
            if (Logic.getCanCollide(this)) {
                let collider = this.mView.getComponentByType(
                    Laya.BoxCollider
                ) as Laya.BoxCollider;
                if (collider == null) {
                    collider = this.mView.addComponent(
                        Laya.BoxCollider
                    ) as Laya.BoxCollider;
                }
                collider.center = Logic.getColliderCenter(this);
                collider.size = Logic.getColliderSize(this);

                // 用来测试碰撞盒显示
                // this.mView.calculateAndAddBoxCollider();
            }
        }
    }
}
