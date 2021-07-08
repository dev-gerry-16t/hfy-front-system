import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Row, Col, Select, Alert, Modal, Checkbox } from "antd";
import CustomFileUpload from "./customFileUpload";
import CustomPaymentModal from "../../../components/CustomPaymentModal";

const { Option } = Select;

const TypePolicy = (props) => {
  const {
    onClickNext,
    dataPolicies,
    dataDocuments,
    typeDocument,
    dataFormSave,
    frontFunctions,
    dataProperties,
    dataPolicyMethods,
    onGetProperties,
    dataPropertiesInfo,
    getDocuments,
  } = props;

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

  const initialForm = {
    idPolicy: null,
    idPolicyPaymentMethod: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [minumunPolicy, setTaxMinumunPolicy] = useState(0);
  const [taxPolicy, setTaxPolicy] = useState(0);
  const [tax, setTax] = useState(0);
  const [confirmData, setConfirmData] = useState(false);
  const [percentPayment, setPercentPayment] = useState(1);
  const [aceptTerms, setAceptTerms] = useState(false);
  const [isModalVisible, setIsVisibleModal] = useState(false);

  useEffect(() => {
    if (
      isEmpty(dataFormSave) === false &&
      isEmpty(dataPolicies) === false &&
      isEmpty(dataPolicyMethods) === false
    ) {
      const selectDefaultPolicy = dataPolicies.find((row) => {
        return row.id === dataFormSave.idPolicy;
      });
      const selectDefaultPolicyMethods = dataPolicyMethods.find((row) => {
        return row.idPolicyPaymentMethod === dataFormSave.idPolicyPaymentMethod;
      });
      setDataForm(dataFormSave);
      if (
        isNil(selectDefaultPolicy) === false &&
        isEmpty(selectDefaultPolicy) === false
      ) {
        setTaxPolicy(selectDefaultPolicy.percentBase);
        setTax(selectDefaultPolicy.taxBase);
        setTaxMinumunPolicy(selectDefaultPolicy.minimunAmount);
      }
      if (
        isNil(selectDefaultPolicyMethods) === false &&
        isNil(selectDefaultPolicyMethods.percentCustomer) === false
      ) {
        setPercentPayment(selectDefaultPolicyMethods.percentCustomer);
      }
    }
  }, [dataFormSave, dataPolicies, dataPolicyMethods]);

  useEffect(() => {
    getDocuments(dataFormSave, 3);
  }, []);

  const getTypeIdDocument = (type) => {
    let word = "";

    switch (type) {
      case 1:
        word = "IFE/INE Frontal y Vuelta";
        break;
      case 2:
        word = "Pasaporte";
        break;
      case 3:
        word = "FM3";
        break;
      default:
        word = "IFE/INE Frontal y Vuelta";
        break;
    }
    return word;
  };

  return (
    <div className="content-typeform-formulary">
      <CustomPaymentModal
        isModalVisible={isModalVisible}
        onClose={() => {
          setIsVisibleModal(!isModalVisible);
        }}
        spinVisible={false}
      />
      <h3>Póliza y Documentos</h3>
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
          <p>Póliza</p>
          <Row>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
              <Select
                value={dataForm.idPolicy}
                placeholder="¿Que póliza contratas?"
                onChange={(value, option) => {
                  const clickOption = option.onClick();
                  const totalPolicyTax = clickOption.percentBase;
                  const totalTax = clickOption.taxBase;
                  setTaxPolicy(totalPolicyTax);
                  setTaxMinumunPolicy(clickOption.minimunAmount);
                  setTax(totalTax);
                  setDataForm({ ...dataForm, idPolicy: value });
                }}
              >
                {isEmpty(dataPolicies) === false &&
                  dataPolicies.map((row) => {
                    return (
                      <Option
                        value={row.id}
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
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
              <div className="price-policy-amount">
                <p>Costo por cobertura de Póliza</p>
                {isNil(dataForm.currentRent) === false &&
                minumunPolicy > dataForm.currentRent * taxPolicy ? (
                  <div>
                    <h2>
                      {isNil(dataForm.currentRent) === false &&
                      isNil(dataForm.currentRent) === false
                        ? frontFunctions.parseFormatCurrency(
                            minumunPolicy,
                            2,
                            2
                          )
                        : "$0.00"}
                    </h2>
                    <strong>MXN</strong>
                    <span style={{ marginLeft: 5 }}> + IVA {tax * 100}%</span>
                  </div>
                ) : (
                  <div>
                    <h2>
                      {isNil(dataForm.currentRent) === false &&
                      isNil(dataForm.currentRent) === false
                        ? frontFunctions.parseFormatCurrency(
                            dataForm.currentRent * taxPolicy,
                            2,
                            2
                          )
                        : "$0.00"}
                    </h2>
                    <strong>MXN</strong>
                    <span style={{ marginLeft: 5 }}> + IVA {tax * 100}%</span>
                  </div>
                )}
              </div>
            </Col>
          </Row>
          {isEmpty(dataPolicyMethods) === false && (
            <>
              <p>Selecciona el porcentaje acordado a pagar</p>
              <Row>
                {dataPolicyMethods.map((row) => {
                  return (
                    <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                      <div className="buttons-typeform-payment">
                        <button
                          className={`${
                            row.idPolicyPaymentMethod ===
                            dataForm.idPolicyPaymentMethod
                              ? "select-button"
                              : "not-select-button"
                          }`}
                          onClick={() => {
                            setDataForm({
                              ...dataForm,
                              idPolicyPaymentMethod: row.idPolicyPaymentMethod,
                            });
                            setPercentPayment(row.percentCustomer);
                          }}
                        >
                          {row.text}
                        </button>
                      </div>
                    </Col>
                  );
                })}
              </Row>
              <Row>
                <Col span={6} xs={{ span: 24 }} md={{ span: 6 }} />
                <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                  <div className="price-policy-amount">
                    <p>Total a pagar (IVA incluido)</p>
                    {isNil(dataForm.currentRent) === false &&
                    minumunPolicy > dataForm.currentRent * taxPolicy ? (
                      <div>
                        <h2>
                          {isNil(dataForm.currentRent) === false &&
                          isNil(dataForm.currentRent) === false
                            ? frontFunctions.parseFormatCurrency(
                                minumunPolicy * percentPayment +
                                  minumunPolicy * percentPayment * tax,
                                2,
                                2
                              )
                            : "$0.00"}
                        </h2>
                        <strong>MXN</strong>
                        {/* <button
                          onClick={() => {
                            setIsVisibleModal(true);
                          }}
                        >
                          Pagar
                        </button> */}
                      </div>
                    ) : (
                      <div>
                        <h2>
                          {isNil(dataForm.currentRent) === false &&
                          isNil(dataForm.currentRent) === false
                            ? frontFunctions.parseFormatCurrency(
                                dataForm.currentRent *
                                  taxPolicy *
                                  percentPayment +
                                  dataForm.currentRent *
                                    taxPolicy *
                                    percentPayment *
                                    tax,
                                2,
                                2
                              )
                            : "$0.00"}
                        </h2>
                        <strong>MXN</strong>
                        {/* <button
                          onClick={() => {
                            setIsVisibleModal(true);
                          }}
                        >
                          Pagar
                        </button> */}
                      </div>
                    )}
                  </div>
                </Col>
                <Col span={6} xs={{ span: 24 }} md={{ span: 6 }} />
              </Row>
            </>
          )}

          <p>Documentos</p>
          <div className="section-top-documentation">
            <div className="section-card-documentation">
              <div className="section-title-card-doc">
                <strong>Identificación oficial</strong>
                <span>{getTypeIdDocument(dataForm.idType)}</span>
              </div>
              <div className="section-content-card-doc">
                <CustomFileUpload
                  acceptFile="image/png, image/jpeg, image/jpg"
                  dataDocument={
                    isEmpty(dataDocuments) === false &&
                    isNil(dataDocuments[0]) === false
                      ? dataDocuments[0]
                      : {}
                  }
                  typeDocument={typeDocument}
                />
                {(dataForm.idType === 1 || isNil(dataForm.idType) === true) && (
                  <CustomFileUpload
                    acceptFile="image/png, image/jpeg, image/jpg"
                    dataDocument={
                      isEmpty(dataDocuments) === false &&
                      isNil(dataDocuments[1]) === false
                        ? dataDocuments[1]
                        : {}
                    }
                    typeDocument={typeDocument}
                  />
                )}
              </div>
            </div>
            {(dataForm.hasInsurance === 1 ||
              dataForm.hasInsurance === true) && (
              <div className="section-card-documentation">
                <div className="section-title-card-doc">
                  <strong style={{ textAlign: "center" }}>
                    Póliza seguro de responsabilidad <br />
                    civíl para la propiedad
                  </strong>
                  <span></span>
                </div>
                <div className="section-content-card-doc">
                  <CustomFileUpload
                    acceptFile="image/png, image/jpeg, image/jpg, .pdf, .doc, .docx"
                    dataDocument={
                      isEmpty(dataDocuments) === false &&
                      isNil(dataDocuments[2]) === false
                        ? dataDocuments[2]
                        : {}
                    }
                    typeDocument={typeDocument}
                  />
                </div>
              </div>
            )}
          </div>
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
                    stepIn: 2,
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
              <span>Confirmar</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TypePolicy;
