import { getPages } from "../appUtilities/actions";
import PostTeaserList from "../components/PostTeaserList";
import MainLayout from "../components/MainLayout";
const Search = props => {
  return (
    <MainLayout pages={props.pages}>
      <PostTeaserList
        searchType={props.search.type}
        query={props.search.query}
      />
    </MainLayout>
  );
};

Search.getInitialProps = async function({ query }) {
  const pageData = await getPages();
  return {
    pages: pageData,
    search: {
      type: query.type,
      query: query.query
    }
  };
};

export default Search;
