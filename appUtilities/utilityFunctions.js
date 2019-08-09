const moment = require("moment");

export const formatDate = date => {
  const momentFormattedDate = moment(date).format("LLL");
  return momentFormattedDate;
};

export const formatPostPath = (postDate, slug) => {
  const d = new Date(postDate);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return `/post/${year}/${month}/${day}/${slug}`;
};

export const getPostPathParts = postDate => {
  const d = new Date(postDate);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return [year, month, day];
};
