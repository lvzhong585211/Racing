var ECS;
(function (ECS) {
    /**
     * 组件集合
     */
    class ComponentsCollection {
        constructor() {
            this.keyToComponentMap = new Map();
            this.hashCode = 0;
        }
        keys() {
            return this.keyToComponentMap.keys();
        }
        add(component, ...keys) {
            let metadata = component.componentMetadata;
            let hasMetadataEntries = !!metadata && !!metadata.entiries && metadata.entiries.length > 0;
            if (hasMetadataEntries) {
                this.addEntries(metadata, keys);
            }
            else {
                let hasMetadataKeys = !!metadata && !!metadata.keys && metadata.keys.length > 0;
                if (hasMetadataKeys) {
                    keys.push.apply(keys, metadata.keys);
                }
                if (keys.length > 0) {
                    keys.forEach(key => this.addKeyToComponentMap(key, component));
                }
                else {
                    this.addKeyToComponentMap(this.getComponentKey(component), component);
                }
            }
        }
        remove(component) {
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
        getHashCode() {
            return this.hashCode;
        }
        addList(components) {
            for (let component of components) {
                this.add(component);
            }
        }
        addCollection(collection) {
            collection.keyToComponentMap.forEach((value, key) => {
                this.addKeyToComponentMap(key, value);
            });
        }
        get(conponentClass) {
            return this.keyToComponentMap.get(conponentClass);
        }
        contains(conponentClass) {
            return this.keyToComponentMap.has(conponentClass);
        }
        containsAny(componentClasses) {
            for (let c of componentClasses) {
                if (this.get(c)) {
                    return true;
                }
            }
            return false;
        }
        containsAll(componentClasses) {
            let result = true;
            for (let c of componentClasses) {
                if (!this.get(c)) {
                    result = false;
                    break;
                }
            }
            return result;
        }
        toString() {
            return `${ComponentsCollection.name}[${this.keyToComponentMap.size}`;
        }
        addEntries(metadata, keys) {
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
            metadata.entiries.forEach(entry => {
                this.addKeyToComponentMap(entry.key, entry.value);
            });
        }
        addKeyToComponentMap(componentClass, component) {
            if (this.keyToComponentMap.has(componentClass)) {
                throw new Error(`Component '${componentClass}' already exists in the ${ComponentsCollection.name}.`);
            }
            this.keyToComponentMap.set(componentClass, component);
            this.hashCode += ECS.hashComponent(componentClass);
        }
        deleteKey(key) {
            this.keyToComponentMap.delete(key);
            this.hashCode -= ECS.hashComponent(key);
        }
        getComponentKey(component) {
            return component.constructor;
        }
    }
    ECS.ComponentsCollection = ComponentsCollection;
})(ECS || (ECS = {}));
//# sourceMappingURL=ComponentsCollection.js.map