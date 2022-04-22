import React, { useState } from "react";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Row, Col } from "antd";
import {
  ContentForm,
  ButtonNextBackPage,
  FormProperty,
  ComponentRadio,
} from "../constants/styleConstants";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import CustomSelect from "../../../components/CustomSelect";

const SectionInfoOwner = ({ onClickBack, onClickNext }) => {
  const [dataForm, setDataForm] = useState({});
  const [fieldDescription, setFieldDescription] = useState("");

  return (
    <ContentForm>
      <div className="header-title">
        <h1>Información personal del Propietario</h1>
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
                  // setDataForm({
                  //   ...dataForm,
                  //   givenName: value,
                  // });
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
                  // setDataForm({
                  //   ...dataForm,
                  //   lastName: value,
                  // });
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
                  // setDataForm({
                  //   ...dataForm,
                  //   mothersMaidenName: value,
                  // });
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
                data={[]}
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  // setDataForm({
                  //   ...dataForm,
                  //   idCountryNationality: value,
                  // });
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
                label="Identificación oficial"
                data={[]}
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value, option) => {
                  // setDataForm({
                  //   ...dataForm,
                  //   idType: value,
                  // });
                  // setFieldDescription(option.fieldDescription);
                }}
                isBlock={false}
              />
            </Col>
            {isNil(dataForm.idType) === false && (
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <CustomInputTypeForm
                  value={dataForm.idTypeNumber}
                  placeholder="Numero de identificación"
                  label={fieldDescription}
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value) => {
                    // setDataForm({
                    //   ...dataForm,
                    //   idTypeNumber: value,
                    // });
                  }}
                  type="text"
                  isBlock={true}
                />
              </Col>
            )}
          </Row>
        </div>
        <div className="next-back-buttons">
          <ButtonNextBackPage
            block={false}
            onClick={() => {
              onClickBack();
            }}
          >
            {"<< "}
            <u>{"Atrás"}</u>
          </ButtonNextBackPage>
          <ButtonNextBackPage
            block={false}
            onClick={async () => {
              onClickNext();
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

export default SectionInfoOwner;
