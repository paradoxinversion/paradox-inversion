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
exports = module.exports = nextApp => keystoneApp => {
  const handle = nextApp.getRequestHandler();

  keystoneApp.all("/api*", keystone.middleware.cors);
  keystoneApp.get("/api/posts", routes.api.getPosts);
  keystoneApp.get("/api/post", routes.api.getPost);
  keystoneApp.get("/api/pages", routes.api.getPages);
  keystoneApp.get("/api/series", routes.api.getSeries);
  keystoneApp.get("*", (req, res) => {
    return handle(req, res);
  });
};
