namespace Global {
    /**
     * @desc 定义错误等级
     */
    enum LogLevel {
        Info = 0,       // 信息
        Warn = 1,       // 警告
        Error = 2,      // 一般错误
        FatalError = 3, // 致命错误
    }
    /**
     * @desc 封装与日志输出相关的功能,方便以后扩展
     */
    export class Log {
        // private static logLevel: LogLevel = LogLevel.Error;   // 输出的日志等级
        private static logLevel: LogLevel = LogLevel.Info;   // 输出的日志等级

        // 设置日志的输出等级
        public set LogLevel(level: LogLevel) {
            Log.logLevel = level;
        }

        private static Time(): string {
            return new Date().toLocaleTimeString();
        }

        /**
         * 输出Info
         */
        public static Info(message?: any, ...optionalParams: any[]): void {
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
        public static Warn(message?: any, ...optionalParams: any[]): void {
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
        public static Error(message?: any, ...optionalParams: any[]): void {
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
        public static Fatal(message?: any, ...optionalParams: any[]): void {
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
        public static Assert(test?: boolean, message?: string, ...optionalParams: any[]): void {
            console.assert(test, message, optionalParams);
        }
    }
}