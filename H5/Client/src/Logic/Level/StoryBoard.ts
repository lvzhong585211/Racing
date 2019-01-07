namespace Logic {

    /** 封装自动寻路的的路径点 */
    export class ANode {
        public x: number;
        public y: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }

    /**
     * 故事板,实现对角色AI的管理,目前主要用作自动寻路用途
     */
    export class StoryBoard {
        private _PathIndex = 0;     // 当前的路径点索引
        private _CurrentX = 0;      // 当前坐标(2D坐标系)
        private _CurrentY = 0;      // 当前坐标(2D坐标系)
        private _Path: ANode[] = null;   // 保存使用的路径点列表
        private _CompletedState = false; // 是否已经结束了
        private _Started = false;
        private _Stopped = false;
        private _CellSizeX = 100;
        private _CellSizeY = 100;
        private _DestX = -1;
        private _DestY = -1;
        private _MovingSpeedPerSec = 600.0; // 移动速度(基础值)
        private mSpeedScale = 1.0;          // 移动速度的绽放系数,额外的参数主要是方便修改
        private mRealMoveSpeed = 1;         // 实时计算的真正的移动速度(厘米/秒)

        /**
         * 设置移动速度
         * @param speed 指定要设置的速度(厘米/秒)
         */
        public setMovingSpeed(speed: number): void {
            this._MovingSpeedPerSec = speed;
            this.mRealMoveSpeed = this._MovingSpeedPerSec * this.mSpeedScale;
        }

        /**
         * 
         * @param speedScale 指定要设置的移动速度绽放值,方便用来临时调整移动速度,如被冰冻后,移动速度降低效果
         */
        public setMovingScale(speedScale: number): void {
            this.mSpeedScale = speedScale;
            this.mRealMoveSpeed = this._MovingSpeedPerSec * this.mSpeedScale;
        }

        /**
         * 获取真正的移动速度(厘米/秒)
         */
        public getRealMoveSpeed(): number {
            return this.mRealMoveSpeed;
        }

        /**
         * 返回寻路是否已经结束了
         */
        public isCompleted(): boolean {
            return this._CompletedState;
        }

        /**
         * 返回当前的路径点索引
         */
        public getPathIndex(): number {
            return this._PathIndex;
        }

        /**
         * 返回在使用的路径点列表
         */
        public getPathNodes(): ANode[] {
            return this._Path;
        }

        /**
         * 开始沿路径走路
         * @param currentPos 指定角色初始坐标(2D坐标系)
         * @param path 使用的路径点
         * @param cellSizeX 格子的大小
         * @param cellSizeY 格子的大小
         * @param destX 目的地坐标(2D坐标系)
         * @param destY 目的地坐标(2D坐标系)
         */
        public start(startPos: Coord2D, path: ANode[], cellSizeX: number, cellSizeY: number, destX: number, destY: number): boolean {
            this._CellSizeX = cellSizeX;
            this._CellSizeY = cellSizeY;
            this._PathIndex = 0;

            this._CurrentX = startPos.x;
            this._CurrentY = startPos.y;

            this._Path = path;
            this._CompletedState = false;
            this._Started = true;
            this._Stopped = false;

            this._DestX = destX;
            this._DestY = destY;
            return true;
        }

        /**
         * 返回当前的坐标(2D坐标系)
         */
        public getCoordinate(): Coord2D {
            return new CellCoord(this._CurrentX, this._CurrentY);
        }

        /**
         * @desc    每帧被调用
         * @param   elapsedTime 上次调用以来经过的时间(秒)
         */
        public frameMove(elapsedTime: number): void {
            if (!this._Started)
                return;     // 还没开始,直接返回

            if (this._CompletedState) {
                return;     // 已经完成了,直接返回
            }

            this.mRealMoveSpeed = this._MovingSpeedPerSec * this.mSpeedScale;
            const toMoveDist = elapsedTime * this.mRealMoveSpeed;
            if (this.stepMove(toMoveDist)) {
                this._CompletedState = true;    // 寻路结束
            }
        }

        /**
         * 执行一次只处理一个节点内的单次迭代
         * @param toMoveDist 指定要移动的距离(厘米?)
         */
        private stepMove(toMoveDist: number): boolean {
            if (this._Stopped) {    // 已到最后一个目的地，则停下
                return true;
            }

            this._PathIndex = Math.min(this._PathIndex, this._Path.length - 1);

            // 本次迭代的目标点,默认取格子的中心. 注:以后也许加点随机点,以免角色总是走相同的路线
            let targetX = this._Path[this._PathIndex].x * this._CellSizeX + this._CellSizeX / 2;
            let targetY = this._Path[this._PathIndex].y * this._CellSizeY + this._CellSizeY / 2;

            const bLastNode = (this._PathIndex === this._Path.length - 1);

            // 如果是最后一个路径点,则直接取目标坐标
            if (bLastNode) {
                if (-1 !== this._DestX && -1 !== this._DestY) {
                    targetX = this._DestX;
                    targetY = this._DestY;
                }
            }

            const dx = targetX - this._CurrentX;
            const dy = targetY - this._CurrentY;
            const thisGridStepDistSQ = dx * dx + dy * dy;

            if (thisGridStepDistSQ > toMoveDist * toMoveDist) {
                // 没有跨格子,使用上面由移动速度计算出来的位移
                const thisGridStepDist = Math.sqrt(thisGridStepDistSQ);
                this._CurrentX += dx / thisGridStepDist * toMoveDist;
                this._CurrentY += dy / thisGridStepDist * toMoveDist;
                return false;
            }
            else if (bLastNode) {
                // 如果可以直接移动到当前的目标点,且是最后一个路径点了,则移动结束.
                this._CurrentX = targetX;
                this._CurrentY = targetY;
                return true;
            }

            this._PathIndex++;

            // 跨格子了,走到当前格子点就停止,下个迭代继续
            this._CurrentX += dx;
            this._CurrentY += dy;

            // 继续下一个格子的移动
            const thisGridStepDist = Math.sqrt(thisGridStepDistSQ);
            return this.stepMove(toMoveDist - thisGridStepDist);
        }

        /**
         * 停止寻路
         * @param stopIndex 如果>=0,则会移除这个位置的路径点,否则移除当前路径点之后的所有路径点
         * @return 返回停止的路径点索引
         */
        public stopOnNextGrid(stopIndex = -1): number {
            if (this._CompletedState) { // 已经完成
                return -1;
            }

            const _Path = this._Path;
            if (null == _Path) {
                return -1;
            }

            if (stopIndex >= 0) {
                if (stopIndex < _Path.length) {
                    _Path.splice(stopIndex, 1);
                }
                this._Stopped = true;

                return stopIndex;
            }

            if (this._PathIndex >= _Path.length - 1) {
                this._Stopped = true;
                return -1;
            }

            _Path.splice(this._PathIndex, (_Path.length - (this._PathIndex)));
            this._Stopped = true;
            return this._PathIndex;
        }
    }
}