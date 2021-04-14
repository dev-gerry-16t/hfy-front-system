import React, { useState, useEffect } from "react";
import Magnifier from "react-magnifier";
import moment from "moment";
import "moment/locale/es";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import NumberFormat from "react-number-format";
import {
  Modal,
  Input,
  Checkbox,
  Row,
  Col,
  Select,
  Tabs,
  Timeline,
  Spin,
  Tooltip,
  Radio,
  Button,
  DatePicker,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";
import ENVIROMENT from "../../../utils/constants/enviroments";
import Show from "../../../assets/icons/Show.svg";

const { Option } = Select;
const { TabPane } = Tabs;

const CustomSubSectionCardDocument = (props) => {
  const { children, title, subtitle, visibleSubtitle } = props;
  return (
    <div
      className="section-card-documentation"
      style={{
        marginBottom: "15px",
      }}
    >
      <div className="section-title-card-doc">
        <strong>{title}</strong>
        <span
          style={{
            visibility: visibleSubtitle === true ? "visible" : "hidden",
          }}
        >
          {subtitle}
        </span>
      </div>
      <div
        className="section-content-card-doc"
        style={{
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

const SectionDetailIncidence = (props) => {
  const {
    isModalVisible,
    onClose,
    dataIncidenceId,
    dataIncidenceTypes,
    dataIncidenceStatus,
    dataCustomerForIncidence,
    dataRequestStatus,
    dataIncidencePaymentMethods,
    dataProviders,
    dataProviderType,
    onGetAllProvider,
    dataMessages,
    onSendAnnotations,
    onSendInformationIncidence,
    dataDocuments,
  } = props;

  const initialState = {
    idRequestForProviderStatus: null,
    idIncidenceType: null,
    idIncidenceStatus: null,
    idIncidencePaymentMethod: null,
    hasProvider: null,
    idProviderType: null,
    idProvider: null,
    annotations: null,
    scheduleDate: null,
  };
  const [dataForm, setDataForm] = useState(initialState);
  const [dataFormForIncidence, setDataFormForIncidence] = useState({});
  const [previewVisible, setPreviewVisible] = useState(false);
  const [dataDocumentSelect, setDataDocumentSelect] = useState({});

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <strong className="site-description-item-profile-p-label">
        {title}:
      </strong>
      <br />
      {isNil(content) === false ? content : "N/A"}
    </div>
  );

  const callIconForPayment = (key, select, type) => {
    let result = "";
    if (type === "icon") {
      switch (key) {
        case null: {
          if (select === true) {
            result = "fa fa-minus-circle";
          } else {
            result = "fa fa-circle-o";
          }
          break;
        }
        case false:
          result = "fa fa-times-circle";
          break;
        case true:
          result = "fa fa-check-circle";
          break;
        default:
          result = "fa fa-circle-o";
          break;
      }
    } else if (type === "color") {
      switch (key) {
        case null:
          result = "gray";
          break;
        case false:
          result = "red";
          break;
        case true:
          result = "green";
          break;
        default:
          result = "gray";
          break;
      }
    }
    return result;
  };

  useEffect(() => {
    if (
      isEmpty(dataIncidenceId) === false &&
      isEmpty(dataIncidencePaymentMethods) === false
    ) {
      const sielectDefaultPaymentMethods = dataIncidencePaymentMethods.find(
        (row) => {
          return (
            row.idIncidencePaymentMethod ===
            dataIncidenceId.idIncidencePaymentMethod
          );
        }
      );
      if (isNil(dataIncidenceId.idProviderType) === false) {
        onGetAllProvider(
          dataIncidenceId.idProviderType,
          dataIncidenceId.idContract
        );
      }
      setDataForm({
        ...dataForm,
        ...dataIncidenceId,
        hasProvider:
          isNil(sielectDefaultPaymentMethods) === false
            ? sielectDefaultPaymentMethods.hasProvider
            : null,
      });
    }
  }, [dataIncidenceId, dataIncidencePaymentMethods]);

  useEffect(() => {
    if (isEmpty(dataCustomerForIncidence) === false) {
      const newObjectArray = {};
      dataCustomerForIncidence.forEach((element) => {
        newObjectArray[element.idCustomer] = {
          idCustomer: element.idCustomer,
          amount: element.amount,
          select: element.isSelected,
          isPaymentAccepted: element.isPaymentAccepted,
        };
      });
      setDataFormForIncidence(newObjectArray);
    }
  }, [dataCustomerForIncidence]);

  return (
    <Modal
      style={{ top: 20 }}
      visible={isModalVisible}
      closable={false}
      footer={false}
    >
      <div className="form-modal ">
        <div className="title-head-modal">
          <button
            className="arrow-back-to"
            type="button"
            onClick={() => {
              onClose();
              setDataForm(initialState);
            }}
          >
            <img src={Arrow} alt="backTo" width="30" />
          </button>
          <h1>Detalle de Incidencia</h1>
        </div>
        <div className="main-form-information">
          <Tabs type="card">
            <TabPane tab="Información de incidencia" key="1">
              <p style={{ fontSize: 15 }}>1. Información general</p>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <Select
                    placeholder="Estatus"
                    value={dataForm.idIncidenceStatus}
                    onChange={(value, option) => {
                      const optionClick = option.onClick();
                      setDataForm({
                        ...dataForm,
                        idIncidenceStatus: value,
                      });
                    }}
                  >
                    {isEmpty(dataIncidenceStatus) === false &&
                      dataIncidenceStatus.map((row) => {
                        return (
                          <Option
                            value={row.idIncidenceStatus}
                            onClick={() => {
                              return row;
                            }}
                          >
                            {row.text}
                          </Option>
                        );
                      })}
                  </Select>
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <DescriptionItem
                    title="Propietario"
                    content={dataIncidenceId.customerFullName}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <DescriptionItem
                    title="Inquilino"
                    content={dataIncidenceId.customerTenantFullName}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <DescriptionItem
                    title="Fecha de reporte"
                    content={dataIncidenceId.createdAtFormat}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <DescriptionItem
                    title="Contrato"
                    content={dataIncidenceId.hfInvoice}
                  />
                </Col>
              </Row>
              <p style={{ fontSize: 15 }}>2. Información Incidencia</p>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <Select
                    placeholder="Estatus"
                    value={dataForm.idIncidenceType}
                    onChange={(value, option) => {
                      const optionClick = option.onClick();
                      setDataForm({
                        ...dataForm,
                        idIncidenceType: value,
                      });
                    }}
                  >
                    {isEmpty(dataIncidenceTypes) === false &&
                      dataIncidenceTypes.map((row) => {
                        return (
                          <Option
                            value={row.idIncidenceType}
                            onClick={() => {
                              return row;
                            }}
                          >
                            {row.text}
                          </Option>
                        );
                      })}
                  </Select>
                </Col>
              </Row>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <label
                    style={{
                      color: "var(--color-primary)",
                      fontFamily: "Poppins",
                    }}
                  >
                    Descripción
                  </label>
                  <textarea
                    style={{
                      outline: "none",
                      border: "1px solid #d9d9d9",
                      width: "100%",
                      minHeight: 50,
                      borderRadius: "10px",
                      fontFamily: "Poppins",
                    }}
                    value={dataForm.description}
                    maxlength="500"
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        description: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <Select
                    value={dataForm.idIncidencePaymentMethod}
                    placeholder="Asignar método de pago por incidencia"
                    onChange={(value, option) => {
                      const optionClick = option.onClick();
                      setDataForm({
                        ...dataForm,
                        idIncidencePaymentMethod: value,
                        hasProvider: optionClick.hasProvider,
                      });
                    }}
                  >
                    {isEmpty(dataIncidencePaymentMethods) === false &&
                      dataIncidencePaymentMethods.map((row) => {
                        return (
                          <Option
                            value={row.idIncidencePaymentMethod}
                            onClick={() => {
                              return row;
                            }}
                          >
                            {row.text}
                          </Option>
                        );
                      })}
                  </Select>
                </Col>
              </Row>
              {dataForm.hasProvider === true && (
                <>
                  <p style={{ fontSize: 15 }}>
                    3. Ofrecer un servicio de Homify
                  </p>
                  <Row>
                    <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                      <Select
                        placeholder="Tipo de proveedor"
                        value={dataForm.idProviderType}
                        onChange={(value, option) => {
                          const optionClick = option.onClick();
                          setDataForm({
                            ...dataForm,
                            idProviderType: value,
                          });
                          onGetAllProvider(value, dataIncidenceId.idContract);
                        }}
                      >
                        {isEmpty(dataProviderType) === false &&
                          dataProviderType.map((row) => {
                            return (
                              <Option
                                value={row.idProviderType}
                                onClick={() => {
                                  return row;
                                }}
                              >
                                {row.text}
                              </Option>
                            );
                          })}
                      </Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                      <Select
                        placeholder="Proveedor"
                        value={dataForm.idProvider}
                        onChange={(value, option) => {
                          const optionClick = option.onClick();
                          setDataForm({
                            ...dataForm,
                            idProvider: value,
                            amount: optionClick.budgeAmount,
                          });
                        }}
                      >
                        {isEmpty(dataProviders) === false &&
                          dataProviders.map((row) => {
                            return (
                              <Option
                                value={row.idProvider}
                                onClick={() => {
                                  return row;
                                }}
                              >
                                {row.text}
                              </Option>
                            );
                          })}
                      </Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <NumberFormat
                        id={null}
                        customInput={Input}
                        thousandSeparator=","
                        decimalSeparator="."
                        decimalPrecision={2}
                        allowNegative={false}
                        prefix="$"
                        suffix=""
                        value={dataForm.amount}
                        className="inputLogin"
                        floatingLabelText=""
                        isVisible
                        toBlock={false}
                        disable={false}
                        placeholder="Monto del servicio"
                        onValueChange={(values) => {
                          const { formattedValue, value, floatValue } = values;
                          setDataForm({ ...dataForm, amount: floatValue });
                        }}
                        onClick={(event) => {}}
                        onFocus={(event) => {}}
                        onBlur={(event) => {}}
                      />
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <DatePicker
                        value={
                          isNil(dataForm.scheduleDate) === false
                            ? moment(
                                dataForm.scheduleDate,
                                "YYYY-MM-DDTHH:mm:ss"
                              )
                            : null
                        }
                        placeholder="Programado para"
                        onChange={(momentFormat, date) => {
                          setDataForm({
                            ...dataForm,
                            scheduleDate: moment(momentFormat).format(
                              "YYYY-MM-DD HH:mm:ss"
                            ),
                          });
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
                      <Select
                        value={dataForm.idRequestForProviderStatus}
                        placeholder="Estatus del servicio"
                        onChange={(value, option) => {
                          const optionClick = option.onClick();
                          setDataForm({
                            ...dataForm,
                            idRequestForProviderStatus: value,
                          });
                        }}
                      >
                        {isEmpty(dataRequestStatus) === false &&
                          dataRequestStatus.map((row) => {
                            return (
                              <Option
                                value={row.idRequestForProviderStatus}
                                onClick={() => {
                                  return row;
                                }}
                              >
                                {row.text}
                              </Option>
                            );
                          })}
                      </Select>
                    </Col>
                  </Row>
                </>
              )}
              {dataForm.hasProvider === false && (
                <>
                  <p style={{ fontSize: 15 }}>
                    3. Asignar el Monto de la incidencia
                    <Row>
                      <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
                        <NumberFormat
                          id={null}
                          customInput={Input}
                          thousandSeparator=","
                          decimalSeparator="."
                          decimalPrecision={2}
                          allowNegative={false}
                          prefix="$"
                          suffix=""
                          value={dataForm.amount}
                          className="inputLogin"
                          floatingLabelText=""
                          isVisible
                          toBlock={false}
                          disable={false}
                          placeholder="Monto a pagar por la incidencia"
                          onValueChange={(values) => {
                            const {
                              formattedValue,
                              value,
                              floatValue,
                            } = values;
                            setDataForm({ ...dataForm, amount: floatValue });
                          }}
                          onClick={(event) => {}}
                          onFocus={(event) => {}}
                          onBlur={(event) => {}}
                        />
                      </Col>
                    </Row>
                  </p>
                </>
              )}
              {isNil(dataForm.hasProvider) === false && (
                <>
                  <p style={{ fontSize: 15 }}>
                    4. Asignar responsable de la incidencia
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <span>
                      <i
                        style={{
                          marginTop: 8,
                          color: "gray",
                        }}
                        className="fa fa-circle-o"
                      />{" "}
                      Sin asignación
                    </span>
                    <span>
                      <i
                        style={{
                          marginTop: 8,
                          color: "gray",
                        }}
                        className="fa fa-minus-circle"
                      />{" "}
                      Pendiente
                    </span>
                    <span>
                      {" "}
                      <i
                        style={{
                          marginTop: 8,
                          color: "green",
                        }}
                        className="fa fa-check-circle"
                      />{" "}
                      Aceptó
                    </span>
                    <span>
                      {" "}
                      <i
                        style={{
                          marginTop: 8,
                          color: "red",
                        }}
                        className="fa fa-times-circle"
                      />{" "}
                      Rechazó
                    </span>
                  </div>
                  {isEmpty(dataCustomerForIncidence) === false &&
                    dataCustomerForIncidence.map((row) => {
                      return (
                        <Row>
                          <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                            <Checkbox
                              checked={
                                isEmpty(dataFormForIncidence) === false
                                  ? dataFormForIncidence[row.idCustomer].select
                                  : false
                              }
                              onChange={(e, a, i) => {
                                setDataFormForIncidence({
                                  ...dataFormForIncidence,
                                  [row.idCustomer]: {
                                    ...dataFormForIncidence[row.idCustomer],
                                    select: e.target.checked,
                                  },
                                });
                              }}
                            >{`${row.customerType} ${row.fullName}`}</Checkbox>
                          </Col>
                          <Col span={22} xs={{ span: 22 }} md={{ span: 22 }}>
                            <NumberFormat
                              id={null}
                              customInput={Input}
                              thousandSeparator=","
                              decimalSeparator="."
                              decimalPrecision={2}
                              allowNegative={false}
                              prefix="$"
                              suffix=""
                              value={
                                isEmpty(dataFormForIncidence) === false
                                  ? dataFormForIncidence[row.idCustomer].amount
                                  : ""
                              }
                              className="inputLogin"
                              floatingLabelText=""
                              isVisible
                              toBlock={false}
                              disable={false}
                              placeholder="Monto a pagar"
                              onValueChange={(values) => {
                                const {
                                  formattedValue,
                                  value,
                                  floatValue,
                                } = values;
                                setDataFormForIncidence({
                                  ...dataFormForIncidence,
                                  [row.idCustomer]: {
                                    ...dataFormForIncidence[row.idCustomer],
                                    amount: floatValue,
                                  },
                                });
                              }}
                              onClick={(event) => {}}
                              onFocus={(event) => {}}
                              onBlur={(event) => {}}
                            />
                          </Col>
                          <Col span={1} xs={{ span: 1 }} md={{ span: 1 }} />
                          <Col span={1} xs={{ span: 1 }} md={{ span: 1 }}>
                            <i
                              style={{
                                marginTop: 8,
                                color: callIconForPayment(
                                  dataFormForIncidence[row.idCustomer]
                                    .isPaymentAccepted,
                                  dataFormForIncidence[row.idCustomer].select,
                                  "color"
                                ),
                              }}
                              className={callIconForPayment(
                                dataFormForIncidence[row.idCustomer]
                                  .isPaymentAccepted,
                                dataFormForIncidence[row.idCustomer].select,
                                "icon"
                              )}
                            />
                          </Col>
                        </Row>
                      );
                    })}
                </>
              )}
              <div className="two-action-buttons">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setDataForm(initialState);
                  }}
                >
                  <span>Cerrar</span>
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    const arrayDepartment = [];
                    for (const key in dataFormForIncidence) {
                      if (dataFormForIncidence[key].select === true) {
                        arrayDepartment.push(dataFormForIncidence[key]);
                      }
                    }
                    const dataSend = {
                      ...dataForm,
                      customerRequestedForPayment: JSON.stringify(
                        arrayDepartment
                      ),
                    };
                    try {
                      await onSendInformationIncidence(
                        dataSend,
                        dataForm.idIncidence
                      );
                      onClose();
                      setDataForm(initialState);
                    } catch (error) {}
                  }}
                >
                  <span>Enviar</span>
                </button>
              </div>
            </TabPane>
            <TabPane tab="Comentarios" key="2">
              {isEmpty(dataMessages) === false ? (
                <Timeline>
                  {dataMessages.map((row) => {
                    return (
                      <Timeline.Item>
                        <div style={{ marginBottom: "15px" }}>
                          <p style={{ margin: "0px" }}>
                            <strong>
                              {row.createdBy} | {row.createdAt}
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
                  Aún no hay una Conversación
                </strong>
              )}
              <div className="section-message">
                <textarea
                  placeholder="Ingresar comentario"
                  className="text-comment-dialog"
                  value={dataForm.annotations}
                  maxlength="150"
                  onChange={(e) => {
                    setDataForm({ ...dataForm, annotations: e.target.value });
                  }}
                />
                <button
                  type="button"
                  onClick={async () => {
                    await onSendAnnotations(
                      { annotations: dataForm.annotations },
                      dataForm.idIncidence
                    );
                    setDataForm({ ...dataForm, annotations: "" });
                  }}
                >
                  <i className="fa fa-send" />
                </button>
              </div>
            </TabPane>
            <TabPane tab="Evidencia" key="3">
              <div
                className="content-typeform-formulary"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  className="section-top-documentation"
                  style={{ flexDirection: "column" }}
                >
                  {isEmpty(dataDocuments) === false &&
                    dataDocuments.map((row) => {
                      return (
                        <CustomSubSectionCardDocument
                          title={row.documentName}
                          subtitle="N/A"
                          visibleSubtitle={false}
                        >
                          <div className="section-drop-document border-dashed-none">
                            <div className="content-preview-document">
                              <div className="screen-hover-action">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setDataDocumentSelect(row);
                                    setPreviewVisible(!previewVisible);
                                  }}
                                >
                                  <img src={Show} alt="preview" />
                                </button>
                              </div>
                              <img
                                src={`${ENVIROMENT}/api/viewFile/${row.idDocument}/${row.bucketSource}`}
                                alt="Preview"
                              />
                            </div>
                          </div>
                        </CustomSubSectionCardDocument>
                      );
                    })}
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
      <Modal
        visible={previewVisible}
        title={
          <div className="form-modal">
            <div className="title-head-modal">
              <button
                className="arrow-back-to"
                type="button"
                onClick={() => {
                  setPreviewVisible(!previewVisible);
                }}
              >
                <img src={Arrow} alt="backTo" width="30" />
              </button>
              <h1>
                {isEmpty(dataDocumentSelect) === false &&
                  dataDocumentSelect.documentName}
              </h1>
            </div>
          </div>
        }
        closable={false}
        footer={null}
        style={{ top: "20px" }}
      >
        <Magnifier
          src={`${ENVIROMENT}/api/viewFile/${dataDocumentSelect.idDocument}/${dataDocumentSelect.bucketSource}`}
        />
      </Modal>
    </Modal>
  );
};

export default SectionDetailIncidence;
