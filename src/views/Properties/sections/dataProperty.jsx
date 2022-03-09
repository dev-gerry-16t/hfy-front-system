import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { Row, Col, Select } from "antd";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import CustomSelect from "../../../components/CustomSelect";
import CustomInputCurrency from "../../../components/customInputCurrency";
import CustomInputSelectCurrency from "../../../components/customInputSelectCurrency";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import {
  ContentForm,
  ButtonNextBackPage,
  LineSeparator,
  FormProperty,
} from "../constants/styleConstants";
import { ReactComponent as Arrow } from "../../../assets/icons/Arrow.svg";
import CustomInputSelect from "../../../components/customInputSelect";
import ComponentLoadSection from "../../../components/componentLoadSection";
import ComponentInfoHeader from "../component/componentInfoHeader";

const { Option } = Select;

const MultiSelect = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  .button-actions-select {
    display: flex;
    gap: 1em;
  }
  @media screen and (max-width: 420px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0px 0px 15px 0px;
  }
`;

const ButtonCheck = styled.button`
  border: ${(props) =>
    props.select === true ? "1px solid #FF0083" : "1px solid #d6d8e7"};
  border-radius: 0.5em;
  background: ${(props) =>
    props.select === true ? "rgba(255, 0, 131, 0.2)" : "transparent"};
  color: #000;
  font-weight: 500;
  padding: 0.5em 0.8em;
  box-shadow: ${(props) =>
    props.select ? "0px 0px 5px 2px rgba(255, 0, 131, 0.15)" : "none"};
  @media screen and (max-width: 1320px) {
    font-size: 12px;
  }
`;

const catalogPrice = [
  { id: "1", text: "Valor total" },
  { id: "2", text: "por m²" },
  { id: "3", text: "por ha" },
];

const catalogOperation = [
  { id: "1", text: "Renta" },
  { id: "2", text: "Venta" },
];

const SectionDataProperty = (props) => {
  const {
    onclickNext,
    callGlobalActionApi,
    dataProfile,
    dataFormSave,
    idUserType,
    idProperty,
    onBackTo,
    onSaveData,
  } = props;
  const [dataPropertyTypes, setDataPropertyTypes] = useState([]);
  const [dataOwners, setDataOwners] = useState([]);
  const [dataCurrency, setDataCurrency] = useState([]);
  const [dataLandAccess, setDataLandAccess] = useState([]);
  const [nameOwner, setNameOwner] = useState([]);
  const [isOpenFloorDescription, setIsOpenFloorDescription] = useState(false);
  const [isOpenLandAccess, setIsOpenLandAccess] = useState(false);
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [dataCommercialActivity, setDataCommercialActivity] = useState([]);
  const [dataForm, setDataForm] = useState({
    idOperationType: 1,
    idPropertyType: null,
    idCommercialActivity: null,
    idLandAccess: null,
    currentRent: null,
    idCurrency: "9F5E4F49-1525-4BAA-8C4E-4090A9082B6D",
    priceBasedBy: "1",
    totalBedrooms: null,
    totalBathrooms: null,
    totalHalfBathrooms: null,
    totalParkingSpots: null,
    totalSquareMetersBuilt: null,
    totalSquareMetersLand: null,
    totalFloors: null,
    floorDescription: null,
    maintenanceAmount: null,
    isFurnished: false,
    idCustomerOwner: null,
    ownerEmailAddress: null,
    ownerPhoneNumber: null,
    ownerGivenName: null,
    ownerLastName: null,
    idCurrency: null,
  });
  const dataFormSaveRef = useRef(dataForm);

  const frontFunctions = new FrontFunctions();

  const handlerCallGetAllPropertyTypes = async () => {
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
        API_CONSTANTS.CATALOGS.GET_CATALOG_PROPERTY_TYPES
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];

      setDataPropertyTypes(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllCommercialActivities = async () => {
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
        API_CONSTANTS.CATALOGS.GET_ALL_COMMERCIAL_ACTIVITIES
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataCommercialActivity(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallSearchCustomer = async (data = null) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          type: 4,
          dataFiltered: data,
        },
        null,
        API_CONSTANTS.GET_SEARCH_CUSTOMER
      );

      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataOwners(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallUpdateProperty = async (data, id) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        id,
        API_CONSTANTS.PROPERTY.UPDATE_PROPERTY,
        "PUT"
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : {};
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

  const handlerCallGetAllCurrencies = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idProperty,
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_ALL_CURRENCIES
      );
      const responseResult =
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      setDataCurrency(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllLandAccess = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idApartment: null,
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_ALL_LAND_ACCESS
      );
      const responseResult =
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      setDataLandAccess(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    handlerCallGetAllPropertyTypes();
    handlerCallGetAllCurrencies();
    handlerCallGetAllLandAccess();
    return () => {
      onSaveData(dataFormSaveRef.current);
    };
  }, []);

  useEffect(() => {
    if (isEmpty(dataFormSave) === false) {
      setDataForm(dataFormSave);
      setNameOwner(
        isNil(dataFormSave) === false &&
          isNil(dataFormSave.ownerEmailAddress) === false
          ? [dataFormSave.ownerEmailAddress]
          : []
      );
    }
  }, [dataFormSave]);

  useEffect(() => {
    if (
      isEmpty(dataFormSave) === false &&
      isEmpty(dataPropertyTypes) === false
    ) {
      const filterIdProperty = dataPropertyTypes.find((row) => {
        return row.id == dataFormSave.idPropertyType;
      });

      setIsOpenFloorDescription(
        isNil(filterIdProperty) === false &&
          isNil(filterIdProperty.requiresFloorDescr) === false
          ? filterIdProperty.requiresFloorDescr
          : false
      );
      setIsOpenLandAccess(
        isNil(filterIdProperty) === false &&
          isNil(filterIdProperty.requiresLandAccess) === false
          ? filterIdProperty.requiresLandAccess
          : false
      );
    }
  }, [dataFormSave, dataPropertyTypes]);

  useEffect(() => {
    dataFormSaveRef.current = dataForm;
  }, [dataForm]);

  return (
    <ContentForm>
      <ComponentLoadSection isLoadApi={isLoadApi}>
        <div className="back-button">
          <button onClick={onBackTo}>
            <Arrow width="25px" />
          </button>
        </div>
        <div className="header-title">
          <h1>Datos de propiedad</h1>
        </div>
        <ComponentInfoHeader
          text="La información de tu propiedad es privada y solo tú o las personas que
      vincules podrán verla, al final si lo deseas puedes publicar tu propiedad
      para recibir postulaciones de inquilinos."
        />
        <FormProperty>
          <div className="label-indicator">
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <span>
                  Por favor llena todos los campos correspondientes. Los campos
                  marcados con * son obligatorios.
                </span>
              </Col>
            </Row>
          </div>
          <div className="type-property">
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <MultiSelect>
                  <span>Tipo de operación:</span>
                  <div className="button-actions-select">
                    {catalogOperation.map((row) => {
                      return (
                        <ButtonCheck
                          select={row.id == dataForm.idOperationType}
                          onClick={() => {
                            setDataForm({
                              ...dataForm,
                              idOperationType: row.id,
                            });
                          }}
                        >
                          {row.text}
                        </ButtonCheck>
                      );
                    })}
                  </div>
                </MultiSelect>
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}></Col>
            </Row>
          </div>
          <div className="type-form-property">
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <CustomSelect
                  value={dataForm.idPropertyType}
                  placeholder=""
                  label="Tipo de propiedad *"
                  data={dataPropertyTypes}
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value, row) => {
                    if (row.idPropertyType === 4) {
                      handlerCallGetAllCommercialActivities();
                    }
                    setDataForm({ ...dataForm, idPropertyType: value });
                    setIsOpenFloorDescription(row.requiresFloorDescr);
                    setIsOpenLandAccess(row.requiresLandAccess);
                  }}
                />
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              {dataForm.idPropertyType == "4" && (
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomSelect
                    value={dataForm.idCommercialActivity}
                    placeholder=""
                    label="Actividad comercial del inmueble *"
                    data={dataCommercialActivity}
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({ ...dataForm, idCommercialActivity: value });
                    }}
                  />
                </Col>
              )}
              {isOpenLandAccess === true && (
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomSelect
                    value={dataForm.idLandAccess}
                    placeholder=""
                    label="Tipo de acceso *"
                    data={dataLandAccess}
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({ ...dataForm, idLandAccess: value });
                    }}
                  />
                </Col>
              )}
            </Row>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <CustomInputSelectCurrency
                  value={dataForm.currentRent}
                  valueSelect={dataForm.idCurrency}
                  dataSelect={dataCurrency}
                  onChangeSelect={(value, row) => {
                    setDataForm({ ...dataForm, idCurrency: value });
                  }}
                  placeholder=""
                  label={
                    dataForm.idOperationType == 1
                      ? "Precio de renta *"
                      : "Precio de venta *"
                  }
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value) => {
                    setDataForm({ ...dataForm, currentRent: value });
                  }}
                  type="number"
                />
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <MultiSelect>
                  <span>Precio basado en:</span>
                  <div className="button-actions-select">
                    {catalogPrice.map((row) => {
                      return (
                        <ButtonCheck
                          select={row.id == dataForm.priceBasedBy}
                          onClick={() => {
                            setDataForm({ ...dataForm, priceBasedBy: row.id });
                          }}
                        >
                          {row.text}
                        </ButtonCheck>
                      );
                    })}
                  </div>
                </MultiSelect>
              </Col>
            </Row>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <CustomInputTypeForm
                  value={dataForm.totalBedrooms}
                  placeholder=""
                  label="Recámaras *"
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value) => {
                    setDataForm({ ...dataForm, totalBedrooms: value });
                  }}
                  type="number"
                />
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Row>
                  <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                    <CustomInputTypeForm
                      value={dataForm.totalBathrooms}
                      placeholder=""
                      label="Baños completos*"
                      error={false}
                      errorMessage="Este campo es requerido"
                      onChange={(value) => {
                        setDataForm({ ...dataForm, totalBathrooms: value });
                      }}
                      type="number"
                    />
                  </Col>
                  <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                  <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                    <CustomInputTypeForm
                      value={dataForm.totalHalfBathrooms}
                      placeholder=""
                      label="Medio baños *"
                      error={false}
                      errorMessage="Este campo es requerido"
                      onChange={(value) => {
                        setDataForm({ ...dataForm, totalHalfBathrooms: value });
                      }}
                      type="number"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <CustomInputTypeForm
                  value={dataForm.totalParkingSpots}
                  placeholder=""
                  label="Estacionamientos *"
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value) => {
                    setDataForm({ ...dataForm, totalParkingSpots: value });
                  }}
                  type="number"
                />
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <CustomInputTypeForm
                  value={dataForm.totalSquareMetersBuilt}
                  placeholder=""
                  label="Construcción m²"
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value) => {
                    setDataForm({ ...dataForm, totalSquareMetersBuilt: value });
                  }}
                  type="number"
                />
              </Col>
            </Row>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <CustomInputTypeForm
                  value={dataForm.totalSquareMetersLand}
                  placeholder=""
                  label="Terreno m²"
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value) => {
                    setDataForm({ ...dataForm, totalSquareMetersLand: value });
                  }}
                  type="number"
                />
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <CustomInputTypeForm
                  value={dataForm.totalFloors}
                  placeholder=""
                  label="Cantidad de pisos en el inmueble"
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value) => {
                    setDataForm({
                      ...dataForm,
                      totalFloors: value,
                    });
                  }}
                  type="number"
                />
              </Col>
            </Row>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                {isOpenFloorDescription === true && (
                  <CustomInputTypeForm
                    value={dataForm.floorDescription}
                    placeholder=""
                    label="Piso en el que se encuentra"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        floorDescription: value,
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
                <CustomInputCurrency
                  value={dataForm.maintenanceAmount}
                  placeholder=""
                  label="Mantenimiento mensual"
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value) => {
                    setDataForm({
                      ...dataForm,
                      maintenanceAmount: isNil(value) === true ? 0 : value,
                    });
                  }}
                  type="number"
                />
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <MultiSelect>
                  <span>¿La propiedad está amueblada?</span>
                  <div className="button-actions-select">
                    {[
                      { id: true, text: "Si" },
                      { id: false, text: "No" },
                    ].map((row) => {
                      return (
                        <ButtonCheck
                          select={row.id == dataForm.isFurnished}
                          onClick={() => {
                            setDataForm({ ...dataForm, isFurnished: row.id });
                          }}
                        >
                          {row.text}
                        </ButtonCheck>
                      );
                    })}
                  </div>
                </MultiSelect>
              </Col>
            </Row>
          </div>
          {idUserType !== 3 && (
            <>
              <LineSeparator />
              <div className="type-form-property">
                <div className="subtitle-form">
                  <h1>Datos de inmobiliaria / Propietario (Opcional)</h1>
                  <span>
                    La siguiente información te ayudará a identificar a tu
                    cliente.
                  </span>
                </div>
                <Row>
                  <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                    <CustomInputSelect
                      value={dataForm.ownerEmailAddress}
                      type="text"
                      placeholder="Busca o agrega un usuario"
                      label="Correo electrónico"
                      error={false}
                      data={dataOwners}
                      onChange={(value) => {
                        if (isEmpty(value) === true) {
                          setDataOwners([]);
                        }
                        if (value.length >= 3) {
                          handlerCallSearchCustomer(value);
                        }
                        setDataForm({
                          ...dataForm,
                          ownerGivenName: null,
                          ownerLastName: null,
                          ownerEmailAddress: value,
                          idCustomerOwner: null,
                        });
                      }}
                      onSelectItem={(dataRecord) => {
                        setDataForm({
                          ...dataForm,
                          ownerGivenName: dataRecord.givenName,
                          ownerLastName: dataRecord.lastName,
                          ownerEmailAddress: dataRecord.username,
                          idCustomerOwner: dataRecord.idCustomer,
                        });
                      }}
                    />
                  </Col>
                  <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                  <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                    <CustomInputTypeForm
                      value={dataForm.ownerPhoneNumber}
                      placeholder=""
                      label="Teléfono"
                      error={false}
                      errorMessage="Este campo es requerido"
                      onChange={(value) => {
                        setDataForm({ ...dataForm, ownerPhoneNumber: value });
                      }}
                      type="number"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                    <CustomInputTypeForm
                      value={dataForm.ownerGivenName}
                      placeholder=""
                      label="Nombre *"
                      error={false}
                      errorMessage="Este campo es requerido"
                      onChange={(value) => {
                        setDataForm({ ...dataForm, ownerGivenName: value });
                      }}
                      type="text"
                    />
                  </Col>
                  <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                  <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                    <CustomInputTypeForm
                      value={dataForm.ownerLastName}
                      placeholder=""
                      label="Apellido paterno"
                      error={false}
                      errorMessage="Este campo es requerido"
                      onChange={(value) => {
                        setDataForm({ ...dataForm, ownerLastName: value });
                      }}
                      type="text"
                    />
                  </Col>
                </Row>
              </div>
            </>
          )}
          {isNil(idProperty) === false && (
            <div
              className="label-indicator"
              style={{
                marginTop: "25px",
              }}
            >
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <span>
                    Antes de dar clic en "Siguiente" recuerda guardar tus
                    cambios
                  </span>
                </Col>
              </Row>
            </div>
          )}
          <div className="next-back-buttons">
            <ButtonNextBackPage block>
              {"<< "}
              <u>{"Atrás"}</u>
            </ButtonNextBackPage>
            {isNil(idProperty) === false && (
              <ButtonNextBackPage
                block={false}
                onClick={async () => {
                  try {
                    setIsLoadApi(true);
                    await handlerCallUpdateProperty(dataForm, idProperty);
                    setIsLoadApi(false);
                  } catch (error) {
                    setIsLoadApi(false);
                  }
                }}
              >
                Guardar
              </ButtonNextBackPage>
            )}
            <ButtonNextBackPage
              block={false}
              onClick={() => {
                onclickNext(dataForm);
              }}
            >
              <u>{"Siguiente"}</u>
              {" >>"}
            </ButtonNextBackPage>
          </div>
        </FormProperty>
      </ComponentLoadSection>
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
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionDataProperty);
