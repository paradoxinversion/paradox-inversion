import React from "react";
import Post from "../../components/Post/Post";
import { Switch, Route, withRouter } from "react-router-dom";
class Posts extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Switch>
          <Route
            path={`${this.props.match.url}/:postCategory/:postSlug`}
            component={Post}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Posts);
