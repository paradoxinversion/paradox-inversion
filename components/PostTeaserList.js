import React from "react";
import PropTypes from "prop-types";
import PostTeaser from "./PostTeaser";
import {
  queryPosts,
  sortPostBySeriesOrder,
  sortPostsByDateTime
} from "../appUtilities/actions";

class PostTeaserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      fetchingPosts: true
    };

    this.renderTeasers = this.renderTeasers.bind(this);
  }

  async componentDidMount() {
    if (this.state.content.length === 0) {
      const postData = await this.fetchPosts();
      this.setState({
        content: postData
      });
    }
  }

  async fetchPosts() {
    await this.setState({
      fetchingPosts: true
    });
    const { searchType, query } = this.props;

    const postData = await queryPosts(searchType, query);
    console.log(postData);
    this.setState({
      fetchingPosts: false
    });
    return postData;
  }

  renderTeasers() {
    const isSeries = !!this.state.content[0].seriesOrder !== undefined;
    const orderFunction = isSeries
      ? sortPostBySeriesOrder
      : sortPostsByDateTime;
    const orderedContent = orderFunction(this.state.content).map(post => (
      <PostTeaser key={post.slug} post={post} />
    ));
    if (this.props.reverseOrder) {
      orderedContent.reverse();
    }
    return orderedContent;
  }

  renderTeaserList() {
    return (
      <div className="post-teaser">
        {this.props.customHeaderText ? (
          <h3>{this.props.customHeaderText}</h3>
        ) : (
          <h3>
            {this.props.searchType === "page"
              ? `Recent Posts`
              : this.props.searchType === "category"
              ? `Recent Posts in ${this.props.query}`
              : this.props.searchType === "series"
              ? `Recent posts in this series`
              : `Recent Posts tagged ${this.props.query}`}
          </h3>
        )}
        {this.state.content.length > 0 ? (
          this.renderTeasers()
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

PostTeaserList.defaultProps = {
  type: "all",
  query: "all",
  reverseOrder: false
};

PostTeaserList.propTypes = {
  type: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  customHeaderText: PropTypes.string,
  reverseOrder: PropTypes.bool
};

export default PostTeaserList;
