import React from "react";
import Link from "next/link";
import { getPostPathParts } from "../appUtilities/utilityFunctions";

const PostTeaser = ({ post }) => {
  try {
    const { publishDate, url, title, brief } = post;
    const [year, month, day] = getPostPathParts(publishDate);
    return (
      <div>
        <Link
          href="/post/[year]/[month]/[day]/[slug]"
          as={`/post/${year}/${month}/${day}/${url}`}>
          <a>{title}</a>
        </Link>
        <div dangerouslySetInnerHTML={{ __html: brief }} />
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
