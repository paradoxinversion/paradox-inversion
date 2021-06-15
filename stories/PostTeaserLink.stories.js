import React from "react";
import PostTeaserLink from "../components/PostTeaser/PostTeaserLink";

export default {
  title: "Components/PostTeaser/PostTeaserLink",
  component: PostTeaserLink
};

const Template = (args) => <PostTeaserLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  post:{
    url:"/", 
    publishDate:"2020-1-1" 
  }
};