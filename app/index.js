import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./pages/AppRouter/AppRouter";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";
import { RouteWithSubRoutes } from "./components/Misc/RouteWithSubroutes/RouteWithSubroutes";
import { routes } from "./routes";
import { Provider } from "unstated";
require("dotenv").config();
var mountNode = document.getElementById("app");
const renderFunction = !!Window ? ReactDOM.render : ReactDOM.hydrate;

console.log("running", renderFunction);
// ReactDOM.hydrate(
//   <BrowserRouter>
//     {/* {routes.map((route, i) => (
//       <RouteWithSubRoutes key={i} {...route} />
//     ))}
//     <Route path="/" component={App} /> */}
//     <App />
//   </BrowserRouter>,
//   mountNode
// );

renderFunction(
  <BrowserRouter>
    {/* {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route} />
    ))}
    <Route path="/" component={App} /> */}
    <Provider>
      <App />
    </Provider>
  </BrowserRouter>,
  mountNode
);
