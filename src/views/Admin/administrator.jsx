import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, message } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import "moment/locale/es";
import IconDanger from "../../assets/icons/Danger.svg";
import Tickets from "../../assets/icons/tickets.svg";
import Payments from "../../assets/icons/payments.svg";
import Balance from "../../assets/icons/balance.svg";
import Agents from "../../assets/icons/agent.svg";
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
  callSetContract,
  callGetContract,
  callAddDocumentContractId,
  callGetAllRejectionReasons,
  callUpdateProspectInvitation,
} from "../../utils/actions/actions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
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
    callGetContractDocument,
    callSetContract,
    callGetContract,
    callAddDocumentContractId,
    callGetAllRejectionReasons,
    callUpdateProspectInvitation,
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
  const [dataAllReasonRejection, setDataAllReasonRejection] = useState([]);
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
  const [isVisibleDetailUserTenant, setIsVisibleDetailUserTenant] =
    useState(false);
  const [isVisibleDetailUserAdviser, setIsVisibleDetailUserAdviser] =
    useState(false);

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
      await callGetAddProspect({
        idSystemUser,
        idLoginHistory,
        ...data,
      });
      showMessageStatusApi(
        "La solicitud se procesó exitosamente",
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

  const handlerCallGetAllRejectionReasons = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllRejectionReasons({
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataAllReasonRejection(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallSetContract = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callSetContract(
        {
          ...data,
          idSystemUser,
          idLoginHistory,
        },
        data.idContract
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

  const callAsynApis = async () => {
    await handlerCallGetContractStats();
    await handlerCallGetContractCoincidences();
    await handlerCallGetContractChart();
    handlerCallGetAllRejectionReasons();
  };

  const handlerCallUpdateContract = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callUpdateContract(
        {
          idCustomer: data.idCustomer,
          idCustomerTenant: data.idCustomerTenant,
          idPolicyStatus: data.idPolicyStatus,
          rating: isNil(data.rating) === false ? data.rating : null,
          isApproved: isNil(data.isApproved) === false ? data.isApproved : null,
          idRejectionReason:
            isNil(data.idRejectionReason) === false
              ? data.idRejectionReason
              : null,
          rejectionReason:
            isNil(data.rejectionReason) === false ? data.rejectionReason : null,
          idSystemUser,
          idLoginHistory,
        },
        data.idContract
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

  const handlerCallUpdateProspectInvitation = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callUpdateProspectInvitation(
        {
          ...data,
          idSystemUser,
          idLoginHistory,
        },
        id
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
    }
  };

  const handlerCallAddDocumentContractId = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callAddDocumentContractId(
        {
          ...data,
          idSystemUser,
          idLoginHistory,
        },
        id
      );
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallGetContract = async (data, name) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      if (data.download === false) {
        const response = await callGetContract({
          ...data,
          idSystemUser,
          idLoginHistory,
        });
        const responseResult =
          isNil(response) === false &&
          isNil(response.response) === false &&
          isNil(response.response[0]) === false
            ? response.response[0]
            : {};
        if (isEmpty(responseResult) === false && data.process === true) {
          await handlerCallAddDocumentContractId(
            {
              type: data.type,
              idContract: responseResult.idContract,
            },
            responseResult.idDocument
          );
        }
      }
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
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
        "No está disponible el documento",
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
            callAsynApis();
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
            idCustomerTF: idCustomer,
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
        onAcceptContract={async (data) => {
          try {
            await handlerCallSetContract(data);
            await handlerCallGetContract({
              download: false,
              process: true,
              url: "url",
              idCustomer: data.idCustomer,
              idCustomerTenant: data.idCustomerTenant,
              idContract: data.idContract,
              type: 1,
            });
            await handlerCallGetContract({
              download: false,
              process: true,
              url: "url",
              idCustomer: data.idCustomer,
              idCustomerTenant: data.idCustomerTenant,
              idContract: data.idContract,
              type: 2,
            });
            await handlerCallGetContract({
              download: false,
              process: true,
              url: "url",
              idCustomer: data.idCustomer,
              idCustomerTenant: data.idCustomerTenant,
              idContract: data.idContract,
              type: 4,
            });
            await handlerCallGetDetailCustomer(data.idContract);
          } catch (error) {
            throw error;
          }
        }}
      />
      <SectionDetailUserTenant
        isDrawerVisible={isVisibleDetailUserTenant}
        onClose={() => {
          setIsVisibleDetailUserTenant(!isVisibleDetailUserTenant);
          callAsynApis();
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
        dataAllReasonRejection={dataAllReasonRejection}
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
          <div
            className="action-buttons-top"
            style={{ justifyContent: "flex-end" }}
          >
            <div className="button_init_primary">
              <button
                type="button"
                onClick={() => {
                  history.push(`/websystem/leads-landingpage`);
                }}
              >
                <span>Leads ({dataStats.totalLeads})</span>
              </button>
            </div>
          </div>
        </div>
        <div className="indicators-amount-renter">
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#1CE3FF" }}>
              <img src={Tickets} alt="icon" width="20px"></img>
            </div>
            <h2>{dataStats.grandTotalSale}</h2>
            <span>
              Cierres <strong>({dataStats.totalClosings})</strong>
            </span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#FF6961" }}>
              <img src={Payments} alt="icon" width="20px"></img>
            </div>
            <h2>{dataStats.totalCommissionAmount}</h2>
            <span>
              Comisiones pagadas <strong>({dataStats.totalCommissions})</strong>
            </span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#98FF98" }}>
              <img src={Balance} alt="icon" width="20px"></img>
            </div>
            <h2>{dataStats.totalBalance}</h2>
            <span>Balance</span>
          </div>
        </div>
        <div
          className="indicators-amount-renter"
          style={{ justifyContent: "space-around" }}
        >
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#ffe51c" }}>
              <img src={IconDanger} alt="icon" width="20px"></img>
            </div>
            <h2>{dataStats.totalForClosing}</h2>
            <span>Por cerrar</span>
          </div>
          <div
            className="cards-amount-renter"
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push(`/websystem/dashboard-agents`);
            }}
          >
            <div className="elipse-icon" style={{ backgroundColor: "#ffa420" }}>
              <img src={Agents} alt="icon" width="20px"></img>
            </div>
            <h2>{dataStats.totalAgent}</h2>
            <span>Asesores</span>
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
            onSendActionInvitation={async (data, id) => {
              try {
                await handlerCallUpdateProspectInvitation(data, id);
                callAsynApis();
              } catch (error) {
                throw error;
              }
            }}
            onOpenDetail={(type, id, data) => {
              if (data.canViewDatail === true) {
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
  const { dataProfile } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGetContract: (data) => dispatch(callGetContract(data)),
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
  callSetContract: (data, id) => dispatch(callSetContract(data, id)),
  callAddDocumentContractId: (data, id) =>
    dispatch(callAddDocumentContractId(data, id)),
  callGetAllRejectionReasons: (data) =>
    dispatch(callGetAllRejectionReasons(data)),
  callUpdateProspectInvitation: (data, id) =>
    dispatch(callUpdateProspectInvitation(data, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Administrator);
