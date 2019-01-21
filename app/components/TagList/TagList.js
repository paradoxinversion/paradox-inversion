import React from "react";
import { Link } from "react-router-dom";
import "./TagList.css";
const TagList = ({ tags }) => {
  return (
    <div className="tag-list">
      {tags.map(tag => (
        <Link
          key={`tag-${tag}`}
          className="tag-list__item"
          to={`/posts/tagged/${tag}`}>
          {tag}
        </Link>
      ))}
    </div>
  );
};

export default TagList;
