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

const callGetInvitationUser = (paramId) => async (dispatch, getState) => {
  try {
    const config = { headers: { ...HEADER } };
    const endPoint = `${API_CONSTANTS.GET_ALL_CUSTOMER_INVITATION}${paramId}`;
    const response = await RequesterAxios.get(endPoint, config);
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

const callGetAllUserProfile = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_USER_PROFILE,
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

const callGetAllMenuProfile = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_MENU_PROFILE,
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

const callGetAllCustomerById = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_ALL_CUSTOMER_BY_ID,
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

const callGetAllCustomerTenantById = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_ALL_CUSTOMER_TENANT_BY_ID,
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

const callGetAllCustomerTenantDashboardById = (data) => async (
  dispatch,
  getState
) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_ALL_CUSTOMER_TENANT_DASHBOARD_BY_ID,
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

const callGetAllCustomerCoincidences = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_ALL_CUSTOMER_TENANT_COINCIDENCES,
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

const callGetStatsChart = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_ALL_STATS_CHART,
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

const callGetZipCodeAdress = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_ZIP_CODE_ADRESS,
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

const callGetAllTenantsCatalog = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_ALL_TENANTS_CATALOG,
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

const callGetAllBankCatalog = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_ALL_BANKS_CATALOG,
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

const callAddProperty = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CUSTOMER_ADD_PROPERTY,
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

const callGetProperties = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_ALL_PROPERTIES,
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

const callGetDepartments = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_ALL_DEPARTMENTS,
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

const callGetPaymentTypes = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_ALL_PYMENT_TYPES,
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

const callGetAllDocumentTypes = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_ALL_DOCUMENT_TYPES,
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

const callGetPaymentContractDocument = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_PAYMENT_IN_CONTRACT_DOCUMENT,
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

const callGetPaymentContract = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_ALL_PYMENT_CONTRACT,
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

const callAddTenant = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.SEND_TENANT_INVITATION,
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

const callAddCustomerMessage = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.ADD_CUSTOMER_MESSAGE,
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

const callGetCustomerMessage = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_CUSTOMER_MESSAGE,
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

const callRequestAdvancement = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.REQUEST_ADVANCEMENT_RENTS,
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

const callAddDocument = (file, data, callback) => async (
  dispatch,
  getState
) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileProperties", JSON.stringify(data));
  try {
    const config = {
      headers: { ...HEADER },
      onUploadProgress: (progressEvent) => {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        callback(percentCompleted);
      },
    };
    const response = await RequesterAxios.post(
      API_CONSTANTS.ADD_DOCUMENT,
      formData,
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

const callGetTypeFormTenant = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_TYPEFORM_TENANT,
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

const callGetTypeFormDocumentTenant = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_TYPEFORM_DOCUMENT_TENANT,
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

const callSetTypeFormTenant = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.SET_TYPEFORM_DOCUMENT_TENANT,
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

const callSetTypeFormReferences = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.SET_TYPEFORM_REFERENCES,
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

const callAddTypeFormDocument = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.put(
      API_CONSTANTS.PUT_ADD_TYPEFORM_DOCUMENT + id,
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
  callGetInvitationUser,
  callGetAllRegisterUser,
  callGetAllVerifyCode,
  callGetAllUserProfile,
  callGetAllMenuProfile,
  callGetAllCustomerById,
  callGetAllCustomerCoincidences,
  callGetStatsChart,
  callAddProperty,
  callGetProperties,
  callGetDepartments,
  callAddTenant,
  callGetZipCodeAdress,
  callGetAllTenantsCatalog,
  callGetAllBankCatalog,
  callRequestAdvancement,
  callGetAllCustomerTenantById,
  callGetPaymentTypes,
  callGetPaymentContract,
  callAddDocument,
  callGetAllDocumentTypes,
  callGetPaymentContractDocument,
  callAddCustomerMessage,
  callGetCustomerMessage,
  callGetTypeFormTenant,
  callGetTypeFormDocumentTenant,
  callAddTypeFormDocument,
  callSetTypeFormTenant,
  callGetAllCustomerTenantDashboardById,
  callSetTypeFormReferences,
};
