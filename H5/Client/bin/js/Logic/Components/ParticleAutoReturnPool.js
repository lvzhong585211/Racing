var Logic;
(function (Logic) {
    /**
     * 当特效不再存活时,把特效还回特效池的脚本
     */
    class ParticleAutoReturnPool extends Laya.Script {
        _start(state) {
            super._start(state);
        }
        _update(state) {
            super._update(state);
            // 检测特效是否播放完成,如果播放完成,则还回特效池中
            if (this.owner instanceof Laya.Sprite3D) {
                if (!Logic.ParticlesManager.isParticleSystemAlive(this.owner)) {
                    Logic.ParticlesManager.instance.returnParticle(this.owner);
                }
            }
        }
    }
    Logic.ParticleAutoReturnPool = ParticleAutoReturnPool;
})(Logic || (Logic = {}));
//# sourceMappingURL=ParticleAutoReturnPool.js.map