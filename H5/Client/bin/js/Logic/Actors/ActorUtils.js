var Logic;
(function (Logic) {
    /** 获取当前血值 */
    function getLifeV(entity) {
        const lifeCompnent = entity.components.get(Logic.ActorState.Life);
        if (!lifeCompnent) {
            return 0;
        }
        return lifeCompnent.VLife;
    }
    Logic.getLifeV = getLifeV;
    /** 获取最大血值 */
    function getMaxLifeV(entity) {
        const lifeComponent = entity.components.get(Logic.ActorState.Life);
        if (!lifeComponent) {
            return 0;
        }
        return lifeComponent.VLifeMax;
    }
    Logic.getMaxLifeV = getMaxLifeV;
    /**
     * 设置血值
     * @param nLifeV 当前血值
     * @param nMaxLifeV 最大血值
     */
    function setLifeV(entity, nLifeV, nMaxLifeV) {
        const lifeComponent = entity.components.get(Logic.ActorState.Life);
        if (lifeComponent) {
            lifeComponent.VLife = nLifeV;
            (nMaxLifeV !== undefined) && (lifeComponent.VLifeMax = nMaxLifeV);
        }
    }
    Logic.setLifeV = setLifeV;
    /** 获取当前蓝值 */
    function getMagicV(entity) {
        const magicComponent = entity.components.get(Logic.ActorState.Magic);
        if (!magicComponent) {
            return 0;
        }
        return magicComponent.VMagic;
    }
    Logic.getMagicV = getMagicV;
    /** 获取最大蓝值 */
    function getMaxMagicV(entity) {
        const magicComponent = entity.components.get(Logic.ActorState.Magic);
        if (!magicComponent) {
            return 0;
        }
        return magicComponent.VMagicMax;
    }
    Logic.getMaxMagicV = getMaxMagicV;
    /**
     * 设置蓝值
     * @param nMagicV 当前蓝值
     * @param nMaxMagicV 最大蓝值
     */
    function setMagicV(entity, nMagicV, nMaxMagicV) {
        const magicComponent = entity.components.get(Logic.ActorState.Magic);
        if (!magicComponent) {
            return false;
        }
        magicComponent.VMagic = nMagicV;
        (nMaxMagicV !== undefined) && (magicComponent.VMagicMax = nMaxMagicV);
        return true;
    }
    Logic.setMagicV = setMagicV;
    /**
     * 设置等级
     * @param nLevel 等级
     * @param nChangeLifeCnt 重生等级（没有重生等级时可以）
     */
    function setLevelV(entity, nLevel, nChangeLifeCnt = 0) {
        const levelComp = entity.components.get(Logic.ActorState.Level);
        if (levelComp) {
            levelComp.VLevel = nLevel;
            levelComp.ChangeLifeCount = nChangeLifeCnt;
        }
    }
    Logic.setLevelV = setLevelV;
    /**
     * 获取等级
     * @param entity
     */
    function getLevelV(entity) {
        const levelComp = entity.components.get(Logic.ActorState.Level);
        if (levelComp) {
            return levelComp.VLevel;
        }
        return 0;
    }
    Logic.getLevelV = getLevelV;
    /**
     * 获取重生次数
     * @param entity
     */
    function getChangeLifeCount(entity) {
        const levelComp = entity.components.get(Logic.ActorState.Level);
        if (levelComp) {
            return levelComp.ChangeLifeCount;
        }
        return 0;
    }
    Logic.getChangeLifeCount = getChangeLifeCount;
    /**
     * 获取是否可以进行碰撞检测
     */
    function getCanCollide(entity) {
        return entity.components.contains(Logic.ActorState.Collider);
    }
    Logic.getCanCollide = getCanCollide;
    /**
     * 获取碰撞盒位置
     */
    function getColliderCenter(entity) {
        const colliderComp = entity.components.get(Logic.ActorState.Collider);
        if (colliderComp) {
            return colliderComp.center;
        }
        return Laya.Vector3.ZERO;
    }
    Logic.getColliderCenter = getColliderCenter;
    /**
     * 获取碰撞盒尺寸
     */
    function getColliderSize(entity) {
        const colliderComp = entity.components.get(Logic.ActorState.Collider);
        if (colliderComp) {
            return colliderComp.size;
        }
        return Laya.Vector3.ZERO;
    }
    Logic.getColliderSize = getColliderSize;
    /**
     * 设置头顶名称的世界坐标
     * @param entity Entity实体
     * @param viewPos 名称对应的图形对象的世界坐标
     */
    function setVisualNameWorldPos(entity, viewPos) {
        const comp = entity.components.get(Logic.ActorState.VisualName);
        if (comp) {
            comp.outWorldPos.x = viewPos.x;
            comp.outWorldPos.y = viewPos.y + comp.initHeight + comp.extraHeight;
            comp.outWorldPos.z = viewPos.z;
            return true;
        }
        return false;
    }
    Logic.setVisualNameWorldPos = setVisualNameWorldPos;
    /**
     * 设置头顶名称的额外高度
     * @param entity Entity实体
     * @param nExtraHeight 额外高度
     */
    function setVisualNameExtraHeight(entity, nExtraHeight) {
        const comp = entity.components.get(Logic.ActorState.VisualName);
        if (comp) {
            comp.extraHeight = nExtraHeight;
            return true;
        }
        return false;
    }
    Logic.setVisualNameExtraHeight = setVisualNameExtraHeight;
})(Logic || (Logic = {}));
//# sourceMappingURL=ActorUtils.js.map