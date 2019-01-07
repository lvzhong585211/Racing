
namespace ItayEvent {
	export class Event2<T1, T2> implements SignableEvent2<T1, T2>, TriggerableEvent2<T1, T2> {
		private listeners = new Set<Listener2<T1, T2>>();
		private listener1: Listener2<T1, T2>;
		private listener2: Listener2<T1, T2>;
		private listenerToOnceCallback = Symbol();

		public trigger: (arg1: T1, arg2: T2) => void;

		constructor() {
			this.updateTrigger();
		}

		public add(listener: Listener2<T1, T2>): void {
			this.listeners.add(listener);
			this.updateTrigger(listener);
		}

		public addOnce(listener: Listener2<T1, T2>): void {
			let callback = (a: T1, b: T2) => {
				this.remove(listener);
				listener(a, b);
			};

			(listener as any)[this.listenerToOnceCallback] = callback;

			this.add(callback);
		}

		public remove(listener: Listener2<T1, T2>): boolean {
			let onceCallback = (listener as any)[this.listenerToOnceCallback];
			let isRemoved;

			if (onceCallback) {
				isRemoved = this.listeners.delete(onceCallback);
				delete (listener as any)[this.listenerToOnceCallback];
			}
			else {
				isRemoved = this.listeners.delete(listener);
			}

			if (isRemoved) {
				this.updateTrigger();
			}

			return isRemoved;
		}

		public hasListeners(): boolean {
			return this.listeners.size > 0;
		}

		private updateTrigger(listener?: Listener2<T1, T2>): void {
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

		private triggerNone(arg1: T1, arg2: T2): void {
		}

		private triggerListener(listener: Listener2<T1, T2>, arg1: T1, arg2: T2): void {
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

		private trigger1 = (arg1: T1, arg2: T2) => {
			this.triggerListener(this.listener1, arg1, arg2);
		}

		private trigger2 = (arg1: T1, arg2: T2) => {
			this.triggerListener(this.listener1, arg1, arg2);
			this.triggerListener(this.listener2, arg1, arg2);
		}

		private triggerMany = (arg1: T1, arg2: T2) => {
			this.listeners.forEach(listener => this.triggerListener(listener, arg1, arg2));
		}
	}
}