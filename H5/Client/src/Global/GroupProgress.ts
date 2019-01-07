namespace Global {
    /**
     * 封装成组的进度更新
     * 注： 一定不要忘记调用 destroy() 来释放占用的资源，否则会导致内在泄漏
     */
    export class GroupProgress {
        private progressValue: number[] = [];            // 各个进度当前的值
        private weights: number[] = [];                 // 保存各个进度的权重
        private handlers: Laya.Handler[] = [];          // 保存对应进度的更新的响应
        private mOnProgress: Function | Laya.Handler;   // 保存进度更新的回调函数

        private static mUseCount: number = 0;            // 用来检测是否有忘记释放的实例的计数

        /**
         * 检测是否有内存泄漏。注：仅供 ModeManager 访问
         */
        public static checkMemoryLeak(): boolean {
            if (GroupProgress.mUseCount > 2) {
                Global.Log.Assert(false);
                return true;
            }
            return false;
        }

        /**
         * @param weights 指定各个进度的比重。加起来可以不等于1，内部会自动进行归一处理
         * @param onProgress 用来处理进度的更新
         */
        public constructor(weights: number[], onProgress: Function | Laya.Handler) {
            GroupProgress.mUseCount++;

            this.progressValue.length = weights.length;
            this.progressValue.fill(0);

            let total = 0;
            weights.forEach(value => total += value);

            this.weights.length = weights.length;
            for (let index = this.weights.length - 1; index >= 0; index--) {
                this.weights[index] = weights[index] / total;
                this.handlers[index] = Laya.Handler.create(this, this._onProgress, [index], false);
            }

            this.mOnProgress = onProgress;
        }

        /**
         * 必须调用此函数来释放占用的句柄
         */
        public destroy() {
            GroupProgress.mUseCount--;
            this.handlers.forEach(hander => hander.recover());
            this.handlers = null;
            this.mOnProgress = null;
            this.weights = null;
            this.progressValue = null;
        }

        /**
         * 内部调用，用来更新进度
         * @param index
         * @param progress
         */
        private _onProgress(index: number, progress: number) {
            let total = 0;
            this.progressValue[index] = progress;
            this.progressValue.forEach((value, index) => total += this.weights[index] * value);

            if (this.mOnProgress instanceof Laya.Handler)
                this.mOnProgress.runWith(total);
            else
                this.mOnProgress(total);
        }

        /**
         * 返回进度处理的响应函数
         * @param index 指定要获取的响应函数
         */
        public getProgressHandler(index: number) {
            Global.Log.Assert(index < this.handlers.length);
            return this.handlers[index];
        }

    }
}