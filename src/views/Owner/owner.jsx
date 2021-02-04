import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, Avatar, Rate, Modal, notification, message } from "antd";
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
  callAddProperty,
  callGetAllPersons,
  callGetProperties,
  callGetDepartments,
  callAddTenant,
  callGetZipCodeAdress,
  callGetAllTenantsCatalog,
  callGetAllBankCatalog,
  callRequestAdvancement,
} from "../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import SectionCardTenant from "./sections/sectionCardTenants";
import SectionStatsChart from "./sections/sectionStatsChart";
import SectionAddProperty from "./sections/sectionAddProperty";
import SectionAddTenant from "./sections/sectionAddTenant";
import SectionAdvancement from "./sections/sectionAdvancement";

const { Content } = Layout;

const Owner = (props) => {
  const {
    dataProfile,
    callGetAllCustomerById,
    history,
    callGetTenantCoincidences,
    callGetStatsChart,
    callAddProperty,
    callGetAllPersons,
    callGetProperties,
    callGetDepartments,
    callAddTenant,
    callGetZipCodeAdress,
    callGetAllTenantsCatalog,
    callGetAllBankCatalog,
    callRequestAdvancement,
  } = props;
  const [dataCustomer, setDataCustomer] = useState({});
  const [dataStatsChart, setDataStatsChart] = useState([]);
  const [dataCatalogProperty, setDataCatalogProperty] = useState([]);
  const [dataPersonType, setDataPersonType] = useState([]);
  const [dataDepartment, setDataDepartment] = useState([]);
  const [dataZipCodeAdress, setDataZipCodeAdress] = useState({});
  const [dataZipCatalog, setDataZipCatalog] = useState([]);
  const [dataTenant, setDataTenant] = useState([]);
  const [dataBank, setDataBank] = useState([]);
  const [tenantCoincidences, setTenantCoincidences] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleTenant, setIsModalVisibleTenant] = useState(false);
  const [isModalVisibleAdvancement, setIsModalVisibleAdvancement] = useState(
    false
  );
  const [finishCallApis, setFinishCallApis] = useState(false);
  const [spinVisible, setSpinVisible] = useState(false);

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

  const args = {
    description: (
      <div style={{ fontFamily: "Poppins" }}>
        <span style={{ fontSize: "12px" }}>
          Necesitamos que nos ayudes a ingresar tu información personal, la cual
          sera utilizada para la elaboración del contrato y póliza.
        </span>
        <button
          type="button"
          onClick={() => {
            notification.destroy();
            history.push("/websystem/typeform-owner");
          }}
          className="button-action-primary"
          style={{ marginTop: "25px" }}
        >
          <span>Ir al formulario</span>
        </button>
      </div>
    ),
    message: (
      <div
        style={{ fontFamily: "Poppins", fontSize: "12px", color: "#ff0282" }}
      >
        Solicitud Póliza Homify Propietario
      </div>
    ),
    duration: 0,
    style: { marginTop: "4vw" },
  };

  const handlerCallApiPersonTypes = async (data) => {
    try {
      const response = await callGetAllPersons(data);
      const responseResult =
        isNil(response) === false && isNil(response.result) === false
          ? response.result
          : [];
      setDataPersonType(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

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
      if (
        isEmpty(responseResult) === false &&
        isNil(responseResult.isTypeFormCompleted) === false &&
        responseResult.isTypeFormCompleted === false
      ) {
        notification.open(args);
      }
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetTenantCoincidences = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
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
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetCallGetStatsChart = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
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
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const hanlderCallGetZipCodeAdress = async (data) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetZipCodeAdress({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        ...data,
      });
      const responseResult1 =
        isNil(response) === false &&
        isNil(response.response1) === false &&
        isNil(response.response1[0]) === false
          ? response.response1[0]
          : {};
      const responseResult2 =
        isNil(response) === false && isNil(response.response2) === false
          ? response.response2
          : [];
      setDataZipCodeAdress(responseResult1);
      setDataZipCatalog(responseResult2);
    } catch (error) {
      setSpinVisible(false);
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };
  const handlerCallAddProperty = async (data) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callAddProperty({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        ...data,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response) === false
          ? response.response
          : {};
      setSpinVisible(false);
      setIsModalVisible(!isModalVisible);
    } catch (error) {
      setSpinVisible(false);
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallRequestAdvancement = async (data) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callRequestAdvancement({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        ...data,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response) === false
          ? response.response
          : {};
      setSpinVisible(false);
      setIsModalVisibleAdvancement(!isModalVisibleAdvancement);
    } catch (error) {
      setSpinVisible(false);
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetProperties = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetProperties({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response) === false
          ? response.response
          : {};
      setDataCatalogProperty(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetDepartments = async (data) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetDepartments({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        ...data,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response) === false
          ? response.response
          : {};
      setDataDepartment(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallAddTenant = async (data) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callAddTenant({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        ...data,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response) === false
          ? response.response
          : {};
      setSpinVisible(false);
      setIsModalVisibleTenant(!isModalVisibleTenant);
      handlerCallGetTenantCoincidences();
    } catch (error) {
      setSpinVisible(false);
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallTenantCatalog = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllTenantsCatalog({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : {};
      setDataTenant(responseResult);
    } catch (error) {
      setSpinVisible(false);
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallBankCatalog = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllBankCatalog({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataBank(responseResult);
    } catch (error) {
      setSpinVisible(false);
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
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
      <SectionAddProperty
        spinVisible={spinVisible}
        isModalVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
        onClickAddProperty={(data) => {
          setSpinVisible(true);
          handlerCallAddProperty(data);
        }}
        dataZipCodeAdress={dataZipCodeAdress}
        dataZipCatalog={dataZipCatalog}
        onChangeZipCode={(zipCode) => {
          hanlderCallGetZipCodeAdress({ type: 1, zipCode });
        }}
      />
      <SectionAddTenant
        dataPersonType={dataPersonType}
        dataCatalogProperty={dataCatalogProperty}
        dataDepartment={dataDepartment}
        spinVisible={spinVisible}
        isModalVisible={isModalVisibleTenant}
        onClose={() => {
          setIsModalVisibleTenant(!isModalVisibleTenant);
        }}
        onClickAddProperty={(data) => {
          setSpinVisible(true);
          handlerCallAddTenant(data);
        }}
        onChangeSelectProperty={(value) => {
          handlerCallGetDepartments({
            idProperty: value,
            type: 1,
          });
        }}
      />
      <SectionAdvancement
        isModalVisible={isModalVisibleAdvancement}
        onClose={() => {
          setIsModalVisibleAdvancement(!isModalVisibleAdvancement);
        }}
        onClickAdvancement={(data) => {
          setSpinVisible(true);
          handlerCallRequestAdvancement(data);
        }}
        spinVisible={spinVisible}
        dataTenant={dataTenant}
        dataBank={dataBank}
      />
      <div className="margin-app-main">
        <div className="top-main-user">
          <div className="welcome-user-main">
            <h2>Hola, {dataCustomer.shortName}</h2>
            <span>
              Último inicio de sesión:{" "}
              <strong>{dataCustomer.lastSessionStarted}</strong>
            </span>
          </div>
          <div className="action-buttons-top">
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
              <button
                type="button"
                onClick={async () => {
                  setIsModalVisibleAdvancement(!isModalVisibleAdvancement);
                  await handlerCallTenantCatalog();
                  await handlerCallBankCatalog();
                }}
              >
                <span>Adelanto de renta</span>
              </button>
            </div>
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
            onClickSendInvitation={async () => {
              setIsModalVisibleTenant(!isModalVisibleTenant);
              await handlerCallApiPersonTypes({
                idType: 2,
                idCustomerType: null,
              });
              await handlerCallGetProperties();
            }}
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
  callAddProperty: (data) => dispatch(callAddProperty(data)),
  callGetAllPersons: (data) => dispatch(callGetAllPersons(data)),
  callGetProperties: (data) => dispatch(callGetProperties(data)),
  callGetDepartments: (data) => dispatch(callGetDepartments(data)),
  callAddTenant: (data) => dispatch(callAddTenant(data)),
  callGetZipCodeAdress: (data) => dispatch(callGetZipCodeAdress(data)),
  callGetAllTenantsCatalog: (data) => dispatch(callGetAllTenantsCatalog(data)),
  callGetAllBankCatalog: (data) => dispatch(callGetAllBankCatalog(data)),
  callRequestAdvancement: (data) => dispatch(callRequestAdvancement(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Owner);
