import React, { useEffect, useState } from "react";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import Sidebar from "./Sidebar";
import "../style/style.css";
import "../style/pistyle.css";

import MobileNav from "./MobileNav";

const MainLayout = (props) => {
  useEffect(() => {
    console.log(window.screen.width);
    setNavOpen(window.screen.width < 640 ? false : true);
  }, []);
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div id="main-layout" className="flex flex-col min-h-screen">
      <MainHeader
        pages={props.pages}
        setNavOpen={setNavOpen}
        navOpen={navOpen}
      />
      <div className="flex flex-grow flex-col mx-4 sm:flex-row ">
        {navOpen && <MobileNav pages={props.pages} />}
        {navOpen && <Sidebar pages={props.pages} />}
        <div className="">{props.children}</div>
      </div>
      <MainFooter />
    </div>
  );
};

export default MainLayout;
