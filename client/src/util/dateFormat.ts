import moment from "moment-timezone";

export const dateFormat = (date: Date) => {
  const m = moment(date).utc(); // "2024-01-29T15:08:15Z"
  return m.format("YYYY.MM.DD");
};
