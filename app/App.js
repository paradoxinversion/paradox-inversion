import React from "react";
import Index from "./pages/Index/Index";
import { Link, Route } from "react-router-dom";
import Tech from "./pages/Tech/Tech";
import About from "./pages/About/About";
class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">Paradox Inversion</Link>
          <div>
            <Link to="/tech">Tech</Link>
            <Link to="/about">About</Link>
          </div>
        </header>
        <main>
          <Route exact path="/" component={Index} />
          <Route path="/tech" component={Tech} />
          <Route path="/about" component={About} />
        </main>
      </div>
    );
  }
}

export default App;
