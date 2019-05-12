import Index from "./pages/Index/Index";
import App from "./App";
import Post from "./components/Post/Post";
import PostIndex from "./pages/PostIndex/PostIndex";
import Page from "./components/Page/Page";
import { getPost, queryPosts, getPages } from "./actions";

export const routes = [
  {
    path: "/post/:year/:month/:day/:slug",
    component: Post,
    fetchInitialData: (path = "") => getPost(path.split("/").pop())
  },
  {
    path: "/posts/:searchType/:query",
    component: PostIndex,
    fetchInitialData: (path = "") => {
      const typeAndQuery = path.split("/").slice(-2);
      return queryPosts(typeAndQuery[0], typeAndQuery[1]);
    }
  },
  {
    path: "/story/:storyName",
    component: Page,
    fetchInitialData: () => getPages()
  },
  {
    path: "/:page",
    component: Page,
    exact: true,
    fetchInitialData: () => getPages()
  },
  {
    path: "/",
    component: Index,
    exact: true,
    fetchInitialData: () => getPages()
  }
];
