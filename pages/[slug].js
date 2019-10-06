import Head from "next/head";
import { useRouter } from "next/router";
import MainLayout from "../components/MainLayout";
import { getPages } from "../appUtilities/actions";
import PostTeaserList from "../components/PostTeaserList";
import { NextSeo } from "next-seo";

const Page = props => {
  const router = useRouter();
  const page = props.pages.filter(page => page.slug === router.query.slug)[0];
  console.log(router);
  return (
    <MainLayout pages={props.pages}>
      <NextSeo
        title={`${page.title}`}
        description={`${page.socialMediaBrief}`}
        openGraph={{
          url: `https://www.paradoxinversion.com${router.asPath}`,
          title: `${page.title}`,
          description: `${page.socialMediaBrief}`
        }}
      />
      {page.content && (
        <div
          className="page__content"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      )}

      <PostTeaserList searchType="page" query={page.slug} />

      {page.pagePostSections.length > 0 &&
        page.pagePostSections.map(postSection => {
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
Page.getInitialProps = async function() {
  const pageData = await getPages();
  return {
    pages: pageData.data
  };
};
export default Page;
