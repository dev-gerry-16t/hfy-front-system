import React from "react";

const ViewContent = React.lazy(() => import("./views/Owner/owner"));

const routes = [
  {
    key: "1",
    id: "ViewContent",
    path: "/websystem/dashboard-owner",
    name: "View Content",
    component: ViewContent,
    exact: true,
  },
];

export default routes;
