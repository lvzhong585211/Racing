namespace Base {
    /**
    * 我们自己封装的事件类,带上强类型,方便使用
    * 注: 移除一个事件,可以使用返回MyEventAutoOff.off()函数,如果不想保存MyEventAutoOff对象, 也可以手动调用 MyEvent.off() 函数
    */
    export class MyEvent<ListenerType extends Function> {
        private mEventDispatcher: Laya.EventDispatcher = null;
        private mEventName: string;
        public constructor(eventName: string, eventDispatcher: Laya.EventDispatcher) {
            this.mEventDispatcher = eventDispatcher;
            this.mEventName = eventName;
        }

        /**
         * 派发事件
         * @param args	（可选）回调数据。必须与ListenerType函数中定义的参数相符
         */
        public event(...args: any[]): boolean {
            return this.mEventDispatcher.event(this.mEventName, args);
        }

        /**
         * 使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知。         
         * @param caller	事件侦听函数的执行域。
         * @param listener	事件侦听函数。
         * @param args		（可选）事件侦听函数的回调参数。
         * @return 一个可以自动处理事件移除的对象
         */
        public on(caller: any, listener: ListenerType): MyEventAutoOff {
            this.mEventDispatcher.on(this.mEventName, caller, listener);
            return new MyEventAutoOff(this, caller, listener, false);
        }

        /**
         * 使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知，此侦听事件响应一次后自动移除。         
         * @param caller	事件侦听函数的执行域。
         * @param listener	事件侦听函数。
         * @param args		（可选）事件侦听函数的回调参数。
         * @return 一个可以自动处理事件移除的对象
         */
        public once(type: string, caller: any, listener: Function, args?: any[]): MyEventAutoOff {
            this.mEventDispatcher.once(this.mEventName, caller, listener);
            return new MyEventAutoOff(this, caller, listener, true);
        }

        /**
         * 从 EventDispatcher 对象中删除侦听器。
         * @param caller	事件侦听函数的执行域。
         * @param listener	事件侦听函数。
         * @param onceOnly	（可选）如果值为 true ,则只移除通过 once 方法添加的侦听器。
         * @return 此 MyEvent 对象。
         */
        public off(caller: any, listener: ListenerType, onceOnly?: boolean): MyEvent<ListenerType> {
            this.mEventDispatcher.off(this.mEventName, caller, listener, onceOnly);
            return this;
        }
    }

    /**
     * 包裹了事件的自动移除
     */
    export class MyEventAutoOff {
        public constructor(private mMyEvent: MyEvent<Function>, private caller: any, private listener: Function, private once: boolean) {
        }

        /**
         * 移除绑定的监听事件
         */
        public off() {
            this.mMyEvent.off(this.caller, this.listener, this.once);
        }
    }
}