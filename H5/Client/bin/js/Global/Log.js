var Global;
(function (Global) {
    /**
     * @desc 定义错误等级
     */
    let LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["Info"] = 0] = "Info";
        LogLevel[LogLevel["Warn"] = 1] = "Warn";
        LogLevel[LogLevel["Error"] = 2] = "Error";
        LogLevel[LogLevel["FatalError"] = 3] = "FatalError";
    })(LogLevel || (LogLevel = {}));
    /**
     * @desc 封装与日志输出相关的功能,方便以后扩展
     */
    class Log {
        // 设置日志的输出等级
        set LogLevel(level) {
            Log.logLevel = level;
        }
        static Time() {
            return new Date().toLocaleTimeString();
        }
        /**
         * 输出Info
         */
        static Info(message, ...optionalParams) {
            if (Log.logLevel > LogLevel.Info)
                return;
            let prefix = Log.Time();
            prefix += " | Info  | ";
            console.log(prefix + message, ...optionalParams);
        }
        /**
         * 输出警告日志
         * @param message
         * @param optionalParams
         */
        static Warn(message, ...optionalParams) {
            if (Log.logLevel > LogLevel.Warn)
                return;
            let prefix = Log.Time();
            prefix += " | Warn  | ";
            console.warn(prefix + message, ...optionalParams);
        }
        /**
         * 输出错误日志
         * @param message
         * @param optionalParams
         */
        static Error(message, ...optionalParams) {
            if (Log.logLevel > LogLevel.Error)
                return;
            let prefix = Log.Time();
            prefix += " | Error | ";
            console.error(prefix + message, ...optionalParams);
        }
        /**
         * 输出致命错误日志
         * @param message
         * @param optionalParams
         */
        static Fatal(message, ...optionalParams) {
            if (Log.logLevel > LogLevel.FatalError)
                return;
            let prefix = Log.Time();
            prefix += " | Fatal | ";
            console.error(prefix + message, ...optionalParams);
        }
        /**
         * 输出一个Assert.
         * @param test
         * @param message
         * @param optionalParams
         */
        static Assert(test, message, ...optionalParams) {
            console.assert(test, message, optionalParams);
        }
    }
    // private static logLevel: LogLevel = LogLevel.Error;   // 输出的日志等级
    Log.logLevel = LogLevel.Info; // 输出的日志等级
    Global.Log = Log;
})(Global || (Global = {}));
//# sourceMappingURL=Log.js.map