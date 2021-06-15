import React from "react";
import { getPostPathParts } from "../appUtilities/utilityFunctions";
import PostTeaserTitle from "./PostTeaser/PostTeaserTitle";
import PostTeaserBody from "./PostTeaser/PostTeaserBody";
import PostTeaserLink from "./PostTeaser/PostTeaserLink";

const PostTeaser = ({ post }) => {
    const { brief } = post;
    return (
      <div className="rounded mb-4">
        <PostTeaserTitle post={post} />
        <PostTeaserBody brief={brief} />
        <PostTeaserLink post={post} />
      </div>
    );
};

export default PostTeaser;
