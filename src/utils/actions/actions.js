import { API_CONSTANTS, HEADER } from "../constants/apiConstants";
import RequesterAxios from "../requester/requester";
import isNil from "lodash/isNil";
import {
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
} from "./catalogActions";

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

const callPostPaymentService = (data) => async (dispatch, getState) => {
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.PAYMENT_SERVICE,
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

const callPostPaymentServiceCard = (data) => async (dispatch, getState) => {
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.PAYMENT_SERVICE_CARD,
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

const callGetAllRequestRecoveryPass = (data) => async (dispatch, getState) => {
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.REQUEST_RECOVERY_PASS,
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

const callGetAllVerifyCodeRecoveryPass =
  (data) => async (dispatch, getState) => {
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.post(
        API_CONSTANTS.VERIFY_CODE_RECOVERY_PASS,
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

const callPutRecoveryPass = (data, id) => async (dispatch, getState) => {
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.put(
      API_CONSTANTS.RECOVERY_PASS + id,
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

const callSetImageProfile =
  (file, data, id, callback) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileProperties", JSON.stringify(data));
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.put(
        API_CONSTANTS.SET_IMAGE_PROFILE + id,
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

const callSetThemeProfile = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.put(
      API_CONSTANTS.SET_THEME_PROFILE + id,
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

const callUpdateInvitation = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.put(
      API_CONSTANTS.UPDATE_INVITATION + id,
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

const callGetAllCustomerTenantDashboardById =
  (data) => async (dispatch, getState) => {
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

const callGetContractStats = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_CONTRACT_STATS,
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

const callGetAllProvidersCoincidences =
  (data) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.post(
        API_CONSTANTS.GET_ALL_PROVIDERS_COINCIDENCES,
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

const callGetAllRequestProvidersCoincidences =
  (data) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.post(
        API_CONSTANTS.GET_REQUEST_PROVIDER_COINCIDENCES,
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

const callGetAllIncidenceCoincidences =
  (data) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.post(
        API_CONSTANTS.GET_INCIDENCE_COINCIDENCES,
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

const callGetContractCoincidences = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_CONTRACT_COINCIDENCES,
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

const callGetContractChart = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_CONTRACT_CHART,
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

const callGetSearchProspect = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_SEARCH_CUSTOMER,
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

const callGetAddProspect = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_ADD_PROSPECT,
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

const callAddDocument =
  (file, data, callback) => async (dispatch, getState) => {
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

const callAddDocumentThumb =
  (file, data, callback) => async (dispatch, getState) => {
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
        API_CONSTANTS.ADD_DOCUMENT_THUMB,
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

const callBulkPotentialAgent = (file, data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  const formData = new FormData();
  formData.append("file", file[0]);
  formData.append("fileProperties", JSON.stringify(data));
  try {
    const config = {
      headers: { ...HEADER },
    };
    const response = await RequesterAxios.post(
      API_CONSTANTS.BULK_POTENTIAL_AGENT,
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

const callValidateTypeFormProperties = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.VALIDATE_TYPE_FORM_PROPERTIES,
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

const callGetTypeFormProperties = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_TYPEFORM_PROPERTIES,
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

const callGetTypeFormOwner = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_TYPEFORM_OWNER,
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

const callSetTypeFormOwner = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.SET_TYPEFORM_OWNER,
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

const callUpdateContract = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.put(
      API_CONSTANTS.SET_UPDATE_CONTRACT + id,
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

const callUpdateCustomerLoan = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.put(
      API_CONSTANTS.UPDATE_CUSTOMER_LOAN + id,
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

const callForgiveInterest = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.put(
      API_CONSTANTS.FORGIVE_INTEREST + id,
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

const callSetProvider = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.put(
      API_CONSTANTS.SET_PROVIDER + id,
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

const callUpdateRequestProvider = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.put(
      API_CONSTANTS.UPDATE_REQUEST_PROVIDER + id,
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

const callSignRequestForProvider = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.put(
      API_CONSTANTS.SIGN_REQUEST_FOR_PROVIDER + id,
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

const callUpdateIncidence = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.put(
      API_CONSTANTS.UPDATE_INCIDENCE + id,
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

const callSwitchCustomerContract = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.put(
      API_CONSTANTS.SET_SWITCH_CUSTOMER_CONTRACT + id,
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
      isNil(response.data.response) === false
        ? response.data.response
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

const callSetContract = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.put(
      API_CONSTANTS.SET_CONTRACT + id,
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

const callAddCommentContract = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.put(
      API_CONSTANTS.ADD_CONTRACT_COMMENT + id,
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
      isNil(response.data.response) === false
        ? response.data.response
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

const callUpdateNotifications = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.put(
      API_CONSTANTS.UPDATE_NOTIFICATIONS + id,
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
      isNil(response.data.response) === false
        ? response.data.response
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

const callAddDocumentContract = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.put(
      API_CONSTANTS.ADD_CONTRACT_DOCUMENT + id,
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
      isNil(response.data.response) === false
        ? response.data.response
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

const callAddDocumentContractId = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.put(
      API_CONSTANTS.ADD_CONTRACT_DOCUMENT_ID + id,
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
      isNil(response.data.response) === false
        ? response.data.response
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

const callGetContractDocument = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_CONTRACT_DOCUMENT,
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

const callGetNotifications = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_NOTIFICATIONS,
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

const callGetContractDocumentById = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_CONTRACT_DOCUMENT_BYID,
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

const callGetProviderById = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_PROVIDER_BY_ID,
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

const callGetIncidenceById = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_INCIDENCE_BY_ID,
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

const callGetRequestProviderById = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_REQUEST_PROVIDER_BY_ID,
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

const callGetRequestProviderPropierties =
  (data) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.post(
        API_CONSTANTS.GET_REQUEST_PROVIDER_PROPIERTIES_V2,
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

const callAddRequestProviderForTenant =
  (data) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.post(
        API_CONSTANTS.GET_REQUEST_PROVIDER_FOR_TENANT,
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

const callGetContract = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_CONTRACT,
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

const callGetContractComment = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_CONTRACT_COMMENT,
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

const callGetPropertyCoincidences = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_PROPERTY_COINCIDENCES,
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

const callGetAgentIndicators = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_AGENT_INDICATORS,
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

const callGetAgentContractCoincidences =
  (data) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.post(
        API_CONSTANTS.GET_AGENT_CONTRACT_COINCIDENCES,
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

const callGetAgentCommissionChart = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_AGENT_COMISSION_CHART,
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

const callGetRequestAdvancePymtPlan = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_REQUEST_ADVANCE_PYMT_PLAN,
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

const callGetRequestAdvancePymtProperties =
  (data) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.post(
        API_CONSTANTS.GET_REQUEST_ADVANCE_PYMT_PROPERTIES,
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

const callGetCustomerLoanProperties = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_CUSTOMER_LOAN_PROPERTIES,
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

const callGetTransactionsByUser = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_TRANSACTIONS_BY_USER,
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

const callGetDetailCustomer = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_DETAIL_CUSTOMER,
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

const callGetDetailCustomerTenant = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_DETAIL_CUSTOMER_TENANT,
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

const callGetDetailCustomerAgent = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_DETAIL_CUSTOMER_AGENT,
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

const callGetLandingProspectStats = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_LANDING_PROSPECT_STATS,
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

const callGetCustomerLoan = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_CUSTOMER_LOAN,
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

const callGetLandingProspectCoincidences =
  (data) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.post(
        API_CONSTANTS.GET_LANDING_PROSPECT_COINCIDENECES,
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

const callGetPotentialAgentCoincidences =
  (data) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.post(
        API_CONSTANTS.GET_POTENTIAL_AGENT_COINCIDENCES,
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

const callGetLandingProspectById = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_LANDING_PROSPECT_BY_ID,
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

const callGetCustomerAgentCoincidences =
  (data) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.post(
        API_CONSTANTS.GET_CUSTOMER_AGENT_COINCIDENCES,
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

const callGetLegalContractCoincidences =
  (data) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.post(
        API_CONSTANTS.GET_LEGAL_CONTRACT_COINCIDENCES,
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

const callGetRequestAdvancePymtCoincidences =
  (data) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.post(
        API_CONSTANTS.GET_REQUEST_ADVANCE_PYMT_COINCIDENCES,
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

const callGetRequestAdvancePymtById = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_REQUEST_ADVANCE_PYMT_BY_ID,
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

const callUpdateLandingProspectStatus =
  (data, id) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.put(
        API_CONSTANTS.UPDATE_LANDING_PROSPECT_STATUS + id,
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

const callUpdatePersonalReferences =
  (data, id) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.put(
        API_CONSTANTS.SET_PERSONAL_REFERENCE_FORM + id,
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

const callUpdateRequestAdvancePym =
  (data, id) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.put(
        API_CONSTANTS.UPDATE_REQUEST_ADVANCE_PYM + id,
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

const callUpdateProspectInvitation =
  (data, id) => async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    try {
      const config = { headers: { ...HEADER } };
      const response = await RequesterAxios.put(
        API_CONSTANTS.UPDATE_PROSPECT_INVITATION + id,
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

const callGetTransactions = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_TRANSACTIONS,
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

const callGetAuditReferences = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_AUDIT_REFERENCES,
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

const callUpdateMovingDialog = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.UPDATE_MOVING_DIALOG,
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

const callAddIncidence = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.ADD_INCIDENCE,
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

const callSetRequestExternalDS = (data, id) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.put(
      API_CONSTANTS.SET_REQUEST_EXTERNAL_DS + id,
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

const callGetRequestExternalDS = (data) => async (dispatch, getState) => {
  const state = getState();
  const { dataProfile } = state;
  try {
    const config = { headers: { ...HEADER } };
    const response = await RequesterAxios.post(
      API_CONSTANTS.GET_REQUEST_EXTERNAL_DS,
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

const getTimeZone = () => {
  var offset = new Date().getTimezoneOffset(),
    o = Math.abs(offset);
  return (
    (offset < 0 ? "+" : "-") +
    ("00" + Math.floor(o / 60)).slice(-2) +
    ":" +
    ("00" + (o % 60)).slice(-2)
  );
};

const callGlobalActionApi =
  (data, id, CONSTANT, method = "POST", token = true) =>
  async (dispatch, getState) => {
    const state = getState();
    const { dataProfile } = state;
    let response;
    if (token === true) {
      HEADER.Authorization = "Bearer " + dataProfile.dataProfile.token;
    }

    try {
      const config = { headers: { ...HEADER } };
      if (method === "POST") {
        response = await RequesterAxios.post(
          CONSTANT,
          { ...data, offset: getTimeZone() },
          config
        );
      } else if (method === "PUT") {
        response = await RequesterAxios.put(
          CONSTANT + id,
          { ...data, offset: getTimeZone() },
          config
        );
      } else {
        response = await RequesterAxios.post(
          CONSTANT,
          { ...data, offset: getTimeZone() },
          config
        );
      }
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
  callApiLogin,
  callGetAllCustomers,
  callGetAllPersons,
  callGetAllEndorsement,
  callGetInvitationUser,
  callGetAllRegisterUser,
  callGetAllRequestRecoveryPass,
  callGetAllVerifyCodeRecoveryPass,
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
  callGetTypeFormOwner,
  callGetTypeFormDocumentTenant,
  callAddTypeFormDocument,
  callSetTypeFormTenant,
  callSetTypeFormOwner,
  callGetAllCustomerTenantDashboardById,
  callSetTypeFormReferences,
  callGetMaritalStatus,
  callGetPropertyTypes,
  callGetPolicies,
  callPutRecoveryPass,
  callSetImageProfile,
  callGetNationalities,
  callGetIdTypes,
  callGetOccupations,
  callGetContractStats,
  callGetContractCoincidences,
  callGetContractChart,
  callGetSearchProspect,
  callGetAddProspect,
  callUpdateContract,
  callGetAllPolicyStatus,
  callGetDetailCustomer,
  callGetDetailCustomerTenant,
  callGetDetailCustomerAgent,
  callSwitchCustomerContract,
  callGetAgentIndicators,
  callGetAgentContractCoincidences,
  callSetContract,
  callAddCommentContract,
  callGetContract,
  callGetContractComment,
  callGetAgentCommissionChart,
  callAddDocumentContract,
  callGetContractDocument,
  callGetContractDocumentById,
  callAddDocumentContractId,
  callGetMaritalRegime,
  callGetAllCommercialSocietyTypes,
  callGetAllStates,
  callGetLandingProspectStats,
  callGetAllProspectStatus,
  callGetAllRelationshipTypes,
  callGetAllPersonalReferencesStatus,
  callGetLandingProspectCoincidences,
  callGetCustomerAgentCoincidences,
  callGetLegalContractCoincidences,
  callUpdateLandingProspectStatus,
  callUpdatePersonalReferences,
  callGetAuditReferences,
  callGetTypeFormProperties,
  callUpdateNotifications,
  callGetNotifications,
  callGetAllProvidersCoincidences,
  callGetAllCollaborators,
  callGetAllProviderTypes,
  callGetAllCollaboratorTypes,
  callGetAllProviders,
  callGetAllProviderPaymentForm,
  callSetProvider,
  callGetProviderById,
  callGetAllRequestProvidersCoincidences,
  callGetRequestProviderById,
  callGetAllRequestProviderStatus,
  callUpdateRequestProvider,
  callAddRequestProviderForTenant,
  callUpdateMovingDialog,
  callGetAllIncidenceTypes,
  callAddIncidence,
  callGetAllIncidenceCoincidences,
  callGetIncidenceById,
  callUpdateIncidence,
  callGetAllIncidenceStatus,
  callGetAllCustomerForIncidence,
  callGetAllIncidencePaymentsMethods,
  callGetPolicyPaymentMethod,
  callPostPaymentService,
  callPostPaymentServiceCard,
  callBulkPotentialAgent,
  callGetRequestProviderPropierties,
  callSignRequestForProvider,
  callGetPotentialAgentCoincidences,
  callGetAllRejectionReasons,
  callGetRequestAdvancePymtPlan,
  callGetAllCommercialActivities,
  callGetRequestAdvancePymtCoincidences,
  callGetRequestAdvancePymtById,
  callGetAllRequestAdvancePymtStatus,
  callUpdateRequestAdvancePym,
  callGetRequestAdvancePymtProperties,
  callGetCustomerLoan,
  callUpdateCustomerLoan,
  callGetCustomerLoanProperties,
  callUpdateInvitation,
  callGetPropertyCoincidences,
  callValidateTypeFormProperties,
  callUpdateProspectInvitation,
  callForgiveInterest,
  callGetTransactions,
  callSetThemeProfile,
  callGetAllInvPymtMethods,
  callSetRequestExternalDS,
  callGetRequestExternalDS,
  callGetTransactionsByUser,
  callGetLandingProspectById,
  callGlobalActionApi,
  callAddDocumentThumb,
};
