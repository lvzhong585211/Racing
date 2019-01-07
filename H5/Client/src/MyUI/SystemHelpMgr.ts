namespace MyUI {

    /**
     * 新手引导的静态类
     */
    export class SystemHelpMgr {

        /**
         * 是否允许自动寻路和自动战斗(非强制引导)
         */
        public static canAutoRoad(): boolean {
            return true;

            // to do ...
            /*
            if (null != PlayGameGuide.singleton && PlayGameGuide.singleton.Visibility) {
                return false;
            }
            if (SystemHelpMgr.ActiveHelpID > 0 && SystemHelpMgr.ActiveHelpID <= 1000) {
                return false;
            }
            if (Global.Data.WaitingForSystemHelp) {
                return false;
            }

            return true;
            */
        }
    }
}