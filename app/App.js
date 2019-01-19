import React from "react";
import Index from "./pages/Index/Index";
import { NavLink, Route, Switch } from "react-router-dom";
import Tech from "./pages/Tech/Tech";
import About from "./pages/About/About";
import Fiction from "./pages/Fiction/Fiction";
import Games from "./pages/Games/Games";
import NotFound from "./pages/NotFound/NotFound";
import Logo from "./components/Logo/Logo";
import "./styles/style.css";
import "./styles/pistyle.css";
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <header id="main-header">
          <Logo />
          <div className="nav">
            <NavLink
              activeClassName="nav__link--active"
              className="nav__link"
              to="/fiction">
              Fiction
            </NavLink>
            <NavLink
              activeClassName="nav__link--active"
              className="nav__link"
              to="/tech">
              Tech
            </NavLink>
            <NavLink
              activeClassName="nav__link--active"
              className="nav__link"
              to="/games">
              Games
            </NavLink>
            <NavLink
              activeClassName="nav__link--active"
              className="nav__link"
              to="/about">
              About
            </NavLink>
          </div>
        </header>
        <main id="route-content">
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/tech" component={Tech} />
            <Route path="/games" component={Games} />
            <Route path="/about" component={About} />
            <Route path="/fiction" component={Fiction} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <footer id="main-footer">
          <p>By Jedai Saboteur</p>
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
