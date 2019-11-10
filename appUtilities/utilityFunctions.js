const moment = require("moment");

/**
 * Returns a nicely formatted date using moment.js
 * @param {Date} date
 */
export const formatDate = date => {
  const momentFormattedDate = moment(date).format("LLL");
  return momentFormattedDate;
};

/**
 * Returns a post endpoint using the date adn slug
 * @param {Date} postDate
 * @param {String} slug
 */
export const formatPostPath = (postDate, slug) => {
  const d = new Date(postDate);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return `/post/${year}/${month}/${day}/${slug}`;
};

/**
 * Returns the year, month, and day from a post's date
 * @param {*} postDate
 */
export const getPostPathParts = postDate => {
  const d = new Date(postDate);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return [year, month, day];
};
