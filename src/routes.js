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
const PropertiesAdmin = React.lazy(() =>
  import("./views/Properties/propertiesAdmin")
);
const PublicProperties = React.lazy(() =>
  import("./views/Properties/publicProperties")
);
const PublicDirectProperties = React.lazy(() =>
  import("./views/Properties/publicDirectProperty")
);
const Transactions = React.lazy(() => import("./views/Payments/payments"));
const ProfileUsers = React.lazy(() => import("./views/Profile/profileUsers"));
const EditProfileUsers = React.lazy(() =>
  import("./views/Profile/editProfileUsers")
);
const UserDetailInformation = React.lazy(() =>
  import("./views/Admin/userDetailInformation")
);
const UserTypeDetailInformation = React.lazy(() =>
  import("./views/Admin/userTypeDetailInformation")
);
const Investigations = React.lazy(() => import("./views/Admin/investigations"));

const AddProperty = React.lazy(() => import("./views/Properties/addProperty"));

const DetailProperty = React.lazy(() =>
  import("./views/Properties/detailPropertyPublic")
);

const DetailPropertyUsers = React.lazy(() =>
  import("./views/Properties/detailPropertyUsers")
);

const SelectPolicy = React.lazy(() =>
  import("./views/Properties/selectPolicy")
);

const SelectPolicyUser = React.lazy(() =>
  import("./views/Properties/selectPolicyUser")
);

const PaymentsService = React.lazy(() =>
  import("./views/Payment/paymentService")
);

const ReportInvitation = React.lazy(() =>
  import("./views/Invitation/reporInvitation")
);

const VerificationIdentity = React.lazy(() =>
  import("./views/Verification/verificationIdentity")
);
const InvitationProspects = React.lazy(() =>
  import("./views/Prospects/invitationProspects")
);
const AllUsers = React.lazy(() => import("./views/Users/allUsers"));
const HomeAgent = React.lazy(() => import("./views/Home/homeAgent"));
const Notifications = React.lazy(() =>
  import("./views/Notification/notification")
);
const Statistics = React.lazy(() => import("./views/Statistics/statistics"));
const TopAgents = React.lazy(() => import("./views/TopAgents/topAgents"));
const Subscription = React.lazy(() =>
  import("./views/Subscription/subscription")
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
    key: "17-1",
    id: "Propiedades",
    path: "/websystem/admin-properties",
    name: "Propiedades Directas",
    component: PropertiesAdmin,
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
    id: "Perfil de Usuario",
    path: "/websystem/profile",
    name: "ProfileUsers",
    component: ProfileUsers,
    exact: true,
  },
  {
    key: "20",
    id: "Información",
    path: "/websystem/edit-profile",
    name: "Agregar información",
    component: EditProfileUsers,
    exact: true,
  },
  {
    key: "20-1",
    id: "Información",
    path: "/websystem/edit-profile/:identifier",
    name: "Agregar información",
    component: EditProfileUsers,
    exact: true,
  },
  {
    key: "20-2",
    id: "Información",
    path: "/websystem/edit-profile/:identifier/:idCustomer",
    name: "Agregar información",
    component: EditProfileUsers,
    exact: true,
  },
  {
    key: "21",
    id: "UserDetail",
    path: "/websystem/user-detail/:idInvestigationProcess",
    name: "Detalle de usuario",
    component: UserDetailInformation,
    exact: true,
  },
  {
    key: "21-2",
    id: "UserTypeDetail",
    path: "/websystem/userType-detail/:idCustomer",
    name: "Detalle de usuario",
    component: UserTypeDetailInformation,
    exact: true,
  },
  {
    key: "22",
    id: "Investigations",
    path: "/websystem/investigation",
    name: "Investigación de inquilinos",
    component: Investigations,
    exact: true,
  },
  {
    key: "23",
    id: "addProperty",
    path: "/websystem/add-property",
    name: "Agregar propiedad",
    component: AddProperty,
    exact: true,
  },
  {
    key: "23-1",
    id: "editProperty",
    path: "/websystem/edit-property/:idProperty",
    name: "Editar propiedad",
    component: AddProperty,
    exact: true,
  },
  {
    key: "23-2",
    id: "addProperty",
    path: "/websystem/add-property/:idCustomer",
    name: "Agregar propiedad",
    component: AddProperty,
    exact: true,
  },
  {
    key: "24",
    id: "detailProperty",
    path: "/websystem/detail-property/:idProperty",
    name: "Detalle propiedad",
    component: DetailProperty,
    exact: true,
  },
  {
    key: "25",
    id: "detailPropertyUsers",
    path: "/websystem/detail-property-users/:idProperty",
    name: "Detalle propiedad",
    component: DetailPropertyUsers,
    exact: true,
  },
  {
    key: "26",
    id: "selectPolicyUser",
    path: "/websystem/select-policy/:idProperty",
    name: "Agregar Póliza",
    component: SelectPolicy,
    exact: true,
  },
  {
    key: "26-1",
    id: "selectPolicyUser",
    path: "/websystem/select-policy-user",
    name: "Solicitud de Póliza",
    component: SelectPolicyUser,
    exact: true,
  },  
  {
    key: "27",
    id: "publicProperties",
    path: "/websystem/catalog-properties",
    name: "Propiedades",
    component: PublicProperties,
    exact: true,
  },
  {
    key: "27-1",
    id: "publicProperties",
    path: "/websystem/direct-properties",
    name: "Propiedades Directas",
    component: PublicDirectProperties,
    exact: true,
  },
  {
    key: "28",
    id: "paymentService",
    path: "/websystem/payment-service/:idOrderPayment",
    name: "Pago de servicio",
    component: PaymentsService,
    exact: true,
  },
  {
    key: "29",
    id: "reportInvitation",
    path: "/websystem/report/:idInvitation",
    name: "Invitación recibida",
    component: ReportInvitation,
    exact: true,
  },
  {
    key: "30",
    id: "verificationIdentity",
    path: "/websystem/verification",
    name: "Verificación de identidad",
    component: VerificationIdentity,
    exact: true,
  },
  {
    key: "31",
    id: "invitationProscpect",
    path: "/websystem/prospects",
    name: "Prospectos Invitados",
    component: InvitationProspects,
    exact: true,
  },
  {
    key: "32",
    id: "allUsers",
    path: "/websystem/users",
    name: "Usuarios",
    component: AllUsers,
    exact: true,
  },
  {
    key: "33",
    id: "home",
    path: "/websystem/home-asesor",
    name: "Home",
    component: HomeAgent,
    exact: true,
  },
  {
    key: "34",
    id: "norifications",
    path: "/websystem/notificaciones/:idNotification",
    name: "Notificaciones",
    component: Notifications,
    exact: true,
  },
  {
    key: "35",
    id: "statistics",
    path: "/websystem/estadisticas",
    name: "Estadísticas",
    component: Statistics,
    exact: true,
  },
  {
    key: "36",
    id: "topAgents",
    path: "/websystem/top-asesores",
    name: "Top Asesores",
    component: TopAgents,
    exact: true,
  },
  {
    key: "37",
    id: "susbscription-homify",
    path: "/websystem/subscription",
    name: "Suscripción",
    component: Subscription,
    exact: true,
  },
  {
    key: "37-1",
    id: "susbscription-homify",
    path: "/websystem/subscription/:status/:method",
    name: "Suscripción",
    component: Subscription,
    exact: true,
  },
];

export default routes;
