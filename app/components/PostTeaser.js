import React from "react";
import { formatPostPath } from "../utilityFunctions";
const PostTeaser = ({ post }) => {
  try {
    const {
      publishedAt,
      slug,
      title,
      content: { brief }
    } = post;
    return (
      <div>
        {/* <Link to={formatPostPath(publishedAt, slug)}>{title}</Link> */}
        <span>Link goes here</span>
        <div dangerouslySetInnerHTML={{ __html: brief }} />
      </div>
    );
  } catch (e) {
    console.log(e);
    return (
      <p>
        An error occured loading this post. Jedai is probably working to fix it.
      </p>
    );
  }
};

export default PostTeaser;