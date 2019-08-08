import { getPages } from "../app/actions";
import SiteContainer from "../app/containers/SiteContainer";
import React from "react";
import MainLayout from "../app/components/MainLayout";
import PostTeaserList from "../app/components/PostTeaserList";
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
          <PostTeaserList searchType="category" query="announcements" />
        </MainLayout>
      </div>
    );
  }
}

// Index.getInitialProps = async function() {
//   const pageData = await getPages();
//   await SiteContainer.setPages(pageData.data);
//   console.log(pageData.data);
//   return {
//     pages: pageData.data
//   };
// };

// export default connect([SiteContainer])(Index);
export default Index;
