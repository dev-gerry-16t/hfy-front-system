import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Input, Row, Col, Select, Alert } from "antd";

const { Option } = Select;

const SectionCurrentWork = (props) => {
  const {
    onClickNext,
    dataFormSave,
    frontFunctions,
    dataOccupations,
    dataProperties,
  } = props;
  const initialForm = {
    idOccupationActivity: null,
    idOccupationActivityText: null,
    economicDependents: null,
    companyName: null,
    currentSalary: null,
    currentSalaryFormat: null,
    antiquityTimeRange: null,
    antiquityTimeRangeText: null,
    antiquity: null,
    bossName: null,
    bossEmailAddress: null,
    bossPhoneNumber: null,
    otherIncomes: null,
    otherIncomesDescription: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [confirmData, setConfirmData] = useState(false);

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
    if (isEmpty(dataFormSave) === false && isEmpty(dataOccupations) === false) {
      const selectDefaultOccupation = dataOccupations.find((row) => {
        return dataFormSave.idOccupationActivity === row.idOccupationActivity;
      });

      setDataForm({
        ...dataFormSave,
        antiquityTimeRangeText:
          dataFormSave.antiquityTimeRange === "Y"
            ? "Años"
            : dataFormSave.antiquityTimeRange === "M"
            ? "Meses"
            : null,
        currentSalaryFormat:
          isNil(dataFormSave.currentSalary) === false
            ? frontFunctions.parseFormatCurrency(
                dataFormSave.currentSalary,
                2,
                2
              )
            : null,
        idOccupationActivityText:
          isNil(selectDefaultOccupation) === false
            ? selectDefaultOccupation.text
            : "",
      });
    }
  }, [dataFormSave, dataOccupations]);

  return (
    <div className="content-typeform-formulary">
      <h3>
        {confirmData === false
          ? "Información laboral"
          : "Confirmar Información laboral"}
      </h3>
      {confirmData === false && (
        <Row>
          <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
          <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
            {isEmpty(dataProperties) === false &&
              dataForm.isFirstTime === false && (
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
                      idOccupationActivityText: option.children,
                    });
                  }}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
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
                      antiquityTimeRangeText: option.children,
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
              {/* <button
                type="button"
                onClick={onClickBack}
                className="button_secondary"
              >
                <span>Regresar</span>
              </button> */}
              <button
                type="button"
                onClick={() => {
                  setConfirmData(true);
                }}
                className="button_primary"
              >
                <span>Continuar</span>
              </button>
            </div>
          </Col>
          <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        </Row>
      )}
      {confirmData === true && (
        <Row>
          <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
          <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
            <p>
              Verifica que tu información sea correcta, de lo contrario no
              podras hacer modificaciones.
            </p>
            <Row>
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                <DescriptionItem
                  title="Puesto/Ocupación"
                  content={dataForm.idOccupationActivityText}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Número de dependientes"
                  content={dataForm.economicDependents}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Nombre de la empresa"
                  content={dataForm.companyName}
                />
              </Col>
            </Row>
            <Row>
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                <DescriptionItem
                  title="Sueldo mensual"
                  content={dataForm.currentSalaryFormat}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Antiguedad"
                  content={`${dataForm.antiquity} ${dataForm.antiquityTimeRangeText}`}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Nombre de tu jefe"
                  content={dataForm.bossName}
                />
              </Col>
            </Row>
            <Row>
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Correo de tu jefe"
                  content={dataForm.bossEmailAddress}
                />
              </Col>
            </Row>
            <div className="button_actions">
              <button
                type="button"
                onClick={() => {
                  setConfirmData(false);
                }}
                className="button_secondary"
              >
                <span>Regresar</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onClickNext(dataForm);
                }}
                className="button_primary"
              >
                <span>Confirmar</span>
              </button>
            </div>
          </Col>
          <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        </Row>
      )}
    </div>
  );
};

export default SectionCurrentWork;
