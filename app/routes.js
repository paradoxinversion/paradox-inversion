import Index from "./pages/Index/Index";
import App from "./App";
import Post from "./components/Post/Post";
import PostIndex from "./pages/PostIndex/PostIndex";
import Page from "./components/Page/Page";
import { getPost, queryPosts, getPages } from "./actions";

export const routes = [
  {
    path: "/",
    component: Index,
    exact: true
  },
  {
    path: "/post/:year/:month/:day/:slug",
    component: Post,
    fetchInitialData: (path = "") => getPost(path.split("/").pop())
  },
  {
    path: "/posts/:searchType/:query",
    component: PostIndex
  },
  {
    path: "/:page",
    component: Page,
    exact: true,
    fetchInitialData: () => getPages()
  }
];
// export const routes = [
//   {
//     path: "/post/:year/:month/:day/:slug",
//     component: Post
//   },
//   {
//     path: "/posts/:searchType/:query",
//     component: PostIndex
//   },
//   {
//     path: "/:page",
//     component: Page
//   }
// ];
