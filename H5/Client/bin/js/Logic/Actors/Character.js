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
     * 定义带有骨骼动画显示的角色的基类，如Player,NPC等.封装一些共享的数据与逻辑
     * @param TStateType 指定角色状态的类型.它用来保存角色的运行时数据,方便进行复制等操作
     */
    class Character extends Logic.AActor {
        /**
         * @param type 指定本对象的类型
         * @param state 指定角色的初始化数据.注:这里是引用,即外面修改state的数值时会修改本角色的状态值.外面不应该再使用此变量!
         */
        constructor(type, state) {
            super(type);
            this.mView = null; // 角色的图形表现,如模型,动画,特效等
            this.mState = null; // 保存角色的数据
            this.mController = null; // 角色的控制器
            this.mCX = -9999; // 服务器坐标X
            this.mCY = -9999; // 服务器坐标Y
            this.mTargetDir = new Laya.Quaternion(); // 角色的目标方向.角色会插值到目标方向,即慢慢旋转过去.
            this.mState = state;
        }
        /** 返回角色Id */
        getRoleID() {
            return this.mState.RoleID;
        }
        /** 获取地图ID */
        getLevelID() {
            if (this.getLevel() == null)
                return -1;
            return this.getLevel().levelId;
        }
        /** 获取3D显示对象 */
        getView() {
            return this.mView;
        }
        /** 返回对应的故事板 */
        getStoryBoard() {
            return this.mLevel.findStoryBoard(this.getRoleID());
        }
        /** 获取角色移动速度 */
        getMoveSpeed() {
            // TODO:
            return 1.0;
        }
        /**
         * 获取扩展Id,不同的类型对应不同的值,一般来讲应该存储了NPC或怪物的数据表ID
         */
        getExtensionID() {
            return -1;
        }
        /** 获取所属阵营 */
        getBattleWitchSide() {
            return 0;
        }
        /**
         * 设置本角色的控制器
         * @param controller 指定要绑定的控制器
         */
        setController(controller) {
            this.mController = controller;
        }
        /**
         * 返回绑定的控制器.注: 重载基类的函数
         */
        getController() {
            return this.mController;
        }
        /** 返回角色的状态数据 */
        getState() {
            return this.mState;
        }
        /** 返回是否死亡了 */
        isDead() {
            if (this.destroyed) {
                return true;
            }
            const lifeComponent = this.components.get(Logic.ActorState.Life);
            if (lifeComponent) {
                return lifeComponent.VLife <= 0;
            }
            return false;
        }
        /**
         * 检测是否可以被指定的角色攻击
         * @param Attacker 攻击者
         */
        canBeAttacked(Attacker) {
            return false;
        }
        /**
         * 获取Laya坐标系的变换
         * 注: 切记只可以读,别写入
         */
        getTransform() {
            return this.mView.transform;
        }
        /** 设置世界位置(Laya坐标系) */
        setPosition(posInWorld) {
            this.mView.transform.position = posInWorld;
            Logic.setVisualNameWorldPos(this, posInWorld);
        }
        /** 返回世界位置(Laya坐标系) */
        getPosition() {
            return this.mView.transform.position.clone();
        }
        /**
         * 返回世界坐标系(Layabox坐标系)的位置
         * 注: 如果不确定是否真得需要直接修改位置,千万不要使用这个函数,免得小心修改了底层的位置
         * 注: 因为是引用,所以会比 getPosition() 函数快一些,保险起见一般应该使用getPosition()函数
         */
        getPositionRef() {
            return this.mView.transform.position;
        }
        /** 设置世界旋转(Layabox坐标系) */
        setRotation(rotateInWorld) {
            this.mView.transform.rotation = rotateInWorld.clone();
        }
        /** 返回世界旋转(Layabox坐标系) */
        getRotation() {
            return this.mView.transform.rotation.clone();
        }
        /**
         * 取得服务器坐标系的旋转( 0 ~ 360 度)
         * 注: 频繁调用会导致性能问题
         */
        GetYAngle() {
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
        getForwardCoord() {
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
        getRotationRef() {
            return this.mView.transform.rotation;
        }
        /**
         * 返回二维平面坐标
         * 注: 不要频繁调用此函数,以免带来性能问题
         */
        getCoordinate() {
            return new Laya.Point(this.mCX, this.mCY);
        }
        /**
         * 返回二维平台坐标
         * 注: 此函数效率会比 getCoordinate() 函数高,且少了内存分配
         */
        getCoordinateRef(outCoord) {
            outCoord.x = this.mCX;
            outCoord.y = this.mCY;
        }
        /** 设置二维平面坐标 */
        setCoordinate(cx, cy) {
            if (cx === this.mCX && cy === this.mCY)
                return; // 坐标相同
            this.mCX = cx;
            this.mCY = cy;
            const pos = this.getLevel().GSCoord2Laya(cx, cy);
            this.setPosition(pos);
            // 触发位置改变事件
            this.mView.event(Logic.EActorEvent[Logic.EActorEvent.coordChanged], [
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
        get2DDistanceSq(cx, cy) {
            const offX = this.mCX - cx;
            const offY = this.mCY - cy;
            return offX * offX + offY * offY;
        }
        /**
         * 添加自己到指定的场景
         * @param scene 指定要添加到场景
         * 注: 只有添加到场景后,角色才会显示
         */
        addToLevel(level) {
            if (level && this.mView)
                // 如果存在图形,则直接添加图形到场景中
                level.getScene().addChild(this.mView);
            super.addToLevel(level);
        }
        /** 从关卡中移除自己 */
        removeFromLevel() {
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
        playAni(aniName, playbackRate) {
            this.mView.playAni(aniName, playbackRate);
        }
        /**
         * 监听 一个动作播放完成的事件 Laya.Event.STOPPED
         * @param caller 回调函数拥有者
         * @param listener 回调函数
         * @param args 传递给回调函数的参数.具体见 mAnimator.once() 函数
         * 注: 这里只支持监听一次!!!
         */
        onAniStop(caller, listener, args) {
            return this.mView.onAniStop(caller, listener, args);
        }
        /**
         * 停止监听动作播放完成的事件. 应该与 onAniStop() 函数中传入的参数对应!
         * @param caller 回调函数拥有者
         * @param listener 回调函数
         */
        offAniStop(caller, listener) {
            return this.mView.offAniStop(caller, listener);
        }
        /**
         * 设置动作的播放速率
         * @param playbackRate 指定动作的播放速率
         */
        setPlaybackRate(playbackRate) {
            this.mView.setPlaybackRate(playbackRate);
        }
        /**
         * 是否激活骨骼动画的缓冲,以内存换取性能提升
         * @param bCacheAni 是否激活骨骼动画的缓冲,以内存换取性能提升
         */
        enableAniCache(bCacheAni) {
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
        on(type, caller, listener, args) {
            this.mView.on(Logic.EActorEvent[type], caller, listener, args);
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
        once(type, caller, listener, args) {
            this.mView.once(Logic.EActorEvent[type], caller, listener, args);
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
        off(type, caller, listener, onceOnly) {
            this.mView.off(Logic.EActorEvent[type], caller, listener, onceOnly);
            return this;
        }
        /**
         * 设置默认播放的动作
         * @param aniName 指定要设置的默认播放的动作名称. 注: 当对象刚刚加载完成或active发生变化时会自动播放默认的动作
         */
        setDefaultAni(aniName) {
            this.mView.setDefaultAni(aniName);
        }
        /**
         * 销毁函数,释放占用的资源
         */
        destroy() {
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
    Logic.Character = Character;
    // -----------------------------------------------------------------------------------------------------------------------
    /**
     * 封装了一些固定功能实现的角色基类,以复用代码,增加可维护性.如模型加载等
     */
    class CharacterEx extends Logic.Character {
        /**
         * @param type 指定本对象的类型
         * @param state 指定角色的初始化数据.注:这里是引用,即外面修改state的数值时会修改本角色的状态值.外面不应该再使用此变量!
         */
        constructor(type, state) {
            super(type, state);
            this._load_checker = new Global.ReEnterCheck("load");
        }
        /**
         * 加载Character实例,并显示到场景中
         * @param progress 用于接收加载进度
         * 注: Monster在没加载完成前是不会显示的,但并不影响对Monster的操作,包括换装等操作.
         */
        _load(resUrl, progress, nakeBodyResName) {
            return __awaiter(this, void 0, void 0, function* () {
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
                return new Promise(resolve => {
                    const completeFun = () => {
                        resolve(charView.loaded);
                        this.handleAfterCharacterViewLoaded();
                        this._load_checker.leave();
                    };
                    // 监听角色加载完成事件
                    charView.once(Logic.CharacterView.eventPostInit, this, completeFun);
                    // 开始加载骨架
                    charView.loadSkeleton(resUrl, progress);
                });
            });
        }
        /**
         * 模型加载完毕的处理
         */
        handleAfterCharacterViewLoaded() {
            // 添加碰撞盒
            this.addColliderToCharacterView();
        }
        /**
         * 模型添加碰撞盒
         */
        addColliderToCharacterView() {
            if (Logic.getCanCollide(this)) {
                let collider = this.mView.getComponentByType(Laya.BoxCollider);
                if (collider == null) {
                    collider = this.mView.addComponent(Laya.BoxCollider);
                }
                collider.center = Logic.getColliderCenter(this);
                collider.size = Logic.getColliderSize(this);
                // 用来测试碰撞盒显示
                // this.mView.calculateAndAddBoxCollider();
            }
        }
    }
    Logic.CharacterEx = CharacterEx;
})(Logic || (Logic = {}));
//# sourceMappingURL=Character.js.map