import React from "react";
import PostTeaserTitle from "../components/PostTeaser/PostTeaserTitle";

export default {
  title: "Components/PostTeaser/PostTeaserTitle",
  component: PostTeaserTitle
};

const Template = (args) => <PostTeaserTitle {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  post:{
    title: 'Post Teaser Title', 
    url:"/", 
    publishDate:"2020-1-1" 
  }
};