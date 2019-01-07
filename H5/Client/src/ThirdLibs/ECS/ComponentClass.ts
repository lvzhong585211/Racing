namespace ECS {
	export interface ComponentClass<T> {
		new (...p: any[]): T;
	}
}