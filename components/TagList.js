import React from "react";
import Link from "next/link";

const TagList = ({ tags }) => {
  return (
    <div>
      {tags.map((tag) => (
        <Link
          href={{ path: "/search", query: { type: "tagged", query: "tag" } }}
          as={`/search?type=tagged&query=${tag.tag}`}
          key={`tag-${tag}`}
        >
          <a>{tag.tag}</a>
        </Link>
      ))}
    </div>
  );
};

export default TagList;
