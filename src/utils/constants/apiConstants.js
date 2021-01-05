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
  GET_ALL_CUSTOMER_TENANT_COINCIDENCES: `${API.API_SECURE}/customer/getTenantCoincidences`,
  GET_ALL_STATS_CHART: `${API.API_SECURE}/customer/statsCharts`,
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
