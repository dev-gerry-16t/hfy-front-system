import React, { useState } from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import NumberFormat from "react-number-format";
import { Layout, Avatar, Rate, Modal, Input, Row, Col, Select } from "antd";
import Arrow from "../../../assets/icons/Arrow.svg";

const { Option } = Select;

const SectionAddProperty = (props) => {
  const { isModalVisible, onClose, onClickAddProperty } = props;
  const [dataForm, setDataForm] = useState({
    street: null,
    suite: null,
    streetNumber: null,
    neighborhood: null,
    city: null,
    state: null,
    zipCode: null,
    firstStreetReference: null,
    secondStreetReference: null,
    totalSuites: null,
    departament: null,
  });
  const [statesDynamic, setStateDynamic] = useState({});
  const [totalDepartment, setTotalDepartment] = useState([]);

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
              onClose();
            }}
          >
            <img src={Arrow} alt="backTo" width="30" />
          </button>
          <h1>Registrar Propiedad</h1>
        </div>
        <div className="main-form-information">
          <p>Datos de localización</p>
          <Row>
            <Col span={11}>
              <Input
                value={dataForm.street}
                placeholder={"Calle"}
                onChange={(e) => {
                  setDataForm({ ...dataForm, street: e.target.value });
                }}
              />
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Input
                value={dataForm.streetNumber}
                placeholder={"Numero"}
                onChange={(e) => {
                  setDataForm({ ...dataForm, streetNumber: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Input
                value={dataForm.neighborhood}
                placeholder={"Colonia"}
                onChange={(e) => {
                  setDataForm({ ...dataForm, neighborhood: e.target.value });
                }}
              />
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Input
                value={dataForm.city}
                placeholder={"Municipio/Delegacion"}
                onChange={(e) => {
                  setDataForm({ ...dataForm, city: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Input
                value={dataForm.state}
                placeholder={"Estado"}
                onChange={(e) => {
                  setDataForm({ ...dataForm, state: e.target.value });
                }}
              />
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Input
                value={dataForm.zipCode}
                placeholder={"Código postal"}
                onChange={(e) => {
                  setDataForm({ ...dataForm, zipCode: e.target.value });
                }}
              />
            </Col>
          </Row>
          <p>Entre Calles</p>
          <Row>
            <Col span={11}>
              <Input
                value={dataForm.firstStreetReference}
                placeholder={"Calle"}
                onChange={(e) => {
                  setDataForm({
                    ...dataForm,
                    firstStreetReference: e.target.value,
                  });
                }}
              />
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Input
                value={dataForm.secondStreetReference}
                placeholder={"Calle"}
                onChange={(e) => {
                  setDataForm({
                    ...dataForm,
                    secondStreetReference: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
          <p>Agrega departamentos</p>
          <Row>
            <Col span={24}>
              <Select
                placeholder="Número de departamentos"
                value={dataForm.totalSuites}
                onChange={(value, option) => {
                  let array = [];
                  let statesObject = {};
                  for (let index = 0; index < value; index++) {
                    array.push({
                      id: `suite-${index + 1}`,
                    });
                    statesObject[`suite-${index + 1}`] = {
                      suite: null,
                      currentRent: null,
                    };
                  }
                  setStateDynamic({ ...statesObject, ...statesDynamic });
                  setDataForm({
                    ...dataForm,
                    totalSuites: value,
                  });
                  setTotalDepartment(array);
                }}
              >
                <Option value={1}>1 Departamento</Option>
                <Option value={2}>2 Departamentos</Option>
                <Option value={3}>3 Departamentos</Option>
              </Select>
            </Col>
          </Row>
          {isEmpty(totalDepartment) === false &&
            totalDepartment.map((row) => {
              return (
                <Row>
                  <Col span={11}>
                    <Input
                      value={statesDynamic[row.id].suite}
                      placeholder={"Número interior"}
                      onChange={(e) => {
                        setStateDynamic({
                          ...statesDynamic,
                          [row.id]: {
                            ...statesDynamic[row.id],
                            suite: e.target.value,
                          },
                        });
                      }}
                    />
                  </Col>
                  <Col span={2} />
                  <Col span={11}>
                    <NumberFormat
                      id={null}
                      customInput={Input}
                      thousandSeparator=","
                      decimalSeparator="."
                      decimalPrecision={2}
                      allowNegative={false}
                      prefix="$"
                      suffix=""
                      value={statesDynamic[row.id].currentRent}
                      className="inputLogin"
                      floatingLabelText=""
                      isVisible
                      toBlock={false}
                      disable={false}
                      placeholder="Monto de renta"
                      onValueChange={(values) => {
                        const { formattedValue, value, floatValue } = values;
                        setStateDynamic({
                          ...statesDynamic,
                          [row.id]: {
                            ...statesDynamic[row.id],
                            currentRent: floatValue,
                          },
                        });
                      }}
                      onClick={(event) => {}}
                      onFocus={(event) => {}}
                      onBlur={(event) => {}}
                    />
                  </Col>
                  <Col span={1} />
                  <Col
                    span={2}
                    style={{
                      textAlign: "center",
                      margin: "auto",
                    }}
                  ></Col>
                </Row>
              );
            })}
        </div>
        <div className="button_init_primary">
          <button
            type="button"
            onClick={() => {
              const arrayDepartment = [];
              const objentSend = dataForm;
              const statesDepartment = statesDynamic;
              for (const key in statesDepartment) {
                arrayDepartment.push(statesDepartment[key]);
              }
              objentSend.departament = arrayDepartment;
              onClickAddProperty(objentSend);
            }}
          >
            <span>Registrar Propiedad</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SectionAddProperty;
