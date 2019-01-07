namespace MyUI {
    export class RedDot extends ui.Components.RedDotUI {
        /** 动画基准索引，其他小红点播放时都从该索引位置开始，保证所有小红点的动画播放频率一致 */
        private static sBenchmarkIndex = 0;

        constructor() {
            super();
            super.visible = false;
        }

        /**
         * 更新动画基准索引
         */
        public updateBenchmarkIndex() {
            RedDot.sBenchmarkIndex = this._ani.index;
        }

        /** @override */
        public get visible(): boolean {
            return super.visible;
        }
        /** @override */
        public set visible(value: boolean) {
            if (super.visible !== value) {
                !value && this._ani.stop();
                super.visible = value;
                value && this._ani.play(RedDot.sBenchmarkIndex, true);
            }
        }
    }
}