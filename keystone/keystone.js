const keystone = require("keystone");
const path = require("path");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

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
  logger: "dev"
});
keystone.import("models");
// Import our models directory

// Import routes from express app

app.prepare().then(() => {
  keystone.set("cors allow origin", true);
  keystone.set("routes", require("./routes/index")(app));
  keystone.start();
});
