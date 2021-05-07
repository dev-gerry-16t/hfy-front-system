import React, { useState, useEffect } from "react";
import isNil from "lodash/isNil";
import moment from "moment";
import isEmpty from "lodash/isEmpty";
import {
  Row,
  Col,
  Drawer,
  Collapse,
  Menu,
  Dropdown,
  Timeline,
  Alert,
  Button,
  Modal,
  DatePicker,
  Spin,
} from "antd";
import {
  CloseCircleFilled,
  CheckCircleFilled,
  MobileOutlined,
  SnippetsOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";

const { Panel } = Collapse;

const LoadingSpin = <SyncOutlined spin />;

const SectionDetailUser = (props) => {
  const {
    isDrawerVisible,
    onClose,
    dataDetailCustomer,
    onRedirectTo,
    dataMessages,
    onDownloadDocumentById,
    onAcceptContract,
  } = props;
  const [startedAt, setStartedAt] = useState(null);
  const [scheduleSignatureDate, setScheduleSignatureDate] = useState(null);
  const [catalogProperties, setCatalogProperties] = useState([]);
  const [internalModal, setInternalModal] = useState(false);
  const [signaturePrecencial, setSignaturePrecencial] = useState(false);
  const [generateContract, setGenerateContract] = useState(false);
  const [spinVisible, setSpinVisible] = useState(false);

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <strong className="site-description-item-profile-p-label">
        {title}:
      </strong>
      <br />
      {content}
    </div>
  );

  const replaceUrl = (address) => {
    let domainPath = "https://www.google.com/maps/search/";

    if (isNil(address) === false) {
      const replaceString = address.replaceAll(" ", "+");
      domainPath = domainPath + replaceString;
    }
    return (
      <a href={domainPath} target="_blank">
        {address}
      </a>
    );
  };

  const menu = (row) => {
    return (
      <Menu>
        <Menu.Item key="0">
          <a
            href={
              isNil(row.phoneNumber) === false
                ? `https://api.whatsapp.com/send?phone=52${row.phoneNumber}`
                : "#"
            }
            target="_blank"
          >
            Whatsapp
          </a>
        </Menu.Item>
        {/* <Menu.Item key="1">
          <a>Notificación</a>
        </Menu.Item>
        <Menu.Item key="2">
          <a>Mensaje app</a>
        </Menu.Item>
        <Menu.Item key="3">
          <a>Correo</a>
        </Menu.Item> */}
      </Menu>
    );
  };

  const returnComponentPaymentPolicy = (data) => {
    let component = <div />;
    if (isEmpty(data) === false && isNil(data) === false) {
      const arrayParseData = JSON.parse(data);
      component = arrayParseData.map((row) => {
        const arrayParseDataIcon =
          isEmpty(row.gwTransactionStatusStyle) === false &&
          isNil(row.gwTransactionStatusStyle) === false
            ? JSON.parse(row.gwTransactionStatusStyle)
            : {};
        return (
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Nombre y porcentaje de pago asignado"
                content={row.fullName}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Monto" content={row.amountFormat} />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Estatus del pago"
                content={
                  <div>
                    <i
                      className={arrayParseDataIcon.icon}
                      style={{
                        color: arrayParseDataIcon.color,
                        marginRight: 10,
                      }}
                    />
                    <span>{arrayParseDataIcon.text}</span>
                  </div>
                }
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Fecha de pago"
                content={row.lastPaymentAt}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Info de cargo"
                content={row.serviceIdPC}
              />
            </Col>
          </Row>
        );
      });
    } else {
      component = <strong>No existen pagos asignados</strong>;
    }
    return component;
  };

  useEffect(() => {
    if (isNil(dataDetailCustomer.typeFormProperties) === false) {
      const catalogProps = JSON.parse(dataDetailCustomer.typeFormProperties);
      setCatalogProperties(catalogProps);
    }
  }, [dataDetailCustomer]);

  return (
    <Drawer
      width={500}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={isDrawerVisible}
    >
      <Modal
        style={{ top: 20 }}
        visible={internalModal}
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
                setInternalModal(false);
              }}
            >
              <img src={Arrow} alt="backTo" width="30" />
            </button>
            <h1>Contrato</h1>
          </div>
          <div className="main-form-information">
            <div className="contract-card-information">
              <div id="step_1_contract" className="main-form-information">
                <div style={{ marginBottom: "15px", textAlign: "center" }}>
                  <h3
                    style={{
                      fontWeight: "500",
                      color: "var(--color-primary)",
                    }}
                  >
                    ¿Como se firmara el contrato?
                  </h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    fontFamily: "Poppins",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <MobileOutlined
                      style={{
                        fontSize: "80px",
                        color:
                          signaturePrecencial === true
                            ? "var(--color-primary)"
                            : "#a0a3bd",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSignaturePrecencial(true);
                      }}
                    />
                    <label
                      style={{
                        color: "#4e4b66",
                        fontWeight: 600,
                        fontSize: 15,
                        marginTop: 5,
                      }}
                    >
                      Firma electrónica
                    </label>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <SnippetsOutlined
                      style={{
                        fontSize: "80px",
                        color:
                          signaturePrecencial === true
                            ? "#a0a3bd"
                            : "var(--color-primary)",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSignaturePrecencial(false);
                      }}
                    />
                    <label
                      style={{
                        color: "#4e4b66",
                        fontWeight: 600,
                        fontSize: 15,
                        marginTop: 5,
                      }}
                    >
                      Firma presencial
                    </label>
                  </div>
                </div>
              </div>
              <div
                id="step_2_contract_presencial"
                className="contract-children-information"
              >
                <div style={{ margin: "15px 0px" }}>
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "var(--color-primary)",
                    }}
                  >
                    Selecciona el dia y la hora que se firmara el contrato y el
                    dia de inicio del contrato de arrendamiento
                  </label>
                </div>
                <Row>
                  <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                    <DatePicker
                      value={
                        isNil(scheduleSignatureDate) === false
                          ? moment(scheduleSignatureDate, "YYYY-MM-DD HH:mm:ss")
                          : null
                      }
                      placeholder="Fecha y hora de firma"
                      onChange={(momentFormat, date) => {
                        setScheduleSignatureDate(
                          moment(momentFormat).format("YYYY-MM-DD HH:mm:ss")
                        );
                      }}
                      showTime={{
                        defaultValue: moment("00:00:00", "HH:mm:ss"),
                      }}
                      format="DD MMMM YYYY HH:mm"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                    <DatePicker
                      value={
                        isNil(startedAt) === false
                          ? moment(startedAt, "YYYY-MM-DD")
                          : null
                      }
                      placeholder="Fecha de inicio del contrato"
                      onChange={(momentFormat, date) => {
                        setStartedAt(moment(momentFormat).format("YYYY-MM-DD"));
                      }}
                      format="DD MMMM YYYY"
                    />
                  </Col>
                </Row>
                <div className="two-action-buttons">
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        setGenerateContract(true);
                        await onAcceptContract({
                          idCustomer: dataDetailCustomer.idCustomer,
                          idCustomerTenant: dataDetailCustomer.idCustomerTenant,
                          idPolicy: null,
                          idContract: dataDetailCustomer.idContract,
                          digitalSignature: null,
                          anex2: null,
                          startedAt: startedAt,
                          scheduleSignatureDate: scheduleSignatureDate,
                          collectionDays: null,
                          type: 1,
                          isFaceToFace: !signaturePrecencial,
                        });

                        setInternalModal(false);
                        setSignaturePrecencial(false);
                        setScheduleSignatureDate(null);
                        setStartedAt(null);
                        setGenerateContract(false);
                      } catch (error) {}
                    }}
                  >
                    <span>
                      {generateContract === true
                        ? "Espera por favor"
                        : "Aceptar"}
                    </span>
                    {generateContract === true && (
                      <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="content-infomation-drawer">
        <div className="form-modal">
          <div className="title-head-modal">
            <button
              className="arrow-back-to"
              type="button"
              onClick={() => {
                onClose();
              }}
            >
              <img src={Arrow} alt="backTo" width="30" />
            </button>
            <h1>Detalle de Propietario</h1>
          </div>
        </div>
        {dataDetailCustomer.canGenerateContract === true && (
          <Alert
            message={
              <div>
                El propietario aún no define la fecha de inicio del contrato y
                la fecha y hora de firma del contrato,
                <br />
                <div style={{ textAlign: "center" }}>
                  <strong>¿Deseas ingresar la información?</strong>
                  <br />
                  <Button
                    onClick={() => {
                      setInternalModal(true);
                    }}
                    style={{ marginTop: 10 }}
                    type="primary"
                    size="small"
                  >
                    Aceptar
                  </Button>
                </div>
              </div>
            }
            type="info"
          />
        )}
        <Collapse defaultActiveKey={["1"]} ghost>
          <Panel
            header={<h3 role="title-section">Información general</h3>}
            key="1"
          >
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Nombre completo"
                  content={dataDetailCustomer.fullName}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Correo"
                  content={dataDetailCustomer.emailAddress}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Teléfono"
                  content={dataDetailCustomer.phoneNumber}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Tipo de cliente"
                  content={dataDetailCustomer.customerType}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="RFC"
                  content={dataDetailCustomer.taxId}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="CURP"
                  content={dataDetailCustomer.citizenId}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Dirección"
                  content={replaceUrl(dataDetailCustomer.fullAddress)}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Enviar mensaje"
                  content={
                    <Dropdown
                      overlay={menu(dataDetailCustomer)}
                      trigger={["click"]}
                    >
                      <a>Enviar</a>
                    </Dropdown>
                  }
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="TypeForm"
                  content={
                    <Dropdown
                      overlay={
                        <Menu
                          onClick={(value) => {
                            onRedirectTo(
                              value.key,
                              dataDetailCustomer.idCustomer,
                              dataDetailCustomer.idContract
                            );
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
                                    <CloseCircleFilled
                                      style={{ color: "red" }}
                                    />
                                  )}
                                </Menu.Item>
                              );
                            })}
                        </Menu>
                      }
                      trigger={["click"]}
                    >
                      <a>Ver</a>
                    </Dropdown>
                  }
                />
              </Col>
            </Row>
          </Panel>
          <Panel header={<h3 role="title-section">Propiedad</h3>} key="2">
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Dirección"
                  content={replaceUrl(dataDetailCustomer.fullAddressProperty)}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Monto de renta"
                  content={dataDetailCustomer.currentRent}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Subir inventario"
                  content={<a>seleccionar</a>}
                />
              </Col>
            </Row>
          </Panel>
          <Panel
            header={<h3 role="title-section">Documentos Legales</h3>}
            key="3"
          >
            <Spin indicator={LoadingSpin} spinning={spinVisible} delay={100}>
              <p>
                <h3>Contrato</h3>
              </p>
              <Row>
                <Col span={12}>
                  <DescriptionItem
                    title="Tipo de persona fiscal"
                    content={dataDetailCustomer.personType}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem
                    title="Estatus"
                    content={dataDetailCustomer.contractStatus}
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem
                    title="Folio"
                    content={dataDetailCustomer.hfInvoice}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem
                    title="Vencimiento"
                    content={dataDetailCustomer.expireAt}
                  />
                </Col>
                <Col span={12}>
                  <a
                    onClick={async () => {
                      setSpinVisible(true);
                      try {
                        await onDownloadDocumentById(
                          {
                            idContract: dataDetailCustomer.idContract,
                            idCustomer: dataDetailCustomer.idCustomer,
                            idCustomerTenant: null,
                            type: 1,
                            typeProcess: 1,
                          },
                          `Contrato_${dataDetailCustomer.idContract}`
                        );
                        setSpinVisible(false);
                      } catch (error) {
                        setSpinVisible(false);
                      }
                    }}
                  >
                    Descargar Contrato
                  </a>
                </Col>
              </Row>
              <div
                className="ant-divider ant-divider-horizontal"
                role="separator"
              />
              <p>
                <h3>Póliza</h3>
              </p>
              <Row>
                <Col span={12}>
                  <DescriptionItem
                    title="Póliza"
                    content={dataDetailCustomer.policy}
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem
                    title="Vencimiento"
                    content={dataDetailCustomer.expireAtPolicy}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <a
                    onClick={async () => {
                      setSpinVisible(true);
                      try {
                        await onDownloadDocumentById(
                          {
                            idContract: dataDetailCustomer.idContract,
                            idCustomer: dataDetailCustomer.idCustomer,
                            idCustomerTenant: null,
                            type: 3,
                            typeProcess: 2,
                          },
                          `Poliza_${dataDetailCustomer.idContract}`
                        );
                        setSpinVisible(false);
                      } catch (error) {
                        setSpinVisible(false);
                      }
                    }}
                  >
                    Descargar Póliza
                  </a>
                </Col>
              </Row>
            </Spin>
          </Panel>

          <Panel
            header={<h3 role="title-section">Documentación personal</h3>}
            key="4"
          >
            <Row>
              {dataDetailCustomer.hasINECustomer === 1 ||
              dataDetailCustomer.hasINECustomer === true ? (
                <>
                  <Col span={8}>
                    <DescriptionItem
                      title="Ine frontal"
                      content={
                        <a
                          onClick={() => {
                            onDownloadDocumentById(
                              {
                                idContract: dataDetailCustomer.idContract,
                                idCustomer: dataDetailCustomer.idCustomer,
                                idCustomerTenant: null,
                                type: 6,
                              },
                              "Identificacion_1"
                            );
                          }}
                        >
                          Descargar
                        </a>
                      }
                    />
                  </Col>
                  <Col span={8}>
                    <DescriptionItem
                      title="Ine vuelta"
                      content={
                        <a
                          onClick={() => {
                            onDownloadDocumentById(
                              {
                                idContract: dataDetailCustomer.idContract,
                                idCustomer: dataDetailCustomer.idCustomer,
                                idCustomerTenant: null,
                                type: 7,
                              },
                              "Identificacion_2"
                            );
                          }}
                        >
                          Descargar
                        </a>
                      }
                    />
                  </Col>{" "}
                </>
              ) : (
                <Col span={16}>
                  <DescriptionItem
                    title="Identificación oficial"
                    content={
                      <a
                        onClick={() => {
                          onDownloadDocumentById(
                            {
                              idContract: dataDetailCustomer.idContract,
                              idCustomer: dataDetailCustomer.idCustomer,
                              idCustomerTenant: null,
                              type: 6,
                            },
                            "Identificacion_1"
                          );
                        }}
                      >
                        Descargar
                      </a>
                    }
                  />
                </Col>
              )}
            </Row>
          </Panel>
          <Panel
            header={<h3 role="title-section">Información de pago</h3>}
            key="5"
          >
            {returnComponentPaymentPolicy(
              dataDetailCustomer.infoPolicyPaymentAssignment
            )}
          </Panel>
          <Panel
            header={<h3 role="title-section">Comentarios Contrato</h3>}
            key="6"
          >
            <div className="panel-comment-user">
              {isEmpty(dataMessages) === false ? (
                <Timeline>
                  {dataMessages.map((row) => {
                    return (
                      <Timeline.Item>
                        <div>
                          <p>
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
                <strong>
                  No existen comentarios por parte del Propietario
                </strong>
              )}
            </div>
          </Panel>
        </Collapse>
      </div>
    </Drawer>
  );
};

export default SectionDetailUser;
