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
  const [dataForm, setDataForm] = useState({});
  const [dataNationalities, setDataNationalities] = useState([]);
  const [dataIdTypes, setDataIdTypes] = useState([]);
  const [dataMaritalStatus, setDataMaritalStatus] = useState([]);
  const [fieldDescription, setFieldDescription] = useState("");
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

  const handlerCallUpdateCustomerAccount = async (data) => {
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
        API_CONSTANTS.CUSTOMER.UPDATE_CUSTOMER_ACCOUNT,
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
    const {} = data;
    setDataForm({});
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
                    checked={dataForm.deactivateBoundSolidarity == true}
                    name="obligado-solidario"
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
                    name="obligado-solidario"
                    checked={dataForm.deactivateBoundSolidarity == false}
                    onClick={() => {
                      setDataForm({
                        ...dataForm,
                        deactivateBoundSolidarity: false,
                      });
                    }}
                  />
                  No
                </label>
              </div>
            </ComponentRadio>
          </Col>
        </Row>

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
                    value={dataForm.givenName}
                    placeholder=""
                    label="Nombres"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        givenName: value,
                      });
                    }}
                    type="text"
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.lastName}
                    placeholder=""
                    label="Apellido paterno"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        lastName: value,
                      });
                    }}
                    type="text"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.mothersMaidenName}
                    placeholder=""
                    label="Apellido materno"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        mothersMaidenName: value,
                      });
                    }}
                    type="text"
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.taxId}
                    placeholder=""
                    label="RFC con Homoclave"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        taxId: value,
                      });
                    }}
                    type="text"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.citizenId}
                    placeholder=""
                    label="CURP"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        citizenId: value,
                      });
                    }}
                    type="text"
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomSelect
                    value={dataForm.idCountryNationality}
                    placeholder=""
                    label="Nacionalidad"
                    data={dataNationalities}
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        idCountryNationality: value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomSelect
                    value={dataForm.idType}
                    placeholder=""
                    label="Identificación oficial"
                    data={dataIdTypes}
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value, option) => {
                      setDataForm({
                        ...dataForm,
                        idType: value,
                      });
                      setFieldDescription(option.fieldDescription);
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomSelect
                    value={dataForm.idMaritalStatus}
                    placeholder=""
                    label="Estado civil"
                    data={dataMaritalStatus}
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        idMaritalStatus: value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.phoneNumber}
                    placeholder=""
                    label="Teléfono"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        phoneNumber: value,
                      });
                    }}
                    type="number"
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.email}
                    placeholder=""
                    label="Correo"
                    error={false}
                    info="Proporcione un correo electrónico válido donde podamos notificar a su aval sobre la captura de su información así como solicitar su firma electrónica en caso de ser necesario."
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        email: value,
                      });
                    }}
                    type="email"
                  />
                </Col>
              </Row>
            </div>
          )}
          {tabSelect === "2" && (
            <div>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.street}
                    placeholder=""
                    label="Calle"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        street: value,
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
                        value={dataForm.streetNumber}
                        placeholder=""
                        label="Número exterior"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            streetNumber: value,
                          });
                        }}
                        type="number"
                      />
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <CustomInputTypeForm
                        value={dataForm.suite}
                        placeholder=""
                        label="Número interior"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            suite: value,
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
                        idZipCode: value,
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
                        value={dataForm.zipCode}
                        placeholder=""
                        label="Código postal"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            zipCode: value,
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
                      value={dataForm.neighborhood}
                      placeholder="Indica la colonia"
                      label="Otra colonia"
                      error={false}
                      errorMessage="Este campo es requerido"
                      onChange={(value) => {
                        setDataForm({
                          ...dataForm,
                          neighborhood: value,
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
                          checked={dataForm.deactivateBoundSolidarity == true}
                          name="obligado-solidario"
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
                          name="obligado-solidario"
                          checked={dataForm.deactivateBoundSolidarity == false}
                          onClick={() => {
                            setDataForm({
                              ...dataForm,
                              deactivateBoundSolidarity: false,
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
                      value={dataForm.street}
                      placeholder=""
                      label="Calle"
                      error={false}
                      errorMessage="Este campo es requerido"
                      onChange={(value) => {
                        setDataForm({
                          ...dataForm,
                          street: value,
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
                          value={dataForm.streetNumber}
                          placeholder=""
                          label="Número exterior"
                          error={false}
                          errorMessage="Este campo es requerido"
                          onChange={(value) => {
                            setDataForm({
                              ...dataForm,
                              streetNumber: value,
                            });
                          }}
                          type="number"
                        />
                      </Col>
                      <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                      <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                        <CustomInputTypeForm
                          value={dataForm.suite}
                          placeholder=""
                          label="Número interior"
                          error={false}
                          errorMessage="Este campo es requerido"
                          onChange={(value) => {
                            setDataForm({
                              ...dataForm,
                              suite: value,
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
                          idZipCode: value,
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
                          value={dataForm.zipCode}
                          placeholder=""
                          label="Código postal"
                          error={false}
                          errorMessage="Este campo es requerido"
                          onChange={(value) => {
                            setDataForm({
                              ...dataForm,
                              zipCode: value,
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
                        value={dataForm.neighborhood}
                        placeholder="Indica la colonia"
                        label="Otra colonia"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            neighborhood: value,
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
                    <strong>¿Quieres ocupar la dirección del aval?</strong>
                    <div className="radio-inputs-options">
                      <label className="input-radio">
                        <input
                          type="radio"
                          checked={dataForm.deactivateBoundSolidarity == true}
                          name="obligado-solidario"
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
                          name="obligado-solidario"
                          checked={dataForm.deactivateBoundSolidarity == false}
                          onClick={() => {
                            setDataForm({
                              ...dataForm,
                              deactivateBoundSolidarity: false,
                            });
                          }}
                        />
                        No
                      </label>
                    </div>
                  </ComponentRadio>
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputCurrency
                    value={dataForm.currentSalary}
                    placeholder=""
                    label="Monto del gravamen"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        currentSalary: value,
                      });
                    }}
                    type="number"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.companyName}
                    placeholder=""
                    label="Folio"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        companyName: value,
                      });
                    }}
                    type="text"
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.companyName}
                    placeholder=""
                    label="Boleta"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        companyName: value,
                      });
                    }}
                    type="text"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.companyName}
                    placeholder=""
                    label="Fecha de expedicion"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        companyName: value,
                      });
                    }}
                    type="date"
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.companyName}
                    placeholder="EJ. Instituto Registral y Catastral..."
                    label="Expedido por"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        companyName: value,
                      });
                    }}
                    type="text"
                  />
                </Col>
              </Row>
            </div>
          )}
          {tabSelect === "5" && (
            <div>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.companyName}
                    placeholder=""
                    label="Número de las escrituras"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        companyName: value,
                      });
                    }}
                    type="text"
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.companyName}
                    placeholder=""
                    label="Fecha de firma de escrituras"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        companyName: value,
                      });
                    }}
                    type="date"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.companyName}
                    placeholder=""
                    label="Lugar de la firma de las escrituras"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        companyName: value,
                      });
                    }}
                    type="text"
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.companyName}
                    placeholder=""
                    label="Número de la notaria"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        companyName: value,
                      });
                    }}
                    type="text"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.companyName}
                    placeholder=""
                    label="Nombre del notario"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        companyName: value,
                      });
                    }}
                    type="text"
                  />
                </Col>
              </Row>
            </div>
          )}
        </CardDataAval>
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
