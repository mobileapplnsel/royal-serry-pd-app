import { parseISO, format } from "date-fns";

export default class DateTimeHelper {

  public static GetTodayDay(): number {
    return (new Date()).getDate()
  }
  public static GetToday(): Date {
    var tempDate = new Date()
    return new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());
  }

  public static GetCleanDateObject(date: Date | undefined): Date | undefined {
    if (!date) {
      return null;
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
  }

  public static ToDdMmmYyyy(date: Date | undefined): string {
    if (!date) {
      return "";
    }
    return format(date, "dd-MMM-yyyy");
  }
  public static ToMmmmYyyy(date: Date | undefined): string {
    if (!date) {
      return "";
    }
    return format(parseISO(date.toString()), "MMMM yyyy");
  }
  public static ToMonthNameMmmm(date: Date | undefined): string {
    if (!date) {
      return "";
    }
    return format(parseISO(date.toString()), "MMMM");
  }

  public static ToDdMmmYyyyHhMmssAmPm(date: Date | undefined): string {
    if (!date) {
      return "";
    }
    //console.log("ToDdMmmYyyyHhMmssAmPm",date)
    return format(date, "dd-MMM-yyyy h:mm a");
  }
  public static ToHhMmssAmPm(date: Date | undefined): string {
    if (!date) {
      return "";
    }
    return format(date, "h:mm a");
  }
  public static InputDateFormater(date: Date | undefined) {
    if (!date) {
      return date;
    }
    return new Date(new Date(date).getTime() - new Date(date).getTimezoneOffset() * 60000);
  }
  public static ParseISO(date: Date | undefined): Date {
    if (!date) {
      return (null as unknown) as Date;
    }
    return parseISO(date.toString());
  }
}
