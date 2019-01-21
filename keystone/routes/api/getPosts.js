var keystone = require("keystone");
var Post = keystone.list("Post");
var Category = keystone.list("Category");

/**
 * Get all posts matching a category or tag,
 * depending on which queryParameter is used (category or tagged)
 */
module.exports = async function(req, res) {
  let posts;
  let categoryQuery = req.query.category;
  let tagQuery = req.query.tagged;
  console.log(req.query);
  if (categoryQuery) {
    const category = await Category.model.find({
      name: categoryQuery
    });
    if (category) {
      posts = await Post.model
        .find({ category: category, state: "published" })
        .populate("category");
    } else {
      posts = [];
    }
  } else if (tagQuery) {
    console.log("weee");
    console.log(tagQuery);
    posts = await Post.model
      .find()
      .populate("category")
      .where("tags")
      .in([tagQuery]);
  } else {
    // posts = await Post.model.find({ state: "published" }).populate("category");
    posts = [];
  }
  if (posts) {
    return res.json(posts);
  }
  return res.json([]);
};
