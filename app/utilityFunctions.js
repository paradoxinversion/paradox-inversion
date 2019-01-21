const moment = require("moment");

export function formatDate(date) {
  const momentFormattedDate = moment(date).format("LLL");
  return momentFormattedDate;
}
