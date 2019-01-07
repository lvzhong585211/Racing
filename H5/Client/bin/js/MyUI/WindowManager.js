var MyUI;
(function (MyUI) {
    var ClassUtils = laya.utils.ClassUtils;
    var Log = Global.Log;
    /**
     * 功能窗口管理器
     */
    class WindowManager extends laya.ui.DialogManager {
        constructor() {
            super();
            this.m_mapWindows = new Map();
            this.registerWindows();
        }
        /**
         * 注册所有窗口类
         */
        registerWindows() {
            this.registerOneWindow(WindowID.Role, MyUI.role.RoleWindow);
            this.registerOneWindow(WindowID.GoodsTip, MyUI.GoodsTip);
            this.registerOneWindow(WindowID.EquipTip, MyUI.EquipTip);
            this.registerOneWindow(WindowID.NpcDoingTask, MyUI.NpcDoingTaskPart);
            this.registerOneWindow(WindowID.Forge, MyUI.forge.ForgeWindow);
            this.registerOneWindow(WindowID.PromptBox, MyUI.PromptBox);
            this.registerOneWindow(WindowID.MaoXian, MyUI.Activity.ActivityWindow);
            this.registerOneWindow(WindowID.Map, MyUI.MapUI.MapWindow);
            this.registerOneWindow(WindowID.FunOpenTiShiPart, MyUI.FunOpenTiShiPart);
            this.registerOneWindow(WindowID.SystemOpenFlyPart, MyUI.SystemOpenFlyPart);
            this.registerOneWindow(WindowID.Vip, MyUI.VipPart);
            this.registerOneWindow(WindowID.Welfare, MyUI.Welfare.WelfareWindow);
            this.registerOneWindow(WindowID.Mall, MyUI.Mall.MallWindow);
        }
        /**
         * 注册一个窗口类
         * @param nWinID 窗口ID，对应WindowID中的枚举
         * @param clsWin 窗口对应的类
         */
        registerOneWindow(nWinID, clsWin) {
            Log.Assert(nWinID < WINDOW_PART_BASE_ID, `the registered window's ID can't greater than ${WINDOW_PART_BASE_ID}`);
            const sClsName = this._getRegisteredClassName(nWinID);
            if (ClassUtils.getRegClass(sClsName)) {
                Log.Assert(false, `${sClsName}(${nWinID}) had been registered!!! `);
            }
            ClassUtils.regClass(sClsName, clsWin);
        }
        /**
         * 打开一个窗口
         * @param nWinID 窗口ID，对应WindowID中的枚举
         * @param args 传递给窗口的参数，在窗口里面重写dataSource方法接收处理
         * @param closeOther 是否关闭其它的对话框，若值为true则关闭其它对话框
         * @param showEffect 是否显示弹出效果
         */
        openWindow(nWinID, args, closeOther = false, showEffect = true) {
            const win = this._getWindowWithInit(nWinID);
            if ("willOpenTabId" in win) {
                win["willOpenTabId"] = nWinID;
            }
            win.dataSource = args;
            win.popup(closeOther, showEffect);
            return win;
        }
        /**
         * 关闭一个窗口
         * @param nWinID 窗口ID，对应WindowID中的枚举
         * @param type 如果是点击默认关闭按钮触发，则传入关闭按钮的名字(name)，否则为null
         * @param showEffect 是否显示关闭效果
         */
        closeWindow(nWinID, type = null, showEffect = true) {
            const win = this.getWindow(nWinID);
            if (win && win.isPopup) {
                win.close(type, showEffect);
            }
        }
        /**
         * 获取一个窗口（如果窗口没有初始化，则返回undefined）
         * @param nWinID 窗口ID，对应WindowID中的枚举
         */
        getWindow(nWinID) {
            let win = undefined;
            const nKey = this._calcOriginalID(nWinID);
            if (this.m_mapWindows.has(nKey)) {
                win = this.m_mapWindows.get(nKey);
            }
            return win;
        }
        /**
         * 切换场景时关闭打开的窗口
         */
        closeWindowsWhenChangeLevel() {
            this._closeWindows(); // 如果有需要保留的窗口以后可以传进方法里面
        }
        /**
         * 关闭所有打开的窗口
         * @param aExcludeWinIds 不需要关闭的窗口ID列表
         */
        _closeWindows(aExcludeWinIds) {
            const aKeys = []; // 全局不需要关闭的窗口ID可以直接写在数组里面
            if (!Global.isNullOrUndefined(aExcludeWinIds)) {
                aExcludeWinIds.forEach(element => {
                    const nKey = this._calcOriginalID(element);
                    if (aKeys.indexOf(nKey) === -1) {
                        aKeys.push(nKey);
                    }
                });
            }
            // 关闭所有不需要保持打开的窗口
            this.m_mapWindows.forEach((value, key) => {
                if (aKeys.indexOf(key) === -1 && value.isPopup) {
                    value.close(null, false);
                }
            });
        }
        /**
         * 1秒种最多执行5次的更新函数.适合不及时的逻辑
         * @param elapsedTime 上次调用以来经过的时间(秒)
         */
        slowUpdate(elapsedTime) {
            this._childs.forEach(child => {
                if (!child.destroyed) {
                    if (child.isPopup && GameMode.isSlowUpdateImp(child)) {
                        child.slowUpdate(elapsedTime);
                    }
                }
            });
        }
        /**
         * 每帧被调用
         * @param   elapsedTime 上次调用以来经过的时间(秒)
         */
        frameMove(elapsedTime) {
            this._childs.forEach(child => {
                if (!child.destroyed) {
                    if (child.isPopup && GameMode.isFrameMoveImp(child)) {
                        child.frameMove(elapsedTime);
                    }
                }
            });
        }
        /**
         * 获取一个窗口（如果窗口没有初始化，则初始化此窗口并返回）
         * @param nWinID 窗口ID，对应WindowID中的枚举
         */
        _getWindowWithInit(nWinID) {
            let win = undefined;
            const nKey = this._calcOriginalID(nWinID);
            if (this.m_mapWindows.has(nKey)) {
                win = this.m_mapWindows.get(nKey);
            }
            else {
                const sClsName = this._getRegisteredClassName(nKey);
                if (!ClassUtils.getRegClass(sClsName)) {
                    Log.Assert(false, `${sClsName}(${nKey}) hasn't registered!!!`);
                }
                this._destroyUnusedWindow();
                win = ClassUtils.getInstance(sClsName);
                win.name = `${nKey}`;
                this._enlargeCloseHitArea(win);
                this.m_mapWindows.set(nKey, win);
            }
            return win;
        }
        /**
         * 根据窗口ID获取注册的类名字
         * @param nWinID 窗口ID，对应WindowID中的枚举
         */
        _getRegisteredClassName(nWinID) {
            return `Window_${WindowID[nWinID]}`;
        }
        /**
         * 根据窗口ID计算出实例窗口ID（map字典中对应的key值）
         * @param nWinID 窗口ID，对应WindowID中的枚举
         */
        _calcOriginalID(nWinID) {
            while (nWinID >= WINDOW_PART_BASE_ID) {
                nWinID = Math.floor(nWinID / WINDOW_PART_BASE_ID);
            }
            return nWinID;
        }
        /**
         * 扩大关闭按钮的点击区域
         * @param win
         */
        _enlargeCloseHitArea(win) {
            if (!win["_btnClose"])
                return;
            const btnClose = win["_btnClose"];
            MyUI.enlargeHitArea(btnClose, 80, 80);
        }
        /**
         * 销毁不使用的窗口
         */
        _destroyUnusedWindow() {
            // 找到所有已经初始化但是没有显示的窗口，destroy掉
            const aDels = [];
            this.m_mapWindows.forEach((value, key) => {
                if (!value.isPopup && this._canDestroy(key)) {
                    value.destroy(true);
                    aDels.push(key);
                }
            });
            // 从窗口字典里面移除掉
            aDels.forEach(element => {
                this.m_mapWindows.delete(element);
            });
        }
        /**
         * 是否可以销毁
         * @param nWinID 窗口ID，对应WindowID中的枚举
         */
        _canDestroy(nWinID) {
            switch (nWinID) {
                case WindowID.GoodsTip:
                case WindowID.EquipTip:
                    return false;
            }
            return true;
        }
        /**
         * 销毁此对象
         * @param destroyChild （可选）是否同时销毁子节点
         */
        destroy(destroyChild) {
            this.m_mapWindows.forEach((value, key) => value.destroy(destroyChild));
            this.m_mapWindows.clear();
            super.destroy(destroyChild);
            this.m_mapWindows = null;
        }
    }
    MyUI.WindowManager = WindowManager;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=WindowManager.js.map