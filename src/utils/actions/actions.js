import { API_CONSTANTS, HEADER } from "../constants/apiConstants";
import RequesterAxios from "../requester/requester";

const callApiLogin = async (data) => {
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.LOGIN,
      data,
      config
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export { callApiLogin };
