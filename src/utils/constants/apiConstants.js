const HEADER = { "Content-Type": "application/json" };

const API = {
  API: "/api",
  SYSTEM_USER: "/systemUser",
  REGISTER: "/requestSignUp",
  CUSTOMER: "/customerType",
  PERSON: "/personType",
  ENDORSEMENT: "/endorsement",
};

const API_CONSTANTS = {
  LOGIN: `${API.API}${API.SYSTEM_USER}/validateLogin`,
  GET_ALL_CUSTOMER_TYPES: `${API.API}${API.CUSTOMER}/getAllCustomer`,
  GET_ALL_PERSON_TYPES: `${API.API}${API.PERSON}/getAllPerson`,
  GET_ALL_ENDORSEMENT: `${API.API}${API.ENDORSEMENT}/getAllEndorsement`,
  REGISTER: `${API.API}${API.REGISTER}`,
  VERIFY_CODE_REGISTER: `${API.API}${API.REGISTER}/verifyCode`,
};

export { API_CONSTANTS, HEADER };
