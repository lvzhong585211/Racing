
namespace ECS {
	/**
	 * 组件集合
	 */
	export class ComponentsCollection {
		private keyToComponentMap = new Map<ComponentClass<any>, any>()
		private hashCode = 0;

		public keys(): IterableIterator<ComponentClass<any>> {
			return this.keyToComponentMap.keys();
		}

		public add(component: any, ...keys: ComponentClass<any>[]): void {
			let metadata = (component as Component).componentMetadata;

			let hasMetadataEntries = !!metadata && !!metadata.entiries && metadata.entiries.length > 0;

			if (hasMetadataEntries) {
				this.addEntries(metadata!, keys);
			}
			else {
				let hasMetadataKeys = !!metadata && !!metadata.keys && metadata.keys.length > 0;

				if (hasMetadataKeys) {
					keys.push.apply(keys, metadata!.keys);
				}

				if (keys.length > 0) {
					keys.forEach(key => this.addKeyToComponentMap(key, component));
				}
				else {
					this.addKeyToComponentMap(this.getComponentKey(component), component);
				}
			}
		}

		public remove(component: Component | any): boolean {
			let initialCount = this.keyToComponentMap.size;

			if (component.componentMetadata &&
				component.componentMetadata.entiries &&
				component.componentMetadata.entiries.length > 0) {

				for (let entry of component.componentMetadata.entiries) {
					this.deleteKey(entry.key);
				}
			}
			else {
				for (let [key, value] of this.keyToComponentMap) {
					if (value === component) {
						this.deleteKey(key);
					}
				}
			}

			return this.keyToComponentMap.size < initialCount;
		}

		public getHashCode(): number {
			return this.hashCode;
		}

		public addList(components: Iterable<any>): void {
			for (let component of components) {
				this.add(component);
			}
		}

		public addCollection(collection: ComponentsCollection): void {
			collection.keyToComponentMap.forEach((value, key) => {
				this.addKeyToComponentMap(key, value);
			});
		}

		public get<T>(conponentClass: ComponentClass<T>): T {
			return this.keyToComponentMap.get(conponentClass);
		}

		public contains(conponentClass: ComponentClass<any>): boolean {
			return this.keyToComponentMap.has(conponentClass);
		}

		public containsAny(componentClasses: Iterable<ComponentClass<any>>) {
			for (let c of componentClasses) {
				if (this.get(c)) {
					return true;
				}
			}

			return false;
		}

		public containsAll(componentClasses: Iterable<ComponentClass<any>>) {
			let result = true;

			for (let c of componentClasses) {
				if (!this.get(c)) {
					result = false;
					break;
				}
			}

			return result;
		}

		public toString(): string {
			return `${ComponentsCollection.name}[${this.keyToComponentMap.size}`;
		}

		private addEntries(metadata: ComponentMetadata, keys: ComponentClass<any>[]): void {
			let hasAdditionalKeys = keys.length > 0;

			if (hasAdditionalKeys) {
				throw new Error(`Cannot add the component to the ${ComponentsCollection.name}.` +
					" Component metadata that defines 'entries'," +
					" can not accept additional keys when added to the collection.");
			}

			let hasMetadataKeys = !!metadata && !!metadata.keys && metadata.keys.length > 0;

			if (hasMetadataKeys) {
				throw new Error(`Cannot add the component to the ${ComponentsCollection.name}.` +
					` Component metadata can NOT define both 'entries' and 'keys'.`);
			}

			metadata.entiries!.forEach(entry => {
				this.addKeyToComponentMap(entry.key, entry.value);
			});
		}

		private addKeyToComponentMap(componentClass: ComponentClass<any>, component: any) {
			if (this.keyToComponentMap.has(componentClass)) {
				throw new Error(`Component '${componentClass}' already exists in the ${ComponentsCollection.name}.`);
			}

			this.keyToComponentMap.set(componentClass, component);
			this.hashCode += hashComponent(componentClass);
		}

		private deleteKey(key: ComponentClass<any>): void {
			this.keyToComponentMap.delete(key);
			this.hashCode -= hashComponent(key);
		}

		private getComponentKey(component: any): ComponentClass<any> {
			return component.constructor;
		}
	}
}