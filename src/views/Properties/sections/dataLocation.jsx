import React, { useState } from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import { Row, Col } from "antd";
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

const SectionDataLocation = () => {
  const [dataForm, setDataForm] = useState({
    code: null,
    location: null,
    street: null,
  });

  return (
    <ContentForm>
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
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={""}
                    placeholder=""
                    label="Número exterior"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {}}
                    type="number"
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={""}
                    placeholder=""
                    label="Número interior"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {}}
                    type="number"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.code}
                    placeholder=""
                    label="Código postal *"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={async (value) => {
                      if (value.length === 5) {
                        const response = await fetch(
                          `https://maps.googleapis.com/maps/api/geocode/json?&address=${value}&key=AIzaSyBwWOmV2W9QVm7lN3EBK4wCysj2sLzPhiQ`,
                          {
                            method: "GET",
                          }
                        );
                        const responseResult = await response.json();
                        const geolocation =
                          isEmpty(responseResult) === false &&
                          isNil(responseResult.results) === false &&
                          isNil(responseResult.results[0]) === false
                            ? responseResult.results[0].geometry.location
                            : {};
                        setDataForm({
                          ...dataForm,
                          code: value,
                          location: geolocation,
                        });
                      } else {
                        setDataForm({
                          ...dataForm,
                          code: value,
                          location: null,
                        });
                      }
                    }}
                    type="number"
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={""}
                    placeholder=""
                    label="Estado"
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
                    value={""}
                    placeholder=""
                    label="Municipio/Delegación"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {}}
                    type="text"
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomSelect
                    value={""}
                    placeholder=""
                    label="Colonia"
                    data={[]}
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {}}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <CustomTextArea
                    value={""}
                    label="Referencias"
                    placeholder=""
                    onChange={(value) => {}}
                    type="text"
                    error={false}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Location>
                {isNil(dataForm.location) === true ? (
                  <div className="no-location">
                    <img
                      src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296P.png"
                      alt="location"
                    />
                    <span>Agrega la ubicación del inmueble</span>
                  </div>
                ) : (
                  <CustomMapContainer
                    location={dataForm.location}
                    onDragPosition={(position) => {}}
                  />
                )}
              </Location>
            </Col>
          </Row>
        </div>
        <div className="next-back-buttons">
          <ButtonNextBackPage block>
            {"<< "}
            <u>{"Atrás"}</u>
          </ButtonNextBackPage>
          <ButtonNextBackPage block={false}>
            <u>{"Siguiente"}</u>
            {" >>"}
          </ButtonNextBackPage>
        </div>
      </FormProperty>
    </ContentForm>
  );
};

export default SectionDataLocation;
