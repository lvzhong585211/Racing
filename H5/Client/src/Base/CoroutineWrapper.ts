namespace Base {
    /**
     * 实现一个简单的基于帧运行的协程的封装,以简化协程的使用!
     * 注: 协程通过 Generator 来实现
     */
    export class CoroutineWrapper {
        protected mElapsedTime: number = 0;     // 保存Tick函数上次调用以来经过的时间(秒)
        private mLogicIterator: IterableIterator<any> = null;   // 保存正在执行的逻辑的迭代器
        private mIterValue: any = undefined;     // 保存迭代的返回值
        private mPause: boolean = false;        // 此协程是否被暂停了

        /**
         * 
         * @param mLogicMain 协程函数. wrapper表示传入的协程封装者
         */
        constructor(private mLogicMain: (wrapper: CoroutineWrapper) => IterableIterator<any>) {
        }

        /**
         * 重置协程
         * 注: 第一次执行 exec() 函数前,必须要调用此函数
         */
        public reset(): void {
            this.mIterValue = undefined;
            this.mLogicIterator = this.mLogicMain(this);
        }

        /**
         * 每帧调用,以便驱动协程的执行
         * @param elapsedTime 上次调用以来经过的时间(秒)
         */
        public tick(elapsedTime: number): boolean {
            this.mElapsedTime = elapsedTime;
            if (!this.mPause) {
                const ret = this.mLogicIterator.next(this.mIterValue);
                this.mIterValue = ret.value;
                if (ret.done) {
                    this.reset();   // 自动重新开始!
                }
                return ret.done;
            }
            return false;
        }

        /**
         * 等待一个异步函数结束
         * @param promiseToWait 要等待异步函数
         */
        public static *waitPromise<T>(promiseToWait: Promise<T>): IterableIterator<T> {
            let ret: T = null;
            let waitComplete = false;
            promiseToWait.then((value: T) => {
                ret = value;
                waitComplete = true;
            });

            while (!waitComplete) {
                yield;
            }

            return ret;
        }

        /**
         * 等待指定的时间(秒)
         * @param waitSecond 等待的时间(秒)
         */
        public *waitTime(waitSecond: number) {
            while (waitSecond > 0) {
                yield;
                waitSecond -= this.mElapsedTime;
            }
        }

        /**
         * 返回本次帧的流逝时间
         */
        public elapsedTime(): number {
            return this.mElapsedTime;
        }

        public Pause(pause: boolean): void {
            if (this.mPause === pause) {
                return;
            }

            this.mPause = pause;
            if (!pause) {
                this.reset();   // 重新执行时需要重新获得执行入口
            }
        }
    }
}