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
import {
  ContentForm,
  LineSeparator,
  FormProperty,
  ButtonNextBackPage,
} from "../constants/styleConstants";
import CustomChips from "../../../components/customChips";
import { ReactComponent as Arrow } from "../../../assets/icons/Arrow.svg";
import ComponentLoadSection from "../../../components/componentLoadSection";

const SectionDataFeatures = (props) => {
  const {
    onClickBack,
    onclickNext,
    callGlobalActionApi,
    dataProfile,
    dataFormSave,
    idProperty,
    idApartment,
    onBackTo,
  } = props;
  const [dataAmenities, setDataAmenities] = useState([]);
  const [dataCharacteristics, setDataCharacteristics] = useState([]);
  const [isLoadApi, setIsLoadApi] = useState(false);

  const [dataForm, setDataForm] = useState({
    propertyAmenities: [],
    propertyGeneralCharacteristics: [],
  });
  const frontFunctions = new FrontFunctions();

  const handlerCallGetAllPropertyAmenities = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          idApartment,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_ALL_PROPERTY_AMENITIES
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataAmenities(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllPropertyGeneralCharacteristics = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          idApartment,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_ALL_PROPERTY_GENERAL_CHARACTERISTICS
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataCharacteristics(responseResult);
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
    handlerCallGetAllPropertyAmenities();
    handlerCallGetAllPropertyGeneralCharacteristics();
  }, []);

  useEffect(() => {
    console.log('dataFormSave',dataFormSave);
    if (isEmpty(dataFormSave) === false) {
      const { propertyAmenities, propertyGeneralCharacteristics } =
        dataFormSave;
      const amenities =
        isNil(propertyAmenities) === false &&
        isEmpty(propertyAmenities) === false
          ? JSON.parse(propertyAmenities)
          : [];
      const characteristics =
        isNil(propertyGeneralCharacteristics) === false &&
        isEmpty(propertyGeneralCharacteristics) === false
          ? JSON.parse(propertyGeneralCharacteristics)
          : [];
      setDataForm({
        propertyAmenities: amenities,
        propertyGeneralCharacteristics: characteristics,
      });
    }
  }, [dataFormSave]);

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
          <h1>Características</h1>
        </div>
        <FormProperty>
          <div className="label-indicator">
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <span>Agrega las características de tu inmueble.</span>
              </Col>
            </Row>
          </div>
          <div className="type-form-property" style={{ marginTop: "2em" }}>
            <div className="subtitle-form">
              <h1>Amenidades</h1>
            </div>
            <Row>
              <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                <CustomChips
                  selected={dataForm.propertyAmenities}
                  data={dataAmenities}
                  onChange={(data, join) => {
                    console.log('data',data);
                    setDataForm({ ...dataForm, propertyAmenities: data });
                  }}
                />
              </Col>
            </Row>
            <LineSeparator />
            <div className="subtitle-form">
              <h1>General</h1>
            </div>
            <Row>
              <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                <CustomChips
                  selected={dataForm.propertyGeneralCharacteristics}
                  data={dataCharacteristics}
                  onChange={(data, join) => {
                    setDataForm({
                      ...dataForm,
                      propertyGeneralCharacteristics: data,
                    });
                  }}
                />
              </Col>
            </Row>
          </div>
          <LineSeparator />
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
                  propertyAmenities: JSON.stringify(dataForm.propertyAmenities),
                  propertyGeneralCharacteristics: JSON.stringify(
                    dataForm.propertyGeneralCharacteristics
                  ),
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
                        propertyAmenities: JSON.stringify(
                          dataForm.propertyAmenities
                        ),
                        propertyGeneralCharacteristics: JSON.stringify(
                          dataForm.propertyGeneralCharacteristics
                        ),
                        idApartment: dataFormSave.idApartment,
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
                  propertyAmenities: JSON.stringify(dataForm.propertyAmenities),
                  propertyGeneralCharacteristics: JSON.stringify(
                    dataForm.propertyGeneralCharacteristics
                  ),
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
)(SectionDataFeatures);
