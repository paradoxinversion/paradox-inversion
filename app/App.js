import React from "react";
import axios from "axios";
import Index from "./pages/Index/Index";
import { NavLink, Route, Switch } from "react-router-dom";
import Tech from "./pages/Tech/Tech";
import About from "./pages/About/About";
import Fiction from "./pages/Fiction/Fiction";
import Games from "./pages/Games/Games";
import PostIndex from "./Pages/PostIndex/PostIndex";
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
      pages: []
    };
  }
  async componentDidMount() {
    const pages = await axios.get("http://localhost:3000/api/pages");
    this.setState({
      pages: pages.data
    });
  }
  render() {
    return (
      <React.Fragment>
        <header id="main-header">
          <Logo />
          <div className="nav">
            {this.state.pages.map(page => (
              <NavLink
                activeClassName="nav__link--active"
                className="nav__link"
                to={`/${page.slug}`}>
                {page.title}
              </NavLink>
            ))}
          </div>
        </header>
        <main id="route-content">
          <Switch>
            <Route exact path="/" component={Index} />

            <Route path="/post/:year/:month/:day/:slug" component={Post} />
            {/* Searchtype: tagged, or category? */}
            <Route path="/posts/:searchType/:query" component={PostIndex} />
            <Route
              path="/:page"
              render={() => <Page pageData={this.state.pages} />}
            />
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
