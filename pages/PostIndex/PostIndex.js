import React from "react";
import { Helmet } from "react-helmet";
import PostTeaserList from "../../components/PostTeaserList/PostTeaserList";

const PostIndex = ({ match }) => {
  const { searchType, query } = match.params;
  return (
    <div className="post-index">
      <Helmet>
        <title>
          Paradox Inversion - {searchType}:{query}
        </title>
      </Helmet>
      <PostTeaserList searchType={searchType} query={query} />
    </div>
  );
};

export default PostIndex;
