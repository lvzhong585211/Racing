namespace ItayEvent {
    export class Event1<T> implements SignableEvent1<T>, TriggerableEvent1<T> {
        private inner: Event2<T, void> = new Event2<T, void>();

        public add: (listener: Listener1<T>) => void = this.inner.add.bind(this.inner);

        public addOnce: (listener: Listener1<T>) => void = this.inner.addOnce.bind(this.inner);

        public remove: (listener: Listener1<T>) => boolean = this.inner.remove.bind(this.inner);

        public trigger: (data: T) => void = data => this.inner.trigger(data, undefined);

        public asSignable(): SignableEvent1<T> {
            return this;
        }

        public asTriggerable(): TriggerableEvent1<T> {
            return this;
        }

        public hasListeners(): boolean {
            return this.inner.hasListeners();
        }
    }
}