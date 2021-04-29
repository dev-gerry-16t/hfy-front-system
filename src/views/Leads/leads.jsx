import React, { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { connect } from "react-redux";
import { Layout, Table, Tag, Menu, Dropdown, Button, message } from "antd";
import Tickets from "../../assets/icons/tickets.svg";
import Calling from "../../assets/icons/Calling.svg";
import CallMissed from "../../assets/icons/CallMissed.svg";
import Register from "../../assets/icons/Register.svg";
import UserAccept from "../../assets/icons/UserAccept.svg";
import IconDanger from "../../assets/icons/Danger.svg";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import {
  callGetLandingProspectStats,
  callGetLandingProspectCoincidences,
  callGetAllProspectStatus,
  callUpdateLandingProspectStatus,
  callBulkPotentialAgent,
  callGetPotentialAgentCoincidences,
} from "../../utils/actions/actions";

const { Content } = Layout;

const LeadsLandingPage = (props) => {
  const {
    dataProfile,
    callGetLandingProspectStats,
    callGetLandingProspectCoincidences,
    callGetAllProspectStatus,
    callUpdateLandingProspectStatus,
    callBulkPotentialAgent,
    callGetPotentialAgentCoincidences,
  } = props;
  const [dataCoincidences, setDataCoincidences] = useState([]);
  const [dataCoincidencesAdvisor, setDataCoincidencesAdvisor] = useState([]);
  const [dataStats, setDataStats] = useState({});
  const [dataProspectStatus, setDataProspectStatus] = useState([]);

  const arrayIconst = {
    Tickets,
    Calling,
    CallMissed,
    Register,
    UserAccept,
    IconDanger,
  };

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

  const handlerCallBulkPotentialAgent = async (file) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    const dataDocument = {
      idSystemUser,
      idLoginHistory,
    };
    try {
      const response = await callBulkPotentialAgent(file, dataDocument);
      showMessageStatusApi(
        "Documento subido exitosamente",
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      showMessageStatusApi(
        "No se logro subir el archivo, intenta nuevamente o mas tarde",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallGetPotentialAgentCoincidences = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetPotentialAgentCoincidences({
        idSystemUser,
        idLoginHistory,
        topIndex: 0,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataCoincidencesAdvisor(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetLandingProspectCoincidences = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetLandingProspectCoincidences({
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

  const handlerCallGetLandingProspectStats = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetLandingProspectStats({
        idSystemUser,
        idLoginHistory,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : {};
      setDataStats(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllProspectStatus = async (id = null) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllProspectStatus({
        idSystemUser,
        idLoginHistory,
        idLandingProspect: id,
        type: 1,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      setDataProspectStatus(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallUpdateLandingProspectStatus = async (idStatus, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callUpdateLandingProspectStatus(
        {
          idProspectStatus: idStatus,
          idSystemUser,
          idLoginHistory,
        },
        id
      );
      await handlerCallGetLandingProspectCoincidences();
      handlerCallGetLandingProspectStats();
      showMessageStatusApi(
        "Se actualizó correctamente el estatus",
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
      title: "Nombre",
      dataIndex: "fullName",
      key: "fullName",
      width: 200,
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
      title: "Fecha de pre-registro",
      dataIndex: "requestedAt",
      key: "requestedAt",
      width: 200,
    },
    {
      title: "Prospecto a",
      dataIndex: "prospectType",
      key: "prospectType",
    },
    {
      title: "Póliza",
      dataIndex: "policy",
      key: "policy",
    },
    {
      title: "Renta",
      dataIndex: "budgeAmount",
      key: "budgeAmount",
    },
    {
      title: "Cotización",
      dataIndex: "policyAmount",
      key: "policyAmount",
    },
    {
      title: "Atendido por",
      dataIndex: "lastUpdatedBy",
      key: "lastUpdatedBy",
    },
    {
      title: "Estatus",
      dataIndex: "prospectStatus",
      key: "prospectStatus",
      fixed: "right",
      render: (status, record) => {
        const style = record.prospectStatusStyle;
        const parseStyle =
          isNil(style) === false && isEmpty(style) === false
            ? JSON.parse(style)
            : {};
        return (
          <span>
            <Tag
              color={
                isEmpty(parseStyle) === false &&
                isNil(parseStyle.color) === false
                  ? parseStyle.color
                  : "gray"
              }
            >
              {status}
            </Tag>
          </span>
        );
      },
    },
    {
      title: "Asignar",
      dataIndex: "idLandingProspect",
      key: "idLandingProspect",
      fixed: "right",
      render: (asign, record) => {
        return (
          <Dropdown
            overlay={
              <Menu onClick={(value, option) => {}}>
                {isEmpty(dataProspectStatus) === false &&
                  dataProspectStatus.map((row) => {
                    return (
                      <Menu.Item
                        key={row.idProspectStatus}
                        onClick={() => {
                          handlerCallUpdateLandingProspectStatus(
                            row.idProspectStatus,
                            record.idLandingProspect
                          );
                        }}
                      >
                        <a>{row.prospectStatus}</a>
                      </Menu.Item>
                    );
                  })}
              </Menu>
            }
            trigger={["click"]}
          >
            <Button
              type="primary"
              shape="round"
              size="small"
              onClick={() => {}}
            >
              Asignar
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  const columnsAdvisor = [
    {
      title: "Agregados por",
      dataIndex: "createdByUser",
      key: "createdByUser",
    },
    {
      title: "Registrado",
      dataIndex: "isRegistered",
      key: "isRegistered",
      render: (status, record) => {
        return status === true ? "Si" : "No";
      },
    },
    {
      title: "Nombre",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Correo",
      dataIndex: "emailAddress",
      key: "emailAddress",
    },
    {
      title: "Se agregó el dia",
      dataIndex: "createdAtFormat",
      key: "createdAtFormat",
      render: (status, record) => {
        return status[0];
      },
    },
    {
      title: "Número telefónico",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Estatus del mensaje",
      dataIndex: "lastWSStatus",
      key: "lastWSStatus",
      fixed: "right",
      align: "center",
      render: (status, record) => {
        const style = record.lastWSStatusStyle;
        return (
          <span>
            <Tag
              color={
                isEmpty(style) === false && isNil(style) === false
                  ? style
                  : "gray"
              }
            >
              {status}
            </Tag>
            {record.lastWSReadAt}
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    handlerCallGetLandingProspectCoincidences();
    handlerCallGetLandingProspectStats();
    handlerCallGetAllProspectStatus();
    handlerCallGetPotentialAgentCoincidences();
  }, []);

  return (
    <Content>
      <div className="margin-app-main">
        <div
          className="indicators-amount-renter"
          style={{
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {isEmpty(dataStats) === false &&
            dataStats.map((row) => {
              const style = row.style;
              const parseStyle =
                isNil(style) === false && isEmpty(style) === false
                  ? JSON.parse(style)
                  : {};
              const color =
                isEmpty(parseStyle) === false &&
                isNil(parseStyle.color) === false
                  ? parseStyle.color
                  : "gray";
              const icon =
                isEmpty(parseStyle) === false &&
                isNil(parseStyle.icon) === false
                  ? parseStyle.icon
                  : "IconDanger";
              return (
                <div
                  className="cards-amount-renter"
                  style={{ marginBottom: 15 }}
                >
                  <div
                    className="elipse-icon"
                    style={{
                      background: color,
                      opacity: "1",
                      zIndex: "0",
                    }}
                  >
                    <img
                      src={arrayIconst[icon]}
                      alt="icon"
                      width="20px"
                      style={{ opacity: "1", zIndex: "1" }}
                    ></img>
                  </div>
                  <h2>{row.stat}</h2>
                  <span>{row.prospectStatus}</span>
                </div>
              );
            })}
        </div>
        <div className="main-information-user-admin">
          <div className="renter-card-information total-width">
            <div className="title-cards flex-title-card">
              <span>Leads</span>
            </div>
            <div className="section-information-renters">
              <Table
                columns={columns}
                dataSource={dataCoincidences}
                className="table-users-hfy"
                size="small"
                bordered
                scroll={{ x: 2000 }}
              />
            </div>
          </div>
        </div>
        <div className="main-information-user-admin">
          <div className="renter-card-information total-width">
            <div className="title-cards flex-title-card">
              <span>Marketing asesores</span>
              <label
                className="button_init_primary_label"
                type="button"
                for="file-input"
                onClick={() => {}}
              >
                <span>Exportar xlsx</span>
              </label>
              <input
                id="file-input"
                type="file"
                accept=".xls,.xlsx"
                onChange={async (e) => {
                  try {
                    await handlerCallBulkPotentialAgent(e.target.files);
                    document.getElementById("file-input").value = "";
                    handlerCallGetPotentialAgentCoincidences();
                  } catch (error) {
                    document.getElementById("file-input").value = "";
                  }
                }}
              />
            </div>
            <div className="section-information-renters">
              <Table
                columns={columnsAdvisor}
                dataSource={dataCoincidencesAdvisor}
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
  callGetLandingProspectStats: (data) =>
    dispatch(callGetLandingProspectStats(data)),
  callGetLandingProspectCoincidences: (data) =>
    dispatch(callGetLandingProspectCoincidences(data)),
  callGetAllProspectStatus: (data) => dispatch(callGetAllProspectStatus(data)),
  callUpdateLandingProspectStatus: (data, id) =>
    dispatch(callUpdateLandingProspectStatus(data, id)),
  callBulkPotentialAgent: (file, data) =>
    dispatch(callBulkPotentialAgent(file, data)),
  callGetPotentialAgentCoincidences: (data) =>
    dispatch(callGetPotentialAgentCoincidences(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeadsLandingPage);
