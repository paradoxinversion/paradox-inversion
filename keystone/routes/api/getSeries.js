var keystone = require("keystone");
var Series = keystone.list("Series");

/**
 * Returns a series matching the req.query.title
 */
module.exports = async function(req, res) {
  let series;
  let slugQuery = req.query.query;
  if (slugQuery) {
    series = await Series.model
      .findOne({ slug: slugQuery })
      .populate("author", "displayName");

    if (series) {
      return res.json(series);
    }
  }

  return res.json({ error: "No seriees found" });
};
