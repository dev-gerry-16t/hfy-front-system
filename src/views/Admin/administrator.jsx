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
import IconDanger from "../../assets/icons/Danger.svg";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import {
  callGetContractStats,
  callGetContractCoincidences,
  callGetContractChart,
  callGetSearchProspect,
  callGetAddProspect,
  callUpdateContract,
  callGetAllPolicyStatus,
  callGetDetailCustomer,
  callGetDetailCustomerTenant,
  callGetDetailCustomerAgent,
  callSwitchCustomerContract,
  callGetContractComment,
  callAddDocumentContract,
  callGetContractDocument,
  callGetContractDocumentById,
} from "../../utils/actions/actions";
import { API_CONSTANTS, HEADER } from "../../utils/constants/apiConstants";
import ENVIROMENT from "../../utils/constants/enviroments";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";
import SectionStatsChart from "./sections/sectionStatsChart";
import SectionStatsChartPie from "./sections/sectionStatsChartPie";
import SectionCardOwner from "./sections/sectionCardOwner";
import SectionAddUsers from "./sections/sectionAddUsers";
import SectionDetailUser from "./sections/sectionDetailUser";
import SectionDetailUserTenant from "./sections/sectionDetailUserTenant";
import SectionDetailUserAdviser from "./sections/sectionUserDetailAdviser";
import SectionUploadDocument from "./sections/sectionUploadDocuments";

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
    callGetDetailCustomer,
    callGetDetailCustomerTenant,
    callGetDetailCustomerAgent,
    callSwitchCustomerContract,
    setDataUserProfile,
    callGetContractComment,
    callAddDocumentContract,
    callGetContractDocument,
  } = props;
  const [isVisibleAddUser, setIsVisibleAddUser] = useState(false);
  const [idTopIndexMessage, setIdTopIndexMessage] = useState(-1);
  const [dataMessages, setDataMessages] = useState([]);
  const [isVisibleDetailUser, setIsVisibleDetailUser] = useState(false);
  const [isVisibleAddDocs, setIsVisibleAddDocs] = useState(false);
  const [dataCoincidences, setDataCoincidences] = useState([]);
  const [dataDocuments, setDataDocuments] = useState([]);
  const [dataStats, setDataStats] = useState({});
  const [dataDetailCustomer, setDataDetailCustomer] = useState({});
  const [dataDetailCustomerTenant, setDataDetailCustomerTenant] = useState([]);
  const [dataDetailReferences, setDataDetailReferences] = useState([]);
  const [dataDetailAgent, setDataDetailAgent] = useState({});
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
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallContractComment = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetContractComment({
        idSystemUser,
        idLoginHistory,
        topIndex: idTopIndexMessage,
        ...data,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataMessages(responseResult);
      if (isEmpty(responseResult) === false) {
        setIdTopIndexMessage(responseResult[0].topIndex);
      }
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallContractDocument = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetContractDocument({
        idContract: id,
        idSystemUser,
        idLoginHistory,
        type: null,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataDocuments(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetDetailCustomer = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetDetailCustomer({
        idContract: id,
        idSystemUser,
        idLoginHistory,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : {};
      setDataDetailCustomer(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetDetailCustomerTenant = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    const arrayResult = [];
    try {
      const response = await callGetDetailCustomerTenant({
        idContract: id,
        idSystemUser,
        idLoginHistory,
      });
      const responseResult1 =
        isNil(response) === false && isNil(response.response1) === false
          ? response.response1
          : [];
      const responseResult2 =
        isNil(response) === false && isNil(response.response2) === false
          ? response.response2
          : [];
      setDataDetailCustomerTenant(responseResult1);
      setDataDetailReferences(responseResult2);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetDetailCustomerAgent = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetDetailCustomerAgent({
        idContract: id,
        idSystemUser,
        idLoginHistory,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : {};
      setDataDetailAgent(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
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
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
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
      setDataOwnerSearch(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
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
      setDataTenantSearch(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
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
      setDataSecondTenant(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
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
      setDataAdviserSearch(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAddProspect = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAddProspect({
        idSystemUser,
        idLoginHistory,
        ...data,
      });
      showMessageStatusApi(
        "La solicitud se proceso exitosamente",
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
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
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
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
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
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
          rating: isNil(data.rating) === false ? data.rating : null,
          isApproved: isNil(data.isApproved) === false ? data.isApproved : null,
          idSystemUser,
          idLoginHistory,
        },
        data.idContract
      );
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallSwitchCustomerContract = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callSwitchCustomerContract(
        {
          idSystemUser,
          idLoginHistory,
        },
        id
      );
      handlerCallGetDetailCustomerTenant(id);
    } catch (error) {
      showMessageStatusApi(
        isNil(error) === false
          ? error
          : "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetContractDocumentById = async (data, name) => {
    const { idSystemUser, idLoginHistory, token } = dataProfile;
    try {
      const responseInfo = await fetch(
        `${ENVIROMENT}${API_CONSTANTS.GET_CONTRACT_DOCUMENT_BYID}`,
        {
          method: "POST",
          body: JSON.stringify({
            ...data,
            idDigitalContract: null,
            idSystemUser,
            idLoginHistory,
            download: false,
          }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (isNil(responseInfo.status) === false && responseInfo.status !== 200) {
        throw isNil(responseInfo.statusText) === false
          ? responseInfo.statusText
          : "";
      }
      const resultInfo = await responseInfo.json();
      const resultExtension = resultInfo.extension;

      const responseDownload = await fetch(
        `${ENVIROMENT}${API_CONSTANTS.GET_CONTRACT_DOCUMENT_BYID}`,
        {
          method: "POST",
          body: JSON.stringify({
            ...data,
            idDigitalContract: null,
            idSystemUser,
            idLoginHistory,
            download: true,
          }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        isNil(responseDownload.status) === false &&
        responseDownload.status !== 200
      ) {
        throw isNil(responseDownload.statusText) === false
          ? responseDownload.statusText
          : "";
      }
      const blob = await responseDownload.blob();
      const link = document.createElement("a");
      link.className = "download";
      link.download = `${name}.${resultExtension}`;
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      link.parentElement.removeChild(link);
    } catch (error) {
      showMessageStatusApi(
        "No esta disponible el documento",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  useEffect(() => {
    callAsynApis();
  }, []);

  return (
    <Content>
      <SectionUploadDocument
        dataDocuments={dataDocuments}
        isModalVisible={isVisibleAddDocs}
        onClose={() => {
          setIsVisibleAddDocs(!isVisibleAddDocs);
        }}
      />
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
        onSendInformation={async (data) => {
          try {
            await handlerCallGetAddProspect(data);
          } catch (error) {
            throw error;
          }
        }}
      />
      <SectionDetailUser
        isDrawerVisible={isVisibleDetailUser}
        onClose={() => {
          setIsVisibleDetailUser(!isVisibleDetailUser);
        }}
        dataDetailCustomer={dataDetailCustomer}
        onRedirectTo={async (key, idCustomer, idContract) => {
          await setDataUserProfile({
            ...dataProfile,
            idCustomerTenant: null,
            idCustomer: idCustomer,
            idContract: idContract,
          });
          history.push(`/websystem/typeform-owner/${key}`);
        }}
        dataMessages={dataMessages}
        onDownloadDocumentById={async (data, name) => {
          try {
            await handlerCallGetContractDocumentById(data, name);
          } catch (error) {
            throw error;
          }
        }}
      />
      <SectionDetailUserTenant
        isDrawerVisible={isVisibleDetailUserTenant}
        onClose={() => {
          setIsVisibleDetailUserTenant(!isVisibleDetailUserTenant);
        }}
        dataDetailCustomerTenant={dataDetailCustomerTenant}
        dataDetailReferences={dataDetailReferences}
        onSendRatingUser={async (data) => {
          try {
            await handlerCallUpdateContract(data);
            await handlerCallGetDetailCustomerTenant(data.idContract);
            callAsynApis();
          } catch (error) {}
        }}
        changeRolesCustomers={(id) => {
          handlerCallSwitchCustomerContract(id);
        }}
        onRedirectTo={async (key, idCustomer, idContract, idCustomerTenant) => {
          await setDataUserProfile({
            ...dataProfile,
            idCustomerTenantTF: idCustomerTenant,
            idCustomerTF: idCustomer,
            idContract: idContract,
          });
          history.push(`/websystem/typeform-user/${key}`);
        }}
        dataMessages={dataMessages}
        onDownloadDocumentById={async (data, name) => {
          try {
            await handlerCallGetContractDocumentById(data, name);
          } catch (error) {
            throw error;
          }
        }}
      />
      <SectionDetailUserAdviser
        isDrawerVisible={isVisibleDetailUserAdviser}
        onClose={() => {
          setIsVisibleDetailUserAdviser(!isVisibleDetailUserAdviser);
        }}
        dataDetailAgent={dataDetailAgent}
      />
      <div className="margin-app-main">
        <div className="top-main-user">
          <div className="welcome-user-main">
            <h2>Hola, {dataProfile.showName}</h2>
            <span>
              Último inicio de sesión:{" "}
              <strong>{dataProfile.lastSessionStarted}</strong>
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
            onOpenUploadDocument={(id) => {
              handlerCallContractDocument(id);
              setIsVisibleAddDocs(!isVisibleAddDocs);
            }}
            history={history}
            dataAllPolicyStatus={dataAllPolicyStatus}
            onAddUser={() => {
              setIsVisibleAddUser(!isVisibleAddUser);
            }}
            onOpenDetail={(type, id, data) => {
              if (id === 1) {
                handlerCallGetDetailCustomer(type);
                handlerCallContractComment({
                  idCustomer: data.idCustomer,
                  idCustomerTenant: null,
                  idContract: data.idContract,
                  idDigitalContract: data.idDigitalContract,
                });
                setIsVisibleDetailUser(!isVisibleDetailUser);
              } else if (id === 2) {
                handlerCallGetDetailCustomerTenant(type);
                handlerCallContractComment({
                  idCustomer: data.idCustomer,
                  idCustomerTenant: data.idCustomerTenant,
                  idContract: data.idContract,
                  idDigitalContract: data.idDigitalContract,
                });
                setIsVisibleDetailUserTenant(!isVisibleDetailUserTenant);
              } else if (id === 3) {
                handlerCallGetDetailCustomerAgent(type);
                setIsVisibleDetailUserAdviser(!isVisibleDetailUserAdviser);
              }
            }}
            dataCoincidences={dataCoincidences}
            finishCallApis
            onClickSendInvitation={() => {}}
            onGetPolicyStatus={(id) => {
              handlerCallGetAllPolicyStatus(id);
            }}
            onClosePolicy={async (data) => {
              await handlerCallUpdateContract(data);
              callAsynApis();
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
  callSwitchCustomerContract: (data, id) =>
    dispatch(callSwitchCustomerContract(data, id)),
  callGetAllPolicyStatus: (data) => dispatch(callGetAllPolicyStatus(data)),
  callGetDetailCustomer: (data) => dispatch(callGetDetailCustomer(data)),
  callGetDetailCustomerTenant: (data) =>
    dispatch(callGetDetailCustomerTenant(data)),
  callGetDetailCustomerAgent: (data) =>
    dispatch(callGetDetailCustomerAgent(data)),
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
  callGetContractComment: (data) => dispatch(callGetContractComment(data)),
  callAddDocumentContract: (data, id) =>
    dispatch(callAddDocumentContract(data, id)),
  callGetContractDocument: (data) => dispatch(callGetContractDocument(data)),
  callGetContractDocumentById: (data) =>
    dispatch(callGetContractDocument(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Administrator);
