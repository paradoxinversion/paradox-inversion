var keystone = require("keystone");
var Post = keystone.list("Post");

module.exports = function(req, res) {
  return res.json(Post.model.find({}));
};
