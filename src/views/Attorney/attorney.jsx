import React, { useState, useEffect } from "react";
import Magnifier from "react-magnifier";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import {
  Layout,
  Table,
  Tag,
  Menu,
  Dropdown,
  Modal,
  Button,
  message,
  Tooltip,
  Timeline,
} from "antd";
import {
  CheckSquareOutlined,
  DownloadOutlined,
  CheckCircleTwoTone,
  EditTwoTone,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  callGetLegalContractCoincidences,
  callGetContractDocument,
  callGetCustomerMessage,
} from "../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import DocumentIcon from "../../assets/icons/DocumentsIcon.svg";
import Lock from "../../assets/icons/Lock.svg";
import Arrow from "../../assets/icons/Arrow.svg";
import SectionUploadDocument from "../Admin/sections/sectionUploadDocuments";
import ENVIROMENT from "../../utils/constants/enviroments";

const { Content } = Layout;

const Attorney = (props) => {
  const {
    dataProfile,
    callGetLegalContractCoincidences,
    callGetContractDocument,
    callGetCustomerMessage,
  } = props;
  const [dataCoincidences, setDataCoincidences] = useState([]);
  const [isVisibleAddDocs, setIsVisibleAddDocs] = useState(false);
  const [isVisibleViewImage, setIsVisibleViewImage] = useState(false);
  const [isVisibleMeessages, setIsVisibleMeessages] = useState(false);
  const [dataDocuments, setDataDocuments] = useState([]);
  const [dataMessages, setDataMessages] = useState([]);
  const [documentUrl, setDocumentUrl] = useState({});
  const [idTopIndexMessage, setIdTopIndexMessage] = useState(-1);

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

  const handlerCallGetCustomerMessage = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetCustomerMessage({
        idCustomer: data.idCustomer,
        idSystemUser,
        idLoginHistory,
        topIndex: idTopIndexMessage,
        idContract: data.idContract,
        idCustomerTenant: data.idCustomerTenant,
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

  const handlerCallGetLegalContractCoincidences = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetLegalContractCoincidences({
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

  const columns = [
    {
      title: "Folio",
      dataIndex: "hfInvoice",
      key: "hfInvoice",
      fixed: "left",
      render: (label, record) => {
        const recorsStyle =
          isNil(record.hfInvoiceStyle) === false &&
          isEmpty(record.hfInvoiceStyle) === false
            ? JSON.parse(record.hfInvoiceStyle)
            : {};
        return <span style={recorsStyle}>{label}</span>;
      },
    },
    {
      title: "Partes involucradas",
      fixed: "left",
      children: [
        {
          title: "Arrendador",
          dataIndex: "customerFullName",
          key: "customerFullName",
          width: 200,
          fixed: "left",
        },
        {
          title: "Arrendatario",
          dataIndex: "customerTenantFullName",
          key: "customerTenantFullName",
          width: 200,
          fixed: "left",
        },
      ],
    },
    {
      title: "Conversaciones",
      dataIndex: "messages",
      key: "messages",
      align: "center",
      render: (status, record) => {
        return (
          <div>
            <Button
              type="link"
              size="small"
              onClick={() => {
                setIsVisibleMeessages(true);
                setIsVisibleViewImage(true);
                handlerCallGetCustomerMessage(record);
              }}
            >
              Ver
            </Button>
          </div>
        );
      },
    },
    {
      title: (
        <div style={{ display: "flex", justifyContent: "center" }}>
          Tipo de contrato
          <br />
          Estado / Propietario - Inquilino / Obligado S. / Aval
        </div>
      ),
      dataIndex: "digitalContractTemplate",
      key: "digitalContractTemplate",
      width: 350,
      align: "center",
    },
    {
      title: "Contrato",
      children: [
        {
          title: "Estatus",
          dataIndex: "contractStatus",
          key: "contractStatus",
          align: "center",
          render: (status, record) => {
            return (
              <span>
                <Tag color={record.contractStatusStyle} key="1">
                  {status}
                </Tag>
              </span>
            );
          },
        },
        {
          title: "Documento",
          dataIndex: "infoContractDocument",
          key: "infoContractDocument",
          align: "center",
          render: (doc, record) => {
            const dataDocument =
              isNil(doc) === false && isEmpty(doc) === false
                ? JSON.parse(doc)
                : [];
            const dataObjectDocument =
              isEmpty(dataDocument) === false &&
              isNil(dataDocument[0]) === false
                ? dataDocument[0]
                : {};
            const documentId =
              isEmpty(dataObjectDocument.idDocument) === false &&
              isNil(dataObjectDocument.idDocument) === false
                ? dataObjectDocument.idDocument
                : "";
            const bucketSource =
              isEmpty(dataObjectDocument.bucketSource) === false &&
              isNil(dataObjectDocument.bucketSource) === false
                ? dataObjectDocument.bucketSource
                : "";
            const extension =
              isEmpty(dataObjectDocument.extension) === false &&
              isNil(dataObjectDocument.extension) === false
                ? dataObjectDocument.extension
                : "";
            let url = "";

            if (extension === "docx" || extension === "pdf") {
              url = `/api/viewFilesDocx/${documentId}/${bucketSource}`;
            } else {
              url = `${ENVIROMENT}/api/viewFile/${documentId}/${bucketSource}`;
            }

            return (
              <div>
                {isEmpty(documentId) === false &&
                isEmpty(bucketSource) === false &&
                isEmpty(extension) === false ? (
                  <>
                    <Button
                      type="link"
                      size="small"
                      onClick={() => {
                        setDocumentUrl({ url, extension });
                        setIsVisibleViewImage(!isVisibleViewImage);
                      }}
                    >
                      Ver
                    </Button>
                    <a
                      href={`${ENVIROMENT}/api/downloadFile/${documentId}/${bucketSource}/Contrato_${record.idContract}/${extension}`}
                      className="download"
                      download
                      style={{ fontSize: 14 }}
                    >
                      Descargar
                    </a>
                  </>
                ) : (
                  "No disponible"
                )}
              </div>
            );
          },
        },
        {
          title: "Fecha de inicio",
          dataIndex: "startedAt",
          key: "startedAt",
        },
        {
          title: "Fecha de vencimiento",
          dataIndex: "expireAt",
          key: "expireAt",
        },
      ],
    },
    {
      title: "Póliza",
      children: [
        {
          title: "Estatus ",
          dataIndex: "idPolicyStatus",
          key: "idPolicyStatus",
          align: "center",
          render: (status, record) => {
            let component = <div />;
            const contractStatus = record.contractStatus;
            if (status === 1) {
              component = (
                <Tag icon={<CheckSquareOutlined />} color="#1890ff">
                  {record.policyStatus}
                </Tag>
              );
            } else if (status === 2 || status === 3) {
              component = (
                <Tag
                  icon={
                    <span className="anticon">
                      <i className="fa fa-handshake-o" aria-hidden="true" />
                    </span>
                  }
                  color="#00bb2d"
                >
                  {record.policyStatus}
                </Tag>
              );
            } else if (status === 4) {
              component = (
                <Tag
                  icon={
                    <span className="anticon">
                      <i className="fa fa-ban" aria-hidden="true" />
                    </span>
                  }
                  color="#ff0000"
                >
                  {record.policyStatus}
                </Tag>
              );
            }
            return component;
          },
        },
        {
          title: "Tipo de póliza",
          dataIndex: "policy",
          key: "policy",
        },
        {
          title: "Documento",
          dataIndex: "infoPolicyDocument",
          key: "infoPolicyDocument",
          align: "center",
          render: (doc, record) => {
            const dataDocument =
              isNil(doc) === false && isEmpty(doc) === false
                ? JSON.parse(doc)
                : [];
            const dataObjectDocument =
              isEmpty(dataDocument) === false &&
              isNil(dataDocument[0]) === false
                ? dataDocument[0]
                : {};
            const documentId =
              isEmpty(dataObjectDocument.idDocument) === false &&
              isNil(dataObjectDocument.idDocument) === false
                ? dataObjectDocument.idDocument
                : "";
            const bucketSource =
              isEmpty(dataObjectDocument.bucketSource) === false &&
              isNil(dataObjectDocument.bucketSource) === false
                ? dataObjectDocument.bucketSource
                : "";
            const extension =
              isEmpty(dataObjectDocument.extension) === false &&
              isNil(dataObjectDocument.extension) === false
                ? dataObjectDocument.extension
                : "";
            let url = "";

            if (extension === "docx" || extension === "pdf") {
              url = `/api/viewFilesDocx/${documentId}/${bucketSource}`;
            } else {
              url = `${ENVIROMENT}/api/viewFile/${documentId}/${bucketSource}`;
            }

            return (
              <div>
                {isEmpty(documentId) === false &&
                isEmpty(bucketSource) === false &&
                isEmpty(extension) === false ? (
                  <>
                    <Button
                      type="link"
                      size="small"
                      onClick={() => {
                        setDocumentUrl({ url, extension });
                        setIsVisibleViewImage(!isVisibleViewImage);
                      }}
                    >
                      Ver
                    </Button>
                    <a
                      href={`${ENVIROMENT}/api/downloadFile/${documentId}/${bucketSource}/Poliza_${record.idContract}/${extension}`}
                      className="download"
                      download
                      style={{ fontSize: 14 }}
                    >
                      Descargar
                    </a>
                  </>
                ) : (
                  "No disponible"
                )}
              </div>
            );
          },
        },
      ],
    },
    {
      title: "Pagarés",
      children: [
        {
          title: "Documento",
          dataIndex: "infoPaymentDocument",
          key: "infoPaymentDocument",
          align: "center",
          render: (doc, record) => {
            const dataDocument =
              isNil(doc) === false && isEmpty(doc) === false
                ? JSON.parse(doc)
                : [];
            const dataObjectDocument =
              isEmpty(dataDocument) === false &&
              isNil(dataDocument[0]) === false
                ? dataDocument[0]
                : {};
            const documentId =
              isEmpty(dataObjectDocument.idDocument) === false &&
              isNil(dataObjectDocument.idDocument) === false
                ? dataObjectDocument.idDocument
                : "";
            const bucketSource =
              isEmpty(dataObjectDocument.bucketSource) === false &&
              isNil(dataObjectDocument.bucketSource) === false
                ? dataObjectDocument.bucketSource
                : "";
            const extension =
              isEmpty(dataObjectDocument.extension) === false &&
              isNil(dataObjectDocument.extension) === false
                ? dataObjectDocument.extension
                : "";
            let url = "";

            if (extension === "docx" || extension === "pdf") {
              url = `/api/viewFilesDocx/${documentId}/${bucketSource}`;
            } else {
              url = `${ENVIROMENT}/api/viewFile/${documentId}/${bucketSource}`;
            }

            return (
              <div>
                {isEmpty(documentId) === false &&
                isEmpty(bucketSource) === false &&
                isEmpty(extension) === false ? (
                  <>
                    <Button
                      type="link"
                      size="small"
                      onClick={() => {
                        setDocumentUrl({ url, extension });
                        setIsVisibleViewImage(!isVisibleViewImage);
                      }}
                    >
                      Ver
                    </Button>
                    <a
                      href={`${ENVIROMENT}/api/downloadFile/${documentId}/${bucketSource}/Pagare_${record.idContract}/${extension}`}
                      className="download"
                      download
                      style={{ fontSize: 14 }}
                    >
                      Descargar
                    </a>
                  </>
                ) : (
                  "No disponible"
                )}
              </div>
            );
          },
        },
      ],
    },
    {
      title: "Modificación documentos legales",
      dataIndex: "hasAllDocumentation",
      key: "hasAllDocumentationPayment",
      align: "center",
      render: (documents, record) => {
        return (
          <div>
            <button
              className="arrow-back-to"
              type="button"
              style={{ border: "none", background: "transparent" }}
              onClick={() => {
                if (documents === false) {
                  handlerCallContractDocument(record.idContract);
                  setIsVisibleAddDocs(!isVisibleAddDocs);
                }
              }}
            >
              {documents === false ? (
                <img src={DocumentIcon} alt="backTo" width="20" />
              ) : (
                <img src={Lock} alt="backTo" width="20" />
              )}
            </button>
          </div>
        );
      },
    },
    { title: "Incidencias", dataIndex: "incidents", key: "incidents" },
  ];

  useEffect(() => {
    handlerCallGetLegalContractCoincidences();
  }, []);

  return (
    <Content>
      <Modal
        style={{ top: 20 }}
        visible={isVisibleViewImage}
        closable={false}
        footer={false}
        className="modal-signature-contract"
      >
        <div className="form-modal">
          <div className="title-head-modal">
            <button
              className="arrow-back-to"
              type="button"
              onClick={() => {
                setIsVisibleViewImage(!isVisibleViewImage);
                setIsVisibleMeessages(false);
              }}
            >
              <img src={Arrow} alt="backTo" width="30" />
            </button>
            <h1>
              {isVisibleMeessages === false ? "Documento" : "Conversación"}
            </h1>
          </div>
          {isVisibleMeessages === false ? (
            <div className="contract-children-information">
              {documentUrl.extension === "docx" ||
              documentUrl.extension === "pdf" ? (
                <iframe
                  className="iframe-docx-hfy"
                  src={`https://docs.google.com/gview?url=${ENVIROMENT}${documentUrl.url}&embedded=true`}
                />
              ) : (
                <Magnifier src={documentUrl.url} />
              )}
            </div>
          ) : (
            <>
              {isEmpty(dataMessages) === false ? (
                <Timeline>
                  {dataMessages.map((row) => {
                    return (
                      <Timeline.Item>
                        <div style={{ marginBottom: "15px" }}>
                          <p style={{ margin: "0px" }}>
                            <strong>
                              {row.sentByUser} | {row.sentAt}
                            </strong>
                          </p>
                          {row.customerMessage}
                        </div>
                        {isNil(row.sentAtParent) === false && (
                          <Timeline>
                            <Timeline.Item>
                              <div>
                                <p style={{ margin: "0px" }}>
                                  <strong>
                                    {row.sentByUserParent} | {row.sentAtParent}
                                  </strong>
                                </p>
                                {row.customerMessageParent}
                              </div>
                            </Timeline.Item>
                          </Timeline>
                        )}
                      </Timeline.Item>
                    );
                  })}
                </Timeline>
              ) : (
                <strong style={{ display: "flex", justifyContent: "center" }}>
                  Aún no hay una Conversación
                </strong>
              )}
            </>
          )}
        </div>
      </Modal>
      <SectionUploadDocument
        dataDocuments={dataDocuments}
        isModalVisible={isVisibleAddDocs}
        onClose={() => {
          setIsVisibleAddDocs(!isVisibleAddDocs);
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
        <div className="main-information-user-admin">
          <div className="renter-card-information total-width">
            <div className="title-cards flex-title-card">
              <span>Información legal</span>
            </div>
            <div className="section-information-renters">
              <Table
                columns={columns}
                dataSource={dataCoincidences}
                className="table-users-hfy"
                size="small"
                bordered
                scroll={{ x: 3500 }}
              />
            </div>
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
  callGetLegalContractCoincidences: (data) =>
    dispatch(callGetLegalContractCoincidences(data)),
  callGetContractDocument: (data) => dispatch(callGetContractDocument(data)),
  callGetCustomerMessage: (data) => dispatch(callGetCustomerMessage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Attorney);
