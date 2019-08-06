const express = require("express");
const multer = require("multer");
const body = require("body-parser");
const keystone = require("../keystone/keystone");
const path = require("path");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const React = require("react");
const ReactDOM = require("react-dom");

const ReactDOMServer = require("react-dom/server");
const { StaticRouter, matchPath } = require("react-router-dom");
const App = require("../app/App");
const { Provider } = require("unstated");
const { routes } = require("../app/routes");
const fs = require("fs");
const { Helmet } = require("react-helmet");
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
        const context = {};

        if (data) {
          data.data;
          const routeData = data.data;
          context.routeData = routeData;
        }
        const reactApp = ReactDOMServer.renderToString(
          <Provider>
            <StaticRouter location={req.url} context={context}>
              <App ssr={true} />
            </StaticRouter>
          </Provider>
        );
        const helmet = Helmet.renderStatic();
        const indexFile = path.resolve(__dirname, "..", "client", "index.html");
        fs.readFile(indexFile, "utf8", (err, indexPage) => {
          if (err) {
            return res.status(500).send("Derp");
          }
          return res.send(
            indexPage
              .replace(
                '<div id="app"></div>',
                `<div id="app">${reactApp}</div>`
              )
              .replace(
                "<meta>",
                `${helmet.title.toString()} ${helmet.meta.toString()}`
              )
          );
        });
      })
      .catch(next);
  });
}
