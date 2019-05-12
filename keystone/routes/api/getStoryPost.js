var keystone = require("keystone");
var StoryPost = keystone.list("StoryPost");

/**
 * Return an individual post by it's slug or an error declaring none match,
 */
module.exports = async function(req, res) {
  let storyPost;
  let slugQuery = req.query.slug;
  if (slugQuery) {
    storyPost = await StoryPost.model
      .findOne({ slug: slugQuery, state: "published" })
      .populate("story")
      .populate("author", "displayName");
  }
  if (storyPost) {
    return res.json(storyPost);
  }
  return res.json({ error: "No posts found" });
};
