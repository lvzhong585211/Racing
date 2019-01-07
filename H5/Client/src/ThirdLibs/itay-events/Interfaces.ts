namespace ItayEvent {
	export interface Listener1<T> {
		(args: T): void;
	}

	export interface Listener2<T1, T2> {
		(arg1: T1, arg2: T2): void;
	}

	export interface TriggerableEvent1<T> {
		trigger: (data: T) => void;
	}

	export interface TriggerableEvent2<T1, T2> {
		trigger: (arg1: T1, arg2: T2) => void;
	}

	export interface SignableEvent1<T> {
		add(listener: Listener1<T>): void;
		addOnce(listener: Listener1<T>): void;
		remove(listener: Listener1<T>): boolean;
	}

	export interface SignableEvent2<T1, T2> {
		add(listener: Listener2<T1, T2>): void;
		addOnce(listener: Listener2<T1, T2>): void;
		remove(listener: Listener2<T1, T2>): boolean;
	}
}