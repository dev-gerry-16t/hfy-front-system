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
} from "../constants/styles";
import saqareX from "../../../assets/icons/saqareX.svg";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import CustomSelect from "../../../components/CustomSelect";
import ComponentLoadSection from "../../../components/componentLoadSection";

const ComponentDetailContract = (props) => {
  const { visibleDialog, onClose, dataInfoRequest, onSaveInfo } = props;

  const [isVisibleError, setIsVisibleError] = useState(false);
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [dataForm, setDataForm] = useState({});

  useEffect(() => {
    if (isEmpty(dataInfoRequest) === false) {
      const { startedAt, isFaceToFace, scheduleAt } = dataInfoRequest;
      setDataForm({
        startedAt:
          isEmpty(startedAt) === false && isNil(startedAt) === false
            ? moment(startedAt).format("YYYY-MM-DD")
            : null,
        isFaceToFace: isFaceToFace === "1" || isFaceToFace === true ? "1" : "2",
        scheduleAt:
          isEmpty(scheduleAt) === false && isNil(scheduleAt) === false
            ? moment(scheduleAt, "YYYY-MM-DDThh:mm").format("YYYY-MM-DDThh:mm")
            : null,
      });
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
              Detalle de <span>Contrato</span>
            </h1>
          </HeaderContainer>
          <MainContainer>
            <span>Ingresa la información que se te pide a continuación</span>
          </MainContainer>
          <div>
            <Row>
              <Col span={24}>
                <CustomInputTypeForm
                  value={dataForm.startedAt}
                  placeholder="dd-mm-yy"
                  label="¿Cuándo inicia el contrato de arrendamiento? *"
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value) => {
                    setDataForm({
                      ...dataForm,
                      startedAt: isEmpty(value) === false ? value : null,
                    });
                  }}
                  type="date"
                  isBlock={false}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <CustomSelect
                  value={dataForm.isFaceToFace}
                  placeholder=""
                  label="¿Cómo se firmará el contrato? *"
                  data={[
                    { id: "1", text: "Presencial" },
                    { id: "2", text: "En linea" },
                  ]}
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value) => {
                    setDataForm({
                      ...dataForm,
                      isFaceToFace: value,
                    });
                  }}
                  isBlock={false}
                />
              </Col>
            </Row>
            {(dataForm.isFaceToFace === true ||
              dataForm.isFaceToFace == "1") && (
              <Row>
                <Col span={24}>
                  <CustomInputTypeForm
                    value={dataForm.scheduleAt}
                    placeholder="dd-mm-yy"
                    label="¿Cuándo se firma el contrato de arrendamiento? *"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        scheduleAt: isEmpty(value) === false ? value : null,
                      });
                    }}
                    type="datetime-local"
                    isBlock={false}
                  />
                </Col>
              </Row>
            )}
          </div>
          <ErrorMessage error={isVisibleError}>
            <img src={saqareX} alt="exclaim" />
            <span>Revisa que la información este completa</span>
          </ErrorMessage>
          <MainButtons>
            <button
              className="hfy-primary-button"
              onClick={async () => {
                const { startedAt, isFaceToFace, scheduleAt } = dataForm;
                if (
                  isNil(startedAt) === false &&
                  isNil(isFaceToFace) === false
                ) {
                  if (
                    (isFaceToFace === true || isFaceToFace == "1") &&
                    isNil(scheduleAt) === true
                  ) {
                    setIsVisibleError(true);
                    setTimeout(() => {
                      setIsVisibleError(false);
                    }, 5000);
                  } else {
                    setIsLoadApi(true);
                    await onSaveInfo({
                      startedAt,
                      isFaceToFace:
                        isFaceToFace === "1" || isFaceToFace === true
                          ? true
                          : false,
                      scheduleAt,
                    });
                    setIsLoadApi(false);
                    onClose();
                  }
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

export default ComponentDetailContract;
