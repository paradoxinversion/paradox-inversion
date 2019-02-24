const keystone = require("keystone");
const path = require("path");
const initializeKeystone = app => {
  const dir =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "..", "..", "keystone")
      : __dirname;
  keystone.init({
    "cookie secret": "secure string",
    name: "Paradox Inversion",
    "user model": "User",
    "auto update": true,
    auth: true,
    "trust proxy": "loopback",
    static: "../dist",
    logger: "dev",

    "module root": dir
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
