import React from "react";
import Index from "./pages/Index/Index";
import { NavLink, Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
import { Helmet } from "react-helmet";
import PostIndex from "./pages/PostIndex/PostIndex";
import Post from "./components/Post/Post";
import NotFound from "./pages/NotFound/NotFound";
import Page from "./components/Page/Page";
import Logo from "./components/Logo/Logo";
import "./styles/style.css";
import "./styles/pistyle.css";
import { routes } from "./routes";
import { RouteWithSubRoutes } from "./components/Misc/RouteWithSubroutes/RouteWithSubroutes";
import connect from "unstated-connect";
import SiteContainer from "./containers/SiteContainer";
import { getPages } from "./actions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: !props.ssr ? true : false,
      error: null
    };
  }
  async componentDidMount() {
    const [SiteContainer] = this.props.containers;
    try {
      const pages = await getPages();
      SiteContainer.setPages(pages.data);
      this.setState({
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
    return <p>Loading Paradox Inversion...!</p>;
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
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
        <Route component={NotFound} />
      </Switch>
    );
  }

  render() {
    const [SiteContainer] = this.props.containers;
    const { pages } = SiteContainer.state;

    return (
      <React.Fragment>
        <Helmet>
          {/* <meta
            name="description"
            content="Home of Fiction, Articles, and Games by Jedai Saboteur"
          /> */}
          <meta name="author" content="Jedai Saboteur" />
          {/* <meta property="og:url" content={window.location.href} /> */}
          <meta property="og:title" content="Paradox Inversion" />
        </Helmet>
        <header id="main-header">
          <Logo />
          <div className="nav">
            {pages
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
          <p>&copy; Jedai Saboteur 2008 - {new Date().getFullYear()}</p>
        </footer>
      </React.Fragment>
    );
  }
}

export default hot(module)(connect([SiteContainer])(App));
