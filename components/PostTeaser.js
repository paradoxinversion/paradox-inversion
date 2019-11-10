import React from "react";
import Link from "next/link";

import {
  formatPostPath,
  getPostPathParts
} from "../appUtilities/utilityFunctions";
const PostTeaser = ({ post }) => {
  try {
    const { publishDate, url, title, brief } = post;
    debugger;
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
    console.log(e);
    return (
      <p>
        An error occured loading this post. Jedai is probably working to fix it.
      </p>
    );
  }
};

export default PostTeaser;
