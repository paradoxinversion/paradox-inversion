import React from "react";
import axios from "axios";
import Post from "../../components/Post/Post";
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testPost: null
    };
  }
  async componentDidMount() {
    const test = await axios.get(
      "http://localhost:3000/api/posts?category=Announcements"
    );
    console.log(test);
    this.setState({
      testPost: test.data[0]
    });
  }
  render() {
    return (
      <div>
        <header>
          <h1>Welcome to Paradox Inversion</h1>
        </header>
        <p>We're under construction.</p>
        {this.state.testPost !== null && <Post post={this.state.testPost} />}
      </div>
    );
  }
}

export default Index;
