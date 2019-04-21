import React from "react";
import PostTeaser from "../../components/PostTeaser/PostTeaser";
import { withRouter } from "react-router-dom";
import { queryPosts } from "../../actions";
class PostTeaserList extends React.Component {
  constructor(props) {
    super(props);
    const content = props.staticContext ? props.staticContext.routeData : [];
    this.state = {
      content,
      fetchingPosts: true
    };
  }

  async componentDidMount() {
    if (this.state.content.length === 0) {
      const postData = await this.fetchPosts();
      this.setState({
        content: postData
      });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchType !== this.props.searchType ||
      prevProps.query !== this.props.query
    ) {
      const newPosts = await this.fetchPosts();
      this.setState({
        content: newPosts
      });
    }
  }

  async fetchPosts() {
    await this.setState({
      fetchingPosts: true
    });
    const { searchType, query } = this.props;

    const postData = await queryPosts(searchType, query);
    this.setState({
      fetchingPosts: false
    });
    return postData.data;
  }

  renderTeaserList() {
    return (
      <div className="post-teaser">
        <h3>
          {this.props.searchType === "page"
            ? `Recent Posts`
            : this.props.searchType === "category"
            ? `Recent Posts in ${this.props.query}`
            : `Recent Posts tagged ${this.props.query}`}
        </h3>
        {this.state.content.length > 0 ? (
          <React.Fragment>
            {this.state.content.map(post => (
              <PostTeaser key={post.slug} post={post} />
            ))}
          </React.Fragment>
        ) : (
          <p>
            Couldn't find any tagged or category posts with the name '
            {this.props.query}'.
          </p>
        )}
      </div>
    );
  }
  render() {
    return (
      <div className="post-teaser-list">
        {this.state.content.length > 0 ? this.renderTeaserList() : null}
      </div>
    );
  }
}

export default withRouter(PostTeaserList);
