const HEADER = {
  "Content-Type": "application/json",
};

const API = {
  API: "/api",
  API_SECURE: "/apiAccess",
  SYSTEM_USER: "/systemUser",
  REGISTER: "/requestSignUp",
  CUSTOMER: "/customerType",
  PERSON: "/personType",
  ENDORSEMENT: "/endorsement",
  TYPEFORM: "/typeForm",
  CATALOGS: "/catalogs",
  ADMIN: "/admin",
  LEADS: "/leads",
  HISTORIC: "/historic",
  PROVIDERS: "/providerPayment",
};

const API_CONSTANTS = {
  PAYMENT_SERVICE: `${API.API_SECURE}${API.PROVIDERS}/getAmountForGWTransaction`,
  GET_REQUEST_PROVIDER_PROPIERTIES_V2: `${API.API_SECURE}${API.PROVIDERS}/getRequestForProviderProperties/v2`,
  GET_REQUEST_PROVIDER_PROPIERTIES: `${API.API_SECURE}${API.PROVIDERS}/getRequestForProviderProperties`,
  ADD_INCIDENCE: `${API.API_SECURE}${API.PROVIDERS}/addIncidence`,
  SIGN_REQUEST_FOR_PROVIDER: `${API.API_SECURE}${API.PROVIDERS}/signRequestForProvider/`,
  UPDATE_INCIDENCE: `${API.API_SECURE}${API.PROVIDERS}/updateIncidence/`,
  UPDATE_MOVING_DIALOG: `${API.API_SECURE}${API.PROVIDERS}/updateMovingDialog`,
  GET_REQUEST_PROVIDER_FOR_TENANT: `${API.API_SECURE}${API.PROVIDERS}/addRequestForProvider`,
  GET_REQUEST_PROVIDER_BY_ID: `${API.API_SECURE}${API.PROVIDERS}/getRequestForProviderById`,
  GET_INCIDENCE_COINCIDENCES: `${API.API_SECURE}${API.PROVIDERS}/getIncidenceCoincidences`,
  GET_REQUEST_PROVIDER_COINCIDENCES: `${API.API_SECURE}${API.PROVIDERS}/getRequestForProviderCoincidences`,
  UPDATE_REQUEST_PROVIDER: `${API.API_SECURE}${API.PROVIDERS}/updateRequestForProvider/`,
  SET_PROVIDER: `${API.API_SECURE}${API.PROVIDERS}/setProvider/`,
  GET_PROVIDER_BY_ID: `${API.API_SECURE}${API.PROVIDERS}/getProviderById`,
  GET_INCIDENCE_BY_ID: `${API.API_SECURE}${API.PROVIDERS}/getIncidenceById`,
  GET_ALL_PROVIDERS_COINCIDENCES: `${API.API_SECURE}${API.PROVIDERS}/getProviderCoincidences`,
  GET_ALL_INCIDENCE_PAYMENTS_METHODS: `${API.API_SECURE}${API.CATALOGS}/getAllIncidenePaymentMethods`,
  GET_ALL_CUSTOMER_FOR_INCIDENCE: `${API.API_SECURE}${API.CATALOGS}/getCustomerForIncidence`,
  GET_ALL_INCIDENCE_STATUS: `${API.API_SECURE}${API.CATALOGS}/getAllIncidenceStatus`,
  GET_ALL_INCIDENCE_TYPES: `${API.API_SECURE}${API.CATALOGS}/getAllIncidenceTypes`,
  GET_ALL_REQUEST_PROVIDER_STATUS: `${API.API_SECURE}${API.CATALOGS}/getAllRequestForProviderStatus`,
  GET_ALL_COLLABORATORS: `${API.API_SECURE}${API.CATALOGS}/getAllCollaborators`,
  GET_ALL_PROVIDER_TYPES: `${API.API_SECURE}${API.CATALOGS}/getAllProviderTypes`,
  GET_ALL_COLLABORATOR_TYPES: `${API.API_SECURE}${API.CATALOGS}/getAllCollaboratorTypes`,
  GET_ALL_PROVIDERS: `${API.API_SECURE}${API.CATALOGS}/getAllProviders`,
  GET_ALL_PROVIDER_PAYMENT_FORM: `${API.API_SECURE}${API.CATALOGS}/getAllProviderPaymentForms`,
  GET_ALL_CUSTOMER_BY_ID: `${API.API_SECURE}/customer/getCustomerById`,
  GET_NOTIFICATIONS: `${API.API_SECURE}/customer/getNotifications`,
  UPDATE_NOTIFICATIONS: `${API.API_SECURE}/customer/updateNotifications/`,
  GET_ALL_PYMENT_TYPES: `${API.API_SECURE}/customer/getAllPayments`,
  GET_ALL_PYMENT_CONTRACT: `${API.API_SECURE}/customer/getAllPaymentInContract`,
  GET_ALL_CUSTOMER_TENANT_BY_ID: `${API.API_SECURE}/customer/getCustomerTenantsById`,
  GET_ALL_CUSTOMER_TENANT_DASHBOARD_BY_ID: `${API.API_SECURE}/customer/getCustTenantDashboardById`,
  GET_ALL_CUSTOMER_TENANT_COINCIDENCES: `${API.API_SECURE}/customer/getTenantCoincidences`,
  ADD_CUSTOMER_MESSAGE: `${API.API_SECURE}/customer/addCustomerMessage`,
  GET_CUSTOMER_MESSAGE: `${API.API_SECURE}/customer/getCustomerMessage`,
  CUSTOMER_ADD_PROPERTY: `${API.API_SECURE}/customer/addProperty`,
  GET_ALL_DOCUMENT_TYPES: `${API.API_SECURE}/customer/getAllDocumentTypes`,
  GET_PAYMENT_IN_CONTRACT_DOCUMENT: `${API.API_SECURE}/customer/getPaymentInContractDocument`,
  GET_ALL_PROPERTIES: `${API.API_SECURE}/customer/getAllProperties`,
  GET_ALL_DEPARTMENTS: `${API.API_SECURE}/customer/getApartments`,
  REQUEST_ADVANCEMENT_RENTS: `${API.API_SECURE}/customer/requestAdvancement`,
  SEND_TENANT_INVITATION: `${API.API_SECURE}/customer/tenantInvitation`,
  GET_ALL_STATS_CHART: `${API.API_SECURE}/customer/statsCharts`,
  GET_ZIP_CODE_ADRESS: `${API.API_SECURE}/customer/getAdressZipCode`,
  GET_ALL_TENANTS_CATALOG: `${API.API_SECURE}/customer/getCustomerTenants`,
  GET_ALL_BANKS_CATALOG: `${API.API_SECURE}/customer/getAllBanks`,
  GET_AGENT_INDICATORS: `${API.API_SECURE}/customer/getAgentIndicators`,
  GET_AGENT_CONTRACT_COINCIDENCES: `${API.API_SECURE}/customer/getAgentContractCoincidences`,
  GET_AGENT_COMISSION_CHART: `${API.API_SECURE}/customer/getAgentCommissionChart`,
  GET_USER_PROFILE: `${API.API_SECURE}${API.SYSTEM_USER}/userProfile`,
  GET_MENU_PROFILE: `${API.API_SECURE}${API.SYSTEM_USER}/menuProfile`,
  SET_IMAGE_PROFILE: `${API.API_SECURE}${API.SYSTEM_USER}/setUserProfile/`,
  LOGIN: `${API.API}${API.SYSTEM_USER}/validateLogin`,
  GET_ALL_CUSTOMER_TYPES: `${API.API}${API.CUSTOMER}/getAllCustomer`,
  GET_ALL_CUSTOMER_INVITATION: `${API.API}${API.CUSTOMER}/getInvitation/`,
  GET_ALL_PERSON_TYPES: `${API.API}${API.PERSON}/getAllPerson`,
  GET_ALL_ENDORSEMENT: `${API.API}${API.ENDORSEMENT}/getAllEndorsement`,
  REGISTER: `${API.API}${API.REGISTER}`,
  REQUEST_RECOVERY_PASS: `${API.API}/requestRecoveryPass`,
  VERIFY_CODE_RECOVERY_PASS: `${API.API}/verifyCodeRecoveryPass`,
  RECOVERY_PASS: `${API.API}/recoveryPass/`,
  VERIFY_CODE_REGISTER: `${API.API}${API.REGISTER}/verifyCode`,
  ADD_DOCUMENT: `${API.API_SECURE}/addDocument`,
  GET_TYPEFORM_TENANT: `${API.API_SECURE}${API.TYPEFORM}/getTypeForm`,
  GET_TYPEFORM_OWNER: `${API.API_SECURE}${API.TYPEFORM}/getCustomerTypeForm`,
  SET_TYPEFORM_REFERENCES: `${API.API_SECURE}${API.TYPEFORM}/setTypeFormReference`,
  SET_TYPEFORM_DOCUMENT_TENANT: `${API.API_SECURE}${API.TYPEFORM}/setTypeForm`,
  SET_TYPEFORM_OWNER: `${API.API_SECURE}${API.TYPEFORM}/setTypeFormOwner`,
  GET_TYPEFORM_DOCUMENT_TENANT: `${API.API_SECURE}${API.TYPEFORM}/getTypeFormDocument`,
  PUT_ADD_TYPEFORM_DOCUMENT: `${API.API_SECURE}${API.TYPEFORM}/addTypeFormDocument/`,
  GET_TYPEFORM_PROPERTIES: `${API.API_SECURE}${API.TYPEFORM}/getTypeFormProperties`,
  GET_CATALOG_POLICY_PAYMENT_METHOD: `${API.API_SECURE}${API.CATALOGS}/getAllPolicyPaymentMethods`,
  GET_CATALOG_MARITAL_STATUS: `${API.API_SECURE}${API.CATALOGS}/getAllMaritalStatus`,
  GET_CATALOG_MARITAL_REGIME: `${API.API_SECURE}${API.CATALOGS}/getAllMaritalRegime`,
  GET_CATALOG_PROPERTY_TYPES: `${API.API_SECURE}${API.CATALOGS}/getAllPropertyTypes`,
  GET_CATALOG_POLICIES: `${API.API_SECURE}${API.CATALOGS}/getAllPolicies`,
  GET_CATALOG_NATIONALITIES: `${API.API_SECURE}${API.CATALOGS}/getAllNationalities`,
  GET_CATALOG_ID_TYPES: `${API.API_SECURE}${API.CATALOGS}/getAllIDTypes`,
  GET_CATALOG_OCCUPATIONS: `${API.API_SECURE}${API.CATALOGS}/getAllOccupations`,
  GET_CATALOG_POLICY_STATUS: `${API.API_SECURE}${API.CATALOGS}/getAllPolicyStatus`,
  GET_CATALOG_COMMERCIAL_SOCIETY_TYPES: `${API.API_SECURE}${API.CATALOGS}/getAllCommercialSocietyTypes`,
  GET_CATALOG_ALL_STATES: `${API.API_SECURE}${API.CATALOGS}/getAllStates`,
  GET_ALL_PROSPECT_STATUS: `${API.API_SECURE}${API.CATALOGS}/getAllProspectStatus`,
  GET_ALL_RELATIONSHIP_TYPES: `${API.API_SECURE}${API.CATALOGS}/getAllRelationshipTypes`,
  GET_ALL_PERSONAL_REFERENCE_STATUS: `${API.API_SECURE}${API.CATALOGS}/getAllPersonalReferenceStatus`,
  GET_CONTRACT_STATS: `${API.API_SECURE}${API.ADMIN}/getContractStats`,
  GET_CONTRACT_COINCIDENCES: `${API.API_SECURE}${API.ADMIN}/getContractCoincidences`,
  GET_CONTRACT_CHART: `${API.API_SECURE}${API.ADMIN}/getContractIndicatorsChart`,
  GET_SEARCH_CUSTOMER: `${API.API_SECURE}${API.ADMIN}/searchCustomer`,
  GET_ADD_PROSPECT: `${API.API_SECURE}${API.ADMIN}/addProspect`,
  GET_DETAIL_CUSTOMER: `${API.API_SECURE}${API.ADMIN}/getByIdContract`,
  GET_DETAIL_CUSTOMER_TENANT: `${API.API_SECURE}${API.ADMIN}/getTenantByIdContract`,
  GET_DETAIL_CUSTOMER_AGENT: `${API.API_SECURE}${API.ADMIN}/getAgentByIdContract`,
  SET_UPDATE_CONTRACT: `${API.API_SECURE}${API.ADMIN}/updateContract/`,
  SET_SWITCH_CUSTOMER_CONTRACT: `${API.API_SECURE}${API.ADMIN}/switchCustomerInContract/`,
  GET_CONTRACT: `${API.API_SECURE}${API.ADMIN}/getContract/v2`,
  GET_CONTRACT_COMMENT: `${API.API_SECURE}${API.ADMIN}/getContractComment`,
  SET_CONTRACT: `${API.API_SECURE}${API.ADMIN}/setContract/`,
  ADD_CONTRACT_COMMENT: `${API.API_SECURE}${API.ADMIN}/addContractComment/`,
  GET_CONTRACT_DOCUMENT: `${API.API_SECURE}${API.ADMIN}/getDigitalContractDocument`,
  ADD_CONTRACT_DOCUMENT: `${API.API_SECURE}${API.ADMIN}/addDigitalContractDocument/`,
  ADD_CONTRACT_DOCUMENT_ID: `${API.API_SECURE}${API.ADMIN}/addContractDocument/`,
  GET_CONTRACT_DOCUMENT_BYID: `${API.API_SECURE}${API.ADMIN}/getDocumentByIdContract`,
  GET_CUSTOMER_AGENT_COINCIDENCES: `${API.API_SECURE}${API.ADMIN}/getCustomerAgentCoincidences`,
  GET_LEGAL_CONTRACT_COINCIDENCES: `${API.API_SECURE}${API.ADMIN}/getLegalContractCoincidences`,
  SET_PERSONAL_REFERENCE_FORM: `${API.API_SECURE}${API.ADMIN}/setPersonalReferenceForm/`,
  GET_LANDING_PROSPECT_COINCIDENECES: `${API.API_SECURE}${API.LEADS}/getLandingProspectCoincidences`,
  GET_LANDING_PROSPECT_STATS: `${API.API_SECURE}${API.LEADS}/getLandingProspectStats`,
  UPDATE_LANDING_PROSPECT_STATUS: `${API.API_SECURE}${API.LEADS}/updateLandingProspect/`,
  BULK_POTENTIAL_AGENT: `${API.API_SECURE}${API.LEADS}/bulkPotentialAgent`,
  GET_POTENTIAL_AGENT_COINCIDENCES: `${API.API_SECURE}${API.LEADS}/getPotentialAgentCoincidences`,
  GET_AUDIT_REFERENCES: `${API.API_SECURE}${API.HISTORIC}/getAudit`,
};

export { API_CONSTANTS, HEADER };
