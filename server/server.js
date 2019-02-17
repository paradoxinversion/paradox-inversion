const express = require("express");
const multer = require("multer");
const body = require("body-parser");
const keystone = require("../keystone/keystone");
const app = express();
// const port = 3000;

// app.get("/", (req, res) => res.send("Hello World!"));
app.use(body.urlencoded({ extended: true }));
app.use(body.json());
app.use(multer());
// This is where your normal routes and files are handled
app.get("/derp", function(req, res, next) {
  res.send("derp world");
});
// const ksRoutes = require("../keystone/routes/index.js")(app);
keystone.initializeKeystone(app);
const ksRoutes = require("../keystone/routes/index.js")(app);
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
