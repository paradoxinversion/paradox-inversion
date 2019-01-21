import React from "react";
import axios from "axios";
import Post from "../../components/Post/Post";
import PostTeaser from "../../components/PostTeaser/PostTeaser";
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: []
    };
  }
  async componentDidMount() {
    const postData = await axios.get(
      "http://localhost:3000/api/posts?category=Announcements"
    );
    console.log(postData);
    this.setState({
      content: postData.data
    });
  }
  render() {
    return (
      <div>
        <header>
          <h1>Welcome to Paradox Inversion</h1>
        </header>
        <p>We're under construction.</p>
        {this.state.content !== null && (
          <div>
            {this.state.content.map(post => (
              <PostTeaser key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Index;
