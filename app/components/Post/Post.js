import React from "react";

const Post = ({ post }) => {
  return <div dangerouslySetInnerHTML={{ __html: post.content.extended }} />;
};

export default Post;
