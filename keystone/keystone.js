const keystone = require("keystone");
const path = require("path");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev
});

keystone.init({
  "cookie secret": "secure string",
  name: "Paradox Inversion",
  "user model": "User",
  "auto update": true,
  auth: true,
  "trust proxy": "loopback",
  logger: "dev",
  favicon: "../public/favicon.ico"
});
keystone.import("models");
// Import our models directory

// Import routes from express app

app.prepare().then(() => {
  keystone.set("cors allow origin", true);
  keystone.set("routes", require("./routes/index")(app));
  keystone.start();
});
