import React from "react";

const ViewContent = React.lazy(() => import("./views/Owner/owner"));
const TenantFromOwner = React.lazy(() =>
  import("./views/Tenant/tenantFromOwner")
);
const SignatureTest = React.lazy(() =>
  import("./views/Signature/signatureIndex")
);
const Tenant = React.lazy(() => import("./views/Tenant/tenant"));
const Adviser = React.lazy(() => import("./views/Adviser/adviser"));
const Administrator = React.lazy(() => import("./views/Admin/administrator"));
const TypeFormUser = React.lazy(() => import("./views/TypeForm/typeFormUser"));
const TypeFormUserOwner = React.lazy(() =>
  import("./views/TypeForm/typeFormOwner")
);
const MakeScreen = React.lazy(() => import("./views/MakeScreen/makeScreen"));

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
    path: "/websystem/dashboard-owner/tenant/:idCustomerTenant",
    name: "Inquilino",
    component: TenantFromOwner,
    exact: true,
  },
  {
    key: "3",
    id: "SignatureTest",
    path: "/websystem/testSignature",
    name: "signature",
    component: SignatureTest,
    exact: true,
  },
  {
    key: "4",
    id: "Tenant",
    path: "/websystem/dashboard-tenant",
    name: "Tenant",
    component: Tenant,
    exact: true,
  },
  {
    key: "5",
    id: "TypeForm",
    path: "/websystem/typeform-user",
    name: "TypeForm",
    component: TypeFormUser,
    exact: true,
  },
  {
    key: "6",
    id: "TypeFormUserOwner",
    path: "/websystem/typeform-owner",
    name: "TypeFormUserOwner",
    component: TypeFormUserOwner,
    exact: true,
  },
  {
    key: "7",
    id: "Adviser",
    path: "/websystem/dashboard-adviser",
    name: "Adviser",
    component: Adviser,
    exact: true,
  },
  {
    key: "8",
    id: "Administrator",
    path: "/websystem/dashboard-admin",
    name: "Administrator",
    component: Administrator,
    exact: true,
  },
  {
    key: "9",
    id: "Ownerships",
    path: "/websystem/ownership",
    name: "Propiedades",
    component: MakeScreen,
    exact: true,
  },
];

export default routes;
