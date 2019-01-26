import React from "react";
import { withRouter } from "react-router-dom";
import PostTeaserList from "../PostTeaserList/PostTeaserList";
const Page = ({ pageData, match }) => {
  const thisPage = pageData.filter(page => page.slug === match.params.page);
  return (
    <div>
      {thisPage.length > 0 ? (
        <React.Fragment>
          <h1>{thisPage[0].title}</h1>
          <div dangerouslySetInnerHTML={{ __html: thisPage[0].content }} />
          <PostTeaserList searchType="page" query={thisPage[0].slug} />
        </React.Fragment>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default withRouter(Page);
