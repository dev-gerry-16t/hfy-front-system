import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, Avatar, Rate, Modal, message } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
import "moment/locale/es";
import IconPolicy from "../../assets/icons/Policy.svg";
import IconWallet from "../../assets/icons/wallet.svg";
import IconActivity from "../../assets/icons/activity.svg";
import IconArroRight from "../../assets/icons/arrowRight.svg";
import {
  callGetAgentIndicators,
  callGetAgentContractCoincidences,
  callGetAgentCommissionChart,
} from "../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import SectionStatsChart from "./sections/sectionStatsChart";
import SectionCardOwner from "./sections/sectionCardOwner";

const { Content } = Layout;

const Adviser = (props) => {
  const {
    dataProfile,
    history,
    callGetAgentIndicators,
    callGetAgentContractCoincidences,
    callGetAgentCommissionChart,
  } = props;

  const [dataStats, setDataStats] = useState({});
  const [dataCoincidences, setDataCoincidences] = useState([]);
  const [dataChartBar, setDataChartBar] = useState([]);

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

  const handlerCallGetAgentIndicators = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAgentIndicators({
        idSystemUser,
        idLoginHistory,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : {};
      setDataStats(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAgentContractCoincidences = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAgentContractCoincidences({
        idSystemUser,
        idLoginHistory,
        topIndex: null,
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

  const handlerCallGetAgentCommissionChart = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAgentCommissionChart({
        idSystemUser,
        idLoginHistory,
      });
      const responseResultBar =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0].dataBar) === false
          ? JSON.parse(response.response[0].dataBar)
          : [];
      setDataChartBar(responseResultBar);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const callAsynApis = async () => {
    await handlerCallGetAgentIndicators();
    await handlerCallGetAgentContractCoincidences();
    await handlerCallGetAgentCommissionChart();
  };

  useEffect(() => {
    callAsynApis();
  }, []);

  return (
    <Content>
      <div className="margin-app-main">
        <div className="top-main-user">
          <div className="welcome-user-main">
            <h2>Hola, {dataProfile.showName}</h2>
            <span>
              Último inicio de sesión: <strong>{dataProfile.lastSessionStarted}</strong>
            </span>
            <span>
              Número de Asesor: <strong>{dataProfile.agentNo}</strong>
            </span>
          </div>
        </div>
        <div className="indicators-amount-renter">
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#1CE3FF" }}>
              <img src={IconWallet} alt="icon" width="20px"></img>
            </div>
            <h2>{dataStats.totalCommissionAmount}</h2>
            <span>Total Comisiones</span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#BE0FFF" }}>
              <img src={IconPolicy} alt="icon" width="20px"></img>
            </div>
            <h2>{dataStats.totalPolicies}</h2>
            <span>Polizas</span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#ffe51c" }}>
              <img src={IconActivity} alt="icon" width="20px"></img>
            </div>
            <h2>{dataStats.totalRenewals}</h2>
            <span>Renovaciones</span>
          </div>
        </div>
        <div className="main-information-user">
          <SectionStatsChart dataStatsChart={dataChartBar} finishCallApis />
          <SectionCardOwner
            history={history}
            tenantCoincidences={dataCoincidences}
            finishCallApis
            onClickSendInvitation={() => {}}
          />
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
  callGetAgentIndicators: (data) => dispatch(callGetAgentIndicators(data)),
  callGetAgentContractCoincidences: (data) =>
    dispatch(callGetAgentContractCoincidences(data)),
  callGetAgentCommissionChart: (data) =>
    dispatch(callGetAgentCommissionChart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Adviser);
