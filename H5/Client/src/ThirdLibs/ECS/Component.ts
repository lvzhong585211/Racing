namespace ECS {
    export interface Component {
        componentMetadata?: ComponentMetadata;
    }

    export class Component implements Component {
        public componentMetadata?: ComponentMetadata;
    }

    export interface ComponentMetadata {
        keys?: ComponentClass<any>[];
        entiries?: ComponentEntry[];
    }

    export interface ComponentEntry {
        key: ComponentClass<any>;
        value: any;
    }

    export class ComponentEntry implements ComponentEntry {
        constructor(key: ComponentClass<any>, value: any) {
            this.key = key;
            this.value = value;
        }
    }
}