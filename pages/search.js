import { getPages } from "../app/actions";
import PostTeaserList from "../app/components/PostTeaserList";
import MainLayout from "../app/components/MainLayout";
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
