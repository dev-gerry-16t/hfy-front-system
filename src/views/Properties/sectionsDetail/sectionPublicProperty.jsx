import React from "react";
import styled from "styled-components";
import {
  IconBed,
  IconAgreement,
  IconSpeakChat,
  IconTenant,
} from "../../../assets/iconSvg";
import {
  ContentForm,
  LineSeparator,
  FormProperty,
  ButtonNextBackPage,
  Container,
} from "../constants/styleConstants";

const ContentPublicProperty = styled(Container)`
  margin-top: 1em;
  padding: 3em 0px;
`;

const ButtonAction = styled.button`
  border: none;
  background: #fff;
  border-radius: 1em;
  box-shadow: 0px 1px 8px 6px #ebebf1;
  width: 92.89px;
  height: 79.49px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoticeProperty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #4e4b66;
  h1 {
    font-weight: 600;
  }
  .section-select-option {
    margin-top: 2em;
    display: flex;
    justify-content: center;
    gap: 4em;
    .option-select {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        font-size: 0.8em;
        margin-bottom: 10px;
      }
    }
  }
`;

const SectionCandidate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-weight: bold;
    color: var(--color-primary);
  }
  .info-user-select {
    display: flex;
    gap: 2em;
    color: #4e4b66;
    margin-top: 3em;
    .score-user {
      position: absolute;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: var(--color-primary);
      bottom: 15px;
      right: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 0.8em;
      color: #fff;
      span{
        font-weight: 300;
      }
    }
    .image-user {
      position: relative;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      overflow: hidden;
    }
    .info {
      margin-bottom: 15px;
    }
    .status-user {
      margin-top: 10px;
      font-size: 0.8em;
      color: var(--color-primary);
    }
  }
`;

const SectionPublicProperty = () => {
  return (
    <ContentPublicProperty>
      {/* <NoticeProperty>
        <h1>Ayuda a un inquilino a encontrar su nuevo hogar</h1>
        <div className="section-select-option">
          <div className="option-select">
            <span>Ya tengo un candidato</span>
            <ButtonAction>
              <IconAgreement size="51px" color="##4E4B66" />
            </ButtonAction>
          </div>
          <div className="option-select">
            <span>Quiero publicar el inmueble</span>
            <ButtonAction>
              <IconSpeakChat size="51px" color="##4E4B66" />
            </ButtonAction>
          </div>
        </div>
      </NoticeProperty> */}
      <SectionCandidate>
        <h1>Datos de candidato</h1>
        <div className="info-user-select">
          <div
            style={{
              position: "relative",
            }}
          >
            <div className="image-user">
              <IconTenant size="100%" color="#4E4B66" />
            </div>
            <div className="score-user">
              <span>Score</span>
              <strong>4.3</strong>
            </div>
          </div>
          <div>
            <div className="info">
              <strong>Nombre:</strong>{" "}
              <span>Juan Ignacio Covarruvias Ruiz</span>
            </div>
            <div className="info">
              <strong>Correo:</strong> <span>juan@correo.com</span>
            </div>
            <div className="info">
              <strong>Teléfono:</strong> <span>5562100512</span>
            </div>
            <div className="info">
              <strong>Ocupación:</strong> <span>Arquitecto</span>
            </div>
            <div className="status-user">Solicitud pendiente de aceptación</div>
          </div>
        </div>
      </SectionCandidate>
      {/* <SectionCandidate>
        <h1>Inmueble publicado en:</h1>
        <div className="info-user-select">
          <div className="app-list">
            <img width="100px" src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296D.png" alt="homify" />
          </div>
          <div>
            <div className="info">
              <strong>Titulo:</strong> <span>Zona el Mirador</span>
            </div>
            <div className="info">
              <strong>Descripcion:</strong> <span>El Marquez Queretaro</span>
            </div>
          </div>
        </div>
      </SectionCandidate> */}
    </ContentPublicProperty>
  );
};

export default SectionPublicProperty;
