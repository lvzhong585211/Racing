var ItayEvent;
(function (ItayEvent) {
    class Event {
        constructor() {
            this.inner = new ItayEvent.Event2();
            this.add = this.inner.add.bind(this.inner);
            this.addOnce = this.inner.addOnce.bind(this.inner);
            this.remove = this.inner.remove.bind(this.inner);
            this.trigger = () => this.inner.trigger(undefined, undefined);
        }
        hasListeners() {
            return this.inner.hasListeners();
        }
    }
    ItayEvent.Event = Event;
})(ItayEvent || (ItayEvent = {}));
//# sourceMappingURL=Event.js.map