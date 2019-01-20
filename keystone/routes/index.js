const keystone = require("keystone");
const importRoutes = keystone.importer(__dirname);

const routes = {
  api: importRoutes("./api")
};

exports = module.exports = function(app) {
  app.get("/", routes.api.index);
  app.all("/api*", keystone.middleware.cors);
  app.get("/api/posts", routes.api.getPosts);
};
