import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
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
  Radio,
} from "antd";
import {
  InfoCircleOutlined,
  UserOutlined,
  SyncOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import IconProfile from "../../../assets/icons/Profile.svg";

const { Option } = Select;

const CurrentAddressRenter = (props) => {
  const {
    onClickBack,
    onClickNext,
    dataFormSave,
    frontFunctions,
    dataZipCatalog,
    onChangeZipCode,
    dataZipCodeAdress,
    dataPropertyTypes,
  } = props;
  const initialForm = {
    streetProperty: null,
    suiteProperty: null,
    streetNumberProperty: null,
    idZipCodeProperty: null,
    zipCodeProperty: null,
    city: null,
    state: null,
    neighborhoodProperty: null,
    idPropertyType: null,
    idPropertyTypeText: null,
    isFurnished: null,
    currentRent: null,
    maintenanceAmount: null,
    totalParkingSpots: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [isOpenInput, setIsOpenInput] = useState(false);
  const [confirmData, setConfirmData] = useState(false);
  const [furnished, setFurnished] = useState(true);

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
      onChangeZipCode(dataFormSave.zipCodeProperty);
    }
  }, [dataFormSave]);

  useEffect(() => {
    if (
      isEmpty(dataZipCodeAdress) === false &&
      isEmpty(dataPropertyTypes) === false
    ) {
      const selectDefaulPropertyType = dataPropertyTypes.find((row) => {
        return dataForm.idPropertyType === row.idPropertyType;
      });
      setDataForm({
        ...dataForm,
        state: dataZipCodeAdress.state,
        city: dataZipCodeAdress.municipality,
        idPropertyTypeText:
          isNil(selectDefaulPropertyType) === false
            ? selectDefaulPropertyType.text
            : "",
      });
    }
  }, [dataZipCodeAdress, dataPropertyTypes]);

  return (
    <div className="content-typeform-formulary">
      <h3>
        {confirmData === false
          ? "Datos del Inmueble a rentar"
          : "Confirmar datos del Inmueble a rentar"}
      </h3>
      {confirmData === false && (
        <Row>
          <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
          <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
            <Row>
              <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                <Input
                  value={dataForm.streetProperty}
                  placeholder={"Calle"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      streetProperty: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <Input
                  value={dataForm.suiteProperty}
                  placeholder={"Numero interior"}
                  onChange={(e) => {
                    setDataForm({ ...dataForm, suiteProperty: e.target.value });
                  }}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <Input
                  value={dataForm.streetNumberProperty}
                  placeholder={"Numero exterior"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      streetNumberProperty: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                <Input
                  value={dataForm.zipCodeProperty}
                  placeholder={"Código postal"}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length >= 5) {
                      setDataForm({ ...dataForm, zipCodeProperty: value });
                      onChangeZipCode(e.target.value);
                    } else {
                      setDataForm({
                        ...dataForm,
                        neighborhoodProperty: null,
                        idZipCodeProperty: null,
                        zipCodeProperty: value,
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
                    value={dataForm.idZipCodeProperty}
                    onChange={(value, option) => {
                      const dataSelect = option.onClick();
                      setIsOpenInput(dataSelect.isOpen);
                      if (dataSelect.isOpen === true) {
                        setDataForm({
                          ...dataForm,
                          neighborhoodProperty: null,
                          idZipCodeProperty: value,
                        });
                      } else {
                        setDataForm({
                          ...dataForm,
                          neighborhoodProperty: option.children,
                          idZipCodeProperty: value,
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
                    value={dataForm.neighborhoodProperty}
                    placeholder={"Indicar Colonia"}
                    suffix={
                      <Tooltip title="Cerrar">
                        <CloseOutlined
                          style={{ color: "rgba(0,0,0,.45)" }}
                          onClick={() => {
                            setIsOpenInput(false);
                            setDataForm({
                              ...dataForm,
                              idZipCodeProperty: null,
                              neighborhoodProperty: null,
                            });
                          }}
                        />
                      </Tooltip>
                    }
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        neighborhoodProperty: e.target.value,
                      });
                    }}
                  />
                )}
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Select
                  value={dataForm.idPropertyType}
                  placeholder="Tipo de inmueble"
                  onChange={(value, option) => {
                    setDataForm({
                      ...dataForm,
                      idPropertyType: value,
                      idPropertyTypeText: option.children,
                    });
                  }}
                >
                  {isEmpty(dataPropertyTypes) === false &&
                    dataPropertyTypes.map((row) => {
                      return (
                        <Option
                          value={row.idPropertyType}
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
            </Row>
            <Row>
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                <div className="option-select-radio">
                  <span
                    style={{
                      color: "var(--color-primary)",
                      fontWeight: "bold",
                    }}
                  >
                    ¿El inmueble está amueblado?
                  </span>
                  <Radio.Group
                    onChange={(e) => {
                      setDataForm({ ...dataForm, isFurnished: e.target.value });
                    }}
                    value={
                      dataForm.isFurnished === true ||
                      dataForm.isFurnished === 1
                        ? 1
                        : 0
                    }
                  >
                    <Radio value={1}>Si</Radio>
                    <Radio value={0}>No</Radio>
                  </Radio.Group>
                </div>
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
                  prefix="$"
                  suffix=""
                  value={dataForm.currentRent}
                  className="inputLogin"
                  floatingLabelText=""
                  isVisible
                  toBlock={false}
                  disable={false}
                  placeholder="Monto de renta"
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
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <NumberFormat
                  id={null}
                  customInput={Input}
                  thousandSeparator=","
                  decimalSeparator="."
                  decimalPrecision={2}
                  allowNegative={false}
                  prefix="$"
                  suffix=""
                  value={dataForm.maintenanceAmount}
                  className="inputLogin"
                  floatingLabelText=""
                  isVisible
                  toBlock={false}
                  disable={false}
                  placeholder={"Monto de mandetimiento"}
                  onValueChange={(values) => {
                    const { formattedValue, value, floatValue } = values;
                    setDataForm({
                      ...dataForm,
                      maintenanceAmount: floatValue,
                    });
                  }}
                  onClick={(event) => {}}
                  onFocus={(event) => {}}
                  onBlur={(event) => {}}
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
                  prefix=""
                  suffix=""
                  value={dataForm.totalParkingSpots}
                  className="inputLogin"
                  floatingLabelText=""
                  isVisible
                  toBlock={false}
                  disable={false}
                  placeholder={"Lugares de estacionamiento"}
                  onValueChange={(values) => {
                    const { formattedValue, value, floatValue } = values;
                    setDataForm({
                      ...dataForm,
                      totalParkingSpots: floatValue,
                    });
                  }}
                  onClick={(event) => {}}
                  onFocus={(event) => {}}
                  onBlur={(event) => {}}
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
                  title="Calle"
                  content={dataForm.streetProperty}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Numero exterior"
                  content={dataForm.streetNumberProperty}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Numero interior"
                  content={dataForm.suiteProperty}
                />
              </Col>
            </Row>
            <Row>
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                <DescriptionItem
                  title="Colonia"
                  content={dataForm.neighborhoodProperty}
                />
              </Col>
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                <DescriptionItem
                  title="Municipio/Delegación"
                  content={dataForm.city}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem title="Estado" content={dataForm.state} />
              </Col>
            </Row>
            <Row>
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Código postal"
                  content={dataForm.zipCodeProperty}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Tipo de inmueble"
                  content={dataForm.idPropertyTypeText}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                <DescriptionItem
                  title="¿Está amueblado?"
                  content={
                    dataForm.isFurnished === true || dataForm.isFurnished === 1
                      ? "Si"
                      : "No"
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                <DescriptionItem
                  title="Monto de renta"
                  content={
                    isNil(dataFormSave.currentRent) === false
                      ? frontFunctions.parseFormatCurrency(
                          dataForm.currentRent,
                          2,
                          2
                        )
                      : null
                  }
                />
              </Col>
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                <DescriptionItem
                  title="Monto de mantenimiento"
                  content={
                    isNil(dataFormSave.maintenanceAmount) === false
                      ? frontFunctions.parseFormatCurrency(
                          dataForm.maintenanceAmount,
                          2,
                          2
                        )
                      : null
                  }
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Estacionamiento"
                  content={dataForm.totalParkingSpots}
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

export default CurrentAddressRenter;
