import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
// var pathname = require("location").pathname();
import connect from "unstated-connect";
import PostTeaserList from "../PostTeaserList/PostTeaserList";
import "./Page.css";
import SiteContainer from "../../containers/SiteContainer";

// const Page = ({ pageData, match, useIndex, getPagePosts, containers }) => {
const Page = ({ match, useIndex, getPagePosts, containers, staticContext }) => {
  try {
    // useIndex forces this component to render the index page.
    let pageData;
    const [SiteContainer] = containers;
    if (staticContext) {
      pageData = staticContext.routeData;
    } else {
      pageData = SiteContainer.state.pages;
    }

    let pageFilter = useIndex
      ? pageData.filter(page => page.isIndex)
      : pageData.filter(page => page.slug === match.params.page);

    const thisPage = pageFilter ? pageFilter[0] : null;
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
              <Helmet>
                <title>Paradox Inversion - {thisPage.title}</title>
                {/* <meta property="og:url" content={window.location.href} /> */}
                <meta
                  property="og:title"
                  content={`Pradox Inversion - ${thisPage.title}`}
                />
                <meta
                  property="og:description"
                  content="Home of Fiction, Articles, and Games by Jedai Saboteur"
                />
              </Helmet>
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
  } catch (e) {
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
  }
};

export default withRouter(connect([SiteContainer])(Page));
