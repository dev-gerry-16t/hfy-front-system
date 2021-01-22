import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
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
  DatePicker,
} from "antd";
import IconProfile from "../../../assets/icons/Profile.svg";

const { Option } = Select;

const SectionCurrentAddress = (props) => {
  const { onClickBack, onClickNext, dataFormSave } = props;
  const initialForm = {
    street: null,
    suite: null,
    streetNumber: null,
    idZipCode: null,
    city: null,
    state: null,
    neighborhood: null,
    isOwn: null,
    currentTimeRange: null,
    currentTime: null,
    dateChangeAddress: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);

  useEffect(() => {
    if (isEmpty(dataFormSave) === false) {
      setDataForm(dataFormSave);
    }
  }, [dataFormSave]);

  return (
    <div className="content-typeform-formulary">
      <h3>Domicilio actual</h3>
      <Row>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
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
                placeholder={"Numero"}
                onChange={(e) => {
                  setDataForm({ ...dataForm, streetNumber: e.target.value });
                }}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input
                value={dataForm.idZipCode}
                placeholder={"Código postal"}
                onChange={(e) => {
                  setDataForm({ ...dataForm, idZipCode: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input
                value={dataForm.state}
                placeholder={"Estado"}
                onChange={(e) => {
                  setDataForm({ ...dataForm, state: e.target.value });
                }}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Input
                value={dataForm.city}
                placeholder={"Municipio/Delegación"}
                onChange={(e) => {
                  setDataForm({ ...dataForm, city: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Select
                value={dataForm.neighborhood}
                placeholder="Colonia"
                onChange={(value, option) => {
                  setDataForm({ ...dataForm, neighborhood: value });
                }}
              >
                <Option value={1} onClick={() => {}}>
                  Granjas
                </Option>
                <Option value={2} onClick={() => {}}>
                  Americas
                </Option>
              </Select>
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <div className="option-select-radio">
                <span style={{ color: "#ff0282", fontWeight: "bold" }}>
                  La propiedad actual es
                </span>
                <Radio.Group
                  onChange={(e) => {
                    setDataForm({ ...dataForm, isOwn: e.target.value });
                  }}
                  value={dataForm.isOwn}
                >
                  <Radio value={1}>Rentada</Radio>
                  <Radio value={0}>Propia</Radio>
                </Radio.Group>
              </div>
            </Col>
          </Row>
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
                      setDataForm({ ...dataForm, currentTimeRange: value });
                    }}
                    value={dataForm.currentTimeRange}
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
            </Col>
          </Row>
          <Row>
            <Col span={14} xs={{ span: 24 }} md={{ span: 14 }}>
              <DatePicker
                value={
                  isNil(dataForm.dateChangeAddress) === false
                    ? moment(dataForm.dateChangeAddress, "YYYY-MM-DD")
                    : null
                }
                placeholder="Fecha de cambio proximo domicilio"
                onChange={(momentFormat, date) => {
                  setDataForm({
                    ...dataForm,
                    dateChangeAddress: moment(momentFormat).format(
                      "YYYY-MM-DD"
                    ),
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

export default SectionCurrentAddress;
