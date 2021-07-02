import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Layout, notification, message } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import IconOwner from "../../assets/icons/iconHomeIndicator.svg";
import IconWallet from "../../assets/icons/wallet.svg";
import IconActivity from "../../assets/icons/activity.svg";
import Arrow from "../../assets/icons/Arrow.svg";
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
  callSetContract,
  callAddCommentContract,
  callGetContract,
  callGetContractComment,
  callAddDocumentContractId,
  callGetPropertyTypes,
  callGetRequestAdvancePymtPlan,
  callGetRequestAdvancePymtById,
  callGetRequestAdvancePymtProperties,
  callUpdateRequestAdvancePym,
  callUpdateInvitation,
  callForgiveInterest,
} from "../../utils/actions/actions";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import { API_CONSTANTS, HEADER } from "../../utils/constants/apiConstants";
import ENVIROMENT from "../../utils/constants/enviroments";
import SectionCardTenant from "./sections/sectionCardTenants";
import SectionStatsChart from "./sections/sectionStatsChart";
import SectionAddProperty from "./sections/sectionAddProperty";
import SectionAddTenant from "./sections/sectionAddTenant";
import SectionAdvancement from "./sections/sectionAdvancement";
import SectionContractAvailable from "../Tenant/sections/sectionContractAvailableOwner";
import CustomViewDocument from "../../components/CustomViewDocument";
import CustomDialog from "../../components/CustomDialog";
import CustomSignatureContract from "../../components/customSignatureContract";

const { Content } = Layout;

const Owner = (props) => {
  const {
    dataProfile,
    setDataUserProfile,
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
    callSetContract,
    callAddCommentContract,
    callGetContract,
    callGetContractComment,
    callAddDocumentContractId,
    callGetPropertyTypes,
    callGetRequestAdvancePymtPlan,
    callGetRequestAdvancePymtById,
    callGetRequestAdvancePymtProperties,
    callUpdateRequestAdvancePym,
    callUpdateInvitation,
    callForgiveInterest,
  } = props;
  const [dataDocument, setDataDocument] = useState({});
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [dataCustomer, setDataCustomer] = useState({});
  const [dataStatsChart, setDataStatsChart] = useState([]);
  const [dataCatalogProperty, setDataCatalogProperty] = useState([]);
  const [dataPersonType, setDataPersonType] = useState([]);
  const [dataDepartment, setDataDepartment] = useState([]);
  const [dataAdvancePymtPlan, setDataAdvancePymtPlan] = useState([]);
  const [dataAdvancePymtPlanTable, setDataAdvancePymtPlanTable] = useState([]);
  const [dataZipCodeAdress, setDataZipCodeAdress] = useState({});
  const [dataZipCatalog, setDataZipCatalog] = useState([]);
  const [dataTenant, setDataTenant] = useState([]);
  const [dataBank, setDataBank] = useState([]);
  const [dataPropertyTypes, setDataPropertyTypes] = useState([]);
  const [dataGetContract, setDataGetContract] = useState([]);
  const [tenantCoincidences, setTenantCoincidences] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleTenant, setIsModalVisibleTenant] = useState(false);
  const [isVisibleContract, setIsVisibleContract] = useState(false);
  const [isVisibleContractAdvancement, setIsVisibleContractAdvancement] =
    useState(false);
  const [isModalVisibleAdvancement, setIsModalVisibleAdvancement] =
    useState(false);
  const [finishCallApis, setFinishCallApis] = useState(false);
  const [spinVisible, setSpinVisible] = useState(false);
  const [urlContract, setUrlContract] = useState({});
  const [dataPaymentDescription, setDataPaymentDescription] = useState({});
  const [howToPay, setHowToPay] = useState(false);
  const [selectMethodPayment, setSelectMethodPayment] = useState(false);

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
        style={{
          fontFamily: "Poppins",
          fontSize: "12px",
          color: "var(--color-primary)",
        }}
      >
        Solicitud Póliza Homify Propietario
      </div>
    ),
    duration: 0,
    style: { marginTop: "4vw" },
  };

  const handlerCallUpdateRequestAdvancePym = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callUpdateRequestAdvancePym(
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
      throw error;
    }
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
        setDataUserProfile({
          ...dataProfile,
          idContract: responseResult.idContract,
          idCustomerTF: responseResult.idCustomer,
          idCustomerTenantTF: null,
        });
        notification.open(args);
      }
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetRequestAdvancePymtProperties = async (id, data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetRequestAdvancePymtProperties({
        ...data,
        idRequestAdvancePymt: id,
        idSystemUser,
        idLoginHistory,
      });
      const responseResult =
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      return responseResult;
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetRequestAdvancePymtById = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetRequestAdvancePymtById({
        idRequestAdvancePymt: id,
        idSystemUser,
        idLoginHistory,
        topIndex: 0,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response[0]) === false &&
        isNil(response.response[0]) === false &&
        isEmpty(response.response[0][0]) === false
          ? response.response[0][0]
          : {};
      return responseResult;
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
          : [];
      setTenantCoincidences(responseResult);
      const findRequieresSignature = responseResult.find((row) => {
        return row.requiresSignatureForAdvancePymt === true;
      });
      if (
        isNil(findRequieresSignature) === false &&
        isEmpty(findRequieresSignature) === false &&
        isNil(findRequieresSignature.requiresSignatureForAdvancePymt) ===
          false &&
        findRequieresSignature.requiresSignatureForAdvancePymt === true
      ) {
        const dataDetail = await handlerCallGetRequestAdvancePymtById(
          findRequieresSignature.idRequestAdvancePymt
        );
        if (dataDetail.canContractBeGenerated === true) {
          const {
            idDocument,
            idDocumentType,
            idPreviousDocument,
            bucketSource,
            idRequestAdvancePymt,
            idRequestAdvancePymtStatus,
          } = dataDetail;
          const dataViewDocument =
            await handlerCallGetRequestAdvancePymtProperties(
              idRequestAdvancePymt,
              {
                idDocument,
                idDocumentType,
                idPreviousDocument,
                bucketSource,
              }
            );
          if (
            isNil(dataViewDocument) === false &&
            isEmpty(dataViewDocument) === false
          ) {
            setUrlContract({
              ...dataViewDocument,
              idRequestAdvancePymt: idRequestAdvancePymt,
              idRequestAdvancePymtStatus: idRequestAdvancePymtStatus,
            });
            setIsVisibleContractAdvancement(true);
          }
        }
      }
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
    } catch (error) {
      setSpinVisible(false);
      showMessageStatusApi(
        isNil(error) === false
          ? error
          : "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
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
      showMessageStatusApi(error, GLOBAL_CONSTANTS.STATUS_API.ERROR);
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
        setDataGetContract(responseResult);
        if (isEmpty(responseResult) === false && data.process === true) {
          handlerCallAddDocumentContractId(
            {
              type: data.type,
              idContract: responseResult.idContract,
            },
            responseResult.idDocument
          );
        }
      } else {
        const { token } = dataProfile;
        const response = await fetch(
          `${ENVIROMENT}${API_CONSTANTS.GET_CONTRACT}`,
          {
            method: "POST",
            body: JSON.stringify({
              ...data,
              idSystemUser,
              idLoginHistory,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        if (isNil(response.status) === false && response.status !== 200) {
          const responseResult = await response.json();
          const responseText =
            isNil(responseResult) === false &&
            isNil(responseResult.response) === false &&
            isNil(responseResult.response.statusText) === false
              ? responseResult.response.statusText
              : "";
          throw responseText;
        }
        const label = `${name}_${moment().format("YYYYMMDD-HHmm")}`;
        const blob = await response.blob();
        const link = document.createElement("a");
        link.className = "download";
        link.download = `${label}.${"docx"}`;
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        link.parentElement.removeChild(link);
      }
    } catch (error) {
      showMessageStatusApi(
        isNil(error) === false && isEmpty(error) === false
          ? error
          : "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallAddCommentContract = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callAddCommentContract(
        {
          ...data,
          idSystemUser,
          idLoginHistory,
        },
        data.idContract
      );
      showMessageStatusApi(
        "Tu comentario se envió correctamente",
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
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

  const handlerCallGetPropertyTypes = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetPropertyTypes({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      setDataPropertyTypes(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetRequestAdvancePymtPlan = async (data) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetRequestAdvancePymtPlan({
        ...data,
        idCustomer,
        idSystemUser,
        idLoginHistory,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];

      const responseResultData =
        isEmpty(responseResult) === false &&
        isNil(responseResult[0]) === false &&
        isNil(responseResult[0][0]) === false
          ? responseResult[0][0]
          : {};

      const responseResultTable =
        isEmpty(responseResult) === false && isNil(responseResult[1]) === false
          ? responseResult[1]
          : [];

      setDataAdvancePymtPlan(responseResultData);
      setDataAdvancePymtPlanTable(responseResultTable);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallUpdateInvitation = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callUpdateInvitation(
        {
          ...data,
          idSystemUser,
          idLoginHistory,
        },
        id
      );
      showMessageStatusApi(
        "¡Muy bien! se envió el recordatorio con éxito",
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

  const handlerCallForgiveInterest = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callForgiveInterest(
        {
          ...data,
          idSystemUser,
          idLoginHistory,
        },
        id
      );
      showMessageStatusApi(
        "¡Muy bien! se han condonado los intereses",
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

  const handlerCalllSyncApis = async () => {
    await handlerCallGetAllCustomerById();
    await handlerCallGetTenantCoincidences();
    await handlerCallGetCallGetStatsChart();
    setFinishCallApis(true);
  };

  const copiarAlPortapapeles = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {}

    document.body.removeChild(textArea);
  };

  const copyTextToClipboard = (num) => {
    if (!navigator.clipboard) {
      copiarAlPortapapeles(num);
      return;
    }
    navigator.clipboard.writeText(num).then(
      () => {
        showMessageStatusApi(
          "CLABE copiada correctamente",
          GLOBAL_CONSTANTS.STATUS_API.SUCCESS
        );
      },
      (err) => {}
    );
  };

  const parseNumberClabe = (num) => {
    let numClabe = "";
    if (isNil(num) === false) {
      const num1 = num.slice(0, 4);
      const num2 = num.slice(4, 8);
      const num3 = num.slice(8, 12);
      const num4 = num.slice(12, 16);
      const num5 = num.slice(16, 18);
      numClabe = `${num1} ${num2} ${num3} ${num4} ${num5}`;
    }
    return numClabe;
  };

  useEffect(() => {
    handlerCalllSyncApis();
  }, []);

  return (
    <Content>
      <CustomDialog
        isVisibleDialog={howToPay}
        onClose={() => {
          setHowToPay(false);
          setSelectMethodPayment(false);
        }}
      >
        {selectMethodPayment === false &&
          isEmpty(dataPaymentDescription) === false && (
            <div className="banner-payment-rent">
              <div className="title-banner">
                <h1>Pago de adelanto de renta</h1>
              </div>
              <div className="amount-to-pay">
                <span>Monto a pagar</span>
                <strong>{dataPaymentDescription.totalAmountFormat}</strong>
              </div>
              <div
                style={{
                  fontSize: 12,
                  display: "flex",
                  alignItems: "flex-end",
                  flexDirection: "column",
                  margin: "5px 0px 20px 0px",
                }}
              >
                <div>
                  <span>Próximo pago: </span>
                  <strong>{dataPaymentDescription.paymentAmountFormat}</strong>
                </div>
                <div>
                  <span>Interés: </span>
                  <strong>
                    {dataPaymentDescription.interestArrearsAmountFormat}
                  </strong>
                </div>
              </div>

              <div className="date-payment">
                Fecha límite de pago{" "}
                <strong>- {dataPaymentDescription.paydayLimit}</strong>
              </div>
              <div className="date-payment">
                Pago{" "}
                <strong>- {dataPaymentDescription.paymentNoDescription}</strong>
              </div>
              <div style={{ textAlign: "center", margin: "4em 0px 15px 0px" }}>
                <p>Método de pago</p>
              </div>
              <div className="section-method-payment">
                <div className="card-icon">
                  <i
                    className="fa fa-clock-o"
                    style={{ fontSize: 18, color: "#6E7191" }}
                  />
                </div>
                <div
                  className="card-info-method"
                  onClick={() => {
                    setSelectMethodPayment(true);
                  }}
                >
                  <strong>Pago por transferencia SPEI</strong>
                  <span>Normalmente se refleja en minutos</span>
                </div>
              </div>
              <div
                className="two-action-buttons-banner"
                style={{ marginTop: 20 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setHowToPay(false);
                  }}
                >
                  <span>Salir</span>
                </button>
              </div>
            </div>
          )}
        {selectMethodPayment === true && (
          <div className="banner-payment-rent">
            <button
              style={{
                position: "absolute",
                left: 0,
                top: 10,
                border: "none",
                background: "transparent",
              }}
              type="button"
              onClick={() => {
                setSelectMethodPayment(false);
              }}
            >
              <img src={Arrow} alt="backTo" width="30" />
            </button>
            <div className="title-banner">
              <h1>Transferencia SPEI</h1>
            </div>
            <div style={{ margin: "15px 0px" }}>
              <span>
                1. Inicia una transferencia desde tu banca en línea o app de tu
                banco.
              </span>
            </div>
            <div style={{ margin: "15px 0px" }}>
              <span>2. Ingresa los siguientes datos:</span>
            </div>
            <div className="section-method-payment-v2">
              <div className="card-info-method">
                <strong>Nombre del beneficiario</strong>
                <span>{dataPaymentDescription.accountHolder}</span>
              </div>
            </div>
            <div className="section-method-payment-v2">
              <div className="card-info-method">
                <strong>CLABE Interbancaria</strong>
                <span id="interbank-clabe">
                  {parseNumberClabe(dataPaymentDescription.clabe)}
                </span>
              </div>
              <div className="card-icon">
                <i
                  className="fa fa-clone"
                  style={{ fontSize: 18, color: "#6E7191", cursor: "pointer" }}
                  onClick={() => {
                    copyTextToClipboard(dataPaymentDescription.clabe);
                  }}
                />
              </div>
            </div>
            <div
              className="section-method-payment-v2"
              style={{
                borderBottom: "1px solid #d6d8e7",
              }}
            >
              <div className="card-info-method">
                <strong>Banco</strong>
                <span>{dataPaymentDescription.bankName}</span>
              </div>
            </div>
            <div style={{ margin: "15px 0px" }}>
              <span>
                3. Ingresa el monto a pagar y finaliza la operación. Puedes
                guardar tu comprobante de pago o una captura de pantalla en caso
                de requerir alguna aclaración.
              </span>
            </div>
            {/* <div style={{ margin: "15px 0px" }}>
              <strong>
                Nota: Para que tu pago sea procesado el mismo dia, realizalo en
                un horario de 6 A.M. a 6 P.M.
              </strong>
            </div> */}
            <div style={{ margin: "15px 0px", textAlign: "center" }}>
              <strong style={{ color: "var(--color-primary)" }}>
                ¡Listo! Finalmente recibirás una notificación por tu pago
              </strong>
            </div>
          </div>
        )}
      </CustomDialog>
      <CustomDialog
        isVisibleDialog={isVisibleContractAdvancement}
        onClose={() => {
          setIsVisibleContractAdvancement(!isVisibleContractAdvancement);
        }}
      >
        <div className="banner-move-tenant">
          <CustomSignatureContract
            srcIframe={`https://docs.google.com/gview?url=${ENVIROMENT}${urlContract.url}&embedded=true`}
            cancelButton={() => {
              setIsVisibleContractAdvancement(false);
            }}
            finishButton={() => {
              setIsVisibleContractAdvancement(false);
            }}
            titleCustom="Contrato de adelanto de renta"
            titleSectionSignature="Firma de Contrato"
            componentTerms={
              <span
                style={{
                  marginLeft: 5,
                  textAlign: "center",
                  fontSize: 10,
                  color: "black",
                  marginBottom: 10,
                }}
              >
                Acepto los términos publicados en la pagina{" "}
                <a
                  href="https://www.homify.ai/aviso-de-privacidad"
                  target="__blank"
                >
                  https://www.homify.ai/aviso-de-privacidad
                </a>{" "}
                así como lo descrito en el contrato
              </span>
            }
            name={urlContract.fullNameTenant}
            onSignContract={async (data) => {
              try {
                await handlerCallUpdateRequestAdvancePym(
                  {
                    ...data,
                    idRequestAdvancePymtStatus:
                      urlContract.idRequestAdvancePymtStatus,
                  },
                  urlContract.idRequestAdvancePymt
                );
                handlerCallGetTenantCoincidences();
              } catch (error) {
                throw error;
              }
            }}
          />
        </div>
      </CustomDialog>
      <CustomViewDocument
        isVisibleModal={isVisibleModal}
        dataDocument={dataDocument}
        onClose={() => {
          setIsVisibleModal(false);
        }}
      />
      <SectionContractAvailable
        dataProfile={dataProfile}
        isModalVisible={isVisibleContract}
        onClose={() => {
          setIsVisibleContract(!isVisibleContract);
        }}
        dataGetContract={dataGetContract}
        onAddCommentContract={(data) => {
          handlerCallAddCommentContract(data);
        }}
        onVisualiceDocument={async (data) => {
          try {
            await handlerCallGetContract(data);
          } catch (error) {
            throw error;
          }
        }}
        onDownloadDocument={async (data, name) => {
          try {
            await handlerCallGetContract(data, name);
          } catch (error) {
            throw error;
          }
        }}
        onAcceptContract={async (data) => {
          try {
            await handlerCallSetContract(data);
          } catch (error) {}
        }}
        onFinishContractFlow={() => {
          handlerCalllSyncApis();
        }}
      />
      <SectionAddProperty
        dataPropertyTypes={dataPropertyTypes}
        spinVisible={spinVisible}
        isModalVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
        onClickAddProperty={async (data) => {
          setSpinVisible(true);
          await handlerCallAddProperty(data);
          await handlerCallGetAllCustomerById();
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
          setDataAdvancePymtPlan({});
          setDataAdvancePymtPlanTable([]);
        }}
        onClickAdvancement={async (data) => {
          try {
            setSpinVisible(true);
            await handlerCallRequestAdvancement(data);
          } catch (error) {
            throw error;
          }
        }}
        spinVisible={spinVisible}
        dataTenant={dataTenant}
        dataBank={dataBank}
        dataAdvancePymtInfo={dataAdvancePymtPlan}
        dataAdvancePymtTable={dataAdvancePymtPlanTable}
        onCallAdvancePymtPlan={handlerCallGetRequestAdvancePymtPlan}
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
            {(dataCustomer.canRequestAdvanceRent === 1 ||
              dataCustomer.canRequestAdvanceRent === true) && (
              <div className="button_init_primary">
                <button
                  type="button"
                  onClick={async () => {
                    setIsModalVisibleAdvancement(!isModalVisibleAdvancement);
                    await handlerCallTenantCatalog();
                  }}
                >
                  <span>¡Necesito un adelanto de mi renta!</span>
                </button>
              </div>
            )}
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
            <h2>{dataCustomer.totalRentAmountFormat}</h2>
            <span>
              Total de pagos Adelanto de renta ({dataCustomer.totalPendingRents}
              )
            </span>
          </div>
        </div>
        <div className="main-information-user">
          <SectionStatsChart
            dataStatsChart={dataStatsChart}
            finishCallApis={finishCallApis}
          />
          <SectionCardTenant
            onUpdateInvitation={async (data, id) => {
              try {
                await handlerCallUpdateInvitation(data, id);
                handlerCalllSyncApis();
              } catch (error) {
                throw error;
              }
            }}
            onForgiveInterest={async (data, id) => {
              try {
                await handlerCallForgiveInterest(data, id);
              } catch (error) {}
            }}
            dataCustomer={dataCustomer}
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
            onOpenContract={(data) => {
              handlerCallGetContract({
                download: false,
                process: false,
                url: null,
                idCustomer: data.idCustomer,
                idCustomerTenant: data.idCustomerTenant,
                idContract: data.idContract,
                type: 1,
              });
              setIsVisibleContract(!isVisibleContract);
            }}
            onViewDocument={(data) => {
              setDataDocument(data);
              setIsVisibleModal(true);
            }}
            onOpenDetailPayment={(data) => {
              setDataPaymentDescription(data);
              setHowToPay(true);
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
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
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
  callSetContract: (data, id) => dispatch(callSetContract(data, id)),
  callAddCommentContract: (data, id) =>
    dispatch(callAddCommentContract(data, id)),
  callGetContract: (data) => dispatch(callGetContract(data)),
  callGetContractComment: (data) => dispatch(callGetContractComment(data)),
  callAddDocumentContractId: (data, id) =>
    dispatch(callAddDocumentContractId(data, id)),
  callGetPropertyTypes: (data) => dispatch(callGetPropertyTypes(data)),
  callGetRequestAdvancePymtPlan: (data) =>
    dispatch(callGetRequestAdvancePymtPlan(data)),
  callGetRequestAdvancePymtById: (data) =>
    dispatch(callGetRequestAdvancePymtById(data)),
  callGetRequestAdvancePymtProperties: (data) =>
    dispatch(callGetRequestAdvancePymtProperties(data)),
  callUpdateRequestAdvancePym: (data, id) =>
    dispatch(callUpdateRequestAdvancePym(data, id)),
  callUpdateInvitation: (data, id) => dispatch(callUpdateInvitation(data, id)),
  callForgiveInterest: (data, id) => dispatch(callForgiveInterest(data, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Owner);
