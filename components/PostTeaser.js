import React from "react";
import Link from "next/link";

import {
  formatPostPath,
  getPostPathParts
} from "../appUtilities/utilityFunctions";
const PostTeaser = ({ post }) => {
  try {
    const {
      publishedAt,
      slug,
      title,
      content: { brief }
    } = post;
    const [year, month, day] = getPostPathParts(publishedAt, slug);
    return (
      <div>
        <Link
          href="/post/[year]/[month]/[day]/[slug]"
          as={`/post/${year}/${month}/${day}/${slug}`}>
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
