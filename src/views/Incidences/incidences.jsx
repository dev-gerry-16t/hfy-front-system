import React, { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { connect } from "react-redux";
import { Layout, Table, message, Tag } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import {
  callGetAllIncidenceTypes,
  callAddIncidence,
  callGetAllIncidenceCoincidences,
  callGetIncidenceById,
  callUpdateIncidence,
  callGetAllIncidenceStatus,
  callGetAllCustomerForIncidence,
  callGetAllRequestProviderStatus,
  callGetAllIncidencePaymentsMethods,
  callGetAllProviders,
  callGetAllProviderTypes,
} from "../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import SectionDetailIncidence from "./sections/sectionDetailIncidence";

const { Content } = Layout;

const Incidences = (props) => {
  const {
    dataProfile,
    callGetAllIncidenceCoincidences,
    callGetIncidenceById,
    callGetAllIncidenceTypes,
    callGetAllIncidenceStatus,
    callGetAllCustomerForIncidence,
    callGetAllRequestProviderStatus,
    callGetAllIncidencePaymentsMethods,
    callGetAllProviders,
    callGetAllProviderTypes,
    callUpdateIncidence,
  } = props;

  const [dataProviders, setDataProviders] = useState([]);
  const [dataProviderType, setDataProviderType] = useState([]);
  const [dataIncideCoincidence, setDataIncideCoincidence] = useState([]);
  const [isVisibleDetailIncidence, setIsVisibleDetailIncidence] = useState(
    false
  );
  const [dataIncidenceDetail, setDataIncidenceDetail] = useState({});
  const [dataIncidenceTypes, setDataIncidenceTypes] = useState([]);
  const [dataIncidenceStatus, setDataIncidenceStatus] = useState([]);
  const [dataCustomerForIncidence, setDataCustomerForIncidence] = useState([]);
  const [dataRequestStatus, setDataRequestStatus] = useState([]);
  const [
    dataIncidencePaymentMethods,
    setDataIncidencePaymentMethods,
  ] = useState([]);

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

  const handlerCallGetAllProviders = async (id, id2) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllProviders({
        idContract: id2,
        idSystemUser,
        idLoginHistory,
        idProviderType: id,
        type: 2,
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

  const handlerCallGetAllProviderTypes = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllProviderTypes({
        idSystemUser,
        idLoginHistory,
        type: 2,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataProviderType(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllCustomerForIncidence = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllCustomerForIncidence({
        idIncidence: id,
        idSystemUser,
        idLoginHistory,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      setDataCustomerForIncidence(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllIncidencePaymentsMethods = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllIncidencePaymentsMethods({
        idIncidence: id,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      setDataIncidencePaymentMethods(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllIncidenceStatus = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllIncidenceStatus({
        idContract: null,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      setDataIncidenceStatus(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllIncidenceTypes = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllIncidenceTypes({
        idContract: null,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      setDataIncidenceTypes(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetIncidenceById = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetIncidenceById({
        idSystemUser,
        idLoginHistory,
        idIncidence: id,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : {};
      setDataIncidenceDetail(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallGetAllIncidenceCoincidences = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllIncidenceCoincidences({
        idContract: null,
        idSystemUser,
        idLoginHistory,
        topIndex: null,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataIncideCoincidence(responseResult);
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
        type: 2,
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

  const handlerCallUpdateIncidence = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callUpdateIncidence(
        {
          ...data,
          idSystemUser,
          idLoginHistory,
        },
        id
      );
      showMessageStatusApi(
        "Se envío correctamente tu comentario",
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

  const columns = [
    {
      title: "Contrato",
      dataIndex: "hfInvoice",
      key: "hfInvoice",
    },
    {
      title: "Reportada por",
      dataIndex: "requestedBy",
      key: "requestedBy",
      width: 300,
    },
    {
      title: "Fecha de reporte",
      dataIndex: "createdAtFormat",
      key: "createdAtFormat",
    },
    {
      title: "Tipo de incidencia",
      dataIndex: "incidenceType",
      key: "incidenceType",
    },
    {
      title: "Última actualización",
      dataIndex: "lastUpdatedAtFormat",
      key: "lastUpdatedAtFormat",
    },
    {
      title: "Estatus",
      dataIndex: "incidenceStatus",
      key: "incidenceStatus",
      render: (text, record) => (
        <div>
          <Tag color={record.incidenceStatusStyle} key={record.idIncidence}>
            {text}
          </Tag>
        </div>
      ),
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
            cursor: "pointer",
          }}
          onClick={async () => {
            await handlerCallGetAllCustomerForIncidence(record.idIncidence);
            await handlerCallGetAllIncidencePaymentsMethods(record.idIncidence);
            await handlerCallGetIncidenceById(record.idIncidence);
            setIsVisibleDetailIncidence(true);
          }}
        >
          <EyeTwoTone />
        </div>
      ),
    },
  ];

  useEffect(() => {
    handlerCallGetAllIncidenceCoincidences();
    handlerCallGetAllIncidenceTypes();
    handlerCallGetAllIncidenceStatus();
    handlerCallGetAllRequestProviderStatus();
    handlerCallGetAllProviderTypes();
  }, []);

  return (
    <Content>
      <SectionDetailIncidence
        isModalVisible={isVisibleDetailIncidence}
        onClose={() => {
          setIsVisibleDetailIncidence(!isVisibleDetailIncidence);
          handlerCallGetAllIncidenceCoincidences();
        }}
        dataIncidenceTypes={dataIncidenceTypes}
        dataIncidenceId={
          isEmpty(dataIncidenceDetail) === false
            ? dataIncidenceDetail.result1
            : {}
        }
        dataMessages={
          isEmpty(dataIncidenceDetail) === false
            ? dataIncidenceDetail.result2
            : {}
        }
        dataDocuments={
          isEmpty(dataIncidenceDetail) === false
            ? dataIncidenceDetail.result3
            : {}
        }
        dataIncidenceStatus={dataIncidenceStatus}
        dataCustomerForIncidence={dataCustomerForIncidence}
        dataRequestStatus={dataRequestStatus}
        dataIncidencePaymentMethods={dataIncidencePaymentMethods}
        dataProviders={dataProviders}
        dataProviderType={dataProviderType}
        onGetAllProvider={(id, idContract) => {
          handlerCallGetAllProviders(id, idContract);
        }}
        onSendInformationIncidence={async (data, id) => {
          try {
            await handlerCallUpdateIncidence(data, id);
            handlerCallGetIncidenceById(id);
          } catch (error) {
            throw error;
          }
        }}
        onSendAnnotations={async (data, id) => {
          try {
            await handlerCallUpdateIncidence(data, id);
            handlerCallGetIncidenceById(id);
          } catch (error) {
            throw error;
          }
        }}
      />
      <div className="margin-app-main">
        <div className="main-information-user-admin">
          <div className="renter-card-information total-width">
            <div className="title-cards flex-title-card">
              <span>Incidencias reportadas</span>
            </div>
            <div className="section-information-renters">
              <Table
                columns={columns}
                dataSource={dataIncideCoincidence}
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
  callGetAllIncidenceCoincidences: (data) =>
    dispatch(callGetAllIncidenceCoincidences(data)),
  callGetIncidenceById: (data) => dispatch(callGetIncidenceById(data)),
  callGetAllIncidenceTypes: (data) => dispatch(callGetAllIncidenceTypes(data)),
  callGetAllIncidenceStatus: (data) =>
    dispatch(callGetAllIncidenceStatus(data)),
  callGetAllCustomerForIncidence: (data) =>
    dispatch(callGetAllCustomerForIncidence(data)),
  callGetAllRequestProviderStatus: (data) =>
    dispatch(callGetAllRequestProviderStatus(data)),
  callGetAllIncidencePaymentsMethods: (data) =>
    dispatch(callGetAllIncidencePaymentsMethods(data)),
  callGetAllProviders: (data) => dispatch(callGetAllProviders(data)),
  callGetAllProviderTypes: (data) => dispatch(callGetAllProviderTypes(data)),
  callUpdateIncidence: (data, id) => dispatch(callUpdateIncidence(data, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Incidences);
