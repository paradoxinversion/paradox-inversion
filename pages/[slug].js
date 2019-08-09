import { useRouter } from "next/router";
import MainLayout from "../components/MainLayout";
import { getPages } from "../appUtilities/actions";
import PostTeaserList from "../components/PostTeaserList";
const Page = props => {
  const router = useRouter();
  const page = props.pages.filter(page => page.slug === router.query.slug)[0];
  if (page) {
    return (
      <MainLayout pages={props.pages}>
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
  } else {
    // TODO: Make this more useful
    return (
      <MainLayout>
        <p>Derp</p>
      </MainLayout>
    );
  }
};
Page.getInitialProps = async function() {
  const pageData = await getPages();
  return {
    pages: pageData.data
  };
};
export default Page;
