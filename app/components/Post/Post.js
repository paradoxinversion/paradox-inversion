import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import moment from "moment";
import { Helmet } from "react-helmet";
import TagList from "../TagList/TagList";
import { formatDate } from "../../utilityFunctions";
import "./Post.css";
import { getPost } from "../../actions";
class Post extends React.Component {
  constructor(props) {
    super(props);
    const postData = props.staticContext ? props.staticContext.routeData : null;
    this.state = {
      postData
    };
  }
  async componentDidMount() {
    if (this.state.postData === null) {
      const post = await getPost(this.props.match.params.slug);
      this.setState({
        postData: post.data
      });
    }
  }

  render() {
    const { postData } = this.state;
    return (
      <React.Fragment>
        {postData ? (
          <React.Fragment>
            {!postData.error ? (
              <div className="post">
                <Helmet>
                  <title>Paradox Inversion - {postData.title}</title>
                  {/* <meta property="og:url" content={window.location.href} /> */}

                  <meta property="og:type" content="article" />
                  <meta property="og:title" content={postData.title} />
                  <meta
                    property="og:description"
                    content={postData.content.brief.replace(/<\S*>/g, "")}
                  />
                </Helmet>
                <div className="post__content">
                  <header>
                    <h1 className="post__content__title">{postData.title}</h1>
                    <p className="post__content__date">
                      {formatDate(postData.publishedAt)}
                    </p>
                    <p className="is-italic">
                      By {postData.author.displayName}
                    </p>
                  </header>

                  <hr />
                  <div
                    className="post__content__html"
                    dangerouslySetInnerHTML={{
                      __html: postData.content.extended
                    }}
                  />
                </div>

                <div className="post__metadata">
                  <hr />
                  {/* TODO: make this link to category section search page */}
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
