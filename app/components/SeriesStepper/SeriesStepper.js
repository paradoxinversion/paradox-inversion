import React from "react";
import { Link } from "react-router-dom";
import { formatPostPath } from "../../utilityFunctions";

const SeriesStepper = ({ post }) => {
  console.log(post, post.previousPost, post.nextPost);
  const previous = post.previousPost ? (
    <Link
      to={formatPostPath(
        post.previousPost.publishedAt,
        post.previousPost.slug
      )}>
      Previous
    </Link>
  ) : null;
  const next = post.nextPost ? (
    <Link to={formatPostPath(post.nextPost.publishedAt, post.nextPost.slug)}>
      Next
    </Link>
  ) : null;

  return (
    <div>
      {previous && previous}
      {next && next}
    </div>
  );
};

export default SeriesStepper;
