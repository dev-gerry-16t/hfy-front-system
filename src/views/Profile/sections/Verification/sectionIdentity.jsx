import React, { useEffect, useContext, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Row, Col } from "antd";
import {
  ContentForm,
  ButtonNextBackPage,
  FormProperty,
} from "../../constants/styleConstants";
import ContextProfile from "../../context/contextProfile";
import CustomValidationUser from "../../../../components/CustomValidationUser";

const rotate360 = keyframes`
0% { transform: rotate(0) }
50%{transform: rotate(200deg)}
100% { transform: rotate(360deg) }
`;

const LoadSquare = styled.div`
  position: relative;
  overflow: hidden;
  width: 300px;
  height: 250px;
  box-shadow: 0 10px 40px -10px rgb(0 64 128 / 20%);
  border-radius: 1em;
  .load-border {
    width: 100%;
    height: 100%;
    animation: ${rotate360} linear 4s infinite;
    span {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      transform: translate(-50%, -50%);
    }
    span:first-child {
      background: var(--color-primary);
    }
    span:last-child:after {
      background: var(--color-primary);
    }

    span:after {
      display: block;
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      left: 100%;
    }
  }
  .content-identity {
    position: absolute;
    width: 290px;
    height: 240px;
    background: #fff;
    top: 50%;
    left: 50%;
    border-radius: 1em;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    text-align: center;
    h1 {
      font-weight: 700;
      font-size: 1.4em;
    }
  }
`;

const ButtonContinue = styled.button`
  background: var(--color-primary);
  color: #fff;
  padding: 5px 1em;
  border: none;
  border-radius: 5px;
`;

const SectionIdentity = (props) => {
  const { onClickNext, dataProfile } = props;
  const [isVisibleVerification, setIsVisibleVerification] = useState(false);

  const dataContextProfile = useContext(ContextProfile);
  const {} = dataContextProfile;

  return (
    <ContentForm>
      <CustomValidationUser
        isVisible={isVisibleVerification}
        onClose={() => {
          setIsVisibleVerification(false);
        }}
        finished={() => {}}
        metadata={{
          idCustomer: dataProfile.idCustomer,
        }}
        clientId={dataProfile.clientId}
        flowId={dataProfile.flowId}
        finishedProcess={() => {
          setIsVisibleVerification(false);
          onClickNext();
        }}
      />
      <div className="header-title">
        <h1>Verificación de identidad</h1>
      </div>
      <FormProperty>
        <div className="label-indicator">
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <span>Comenzaremos con la verificación de tu identidad</span>
              <br />
              <span>
                Para evitar errores en la información personal que aparecerá en
                el contrato de arrendamiento es necesario{" "}
                <strong>tener a la mano una identificación oficial</strong> y de
                ser necesario una selfie.
              </span>
            </Col>
          </Row>
        </div>
        <div className="type-property">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LoadSquare>
              <div className="load-border">
                <span></span>
                <span></span>
              </div>
              <div className="content-identity">
                <h1>Verificación</h1>
                <span>
                  Has clic en <strong>Verificarme</strong> para iniciar con tu
                  proceso de verificación de identidad
                </span>
                <div
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <ButtonContinue
                    onClick={() => {
                      setIsVisibleVerification(true);
                    }}
                  >
                    Verificarme
                  </ButtonContinue>
                </div>
              </div>
            </LoadSquare>
          </div>
        </div>
        <div className="next-back-buttons">
          <ButtonNextBackPage block={true} onClick={() => {}}>
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

export default SectionIdentity;
