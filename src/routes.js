import React from "react";

const ViewContent = React.lazy(() => import("./views/Owner/owner"));
const TenantFromOwner = React.lazy(() =>
  import("./views/Tenant/tenantFromOwner")
);
const SignatureTest = React.lazy(() =>
  import("./views/Signature/signatureIndex")
);

const routes = [
  {
    key: "1",
    id: "Dashboard",
    path: "/websystem/dashboard-owner",
    name: "Dashboard",
    component: ViewContent,
    exact: true,
  },
  {
    key: "2",
    id: "TenantFromOwner",
    path: "/websystem/dashboard-owner/tenant/:idCustomer",
    name: "Inquilino",
    component: TenantFromOwner,
    exact: true,
  },
  ,
  {
    key: "3",
    id: "SignatureTest",
    path: "/websystem/testSignature",
    name: "signature",
    component: SignatureTest,
    exact: true,
  },
];

export default routes;
