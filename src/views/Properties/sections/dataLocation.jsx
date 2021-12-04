import React, { useState, useEffect } from "react";
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
} from "../constants/styleConstants";
import CustomTextArea from "../../../components/customTextArea";
import CustomMapContainer from "../../../components/customGoogleMaps";
import { ReactComponent as Arrow } from "../../../assets/icons/Arrow.svg";
import ComponentLoadSection from "../../../components/componentLoadSection";

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

const Location = styled.div`
  border: 1px solid #d6d8e7;
  border-radius: 0.5em;
  width: 100%;
  height: 100%;
  .no-location {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
      margin-top: 4em;
      color: rgba(78, 75, 102, 0.2);
      font-weight: 700;
    }
  }
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
      setPositionCoordenates(geolocation);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const hanlderCallGetZipCodeAdressFill = async (code, id) => {
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
        API_CONSTANTS.CUSTOMER.UPDATE_PROPERTY,
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

  useEffect(() => {
    if (isEmpty(dataFormSave) === false) {
      const {
        street,
        streetNumber,
        suite,
        idZipCode,
        neighborhood,
        isExactLocation = true,
        jsonCoordinates,
        zipCode,
      } = dataFormSave;
      setDataForm({
        street,
        streetNumber,
        suite,
        idZipCode,
        neighborhood,
        isExactLocation,
        jsonCoordinates,
        zipCode,
      });
      if (
        isNil(jsonCoordinates) === false &&
        isNil(zipCode) === false &&
        isNil(idZipCode) === false
      ) {
        setZipCode(zipCode, idZipCode);
        setPositionCoordenates(JSON.parse(jsonCoordinates));
        hanlderCallGetZipCodeAdressFill(zipCode, idZipCode);
      }
    }
  }, [dataFormSave]);

  return (
    <ContentForm>
      <ComponentLoadSection isLoadApi={isLoadApi}>
        {isNil(idProperty) === false && (
          <div className="back-button">
            <button onClick={onBackTo}>
              <Arrow width="35px" />
            </button>
          </div>
        )}
        <div className="header-title">
          <h1>Ubicación</h1>
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
          <div className="type-property"></div>
          <div className="type-form-property">
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
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
                        if (value.length === 5) {
                          setZipCode(value);
                          hanlderCallGetZipCodeAdress(value, "");
                        } else {
                          setDataForm({
                            ...dataForm,
                            jsonCoordinates: null,
                            zipCode: value,
                          });
                          setZipCode(value);
                          setPositionCoordenates(null);
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
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <Location>
                  {isNil(positionCoordenates) === true &&
                  isEmpty(positionCoordenates) === true ? (
                    <div className="no-location">
                      <img
                        src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296P.png"
                        alt="location"
                      />
                      <span>Agrega la ubicación del inmueble</span>
                    </div>
                  ) : (
                    <CustomMapContainer
                      location={positionCoordenates}
                      onDragPosition={(position) => {
                        setPositionCoordenates(position);
                      }}
                      exact={dataForm.isExactLocation}
                    />
                  )}
                </Location>
              </Col>
            </Row>
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
          </div>
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
                  jsonCoordinates: JSON.stringify(positionCoordenates),
                  zipCode,
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
                      { ...dataForm, idApartment: dataFormSave.idApartment },
                      idProperty
                    );
                    setIsLoadApi(false);
                  } catch (error) {
                    setIsLoadApi(false);
                  }
                }}
              >
                <u>{"Guardar"}</u>
              </ButtonNextBackPage>
            )}
            <ButtonNextBackPage
              block={false}
              onClick={() => {
                onclickNext({
                  ...dataForm,
                  jsonCoordinates: JSON.stringify(positionCoordenates),
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
