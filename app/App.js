import React from "react";
import axios from "axios";
import axiosIntance from "./axiosInstance";
import Index from "./pages/Index/Index";
import { NavLink, Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";

import PostIndex from "./pages/PostIndex/PostIndex";
import Post from "./components/Post/Post";
import NotFound from "./pages/NotFound/NotFound";
import Page from "./components/Page/Page";
import Logo from "./components/Logo/Logo";
import "./styles/style.css";
import "./styles/pistyle.css";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      isLoading: true,
      error: null
    };
  }
  async componentDidMount() {
    try {
      const pages = await axiosIntance.get("/pages");
      this.setState({
        pages: pages.data,
        isLoading: false
      });
    } catch (e) {
      this.setState({
        error: e,
        isLoading: false
      });
    }
  }

  renderPageLoading() {
    return <p>Loading Paradox Inversion...</p>;
  }

  renderError() {
    return (
      <div>
        <h1>Something went very wrong...</h1>
        <p>
          An error occured while loading the site data. Try waiting a minute or
          two and reloading the page.
        </p>
        <h3>What the heck happened?</h3>
        <p>{this.state.error.message}</p>
      </div>
    );
  }
  renderRouteContent() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Index pageData={this.state.pages} />}
        />
        <Route path="/post/:year/:month/:day/:slug" component={Post} />
        <Route path="/posts/:searchType/:query" component={PostIndex} />
        <Route
          path="/:page"
          render={() => (
            <Page pageData={this.state.pages} getPagePosts={true} />
          )}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }

  render() {
    return (
      <React.Fragment>
        <header id="main-header">
          <Logo />
          <div className="nav">
            {this.state.pages
              .filter(page => !page.isIndex)
              .map(page => (
                <NavLink
                  key={`navlink-${page.slug}`}
                  activeClassName="nav__link--active"
                  className="nav__link"
                  to={`/${page.slug}`}>
                  {page.title}
                </NavLink>
              ))}
          </div>
        </header>
        <main id="route-content">
          {this.state.isLoading && !this.state.error
            ? this.renderPageLoading()
            : !this.state.error
            ? this.renderRouteContent()
            : this.renderError()}
        </main>

        <footer id="main-footer">
          <p>By Jedai Saboteur</p>
        </footer>
      </React.Fragment>
    );
  }
}

export default hot(module)(App);
// export default App;
