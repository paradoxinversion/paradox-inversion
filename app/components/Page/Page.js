import React from "react";
import { withRouter } from "react-router-dom";
const Page = ({ pageData, match }) => {
  const thisPage = pageData.filter(page => page.slug === match.params.page);
  console.log(thisPage[0]);
  return (
    <div>
      {thisPage.length > 0 ? (
        <React.Fragment>
          <p>{thisPage[0].title}</p>
          <div dangerouslySetInnerHTML={{ __html: thisPage[0].content }} />
        </React.Fragment>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default withRouter(Page);
