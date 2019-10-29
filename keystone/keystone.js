const { NextApp } = require("@keystonejs/app-next");
const { Keystone } = require("@keystonejs/keystone");
const { MongooseAdapter } = require("@keystonejs/adapter-mongoose");
const path = require("path");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev
});

const keystone = new Keystone({
  name: "New Project",
  adapter: new MongooseAdapter()
});
// keystone.init({
//   "cookie secret": "secure string",
//   name: "Paradox Inversion",
//   "user model": "User",
//   "auto update": true,
//   auth: true,
//   "trust proxy": "loopback",
//   logger: "dev",
//   favicon: "../public/favicon.ico"
// });
// keystone.import("models");

// app.prepare().then(() => {
//   keystone.set("cors allow origin", true);
//   keystone.set("routes", require("./routes/index")(app));
//   keystone.start();
// });

module.exports = {
  keystone,
  apps: [new GraphQLApp(), new AdminUIApp(), new NextApp({ dir: "app" })],
  distDir
};
