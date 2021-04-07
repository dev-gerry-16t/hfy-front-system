import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import moment from "moment";
import { connect } from "react-redux";
import {
  Layout,
  Avatar,
  Rate,
  notification,
  message,
  Dropdown,
  Menu,
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
} from "../../utils/actions/actions";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";
import SectionMessages from "./sectionDocuments/sectionMessages";
import SectionRegisterPayment from "./sectionDocuments/sectionRegisterPayment";
import CustomViewDocument from "../../components/CustomViewDocument";
import SectionRequestService from "./sections/sectionRequestService";

const { Content } = Layout;

const Tenant = (props) => {
  const {
    history,
    callGetAllCustomerTenantById,
    dataProfile,
    callAddDocument,
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
  } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVisibleBannerMove, setIsVisibleBannerMove] = useState(false);
  const [dataProviders, setDataProviders] = useState([]);
  const [isVisibleRequestService, setIsVisibleRequestService] = useState(false);
  const [dataDocument, setDataDocument] = useState({});
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [dataPayments, setDataPayments] = useState([]);
  const [isVisibleMessages, setIsVisibleMessages] = useState(false);
  const [isVisiblePaymentRent, setIsVisiblePaymentRent] = useState(false);
  const [idTopIndexMessage, setIdTopIndexMessage] = useState(-1);
  const [dataTenant, setDataTenant] = useState([]);
  const [dataMessages, setDataMessages] = useState([]);
  const [dataGetContract, setDataGetContract] = useState([]);
  const [spinVisible, setSpinVisible] = useState(false);
  const [isModalVisiblePolicy, setIsModalVisiblePolicy] = useState(false);
  const frontFunctions = new FrontFunctions();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
          Antes de iniciar el formulario debes tener lista una identificación
          oficial, tus últimos 3 comprobantes de ingresos y una carta de la
          empresa donde trabajas que acredite desde cuando estás laborando en la
          empresa. Adicional, necesitaras la escritura del inmueble que quedara
          como garantía y los datos e identificación del Aval.
        </span>
        <button
          type="button"
          onClick={() => {
            notification.destroy();
            history.push("/websystem/typeform-user");
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
        Solicitud de Investigación Persona Física con o sin Aval
      </div>
    ),
    duration: 0,
    style: { marginTop: "4vw" },
  };

  const argsv2 = {
    description: (
      <div style={{ fontFamily: "Poppins" }}>
        <span style={{ fontSize: "12px" }}>
          Buen dia <strong>Sebastian</strong>, estamos en espera del pago de tu{" "}
          <strong>depósito en ganarantía</strong>.<br /> <br />
          Si no puedes pagar el
          <strong> depósito en ganarantía</strong> tenemos estas opciones para
          ti
        </span>
        <button
          type="button"
          onClick={() => {
            setIsModalVisiblePolicy(!isModalVisiblePolicy);
            notification.destroy();
          }}
          className="button-action-primary"
          style={{ marginTop: "25px" }}
        >
          <span>Revisar opciones</span>
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
        Depósito en Garantia
      </div>
    ),
    duration: 0,
    style: { marginTop: "4vw" },
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
    } = dataProfile;
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
        notification.open(args);
        //notification.open(argsv2);
      } else {
        handlerCallGetAllProviders(responseResult.idContract);
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
      const response = await callAddDocument(data.originFileObj, dataDocument);
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

  useEffect(() => {
    handlerCallGetAllCustomerTenantById();
  }, []);

  return (
    <Content>
      <Dialog
        open={isVisibleBannerMove}
        onClose={() => {
          setIsVisibleBannerMove(!isVisibleBannerMove);
        }}
        fullScreen={fullScreen}
      >
        <div className="banner-move-tenant">
          <h1>!Servicio de mudanza!</h1>
          <span>
            Por ser parte de Homify te ofrecemos un{" "}
            <strong>¡Increíble Descuento!</strong> en servicios de Mudanza.
          </span>
          <img
            width="350"
            src="https://homify-docs-users.s3.us-east-2.amazonaws.com/move_homify.png"
            alt=""
          />
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
        </div>
      </Dialog>
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
          } catch (error) {}
        }}
        onFinishContractFlow={() => {
          handlerCallGetAllCustomerTenantById();
        }}
      />
      <SectionDepositGuarantee
        isModalVisible={isModalVisiblePolicy}
        onClose={() => {
          setIsModalVisiblePolicy(!isModalVisiblePolicy);
        }}
        frontFunctions={frontFunctions}
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
                    setIsVisiblePaymentRent(!isVisiblePaymentRent);
                    setIsVisibleMessages(false);
                  }}
                >
                  <span>Pagar renta</span>
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
                    <span>Cotizar incidencia</span>
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
        {isVisibleMessages === false && isVisiblePaymentRent === false && (
          <div className="main-information-owner">
            <div className="title-cards flex-title-card">
              <span>Propietario</span>
              <div className="button_init_secondary">
                <button type="button" onClick={() => {}}>
                  <span>Reportar Propietario</span>
                </button>
              </div>
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
                  </div>
                </div>
                <div className="section-information-button-1">
                  <img src={FileReport} height={62} alt="Reportar incidencia" />
                  <button
                    type="button"
                    onClick={() => {}}
                    className="button-action-primary"
                  >
                    <span>Reportar incidencia</span>
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
                    <span>Enviar mensaje</span>
                  </button>
                </div>
                <div className="section-information-button-3">
                  <img
                    src={DocumentsIcon}
                    alt="Reportar incidencia"
                    height={62}
                  />
                  <Dropdown
                    overlay={
                      <Menu onClick={() => {}}>
                        <Menu.Item key="0">
                          <a
                            onClick={() => {
                              if (
                                isNil(dataTenant.infoContractDocument) === false
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
                                isNil(dataTenant.infoPaymentDocument) === false
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
          </div>
        )}
        {isVisibleMessages === true && (
          <div className="actions-information-tenant">
            <div className="tabs-tenant-information">
              <div className="form-modal">
                <div className="title-head-modal">
                  <button
                    className="arrow-back-to"
                    type="button"
                    onClick={() => {
                      setIsVisibleMessages(!isVisibleMessages);
                    }}
                  >
                    <img src={Arrow} alt="backTo" width="30" />
                  </button>
                  <h1>Mensajes</h1>
                </div>
              </div>
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
            </div>
          </div>
        )}
        {isVisiblePaymentRent === true && (
          <div className="actions-information-tenant">
            <div className="tabs-tenant-information">
              <div className="form-modal">
                <div className="title-head-modal">
                  <button
                    className="arrow-back-to"
                    type="button"
                    onClick={() => {
                      setIsVisiblePaymentRent(!isVisiblePaymentRent);
                    }}
                  >
                    <img src={Arrow} alt="backTo" width="30" />
                  </button>
                  <h1>Pagar renta</h1>
                </div>
              </div>
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
            </div>
          </div>
        )}
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
  callUpdateMovingDialog: (data) => dispatch(callUpdateMovingDialog(data)),
  callAddRequestProviderForTenant: (data) =>
    dispatch(callAddRequestProviderForTenant(data)),
  callGetAllProviders: (data) => dispatch(callGetAllProviders(data)),
  callAddDocument: (file, data) => dispatch(callAddDocument(file, data)),
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
  callAddCustomerMessage: (data) => dispatch(callAddCustomerMessage(data)),
  callGetCustomerMessage: (data) => dispatch(callGetCustomerMessage(data)),
  callAddDocumentContractId: (data, id) =>
    dispatch(callAddDocumentContractId(data, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tenant);
