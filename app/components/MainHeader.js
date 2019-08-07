import Logo from "./Logo/Logo";
import Link from "next/link";

const MainHeader = props => {
  return (
    <header id="main-header">
      <Logo />
      <div className="nav">
        {props.pages
          .filter(page => !page.isIndex)
          .map(page => (
            <Link href={"/[slug]"} as={`/${page.slug}`}>
              <div
                key={`navlink-${page.slug}`}
                className="nav__link"
                to={`/${page.slug}`}>
                {page.title}
              </div>
            </Link>
          ))}
      </div>
    </header>
  );
};

export default MainHeader;
