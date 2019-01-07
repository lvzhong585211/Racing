var Logic;
(function (Logic) {
    /**
     * 处理角色动作的事件的组件
     */
    class ActionEventComponent extends Laya.Script {
        /**
         * 响应动作中的特效播放事件
         * @param strParticleInfo 指定要播放的特效相关的信息.为ActionEvent_ParticleInfo的Json描述(去掉了两端的{},以减少美术的复杂度)
         * @注: 这里变量的大写名称不要修改,因为要与C#中的资源命名对应!!!
         */
        PlayParticle(param1, param2, strParticleInfo) {
            const jsonDesc = `{${strParticleInfo}}`;
            const info = JSON.parse(jsonDesc);
            if (Global.String.IsNullOrEmpty(info.Path)) {
                return;
            }
            // 申请特效对象
            const particleRoot = particleMgr.queryParticle(info.Path);
            if (particleRoot === null) {
                // 特效可能还没加载成功,直接忽略吧
                return;
            }
            let boneSprite;
            if (Global.String.IsNullOrEmpty(info.Bone)) {
                boneSprite = this.owner;
            }
            // 把特效对象添加到绑定的对象上
            this.owner.addChild(particleRoot);
            // const tr = particleRoot.transform;
            // tr.localPosition.toDefault();
            // tr.rotation.identity();
            // 开始播放特效
            Logic.ParticlesManager.playParticleSystem(particleRoot);
        }
    }
    Logic.ActionEventComponent = ActionEventComponent;
})(Logic || (Logic = {}));
//# sourceMappingURL=ActionEventComponent.js.map