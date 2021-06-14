import React from "react";
import PropTypes from "prop-types";
const PostTeaserListHeader = (props) => {
  return (
    <React.Fragment>
      {props.customHeaderText ? (
        <div className="text-center sm:text-left">
          <p className="barcode barcode--large">I See You.</p>
          <p className="post-teaser-header">{props.customHeaderText}</p>
        </div>
      ) : (
        <p>
          {props.searchType === "page"
            ? `Recent Posts`
            : props.searchType === "category"
            ? `Recent Posts in ${props.query}`
            : props.searchType === "series"
            ? `Recent posts in this series`
            : `Recent Posts tagged ${props.query}`}
        </p>
      )}
    </React.Fragment>
  );
};

PostTeaserListHeader.propTypes = {
  customHeaderText: PropTypes.string,
  query: PropTypes.string,
  searchType: PropTypes.string,
};

export default PostTeaserListHeader;
