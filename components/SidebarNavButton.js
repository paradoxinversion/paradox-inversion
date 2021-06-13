import { useRouter } from "next/router";
const SidebarNavButton = (props) => {
  const router = useRouter();
  const { text, url } = props;
  return (
    <div
      className="cursor-pointer w-full mb-2 "
      onClick={() => {
        router.push(`/${url}`);
      }}
    >
      <p className="barcode">sdfhhfsdjfhjsd</p>
      <p className="nav-btn">{text}</p>
    </div>
  );
};

export default SidebarNavButton;
