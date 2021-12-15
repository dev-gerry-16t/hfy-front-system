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
  Spin,
} from "antd";
import {
  CheckSquareOutlined,
  DownloadOutlined,
  CheckCircleTwoTone,
  EditTwoTone,
  QuestionCircleOutlined,
  CloseCircleFilled,
  CheckCircleFilled,
  SyncOutlined,
} from "@ant-design/icons";
import {
  callGetLegalContractCoincidences,
  callGetContractDocument,
  callGetCustomerMessage,
  callGetContractComment,
} from "../../utils/actions/actions";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import DocumentIcon from "../../assets/icons/DocumentsIcon.svg";
import Lock from "../../assets/icons/Lock.svg";
import Arrow from "../../assets/icons/Arrow.svg";
import SectionUploadDocument from "../Admin/sections/sectionUploadDocuments";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import ENVIROMENT from "../../utils/constants/enviroments";

const { Content } = Layout;

const LoadingSpin = <SyncOutlined spin />;

const Attorney = (props) => {
  const {
    history,
    dataProfile,
    callGetLegalContractCoincidences,
    callGetContractDocument,
    callGetCustomerMessage,
    setDataUserProfile,
    callGetContractComment,
  } = props;
  const [dataCoincidences, setDataCoincidences] = useState([]);
  const [isVisibleAddDocs, setIsVisibleAddDocs] = useState(false);
  const [isVisibleViewImage, setIsVisibleViewImage] = useState(false);
  const [isVisibleMeessages, setIsVisibleMeessages] = useState(false);
  const [isVisibleComments, setIsVisibleComments] = useState(false);
  const [dataDocuments, setDataDocuments] = useState([]);
  const [dataMessages, setDataMessages] = useState([]);
  const [dataComments, setDataComments] = useState([]);
  const [documentUrl, setDocumentUrl] = useState({});
  const [idTopIndexMessage, setIdTopIndexMessage] = useState(-1);
  const [spinVisible, setSpinVisible] = useState(false);

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

  const handlerCallContractComment = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetContractComment({
        idSystemUser,
        idLoginHistory,
        topIndex: 0,
        ...data,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataComments(responseResult);
      // if (isEmpty(responseResult) === false) {
      //   setIdTopIndexMessage(responseResult[0].topIndex);
      // }
    } catch (error) {
      showMessageStatusApi(
        "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetContractDocumentById = async (
    data,
    name,
    resultExtension,
    onlyView = false
  ) => {
    const { idSystemUser, idLoginHistory, token } = dataProfile;
    try {
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
            onlyView,
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
      if (onlyView === false) {
        const blob = await responseDownload.blob();
        const link = document.createElement("a");
        link.className = "download";
        link.download = `${name}.${resultExtension}`;
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        link.parentElement.removeChild(link);
      } else {
        return await responseDownload.json();
      }
    } catch (error) {
      showMessageStatusApi(
        "No está disponible el documento",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const columns = [
    {
      title: "Folio",
      dataIndex: "hfInvoice",
      key: "hfInvoice",
      fixed: "left",
      width: 100,
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
          render: (name, record) => {
            const catalogProperties =
              isNil(record.customerTypeFormProperties) === false
                ? JSON.parse(record.customerTypeFormProperties)
                : [];
            return (
              <Dropdown
                overlay={
                  <Menu
                    onClick={async (value) => {
                      await setDataUserProfile({
                        ...dataProfile,
                        idCustomerTenant: null,
                        idCustomerTF: record.idCustomer,
                        idCustomer: record.idCustomer,
                        idContract: record.idContract,
                      });
                      history.push(`/websystem/typeform-owner/${value.key}`);
                    }}
                  >
                    {isEmpty(catalogProperties) === false &&
                      catalogProperties.map((rowMap) => {
                        return (
                          <Menu.Item
                            key={`${rowMap.idStepIn}`}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <a style={{ marginRight: 2 }}>{rowMap.stepIn}</a>
                            {rowMap.isCompleted === true ? (
                              <CheckCircleFilled style={{ color: "green" }} />
                            ) : (
                              <CloseCircleFilled style={{ color: "red" }} />
                            )}
                          </Menu.Item>
                        );
                      })}
                  </Menu>
                }
                trigger={["click"]}
              >
                <a>{name}</a>
              </Dropdown>
            );
          },
        },
        {
          title: "Arrendatario",
          dataIndex: "customerTenantFullName",
          key: "customerTenantFullName",
          width: 200,
          render: (name, record) => {
            const catalogProperties =
              isNil(record.customerTenantTypeFormProperties) === false
                ? JSON.parse(record.customerTenantTypeFormProperties)
                : [];
            return (
              <Dropdown
                overlay={
                  <Menu
                    onClick={async (value) => {
                      await setDataUserProfile({
                        ...dataProfile,
                        idCustomerTenantTF: record.idCustomerTenant,
                        idCustomerTF: record.idCustomer,
                        idContract: record.idContract,
                      });
                      history.push(`/websystem/typeform-user/${value.key}`);
                    }}
                  >
                    {isEmpty(catalogProperties) === false &&
                      catalogProperties.map((rowMap) => {
                        return (
                          <Menu.Item
                            key={`${rowMap.idStepIn}`}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <a style={{ marginRight: 2 }}>{rowMap.stepIn}</a>
                            {rowMap.isCompleted === true ? (
                              <CheckCircleFilled style={{ color: "green" }} />
                            ) : (
                              <CloseCircleFilled style={{ color: "red" }} />
                            )}
                          </Menu.Item>
                        );
                      })}
                  </Menu>
                }
                trigger={["click"]}
              >
                <a>{name}</a>
              </Dropdown>
            );
          },
        },
        {
          title: "Obligado Solidario",
          dataIndex: "customerTenantBoundSolidarityFullName",
          key: "customerTenantBoundSolidarityFullName",
          width: 200,
          render: (name, record) => {
            const catalogProperties =
              isNil(record.customerTenantBoundSolidarityTypeFormProperties) ===
              false
                ? JSON.parse(
                    record.customerTenantBoundSolidarityTypeFormProperties
                  )
                : [];
            return (
              <>
                {record.hasBoundSolidarity === true ? (
                  <Dropdown
                    overlay={
                      <Menu
                        onClick={async (value) => {
                          await setDataUserProfile({
                            ...dataProfile,
                            idCustomerTenantTF:
                              record.idCustomerTenantBoundSolidarity,
                            idCustomerTF: record.idCustomer,
                            idContract: record.idContract,
                          });
                          history.push(`/websystem/typeform-user/${value.key}`);
                        }}
                      >
                        {isEmpty(catalogProperties) === false &&
                          catalogProperties.map((rowMap) => {
                            return (
                              <Menu.Item
                                key={`${rowMap.idStepIn}`}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <a style={{ marginRight: 2 }}>
                                  {rowMap.stepIn}
                                </a>
                                {rowMap.isCompleted === true ? (
                                  <CheckCircleFilled
                                    style={{ color: "green" }}
                                  />
                                ) : (
                                  <CloseCircleFilled style={{ color: "red" }} />
                                )}
                              </Menu.Item>
                            );
                          })}
                      </Menu>
                    }
                    trigger={["click"]}
                  >
                    <a>{name}</a>
                  </Dropdown>
                ) : (
                  <>{name}</>
                )}
              </>
            );
          },
        },
        {
          title: "Conversaciones",
          dataIndex: "messages",
          key: "messages",
          align: "center",
          width: 150,
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
          title: "Comentarios en contrato",
          dataIndex: "commentsContract",
          key: "commentsContract",
          align: "center",
          width: 150,
          render: (status, record) => {
            return (
              <div>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    handlerCallContractComment({
                      idCustomer: record.idCustomer,
                      idCustomerTenant: record.idCustomerTenant,
                      idContract: record.idContract,
                      idDigitalContract: record.idDigitalContract,
                    });
                    setIsVisibleComments(true);
                  }}
                >
                  Ver
                </Button>
              </div>
            );
          },
        },
      ],
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
            const canGenerateDocument =
              isNil(dataObjectDocument.canGenerateDocument) === false
                ? dataObjectDocument.canGenerateDocument
                : false;
            const idPreviousDocument =
              isEmpty(dataObjectDocument.idPreviousDocument) === false &&
              isNil(dataObjectDocument.idPreviousDocument) === false
                ? dataObjectDocument.idPreviousDocument
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
                      onClick={async () => {
                        if (canGenerateDocument === true) {
                          setSpinVisible(true);
                          try {
                            const response =
                              await handlerCallGetContractDocumentById(
                                {
                                  idContract: record.idContract,
                                  idCustomer: record.idCustomer,
                                  idCustomerTenant: record.idCustomerTenant,
                                  type: 1,
                                  typeProcess: 1,
                                },
                                `Contrato_${record.idContract}`,
                                extension,
                                true
                              );

                            setSpinVisible(false);
                            await setDocumentUrl({
                              url: response.response.url,
                              extension,
                            });
                            setIsVisibleViewImage(!isVisibleViewImage);
                          } catch (error) {
                            setSpinVisible(false);
                          }
                        } else {
                          setDocumentUrl({ url, extension });
                          setIsVisibleViewImage(!isVisibleViewImage);
                        }
                      }}
                    >
                      Ver
                    </Button>
                    {canGenerateDocument === true ? (
                      <Button
                        type="link"
                        size="small"
                        onClick={async () => {
                          setSpinVisible(true);
                          try {
                            await handlerCallGetContractDocumentById(
                              {
                                idContract: record.idContract,
                                idCustomer: record.idCustomer,
                                idCustomerTenant: record.idCustomerTenant,
                                type: 1,
                                typeProcess: 1,
                              },
                              `Contrato_${record.idContract}`,
                              extension
                            );
                            setSpinVisible(false);
                          } catch (error) {
                            setSpinVisible(false);
                          }
                        }}
                      >
                        Descargar
                      </Button>
                    ) : (
                      <a
                        href={`${ENVIROMENT}/api/downloadFile/${documentId}/${bucketSource}/Pagare_${record.idContract}/${extension}`}
                        className="download"
                        download
                        style={{ fontSize: 14 }}
                      >
                        Descargar
                      </a>
                    )}
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
            const canGenerateDocument =
              isNil(dataObjectDocument.canGenerateDocument) === false
                ? dataObjectDocument.canGenerateDocument
                : false;
            const idPreviousDocument =
              isEmpty(dataObjectDocument.idPreviousDocument) === false &&
              isNil(dataObjectDocument.idPreviousDocument) === false
                ? dataObjectDocument.idPreviousDocument
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
                      onClick={async () => {
                        if (canGenerateDocument === true) {
                          setSpinVisible(true);
                          try {
                            const response =
                              await handlerCallGetContractDocumentById(
                                {
                                  idContract: record.idContract,
                                  idCustomer: record.idCustomer,
                                  idCustomerTenant: record.idCustomerTenant,
                                  type: 3,
                                  typeProcess: 2,
                                },
                                `Poliza_${record.idContract}`,
                                extension,
                                true
                              );

                            setSpinVisible(false);
                            await setDocumentUrl({
                              url: response.response.url,
                              extension,
                            });
                            setIsVisibleViewImage(!isVisibleViewImage);
                          } catch (error) {
                            setSpinVisible(false);
                          }
                        } else {
                          setDocumentUrl({ url, extension });
                          setIsVisibleViewImage(!isVisibleViewImage);
                        }
                      }}
                    >
                      Ver
                    </Button>
                    {canGenerateDocument === true ? (
                      <Button
                        type="link"
                        size="small"
                        onClick={async () => {
                          setSpinVisible(true);
                          try {
                            await handlerCallGetContractDocumentById(
                              {
                                idContract: record.idContract,
                                idCustomer: record.idCustomer,
                                idCustomerTenant: record.idCustomerTenant,
                                type: 3,
                                typeProcess: 2,
                              },
                              `Poliza_${record.idContract}`,
                              extension
                            );
                            setSpinVisible(false);
                          } catch (error) {
                            setSpinVisible(false);
                          }
                        }}
                      >
                        Descargar
                      </Button>
                    ) : (
                      <a
                        href={`${ENVIROMENT}/api/downloadFile/${documentId}/${bucketSource}/Pagare_${record.idContract}/${extension}`}
                        className="download"
                        download
                        style={{ fontSize: 14 }}
                      >
                        Descargar
                      </a>
                    )}
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
            const canGenerateDocument =
              isNil(dataObjectDocument.canGenerateDocument) === false
                ? dataObjectDocument.canGenerateDocument
                : false;
            const idPreviousDocument =
              isEmpty(dataObjectDocument.idPreviousDocument) === false &&
              isNil(dataObjectDocument.idPreviousDocument) === false
                ? dataObjectDocument.idPreviousDocument
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
                      onClick={async () => {
                        if (canGenerateDocument === true) {
                          setSpinVisible(true);
                          try {
                            const response =
                              await handlerCallGetContractDocumentById(
                                {
                                  idContract: record.idContract,
                                  idCustomer: record.idCustomer,
                                  idCustomerTenant: record.idCustomerTenant,
                                  type: 2,
                                  typeProcess: 4,
                                },
                                `Pagare_${record.idContract}`,
                                extension,
                                true
                              );

                            setSpinVisible(false);
                            await setDocumentUrl({
                              url: response.response.url,
                              extension,
                            });
                            setIsVisibleViewImage(!isVisibleViewImage);
                          } catch (error) {
                            setSpinVisible(false);
                          }
                        } else {
                          setDocumentUrl({ url, extension });
                          setIsVisibleViewImage(!isVisibleViewImage);
                        }
                      }}
                    >
                      Ver
                    </Button>
                    {canGenerateDocument === true ? (
                      <Button
                        type="link"
                        size="small"
                        onClick={async () => {
                          setSpinVisible(true);
                          try {
                            await handlerCallGetContractDocumentById(
                              {
                                idContract: record.idContract,
                                idCustomer: record.idCustomer,
                                idCustomerTenant: record.idCustomerTenant,
                                type: 2,
                                typeProcess: 4,
                              },
                              `Pagare_${record.idContract}`,
                              extension
                            );
                            setSpinVisible(false);
                          } catch (error) {
                            setSpinVisible(false);
                          }
                        }}
                      >
                        Descargar
                      </Button>
                    ) : (
                      <a
                        href={`${ENVIROMENT}/api/downloadFile/${documentId}/${bucketSource}/Pagare_${record.idContract}/${extension}`}
                        className="download"
                        download
                        style={{ fontSize: 14 }}
                      >
                        Descargar
                      </a>
                    )}
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
      <Modal
        style={{ top: 20 }}
        visible={isVisibleComments}
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
                setIsVisibleComments(!isVisibleComments);
              }}
            >
              <img src={Arrow} alt="backTo" width="30" />
            </button>
            <h1>Comentarios</h1>
          </div>

          {isEmpty(dataComments) === false ? (
            <Timeline>
              {dataComments.map((row) => {
                return (
                  <Timeline.Item>
                    <div style={{ marginBottom: "15px" }}>
                      <p style={{ margin: "0px" }}>
                        <strong>
                          {row.createdByUser} | {row.createdAt}
                        </strong>
                      </p>
                      {row.comment}
                    </div>
                  </Timeline.Item>
                );
              })}
            </Timeline>
          ) : (
            <strong style={{ display: "flex", justifyContent: "center" }}>
              Aún no hay comentarios
            </strong>
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
              <Spin indicator={LoadingSpin} spinning={spinVisible} delay={100}>
                <Table
                  columns={columns}
                  dataSource={dataCoincidences}
                  className="table-users-hfy"
                  size="small"
                  bordered
                  scroll={{ x: 3500 }}
                />
              </Spin>
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
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
  callGetLegalContractCoincidences: (data) =>
    dispatch(callGetLegalContractCoincidences(data)),
  callGetContractDocument: (data) => dispatch(callGetContractDocument(data)),
  callGetCustomerMessage: (data) => dispatch(callGetCustomerMessage(data)),
  callGetContractComment: (data) => dispatch(callGetContractComment(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Attorney);
