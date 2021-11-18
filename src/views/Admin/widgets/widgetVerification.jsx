import React from "react";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";

const CardVerification = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  background: #fff;
  height: 100%;
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  h1 {
    margin-top: 0.3em;
    margin-bottom: 0px;
    text-align: center;
    font-weight: 700;
  }
`;

const ContentVerification = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  .status-card {
    padding: 1em;
    .card {
      display: flex;
      border-radius: 0.8em;
      padding: 1em;
      justify-content: space-around;
      background: ${(props) => props.backGroundCard};
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;

        color: #232939;
        .fa {
          font-size: 1.2em;
        }
      }
    }
  }

  .info-verification {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    div {
      font-size: 0.8em;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`;

const WidgetVerification = (props) => {
  const {
    matiDashboardUrl,
    matiFinichedAt,
    matiStartedAt,
    matiVerificationNo,
    matiVerificationStatus,
    matiVerificationStatusStyle,
  } = props;
  const styleVerification =
    isNil(matiVerificationStatusStyle) === false &&
    isEmpty(matiVerificationStatusStyle) === false
      ? JSON.parse(matiVerificationStatusStyle)
      : {};
  return (
    <CardVerification>
      <h1>Verificación</h1>
      <ContentVerification backGroundCard={styleVerification.backgroundColor}>
        <div className="status-card">
          <div className="card">
            <div>
              <span>Estatus</span>
              <strong>{matiVerificationStatus}</strong>
            </div>
            <div>
              <i className={styleVerification.icon} alt="" />
            </div>
          </div>
        </div>
        <div className="info-verification">
          <div>
            <strong>{matiStartedAt}</strong>
            <span>Fecha de Inicio</span>
          </div>
          <div>
            <strong>{matiFinichedAt}</strong>
            <span>Fecha de Finalización</span>
          </div>
          <div>
            <strong>{matiVerificationNo}</strong>
            <span>Número de verificación</span>
          </div>
          <div>
            <a href={matiDashboardUrl} target="_blank">
              Dashboard Mati
            </a>
            <span>Más información</span>
          </div>
        </div>
      </ContentVerification>
    </CardVerification>
  );
};

export default WidgetVerification;
