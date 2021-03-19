import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, message } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import "moment/locale/es";
import IconPolicy from "../../assets/icons/Policy.svg";
import IconDanger from "../../assets/icons/Danger.svg";
import Agents from "../../assets/icons/agent.svg";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import {
  callGetContractStats,
  callGetContractCoincidences,
  callUpdateContract,
  callGetAllPolicyStatus,
  callGetDetailCustomerTenant,
  callSwitchCustomerContract,
  callGetContractComment,
  callGetContractDocument,
} from "../../utils/actions/actions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import ENVIROMENT from "../../utils/constants/enviroments";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";
import SectionCardOwner from "./sections/sectionCardOwnerControl";
import SectionDetailUserTenant from "./sections/sectionDetailUserTenant";

const { Content } = Layout;

const ControlDesk = (props) => {
  const {
    dataProfile,
    history,
    callGetContractStats,
    callGetContractCoincidences,
    callUpdateContract,
    callGetAllPolicyStatus,
    callGetDetailCustomerTenant,
    callSwitchCustomerContract,
    setDataUserProfile,
    callGetContractComment,
  } = props;
  const [idTopIndexMessage, setIdTopIndexMessage] = useState(-1);
  const [dataMessages, setDataMessages] = useState([]);
  const [isVisibleAddDocs, setIsVisibleAddDocs] = useState(false);
  const [dataCoincidences, setDataCoincidences] = useState([]);
  const [dataStats, setDataStats] = useState({});
  const [dataDetailCustomerTenant, setDataDetailCustomerTenant] = useState([]);
  const [dataDetailReferences, setDataDetailReferences] = useState([]);
  const [dataAllPolicyStatus, setDataAllPolicyStatus] = useState([]);
  const [isVisibleDetailUserTenant, setIsVisibleDetailUserTenant] = useState(
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
        <div
          className="indicators-amount-renter"
          style={{ justifyContent: "space-around" }}
        >
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
            <h2>500</h2>
            <span>Asesores</span>
          </div>
        </div>
        <div className="main-information-user-admin">
          <SectionCardOwner
            onOpenUploadDocument={(id) => {
              setIsVisibleAddDocs(!isVisibleAddDocs);
            }}
            history={history}
            dataAllPolicyStatus={dataAllPolicyStatus}
            onOpenDetail={(type, id, data) => {
              if (data.canViewDatail === true) {
                if (id === 2) {
                  handlerCallGetDetailCustomerTenant(type);
                  handlerCallContractComment({
                    idCustomer: data.idCustomer,
                    idCustomerTenant: data.idCustomerTenant,
                    idContract: data.idContract,
                    idDigitalContract: data.idDigitalContract,
                  });
                  setIsVisibleDetailUserTenant(!isVisibleDetailUserTenant);
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
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGetContractStats: (data) => dispatch(callGetContractStats(data)),
  callGetContractCoincidences: (data) =>
    dispatch(callGetContractCoincidences(data)),
  callUpdateContract: (data, id) => dispatch(callUpdateContract(data, id)),
  callSwitchCustomerContract: (data, id) =>
    dispatch(callSwitchCustomerContract(data, id)),
  callGetAllPolicyStatus: (data) => dispatch(callGetAllPolicyStatus(data)),
  callGetDetailCustomerTenant: (data) =>
    dispatch(callGetDetailCustomerTenant(data)),
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
  callGetContractComment: (data) => dispatch(callGetContractComment(data)),
  callGetContractDocumentById: (data) =>
    dispatch(callGetContractDocument(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlDesk);
