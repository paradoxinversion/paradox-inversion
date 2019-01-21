import React from "react";
import { Link } from "react-router-dom";
const PostTeaser = ({ post }) => {
  const d = new Date(post.publishedAt);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const {
    slug,
    title,
    content: { brief }
  } = post;
  return (
    <div>
      <Link to={`/post/${year}/${month}/${day}/${slug}`}>{title}</Link>
      <div dangerouslySetInnerHTML={{ __html: brief }} />
    </div>
  );
};

export default PostTeaser;
