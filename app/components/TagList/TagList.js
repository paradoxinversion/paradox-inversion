import React from "react";
import Link from "next/link";

const TagList = ({ tags }) => {
  return (
    <div className="tag-list">
      {tags.map(tag => (
        <Link
          href={{ path: "/search", query: { type: "tagged", query: "tag" } }}
          as={`/search?type=tagged&query=${tag}`}
          key={`tag-${tag}`}
        >
          <a>{tag}</a>
        </Link>
      ))}
    </div>
  );
};

export default TagList;
