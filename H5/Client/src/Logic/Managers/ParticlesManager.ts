namespace Logic {
    /**
     * 保存粒子的缓冲信息
     */
    class ParticleCacheInfo {
        public mLoadingPromise: Promise<Laya.Sprite3D> = null;  // 加载用的Promise
        public mLoaded = 0;         // 标识加载的状态: 0 - 加载中, 1 - 加载成功, 2 - 加载失败
        public mIdlingTime = 0;     // 空闲时间
        public mCachedParticles: Laya.Sprite3D[] = [];    // 空闲的粒子列表
    }

    /**
     * 实现对粒子播放的缓冲与管理
     */
    export class ParticlesManager {
        private mParticleMap = new Map<string, ParticleCacheInfo>();    // 保存粒子名称到可用的粒子实例的映射
        public static instance: ParticlesManager = null;                // 全局实例

        constructor() {
            Global.Log.Assert(ParticlesManager.instance === null);
            ParticlesManager.instance = this;
        }

        /**
         * 预缓冲特定的特效
         * @param particleName 指定要预缓冲的特效名称
         */
        public preCacheParticles(particleName: string | string[]) {
            const cacheParticle = (name) => {
                const retParticle = this.queryParticle(name, false, false);
                if (retParticle) { // 如果确实返回的特效,直接还回去,因为我们只是缓冲,并不需要使用它.
                    this.returnParticle(retParticle);
                }
            };
            if (Array.isArray(particleName)) {
                particleName.forEach(name => {
                    cacheParticle(name);
                });
            }
            else {
                cacheParticle(particleName);
            }
        }

        /**
         * 申请一个准备好播放的特效对象
         * @param particleName 指定要返回的粒子的文件名称
         * @param allowAsyncLoading 指定当粒子还在异步加载中时,是返回null还是返回一个加载中的粒子对象. TODO: 注: 加载中的特效同一个特效目标只能存在一个? 以后再修改吧,因为底层的资源加载看起来有问题!
         * @param autoReturnPool 当特效播放完成是否自动还回本池子.
         * 注: 如果 autoReturnPool 为 true,则外面不可以保存返回的特效实例,因为特效播放完成时会自动还回来,供其它对象申请使用.
         */
        public queryParticle(particleName: string, allowAsyncLoading: boolean = false, autoReturnPool: boolean = true): Laya.Sprite3D {
            let cachedInfo = this.mParticleMap.get(particleName);
            const loaded = false;
            if (!cachedInfo) {
                cachedInfo = new ParticleCacheInfo();
                const url = Global.getDecorationResPath(particleName);

                cachedInfo.mLoadingPromise = new Promise((resolve) => {
                    const completeFun = () => {
                        const resObj = Laya.loader.getRes(url);
                        if (resObj === null) {
                            cachedInfo.mCachedParticles = [];   // 加载资源失败,清空吧
                            cachedInfo.mLoaded = 2;
                        }
                        else {
                            cachedInfo.mLoaded = 1;     // 加载成功
                        }
                        resolve(resObj);
                    };
                    const particleRoot = Laya.loader.create(url, Laya.Handler.create(null, completeFun), null, Laya.Sprite3D);

                    cachedInfo.mCachedParticles.push(particleRoot);
                    this.mParticleMap.set(particleName, cachedInfo);
                });
            }

            let retParticle: Laya.Sprite3D;
            if (cachedInfo.mLoaded === 0) {
                if (!allowAsyncLoading) { // 不允许异步加载,直接返回null
                    return null;
                }

                retParticle = new Laya.Sprite3D("ParticleDumyRoot"); // 特效还在加载中,申请一个点位用的对象,特效加载成功后会成为它的子对象.
                cachedInfo.mLoadingPromise.then((particleRoot) => {
                    if (!retParticle.destroyed) {
                        return;    // 如果点位的对象已经被销毁了,不需要再继续生成特效
                    }

                    // Clone特效对象
                    const child = particleRoot.clone() as Laya.Sprite3D;
                    retParticle.addChild(child);
                    child.transform.localPosition.toDefault();
                    child.transform.localRotation.identity();

                    // 调试代码
                    if (SystemConfig.debugShowActor3DAxis) {
                        const box = retParticle.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.1, 0.1, 0.1))) as Laya.MeshSprite3D;
                        box.addComponent(Logic.DebugShowAxisComponent);
                    }

                    if (autoReturnPool) {
                        retParticle.addComponent(ParticleAutoReturnPool);   // 添加播放完成自动还回特效池的脚本
                    }
                });
            }
            else { // 特效已经加载成功,直接复制一个
                if (cachedInfo.mCachedParticles.length === 1) {
                    retParticle = Laya.Sprite3D.instantiate(cachedInfo.mCachedParticles[0]);   // 没有缓冲的粒子了,新复制一个
                    retParticle.name = particleName;

                    // 调试代码
                    if (SystemConfig.debugShowActor3DAxis) {
                        const box = retParticle.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.1, 0.1, 0.1))) as Laya.MeshSprite3D;
                        box.addComponent(Logic.DebugShowAxisComponent);
                    }
                } else {
                    retParticle = cachedInfo.mCachedParticles.pop();   // 弹出最后一个缓冲的粒子
                }

                if (autoReturnPool) {
                    retParticle.addComponent(ParticleAutoReturnPool);   // 添加播放完成自动还回特效池的脚本
                }
            }
            return retParticle;
        }

        /**
         * 播放指定的特效根对象的所有特效(包含子对象中的特效)
         * @param particleRoot 指定要播放的特效的根对象
         */
        public static playParticleSystem(particleRoot: Laya.Sprite3D): void {
            if (particleRoot instanceof Laya.ShuriKenParticle3D) {
                particleRoot.particleSystem.play(); // 重新播放特效
            }

            for (let index = 0, childCount = particleRoot.numChildren; index < childCount; ++index) {
                const child = particleRoot.getChildAt(index);
                if (child instanceof Laya.Sprite3D) {
                    ParticlesManager.playParticleSystem(child);
                }
            }
        }

        /**
         * 停止播放指定对象下的所有的特效
         * @param particleRoot 指定要停止播放的特效的根对象
         */
        public static stopParticleSystem(particleRoot: Laya.Sprite3D): void {
            if (particleRoot instanceof Laya.ShuriKenParticle3D) {
                particleRoot.particleSystem.stop(); // 停止播放特效
            }

            for (let index = 0, childCount = particleRoot.numChildren; index < childCount; ++index) {
                const child = particleRoot.getChildAt(index);
                if (child instanceof Laya.Sprite3D) {
                    ParticlesManager.stopParticleSystem(child);
                }
            }
        }

        /**
         * 返回指定对象下的所有的特效是否还存活
         * @param particleRoot 指定要判定的特效的根对象
         */
        public static isParticleSystemAlive(particleRoot: Laya.Sprite3D): boolean {
            if (particleRoot instanceof Laya.ShuriKenParticle3D) {
                if (particleRoot.particleSystem.isAlive) {
                    return true;
                }
            }

            for (let index = 0, childCount = particleRoot.numChildren; index < childCount; ++index) {
                const child = particleRoot.getChildAt(index);
                if (child instanceof Laya.Sprite3D) {
                    if (ParticlesManager.isParticleSystemAlive(child)) {
                        return true;
                    }
                }
            }
            return false;
        }

        /**
         * 返还一个不再使用的特效对象
         * @param particle 指定要返还的粒子对象
         */
        public returnParticle(particle: Laya.Sprite3D): void {
            const particleName = particle.name;
            const cachedInfo = this.mParticleMap.get(particleName);
            if (!cachedInfo) {
                Global.Log.Error("找不到要返还的特效组(%s)?", particleName);
                particle.destroy(); // 直接删除掉吧
                return;
            }

            if (cachedInfo.mCachedParticles.length > 10) {
                particle.destroy(true); // 缓冲的粒子数量过大,直接释放掉吧
            }
            else {
                cachedInfo.mCachedParticles.push(particle);
                particle.removeSelf();
                particle.removeComponentByType(ParticleAutoReturnPool);
            }

            // TODO: 处理缓冲的特效太多占用内存的问题?
        }

        /**
         * 清空缓冲的所有特效. 注: 一般在切换关卡时应该调用
         */
        public clear(): void {
            // 释放缓冲的资源
            this.mParticleMap.forEach((cacheInfo, key) => {
                cacheInfo.mCachedParticles.forEach(particle => {
                    particle.destroy(); // 释放缓冲的特效
                });
            });
            this.mParticleMap.clear();
        }
    }
}