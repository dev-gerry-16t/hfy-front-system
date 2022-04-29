import React, { useState, useEffect } from "react";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { IconTenant } from "../../../assets/iconSvg";
import { GeneralCard } from "../constants/styles";
import { ReactComponent as ArrowUp2 } from "../../../assets/iconSvg/svgFile/arrowUp2.svg";
import { ReactComponent as ArrowDown2 } from "../../../assets/iconSvg/svgFile/arrowDown2.svg";

const CardStatus = styled.div`
  position: relative;
  background: ${(props) =>
    isNil(props.color) === false ? props.color : "#A0A3BD"};
  width: 16px;
  border-radius: 4px 0px 0px 0px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  .status-prospect {
    position: absolute;
    transform: rotate(-90deg);
    width: 150px;
    left: -68px;
    display: flex;
    justify-content: center;
    span {
      font-weight: 700;
      color: #fff;
      font-size: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const Card = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 4px;
  .all-content-pre-info {
    display: flex;
  }
  .card-document {
    padding: 1em;
    .top-info {
      display: flex;
      .icon-info {
        width: 43px;
        height: 42px;
        background: ${(props) => props.colorDocument};
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
      }
      .name-info {
        font-size: 0.9em;
        line-height: 1.4em;
        max-width: 192px;
        h3 {
          margin: 0px;
        }
        span {
          color: var(--color-primary);
        }
      }
    }
    .button-action {
      display: flex;
      justify-content: flex-end;
    }
  }

  .card-user {
    padding: 1em 1em 0px 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    .top-info {
      display: flex;
      .icon-info {
        width: 60px;
        height: 60px;
        background: #eff0f6;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        border-radius: 5px;
        position: relative;
        img {
          width: 60px;
          height: 60px;
          object-fit: contain;
          border-radius: 5px;
        }
        .score {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--color-primary);
          top: 4em;
          left: 4em;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 0.6em;
          color: #fff;
          span {
            font-weight: 300;
          }
        }
      }
      .name-info {
        font-size: 0.9em;
        line-height: 1.4em;
        max-width: 192px;
        display: flex;
        flex-direction: column;
        h3 {
          margin: 0px;
          font-weight: 800;
        }
        u {
          color: #4e4b66;
          margin-top: 5px;
        }
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 5px;
          color: #000;
          font-weight: 500;
        }
      }
    }
    .button-action {
      display: flex;
      justify-content: center;
    }
    .toggle-card {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 10px 0px;
      svg {
        cursor: pointer;
      }
    }
  }
`;

const ButtonDocument = styled.button`
  border: none;
  background: ${(props) =>
    props.primary ? "var(--color-primary)" : "transparent"};
  color: ${(props) => (props.primary ? "#fff" : "var(--color-primary)")};
  text-decoration: ${(props) => (props.primary ? "" : "underline")};
  font-weight: 600;
  border-radius: 1em;
  padding: 0px 1em;
`;
const ContentDetail = styled.div`
  max-height: ${(props) => (props.visible === true ? "500px" : "0px")};
  overflow: hidden;
  font-size: 12px;
  padding: ${(props) => (props.visible === true ? "15px 25px" : "0px")};
  border-top: 0.3px solid #bdbdbd;
  transition: all 0.4s ease-in-out;
  .title-desc {
    color: var(--color-primary);
  }
  .value-desc {
    color: #000;
    font-weight: 500;
  }
  .button-action {
    display: flex;
    justify-content: center;
  }
`;

const LoadingProcess = styled.div`
  background: ${(props) =>
    props.load === 0
      ? `linear-gradient(90deg,#ff0282 0%,rgba(255, 2, 130, 0.58) 0%,rgba(255, 2, 130, 0) 0%);`
      : `linear-gradient(90deg,#ff0282 0%,rgba(255, 2, 130, 0.58) ${
          props.load / 2
        }%,rgba(255, 2, 130, 0) ${props.load}%);`} 
  border-radius: 20px;
  padding: 0.5em;
  span {
    color:  ${(props) => (props.load === 0 ? "#000" : "#fff")};
  }
`;

const SectionInvolved = ({ dataInvolved }) => {
  const [toggleCard, setToggleCard] = useState({});

  useEffect(() => {
    if (isEmpty(dataInvolved) === false) {
      const objectState = {};
      dataInvolved.forEach((element) => {
        objectState[element.idUserInRequest] = false;
      });
      setToggleCard(objectState);
    }
  }, [dataInvolved]);

  return (
    <GeneralCard>
      <div className="header-title">
        <h1>Involucrados</h1>
      </div>
      <div className="content-cards">
        {isEmpty(dataInvolved) === false &&
          dataInvolved.map((row, ix) => {
            return (
              <Card>
                <div className="all-content-pre-info">
                  <CardStatus
                    color={row.idCustomerType === 1 ? "#46E6FD" : "#F3BF3A"}
                  >
                    <div className="status-prospect">
                      <span>{row.customerType}</span>
                    </div>
                  </CardStatus>
                  <div className="card-user">
                    <div className="top-info">
                      <div className="icon-info">
                        <IconTenant size="100%" color="#4E4B66" />
                        <div className="score">
                          <span>Score</span>
                          <strong>N/A</strong>
                        </div>
                      </div>
                      <div className="name-info">
                        <h3>{row.fullName}</h3>
                        <u>{row.emailAddress}</u>
                        <span>{row.phoneNumber}</span>
                      </div>
                    </div>
                    {toggleCard[row.idUserInRequest] === false && (
                      <div
                        className="button-action"
                        id={`user-applicant-canProcessInvitation-${
                          isNil(row.idCustomer) === false ? row.idCustomer : ix
                        }`}
                      >
                        <ButtonDocument onClick={() => {}}>
                          Eliminar
                        </ButtonDocument>
                        <ButtonDocument
                          onClick={async () => {
                            try {
                            } catch (error) {}
                          }}
                        >
                          Reenviar
                        </ButtonDocument>
                      </div>
                    )}
                    <div className="toggle-card">
                      {toggleCard[row.idUserInRequest] === false ? (
                        <ArrowDown2
                          stroke="#200E32"
                          width="1.5em"
                          onClick={() => {
                            setToggleCard({
                              ...toggleCard,
                              [row.idUserInRequest]:
                                !toggleCard[row.idUserInRequest],
                            });
                          }}
                        />
                      ) : (
                        <ArrowUp2
                          stroke="#200E32"
                          width="1.5em"
                          onClick={() => {
                            setToggleCard({
                              ...toggleCard,
                              [row.idUserInRequest]:
                                !toggleCard[row.idUserInRequest],
                            });
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <ContentDetail visible={toggleCard[row.idUserInRequest]}>
                  <p>
                    <span className="title-desc">Tipo de persona:</span>
                    <br />
                    <span className="value-desc">{row.personType}</span>
                  </p>
                  <p>
                    <span className="title-desc">
                      Estatus de correo enviado:
                    </span>
                    <br />
                    <span className="value-desc">{row.emailStatus}</span>
                  </p>
                  <p>
                    <strong>Proceso al:</strong>
                    <LoadingProcess load={row.percentDataCompleted}>
                      <span>{row.percentDataCompleted}%</span>
                    </LoadingProcess>
                  </p>

                  {toggleCard[row.idUserInRequest] === true && (
                    <div
                      className="button-action"
                      id={`user-applicant-canProcessInvitation-${
                        isNil(row.idCustomer) === false ? row.idCustomer : ix
                      }`}
                    >
                      <ButtonDocument onClick={() => {}}>
                        Eliminar
                      </ButtonDocument>
                      <ButtonDocument
                        onClick={async () => {
                          try {
                          } catch (error) {}
                        }}
                      >
                        Reenviar
                      </ButtonDocument>
                    </div>
                  )}
                </ContentDetail>
              </Card>
            );
          })}
      </div>
    </GeneralCard>
  );
};

export default SectionInvolved;
