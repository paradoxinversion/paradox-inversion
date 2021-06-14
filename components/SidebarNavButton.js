import React from "react"
import { useRouter } from "next/router";
import PropTypes from 'prop-types';
const SidebarNavButton = (props) => {
  const router = useRouter();
  const { text, url, barcodeText } = props;
  return (
    <div
      className="cursor-pointer w-full mb-2 p-2 hover:bg-gray-400"
      onClick={() => {
        router.push(`/${url}`);
      }}
    >
      <p className="barcode">{barcodeText}</p>
      <p className="nav-btn">{text}</p>
    </div>
  );
};

SidebarNavButton.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  barcodeText: PropTypes.string,
}

SidebarNavButton.defaultProps = {
  barcodeText: "Interact with this"
}

export default SidebarNavButton;
