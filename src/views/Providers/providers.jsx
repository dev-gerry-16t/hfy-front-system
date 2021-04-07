import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, Table, Tag, Menu, Dropdown, Button, message } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import {
  callGetAllProvidersCoincidences,
  callGetAllCollaborators,
  callGetAllProviderTypes,
  callGetAllCollaboratorTypes,
  callGetAllProviderPaymentForm,
  callGetPolicies,
  callSetProvider,
  callGetProviderById,
} from "../../utils/actions/actions";
import SectionAddProvider from "./sections/sectionAddProvider";
import SectionDetailProvider from "./sections/sectionDetailProvider";

const { Content } = Layout;

const Providers = (props) => {
  const {
    callGetAllProvidersCoincidences,
    callGetAllCollaborators,
    callGetAllProviderTypes,
    callGetAllCollaboratorTypes,
    callGetAllProviderPaymentForm,
    callSetProvider,
    callGetPolicies,
    callGetProviderById,
    dataProfile,
  } = props;
  const [dataCoincidences, setDataCoincidences] = useState([]);
  const [expandedRowKey, setExpandedRowKey] = useState([]);
  const [dataProviderType, setDataProviderType] = useState([]);
  const [dataProviderById, setDataProviderById] = useState({});
  const [dataPaymentForm, setDataPaymentForm] = useState([]);
  const [dataCollaboratorType, setDataCollaboratorType] = useState([]);
  const [dataPolicies, setDataPolicies] = useState([]);
  const [
    dataCoincidencesCollaborator,
    setDataCoincidencesCollaborator,
  ] = useState([]);
  const [openAddProvider, setOpenAddProvider] = useState(false);
  const [openDetailProvider, setOpenDetailProvider] = useState(false);

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
      const response = await callGetProviderById({
        idSystemUser,
        idLoginHistory,
        idProvider: id,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataProviderById(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllProvidersCoincidences = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllProvidersCoincidences({
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

  const handlerCallGetAllCollaborators = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllCollaborators({
        idSystemUser,
        idLoginHistory,
        idProvider: data.idProvider,
        idCollaboratorType: null,
        type: 1,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataCoincidencesCollaborator(responseResult);
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
        type: 1,
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

  const handlerCallGetPolicies = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetPolicies({
        idCustomer: null,
        idSystemUser,
        idLoginHistory,
        type: 4,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      setDataPolicies(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallSetProvider = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callSetProvider(
        {
          ...data,
          idSystemUser,
          idLoginHistory,
        },
        data.idProvider
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

  useEffect(() => {
    handlerCallGetAllProvidersCoincidences();
    handlerCallGetAllProviderTypes();
    handlerCallGetAllProviderPaymentForm();
    handlerCallGetPolicies();
  }, []);

  const columnsCollaborator = [
    {
      title: "Colaborador",
      dataIndex: "collaboratorType",
      key: "collaboratorType",
    },
    { title: "Nombre", dataIndex: "fullName", key: "fullName" },
    { title: "Teléfono", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Correo", dataIndex: "emailAddress", key: "emailAddress" },
  ];

  const columns = [
    {
      title: "Tipo de proveedor",
      dataIndex: "providerType",
      key: "providerType",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <a
            onClick={() => {
              handlerCallGetProviderById(record.idProvider);
              handlerCallGetAllCollaboratorTypes(record.idProvider);
              setOpenDetailProvider(!openDetailProvider);
            }}
            style={{ marginRight: "5px" }}
          >
            {text}
          </a>
        </div>
      ),
    },
    {
      title: "Proveedor",
      dataIndex: "provider",
      key: "provider",
      width: 300,
    },
    {
      title: "Teléfono",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Correo",
      dataIndex: "emailAddress",
      key: "emailAddress",
    },
    {
      title: "Forma de pago",
      dataIndex: "providerPaymentForm",
      key: "providerPaymentForm",
    },
    {
      title: "RFC",
      dataIndex: "taxId",
      key: "taxId",
    },
    {
      title: "Último servicio programado",
      dataIndex: "lastAssignment",
      key: "lastAssignment",
    },
  ];

  return (
    <Content>
      <SectionDetailProvider
        isModalVisible={openDetailProvider}
        dataProviderById={dataProviderById}
        onSelectProvider={(id) => {
          handlerCallGetAllCollaboratorTypes(id);
        }}
        onSaveProvider={async (data) => {
          try {
            await handlerCallSetProvider(data);
            handlerCallGetAllProvidersCoincidences();
          } catch (error) {
            throw error;
          }
        }}
        dataPolicies={dataPolicies}
        dataProviderType={dataProviderType}
        dataPaymentForm={dataPaymentForm}
        dataCollaboratorType={dataCollaboratorType}
        onClose={() => {
          setOpenDetailProvider(!openDetailProvider);
        }}
      />
      <SectionAddProvider
        isModalVisible={openAddProvider}
        onSelectProvider={(id) => {
          handlerCallGetAllCollaboratorTypes(id);
        }}
        onSaveProvider={async (data) => {
          try {
            await handlerCallSetProvider(data);
            handlerCallGetAllProvidersCoincidences();
          } catch (error) {
            throw error;
          }
        }}
        dataPolicies={dataPolicies}
        dataProviderType={dataProviderType}
        dataPaymentForm={dataPaymentForm}
        dataCollaboratorType={dataCollaboratorType}
        onClose={() => {
          setOpenAddProvider(!openAddProvider);
        }}
      />
      <div className="margin-app-main">
        <div className="main-information-user-admin">
          <div className="renter-card-information total-width">
            <div className="title-cards flex-title-card">
              <span>Proveedores</span>
              <div className="button_init_primary">
                <button
                  type="button"
                  onClick={() => {
                    setOpenAddProvider(true);
                  }}
                >
                  <span>Agregar</span>
                </button>
              </div>
            </div>
            <div className="section-information-renters">
              <Table
                columns={columns}
                dataSource={dataCoincidences}
                className="table-users-hfy"
                size="small"
                bordered
                expandable={{
                  expandedRowRender: () => {
                    return (
                      <Table
                        columns={columnsCollaborator}
                        dataSource={dataCoincidencesCollaborator}
                        pagination={false}
                      />
                    );
                  },
                }}
                scroll={{ x: 1500 }}
                expandedRowKeys={expandedRowKey}
                onExpand={(expanded, row) => {
                  const keys = [];
                  if (expanded === true) {
                    keys.push(row.key);
                    handlerCallGetAllCollaborators({ ...row });
                  }
                  setExpandedRowKey(keys);
                }}
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
  callGetAllProviderTypes: (data) => dispatch(callGetAllProviderTypes(data)),
  callGetAllCollaboratorTypes: (data) =>
    dispatch(callGetAllCollaboratorTypes(data)),
  callGetAllProviderPaymentForm: (data) =>
    dispatch(callGetAllProviderPaymentForm(data)),
  callGetAllCollaborators: (data) => dispatch(callGetAllCollaborators(data)),
  callGetAllProvidersCoincidences: (data) =>
    dispatch(callGetAllProvidersCoincidences(data)),
  callGetProviderById: (data) => dispatch(callGetProviderById(data)),
  callSetProvider: (data, id) => dispatch(callSetProvider(data, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Providers);
