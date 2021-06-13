import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PostTeaser from "./PostTeaser";
import {
  queryPosts,
  sortPostBySeriesOrder,
  sortPostsByDateTime,
} from "../appUtilities/actions";
const PostTeaserList = (props) => {
  const [fetchingPosts, setFetchingPosts] = useState(false);
  const [content, setContent] = useState([]);
  const fetchPosts = async () => {
    setFetchingPosts(true);
    const { searchType, query } = props;
    const postData = await queryPosts(searchType, query);
    setFetchingPosts(false);
    return postData;
  };
  useEffect(() => {
    const getPosts = async () => {
      if (content.length === 0) {
        const postsResults = await fetchPosts();
        setContent(postsResults);
      }
    };

    getPosts();
  }, []);

  const renderTeasers = () => {
    // TODO: Can I just get rid of the !== undef?
    const isSeries = !!content[0].seriesOrder !== undefined;
    const orderFunction = isSeries
      ? sortPostBySeriesOrder
      : sortPostsByDateTime;
    const orderedContent = orderFunction(content).map((post) => (
      <PostTeaser key={post.slug} post={post} />
    ));
    if (props.reverseOrder) {
      orderedContent.reverse();
    }
    return orderedContent;
  };

  const renderTeaserList = () => {
    return (
      <div>
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
        {content.length > 0 ? (
          renderTeasers()
        ) : (
          <p>
            Couldn't find any tagged or category posts with the name '
            {props.query}'.
          </p>
        )}
      </div>
    );
  };

  return (
    <div>
      {fetchingPosts && <p>Loading Posts...</p>}
      {content.length > 0 ? renderTeaserList() : null}
    </div>
  );
};

PostTeaserList.defaultProps = {
  type: "all",
  query: "all",
  reverseOrder: false,
};

PostTeaserList.propTypes = {
  type: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  customHeaderText: PropTypes.string,
  reverseOrder: PropTypes.bool,
};

export default PostTeaserList;
