import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
import NumberFormat from "react-number-format";
import { CloseOutlined } from "@ant-design/icons";
import {
  Input,
  Row,
  Col,
  Select,
  Tooltip,
  Radio,
  DatePicker,
  Collapse,
  Alert,
  Modal,
  Checkbox,
} from "antd";
import IconProfile from "../../../assets/icons/Profile.svg";
import CustomFileUpload from "./customFileUpload";

const { Option } = Select;
const { Panel } = Collapse;

const SectionInfoAval = (props) => {
  const {
    dataNationalities,
    dataIdTypes,
    onClickFinish,
    dataFormSave,
    onChangeZipCode,
    dataZipCatalog,
    dataZipCodeAdressEndorsement,
    dataZipCatalogEndorsement,
    dataZipCodeAdress,
    dataDocuments,
    typeDocument,
    dataMaritalStatus,
    dataMaritalRegime,
    frontFunctions,
    dataProperties,
    onGetProperties,
    dataPropertiesInfo,
  } = props;
  const initialForm = {
    hasEndorsement: null,
    endorsementGivenName: null,
    endorsementLastName: null,
    endorsementMothersMaidenName: null,
    endorsementEmailAddress: null,
    endorsementPhoneNumber: null,
    collateralPropertyStreet: null,
    collateralPropertySuite: null,
    collateralPropertyStreetNumber: null,
    collateralPropertyIdZipCoode: null,
    collateralPropertyZipCode: null,
    collateralPropertyNeighborhood: null,
    collateralPropertyCity: null,
    collateralPropertyState: null,
    documentNumber: null,
    documentSignedAt: null,
    notaryOfficeNumber: null,
    notaryName: null,
    signedAtPlace: null,
    idEndorsementNationality: null,
    idEndorsementType: null,
    idEndorsementFieldDescription: null,
    idEndorsementTypeNumber: null,
    endorsementCitizenId: null,
    publicPropertyRegistry: null,
    endorsementPlaceOfIssue: null,
    idEndorsementMaritalStatus: null,
    idEndorsementMaritalRegime: null,
    endorsementAssessment: null,
    endorsementStreet: null,
    endorsementSuite: null,
    endorsementStreetNumber: null,
    endorsementZipCode: null,
    endorsementIdZipCode: null,
    endorsementState: null,
    endorsementCity: null,
    endorsementNeighborhood: null,
    assessmentInvoice: null,
    assessmentTicket: null,
    assessmentDate: null,
    assessmentIssuedBy: null,
    hasAssessment: null,
    repeatAddress: null,
    endorsementTaxId: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [isOpenInput, setIsOpenInput] = useState(false);
  const [dataImage, setDataImage] = useState(null);
  const [isOpenInputEndorsement, setIsOpenInputEndorsement] = useState(false);
  const [isOpenSelectRegime, setIsOpenSelectRegime] = useState(false);
  const [confirmData, setConfirmData] = useState(false);
  const [keyCollapse, setKeyCollapse] = useState("1");
  const [aceptTerms, setAceptTerms] = useState(false);

  const DescriptionItem = ({ title, content, isRequired }) => (
    <div
      className="site-description-item-profile-wrapper"
      style={{ fontFamily: "Poppins" }}
    >
      <strong
        className="site-description-item-profile-p-label"
        style={{ marginRight: 10 }}
      >
        {title}:
      </strong>
      <span
        style={{
          color: isRequired === true ? "red" : "",
          fontWeight: isRequired === true ? "bold" : "",
        }}
      >
        {content}
      </span>
    </div>
  );

  useEffect(() => {
    if (
      isEmpty(dataIdTypes) === false &&
      isEmpty(dataMaritalStatus) === false
    ) {
      const selectDefaultIdType = dataIdTypes.find((row) => {
        return dataFormSave.idEndorsementType === row.idType;
      });
      const selectDefaultMaritalStatus = dataMaritalStatus.find((row) => {
        return dataFormSave.idEndorsementMaritalStatus === row.idMaritalStatus;
      });
      if (
        isNil(selectDefaultMaritalStatus) === false &&
        isNil(selectDefaultMaritalStatus.hasMaritalRegime) === false
      ) {
        setIsOpenSelectRegime(selectDefaultMaritalStatus.hasMaritalRegime);
      }
      setDataForm({
        ...dataFormSave,
        idEndorsementFieldDescription:
          isNil(selectDefaultIdType) === false
            ? selectDefaultIdType.fieldDescription
            : "",
        isRequiresPlaceOfIssue:
          isNil(selectDefaultIdType) === false
            ? selectDefaultIdType.requiresPlaceOfIssue
            : null,
      });
      onChangeZipCode(dataFormSave.collateralPropertyZipCode);
      onChangeZipCode(dataFormSave.endorsementZipCode, true);
    }
  }, [dataIdTypes, dataFormSave, dataMaritalStatus]);

  useEffect(() => {
    if (isEmpty(dataZipCodeAdress) === false) {
      setDataForm({
        ...dataForm,
        collateralPropertyState: dataZipCodeAdress.state,
        collateralPropertyCity: dataZipCodeAdress.municipality,
      });
    }
  }, [dataZipCodeAdress]);

  useEffect(() => {
    if (isEmpty(dataZipCodeAdressEndorsement) === false) {
      setDataForm({
        ...dataForm,
        endorsementState: dataZipCodeAdressEndorsement.state,
        endorsementCity: dataZipCodeAdressEndorsement.municipality,
      });
    }
  }, [dataZipCodeAdressEndorsement]);

  const getTypeIdDocument = (type) => {
    let word = "";

    switch (type) {
      case 1:
        word = "IFE/INE Frontal y Vuelta";
        break;
      case 2:
        word = "Pasaporte";
        break;
      case 3:
        word = "FM3";
        break;
      default:
        word = "IFE/INE Frontal y Vuelta";
        break;
    }
    return word;
  };

  const repeatAddressEndorsement = (value, data, callback) => {
    if (value === true || value === 1) {
      onChangeZipCode(data.endorsementZipCode);
      callback({
        collateralPropertyStreet: data.endorsementStreet,
        collateralPropertyStreetNumber: data.endorsementStreetNumber,
        collateralPropertyIdZipCoode: data.endorsementIdZipCode,
        collateralPropertyZipCode: data.endorsementZipCode,
        collateralPropertyNeighborhood: data.endorsementNeighborhood,
        collateralPropertyCity: data.endorsementCity,
        collateralPropertyState: data.endorsementState,
        repeatAddress: value,
      });
    } else {
      callback({
        collateralPropertyStreet: null,
        collateralPropertyStreetNumber: null,
        collateralPropertyIdZipCoode: null,
        collateralPropertyZipCode: null,
        collateralPropertyNeighborhood: null,
        collateralPropertyCity: null,
        collateralPropertyState: null,
        repeatAddress: value,
      });
    }
  };

  return (
    <div className="content-typeform-formulary">
      <h3>Información Aval</h3>
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
              <div className="option-select-radio">
                <span
                  style={{
                    color: "var(--color-primary)",
                    fontWeight: "bold",
                  }}
                >
                  ¿Cuentas con Aval?
                </span>
                <Radio.Group
                  onChange={(e) => {
                    const value = e.target.value;
                    setDataForm({ ...dataForm, hasEndorsement: value });
                  }}
                  value={
                    dataForm.hasEndorsement === true ||
                    dataForm.hasEndorsement === 1
                      ? 1
                      : isNil(dataForm.hasEndorsement) === false
                      ? 0
                      : null
                  }
                >
                  <Radio value={1}>Si</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </div>
            </Col>
          </Row>
          {(dataForm.hasEndorsement === 1 ||
            dataForm.hasEndorsement === true) && (
            <>
              <Collapse activeKey={keyCollapse}>
                <Panel
                  header={
                    <p style={{ marginBottom: 0 }}>Información personal</p>
                  }
                  key="1"
                >
                  <Row>
                    <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                      <Input
                        value={dataForm.endorsementGivenName}
                        placeholder={"Nombres"}
                        onChange={(e) => {
                          const value = e.target.value;
                          setDataForm({
                            ...dataForm,
                            endorsementGivenName: value,
                          });
                        }}
                        suffix={
                          <img src={IconProfile} alt="profile" width="15" />
                        }
                      />
                    </Col>
                    <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
                    <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                      <Input
                        value={dataForm.endorsementLastName}
                        placeholder={"Apellido paterno"}
                        onChange={(e) => {
                          const value = e.target.value;
                          setDataForm({
                            ...dataForm,
                            endorsementLastName: value,
                          });
                        }}
                        suffix={
                          <img src={IconProfile} alt="profile" width="15" />
                        }
                      />
                    </Col>
                    <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
                    <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                      <Input
                        value={dataForm.endorsementMothersMaidenName}
                        placeholder={"Apellido materno"}
                        onChange={(e) => {
                          const value = e.target.value;
                          setDataForm({
                            ...dataForm,
                            endorsementMothersMaidenName: value,
                          });
                        }}
                        suffix={
                          <img src={IconProfile} alt="profile" width="15" />
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                      <Input
                        value={dataForm.endorsementTaxId}
                        placeholder={"RFC con Homoclave"}
                        onChange={(e) => {
                          const value = e.target.value;
                          setDataForm({
                            ...dataForm,
                            endorsementTaxId: value,
                          });
                        }}
                      />
                    </Col>
                    <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
                    <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                      <Input
                        value={dataForm.endorsementPhoneNumber}
                        placeholder={"Teléfono"}
                        onChange={(e) => {
                          const value = e.target.value;
                          setDataForm({
                            ...dataForm,
                            endorsementPhoneNumber: value,
                          });
                        }}
                      />
                    </Col>
                    <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
                    <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                      <Input
                        value={dataForm.endorsementEmailAddress}
                        placeholder={"Correo"}
                        onChange={(e) => {
                          const value = e.target.value;
                          setDataForm({
                            ...dataForm,
                            endorsementEmailAddress: value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  {isNil(dataImage) === false && (
                    <Row>
                      <Col span={7} xs={{ span: 24 }} md={{ span: 7 }} />
                      <Col span={10} xs={{ span: 24 }} md={{ span: 10 }}>
                        <img
                          src={`data:image/jpeg;base64,${dataImage}`}
                          alt="Referencia-imagen"
                          width="350"
                        />
                      </Col>
                      <Col span={7} xs={{ span: 24 }} md={{ span: 7 }} />
                    </Row>
                  )}
                  <Row>
                    <Col span={6} xs={{ span: 24 }} md={{ span: 6 }}>
                      <Select
                        placeholder="Nacionalidad"
                        showSearch
                        value={dataForm.idEndorsementNationality}
                        onChange={(value, option) => {
                          setDataForm({
                            ...dataForm,
                            idEndorsementNationality: value,
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
                        value={dataForm.idEndorsementType}
                        onChange={(value, option) => {
                          const valueSelect = option.onClick();
                          setDataForm({
                            ...dataForm,
                            idEndorsementType: value,
                            idEndorsementFieldDescription:
                              valueSelect.fieldDescription,
                            isRequiresPlaceOfIssue:
                              valueSelect.requiresPlaceOfIssue,
                          });
                          setDataImage(valueSelect.imageReference);
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
                    {isNil(dataForm.idEndorsementType) === false && (
                      <Col span={10} xs={{ span: 24 }} md={{ span: 10 }}>
                        <Input
                          value={dataForm.idEndorsementTypeNumber}
                          placeholder={dataForm.idEndorsementFieldDescription}
                          onChange={(e) => {
                            const value = e.target.value;
                            setDataForm({
                              ...dataForm,
                              idEndorsementTypeNumber: value,
                            });
                          }}
                        />
                      </Col>
                    )}
                  </Row>
                  {dataForm.isRequiresPlaceOfIssue === true && (
                    <Row>
                      <Col span={13} xs={{ span: 24 }} md={{ span: 13 }}>
                        <Input
                          value={dataForm.endorsementPlaceOfIssue}
                          placeholder={
                            "Lugar de expedición de la identificación"
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            setDataForm({
                              ...dataForm,
                              endorsementPlaceOfIssue: value,
                            });
                          }}
                        />
                      </Col>
                    </Row>
                  )}
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <Input
                        value={dataForm.endorsementCitizenId}
                        placeholder={"CURP"}
                        onChange={(e) => {
                          const value = e.target.value;
                          setDataForm({
                            ...dataForm,
                            endorsementCitizenId: value,
                          });
                        }}
                      />
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <Select
                        placeholder="Estado Civil"
                        value={dataForm.idEndorsementMaritalStatus}
                        onChange={(value, option) => {
                          const dataClick = option.onClick();
                          setIsOpenSelectRegime(dataClick.hasMaritalRegime);
                          setDataForm({
                            ...dataForm,
                            idEndorsementMaritalStatus: value,
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
                  <Row>
                    {isOpenSelectRegime === true && (
                      <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                        <Select
                          placeholder="Régimen"
                          value={dataForm.idEndorsementMaritalRegime}
                          onChange={(value, option) => {
                            setDataForm({
                              ...dataForm,
                              idEndorsementMaritalRegime: value,
                            });
                          }}
                        >
                          {isEmpty(dataMaritalRegime) === false &&
                            dataMaritalRegime.map((row) => {
                              return (
                                <Option
                                  value={row.idMaritalRegime}
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
                    )}
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                  </Row>
                  <div className="button_actions">
                    {/* <button
                        type="button"
                        onClick={() => {
                          setKeyCollapse("1");
                        }}
                        className="button_secondary"
                      >
                        <span>Regresar</span>
                      </button> */}
                    <button
                      type="button"
                      onClick={() => {
                        setKeyCollapse("2");
                      }}
                      className="button_primary"
                    >
                      <span>Continuar</span>
                    </button>
                  </div>
                </Panel>
                <Panel
                  header={<p style={{ marginBottom: 0 }}>Dirección del Aval</p>}
                  key="2"
                >
                  <Row>
                    <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                      <Input
                        value={dataForm.endorsementStreet}
                        placeholder={"Calle"}
                        onChange={(e) => {
                          setDataForm({
                            ...dataForm,
                            endorsementStreet: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <Input
                        value={dataForm.endorsementStreetNumber}
                        placeholder={"Número"}
                        onChange={(e) => {
                          setDataForm({
                            ...dataForm,
                            endorsementStreetNumber: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <Input
                        value={dataForm.endorsementZipCode}
                        placeholder={"Código postal"}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length >= 5) {
                            setDataForm({
                              ...dataForm,
                              endorsementZipCode: value,
                            });
                            onChangeZipCode(e.target.value, true);
                          } else {
                            setDataForm({
                              ...dataForm,
                              endorsementNeighborhood: null,
                              endorsementIdZipCode: null,
                              endorsementZipCode: value,
                            });
                          }
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <Input
                        value={dataForm.endorsementState}
                        placeholder={"Estado"}
                        onChange={(e) => {}}
                      />
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <Input
                        value={dataForm.endorsementCity}
                        placeholder={"Municipio/Delegación"}
                        onChange={(e) => {}}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      {isOpenInputEndorsement === false ? (
                        <Select
                          placeholder="Colonia"
                          value={dataForm.endorsementIdZipCode}
                          onChange={(value, option) => {
                            const dataSelect = option.onClick();
                            setIsOpenInputEndorsement(dataSelect.isOpen);
                            if (dataSelect.isOpen === true) {
                              setDataForm({
                                ...dataForm,
                                endorsementNeighborhood: null,
                                endorsementIdZipCode: value,
                              });
                            } else {
                              setDataForm({
                                ...dataForm,
                                endorsementNeighborhood: option.children,
                                endorsementIdZipCode: value,
                              });
                            }
                          }}
                        >
                          {isEmpty(dataZipCatalogEndorsement) === false &&
                            dataZipCatalogEndorsement.map((row) => {
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
                          value={dataForm.endorsementNeighborhood}
                          placeholder={"Indicar Colonia"}
                          suffix={
                            <Tooltip title="Cerrar">
                              <CloseOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                                onClick={() => {
                                  setIsOpenInputEndorsement(false);
                                  setDataForm({
                                    ...dataForm,
                                    endorsementIdZipCode: null,
                                    endorsementNeighborhood: null,
                                  });
                                }}
                              />
                            </Tooltip>
                          }
                          onChange={(e) => {
                            setDataForm({
                              ...dataForm,
                              endorsementNeighborhood: e.target.value,
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
                        setKeyCollapse("1");
                      }}
                      className="button_secondary"
                    >
                      <span>Regresar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setKeyCollapse("3");
                      }}
                      className="button_primary"
                    >
                      <span>Continuar</span>
                    </button>
                  </div>
                </Panel>
                <Panel
                  header={
                    <p style={{ marginBottom: 0 }}>
                      Dirección de la propiedad en garantía
                    </p>
                  }
                  key="3"
                >
                  <Row>
                    <Col span={15} xs={{ span: 24 }} md={{ span: 15 }}>
                      <div className="option-select-radio">
                        <span
                          style={{
                            color: "var(--color-primary)",
                            fontWeight: "bold",
                          }}
                        >
                          ¿Quieres ocupar la dirección del Aval?
                        </span>
                        <Radio.Group
                          onChange={(e) => {
                            const value = e.target.value;
                            repeatAddressEndorsement(
                              value,
                              dataForm,
                              (newData) => {
                                setDataForm({ ...dataForm, ...newData });
                              }
                            );
                          }}
                          value={
                            dataForm.repeatAddress === true ||
                            dataForm.repeatAddress === 1
                              ? 1
                              : isNil(dataForm.repeatAddress) === false
                              ? 0
                              : null
                          }
                        >
                          <Radio value={1}>Si</Radio>
                          <Radio value={0}>No, es diferente</Radio>
                        </Radio.Group>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                      <Input
                        value={dataForm.collateralPropertyStreet}
                        placeholder={"Calle"}
                        onChange={(e) => {
                          setDataForm({
                            ...dataForm,
                            collateralPropertyStreet: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <Input
                        value={dataForm.collateralPropertyStreetNumber}
                        placeholder={"Número"}
                        onChange={(e) => {
                          setDataForm({
                            ...dataForm,
                            collateralPropertyStreetNumber: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <Input
                        value={dataForm.collateralPropertyZipCode}
                        placeholder={"Código postal"}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length >= 5) {
                            setDataForm({
                              ...dataForm,
                              collateralPropertyZipCode: value,
                            });
                            onChangeZipCode(e.target.value);
                          } else {
                            setDataForm({
                              ...dataForm,
                              collateralPropertyNeighborhood: null,
                              collateralPropertyIdZipCoode: null,
                              collateralPropertyZipCode: value,
                            });
                          }
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <Input
                        value={dataForm.collateralPropertyState}
                        placeholder={"Estado"}
                        onChange={(e) => {
                          setDataForm({
                            ...dataForm,
                            collateralPropertyState: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <Input
                        value={dataForm.collateralPropertyCity}
                        placeholder={"Municipio/Delegación"}
                        onChange={(e) => {
                          setDataForm({
                            ...dataForm,
                            collateralPropertyCity: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      {isOpenInput === false ? (
                        <Select
                          placeholder="Colonia"
                          value={dataForm.collateralPropertyIdZipCoode}
                          onChange={(value, option) => {
                            const dataSelect = option.onClick();
                            setIsOpenInput(dataSelect.isOpen);
                            if (dataSelect.isOpen === true) {
                              setDataForm({
                                ...dataForm,
                                collateralPropertyNeighborhood: null,
                                collateralPropertyIdZipCoode: value,
                              });
                            } else {
                              setDataForm({
                                ...dataForm,
                                collateralPropertyNeighborhood: option.children,
                                collateralPropertyIdZipCoode: value,
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
                          value={dataForm.collateralPropertyNeighborhood}
                          placeholder={"Indicar Colonia"}
                          suffix={
                            <Tooltip title="Cerrar">
                              <CloseOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                                onClick={() => {
                                  setIsOpenInput(false);
                                  setDataForm({
                                    ...dataForm,
                                    collateralPropertyIdZipCoode: null,
                                    collateralPropertyNeighborhood: null,
                                  });
                                }}
                              />
                            </Tooltip>
                          }
                          onChange={(e) => {
                            setDataForm({
                              ...dataForm,
                              collateralPropertyNeighborhood: e.target.value,
                            });
                          }}
                        />
                      )}
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <Input
                        value={dataForm.publicPropertyRegistry}
                        placeholder="Registro público/Folio real"
                        onChange={(e) => {
                          const value = e.target.value;
                          setDataForm({
                            ...dataForm,
                            publicPropertyRegistry: value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <div className="button_actions">
                    <button
                      type="button"
                      onClick={() => {
                        setKeyCollapse("2");
                      }}
                      className="button_secondary"
                    >
                      <span>Regresar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setKeyCollapse("4");
                      }}
                      className="button_primary"
                    >
                      <span>Continuar</span>
                    </button>
                  </div>
                </Panel>
                <Panel
                  header={<p style={{ marginBottom: 0 }}>Gravamen</p>}
                  key="4"
                >
                  <Row>
                    <Col span={15} xs={{ span: 24 }} md={{ span: 15 }}>
                      <div className="option-select-radio">
                        <span
                          style={{
                            color: "var(--color-primary)",
                            fontWeight: "bold",
                          }}
                        >
                          ¿Cuentas con Certificado de Libertad de Gravamen?
                        </span>
                        <Radio.Group
                          onChange={(e) => {
                            const value = e.target.value;
                            setDataForm({
                              ...dataForm,
                              hasAssessment: value,
                            });
                          }}
                          value={
                            dataForm.hasAssessment === true ||
                            dataForm.hasAssessment === 1
                              ? 1
                              : isNil(dataForm.hasAssessment) === false
                              ? 0
                              : null
                          }
                        >
                          <Radio value={1}>Si</Radio>
                          <Radio value={0}>No, tengo un Gravamen</Radio>
                        </Radio.Group>
                      </div>
                    </Col>
                  </Row>
                  {(dataForm.hasAssessment === 1 ||
                    dataForm.hasAssessment === true) && (
                    <>
                      <Row>
                        <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                          <Input
                            value={dataForm.assessmentInvoice}
                            placeholder="Folio"
                            onChange={(e) => {
                              const value = e.target.value;
                              setDataForm({
                                ...dataForm,
                                assessmentInvoice: value,
                              });
                            }}
                          />
                        </Col>
                        <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
                        <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                          <Input
                            value={dataForm.assessmentTicket}
                            placeholder="Boleta"
                            onChange={(e) => {
                              const value = e.target.value;
                              setDataForm({
                                ...dataForm,
                                assessmentTicket: value,
                              });
                            }}
                          />
                        </Col>
                        <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
                        <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                          <DatePicker
                            value={
                              isNil(dataForm.assessmentDate) === false
                                ? moment(dataForm.assessmentDate, "YYYY-MM-DD")
                                : null
                            }
                            placeholder="Fecha de expedición"
                            onChange={(momentFormat, date) => {
                              setDataForm({
                                ...dataForm,
                                assessmentDate:
                                  moment(momentFormat).format("YYYY-MM-DD"),
                              });
                            }}
                            format="DD MMMM YYYY"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={15} xs={{ span: 24 }} md={{ span: 15 }}>
                          <Input
                            value={dataForm.assessmentIssuedBy}
                            placeholder="Expedido por: EJ. Instituto Registral y Catastral...:"
                            onChange={(e) => {
                              const value = e.target.value;
                              setDataForm({
                                ...dataForm,
                                assessmentIssuedBy: value,
                              });
                            }}
                          />
                        </Col>
                      </Row>
                    </>
                  )}
                  {(dataForm.hasAssessment === 0 ||
                    dataForm.hasAssessment === false) && (
                    <>
                      <Row>
                        <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                          <NumberFormat
                            id={null}
                            customInput={Input}
                            thousandSeparator=","
                            decimalSeparator="."
                            decimalPrecision={2}
                            allowNegative={false}
                            prefix="$"
                            suffix=""
                            value={dataForm.endorsementAssessment}
                            className="inputLogin"
                            floatingLabelText=""
                            isVisible
                            toBlock={false}
                            disable={false}
                            placeholder="Monto del Gravamen"
                            onValueChange={(values) => {
                              const { formattedValue, value, floatValue } =
                                values;
                              setDataForm({
                                ...dataForm,
                                endorsementAssessment: floatValue,
                              });
                            }}
                            onClick={(event) => {}}
                            onFocus={(event) => {}}
                            onBlur={(event) => {}}
                          />
                        </Col>
                      </Row>
                    </>
                  )}
                  {(dataForm.hasAssessment === 1 ||
                    dataForm.hasAssessment === true) && (
                    <div className="section-top-documentation">
                      <div className="section-card-documentation">
                        <div className="section-title-card-doc">
                          <strong>Certificado de libertad de Gravamen</strong>
                          <span></span>
                        </div>
                        <div
                          className="section-content-card-doc"
                          style={{ justifyContent: "center" }}
                        >
                          <CustomFileUpload
                            acceptFile="image/png, image/jpeg, image/jpg"
                            dataDocument={
                              isEmpty(dataDocuments) === false &&
                              isNil(dataDocuments[4]) === false
                                ? dataDocuments[4]
                                : {}
                            }
                            typeDocument={typeDocument}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="button_actions">
                    <button
                      type="button"
                      onClick={() => {
                        setKeyCollapse("3");
                      }}
                      className="button_secondary"
                    >
                      <span>Regresar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setKeyCollapse("5");
                      }}
                      className="button_primary"
                    >
                      <span>Continuar</span>
                    </button>
                  </div>
                </Panel>
                <Panel
                  header={<p style={{ marginBottom: 0 }}>Escrituras</p>}
                  key="5"
                >
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <Input
                        value={dataForm.documentNumber}
                        placeholder={"Número de las escrituras"}
                        onChange={(e) => {
                          setDataForm({
                            ...dataForm,
                            documentNumber: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <DatePicker
                        value={
                          isNil(dataForm.documentSignedAt) === false
                            ? moment(dataForm.documentSignedAt, "YYYY-MM-DD")
                            : null
                        }
                        placeholder="Fecha de firma de las escrituras"
                        onChange={(momentFormat, date) => {
                          setDataForm({
                            ...dataForm,
                            documentSignedAt:
                              moment(momentFormat).format("YYYY-MM-DD"),
                          });
                        }}
                        format="DD MMMM YYYY"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                      <Input
                        value={dataForm.signedAtPlace}
                        placeholder={"Lugar de firma de la escritura"}
                        onChange={(e) => {
                          setDataForm({
                            ...dataForm,
                            signedAtPlace: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <Input
                        value={dataForm.notaryOfficeNumber}
                        placeholder={"Número de la notaria"}
                        onChange={(e) => {
                          setDataForm({
                            ...dataForm,
                            notaryOfficeNumber: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <Input
                        value={dataForm.notaryName}
                        placeholder={"Nombre del notario"}
                        onChange={(e) => {
                          setDataForm({
                            ...dataForm,
                            notaryName: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <div className="button_actions">
                    <button
                      type="button"
                      onClick={() => {
                        setKeyCollapse("4");
                      }}
                      className="button_secondary"
                    >
                      <span>Regresar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setKeyCollapse("6");
                      }}
                      className="button_primary"
                    >
                      <span>Continuar</span>
                    </button>
                  </div>
                </Panel>
                <Panel
                  header={<p style={{ marginBottom: 0 }}>Documentación</p>}
                  key="6"
                >
                  <div className="section-top-documentation">
                    <div className="section-card-documentation">
                      <div className="section-title-card-doc">
                        <strong>Identificación oficial</strong>
                        <span>
                          {getTypeIdDocument(dataForm.idEndorsementType)}
                        </span>
                      </div>
                      <div className="section-content-card-doc">
                        <CustomFileUpload
                          acceptFile="image/png, image/jpeg, image/jpg"
                          dataDocument={
                            isEmpty(dataDocuments) === false &&
                            isNil(dataDocuments[0]) === false
                              ? dataDocuments[0]
                              : {}
                          }
                          typeDocument={typeDocument}
                        />
                        {(dataForm.idEndorsementType === 1 ||
                          isNil(dataForm.idEndorsementType) === true) && (
                          <CustomFileUpload
                            acceptFile="image/png, image/jpeg, image/jpg"
                            dataDocument={
                              isEmpty(dataDocuments) === false &&
                              isNil(dataDocuments[1]) === false
                                ? dataDocuments[1]
                                : {}
                            }
                            typeDocument={typeDocument}
                          />
                        )}
                      </div>
                    </div>
                    {isOpenSelectRegime === true && (
                      <div className="section-card-documentation">
                        <div className="section-title-card-doc">
                          <strong>Acta de Matrimonio</strong>
                          <span style={{ visibility: "hidden" }}>N/A</span>
                        </div>
                        <div className="section-content-card-doc">
                          <CustomFileUpload
                            acceptFile="image/png, image/jpeg, image/jpg, .pdf, .doc, .docx"
                            dataDocument={
                              isEmpty(dataDocuments) === false &&
                              isNil(dataDocuments[3]) === false
                                ? dataDocuments[3]
                                : {}
                            }
                            typeDocument={typeDocument}
                          />
                        </div>
                      </div>
                    )}
                    <div className="section-card-documentation">
                      <div className="section-title-card-doc">
                        <strong>Escrituras de la propiedad</strong>
                        <span style={{ visibility: "hidden" }}>N/A</span>
                      </div>
                      <div className="section-content-card-doc">
                        <CustomFileUpload
                          acceptFile="image/png, image/jpeg, image/jpg, .pdf, .doc, .docx"
                          dataDocument={
                            isEmpty(dataDocuments) === false &&
                            isNil(dataDocuments[2]) === false
                              ? dataDocuments[2]
                              : {}
                          }
                          typeDocument={typeDocument}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="button_actions">
                    <button
                      type="button"
                      onClick={() => {
                        setKeyCollapse("5");
                      }}
                      className="button_secondary"
                    >
                      <span>Regresar</span>
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await onGetProperties({
                            idTypeForm: dataForm.idTypeForm,
                            stepIn: 5,
                            jsonProperties: JSON.stringify(dataForm),
                          });
                          setConfirmData(true);
                        } catch (error) {}
                      }}
                      className="button_primary"
                    >
                      <span>Finalizar</span>
                    </button>
                  </div>
                </Panel>
              </Collapse>
            </>
          )}
          {(dataForm.hasEndorsement === 0 ||
            dataForm.hasEndorsement === false) && (
            <div className="button_actions">
              <button
                type="button"
                onClick={async () => {
                  try {
                    await onGetProperties({
                      idTypeForm: dataForm.idTypeForm,
                      stepIn: 5,
                      jsonProperties: JSON.stringify(dataForm),
                    });
                    setConfirmData(true);
                  } catch (error) {}
                }}
                className="button_primary"
              >
                <span>Finalizar</span>
              </button>
            </div>
          )}
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
                  onClickFinish(dataForm);
                  setConfirmData(false);
                }
              }}
            >
              <span>Finalizar</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SectionInfoAval;
