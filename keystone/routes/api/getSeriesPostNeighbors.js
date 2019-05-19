var keystone = require("keystone");
var Series = keystone.list("Series");
const Post = keystone.list("Post");
/**
 * Returns a series matching the req.query.title
 */
module.exports = async function(req, res) {
  let slugQuery = req.query.query;
  if (slugQuery) {
    originPost = await Post.model.findOne({ slug: slugQuery });
    results = [];
    previousPost = await Post.model
      .findOne({ series: originPost.series })
      .where("seriesOrder")
      .equals(originPost.seriesOrder - 1)
      .select("slug seriesOrder");

    if (previousPost) results.push(previousPost);
    nextPost = await Post.model
      .findOne({ series: originPost.series })
      .where("seriesOrder")
      .equals(originPost.seriesOrder + 1)
      .select("slug seriesOrder");

    if (nextPost) results.push(nextPost);

    return res.json(results);
  }

  return res.json({ error: "No seriees found" });
};
