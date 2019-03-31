import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./pages/AppRouter/AppRouter";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";
require("dotenv").config();
var mountNode = document.getElementById("app");
const renderFunction = !!Window ? ReactDOM.render : ReactDOM.hydrate;
// ReactDOM.render(
//   <BrowserRouter>
//     <Route path="/" component={App} />
//   </BrowserRouter>,
//   mountNode
// );
console.log("running", renderFunction);
ReactDOM.hydrate(
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>,
  mountNode
);
// ReactDOM.hydrate(<AppRouter />, mountNode);
