import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { Row, Col, message } from "antd";
import CustomDialog from "../../../components/CustomDialog";
import {
  ErrorMessage,
  Container,
  HeaderContainer,
  MainContainer,
  MainButtons,
  ComponentRadio,
} from "../constants/styles";
import saqareX from "../../../assets/icons/saqareX.svg";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import CustomSelect from "../../../components/CustomSelect";
import ComponentLoadSection from "../../../components/componentLoadSection";

const SpanPrice = styled.span`
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 500;
  text-decoration: underline;
`;

const ComponentDetailLegal = (props) => {
  const { visibleDialog, onClose, dataInfoRequest, onSaveInfo, dataFee } =
    props;

  const [isVisibleError, setIsVisibleError] = useState(false);
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [dataForm, setDataForm] = useState({});

  useEffect(() => {
    if (isEmpty(dataInfoRequest) === false) {
      const { request } = dataInfoRequest;
      setDataForm({ requiresLegalAdvice: request.requiresLegalAdvice });
    }
  }, [dataInfoRequest]);

  return (
    <CustomDialog
      isVisibleDialog={visibleDialog}
      onClose={() => {}}
      classNameDialog="onboarding-dialog"
    >
      <div
        style={{
          position: "absolute",
          right: "1em",
          top: "5px",
          zIndex: "2",
        }}
      >
        <button
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          X
        </button>
      </div>
      <Container>
        <ComponentLoadSection
          isLoadApi={isLoadApi}
          text="Guardando información"
        >
          <HeaderContainer>
            <h1>
              Asesoría <span>Legal</span>
            </h1>
          </HeaderContainer>
          <MainContainer>
            <span>Ingresa la información que se te pide a continuación</span>
          </MainContainer>
          <div>
            <Row>
              <Col span={24}>
                <ComponentRadio>
                  <strong>
                    ¿Deseas contratar el servicio de asesoría Legal? *<br />
                    <SpanPrice>
                      Costo adicional: {dataFee.legalAdvice}
                    </SpanPrice>
                    <br />
                  </strong>
                  <div className="radio-inputs-options">
                    <label className="input-radio">
                      <input
                        type="radio"
                        checked={dataForm.requiresLegalAdvice === true}
                        name="service-contract"
                        onClick={() => {
                          setDataForm({
                            ...dataForm,
                            requiresLegalAdvice: true,
                          });
                        }}
                      />
                      Si
                    </label>
                    <label className="input-radio">
                      <input
                        type="radio"
                        name="service-contract"
                        checked={dataForm.requiresLegalAdvice === false}
                        onClick={() => {
                          setDataForm({
                            ...dataForm,
                            requiresLegalAdvice: false,
                          });
                        }}
                      />
                      No por el momento
                    </label>
                  </div>
                </ComponentRadio>
              </Col>
            </Row>
          </div>
          <ErrorMessage error={isVisibleError}>
            <img src={saqareX} alt="exclaim" />
            <span>Selecciona una opción</span>
          </ErrorMessage>
          <MainButtons>
            <button
              className="hfy-primary-button"
              onClick={async () => {
                if (isNil(dataForm.requiresLegalAdvice) === false) {
                  setIsLoadApi(true);
                  await onSaveInfo({
                    requiresLegalAdvice: dataForm.requiresLegalAdvice,
                  });
                  onClose();
                  setIsLoadApi(false);
                } else {
                  setIsVisibleError(true);
                  setTimeout(() => {
                    setIsVisibleError(false);
                  }, 5000);
                }
              }}
            >
              Guardar
            </button>
            <button
              className="hfy-secondary-button"
              onClick={() => {
                onClose();
              }}
            >
              Salir
            </button>
          </MainButtons>
        </ComponentLoadSection>
      </Container>
    </CustomDialog>
  );
};

export default ComponentDetailLegal;
