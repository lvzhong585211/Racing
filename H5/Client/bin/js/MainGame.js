// 程序入口
class MainGame {
    constructor() {
        this.gameInstace = new GameMode.GameInstance();
        // 初始化引擎. 1280x720就我们的设计分辨率
        Laya3D.init(Global.VIEW_WIDTH, Global.VIEW_HEIGHT, true);
        // 适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        // Laya.stage.fullScreenEnabled = true;     // 点击进入全屏?
        Laya.stage.frameRate = Laya.Stage.FRAME_FAST; // 目前只能使用 FRAME_FAST 模式, 如果使用其它模式,经常会导致渲染出错,估计是引擎的Bug
        // Laya.stage.bgColor = null;
        // 设置默认的字体及大小        
        Laya.Font.defaultSize = 18;
        Laya.Font.defaultFont = MyUI.DefaultFont;
        // UI默认配置
        UIConfig.mouseWheelEnable = false;
        UIConfig.closeDialogOnSide = false;
        // 开启统计信息
        Laya.Stat.show(0, 115);
        // Debug面板
        // Laya.DebugPanel.init();
        // Laya.DebugTool.init();
        // Laya.stage.on(Laya.Event.CLICK, this, (e: Laya.Event) => {
        //     console.log("===stageClick===targe.name=" + e.target.name + " ===currentTarget.name=" + e.currentTarget.name + " ===");
        // });
        // 开始运行游戏逻辑
        if (!this.gameInstace.build()) {
            // 初始化失败???
        }
        if (SystemConfig.debugBTDebugger) {
            // 启动行为树的调试
            FBT.Debugger.Init();
        }
        const autoTest = false; // 是否开启自动测试
        if (autoTest) {
            this.gameInstace.ChangeToMode(EnumGameMode.Loading, { nextMode: EnumGameMode.RobotTesting });
        }
    }
}
new MainGame();
//# sourceMappingURL=MainGame.js.map