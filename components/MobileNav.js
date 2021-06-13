import { useState } from "react";
import SidebarNavButton from "./SidebarNavButton";

const MobileNav = ({ pages }) => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div
      className="flex flex-col text-right sm:hidden"
      onClick={() => setNavOpen(!navOpen)}
    >
      {pages
        .filter((page) => page.title !== "Home" && page.shownInNav)
        .map((page, index) => (
          <SidebarNavButton
            key={`page-${page.url}`}
            text={page.title}
            url={page.url}
          />
        ))}
    </div>
  );
};

export default MobileNav;
