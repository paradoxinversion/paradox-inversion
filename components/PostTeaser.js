import React from "react";
import Link from "next/link";
import { getPostPathParts } from "../appUtilities/utilityFunctions";

const PostTeaser = ({ post }) => {
  try {
    const { publishDate, url, title, brief } = post;
    const [year, month, day] = getPostPathParts(publishDate);
    return (
      <div className="rounded mb-4">
        <Link
          href="/post/[year]/[month]/[day]/[slug]"
          as={`/post/${year}/${month}/${day}/${url}`}
        >
          <a className="post-teaster__title text-3xl">{title}</a>
        </Link>

        <div dangerouslySetInnerHTML={{ __html: brief }} />
        <Link
          href="/post/[year]/[month]/[day]/[slug]"
          as={`/post/${year}/${month}/${day}/${url}`}
        >
          <a className="post-teaster__title">Read it </a>
        </Link>
      </div>
    );
  } catch (e) {
    return (
      <p>
        An error occured loading this widget. Jedai is probably working to fix
        it.
      </p>
    );
  }
};

export default PostTeaser;
