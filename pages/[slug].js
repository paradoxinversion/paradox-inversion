import Head from "next/head";
import { useRouter } from "next/router";
import { withRouter } from "next/router";

import MainLayout from "../components/MainLayout";
import { getPages, getPage } from "../appUtilities/actions";
import PostTeaserList from "../components/PostTeaserList";
import { NextSeo } from "next-seo";

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
      {props.page.content && (
        <div dangerouslySetInnerHTML={{ __html: props.page.content }} />
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
