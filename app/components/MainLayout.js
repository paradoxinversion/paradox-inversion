import React from "react";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import "../../style.css";
import "../../pistyle.css";
const MainLayout = props => {
  console.log(props);
  return (
    <div>
      <MainHeader pages={props.pages} />
      {props.children}
      <MainFooter />
    </div>
  );
};
export default MainLayout;
