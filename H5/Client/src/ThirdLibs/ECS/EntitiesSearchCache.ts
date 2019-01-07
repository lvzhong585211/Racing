namespace ECS {
	import SignableEvent1 = ItayEvent.SignableEvent1;

/**
 * 对象查找的缓冲.注: 要想此列表有效,则必须在添加组件后再把对象放置到 EntitiesCollection 中才会有效!动态添加与删除组件并不会更新缓冲列表
 */
	export class EntitiesSearchCache {
		public onEntityAdded?: (e: IEntity) => void;
		public onEntityRemoved?: (e: IEntity) => void;

		private entitiesSet = new Set<IEntity>();
		private entityToOnRemovedMap = new Map<IEntity, SignableEvent1<EntityRemovedArgs>>();
		private observation: EntitiesObservation;

		constructor(private entitiesSource: EntitiesCollection, filter: EntitiesFilter) {
			this.entitiesSource = entitiesSource;

			this.observation = new EntitiesObservation();
			this.observation.filter = filter;
			this.observation.added = this.added;

			this.entitiesSource.addObservation(this.observation);

			for (let addedArgs of this.entitiesSource.getAddedArgsByFilter(this.observation.filter)) {
				this.added(addedArgs);
			}
		}

		public get size(): number {
			return this.entitiesSet.size;
		}

		public has(entity: IEntity): boolean {
			return this.entitiesSet.has(entity);
		}

		public get entities(): IterableIterator<IEntity> {
			return this.entitiesSet.values();
		}

		public static from(entitiesSource: EntitiesCollection): EntitiesSearchCacheFactory {
			return new EntitiesSearchCacheFactory(entitiesSource);
		}

		public dispose(): void {
			this.entitiesSource.removeObservation(this.observation);

			for (let onRemovedEvent of this.entityToOnRemovedMap.values()) {
				onRemovedEvent.remove(this.removed);
			}

			delete this.entitiesSource;
			delete this.observation;
			delete this.entitiesSet;
			delete this.entityToOnRemovedMap;
		}

		private added = (args: EntityAddedArgs) => {
			this.entitiesSet.add(args.entity);

			args.onRemoved.addOnce(this.removed);
			this.entityToOnRemovedMap.set(args.entity, args.onRemoved);

			if (this.onEntityAdded) this.onEntityAdded(args.entity);
		}

		private removed = (args: EntityRemovedArgs) => {
			let removed = this.entitiesSet.delete(args.entity);
			this.entityToOnRemovedMap.delete(args.entity);

			if (removed && this.onEntityRemoved) this.onEntityRemoved(args.entity);
		}
	}

	export class EntitiesSearchCacheFactory {
		constructor(public entitiesSource: EntitiesCollection) {
		}

		public componentsContainsAny(components: ComponentClass<any>[]) {
			let filter = EntitiesFilter.componentsContainsAny(components);
			let cache = new EntitiesSearchCache(this.entitiesSource, filter);

			return cache;
		}

		public componentsContainsAll(components: ComponentClass<any>[]) {
			let filter = EntitiesFilter.componentsContainsAll(components);
			let cache = new EntitiesSearchCache(this.entitiesSource, filter);

			return cache;
		}
	}
}