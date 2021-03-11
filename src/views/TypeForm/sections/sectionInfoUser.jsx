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
    idCountryNationalityText: null,
    idType: null,
    idTypeText: null,
    idTypeNumber: null,
    placeOfIssue: null,
    enterpriseIdCommercialSocietyType: null,
    enterpriseIdCommercialSocietyTypeText: null,
    enterpriseIdStatePublicProperty: null,
    enterpriseIdStatePublicPropertyText: null,
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
    legalRepIdTypeText: null,
    legalRepIdTypeNumber: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [confirmData, setConfirmData] = useState(false);
  const [visibleComponents, setVisibleComponents] = useState({
    givenName: true,
    lastName: true,
    mothersMaidenName: true,
    idEndorsement: true,
  });

  // useEffect(() => {
  //   if (isEmpty(dataFormSave) === false) {
  //     console.log("dataFormSave", dataFormSave);
  //     setDataForm(dataFormSave);
  //   }
  // }, [dataFormSave]);

  useEffect(() => {
    if (
      isEmpty(dataFormSave) === false &&
      isEmpty(dataNationalities) === false &&
      isEmpty(dataIdTypes) === false
    ) {
      const visibleField =
        isNil(dataFormSave.jsonProperties) === false
          ? JSON.parse(dataFormSave.jsonProperties)
          : {};
      const selectDefaultNationality = dataNationalities.find((row) => {
        return dataFormSave.idCountryNationality === row.idCountryNationality;
      });
      const selectDefaultIdType = dataIdTypes.find((row) => {
        return dataFormSave.idType === row.idType;
      });
      setDataForm({
        ...dataFormSave,
        idCountryNationalityText:
          isNil(selectDefaultNationality) === false
            ? selectDefaultNationality.text
            : "",
        idTypeText:
          isNil(selectDefaultIdType) === false ? selectDefaultIdType.text : "",
        isRequiresPlaceOfIssue:
          isNil(selectDefaultIdType) === false
            ? selectDefaultIdType.requiresPlaceOfIssue
            : null,
      });
      setVisibleComponents({ ...visibleComponents, ...visibleField });
    }
  }, [dataNationalities, dataIdTypes, dataFormSave]);

  const DescriptionItem = ({ title, content }) => (
    <div
      className="site-description-item-profile-wrapper"
      style={{ textAlign: "center" }}
    >
      <strong className="site-description-item-profile-p-label">{title}</strong>
      <br />
      {isNil(content) === false ? content : "N/A"}
    </div>
  );

  return (
    <div className="content-typeform-formulary">
      <h3>
        {confirmData === false
          ? "Información general"
          : "Confirmar Información general"}
      </h3>
      {confirmData === false && (
        <Row>
          <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
          <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
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
                    if (visibleComponents.lastName === false) {
                      const value = e.target.value;
                      setDataForm({ ...dataForm, givenName: value });
                    }
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
                    placeholder={"Telefono"}
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
              visibleComponents.idTypeNumber === true &&
              isNil(dataForm.idType) === false && (
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
                            idTypeText: option.children,
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
                    <Input
                      value={dataForm.legalRepPublicWritingNo}
                      placeholder="Escritura pública"
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
                  <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
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
                  <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
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
                          legalRepIdTypeText: option.children,
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
                </Row>
                <Row>
                  <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                    <Input
                      value={dataForm.legalRepIdTypeNumber}
                      placeholder={`Numero de ${
                        isNil(dataForm.legalRepIdTypeText) === false
                          ? dataForm.legalRepIdTypeText
                          : ""
                      }`}
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
                  title="Nacionalidad"
                  content={dataForm.idCountryNationalityText}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Identificacion oficial"
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
              <Col span={3} xs={{ span: 24 }} md={{ span: 3 }}>
                <DescriptionItem
                  title="Tienes Auto"
                  content={
                    dataForm.hasCar === true || dataForm.hasCar === 1
                      ? "Si"
                      : isNil(dataForm.hasCar) === false
                      ? "No"
                      : null
                  }
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              {(dataForm.hasCar === true || dataForm.hasCar === 1) && (
                <Col span={3} xs={{ span: 24 }} md={{ span: 3 }}>
                  <DescriptionItem
                    title="Placas"
                    content={dataForm.carriagePlate}
                  />
                </Col>
              )}
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
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

export default SectionInfoUser;
