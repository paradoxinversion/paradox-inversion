import React from "react";
import axios from "axios";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import moment from "moment";
import TagList from "../TagList/TagList";
import { formatDate } from "../../utilityFunctions";
class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: null
    };
  }
  async componentDidMount() {
    const post = await axios.get(
      `http://localhost:3000/api/post?slug=${this.props.match.params.slug}`
    );
    this.setState({
      postData: post.data
    });
  }

  render() {
    const { postData } = this.state;
    return (
      <React.Fragment>
        {postData ? (
          <React.Fragment>
            {!postData.error ? (
              <React.Fragment>
                <div>
                  <p>{postData.title}</p>
                  <p>{formatDate(postData.publishedAt)}</p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: postData.content.extended
                    }}
                  />
                </div>
                <div>
                  <p>Category: {postData.category.name}</p>
                  <TagList tags={postData.tags} />
                </div>
              </React.Fragment>
            ) : (
              <Redirect to="/404" />
            )}
          </React.Fragment>
        ) : (
          <div>
            <p>Loading post...</p>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Post);
