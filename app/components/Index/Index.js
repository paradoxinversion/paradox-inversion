import React from "react";
import Page from "../../components/Page/Page";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
const Index = ({ pageData }) => {
  return (
    <ErrorBoundary>
      <Page pageData={pageData} useIndex={true} />
    </ErrorBoundary>
  );
};

export default Index;
