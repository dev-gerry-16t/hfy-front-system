import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, Table, message } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import ENVIROMENT from "../../utils/constants/enviroments";
import {
  callGetAllRequestProvidersCoincidences,
  callGetAllCollaborators,
  callGetAllRequestProviderStatus,
  callGetAllCollaboratorTypes,
  callGetAllProviderPaymentForm,
  callGetPolicies,
  callUpdateRequestProvider,
  callGetAllProviders,
  callGetRequestProviderById,
} from "../../utils/actions/actions";
import SectionDetailRequest from "./sections/sectionDetailRequest";

const { Content } = Layout;

const RequestServices = (props) => {
  const {
    callGetAllRequestProvidersCoincidences,
    callGetAllCollaborators,
    callGetAllRequestProviderStatus,
    callGetAllCollaboratorTypes,
    callGetAllProviderPaymentForm,
    callUpdateRequestProvider,
    callGetPolicies,
    callGetRequestProviderById,
    callGetAllProviders,
    dataProfile,
  } = props;
  const [dataCoincidences, setDataCoincidences] = useState([]);
  const [dataRequestStatus, setDataRequestStatus] = useState([]);
  const [dataProviderById, setDataProviderById] = useState({});
  const [dataPaymentForm, setDataPaymentForm] = useState([]);
  const [dataProviders, setDataProviders] = useState([]);
  const [dataCollaboratorType, setDataCollaboratorType] = useState([]);
  const [dataPolicies, setDataPolicies] = useState([]);
  const [dataCollaborator, setDataCollaborator] = useState([]);
  const [openAddProvider, setOpenAddProvider] = useState(false);
  const [openDetailRequest, setOpenDetailRequest] = useState(false);

  const showMessageStatusApi = (text, status) => {
    switch (status) {
      case "SUCCESS":
        message.success(text);
        break;
      case "ERROR":
        message.error(text);
        break;
      case "WARNING":
        message.warning(text);
        break;
      default:
        break;
    }
  };

  const handlerCallGetProviderById = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetRequestProviderById({
        idSystemUser,
        idLoginHistory,
        idRequestForProvider: id,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : {};
      setDataProviderById(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllRequestProvidersCoincidences = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllRequestProvidersCoincidences({
        idSystemUser,
        idLoginHistory,
        topIndex: 0,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataCoincidences(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllCollaborators = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllCollaborators({
        idSystemUser,
        idLoginHistory,
        idProvider: id,
        idCollaboratorType: null,
        type: 1,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataCollaborator(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllRequestProviderStatus = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllRequestProviderStatus({
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataRequestStatus(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllProviderPaymentForm = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllProviderPaymentForm({
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataPaymentForm(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllCollaboratorTypes = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllCollaboratorTypes({
        idProvider: id,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataCollaboratorType(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllProviders = async (id, idProvider) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllProviders({
        idContract: id,
        idSystemUser,
        idLoginHistory,
        idRequestForProvider: idProvider,
        type: 1,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      setDataProviders(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallUpdateRequestProvider = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callUpdateRequestProvider(
        {
          ...data,
          idSystemUser,
          idLoginHistory,
        },
        id
      );
      showMessageStatusApi(
        "Tu solicitud se procesó exitosamente",
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      showMessageStatusApi(
        isNil(error) === false
          ? error
          : "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallGetRequestProviderPropierties = async (data, name) => {
    const { idSystemUser, idLoginHistory, token } = dataProfile;
    try {
      const responseDownload = await fetch(
        `${ENVIROMENT}${API_CONSTANTS.GET_REQUEST_PROVIDER_PROPIERTIES}`,
        {
          method: "POST",
          body: JSON.stringify({
            ...data,
            idSystemUser,
            idLoginHistory,
          }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (
        isNil(responseDownload.status) === false &&
        responseDownload.status !== 200
      ) {
        throw isNil(responseDownload.statusText) === false
          ? responseDownload.statusText
          : "";
      }
      const blob = await responseDownload.blob();
      const link = document.createElement("a");
      link.className = "download";
      link.download = `${name}.docx`;
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      link.parentElement.removeChild(link);
    } catch (error) {
      showMessageStatusApi(
        "No está disponible el documento",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  useEffect(() => {
    handlerCallGetAllRequestProvidersCoincidences();
    handlerCallGetAllProviderPaymentForm();
    handlerCallGetAllRequestProviderStatus();
  }, []);

  const columns = [
    {
      title: "Folio de incidencia",
      dataIndex: "incidenceInvoice",
      key: "incidenceInvoice",
    },
    {
      title: "Contrato",
      dataIndex: "hfInvoice",
      key: "hfInvoice",
    },
    {
      title: "Tipo de proveedor",
      dataIndex: "provider",
      key: "provider",
      width: 300,
    },

    {
      title: "Fecha de Solicitud",
      dataIndex: "requestedAt",
      key: "requestedAt",
    },
    {
      title: "Estatus",
      dataIndex: "requestForProviderStatus",
      key: "requestForProviderStatus",
    },
    {
      title: "Detalle",
      dataIndex: "canEdit",
      key: "canEdit",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: text === true ? "pointer" : "none",
          }}
          onClick={() => {
            if (text === true) {
              handlerCallGetProviderById(record.idRequestForProvider);
              handlerCallGetAllProviders(
                record.idContract,
                record.idRequestForProvider
              );
              handlerCallGetAllCollaborators(record.idProvider);
              setOpenDetailRequest(!openDetailRequest);
            }
          }}
        >
          {text === true ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
        </div>
      ),
    },
  ];

  return (
    <Content>
      <SectionDetailRequest
        isModalVisible={openDetailRequest}
        dataProviders={dataProviders}
        dataProviderById={dataProviderById}
        dataCollaborator={dataCollaborator}
        dataRequestStatus={dataRequestStatus}
        onSaveRequestProvider={async (data, id) => {
          try {
            await handlerCallUpdateRequestProvider(data, id);
            handlerCallGetAllRequestProvidersCoincidences();
          } catch (error) {
            throw error;
          }
        }}
        onDownloadDocument={async (data) => {
          try {
            await handlerCallGetRequestProviderPropierties(
              data,
              "Contrato_de_servicio"
            );
            await handlerCallGetProviderById(data.idRequestForProvider);
          } catch (error) {
            throw error;
          }
        }}
        onClose={() => {
          setOpenDetailRequest(false);
        }}
      />
      <div className="margin-app-main">
        <div className="main-information-user-admin">
          <div className="renter-card-information total-width">
            <div className="title-cards flex-title-card">
              <span>Solicitudes</span>
            </div>
            <div className="section-information-renters">
              <Table
                columns={columns}
                dataSource={dataCoincidences}
                className="table-users-hfy"
                size="small"
                bordered
              />
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGetPolicies: (data) => dispatch(callGetPolicies(data)),
  callGetAllProviders: (data) => dispatch(callGetAllProviders(data)),
  callGetAllRequestProviderStatus: (data) =>
    dispatch(callGetAllRequestProviderStatus(data)),
  callGetAllCollaboratorTypes: (data) =>
    dispatch(callGetAllCollaboratorTypes(data)),
  callGetAllProviderPaymentForm: (data) =>
    dispatch(callGetAllProviderPaymentForm(data)),
  callGetAllCollaborators: (data) => dispatch(callGetAllCollaborators(data)),
  callGetAllRequestProvidersCoincidences: (data) =>
    dispatch(callGetAllRequestProvidersCoincidences(data)),
  callGetRequestProviderById: (data) =>
    dispatch(callGetRequestProviderById(data)),
  callUpdateRequestProvider: (data, id) =>
    dispatch(callUpdateRequestProvider(data, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestServices);
