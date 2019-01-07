namespace ECS {
   /**
    * 实体对象的接口定义
    */
    export interface IEntity {
        readonly components: ComponentsCollection;
    }

    /**
     * 实体对象的基类,可以从此类派生,来实现一个实例,当然也可以自己实现 IEntity 接口
     */
    export class Entity implements IEntity {
        public readonly components = new ComponentsCollection();
    }
}