var ECS;
(function (ECS) {
    /**
     * 实体对象的基类,可以从此类派生,来实现一个实例,当然也可以自己实现 IEntity 接口
     */
    class Entity {
        constructor() {
            this.components = new ECS.ComponentsCollection();
        }
    }
    ECS.Entity = Entity;
})(ECS || (ECS = {}));
//# sourceMappingURL=Entity.js.map