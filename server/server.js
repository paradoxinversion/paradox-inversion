const express = require("express");
const multer = require("multer");
const body = require("body-parser");
const keystone = require("../keystone/keystone");
const path = require("path");
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "../app/App";
import AppRouter from "../app/pages/AppRouter/AppRouter";
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

// if (process.env.NODE_ENV === "production") {
//   const clientPath = path.resolve(__dirname, "..", "client");

//   app.use("/", express.static(clientPath));
//   app.get("*", function(req, res) {
//     console.log("sending", path.resolve(clientPath, "index.html"));
//     res.sendFile(path.resolve(clientPath, "index.html"));
//     console.log("sent");
//   });
// }

if (process.env.NODE_ENV === "production") {
  const clientPath = path.resolve(__dirname, "..", "client");

  app.use("/", express.static(clientPath));
  app.get("*", function(req, res) {
    const context = {};
    const reactApp = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App derp="ikea" />
      </StaticRouter>
    );
    console.log("sending", path.resolve(clientPath, "index.html"));
    // res.sendFile(path.resolve(clientPath, "index.html"));
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Paradox Inversion</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <div id="app">${reactApp}</div>
        </body>
      <html>
    `);
    console.log("sent");
  });
}
