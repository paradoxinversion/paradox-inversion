var keystone = require("keystone");
var Post = keystone.list("Post");
var Page = keystone.list("Page");

/**
 * Get all posts matching a page
 */
module.exports = async function(req, res) {
  let posts;
  let pageQuery = req.query.page;
  if (pageQuery) {
    const page = await Page.model.find({
      name: pageQuery
    });
    if (page) {
      posts = await Post.model.find({ page: page, state: "published" });
    } else {
      posts = [];
    }
  } else {
    posts = [];
  }
  if (posts) {
    return res.json(posts);
  }
  return res.json([]);
};
