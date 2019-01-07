var ECS;
(function (ECS) {
    /**
     * 对象查找的缓冲.注: 要想此列表有效,则必须在添加组件后再把对象放置到 EntitiesCollection 中才会有效!动态添加与删除组件并不会更新缓冲列表
     */
    class EntitiesSearchCache {
        constructor(entitiesSource, filter) {
            this.entitiesSource = entitiesSource;
            this.entitiesSet = new Set();
            this.entityToOnRemovedMap = new Map();
            this.added = (args) => {
                this.entitiesSet.add(args.entity);
                args.onRemoved.addOnce(this.removed);
                this.entityToOnRemovedMap.set(args.entity, args.onRemoved);
                if (this.onEntityAdded)
                    this.onEntityAdded(args.entity);
            };
            this.removed = (args) => {
                let removed = this.entitiesSet.delete(args.entity);
                this.entityToOnRemovedMap.delete(args.entity);
                if (removed && this.onEntityRemoved)
                    this.onEntityRemoved(args.entity);
            };
            this.entitiesSource = entitiesSource;
            this.observation = new ECS.EntitiesObservation();
            this.observation.filter = filter;
            this.observation.added = this.added;
            this.entitiesSource.addObservation(this.observation);
            for (let addedArgs of this.entitiesSource.getAddedArgsByFilter(this.observation.filter)) {
                this.added(addedArgs);
            }
        }
        get size() {
            return this.entitiesSet.size;
        }
        has(entity) {
            return this.entitiesSet.has(entity);
        }
        get entities() {
            return this.entitiesSet.values();
        }
        static from(entitiesSource) {
            return new EntitiesSearchCacheFactory(entitiesSource);
        }
        dispose() {
            this.entitiesSource.removeObservation(this.observation);
            for (let onRemovedEvent of this.entityToOnRemovedMap.values()) {
                onRemovedEvent.remove(this.removed);
            }
            delete this.entitiesSource;
            delete this.observation;
            delete this.entitiesSet;
            delete this.entityToOnRemovedMap;
        }
    }
    ECS.EntitiesSearchCache = EntitiesSearchCache;
    class EntitiesSearchCacheFactory {
        constructor(entitiesSource) {
            this.entitiesSource = entitiesSource;
        }
        componentsContainsAny(components) {
            let filter = ECS.EntitiesFilter.componentsContainsAny(components);
            let cache = new EntitiesSearchCache(this.entitiesSource, filter);
            return cache;
        }
        componentsContainsAll(components) {
            let filter = ECS.EntitiesFilter.componentsContainsAll(components);
            let cache = new EntitiesSearchCache(this.entitiesSource, filter);
            return cache;
        }
    }
    ECS.EntitiesSearchCacheFactory = EntitiesSearchCacheFactory;
})(ECS || (ECS = {}));
//# sourceMappingURL=EntitiesSearchCache.js.map