var Logic;
(function (Logic) {
    /**
     * 定义角色控制器的基类
     */
    class ACharacterController extends Logic.AController {
        constructor() {
            super();
            this.mActionPlay = null; // 角色的行为(动作)播放器
            this.mControlRotation = new Laya.Quaternion(); // 目标方向,有可能会与角色的实际方向有差别,角色的方向会慢慢转向它
            const states = this.m_states;
            states[Logic.EControllerStateId.Idling] = new Logic.CharacterFsmState.Idling();
        }
        /**
         * 自动寻路到目标点
         * @param mapCode 目标点所在的关卡Id
         * @param pos 目标点坐标
         * @param offset 指定离目标点多远可以停止或执行后续动作
         * @param extActionType 指定到达目标点后执行的动作
         */
        autoFindRoad(mapCode, pos, offset, extActionInfo) {
        }
        /**
         * 设置绑定的角色
         * 注:正常来讲只允许绑定一次,多次绑定目前还没实现
         */
        setOwner(character) {
            super.setOwner(character);
            character.setController(this);
            this.mControlRotation = character.getRotation(); // 获取角色当前的朝向
            // to do ... 设置位置与朝向?
        }
        /**
         * 返回绑定的角色
         */
        getCharacter() {
            Global.Log.Assert(this.mOwner instanceof Logic.Character);
            return this.mOwner;
        }
        /**
        * 设置行为播放器类型
        * @param actionPlayType 指定要设置的行为播放器的类型
        * 注: 此函数必须在setOwner()函数之后调用
        */
        setActionPlayType(actionPlayType) {
            Global.Log.Assert(this.mOwner instanceof Logic.Character);
            this.mActionPlay = new actionPlayType(this.mOwner);
        }
        /**
         * 获取行为播放器
         */
        getActionPlayer() {
            return this.mActionPlay;
        }
        /**
         * @desc    每帧被调用
         * @param   elapsedTime 上次调用以来经过的时间(秒)
         */
        frameMove(elapsedTime) {
            const owner = this.getCharacter();
            const curRotation = owner.getRotationRef();
            if (!curRotation.equals(this.mControlRotation)) {
                // 插值旋转,以达到平滑旋转的效果
                const newRotation = new Laya.Quaternion();
                let t = ACharacterController.mSmoothSpeed * elapsedTime;
                t = t > 1 ? 1 : t;
                Laya.Quaternion.slerp(curRotation, this.mControlRotation, t, newRotation);
                owner.setRotation(newRotation);
            }
            super.frameMove(elapsedTime);
            // 行为播放逻辑,注: 这段逻辑应该尽量放在最后,因为它会处理动作切换
            if (this.mActionPlay != null) {
                this.mActionPlay.frameMove(elapsedTime);
            }
        }
        /**
         * 设置控制的角色的世界方向
         * @param rotation 指定要设置的世界方向
         * @param immediately 指定是否立即设置过去,还是插值过去
         */
        setControlRotation(rotation, immediately) {
            if (!this.mControlRotation.equals(rotation)) {
                rotation.cloneTo(this.mControlRotation);
                if (immediately) {
                    this.getCharacter().setRotation(this.mControlRotation);
                }
            }
        }
        /**
         * 通过来自GS的离散方向值来设置朝向
         * @param direction 来自GS的方向.(0~8)个方向
         */
        setGSDirection(direction) {
            const rotation = Global.GetQuaternionByDir(direction);
            this.setControlRotation(rotation, true);
        }
        /**
         * 获取角色的世界方向
         */
        getControlRotation() {
            return this.mControlRotation;
        }
        /**
         * 面向给定坐标点(服务器坐标系)
         * @param targetX 指定要面向的坐标
         * @param targetY 指定要面向的坐标
         * @param immediately 指定是否立即设置过去,还是插值过去
         */
        faceToPoint(targetX, targetY, immediately) {
            const oldCoord = this.getControlPosition();
            if ((oldCoord.x - targetX) * (oldCoord.x - targetX) + (oldCoord.y - targetY) * (oldCoord.y - targetY) < 0.1 * 0.1) {
                return;
            }
            const rotate = new Laya.Quaternion();
            Laya.Quaternion.lookAt(new Laya.Vector3(oldCoord.x, 0, oldCoord.y), new Laya.Vector3(targetX, 0, targetY), Laya.Vector3.Up, rotate);
            this.setControlRotation(rotate, immediately);
        }
        /**
         * 面向给定的方向(世界坐标系)
         * @param faceDir 指定要面向的方向
         * @param immediately 指定是否立即设置过去,还是插值过去
         */
        faceToDir(faceDir, immediately) {
            const rotate = new Laya.Quaternion();
            Laya.Quaternion.rotationLookAt(faceDir, Laya.Vector3.Up, rotate);
            this.setControlRotation(rotate, immediately);
        }
        /**
         * 设置控制的角色的世界位置（服务器坐标系）
         * @param posX 指定要设置的位置坐标
         * @param posZ 指定要设置的位置坐标
         */
        setControlPosition(posX, posY) {
            this.getCharacter().setCoordinate(posX, posY);
        }
        /**
         * 返回控制的角色的世界位置(服务器坐标系)
         */
        getControlPosition() {
            return this.getCharacter().getCoordinate();
        }
        /** 返回二维平台坐标 */
        getControlPositionRef(outCoord) {
            this.getCharacter().getCoordinateRef(outCoord);
        }
        /**
         * 返回到给定目标点的2D距离的平方
         * @param cx 目标点的x(服务器坐标系)(厘米)
         * @param cy 目标点的y(服务器坐标系)(厘米)
         */
        get2DDistanceSq(cx, cy) {
            return this.getCharacter().get2DDistanceSq(cx, cy);
        }
        /**
         * 返回控制的角色的面向方向(服务器坐标系,单位向量)
         * 注: 频繁调用,会导致性能问题,因为底层会做大量数学计算
         */
        getControlForward() {
            return this.getCharacter().getForwardCoord();
        }
        /**
         * 处理来自服务器的动作表演
         * @param action 要表演的动作
         * @param targetX 目标坐标X(服务器坐标系)(如技能释放点?)
         * @param targetY 目标坐标Y(服务器坐标系)(如技能释放点?)
         * @param yAngle 角色面向的方向(360度)
         */
        serverRunAction(action, targetX, targetY, yAngle) {
            switch (action) {
                case GActions.Attack:
                    // 转向目标方向
                    this.faceToPoint(targetX, targetY);
                    // 切换到表演动作状态
                    this.SetState(Logic.EControllerStateId.ServerRunAction, { action: action }, true); // 表演状态需要强制重进入
                    break;
                case GActions.Stand:
                    this.SetState(Logic.EControllerStateId.Idling);
                    break;
                default:
                    Global.Log.Assert(false, `还有没处理的行为: ${action}`);
            }
        }
        /**
         * 释放占用的资源
         */
        destroy() {
            if (this.mActionPlay != null) {
                this.mActionPlay.destroy();
            }
            super.destroy();
        }
    }
    ACharacterController.mSmoothSpeed = 20;
    Logic.ACharacterController = ACharacterController;
    /**
     * 封装与玩家操作相关的逻辑，如控制移动
     */
    class APlayerController extends ACharacterController {
        constructor() {
            super();
            // 初始化控制器的状态
            const states = this.m_states;
            states[Logic.EControllerStateId.Dead] = new Logic.CharacterFsmState.Death();
            states[Logic.EControllerStateId.AutoPath] = new Logic.PlayerFsmState.AutoPath();
            states[Logic.EControllerStateId.ServerRunAction] = new Logic.PlayerFsmState.ServerRunActionState();
        }
        /** 返回绑定的玩家 */
        getPlayer() {
            return this.mOwner;
        }
    }
    Logic.APlayerController = APlayerController;
})(Logic || (Logic = {}));
//# sourceMappingURL=CharacterContoller.js.map