namespace Logic {
    /**
     * 封装角色行为播放的逻辑
     */
    export class CharacterActionPlay {
        private mNextAction: GActions = GActions.Stand;      // 下一个要播放的行为
        private mPlayRate: number = 1;                       // 指定播放速率
        private mCurAction: GActions = GActions.None;        // 当前的正在播放的行为
        private mOwner: ICharacter = null;                   // 拥有者

        constructor(owner: ICharacter) {
            this.mOwner = owner;
        }

        /**
         * 获得当前正在播放的行为
         */
        public getCurAtion() {
            return this.mCurAction;
        }

        /**
         * 播放指定的行为
         * @param action 指定要播放的行为
         * @param playRate 指定播放速率
         * @param forceRestart 指定如果当前正在播放指定的行为,是否强制重新播放行为?
         */
        public playAction(action: GActions, playRate?: number, forceRestart: boolean = false): void {
            if (this.mNextAction === action) {
                return;     // 已经在准备播放此动作了,直接返回       
            }

            this.mNextAction = action;
            if (playRate) {
                this.mPlayRate = playRate;
            }

            if (this.mCurAction === action && forceRestart === false) {
                this.mNextAction = GActions.None;    // 行为相同,不需要重新播放
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
            return this.mOwner.onAniStop(caller, listener, args);
        }

        /**
         * 停止监听动作播放完成的事件. 应该与 onAniStop() 函数中传入的参数对应!
         * @param caller 回调函数拥有者
         * @param listener 回调函数
         */
        public offAniStop(caller: any, listener: Function): Laya.EventDispatcher {
            return this.mOwner.offAniStop(caller, listener);
        }

        /**
         * 
         * @param action 指定要设置速率的行为
         * @param playRate 指定要设置的行为播放速率
         */
        public updatePlayRate(action: GActions, playRate: number): void {
            if (this.mCurAction !== action) {
                return;
            }

            this.mPlayRate = playRate;
            this.mOwner.setPlaybackRate(playRate);
        }

        /**
         * @desc    每帧被调用
         * @param   elapsedTime 上次调用以来经过的时间(秒)
         */
        public frameMove(elapsedTime: number): void {
            if (this.mNextAction !== GActions.None) {
                const aniName = this.getAnimationName(this.mNextAction);
                if (aniName != null) {
                    this.mOwner.playAni(aniName, this.mPlayRate);
                }
                this.mCurAction = this.mNextAction;
                this.mNextAction = GActions.None;
            }
        }

        /**
         * 获取给定行为对应的名称
         * @param action 指定要获取动作名称的行为
         */
        public getAnimationName(action: GActions): string {
            switch (action) {
                case GActions.Stand:
                    return "Stand";
                case GActions.Run:
                case GActions.Walk:
                    return "Walk";
                case GActions.Attack:
                    return "Attack";
                case GActions.Death:
                    return "Die";
                default:
                    return null;
            }
        }

        /**
         * 释放占用的资源
         */
        public destroy() {

        }
    }

    /**
     * 玩家的行为动作播放
     */
    export class PlayerActionPlay extends CharacterActionPlay {
        constructor(owner: ICharacter) {
            super(owner);
        }

        /**
         * 获取给定行为对应的名称
         * @param action 指定要获取动作名称的行为
         */
        public getAnimationName(action: GActions): string {
            switch (action) {
                case GActions.Stand:
                    return "KStand";
                case GActions.Walk:
                case GActions.Run:
                    return "KRun";
                case GActions.Attack1:
                    return "KAttack01";
                case GActions.Attack2:
                    return "KAttack02";
                case GActions.Attack3:
                    return "KAttack03";
                case GActions.Attack4:
                    return "KAttack04";
                case GActions.Attack5:
                    return "KAttack05";

                default:
                    return super.getAnimationName(action);
            }
        }
    }
}