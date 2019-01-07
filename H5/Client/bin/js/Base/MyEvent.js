var Base;
(function (Base) {
    /**
    * 我们自己封装的事件类,带上强类型,方便使用
    * 注: 移除一个事件,可以使用返回MyEventAutoOff.off()函数,如果不想保存MyEventAutoOff对象, 也可以手动调用 MyEvent.off() 函数
    */
    class MyEvent {
        constructor(eventName, eventDispatcher) {
            this.mEventDispatcher = null;
            this.mEventDispatcher = eventDispatcher;
            this.mEventName = eventName;
        }
        /**
         * 派发事件
         * @param args	（可选）回调数据。必须与ListenerType函数中定义的参数相符
         */
        event(...args) {
            return this.mEventDispatcher.event(this.mEventName, args);
        }
        /**
         * 使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知。
         * @param caller	事件侦听函数的执行域。
         * @param listener	事件侦听函数。
         * @param args		（可选）事件侦听函数的回调参数。
         * @return 一个可以自动处理事件移除的对象
         */
        on(caller, listener) {
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
        once(type, caller, listener, args) {
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
        off(caller, listener, onceOnly) {
            this.mEventDispatcher.off(this.mEventName, caller, listener, onceOnly);
            return this;
        }
    }
    Base.MyEvent = MyEvent;
    /**
     * 包裹了事件的自动移除
     */
    class MyEventAutoOff {
        constructor(mMyEvent, caller, listener, once) {
            this.mMyEvent = mMyEvent;
            this.caller = caller;
            this.listener = listener;
            this.once = once;
        }
        /**
         * 移除绑定的监听事件
         */
        off() {
            this.mMyEvent.off(this.caller, this.listener, this.once);
        }
    }
    Base.MyEventAutoOff = MyEventAutoOff;
})(Base || (Base = {}));
//# sourceMappingURL=MyEvent.js.map