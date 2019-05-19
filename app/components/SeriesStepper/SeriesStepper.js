import React from "react";
import { Link } from "react-router-dom";
import { formatPostPath } from "../../utilityFunctions";

const SeriesStepper = ({ post }) => {
  const previous = post.previousPost ? (
    <Link
      to={formatPostPath(
        post.previousPost.publishedAt,
        post.previousPost.slug
      )}>
      {`Previous: ${post.previousPost.title}`}
    </Link>
  ) : null;
  const next = post.nextPost ? (
    <Link to={formatPostPath(post.nextPost.publishedAt, post.nextPost.slug)}>
      {`Next: ${post.nextPost.title}`}
    </Link>
  ) : null;

  return (
    <div className="flex flex--justify-content--space-between flex--mobile margin--1rem">
      {previous && previous}
      {next && next}
    </div>
  );
};

export default SeriesStepper;
