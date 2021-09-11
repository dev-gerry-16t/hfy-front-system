import { API_CONSTANTS, HEADER } from "../constants/apiConstants";
import RequesterAxios from "../requester/requester";
import isNil from "lodash/isNil";

const callGetAllCollaborators = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_ALL_COLLABORATORS,
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

const callGetAllCustomerForIncidence = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_ALL_CUSTOMER_FOR_INCIDENCE,
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

const callGetAllIncidencePaymentsMethods =
  (data) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.post(
        API_CONSTANTS.CATALOGS.GET_ALL_INCIDENCE_PAYMENTS_METHODS,
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
      if (
        isNil(responseResultStatus) === false &&
        responseResultStatus === 200
      ) {
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

const callGetAllIncidenceStatus = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_ALL_INCIDENCE_STATUS,
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

const callGetAllIncidenceTypes = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_ALL_INCIDENCE_TYPES,
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

const callGetAllRequestProviderStatus =
  (data) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.post(
        API_CONSTANTS.CATALOGS.GET_ALL_REQUEST_PROVIDER_STATUS,
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
      if (
        isNil(responseResultStatus) === false &&
        responseResultStatus === 200
      ) {
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

const callGetAllProviderTypes = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_ALL_PROVIDER_TYPES,
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

const callGetAllCollaboratorTypes = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_ALL_COLLABORATOR_TYPES,
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

const callGetAllProviders = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_ALL_PROVIDERS,
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

const callGetAllProviderPaymentForm = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_ALL_PROVIDER_PAYMENT_FORM,
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

const callGetAllRequestAdvancePymtStatus =
  (data) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.post(
        API_CONSTANTS.CATALOGS.GET_ALL_REQUEST_ADVANCE_PYMT_STATUS,
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
      if (
        isNil(responseResultStatus) === false &&
        responseResultStatus === 200
      ) {
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

const callGetAllInvPymtMethods = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_ALL_INV_PYMT_METHODS,
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

const callGetMaritalStatus = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_CATALOG_MARITAL_STATUS,
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

const callGetPolicyPaymentMethod = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_CATALOG_POLICY_PAYMENT_METHOD,
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

const callGetAllRejectionReasons = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_ALL_REJECTION_REASONS,
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

const callGetAllCommercialActivities = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_ALL_COMMERCIAL_ACTIVITIES,
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

const callGetUsersForAssignment = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_USERS_FOR_ASSIGNMENT,
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

const callGetMaritalRegime = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_CATALOG_MARITAL_REGIME,
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

const callGetPropertyTypes = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_CATALOG_PROPERTY_TYPES,
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

const callGetPolicies = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_CATALOG_POLICIES,
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

const callGetNationalities = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_CATALOG_NATIONALITIES,
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

const callGetIdTypes = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_CATALOG_ID_TYPES,
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

const callGetOccupations = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_CATALOG_OCCUPATIONS,
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

const callGetAllPolicyStatus = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_CATALOG_POLICY_STATUS,
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

const callGetAllCommercialSocietyTypes =
  (data) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.post(
        API_CONSTANTS.CATALOGS.GET_CATALOG_COMMERCIAL_SOCIETY_TYPES,
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
      if (
        isNil(responseResultStatus) === false &&
        responseResultStatus === 200
      ) {
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

const callGetAllStates = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_CATALOG_ALL_STATES,
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

const callGetAllProspectStatus = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_ALL_PROSPECT_STATUS,
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

const callGetAllRelationshipTypes = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.CATALOGS.GET_ALL_RELATIONSHIP_TYPES,
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

const callGetAllPersonalReferencesStatus =
  (data) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.post(
        API_CONSTANTS.CATALOGS.GET_ALL_PERSONAL_REFERENCE_STATUS,
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
      if (
        isNil(responseResultStatus) === false &&
        responseResultStatus === 200
      ) {
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
  callGetAllCollaborators,
  callGetAllCustomerForIncidence,
  callGetAllIncidencePaymentsMethods,
  callGetAllIncidenceStatus,
  callGetAllIncidenceTypes,
  callGetAllRequestProviderStatus,
  callGetAllProviderTypes,
  callGetAllCollaboratorTypes,
  callGetAllProviders,
  callGetAllProviderPaymentForm,
  callGetAllRequestAdvancePymtStatus,
  callGetAllInvPymtMethods,
  callGetMaritalStatus,
  callGetPolicyPaymentMethod,
  callGetAllRejectionReasons,
  callGetAllCommercialActivities,
  callGetMaritalRegime,
  callGetPropertyTypes,
  callGetPolicies,
  callGetNationalities,
  callGetIdTypes,
  callGetOccupations,
  callGetAllPolicyStatus,
  callGetAllCommercialSocietyTypes,
  callGetAllStates,
  callGetAllProspectStatus,
  callGetAllRelationshipTypes,
  callGetAllPersonalReferencesStatus,
  callGetUsersForAssignment,
};
