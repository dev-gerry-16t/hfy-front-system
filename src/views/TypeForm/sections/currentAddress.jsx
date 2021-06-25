import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
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
import { CloseOutlined } from "@ant-design/icons";

const { Option } = Select;

const SectionCurrentAddress = (props) => {
  const {
    onClickNext,
    dataFormSave,
    dataZipCatalog,
    onChangeZipCode,
    dataZipCodeAdress,
    dataProperties,
    onGetProperties,
    dataPropertiesInfo,
  } = props;
  const initialForm = {
    street: null,
    suite: null,
    streetNumber: null,
    idZipCode: null,
    zipCode: null,
    city: null,
    state: null,
    neighborhood: null,
    isOwn: null,
    currentTimeRange: null,
    currentTime: null,
    dateChangeAddress: null,
    lessorFullName: null,
    lessorPhoneNumber: null,
    currentRent: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [isOpenInput, setIsOpenInput] = useState(false);
  const [confirmData, setConfirmData] = useState(false);
  const [aceptTerms, setAceptTerms] = useState(false);

  const DescriptionItem = ({ title, content, isRequired }) => (
    <div
      className="site-description-item-profile-wrapper"
      style={{
        fontFamily: "Poppins",
        display: "flex",
        justifyContent: "space-around",
        fontSize: 12,
      }}
    >
      <div
        title={title}
        style={{
          width: "130px",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        <strong className="site-description-item-profile-p-label">
          {title}
        </strong>
      </div>
      <div
        title={content}
        style={{
          width: "170px",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            color: isRequired === true ? "red" : "",
            fontWeight: isRequired === true ? "bold" : "",
          }}
        >
          {content}
        </span>
      </div>
    </div>
  );

  useEffect(() => {
    if (isEmpty(dataFormSave) === false) {
      setDataForm(dataFormSave);
      onChangeZipCode(dataFormSave.zipCode);
    }
  }, [dataFormSave]);

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
      <h3>Domicilio actual</h3>
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
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <Input
                value={dataForm.street}
                placeholder={"Calle"}
                onChange={(e) => {
                  setDataForm({ ...dataForm, street: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input
                value={dataForm.streetNumber}
                placeholder={"Número"}
                onChange={(e) => {
                  setDataForm({ ...dataForm, streetNumber: e.target.value });
                }}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input
                value={dataForm.zipCode}
                placeholder={"Código postal"}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length >= 5) {
                    setDataForm({ ...dataForm, zipCode: value });
                    onChangeZipCode(e.target.value);
                  } else {
                    setDataForm({
                      ...dataForm,
                      neighborhood: null,
                      idZipCode: null,
                      zipCode: value,
                    });
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
                  value={dataForm.idZipCode}
                  onChange={(value, option) => {
                    const dataSelect = option.onClick();
                    setIsOpenInput(dataSelect.isOpen);
                    if (dataSelect.isOpen === true) {
                      setDataForm({
                        ...dataForm,
                        neighborhood: null,
                        idZipCode: value,
                      });
                    } else {
                      setDataForm({
                        ...dataForm,
                        neighborhood: option.children,
                        idZipCode: value,
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
                  value={dataForm.neighborhood}
                  placeholder={"Indicar Colonia"}
                  suffix={
                    <Tooltip title="Cerrar">
                      <CloseOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                        onClick={() => {
                          setIsOpenInput(false);
                          setDataForm({
                            ...dataForm,
                            idZipCode: null,
                            neighborhood: null,
                          });
                        }}
                      />
                    </Tooltip>
                  }
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      neighborhood: e.target.value,
                    });
                  }}
                />
              )}
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
                  La propiedad actual es
                </span>
                <Radio.Group
                  onChange={(e) => {
                    setDataForm({ ...dataForm, isOwn: e.target.value });
                  }}
                  value={
                    dataForm.isOwn === 1 || dataForm.isOwn === true
                      ? 1
                      : isNil(dataForm.isOwn) === false
                      ? 0
                      : null
                  }
                >
                  <Radio value={1}>Propia</Radio>
                  <Radio value={0}>Rentada</Radio>
                </Radio.Group>
              </div>
            </Col>
          </Row>
          {(dataForm.isOwn === 0 || dataForm.isOwn === false) && (
            <>
              <Row>
                <Col span={13} xs={{ span: 24 }} md={{ span: 13 }}>
                  <Input
                    value={dataForm.lessorFullName}
                    placeholder={"Nombre del arrendador"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({ ...dataForm, lessorFullName: value });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={9} xs={{ span: 24 }} md={{ span: 9 }}>
                  <Input
                    value={dataForm.lessorPhoneNumber}
                    placeholder={"Teléfono del arrendador"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({ ...dataForm, lessorPhoneNumber: value });
                    }}
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
                    value={dataForm.currentRent}
                    className="inputLogin"
                    floatingLabelText=""
                    isVisible
                    toBlock={false}
                    disable={false}
                    placeholder="¿Cuánto pagas de renta?"
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
              </Row>
            </>
          )}
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <NumberFormat
                    id={null}
                    customInput={Input}
                    thousandSeparator=","
                    decimalSeparator="."
                    decimalPrecision={2}
                    allowNegative={false}
                    prefix=""
                    suffix=""
                    value={dataForm.currentTime}
                    className="inputLogin"
                    floatingLabelText=""
                    isVisible
                    toBlock={false}
                    disable={false}
                    placeholder="Tiempo habitando"
                    onValueChange={(values) => {
                      const { formattedValue, value, floatValue } = values;
                      setDataForm({
                        ...dataForm,
                        currentTime: floatValue,
                      });
                    }}
                    onClick={(event) => {}}
                    onFocus={(event) => {}}
                    onBlur={(event) => {}}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Select
                    placeholder="Periodo"
                    onChange={(value, option) => {
                      setDataForm({
                        ...dataForm,
                        currentTimeRange: value,
                      });
                    }}
                    value={dataForm.currentTimeRange}
                  >
                    <Option value={"M"} onClick={() => {}}>
                      Meses
                    </Option>
                    <Option value={"Y"} onClick={() => {}}>
                      Años
                    </Option>
                  </Select>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="button_actions">
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
                Verifica tu información antes de continuar ya que si se detectan
                inconsistencias podrían afectar el proceso de investigación y
                generación del contrato.
              </span>
            </div>
            <p style={{ textAlign: "center" }}>
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
            {isEmpty(dataPropertiesInfo) === false &&
            dataPropertiesInfo[0].canBeSkiped === true ? (
              <div
                style={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  marginBottom: 15,
                }}
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
                  He verificado la información y acepto que es correcta.
                </span>
              </div>
            ) : (
              <div
                style={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  marginBottom: 15,
                }}
              >
                <span
                  style={{
                    marginLeft: 5,
                    textAlign: "center",
                    fontSize: 10,
                    color: "black",
                  }}
                >
                  Aún no has completado la información de este paso, para
                  continuar es necesario ingresar la información que aparece
                  como{" "}
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    *Requerido*
                  </span>
                  .
                </span>
              </div>
            )}
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
              <span>Continuar</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SectionCurrentAddress;
