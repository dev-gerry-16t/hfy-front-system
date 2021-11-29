import React, { useState, useEffect } from "react";
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
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import {
  ContentForm,
  ButtonNextBackPage,
  LineSeparator,
  FormProperty,
} from "../constants/styleConstants";

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
`;

const catalogPrice = [
  { id: "1", text: "Valor total" },
  { id: "2", text: "por m²" },
  { id: "3", text: "por ha" },
];

const SectionDataProperty = (props) => {
  const {
    onclickNext,
    callGlobalActionApi,
    dataProfile,
    dataFormSave,
    idUserType,
  } = props;
  const [dataPropertyTypes, setDataPropertyTypes] = useState([]);
  const [dataOwners, setDataOwners] = useState([]);
  const [isOpenFloorDescription, setIsOpenFloorDescription] = useState(false);
  const [dataCommercialActivity, setDataCommercialActivity] = useState([]);
  const [dataForm, setDataForm] = useState({
    idPropertyType: null,
    idCommercialActivity: null,
    currentRent: null,
    idCurrency: null,
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
  });

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

  const handlerCallSearchCustomer = async (data) => {
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

  useEffect(() => {
    handlerCallGetAllPropertyTypes();
  }, []);

  useEffect(() => {
    if (isEmpty(dataFormSave) === false) {
      setDataForm(dataFormSave);
    }
  }, [dataFormSave]);

  return (
    <ContentForm>
      <div className="header-title">
        <h1>Datos de propiedad</h1>
      </div>
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
          </Row>
        </div>
        <div className="type-form-property">
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputCurrency
                value={dataForm.currentRent}
                placeholder=""
                label="Precio de renta *"
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
                        select={row.id === dataForm.priceBasedBy}
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
                label="Recamaras *"
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
              <CustomInputTypeForm
                value={dataForm.totalBathrooms}
                placeholder=""
                label="Baños *"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({ ...dataForm, totalBathrooms: value });
                }}
                type="number"
              />
            </Col>
          </Row>
          <Row>
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
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
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
          </Row>
          <Row>
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
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
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
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.totalFloors}
                placeholder=""
                label="Cantidad de pisos en el inmueble *"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({ ...dataForm, totalFloors: value });
                }}
                type="number"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            {isOpenFloorDescription === true && (
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <CustomSelect
                  value={dataForm.floorDescription}
                  placeholder=""
                  label="Piso en el que se encuentra *"
                  data={[
                    { id: "S", text: "Sotano" },
                    { id: "PB", text: "Planta baja" },
                    { id: "1", text: "1" },
                    { id: "2", text: "2" },
                    { id: "3", text: "3" },
                    { id: "4", text: "4" },
                    { id: "5", text: "5" },
                    { id: "6", text: "6" },
                    { id: "7", text: "7" },
                    { id: "8", text: "8" },
                    { id: "9", text: "9" },
                    { id: "10", text: "10" },
                    { id: "other", text: "más" },
                  ]}
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value) => {
                    setDataForm({ ...dataForm, floorDescription: value });
                  }}
                />
              </Col>
            )}
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
                  setDataForm({ ...dataForm, maintenanceAmount: value });
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
                        select={row.id === dataForm.isFurnished}
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
                <h1>Datos de inmobiliaria / Propietario</h1>
              </div>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        color: "#4e4b66",
                      }}
                    >
                      Correo electrónico *
                    </label>
                    <Select
                      mode="tags"
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Busca o agrega un usuario"
                      optionFilterProp="children"
                      onChange={(e, a) => {
                        if (isEmpty(a) === false && isEmpty(a[0]) === false) {
                          const response = a[0].onClick();
                          setDataForm({
                            ...dataForm,
                            ownerGivenName: response.givenName,
                            ownerLastName: response.lastName,
                            ownerEmailAddress: response.username,
                            idCustomer: response.idCustomer,
                          });
                        } else {
                          setDataForm({
                            ...dataForm,
                            ownerGivenName: null,
                            ownerLastName: null,
                            ownerEmailAddress:
                              isNil(e[0]) === false ? e[0] : null,
                            idCustomer: null,
                          });
                        }
                      }}
                      onFocus={() => {}}
                      onBlur={() => {}}
                      onSearch={(e) => {
                        if (e.length >= 3) {
                          handlerCallSearchCustomer(e);
                        }
                      }}
                      tokenSeparators={[","]}
                      filterOption={(input, option) => {
                        if (isNil(option.children) === false) {
                          return (
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          );
                        }
                      }}
                    >
                      {isEmpty(dataOwners) === false &&
                        dataOwners.map((row) => {
                          return (
                            <Option value={row.idCustomer} onClick={() => row}>
                              {row.username}
                            </Option>
                          );
                        })}
                    </Select>
                  </div>
                  ,
                  {/* <CustomInputTypeForm
                    value={dataForm.ownerEmailAddress}
                    placeholder=""
                    label="Correo electrónico *"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({ ...dataForm, ownerEmailAddress: value });
                    }}
                    type="email"
                    onBlur={async () => {
                      try {
                        const response = await handlerCallSearchCustomer(
                          dataForm.ownerEmailAddress
                        );
                        if (isEmpty(response) === false) {
                          setDataForm({
                            ...dataForm,
                            ownerGivenName: response.givenName,
                            ownerLastName: response.lastName,
                          });
                        }
                      } catch (error) {}
                    }}
                  /> */}
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
        <div className="next-back-buttons">
          <ButtonNextBackPage block>
            {"<< "}
            <u>{"Atrás"}</u>
          </ButtonNextBackPage>
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
