const keystone = require("keystone");
const importRoutes = keystone.importer(__dirname);

const routes = {
  api: importRoutes("./api")
};

exports = module.exports = function(app) {
  app.get("/", routes.api.index);
  app.get("/api/posts", routes.api.getPosts);
};
