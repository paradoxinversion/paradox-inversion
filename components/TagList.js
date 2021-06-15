import React from "react";
import Link from "next/link";

const TagList = ({ tags }) => {
  return (
    <div>
      <p className="font-bebas text-xl">Tags</p>
      {tags.map((tag) => (
        <Link
          href={{ path: "/search", query: { type: "tagged", query: "tag" } }}
          as={`/search?type=tagged&query=${tag.tag}`}
          key={`tag-${tag}`}
        >
          <a className="border rounded  p-1">{tag.tag}</a>
        </Link>
      ))}
    </div>
  );
};

export default TagList;
