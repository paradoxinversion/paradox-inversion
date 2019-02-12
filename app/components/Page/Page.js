import React from "react";
import { withRouter, Link } from "react-router-dom";
import PostTeaserList from "../PostTeaserList/PostTeaserList";
import "./Page.css";
const Page = ({ pageData, match, useIndex, getPagePosts }) => {
  // useIndex forces this component to render the index page.
  const pageFilter = useIndex
    ? pageData.filter(page => page.isIndex)
    : pageData.filter(page => page.slug === match.params.page);
  const thisPage = pageFilter[0];
  if (!thisPage) {
    return (
      <div>
        <header>
          <h1>Yikes...</h1>
        </header>
        <p>
          The page you're looking for doesn't exist. You can try going back or{" "}
          <Link to="/">clicking here to go home.</Link>
        </p>
      </div>
    );
  } else {
    return (
      <div className="page">
        {thisPage ? (
          <React.Fragment>
            <div
              className="page__content"
              dangerouslySetInnerHTML={{ __html: thisPage.content }}
            />
            {getPagePosts && (
              <PostTeaserList searchType="page" query={thisPage.slug} />
            )}
            {thisPage.pagePostSections.length > 0 &&
              thisPage.pagePostSections.map(postSection => {
                const typeAndQuery = postSection.split(" ");
                return (
                  <PostTeaserList
                    key={`teaser-${typeAndQuery[0]}-${typeAndQuery[1]}`}
                    searchType={typeAndQuery[0]}
                    query={typeAndQuery[1]}
                  />
                );
              })}
          </React.Fragment>
        ) : (
          <p>Loading</p>
        )}
      </div>
    );
  }
};

export default withRouter(Page);
