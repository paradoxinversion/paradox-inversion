import Index from "./pages/Index/Index";
import App from "./App";
import Post from "./components/Post/Post";
import PostIndex from "./pages/PostIndex/PostIndex";
import Page from "./components/Page/Page";

export const routes = [
  {
    path: "/",
    component: Index,
    exact: true
  },
  {
    path: "/post/:year/:month/:day/:slug",
    component: Post
  },
  {
    path: "/posts/:searchType/:query",
    component: PostIndex
  },
  {
    path: "/:page",
    component: Page
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
