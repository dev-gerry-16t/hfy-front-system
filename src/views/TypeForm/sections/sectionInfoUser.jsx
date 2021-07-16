import React, { useState, useEffect, useRef } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import SignatureCanvas from "react-signature-canvas";
import { Row, Col, Tooltip, Radio, Alert, Modal, Checkbox } from "antd";
import { AuditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import IconProfile from "../../../assets/icons/Profile.svg";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import CustomSelectTypeForm from "../../../components/CustomSelectTypeForm";

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
    isCCAccepted: null,
    ccDigitalSignature: null,
  };
  const [signature, setSignature] = useState(null);
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

  const signatureRef = useRef(null);
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
      style={{
        fontFamily: "Poppins",
        display: "flex",
        justifyContent: "space-around",
        fontSize: 12,
      }}
    >
      <div
        title={title}
        style={{
          width: "130px",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        <strong className="site-description-item-profile-p-label">
          {title}
        </strong>
      </div>
      <div
        title={content}
        style={{
          width: "170px",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            color: isRequired === true ? "red" : "",
            fontWeight: isRequired === true ? "bold" : "",
          }}
        >
          {content}
        </span>
      </div>
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
              <CustomInputTypeForm
                value={dataForm.givenName}
                placeholder={
                  visibleComponents.lastName === true
                    ? "Nombres"
                    : "Razón social"
                }
                onChange={(value) => {
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
            >
              <Tooltip
                placement="top"
                title='La razón no debe incluir su tipo de sociedad mercantil, por ejemplo "Empresa SA de CV " capturar  "Empresa".'
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
            {dataForm.requiresCustomerTenantEntInfo === true && (
              <>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomSelectTypeForm
                    id="idCommercialSocietyType"
                    placeholder="Tipo de Sociedad Mercantil"
                    data={dataCommerceSociality}
                    value={dataForm.enterpriseIdCommercialSocietyType}
                    onChange={(value, option) => {
                      setDataForm({
                        ...dataForm,
                        enterpriseIdCommercialSocietyType: value,
                      });
                    }}
                  />
                </Col>
              </>
            )}
            {visibleComponents.lastName === true && (
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <CustomInputTypeForm
                  value={dataForm.lastName}
                  placeholder={"Apellido paterno"}
                  onChange={(value) => {
                    setDataForm({ ...dataForm, lastName: value });
                  }}
                  suffix={<img src={IconProfile} alt="profile" width="15" />}
                />
              </Col>
            )}
            <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
            {visibleComponents.mothersMaidenName === true && (
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <CustomInputTypeForm
                  value={dataForm.mothersMaidenName}
                  placeholder={"Apellido materno"}
                  onChange={(value) => {
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
                <CustomInputTypeForm
                  value={dataForm.phoneNumber}
                  type="number"
                  placeholder={"Teléfono"}
                  onChange={(value) => {
                    setDataForm({ ...dataForm, phoneNumber: value });
                  }}
                />
              </Col>
            )}
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
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
                    <CustomSelectTypeForm
                      id="idCountryNationality"
                      placeholder="Nacionalidad"
                      data={dataNationalities}
                      value={dataForm.idCountryNationality}
                      onChange={(value, option) => {
                        setDataForm({
                          ...dataForm,
                          idCountryNationality: value,
                        });
                      }}
                    />
                  </Col>
                  <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
                  <Col span={6} xs={{ span: 24 }} md={{ span: 6 }}>
                    <CustomSelectTypeForm
                      id="idType"
                      placeholder="Identificación oficial"
                      data={dataIdTypes}
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
                    />
                  </Col>
                  <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
                  {isNil(dataForm.idType) === false && (
                    <Col span={10} xs={{ span: 24 }} md={{ span: 10 }}>
                      <CustomInputTypeForm
                        value={dataForm.idTypeNumber}
                        placeholder={dataForm.fieldDescription}
                        onChange={(value) => {
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
                  <CustomInputTypeForm
                    value={dataForm.placeOfIssue}
                    placeholder="Lugar de expedición de la identificación"
                    onChange={(value) => {
                      setDataForm({ ...dataForm, placeOfIssue: value });
                    }}
                  />
                </Col>
              </Row>
            )}

          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.taxId}
                placeholder="RFC con Homoclave"
                onChange={(value) => {
                  setDataForm({ ...dataForm, taxId: value });
                }}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            {visibleComponents.citizenId === true && (
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <CustomInputTypeForm
                  value={dataForm.citizenId}
                  placeholder={"CURP"}
                  onChange={(value) => {
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
                <CustomInputTypeForm
                  value={dataForm.carriagePlate}
                  placeholder="Ingresa las placas"
                  onChange={(value) => {
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
                  <CustomSelectTypeForm
                    id="idState"
                    placeholder="Estado de emisión"
                    data={dataStates}
                    value={dataForm.enterpriseIdStatePublicProperty}
                    onChange={(value, option) => {
                      setDataForm({
                        ...dataForm,
                        enterpriseIdStatePublicProperty: value,
                      });
                    }}
                  />
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
                  <CustomInputTypeForm
                    value={dataForm.enterpriseCommercialInvoice}
                    placeholder="Folio Mercantil"
                    onChange={(value) => {
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
                  <CustomInputTypeForm
                    value={dataForm.enterprisePublicWrtitingNo}
                    placeholder="Escritura pública No."
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        enterprisePublicWrtitingNo: value,
                      });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.enterprisePublicBookNo}
                    placeholder="Libro"
                    onChange={(value) => {
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
                  <CustomInputTypeForm
                    value={dataForm.enterpriseNotaryName}
                    placeholder="Nombre del notario"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        enterpriseNotaryName: value,
                      });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.enterpriseNotaryOfficeNo}
                    placeholder="Número de notaría"
                    onChange={(value) => {
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
                  <CustomInputTypeForm
                    value={dataForm.enterpriseSignedAtPlace}
                    placeholder="Lugar de firma de escritura"
                    onChange={(value) => {
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
                  <CustomInputTypeForm
                    value={dataForm.legalRepGivenName}
                    placeholder="Nombres"
                    onChange={(value) => {
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
                  <CustomInputTypeForm
                    value={dataForm.legalRepLastName}
                    placeholder="Apellido paterno"
                    onChange={(value) => {
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
                  <CustomInputTypeForm
                    value={dataForm.legalRepMothersMaidenName}
                    placeholder="Apellido materno"
                    onChange={(value) => {
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
                  <CustomSelectTypeForm
                    id="idType"
                    placeholder="Identificación oficial"
                    data={dataIdTypes}
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
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.legalRepIdTypeNumber}
                    placeholder={dataForm.legalRepFieldDescription}
                    onChange={(value) => {
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
                  <CustomInputTypeForm
                    value={dataForm.legalRepPublicWritingNo}
                    placeholder="Escritura pública No."
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        legalRepPublicWritingNo: value,
                      });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.legalRepPublicBookNo}
                    placeholder="Libro"
                    onChange={(value) => {
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
                  <CustomInputTypeForm
                    value={dataForm.legalRepNotaryName}
                    placeholder="Nombre del notario"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        legalRepNotaryName: value,
                      });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.legalRepNotaryOfficeNo}
                    placeholder="Número de notaría"
                    onChange={(value) => {
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
                  <CustomInputTypeForm
                    value={dataForm.legalRepSignedAtPlace}
                    placeholder="Lugar de firma de escritura"
                    onChange={(value) => {
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
          <p>Aceptación de Términos y condiciones y Firma de autorización</p>
          <span>
            RENTAL PAYMENTS S.A. de C.V. (en adelante como Homify) podrá
            utilizar su información cuya finalidad será realizar una
            investigación consultando tu Reporte de Crédito Especial (RCE) a
            través de Círculo de Crédito <a>leer más...</a>
          </span>
          <div style={{ marginTop: 10 }}>
            <Checkbox
              checked={dataForm.isCCAccepted}
              onChange={(e) => {
                setDataForm({
                  ...dataForm,
                  isCCAccepted: e.target.checked,
                });
              }}
            >
              Si, Acepto.
            </Checkbox>
          </div>
          {(dataForm.isCCAccepted === true || dataForm.isCCAccepted === 1) && (
            <Row>
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }} />
              <Col
                span={8}
                xs={{ span: 24 }}
                md={{ span: 8 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <strong>Firma de autorización</strong>
                </div>
                <div
                  style={{
                    border: "1px solid #4E4B66",
                    borderRadius: "10px",
                    background: "#fff",
                    width: 320,
                    alignSelf: "center",
                  }}
                >
                  <SignatureCanvas
                    penColor="black"
                    canvasProps={{
                      width: 320,
                      height: 150,
                      className: "sigCanvas",
                    }}
                    onEnd={(a, e, i) => {
                      const signatureCurrent = signatureRef.current;
                      const signatureBase64 = signatureCurrent.toDataURL();
                      setDataForm({
                        ...dataForm,
                        ccDigitalSignature: signatureBase64,
                      });
                    }}
                    ref={(ref) => {
                      signatureRef.current = ref;
                      if (isNil(signatureRef.current) === false) {
                        signatureRef.current.fromDataURL(
                          dataForm.ccDigitalSignature
                        );
                      }
                    }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <span>
                    Autoriza:{" "}
                    <strong>
                      {dataForm.givenName} {dataForm.lastName}{" "}
                      {dataForm.mothersMaidenName}
                    </strong>
                  </span>
                </div>
                <div style={{ textAlign: "center", marginTop: 5 }}>
                  <button
                    style={{
                      border: "1px solid var(--color-primary)",
                      color: "var(--color-primary)",
                      background: "#fff",
                      borderRadius: 5,
                    }}
                    onClick={() => {
                      signatureRef.current.clear();
                      setDataForm({
                        ...dataForm,
                        ccDigitalSignature: null,
                      });
                    }}
                  >
                    Limpiar
                  </button>
                </div>
              </Col>
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }} />
            </Row>
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
            <p style={{ textAlign: "center" }}>
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
            {isEmpty(dataPropertiesInfo) === false &&
            dataPropertiesInfo[0].canBeSkiped === true ? (
              <div
                style={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  marginBottom: 15,
                }}
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
                  He verificado la información y acepto que es correcta.
                </span>
              </div>
            ) : (
              <div
                style={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  marginBottom: 15,
                }}
              >
                <span
                  style={{
                    marginLeft: 5,
                    textAlign: "center",
                    fontSize: 10,
                    color: "black",
                  }}
                >
                  Aún no has completado la información de este paso, para
                  continuar es necesario ingresar la información que aparece
                  como{" "}
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    *Requerido*
                  </span>
                  .
                </span>
              </div>
            )}
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
