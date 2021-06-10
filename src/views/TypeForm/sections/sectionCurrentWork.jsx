import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Input, Row, Col, Select, Alert, Modal, Checkbox } from "antd";

const { Option } = Select;

const SectionCurrentWork = (props) => {
  const {
    onClickNext,
    dataFormSave,
    frontFunctions,
    dataOccupations,
    dataProperties,
    onGetProperties,
    dataPropertiesInfo,
  } = props;
  const initialForm = {
    idOccupationActivity: null,
    economicDependents: null,
    companyName: null,
    currentSalary: null,
    antiquityTimeRange: null,
    antiquity: null,
    bossName: null,
    bossEmailAddress: null,
    bossPhoneNumber: null,
    otherIncomes: null,
    otherIncomesDescription: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [confirmData, setConfirmData] = useState(false);
  const [aceptTerms, setAceptTerms] = useState(false);

  const DescriptionItem = ({ title, content }) => (
    <div
      className="site-description-item-profile-wrapper"
      style={{ textAlign: "center" }}
    >
      <strong className="site-description-item-profile-p-label">{title}</strong>
      <br />
      {content}
    </div>
  );

  useEffect(() => {
    if (isEmpty(dataFormSave) === false) {
      setDataForm(dataFormSave);
    }
  }, [dataFormSave]);

  return (
    <div className="content-typeform-formulary">
      <h3>Información laboral</h3>
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
              <Select
                placeholder="Puesto/Ocupación"
                showSearch
                value={dataForm.idOccupationActivity}
                onChange={(value, option) => {
                  setDataForm({
                    ...dataForm,
                    idOccupationActivity: value,
                  });
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {isEmpty(dataOccupations) === false &&
                  dataOccupations.map((row) => {
                    return (
                      <Option value={row.idOccupationActivity}>
                        {row.text}
                      </Option>
                    );
                  })}
              </Select>
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
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
                value={dataForm.economicDependents}
                className="inputLogin"
                floatingLabelText=""
                isVisible
                toBlock={false}
                disable={false}
                placeholder="Número de dependientes economicos"
                onValueChange={(values) => {
                  const { formattedValue, value, floatValue } = values;
                  setDataForm({
                    ...dataForm,
                    economicDependents: floatValue,
                  });
                }}
                onClick={(event) => {}}
                onFocus={(event) => {}}
                onBlur={(event) => {}}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <Input
                value={dataForm.companyName}
                placeholder={"Nombre de la empresa"}
                onChange={(e) => {
                  setDataForm({ ...dataForm, companyName: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
              <NumberFormat
                id={null}
                customInput={Input}
                thousandSeparator=","
                decimalSeparator="."
                decimalPrecision={2}
                allowNegative={false}
                prefix="$"
                suffix=""
                value={dataForm.currentSalary}
                className="inputLogin"
                floatingLabelText=""
                isVisible
                toBlock={false}
                disable={false}
                placeholder="Sueldo mensual"
                onValueChange={(values) => {
                  const { formattedValue, value, floatValue } = values;
                  setDataForm({
                    ...dataForm,
                    currentSalary: floatValue,
                    currentSalaryFormat: formattedValue,
                  });
                }}
                onClick={(event) => {}}
                onFocus={(event) => {}}
                onBlur={(event) => {}}
              />
            </Col>
            <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
            <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
              <NumberFormat
                id={null}
                customInput={Input}
                thousandSeparator=","
                decimalSeparator="."
                decimalPrecision={2}
                allowNegative={false}
                prefix=""
                suffix=""
                value={dataForm.antiquity}
                className="inputLogin"
                floatingLabelText=""
                isVisible
                toBlock={false}
                disable={false}
                placeholder="Antiguedad"
                onValueChange={(values) => {
                  const { formattedValue, value, floatValue } = values;
                  setDataForm({ ...dataForm, antiquity: floatValue });
                }}
                onClick={(event) => {}}
                onFocus={(event) => {}}
                onBlur={(event) => {}}
              />
            </Col>
            <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
            <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
              <Select
                placeholder="Periodo"
                onChange={(value, option) => {
                  setDataForm({
                    ...dataForm,
                    antiquityTimeRange: value,
                  });
                }}
                value={dataForm.antiquityTimeRange}
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
          <Row>
            <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
              <NumberFormat
                id={null}
                customInput={Input}
                thousandSeparator=","
                decimalSeparator="."
                decimalPrecision={2}
                allowNegative={false}
                prefix="$"
                suffix=""
                value={dataForm.otherIncomes}
                className="inputLogin"
                floatingLabelText=""
                isVisible
                toBlock={false}
                disable={false}
                placeholder="Otros ingresos"
                onValueChange={(values) => {
                  const { formattedValue, value, floatValue } = values;
                  setDataForm({
                    ...dataForm,
                    otherIncomes: floatValue,
                    otherIncomesFormat: formattedValue,
                  });
                }}
                onClick={(event) => {}}
                onFocus={(event) => {}}
                onBlur={(event) => {}}
              />
            </Col>
            <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
            <Col span={15} xs={{ span: 24 }} md={{ span: 15 }}>
              <textarea
                style={{
                  background: "transparent",
                  borderRadius: 10,
                  fontWeight: "bold",
                }}
                className="ant-input inputLogin"
                placeholder="Descripción de otros ingresos"
                value={
                  isNil(dataForm.otherIncomesDescription) === false
                    ? dataForm.otherIncomesDescription
                    : ""
                }
                maxlength="1000"
                onChange={(e) => {
                  setDataForm({
                    ...dataForm,
                    otherIncomesDescription: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
          <p>Información de tu jefe directo</p>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input
                value={dataForm.bossName}
                placeholder={"Nombre"}
                onChange={(e) => {
                  setDataForm({ ...dataForm, bossName: e.target.value });
                }}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input
                value={dataForm.bossEmailAddress}
                placeholder={"Correo"}
                onChange={(e) => {
                  setDataForm({
                    ...dataForm,
                    bossEmailAddress: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input
                value={dataForm.bossPhoneNumber}
                placeholder={"Teléfono"}
                onChange={(e) => {
                  const value = e.target.value;
                  setDataForm({ ...dataForm, bossPhoneNumber: value });
                }}
              />
            </Col>
          </Row>
          <div className="button_actions">
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
                Verifica tu información antes de continuar ya que si se detectan
                inconsistencias podrían afectar el proceso de investigación y
                generación del contrato.
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
              <span>Continuar</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SectionCurrentWork;
