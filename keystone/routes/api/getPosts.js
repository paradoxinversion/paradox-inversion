var keystone = require("keystone");
var Post = keystone.list("Post");
var Category = keystone.list("Category");
var Page = keystone.list("Page");
var Series = keystone.list("Series");
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
          slug: query
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

        break;
      case "series":
        // Get the series object (we'll use it to get the associated posts)
        const series = await Series.model.find({ slug: query });
        posts = await Post.model.find({ series }).sort({ seriesOrder: 1 });

        posts = await Promise.all(
          posts.map(async seriesPost => {
            const postJSON = seriesPost.toJSON();
            const previousPost = await Post.model
              .findOne({ series })
              .where("seriesOrder")
              .equals(seriesPost.seriesOrder - 1)
              .select("slug seriesOrder");

            postJSON.previousPost = previousPost;

            const nextPost = await Post.model
              .findOne({ series })
              .where("seriesOrder")
              .equals(seriesPost.seriesOrder + 1)
              .select("slug seriesOrder");

            postJSON.nextPost = nextPost;
            return postJSON;
          })
        );
        break;
      case "page":
        const page = await Page.model.find({
          slug: query
        });
        if (page) {
          posts = await Post.model.find({ page: page, state: "published" });
        } else {
          posts = [];
        }
      default:
        break;
    }
  } else {
    posts = [];
  }
  if (posts) {
    return res.json(posts);
  }
};
