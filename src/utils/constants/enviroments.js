const DOMAIN_WEB = "homify.biz";
const DOMAIN_WEB_TEST = "homify.biz";
const DOMAIN_WEB_LOCAL = "localhost";

const INSTANCE_LOCAL = {
  DNS_API: "localhost",
  API_PROTOCOL: "http://",
  PORT: "3001",
};

const INSTANCE_TEST = {
  DNS_API: "hfybacksystem-env.eba-m97qsknm.us-east-2.elasticbeanstalk.com",
  API_PROTOCOL: "http://",
  PORT: "",
};

const INSTANCE_PRODUCTION = {
  DNS_API: "hfybacksystem-env.eba-m97qsknm.us-east-2.elasticbeanstalk.com",
  API_PROTOCOL: "http://",
  PORT: "",
};

let ENVIROMENT = "";

const getEnviroment = () => {
  let location = null;
  console.log("window.location.hostname", window.location.hostname);
  if (window.location.hostname === DOMAIN_WEB) {
    location = `${INSTANCE_PRODUCTION.API_PROTOCOL}${INSTANCE_PRODUCTION.DNS_API}`;
  } else if (window.location.hostname === DOMAIN_WEB_TEST) {
    location = `${INSTANCE_TEST.API_PROTOCOL}${INSTANCE_TEST.DNS_API}`;
  } else if (window.location.hostname === DOMAIN_WEB_LOCAL) {
    location = `${INSTANCE_LOCAL.API_PROTOCOL}${INSTANCE_LOCAL.DNS_API}:${INSTANCE_LOCAL.PORT}`;
  }

  return location;
};

ENVIROMENT = getEnviroment();

// ENVIROMENT=`${INSTANCE_TEST.API_PROTOCOL}${INSTANCE_TEST.DNS_API}`;

export default ENVIROMENT;
