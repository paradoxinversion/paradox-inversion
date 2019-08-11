import React from "react";
import Link from "next/link";
import MainLayout from "../components/MainLayout";
import { getPages } from "../appUtilities/actions";

class NotFound extends React.Component {
  render() {
    return (
      <MainLayout pages={this.props.pageData}>
        <div>
          <header>
            <h1>Yikes...</h1>
          </header>
          <p>
            The page you're looking for doesn't exist. You can try going back or{" "}
            <Link href="/">
              <a>clicking here to go home.</a>
            </Link>
          </p>
        </div>
      </MainLayout>
    );
  }
}

NotFound.getInitialProps = async function() {
  const pageData = await getPages();
  return {
    pages: pageData.data
  };
};
export default NotFound;
