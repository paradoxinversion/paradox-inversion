import { getPages } from "../appUtilities/actions";
import SiteContainer from "../appUtilities/containers/SiteContainer";
import React from "react";
import MainLayout from "../components/MainLayout";
import PostTeaserList from "../components/PostTeaserList";
// import "../style.css";
class Index extends React.Component {
  static async getInitialProps() {
    const pageData = await getPages();
    await SiteContainer.setPages(pageData.data);
    return {
      pages: pageData.data
    };
  }
  async componentDidMount() {
    await SiteContainer.setPages(this.props.pages);
  }
  render() {
    return (
      <div>
        <MainLayout pages={this.props.pages}>
          <div className="margin--standard">
            <PostTeaserList searchType="category" query="announcements" />
          </div>
        </MainLayout>
      </div>
    );
  }
}

export default Index;
