var ECS;
(function (ECS) {
    class Component {
    }
    ECS.Component = Component;
    class ComponentEntry {
        constructor(key, value) {
            this.key = key;
            this.value = value;
        }
    }
    ECS.ComponentEntry = ComponentEntry;
})(ECS || (ECS = {}));
//# sourceMappingURL=Component.js.map