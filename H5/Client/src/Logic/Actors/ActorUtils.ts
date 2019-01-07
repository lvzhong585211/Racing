namespace Logic {
    /** 获取当前血值 */
    export function getLifeV(entity: ECS.IEntity): number {
        const lifeCompnent = entity.components.get(ActorState.Life);
        if (!lifeCompnent) {
            return 0;
        }
        return lifeCompnent.VLife;
    }

    /** 获取最大血值 */
    export function getMaxLifeV(entity: ECS.IEntity): number {
        const lifeComponent = entity.components.get(ActorState.Life);
        if (!lifeComponent) {
            return 0;
        }
        return lifeComponent.VLifeMax;
    }

    /**
     * 设置血值
     * @param nLifeV 当前血值
     * @param nMaxLifeV 最大血值
     */
    export function setLifeV(entity: ECS.IEntity, nLifeV: number, nMaxLifeV?: number) {
        const lifeComponent = entity.components.get(ActorState.Life);
        if (lifeComponent) {
            lifeComponent.VLife = nLifeV;
            (nMaxLifeV !== undefined) && (lifeComponent.VLifeMax = nMaxLifeV);
        }
    }

    /** 获取当前蓝值 */
    export function getMagicV(entity: ECS.IEntity): number {
        const magicComponent = entity.components.get(ActorState.Magic);
        if (!magicComponent) {
            return 0;
        }
        return magicComponent.VMagic;
    }

    /** 获取最大蓝值 */
    export function getMaxMagicV(entity: ECS.IEntity): number {
        const magicComponent = entity.components.get(ActorState.Magic);
        if (!magicComponent) {
            return 0;
        }
        return magicComponent.VMagicMax;
    }

    /**
     * 设置蓝值
     * @param nMagicV 当前蓝值
     * @param nMaxMagicV 最大蓝值
     */
    export function setMagicV(entity: ECS.IEntity, nMagicV: number, nMaxMagicV?: number): boolean {
        const magicComponent = entity.components.get(ActorState.Magic);
        if (!magicComponent) {
            return false;
        }
        magicComponent.VMagic = nMagicV;
        (nMaxMagicV !== undefined) && (magicComponent.VMagicMax = nMaxMagicV);
        return true;
    }

    /**
     * 设置等级
     * @param nLevel 等级
     * @param nChangeLifeCnt 重生等级（没有重生等级时可以）
     */
    export function setLevelV(entity: ECS.IEntity, nLevel: number, nChangeLifeCnt: number = 0) {
        const levelComp = entity.components.get(ActorState.Level);
        if (levelComp) {
            levelComp.VLevel = nLevel;
            levelComp.ChangeLifeCount = nChangeLifeCnt;
        }
    }

    /**
     * 获取等级
     * @param entity 
     */
    export function getLevelV(entity: ECS.IEntity): number {
        const levelComp = entity.components.get(ActorState.Level);
        if (levelComp) {
            return levelComp.VLevel;
        }
        return 0;
    }

    /**
     * 获取重生次数
     * @param entity 
     */
    export function getChangeLifeCount(entity: ECS.IEntity): number {
        const levelComp = entity.components.get(ActorState.Level);
        if (levelComp) {
            return levelComp.ChangeLifeCount;
        }
        return 0;
    }

    /**
     * 获取是否可以进行碰撞检测
     */
    export function getCanCollide(entity: ECS.IEntity): boolean {
        return entity.components.contains(ActorState.Collider);
    }

    /**
     * 获取碰撞盒位置
     */
    export function getColliderCenter(entity: ECS.IEntity): Laya.Vector3 {
        const colliderComp = entity.components.get(ActorState.Collider);
        if (colliderComp) {
            return colliderComp.center;
        }
        return Laya.Vector3.ZERO;
    }

    /**
     * 获取碰撞盒尺寸
     */
    export function getColliderSize(entity: ECS.IEntity): Laya.Vector3 {
        const colliderComp = entity.components.get(ActorState.Collider);
        if (colliderComp) {
            return colliderComp.size;
        }
        return Laya.Vector3.ZERO;
    }

    /**
     * 设置头顶名称的世界坐标
     * @param entity Entity实体
     * @param viewPos 名称对应的图形对象的世界坐标
     */
    export function setVisualNameWorldPos(entity: ECS.IEntity, viewPos: Laya.Vector3): boolean {
        const comp = entity.components.get(ActorState.VisualName);
        if (comp) {
            comp.outWorldPos.x = viewPos.x;
            comp.outWorldPos.y = viewPos.y + comp.initHeight + comp.extraHeight;
            comp.outWorldPos.z = viewPos.z;
            return true;
        }
        return false;
    }

    /**
     * 设置头顶名称的额外高度
     * @param entity Entity实体
     * @param nExtraHeight 额外高度
     */
    export function setVisualNameExtraHeight(entity: ECS.IEntity, nExtraHeight: number): boolean {
        const comp = entity.components.get(ActorState.VisualName);
        if (comp) {
            comp.extraHeight = nExtraHeight;
            return true;
        }
        return false;
    }
}