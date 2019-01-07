namespace Logic {
    /**
     * 定义角色控制器的基类
     */
    export class ACharacterController extends Logic.AController {
        protected mActionPlay: CharacterActionPlay = null;           // 角色的行为(动作)播放器
        protected mControlRotation = new Laya.Quaternion();         // 目标方向,有可能会与角色的实际方向有差别,角色的方向会慢慢转向它

        public constructor() {
            super();

            const states = this.m_states;
            states[EControllerStateId.Idling] = new CharacterFsmState.Idling();
        }

        /**
         * 自动寻路到目标点
         * @param mapCode 目标点所在的关卡Id
         * @param pos 目标点坐标
         * @param offset 指定离目标点多远可以停止或执行后续动作
         * @param extActionType 指定到达目标点后执行的动作
         */
        public autoFindRoad(mapCode: number, pos: Laya.Point, offset: number, extActionInfo: IExtActionInfo): void {

        }

        /**
         * 设置绑定的角色
         * 注:正常来讲只允许绑定一次,多次绑定目前还没实现
         */
        public setOwner(character: Character<ActorState.CharacterBase>) {
            super.setOwner(character);
            character.setController(this);

            this.mControlRotation = character.getRotation();   // 获取角色当前的朝向

            // to do ... 设置位置与朝向?
        }

        /**
         * 返回绑定的角色
         */
        public getCharacter(): Character<ActorState.CharacterBase> {
            Global.Log.Assert(this.mOwner instanceof Character);
            return this.mOwner as Character<ActorState.CharacterBase>;
        }

        /**
        * 设置行为播放器类型
        * @param actionPlayType 指定要设置的行为播放器的类型
        * 注: 此函数必须在setOwner()函数之后调用
        */
        public setActionPlayType(actionPlayType: typeof CharacterActionPlay): void {
            Global.Log.Assert(this.mOwner instanceof Character);
            this.mActionPlay = new actionPlayType(this.mOwner as Character<ActorState.CharacterBase>);
        }

        /**
         * 获取行为播放器
         */
        public getActionPlayer(): CharacterActionPlay {
            return this.mActionPlay;
        }

        private static readonly mSmoothSpeed = 20;

        /**
         * @desc    每帧被调用
         * @param   elapsedTime 上次调用以来经过的时间(秒)
         */
        public frameMove(elapsedTime: number): void {
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
        public setControlRotation(rotation: Laya.Quaternion, immediately?: boolean) {
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
        public setGSDirection(direction: number): void {
            const rotation = Global.GetQuaternionByDir(direction);
            this.setControlRotation(rotation, true);
        }

        /**
         * 获取角色的世界方向
         */
        public getControlRotation(): Laya.Quaternion {
            return this.mControlRotation;
        }

        /**
         * 面向给定坐标点(服务器坐标系)
         * @param targetX 指定要面向的坐标
         * @param targetY 指定要面向的坐标
         * @param immediately 指定是否立即设置过去,还是插值过去
         */
        public faceToPoint(targetX: number, targetY: number, immediately?: boolean): void {
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
        public faceToDir(faceDir: Laya.Vector3, immediately?: boolean): void {
            const rotate = new Laya.Quaternion();
            Laya.Quaternion.rotationLookAt(faceDir, Laya.Vector3.Up, rotate);
            this.setControlRotation(rotate, immediately);
        }

        /**
         * 设置控制的角色的世界位置（服务器坐标系）
         * @param posX 指定要设置的位置坐标
         * @param posZ 指定要设置的位置坐标
         */
        public setControlPosition(posX: number, posY: number) {
            this.getCharacter().setCoordinate(posX, posY);
        }

		/**
		 * 返回控制的角色的世界位置(服务器坐标系)
		 */
        public getControlPosition(): Laya.Point {
            return this.getCharacter().getCoordinate();
        }

        /** 返回二维平台坐标 */
        public getControlPositionRef(outCoord: Laya.Point): void {
            this.getCharacter().getCoordinateRef(outCoord);
        }

        /**
         * 返回到给定目标点的2D距离的平方
         * @param cx 目标点的x(服务器坐标系)(厘米)
         * @param cy 目标点的y(服务器坐标系)(厘米)
         */
        public get2DDistanceSq(cx: number, cy: number): number {
            return this.getCharacter().get2DDistanceSq(cx, cy);
        }

        /**
         * 返回控制的角色的面向方向(服务器坐标系,单位向量)
         * 注: 频繁调用,会导致性能问题,因为底层会做大量数学计算
         */
        public getControlForward(): Laya.Point {
            return this.getCharacter().getForwardCoord();
        }

        /**
         * 处理来自服务器的动作表演         
         * @param action 要表演的动作
         * @param targetX 目标坐标X(服务器坐标系)(如技能释放点?)
         * @param targetY 目标坐标Y(服务器坐标系)(如技能释放点?)
         * @param yAngle 角色面向的方向(360度)
         */
        public serverRunAction(action: GActions, targetX: number, targetY: number, yAngle: number): void {
            switch (action) {
                case GActions.Attack:
                    // 转向目标方向
                    this.faceToPoint(targetX, targetY);

                    // 切换到表演动作状态
                    this.SetState(EControllerStateId.ServerRunAction, { action: action }, true);    // 表演状态需要强制重进入
                    break;

                case GActions.Stand:
                    this.SetState(EControllerStateId.Idling);
                    break;

                default:
                    Global.Log.Assert(false, `还有没处理的行为: ${action}`);
            }

        }

        /**
         * 释放占用的资源
         */
        public destroy() {
            if (this.mActionPlay != null) {
                this.mActionPlay.destroy();
            }
            super.destroy();
        }
    }

    /**
     * 封装与玩家操作相关的逻辑，如控制移动
     */
    export class APlayerController extends ACharacterController {

        public constructor() {
            super();

            // 初始化控制器的状态
            const states = this.m_states;
            states[EControllerStateId.Dead] = new CharacterFsmState.Death();
            states[EControllerStateId.AutoPath] = new PlayerFsmState.AutoPath();
            states[EControllerStateId.ServerRunAction] = new PlayerFsmState.ServerRunActionState();
        }

        /** 返回绑定的玩家 */
        public getPlayer(): Player {
            return this.mOwner as Player;
        }
    }
}