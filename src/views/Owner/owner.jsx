import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, Avatar, Rate, Modal } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import IconOwner from "../../assets/icons/iconHomeIndicator.svg";
import IconWallet from "../../assets/icons/wallet.svg";
import IconActivity from "../../assets/icons/activity.svg";
import IconArroRight from "../../assets/icons/arrowRight.svg";
import {
  callGetAllCustomerById,
  callGetAllCustomerCoincidences,
  callGetStatsChart,
} from "../../utils/actions/actions";
import SectionCardTenant from "./sections/sectionCardTenants";
import SectionStatsChart from "./sections/sectionStatsChart";

const { Content } = Layout;

const Owner = (props) => {
  const {
    dataProfile,
    callGetAllCustomerById,
    history,
    callGetTenantCoincidences,
    callGetStatsChart,
  } = props;
  const [dataCustomer, setDataCustomer] = useState({});
  const [dataStatsChart, setDataStatsChart] = useState([]);
  const [tenantCoincidences, setTenantCoincidences] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [finishCallApis, setFinishCallApis] = useState(false);

  const handlerCallGetAllCustomerById = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllCustomerById({
        idCustomer,
        idSystemUser,
        idLoginHistory,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : {};
      setDataCustomer(responseResult);
    } catch (error) {}
  };

  const handlerCallGetTenantCoincidences = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;

    // const idCustomer = "EF214D81-D538-444E-BBFE-6276C7B13650";
    // const idSystemUser = "4E8173B3-CA66-44CA-B4FF-4958306B3C7C";
    // const idLoginHistory = "8A13D7FB-52BA-47EF-92B7-65EE629DCBE0";

    try {
      const response = await callGetTenantCoincidences({
        idCustomer,
        idSystemUser,
        idLoginHistory,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response) === false
          ? response.response
          : {};
      setTenantCoincidences(responseResult);
    } catch (error) {}
  };

  const handlerCallGetCallGetStatsChart = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;

    // const idCustomer = "EF214D81-D538-444E-BBFE-6276C7B13650";
    // const idSystemUser = "4E8173B3-CA66-44CA-B4FF-4958306B3C7C";
    // const idLoginHistory = "8A13D7FB-52BA-47EF-92B7-65EE629DCBE0";

    try {
      const response = await callGetStatsChart({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        jsonConditions: [],
      });

      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response) === false
          ? response.response
          : {};
      setDataStatsChart(responseResult);
    } catch (error) {}
  };

  const handlerCalllSyncApis = async () => {
    await handlerCallGetAllCustomerById();
    await handlerCallGetTenantCoincidences();
    await handlerCallGetCallGetStatsChart();
    setFinishCallApis(true);
  };

  useEffect(() => {
    handlerCalllSyncApis();
  }, []);

  return (
    <Content>
      <Modal
        title="Agregar Propiedad"
        visible={isModalVisible}
        onOk={() => {
          setIsModalVisible(!isModalVisible);
        }}
        onCancel={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <div className="margin-app-main">
        <div className="top-main-user">
          <div className="welcome-user-main">
            <h2>Buenos días, {dataCustomer.shortName}</h2>
            <span>
              Último inicio de sesión:{" "}
              <strong>{dataCustomer.lastSessionStarted}</strong>
            </span>
          </div>
          <div className="button_init_primary">
            <button
              type="button"
              onClick={() => {
                setIsModalVisible(!isModalVisible);
              }}
            >
              <span>Registrar Propiedad</span>
            </button>
          </div>
          <div className="button_init_primary">
            <button type="button" onClick={() => {}}>
              <span>Registrar Inquilino</span>
            </button>
          </div>
        </div>
        <div className="indicators-amount-renter">
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#ffe51c" }}>
              <img src={IconOwner} alt="icon" width="20px"></img>
            </div>
            <h2>{dataCustomer.totalCumulativeRentAmount}</h2>
            <span>
              Total Rentas Acumuladas ({dataCustomer.totalCumulativeRents})
            </span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#1CE3FF" }}>
              <img src={IconWallet} alt="icon" width="20px"></img>
            </div>
            <h2>{dataCustomer.totalExpensiveAmount}</h2>
            <span>Total Gastos Acumulados</span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#BE0FFF" }}>
              <img src={IconActivity} alt="icon" width="20px"></img>
            </div>
            <h2>{dataCustomer.totalCumulativeBalance}</h2>
            <span>Balance Acumulado</span>
          </div>
        </div>
        <div className="main-information-user">
          <SectionStatsChart
            dataStatsChart={dataStatsChart}
            finishCallApis={finishCallApis}
          />
          <SectionCardTenant
            history={history}
            tenantCoincidences={tenantCoincidences}
            finishCallApis={finishCallApis}
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
  callGetAllCustomerById: (data) => dispatch(callGetAllCustomerById(data)),
  callGetStatsChart: (data) => dispatch(callGetStatsChart(data)),
  callGetTenantCoincidences: (data) =>
    dispatch(callGetAllCustomerCoincidences(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Owner);
