import React from "react";
import PostTeaser from "../../components/PostTeaser/PostTeaser";
import { withRouter } from "react-router-dom";
import {
  queryPosts,
  sortPostBySeriesOrder,
  sortPostsByDateTime
} from "../../actions";
class PostTeaserList extends React.Component {
  constructor(props) {
    super(props);
    const content = props.staticContext ? props.staticContext.routeData : [];
    this.state = {
      content,
      fetchingPosts: true
    };

    this.renderTeasers = this.renderTeasers.bind(this);
    this.renderOrderedTeasers = this.renderOrderedTeasers.bind(this);
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

  renderTeasers() {
    const isSeries = !!this.state.content[0].seriesOrder;
    const orderFunction = isSeries
      ? sortPostBySeriesOrder
      : sortPostsByDateTime;
    const orderedContent = orderFunction(this.state.content);
    return orderedContent.map(post => (
      <PostTeaser key={post.slug} post={post} />
    ));
  }

  renderOrderedTeasers() {
    return this.state.content
      .sort((a, b) => {
        // if (a.seriesOrder > b.seriesOrder) {
        //   return 1;
        // }
        // if (a.seriesOrder < b.seriesOrder) {
        //   return -1;
        // }

        return a.seriesOrder - b.seriesOrder;
      })
      .map(post => <PostTeaser key={post.slug} post={post} />);
  }

  renderTeaserList() {
    return (
      <div className="post-teaser">
        <h3>
          {this.props.searchType === "page"
            ? `Recent Posts`
            : this.props.searchType === "category"
            ? `Recent Posts in ${this.props.query}`
            : this.props.searchType === "series"
            ? `Recent posts in this series`
            : `Recent Posts tagged ${this.props.query}`}
        </h3>
        {this.state.content.length > 0 ? (
          this.renderOrderedTeasers()
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
