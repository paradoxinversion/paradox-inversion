var keystone = require("keystone");
var Page = keystone.list("Page");

/**
 * Return an individual post by it's slug or an error declaring none match,
 */
module.exports = async function(req, res) {
  let pages = await Page.model.find({}).sort({ pageOrder: 1 });
  return res.json(pages);
};
