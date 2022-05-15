import moment from "moment";

export function formatDate(date, formatOptions = DB_DATE_FORMAT) {
  moment(date || moment()).format(formatOptions);
}
