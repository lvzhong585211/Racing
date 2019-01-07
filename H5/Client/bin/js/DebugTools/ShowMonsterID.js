var MyUI;
(function (MyUI) {
    /**
     * 显示怪物的内部Id,用来调试用
     */
    class ShowActorIdSprite extends Laya.Sprite {
        constructor() {
            super();
            this.myLine = null; // 绘制动作过渡参数曲线. Chart.js
            this.lineDataIndex = {}; // 保存图表的数据映射
            this.mShowActorInnerId = -1; // 标识当前要显示的角色的内部Id
        }
        static get Instance() {
            if (ShowActorIdSprite.instance == null) {
                ShowActorIdSprite.instance = new ShowActorIdSprite();
            }
            return ShowActorIdSprite.instance;
        }
        randomScalingFactor() {
            return Math.round(Math.random() * 200 - 100);
        }
        /**
         * 创建绘制曲线的图表
         */
        createLineChart() {
            const canvas = document.getElementById("canvasDebug");
            if (!canvas) {
                return;
            }
            // 找到调试用的画布
            const ctx = canvas.getContext("2d");
            // 动作过渡曲线的配置
            const config = {
                type: "line",
                data: {
                    labels: [],
                    datasets: [{
                            label: "动画混合",
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            data: [],
                            fill: false,
                        }],
                },
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: "Chart.js Line Chart",
                    },
                    tooltips: {
                        mode: "index",
                        intersect: false,
                    },
                    hover: {
                        mode: "nearest",
                        intersect: true,
                    },
                    scales: {
                        xAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: "Month",
                                },
                            }],
                        yAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: "Value",
                                },
                            }],
                    },
                },
            };
            Chart.defaults.global.defaultFontColor = "white";
            this.myLine = new Chart(ctx, config);
        }
        show() {
            uiMgr.addChild(this, UILayer.Debug);
            this.frameLoop(1, this, () => this.refreshActorId());
            this.createLineChart();
        }
        hide() {
            uiMgr.removeChild(this, UILayer.Debug);
            this.destroy();
            ShowActorIdSprite.instance = null;
        }
        /**
         * 绘制带阴影的文本
         * @param text 指定要绘制的文本
         * @param x 指定文本输出的坐标x
         * @param y 指定文本输出的坐标y
         * @param color 指定要输出的文本的颜色
         */
        drawTextWithShadow(text, x, y, color) {
            const graphics = this.graphics;
            graphics.fillText(text, x + 1, y + 1, MyUI.DebugFont, "#000000", "left");
            graphics.fillText(text, x, y, MyUI.DebugFont, color, "left");
        }
        /**
         * 刷新场景中角色Id的显示
         */
        refreshActorId() {
            this.graphics.clear();
            const level = GameMode.getMainLevel();
            if (!level) {
                return;
            }
            const camera = GameMode.PlayingMode.getMainCamera();
            if (!camera) {
                return;
            }
            const actorInfos = level.debugAllCharacterIds();
            actorInfos.forEach((actorInfo) => {
                const posInScreen = new Laya.Vector3();
                // 变换到屏幕坐标系
                camera.worldToViewportPoint(actorInfo.pos, posInScreen);
                let showY = posInScreen.y;
                // 显示内部Id,位置坐标
                const coord = actorInfo.character.getCoordinate();
                const actorDesc = `[innerId = ${actorInfo.innerId.toString()}] [x = ${coord.x.toFixed(2)}, y = ${coord.y.toFixed(2)}]`;
                this.drawTextWithShadow(actorDesc, posInScreen.x, showY, "#ff0000");
                // 调试用的代码,直接访问成员变量了,免得添加大量调试的函数
                if (ShowActorIdSprite.showAnimInfo) {
                    showY -= 15;
                    const actor = actorInfo.character;
                    if (actor.mView && actor.mView.mAnimator) {
                        const animator = actor.mView.mAnimator;
                        const clipName = animator.currentPlayClip ? animator.currentPlayClip.name : "";
                        const blendTime = animator.mFadeTime;
                        const desc = `Ani: ${clipName}, blendTime: ${blendTime.toFixed(4)}`;
                        this.drawTextWithShadow(desc, posInScreen.x, showY, "#ff0000");
                        // 绘制动作的混合参数曲线
                        if (this.myLine && this.mShowActorInnerId === actorInfo.innerId) {
                            const dataSet = this.myLine.data.datasets[0];
                            const data = dataSet.data;
                            data.push(blendTime);
                            this.myLine.data.labels.push(Laya.timer.currFrame.toString());
                            if (data.length > 3 * 60) { // 最多容纳180帧数据,超过后丢掉旧的
                                data.shift();
                                this.myLine.data.labels.shift();
                            }
                            this.myLine.update(); // 刷新曲线数据显示
                        }
                    }
                }
            });
            const aActors = level.debugAllNonCharacterIds();
            aActors.forEach((element) => {
                const posInScreen = new Laya.Vector3();
                // 变换到屏幕坐标系
                camera.worldToViewportPoint(element.getPosition(), posInScreen);
                const showY = posInScreen.y;
                // 显示内部Id,位置坐标
                const coord = element.getCoordinate();
                const actorDesc = `[innerId = ${element.getInnerId()}] [x = ${coord.x.toFixed(2)}, y = ${coord.y.toFixed(2)}]`;
                this.drawTextWithShadow(actorDesc, posInScreen.x, showY, "#ff0000");
            });
        }
    }
    ShowActorIdSprite.instance = null; // 唯一实例
    ShowActorIdSprite.showAnimInfo = false; // 是否显示正在播放的动作信息
    MyUI.ShowActorIdSprite = ShowActorIdSprite;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=ShowMonsterID.js.map