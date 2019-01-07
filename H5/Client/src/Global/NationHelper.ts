/**
 * 国际化相关辅助函数可以统一放到这里
 */
namespace NationHelper {

    /**
     * 格式化数字（韩国版本要求数字每三个用`,`分割）
     * @param value 要格式化的数字
     */
    export function FormatNumber(value: number): string {
        // #if LANGUAGE_KOREA
        // return value.ToString("N0", CultureInfo.InvariantCulture);
        // #else
        return value.toString();
        // #endif
    }

    /**
     * 格式化战斗力或者属性数字显示（需求暂时不明确，可能要分割也可能不要分割，所以相关代码暂时调用这个方法）
     * @param value 要格式化的数字
     */
    export function FormatAttribute(value: number): string {
        return FormatNumber(value);
        // 属性和战力显示暂时不做格式化处理
        // return value.ToString();
    }
}