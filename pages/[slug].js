import Head from "next/head";
import { useRouter } from "next/router";
import { withRouter } from "next/router";

import MainLayout from "../components/MainLayout";
import { getPages, getPage } from "../appUtilities/actions";
import PostTeaserList from "../components/PostTeaserList";
import { NextSeo } from "next-seo";
import SectionHeader from "../components/SectionHeader";
import PostTeaserListHeader from "../components/PostTeaserList/PostTeaserListHeader";

const Page = (props) => {
  const router = useRouter();

  return (
    <MainLayout pages={props.pages}>
      <NextSeo
        title={`${props.page.title}`}
        description={`${props.page.socialMediaBrief}`}
        openGraph={{
          url: `https://www.paradoxinversion.com/${router.asPath}`,
          title: `${props.page.title}`,
          description: `${props.page.socialMediaBrief}`,
        }}
      />
      <p className="pi-header--text text-center sm:text-left">
        {props.page.title}
      </p>
      <p className="barcode text-center sm:text-left">
        The world is not so simple
      </p>
      {props.page.content && (
        <div
          id="page-content"
          className="pi-content"
          dangerouslySetInnerHTML={{ __html: props.page.content }}
        />
      )}

      {props.page.pageType !== "standard" && (
        <PostTeaserList searchType="page" query={props.page.url} />
      )}
    </MainLayout>
  );
};
Page.getInitialProps = async function ({ query }) {
  const [pages, page] = await Promise.all([getPages(), getPage(query.slug)]);

  return {
    pages,
    page,
  };
};
export default Page;
