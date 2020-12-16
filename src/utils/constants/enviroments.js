const DOMAIN_WEB = "homify.biz";
const DOMAIN_WEB_TEST = "homify.biz";
const DOMAIN_WEB_LOCAL = "localhost";

const INSTANCE_LOCAL = {
  DNS_API: "localhost",
  API_PROTOCOL: "http://",
  PORT: "3001",
};

const INSTANCE_TEST = {
  DNS_API: "api.homify.biz",
  API_PROTOCOL: "http://",
  PORT: "",
};

const INSTANCE_PRODUCTION = {
  DNS_API: "api.homify.biz",
  API_PROTOCOL: "http://",
  PORT: "",
};

let ENVIROMENT = "";

const getEnviroment = () => {
  let location = null;
  if (window.location.host === DOMAIN_WEB) {
    location = `${INSTANCE_PRODUCTION.API_PROTOCOL}${INSTANCE_PRODUCTION.DNS_API}`;
  } else if (window.location.host === DOMAIN_WEB_TEST) {
    location = `${INSTANCE_TEST.API_PROTOCOL}${INSTANCE_TEST.DNS_API}`;
  } else if (window.location.host === DOMAIN_WEB_LOCAL) {
    location = `${INSTANCE_LOCAL.API_PROTOCOL}${INSTANCE_LOCAL.DNS_API}:${INSTANCE_LOCAL.PORT}`;
  }

  return location;
};

ENVIROMENT = getEnviroment();

export default ENVIROMENT;
