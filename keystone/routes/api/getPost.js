var keystone = require("keystone");
var Post = keystone.list("Post");
const keystoneHelpers = require("../../keystoneHelpers/keystoneHelpers");
/**
 * Return an individual post by it's slug or an error declaring none match,
 */
module.exports = async function(req, res) {
  try {
    let post;
    let slugQuery = req.query.slug;
    if (slugQuery) {
      post = await Post.model
        .findOne({ slug: slugQuery, state: "published" })
        .populate("category")
        .populate("author", "displayName");

      if (post.series) {
        post = await keystoneHelpers.getSeriesPostNeighbors(post, post.series);
      }
    }
    if (post) {
      return res.json(post);
    }
    return res.json({ error: "No posts found" });
  } catch (e) {
    return res.json({ error: e.message });
  }
};
