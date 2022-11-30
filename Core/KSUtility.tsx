import DateTimeHelper from "./Helper/DateTimeHelper";

export default class KSutility {
    public static RupeeSymbol = '\u20B9';

    public static IsNullOrEmpty(data: string): boolean {
        return (data === undefined || data === null || data === "");
    }
    public static InputDateFormater(date: Date | undefined) {
        return DateTimeHelper.InputDateFormater(date);
    }
    public static GetValueIfNotNull(data: any, replaceValue): any {
        if (data === undefined || data === null || data === "") {
            return replaceValue
        }

        return data
    }
}