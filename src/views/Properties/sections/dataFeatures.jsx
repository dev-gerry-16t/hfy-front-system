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

const SectionDataFeatures = (props) => {
  const {
    onClickBack,
    onclickNext,
    callGlobalActionApi,
    dataProfile,
    dataFormSave,
  } = props;
  const [dataAmenities, setDataAmenities] = useState([]);
  const [dataCharacteristics, setDataCharacteristics] = useState([]);

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

  useEffect(() => {
    handlerCallGetAllPropertyAmenities();
    handlerCallGetAllPropertyGeneralCharacteristics();
  }, []);

  useEffect(() => {
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
      <div className="header-title">
        <h1>Caracteristicas</h1>
      </div>
      <FormProperty>
        <div className="label-indicator">
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <span>Agrega las caracteristicas de tu inmueble.</span>
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
