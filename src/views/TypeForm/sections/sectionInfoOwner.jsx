import React, { useState, useEffect } from "react";
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
import {
  InfoCircleOutlined,
  UserOutlined,
  SyncOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import IconProfile from "../../../assets/icons/Profile.svg";

const { Option } = Select;

const SectionInfoOwner = (props) => {
  const {
    onClickNext,
    dataFormSave,
    dataMaritalStatus,
    onChangeZipCode,
    dataZipCodeAdress,
    dataZipCatalog,
    dataNationalities,
    dataIdTypes,
  } = props;
  const initialForm = {
    isOwner: null,
    givenName: null,
    lastName: null,
    mothersMaidenName: null,
    phoneNumber: null,
    emailAddress: null,
    taxId: null,
    citizenId: null,
    idMaritalStatus: null,
    idMaritalStatusText: null,
    street: null,
    suite: null,
    streetNumber: null,
    zipCode: null,
    idZipCode: null,
    state: null,
    municipality: null,
    neighborhood: null,
    idCountryNationality: null,
    idCountryNationalityText: null,
    idType: null,
    idTypeText: null,
    idTypeNumber: null,
    placeOfIssue: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [confirmData, setConfirmData] = useState(false);
  const [isOpenInput, setIsOpenInput] = useState(false);
  const [visibleComponents, setVisibleComponents] = useState({
    givenName: true,
    lastName: true,
    mothersMaidenName: true,
    idEndorsement: true,
  });

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
      onChangeZipCode(dataFormSave.zipCode);
    }
  }, [dataFormSave]);

  useEffect(() => {
    if (
      isEmpty(dataZipCodeAdress) === false &&
      isEmpty(dataNationalities) === false &&
      isEmpty(dataIdTypes) === false &&
      isEmpty(dataMaritalStatus) === false
    ) {
      const visibleField =
        isNil(dataFormSave.jsonProperties) === false
          ? JSON.parse(dataFormSave.jsonProperties)
          : {};
      const selectDefaultNationality = dataNationalities.find((row) => {
        return dataForm.idCountryNationality === row.idCountryNationality;
      });
      const selectDefaultIdType = dataIdTypes.find((row) => {
        return dataForm.idType === row.idType;
      });
      const selectDefaultMaritalStatus = dataMaritalStatus.find((row) => {
        return dataForm.idMaritalStatus === row.idMaritalStatus;
      });
      setDataForm({
        ...dataForm,
        state: dataZipCodeAdress.state,
        city: dataZipCodeAdress.municipality,
        idCountryNationalityText:
          isNil(selectDefaultNationality) === false
            ? selectDefaultNationality.text
            : "",
        idTypeText:
          isNil(selectDefaultIdType) === false ? selectDefaultIdType.text : "",
        idMaritalStatusText:
          isNil(selectDefaultMaritalStatus) === false
            ? selectDefaultMaritalStatus.text
            : "",
        isRequiresPlaceOfIssue:
          isNil(selectDefaultIdType) === false
            ? selectDefaultIdType.requiresPlaceOfIssue
            : null,
      });
      setVisibleComponents({ ...visibleComponents, ...visibleField });
    }
  }, [dataZipCodeAdress, dataNationalities, dataIdTypes, dataMaritalStatus]);

  return (
    <div className="content-typeform-formulary">
      <h3>
        {confirmData === false
          ? "Información personal"
          : "Confirmar Información Personal"}
      </h3>
      {confirmData === false && (
        <Row>
          <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
          <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <div className="option-select-radio">
                  <span
                    style={{
                      color: "var(--color-primary)",
                      fontWeight: "bold",
                    }}
                  >
                    ¿Eres el propietario?
                  </span>
                  <Radio.Group
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({
                        ...dataForm,
                        isOwner: value,
                      });
                    }}
                    value={
                      dataForm.isOwner === true || dataForm.isOwner === 1
                        ? 1
                        : 0
                    }
                  >
                    <Radio value={1}>Si</Radio>
                    <Radio value={0}>No, lo estoy representando</Radio>
                  </Radio.Group>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                <Input
                  value={dataForm.givenName}
                  placeholder={
                    visibleComponents.lastName === true
                      ? "Nombres"
                      : "Razón social"
                  }
                  onChange={(e) => {
                    // const value = e.target.value;
                    // setDataForm({ ...dataForm, givenName: value });
                  }}
                  suffix={<img src={IconProfile} alt="profile" width="15" />}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              {visibleComponents.lastName === true && (
                <>
                  {" "}
                  <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                    <Input
                      value={dataForm.lastName}
                      placeholder={"Apellido paterno"}
                      onChange={(e) => {
                        // const value = e.target.value;
                        // setDataForm({ ...dataForm, lastName: value });
                      }}
                      suffix={
                        <img src={IconProfile} alt="profile" width="15" />
                      }
                    />
                  </Col>
                  <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
                  <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                    <Input
                      value={dataForm.mothersMaidenName}
                      placeholder={"Apellido materno"}
                      onChange={(e) => {
                        // const value = e.target.value;
                        // setDataForm({ ...dataForm, mothersMaidenName: value });
                      }}
                      suffix={
                        <img src={IconProfile} alt="profile" width="15" />
                      }
                    />
                  </Col>
                </>
              )}
            </Row>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Input
                  value={dataForm.phoneNumber}
                  placeholder={"Telefono"}
                  onChange={(e) => {
                    // const value = e.target.value;
                    // setDataForm({ ...dataForm, phoneNumber: value });
                  }}
                />
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Input
                  value={dataForm.emailAddress}
                  placeholder={"Correo"}
                  onChange={(e) => {
                    // const value = e.target.value;
                    // setDataForm({ ...dataForm, emailAddress: value });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Input
                  value={dataForm.taxId}
                  placeholder={"RFC con Homoclave"}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDataForm({ ...dataForm, taxId: value });
                  }}
                />
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Input
                  value={dataForm.citizenId}
                  placeholder={"CURP"}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDataForm({ ...dataForm, citizenId: value });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={6} xs={{ span: 24 }} md={{ span: 6 }}>
                <Select
                  placeholder="Nacionalidad"
                  showSearch
                  value={dataForm.idCountryNationality}
                  onChange={(value, option) => {
                    setDataForm({
                      ...dataForm,
                      idCountryNationality: value,
                      idCountryNationalityText: option.children,
                    });
                  }}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {isEmpty(dataNationalities) === false &&
                    dataNationalities.map((row) => {
                      return (
                        <Option value={row.idCountryNationality}>
                          {row.text}
                        </Option>
                      );
                    })}
                </Select>
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={6} xs={{ span: 24 }} md={{ span: 6 }}>
                <Select
                  placeholder="Identificación oficial"
                  showSearch
                  value={dataForm.idType}
                  onChange={(value, option) => {
                    const valueSelect = option.onClick();
                    setDataForm({
                      ...dataForm,
                      idType: value,
                      idTypeText: option.children,
                      isRequiresPlaceOfIssue: valueSelect.requiresPlaceOfIssue,
                    });
                  }}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {isEmpty(dataIdTypes) === false &&
                    dataIdTypes.map((row) => {
                      return (
                        <Option value={row.idType} onClick={() => row}>
                          {row.text}
                        </Option>
                      );
                    })}
                </Select>
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              {isNil(dataForm.idType) === false && (
                <Col span={10} xs={{ span: 24 }} md={{ span: 10 }}>
                  <Input
                    value={dataForm.idTypeNumber}
                    placeholder={`Numero de ${dataForm.idTypeText}`}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({ ...dataForm, idTypeNumber: value });
                    }}
                  />
                </Col>
              )}
            </Row>
            {dataForm.isRequiresPlaceOfIssue === true && (
              <Row>
                <Col span={13} xs={{ span: 24 }} md={{ span: 13 }}>
                  <Input
                    value={dataForm.placeOfIssue}
                    placeholder={"Lugar de expedición de la identificación"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({ ...dataForm, placeOfIssue: value });
                    }}
                  />
                </Col>
              </Row>
            )}
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Select
                  placeholder="Estado Civil"
                  value={dataForm.idMaritalStatus}
                  onChange={(value, option) => {
                    setDataForm({
                      ...dataForm,
                      idMaritalStatus: value,
                      idMaritalStatusText: option.children,
                    });
                  }}
                >
                  {isEmpty(dataMaritalStatus) === false &&
                    dataMaritalStatus.map((row) => {
                      return (
                        <Option
                          value={row.idMaritalStatus}
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
            <p>Domicilio Actual</p>
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
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <Input
                  value={dataForm.suite}
                  placeholder={"Numero interior"}
                  onChange={(e) => {
                    setDataForm({ ...dataForm, suite: e.target.value });
                  }}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <Input
                  value={dataForm.streetNumber}
                  placeholder={"Numero exterior"}
                  onChange={(e) => {
                    setDataForm({ ...dataForm, streetNumber: e.target.value });
                  }}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
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
            </Row>
            <div className="button_actions">
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
              <Col span={6} xs={{ span: 24 }} md={{ span: 6 }} />
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <DescriptionItem
                  title="¿Eres el propietarios?"
                  content={
                    dataForm.isOwner === 1 ? "Si" : "No, lo estoy representando"
                  }
                />
              </Col>
              <Col span={6} xs={{ span: 24 }} md={{ span: 6 }} />
            </Row>
            <Row>
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                <DescriptionItem
                  title={
                    visibleComponents.lastName === true
                      ? "Nombre completo"
                      : "Razón social"
                  }
                  content={`${dataForm.givenName} ${
                    visibleComponents.lastName === true ? dataForm.lastName : ""
                  } ${
                    visibleComponents.lastName === true
                      ? dataForm.mothersMaidenName
                      : ""
                  }`}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Telefono"
                  content={dataForm.phoneNumber}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Correo"
                  content={dataForm.emailAddress}
                />
              </Col>
            </Row>
            <Row>
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                <DescriptionItem
                  title="RFC con Homoclave"
                  content={dataForm.taxId}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem title="CURP" content={dataForm.citizenId} />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Nacionalidad"
                  content={dataForm.idCountryNationalityText}
                />
              </Col>
            </Row>
            <Row>
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Identificación oficial"
                  content={dataForm.idTypeText}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title={`Numero de ${dataForm.idTypeText}`}
                  content={dataForm.idTypeNumber}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Estado civil"
                  content={dataForm.idMaritalStatusText}
                />
              </Col>
            </Row>
            {dataForm.isRequiresPlaceOfIssue === true && (
              <Row>
                <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
                <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
                  <DescriptionItem
                    title={`Lugar de expedición de identificación`}
                    content={dataForm.placeOfIssue}
                  />
                </Col>
                <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
              </Row>
            )}
            <p>Domicilio Actual</p>
            <Row>
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                <DescriptionItem title="Calle" content={dataForm.street} />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Numero exterior"
                  content={dataForm.streetNumber}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Numero interior"
                  content={dataForm.suite}
                />
              </Col>
            </Row>
            <Row>
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                <DescriptionItem
                  title="Colonia"
                  content={dataForm.neighborhood}
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
                  content={dataForm.zipCode}
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

export default SectionInfoOwner;
