import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { Row, Col } from "antd";
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
  FormProperty,
  ButtonCheck,
} from "../constants/styleConstants";
import CustomTextArea from "../../../components/customTextArea";
import CustomMapContainer from "../../../components/customGoogleMaps";
import { ReactComponent as Arrow } from "../../../assets/icons/Arrow.svg";
import ComponentLoadSection from "../../../components/componentLoadSection";
import ComponentInfoHeader from "../component/componentInfoHeader";

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

const Location = styled.div`
  border: 1px solid #d6d8e7;
  border-radius: 0.5em;
  width: 100%;
  height: 100%;
`;

const SectionDataLocation = (props) => {
  const {
    onClickBack,
    onclickNext,
    callGlobalActionApi,
    dataProfile,
    dataFormSave,
    idProperty,
    onBackTo,
    onSaveData,
    getById,
  } = props;
  const [idZipCode, setIdZipCode] = useState(null);
  const [positionCoordenates, setPositionCoordenates] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [zipCodeStateCity, setZipCodeStateCity] = useState({
    state: null,
    city: null,
  });
  const [openOtherNeighborhood, setOpenOtherNeighborhood] = useState(false);
  const [dataZipCatalog, setDataZipCatalog] = useState([]);
  const [dataForm, setDataForm] = useState({
    street: null,
    streetNumber: null,
    suite: null,
    idZipCode: null,
    neighborhood: null,
    isExactLocation: true,
    jsonCoordinates: null,
  });
  const dataFormSaveRef = useRef(dataForm);
  const dataPositionCoordenatesRef = useRef(positionCoordenates);
  const dataZipCodeRef = useRef(zipCode);
  const frontFunctions = new FrontFunctions();

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
      const state =
        isEmpty(responseResult1) === false ? responseResult1.state : "";
      const city =
        isEmpty(responseResult1) === false ? responseResult1.municipality : "";
      const responseMaps = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?&address=${code}+${state}+${city}&key=AIzaSyBwWOmV2W9QVm7lN3EBK4wCysj2sLzPhiQ`,
        {
          method: "GET",
        }
      );
      const responseResultMaps = await responseMaps.json();
      const geolocation =
        isEmpty(responseResultMaps) === false &&
        isNil(responseResultMaps.results) === false &&
        isNil(responseResultMaps.results[0]) === false
          ? responseResultMaps.results[0].geometry.location
          : {};
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
        state,
        city,
      });
      setPositionCoordenates(isNil(geolocation) === false ? geolocation : null);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const hanlderCallGetZipCodeAdressFill = async (code, id, coordinates) => {
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
        return row.idZipCode == id;
      });
      const state =
        isEmpty(responseResult1) === false ? responseResult1.state : "";
      const city =
        isEmpty(responseResult1) === false ? responseResult1.municipality : "";
      if (
        isNil(neighborhood) === false &&
        isNil(neighborhood.isOpen) === false &&
        neighborhood.isOpen === true
      ) {
        setOpenOtherNeighborhood(true);
      }
      if (isNil(coordinates) === false) {
        setPositionCoordenates(
          isNil(coordinates) === false ? JSON.parse(coordinates) : null
        );
      } else {
        const responseMaps = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?&address=${code}+${state}+${city}&key=AIzaSyBwWOmV2W9QVm7lN3EBK4wCysj2sLzPhiQ`,
          {
            method: "GET",
          }
        );
        const responseResultMaps = await responseMaps.json();
        const geolocation =
          isEmpty(responseResultMaps) === false &&
          isNil(responseResultMaps.results) === false &&
          isNil(responseResultMaps.results[0]) === false
            ? responseResultMaps.results[0].geometry.location
            : {};
        setPositionCoordenates(
          isNil(geolocation) === false ? geolocation : null
        );
      }

      setIdZipCode(isEmpty(responseResult2) ? "" : id);
      setDataZipCatalog(responseResult2);
      setZipCodeStateCity({
        state: state,
        city: city,
      });
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
          idApartment: data.idApartment,
          street: data.street,
          streetNumber: data.streetNumber,
          suite: data.suite,
          idZipCode: data.idZipCode,
          neighborhood: data.neighborhood,
          isExactLocation: data.isExactLocation,
          jsonCoordinates: data.jsonCoordinates,
        },
        id,
        API_CONSTANTS.PROPERTY.UPDATE_PROPERTY_ADDRESS,
        "PUT"
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : {};
      getById();
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

  useEffect(() => {
    if (isEmpty(dataFormSave) === false) {
      const {
        idZipCode,
        isExactLocation = true,
        jsonCoordinates,
        zipCode,
      } = dataFormSave;
      setDataForm({
        ...dataFormSave,
        isExactLocation,
      });
      if (isNil(zipCode) === false && isNil(idZipCode) === false) {
        setZipCode(zipCode, idZipCode);
        hanlderCallGetZipCodeAdressFill(zipCode, idZipCode, jsonCoordinates);
      }
    }
  }, [dataFormSave]);

  useEffect(() => {
    return () => {
      onSaveData({
        ...dataFormSaveRef.current,
        jsonCoordinates:
          isNil(dataPositionCoordenatesRef.current) === false
            ? JSON.stringify(dataPositionCoordenatesRef.current)
            : null,
        zipCode: dataZipCodeRef.current,
      });
    };
  }, []);

  useEffect(() => {
    dataFormSaveRef.current = dataForm;
    dataPositionCoordenatesRef.current = positionCoordenates;
    dataZipCodeRef.current = zipCode;
  }, [dataForm, positionCoordenates, zipCode]);

  return (
    <ContentForm>
      <ComponentLoadSection isLoadApi={isLoadApi}>
        {isNil(idProperty) === false && (
          <div className="back-button">
            <button onClick={onBackTo}>
              <Arrow width="25px" />
            </button>
          </div>
        )}
        <div className="header-title">
          <h1>Ubicación</h1>
        </div>
        <ComponentInfoHeader text="Cuando publicas la propiedad solo mostramos código postal, estado, colonia, municipio o delegación y la ubicación en el mapa. La Calle, número exterior e interior son confidenciales y solo se usan para la generación de contratos de arrendamiento." />
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
          <div className="type-property"></div>
          <div className="type-form-property-location">
            <div>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <CustomInputTypeForm
                    value={dataForm.street}
                    placeholder=""
                    label="Calle *"
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
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.streetNumber}
                    placeholder=""
                    label="Número exterior *"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        streetNumber: value,
                      });
                    }}
                    type="text"
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
                    type="text"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={zipCode}
                    placeholder=""
                    label="Código postal *"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={async (value) => {
                      if (value.length <= 5) {
                        setZipCode(value);
                        if (value.length === 5) {
                          hanlderCallGetZipCodeAdress(value, "");
                        } else {
                          setDataForm({
                            ...dataForm,
                            jsonCoordinates: null,
                            zipCode: null,
                            neighborhood: null,
                            idZipCode: null,
                          });
                          setIdZipCode(null);
                          setOpenOtherNeighborhood(false);
                          setPositionCoordenates(null);
                          setZipCodeStateCity({
                            state: null,
                            city: null,
                          });
                        }
                      }
                    }}
                    type="number"
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={zipCodeStateCity.state}
                    placeholder=""
                    label="Estado *"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {}}
                    type="text"
                    isBlock={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={zipCodeStateCity.city}
                    placeholder=""
                    label="Municipio/Delegación *"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {}}
                    type="text"
                    isBlock={true}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomSelect
                    value={idZipCode}
                    placeholder=""
                    label="Colonia *"
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
              {openOtherNeighborhood === true && (
                <Row>
                  <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
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
                  </Col>
                </Row>
              )}
            </div>
            <div className="content-map-location">
              {isNil(positionCoordenates) === true &&
                isEmpty(positionCoordenates) === true && (
                  <div className="no-location">
                    <img
                      src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296P.png"
                      alt="location"
                    />
                    <span>Agrega la ubicación del inmueble</span>
                  </div>
                )}
              {isNil(positionCoordenates) === false &&
                isEmpty(positionCoordenates) === false && (
                  <div className="location-map">
                    <Location>
                      <CustomMapContainer
                        location={positionCoordenates}
                        onDragPosition={(position) => {
                          setPositionCoordenates(position);
                        }}
                        exact={dataForm.isExactLocation}
                      />
                    </Location>
                  </div>
                )}
            </div>
          </div>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <MultiSelect>
                <span>¿Compartir ubicación precisa?</span>
                <div className="button-actions-select">
                  {[
                    { id: true, text: "Si" },
                    { id: false, text: "No" },
                  ].map((row) => {
                    return (
                      <ButtonCheck
                        select={row.id === dataForm.isExactLocation}
                        onClick={() => {
                          setDataForm({
                            ...dataForm,
                            isExactLocation: row.id,
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
          </Row>
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
            <ButtonNextBackPage
              block={false}
              onClick={() => {
                onClickBack({
                  ...dataForm,
                  jsonCoordinates:
                    isNil(positionCoordenates) === false
                      ? JSON.stringify(positionCoordenates)
                      : null,
                  zipCode: isEmpty(zipCode) === false ? zipCode : null,
                });
              }}
            >
              {"<< "}
              <u>{"Atrás"}</u>
            </ButtonNextBackPage>
            {isNil(idProperty) === false && (
              <ButtonNextBackPage
                block={false}
                onClick={async () => {
                  try {
                    setIsLoadApi(true);
                    await handlerCallUpdateProperty(
                      {
                        ...dataForm,
                        idApartment: dataFormSave.idApartment,
                        jsonCoordinates:
                          isNil(positionCoordenates) === false
                            ? JSON.stringify(positionCoordenates)
                            : null,
                        zipCode: isEmpty(zipCode) === false ? zipCode : null,
                      },
                      idProperty
                    );
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
                onclickNext({
                  ...dataForm,
                  jsonCoordinates:
                    isNil(positionCoordenates) === false
                      ? JSON.stringify(positionCoordenates)
                      : null,
                  zipCode,
                });
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
)(SectionDataLocation);
