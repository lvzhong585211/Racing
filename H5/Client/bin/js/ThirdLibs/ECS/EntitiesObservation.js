var ECS;
(function (ECS) {
    class EntitiesObservation {
        constructor() {
            this.added = function () { };
            this.filter = ECS.EntitiesFilter.passAll();
        }
    }
    ECS.EntitiesObservation = EntitiesObservation;
})(ECS || (ECS = {}));
//# sourceMappingURL=EntitiesObservation.js.map