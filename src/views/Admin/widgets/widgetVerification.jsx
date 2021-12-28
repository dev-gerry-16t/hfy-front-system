import React, { useState } from "react";
import { Modal } from "antd";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";

const CardVerification = styled.div`
  display: grid;
  position: relative;
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

  @media screen and (max-width: 1320px) {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .info-verification {
      display: flex;
      flex-direction: column;
      gap: 15px;
      div {
      }
    }
  }
`;

const UserDuplicate = styled.div`
  position: absolute;
  right: 0;
  button {
    background: transparent;
    border: none;
    text-decoration: underline;
    color: var(--color-primary);
    font-weight: 600;
    font-size: 12px;
  }
  @media screen and (max-width: 1320px) {
    bottom: 0px;
  }
`;

const FormModalTable = styled.div`
  font-family: Poppins;
  h1 {
    font-size: 20px;
    font-weight: 600;
    color: var(--color-primary);
  }
  table {
    width: 100%;
    td,
    th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }
    tr:nth-child(even) {
      background-color: #dddddd;
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
    dataDuplicationUser,
  } = props;
  const styleVerification =
    isNil(matiVerificationStatusStyle) === false &&
    isEmpty(matiVerificationStatusStyle) === false
      ? JSON.parse(matiVerificationStatusStyle)
      : {};
  const [isOpenDuplicate, setIsOpenDuplicate] = useState(false);

  const handlerGetProperties = (data) => {
    const arrayInfoEvaluated = [];
    if (isEmpty(data) === false) {
      for (let key in data) {
        arrayInfoEvaluated.push({
          name: key,
          text: data[key],
        });
      }
    }
    return isEmpty(arrayInfoEvaluated) === false ? (
      <div>
        {arrayInfoEvaluated.map((row) => {
          return (
            <div>
              <strong>{row.name}:</strong> <span>{row.text}</span>
            </div>
          );
        })}
      </div>
    ) : (
      <div />
    );
  };
  return (
    <CardVerification>
      <Modal
        visible={isOpenDuplicate}
        closable={true}
        footer={false}
        style={{ top: 20 }}
        width={800}
        onCancel={() => {
          setIsOpenDuplicate(false);
        }}
      >
        <FormModalTable>
          <h1>Usuarios duplicados</h1>
          <table>
            <tr>
              <th>Nombre</th>
              <th>Información evaluada</th>
              <th>Tipo de usuario</th>
            </tr>
            {dataDuplicationUser.map((row) => {
              return (
                <tr>
                  <td>{row.fullName}</td>
                  <td>{handlerGetProperties(row.dataEvaluated)}</td>
                  <td>{row.customerType}</td>
                </tr>
              );
            })}
          </table>
        </FormModalTable>
      </Modal>

      {isEmpty(dataDuplicationUser) === false && (
        <UserDuplicate>
          <button
            onClick={() => {
              setIsOpenDuplicate(true);
            }}
          >
            Duplicados
          </button>
        </UserDuplicate>
      )}
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
