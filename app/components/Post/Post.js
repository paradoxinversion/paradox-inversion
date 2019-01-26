import React from "react";
import axios from "axios";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import moment from "moment";
import TagList from "../TagList/TagList";
import { formatDate } from "../../utilityFunctions";
import "./Post.css";
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
              <div className="post">
                <div className="post__content">
                  <h1 className="post__content__title">{postData.title}</h1>
                  <p className="post__content__date">
                    {formatDate(postData.publishedAt)}
                  </p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: postData.content.extended
                    }}
                  />
                </div>
                <div className="post__metadata">
                  <p>Category: {postData.category.name}</p>
                  <TagList tags={postData.tags} />
                </div>
              </div>
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
