namespace TimeManager {
    let LocalTimeSubServerTime: number = 0;      // 保存本地时间减去服务器时间的差(毫秒?).注: JS中最大的整数按毫秒来计算,足够表示从  0001 年 1 月 1 日午夜 12:00:00 以来所经历的时间(毫秒)
    const before1970: number = 62135625600000;  // 62135625600000 从 0001年1月到1970年1月的毫秒。

    /**
     * 返回同C#的DateTime.Now相同的时间(毫秒)
     */
    export function now(): number {
        return Date.now() + before1970;     // before1970 从 1900年1月到1970年1月的毫秒。
    }

    /**
     * 同步服务器时间
     * @param timeOffset 指定服务器时间与本地时间的差值(毫秒)
     */
    export function syncServerTime(timeOffset: number) {
        LocalTimeSubServerTime = timeOffset;
    }

    /** 获取校正过的本地时间(服务器时间?)(毫秒) */
    export function getCorrectLocalTime(): number {
        return TimeManager.now() - LocalTimeSubServerTime;
    }

    /**
     * 把给定的字符串转换成对应C#的DateTime.TryParse()的毫秒
     * @param strDateTime 指定要转换的时间
     */
    export function safeConvertToTicks(strDateTime: string): number {
        return Date.parse(strDateTime) + before1970;
    }

    /**
     * 格式化毫秒，转换成'x天x时x分x秒'的形式
     * @param nMillisecs 需要转换的毫秒数
     * @param bIgnoreZero 是否省略0（如果秒为0就不显示秒，分和秒都为0就不显示分和秒）
     */
    export function formatMilliseconds(nMillisecs: number, bIgnore0: boolean = false) {
        const minuteMillisecs = 60 * 1000; // 一分钟的毫秒数
        const hourMillisecs = 60 * minuteMillisecs; // 一小时的毫秒数
        const dayMillisecs = 24 * hourMillisecs; // 一天的毫秒数
        const nDays = Math.floor(nMillisecs / dayMillisecs);
        const nHours = Math.floor((nMillisecs / hourMillisecs) % 24);
        const nMinutes = Math.floor((nMillisecs / minuteMillisecs) % 60);
        const nSeconds = Math.floor((nMillisecs / 1000) % 60);
        let sTime = "";
        if (nDays > 0) {
            sTime = Global.String.Format(ConfigLoca.UI_Time_Format_WithDay, nDays, formatTimeNum(nHours), formatTimeNum(nMinutes), formatTimeNum(nSeconds));
        } else if (nHours > 0) {
            sTime = Global.String.Format(ConfigLoca.UI_Time_Format_WithHour, formatTimeNum(nHours), formatTimeNum(nMinutes), formatTimeNum(nSeconds));
        } else if (nMinutes > 0) {
            sTime = Global.String.Format(ConfigLoca.UI_Time_Format_WithMinute, formatTimeNum(nMinutes), formatTimeNum(nSeconds));
        } else {
            sTime = Global.String.Format(ConfigLoca.UI_Time_Format_OnlySecond, formatTimeNum(nSeconds));
        }
        return sTime;
    }

    /**
     * 格式化毫秒，转换成'x天x时x分x秒'的形式，显示成省略0的格式（如果秒为0就不显示秒，分和秒都为0就不显示分和秒）
     * @param nMillisecs 需要转换的毫秒数
     * @param sDef 时间为0时，显示的默认值
     */
    export function formatMillisecondsShort(nMillisecs: number, sDef = "") {
        if (nMillisecs <= 0) {
            return sDef;
        }

        const minuteMillisecs = 60 * 1000; // 一分钟的毫秒数
        const hourMillisecs = 60 * minuteMillisecs; // 一小时的毫秒数
        const dayMillisecs = 24 * hourMillisecs; // 一天的毫秒数
        const nDays = Math.floor(nMillisecs / dayMillisecs);
        const nHours = Math.floor((nMillisecs / hourMillisecs) % 24);
        const nMinutes = Math.floor((nMillisecs / minuteMillisecs) % 60);
        const nSeconds = Math.floor((nMillisecs / 1000) % 60);
        let sTime = "";
        if (nDays > 0) {
            sTime += Global.String.Format(ConfigLoca.UI_Time_Format_OnlyDay, nDays);
        }
        if (nHours > 0) {
            sTime += Global.String.Format(ConfigLoca.UI_Time_Format_OnlyHour, nHours);
        }
        if (nMinutes > 0 || (nHours > 0 && nSeconds > 0)) {
            sTime += Global.String.Format(ConfigLoca.UI_Time_Format_OnlyMinute, nMinutes);
        }
        if (nSeconds > 0) {
            sTime += Global.String.Format(ConfigLoca.UI_Time_Format_OnlySecond, nSeconds);
        }
        return sTime;
    }
    /**
     * 格式化毫秒，转换成xx:xx:xx时间，不带时分秒文字
     * @param nMillisecs 
     */
    export function formatMillisecondsNoFont(nMillisecs: number) {
        const minuteMillisecs = 60 * 1000; // 一分钟的毫秒数
        const hourMillisecs = 60 * minuteMillisecs; // 一小时的毫秒数
        const dayMillisecs = 24 * hourMillisecs; // 一天的毫秒数
        const nDays = Math.floor(nMillisecs / dayMillisecs);
        const nHours = Math.floor((nMillisecs / hourMillisecs) % 24);
        const nMinutes = Math.floor((nMillisecs / minuteMillisecs) % 60);
        const nSeconds = Math.floor((nMillisecs / 1000) % 60);
        let sTime = "";
        sTime += nHours > 0 ? nHours > 9 ? nHours : "0" + nHours : "00";
        sTime += ":" + (nMinutes > 0 ? nMinutes > 9 ? nMinutes : "0" + nMinutes : "00");
        sTime += ":" + (nSeconds > 0 ? nSeconds > 9 ? nSeconds : "0" + nSeconds : "00");
        return sTime;
    }
    /**
     * 格式化时间的数字，不足两位的前面不足0 </br>
     * 当前JS版本不支持String.prototype.padStart()
     * @param value 
     */
    function formatTimeNum(value: number): string {
        return value > 9 ? `${value}` : `0${value}`;
    }

    /**
     * 获取传入的日期是那年的第几天
     * @param curDate 要计算的日期
     */
    export function getDayOfYear(curDate: Date): number {
        // 构造那年的1月1日
        const m1d1 = new Date(curDate.getFullYear(), 0, 1, 0, 0, 0);
        // 获取距离1月1日过去多少天
        const day = (curDate.getTime() - m1d1.getTime()) / (1000 * 60 * 60 * 24) + 1;
        return Math.floor(day);
    }
    /** 获取校正过的本地时间(服务器时间?)(毫秒) */
    export function getCorrectLocalTimes(): number {
        return TimeManager.now() - LocalTimeSubServerTime - before1970;
    }
    /**
     * 获得一个指定的时间(加上0001年1月到1970年1月的毫秒。
     */
    export function getBeforeTimes(millisecs: number): number {
        return millisecs + before1970 - LocalTimeSubServerTime;     // before1970 从 1900年1月到1970年1月的毫秒。
    }
}