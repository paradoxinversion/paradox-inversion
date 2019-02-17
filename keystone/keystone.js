const keystone = require("keystone");
const initializeKeystone = app => {
  keystone.init({
    "cookie secret": "secure string",
    name: "Paradox Inversion",
    "user model": "User",
    "auto update": true,
    auth: true,
    "trust proxy": "loopback",
    static: "../dist",
    logger: "dev"
  });
  keystone.set("cors allow origin", true);
  // Import our models directory
  keystone.import("models");

  // Import routes from express app
  keystone.set("routes", app);
  keystone.start();
};

module.exports = {
  initializeKeystone
};
