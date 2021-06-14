import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import {
  Input,
  Row,
  Col,
  Select,
  Tooltip,
  Radio,
  Alert,
  Modal,
  Checkbox,
} from "antd";
import { AuditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import IconProfile from "../../../assets/icons/Profile.svg";

const { Option } = Select;

const SectionInfoUser = (props) => {
  const {
    onClickNext,
    dataFormSave,
    dataNationalities,
    dataIdTypes,
    dataCommerceSociality,
    dataStates,
    dataProperties,
    onGetProperties,
    dataPropertiesInfo,
  } = props;
  const initialForm = {
    givenName: null,
    lastName: null,
    mothersMaidenName: null,
    phoneNumber: null,
    emailAddress: null,
    taxId: null,
    citizenId: null,
    hasCar: null,
    carriagePlate: null,
    idCountryNationality: null,
    idType: null,
    fieldDescription: null,
    idTypeNumber: null,
    placeOfIssue: null,
    enterpriseIdCommercialSocietyType: null,
    enterpriseIdStatePublicProperty: null,
    enterprisePublicWrtitingNo: null,
    enterprisePublicBookNo: null,
    enterpriseNotaryName: null,
    enterpriseNotaryOfficeNo: null,
    enterpriseSignedAtPlace: null,
    enterpriseCommercialInvoice: null,
    legalRepGivenName: null,
    legalRepLastName: null,
    legalRepMothersMaidenName: null,
    legalRepPublicWritingNo: null,
    legalRepPublicBookNo: null,
    legalRepNotaryName: null,
    legalRepNotaryOfficeNo: null,
    legalRepSignedAtPlace: null,
    legalRepIdType: null,
    legalRepFieldDescription: null,
    legalRepIdTypeNumber: null,
    NIV: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [confirmData, setConfirmData] = useState(false);
  const [dataImage, setDataImage] = useState(null);
  const [dataImageLegal, setDataImageLegal] = useState(null);
  const [visibleComponents, setVisibleComponents] = useState({
    givenName: true,
    lastName: true,
    mothersMaidenName: true,
    idEndorsement: true,
  });
  const [aceptTerms, setAceptTerms] = useState(false);

  useEffect(() => {
    if (isEmpty(dataFormSave) === false && isEmpty(dataIdTypes) === false) {
      const visibleField =
        isNil(dataFormSave.jsonProperties) === false
          ? JSON.parse(dataFormSave.jsonProperties)
          : {};
      if (dataFormSave.requiresCustomerTenantEntInfo === true) {
        const selectDefaultLegalIdType = dataIdTypes.find((row) => {
          return dataFormSave.legalRepIdType === row.idType;
        });
        setDataForm({
          ...dataFormSave,
          legalRepFieldDescription:
            isNil(selectDefaultLegalIdType) === false
              ? selectDefaultLegalIdType.fieldDescription
              : "",
        });
      } else {
        const selectDefaultIdType = dataIdTypes.find((row) => {
          return dataFormSave.idType === row.idType;
        });
        setDataForm({
          ...dataFormSave,
          fieldDescription:
            isNil(selectDefaultIdType) === false
              ? selectDefaultIdType.fieldDescription
              : "",
          isRequiresPlaceOfIssue:
            isNil(selectDefaultIdType) === false
              ? selectDefaultIdType.requiresPlaceOfIssue
              : null,
        });
      }
      setVisibleComponents({ ...visibleComponents, ...visibleField });
    }
  }, [dataIdTypes, dataFormSave]);

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

  const repeatInfoMoralPerson = (value, data, callback) => {
    if (value === true || value === 1) {
      callback({
        legalRepPublicWritingNo: data.enterprisePublicWrtitingNo,
        legalRepPublicBookNo: data.enterprisePublicBookNo,
        legalRepNotaryName: data.enterpriseNotaryName,
        legalRepNotaryOfficeNo: data.enterpriseNotaryOfficeNo,
        legalRepSignedAtPlace: data.enterpriseSignedAtPlace,
        repeatInfoMoral: value,
      });
    } else {
      callback({
        legalRepPublicWritingNo: null,
        legalRepPublicBookNo: null,
        legalRepNotaryName: null,
        legalRepNotaryOfficeNo: null,
        legalRepSignedAtPlace: null,
        repeatInfoMoral: value,
      });
    }
  };

  return (
    <div className="content-typeform-formulary">
      <h3>
        {confirmData === false
          ? "Información general"
          : "Confirmar Información general"}
      </h3>
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
          {dataForm.hasTenant === true && (
            <>
              <p>Información de pago de póliza</p>
              <Row>
                <Col span={6} xs={{ span: 24 }} md={{ span: 6 }} />
                <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                  <div className="price-policy-amount">
                    <p>Método de pago por póliza</p>
                    <div>
                      <h2>{dataForm.policyPaymentMethod}</h2>
                    </div>
                  </div>
                </Col>
                <Col span={6} xs={{ span: 24 }} md={{ span: 6 }} />
              </Row>
              <Row>
                <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                  <div className="price-policy-amount">
                    <p>Costo por cobertura de Póliza</p>
                    <div>
                      <h2>{dataForm.totalPolicyAmount}</h2>
                    </div>
                  </div>
                </Col>
                <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                  <div className="price-policy-amount">
                    <p>Se te asigno el pago de</p>
                    <div>
                      <h2>{dataForm.totalCustomerTenantPolicyAmount}</h2>
                    </div>
                  </div>
                </Col>
              </Row>
            </>
          )}
          <Row>
            <Col
              span={visibleComponents.lastName === true ? 8 : 11}
              xs={{ span: 24 }}
              md={{ span: visibleComponents.lastName === true ? 8 : 11 }}
            >
              <Input
                value={dataForm.givenName}
                placeholder={
                  visibleComponents.lastName === true
                    ? "Nombres"
                    : "Razón social"
                }
                onChange={(e) => {
                  const value = e.target.value;
                  setDataForm({ ...dataForm, givenName: value });
                }}
                suffix={
                  visibleComponents.lastName === true ? (
                    <img src={IconProfile} alt="profile" width="15" />
                  ) : (
                    <AuditOutlined />
                  )
                }
              />
            </Col>
            <Col
              span={visibleComponents.lastName === true ? 1 : 2}
              xs={{ span: 24 }}
              md={{ span: visibleComponents.lastName === true ? 1 : 2 }}
            />
            {dataForm.requiresCustomerTenantEntInfo === true && (
              <>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Select
                    placeholder="Tipo de Sociedad Mercantil"
                    showSearch
                    value={dataForm.enterpriseIdCommercialSocietyType}
                    onChange={(value, option) => {
                      setDataForm({
                        ...dataForm,
                        enterpriseIdCommercialSocietyType: value,
                      });
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {isEmpty(dataCommerceSociality) === false &&
                      dataCommerceSociality.map((row) => {
                        return (
                          <Option value={row.idCommercialSocietyType}>
                            {row.text}
                          </Option>
                        );
                      })}
                  </Select>
                </Col>
              </>
            )}
            {visibleComponents.lastName === true && (
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <Input
                  value={dataForm.lastName}
                  placeholder={"Apellido paterno"}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDataForm({ ...dataForm, lastName: value });
                  }}
                  suffix={<img src={IconProfile} alt="profile" width="15" />}
                />
              </Col>
            )}
            <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
            {visibleComponents.mothersMaidenName === true && (
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <Input
                  value={dataForm.mothersMaidenName}
                  placeholder={"Apellido materno"}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDataForm({ ...dataForm, mothersMaidenName: value });
                  }}
                  suffix={<img src={IconProfile} alt="profile" width="15" />}
                />
              </Col>
            )}
          </Row>
          <Row>
            {visibleComponents.phoneNumber === true && (
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Input
                  value={dataForm.phoneNumber}
                  placeholder={"Teléfono"}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDataForm({ ...dataForm, phoneNumber: value });
                  }}
                />
              </Col>
            )}
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
          {visibleComponents.idCountryNationality === true &&
            visibleComponents.idType === true &&
            visibleComponents.idTypeNumber === true && (
              <>
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
                      value={dataForm.idCountryNationality}
                      onChange={(value, option) => {
                        setDataForm({
                          ...dataForm,
                          idCountryNationality: value,
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
                          fieldDescription: valueSelect.fieldDescription,
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
                  {isNil(dataForm.idType) === false && (
                    <Col span={10} xs={{ span: 24 }} md={{ span: 10 }}>
                      <Input
                        value={dataForm.idTypeNumber}
                        placeholder={dataForm.fieldDescription}
                        onChange={(e) => {
                          const value = e.target.value;
                          setDataForm({ ...dataForm, idTypeNumber: value });
                        }}
                      />
                    </Col>
                  )}
                </Row>
              </>
            )}
          {dataForm.isRequiresPlaceOfIssue === true &&
            visibleComponents.idTypeNumber === true && (
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
            {visibleComponents.citizenId === true && (
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
            )}
          </Row>
          <Row>
            {visibleComponents.hasCar === true && (
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <div className="option-select-radio">
                  <span
                    style={{
                      color: "var(--color-primary)",
                      fontWeight: "bold",
                    }}
                  >
                    Tienes Auto
                  </span>
                  <Radio.Group
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({ ...dataForm, hasCar: value });
                    }}
                    value={
                      dataForm.hasCar === true || dataForm.hasCar === 1
                        ? 1
                        : isNil(dataForm.hasCar) === false
                        ? 0
                        : null
                    }
                  >
                    <Radio value={1}>Si</Radio>
                    <Radio value={0}>No</Radio>
                  </Radio.Group>
                </div>
              </Col>
            )}
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            {(dataForm.hasCar === 1 || dataForm.hasCar === true) && (
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Input
                  value={dataForm.carriagePlate}
                  placeholder={"Ingresa las placas"}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDataForm({ ...dataForm, carriagePlate: value });
                  }}
                />
              </Col>
            )}
          </Row>
          {dataForm.requiresCustomerTenantEntInfo === true && (
            <>
              <p>Información Acta Constitutiva</p>
              <Row>
                <Col span={10} xs={{ span: 23 }} md={{ span: 10 }}>
                  <Select
                    placeholder="Estado de emisión"
                    showSearch
                    value={dataForm.enterpriseIdStatePublicProperty}
                    onChange={(value, option) => {
                      setDataForm({
                        ...dataForm,
                        enterpriseIdStatePublicProperty: value,
                      });
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {isEmpty(dataStates) === false &&
                      dataStates.map((row) => {
                        return <Option value={row.idState}>{row.text}</Option>;
                      })}
                  </Select>
                </Col>
                <Col span={1} xs={{ span: 1 }} md={{ span: 1 }}>
                  <Tooltip
                    placement="top"
                    title="Estado donde se emitió el Registro Público de la Propiedad de la empresa."
                  >
                    <div
                      style={{
                        padding: "5px 0px 0px 5px",
                      }}
                    >
                      <QuestionCircleOutlined />
                    </div>
                  </Tooltip>
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.enterpriseCommercialInvoice}
                    placeholder="Folio Mercantil"
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({
                        ...dataForm,
                        enterpriseCommercialInvoice: value,
                      });
                    }}
                    suffix={<img src={IconProfile} alt="profile" width="15" />}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.enterprisePublicWrtitingNo}
                    placeholder={"Escritura pública No."}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({
                        ...dataForm,
                        enterprisePublicWrtitingNo: value,
                      });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.enterprisePublicBookNo}
                    placeholder={"Libro"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({
                        ...dataForm,
                        enterprisePublicBookNo: value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.enterpriseNotaryName}
                    placeholder={"Nombre del notario"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({
                        ...dataForm,
                        enterpriseNotaryName: value,
                      });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.enterpriseNotaryOfficeNo}
                    placeholder={"Número de notaría"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({
                        ...dataForm,
                        enterpriseNotaryOfficeNo: value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={15} xs={{ span: 24 }} md={{ span: 15 }}>
                  <Input
                    value={dataForm.enterpriseSignedAtPlace}
                    placeholder={"Lugar de firma de escritura"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({
                        ...dataForm,
                        enterpriseSignedAtPlace: value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <p>Representante Legal</p>
              <Row>
                <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                  <Input
                    value={dataForm.legalRepGivenName}
                    placeholder={"Nombres"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({
                        ...dataForm,
                        legalRepGivenName: value,
                      });
                    }}
                    suffix={<img src={IconProfile} alt="profile" width="15" />}
                  />
                </Col>
                <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
                <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                  <Input
                    value={dataForm.legalRepLastName}
                    placeholder={"Apellido paterno"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({
                        ...dataForm,
                        legalRepLastName: value,
                      });
                    }}
                    suffix={<img src={IconProfile} alt="profile" width="15" />}
                  />
                </Col>
                <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
                <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                  <Input
                    value={dataForm.legalRepMothersMaidenName}
                    placeholder={"Apellido materno"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({
                        ...dataForm,
                        legalRepMothersMaidenName: value,
                      });
                    }}
                    suffix={<img src={IconProfile} alt="profile" width="15" />}
                  />
                </Col>
              </Row>
              {isNil(dataImageLegal) === false && (
                <Row>
                  <Col span={7} xs={{ span: 24 }} md={{ span: 7 }} />
                  <Col span={10} xs={{ span: 24 }} md={{ span: 10 }}>
                    <img
                      src={`data:image/jpeg;base64,${dataImageLegal}`}
                      alt="Referencia-imagen"
                      width="350"
                    />
                  </Col>
                  <Col span={7} xs={{ span: 24 }} md={{ span: 7 }} />
                </Row>
              )}
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Select
                    placeholder="Identificación oficial"
                    showSearch
                    value={dataForm.legalRepIdType}
                    onChange={(value, option) => {
                      const valueSelect = option.onClick();
                      setDataForm({
                        ...dataForm,
                        legalRepIdType: value,
                        legalRepFieldDescription: valueSelect.fieldDescription,
                      });
                      setDataImageLegal(valueSelect.imageReference);
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
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.legalRepIdTypeNumber}
                    placeholder={dataForm.legalRepFieldDescription}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({
                        ...dataForm,
                        legalRepIdTypeNumber: value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <p>
                Información del documento que acredita la legalidad del
                representante
              </p>
              <Row>
                <Col span={15} xs={{ span: 24 }} md={{ span: 15 }}>
                  <div className="option-select-radio">
                    <span
                      style={{
                        color: "var(--color-primary)",
                        fontWeight: "bold",
                      }}
                    >
                      ¿La legalidad del representante está indicada en el Acta
                      Constitutiva?
                    </span>
                    <Radio.Group
                      onChange={(e) => {
                        const value = e.target.value;
                        repeatInfoMoralPerson(value, dataForm, (newData) => {
                          setDataForm({ ...dataForm, ...newData });
                        });
                      }}
                      value={
                        dataForm.repeatInfoMoral === true ||
                        dataForm.repeatInfoMoral === 1
                          ? 1
                          : isNil(dataForm.repeatInfoMoral) === false
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
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.legalRepPublicWritingNo}
                    placeholder="Escritura pública No."
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({
                        ...dataForm,
                        legalRepPublicWritingNo: value,
                      });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.legalRepPublicBookNo}
                    placeholder="Libro"
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({
                        ...dataForm,
                        legalRepPublicBookNo: value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.legalRepNotaryName}
                    placeholder={"Nombre del notario"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({
                        ...dataForm,
                        legalRepNotaryName: value,
                      });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.legalRepNotaryOfficeNo}
                    placeholder={"Número de notaría"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({
                        ...dataForm,
                        legalRepNotaryOfficeNo: value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={15} xs={{ span: 24 }} md={{ span: 15 }}>
                  <Input
                    value={dataForm.legalRepSignedAtPlace}
                    placeholder={"Lugar de firma de escritura"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({
                        ...dataForm,
                        legalRepSignedAtPlace: value,
                      });
                    }}
                  />
                </Col>
              </Row>
            </>
          )}
          <div className="button_actions">
            <button
              type="button"
              onClick={async () => {
                try {
                  await onGetProperties({
                    idTypeForm: dataForm.idTypeForm,
                    stepIn: 0,
                    jsonProperties: JSON.stringify(dataForm),
                  });
                  setConfirmData(true);
                } catch (error) {}
              }}
              className="button_primary"
            >
              <span>Continuar</span>
            </button>
          </div>
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
                  onClickNext(dataForm);
                  setConfirmData(false);
                }
              }}
            >
              <span>Continuar</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SectionInfoUser;
