var keystone = require("keystone");
var Story = keystone.list("Story");
const StoryPost = keystone.list("StoryPost");

/**
 * Returns a story matching the req.title
 */
module.exports = async function(req, res) {
  let story;
  let titleQuery = req.query.title;
  if (titleQuery) {
    story = await Story.model
      .findOne({ title: titleQuery })
      .populate("author", "displayName");

    const parts = await StoryPost.model.find({ story: story.title });
    if (parts) {
      return res.json(parts);
    }
  }
  // if (story) {
  //   return res.json(story);
  // }
  return res.json({ error: "No posts found" });
};
