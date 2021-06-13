import SidebarNavButton from "./SidebarNavButton";
const Sidebar = ({ pages }) => {
  return (
    <div id="sidebar" className="sidebar hidden sm:flex sm:flex-col mr-8">
      {/* nav links n such */}

      {pages ? (
        pages
          .filter((page) => page.title !== "Home" && page.shownInNav)
          .map((page, index) => (
            <SidebarNavButton
              key={`page-${page.url}`}
              text={page.title}
              url={page.url}
            />
          ))
      ) : (
        <div>Loading pages</div>
      )}
    </div>
  );
};

export default Sidebar;
