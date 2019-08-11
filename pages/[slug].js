import Head from "next/head";
import { useRouter } from "next/router";
import MainLayout from "../components/MainLayout";
import { getPages } from "../appUtilities/actions";
import PostTeaserList from "../components/PostTeaserList";
const Page = props => {
  const router = useRouter();
  const page = props.pages.filter(page => page.slug === router.query.slug)[0];

  return (
    <MainLayout pages={props.pages}>
      <Head>
        <title>Paradox Inversion - {page.title}</title>
        <meta
          property="og:title"
          content={`Pradox Inversion - ${page.title}`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`http://www.paradoxinversion.com${router.asPath}`}
        />
        <meta
          property="og:description"
          content="Home of Fiction, Articles, and Games by Jedai Saboteur"
        />
      </Head>
      <div className="margin--standard">
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
      </div>
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
