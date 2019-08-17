import Head from "next/head";

import { getPages } from "../appUtilities/actions";
import SiteContainer from "../appUtilities/containers/SiteContainer";
import React from "react";
import MainLayout from "../components/MainLayout";
import PostTeaserList from "../components/PostTeaserList";
import { NextSeo } from "next-seo";
import Page from "./[slug]";

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
          <NextSeo
            title="Paradox Inversion Press - Home"
            description="Home of Fiction, Articles, and Games by Jedai Saboteur"
            openGraph={{
              url: "https://www.paradoxinversion.com",
              title: "Paradox Inversion Press",
              description:
                "Home of Fiction, Articles, and Games by Jedai Saboteur"
            }}
          />

          <div className="margin--standard">
            <div
              dangerouslySetInnerHTML={{
                __html: this.props.pages[0].content
              }}
            />
            <PostTeaserList searchType="category" query="announcements" />
          </div>
        </MainLayout>
      </div>
    );
  }
}

export default Index;
