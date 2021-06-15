import React from "react";

const SectionHeader = ({ headerText, headerBarcodeText }) => {
  return (
    <React.Fragment>
      <p className="pi-header--text">{headerText}</p>
    </React.Fragment>
  );
};

export default SectionHeader;
