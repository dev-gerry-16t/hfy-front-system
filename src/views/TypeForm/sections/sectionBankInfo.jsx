import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
import {
  Input,
  Row,
  Col,
  Select,
  Radio,
  DatePicker,
  Alert,
  Modal,
  Checkbox,
} from "antd";
import admiration from "../../../assets/icons/exclaim.svg";

const { Option } = Select;

const SectionBankInfo = (props) => {
  const {
    onClickBack,
    onClickFinish,
    dataBank,
    dataFormSave,
    dataProperties,
    onGetProperties,
    dataPropertiesInfo,
    onSearchBank,
  } = props;

  const initialForm = {
    isInCash: null,
    idBank: null,
    idBankText: null,
    bankBranch: null,
    accountHolder: null,
    accountNumber: null,
    clabeNumber: null,
    signingAvailabilityAt: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [confirmData, setConfirmData] = useState(false);
  const [aceptTerms, setAceptTerms] = useState(false);
  const [isCorrectClabe, setIsCorrectClabe] = useState(null);

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

  const parseDataClabe = (str) => {
    if (isNil(str) === false) {
      const bank = str.slice(0, 3);
      if (bank.length === 3) {
        onSearchBank(bank);
      } else if (bank.length < 3) {
        onSearchBank("000");
      }
    }
  };
  const setAsyncInformation = async (data) => {
    if (isEmpty(data) === false) {
      await setDataForm({
        ...data,
      });
      parseDataClabe(data.clabeNumber);
    }
  };

  useEffect(() => {
    setAsyncInformation(dataFormSave);
  }, [dataFormSave]);

  useEffect(() => {
    if (isEmpty(dataBank) === false) {
      setDataForm({
        ...dataForm,
        idBank: dataBank[0].idBank,
        idBankText: dataBank[0].bankName,
      });
      setIsCorrectClabe(true);
    } else {
      setDataForm({
        ...dataForm,
        idBank: null,
        idBankText: null,
      });
      setIsCorrectClabe(false);
    }
  }, [dataBank]);

  return (
    <div className="content-typeform-formulary">
      <h3>Información Bancaria</h3>
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
                  ¿Cómo deseas tus pagos de renta?
                </span>
                <Radio.Group
                  onChange={(e) => {
                    const value = e.target.value;
                    setDataForm({ ...dataForm, isInCash: value });
                  }}
                  value={
                    dataForm.isInCash === true || dataForm.isInCash === 1
                      ? 1
                      : isNil(dataForm.isInCash) === false
                      ? 0
                      : null
                  }
                >
                  <Radio value={1}>Efectivo</Radio>
                  <Radio value={0}>Cuenta Bancaria</Radio>
                </Radio.Group>
              </div>
            </Col>
          </Row>
          {(dataForm.isInCash === false || dataForm.isInCash === 0) && (
            <>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <div>
                    <Input
                      value={dataForm.clabeNumber}
                      placeholder={"CLABE interbancaria (18 dígitos)"}
                      onChange={(e) => {
                        if (e.target.value.length <= 18) {
                          if (e.target.value.length < 18) {
                            setIsCorrectClabe(false);
                          } else {
                            setIsCorrectClabe(true);
                          }
                          if (e.target.value.length === 18) {
                            parseDataClabe(e.target.value);
                          }
                          setDataForm({
                            ...dataForm,
                            clabeNumber: e.target.value,
                          });
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.keyCode === 109 || e.keyCode === 107) {
                          e.preventDefault();
                        }
                      }}
                      onBlur={() => {
                        parseDataClabe(dataForm.clabeNumber);
                      }}
                      type="number"
                      min="0"
                    />
                    {isCorrectClabe === false && (
                      <div
                        style={{
                          background: "#FFF4EC",
                          borderRadius: "0px 0px 10px 10px",
                          padding: "0px 10px",
                        }}
                      >
                        <img src={admiration} alt="exclaim" />
                        <span style={{ marginLeft: "10px", color: "#CF6E23" }}>
                          CLABE no valida
                        </span>
                      </div>
                    )}
                  </div>
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.idBankText}
                    placeholder={"Banco"}
                    disabled
                    onChange={(e) => {}}
                  />
                  {/* <Select
                      placeholder="Banco"
                      showSearch
                      value={dataForm.idBank}
                      onChange={(value, option) => {
                        setDataForm({
                          ...dataForm,
                          idBank: value,
                          idBankText: option.children,
                        });
                      }}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {isEmpty(dataBank) === false &&
                        dataBank.map((row) => {
                          return <Option value={row.id}>{row.text}</Option>;
                        })}
                    </Select> */}
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    type="number"
                    value={dataForm.bankBranch}
                    placeholder={"Sucursal"}
                    onChange={(e) => {
                      if (e.target.value.length <= 30) {
                        setDataForm({
                          ...dataForm,
                          bankBranch: e.target.value,
                        });
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.keyCode === 109 || e.keyCode === 107) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    type="number"
                    value={dataForm.accountNumber}
                    placeholder={"Número de cuenta"}
                    onKeyDown={(e) => {
                      if (e.keyCode === 109 || e.keyCode === 107) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      if (e.target.value.length <= 30) {
                        setDataForm({
                          ...dataForm,
                          accountNumber: e.target.value,
                        });
                      }
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <Input
                    value={dataForm.accountHolder}
                    placeholder={"A nombre de"}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        accountHolder: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
            </>
          )}

          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <DatePicker
                value={
                  isNil(dataForm.signingAvailabilityAt) === false
                    ? moment(dataForm.signingAvailabilityAt, "YYYY-MM-DD")
                    : null
                }
                placeholder="Fecha de firma de contrato"
                onChange={(momentFormat, date) => {
                  setDataForm({
                    ...dataForm,
                    signingAvailabilityAt:
                      moment(momentFormat).format("YYYY-MM-DD"),
                  });
                }}
                format="DD MMMM YYYY"
              />
            </Col>
          </Row>
          <div className="button_actions">
            <button
              type="button"
              onClick={onClickBack}
              className="button_secondary"
            >
              <span>Regresar</span>
            </button>
            <button
              type="button"
              onClick={async () => {
                try {
                  await onGetProperties({
                    idTypeForm: dataForm.idTypeForm,
                    stepIn: 3,
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
                  onClickFinish(dataForm);
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

export default SectionBankInfo;
