import Index from "./pages/Index/Index";

export const routes = [
  {
    component: Index,
    routes: [
      {
        path: "/",
        exact: true
      }
    ]
  }
];
