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
  const { onClickBack, onClickNext, dataFormSave } = props;
  const initialForm = {
    jobPosition: null,
    economicDependents: null,
    companyName: null,
    currentSalary: null,
    antiquityTimeRange: null,
    antiquity: null,
    bossName: null,
    bossEmailAddress: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);

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
                  setDataForm({ ...dataForm, economicDependents: floatValue });
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
                  setDataForm({ ...dataForm, currentSalary: floatValue });
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
                  setDataForm({ ...dataForm, antiquityTimeRange: value });
                }}
                value={dataForm.antiquityTimeRange}
              >
                <Option value={1} onClick={() => {}}>
                  Meses
                </Option>
                <Option value={2} onClick={() => {}}>
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
                onClickNext(dataForm);
              }}
              className="button_primary"
            >
              <span>Continuar</span>
            </button>
          </div>
        </Col>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
      </Row>
    </div>
  );
};

export default SectionCurrentWork;
