import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Layout,
  Avatar,
  Rate,
  notification,
  message,
  Dropdown,
  Menu,
  Button,
  Alert,
} from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { UserOutlined } from "@ant-design/icons";
import IconCalendar from "../../assets/icons/Calendar.svg";
import IconWallet from "../../assets/icons/wallet.svg";
import IconDanger from "../../assets/icons/Danger.svg";
import FileReport from "../../assets/icons/FileReport.svg";
import MessagesIcon from "../../assets/icons/MessagesIcon.svg";
import DocumentsIcon from "../../assets/icons/DocumentsIcon.svg";
import Arrow from "../../assets/icons/Arrow.svg";
import Tools from "../../assets/icons/Tools.svg";
import Transport from "../../assets/icons/Transport.svg";
import SectionContractAvailable from "./sections/sectionContractAvailableOwner";
import SectionDepositGuarantee from "./sections/sectionDepositGuarantee";
import FrontFunctions from "../../utils/actions/frontFunctions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import { API_CONSTANTS, HEADER } from "../../utils/constants/apiConstants";
import ENVIROMENT from "../../utils/constants/enviroments";
import {
  callGetAllCustomerTenantDashboardById,
  callSetContract,
  callAddDocument,
  callAddCommentContract,
  callGetContract,
  callGetContractComment,
  callGetCustomerMessage,
  callAddCustomerMessage,
  callAddDocumentContractId,
  callGetPaymentContract,
  callGetPaymentTypes,
  callGetAllProviders,
  callAddRequestProviderForTenant,
  callUpdateMovingDialog,
  callGetAllIncidenceTypes,
  callAddIncidence,
  callGetAllIncidenceCoincidences,
  callGetIncidenceById,
  callUpdateIncidence,
  callGetRequestProviderPropierties,
  callSignRequestForProvider,
  callPostPaymentService,
  callUpdateInvitation,
  callGetCustomerLoan,
  callUpdateCustomerLoan,
  callGetCustomerLoanProperties,
  callGetAllBankCatalog,
  callGetTransactionsByUser,
} from "../../utils/actions/actions";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";
import SectionMessages from "./sectionDocuments/sectionMessages";
import SectionRegisterPayment from "./sectionDocuments/sectionRegisterPayment";
import CustomViewDocument from "../../components/CustomViewDocument";
import SectionRequestService from "./sections/sectionRequestService";
import CustomDialog from "../../components/CustomDialog";
import CustomContentActions from "../../components/CustomContentActions";
import SectionIncidenceReport from "./sections/sectionIncidenceReport";
import SectionDetailIncidence from "./sections/sectionDetailIncidence";
import CustomSignatureContract from "../../components/customSignatureContract";
import CustomCheckPayment from "../TypeForm/sections/customCheckPayment";
import SectionStatsMovements from "../Owner/sections/sectionStatsMovements";

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Poppins",
    },
  ],
};

const { Content } = Layout;

const Tenant = (props) => {
  const {
    history,
    callGetAllCustomerTenantById,
    dataProfile,
    callAddDocument,
    callAddIncidence,
    callGetPaymentTypes,
    callGetPaymentContract,
    setDataUserProfile,
    callSetContract,
    callAddCommentContract,
    callAddRequestProviderForTenant,
    callGetContract,
    callGetContractComment,
    callGetAllProviders,
    callGetCustomerMessage,
    callAddCustomerMessage,
    callAddDocumentContractId,
    callUpdateMovingDialog,
    callGetAllIncidenceTypes,
    callGetAllIncidenceCoincidences,
    callGetIncidenceById,
    callUpdateIncidence,
    callGetRequestProviderPropierties,
    callSignRequestForProvider,
    callPostPaymentService,
    callGetCustomerLoan,
    callUpdateCustomerLoan,
    callGetCustomerLoanProperties,
    callGetAllBankCatalog,
    callUpdateInvitation,
    callGetTransactionsByUser,
  } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVisibleBannerMove, setIsVisibleBannerMove] = useState(false);
  const [isVisibleDetailIncidence, setIsVisibleDetailIncidence] =
    useState(false);
  const [dataProviders, setDataProviders] = useState([]);
  const [dataIncidenceTypes, setDataIncidenceTypes] = useState([]);
  const [dataIncideCoincidence, setDataIncideCoincidence] = useState([]);
  const [isVisibleRequestService, setIsVisibleRequestService] = useState(false);
  const [dataDocument, setDataDocument] = useState({});
  const [dataIncidenceDetail, setDataIncidenceDetail] = useState({});
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [dataPayments, setDataPayments] = useState([]);
  const [isVisibleMessages, setIsVisibleMessages] = useState(false);
  const [isVisiblePaymentRent, setIsVisiblePaymentRent] = useState(false);
  const [isVisibleIncidence, setIsVisibleIncidence] = useState(false);
  const [isVisibleOpenPayment, setIsVisibleOpenPayment] = useState(false);
  const [idTopIndexMessage, setIdTopIndexMessage] = useState(-1);
  const [dataTenant, setDataTenant] = useState([]);
  const [dataMessages, setDataMessages] = useState([]);
  const [dataGetContract, setDataGetContract] = useState([]);
  const [spinVisible, setSpinVisible] = useState(false);
  const [isModalVisiblePolicy, setIsModalVisiblePolicy] = useState(false);
  const [isHowAreYou, setIsHowAreYou] = useState(false);
  const [dataLoan, setDataLoan] = useState({});
  const [urlContract, setUrlContract] = useState({});
  const [dataBank, setDataBank] = useState([]);
  const [dataPaymentDescription, setDataPaymentDescription] = useState({});
  const [howToPay, setHowToPay] = useState(false);
  const [selectMethodPayment, setSelectMethodPayment] = useState(false);
  const [viewDetailPayRent, setViewDetailPayRent] = useState(false);
  const [isOpenTypeForm, setIsOpenTypeForm] = useState({
    openModal: false,
    openPayment: false,
  });
  const [dataInvPayment, setDataInvPayment] = useState({ openModal: false });
  const [dataTransactions, setDataTransactions] = useState([]);
  const frontFunctions = new FrontFunctions();
  const stripePromise = loadStripe(dataProfile.publicKeyStripe);

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

  const handlerCallGetCustomerLoanProperties = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetCustomerLoanProperties({
        ...data,
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
      throw error;
    }
  };

  const handlerCallBankCatalog = async (clabe = null) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllBankCatalog({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        type: 1,
        clabe,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataBank(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetRequestProviderPropierties = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetRequestProviderPropierties({
        idSystemUser,
        idLoginHistory,
        idRequestForProvider: id,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      await setUrlContract(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetCustomerLoan = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetCustomerLoan({
        idSystemUser,
        idLoginHistory,
        idContract: id,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : {};
      setDataLoan(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetCustomerMessage = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetCustomerMessage({
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

  const handlerCallAddCustomerMessage = async (data, data2) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callAddCustomerMessage({
        idSystemUser,
        idLoginHistory,
        ...data2,
        ...data,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      handlerCallGetCustomerMessage(data2);
    } catch (error) {
      showMessageStatusApi(
        isNil(error) === false
          ? error
          : "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllIncidenceCoincidences = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllIncidenceCoincidences({
        idContract: id,
        idSystemUser,
        idLoginHistory,
        topIndex: null,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataIncideCoincidence(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllPaymentTypes = async (data) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetPaymentTypes({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        ...data,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataPayments(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallAddIncidence = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callAddIncidence({
        idSystemUser,
        idLoginHistory,
        ...data,
      });
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

  const handlerCallUpdateMovingDialog = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callUpdateMovingDialog({
        idSystemUser,
        idLoginHistory,
        ...data,
      });
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllCustomerTenantById = async () => {
    const { idCustomer, idSystemUser, idLoginHistory, idCustomerTenant } =
      dataProfile;
    try {
      const response = await callGetAllCustomerTenantById({
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
      setDataTenant(responseResult);
      setDataPaymentDescription(
        isNil(responseResult.paymentDescription) === false
          ? JSON.parse(responseResult.paymentDescription)
          : {}
      );
      if (
        isEmpty(responseResult) === false &&
        isNil(responseResult.requiresInvPayment) === false &&
        responseResult.requiresInvPayment == 1
      ) {
        setDataInvPayment({
          openModal: true,
          invTransferInfo:
            isNil(responseResult.invTransferInfo) === false &&
            isEmpty(responseResult.invTransferInfo) === false
              ? JSON.parse(responseResult.invTransferInfo)
              : {},
          invAmount: responseResult.invAmount,
          invAmountFormat: responseResult.invAmountFormat,
          shortName: responseResult.shortNameTenant,
          idOrderPayment: responseResult.idOrderPaymentForInv,
        });
      }
      handlerCallGetCustomerMessage({
        idContract: responseResult.idContract,
        idCustomerTenant: responseResult.idCustomerTenant,
        idCustomer: responseResult.idCustomer,
      });
      handlerCallGetAllPaymentTypes({
        type: 1,
        idContract: responseResult.idContract,
        idCustomerTenant: responseResult.idCustomerTenant,
      });
      setIsVisibleBannerMove(
        isEmpty(responseResult) === false &&
          isNil(responseResult.showDialog) == false &&
          responseResult.showDialog === 1
          ? true
          : false
      );
      setIsVisibleOpenPayment(
        isEmpty(responseResult) === false &&
          isNil(responseResult.requiresPaymentToMove) == false &&
          responseResult.requiresPaymentToMove === true
          ? true
          : false
      );
      setIsModalVisiblePolicy(
        isEmpty(responseResult) === false &&
          isNil(responseResult.canAcceptLoan) == false &&
          responseResult.canAcceptLoan === true
          ? true
          : false
      );
      if (
        isEmpty(responseResult) === false &&
        isNil(responseResult.canAcceptLoan) == false &&
        responseResult.canAcceptLoan === true
      ) {
        await handlerCallGetCustomerLoan(responseResult.idContract);
      }
      if (
        isEmpty(responseResult) === false &&
        isNil(responseResult.requieresMoveSignature) === false &&
        (responseResult.requieresMoveSignature === true ||
          responseResult.requieresMoveSignature === 1) &&
        responseResult.requiresPaymentToMove === false
      ) {
        await handlerCallGetRequestProviderPropierties(
          responseResult.idRequestForProvider
        );
        setIsVisibleBannerMove(
          responseResult.requieresMoveSignature === 1 ||
            responseResult.requieresMoveSignature === true
            ? true
            : false
        );
      }
      if (
        isEmpty(responseResult) === false &&
        isNil(responseResult.isTypeFormCompleted) === false &&
        responseResult.isTypeFormCompleted === false
      ) {
        setDataUserProfile({
          ...dataProfile,
          idCustomerTenantTF: responseResult.idCustomerTenant,
          idCustomerTF: responseResult.idCustomer,
          idContract: responseResult.idContract,
        });
        setIsOpenTypeForm({
          openModal: true,
          openPayment: responseResult.requiresPayment,
        });
      } else {
        await handlerCallGetAllProviders(responseResult.idContract);
        await handlerCallGetAllIncidenceTypes(responseResult.idContract);
        await handlerCallGetAllIncidenceCoincidences(responseResult.idContract);
        setDataUserProfile({
          ...dataProfile,
          idContract: responseResult.idContract,
        });
      }
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllPaymentContract = async (data) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callGetPaymentContract({
        ...data,
        idCustomer,
        idSystemUser,
        idLoginHistory,
      });
      handlerCallGetAllCustomerTenantById();
      setSpinVisible(false);
    } catch (error) {
      setSpinVisible(false);
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetIncidenceById = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetIncidenceById({
        idSystemUser,
        idLoginHistory,
        idIncidence: id,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : {};
      setDataIncidenceDetail(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
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

  const handlerCallAddRequestProviderForTenant = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callAddRequestProviderForTenant(
        {
          ...data,
          idSystemUser,
          idLoginHistory,
        },
        id
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
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Credentials": true,
            },
          }
        );
        if (isNil(response.status) === false && response.status !== 200) {
          throw isNil(response.statusText) === false ? response.statusText : "";
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
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerAddDocument = async (data, type) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    const dataDocument = {
      documentName: data.name,
      extension: data.type,
      preview: null,
      thumbnail: null,
      idDocumentType: type.idPaymentType,
      idCustomer,
      idSystemUser,
      idLoginHistory,
    };
    try {
      const response = await callAddDocument(
        data.originFileObj,
        dataDocument,
        () => {}
      );
      const documentId =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.idDocument) === false
          ? response.response.idDocument
          : null;
      return Promise.resolve(documentId);
    } catch (error) {
      setSpinVisible(false);
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
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
        "Tu comentario se envio correctamente",
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

  const handlerCallUpdateIncidence = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callUpdateIncidence(
        {
          ...data,
          idSystemUser,
          idLoginHistory,
        },
        id
      );
      showMessageStatusApi(
        "Se envío correctamente tu comentario",
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

  const handlerCallSignRequestForProvider = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callSignRequestForProvider(
        {
          ...data,
          idSystemUser,
          idLoginHistory,
        },
        id
      );
      showMessageStatusApi(
        "¡Muy bien! has completado el proceso del servicio de mudanza, pronto estaremos contigo",
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

  const handlerCallUpdateCustomerLoan = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callUpdateCustomerLoan(
        {
          ...data,
          idSystemUser,
          idLoginHistory,
        },
        id
      );
      // showMessageStatusApi(
      //   "En breve realizaremos el deposito en garantía a tu propietario",
      //   GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      // );
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

  const handlerCallUpdateInvitation = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callUpdateInvitation(
        {
          requestResend: true,
          isActive: true,
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

  const handlerCallGetAllIncidenceTypes = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllIncidenceTypes({
        idContract: id,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      setDataIncidenceTypes(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllProviders = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllProviders({
        idContract: id,
        idSystemUser,
        idLoginHistory,
        type: 1,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : {};
      setDataProviders(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetTransactionsByUser = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetTransactionsByUser({
        idSystemUser,
        idLoginHistory,
      });

      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataTransactions(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
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
    handlerCallGetAllCustomerTenantById();
    handlerCallGetTransactionsByUser();
  }, []);

  return (
    <Content>
      <CustomDialog
        isVisibleDialog={dataInvPayment.openModal}
        onClose={() => {
          setDataInvPayment({ ...dataInvPayment, openModal: false });
        }}
      >
        {isEmpty(dataInvPayment) === false &&
          isNil(dataInvPayment.invTransferInfo) === false && (
            <div className="banner-move-tenant">
              <h1>Pago de investigación</h1>
              <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
                <div
                  className="checkout-payment-hfy"
                  style={{ background: "#fff" }}
                >
                  <CustomCheckPayment
                    callPostPaymentServices={callPostPaymentService}
                    dataProfile={dataProfile}
                    totalPolicy={dataInvPayment.invAmount}
                    totalPolicyFormat={dataInvPayment.invAmountFormat}
                    onRedirect={() => {
                      handlerCallGetAllCustomerTenantById();
                      handlerCallGetTransactionsByUser();
                      setDataInvPayment({
                        ...dataInvPayment,
                        openModal: false,
                      });
                    }}
                    idOrderPayment={dataInvPayment.idOrderPayment}
                    stpPayment={true}
                    clabe={dataInvPayment.invTransferInfo.clabe}
                    bankName={dataInvPayment.invTransferInfo.bankName}
                    accountHolder={dataInvPayment.invTransferInfo.accountHolder}
                  />
                </div>
              </Elements>
              <div
                className="two-action-buttons-banner"
                style={{ marginTop: 20 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setDataInvPayment({ ...dataInvPayment, openModal: false });
                  }}
                >
                  <span>Salir</span>
                </button>
              </div>
            </div>
          )}
      </CustomDialog>
      <CustomDialog
        isVisibleDialog={isOpenTypeForm.openModal}
        onClose={() => {
          setIsOpenTypeForm({ ...isOpenTypeForm, openModal: false });
        }}
      >
        {isOpenTypeForm.openPayment === true && (
          <div className="banner-payment-rent">
            <div className="title-banner">
              <h1>Pago de Póliza Homify</h1>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 35,
              }}
            >
              <svg
                width="82"
                height="49"
                viewBox="0 0 82 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.0617 30.4055C18.0617 23.8929 17.934 17.8911 18.0617 11.8894C18.0617 9.97389 17.2955 9.46309 15.6354 9.2077C11.6768 8.56921 8.48436 10.2293 5.29193 12.2724C4.52574 12.7832 3.63186 13.294 2.86568 13.8048C1.97179 14.3156 1.07791 14.8264 0.439425 13.6771C-0.199062 12.6555 0.694819 12.1447 1.461 11.634C6.05811 8.69692 10.5275 5.24909 16.5293 6.78146C18.0617 7.16455 17.934 6.27067 18.0617 5.24909C18.3171 1.41817 19.3386 0.524292 23.1696 0.524292C40.9195 0.524292 58.6694 0.524292 76.5471 0.524292C80.378 0.524292 81.655 1.67357 81.655 5.63219C81.655 16.6142 81.655 27.5961 81.655 38.5781C81.655 42.409 80.378 43.686 76.5471 43.686C62.7558 43.686 49.0921 43.686 35.3008 43.686C33.7684 43.686 32.3638 43.686 31.0868 44.4522C21.6372 50.0709 11.6768 48.0277 1.8441 46.2399C1.07791 46.1122 0.311728 45.7291 0.439425 44.8353C0.567123 43.8137 1.461 43.5583 2.35489 43.686C5.41962 44.0691 8.48436 44.4522 11.4214 45.0907C17.2955 46.2399 22.9142 45.6014 28.4052 42.9198C31.2145 41.5151 34.1515 40.2382 36.9609 38.8335C39.004 37.9396 38.8763 36.7903 37.344 35.5134C36.1947 34.4918 34.9177 33.8533 33.2577 33.981C30.8314 34.1087 28.4052 34.1087 25.9789 34.4918C21.1264 35.1303 17.1678 33.0871 13.2092 30.6609C12.443 30.1501 12.0599 29.6393 12.443 28.8731C12.8261 27.9792 13.72 28.1069 14.3584 28.49C15.5077 29.0008 16.5293 29.6393 18.0617 30.4055ZM39.2594 41.0043C51.7738 41.0043 64.0327 41.0043 76.4194 41.0043C78.5902 41.0043 79.101 39.9828 78.9733 38.0673C78.8456 29.0008 78.8456 19.9343 78.9733 10.8678C78.9733 8.44152 78.4625 7.93072 76.0363 7.93072C59.9464 8.05842 43.8565 7.93072 27.7667 7.93072C20.3602 7.93072 20.4879 7.93074 20.3602 15.2095C20.3602 17.6357 20.9987 18.1465 23.2973 18.1465C39.7702 18.0188 56.3709 18.1465 72.8438 18.1465C73.7377 18.1465 74.5039 18.1465 75.3978 18.2742C75.9086 18.4019 76.2917 18.785 76.2917 19.4235C76.2917 20.062 75.9086 20.4451 75.3978 20.5728C74.6316 20.7005 73.7377 20.7005 72.8438 20.7005C57.9033 20.7005 42.9627 20.7005 28.0221 20.7005C25.4681 20.7005 22.148 19.5512 20.7433 21.2113C19.4663 22.6159 20.6156 25.8084 20.2325 28.2346C19.7217 31.6824 21.6372 32.0656 24.3188 31.9379C27.5113 31.8102 30.7037 31.2993 33.7684 31.5547C39.8979 31.8101 42.3242 36.4072 39.2594 41.0043ZM49.8583 5.63219C58.9248 5.63219 68.119 5.63219 77.1856 5.63219C77.824 5.63219 79.101 6.27066 79.101 4.73829C79.101 3.58901 78.3348 3.07824 77.1856 3.07824C76.5471 3.07824 75.9086 3.07824 75.2701 3.07824C58.2863 3.07824 41.4303 3.07824 24.4465 3.07824C23.0419 3.07824 20.6156 2.18435 20.7433 4.6106C20.871 6.39837 23.1696 5.50448 24.4465 5.50448C32.8746 5.63218 41.3026 5.63219 49.8583 5.63219Z"
                  fill="#4E4B66"
                />
                <path
                  d="M39.2595 41.0044C42.3242 36.4073 39.7703 31.8102 34.0239 31.5548C30.8315 31.4271 27.639 31.8102 24.5743 31.9379C22.0203 32.0656 19.9772 31.6825 20.488 28.2347C20.8711 25.8084 19.7218 22.616 20.9988 21.2113C22.4034 19.5513 25.7236 20.7005 28.2775 20.7005C43.2181 20.7005 58.1587 20.7005 73.0993 20.7005C73.9932 20.7005 74.7594 20.7005 75.6533 20.5728C76.164 20.4451 76.5471 20.062 76.5471 19.4236C76.5471 18.7851 76.164 18.402 75.6533 18.2743C74.8871 18.1466 73.9932 18.1466 73.0993 18.1466C56.6263 18.1466 40.0257 18.1466 23.5527 18.1466C21.2542 18.1466 20.6157 17.6358 20.6157 15.2096C20.7434 7.9308 20.6157 7.93079 28.0221 7.93079C44.112 7.93079 60.2019 7.93079 76.2917 7.93079C78.718 7.93079 79.2288 8.44158 79.2288 10.8678C79.1011 19.9343 79.1011 29.0009 79.2288 38.0674C79.2288 39.9828 78.8457 41.0044 76.6748 41.0044C64.1605 41.0044 51.7738 41.0044 39.2595 41.0044ZM69.013 33.3426C72.0777 33.598 73.9932 32.0656 73.9932 29.5116C73.8655 27.0854 71.95 25.553 69.1407 25.9361C68.1191 26.0638 67.3529 25.6807 66.3313 25.8084C64.0328 26.0638 62.5004 27.2131 62.5004 29.5116C62.5004 31.8102 63.9051 33.0872 66.2036 33.3426C67.2252 33.598 68.1191 32.7041 69.013 33.3426ZM35.684 28.3624C38.3656 28.3624 41.175 28.3624 43.8566 28.3624C44.8782 28.3624 45.8998 28.3624 45.8998 26.9577C45.8998 25.9361 44.8782 25.8084 43.9843 25.8084C38.4933 25.8084 33.0023 25.8084 27.5113 25.8084C26.6175 25.8084 25.7236 25.9361 25.7236 26.9577C25.7236 28.2347 26.7451 28.2347 27.7667 28.2347C30.4484 28.3624 33.13 28.3624 35.684 28.3624ZM48.5814 30.9163C46.1551 30.9163 43.7289 30.9163 41.3026 30.9163C40.5365 30.9163 39.7703 31.1717 39.6426 32.0656C39.5149 33.0872 40.2811 33.4703 41.3026 33.4703C46.0275 33.4703 50.7523 33.4703 55.4771 33.4703C56.3709 33.4703 57.2648 33.3426 57.2648 32.1933C57.2648 31.044 56.3709 30.9163 55.4771 30.9163C53.3062 30.9163 51.0076 30.9163 48.5814 30.9163ZM52.9231 25.6807C51.5184 26.3192 48.8368 24.6591 48.8368 27.0854C48.8368 29.3839 51.5184 28.2347 53.0508 28.2347C54.5832 28.2347 57.2648 29.384 57.2648 27.2131C57.2648 24.6592 54.3278 26.4469 52.9231 25.6807ZM25.7236 13.1664C25.5959 12.2725 25.979 10.8678 24.5743 10.7401C22.7865 10.6124 23.1696 12.1448 23.1696 13.2941C23.1696 14.3157 22.9142 15.5926 24.4466 15.5926C25.8513 15.5926 25.5959 14.3157 25.7236 13.1664ZM29.5545 13.1664C29.5545 14.188 29.2991 15.4649 30.8315 15.5926C32.3638 15.5926 32.1084 14.3157 32.1084 13.2941C32.1084 12.2725 32.4915 10.7401 30.7038 10.7401C29.1714 10.8678 29.5545 12.2725 29.5545 13.1664ZM35.8117 13.1664C35.9394 13.9326 35.3009 15.5926 37.0886 15.5926C38.621 15.7203 38.3656 14.3157 38.3656 13.2941C38.3656 12.2725 38.621 10.9955 37.344 10.7401C35.8117 10.6124 35.8117 11.8894 35.8117 13.1664ZM44.7505 13.0387C44.7505 12.0171 44.8782 10.7401 43.4735 10.7401C41.9411 10.7401 42.1965 12.1448 42.1965 13.1664C42.1965 14.188 41.9411 15.5926 43.3458 15.5926C45.1336 15.7203 44.6228 14.188 44.7505 13.0387ZM48.5814 13.2941C48.5814 14.3157 48.326 15.5926 49.8584 15.5926C51.3907 15.5926 51.1353 14.188 51.1353 13.2941C51.1353 12.2725 51.5184 10.6124 49.7307 10.7401C48.1983 10.8678 48.5814 12.2725 48.5814 13.2941ZM57.5202 13.1664C57.3925 12.2725 57.7756 10.8678 56.3709 10.7401C54.8386 10.6124 54.9663 12.0171 54.9663 13.0387C54.9663 14.0603 54.5832 15.5926 56.2432 15.5926C57.7756 15.5926 57.3925 14.188 57.5202 13.1664ZM63.7774 13.1664C63.6497 12.2725 64.1605 10.7401 62.3727 10.7401C61.0957 10.7401 61.0957 11.8894 61.2234 12.911C61.2234 13.9326 60.7127 15.4649 62.3727 15.5926C64.0328 15.7203 63.7774 14.3157 63.7774 13.1664ZM70.1623 13.1664C70.0346 12.2725 70.5453 10.7401 68.7576 10.8678C67.3529 10.9955 67.6083 12.4002 67.6083 13.2941C67.6083 14.3157 67.3529 15.5926 68.8853 15.7203C70.4177 15.5926 70.1623 14.3157 70.1623 13.1664ZM76.5471 13.1664C76.4194 12.2725 76.8025 10.8678 75.3979 10.7401C73.6101 10.6124 73.9932 12.1448 73.9932 13.2941C73.9932 14.3157 73.7378 15.5926 75.2702 15.5926C76.8025 15.5926 76.5471 14.3157 76.5471 13.1664Z"
                  fill="white"
                />
                <path
                  d="M69.0131 33.3425C68.1192 32.704 67.2253 33.5979 66.2037 33.4702C63.9052 33.2148 62.5005 31.9378 62.5005 29.6392C62.5005 27.3407 64.0329 26.0637 66.3314 25.936C67.2253 25.8083 68.1192 26.3191 69.1408 26.0637C71.9501 25.5529 73.8656 27.0853 73.9933 29.6392C74.121 32.0655 72.0778 33.5978 69.0131 33.3425ZM66.9699 28.49C66.2037 28.2346 65.5652 28.49 65.3098 29.2562C65.0544 30.0223 65.6929 30.7885 66.076 30.6608C67.8638 29.8947 69.7792 31.5547 71.3116 30.0224C71.6947 29.6393 71.4393 29.0008 70.9285 28.6177C70.4177 28.2346 69.9069 28.2346 69.5238 28.49C68.63 29.1285 67.8638 29.1285 66.9699 28.49Z"
                  fill="#FF0282"
                />
                <path
                  d="M35.684 28.3623C33.0024 28.3623 30.4484 28.3623 27.7668 28.3623C26.7452 28.3623 25.7236 28.3623 25.7236 27.0853C25.7236 26.0637 26.6175 25.936 27.5114 25.936C33.0024 25.936 38.4934 25.936 43.9844 25.936C44.8782 25.936 45.7721 26.0637 45.8998 27.0853C45.8998 28.3623 44.8782 28.49 43.8567 28.49C41.175 28.3623 38.4934 28.3623 35.684 28.3623Z"
                  fill="#FF0282"
                />
                <path
                  d="M48.5814 30.9163C50.88 30.9163 53.1785 30.9163 55.4771 30.9163C56.3709 30.9163 57.2648 31.044 57.2648 32.1932C57.2648 33.2148 56.3709 33.4702 55.4771 33.4702C50.7523 33.4702 46.0275 33.4702 41.3027 33.4702C40.2811 33.4702 39.5149 33.0871 39.6426 32.0655C39.7703 31.1716 40.4088 30.9163 41.3027 30.9163C43.8566 30.9163 46.2828 30.9163 48.5814 30.9163Z"
                  fill="#FF0282"
                />
                <path
                  d="M52.9232 25.6804C54.3279 26.4466 57.2649 24.5311 57.2649 27.2128C57.2649 29.3836 54.4556 28.2343 53.0509 28.2343C51.6463 28.2343 48.9646 29.3836 48.8369 27.0851C48.8369 24.7865 51.5186 26.4466 52.9232 25.6804Z"
                  fill="#FF0282"
                />
                <path
                  d="M25.7237 13.1662C25.7237 14.3155 25.9791 15.5925 24.4467 15.5925C22.9143 15.5925 23.1697 14.1878 23.1697 13.2939C23.1697 12.2724 22.7866 10.6123 24.5744 10.74C25.9791 10.8677 25.596 12.2723 25.7237 13.1662Z"
                  fill="#FF0282"
                />
                <path
                  d="M29.5545 13.1662C29.5545 12.1447 29.2991 10.74 30.7038 10.74C32.4916 10.6123 32.1085 12.2724 32.1085 13.2939C32.1085 14.3155 32.3639 15.5925 30.8315 15.5925C29.2991 15.5925 29.5545 14.1878 29.5545 13.1662Z"
                  fill="#FF0282"
                />
                <path
                  d="M35.8116 13.1662C35.8116 11.8892 35.8116 10.6122 37.2163 10.7399C38.621 10.8676 38.2379 12.2723 38.2379 13.2939C38.2379 14.3154 38.4933 15.7201 36.9609 15.5924C35.4286 15.5924 36.067 13.9323 35.8116 13.1662Z"
                  fill="#FF0282"
                />
                <path
                  d="M44.7504 13.0385C44.6228 14.0601 45.1335 15.5925 43.3458 15.5925C41.9411 15.5925 42.1965 14.1878 42.1965 13.1662C42.1965 12.1447 41.9411 10.8677 43.4735 10.74C45.0058 10.74 44.7504 12.0169 44.7504 13.0385Z"
                  fill="#FF0282"
                />
                <path
                  d="M48.5814 13.294C48.7091 12.2724 48.326 10.8677 49.7307 10.74C51.5184 10.6123 51.1353 12.1447 51.1353 13.294C51.1353 14.3156 51.3907 15.5925 49.8584 15.5925C48.326 15.5925 48.5814 14.3156 48.5814 13.294Z"
                  fill="#FF0282"
                />
                <path
                  d="M57.5202 13.1662C57.5202 14.1878 57.7756 15.5925 56.2432 15.5925C54.4554 15.5925 54.9662 14.0601 54.9662 13.0385C54.9662 12.0169 54.8385 10.74 56.3709 10.74C57.7756 10.8677 57.3925 12.2724 57.5202 13.1662Z"
                  fill="#FF0282"
                />
                <path
                  d="M63.7774 13.1662C63.7774 14.3155 63.9051 15.7202 62.3727 15.5925C60.7126 15.4648 61.2234 13.9324 61.2234 12.9108C61.2234 12.017 61.0957 10.74 62.3727 10.74C64.1605 10.74 63.6497 12.2724 63.7774 13.1662Z"
                  fill="#FF0282"
                />
                <path
                  d="M70.1623 13.1663C70.1623 14.3155 70.4177 15.7202 68.8853 15.7202C67.353 15.7202 67.6084 14.3155 67.6084 13.294C67.6084 12.2724 67.353 10.8677 68.7576 10.8677C70.5454 10.6123 70.0346 12.2724 70.1623 13.1663Z"
                  fill="#FF0282"
                />
                <path
                  d="M76.5472 13.1662C76.5472 14.3155 76.8026 15.5925 75.2702 15.5925C73.7378 15.5925 73.9932 14.1878 73.9932 13.2939C73.9932 12.2724 73.6101 10.6123 75.3979 10.74C76.8026 10.8677 76.4195 12.2723 76.5472 13.1662Z"
                  fill="#FF0282"
                />
                <path
                  d="M66.9699 28.4899C67.8638 29.0006 68.63 29.1284 69.5239 28.6176C70.0347 28.3622 70.5455 28.3622 70.9285 28.7453C71.3116 29.1284 71.6947 29.6391 71.3116 30.1499C69.7793 31.6823 67.8638 30.0222 66.0761 30.7884C65.693 30.9161 65.0545 30.1499 65.3099 29.3838C65.5653 28.4899 66.2037 28.2345 66.9699 28.4899Z"
                  fill="white"
                />
              </svg>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0px 5px 0px",
              }}
            >
              <h1>Ingresa tu información</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: 320, textAlign: "justify" }}>
                Para finalizar con tu proceso ingresa el método de pago deseado,
                puedes pagar con tarjeta de crédito o débito, OXXO o
                transferencia bancaria.
              </div>
            </div>
            <div
              className="two-action-buttons-banner"
              style={{ marginTop: 20 }}
            >
              <button
                type="button"
                onClick={() => {
                  history.push("/websystem/typeform-user");
                }}
              >
                <span>Continuar</span>
              </button>
            </div>
          </div>
        )}
        {isOpenTypeForm.openPayment === false && (
          <div className="banner-payment-rent">
            <div className="title-banner">
              <h1>Solicitud Póliza Homify</h1>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 35,
              }}
            >
              <svg
                width="88"
                height="105"
                viewBox="0 0 88 105"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M81.7078 6.53468C75.997 6.53468 70.2235 6.28146 64.5127 6.59799C60.2453 6.85122 56.5428 6.21815 53.4677 3.05283C53.2795 2.86291 53.0285 2.7363 52.8402 2.60969C48.9493 0.204044 44.8075 -0.492327 40.4146 0.330657C36.712 1.02703 33.888 3.11614 31.0013 5.33186C29.8717 6.21815 28.6793 6.53468 27.2987 6.53468C20.2701 6.47138 13.2414 6.53468 6.2128 6.53468C1.94542 6.53468 0.0627556 8.43388 0.0627556 12.802C0.0627556 41.4165 0.125511 70.031 0 98.5822C0 102.001 1.75716 104.913 6.15005 104.913C31.1895 104.786 56.2918 104.85 81.3312 104.85C85.6614 104.85 87.4813 103.014 87.4813 98.6455C87.4813 84.275 87.4813 69.9677 87.4813 55.5972C87.4813 41.1633 87.4813 26.7927 87.4813 12.3589C87.4813 8.56049 85.5358 6.53468 81.7078 6.53468ZM30.9385 9.57339C32.6957 8.49718 34.3273 7.10444 36.0217 5.90162C40.7911 2.54638 46.8157 2.54638 51.5851 5.96493C53.7815 7.54759 55.978 9.13025 58.1117 10.7762C60.3081 12.4222 61.4377 16.5371 60.3709 19.006C59.9316 20.1456 58.9902 20.1456 58.0489 20.1456C53.2795 20.1456 48.5101 20.1456 43.6779 20.1456C38.9712 20.1456 34.2018 20.1456 29.4951 20.1456C27.4242 20.1456 27.1104 19.6391 26.8594 17.55C26.5456 13.9415 27.8635 11.4093 30.9385 9.57339ZM74.0516 76.5516C74.0516 77.5645 73.7378 77.7544 72.7965 77.7544C70.0352 77.6911 67.274 77.6911 64.5127 77.7544C61.877 77.7544 60.6219 79.0205 60.5591 81.6794C60.5591 84.4016 60.4964 87.1237 60.5591 89.9092C60.6219 91.1754 60.1826 91.3653 59.053 91.3653C44.3054 91.302 29.5579 91.302 14.8103 91.3653C13.618 91.3653 13.3669 91.0487 13.3669 89.8459C13.4297 78.5141 13.3669 67.1189 13.3669 55.7871C13.3669 44.4552 13.3669 33.0601 13.3669 21.7282C13.3669 20.5254 13.618 20.0823 14.8731 20.1456C17.446 20.2722 19.9563 20.2089 22.5293 20.1456C23.3451 20.1456 23.8471 20.2722 24.2864 21.0319C25.2277 22.6778 26.6711 23.4375 28.5538 23.4375C38.5947 23.4375 48.6356 23.4375 58.7392 23.4375C60.6846 23.4375 62.128 22.6145 63.1321 20.9052C63.4459 20.3355 63.7597 20.0823 64.45 20.0823C67.274 20.1456 70.098 20.1456 72.8592 20.0823C73.8006 20.0823 73.9261 20.4621 73.9261 21.2851C74.0516 39.7705 74.0516 58.1294 74.0516 76.5516ZM63.9479 81.7427C63.9479 81.1729 64.2617 81.1729 64.6382 81.1729C66.8347 81.1729 69.0311 81.1729 71.3531 81.1729C68.8429 83.6419 66.4582 86.0475 63.9479 88.5165C63.9479 86.2375 63.9479 84.0217 63.9479 81.7427ZM84.0925 98.5189C84.0925 101.178 83.7787 101.494 81.143 101.494C56.229 101.494 31.315 101.494 6.46382 101.494C3.70258 101.494 3.45156 101.241 3.45156 98.3923C3.45156 69.9044 3.45156 41.4165 3.45156 12.9286C3.45156 10.3331 3.82809 9.95323 6.40107 9.95323C12.6139 9.95323 18.8267 9.95323 25.2905 9.95323C24.0354 11.9157 23.5333 14.0048 23.5961 16.1573C23.5961 17.0435 22.9058 16.7903 22.4665 16.7903C19.768 16.7903 17.0695 16.7903 14.3083 16.7903C11.296 16.7903 10.1664 17.9931 10.1664 21.1585C10.1664 35.4024 10.1664 49.6463 10.1664 63.8903C10.1664 72.6899 10.1664 81.4262 10.1664 90.2258C10.1664 93.6443 11.296 94.7205 14.622 94.7205C29.8089 94.7205 44.933 94.7205 60.1198 94.7205C62.0653 94.7205 63.6342 94.0874 65.0148 92.6947C68.4663 89.1495 71.9806 85.6044 75.495 82.1225C76.8128 80.7931 77.4404 79.3371 77.4404 77.5012C77.4404 58.6359 77.4404 39.7705 77.4404 20.8419C77.4404 17.9298 76.248 16.727 73.3613 16.727C70.6 16.727 67.8388 16.727 65.0775 16.727C64.5755 16.727 63.9479 16.8536 64.0107 16.0306C64.0734 13.8782 63.6342 11.9157 62.3163 9.88992C69.1566 9.88992 75.6832 9.88992 82.2098 9.88992C83.4649 9.88992 84.1552 10.5863 84.1552 11.8524C84.1552 12.2323 84.1552 12.6121 84.1552 12.9286C84.0925 41.5431 84.0925 70.031 84.0925 98.5189Z"
                  fill="#4E4B66"
                />
                <path
                  d="M62.6928 60.9151C62.2535 60.7885 61.7514 60.7885 61.3121 60.7885C57.1703 60.7885 52.9657 60.7885 48.8238 60.7885C45.2467 60.7885 41.6697 60.7885 38.0926 60.7885C37.1513 60.7885 36.2099 60.7252 35.2686 60.8518C34.3273 60.9151 33.7625 61.4849 33.7625 62.4978C33.7625 63.5107 34.2645 64.0805 35.2686 64.1438C35.5824 64.1438 35.8961 64.1438 36.2099 64.1438C44.6192 64.1438 53.0284 64.1438 61.5004 64.1438C61.8769 64.1438 62.2535 64.1438 62.5673 64.0805C63.4458 63.9539 63.8851 63.3841 63.9479 62.6244C63.9479 61.8014 63.5713 61.1051 62.6928 60.9151Z"
                  fill="#FF0282"
                />
                <path
                  d="M33.7625 52.3053C33.7625 53.7614 34.7665 54.0779 36.0217 54.0779C39.2222 54.0779 42.36 54.0779 45.5605 54.0779C48.6355 54.0779 51.7106 54.0779 54.7856 54.0779C56.0407 54.0779 57.1703 53.9513 57.2958 52.4319C57.4213 51.2924 56.5427 50.6594 54.8483 50.6594C48.6355 50.6594 42.36 50.6594 36.1472 50.6594C34.8293 50.5961 33.7625 50.8493 33.7625 52.3053Z"
                  fill="#FF0282"
                />
                <path
                  d="M54.9739 67.5623C51.8361 67.6256 48.7611 67.5623 45.6233 67.5623C42.4228 67.5623 39.1595 67.5623 35.959 67.5623C34.7666 67.5623 33.8253 67.8155 33.7626 69.2081C33.6998 70.6641 34.7039 71.0439 35.959 71.0439C42.2973 71.0439 48.6356 71.0439 54.9739 71.0439C56.1663 71.0439 57.1076 70.7274 57.1704 69.3981C57.2331 67.9421 56.229 67.5623 54.9739 67.5623Z"
                  fill="#FF0282"
                />
                <path
                  d="M26.2318 43.8856C24.2236 44.0122 21.9644 43.3158 20.6466 45.5948C20.0818 46.6077 20.3328 47.7473 20.2073 48.8235C20.3328 49.963 19.9563 51.1658 20.5838 52.242C21.3369 53.6348 22.592 54.1412 24.0981 54.0779C26.1691 53.9513 28.6165 54.7743 29.8089 52.3053C30.7502 50.2162 30.6247 47.8739 29.8716 45.7215C29.3068 44.1388 27.8635 43.759 26.2318 43.8856ZM24.8512 51.2291C23.0313 51.2291 22.9685 51.2291 23.0313 48.5069C23.0313 46.2912 22.592 46.671 25.7925 46.6077C27.6124 46.6077 27.6124 46.6077 27.6124 48.8868C27.5497 51.2291 27.5497 51.2291 24.8512 51.2291Z"
                  fill="#FF0282"
                />
                <path
                  d="M35.7708 47.3042C41.105 47.3042 46.5019 47.3042 51.8361 47.3042C52.9657 47.3042 53.9071 46.8611 53.8443 45.4684C53.7816 44.139 52.903 43.8857 51.7734 43.8857C49.2004 43.8857 46.5647 43.8857 43.9917 43.8857C41.2932 43.8857 38.5948 43.8857 35.8963 43.8857C34.7667 43.8857 33.8881 44.139 33.8253 45.4684C33.6371 46.7978 34.5784 47.3042 35.7708 47.3042Z"
                  fill="#FF0282"
                />
                <path
                  d="M27.2359 61.4846C26.2946 62.3709 25.3532 63.3205 24.4747 64.2701C23.9099 64.8398 23.5961 65.1564 22.7803 64.5233C21.7134 63.7003 20.27 64.5866 20.27 65.916C20.27 67.0555 22.4665 69.2712 23.7216 69.2712C24.1609 69.2712 24.6002 69.018 24.9767 68.6382C26.5456 67.0555 28.1145 65.4729 29.6834 63.827C30.4365 63.0673 30.6247 62.1177 29.8717 61.2947C29.0558 60.5351 28.0518 60.6617 27.2359 61.4846Z"
                  fill="#FF0282"
                />
                <path
                  d="M65.5168 43.8857C64.45 43.8857 63.3204 43.8857 62.2535 43.8857C61.1867 43.8857 60.0571 43.8857 58.9902 43.8857C57.9861 43.8857 57.2958 44.3922 57.2331 45.4683C57.1703 46.5445 57.7979 47.1775 58.802 47.2409C61.0612 47.3042 63.3831 47.3042 65.6423 47.2409C66.6464 47.2409 67.274 46.6078 67.2112 45.4683C67.2112 44.3922 66.5837 43.8857 65.5168 43.8857Z"
                  fill="#FF0282"
                />
                <path
                  d="M70.6628 28.6287C70.6001 27.6791 70.098 27.046 69.1567 26.9194C68.1526 26.7928 67.4623 27.3625 67.3368 28.3121C67.2113 29.6416 67.2113 31.0343 67.3368 32.3638C67.3996 33.1868 68.1526 33.6932 69.0312 33.6299C69.9725 33.5666 70.5373 32.9969 70.6001 32.0473C70.6628 31.4775 70.6001 30.9077 70.6001 30.338C70.6628 29.7682 70.6628 29.1984 70.6628 28.6287Z"
                  fill="#FF0282"
                />
                <path
                  d="M20.2701 28.5021C20.1446 27.4892 19.5798 26.8561 18.513 26.9194C17.5089 26.9827 16.9441 27.6158 16.9441 28.692C16.9441 29.1985 16.9441 29.7683 16.9441 30.2748C16.9441 30.7813 16.9441 31.351 16.9441 31.8575C16.9441 32.9338 17.4461 33.5669 18.4502 33.6302C19.5798 33.6935 20.2074 33.0604 20.2701 31.9841C20.3329 30.8446 20.3956 29.6417 20.2701 28.5021Z"
                  fill="#FF0282"
                />
                <path
                  d="M25.2905 31.9208C25.2905 32.9971 25.8553 33.5669 26.9222 33.6302C27.8635 33.6935 28.5539 33.0604 28.6166 32.1741C28.7421 30.9079 28.7421 29.6417 28.6166 28.4388C28.5539 27.4892 27.9263 26.9194 26.9222 26.9194C25.9181 26.9827 25.3533 27.5525 25.2905 28.6288C25.2905 29.1985 25.2905 29.7683 25.2905 30.3381C25.2905 30.9079 25.2905 31.4144 25.2905 31.9208Z"
                  fill="#FF0282"
                />
                <path
                  d="M60.7475 33.63C61.6261 33.5034 62.1281 32.9969 62.1909 32.1106C62.1909 31.5409 62.1909 30.9711 62.1909 30.4014C62.1909 29.7683 62.2536 29.1353 62.1909 28.5022C62.1281 27.6159 61.5633 27.0462 60.7475 26.9196C59.8061 26.793 59.1158 27.2994 58.9275 28.249C58.7393 29.5784 58.6765 30.9711 58.9275 32.3006C59.1158 33.2502 59.8061 33.7566 60.7475 33.63Z"
                  fill="#FF0282"
                />
                <path
                  d="M35.3313 33.6301C36.2727 33.6301 36.963 33.1237 37.0257 32.1108C37.0885 30.8446 37.0885 29.5785 37.0257 28.3756C36.963 27.426 36.3354 26.8563 35.3313 26.9196C34.2645 26.9829 33.7625 27.616 33.6997 28.6289C33.6997 29.1353 33.6997 29.7051 33.6997 30.2115C33.6997 30.7813 33.6997 31.3511 33.6997 31.9208C33.7625 32.9971 34.3273 33.6301 35.3313 33.6301Z"
                  fill="#FF0282"
                />
                <path
                  d="M52.3382 33.63C53.2167 33.5667 53.7815 33.0602 53.8443 32.1106C53.9071 31.4775 53.8443 30.8445 53.8443 30.2114C53.8443 29.6416 53.8443 29.0719 53.8443 28.5021C53.7815 27.4892 53.2167 26.9194 52.2754 26.8561C51.3341 26.7928 50.6438 27.3626 50.581 28.3122C50.4555 29.6416 50.3927 31.0344 50.6438 32.3638C50.7693 33.3134 51.4596 33.6933 52.3382 33.63Z"
                  fill="#FF0282"
                />
                <path
                  d="M43.8035 33.6297C44.7448 33.6297 45.3096 33.06 45.3724 32.0471C45.4351 31.4774 45.3724 30.9077 45.3724 30.3379C45.3724 29.7049 45.4351 29.0718 45.3724 28.4388C45.3096 27.4892 44.7448 26.9195 43.8035 26.8562C42.8621 26.8562 42.1718 27.3626 42.1718 28.3122C42.1091 29.5783 42.1091 30.8444 42.1718 32.0471C42.2346 33.1866 42.8621 33.693 43.8035 33.6297Z"
                  fill="#FF0282"
                />
                <path
                  d="M43.8033 13.3086C45.6233 13.3086 47.1921 11.7892 47.1921 9.95337C47.1921 8.11749 45.6233 6.59814 43.8033 6.59814C41.9834 6.59814 40.4146 8.1808 40.4146 9.95337C40.4146 11.7892 41.9207 13.3086 43.8033 13.3086Z"
                  fill="#FF0282"
                />
              </svg>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0px 5px 0px",
              }}
            >
              <h1>Solicitud de Investigación</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: 320, textAlign: "justify" }}>
                Antes de iniciar el formulario debes tener lista una
                identificación oficial, tus últimos 3 estados bancarios y una
                carta de la empresa donde trabajas que acredite desde cuando
                estás laborando en la empresa.
              </div>
            </div>
            <div
              className="two-action-buttons-banner"
              style={{ marginTop: 20 }}
            >
              <button
                type="button"
                onClick={() => {
                  history.push("/websystem/typeform-user");
                }}
              >
                <span>Responder formulario</span>
              </button>
            </div>
          </div>
        )}
      </CustomDialog>
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
                <h1>Pago de renta</h1>
              </div>
              <div className="amount-to-pay">
                <span>Monto a pagar</span>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <strong>
                    {dataPaymentDescription.totalPendingAmountFormat}
                  </strong>
                  <i
                    className="fa fa-chevron-right"
                    style={{
                      alignSelf: "center",
                      color: "#a0a3bd",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setViewDetailPayRent(!viewDetailPayRent);
                    }}
                  />
                </div>
              </div>
              {viewDetailPayRent === true && (
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
                    <span>Monto renta: </span>
                    <strong>
                      {dataPaymentDescription.rentInfo.currentRentFormat}
                    </strong>
                  </div>
                  <div>
                    <span>Costo mantenimiento: </span>
                    <strong>
                      {dataPaymentDescription.rentInfo.maintenanceAmountFormat}
                    </strong>
                  </div>
                  <div>
                    <span>Pagos recibidos: </span>
                    <strong>
                      {dataPaymentDescription.rentInfo.paymentsMade}
                    </strong>
                  </div>
                  <div>
                    <span>Iterés: </span>
                    <strong>
                      {dataPaymentDescription.rentInfo.interestAmountFormat}
                    </strong>
                  </div>
                  {dataPaymentDescription.hasSubscription === true && (
                    <>
                      <div>
                        <span>Comisión: </span>
                        <strong>
                          {
                            dataPaymentDescription.subscriptionInfo
                              .currentAmount
                          }
                        </strong>
                      </div>
                      <div>
                        <span style={{ fontSize: 10 }}>
                          Comisión cobrada por
                          <br /> Depósito en Garantía
                        </span>
                      </div>
                    </>
                  )}
                  <div>
                    <span>Total: </span>
                    <strong>
                      {dataPaymentDescription.rentInfo.totalAmountFormat}
                    </strong>
                  </div>
                  <div>
                    <span>Pago vencido: </span>
                    <strong
                      style={{
                        color:
                          dataPaymentDescription.isOnTime === true
                            ? "color: rgb(28, 227, 255)"
                            : "red",
                      }}
                    >
                      {dataPaymentDescription.rentInfo.overduePayment}
                    </strong>
                  </div>
                </div>
              )}
              <div className="date-payment">
                Periodo actual{" "}
                <strong>
                  - {dataPaymentDescription.rentInfo.currentPeriod}
                </strong>
              </div>
              <div className="date-payment">
                Fecha próximo pago{" "}
                <strong>
                  - {dataPaymentDescription.rentInfo.scheduleDate}
                </strong>
              </div>
              <div className="date-payment">
                Fecha límite de pago{" "}
                <strong>- {dataPaymentDescription.rentInfo.paydayLimit}</strong>
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
                <span>{dataTenant.shortNameTenant}</span>
              </div>
            </div>
            <div className="section-method-payment-v2">
              <div className="card-info-method">
                <strong>CLABE Interbancaria</strong>
                <span id="interbank-clabe">
                  {parseNumberClabe(dataTenant.clabe)}
                </span>
              </div>
              <div className="card-icon">
                <i
                  className="fa fa-clone"
                  style={{ fontSize: 18, color: "#6E7191", cursor: "pointer" }}
                  onClick={() => {
                    copyTextToClipboard(dataTenant.clabe);
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
                <span>{dataTenant.bankName}</span>
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
        isVisibleDialog={isVisibleOpenPayment}
        onClose={() => {
          setIsVisibleOpenPayment(false);
        }}
      >
        <div className="banner-move-tenant">
          <h1>Pago de servicio de mudanza</h1>
          <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
            <div
              className="checkout-payment-hfy"
              style={{ background: "#fff" }}
            >
              <CustomCheckPayment
                callPostPaymentServices={callPostPaymentService}
                dataProfile={dataProfile}
                totalPolicy={dataTenant.paymentForMovingAmount}
                totalPolicyFormat={dataTenant.paymentForMovingAmountFormat}
                onRedirect={() => {
                  handlerCallGetAllCustomerTenantById();
                  handlerCallGetTransactionsByUser();
                  setIsVisibleOpenPayment(false);
                }}
                idOrderPayment={dataTenant.idOrderPayment}
              />
            </div>
          </Elements>
          <div className="two-action-buttons-banner" style={{ marginTop: 20 }}>
            <button
              type="button"
              onClick={() => {
                setIsVisibleOpenPayment(false);
              }}
            >
              <span>Salir</span>
            </button>
          </div>
        </div>
      </CustomDialog>
      <CustomDialog
        isVisibleDialog={isVisibleDetailIncidence}
        onClose={() => {
          setIsVisibleDetailIncidence(!isVisibleDetailIncidence);
          handlerCallGetAllIncidenceCoincidences(dataTenant.idContract);
        }}
      >
        {isNil(dataIncidenceDetail) === false &&
        isNil(dataIncidenceDetail.result1) === false &&
        isNil(dataIncidenceDetail.result1.idOrderPayment) === false ? (
          <div className="banner-move-tenant">
            <h1>Pago de Incidencia</h1>
            <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
              <div
                className="checkout-payment-hfy"
                style={{ background: "#fff" }}
              >
                <CustomCheckPayment
                  callPostPaymentServices={callPostPaymentService}
                  dataProfile={dataProfile}
                  totalPolicy={dataIncidenceDetail.result1.amount}
                  totalPolicyFormat={dataIncidenceDetail.result1.amountFormat}
                  onRedirect={() => {
                    handlerCallGetAllCustomerTenantById();
                    handlerCallGetTransactionsByUser();
                  }}
                  idOrderPayment={dataIncidenceDetail.result1.idOrderPayment}
                />
              </div>
            </Elements>
            <div
              className="two-action-buttons-banner"
              style={{ marginTop: 20 }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsVisibleDetailIncidence(false);
                }}
              >
                <span>Ahora no</span>
              </button>
            </div>
          </div>
        ) : (
          <SectionDetailIncidence
            dataIncidenceDetail={dataIncidenceDetail}
            onSendAnnotations={async (data, id) => {
              try {
                await handlerCallUpdateIncidence(data, id);
                handlerCallGetIncidenceById(id);
              } catch (error) {
                throw error;
              }
            }}
          />
        )}
      </CustomDialog>
      <CustomDialog
        isVisibleDialog={isVisibleBannerMove}
        onClose={() => {
          setIsVisibleBannerMove(!isVisibleBannerMove);
        }}
      >
        <div className="banner-move-tenant">
          {dataTenant.requieresMoveSignature === true ? (
            <CustomSignatureContract
              srcIframe={`https://docs.google.com/gview?url=${ENVIROMENT}${urlContract.url}&embedded=true`}
              cancelButton={() => {
                setIsVisibleBannerMove(false);
              }}
              finishButton={() => {
                setIsVisibleBannerMove(false);
              }}
              titleCustom="Contrato de servicio de mudanza"
              titleSectionSignature="Firma de Contrato de servicio"
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
                  así como lo descrito en el contrato de servicio
                </span>
              }
              name={urlContract.fullNameTenant}
              onSignContract={async (data) => {
                try {
                  await handlerCallSignRequestForProvider(
                    data,
                    dataTenant.idRequestForProvider
                  );
                  await handlerCallGetAllCustomerTenantById();
                } catch (error) {
                  throw error;
                }
              }}
            />
          ) : (
            <>
              <h1>
                {isHowAreYou === false
                  ? "¡Servicio de mudanza!"
                  : "Mudanzas homify"}
              </h1>
              {isHowAreYou === false && (
                <>
                  <span>
                    Por ser parte de homify te ofrecemos un{" "}
                    <strong>¡Increíble Descuento!</strong> en servicios de
                    Mudanza.
                  </span>
                  <img
                    width="350"
                    src="https://homify-docs-users.s3.us-east-2.amazonaws.com/move_homify.png"
                    alt=""
                  />
                </>
              )}
              {isHowAreYou === true && (
                <div>
                  <p>
                    Somos una empresa con experiencia en el mercado, brindando
                    servicios de mudanzas en la Ciudad de México, con nosotros
                    podrás encontrar el mejor servicio a nivel local o foráneo,
                    con un precio accesible y la garantía de todas tus
                    pertenencias llegaran en perfecto estado.
                  </p>
                  <p>
                    Nos especializamos en movimiento de muebles, cambio de
                    departamento, empaque. Además nuestro personal está
                    ampliamente capacitado para brindar la asesoría oportuna.
                  </p>
                  <p>
                    Con nosotros obtendrás los resultados que esperas, nos
                    distinguimos por la alta atención a los detalles y por la
                    infraestructura con la que contamos. Te garantizamos un
                    servicio de mudanza confiable y dentro de los plazos
                    acordados.
                  </p>
                  <p>
                    <strong>
                      En mudanzas HOMIFY hacemos que nuestros clientes se
                      sientan seguros y sin preocupaciones.
                    </strong>
                  </p>
                  <ul>
                    <li>Maniobra de carga y descarga</li>
                    <li>Empaque y desempaqué</li>
                    <li>Movimientos internos</li>
                    <li>Transporte de maneje de departamentos y casas</li>
                  </ul>
                </div>
              )}
              <Button
                onClick={() => {
                  setIsHowAreYou(!isHowAreYou);
                }}
                type="link"
                size="small"
                style={{ marginBottom: 20 }}
              >
                {isHowAreYou === false ? "¿Quiénes somos?" : "Regresar"}
              </Button>
              <div className="two-action-buttons-banner">
                <button
                  type="button"
                  onClick={async () => {
                    setIsVisibleBannerMove(false);
                    await handlerCallUpdateMovingDialog({
                      idCustomerTenant: dataTenant.idCustomerTenant,
                      idContract: dataTenant.idContract,
                    });
                    handlerCallGetAllCustomerTenantById();
                  }}
                >
                  <span>Ahora no</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsVisibleBannerMove(false);
                    setIsVisibleRequestService(true);
                  }}
                >
                  <span>¡Me interesa!</span>
                </button>
              </div>
            </>
          )}
        </div>
      </CustomDialog>
      <CustomViewDocument
        isVisibleModal={isVisibleModal}
        dataDocument={dataDocument}
        onClose={() => {
          setIsVisibleModal(false);
        }}
      />
      <SectionRequestService
        isVisibleModal={isVisibleRequestService}
        dataProviders={dataProviders}
        onSaveRequestService={async (data) => {
          try {
            await handlerCallAddRequestProviderForTenant({
              ...data,
              idContract: dataTenant.idContract,
            });
          } catch (error) {
            throw error;
          }
        }}
        frontFunctions={frontFunctions}
        onClose={() => {
          setIsVisibleRequestService(!isVisibleRequestService);
        }}
      />
      <SectionContractAvailable
        dataProfile={dataProfile}
        isModalVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(!isModalVisible);
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
          } catch (error) {
            throw error;
          }
        }}
        onFinishContractFlow={() => {
          handlerCallGetAllCustomerTenantById();
        }}
      />
      <SectionDepositGuarantee
        isModalVisible={isModalVisiblePolicy}
        dataLoan={dataLoan}
        dataBank={dataBank}
        onSearchBank={handlerCallBankCatalog}
        onClose={() => {
          setIsModalVisiblePolicy(!isModalVisiblePolicy);
        }}
        frontFunctions={frontFunctions}
        handlerCallUpdateCustomerLoan={async (data, id) => {
          try {
            await handlerCallUpdateCustomerLoan(data, id);
          } catch (error) {
            throw error;
          }
        }}
        handlerCallGetCustomerLoanProperties={async (data) => {
          try {
            return await handlerCallGetCustomerLoanProperties(data);
          } catch (error) {
            throw error;
          }
        }}
      />
      <div className="margin-app-main">
        <div className="top-main-user">
          <div className="welcome-user-main">
            <h2>Hola, {dataTenant.shortNameTenant}</h2>
            <span>
              Último inicio de sesión:{" "}
              <strong>{dataTenant.lastSessionStarted}</strong>
            </span>
          </div>
          <div className="action-buttons-top">
            <div className="button_init_primary"></div>
            {dataTenant.canSignContract === true && (
              <div className="button_init_primary">
                <button
                  type="button"
                  onClick={() => {
                    handlerCallGetContract({
                      process: false,
                      url: null,
                      download: false,
                      idContract: dataTenant.idContract,
                      idCustomerTenant: dataTenant.idCustomerTenant,
                      idCustomer: dataTenant.idCustomer,
                      type: 1,
                    });
                    setIsModalVisible(!isModalVisible);
                  }}
                >
                  <span>¡Contrato Disponible!</span>
                </button>
              </div>
            )}
            {dataTenant.canDeal === 1 && (
              <div className="button_init_primary">
                <button
                  type="button"
                  onClick={() => {
                    setIsVisiblePaymentRent(true);
                    setIsVisibleMessages(false);
                    setIsVisibleIncidence(false);
                    window.location.href = "#section-register-action";
                  }}
                >
                  <span>Registrar pago</span>
                </button>
              </div>
            )}
            {isEmpty(dataTenant) === false &&
              isNil(dataTenant.isTypeFormCompleted) === false &&
              dataTenant.isTypeFormCompleted === false && (
                <div className="button_init_primary">
                  <button
                    type="button"
                    onClick={() => {
                      history.push("/websystem/typeform-user");
                    }}
                  >
                    <span>Responder TypeForm</span>
                  </button>
                </div>
              )}
            {dataTenant.canDeal === 1 && (
              <div className="button_init_primary">
                <button
                  type="button"
                  onClick={() => {
                    setHowToPay(true);
                  }}
                >
                  <span>¿Cómo hacer mi pago de renta?</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="indicators-amount-renter">
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#ffe51c" }}>
              <img src={IconCalendar} alt="icon" width="20px"></img>
            </div>
            <h2>{dataTenant.nextPaymentAt}</h2>
            <span>Fecha de próximo pago</span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#1CE3FF" }}>
              <img src={IconWallet} alt="icon" width="20px"></img>
            </div>
            <h2>{dataTenant.currentRent}</h2>
            <span>Monto de renta</span>
          </div>
          <div className="cards-amount-renter">
            <div className="elipse-icon" style={{ backgroundColor: "#BE0FFF" }}>
              <img src={IconDanger} alt="icon" width="20px"></img>
            </div>
            <h2>{dataTenant.interestAmount}</h2>
            <span>Moratorios</span>
          </div>
        </div>
        {dataTenant.canDeal === 1 && (
          <div className="main-information-owner">
            <div className="title-cards">
              <span>Acciones</span>
            </div>
            <div className="section-information-actions">
              <div className="section-information-buttons">
                <div className="section-information-button-2">
                  <img src={Tools} height={62} alt="Reportar incidencia" />
                  <button
                    type="button"
                    onClick={() => {}}
                    className="button-action-primary"
                  >
                    <span>Solicitar Servicios</span>
                  </button>
                </div>
                {dataTenant.canRequestMove === 1 && (
                  <div className="section-information-button-3">
                    <img src={Transport} alt="Solicitar mudanza" height={62} />
                    <button
                      type="button"
                      onClick={() => {
                        setIsVisibleRequestService(!isVisibleRequestService);
                      }}
                      className="button-action-primary"
                    >
                      <span>Solicitar mudanza</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div id="section-register-action"></div>
        {isVisibleMessages === false &&
          isVisiblePaymentRent === false &&
          isVisibleIncidence === false && (
            <div className="main-information-owner">
              <div
                className="title-cards flex-title-card"
                style={{ flexDirection: "row" }}
              >
                <span>Propietario</span>
              </div>
              <div className="section-information-actions">
                <div className="section-information-info">
                  <div className="section-information-data">
                    {isNil(dataTenant.profileThumbnail) === false ? (
                      <Avatar size={50} src={dataTenant.profileThumbnail} />
                    ) : (
                      <Avatar size={50} icon={<UserOutlined />} />
                    )}
                    <div className="info-user">
                      <strong>{dataTenant.fullName}</strong>
                      <Rate
                        style={{
                          fontSize: "15px",
                          position: "relative",
                          bottom: "5px",
                        }}
                        tooltips={[]}
                        onChange={() => {}}
                        value={dataTenant.ratingRate}
                      />
                      {isNil(dataTenant.customerStatus) === false && (
                        <div
                          className="status-payment-contract"
                          style={{ background: dataTenant.customerStatusStyle }}
                        >
                          <span>{dataTenant.customerStatus}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="section-information-button-1">
                    <img
                      src={FileReport}
                      height={62}
                      alt="Reportar incidencia"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsVisibleIncidence(true);
                      }}
                      className="button-action-primary"
                    >
                      <span>Incidencias</span>
                    </button>
                  </div>
                </div>
                <div className="section-information-buttons">
                  <div className="section-information-button-2">
                    <img
                      src={MessagesIcon}
                      height={62}
                      alt="Reportar incidencia"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsVisibleMessages(!isVisibleMessages);
                      }}
                      className="button-action-primary"
                    >
                      <span>Enviar mensaje al propietario</span>
                    </button>
                  </div>
                  <div className="section-information-button-3">
                    <img src={DocumentsIcon} alt="Incidencias" height={62} />
                    <Dropdown
                      overlay={
                        <Menu onClick={() => {}}>
                          <Menu.Item key="0">
                            <a
                              onClick={() => {
                                if (
                                  isNil(dataTenant.infoContractDocument) ===
                                  false
                                ) {
                                  const parseData = JSON.parse(
                                    dataTenant.infoContractDocument
                                  );
                                  setDataDocument(parseData[0]);
                                  setIsVisibleModal(true);
                                }
                              }}
                              style={{ marginRight: 10 }}
                            >
                              Contrato
                            </a>
                          </Menu.Item>
                          <Menu.Item key="1">
                            <a
                              onClick={() => {
                                if (
                                  isNil(dataTenant.infoPolicyDocument) === false
                                ) {
                                  const parseData = JSON.parse(
                                    dataTenant.infoPolicyDocument
                                  );
                                  setDataDocument(parseData[0]);
                                  setIsVisibleModal(true);
                                }
                              }}
                              style={{ marginRight: 10 }}
                            >
                              Póliza
                            </a>
                          </Menu.Item>
                          <Menu.Item key="2">
                            <a
                              onClick={() => {
                                if (
                                  isNil(dataTenant.infoPaymentDocument) ===
                                  false
                                ) {
                                  const parseData = JSON.parse(
                                    dataTenant.infoPaymentDocument
                                  );
                                  setDataDocument(parseData[0]);
                                  setIsVisibleModal(true);
                                }
                              }}
                              style={{ marginRight: 10 }}
                            >
                              Pagarés
                            </a>
                          </Menu.Item>
                        </Menu>
                      }
                      trigger={["click"]}
                    >
                      <button
                        type="button"
                        onClick={() => {}}
                        className="button-action-primary"
                      >
                        <span>Ver documentos</span>
                      </button>
                    </Dropdown>
                  </div>
                </div>
              </div>
              {dataTenant.canRequestReminderToOwner === true && (
                <div style={{ padding: 5, fontFamily: "Poppins" }}>
                  <Alert
                    message={
                      <div>
                        <span style={{ fontWeight: "bold" }}>
                          Para continuar tu proceso es necesario que tu
                          propietario se registre, si lo deseas haz clic
                          <Button
                            type="link"
                            onClick={async () => {
                              await handlerCallUpdateInvitation(
                                dataTenant.idInvitation
                              );
                              handlerCallGetAllCustomerTenantById();
                            }}
                          >
                            aquí
                          </Button>
                          para enviarle un recordatorio.
                        </span>
                      </div>
                    }
                    type="warning"
                  />
                </div>
              )}
            </div>
          )}
        <CustomContentActions
          onClick={() => {
            setIsVisibleMessages(!isVisibleMessages);
          }}
          titleSection="Mensajes"
          isVisible={isVisibleMessages}
        >
          <SectionMessages
            dataMessages={dataMessages}
            getMoreCoincidences={() => {
              const { idCustomerTF, idCustomerTenantTF } = dataProfile;
              handlerCallGetCustomerMessage({
                idContract: dataTenant.idContract,
                idCustomerTenant: dataTenant.idCustomerTenant,
                idCustomer: dataTenant.idCustomer,
              });
            }}
            onSendMessages={(data) => {
              handlerCallAddCustomerMessage(data, {
                idContract: dataTenant.idContract,
                idCustomerTenant: dataTenant.idCustomerTenant,
                idCustomer: dataTenant.idCustomer,
              });
            }}
          />
        </CustomContentActions>
        <CustomContentActions
          onClick={() => {
            setIsVisiblePaymentRent(!isVisiblePaymentRent);
          }}
          titleSection="Registrar pago"
          isVisible={isVisiblePaymentRent}
        >
          <SectionRegisterPayment
            dataPayments={dataPayments}
            spinVisible={spinVisible}
            onGetDocuments={async (arrayDocument, data) => {
              setSpinVisible(true);
              const dataDocuments = await Promise.all(
                arrayDocument.map((row) => {
                  const item = handlerAddDocument(row, data);
                  return item;
                })
              );
              const parseDocument = dataDocuments.join();
              const dataSend = {
                ...data,
                idContract: dataTenant.idContract,
                idCustomerTenant: dataTenant.idCustomerTenant,
                documents: parseDocument,
              };
              handlerCallGetAllPaymentContract(dataSend);
            }}
            onRegisterPayment={(data) => {}}
          />
        </CustomContentActions>
        <CustomContentActions
          onClick={() => {
            setIsVisibleIncidence(!isVisibleIncidence);
          }}
          titleSection="Incidencias"
          isVisible={isVisibleIncidence}
        >
          <SectionIncidenceReport
            dataIncidence={dataIncidenceTypes}
            spinVisible={spinVisible}
            dataIncideCoincidence={dataIncideCoincidence}
            onGetById={async (data) => {
              await handlerCallGetIncidenceById(data.idIncidence);
              setIsVisibleDetailIncidence(true);
            }}
            onSendReport={async (arrayDocument, data) => {
              try {
                setSpinVisible(true);
                let parseDocument = null;
                if (isEmpty(arrayDocument) === false) {
                  const dataDocuments = await Promise.all(
                    arrayDocument.map(async (row) => {
                      const item = await handlerAddDocument(row, data);
                      return item;
                    })
                  );
                  parseDocument = dataDocuments.join();
                }
                const dataSend = {
                  ...data,
                  idContract: dataTenant.idContract,
                  documents: parseDocument,
                };
                await handlerCallAddIncidence(dataSend);
                handlerCallGetAllIncidenceCoincidences(dataTenant.idContract);
              } catch (error) {
                throw error;
              }
            }}
          />
        </CustomContentActions>
        <div className="main-information-user">
          <div className="content-cards-payments">
            <SectionStatsMovements
              dataInformation={dataTransactions}
              finishCallApis={true}
            />
          </div>
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
  callUpdateIncidence: (data, id) => dispatch(callUpdateIncidence(data, id)),
  callGetAllIncidenceCoincidences: (data) =>
    dispatch(callGetAllIncidenceCoincidences(data)),
  callAddIncidence: (data) => dispatch(callAddIncidence(data)),
  callUpdateMovingDialog: (data) => dispatch(callUpdateMovingDialog(data)),
  callAddRequestProviderForTenant: (data) =>
    dispatch(callAddRequestProviderForTenant(data)),
  callGetAllProviders: (data) => dispatch(callGetAllProviders(data)),
  callGetAllIncidenceTypes: (data) => dispatch(callGetAllIncidenceTypes(data)),
  callAddDocument: (file, data, callback) =>
    dispatch(callAddDocument(file, data, callback)),
  callGetPaymentContract: (data) => dispatch(callGetPaymentContract(data)),
  callGetPaymentTypes: (data) => dispatch(callGetPaymentTypes(data)),
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
  callSetContract: (data, id) => dispatch(callSetContract(data, id)),
  callAddCommentContract: (data, id) =>
    dispatch(callAddCommentContract(data, id)),
  callGetContract: (data) => dispatch(callGetContract(data)),
  callGetContractComment: (data) => dispatch(callGetContractComment(data)),
  callGetAllCustomerTenantById: (data) =>
    dispatch(callGetAllCustomerTenantDashboardById(data)),
  callGetIncidenceById: (data) => dispatch(callGetIncidenceById(data)),
  callAddCustomerMessage: (data) => dispatch(callAddCustomerMessage(data)),
  callGetCustomerMessage: (data) => dispatch(callGetCustomerMessage(data)),
  callAddDocumentContractId: (data, id) =>
    dispatch(callAddDocumentContractId(data, id)),
  callGetRequestProviderPropierties: (data) =>
    dispatch(callGetRequestProviderPropierties(data)),
  callSignRequestForProvider: (data, id) =>
    dispatch(callSignRequestForProvider(data, id)),
  callUpdateInvitation: (data, id) => dispatch(callUpdateInvitation(data, id)),
  callPostPaymentService: (data) => dispatch(callPostPaymentService(data)),
  callGetCustomerLoan: (data) => dispatch(callGetCustomerLoan(data)),
  callUpdateCustomerLoan: (data, id) =>
    dispatch(callUpdateCustomerLoan(data, id)),
  callGetCustomerLoanProperties: (data, id) =>
    dispatch(callGetCustomerLoanProperties(data, id)),
  callGetAllBankCatalog: (data) => dispatch(callGetAllBankCatalog(data)),
  callGetTransactionsByUser: (data) =>
    dispatch(callGetTransactionsByUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tenant);
