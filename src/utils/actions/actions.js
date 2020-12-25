import { API_CONSTANTS, HEADER } from "../constants/apiConstants";
import RequesterAxios from "../requester/requester";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";

const callApiLogin = (data) => async (dispatch, getState) => {
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.LOGIN,
      data,
      config
    );
    const responseResultStatus =
      isNil(response) === false && isNil(response.status) === false
        ? response.status
        : null;
    const responseResultMessage =
      isNil(response) === false &&
      isNil(response.data) === false &&
      isNil(response.data.response) === false &&
      isNil(response.data.response.message) === false
        ? response.data.response.message
        : null;
    const responseResultData =
      isNil(response) === false && isNil(response.data) === false
        ? response.data
        : null;
    if (isNil(responseResultStatus) === false && responseResultStatus === 200) {
      return responseResultData;
    } else {
      throw isNil(responseResultMessage) === false
        ? responseResultMessage
        : null;
    }
  } catch (error) {
    throw error;
  }
};

const callGetAllCustomers = (data) => async (dispatch, getState) => {
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_ALL_CUSTOMER_TYPES,
      data,
      config
    );
    const responseResultStatus =
      isNil(response) === false && isNil(response.status) === false
        ? response.status
        : null;
    const responseResultMessage =
      isNil(response) === false &&
      isNil(response.data) === false &&
      isNil(response.data.response) === false &&
      isNil(response.data.response.message) === false
        ? response.data.response.message
        : null;
    const responseResultData =
      isNil(response) === false && isNil(response.data) === false
        ? response.data
        : null;
    if (isNil(responseResultStatus) === false && responseResultStatus === 200) {
      return responseResultData;
    } else {
      throw isNil(responseResultMessage) === false
        ? responseResultMessage
        : null;
    }
  } catch (error) {
    throw error;
  }
};

const callGetAllPersons = (data) => async (dispatch, getState) => {
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_ALL_PERSON_TYPES,
      data,
      config
    );
    const responseResultStatus =
      isNil(response) === false && isNil(response.status) === false
        ? response.status
        : null;
    const responseResultMessage =
      isNil(response) === false &&
      isNil(response.data) === false &&
      isNil(response.data.response) === false &&
      isNil(response.data.response.message) === false
        ? response.data.response.message
        : null;
    const responseResultData =
      isNil(response) === false && isNil(response.data) === false
        ? response.data
        : null;
    if (isNil(responseResultStatus) === false && responseResultStatus === 200) {
      return responseResultData;
    } else {
      throw isNil(responseResultMessage) === false
        ? responseResultMessage
        : null;
    }
  } catch (error) {
    throw error;
  }
};

const callGetAllEndorsement = (data) => async (dispatch, getState) => {
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_ALL_ENDORSEMENT,
      data,
      config
    );
    const responseResultStatus =
      isNil(response) === false && isNil(response.status) === false
        ? response.status
        : null;
    const responseResultMessage =
      isNil(response) === false &&
      isNil(response.data) === false &&
      isNil(response.data.response) === false &&
      isNil(response.data.response.message) === false
        ? response.data.response.message
        : null;
    const responseResultData =
      isNil(response) === false && isNil(response.data) === false
        ? response.data
        : null;
    if (isNil(responseResultStatus) === false && responseResultStatus === 200) {
      return responseResultData;
    } else {
      throw isNil(responseResultMessage) === false
        ? responseResultMessage
        : null;
    }
  } catch (error) {
    throw error;
  }
};

const callGetAllRegisterUser = (data) => async (dispatch, getState) => {
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.REGISTER,
      data,
      config
    );
    const responseResultStatus =
      isNil(response) === false && isNil(response.status) === false
        ? response.status
        : null;
    const responseResultMessage =
      isNil(response) === false &&
      isNil(response.data) === false &&
      isNil(response.data.response) === false &&
      isNil(response.data.response.message) === false
        ? response.data.response.message
        : null;
    const responseResultData =
      isNil(response) === false && isNil(response.data) === false
        ? response.data
        : null;
    if (isNil(responseResultStatus) === false && responseResultStatus === 200) {
      return responseResultData;
    } else {
      throw isNil(responseResultMessage) === false
        ? responseResultMessage
        : null;
    }
  } catch (error) {
    throw error;
  }
};

const callGetAllVerifyCode = (data) => async (dispatch, getState) => {
  try {
    const config = { headers: { ...HEADER } };
    // data = {
    //   ...data,
    //   idRequestSignUp: "8A7198C9-AE07-4ADD-AF34-60E84758296D",
    //   code: "123435",
    //   offset: "-06:00",
    // };
    const response = await RequesterAxios.post(
      API_CONSTANTS.VERIFY_CODE_REGISTER,
      data,
      config
    );
    const responseResultStatus =
      isNil(response) === false && isNil(response.status) === false
        ? response.status
        : null;
    const responseResultMessage =
      isNil(response) === false &&
      isNil(response.data) === false &&
      isNil(response.data.response) === false &&
      isNil(response.data.response.message) === false
        ? response.data.response.message
        : null;
    const responseResultData =
      isNil(response) === false && isNil(response.data) === false
        ? response.data
        : null;
    if (isNil(responseResultStatus) === false && responseResultStatus === 200) {
      return responseResultData;
    } else {
      throw isNil(responseResultMessage) === false
        ? responseResultMessage
        : null;
    }
  } catch (error) {
    throw error;
  }
};

export {
  callApiLogin,
  callGetAllCustomers,
  callGetAllPersons,
  callGetAllEndorsement,
  callGetAllRegisterUser,
  callGetAllVerifyCode,
};
