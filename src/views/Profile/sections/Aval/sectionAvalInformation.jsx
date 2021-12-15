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
  ComponentRadio,
} from "../../constants/styleConstants";
import WidgetUploadImageProfile from "../../widget/widgetUploadImageProfile";
import CustomInputCurrency from "../../../../components/customInputCurrency";
import WidgetUploadDocument from "../../widget/widgetUploadDocument";

const TabsProperty = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2em;
  gap: 20px;
  max-width: 100%;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 1400px) {
    font-size: 14px;
  }
  @media screen and (max-width: 640px) {
    font-size: 14px;
  }
  @media screen and (max-width: 420px) {
    font-size: 12px;
    padding: 0px 5px;
  }
  @media screen and (max-width: 360px) {
    font-size: 10px;
    padding: 0px 5px;
  }
`;

const Tab = styled.div`
  line-height: 15px;
  cursor: pointer;
  h1 {
    font-weight: bold;
    min-width: 225px;
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
  @media screen and (max-width: 420px) {
    h1 {
      min-width: 180px;
    }
  }
`;

const CardDataAval = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 8px;
  padding: 2em;
`;

const ContentTab = styled.div`
  position: relative;
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
  {
    id: "6",
    text: "Documentos",
  },
];

const SectionAvalInformation = (props) => {
  const {
    callGlobalActionApi,
    dataProfile,
    onclickNext,
    onclickBack,
    onClickFinish,
  } = props;
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
    endorsementZipCode: null,
    endorsementIdZipCode: null,
    endorsementNeighborhood: null,
    collateralPropertyStreet: null,
    collateralPropertyStreetNumber: null,
    collateralPropertySuite: null,
    collateralPropertyIdZipCode: null,
    collateralPropertyZipCode: null,
    collateralPropertyNeighborhood: null,
    publicPropertyRegistry: null,
    documentNumber: null,
    documentSignedAt: null,
    signedAtPlace: null,
    notaryOfficeNumber: null,
    notaryName: null,
    isCollPropSame: null,
  });
  const [dataNationalities, setDataNationalities] = useState([]);
  const [dataIdTypes, setDataIdTypes] = useState([]);
  const [dataMaritalStatus, setDataMaritalStatus] = useState([]);
  const [dataMaritalRegime, setDataMaritalRegime] = useState([]);
  const [fieldDescription, setFieldDescription] = useState("");
  const [isRequiresPlaceOfIssue, setIsRequiresPlaceOfIssue] = useState(false);
  const [isOpenSelectRegime, setIsOpenSelectRegime] = useState(false);
  const [openOtherNeighborhood, setOpenOtherNeighborhood] = useState(false);
  const [openOtherNeighborhoodCollateral, setOpenOtherNeighborhoodCollateral] =
    useState(false);
  const [idZipCode, setIdZipCode] = useState(null);
  const [idZipCodeCollateral, setIdZipCodeCollateral] = useState(null);
  const [dataZipCatalog, setDataZipCatalog] = useState([]);
  const [dataZipCatalogCollateral, setDataZipCatalogCollateral] = useState([]);
  const [dataDocument, setDataDocument] = useState([]);
  const [zipCodeStateCity, setZipCodeStateCity] = useState({
    state: null,
    city: null,
  });
  const [zipCodeStateCityCollateral, setZipCodeStateCityCollateral] = useState({
    state: null,
    city: null,
  });
  const [tabSelect, setTabSelect] = useState("1");

  const frontFunctions = new FrontFunctions();
  const dataContexProfile = useContext(ContextProfile);
  const { dataCustomerDetail, identifier, type } = dataContexProfile;

  const handlerCallGetCustomerDocument = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          identifier,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_CUSTOMER_DOCUMENT
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : [];
      setDataDocument(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

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

  const hanlderCallGetZipCodeAdressCollateral = async (code, id) => {
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
        setOpenOtherNeighborhoodCollateral(true);
      }

      setIdZipCodeCollateral(isEmpty(responseResult2) ? "" : id);
      setDataZipCatalogCollateral(responseResult2);
      setZipCodeStateCityCollateral({
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

  const handlerCallGetMaritalRegime = async () => {
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
        API_CONSTANTS.CATALOGS.GET_CATALOG_MARITAL_REGIME
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : {};
      setDataMaritalRegime(responseResult);
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
      endorsementZipCode,
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
      collateralPropertyIdZipCode,
      collateralPropertyZipCode,
      collateralPropertyNeighborhood,
      publicPropertyRegistry,
      documentNumber,
      documentSignedAt,
      signedAtPlace,
      notaryOfficeNumber,
      notaryName,
      isCollPropSame,
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
      endorsementZipCode,
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
      collateralPropertyIdZipCode,
      collateralPropertyNeighborhood,
      collateralPropertyZipCode,
      publicPropertyRegistry,
      documentNumber,
      documentSignedAt,
      signedAtPlace,
      notaryOfficeNumber,
      notaryName,
      isCollPropSame,
    });
    hanlderCallGetZipCodeAdress(endorsementZipCode, endorsementIdZipCode);
    hanlderCallGetZipCodeAdressCollateral(
      collateralPropertyZipCode,
      collateralPropertyIdZipCode
    );
  };

  const handlerCallInitApis = async () => {
    await handlerCallValidateCustomerPropertiesInTab();
    await hanlderCallGetNationalities();
    await hanlderCallGetIdTypes();
    await handlerCallGetMaritalStatus();
    await handlerCallGetCustomerDocument();
    await handlerCallGetMaritalRegime();
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
    if (
      isEmpty(dataCustomerDetail) === false &&
      isEmpty(dataIdTypes) === false &&
      isEmpty(dataMaritalStatus) === false
    ) {
      const selectDefaultMaritalStatus = dataMaritalStatus.find((row) => {
        return (
          dataCustomerDetail.idEndorsementMaritalStatus === row.idMaritalStatus
        );
      });
      if (
        isNil(selectDefaultMaritalStatus) === false &&
        isNil(selectDefaultMaritalStatus.hasMaritalRegime) === false
      ) {
        setIsOpenSelectRegime(selectDefaultMaritalStatus.hasMaritalRegime);
      }
      const selectDefaultIdType = dataIdTypes.find((row) => {
        return dataCustomerDetail.idEndorsementType === row.idType;
      });
      setFieldDescription(
        isNil(selectDefaultIdType) === false
          ? selectDefaultIdType.fieldDescription
          : ""
      );
    }
  }, [dataIdTypes, dataCustomerDetail, dataMaritalStatus]);

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
            <ContentTab>
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
            </ContentTab>
            <CardDataAval>
              <div
                style={{
                  marginBottom: "2em",
                }}
              >
                <span>
                  {tabSelect === "6"
                    ? "Sube los documentos que se piden a continuación"
                    : "Ingresa los datos correspondientes"}
                </span>
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
                      {isRequiresPlaceOfIssue === true && (
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
                      )}
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
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
                        onChange={(value, option) => {
                          setDataForm({
                            ...dataForm,
                            idEndorsementMaritalStatus: value,
                          });
                          setIsOpenSelectRegime(option.hasMaritalRegime);
                        }}
                      />
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      {isOpenSelectRegime === true && (
                        <CustomSelect
                          value={dataForm.idEndorsementMaritalRegime}
                          placeholder=""
                          label="Regimen"
                          data={dataMaritalRegime}
                          error={false}
                          errorMessage="Este campo es requerido"
                          onChange={(value) => {
                            setDataForm({
                              ...dataForm,
                              idEndorsementMaritalRegime: value,
                            });
                          }}
                        />
                      )}
                    </Col>
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
                              checked={dataForm.isCollPropSame == true}
                              name="repeat-address"
                              onClick={() => {
                                setDataForm({
                                  ...dataForm,
                                  collateralPropertyStreet:
                                    dataForm.endorsementStreet,
                                  collateralPropertyStreetNumber:
                                    dataForm.endorsementStreetNumber,
                                  collateralPropertySuite:
                                    dataForm.endorsementSuite,
                                  collateralPropertyIdZipCode:
                                    dataForm.endorsementIdZipCode,
                                  collateralPropertyZipCode:
                                    dataForm.endorsementZipCode,
                                  collateralPropertyNeighborhood:
                                    dataForm.endorsementNeighborhood,
                                  collateralPropertyCity:
                                    dataForm.endorsementCity,
                                  collateralPropertyState:
                                    dataForm.endorsementState,
                                  isCollPropSame: true,
                                });
                                hanlderCallGetZipCodeAdressCollateral(
                                  dataForm.endorsementZipCode,
                                  dataForm.endorsementIdZipCode
                                );
                              }}
                            />
                            Si
                          </label>
                          <label className="input-radio">
                            <input
                              type="radio"
                              name="repeat-address"
                              checked={dataForm.isCollPropSame == false}
                              onClick={() => {
                                setDataForm({
                                  ...dataForm,
                                  collateralPropertyStreet: null,
                                  collateralPropertyStreetNumber: null,
                                  collateralPropertySuite: null,
                                  collateralPropertyIdZipCode: null,
                                  collateralPropertyZipCode: null,
                                  collateralPropertyNeighborhood: null,
                                  collateralPropertyCity: null,
                                  collateralPropertyState: null,
                                  isCollPropSame: false,
                                });
                                setOpenOtherNeighborhoodCollateral(false);
                                setIdZipCodeCollateral(null);
                                setDataZipCatalogCollateral([]);
                                setZipCodeStateCityCollateral({
                                  state: null,
                                  city: null,
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
                          value={zipCodeStateCityCollateral.city}
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
                          value={idZipCodeCollateral}
                          placeholder=""
                          label="Colonia"
                          data={dataZipCatalogCollateral}
                          error={false}
                          errorMessage="Este campo es requerido"
                          onChange={(value, option) => {
                            setDataForm({
                              ...dataForm,
                              collateralPropertyIdZipCode: value,
                            });
                            setIdZipCodeCollateral(value);
                            setOpenOtherNeighborhoodCollateral(option.isOpen);
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                        <Row>
                          <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                            <CustomInputTypeForm
                              value={dataForm.collateralPropertyZipCode}
                              placeholder=""
                              label="Código postal"
                              error={false}
                              errorMessage="Este campo es requerido"
                              onChange={(value) => {
                                setDataForm({
                                  ...dataForm,
                                  collateralPropertyZipCode: value,
                                });
                                hanlderCallGetZipCodeAdressCollateral(
                                  value,
                                  ""
                                );
                              }}
                              type="number"
                            />
                          </Col>
                          <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                          <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                            <CustomInputTypeForm
                              value={zipCodeStateCityCollateral.state}
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
                        {openOtherNeighborhoodCollateral === true && (
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
              {tabSelect === "6" && (
                <div>
                  <WidgetUploadDocument
                    handlerCallGetCustomerDocument={() => {
                      handlerCallGetCustomerDocument();
                    }}
                    dataDocument={dataDocument}
                    type={type}
                  />
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
            {"Atrás"}
          </ButtonNextBackPage>
          <ButtonNextBackPage
            block={false}
            onClick={async () => {
              try {
                await handlerCallSetCustomerEndorsement(dataForm);
                onClickFinish();
              } catch (error) {}
            }}
          >
            {"Finalizar"}
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
