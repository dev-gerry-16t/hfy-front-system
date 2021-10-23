import React from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import CustomSelect from "../../../components/CustomSelect";
import CustomInputCurrency from "../../../components/customInputCurrency";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import {
  ContentForm,
  ButtonNextBackPage,
  LineSeparator,
  FormProperty,
} from "../constants/styleConstants";

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

const SectionDataProperty = () => {
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
                value={""}
                placeholder=""
                label="Tipo de propiedad"
                data={[]}
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {}}
              />
            </Col>
          </Row>
        </div>
        <div className="type-form-property">
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputCurrency
                value={""}
                placeholder=""
                label="Precio de renta"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {}}
                type="number"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <MultiSelect>
                <span>Precio basado en:</span>
                <div className="button-actions-select">
                  <ButtonCheck select={true}>Valor total</ButtonCheck>
                  <ButtonCheck select={false}>por m²</ButtonCheck>
                  <ButtonCheck select={false}>por ha</ButtonCheck>
                </div>
              </MultiSelect>
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={""}
                placeholder=""
                label="Recamaras"
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
                label="Baños"
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
                value={""}
                placeholder=""
                label="Medio baños"
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
                label="Estacionamientos"
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
                value={""}
                placeholder=""
                label="Construcción"
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
                label="Terreno"
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
                value={""}
                placeholder=""
                label="Largo del terreno"
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
                label="Frente del terreno"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {}}
                type="number"
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomSelect
                value={""}
                placeholder=""
                label="Año de construccion"
                data={[]}
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {}}
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomSelect
                value={""}
                placeholder=""
                label="Piso en el que se encuentra"
                data={[]}
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {}}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={""}
                placeholder=""
                label="Cantidad de pisos en el edificio"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {}}
                type="number"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputCurrency
                value={""}
                placeholder=""
                label="Mantenimiento mensual"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {}}
                type="number"
              />
            </Col>
          </Row>
        </div>
        <LineSeparator />
        <div className="type-form-property">
          <div className="subtitle-form">
            <h1>Datos de inmobiliaria / Propietario</h1>
          </div>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={""}
                placeholder=""
                label="Correo electrónico"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {}}
                type="email"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={""}
                placeholder=""
                label="Teléfono"
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
                value={""}
                placeholder=""
                label="Nombre"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {}}
                type="text"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}></Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={""}
                placeholder=""
                label="Apellido paterno"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {}}
                type="text"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={""}
                placeholder=""
                label="Apellido materno"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {}}
                type="text"
              />
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

export default SectionDataProperty;
