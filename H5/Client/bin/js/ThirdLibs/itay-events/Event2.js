var ItayEvent;
(function (ItayEvent) {
    class Event2 {
        constructor() {
            this.listeners = new Set();
            this.listenerToOnceCallback = Symbol();
            this.trigger1 = (arg1, arg2) => {
                this.triggerListener(this.listener1, arg1, arg2);
            };
            this.trigger2 = (arg1, arg2) => {
                this.triggerListener(this.listener1, arg1, arg2);
                this.triggerListener(this.listener2, arg1, arg2);
            };
            this.triggerMany = (arg1, arg2) => {
                this.listeners.forEach(listener => this.triggerListener(listener, arg1, arg2));
            };
            this.updateTrigger();
        }
        add(listener) {
            this.listeners.add(listener);
            this.updateTrigger(listener);
        }
        addOnce(listener) {
            let callback = (a, b) => {
                this.remove(listener);
                listener(a, b);
            };
            listener[this.listenerToOnceCallback] = callback;
            this.add(callback);
        }
        remove(listener) {
            let onceCallback = listener[this.listenerToOnceCallback];
            let isRemoved;
            if (onceCallback) {
                isRemoved = this.listeners.delete(onceCallback);
                delete listener[this.listenerToOnceCallback];
            }
            else {
                isRemoved = this.listeners.delete(listener);
            }
            if (isRemoved) {
                this.updateTrigger();
            }
            return isRemoved;
        }
        hasListeners() {
            return this.listeners.size > 0;
        }
        updateTrigger(listener) {
            if (this.listeners.size == 0) {
                this.trigger = this.triggerNone;
            }
            else if (this.listeners.size == 1) {
                this.trigger = this.trigger1;
                this.listener1 = listener || this.listeners.values().next().value;
            }
            else if (this.listeners.size == 2) {
                this.trigger = this.trigger2;
                let iterator = this.listeners.values();
                this.listener1 = iterator.next().value;
                this.listener2 = iterator.next().value;
            }
            else {
                this.trigger = this.triggerMany;
            }
        }
        triggerNone(arg1, arg2) {
        }
        triggerListener(listener, arg1, arg2) {
            try {
                listener.call(undefined, arg1, arg2);
            }
            catch (error) {
                if (error instanceof Error)
                    console.error(`Error thrown from event listener. Message: ${error.message}\nStack: ${error.stack}`);
                else
                    console.error(`Error thrown from event listener. Reason: ${JSON.stringify(error)}`);
            }
        }
    }
    ItayEvent.Event2 = Event2;
})(ItayEvent || (ItayEvent = {}));
//# sourceMappingURL=Event2.js.map