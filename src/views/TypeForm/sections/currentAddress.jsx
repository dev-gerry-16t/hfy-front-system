import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Input, Row, Col, Select, Tooltip, Radio, Alert } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Option } = Select;

const SectionCurrentAddress = (props) => {
  const {
    onClickNext,
    dataFormSave,
    dataZipCatalog,
    onChangeZipCode,
    dataZipCodeAdress,
    dataProperties,
  } = props;
  const initialForm = {
    street: null,
    suite: null,
    streetNumber: null,
    idZipCode: null,
    zipCode: null,
    city: null,
    state: null,
    neighborhood: null,
    isOwn: null,
    currentTimeRange: null,
    currentTimeRangeText: null,
    currentTime: null,
    dateChangeAddress: null,
    lessorFullName: null,
    lessorPhoneNumber: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [isOpenInput, setIsOpenInput] = useState(false);
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
        currentTimeRangeText:
          dataFormSave.currentTimeRange === "Y"
            ? "Años"
            : dataFormSave.currentTimeRange === "M"
            ? "Meses"
            : null,
      });
      onChangeZipCode(dataFormSave.zipCode);
    }
  }, [dataFormSave]);

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
    <div className="content-typeform-formulary">
      <h3>
        {confirmData === false
          ? "Domicilio actual"
          : "Confirmar Domicilio actual"}
      </h3>
      {confirmData === false && (
        <Row>
          <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
          <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
            {isEmpty(dataProperties) === false && (
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
                  placeholder={"Número"}
                  onChange={(e) => {
                    setDataForm({ ...dataForm, streetNumber: e.target.value });
                  }}
                />
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
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
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <div className="option-select-radio">
                  <span
                    style={{
                      color: "var(--color-primary)",
                      fontWeight: "bold",
                    }}
                  >
                    La propiedad actual es
                  </span>
                  <Radio.Group
                    onChange={(e) => {
                      setDataForm({ ...dataForm, isOwn: e.target.value });
                    }}
                    value={
                      dataForm.isOwn === 1 || dataForm.isOwn === true
                        ? 1
                        : isNil(dataForm.isOwn) === false
                        ? 0
                        : null
                    }
                  >
                    <Radio value={1}>Propia</Radio>
                    <Radio value={0}>Rentada</Radio>
                  </Radio.Group>
                </div>
              </Col>
            </Row>
            {(dataForm.isOwn === 0 || dataForm.isOwn === false) && (
              <Row>
                <Col span={13} xs={{ span: 24 }} md={{ span: 13 }}>
                  <Input
                    value={dataForm.lessorFullName}
                    placeholder={"Nombre del arrendador"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({ ...dataForm, lessorFullName: value });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={9} xs={{ span: 24 }} md={{ span: 9 }}>
                  <Input
                    value={dataForm.lessorPhoneNumber}
                    placeholder={"Teléfono del arrendador"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({ ...dataForm, lessorPhoneNumber: value });
                    }}
                  />
                </Col>
              </Row>
            )}
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
                        setDataForm({
                          ...dataForm,
                          currentTimeRange: value,
                          currentTimeRangeText: option.children,
                        });
                      }}
                      value={dataForm.currentTimeRange}
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
              </Col>
            </Row>
            {/* <Row>
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
            </Row> */}
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
                <DescriptionItem title="Calle" content={dataForm.street} />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Número"
                  content={dataForm.streetNumber}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Colonia"
                  content={dataForm.neighborhood}
                />
              </Col>
            </Row>
            <Row>
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
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Código postal"
                  content={dataForm.zipCode}
                />
              </Col>
            </Row>
            <Row>
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="La propiedad es"
                  content={
                    dataForm.isOwn === 1 || dataForm.isOwn === true
                      ? "Propia"
                      : isNil(dataForm.isOwn) === false
                      ? "Rentada"
                      : null
                  }
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={6} xs={{ span: 24 }} md={{ span: 6 }}>
                <DescriptionItem
                  title="Tiempo habitando"
                  content={`${dataForm.currentTime} ${dataForm.currentTimeRangeText}`}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              {/* <Col span={9} xs={{ span: 24 }} md={{ span: 9 }}>
                <DescriptionItem
                  title="Fecha de cambio proximo domicilio"
                  content={moment(
                    dataForm.dateChangeAddress,
                    "YYYY-MM-DD"
                  ).format("DD MMMM YYYY")}
                />
              </Col> */}
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

export default SectionCurrentAddress;
