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
  Pagination,
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
  callGlobalActionApi,
} from "../../utils/actions/actions";
import { setDataUserProfile } from "../../utils/dispatchs/userProfileDispatch";
import FrontFunctions from "../../utils/actions/frontFunctions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import DocumentIcon from "../../assets/icons/DocumentsIcon.svg";
import Lock from "../../assets/icons/Lock.svg";
import Arrow from "../../assets/icons/Arrow.svg";
import SectionUploadDocument from "../Admin/sections/sectionUploadDocuments";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import ENVIROMENT from "../../utils/constants/enviroments";
import CustomViewDocument from "../../components/CustomViewDocument";

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
    callGlobalActionApi,
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
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [isVisibleModalDocument, setIsVisibleModalDocument] = useState(false);
  const [dataDocument, setDataDocument] = useState({});
  const [valueSearch, setValueSearch] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [totalCoincidences, setTotalCoincidences] = useState(0);
  const [currentPagination, setCurrentPagination] = useState(1);
  const [paginationState, setPaginationState] = useState(
    JSON.stringify({
      currentPage: currentPagination,
      userConfig: pageSize,
    })
  );
  const [jsonConditionsState, setJsonConditionsState] = useState(
    JSON.stringify([
      {
        queryCondition: 1,
        compValue: null,
      },
    ])
  );

  const frontFunctions = new FrontFunctions();

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

  const handlerCallSetContractApprovement = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idContract: id,
          idLoginHistory,
        },
        idSystemUser,
        API_CONSTANTS.CUSTOMER.SET_CONTRACT_APPROVEMENT,
        "PUT"
      );
      frontFunctions.showMessageStatusApi(
        "Se ejecutó correctamente la petición",
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
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

  const handlerCallGetLegalContractCoincidences = async (condition, pag) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGetLegalContractCoincidences({
        idSystemUser,
        idLoginHistory,
        jsonConditions: condition,
        pagination: pag,
      });
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      const responseResultTotal =
        isEmpty(responseResult) === false &&
        isNil(responseResult[0]) === false &&
        isNil(responseResult[0].total) === false
          ? responseResult[0].total
          : 0;
      setTotalCoincidences(responseResultTotal);
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

  const handlerCallGenerateDocument = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        id,
        API_CONSTANTS.CUSTOMER.GENERATE_DOCUMENT,
        "PUT"
      );
      const responseResultMessage =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : {};
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : {};
      frontFunctions.showMessageStatusApi(
        responseResultMessage,
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
      return responseResult;
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
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
      title: <strong>Partes involucradas</strong>,
      fixed: "left",
      children: [
        {
          title: "Arrendador",
          dataIndex: "customerFullName",
          key: "customerFullName",
          width: 200,
          render: (text, record) => (
            <div
              style={{
                color: "blue",
                cursor: "pointer",
              }}
              onClick={() => {
                if (isNil(record.idCustomer) === false) {
                  history.push(
                    `/websystem/userType-detail/${record.idCustomer}`
                  );
                }
              }}
            >
              <u>{text}</u>
            </div>
          ),
        },
        {
          title: "Arrendatario",
          dataIndex: "customerTenantFullName",
          key: "customerTenantFullName",
          width: 200,
          render: (text, record) => (
            <div
              style={{
                color: "blue",
                cursor: "pointer",
              }}
              onClick={() => {
                if (isNil(record.idCustomerTenant) === false) {
                  history.push(
                    `/websystem/userType-detail/${record.idCustomerTenant}`
                  );
                }
              }}
            >
              <u>{text}</u>
            </div>
          ),
        },
        {
          title: "Obligado Solidario",
          dataIndex: "customerTenantBoundSolidarityFullName",
          key: "customerTenantBoundSolidarityFullName",
          width: 200,
          render: (text, record) => (
            <div
              style={{
                color: "blue",
                cursor: "pointer",
              }}
              onClick={() => {
                if (isNil(record.idCustomerTenantBoundSolidarity) === false) {
                  history.push(
                    `/websystem/userType-detail/${record.idCustomerTenantBoundSolidarity}`
                  );
                }
              }}
            >
              {isNil(record.idCustomerTenantBoundSolidarity) === false ? (
                <u>{text}</u>
              ) : (
                <span>{text}</span>
              )}
            </div>
          ),
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
      title: <strong>Confirmación de Documentos</strong>,
      children: [
        {
          title: "Documentos generados",
          dataIndex: "jsonDocuments",
          key: "jsonDocuments",
          render: (name, record) => {
            const catalogDocuments =
              isNil(name) === false && isEmpty(name) === false
                ? JSON.parse(name)
                : [];
            return isEmpty(catalogDocuments) === false ? (
              <Dropdown
                overlay={
                  <Menu>
                    {isEmpty(catalogDocuments) === false &&
                      catalogDocuments.map((rowMap) => {
                        return (
                          <Menu.Item
                            key={`${rowMap.idDocument}`}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                            onClick={async () => {
                              try {
                                setSpinVisible(true);
                                const response =
                                  await handlerCallGenerateDocument(
                                    {
                                      idDocument: rowMap.idDocument,
                                      idPreviousDocument:
                                        rowMap.idPreviousDocument,
                                      idDocumentType: rowMap.idDocumentType,
                                      bucketSource: rowMap.bucketSource,
                                      previousBucketSource:
                                        rowMap.previousBucketSource,
                                      canGenerateDocument:
                                        rowMap.canGenerateDocument,
                                      type: rowMap.type,
                                    },
                                    record.idContract
                                  );
                                setIsVisibleModalDocument(true);
                                setDataDocument({
                                  ...rowMap,
                                  url: response.url,
                                  newIdDocument: response.newIdDocument,
                                  newBucketSorce: response.newBucketSorce,
                                });
                                setSpinVisible(false);
                              } catch (error) {
                                setSpinVisible(false);
                              }
                            }}
                          >
                            <a>{rowMap.documentType}</a>
                          </Menu.Item>
                        );
                      })}
                  </Menu>
                }
                trigger={["click"]}
              >
                <a>Documentos</a>
              </Dropdown>
            ) : (
              <span>Documentos no disponibles</span>
            );
          },
        },
        {
          title: "Solicitado el",
          dataIndex: "requestedAtFormat",
          key: "requestedAtFormat",
        },
        {
          title: "Confirmar antes de:",
          dataIndex: "timeRemaining",
          key: "timeRemaining",
        },
        {
          title: "Confirmado el:",
          dataIndex: "contractConfirmedAtFormat",
          key: "contractConfirmedAtFormat",
        },
        {
          title: "Confirmado por:",
          dataIndex: "contractConfirmedByUser",
          key: "contractConfirmedByUser",
        },
        {
          title: "Confirmar documento",
          dataIndex: "canConfirmContract",
          key: "canConfirmContract",
          render: (status, record) => {
            return status === true ? (
              <div
                style={{
                  cursor: "pointer",
                }}
                onClick={async () => {
                  await handlerCallSetContractApprovement(record.idContract);
                  handlerCallGetLegalContractCoincidences();
                }}
              >
                <span>
                  <Tag color="var(--color-primary)" key="1">
                    Confirmar
                  </Tag>
                </span>
              </div>
            ) : (
              <></>
            );
          },
        },
      ],
    },
    {
      title: <strong>Contrato</strong>,
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
      title: <strong>Póliza</strong>,
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
    handlerCallGetLegalContractCoincidences(
      jsonConditionsState,
      paginationState
    );
  }, []);

  return (
    <Content>
      <CustomViewDocument
        isVisibleModal={isVisibleModalDocument}
        downloadDoc
        dataDocument={dataDocument}
        onClose={() => {
          setIsVisibleModalDocument(false);
          setDataDocument({});
        }}
      />
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
        <div
          style={{
            margin: "10px 0px",
          }}
        >
          <input
            style={{
              border: "1px solid var(--color-primary)",
              borderRadius: "16px",
              padding: "5px 10px",
              width: "300px",
            }}
            placeholder="Busca por Nombre o Folio de contrato"
            type="text"
            value={valueSearch}
            onChange={(e) => {
              setValueSearch(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.charCode === 13) {
                const conditional = JSON.stringify([
                  {
                    queryCondition: 1,
                    compValue:
                      isEmpty(valueSearch) === false ? valueSearch : null,
                  },
                ]);
                const pagination = JSON.stringify({
                  currentPage: 1,
                  userConfig: 10,
                });
                setCurrentPagination(1);
                setPageSize(10);
                setPaginationState(pagination);
                setJsonConditionsState(conditional);
                handlerCallGetLegalContractCoincidences(
                  conditional,
                  pagination
                );
              }
            }}
          />
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
                  scroll={{ x: 3700 }}
                  pagination={false}
                />
              </Spin>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "15px",
        }}
      >
        <Pagination
          current={currentPagination}
          total={totalCoincidences}
          pageSize={pageSize}
          pageSizeOptions={[10, 20, 50, 100]}
          onChange={(page, sizePage) => {
            setCurrentPagination(page);
            setPageSize(sizePage);
            const objectConditions = JSON.stringify({
              currentPage: page,
              userConfig: sizePage,
            });
            setPaginationState(objectConditions);
            handlerCallGetLegalContractCoincidences(
              jsonConditionsState,
              objectConditions
            );
          }}
        />
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
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Attorney);
