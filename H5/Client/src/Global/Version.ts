namespace Global {
    // 封装版本信息
    export class VersionInfo {
        public static readonly appVersion: number = 100;    // 程序的版本号,发布时应该维护此版本号
        public static readonly resVersion: number = 100;    // 资源的版本号,发布时应该维护此版本号
        public static readonly development: boolean = true;  // 标识是否是开发版本,有些功能会在开发版本中开启

        /**
         * @desc 返回版本的描述. 类似 0.9.100.100
         */
        public static get versionDesc(): string {
            return `0.9.${VersionInfo.appVersion}.${VersionInfo.resVersion}`;   // 0.9. 表示基础版本号.如果需要升级请对应修改即可.
        }
    }
}