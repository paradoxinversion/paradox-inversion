import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" as="/">
      <div className="cursor-pointer logo text-5xl">
        <span>Paradox</span> <span>Inversion</span>
      </div>
    </Link>
  );
};

export default Logo;
