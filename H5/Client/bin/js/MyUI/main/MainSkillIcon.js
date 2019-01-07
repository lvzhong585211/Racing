var MyUI;
(function (MyUI) {
    /**
     * 主界面技能图标
     */
    class MainSkillIcon extends ui.MainUI.MainSkillIconUI {
        constructor() {
            super();
            this.m_nDrawRadius = 0; // 冷却组件半径
            this.m_nTotalCooldown = 0; // 总冷却时间
            this.m_nEndTicks = 0; // 冷却结束时间
            // 由于Layabox自己提供的EffectAnimation不是按渲染帧逻辑执行的,所以当帧数不稳定时,会出现卡顿的感觉,这里我们自己实现动画效果
            this.mAniTime = 0; // 保存动画的剩余时间(秒)
            this.mAniTotalTime = 1; // 动画的总时间(秒)
            this.mAniTargetScale = 1; // 目标缩放值
            this.mAniStartScale = 1; // 起始缩放值
            this.mOrgScale = 1; // 初始值.注: 使用者可能会在界面编辑器中修改初始缩放值
            this.mAniEndCallback = null; // 保存动画结束时的回调
            this.mAniCalcT = null; // 计算插值T的函数
            this._imgLock.visible = false;
            this.m_nDrawRadius = this._imgBg.width / 2 - 4;
            this.m_compCooldown = new Laya.Component();
            this.m_compCooldown.anchorX = 0.5;
            this.m_compCooldown.anchorY = 0.5;
            this.m_compCooldown.alpha = 0.7;
            this.m_compCooldown.rotation = 270;
            this.m_compCooldown.pos(42, 42);
            this.addChildAt(this.m_compCooldown, this.getChildIndex(this._txtCooldown));
        }
        createChildren() {
            super.createChildren();
        }
        destroy(destroyChild) {
            super.destroy(destroyChild);
            this.m_dtSkill = null;
        }
        /**
         * 清空显示
         */
        clearUI() {
            this.off(Laya.Event.MOUSE_DOWN, this, this._onPressHandler);
            this._txtCooldown.text = "";
            this._imgIcon.skin = null;
            this.m_dtSkill = null;
        }
        /**
         * 技能ID
         */
        get skillID() { return this.m_dtSkill ? this.m_dtSkill.SkillID : 0; }
        /**
         * 设置背景皮肤
         */
        set bgSkin(value) {
            this._imgBg.skin = Global.getMainAtlasImgPath(value);
            this.m_nDrawRadius = this._imgBg.width / 2 - 4;
            MyUI.enlargeHitArea(this, this._imgBg.width, this._imgBg.height);
        }
        /**
         * 更新显示
         * @param dtSkill 技能Data
         */
        updateUI(dtSkill = null) {
            if (!dtSkill) {
                this.clearUI();
                return;
            }
            this.m_dtSkill = dtSkill;
            const voSkill = tableMgr.magicsTable.Find(dtSkill.SkillID);
            this._imgIcon.skin = Global.getSkillIconPath(voSkill.MagicIcon);
            this.totalCooldown = Global.GetSkillCoolDownTicks(dtSkill.SkillID);
            this.on(Laya.Event.MOUSE_DOWN, this, this._onPressHandler);
            this.mOrgScale = this.scaleX; // 记录一下初始缩放值,后面做动画时使用
        }
        /**
         * 设置总冷却时间
         */
        set totalCooldown(value) {
            this.m_nTotalCooldown = value;
            this.m_nEndTicks = value + TimeManager.getCorrectLocalTime();
            if (value > 0)
                Laya.timer.frameLoop(1, this, this._updateCooldown);
        }
        /**
         * 是否未解锁
         */
        set lock(value) {
            this._imgLock.visible = value;
        }
        /**
         * 按下处理
         * @param e
         */
        _onPressHandler(e) {
            Laya.stage.once(Laya.Event.MOUSE_UP, this, this._onRaiseHandler); // 监听鼠标抬起事件
            // 初始化动画
            this.mAniTotalTime = 12 / 60 * 1000; // (毫秒)这个值是从寻龙记的Unity项目的GSkillIcon1_01.anim中抄过来的
            this.mAniTargetScale = 0.8 * this.mOrgScale;
            this.mAniTime = this.mAniTotalTime;
            this.mAniStartScale = this.scaleX; // 按下时重置缩放值为1,以便带来更好的手感
            this.mAniEndCallback = () => {
                Laya.timer.clear(this, this._onUpdateScale); // 停止动画
            };
            // 计算参数T的公式
            this.mAniCalcT = () => {
                const t = this.mAniTime / this.mAniTotalTime;
                // return t * t * t * t;	// 4次方插值
                return Math.pow(2, -10 * (1 - t)); // 指数插值,我们希望开始时按钮缩小的快一些,这样力度感更强!
            };
            Laya.timer.frameLoop(1, this, this._onUpdateScale);
            // 测试代码
            // MyUI.DamageHudManager.instance().showDamage(GameMode.getLocalPlayer().getPositionRef(), 1000, DamageType.DAMAGETYPE_DEFAULT);
            // 调用本地玩家的控制器来偿试释放指定的技能
            GameMode.getLocalPlayerController().trySkillAttack(this.m_dtSkill.SkillID);
            // Test... 技能添加冷却
            // Global.AddSkillCoolDown(this.skillID);			
        }
        /**
         * 每帧调用,用来更新缩放值
         */
        _onUpdateScale() {
            // 更新时间间隔
            this.mAniTime -= Laya.timer.delta;
            if (this.mAniTime <= 0) {
                this.mAniTime = 0;
                this.mAniEndCallback();
            }
            // 线性插值计算目标缩放值
            const t = this.mAniCalcT();
            const scale = this.mAniTargetScale + (this.mAniStartScale - this.mAniTargetScale) * t;
            this.scale(scale, scale, true);
        }
        /**
         * 抬起处理
         * @param e
         */
        _onRaiseHandler(e) {
            // 初始化动画
            this.mAniTotalTime = 8 / 60 * 1000; // (毫秒)这个值是从寻龙记的Unity项目的GSkillIcon1_02.anim中抄过来的
            this.mAniTargetScale = 1.3 * this.mOrgScale;
            this.mAniTime = this.mAniTotalTime;
            this.mAniStartScale = this.scaleX;
            this.mAniEndCallback = () => {
                // 开启下一段动画.即缩放会有一个回弹的效果
                this.mAniTotalTime = 5 / 60 * 1000; // (毫秒)这个值是从寻龙记的Unity项目的GSkillIcon1_02.anim中抄过来的
                this.mAniTargetScale = this.mOrgScale;
                this.mAniTime = this.mAniTotalTime;
                this.mAniStartScale = this.scaleX;
                this.mAniEndCallback = () => {
                    Laya.timer.clear(this, this._onUpdateScale); // 停止动画
                };
            };
            // 计算参数T的公式
            this.mAniCalcT = () => {
                return this.mAniTime / this.mAniTotalTime; // 线性插值
            };
            Laya.timer.frameLoop(1, this, this._onUpdateScale);
        }
        /**
         * 更新冷却显示
         */
        _updateCooldown() {
            const nLeftTicks = this.m_nEndTicks - TimeManager.getCorrectLocalTime();
            this.m_compCooldown.graphics.clear();
            if (nLeftTicks <= 0) {
                Laya.timer.clear(this, this._updateCooldown);
                this._txtCooldown.text = "";
            }
            else {
                const nEndAngle = 360 - Math.floor((nLeftTicks / this.m_nTotalCooldown) * 360);
                this.m_compCooldown.graphics.drawPie(0, 0, this.m_nDrawRadius, nEndAngle, 360, "#666666");
                this._txtCooldown.text = Math.ceil(nLeftTicks / 1000).toString();
            }
        }
    }
    MyUI.MainSkillIcon = MainSkillIcon;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=MainSkillIcon.js.map