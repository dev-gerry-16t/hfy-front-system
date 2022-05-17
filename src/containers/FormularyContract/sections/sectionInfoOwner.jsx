import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import isNil from "lodash/isNil";
import { Row, Col } from "antd";
import {
  ContentForm,
  ButtonNextBackPage,
  FormProperty,
  ComponentRadio,
} from "../constants/styleConstants";
import ContextForm from "../context/contextForm";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import CustomSelect from "../../../components/CustomSelect";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../utils/actions/actions";

const SectionInfoOwner = ({
  onClickBack,
  onClickNext,
  callGlobalActionApi,
}) => {
  const [dataForm, setDataForm] = useState({});
  const [dataCountries, setDataCountries] = useState("");
  const [dataIdTypes, setDataIdTypes] = useState([]);

  const dataContextForm = useContext(ContextForm);
  const { dataFormSave, onSetInformation, idCustomerType } = dataContextForm;

  const frontFunctions = new FrontFunctions();

  const hanlderCallGetAllCountries = async () => {
    try {
      const response = await callGlobalActionApi(
        {
          type: 2,
        },
        null,
        API_CONSTANTS.ANONYMOUS.GET_ALL_COUNTRIES,
        "POST",
        false
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataCountries(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const hanlderCallGetIdTypes = async () => {
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer: null,
          idSystemUser: null,
          idLoginHistory: null,
          type: 1,
        },
        null,
        API_CONSTANTS.ANONYMOUS.GET_CATALOG_ID_TYPES,
        "POST",
        false
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

  useEffect(() => {
    hanlderCallGetAllCountries();
    hanlderCallGetIdTypes();
  }, []);

  useEffect(() => {
    if (isEmpty(dataFormSave) === false) {
      const {
        givenName,
        lastName,
        mothersMaidenName,
        idCountryNationality,
        taxId,
        citizenId,
        idTypeNumber,
        idType,
      } = dataFormSave;
      setDataForm({
        ...dataForm,
        givenName,
        lastName,
        mothersMaidenName,
        idCountryNationality,
        taxId,
        citizenId,
        idTypeNumber,
        idType,
      });
    }
  }, [dataFormSave]);

  return (
    <ContentForm>
      <div className="header-title">
        <h1>
          Información personal del{" "}
          {idCustomerType === "2" ? "Propietario" : "Inquilino"}
        </h1>
      </div>
      <FormProperty>
        <div className="label-indicator">
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <span>Por favor llena todos los campos correspondientes.</span>
            </Col>
          </Row>
        </div>
        <div className="type-property">
          <Row gutter={10}>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
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
                isBlock={false}
              />
            </Col>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
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
                isBlock={false}
              />
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
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
                isBlock={false}
              />
            </Col>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
              <CustomSelect
                value={dataForm.idCountryNationality}
                placeholder=""
                label="Nacionalidad"
                data={dataCountries}
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    idCountryNationality: value,
                  });
                }}
                isBlock={false}
              />
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
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
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
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
          </Row>
          <Row gutter={10}>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
              <CustomSelect
                value={dataForm.idType}
                placeholder=""
                label="Selecciona la identificación oficial"
                data={dataIdTypes}
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value, option) => {
                  setDataForm({
                    ...dataForm,
                    idType: value,
                  });
                }}
                isBlock={false}
              />
            </Col>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
              <CustomInputTypeForm
                value={dataForm.idTypeNumber}
                placeholder=""
                label="Número de identificación"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    idTypeNumber: value,
                  });
                }}
                type="text"
                isBlock={false}
              />
            </Col>
          </Row>
        </div>
        <div className="next-back-buttons">
          <ButtonNextBackPage
            block={false}
            onClick={async () => {
              onClickBack();
            }}
          >
            {"<< "}
            <u>{"Atrás"}</u>
          </ButtonNextBackPage>
          <ButtonNextBackPage
            block={false}
            onClick={async () => {
              try {
                await onSetInformation(dataForm);
                onClickNext();
              } catch (error) {}
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

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method, token) =>
    dispatch(callGlobalActionApi(data, id, constant, method, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionInfoOwner);
