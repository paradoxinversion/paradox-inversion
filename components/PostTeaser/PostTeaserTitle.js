import React from "react";
import Link from "next/link";
import PropTypes from "prop-types"
import { getPostPathParts } from "../../appUtilities/utilityFunctions";

const PostTeaserTitle = ({ post }) => {
    const { publishDate, url, title, brief } = post;
    const [year, month, day] = getPostPathParts(publishDate);
    return (
        <Link
          href="/post/[year]/[month]/[day]/[slug]"
          as={`/post/${year}/${month}/${day}/${url}`}
        >
          <a className="post-teaster__title text-3xl">{title}</a>
        </Link>

      
    );
 
};
PostTeaserTitle.propTypes = {
  post: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    publishDate: PropTypes.string.isRequired
  })
}
export default PostTeaserTitle;
