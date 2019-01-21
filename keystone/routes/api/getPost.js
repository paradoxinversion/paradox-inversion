var keystone = require("keystone");
var Post = keystone.list("Post");

/**
 * Return an individual post by it's slug or an error declaring none match,
 */
module.exports = async function(req, res) {
  let post;
  let slugQuery = req.query.slug;
  if (slugQuery) {
    post = await Post.model
      .findOne({ slug: slugQuery, state: "published" })
      .populate("category");
  }
  if (post) {
    return res.json(post);
  }
  return res.json({ error: "No posts found" });
};
