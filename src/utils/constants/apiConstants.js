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
};

const API_CONSTANTS = {
  GET_ALL_CUSTOMER_BY_ID: `${API.API_SECURE}/customer/getCustomerById`,
  GET_ALL_CUSTOMER_TENANT_BY_ID: `${API.API_SECURE}/customer/getCustomerTenantsById`,
  GET_ALL_CUSTOMER_TENANT_COINCIDENCES: `${API.API_SECURE}/customer/getTenantCoincidences`,
  CUSTOMER_ADD_PROPERTY: `${API.API_SECURE}/customer/addProperty`,
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
  LOGIN: `${API.API}${API.SYSTEM_USER}/validateLogin`,
  GET_ALL_CUSTOMER_TYPES: `${API.API}${API.CUSTOMER}/getAllCustomer`,
  GET_ALL_CUSTOMER_INVITATION: `${API.API}${API.CUSTOMER}/getInvitation/`,
  GET_ALL_PERSON_TYPES: `${API.API}${API.PERSON}/getAllPerson`,
  GET_ALL_ENDORSEMENT: `${API.API}${API.ENDORSEMENT}/getAllEndorsement`,
  REGISTER: `${API.API}${API.REGISTER}`,
  VERIFY_CODE_REGISTER: `${API.API}${API.REGISTER}/verifyCode`,
};

export { API_CONSTANTS, HEADER };
