import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, message, Tooltip } from "antd";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import "moment/locale/es";
import IconPolicy from "../../assets/icons/Policy.svg";
import IconWallet from "../../assets/icons/wallet.svg";
import IconActivity from "../../assets/icons/activity.svg";
import {
  callGetAllUserProfile,
  callGetAgentIndicators,
  callGetAgentContractCoincidences,
  callGetAgentCommissionChart,
} from "../../utils/actions/actions";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import SectionStatsChart from "./sections/sectionStatsChart";
import SectionCardOwner from "./sections/sectionCardOwner";
import CustomValidationUser from "../../components/CustomValidationUser";
import IconsProfile from "../Owner/icons/icons";

const { Content } = Layout;

const Adviser = (props) => {
  const {
    callGetAllUserProfile,
    setDataUserProfile,
    dataProfile,
    history,
    callGetAgentIndicators,
    callGetAgentContractCoincidences,
    callGetAgentCommissionChart,
  } = props;

  const [dataStats, setDataStats] = useState({});
  const [dataCoincidences, setDataCoincidences] = useState([]);
  const [dataChartBar, setDataChartBar] = useState([]);
  const [isVisibleVerification, setIsVisibleVerification] = useState(false);
  const [iconVerification, setIconVerification] = useState({
    icon: "",
    label: "",
  });

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
    const {
      idSystemUser,
      idLoginHistory,
      verificationStatusStyle,
      verificationStatus,
      shouldCustomerBeVerified,
    } = dataProfile;
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
      setIconVerification({
        icon: verificationStatusStyle,
        label: verificationStatus,
      });
      setIsVisibleVerification(shouldCustomerBeVerified);
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

  const handlerCallGetAllUserProfile = async () => {
    try {
      const response = await callGetAllUserProfile({
        idSystemUser: dataProfile.idSystemUser,
        token: dataProfile.token,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      await setDataUserProfile({
        ...dataProfile,
        ...responseResult,
      });
      const {
        shouldCustomerBeVerified,
        verificationStatusStyle,
        verificationStatus,
      } = responseResult;
      setIconVerification({
        icon: verificationStatusStyle,
        label: verificationStatus,
      });
    } catch (error) {}
  };

  useEffect(() => {
    callAsynApis();
  }, []);

  return (
    <Content>
      <CustomValidationUser
        isVisible={isVisibleVerification}
        onClose={() => {
          setIsVisibleVerification(false);
          handlerCallGetAllUserProfile();
        }}
        finished={() => {
          handlerCallGetAllUserProfile();
        }}
        metadata={{
          idCustomer: dataProfile.idCustomer,
        }}
        clientId={dataProfile.clientId}
        flowId={dataProfile.flowId}
        finishedProcess={() => {
          callAsynApis();
          setIsVisibleVerification(false);
          handlerCallGetAllUserProfile();
        }}
      />
      <div className="margin-app-main">
        <div className="top-main-user">
          <div className="welcome-user-main">
            <div style={{ display: "flex", alignItems: "center" }}>
              <h2 style={{ marginRight: 5 }}>Hola, {dataProfile.showName}</h2>
              {isEmpty(iconVerification) === false &&
                isNil(iconVerification) === false && (
                  <Tooltip
                    placement="right"
                    title={`Verificación ${iconVerification.label}`}
                  >
                    {IconsProfile[iconVerification.icon]}
                  </Tooltip>
                )}
            </div>
            <span>
              Último inicio de sesión:{" "}
              <strong>{dataProfile.lastSessionStarted}</strong>
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
            <span>Pólizas</span>
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
  callGetAllUserProfile: (data) => dispatch(callGetAllUserProfile(data)),
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
  callGetAgentIndicators: (data) => dispatch(callGetAgentIndicators(data)),
  callGetAgentContractCoincidences: (data) =>
    dispatch(callGetAgentContractCoincidences(data)),
  callGetAgentCommissionChart: (data) =>
    dispatch(callGetAgentCommissionChart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Adviser);
