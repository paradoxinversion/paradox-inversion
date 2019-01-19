const keystone = require("keystone");
keystone.init({
  "cookie secret": "secure string",
  name: "Paradox Inversion",
  "user model": "User",
  "auto update": true,
  auth: true
});
// Tell keystone where to find routes
keystone.set("routes", require("./routes"));

// Import our models directory
keystone.import("models");

keystone.start();
