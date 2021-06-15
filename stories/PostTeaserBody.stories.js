import React from "react";
import PostTeaserBody from "../components/PostTeaser/PostTeaserBody";

export default {
  title: "Components/PostTeaser/PostTeaserBody",
  component: PostTeaserBody
};

const Template = (args) => <PostTeaserBody {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  brief: "<p>Suspendisse sapien lectus, commodo condimentum leo nec, accumsan molestie arcu. Aenean sagittis eros at maximus imperdiet.</p>"
};