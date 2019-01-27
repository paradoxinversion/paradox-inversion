import React from "react";
import Page from "../../components/Page/Page";
const Index = ({ pageData }) => {
  return (
    <div>
      <Page pageData={pageData} useIndex={true} />
    </div>
  );
};

export default Index;
