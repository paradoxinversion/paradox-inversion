var keystone = require("keystone");
var StoryPost = keystone.list("StoryPost");

/**
 * Return an individual post by it's slug or an error declaring none match,
 */
module.exports = async function(req, res) {
  let storyPosts;
  let slugQuery = req.query.storyId;
  if (slugQuery) {
    storyPosts = await StoryPost.model
      .find({ story: storyId, state: "published" })
      .populate("story")
      .populate("author", "displayName");
  }
  if (storyPosts) {
    return res.json(storyPosts);
  }
  return res.json({ error: "No posts found" });
};
