const HEADER = { "Content-Type": "application/json" };

const API = {
  API: "/api",
  SYSTEM_USER: "/systemUser",
  REGISTER: "/requestSignUp",
};

const API_CONSTANTS = {
  LOGIN: `${API.API}${API.SYSTEM_USER}/validateLogin`,
  REGISTER: `${API.API}${API.REGISTER}`,
  VERIFY_CODE_REGISTER: `${API.API}${API.REGISTER}//verifyCode`,
};

export { API_CONSTANTS, HEADER };
