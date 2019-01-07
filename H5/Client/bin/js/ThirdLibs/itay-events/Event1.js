var ItayEvent;
(function (ItayEvent) {
    class Event1 {
        constructor() {
            this.inner = new ItayEvent.Event2();
            this.add = this.inner.add.bind(this.inner);
            this.addOnce = this.inner.addOnce.bind(this.inner);
            this.remove = this.inner.remove.bind(this.inner);
            this.trigger = data => this.inner.trigger(data, undefined);
        }
        asSignable() {
            return this;
        }
        asTriggerable() {
            return this;
        }
        hasListeners() {
            return this.inner.hasListeners();
        }
    }
    ItayEvent.Event1 = Event1;
})(ItayEvent || (ItayEvent = {}));
//# sourceMappingURL=Event1.js.map