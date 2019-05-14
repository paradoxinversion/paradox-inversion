var keystone = require("keystone");
var Story = keystone.list("Story");
const StoryPost = keystone.list("StoryPost");

/**
 * Returns a story matching the req.query.title
 */
module.exports = async function(req, res) {
  let story;
  let slugQuery = req.query.query;
  if (slugQuery) {
    story = await Story.model
      .findOne({ slug: slugQuery })
      .populate("author", "displayName");

    if (story) {
      return res.json(story);
    }
  }

  return res.json({ error: "No posts found" });
};
