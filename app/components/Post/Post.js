import React from "react";
import axios from "axios";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: null
    };
  }
  async componentDidMount() {
    const post = await axios.get(
      `http://localhost:3000/api/post?slug=${this.props.match.params.postSlug}`
    );
    console.log(post.data);
    this.setState({
      postData: post.data
    });
  }
  render() {
    console.log(this.state.postData);
    return (
      <React.Fragment>
        {this.state.postData ? (
          <React.Fragment>
            {!this.state.postData.error ? (
              <div>
                <p>{this.state.postData.title}</p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.postData.content.extended
                  }}
                />
              </div>
            ) : (
              <Redirect to="/404" />
            )}
          </React.Fragment>
        ) : (
          <div>
            <p>Loading PostData</p>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Post);
