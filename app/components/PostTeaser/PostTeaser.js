import React from "react";
import { Link } from "react-router-dom";
const PostTeaser = ({ post }) => {
  return (
    <div>
      <Link to={`/posts/${post.category.name.toLowerCase()}/${post.slug}`}>
        {post.title}
      </Link>
      <div dangerouslySetInnerHTML={{ __html: post.content.brief }} />
    </div>
  );
};

export default PostTeaser;
