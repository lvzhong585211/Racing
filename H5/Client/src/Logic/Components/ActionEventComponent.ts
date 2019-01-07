namespace Logic {
    /**
     * 播放特效的动作事件的定义
     * 注: 这里变量的大写名称不要修改,因为要与C#中的资源命名对应!!!
     */
    interface IActionEventParticleInfo {
        Path: string;
        Bone: string;
    }

    /**
     * 处理角色动作的事件的组件
     */
    export class ActionEventComponent extends Laya.Script {
        /**
         * 响应动作中的特效播放事件
         * @param strParticleInfo 指定要播放的特效相关的信息.为ActionEvent_ParticleInfo的Json描述(去掉了两端的{},以减少美术的复杂度)
         * @注: 这里变量的大写名称不要修改,因为要与C#中的资源命名对应!!!
         */
        public PlayParticle(param1: number, param2: number, strParticleInfo: string): void {
            const jsonDesc = `{${strParticleInfo}}`;
            const info = JSON.parse(jsonDesc) as IActionEventParticleInfo;
            if (Global.String.IsNullOrEmpty(info.Path)) {
                return;
            }

            // 申请特效对象
            const particleRoot = particleMgr.queryParticle(info.Path);
            if (particleRoot === null) {
                // 特效可能还没加载成功,直接忽略吧
                return;
            }

            let boneSprite: Laya.Sprite3D;
            if (Global.String.IsNullOrEmpty(info.Bone)) {
                boneSprite = this.owner as Laya.Sprite3D;
            }

            // 把特效对象添加到绑定的对象上
            this.owner.addChild(particleRoot);
            // const tr = particleRoot.transform;
            // tr.localPosition.toDefault();
            // tr.rotation.identity();

            // 开始播放特效
            ParticlesManager.playParticleSystem(particleRoot);
        }
    }
}