const keystone = require("keystone");
const path = require("path");
const dir =
  process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "..", "..", "keystone", "routes")
    : __dirname;
const importRoutes = keystone.importer(dir);

const routes = {
  api: importRoutes("./api")
};
// I need keystone to serve index.html at every possible route,
// EXCEPT those that start with /keystone
exports = module.exports = function(app) {
  app.all("/api*", keystone.middleware.cors);
  app.get("/api/posts", routes.api.getPosts);
  app.get("/api/post", routes.api.getPost);
  app.get("/api/pages", routes.api.getPages);
  app.get("/api/series", routes.api.getSeries);
};
