import React from "react";
import ReactDOM from "react-dom";
import App from "../app/App";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "unstated";
var mountNode = document.getElementById("app");
const renderFunction = !!Window ? ReactDOM.render : ReactDOM.hydrate;

const appMarkup = (
  <Provider>
    <BrowserRouter>
      <App data={window.__INITIAL_DATA__} />
    </BrowserRouter>{" "}
  </Provider>
);

renderFunction(init, mountNode);

module.exports = {
  appMarkup
};
