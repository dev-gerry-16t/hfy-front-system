import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import NumberFormat from "react-number-format";
import { Modal, Input, Row, Col, Select, Spin, Tooltip, Radio } from "antd";
import Arrow from "../../../assets/icons/Arrow.svg";
import { isNil } from "lodash";

const { Option } = Select;

const SectionDetailProvider = (props) => {
  const {
    isModalVisible,
    onClose,
    dataProviderType,
    dataPaymentForm,
    dataPolicies,
    dataProviderById,
    dataCollaboratorType,
    onSelectProvider,
    onSaveProvider,
  } = props;
  const initialDataForm = {
    idProvider: null,
    idProviderType: null,
    idProviderPaymentForm: null,
    provider: null,
    taxId: null,
    phoneNumber: null,
    emailAddress: null,
    budgeAmount: null,
    providerBudgeInPolicy: [],
    collaborator: [],
    isActive: null,
  };

  const initialDataFormCollaborator = {
    idProvider: null,
    idCollaborator: null,
    idCollaboratorType: null,
    collaboratorType: null,
    givenName: null,
    lastName: null,
    mothersMaidenName: null,
    phoneNumber: null,
    emailAddress: null,
    isActive: null,
  };

  const [dataForm, setDataForm] = useState(initialDataForm);
  const [dataFormPolicy, setDataFormPolicy] = useState({});
  const [dataFormCollaborator, setDataFormCollaborator] = useState(
    initialDataFormCollaborator
  );
  const [isCollaboratorType, setIsCollaboratorType] = useState(false);
  const [isRequiresPolicy, setIsRequiresPolicy] = useState(false);

  useEffect(() => {
    if (
      isEmpty(dataProviderById) === false &&
      isNil(dataProviderById.result3) === false &&
      isEmpty(dataProviderById.result3) === false
    ) {
      const newObjectArray = {};
      dataProviderById.result3.forEach((element) => {
        newObjectArray[element.idPolicy] = {
          idPolicy: element.idPolicy,
          budgeAmount: element.budgeAmount,
          idProvider: element.idProvider,
          isActive: null,
        };
      });
      setDataFormPolicy(newObjectArray);
    }
  }, [dataProviderById]);

  useEffect(() => {
    if (
      isEmpty(dataProviderById) === false &&
      isNil(dataProviderById.result1) === false &&
      isEmpty(dataProviderById.result1) === false
    ) {
      const selectDefaultPayment = dataPaymentForm.find((row) => {
        return (
          row.idProviderPaymentForm ===
          dataProviderById.result1.idProviderPaymentForm
        );
      });
      if (
        isNil(selectDefaultPayment) === false &&
        isEmpty(selectDefaultPayment) === false
      ) {
        setIsRequiresPolicy(selectDefaultPayment.requiresPolicy);
      }
      setDataForm({
        ...dataForm,
        collaborator: dataProviderById.result2,
        ...dataProviderById.result1,
      });
    }
  }, [dataProviderById]);

  return (
    <Modal
      style={{ top: 20 }}
      visible={isModalVisible}
      closable={false}
      footer={false}
    >
      <div className="form-modal">
        <div className="title-head-modal">
          <button
            className="arrow-back-to"
            type="button"
            onClick={() => {
              setDataForm(initialDataForm);
              setDataFormCollaborator(initialDataFormCollaborator);
              setIsCollaboratorType(false);
              setIsRequiresPolicy(false);
              onClose();
            }}
          >
            <img src={Arrow} alt="backTo" width="30" />
          </button>
          <h1>
            {isCollaboratorType === false
              ? "Detalle de proveedor"
              : "Detalle de colaborador"}
          </h1>
        </div>
        <div className="main-form-information">
          {isCollaboratorType === false && (
            <>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Select
                    placeholder="Tipo de proveedor"
                    value={dataForm.idProviderType}
                    onChange={(value, option) => {
                      setDataForm({ ...dataForm, idProviderType: value });
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
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Select
                    placeholder="Forma de pago"
                    value={dataForm.idProviderPaymentForm}
                    onChange={(value, option) => {
                      const optionClick = option.onClick();
                      setDataForm({
                        ...dataForm,
                        idProviderPaymentForm: value,
                      });
                      setIsRequiresPolicy(optionClick.requiresPolicy);
                    }}
                  >
                    {isEmpty(dataPaymentForm) === false &&
                      dataPaymentForm.map((row) => {
                        return (
                          <Option
                            value={row.idProviderPaymentForm}
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
                    value={dataForm.provider}
                    placeholder={"Nombre de proveedor"}
                    onChange={(e) => {
                      setDataForm({ ...dataForm, provider: e.target.value });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.taxId}
                    placeholder={"RFC"}
                    onChange={(e) => {
                      setDataForm({ ...dataForm, taxId: e.target.value });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.phoneNumber}
                    placeholder={"Teléfono"}
                    onChange={(e) => {
                      setDataForm({ ...dataForm, phoneNumber: e.target.value });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.emailAddress}
                    placeholder={"Correo"}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        emailAddress: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <p>Costos</p>
              {isRequiresPolicy === false && (
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
                      placeholder="Costo del servicio"
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
              )}
              {isRequiresPolicy === true && (
                <Row>
                  <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                    <table className="table-add-provider">
                      <thead>
                        <tr>
                          <th>Póliza</th>
                          <th>Monto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isEmpty(dataPolicies) === false &&
                          dataPolicies.map((row, index) => {
                            return (
                              <tr>
                                <td>{row.text}</td>
                                <td>
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
                                      dataFormPolicy[row.idPolicy].budgeAmount
                                    }
                                    className="inputLogin"
                                    floatingLabelText=""
                                    isVisible
                                    toBlock={false}
                                    disable={false}
                                    placeholder="Costo del servicio"
                                    onValueChange={(values) => {
                                      const {
                                        formattedValue,
                                        value,
                                        floatValue,
                                      } = values;
                                      setDataFormPolicy({
                                        ...dataFormPolicy,
                                        [row.idPolicy]: {
                                          ...dataFormPolicy[row.idPolicy],
                                          budgeAmount: floatValue,
                                        },
                                      });
                                    }}
                                    onClick={(event) => {}}
                                    onFocus={(event) => {}}
                                    onBlur={(event) => {}}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </Col>
                </Row>
              )}
            </>
          )}
          {isCollaboratorType === true && (
            <>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  {/* <Input
                    value={dataFormCollaborator.collaboratorType}
                    placeholder={"Tipo de colaborador"}
                    onChange={(e) => {
                      setDataFormCollaborator({
                        ...dataFormCollaborator,
                        collaboratorType: e.target.value,
                      });
                    }}
                  /> */}
                  <Select
                    placeholder="Tipo de colaborador"
                    value={dataFormCollaborator.idCollaboratorType}
                    onChange={(value, option) => {
                      setDataFormCollaborator({
                        ...dataFormCollaborator,
                        idCollaboratorType: value,
                      });
                    }}
                  >
                    {isEmpty(dataCollaboratorType) === false &&
                      dataCollaboratorType.map((row) => {
                        return (
                          <Option
                            value={row.idCollaboratorType}
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
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataFormCollaborator.givenName}
                    placeholder={"Nombre"}
                    onChange={(e) => {
                      setDataFormCollaborator({
                        ...dataFormCollaborator,
                        givenName: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataFormCollaborator.lastName}
                    placeholder={"Apellido Paterno"}
                    onChange={(e) => {
                      setDataFormCollaborator({
                        ...dataFormCollaborator,
                        lastName: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataFormCollaborator.mothersMaidenName}
                    placeholder={"Apellido Materno"}
                    onChange={(e) => {
                      setDataFormCollaborator({
                        ...dataFormCollaborator,
                        mothersMaidenName: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataFormCollaborator.phoneNumber}
                    placeholder={"Teléfono"}
                    onChange={(e) => {
                      setDataFormCollaborator({
                        ...dataFormCollaborator,
                        phoneNumber: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataFormCollaborator.emailAddress}
                    placeholder={"Correo"}
                    onChange={(e) => {
                      setDataFormCollaborator({
                        ...dataFormCollaborator,
                        emailAddress: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <div className="two-action-buttons">
                <button
                  type="button"
                  onClick={() => {
                    const newArray = dataForm.collaborator;
                    newArray.push(dataFormCollaborator);
                    setDataForm({ ...dataForm, collaborator: newArray });
                    setDataFormCollaborator(initialDataFormCollaborator);
                  }}
                >
                  <span>Agregar</span>
                </button>
              </div>
              <p>Colaboradores</p>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <table className="table-add-provider">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {isEmpty(dataForm.collaborator) === false &&
                        dataForm.collaborator.map((row, index) => {
                          return (
                            <tr>
                              <td>
                                {row.givenName} {row.lastName}{" "}
                                {row.mothersMaidenName}
                              </td>
                              <td>{row.phoneNumber}</td>
                              <td>{row.emailAddress}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </Col>
              </Row>
            </>
          )}
          {isCollaboratorType === true && (
            <div className="two-action-buttons">
              <button
                type="button"
                onClick={() => {
                  setIsCollaboratorType(!isCollaboratorType);
                }}
              >
                <span>Regresar</span>
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await onSaveProvider(dataForm);
                    setDataForm(initialDataForm);
                    setDataFormCollaborator(initialDataFormCollaborator);
                    setIsCollaboratorType(false);
                    setIsRequiresPolicy(false);
                    onClose();
                  } catch (error) {}
                }}
              >
                <span>Guardar Proveedor</span>
              </button>
            </div>
          )}
          {isCollaboratorType === false && (
            <div className="two-action-buttons">
              <button
                type="button"
                onClick={() => {
                  const arrayPolicy = [];
                  const statesPolicy = dataFormPolicy;
                  for (const key in statesPolicy) {
                    arrayPolicy.push(statesPolicy[key]);
                  }
                  setDataForm({
                    ...dataForm,
                    providerBudgeInPolicy:
                      isRequiresPolicy === true ? arrayPolicy : [],
                  });
                  setIsCollaboratorType(!isCollaboratorType);
                }}
              >
                <span>Colaboradores</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SectionDetailProvider;
