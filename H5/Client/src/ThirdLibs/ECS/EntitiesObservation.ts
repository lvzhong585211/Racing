namespace ECS {
	export interface EntityAddedArgs {
		readonly entity: IEntity,
		readonly onRemoved: ItayEvent.SignableEvent1<EntityRemovedArgs>;
	}

	export interface EntityRemovedArgs {
		readonly entity: IEntity;
	}

	export class EntitiesObservation {
		public added: (entity: EntityAddedArgs) => void = function () { };

		public filter: EntitiesFilter = EntitiesFilter.passAll();
	}
}