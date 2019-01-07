var ECS;
(function (ECS) {
    class MyEntityAddedArgs {
        constructor(entity) {
            this.entity = entity;
            this.onRemoved = new ItayEvent.Event1();
        }
    }
    class ComponentsCollectionObservations {
        constructor(componentKeys) {
            this.observationsSet = new Set();
            this.components = new ECS.ComponentsCollection();
            this.components.add(Object, ...componentKeys);
        }
    }
    class EntitiesCollection {
        constructor() {
            this.entitiesSet = new Set();
            this.entityAddedArgsSymbol = Symbol(EntitiesCollection.name);
            this.allObservations = new Set();
            this.componentsHashToObservationsMap = new Map();
        }
        get size() {
            return this.entitiesSet.size;
        }
        values() {
            return this.entitiesSet.values();
        }
        has(entity) {
            return this.entitiesSet.has(entity);
        }
        add(entity) {
            if (this.entitiesSet.has(entity))
                return;
            this.entitiesSet.add(entity);
            let addedArgs = this.createEntityAddedArgs(entity);
            let observations = this.getOrCreateComponentsObservationsSet(entity.components);
            for (let observation of observations.observationsSet) {
                observation.added(addedArgs);
            }
        }
        remove(entity) {
            let removed = this.entitiesSet.delete(entity);
            if (removed) {
                let addedArgs = this.getEntityAddedArgs(entity);
                this.deleteEntityAddedArgs(entity);
                addedArgs.onRemoved.trigger({ entity: entity });
            }
            return removed;
        }
        getByFilter(filter) {
            return Array.from(this.values()).filter(entity => filter.check(entity.components));
        }
        getAddedArgsByFilter(filter) {
            return Array.from(this.values())
                .filter(entity => filter.check(entity.components))
                .map(entity => this.getEntityAddedArgs(entity));
        }
        getByComponent(componentClass) {
            return Array.from(this.values()).filter(entity => entity.components.contains(componentClass));
        }
        getByComponentAny(...componentClasses) {
            return Array.from(this.values()).filter(entity => {
                return entity.components.containsAny(componentClasses);
            });
        }
        addObservation(observation) {
            this.allObservations.add(observation);
            for (let [hash, componentsObservations] of this.componentsHashToObservationsMap) {
                if (observation.filter.check(componentsObservations.components)) {
                    componentsObservations.observationsSet.add(observation);
                }
            }
        }
        removeObservation(observation) {
            this.allObservations.delete(observation);
            for (let [hash, componentsObservations] of this.componentsHashToObservationsMap) {
                componentsObservations.observationsSet.delete(observation);
                if (componentsObservations.observationsSet.size === 0) {
                    this.componentsHashToObservationsMap.delete(hash);
                }
            }
        }
        createEntityAddedArgs(entity) {
            let args = new MyEntityAddedArgs(entity);
            entity[this.entityAddedArgsSymbol] = args;
            return args;
        }
        getEntityAddedArgs(entity) {
            return entity[this.entityAddedArgsSymbol];
        }
        deleteEntityAddedArgs(entity) {
            delete entity[this.entityAddedArgsSymbol];
        }
        getComponentsObservationsSet(components) {
            return this.componentsHashToObservationsMap.get(components.getHashCode());
        }
        getOrCreateComponentsObservationsSet(components) {
            let hash = components.getHashCode();
            let observations = this.componentsHashToObservationsMap.get(hash);
            if (!observations) {
                observations = new ComponentsCollectionObservations(components.keys());
                for (let observation of this.allObservations) {
                    if (observation.filter.check(components)) {
                        observations.observationsSet.add(observation);
                    }
                }
                this.componentsHashToObservationsMap.set(hash, observations);
            }
            return observations;
        }
    }
    ECS.EntitiesCollection = EntitiesCollection;
})(ECS || (ECS = {}));
//# sourceMappingURL=EntitiesCollection.js.map