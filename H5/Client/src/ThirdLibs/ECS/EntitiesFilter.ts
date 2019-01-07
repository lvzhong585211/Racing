namespace ECS {
	export class EntitiesFilter {
		private constructor(predicate: (components: ComponentsCollection) => boolean) {
			this.check = predicate;
		}

		public check(components: ComponentsCollection): boolean {
			throw new Error("Should be overriden.");
		}

		public static passAll() {
			return new EntitiesFilter(e => true);
		}

		public static componentsContainsAny(components: ReadonlyArray<ComponentClass<any>>): EntitiesFilter {
			return new EntitiesFilter(componentsCollection => componentsCollection.containsAny(components));
		}

		public static componentsContainsAll(components: ReadonlyArray<ComponentClass<any>>): EntitiesFilter {
			return new EntitiesFilter(componentsCollection => componentsCollection.containsAll(components));
		}
	}
}