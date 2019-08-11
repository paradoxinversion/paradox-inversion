import Link from "next/link";
const Logo = () => {
  return (
    <Link href="/" as="/">
      <div className="logo">
        <span className="logo__p">Paradox</span>{" "}
        <span className="logo__i">Inversion</span>
      </div>
    </Link>
  );
};

export default Logo;
