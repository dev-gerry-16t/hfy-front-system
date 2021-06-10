import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import NumberFormat from "react-number-format";
import {
  Input,
  Row,
  Col,
  Select,
  Tooltip,
  Radio,
  Alert,
  Modal,
  Checkbox,
} from "antd";
import { CloseOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const CurrentAddressRenter = (props) => {
  const {
    onClickNext,
    dataFormSave,
    frontFunctions,
    dataZipCatalog,
    onChangeZipCode,
    dataZipCodeAdress,
    dataPropertyTypes,
    dataProperties,
    dataCommercialActivity,
    onGetProperties,
    dataPropertiesInfo,
  } = props;
  const initialForm = {
    isOwner: null,
    streetProperty: null,
    suiteProperty: null,
    streetNumberProperty: null,
    idZipCodeProperty: null,
    zipCodeProperty: null,
    city: null,
    state: null,
    neighborhoodProperty: null,
    idPropertyType: null,
    isFurnished: null,
    currentRent: null,
    maintenanceAmount: null,
    totalParkingSpots: null,
    hasInsurance: null,
    idCommercialActivity: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [isOpenInput, setIsOpenInput] = useState(false);
  const [confirmData, setConfirmData] = useState(false);
  const [aceptTerms, setAceptTerms] = useState(false);

  const DescriptionItem = ({ title, content, isRequired }) => (
    <div
      className="site-description-item-profile-wrapper"
      style={{ fontFamily: "Poppins" }}
    >
      <strong
        className="site-description-item-profile-p-label"
        style={{ marginRight: 10 }}
      >
        {title}:
      </strong>
      <span
        style={{
          color: isRequired === true ? "red" : "",
          fontWeight: isRequired === true ? "bold" : "",
        }}
      >
        {content}
      </span>
    </div>
  );

  useEffect(() => {
    if (
      isEmpty(dataFormSave) === false &&
      isEmpty(dataPropertyTypes) === false
    ) {
      setDataForm(dataFormSave);
      onChangeZipCode(dataFormSave.zipCodeProperty);
    }
  }, [dataFormSave, dataPropertyTypes]);

  useEffect(() => {
    if (isEmpty(dataZipCodeAdress) === false) {
      setDataForm({
        ...dataForm,
        state: dataZipCodeAdress.state,
        city: dataZipCodeAdress.municipality,
      });
    }
  }, [dataZipCodeAdress]);

  return (
    <div className="content-typeform-formulary">
      <h3>Datos del Inmueble a rentar</h3>
      <Row>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
          {isEmpty(dataProperties) === false && dataForm.isFirstTime === false && (
            <div className="message-typeform-requires">
              <Alert
                message={
                  <div style={{ width: "100%" }}>
                    Los siguientes campos son requeridos:
                    <br />
                    <ul>
                      {dataProperties.map((row) => {
                        return <li>{row.label}</li>;
                      })}
                    </ul>
                  </div>
                }
                type="error"
              />
            </div>
          )}
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <div className="option-select-radio">
                <span
                  style={{
                    color: "var(--color-primary)",
                    fontWeight: "bold",
                  }}
                >
                  ¿Eres el propietario?
                </span>
                <Radio.Group
                  onChange={(e) => {
                    const value = e.target.value;
                    setDataForm({
                      ...dataForm,
                      isOwner: value,
                    });
                  }}
                  value={
                    dataForm.isOwner === true || dataForm.isOwner === 1
                      ? 1
                      : isNil(dataForm.isOwner) === false
                      ? 0
                      : null
                  }
                >
                  <Radio value={1}>Si</Radio>
                  <Radio value={0}>No, lo estoy representando</Radio>
                </Radio.Group>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <Input
                value={dataForm.streetProperty}
                placeholder={"Calle"}
                onChange={(e) => {
                  setDataForm({
                    ...dataForm,
                    streetProperty: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
              <Input
                value={dataForm.suiteProperty}
                placeholder={"Número interior"}
                onChange={(e) => {
                  setDataForm({ ...dataForm, suiteProperty: e.target.value });
                }}
              />
            </Col>
            <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
            <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
              <Input
                value={dataForm.streetNumberProperty}
                placeholder={"Número exterior"}
                onChange={(e) => {
                  setDataForm({
                    ...dataForm,
                    streetNumberProperty: e.target.value,
                  });
                }}
              />
            </Col>
            <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
            <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
              <Input
                value={dataForm.zipCodeProperty}
                placeholder={"Código postal"}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length >= 5) {
                    setDataForm({ ...dataForm, zipCodeProperty: value });
                    onChangeZipCode(e.target.value);
                  } else {
                    if (isEmpty(value) === true || isNil(value) === true) {
                      setDataForm({
                        ...dataForm,
                        neighborhoodProperty: null,
                        idZipCodeProperty: null,
                        zipCodeProperty: value,
                        state: "",
                        city: "",
                        idZipCodeProperty: null,
                      });
                    } else {
                      setDataForm({
                        ...dataForm,
                        neighborhoodProperty: null,
                        idZipCodeProperty: null,
                        zipCodeProperty: value,
                      });
                    }
                  }
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input
                value={dataForm.state}
                placeholder={"Estado"}
                onChange={(e) => {}}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input
                value={dataForm.city}
                placeholder={"Municipio/Delegación"}
                onChange={(e) => {}}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              {isOpenInput === false ? (
                <Select
                  placeholder="Colonia"
                  value={dataForm.idZipCodeProperty}
                  onChange={(value, option) => {
                    const dataSelect = option.onClick();
                    setIsOpenInput(dataSelect.isOpen);
                    if (dataSelect.isOpen === true) {
                      setDataForm({
                        ...dataForm,
                        neighborhoodProperty: null,
                        idZipCodeProperty: value,
                      });
                    } else {
                      setDataForm({
                        ...dataForm,
                        neighborhoodProperty: option.children,
                        idZipCodeProperty: value,
                      });
                    }
                  }}
                >
                  {isEmpty(dataZipCatalog) === false &&
                    dataZipCatalog.map((row) => {
                      return (
                        <Option
                          value={row.idZipCode}
                          onClick={() => {
                            return row;
                          }}
                        >
                          {row.neighborhood}
                        </Option>
                      );
                    })}
                </Select>
              ) : (
                <Input
                  value={dataForm.neighborhoodProperty}
                  placeholder={"Indicar Colonia"}
                  suffix={
                    <Tooltip title="Cerrar">
                      <CloseOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                        onClick={() => {
                          setIsOpenInput(false);
                          setDataForm({
                            ...dataForm,
                            idZipCodeProperty: null,
                            neighborhoodProperty: null,
                          });
                        }}
                      />
                    </Tooltip>
                  }
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      neighborhoodProperty: e.target.value,
                    });
                  }}
                />
              )}
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Select
                value={dataForm.idPropertyType}
                placeholder="Tipo de inmueble"
                onChange={(value, option) => {
                  setDataForm({
                    ...dataForm,
                    idPropertyType: value,
                    idPropertyTypeText: option.children,
                  });
                }}
              >
                {isEmpty(dataPropertyTypes) === false &&
                  dataPropertyTypes.map((row) => {
                    return (
                      <Option
                        value={row.idPropertyType}
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
          {isNil(dataForm.idPropertyType) === false &&
            dataForm.idPropertyType === 4 && (
              <Row>
                <Col span={10} xs={{ span: 24 }} md={{ span: 10 }}>
                  <Select
                    placeholder="Actividad comercial del inmueble"
                    value={dataForm.idCommercialActivity}
                    onChange={(value, option) => {
                      setDataForm({
                        ...dataForm,
                        idCommercialActivity: value,
                      });
                    }}
                  >
                    {isEmpty(dataCommercialActivity) === false &&
                      dataCommercialActivity.map((row) => {
                        return (
                          <Option
                            value={row.idCommercialActivity}
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
                <Col span={1} xs={{ span: 1 }} md={{ span: 1 }}>
                  <Tooltip
                    placement="top"
                    title="Indica la actividad sólo si tu propiedad sera rentada con uso comercial."
                  >
                    <div
                      style={{
                        padding: "5px 0px 0px 5px",
                        textAlign: "center",
                      }}
                    >
                      <QuestionCircleOutlined />
                    </div>
                  </Tooltip>
                </Col>
              </Row>
            )}
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <div className="option-select-radio">
                <span
                  style={{
                    color: "var(--color-primary)",
                    fontWeight: "bold",
                  }}
                >
                  ¿El inmueble está asegurado?
                </span>
                <Radio.Group
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      hasInsurance: e.target.value,
                    });
                  }}
                  value={
                    dataForm.hasInsurance === true ||
                    dataForm.hasInsurance === 1
                      ? 1
                      : isNil(dataForm.hasInsurance) === false
                      ? 0
                      : null
                  }
                >
                  <Radio value={1}>Si</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </div>
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <div className="option-select-radio">
                <span
                  style={{
                    color: "var(--color-primary)",
                    fontWeight: "bold",
                  }}
                >
                  ¿El inmueble está amueblado?
                </span>
                <Radio.Group
                  onChange={(e) => {
                    setDataForm({ ...dataForm, isFurnished: e.target.value });
                  }}
                  value={
                    dataForm.isFurnished === true || dataForm.isFurnished === 1
                      ? 1
                      : isNil(dataForm.isFurnished) === false
                      ? 0
                      : null
                  }
                >
                  <Radio value={1}>Si</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </div>
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
                value={dataForm.currentRent}
                className="inputLogin"
                floatingLabelText=""
                isVisible
                toBlock={false}
                disable={false}
                placeholder="Monto de renta"
                onValueChange={(values) => {
                  const { formattedValue, value, floatValue } = values;
                  setDataForm({
                    ...dataForm,
                    currentRent: floatValue,
                  });
                }}
                onClick={(event) => {}}
                onFocus={(event) => {}}
                onBlur={(event) => {}}
              />
            </Col>
            <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
              <NumberFormat
                id={null}
                customInput={Input}
                thousandSeparator=","
                decimalSeparator="."
                decimalPrecision={2}
                allowNegative={false}
                prefix=""
                suffix=""
                value={dataForm.totalParkingSpots}
                className="inputLogin"
                floatingLabelText=""
                isVisible
                toBlock={false}
                disable={false}
                placeholder={"Lugares de estacionamiento"}
                onValueChange={(values) => {
                  const { formattedValue, value, floatValue } = values;
                  setDataForm({
                    ...dataForm,
                    totalParkingSpots: floatValue,
                  });
                }}
                onClick={(event) => {}}
                onFocus={(event) => {}}
                onBlur={(event) => {}}
              />
            </Col>
          </Row>
          <p>Si existe un pago de mantenimiento especificar el monto</p>
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
                value={dataForm.maintenanceAmount}
                className="inputLogin"
                floatingLabelText=""
                isVisible
                toBlock={false}
                disable={false}
                placeholder={"Monto de mandetimiento"}
                onValueChange={(values) => {
                  const { formattedValue, value, floatValue } = values;
                  setDataForm({
                    ...dataForm,
                    maintenanceAmount: floatValue,
                  });
                }}
                onClick={(event) => {}}
                onFocus={(event) => {}}
                onBlur={(event) => {}}
              />
            </Col>
          </Row>
          <div className="button_actions">
            {/* <button
                type="button"
                onClick={onClickBack}
                className="button_secondary"
              >
                <span>Regresar</span>
              </button> */}
            <button
              type="button"
              onClick={async () => {
                try {
                  await onGetProperties({
                    idTypeForm: dataForm.idTypeForm,
                    stepIn: 1,
                    jsonProperties: JSON.stringify(dataForm),
                  });
                  setConfirmData(true);
                } catch (error) {}
              }}
              className="button_primary"
            >
              <span>Continuar</span>
            </button>
          </div>
        </Col>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
      </Row>
      <Modal
        style={{ top: 20 }}
        visible={confirmData}
        closable={false}
        footer={false}
      >
        <div className="form-modal">
          <div className="title-head-modal">
            <h1>Confirma tu información</h1>
          </div>
          <div className="main-form-information">
            <div
              style={{ fontFamily: "Poppins", fontSize: 12, marginBottom: 15 }}
            >
              <span>
                Verifica tu información antes de continuar ya que se utilizará
                para la generación del contrato.
              </span>
            </div>
            <p>
              {isEmpty(dataPropertiesInfo) === false &&
              isNil(dataPropertiesInfo[0].stepIn) === false
                ? dataPropertiesInfo[0].stepIn
                : ""}
            </p>
            <Row>
              <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                {isEmpty(dataPropertiesInfo) === false &&
                  dataPropertiesInfo.map((row) => {
                    return (
                      <DescriptionItem
                        title={row.typeFormProperty}
                        content={row.typeFormPropertyValue}
                        isRequired={row.isRequired}
                      />
                    );
                  })}
              </Col>
            </Row>
            <div
              style={{ fontFamily: "Poppins", fontSize: 12, marginBottom: 15 }}
            >
              <Checkbox
                checked={aceptTerms}
                onChange={(e) => {
                  setAceptTerms(e.target.checked);
                }}
              ></Checkbox>
              <span
                style={{
                  marginLeft: 5,
                  textAlign: "center",
                  fontSize: 10,
                  color: "black",
                }}
              >
                He verificado la información y acepto que es correcta
              </span>
            </div>
          </div>
          <div className="two-action-buttons">
            <button
              type="button"
              onClick={() => {
                setConfirmData(false);
              }}
            >
              <span>Regresar</span>
            </button>
            <button
              type="button"
              className={
                (isEmpty(dataPropertiesInfo) === false &&
                  dataPropertiesInfo[0].canBeSkiped === false) ||
                aceptTerms === false
                  ? "disabled"
                  : ""
              }
              onClick={async () => {
                if (
                  isEmpty(dataPropertiesInfo) === false &&
                  dataPropertiesInfo[0].canBeSkiped === true &&
                  aceptTerms === true
                ) {
                  onClickNext(dataForm);
                  setConfirmData(false);
                }
              }}
            >
              <span>Confirmar</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CurrentAddressRenter;
