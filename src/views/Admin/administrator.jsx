import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, Avatar, Rate, Modal } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
import "moment/locale/es";
import IconPolicy from "../../assets/icons/Policy.svg";
import IconWallet from "../../assets/icons/wallet.svg";
import IconActivity from "../../assets/icons/activity.svg";
import IconArroRight from "../../assets/icons/arrowRight.svg";
import IconDanger from "../../assets/icons/Danger.svg";
import {
  callGetContractStats,
  callGetContractCoincidences,
  callGetContractChart,
  callGetSearchProspect,
  callGetAddProspect,
  callUpdateContract,
  callGetAllPolicyStatus,
} from "../../utils/actions/actions";
import SectionStatsChart from "./sections/sectionStatsChart";
import SectionStatsChartPie from "./sections/sectionStatsChartPie";
import SectionCardOwner from "./sections/sectionCardOwner";
import SectionAddUsers from "./sections/sectionAddUsers";
import SectionDetailUser from "./sections/sectionDetailUser";
import SectionDetailUserTenant from "./sections/sectionDetailUserTenant";
import SectionDetailUserAdviser from "./sections/sectionUserDetailAdviser";

const { Content } = Layout;

const Administrator = (props) => {
  const {
    dataProfile,
    history,
    callGetContractStats,
    callGetContractCoincidences,
    callGetContractChart,
    callGetSearchProspect,
    callGetAddProspect,
    callUpdateContract,
    callGetAllPolicyStatus,
  } = props;
  const [isVisibleAddUser, setIsVisibleAddUser] = useState(false);
  const [isVisibleDetailUser, setIsVisibleDetailUser] = useState(false);
  const [dataCoincidences, setDataCoincidences] = useState([]);
  const [dataStats, setDataStats] = useState({});
  const [dataChartBar, setDataChartBar] = useState([]);
  const [dataChartPie, setDataChartPie] = useState([]);
  const [dataAllPolicyStatus, setDataAllPolicyStatus] = useState([]);
  const [dataOwnerSearch, setDataOwnerSearch] = useState({
    idPersonType: 1,
    idCustomer: null,
  });
  const [dataTenantSearch, setDataTenantSearch] = useState({
    idCustomerTenant: null,
    idCustomerType: null,
    idPersonType: null,
    givenName: null,
    lastName: null,
    mothersMaidenName: null,
    emailAddress: null,
    phoneNumber: null,
  });
  const [dataSecondTenant, setDataSecondTenant] = useState({
    idCustomerTenant: null,
    idCustomerType: null,
    idPersonType: null,
    givenName: null,
    lastName: null,
    mothersMaidenName: null,
    emailAddress: null,
    phoneNumber: null,
  });
  const [dataAdviserSearch, setDataAdviserSearch] = useState({
    idCustomerAgent: null,
  });
  const [isVisibleDetailUserTenant, setIsVisibleDetailUserTenant] = useState(
    false
  );
  const [isVisibleDetailUserAdviser, setIsVisibleDetailUserAdviser] = useState(
    false
  );

  const handlerCallGetContractStats = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetContractStats({
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
    } catch (error) {}
  };

  const handlerCallGetContractCoincidences = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetContractCoincidences({
        idSystemUser,
        idLoginHistory,
        topIndex: 0,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataCoincidences(responseResult);
    } catch (error) {}
  };

  const handlerCallGetSearchProspect = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetSearchProspect({
        idSystemUser,
        idLoginHistory,
        dataFiltered: data,
        idCustomer: null,
        type: 1,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : {};
      setDataOwnerSearch({ ...dataOwnerSearch, ...responseResult });
    } catch (error) {}
  };

  const handlerCallGetSearchProspectTenant = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetSearchProspect({
        idSystemUser,
        idLoginHistory,
        dataFiltered: data,
        idCustomer: null,
        type: 2,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : {};
      setDataTenantSearch({ ...dataTenantSearch, ...responseResult });
    } catch (error) {}
  };

  const handlerCallGetSearchSecondTenant = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetSearchProspect({
        idSystemUser,
        idLoginHistory,
        dataFiltered: data,
        idCustomer: id,
        type: 2,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : {};
      setDataSecondTenant({ ...dataSecondTenant, ...responseResult });
    } catch (error) {}
  };

  const handlerCallGetSearchProspectAdviser = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetSearchProspect({
        idSystemUser,
        idLoginHistory,
        dataFiltered: data,
        idCustomer: null,
        type: 3,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : {};
      setDataAdviserSearch({ ...dataAdviserSearch, ...responseResult });
    } catch (error) {}
  };

  const handlerCallGetAddProspect = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAddProspect({
        idSystemUser,
        idLoginHistory,
        ...data,
      });
    } catch (error) {}
  };

  const handlerCallGetContractChart = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetContractChart({
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
      const responseResultPie =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0].dataPAI) === false
          ? JSON.parse(response.response[0].dataPAI)
          : [];
      setDataChartBar(responseResultBar);
      setDataChartPie(responseResultPie);
    } catch (error) {}
  };

  const handlerCallGetAllPolicyStatus = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllPolicyStatus({
        idContract: id,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataAllPolicyStatus(responseResult);
    } catch (error) {}
  };

  const callAsynApis = async () => {
    await handlerCallGetContractStats();
    await handlerCallGetContractCoincidences();
    await handlerCallGetContractChart();
  };

  const handlerCallUpdateContract = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callUpdateContract(
        {
          idCustomer: data.idCustomer,
          idCustomerTenant: data.idCustomerTenant,
          idPolicyStatus: data.idPolicyStatus,
          rating: null,
          isApproved: null,
          idSystemUser,
          idLoginHistory,
        },
        data.idContract
      );
      callAsynApis();
    } catch (error) {}
  };

  useEffect(() => {
    callAsynApis();
  }, []);

  return (
    <Content>
      <SectionAddUsers
        isModalVisible={isVisibleAddUser}
        dataOwnerSearch={dataOwnerSearch}
        dataTenantSearch={dataTenantSearch}
        dataAdviserSearch={dataAdviserSearch}
        dataSecondTenant={dataSecondTenant}
        onClose={() => {
          setIsVisibleAddUser(!isVisibleAddUser);
        }}
        spinVisible={false}
        onSearchOwner={(data) => {
          handlerCallGetSearchProspect(data);
        }}
        onSearchTenant={(data) => {
          handlerCallGetSearchProspectTenant(data);
        }}
        onSearchSecondTenant={(data, id) => {
          handlerCallGetSearchSecondTenant(data, id);
        }}
        onSearchAdviser={(data) => {
          handlerCallGetSearchProspectAdviser(data);
        }}
        onSendInformation={(data) => {
          handlerCallGetAddProspect(data);
        }}
      />
      <SectionDetailUser
        isDrawerVisible={isVisibleDetailUser}
        onClose={() => {
          setIsVisibleDetailUser(!isVisibleDetailUser);
        }}
      />
      <SectionDetailUserTenant
        isDrawerVisible={isVisibleDetailUserTenant}
        onClose={() => {
          setIsVisibleDetailUserTenant(!isVisibleDetailUserTenant);
        }}
      />
      <SectionDetailUserAdviser
        isDrawerVisible={isVisibleDetailUserAdviser}
        onClose={() => {
          setIsVisibleDetailUserAdviser(!isVisibleDetailUserAdviser);
        }}
      />
      <div className="margin-app-main">
        <div className="top-main-user">
          <div className="welcome-user-main">
            <h2>Hola, Administrador</h2>
            <span>
              Último inicio de sesión: <strong>25 enero 2021</strong>
            </span>
          </div>
        </div>
        <div className="indicators-amount-renter">
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#1CE3FF" }}>
              <img src={IconWallet} alt="icon" width="20px"></img>
            </div>
            <h2>{dataStats.grandTotalSale}</h2>
            <span>Ventas</span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#BE0FFF" }}>
              <img src={IconPolicy} alt="icon" width="20px"></img>
            </div>
            <h2>{dataStats.totalClosings}</h2>
            <span>Cierres</span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#ffe51c" }}>
              <img src={IconDanger} alt="icon" width="20px"></img>
            </div>
            <h2>{dataStats.totalForClosing}</h2>
            <span>Por cerrar</span>
          </div>
        </div>
        <div className="main-information-user-admin">
          <SectionStatsChart dataStatsChart={dataChartBar} finishCallApis />
          <SectionStatsChartPie dataStatsChart={dataChartPie} finishCallApis />
          <SectionCardOwner
            history={history}
            dataAllPolicyStatus={dataAllPolicyStatus}
            onAddUser={() => {
              setIsVisibleAddUser(!isVisibleAddUser);
            }}
            onOpenDetail={(type, id) => {
              if (id === 1) {
                setIsVisibleDetailUser(!isVisibleDetailUser);
              } else if (id === 2) {
                setIsVisibleDetailUserTenant(!isVisibleDetailUserTenant);
              } else if (id === 3) {
                setIsVisibleDetailUserAdviser(!isVisibleDetailUserAdviser);
              }
            }}
            dataCoincidences={dataCoincidences}
            finishCallApis
            onClickSendInvitation={() => {}}
            onGetPolicyStatus={(id) => {
              handlerCallGetAllPolicyStatus(id);
            }}
            onClosePolicy={(data) => {
              handlerCallUpdateContract(data);
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
  callGetContractStats: (data) => dispatch(callGetContractStats(data)),
  callGetContractCoincidences: (data) =>
    dispatch(callGetContractCoincidences(data)),
  callGetContractChart: (data) => dispatch(callGetContractChart(data)),
  callGetSearchProspect: (data) => dispatch(callGetSearchProspect(data)),
  callGetAddProspect: (data) => dispatch(callGetAddProspect(data)),
  callUpdateContract: (data, id) => dispatch(callUpdateContract(data, id)),
  callGetAllPolicyStatus: (data) => dispatch(callGetAllPolicyStatus(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Administrator);
