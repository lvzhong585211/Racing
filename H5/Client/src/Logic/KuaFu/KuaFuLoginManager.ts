namespace Logic {
    /**
     * 跨服相关的逻辑管理器
     */
    export class KuaFuLoginManager {

        /**
         * 获取跨服相关的登录信息
         * @param normal
         */
        public static GetKuaFuLoginString(normal: string): string {
            let loginStr = normal;

            // if (KuaFuServerLoginData == KuaFuServerLoginDataKuaFu && null != KuaFuServerLoginDataKuaFu && KuaFuServerLoginDataKuaFu.RoleId > 0) {
            //     //跨服登录
            //     loginStr = string.Format("{0}:{1}:{2}:{3}:{4}:{5}:{6}", normal, KuaFuServerLoginData.RoleId, KuaFuServerLoginData.GameId, KuaFuServerLoginData.GameType,
            //             KuaFuServerLoginData.ServerId, KuaFuServerLoginData.ServerIp, KuaFuServerLoginData.ServerPort);
            // }
            // else {
            loginStr = `${normal}:0:0:0:0::0`;
            // }

            return loginStr;
        }

        public static OnChangeServerComplete() {
            // TODO:
            // if (KuaFuServerLoginData == KuaFuServerLoginDataOriginal) {
            //     //切换回区服务器
            //     //清除临时信息
            //     KuaFuServerLoginDataOriginal.RoleId = 0;
            //     KuaFuServerLoginDataKuaFu = null;
            // }
            // else {
            //     //切换到跨服服务器

            // }
        }
    }
}