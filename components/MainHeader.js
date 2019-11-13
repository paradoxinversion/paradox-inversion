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
            .map(page => (
              <Link
                key={`page-${page.url}`}
                href={"/[slug]"}
                as={`/${page.url}`}>
                <div
                  key={`navlink-${page.url}`}
                  className="nav__link"
                  to={`/${page.url}`}>
                  {page.title}
                </div>
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
