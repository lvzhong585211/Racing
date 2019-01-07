namespace ItayEvent {
	export class Event {
		private inner: Event2<void, void> = new Event2<void, void>();

		public add: (listener: () => void) => void = this.inner.add.bind(this.inner);

		public addOnce: (listener: () => void) => void = this.inner.addOnce.bind(this.inner);

		public remove: (listener: () => void) => boolean = this.inner.remove.bind(this.inner);

		public trigger: () => void = () => this.inner.trigger(undefined, undefined);

		public hasListeners(): boolean {
			return this.inner.hasListeners();
		}
	}
}