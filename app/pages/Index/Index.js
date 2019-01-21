import React from "react";
import PostTeaserList from "../../components/PostTeaserList/PostTeaserList";
class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <header>
          <h1>Welcome to Paradox Inversion</h1>
        </header>
        <p>We're under construction.</p>
        <PostTeaserList searchType="category" query="Announcements" />
      </div>
    );
  }
}

export default Index;
