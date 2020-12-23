import React from "react";

const ViewContent = React.lazy(() => import("./views/Content/content"));

const routes = [
  {
    id: "ViewContent",
    path: "/",
    name: "View Content",
    component: ViewContent,
    exact: true,
  },
];

export default routes;
