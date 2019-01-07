namespace Logic {
    /**
     * 在绑定对象的坐标上显示系统坐标轴
     */
    export class DebugShowAxisComponent extends Laya.Script {
        private phasorSprite3D: Laya.PhasorSpriter3D = null;  // 绘制基础图形

        /** 绘制直线 */
        public drawLine(start: Laya.Vector3, end: Laya.Vector3, color: Laya.Vector4) {
            this.phasorSprite3D.begin(Laya.WebGLContext.LINES, GameMode.PlayingMode.getMainCamera());
            this.phasorSprite3D.line(start, color, end, color);
            this.phasorSprite3D.end();
        }

        /**
         * 覆写加载组件的3D对象实例化完成后，第一次更新时执行
         */
        public _start(state: Laya.RenderState): void {
            this.phasorSprite3D = new Laya.PhasorSpriter3D();
        }

        /**
         * 渲染的最后阶段执行
         * @param    state 渲染状态参数。
         */
        public _postRenderUpdate(state: Laya.RenderState): void {
            const transform = (this.owner as Laya.Sprite3D).transform;
            // transform.forward
            const startPos = transform.position;
            let endPos = transform.position.clone();

            // 绘制系统坐标轴
            endPos.x += 1;
            this.drawLine(startPos, endPos, new Laya.Vector4(1, 0, 0, 1));
            endPos = transform.position.clone();
            endPos.y += 1;
            this.drawLine(startPos, endPos, new Laya.Vector4(0, 1, 0, 1));
            endPos = transform.position.clone();
            endPos.z += 1;
            this.drawLine(startPos, endPos, new Laya.Vector4(0, 0, 1, 1));

            // 绘制角色朝前方向
            const forwardDir = new Laya.Vector3();
            Laya.Vector3.scale(transform.forward, 2, forwardDir);
            endPos = new Laya.Vector3();
            Laya.Vector3.add(startPos, forwardDir, endPos);
            this.drawLine(startPos, endPos, new Laya.Vector4(1, 1, 0, 1));
        }

        /**
         * @private
         * 销毁组件。
         */
        _destroy(): void {
            super._destroy();
        }
    }
}