import React from "react";
import axios from "axios";
import Post from "../../components/Post/Post";
import PostTeaser from "../../components/PostTeaser/PostTeaser";
import { withRouter } from "react-router-dom";
class PostTeaserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      fetchingPosts: true
    };
  }

  async componentDidMount() {
    const postData = await this.fetchPosts();
    this.setState({
      content: postData
    });
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
    const baseUrl = "http://localhost:3000/api/posts";
    const { searchType, query } = this.props;
    const url = `${baseUrl}?searchType=${searchType}&query=${query}`;
    const postData = await axios.get(url);
    this.setState({
      fetchingPosts: false
    });
    return postData.data;
  }
  render() {
    return (
      <div>
        {this.state.fetchingPosts ? (
          <p>Fetching</p>
        ) : (
          <div>
            {this.state.content.length > 0 ? (
              <React.Fragment>
                {this.state.content.map(post => (
                  <PostTeaser key={post.slug} post={post} />
                ))}
              </React.Fragment>
            ) : (
              <p>
                No posts found in '{this.props.searchType}' with the name '
                {this.props.query}'
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default PostTeaserList;
