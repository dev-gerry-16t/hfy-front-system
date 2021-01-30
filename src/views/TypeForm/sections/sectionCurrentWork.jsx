import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import {
  Layout,
  Avatar,
  Rate,
  Modal,
  Input,
  Row,
  Col,
  Select,
  Spin,
  Tooltip,
  Radio,
} from "antd";
import IconProfile from "../../../assets/icons/Profile.svg";

const { Option } = Select;

const SectionCurrentWork = (props) => {
  const { onClickBack, onClickNext, dataFormSave, frontFunctions } = props;
  const initialForm = {
    jobPosition: null,
    economicDependents: null,
    companyName: null,
    currentSalary: null,
    currentSalaryFormat: null,
    antiquityTimeRange: null,
    antiquityTimeRangeText: null,
    antiquity: null,
    bossName: null,
    bossEmailAddress: null,
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
    if (isEmpty(dataFormSave) === false) {
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
      });
    }
  }, [dataFormSave]);

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
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Input
                  value={dataForm.jobPosition}
                  placeholder={"Puesto"}
                  onChange={(e) => {
                    setDataForm({ ...dataForm, jobPosition: e.target.value });
                  }}
                />
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
                  placeholder="Numero de dependientes economicos"
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
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Input
                  value={dataForm.bossName}
                  placeholder={"Nombre de tu jefe"}
                  onChange={(e) => {
                    setDataForm({ ...dataForm, bossName: e.target.value });
                  }}
                />
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Input
                  value={dataForm.bossEmailAddress}
                  placeholder={"Correo de tu jefe"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      bossEmailAddress: e.target.value,
                    });
                  }}
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
            <Row>
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                <DescriptionItem
                  title="Puesto"
                  content={dataForm.jobPosition}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Numero de dependientes"
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
                <span>Cancelar</span>
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
