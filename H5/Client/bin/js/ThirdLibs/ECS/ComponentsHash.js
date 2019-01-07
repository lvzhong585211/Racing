var ECS;
(function (ECS) {
    function hashComponent(component) {
        return hashString(component.name);
    }
    ECS.hashComponent = hashComponent;
    function hashComponents(components) {
        let hash = 0;
        for (let component of components) {
            hash += hashString(component.name);
        }
        return hash;
    }
    ECS.hashComponents = hashComponents;
    function hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash * 31 + str.charCodeAt(i)) % Number.MAX_SAFE_INTEGER;
        }
        return hash;
    }
})(ECS || (ECS = {}));
//# sourceMappingURL=ComponentsHash.js.map