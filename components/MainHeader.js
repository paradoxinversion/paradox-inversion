import Logo from "./Logo";
import Link from "next/link";

const MainHeader = props => {
  return (
    <header id="main-header">
      <Logo />
      <div className="nav">
        {props.pages ? (
          props.pages
            .filter(page => page.title !== "Home" && page.shownInNav)
            .map((page, index) => (
              <Link
                key={`page-${page.url}`}
                href={"/[slug]"}
                as={`/${page.url}`}
                tabindex={index}>
                <a
                  key={`navlink-${page.url}`}
                  className="nav__link cursor--is--pointer"
                  to={`/${page.url}`}>
                  {page.title}
                </a>
              </Link>
            ))
        ) : (
          <div>Loading pages</div>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
