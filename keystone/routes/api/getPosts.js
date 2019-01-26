var keystone = require("keystone");
var Post = keystone.list("Post");
var Category = keystone.list("Category");
var Page = keystone.list("Page");

/**
 * Get all posts matching a category or tag,
 * depending on which queryParameter is used (category or tagged)
 */
module.exports = async function(req, res) {
  let posts;
  const searchType = req.query.searchType;
  const query = req.query.query;
  if (searchType && query) {
    switch (searchType) {
      case "category":
        const category = await Category.model.find({
          name: query
        });
        if (category) {
          posts = await Post.model
            .find({ category: category, state: "published" })
            .populate("category");
        } else {
          posts = [];
        }
        break;
      case "tagged":
        posts = await Post.model
          .find()
          .populate("category")
          .where("tags")
          .in([query]);

        console.log("found", posts);
        break;
      case "page":
        const page = await Page.model.find({
          slug: query
        });
        console.log(page);
        if (page) {
          posts = await Post.model.find({ page: page, state: "published" });
        } else {
          posts = [];
        }
      default:
        break;
    }
  } else {
    console.log("elsecase");
    posts = [];
  }
  if (posts) {
    return res.json(posts);
  }
  // return res.json([]);
};
