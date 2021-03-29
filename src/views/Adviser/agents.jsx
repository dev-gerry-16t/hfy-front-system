import React, { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { connect } from "react-redux";
import { Layout, Table, Tag, Menu, Dropdown, Button, message } from "antd";
import Agents from "../../assets/icons/agent.svg";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import { callGetCustomerAgentCoincidences } from "../../utils/actions/actions";

const { Content } = Layout;

const AgentsSystem = (props) => {
  const { callGetCustomerAgentCoincidences, dataProfile } = props;
  const [dataCoincidences, setDataCoincidences] = useState([]);
  const [dataTotalAgents, setDataTotalAgents] = useState(0);

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

  const columns = [
    {
      title: "Número de asesor",
      dataIndex: "agentNo",
      key: "agentNo",
      fixed: "left",
    },
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
      title: "Inmobiliaria",
      dataIndex: "realState",
      key: "realState",
      width: 200,
    },
    {
      title: "Efectividad",
      dataIndex: "percentCompleted",
      key: "percentCompleted",
    },
    {
      title: "Comisiones Primera vez",
      dataIndex: "totalCommissionsAmount",
      key: "totalCommissionsAmount",
    },
    {
      title: "Comisión por renovación",
      dataIndex: "totalRenewalsAmount",
      key: "totalRenewalsAmount",
    },
    {
      title: "Comisión global",
      dataIndex: "grandTotalCommissionsAmount",
      key: "grandTotalCommissionsAmount",
    },
    {
      title: "Última comisión",
      dataIndex: "lastCommissionAt",
      key: "lastCommissionAt",
    },
  ];

  const handlerCallGetCustomerAgentCoincidences = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetCustomerAgentCoincidences({
        idSystemUser,
        idLoginHistory,
        topIndex: 0,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      const totalAgents =
        isEmpty(responseResult) === false &&
        isNil(responseResult[0]) === false &&
        isNil(responseResult[0].totalAgents) === false
          ? responseResult[0].totalAgents
          : 0;
      setDataTotalAgents(totalAgents);
      setDataCoincidences(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    handlerCallGetCustomerAgentCoincidences();
  }, []);

  return (
    <Content>
      <div className="margin-app-main">
        <div className="indicators-amount-renter">
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#1CE3FF" }}>
              <img src={Agents} alt="icon" width="20px"></img>
            </div>
            <h2>{dataTotalAgents}</h2>
            <span>Total de asesores</span>
          </div>
        </div>
        <div className="main-information-user-admin">
          <div className="renter-card-information total-width">
            <div className="title-cards flex-title-card">
              <span>Asesores</span>
            </div>
            <div className="section-information-renters">
              <Table
                columns={columns}
                dataSource={dataCoincidences}
                className="table-users-hfy"
                size="small"
                bordered
                scroll={{ x: 1500 }}
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
  callGetCustomerAgentCoincidences: (data) =>
    dispatch(callGetCustomerAgentCoincidences(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AgentsSystem);
