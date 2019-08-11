import { getPages } from "../appUtilities/actions";
import PostTeaserList from "../components/PostTeaserList";
import MainLayout from "../components/MainLayout";
const Search = props => {
  return (
    <MainLayout pages={props.pages}>
      <div className="margin--standard">
        <PostTeaserList
          searchType={props.search.type}
          query={props.search.query}
        />
      </div>
    </MainLayout>
  );
};

Search.getInitialProps = async function({ query }) {
  // const postData = await queryPosts(query.type, query.query);
  const pageData = await getPages();
  return {
    pages: pageData.data,
    search: {
      type: query.type,
      query: query.query
    }
  };
};

export default Search;
