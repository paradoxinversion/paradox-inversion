import React from "react";
import Link from "next/link";

import { formatPostPath } from "../appUtilities/utilityFunctions";

const SeriesStepper = ({ post }) => {
  const previous = post.previousPost ? (
    <Link
      href="/post/[year]/[month]/[day]/[slug]"
      as={formatPostPath(
        post.previousPost.publishedAt,
        post.previousPost.slug
      )}>
      <a>{`Previous: ${post.previousPost.title}`}</a>
    </Link>
  ) : null;
  const next = post.nextPost ? (
    <Link
      href="/post/[year]/[month]/[day]/[slug]"
      as={formatPostPath(post.nextPost.publishedAt, post.nextPost.slug)}>
      <a>{`Next: ${post.nextPost.title}`}</a>
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
