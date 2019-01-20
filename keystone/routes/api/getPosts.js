var keystone = require("keystone");
var Post = keystone.list("Post");
var Category = keystone.list("Category");

module.exports = async function(req, res) {
  let posts;
  let categoryQuery = req.query.category;
  if (categoryQuery) {
    const category = await Category.model.find({ name: categoryQuery });
    if (category) {
      posts = await Post.model.find({ category: category });
    } else {
      res.json([]);
    }
  } else {
    posts = await Post.model.find({});
  }
  if (posts) {
    return res.json(posts);
  }
  return res.json({});
};
