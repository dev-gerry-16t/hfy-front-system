import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Layout, Tabs, message } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import SectionDocuments from "./sectionDocuments/sectionDocuments";
import SectionInfoTenant from "./sectionDocuments/sectionCardInformation";
import SectionMessages from "./sectionDocuments/sectionMessages";
import SectionRegisterPayment from "./sectionDocuments/sectionRegisterPayment";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import {
  callGetAllCustomerTenantById,
  callGetPaymentTypes,
  callGetPaymentContract,
  callAddDocument,
  callGetAllDocumentTypes,
  callGetPaymentContractDocument,
  callAddCustomerMessage,
  callGetCustomerMessage,
  callGetAllIncidenceTypes,
  callGetAllIncidenceCoincidences,
  callGetIncidenceById,
  callAddIncidence,
  callUpdateIncidence,
  callPostPaymentService,
} from "../../utils/actions/actions";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";
import SectionIncidenceReport from "./sections/sectionIncidenceReport";
import CustomDialog from "../../components/CustomDialog";
import SectionDetailIncidence from "./sections/sectionDetailIncidence";
import CustomCheckPayment from "../TypeForm/sections/customCheckPayment";

const stripePromise = loadStripe(GLOBAL_CONSTANTS.PUBLIC_STRIPE_KEY);

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Poppins",
    },
  ],
};

const { Content } = Layout;
const { TabPane } = Tabs;

const TenantFromOwner = (props) => {
  const {
    dataProfile,
    match,
    callGetAllCustomerTenantById,
    callGetPaymentTypes,
    callGetPaymentContract,
    callAddDocument,
    callGetAllDocumentTypes,
    callGetPaymentContractDocument,
    callAddCustomerMessage,
    callGetCustomerMessage,
    callGetAllIncidenceTypes,
    callGetAllIncidenceCoincidences,
    callGetIncidenceById,
    callAddIncidence,
    callUpdateIncidence,
    callPostPaymentService,
    setDataUserProfile,
  } = props;
  const { params } = match;
  const idCustomerTenant = params.idCustomerTenant;
  const [dataTenant, setDataTenant] = useState([]);
  const [dataPayments, setDataPayments] = useState([]);
  const [dataDocumentTypes, setDataDocumentTypes] = useState([]);
  const [dataMessages, setDataMessages] = useState([]);
  const [dataDocumentsRepository, setDataDocumentsRepository] = useState([]);
  const [idContractData, setIdContractData] = useState(null);
  const [idTopIndexMessage, setIdTopIndexMessage] = useState(-1);
  const [idTopIndexDocuments, setIdTopIndexDocuments] = useState(-1);
  const [spinVisible, setSpinVisible] = useState(false);
  const [dataIncidenceTypes, setDataIncidenceTypes] = useState([]);
  const [dataIncideCoincidence, setDataIncideCoincidence] = useState([]);
  const [dataIncidenceDetail, setDataIncidenceDetail] = useState({});
  const [isVisibleDetailIncidence, setIsVisibleDetailIncidence] =
    useState(false);

  const dotChange = useRef(null);
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

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

  const handlerCallGetAllDocumentTypes = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllDocumentTypes({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        idCustomerTenant,
        type: 1,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataDocumentTypes(responseResult);
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetPaymentContractDocument = async (data) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetPaymentContractDocument({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        idCustomerTenant,
        topIndex: idTopIndexDocuments,
        idContract: idContractData,
        ...data,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataDocumentsRepository(responseResult);
      if (isEmpty(responseResult) === false) {
        setIdTopIndexDocuments(responseResult[0].topIndex);
      }
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
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

  const handlerCallGetAllCustomerTenantById = async () => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetAllCustomerTenantById({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        idCustomerTenant,
      });
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : {};
      setDataTenant(responseResult);
      if (isEmpty(responseResult) === false) {
        setIdContractData(responseResult.idContract);
        setDataUserProfile({
          ...dataProfile,
          idContract: responseResult.idContract,
        });
        await handlerCallGetAllPaymentTypes({
          type: 1,
          idContract: responseResult.idContract,
          idCustomerTenant,
        });
        await handlerCallGetCustomerMessage({
          idContract: responseResult.idContract,
          idCustomerTenant,
        });
        await handlerCallGetAllIncidenceTypes(responseResult.idContract);
        await handlerCallGetAllIncidenceCoincidences(responseResult.idContract);
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

  const handlerCallGetCustomerMessage = async (data) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetCustomerMessage({
        idCustomer,
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

  const handlerCallAddCustomerMessage = async (data) => {
    const { idCustomer, idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callAddCustomerMessage({
        idCustomer,
        idSystemUser,
        idLoginHistory,
        idCustomerTenant,
        idContract: idContractData,
        ...data,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      handlerCallGetCustomerMessage({
        idContract: idContractData,
        idCustomerTenant,
      });
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    handlerCallGetAllCustomerTenantById();
    handlerCallGetAllDocumentTypes();
  }, []);

  return (
    <Content>
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
                  totalPolicy={dataIncidenceDetail.result1.amountFormat}
                  onRedirect={() => {
                    handlerCallGetAllCustomerTenantById();
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
                <span>Salir</span>
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
      <div className="margin-app-main">
        <SectionInfoTenant dataTenant={dataTenant} />
        <div className="actions-information-tenant">
          <div className="tabs-tenant-information">
            <Tabs
              defaultActiveKey="1"
              onChange={() => {}}
              tabBarStyle={{ color: "#A0A3BD" }}
              tabPosition="top"
            >
              <TabPane tab="Registrar pago" key="1">
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
                      idCustomerTenant,
                      idContract: idContractData,
                      documents: parseDocument,
                    };
                    handlerCallGetAllPaymentContract(dataSend);
                  }}
                  onRegisterPayment={(data) => {}}
                />
              </TabPane>
              <TabPane tab="Documentos" key="2">
                <SectionDocuments
                  dataDocumentTypes={dataDocumentTypes}
                  dataDocumentsRepository={dataDocumentsRepository}
                  onSearchDocument={(data) => {
                    handlerCallGetPaymentContractDocument(data);
                  }}
                />
              </TabPane>
              <TabPane tab="Mensajes" key="3">
                <SectionMessages
                  dataMessages={dataMessages}
                  getMoreCoincidences={() => {
                    handlerCallGetCustomerMessage({
                      idContract: idContractData,
                      idCustomerTenant,
                    });
                  }}
                  onSendMessages={(data) => {
                    handlerCallAddCustomerMessage(data);
                  }}
                />
              </TabPane>
              <TabPane tab="Incidencias" key="4">
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
                      handlerCallGetAllIncidenceCoincidences(
                        dataTenant.idContract
                      );
                    } catch (error) {
                      throw error;
                    }
                  }}
                />
              </TabPane>
            </Tabs>
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
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
  callGetAllCustomerTenantById: (data) =>
    dispatch(callGetAllCustomerTenantById(data)),
  callGetPaymentTypes: (data) => dispatch(callGetPaymentTypes(data)),
  callGetPaymentContract: (data) => dispatch(callGetPaymentContract(data)),
  callAddDocument: (file, data) => dispatch(callAddDocument(file, data)),
  callGetAllDocumentTypes: (data) => dispatch(callGetAllDocumentTypes(data)),
  callGetPaymentContractDocument: (data) =>
    dispatch(callGetPaymentContractDocument(data)),
  callAddCustomerMessage: (data) => dispatch(callAddCustomerMessage(data)),
  callGetCustomerMessage: (data) => dispatch(callGetCustomerMessage(data)),
  callGetAllIncidenceTypes: (data) => dispatch(callGetAllIncidenceTypes(data)),
  callGetAllIncidenceCoincidences: (data) =>
    dispatch(callGetAllIncidenceCoincidences(data)),
  callGetIncidenceById: (data) => dispatch(callGetIncidenceById(data)),
  callAddIncidence: (data) => dispatch(callAddIncidence(data)),
  callUpdateIncidence: (data, id) => dispatch(callUpdateIncidence(data, id)),
  callPostPaymentService: (data) => dispatch(callPostPaymentService(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TenantFromOwner);
