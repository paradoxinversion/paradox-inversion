import Logo from "../app/components/Logo/Logo";
import Link from "next/link";
import { getPages } from "../app/actions";
import connect from "unstated-connect";
import SiteContainer from "../app/containers/SiteContainer";
import { Subscribe } from "unstated";
import React from "react";
import MainHeader from "../app/components/MainHeader";
import MainFooter from "../app/components/MainFooter";
import MainLayout from "../app/components/MainLayout";
class Index extends React.Component {
  static async getInitialProps() {
    const pageData = await getPages();
    await SiteContainer.setPages(pageData.data);
    return {
      pages: pageData.data
    };
  }
  async componentDidMount() {
    console.log(this.props);
    await SiteContainer.setPages(this.props.pages);
    console.log(SiteContainer.state);
    // const [SiteContainer] = this.props.containers;
    // SiteContainer.setPages(this.props.pages);
  }
  render() {
    return (
      <div>
        {/* <MainHeader pages={this.props.pages} />
        <MainFooter /> */}
        <MainLayout pages={this.props.pages}>
          <div>Weeeee</div>
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
