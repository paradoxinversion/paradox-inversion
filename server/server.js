const express = require("express");
const multer = require("multer");
const body = require("body-parser");
const keystone = require("../keystone/keystone");
const path = require("path");
const app = express();

app.use(body.urlencoded({ extended: true }));
app.use(body.json());
app.use(multer());
app.use(express.static("../dist"));

keystone.initializeKeystone(app);

const ksRoutes = require("../keystone/routes/index.js")(app);
/* 
  Routes below override keystone routes
*/

if (process.env.NODE_ENV === "production") {
  const clientPath = path.resolve(__dirname, "..", "client");

  app.use("/", express.static(clientPath));
  app.get("*", function(req, res) {
    console.log("sending", path.resolve(clientPath, "index.html"));
    res.sendFile(path.resolve(clientPath, "index.html"));
    console.log("sent");
  });
}
