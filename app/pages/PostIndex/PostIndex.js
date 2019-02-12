import React from "react";
import PostTeaserList from "../../components/PostTeaserList/PostTeaserList";

const PostIndex = ({ match }) => {
  return (
    <div className="post-index">
      <PostTeaserList
        searchType={match.params.searchType}
        query={match.params.query}
      />
    </div>
  );
};

export default PostIndex;
