import ENVIROMENT from '../constants/enviroments';

const PORTS = {};

const API = {
  API: "/api",
  LOGIN: "/loginUser",
  REGISTER: "/registerUser",
};

const API_CONSTANTS={
    LOGIN:`${ENVIROMENT}${API.API}${API.LOGIN}`,
    REGISTER:`${ENVIROMENT}${API.API}${API.REGISTER}`,
}
