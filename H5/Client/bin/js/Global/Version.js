var Global;
(function (Global) {
    // 封装版本信息
    class VersionInfo {
        /**
         * @desc 返回版本的描述. 类似 0.9.100.100
         */
        static get versionDesc() {
            return `0.9.${VersionInfo.appVersion}.${VersionInfo.resVersion}`; // 0.9. 表示基础版本号.如果需要升级请对应修改即可.
        }
    }
    VersionInfo.appVersion = 100; // 程序的版本号,发布时应该维护此版本号
    VersionInfo.resVersion = 100; // 资源的版本号,发布时应该维护此版本号
    VersionInfo.development = true; // 标识是否是开发版本,有些功能会在开发版本中开启
    Global.VersionInfo = VersionInfo;
})(Global || (Global = {}));
//# sourceMappingURL=Version.js.map