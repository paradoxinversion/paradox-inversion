import Head from "next/head";
import { useRouter } from "next/router";
import { withRouter } from "next/router";

import MainLayout from "../../components/MainLayout";
import { getPages, getPage } from "../../appUtilities/actions";
import PostTeaserList from "../../components/PostTeaserList";
import { NextSeo } from "next-seo";

const Page = props => {
  // const router = useRouter();
  // console.log(router);
  // const page = props.pages.filter(page => page.slug === router.query.slug)[0];
  console.log(props);
  return (
    <MainLayout pages={props.pages}>
      <NextSeo
        title={`${props.page.title}`}
        description={`${props.page.socialMediaBrief}`}
        openGraph={{
          url: `https://www.paradoxinversion.com/${props.page.url}`,
          title: `${props.page.title}`,
          description: `${props.page.socialMediaBrief}`
        }}
      />
      {page.content && (
        <div
          className="page__content"
          dangerouslySetInnerHTML={{ __html: props.page.content }}
        />
      )}

      <PostTeaserList searchType="page" query={props.page.slug} />

      {props.page.pagePostSections.length > 0 &&
        props.page.pagePostSections.map(postSection => {
          const typeAndQuery = postSection.split(" ");
          return (
            <PostTeaserList
              key={`teaser-${typeAndQuery[0]}-${typeAndQuery[1]}`}
              searchType={typeAndQuery[0]}
              query={typeAndQuery[1]}
            />
          );
        })}
    </MainLayout>
  );
};
Page.getInitialProps = async function({ query }) {
  console.log("LOAD", query);
  const pages = await getPages();
  // const page = await getPage();
  return {
    pages,
    slug: query.slug
  };
};
export default withRouter(Page);
