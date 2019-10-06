import React from "react";
import Link from "next/link";
// import "./TagList.css"
const TagList = ({ tags }) => {
  return (
    <div className="tag-list">
      {tags.map(tag => (
        <Link
          href={{ path: "/search", query: { type: "tagged", query: "tag" } }}
          as={`/search?type=tagged&query=${tag}`}
          key={`tag-${tag}`}>
          <a className="color--white color--bg--black margin--right--1rem padding--1rem border--radius--6px text--align--center">
            {tag}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default TagList;
