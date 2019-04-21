const express = require("express");
const multer = require("multer");
const body = require("body-parser");
const keystone = require("../keystone/keystone");
const path = require("path");
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import App from "../app/App";
import AppRouter from "../app/pages/AppRouter/AppRouter";
import { Provider } from "unstated";
import { routes } from "../app/routes";
import serialize from "serialize-javascript";
import fs from "fs";
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
//     res.sendFile(path.resolve(clientPath, "index.html"));
//   });
// }

if (process.env.NODE_ENV === "production") {
  const clientPath = path.resolve(__dirname, "..", "client");

  app.use("/", express.static(clientPath));
  app.get("*", function(req, res, next) {
    const activeRoute = routes.find(route => matchPath(req.url, route)) || {};

    const promise = activeRoute.fetchInitialData
      ? activeRoute.fetchInitialData(req.path)
      : Promise.resolve();
    promise
      .then(data => {
        const routeData = data.data;
        const context = { routeData };
        const reactApp = ReactDOMServer.renderToString(
          <Provider>
            <StaticRouter location={req.url} context={context}>
              <App data={data.data} ssr={true} />
            </StaticRouter>
          </Provider>
        );
        const indexFile = path.resolve(__dirname, "..", "client", "index.html");
        fs.readFile(indexFile, "utf8", (err, data) => {
          if (err) {
            return res.status(500).send("Derp");
          }

          return res.send(
            data.replace(
              '<div id="app"></div>',
              `<div id="app">${reactApp}</div>`
            )
          );
        });
      })
      .catch(next);
  });
}
