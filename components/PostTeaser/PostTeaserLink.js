import React from "react";
import Link from "next/link";
import PropTypes from "prop-types"
import { getPostPathParts } from "../../appUtilities/utilityFunctions";

const PostTeaserLink = ({ post }) => {
    const { publishDate, url } = post;
    const [year, month, day] = getPostPathParts(publishDate);
    return (
        <Link
          href="/post/[year]/[month]/[day]/[slug]"
          as={`/post/${year}/${month}/${day}/${url}`}
        >
          <a className="post-teaster__title">Read It</a>
        </Link>
    );
};
PostTeaserLink.propTypes = {
  post: PropTypes.shape({
    url: PropTypes.string.isRequired,
    publishDate: PropTypes.string.isRequired
  })
}
export default PostTeaserLink;
