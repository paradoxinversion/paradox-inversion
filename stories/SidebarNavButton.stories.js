import React from "react";
import SidebarNavButton from "../components/SidebarNavButton";

export default {
  title: "Components/SidebarNavButton",
  component: SidebarNavButton
};

const Template = (args) => <SidebarNavButton {...args} />;

export const Primary = Template.bind({});
Primary.args = { 
  text: 'Sidebar Nav Button', 
  url:"/", 
  barcodeText:"This is the barcode" 
};