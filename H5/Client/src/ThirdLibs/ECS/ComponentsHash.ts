namespace ECS {
	export function hashComponent(component: ComponentClass<any>): number {
		return hashString(component.name);
	}

	export function hashComponents(components: ComponentClass<any>[]): number {
		let hash = 0;

		for (let component of components) {
			hash += hashString(component.name);
		}

		return hash;
	}

	function hashString(str: string) {
		let hash = 0;

		for (let i = 0; i < str.length; i++) {
			hash = (hash * 31 + str.charCodeAt(i)) % Number.MAX_SAFE_INTEGER;
		}

		return hash;
	}
}