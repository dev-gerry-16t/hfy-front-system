import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Input, Row, Col, Select, Tooltip, Alert, Radio } from "antd";
import {
  CloseOutlined,
  AuditOutlined,
  QuestionCircleOutlined,
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
    dataProperties,
    dataCommerceSociality,
    dataStates,
  } = props;
  const initialForm = {
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
    fieldDescription: null,
    idTypeNumber: null,
    placeOfIssue: null,
    enterpriseIdCommercialSocietyType: null,
    enterpriseIdCommercialSocietyTypeText: null,
    enterprisePublicWrtitingNo: null,
    enterprisePublicBookNo: null,
    enterpriseNotaryName: null,
    enterpriseNotaryOfficeNo: null,
    enterpriseSignedAtPlace: null,
    enterpriseIdStatePublicProperty: null,
    enterpriseIdStatePublicPropertyText: null,
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
    legalRepIdTypeText: null,
    legalRepIdTypeNumber: null,
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
    if (
      isEmpty(dataFormSave) === false &&
      isEmpty(dataNationalities) === false &&
      isEmpty(dataIdTypes) === false &&
      isEmpty(dataMaritalStatus) === false
    ) {
      const visibleField =
        isNil(dataFormSave.jsonProperties) === false
          ? JSON.parse(dataFormSave.jsonProperties)
          : {};
      if (dataFormSave.requiresCustomerEntInfo === true) {
        const selectDefaultTypeSociety = dataCommerceSociality.find((row) => {
          return (
            dataFormSave.enterpriseIdCommercialSocietyType ===
            row.idCommercialSocietyType
          );
        });
        const selectDefaultLegalIdType = dataIdTypes.find((row) => {
          return dataFormSave.legalRepIdType === row.idType;
        });
        const selectDefaultState = dataStates.find((row) => {
          return dataFormSave.enterpriseIdStatePublicProperty === row.idState;
        });
        setDataForm({
          ...dataFormSave,
          enterpriseIdCommercialSocietyTypeText:
            isNil(selectDefaultTypeSociety) === false
              ? selectDefaultTypeSociety.text
              : "",
          legalRepIdTypeText:
            isNil(selectDefaultLegalIdType) === false
              ? selectDefaultLegalIdType.text
              : "",
          legalRepFieldDescription:
            isNil(selectDefaultLegalIdType) === false
              ? selectDefaultLegalIdType.fieldDescription
              : "",
          enterpriseIdStatePublicPropertyText:
            isNil(selectDefaultState) === false ? selectDefaultState.text : "",
        });
      } else {
        const selectDefaultNationality = dataNationalities.find((row) => {
          return dataFormSave.idCountryNationality === row.idCountryNationality;
        });
        const selectDefaultIdType = dataIdTypes.find((row) => {
          return dataFormSave.idType === row.idType;
        });
        const selectDefaultMaritalStatus = dataMaritalStatus.find((row) => {
          return dataFormSave.idMaritalStatus === row.idMaritalStatus;
        });
        setDataForm({
          ...dataFormSave,
          idCountryNationalityText:
            isNil(selectDefaultNationality) === false
              ? selectDefaultNationality.text
              : "",
          idTypeText:
            isNil(selectDefaultIdType) === false
              ? selectDefaultIdType.text
              : "",
          fieldDescription:
            isNil(selectDefaultIdType) === false
              ? selectDefaultIdType.fieldDescription
              : "",
          idMaritalStatusText:
            isNil(selectDefaultMaritalStatus) === false
              ? selectDefaultMaritalStatus.text
              : "",
          isRequiresPlaceOfIssue:
            isNil(selectDefaultIdType) === false
              ? selectDefaultIdType.requiresPlaceOfIssue
              : null,
        });
      }

      setVisibleComponents({ ...visibleComponents, ...visibleField });
      onChangeZipCode(dataFormSave.zipCode);
    }
  }, [dataFormSave, dataNationalities, dataIdTypes, dataMaritalStatus]);

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
          ? "Información personal"
          : "Confirmar Información Personal"}
      </h3>
      {confirmData === false && (
        <Row>
          <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
          <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
            {isEmpty(dataProperties) === false &&
              dataForm.isFirstTime === false && (
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
              {dataForm.requiresCustomerEntInfo === true && (
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
                          enterpriseIdCommercialSocietyTypeText:
                            option.children,
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
                      // const value = e.target.value;
                      // setDataForm({ ...dataForm, lastName: value });
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
                      // const value = e.target.value;
                      // setDataForm({ ...dataForm, mothersMaidenName: value });
                    }}
                    suffix={<img src={IconProfile} alt="profile" width="15" />}
                  />
                </Col>
              )}
            </Row>
            {dataForm.requiresCustomerTenantEntInfo === true && (
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
                        enterpriseIdStatePublicPropertyText: option.children,
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
            )}
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
                            idTypeText: valueSelect.text,
                            fieldDescription: valueSelect.fieldDescription,
                            isRequiresPlaceOfIssue:
                              valueSelect.requiresPlaceOfIssue,
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
            {/* <Row>
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
                      idTypeText: valueSelect.text,
                      fieldDescription: valueSelect.fieldDescription,
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
                    placeholder={dataForm.fieldDescription}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({ ...dataForm, idTypeNumber: value });
                    }}
                  />
                </Col>
              )}
                  </Row> */}
            {visibleComponents.idMaritalStatus === true && (
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
            )}
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
                  placeholder={"Número interior"}
                  onChange={(e) => {
                    setDataForm({ ...dataForm, suite: e.target.value });
                  }}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <Input
                  value={dataForm.streetNumber}
                  placeholder={"Número exterior"}
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
            {dataForm.requiresCustomerEntInfo === true && (
              <>
                <p>Información Acta Constitutiva</p>
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
                      suffix={
                        <img src={IconProfile} alt="profile" width="15" />
                      }
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
                      suffix={
                        <img src={IconProfile} alt="profile" width="15" />
                      }
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
                      suffix={
                        <img src={IconProfile} alt="profile" width="15" />
                      }
                    />
                  </Col>
                </Row>
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
                          legalRepIdTypeText: valueSelect.text,
                          legalRepFieldDescription:
                            valueSelect.fieldDescription,
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
                  title="Teléfono"
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
                  title={dataForm.fieldDescription}
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
                  title="Número exterior"
                  content={dataForm.streetNumber}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Número interior"
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
