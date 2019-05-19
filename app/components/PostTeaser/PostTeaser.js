import React from "react";
import { Link } from "react-router-dom";
const PostTeaser = ({ post }) => {
  try {
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
