import React, { useState, useEffect } from "react";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { IconTenant } from "../../../assets/iconSvg";
import { GeneralCard } from "../constants/styles";
import { ReactComponent as ArrowUp2 } from "../../../assets/iconSvg/svgFile/arrowUp2.svg";
import { ReactComponent as ArrowDown2 } from "../../../assets/iconSvg/svgFile/arrowDown2.svg";
import { IconEditSquare } from "../../../assets/iconSvg";
import ComponentLoadSection from "../../../components/componentLoadSection";
import ComponentDetailUser from "../components/componentDetailUser";

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
    position: relative;
    display: flex;
    .button-edit-involved {
      position: absolute;
      background: transparent;
      border: none;
      right: 0px;
      top: 5px;
    }
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
      : props.load === 100
      ? `linear-gradient(90deg,#ff0282 0%,rgba(255, 2, 130, 0.58) ${props.load}%,rgba(255, 2, 130, 0) ${props.load}%);`
      : `linear-gradient(90deg,#ff0282 0%,rgba(255, 2, 130, 0.58) ${
          props.load / 2
        }%,rgba(255, 2, 130, 0) ${props.load}%);`};
  border-radius: 20px;
  padding: 0.2em 0.5em;
  span {
    font-size: 12px !important;
    color:  ${(props) => (props.load === 0 ? "#000" : "#fff!important")};
  }
`;

let channel = null;
let intervalWindow = null;

const CardInvolved = ({
  row,
  ix,
  idRequest,
  onGetDetail,
  onResend,
  onViewDetail,
}) => {
  const [toggleCard, setToggleCard] = useState(false);
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [messageLoad, setMessageLoad] = useState("En formulario");

  const handlerOnClickForm = (path) => {
    setIsLoadApi(true);
    const channelName = "form_users_contract";
    channel = new BroadcastChannel(channelName);
    const openForm = window.open(path, "_blank");

    intervalWindow = setInterval(() => {
      if (openForm.closed === true) {
        setIsLoadApi(false);
        channel.close();
        clearInterval(intervalWindow);
        onGetDetail();
      }
    }, 2000);

    channel.onmessage = (message) => {
      if (message.data === "close_form_contract") {
        clearInterval(intervalWindow);
        openForm.close();
        onGetDetail();
        setTimeout(() => {
          setIsLoadApi(false);
        }, 1500);
      }
    };
  };

  useEffect(() => {
    return () => {
      if (isNil(channel) === false && isNil(intervalWindow) === false) {
        clearInterval(intervalWindow);
        channel.close();
      }
    };
  }, []);

  return (
    <Card>
      <ComponentLoadSection
        isLoadApi={isLoadApi}
        text={messageLoad}
        position="absolute"
      >
        <div className="all-content-pre-info">
          <button
            className="button-edit-involved"
            onClick={async () => {
              onViewDetail(row);
            }}
          >
            <IconEditSquare color="var(--color-primary)" size="16px" />
          </button>
          <CardStatus color={row.idCustomerType === 1 ? "#46E6FD" : "#F3BF3A"}>
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
              <p>
                <LoadingProcess load={row.percentDataCompleted}>
                  <span>Formulario al {row.percentDataCompleted}%</span>
                </LoadingProcess>
              </p>
              </div>
            </div>
            {toggleCard === false && (
              <div
                className="button-action"
                id={`user-applicant-canProcessInvitation-${
                  isNil(row.idCustomer) === false ? row.idCustomer : ix
                }`}
              >
                <ButtonDocument
                  onClick={() => {
                    setMessageLoad("En formulario");
                    handlerOnClickForm(
                      `/formUser/${idRequest}/${row.idUserInRequest}/${row.idCustomerType}`
                    );
                  }}
                >
                  Formulario
                </ButtonDocument>
                {row.canRequireResend === true && (
                  <ButtonDocument
                    onClick={async () => {
                      const {
                        idUserInRequest,
                        idCustomerType,
                        idPersonType,
                        givenName,
                        lastName,
                        mothersMaidenName,
                        idCountryNationality,
                        emailAddress,
                        idCountryPhoneNumber,
                        idPhoneType,
                        phoneNumber,
                        isInfoProvidedByRequester,
                        requiresVerification,
                        isActive,
                      } = row;
                      try {
                        setMessageLoad("Reenviando");
                        setIsLoadApi(true);
                        await onResend({
                          idUserInRequest,
                          idCustomerType,
                          idPersonType,
                          givenName,
                          lastName,
                          mothersMaidenName,
                          idCountryNationality,
                          emailAddress,
                          idCountryPhoneNumber,
                          idPhoneType,
                          phoneNumber,
                          isInfoProvidedByRequester,
                          requiresVerification,
                          isActive,
                          requiresResend: true,
                        });
                        setIsLoadApi(false);
                      } catch (error) {
                        setIsLoadApi(false);
                      }
                    }}
                  >
                    Reenviar
                  </ButtonDocument>
                )}
              </div>
            )}
            <div className="toggle-card">
              {toggleCard === false ? (
                <ArrowDown2
                  stroke="#200E32"
                  width="1.5em"
                  onClick={() => {
                    setToggleCard(!toggleCard);
                  }}
                />
              ) : (
                <ArrowUp2
                  stroke="#200E32"
                  width="1.5em"
                  onClick={() => {
                    setToggleCard(!toggleCard);
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <ContentDetail visible={toggleCard}>
          <p>
            <span className="title-desc">Tipo de persona:</span>
            <br />
            <span className="value-desc">{row.personType}</span>
          </p>
          <p>
            <span className="title-desc">Ingreso de información:</span>
            <br />
            <span className="value-desc">
              {row.isInfoProvidedByRequester === true
                ? "Elegiste ingresar la información"
                : "Elegiste enviar formulario al usuario"}
            </span>
          </p>
          <p>
            <span className="title-desc">Información:</span>
            <br />
            <span className="value-desc">
              {row.isConfirmed === true ? "Confirmada" : "Sin confirmar"}
            </span>
          </p>
          <p>
            <span className="title-desc">Estatus de correo enviado:</span>
            <br />
            <span className="value-desc">{row.emailStatus}</span>
          </p>
          {toggleCard === true && (
            <div
              className="button-action"
              id={`user-applicant-canProcessInvitation-${
                isNil(row.idCustomer) === false ? row.idCustomer : ix
              }`}
            >
              <ButtonDocument
                onClick={() => {
                  setMessageLoad("En formulario");
                  handlerOnClickForm(
                    `/formUser/${idRequest}/${row.idUserInRequest}/${row.idCustomerType}`
                  );
                }}
              >
                Formulario
              </ButtonDocument>
              {row.canRequireResend === true && (
                <ButtonDocument
                  onClick={async () => {
                    const {
                      idUserInRequest,
                      idCustomerType,
                      idPersonType,
                      givenName,
                      lastName,
                      mothersMaidenName,
                      idCountryNationality,
                      emailAddress,
                      idCountryPhoneNumber,
                      idPhoneType,
                      phoneNumber,
                      isInfoProvidedByRequester,
                      requiresVerification,
                      isActive,
                    } = row;
                    try {
                      setMessageLoad("Reenviando");
                      setIsLoadApi(true);
                      await onResend({
                        idUserInRequest,
                        idCustomerType,
                        idPersonType,
                        givenName,
                        lastName,
                        mothersMaidenName,
                        idCountryNationality,
                        emailAddress,
                        idCountryPhoneNumber,
                        idPhoneType,
                        phoneNumber,
                        isInfoProvidedByRequester,
                        requiresVerification,
                        isActive,
                        requiresResend: true,
                      });
                      setIsLoadApi(false);
                    } catch (error) {
                      setIsLoadApi(false);
                    }
                  }}
                >
                  Reenviar
                </ButtonDocument>
              )}
            </div>
          )}
        </ContentDetail>
      </ComponentLoadSection>
    </Card>
  );
};

const SectionInvolved = ({
  dataInvolved,
  idRequest,
  onGetDetail,
  onResend,
  onSaveInfo,
  dataFee,
  dataRequest,
}) => {
  const [isVisibleEdit, setIsVisibleEdit] = useState(false);
  const [dataDetail, setDataDetail] = useState({});

  return (
    <GeneralCard>
      <ComponentDetailUser
        visibleDialog={isVisibleEdit}
        dataInfoRequest={dataDetail}
        dataRequest={dataRequest}
        onSaveInfo={async (data) => {
          await onSaveInfo(data);
          setDataDetail({});
          setIsVisibleEdit(false);
        }}
        dataFee={dataFee}
        onClose={() => {
          setDataDetail({});
          setIsVisibleEdit(false);
        }}
      />
      <div className="header-title">
        <h1>Involucrados</h1>
      </div>
      <div className="content-cards">
        {isEmpty(dataInvolved) === false &&
          dataInvolved.map((row, ix) => {
            return (
              <CardInvolved
                idRequest={idRequest}
                row={row}
                ix={ix}
                onGetDetail={onGetDetail}
                onResend={onResend}
                onViewDetail={() => {
                  setDataDetail(row);
                  setIsVisibleEdit(true);
                }}
              />
            );
          })}
      </div>
    </GeneralCard>
  );
};

export default SectionInvolved;
