import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Avatar } from "antd";
import moment from "moment";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../../utils/constants/globalConstants";
import FrontFunctions from "../../../../utils/actions/frontFunctions";
import {
  callGlobalActionApi,
  callSetImageProfile,
} from "../../../../utils/actions/actions";
import { setDataUserProfile } from "../../../../utils/dispatchs/userProfileDispatch";
import CustomInputTypeForm from "../../../../components/CustomInputTypeForm";
import CustomSelect from "../../../../components/CustomSelect";
import ContextProfile from "../../context/contextProfile";
import {
  ContentForm,
  ButtonNextBackPage,
  FormProperty,
  ButtonCenterPrimary,
} from "../../constants/styleConstants";
import WidgetUploadImageProfile from "../../widget/widgetUploadImageProfile";
import CustomInputCurrency from "../../../../components/customInputCurrency";

const ComponentRadio = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .radio-inputs-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
    .input-radio {
      input[type="radio"] {
        appearance: none;
        background-color: #fff;
        margin-right: 5px;
        font: inherit;
        color: var(--color-primary);
        width: 1.15em;
        height: 1.15em;
        border: 1px solid var(--color-primary);
        border-radius: 50%;
        display: inline-grid;
        place-content: center;
      }
      input[type="radio"]::before {
        content: "";
        width: 0.65em;
        height: 0.65em;
        border-radius: 50%;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--color-primary);
      }
      input[type="radio"]:checked::before {
        transform: scale(1);
      }
    }
  }
`;

const TabsProperty = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2em;
`;

const Tab = styled.div`
  line-height: 5px;
  cursor: pointer;
  h1 {
    font-weight: bold;
    color: ${(props) =>
      props.selected === true ? "var(--color-primary)" : "#4e4b66"};
  }
  hr {
    width: 30%;
    background: #d6d8e7;
    margin: 0;
    border: 2px solid var(--color-primary);
    display: ${(props) => (props.selected === true ? "block" : "none")};
  }
`;

const CardDataAval = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 8px;
  padding: 2em;
`;

const dataTabsAval = [
  {
    id: "1",
    text: "Datos de Aval",
  },
  {
    id: "2",
    text: "Dirección de Aval",
  },
  {
    id: "3",
    text: "Propiedad en garantia",
  },
  {
    id: "4",
    text: "Gravamen",
  },
  {
    id: "5",
    text: "Escrituras",
  },
];

const SectionAvalInformation = (props) => {
  const { callGlobalActionApi, dataProfile, onclickNext, onclickBack } = props;
  const [dataForm, setDataForm] = useState({
    hasEndorsement: null,
    endorsementGivenName: null,
    endorsementLastName: null,
    endorsementMothersMaidenName: null,
    idEndorsementNationality: null,
    endorsementTaxId: null,
    endorsementCitizenId: null,
    idEndorsementType: null,
    idEndorsementTypeNumber: null,
    endorsementPlaceOfIssue: null,
    endorsementEmailAddress: null,
    endorsementPhoneNumber: null,
    idEndorsementMaritalStatus: null,
    idEndorsementMaritalRegime: null,
    hasAssessment: null,
    assessmentInvoice: null,
    assessmentTicket: null,
    assessmentDate: null,
    assessmentIssuedBy: null,
    endorsementAssessment: null,
    endorsementStreet: null,
    endorsementSuite: null,
    endorsementStreetNumber: null,
    endorsementIdZipCode: null,
    endorsementNeighborhood: null,
    collateralPropertyStreet: null,
    collateralPropertyStreetNumber: null,
    collateralPropertySuite: null,
    collateralPropertyIdZipCoode: null,
    collateralPropertyNeighborhood: null,
    publicPropertyRegistry: null,
    documentNumber: null,
    documentSignedAt: null,
    signedAtPlace: null,
    notaryOfficeNumber: null,
    notaryName: null,
  });
  const [dataNationalities, setDataNationalities] = useState([]);
  const [dataIdTypes, setDataIdTypes] = useState([]);
  const [dataMaritalStatus, setDataMaritalStatus] = useState([]);
  const [fieldDescription, setFieldDescription] = useState("");
  const [isRequiresPlaceOfIssue, setIsRequiresPlaceOfIssue] = useState(false);
  const [openOtherNeighborhood, setOpenOtherNeighborhood] = useState(false);
  const [idZipCode, setIdZipCode] = useState(null);
  const [dataZipCatalog, setDataZipCatalog] = useState([]);
  const [zipCodeStateCity, setZipCodeStateCity] = useState({
    state: null,
    city: null,
  });
  const [tabSelect, setTabSelect] = useState("1");

  const frontFunctions = new FrontFunctions();
  const dataContexProfile = useContext(ContextProfile);
  const { dataCustomerDetail } = dataContexProfile;

  const hanlderCallGetZipCodeAdress = async (code, id) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          type: 1,
          zipCode: code,
        },
        null,
        API_CONSTANTS.GET_ZIP_CODE_ADRESS
      );
      const responseResult1 =
        isNil(response) === false &&
        isNil(response.response1) === false &&
        isNil(response.response1[0]) === false
          ? response.response1[0]
          : {};
      const responseResult2 =
        isNil(response) === false && isNil(response.response2) === false
          ? response.response2
          : [];
      const neighborhood = responseResult2.find((row) => {
        return row.idZipCode === id;
      });
      if (
        isNil(neighborhood) === false &&
        isNil(neighborhood.isOpen) === false &&
        neighborhood.isOpen === true
      ) {
        setOpenOtherNeighborhood(true);
      }

      setIdZipCode(isEmpty(responseResult2) ? "" : id);
      setDataZipCatalog(responseResult2);
      setZipCodeStateCity({
        state: isEmpty(responseResult1) === false ? responseResult1.state : "",
        city:
          isEmpty(responseResult1) === false
            ? responseResult1.municipality
            : "",
      });
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallSetCustomerEndorsement = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        idCustomer,
        API_CONSTANTS.CUSTOMER.SET_CUSTOMER_ENDORSEMENT,
        "PUT"
      );
      const responseResult =
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : "";
      frontFunctions.showMessageStatusApi(
        responseResult,
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallValidateCustomerPropertiesInTab = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          identifier: 0,
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.VALIDATE_CUSTOMER_PROPERTIES_IN_TAB
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const hanlderCallGetNationalities = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_CATALOG_NATIONALITIES
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataNationalities(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const hanlderCallGetIdTypes = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_CATALOG_ID_TYPES
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataIdTypes(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetMaritalStatus = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_CATALOG_MARITAL_STATUS
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : {};
      setDataMaritalStatus(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerSetStateDataDetail = (data) => {
    const {
      hasEndorsement,
      endorsementGivenName,
      endorsementLastName,
      endorsementMothersMaidenName,
      idEndorsementNationality,
      endorsementTaxId,
      endorsementCitizenId,
      idEndorsementType,
      idEndorsementTypeNumber,
      endorsementPlaceOfIssue,
      endorsementEmailAddress,
      endorsementPhoneNumber,
      idEndorsementMaritalStatus,
      idEndorsementMaritalRegime,
      hasAssessment,
      assessmentInvoice,
      assessmentTicket,
      assessmentDate,
      assessmentIssuedBy,
      endorsementAssessment,
      endorsementStreet,
      endorsementSuite,
      endorsementStreetNumber,
      endorsementIdZipCode,
      endorsementNeighborhood,
      collateralPropertyStreet,
      collateralPropertyStreetNumber,
      collateralPropertySuite,
      collateralPropertyIdZipCoode,
      collateralPropertyNeighborhood,
      publicPropertyRegistry,
      documentNumber,
      documentSignedAt,
      signedAtPlace,
      notaryOfficeNumber,
      notaryName,
      repeatAddress,
    } = data;

    setDataForm({
      hasEndorsement,
      endorsementGivenName,
      endorsementLastName,
      endorsementMothersMaidenName,
      idEndorsementNationality,
      endorsementTaxId,
      endorsementCitizenId,
      idEndorsementType,
      idEndorsementTypeNumber,
      endorsementPlaceOfIssue,
      endorsementEmailAddress,
      endorsementPhoneNumber,
      idEndorsementMaritalStatus,
      idEndorsementMaritalRegime,
      hasAssessment,
      assessmentInvoice,
      assessmentTicket,
      assessmentDate,
      assessmentIssuedBy,
      endorsementAssessment,
      endorsementStreet,
      endorsementSuite,
      endorsementStreetNumber,
      endorsementIdZipCode,
      endorsementNeighborhood,
      collateralPropertyStreet,
      collateralPropertyStreetNumber,
      collateralPropertySuite,
      collateralPropertyIdZipCoode,
      collateralPropertyNeighborhood,
      publicPropertyRegistry,
      documentNumber,
      documentSignedAt,
      signedAtPlace,
      notaryOfficeNumber,
      notaryName,
      repeatAddress,
    });
  };

  const handlerCallInitApis = async () => {
    await handlerCallValidateCustomerPropertiesInTab();
    await hanlderCallGetNationalities();
    await hanlderCallGetIdTypes();
    await handlerCallGetMaritalStatus();
  };

  useEffect(() => {
    if (isEmpty(dataCustomerDetail) === false) {
      handlerSetStateDataDetail(dataCustomerDetail);
    }
  }, [dataCustomerDetail]);

  useEffect(() => {
    handlerCallInitApis();
  }, []);

  useEffect(() => {
    if (isEmpty(dataIdTypes) === false && isNil(dataForm.idType) === false) {
      const selectDefaultIdType = dataIdTypes.find((row) => {
        return dataForm.idType === row.idType;
      });
      setFieldDescription(
        isNil(selectDefaultIdType) === false
          ? selectDefaultIdType.fieldDescription
          : ""
      );
    }
  }, [dataIdTypes]);

  return (
    <ContentForm>
      <div className="header-title">
        <h1>Información del Aval</h1>
      </div>
      <FormProperty>
        <Row>
          <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
            <ComponentRadio>
              <strong>¿Cuentas con Aval?</strong>
              <div className="radio-inputs-options">
                <label className="input-radio">
                  <input
                    type="radio"
                    checked={dataForm.hasEndorsement == true}
                    name="has-endorsement"
                    onClick={() => {
                      setDataForm({
                        ...dataForm,
                        hasEndorsement: true,
                      });
                    }}
                  />
                  Si
                </label>
                <label className="input-radio">
                  <input
                    type="radio"
                    name="has-endorsement"
                    checked={dataForm.hasEndorsement == false}
                    onClick={() => {
                      setDataForm({
                        ...dataForm,
                        hasEndorsement: false,
                      });
                    }}
                  />
                  No
                </label>
              </div>
            </ComponentRadio>
          </Col>
        </Row>
        {dataForm.hasEndorsement == true && (
          <>
            <div
              className="label-indicator"
              style={{
                margin: "3em 0px",
                borderBottom: "1px solid var(--color-primary)",
                paddingBottom: "0.5em",
              }}
            ></div>
            <div
              style={{
                marginTop: "4em",
              }}
            >
              <TabsProperty>
                {dataTabsAval.map((row) => {
                  return (
                    <Tab
                      selected={tabSelect === row.id}
                      onClick={() => {
                        setTabSelect(row.id);
                      }}
                    >
                      <h1>{row.text}</h1>
                      <hr />
                    </Tab>
                  );
                })}
              </TabsProperty>
            </div>
            <CardDataAval>
              <div
                style={{
                  marginBottom: "2em",
                }}
              >
                <span>Ingresa los datos correspondientes</span>
              </div>
              {tabSelect === "1" && (
                <div>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <CustomInputTypeForm
                        value={dataForm.endorsementGivenName}
                        placeholder=""
                        label="Nombres"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            endorsementGivenName: value,
                          });
                        }}
                        type="text"
                      />
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <Row>
                        <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                          <CustomInputTypeForm
                            value={dataForm.endorsementLastName}
                            placeholder=""
                            label="Apellido paterno"
                            error={false}
                            errorMessage="Este campo es requerido"
                            onChange={(value) => {
                              setDataForm({
                                ...dataForm,
                                endorsementLastName: value,
                              });
                            }}
                            type="text"
                          />
                        </Col>
                        <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                        <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                          <CustomInputTypeForm
                            value={dataForm.endorsementMothersMaidenName}
                            placeholder=""
                            label="Apellido materno"
                            error={false}
                            errorMessage="Este campo es requerido"
                            onChange={(value) => {
                              setDataForm({
                                ...dataForm,
                                endorsementMothersMaidenName: value,
                              });
                            }}
                            type="text"
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <CustomInputTypeForm
                        value={dataForm.endorsementPhoneNumber}
                        placeholder=""
                        label="Teléfono"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            endorsementPhoneNumber: value,
                          });
                        }}
                        type="number"
                      />
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <CustomInputTypeForm
                        value={dataForm.endorsementEmailAddress}
                        placeholder=""
                        label="Correo"
                        error={false}
                        info="Proporcione un correo electrónico válido donde podamos notificar a su aval sobre la captura de su información así como solicitar su firma electrónica en caso de ser necesario."
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            endorsementEmailAddress: value,
                          });
                        }}
                        type="email"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <CustomInputTypeForm
                        value={dataForm.endorsementCitizenId}
                        placeholder=""
                        label="CURP"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            endorsementCitizenId: value,
                          });
                        }}
                        type="text"
                      />
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <CustomInputTypeForm
                        value={dataForm.endorsementTaxId}
                        placeholder=""
                        label="RFC con Homoclave"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            endorsementTaxId: value,
                          });
                        }}
                        type="text"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <CustomSelect
                        value={dataForm.idEndorsementNationality}
                        placeholder=""
                        label="Nacionalidad"
                        data={dataNationalities}
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            idEndorsementNationality: value,
                          });
                        }}
                      />
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <Row>
                        <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                          <CustomSelect
                            value={dataForm.idEndorsementType}
                            placeholder=""
                            label="Identificación oficial"
                            data={dataIdTypes}
                            error={false}
                            errorMessage="Este campo es requerido"
                            onChange={(value, option) => {
                              setDataForm({
                                ...dataForm,
                                idEndorsementType: value,
                              });
                              setFieldDescription(option.fieldDescription);
                              setIsRequiresPlaceOfIssue(
                                option.requiresPlaceOfIssue
                              );
                            }}
                          />
                        </Col>
                        <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                        {isNil(dataForm.idEndorsementType) === false && (
                          <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                            <CustomInputTypeForm
                              value={dataForm.idEndorsementTypeNumber}
                              placeholder=""
                              label={fieldDescription}
                              error={false}
                              errorMessage="Este campo es requerido"
                              onChange={(value) => {
                                setDataForm({
                                  ...dataForm,
                                  idEndorsementTypeNumber: value,
                                });
                              }}
                              type="text"
                            />
                          </Col>
                        )}
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <CustomSelect
                        value={dataForm.idEndorsementMaritalStatus}
                        placeholder=""
                        label="Estado civil"
                        data={dataMaritalStatus}
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            idEndorsementMaritalStatus: value,
                          });
                        }}
                      />
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    {isRequiresPlaceOfIssue === true && (
                      <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                        <CustomInputTypeForm
                          value={dataForm.endorsementPlaceOfIssue}
                          placeholder=""
                          label="Lugar de expedición de la identificación"
                          error={false}
                          errorMessage="Este campo es requerido"
                          onChange={(value) => {
                            setDataForm({
                              ...dataForm,
                              endorsementPlaceOfIssue: value,
                            });
                          }}
                          type="text"
                        />
                      </Col>
                    )}
                  </Row>
                </div>
              )}
              {tabSelect === "2" && (
                <div>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <CustomInputTypeForm
                        value={dataForm.endorsementStreet}
                        placeholder=""
                        label="Calle"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            endorsementStreet: value,
                          });
                        }}
                        type="text"
                      />
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <CustomInputTypeForm
                        value={zipCodeStateCity.city}
                        placeholder=""
                        label="Municipio/Delegación"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {}}
                        type="text"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <Row>
                        <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                          <CustomInputTypeForm
                            value={dataForm.endorsementStreetNumber}
                            placeholder=""
                            label="Número exterior"
                            error={false}
                            errorMessage="Este campo es requerido"
                            onChange={(value) => {
                              setDataForm({
                                ...dataForm,
                                endorsementStreetNumber: value,
                              });
                            }}
                            type="number"
                          />
                        </Col>
                        <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                        <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                          <CustomInputTypeForm
                            value={dataForm.endorsementSuite}
                            placeholder=""
                            label="Número interior"
                            error={false}
                            errorMessage="Este campo es requerido"
                            onChange={(value) => {
                              setDataForm({
                                ...dataForm,
                                endorsementSuite: value,
                              });
                            }}
                            type="number"
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <CustomSelect
                        value={idZipCode}
                        placeholder=""
                        label="Colonia"
                        data={dataZipCatalog}
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value, option) => {
                          setDataForm({
                            ...dataForm,
                            endorsementIdZipCode: value,
                          });
                          setIdZipCode(value);
                          setOpenOtherNeighborhood(option.isOpen);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <Row>
                        <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                          <CustomInputTypeForm
                            value={dataForm.endorsementZipCode}
                            placeholder=""
                            label="Código postal"
                            error={false}
                            errorMessage="Este campo es requerido"
                            onChange={(value) => {
                              setDataForm({
                                ...dataForm,
                                endorsementZipCode: value,
                              });
                              hanlderCallGetZipCodeAdress(value, "");
                            }}
                            type="number"
                          />
                        </Col>
                        <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                        <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                          <CustomInputTypeForm
                            value={zipCodeStateCity.state}
                            placeholder=""
                            label="Estado"
                            error={false}
                            errorMessage="Este campo es requerido"
                            onChange={(value) => {}}
                            type="text"
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      {openOtherNeighborhood === true && (
                        <CustomInputTypeForm
                          value={dataForm.endorsementNeighborhood}
                          placeholder="Indica la colonia"
                          label="Otra colonia"
                          error={false}
                          errorMessage="Este campo es requerido"
                          onChange={(value) => {
                            setDataForm({
                              ...dataForm,
                              endorsementNeighborhood: value,
                            });
                          }}
                          type="text"
                        />
                      )}
                    </Col>
                  </Row>
                </div>
              )}
              {tabSelect === "3" && (
                <div>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <ComponentRadio>
                        <strong>¿Quieres ocupar la dirección del aval?</strong>
                        <div className="radio-inputs-options">
                          <label className="input-radio">
                            <input
                              type="radio"
                              checked={dataForm.repeatAddress == true}
                              name="repeat-address"
                              onClick={() => {
                                setDataForm({
                                  ...dataForm,
                                  deactivateBoundSolidarity: true,
                                });
                              }}
                            />
                            Si
                          </label>
                          <label className="input-radio">
                            <input
                              type="radio"
                              name="repeat-address"
                              checked={dataForm.repeatAddress == false}
                              onClick={() => {
                                setDataForm({
                                  ...dataForm,
                                  repeatAddress: false,
                                });
                              }}
                            />
                            No
                          </label>
                        </div>
                      </ComponentRadio>
                    </Col>
                  </Row>
                  <div>
                    <Row>
                      <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                        <CustomInputTypeForm
                          value={dataForm.collateralPropertyStreet}
                          placeholder=""
                          label="Calle"
                          error={false}
                          errorMessage="Este campo es requerido"
                          onChange={(value) => {
                            setDataForm({
                              ...dataForm,
                              collateralPropertyStreet: value,
                            });
                          }}
                          type="text"
                        />
                      </Col>
                      <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                      <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                        <CustomInputTypeForm
                          value={zipCodeStateCity.city}
                          placeholder=""
                          label="Municipio/Delegación"
                          error={false}
                          errorMessage="Este campo es requerido"
                          onChange={(value) => {}}
                          type="text"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                        <Row>
                          <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                            <CustomInputTypeForm
                              value={dataForm.collateralPropertyStreetNumber}
                              placeholder=""
                              label="Número exterior"
                              error={false}
                              errorMessage="Este campo es requerido"
                              onChange={(value) => {
                                setDataForm({
                                  ...dataForm,
                                  collateralPropertyStreetNumber: value,
                                });
                              }}
                              type="number"
                            />
                          </Col>
                          <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                          <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                            <CustomInputTypeForm
                              value={dataForm.collateralPropertySuite}
                              placeholder=""
                              label="Número interior"
                              error={false}
                              errorMessage="Este campo es requerido"
                              onChange={(value) => {
                                setDataForm({
                                  ...dataForm,
                                  collateralPropertySuite: value,
                                });
                              }}
                              type="number"
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                      <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                        <CustomSelect
                          value={idZipCode}
                          placeholder=""
                          label="Colonia"
                          data={dataZipCatalog}
                          error={false}
                          errorMessage="Este campo es requerido"
                          onChange={(value, option) => {
                            setDataForm({
                              ...dataForm,
                              collateralPropertyIdZipCoode: value,
                            });
                            setIdZipCode(value);
                            setOpenOtherNeighborhood(option.isOpen);
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                        <Row>
                          <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                            <CustomInputTypeForm
                              value={dataForm.collateralPropertyZipCoode}
                              placeholder=""
                              label="Código postal"
                              error={false}
                              errorMessage="Este campo es requerido"
                              onChange={(value) => {
                                setDataForm({
                                  ...dataForm,
                                  collateralPropertyZipCoode: value,
                                });
                                hanlderCallGetZipCodeAdress(value, "");
                              }}
                              type="number"
                            />
                          </Col>
                          <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                          <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                            <CustomInputTypeForm
                              value={zipCodeStateCity.state}
                              placeholder=""
                              label="Estado"
                              error={false}
                              errorMessage="Este campo es requerido"
                              onChange={(value) => {}}
                              type="text"
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                      <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                        {openOtherNeighborhood === true && (
                          <CustomInputTypeForm
                            value={dataForm.collateralPropertyNeighborhood}
                            placeholder="Indica la colonia"
                            label="Otra colonia"
                            error={false}
                            errorMessage="Este campo es requerido"
                            onChange={(value) => {
                              setDataForm({
                                ...dataForm,
                                collateralPropertyNeighborhood: value,
                              });
                            }}
                            type="text"
                          />
                        )}
                      </Col>
                    </Row>
                  </div>
                </div>
              )}
              {tabSelect === "4" && (
                <div>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <ComponentRadio>
                        <strong>
                          ¿Cuentas con Certificado de Libertad de Gravamen?
                        </strong>
                        <div className="radio-inputs-options">
                          <label className="input-radio">
                            <input
                              type="radio"
                              checked={dataForm.hasAssessment == true}
                              name="has-assesment"
                              onClick={() => {
                                setDataForm({
                                  ...dataForm,
                                  hasAssessment: true,
                                });
                              }}
                            />
                            Si
                          </label>
                          <label className="input-radio">
                            <input
                              type="radio"
                              name="has-assesment"
                              checked={dataForm.hasAssessment == false}
                              onClick={() => {
                                setDataForm({
                                  ...dataForm,
                                  hasAssessment: false,
                                });
                              }}
                            />
                            No
                          </label>
                        </div>
                      </ComponentRadio>
                    </Col>
                  </Row>
                  {dataForm.hasAssessment === false && (
                    <Row>
                      <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                        <CustomInputCurrency
                          value={dataForm.assessmentInvoice}
                          placeholder=""
                          label="Monto del gravamen"
                          error={false}
                          errorMessage="Este campo es requerido"
                          onChange={(value) => {
                            setDataForm({
                              ...dataForm,
                              assessmentInvoice: value,
                            });
                          }}
                          type="number"
                        />
                      </Col>
                    </Row>
                  )}
                  {dataForm.hasAssessment === true && (
                    <>
                      <Row>
                        <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                          <CustomInputTypeForm
                            value={dataForm.assessmentInvoice}
                            placeholder=""
                            label="Folio"
                            error={false}
                            errorMessage="Este campo es requerido"
                            onChange={(value) => {
                              setDataForm({
                                ...dataForm,
                                assessmentInvoice: value,
                              });
                            }}
                            type="text"
                          />
                        </Col>
                        <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                        <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                          <CustomInputTypeForm
                            value={dataForm.assessmentTicket}
                            placeholder=""
                            label="Boleta"
                            error={false}
                            errorMessage="Este campo es requerido"
                            onChange={(value) => {
                              setDataForm({
                                ...dataForm,
                                assessmentTicket: value,
                              });
                            }}
                            type="text"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                          <CustomInputTypeForm
                            value={dataForm.assessmentDate}
                            placeholder=""
                            label="Fecha de expedicion"
                            error={false}
                            errorMessage="Este campo es requerido"
                            onChange={(value) => {
                              setDataForm({
                                ...dataForm,
                                assessmentDate: value,
                              });
                            }}
                            type="date"
                          />
                        </Col>
                        <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                        <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                          <CustomInputTypeForm
                            value={dataForm.assessmentIssuedBy}
                            placeholder="EJ. Instituto Registral y Catastral..."
                            label="Expedido por"
                            error={false}
                            errorMessage="Este campo es requerido"
                            onChange={(value) => {
                              setDataForm({
                                ...dataForm,
                                assessmentIssuedBy: value,
                              });
                            }}
                            type="text"
                          />
                        </Col>
                      </Row>
                    </>
                  )}
                </div>
              )}
              {tabSelect === "5" && (
                <div>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <CustomInputTypeForm
                        value={dataForm.documentNumber}
                        placeholder=""
                        label="Número de las escrituras"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            documentNumber: value,
                          });
                        }}
                        type="text"
                      />
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <CustomInputTypeForm
                        value={dataForm.documentSignedAt}
                        placeholder=""
                        label="Fecha de firma de escrituras"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            documentSignedAt: value,
                          });
                        }}
                        type="date"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <CustomInputTypeForm
                        value={dataForm.signedAtPlace}
                        placeholder=""
                        label="Lugar de la firma de las escrituras"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            signedAtPlace: value,
                          });
                        }}
                        type="text"
                      />
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <CustomInputTypeForm
                        value={dataForm.notaryOfficeNumber}
                        placeholder=""
                        label="Número de la notaria"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            notaryOfficeNumber: value,
                          });
                        }}
                        type="text"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <CustomInputTypeForm
                        value={dataForm.notaryName}
                        placeholder=""
                        label="Nombre del notario"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            notaryName: value,
                          });
                        }}
                        type="text"
                      />
                    </Col>
                  </Row>
                </div>
              )}
              <ButtonCenterPrimary>
                <button
                  onClick={async () => {
                    try {
                      await handlerCallSetCustomerEndorsement(dataForm);
                    } catch (error) {}
                  }}
                >
                  Guardar
                </button>
              </ButtonCenterPrimary>
            </CardDataAval>
          </>
        )}
        <div
          className="label-indicator"
          style={{
            margin: "3em 0px",
            borderBottom: "1px solid var(--color-primary)",
            paddingBottom: "0.5em",
          }}
        >
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <span>
                Antes de continuar por favor verifica que tus datos sean
                correctos.
              </span>
            </Col>
          </Row>
        </div>
        <div className="next-back-buttons">
          <ButtonNextBackPage
            block={false}
            onClick={() => {
              onclickBack(dataForm);
            }}
          >
            {"<< "}
            <u>{"Atrás"}</u>
          </ButtonNextBackPage>
          <ButtonNextBackPage
            block={false}
            onClick={async () => {
              try {
                await handlerCallSetCustomerEndorsement(dataForm);
              } catch (error) {}
            }}
          >
            <u>{"Finalizar"}</u>
            {" >>"}
          </ButtonNextBackPage>
        </div>
      </FormProperty>
    </ContentForm>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callSetImageProfile: (file, data, id, callback) =>
    dispatch(callSetImageProfile(file, data, id, callback)),
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
  setDataUserProfile: (data) => dispatch(setDataUserProfile(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionAvalInformation);
