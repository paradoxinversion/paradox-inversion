import React from "react";
import Sidebar from "../components/Sidebar";

export default {
  title: "Components/Sidebar",
  component: Sidebar
};

const Template = (args) => <Sidebar {...args} />;

export const Primary = Template.bind({});
Primary.args = { 
  pages:[
    {
      title:"Page 1",
      url:"/",
      shownInNav: true
    },
    {
      title:"Page 2",
      url:"/",
      shownInNav: true
    },
    {
      title:"Page 3",
      url:"/",
      shownInNav: true
    }
  ]
};