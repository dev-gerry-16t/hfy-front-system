import React from "react";

const ViewContent = React.lazy(() => import("./views/Owner/owner"));
const TenantFromOwner = React.lazy(() =>
  import("./views/Tenant/tenantFromOwner")
);
const LeadsLandingPage = React.lazy(() => import("./views/Leads/leads"));
const Tenant = React.lazy(() => import("./views/Tenant/tenant"));
const Adviser = React.lazy(() => import("./views/Adviser/adviser"));
const Administrator = React.lazy(() => import("./views/Admin/administrator"));
const AgentsSystem = React.lazy(() => import("./views/Adviser/agents"));
const AttorneysSystem = React.lazy(() => import("./views/Attorney/attorney"));
const TypeFormUser = React.lazy(() => import("./views/TypeForm/typeFormUser"));
const TypeFormUserOwner = React.lazy(() =>
  import("./views/TypeForm/typeFormOwner")
);
const ControlDesk = React.lazy(() =>
  import("./views/Admin/administratorControlDesk")
);
const MakeScreen = React.lazy(() => import("./views/MakeScreen/makeScreen"));
const Providers = React.lazy(() => import("./views/Providers/providers"));
const RequestProviders = React.lazy(() =>
  import("./views/RequestServices/requestServices")
);
const Incidences = React.lazy(() => import("./views/Incidences/incidences"));
const AdvancementRent = React.lazy(() =>
  import("./views/AdvancementRent/advancementRent")
);
const Properties = React.lazy(() =>
  import("./views/Properties/propertiesOwner")
);
const Transactions = React.lazy(() => import("./views/Payments/payments"));
const ProfileUsers = React.lazy(() => import("./views/Profile/profileUsers"));
const EditProfileUsers = React.lazy(() =>
  import("./views/Profile/editProfileUsers")
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
    path: "/websystem/dashboard-owner/tenant/:idCustomerTenant",
    name: "Inquilino",
    component: TenantFromOwner,
    exact: true,
  },
  {
    key: "3",
    id: "Leads",
    path: "/websystem/leads-landingpage",
    name: "Leads",
    component: LeadsLandingPage,
    exact: true,
  },
  {
    key: "4",
    id: "Tenant",
    path: "/websystem/dashboard-tenant",
    name: "Dashboard",
    component: Tenant,
    exact: true,
  },
  {
    key: "5",
    id: "TypeForm",
    path: "/websystem/typeform-user/:idSection",
    name: "TypeForm",
    component: TypeFormUser,
    exact: true,
  },
  {
    key: "5-1",
    id: "TypeForm",
    path: "/websystem/typeform-user",
    name: "TypeForm",
    component: TypeFormUser,
    exact: true,
  },
  {
    key: "6",
    id: "TypeFormUserOwner",
    path: "/websystem/typeform-owner/:idSection",
    name: "TypeForm",
    component: TypeFormUserOwner,
    exact: true,
  },
  {
    key: "6-1",
    id: "TypeFormUserOwner",
    path: "/websystem/typeform-owner",
    name: "TypeForm",
    component: TypeFormUserOwner,
    exact: true,
  },
  {
    key: "7",
    id: "Adviser",
    path: "/websystem/dashboard-adviser",
    name: "Dashboard",
    component: Adviser,
    exact: true,
  },
  {
    key: "8",
    id: "Administrator",
    path: "/websystem/dashboard-admin",
    name: "Dashboard",
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
  {
    key: "10",
    id: "Asesores",
    path: "/websystem/dashboard-agents",
    name: "Asesores",
    component: AgentsSystem,
    exact: true,
  },
  {
    key: "11",
    id: "Contratos",
    path: "/websystem/dashboard-attorney",
    name: "Contratos",
    component: AttorneysSystem,
    exact: true,
  },
  {
    key: "12",
    id: "Dashboard",
    path: "/websystem/dashboard-controldesk",
    name: "Dashboard",
    component: ControlDesk,
    exact: true,
  },
  {
    key: "13",
    id: "Proveedores",
    path: "/websystem/dashboard-providers",
    name: "Proveedores",
    component: Providers,
    exact: true,
  },
  {
    key: "14",
    id: "Solicitudes de Proveedor",
    path: "/websystem/dashboard-request-providers",
    name: "Solicitudes de Proveedor",
    component: RequestProviders,
    exact: true,
  },
  {
    key: "15",
    id: "Incidencias",
    path: "/websystem/dashboard-incidences",
    name: "Incidencias Reportadas",
    component: Incidences,
    exact: true,
  },
  {
    key: "16",
    id: "Adelantos de renta",
    path: "/websystem/dashboard-advancement",
    name: "Adelantos de renta",
    component: AdvancementRent,
    exact: true,
  },
  {
    key: "17",
    id: "Propiedades",
    path: "/websystem/dashboard-properties",
    name: "Propiedades",
    component: Properties,
    exact: true,
  },
  {
    key: "18",
    id: "Transacciones",
    path: "/websystem/dashboard-transactions",
    name: "Transacciones",
    component: Transactions,
    exact: true,
  },
  {
    key: "19",
    id: "Transacciones",
    path: "/websystem/profile",
    name: "ProfileUsers",
    component: ProfileUsers,
    exact: true,
  },
  {
    key: "20",
    id: "Transacciones",
    path: "/websystem/edit-profile",
    name: "ProfileUsers",
    component: EditProfileUsers,
    exact: true,
  },
];

export default routes;
