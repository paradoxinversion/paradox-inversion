import Logo from "./Logo";
import Link from "next/link";

const MainHeader = props => {
  return (
    <header id="main-header">
      <Logo />
      <div className="nav">
        {props.pages ? (
          props.pages
            .filter(page => !page.isIndex)
            .map(page => (
              <Link
                key={`page-${page.slug}`}
                href={"/[slug]"}
                as={`/${page.slug}`}>
                <div
                  key={`navlink-${page.slug}`}
                  className="nav__link"
                  to={`/${page.slug}`}>
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
