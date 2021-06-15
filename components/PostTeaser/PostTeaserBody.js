import React from "react";

const PostTeaserBody = ({ brief }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: brief }} />
    );

};

export default PostTeaserBody;
