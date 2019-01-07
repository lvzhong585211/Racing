namespace ECS {
	class MyEntityAddedArgs implements EntityAddedArgs {
		public onRemoved = new ItayEvent.Event1<EntityRemovedArgs>();

		constructor(public entity: IEntity) {
		}
	}

	class ComponentsCollectionObservations {
		public observationsSet = new Set<ECS.EntitiesObservation>();
		public components: ComponentsCollection;

		constructor(componentKeys: IterableIterator<ComponentClass<any>>) {
			this.components = new ComponentsCollection();
			this.components.add(Object, ...componentKeys);
		}
	}

	export class EntitiesCollection {
		private entitiesSet = new Set<IEntity>();
		private entityAddedArgsSymbol = Symbol(EntitiesCollection.name);
		private allObservations = new Set<ECS.EntitiesObservation>();
		private componentsHashToObservationsMap = new Map<number, ComponentsCollectionObservations>();

		public get size(): number {
			return this.entitiesSet.size;
		}

		public values(): IterableIterator<IEntity> {
			return this.entitiesSet.values();
		}

		public has(entity: IEntity): boolean {
			return this.entitiesSet.has(entity);
		}

		public add(entity: IEntity): void {
			if (this.entitiesSet.has(entity)) return;

			this.entitiesSet.add(entity);

			let addedArgs = this.createEntityAddedArgs(entity);

			let observations = this.getOrCreateComponentsObservationsSet(entity.components);

			for (let observation of observations.observationsSet) {
				observation.added(addedArgs);
			}
		}

		public remove(entity: IEntity): boolean {
			let removed = this.entitiesSet.delete(entity);

			if (removed) {
				let addedArgs = this.getEntityAddedArgs(entity);
				this.deleteEntityAddedArgs(entity);

				addedArgs.onRemoved.trigger({ entity: entity });
			}

			return removed;
		}

		public getByFilter(filter: EntitiesFilter): IEntity[] {
			return Array.from(this.values()).filter(entity => filter.check(entity.components));
		}

		public getAddedArgsByFilter(filter: EntitiesFilter): EntityAddedArgs[] {
			return Array.from(this.values())
				.filter(entity => filter.check(entity.components))
				.map(entity => this.getEntityAddedArgs(entity));
		}

		public getByComponent(componentClass: ComponentClass<any>): IEntity[] {
			return Array.from(this.values()).filter(entity => entity.components.contains(componentClass));
		}

		public getByComponentAny(...componentClasses: ComponentClass<any>[]): IEntity[] {
			return Array.from(this.values()).filter(entity => {
				return entity.components.containsAny(componentClasses);
			});
		}

		public addObservation(observation: ECS.EntitiesObservation) {
			this.allObservations.add(observation);

			for (let [hash, componentsObservations] of this.componentsHashToObservationsMap) {
				if (observation.filter.check(componentsObservations.components)) {
					componentsObservations.observationsSet.add(observation);
				}
			}
		}

		public removeObservation(observation: ECS.EntitiesObservation) {
			this.allObservations.delete(observation);

			for (let [hash, componentsObservations] of this.componentsHashToObservationsMap) {
				componentsObservations.observationsSet.delete(observation);

				if (componentsObservations.observationsSet.size === 0) {
					this.componentsHashToObservationsMap.delete(hash);
				}
			}
		}

		private createEntityAddedArgs(entity: IEntity): MyEntityAddedArgs {
			let args = new MyEntityAddedArgs(entity);
			(entity as any)[this.entityAddedArgsSymbol] = args;

			return args;
		}

		private getEntityAddedArgs(entity: IEntity): MyEntityAddedArgs {
			return (entity as any)[this.entityAddedArgsSymbol];
		}

		private deleteEntityAddedArgs(entity: IEntity): void {
			delete (entity as any)[this.entityAddedArgsSymbol];
		}

		private getComponentsObservationsSet(components: ComponentsCollection
		): ComponentsCollectionObservations | undefined {
			return this.componentsHashToObservationsMap.get(components.getHashCode());
		}

		private getOrCreateComponentsObservationsSet(components: ComponentsCollection
		): ComponentsCollectionObservations {
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
}