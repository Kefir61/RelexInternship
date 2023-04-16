import { format, utcToZonedTime } from "date-fns-tz";

export const formattedDateTZ = (dateTZ:string) => {
    const dateTmp = new Date(dateTZ);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const zonedDate = utcToZonedTime(dateTmp, timeZone);
    const pattern = "dd.MM.yyyy HH:mm";
    return format(zonedDate, pattern, { timeZone });
  }