import Logo from "./Logo";

const MainHeader = (props) => {
  const { setNavOpen, navOpen } = props;
  return (
    <header
      id="main-header"
      className="my-4 mx-4 text-2xl flex items-center justify-between"
    >
      <Logo />
      <div
        className="flex flex-col sm:hidden"
        onClick={() => setNavOpen(!navOpen)}
      >
        <div className="self-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
