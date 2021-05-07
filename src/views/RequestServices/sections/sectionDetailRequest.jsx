import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import NumberFormat from "react-number-format";
import {
  Modal,
  Input,
  Row,
  Col,
  Select,
  Spin,
  Tooltip,
  Radio,
  Button,
  DatePicker,
} from "antd";
import { DeleteOutlined, SyncOutlined } from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";

const { Option } = Select;

const SectionDetailRequest = (props) => {
  const {
    isModalVisible,
    onClose,
    dataProviderById,
    dataProviders,
    dataRequestStatus,
    dataCollaborator,
    onSaveRequestProvider,
    onDownloadDocument,
  } = props;

  const initialState = {
    idProvider: null,
    idRequestForProviderStatus: null,
    scheduleDate: null,
    referenceId: null,
    budgeAmount: null,
    collaborator: [],
    idCollaborator: null,
    observations: "",
  };

  const [dataForm, setDataForm] = useState(initialState);
  const [dataCollaboratorState, setDataCollaboratorState] = useState([]);
  const [rowCollaborator, setRowCollaborator] = useState({});
  const [spinVisible, setSpinVisible] = useState(false);

  const LoadingSpin = <SyncOutlined spin />;

  const isDisabledFunction = (id, array) => {
    let disabled = false;
    let findArray = null;

    if (isEmpty(array) === false) {
      findArray = array.find((row) => {
        return id === row.idCollaborator;
      });
    }

    if (isNil(findArray) === false && isEmpty(findArray) === false) {
      disabled = true;
    }

    return disabled;
  };

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <strong className="site-description-item-profile-p-label">
        {title}:
      </strong>
      <br />
      {isNil(content) === false ? content : "N/A"}
    </div>
  );

  const replaceUrl = (address) => {
    let domainPath = "https://www.google.com/maps/search/";
    if (isNil(address) === false) {
      const replaceString = address.replaceAll(" ", "+");
      domainPath = domainPath + replaceString;
    }
    return domainPath;
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
          <>
            <p>Información de Pago</p>
            <Row>
              <Col span={24}>
                <DescriptionItem title="Nombre" content={row.fullName} />
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
          </>
        );
      });
    }
    return component;
  };

  useEffect(() => {
    if (
      isEmpty(dataProviderById) === false &&
      isNil(dataProviderById.result1) === false &&
      isEmpty(dataProviderById.result1) === false
    ) {
      setDataForm({
        ...dataForm,
        ...dataProviderById.result1,
      });
    }
    if (
      isEmpty(dataProviderById) === false &&
      isNil(dataProviderById.result2) === false &&
      isEmpty(dataProviderById.result2) === false
    ) {
      setDataCollaboratorState(dataProviderById.result2);
    }
  }, [dataProviderById, dataCollaborator]);

  return (
    <Modal
      style={{ top: 20 }}
      visible={isModalVisible}
      closable={false}
      footer={false}
    >
      <Spin indicator={LoadingSpin} spinning={spinVisible} delay={200}>
        <div className="form-modal">
          <div className="title-head-modal">
            <button
              className="arrow-back-to"
              type="button"
              onClick={() => {
                onClose();
                setDataForm(initialState);
                setDataCollaboratorState([]);
                setRowCollaborator({});
              }}
            >
              <img src={Arrow} alt="backTo" width="30" />
            </button>
            <h1>Detalle de Solicitud</h1>
          </div>
          <div className="main-form-information">
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <DescriptionItem title="Estatus" content={" "} />
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Select
                  placeholder="Estatus"
                  value={dataForm.idRequestForProviderStatus}
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
            {returnComponentPaymentPolicy(dataForm.inforPaymentAssignment)}
            <p>Información de Inquilino</p>
            <Row>
              <Col span={15} xs={{ span: 24 }} md={{ span: 15 }}>
                <DescriptionItem
                  title="Firma del contrato de servicio"
                  content={dataForm.isFaceToFace}
                />
              </Col>
            </Row>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <DescriptionItem
                  title="Folio de incidencia"
                  content={dataForm.incidenceInvoice}
                />
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              {(dataForm.canGenerateDocument === true ||
                isNil(dataForm.idDocument) === false) && (
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <DescriptionItem
                    title="Contrato de servicio"
                    content={
                      <Button
                        size="small"
                        type="link"
                        onClick={async () => {
                          setSpinVisible(true);
                          try {
                            await onDownloadDocument({
                              idDocument: dataForm.idDocument,
                              idPreviousDocument: dataForm.idPreviousDocument,
                              idDocumentType: dataForm.idDocumentType,
                              bucketSource: dataForm.bucketSource,
                              idRequestForProvider:
                                dataForm.idRequestForProvider,
                              canGenerateDocument: dataForm.canGenerateDocument,
                              download: true,
                            });
                            setSpinVisible(false);
                          } catch (error) {
                            setSpinVisible(false);
                          }
                        }}
                      >
                        Descargar
                      </Button>
                    }
                  />
                </Col>
              )}
            </Row>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <DescriptionItem
                  title="Nombre del inquilino"
                  content={dataForm.customerTenantFullName}
                />
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <DescriptionItem
                  title="Teléfono"
                  content={dataForm.customerTenantPhoneNumber}
                />
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
                  Observaciones del inquilino
                </label>
                <textarea
                  style={{
                    outline: "none",
                    border: "1px solid #d9d9d9",
                    width: "100%",
                    minHeight: 100,
                    borderRadius: "10px",
                    fontFamily: "Poppins",
                  }}
                  placeholder=""
                  value={dataForm.observations}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      observations: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
            {dataForm.isForMoving === true ? (
              <>
                <Row>
                  <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                    <DescriptionItem
                      title="Dirección de partida"
                      content={dataForm.fullAddressTenantFrom}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                    <DescriptionItem
                      title="Dirección final"
                      content={dataForm.fullAddressTenant}
                    />
                  </Col>
                </Row>
                <div style={{ textAlign: "center" }}>
                  <a
                    href={`https://www.google.com/maps/dir/${dataForm.fullAddressTenantFrom}/${dataForm.fullAddressTenant}`}
                    target="_blank"
                  >
                    Ver Recorrido en Google Maps
                  </a>
                </div>
              </>
            ) : (
              <>
                <Row>
                  <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                    <DescriptionItem
                      title="Dirección"
                      content={dataForm.fullAddressTenant}
                    />
                  </Col>
                </Row>
                <div style={{ textAlign: "center" }}>
                  <a
                    href={replaceUrl(dataForm.fullAddressTenant)}
                    target="_blank"
                  >
                    Ver en Google Maps
                  </a>
                </div>
              </>
            )}
            <p>Proveedor</p>
            <Row>
              <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                <Select
                  placeholder="Proveedor"
                  value={dataForm.idProvider}
                  onChange={(value, option) => {
                    setDataForm({
                      ...dataForm,
                      idProvider: value,
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
                <Input
                  value={dataForm.referenceId}
                  placeholder={"Referencia"}
                  onChange={(e) => {
                    setDataForm({ ...dataForm, referenceId: e.target.value });
                  }}
                />
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <DatePicker
                  value={
                    isNil(dataForm.scheduleDate) === false
                      ? moment(dataForm.scheduleDate, "YYYY-MM-DDTHH:mm:ss")
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
                  value={dataForm.budgeAmount}
                  className="inputLogin"
                  floatingLabelText=""
                  isVisible
                  toBlock={false}
                  disable={false}
                  placeholder="Monto del servicio"
                  onValueChange={(values) => {
                    const { formattedValue, value, floatValue } = values;
                    setDataForm({ ...dataForm, budgeAmount: floatValue });
                  }}
                  onClick={(event) => {}}
                  onFocus={(event) => {}}
                  onBlur={(event) => {}}
                />
              </Col>
            </Row>
            <p>Colaboradores</p>
            <Row>
              <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
                <Select
                  placeholder="Colaborador"
                  value={dataForm.idCollaborator}
                  onChange={(value, option) => {
                    const optionClick = option.onClick();
                    setDataForm({ ...dataForm, idCollaborator: value });
                    setRowCollaborator(optionClick);
                  }}
                >
                  {isEmpty(dataCollaborator) === false &&
                    dataCollaborator.map((row) => {
                      return (
                        <Option
                          value={row.idCollaborator}
                          onClick={() => {
                            return row;
                          }}
                          disabled={isDisabledFunction(
                            row.idCollaborator,
                            dataCollaboratorState
                          )}
                        >
                          {row.text}
                        </Option>
                      );
                    })}
                </Select>
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={6} xs={{ span: 24 }} md={{ span: 6 }}>
                <Button
                  size="small"
                  type="primary"
                  disabled={isEmpty(rowCollaborator) === true}
                  onClick={() => {
                    setDataCollaboratorState([
                      ...dataCollaboratorState,
                      rowCollaborator,
                    ]);
                    setDataForm({ ...dataForm, idCollaborator: null });
                    setRowCollaborator({});
                  }}
                >
                  Agregar
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                <table className="table-add-provider">
                  <thead>
                    <tr>
                      <th>Cargo</th>
                      <th>Nombre</th>
                      <th>Teléfono</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isEmpty(dataCollaboratorState) === false &&
                      dataCollaboratorState.map((row, index) => {
                        return (
                          <tr>
                            <td>{row.collaboratorType}</td>
                            <td>{row.fullName}</td>
                            <td>{row.phoneNumber}</td>
                            <td style={{ textAlign: "center" }}>
                              <Button
                                type="primary"
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                  const filterDeleteRow = dataCollaboratorState.filter(
                                    (rowMap) => {
                                      return (
                                        rowMap.idCollaborator !==
                                        row.idCollaborator
                                      );
                                    }
                                  );
                                  setDataCollaboratorState(filterDeleteRow);
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </Col>
            </Row>
            <div className="two-action-buttons">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setDataForm(initialState);
                  setDataCollaboratorState([]);
                  setRowCollaborator({});
                }}
              >
                <span>Salir</span>
              </button>
              <button
                type="button"
                onClick={async () => {
                  const newArrayCollaborator = dataCollaboratorState.map(
                    (row) => {
                      return {
                        idProvider: dataForm.idProvider,
                        idCollaborator: row.idCollaborator,
                        idCollaboratorType: null,
                        collaboratorType: row.collaboratorType,
                        givenName: row.givenName,
                        lastName: row.lastName,
                        mothersMaidenName: row.mothersMaidenName,
                        phoneNumber: row.phoneNumber,
                        emailAddress: row.emailAddress,
                        isActive: null,
                      };
                    }
                  );
                  try {
                    await onSaveRequestProvider(
                      { ...dataForm, collaborator: newArrayCollaborator },
                      dataForm.idRequestForProvider
                    );
                    onClose();
                    setDataForm(initialState);
                    setDataCollaboratorState([]);
                    setRowCollaborator({});
                  } catch (error) {}
                }}
              >
                <span>Guardar</span>
              </button>
            </div>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default SectionDetailRequest;
