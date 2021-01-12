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
  callAddProperty,
  callGetAllPersons,
  callGetProperties,
  callGetDepartments,
  callAddTenant,
} from "../../utils/actions/actions";
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
  } = props;
  const [dataCustomer, setDataCustomer] = useState({});
  const [dataStatsChart, setDataStatsChart] = useState([]);
  const [dataCatalogProperty, setDataCatalogProperty] = useState([]);
  const [dataPersonType, setDataPersonType] = useState([]);
  const [dataDepartment, setDataDepartment] = useState([]);
  const [tenantCoincidences, setTenantCoincidences] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleTenant, setIsModalVisibleTenant] = useState(false);
  const [isModalVisibleAdvancement, setIsModalVisibleAdvancement] = useState(
    false
  );
  const [finishCallApis, setFinishCallApis] = useState(false);
  const [spinVisible, setSpinVisible] = useState(false);

  const handlerCallApiPersonTypes = async (data) => {
    try {
      const response = await callGetAllPersons(data);
      const responseResult =
        isNil(response) === false && isNil(response.result) === false
          ? response.result
          : [];
      setDataPersonType(responseResult);
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
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
      console.log("response", response);
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
        }}
        spinVisible={spinVisible}
        dataTenant={[]}
        dataBank={[]}
      />
      <div className="margin-app-main">
        <div className="top-main-user">
          <div className="welcome-user-main">
            <h2>Buenos días, {dataCustomer.shortName}</h2>
            <span>
              Último inicio de sesión:{" "}
              <strong>{dataCustomer.lastSessionStarted}</strong>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              width: "50%",
              justifyContent: "space-between",
            }}
          >
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
                onClick={() => {
                  setIsModalVisibleAdvancement(!isModalVisibleAdvancement);
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Owner);
