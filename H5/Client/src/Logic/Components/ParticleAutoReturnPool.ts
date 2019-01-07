namespace Logic {

    /**
     * 当特效不再存活时,把特效还回特效池的脚本
     */
    export class ParticleAutoReturnPool extends Laya.Script {
        _start(state: Laya.RenderState) {
            super._start(state);
        }

        public _update(state: Laya.RenderState) {
            super._update(state);

            // 检测特效是否播放完成,如果播放完成,则还回特效池中
            if (this.owner instanceof Laya.Sprite3D) {
                if (!ParticlesManager.isParticleSystemAlive(this.owner)) {
                    ParticlesManager.instance.returnParticle(this.owner);
                }
            }
        }
    }
}