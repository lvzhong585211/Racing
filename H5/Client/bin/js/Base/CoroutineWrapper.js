var Base;
(function (Base) {
    /**
     * 实现一个简单的基于帧运行的协程的封装,以简化协程的使用!
     * 注: 协程通过 Generator 来实现
     */
    class CoroutineWrapper {
        /**
         *
         * @param mLogicMain 协程函数. wrapper表示传入的协程封装者
         */
        constructor(mLogicMain) {
            this.mLogicMain = mLogicMain;
            this.mElapsedTime = 0; // 保存Tick函数上次调用以来经过的时间(秒)
            this.mLogicIterator = null; // 保存正在执行的逻辑的迭代器
            this.mIterValue = undefined; // 保存迭代的返回值
            this.mPause = false; // 此协程是否被暂停了
        }
        /**
         * 重置协程
         * 注: 第一次执行 exec() 函数前,必须要调用此函数
         */
        reset() {
            this.mIterValue = undefined;
            this.mLogicIterator = this.mLogicMain(this);
        }
        /**
         * 每帧调用,以便驱动协程的执行
         * @param elapsedTime 上次调用以来经过的时间(秒)
         */
        tick(elapsedTime) {
            this.mElapsedTime = elapsedTime;
            if (!this.mPause) {
                const ret = this.mLogicIterator.next(this.mIterValue);
                this.mIterValue = ret.value;
                if (ret.done) {
                    this.reset(); // 自动重新开始!
                }
                return ret.done;
            }
            return false;
        }
        /**
         * 等待一个异步函数结束
         * @param promiseToWait 要等待异步函数
         */
        static *waitPromise(promiseToWait) {
            let ret = null;
            let waitComplete = false;
            promiseToWait.then((value) => {
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
        *waitTime(waitSecond) {
            while (waitSecond > 0) {
                yield;
                waitSecond -= this.mElapsedTime;
            }
        }
        /**
         * 返回本次帧的流逝时间
         */
        elapsedTime() {
            return this.mElapsedTime;
        }
        Pause(pause) {
            if (this.mPause === pause) {
                return;
            }
            this.mPause = pause;
            if (!pause) {
                this.reset(); // 重新执行时需要重新获得执行入口
            }
        }
    }
    Base.CoroutineWrapper = CoroutineWrapper;
})(Base || (Base = {}));
//# sourceMappingURL=CoroutineWrapper.js.map