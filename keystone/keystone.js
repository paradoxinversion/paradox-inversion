const keystone = require("keystone");
keystone.init({
  "cookie secret": "secure string",
  name: "Paradox Inversion",
  "user model": "User",
  "auto update": true,
  auth: true,
  "trust proxy": "loopback",
  static: "../dist"
});
keystone.set("cors allow origin", true);
// Import our models directory
keystone.import("models");

// Tell keystone where to find routes
keystone.set("routes", require("./routes"));

keystone.start();
