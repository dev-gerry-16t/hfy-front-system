import React, { useState, useEffect } from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import NumberFormat from "react-number-format";
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
} from "antd";
import {
  InfoCircleOutlined,
  UserOutlined,
  SyncOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";

const { Option } = Select;

const SectionAddProperty = (props) => {
  const {
    isModalVisible,
    onClose,
    onClickAddProperty,
    spinVisible,
    onChangeZipCode,
    dataZipCodeAdress,
    dataZipCatalog,
  } = props;
  const initialDataForm = {
    street: null,
    suite: null,
    streetNumber: null,
    neighborhood: null,
    city: null,
    state: null,
    zipCode: null,
    idZipCode: null,
    firstStreetReference: null,
    secondStreetReference: null,
    totalSuites: [],
    departament: null,
  };
  const [dataForm, setDataForm] = useState(initialDataForm);
  const [statesDynamic, setStateDynamic] = useState({});
  const [totalDepartment, setTotalDepartment] = useState([]);
  const [isOpenInput, setIsOpenInput] = useState(false);

  const LoadingSpin = <SyncOutlined spin />;

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
    <Modal
      style={{ top: 20 }}
      visible={isModalVisible}
      closable={false}
      footer={false}
    >
      <Spin indicator={LoadingSpin} spinning={spinVisible} delay={200}>
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
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Input
                  value={dataForm.street}
                  placeholder={"Calle"}
                  onChange={(e) => {
                    setDataForm({ ...dataForm, street: e.target.value });
                  }}
                />
              </Col>
              <Col
                span={2}
                xs={{ span: 24 }}
                md={{ span: 2 }}
                style={{ marginBottom: "15px" }}
              />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
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
              <Col
                span={2}
                xs={{ span: 24 }}
                md={{ span: 2 }}
                style={{ marginBottom: "15px" }}
              />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Input
                  value={dataForm.state}
                  placeholder={"Estado"}
                  disabled
                  onChange={(e) => {
                    setDataForm({ ...dataForm, state: e.target.value });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Input
                  value={dataForm.city}
                  disabled
                  placeholder={"Municipio/Delegacion"}
                  onChange={(e) => {
                    setDataForm({ ...dataForm, city: e.target.value });
                  }}
                />
              </Col>
              <Col
                span={2}
                xs={{ span: 24 }}
                md={{ span: 2 }}
                style={{ marginBottom: "15px" }}
              />
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
            </Row>
            <p>Entre Calles</p>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
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
              <Col
                span={2}
                xs={{ span: 24 }}
                md={{ span: 2 }}
                style={{ marginBottom: "15px" }}
              />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
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
                setDataForm(initialDataForm);
                setStateDynamic({});
                setTotalDepartment([]);
              }}
            >
              <span>Registrar Propiedad</span>
            </button>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default SectionAddProperty;
