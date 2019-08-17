var keystoneHelpers = require("../../keystoneHelpers/keystoneHelpers");
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
      case "all":
        posts = (await Post.model.find({})) || [];
        break;

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
        const series = await Series.model.find({ slug: query });
        posts = await Post.model.find({ series }).sort({ seriesOrder: 1 });

        posts = await Promise.all(
          posts.map(async seriesPost => {
            return await keystoneHelpers.getSeriesPostNeighbors(
              seriesPost,
              series
            );
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
        break;
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
