export class DateHelper {
  public static formatDate(date: string, dateFormat: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    const formattedDate: string = new Date(date).toLocaleString(
      dateFormat,
      options,
    );

    return formattedDate;
  }

  public static getWeekDay(date: string, format: string, lang: string) {
    let formattedDate: string = date;
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: format as "long" | "short",
    };

    formattedDate = new Date(date).toLocaleString(lang, options).split(" ")[0];

    return formattedDate;
  }

  public static setSeparator(date: string, separater: string) {
    return date.replace(/-|\/|\./g, separater);
  }
}
