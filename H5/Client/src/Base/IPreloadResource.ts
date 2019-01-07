namespace Base {
    export interface IPreloadResource {
        /**
		 * 获取需要预加载的表列表（Loading模块加载的表）
		 */
        getPreloadResources(): LoadConfig[];

        /**
		 * Loading模块加载完数据表后的处理
		 */
        handleAfterResLoaded();
    }
}