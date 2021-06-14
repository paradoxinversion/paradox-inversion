import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PostTeaser from "./PostTeaser";
import {
  queryPosts,
  sortPostBySeriesOrder,
  sortPostsByDateTime,
} from "../appUtilities/actions";
import PostTeaserListHeader from "./PostTeaserList/PostTeaserListHeader";

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

  const orderTeasers = () => {
    // TODO: Can I just get rid of the !== undef?
    const isSeries = !!content[0].seriesOrder !== undefined;
    const orderFunction = isSeries
      ? sortPostBySeriesOrder
      : sortPostsByDateTime;

    const orderedContent = orderFunction(content);
    if (props.reverseOrder) {
      orderedContent.reverse();
    }
    return orderedContent;
  };

  return (
    <div>
      {fetchingPosts && <p>Loading Posts...</p>}
      <div>
        <PostTeaserListHeader
          customHeaderText={props.customHeaderText}
          query={props.query}
        />

        {!!content.length ? (
          orderTeasers().map((post) => (
            <PostTeaser key={post.url} post={post} />
          ))
        ) : (
          <p>
            Couldn't find any tagged or category posts with the name '
            {props.query}'.
          </p>
        )}
      </div>
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
