var Logic;
(function (Logic) {
    let Enum_CameraTrackEffect;
    (function (Enum_CameraTrackEffect) {
        Enum_CameraTrackEffect[Enum_CameraTrackEffect["normal"] = 0] = "normal";
        Enum_CameraTrackEffect[Enum_CameraTrackEffect["movie_skeleton"] = 1] = "movie_skeleton";
        Enum_CameraTrackEffect[Enum_CameraTrackEffect["movie_skeleton_FadeOut"] = 2] = "movie_skeleton_FadeOut";
        Enum_CameraTrackEffect[Enum_CameraTrackEffect["movie_skeleton_NoFadeOut"] = 3] = "movie_skeleton_NoFadeOut";
        Enum_CameraTrackEffect[Enum_CameraTrackEffect["moive_skeleton_pos"] = 4] = "moive_skeleton_pos";
        Enum_CameraTrackEffect[Enum_CameraTrackEffect["moive_skeleton_pos_vertical"] = 5] = "moive_skeleton_pos_vertical";
        Enum_CameraTrackEffect[Enum_CameraTrackEffect["fly"] = 6] = "fly";
        Enum_CameraTrackEffect[Enum_CameraTrackEffect["vedio"] = 7] = "vedio";
    })(Enum_CameraTrackEffect = Logic.Enum_CameraTrackEffect || (Logic.Enum_CameraTrackEffect = {}));
    /**
     * 实现一个RPG的摄像机. 目前是2.5D上帝视角
     */
    class RPGCamera extends Laya.Camera {
        constructor() {
            super(...arguments);
            this.Collides = false; // 摄像机是否与场景中的建筑产生碰撞
            this.Follow = false; // 摄像机是否会随着父对象旋转
            this.Zoom = false; // 摄像机是否允许拉远或拉近
            this.FollowFixed = false; // Determines if the camera orientation can be controlled by the user.
            this.InitialYaw = Laya.Utils.toRadian(45); // 摄像机水平旋转角度Yaw(弧度)
            this.InitialPitch = Laya.Utils.toRadian(30); // 摄像机的上下旋转角度Pitch(弧度)
            this.MinimumPitch = Laya.Utils.toRadian(-89); // 最小的Pitch(弧度)
            this.MaximumPitch = Laya.Utils.toRadian(89); // 最大的Pitch(弧度)
            this.CameraDistance = 5; // 摄像机到目标的初始距离(米)
            this.MinimalDistance = 2; // 摄像机到目标的最小距离(米)
            this.MaximalDistance = 10; // 摄像机到目标的最大距离(米)
            this.RelativeLookAtHeight = 0.65; // 摄像机看向目标的相对高度(米)
            this.Stiffness = 0; // Controlls how tight the camera sticks to the position it's trying to get to
            this.CameraSensitivity = 2; // 摄像机移动的灵敏度
            this.MoveSmoothness = 0.05; // 摄像机移动的平滑度
            this.m_eCameraTrackEffect = Enum_CameraTrackEffect.normal; // 摄像机的模式
            this.m_vRigVelocity = new Global.Vector3(); // < The velocity the camera is moving at to reach the destination
            this.mTarget = null; // 要追踪的目标
            this.Enabled = false; // 摄像机是否是激活状态
            this.m_vOldLookAt = Laya.Vector3.ZERO.clone(); // Position of owner in last update (needed for ease in/out)
            this.m_vOldBaseOri = Laya.Vector3.ZERO.clone(); // Orientation of owner in last update.
            this.m_vOffsetOri = Laya.Vector3.ZERO.clone(); // Accumulated orientation change made by the user.
            this.m_fCurrentDistance = 0;
            this.m_bSkipSmooth = true; // 是否需要开启平滑过度效果
            this._rotation = new Laya.Quaternion(); // 缓冲,提升性能用
        }
        /**
         * 设置要追踪的目标
         * @param target 指定要追踪的目标
         */
        setTarget(target) {
            this.mTarget = target;
        }
        SetEnabled(bStatus) {
            if (this.Enabled === bStatus)
                return;
            this.Enabled = bStatus;
            if (bStatus) {
                this.Enable();
            }
            else
                this.Disable();
        }
        /**
         * 立即移动到追踪的目标位置
         */
        teleport() {
            this.m_vOffsetOri.toDefault();
            this.updateCamera_Orientation(0, 0, 1);
            this.m_vOldLookAt = this.ComputeCenterPosition();
            this.m_vOldBaseOri = this.ComputeBaseOrientation();
            this.m_fCurrentDistance = this.CameraDistance;
            this.CameraDistance = this.m_fCurrentDistance =
                Global.clamp(this.CameraDistance, this.MinimalDistance, this.MaximalDistance);
            const vNewLookAt = this.m_vOldLookAt;
            const fCurrentDistance = this.updateCamera_Distance(0, vNewLookAt);
            const vNewTargetPosition = Laya.Vector3.ZERO.clone();
            this.UpdateCamera_TargetPosAffector(vNewTargetPosition, vNewLookAt, fCurrentDistance);
            this.transform.position = vNewTargetPosition;
        }
        Enable() {
            this.teleport();
            // 开启帧逻辑函数
            // this.frameLoop(1, this, this.ProcessInput);
        }
        Disable() {
            // 禁止帧逻辑函数
            // this.clearTimer(this, this.ProcessInput);
        }
        /**
         * 帧逻辑的主入口
         */
        ProcessInput() {
            switch (this.m_eCameraTrackEffect) {
                case Enum_CameraTrackEffect.normal:
                    this.UpdateCameraTrack_Normal(this.Stiffness);
                    break;
            }
        }
        /**
         * 设置摄像机的旋转
         * @param orientation 指定要设置的旋转方向
         */
        setOrientation(orientation) {
            Laya.Quaternion.createFromYawPitchRoll(orientation.x, orientation.y, orientation.z, this._rotation);
            this.transform.rotation = this._rotation;
        }
        UpdateCameraTrack_Normal(fStiffness) {
            const fStepX = 0;
            const fStepY = 0;
            const fStepZoom = 0;
            let fWeight = 1;
            if (this.MoveSmoothness > 0.001) {
                fWeight = Global.getDeltaTime() / this.MoveSmoothness;
                fWeight = Global.clamp(fWeight, 0.001, 1);
            }
            this.UpdateCamera(fStepX, fStepY, fStepZoom, fWeight, fStiffness);
        }
        /**
         * 计算摄像机看向的目标点位置
         */
        ComputeCenterPosition() {
            if (!this.mTarget) {
                return Laya.Vector3.ZERO.clone();
            }
            let fLookAtHeight = this.RelativeLookAtHeight;
            if (this.mTarget instanceof Logic.Player) {
                fLookAtHeight += this.mTarget.GetMountHeight();
            }
            const vPos = this.mTarget.getPosition();
            vPos.y += fLookAtHeight;
            return vPos;
        }
        ComputeBaseOrientation() {
            const vBaseOri = Laya.Vector3.ZERO.clone();
            if (this.mTarget && this.Follow) {
                const orientation = this.mTarget.getRotation();
                orientation.getYawPitchRoll(vBaseOri);
            }
            vBaseOri.x += this.InitialYaw;
            vBaseOri.y += this.InitialPitch;
            vBaseOri.y = Global.clamp(vBaseOri.y, this.MinimumPitch, this.MaximumPitch);
            return vBaseOri;
        }
        /**
         * 更新摄像机的朝向
         * @param fYawStep
         * @param fPitchStep
         * @param fWeight
         */
        updateCamera_Orientation(fYawStep, fPitchStep, fWeight) {
            // Smoothen look-at position and base orientation.
            const vNewBaseOri = this.ComputeBaseOrientation();
            const m_vOldBaseOri = this.m_vOldBaseOri;
            // Set blended orientation (YAW).
            let fDiffAngle = vNewBaseOri.x - m_vOldBaseOri.x;
            // Make sure angle is in between [-180, 180] degrees.
            while (fDiffAngle > Math.PI)
                fDiffAngle -= Global.PI2;
            while (fDiffAngle < -Math.PI)
                fDiffAngle += Global.PI2;
            vNewBaseOri.x = m_vOldBaseOri.x + fDiffAngle * fWeight;
            // Set blended orientation (PITCH).
            vNewBaseOri.y = m_vOldBaseOri.y + (vNewBaseOri.y - m_vOldBaseOri.y) * fWeight;
            // Store user orientation offset separately. It will not be smoothed.
            const m_vOffsetOri = this.m_vOffsetOri;
            if (!this.FollowFixed) {
                m_vOffsetOri.x -= fYawStep;
                m_vOffsetOri.y += fPitchStep;
            }
            const vNewOri = new Laya.Vector3();
            Laya.Vector3.add(m_vOffsetOri, vNewBaseOri, vNewOri);
            vNewOri.y = Global.clamp(vNewOri.y, this.MinimumPitch, this.MaximumPitch);
            // Rectify user pitch after clamping.
            m_vOffsetOri.y = vNewOri.y - vNewBaseOri.y;
            // Set final camera orientation.
            this.setOrientation(vNewOri);
            this.m_vOldBaseOri = vNewBaseOri;
        }
        /**
         * 更新摄像机与摄像机看向点的距离
         * @param fZoomStep
         * @param vNewLookAt
         */
        updateCamera_Distance(fZoomStep, vNewLookAt) {
            // Update distance, zoom is taken into account quadratically.
            const fCurrentZoom = Math.sqrt(this.CameraDistance) + fZoomStep;
            const bSkipClamp = false;
            if (this.m_eCameraTrackEffect === Enum_CameraTrackEffect.moive_skeleton_pos) {
                // calculate distance between bone world pos and player pos 
                // hkvVec3 bonePos(0, 0, 0);
                // hkvVec3 playerPos = ComputeCenterPosition();
                // GetBoneWorldPos(bonePos, s_strBoneName);
                // hkvVec3 vLen = bonePos - playerPos;
                // float fDistance = vLen.getLength();
                // CameraDistance = fDistance;
            }
            if (!bSkipClamp) {
                this.CameraDistance = Global.clamp(fCurrentZoom * fCurrentZoom, this.MinimalDistance, this.MaximalDistance);
            }
            // #if defined(WIN32) && defined(SUPPORTS_MOUSE)
            //// Smooth zooming on PC.
            // 	const float fZoomWeight = hkvMath::saturate(Vision::GetTimer()->GetTimeDifference() * 15.0f);
            // m_fCurrentDistance = hkvMath::interpolate(m_fCurrentDistance, CameraDistance, fZoomWeight);
            // #else
            this.m_fCurrentDistance = this.CameraDistance;
            // #endif
            // Store local copy for collision detection.
            let fCurrentDistance = this.m_fCurrentDistance;
            // Check for collision (camera with geometry).
            if (this.Collides) {
                fCurrentDistance = this.ComputeCollisionDistance(vNewLookAt, fCurrentDistance);
            }
            return fCurrentDistance;
        }
        ComputeCollisionDistance(vLookAtPos, fCameraDistance) {
            // to do ... 还没有实现
            Global.Log.Assert(false);
            return 0;
        }
        /**
         * Affect camera target position by kinds of requirement
         * @param vNewTargetPostion the return camera target position
         * @param vNewLookAt camera look at position
         * @param fCurrentDistance the distance camera from owner's pos
         * @return true	- skip smooth logic
         */
        UpdateCamera_TargetPosAffector(vNewTargetPostion, vNewLookAt, fCurrentDistance) {
            // vNewTargetPostion = vNewLookAt - m_spCameraProxy ->GetDirection() * fCurrentDistance;	// 新的目标位置
            const dir = new Laya.Vector3();
            Laya.Vector3.scale(this.transform.forward, fCurrentDistance, dir);
            Laya.Vector3.subtract(vNewLookAt, dir, vNewTargetPostion);
            if (this.Collides) {
                return true;
            }
            /*
            if (m_eCameraTrackEffect == moive_skeleton_pos_vertical) {
                hkvVec3 bonePos(0, 0, 0);
                GetBoneObjectPos(bonePos, s_strBoneName);

                //与第一帧动作的offset
                float fVertialOffset = bonePos.z - m_vOldBoneObjectPos.z;
                vNewTargetPostion.z += fVertialOffset;

                #ifdef _DEBUG
                //hkvLog::Info("UpdateCameraTrack_MoiveSkeletonPosVertical,newTargetPos(%f,%f,%f),verticalOffset(%f)", vNewTargetPostion.x, vNewTargetPostion.y, vNewTargetPostion.z, fVertialOffset);
                //VisBaseEntity_cl* pOwnerEntity = vstatic_cast<VisBaseEntity_cl*>(GetOwner());
                //hkvVec3 vPos = pOwnerEntity->GetPosition();
                //hkvLog::Info("UpdateCameraTrack_MoiveSkeletonPosVertical,pOwnerEntity Pos(%f,%f,%f)", vPos.x, vPos.y, vPos.z);
                #endif
            }
            */
            return false;
        }
        UpdateCamera_RealSmoothPos(vRealCameraPos, vOldPosition, vNewTargetPostion, fStiffness) {
            // 计算弹簧摄像机的位置
            let vCameraPos = vNewTargetPostion.clone();
            do {
                if (fStiffness < 0.0001 || Laya.Vector3.equals(vOldPosition, vNewTargetPostion))
                    break;
                if (Laya.Vector3.distanceSquared(vOldPosition, vNewTargetPostion) < 0.1 * 0.1)
                    break;
                vCameraPos = Global.SmoothDamp(vOldPosition, vNewTargetPostion, this.m_vRigVelocity, fStiffness);
            } while (false);
            vCameraPos.cloneTo(vRealCameraPos);
        }
        // Camera Update Step (called each frame in OnHandleCallback) 
        UpdateCamera(fYawStep, fPitchStep, fZoomStep, fWeight, fStiffness) {
            if (!this.mTarget)
                return;
            // ==================================================
            // 1. orientation part
            // ==================================================
            this.updateCamera_Orientation(fYawStep, fPitchStep, fWeight);
            // ==================================================
            // 2. postion part
            // note: LookAt变量的作用在于根据playerpos和摄像机朝向参数，反推出摄像机位置
            // ==================================================
            // Get position of entity
            const vNewLookAt = this.ComputeCenterPosition();
            // Set blended position.
            Laya.Vector3.lerp(this.m_vOldLookAt, vNewLookAt, fWeight, vNewLookAt);
            const pos = this.transform.position; // 记录一下旧的位置
            const vOldPosition = new Global.Vector3(pos.x, pos.y, pos.z);
            this.m_vOldLookAt = vNewLookAt.clone();
            // =========================================================================
            // 2.1. camera distance
            // =========================================================================
            const fCurrentDistance = this.updateCamera_Distance(fZoomStep, vNewLookAt);
            // =========================================================================
            // 2.2. affector camera's target pos 
            // =========================================================================
            const vNewTargetPosition = new Global.Vector3();
            const bSkipSmooth = this.UpdateCamera_TargetPosAffector(vNewTargetPosition, vNewLookAt, fCurrentDistance);
            // =========================================================================
            // 2.3. smooth real camera pos, or skip smooth logic 
            // =========================================================================
            const vRealCameraPos = vNewTargetPosition;
            if (!bSkipSmooth && this.m_bSkipSmooth) {
                this.UpdateCamera_RealSmoothPos(vRealCameraPos, vOldPosition, vNewTargetPosition, fStiffness);
            }
            // Set final camera position.
            this.transform.position = vRealCameraPos;
        }
    }
    Logic.RPGCamera = RPGCamera;
})(Logic || (Logic = {}));
//# sourceMappingURL=RPGCamera.js.map