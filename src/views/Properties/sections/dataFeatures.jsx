import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import {
  ContentForm,
  LineSeparator,
  FormProperty,
  ButtonNextBackPage,
} from "../constants/styleConstants";
import CustomChips from "../../../components/customChips";

const SectionDataFeatures = () => {
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
                selected={[]}
                data={[
                  { id: 1, text: "Acceso a la playa" },
                  { id: 2, text: "Balcon" },
                  { id: 3, text: "Cisterna" },
                  { id: 4, text: "Estacionamiento techado" },
                ]}
                onChange={(data) => {}}
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
                selected={[]}
                data={[
                  {
                    id: 1,
                    text: "accesibilidad para adultos mayores",
                  },
                  { id: 2, text: "Balcon" },
                  { id: 3, text: "Cisterna" },
                  { id: 4, text: "Estacionamiento techado" },
                ]}
                onChange={(data) => {}}
              />
            </Col>
          </Row>
        </div>
        <LineSeparator />
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

export default SectionDataFeatures;
