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
};

const API_CONSTANTS = {
  GET_ALL_CUSTOMER_BY_ID: `${API.API_SECURE}/customer/getCustomerById`,
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
  GET_CATALOG_MARITAL_STATUS: `${API.API_SECURE}${API.CATALOGS}/getAllMaritalStatus`,
  GET_CATALOG_PROPERTY_TYPES: `${API.API_SECURE}${API.CATALOGS}/getAllPropertyTypes`,
  GET_CATALOG_POLICIES: `${API.API_SECURE}${API.CATALOGS}/getAllPolicies`,
  GET_CATALOG_NATIONALITIES: `${API.API_SECURE}${API.CATALOGS}/getAllNationalities`,
  GET_CATALOG_ID_TYPES: `${API.API_SECURE}${API.CATALOGS}/getAllIDTypes`,
  GET_CATALOG_OCCUPATIONS: `${API.API_SECURE}${API.CATALOGS}/getAllOccupations`,
  GET_CATALOG_POLICY_STATUS: `${API.API_SECURE}${API.CATALOGS}/getAllPolicyStatus`,
  GET_CONTRACT_STATS: `${API.API_SECURE}${API.ADMIN}/getContractStats`,
  GET_CONTRACT_COINCIDENCES: `${API.API_SECURE}${API.ADMIN}/getContractCoincidences`,
  GET_CONTRACT_CHART: `${API.API_SECURE}${API.ADMIN}/getContractIndicatorsChart`,
  GET_SEARCH_CUSTOMER: `${API.API_SECURE}${API.ADMIN}/searchCustomer`,
  GET_ADD_PROSPECT: `${API.API_SECURE}${API.ADMIN}/addProspect`,
  SET_UPDATE_CONTRACT: `${API.API_SECURE}${API.ADMIN}/updateContract/`,
};

export { API_CONSTANTS, HEADER };
