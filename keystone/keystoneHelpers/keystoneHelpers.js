var keystone = require("keystone");
var Post = keystone.list("Post");
var Series = keystone.list("Series");

/**
 * Get neighbors. Should be done after all mongoose queries are finished
 * as it turns the object into json.
 * @param {*} post
 * @param {*} series
 */
const getSeriesPostNeighbors = async (post, series) => {
  const postJSON = post.toJSON();
  const previousPost = await Post.model
    .findOne({ series })
    .where("seriesOrder")
    .equals(post.seriesOrder - 1)
    .select("slug seriesOrder");

  postJSON.previousPost = previousPost;

  const nextPost = await Post.model
    .findOne({ series })
    .where("seriesOrder")
    .equals(post.seriesOrder + 1)
    .select("slug seriesOrder");

  postJSON.nextPost = nextPost;
  return postJSON;
};

module.exports = {
  getSeriesPostNeighbors
};
