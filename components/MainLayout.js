import React from "react";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import "../style/style.css";
import "../style/pistyle.css";
const MainLayout = props => {
  return (
    <div id="main-layout">
      <MainHeader pages={props.pages} />
      <div className="margin--standard container--main">{props.children}</div>
      <MainFooter />
    </div>
  );
};
export default MainLayout;
