var ECS;
(function (ECS) {
    class EntitiesFilter {
        constructor(predicate) {
            this.check = predicate;
        }
        check(components) {
            throw new Error("Should be overriden.");
        }
        static passAll() {
            return new EntitiesFilter(e => true);
        }
        static componentsContainsAny(components) {
            return new EntitiesFilter(componentsCollection => componentsCollection.containsAny(components));
        }
        static componentsContainsAll(components) {
            return new EntitiesFilter(componentsCollection => componentsCollection.containsAll(components));
        }
    }
    ECS.EntitiesFilter = EntitiesFilter;
})(ECS || (ECS = {}));
//# sourceMappingURL=EntitiesFilter.js.map