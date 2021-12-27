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
  Tooltip,
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
  callGetAllUserProfile,
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
import CustomValidationUser from "../../components/CustomValidationUser";
import IconsProfile from "../Owner/icons/icons";
import SectionTimeLine from "../Owner/sections/sectionTimeLine";
import SectionCardOwners from "./sections/sectionCardOwners";

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
    callGetAllUserProfile,
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
  const [isVisibleVerification, setIsVisibleVerification] = useState(false);
  const [iconVerification, setIconVerification] = useState({
    icon: "",
    label: "",
  });
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
    const {
      idCustomer,
      idSystemUser,
      idLoginHistory,
      idCustomerTenant,
      verificationStatusStyle,
      verificationStatus,
      shouldCustomerBeVerified,
    } = dataProfile;
    try {
      const response = await callGetAllCustomerTenantById({
        idCustomer,
        idSystemUser,
        idLoginHistory,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataTenant(responseResult);
      setIsVisibleVerification(shouldCustomerBeVerified);
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
    handlerCallGetAllCustomerTenantById();
    handlerCallGetTransactionsByUser();
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
          handlerCallGetAllCustomerTenantById();
          handlerCallGetTransactionsByUser();
          handlerCallGetAllUserProfile();
          setIsVisibleVerification(false);
        }}
      />
      <div className="margin-app-main">
        <div
          className="top-main-user"
          style={{
            marginBottom: 20,
          }}
        >
          <div className="welcome-user-main">
            <div style={{ display: "flex", alignItems: "center" }}>
              <h2 style={{ marginRight: 5 }}>
                Hola,{" "}
                {isNil(dataTenant[0]) === false
                  ? dataTenant[0].shortNameTenant
                  : ""}
              </h2>
              {isEmpty(iconVerification) === false &&
                isNil(iconVerification) === false && (
                  <Tooltip
                    placement="right"
                    title={`${iconVerification.label}`}
                  >
                    {IconsProfile[iconVerification.icon]}
                  </Tooltip>
                )}
            </div>
            <span>
              Último inicio de sesión:{" "}
              <strong>
                {isNil(dataTenant[0]) === false
                  ? dataTenant[0].lastSessionStarted
                  : ""}
              </strong>
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
        <div className="main-information-process">
          <div className="content-cards-process">
            <SectionTimeLine
              history={history}
              onOpenComponent={(type) => {
                if (type === 4) {
                  setIsVisibleVerification(true);
                }
              }}
            />
            <SectionCardOwners
              finishCallApis={true}
              ownerCoincidences={dataTenant}
            />
          </div>
        </div>
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
  callGetAllUserProfile: (data) => dispatch(callGetAllUserProfile(data)),
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
