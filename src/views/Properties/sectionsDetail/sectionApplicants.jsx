import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { Popconfirm } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import { IconTenant } from "../../../assets/iconSvg";
import ContextProperty from "../context/contextProperty";
import ComponentAddCandidate from "../component/componentAddCandidate";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import ENVIROMENT from "../../../utils/constants/enviroments";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import ComponentLoadSection from "../../../components/componentLoadSection";
import { GeneralCard } from "../constants/styleConstants";
import { ReactComponent as ArrowUp2 } from "../../../assets/iconSvg/svgFile/arrowUp2.svg";
import { ReactComponent as ArrowDown2 } from "../../../assets/iconSvg/svgFile/arrowDown2.svg";
import { useEffect } from "react";

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

const EmptyData = styled.div`
  width: 100%;
  height: 30em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    color: rgba(78, 75, 102, 0.45);
    font-weight: 700;
    text-align: center;
  }
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

const SectionApplicants = (props) => {
  const { idUserType, callGlobalActionApi, dataProfile } = props;
  const dataContexProperty = useContext(ContextProperty);
  const {
    dataDetail = {},
    getById,
    isOpenComponent,
    onCloseComponent,
  } = dataContexProperty;
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [toggleCard, setToggleCard] = useState(false);
  const { applicants, idApartment, idProperty, canInviteTenant } = dataDetail;

  const applicantsArray =
    isNil(applicants) === false && isEmpty(applicants) === false
      ? JSON.parse(applicants)
      : [];
  const [visibleAddUser, setVisibleAddUser] = useState(false);
  const frontFunctions = new FrontFunctions();

  const handlerCallSendTenantInvitation = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        idApartment,
        API_CONSTANTS.CUSTOMER.SEND_TENANT_INVITATION,
        "PUT"
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : {};
      frontFunctions.showMessageStatusApi(
        responseResult,
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
      getById();
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallSetApplicant = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          idApartment,
          ...data,
        },
        idProperty,
        API_CONSTANTS.CUSTOMER.SET_APPLICANT,
        "PUT"
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : {};
      frontFunctions.showMessageStatusApi(
        responseResult,
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
      getById();
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  useEffect(() => {
    if (isEmpty(applicants) === false) {
      const objectState = {};
      applicantsArray.forEach((element) => {
        objectState[element.prospectNo] = false;
      });
      setToggleCard(objectState);
    }
  }, [applicants]);

  return (
    <GeneralCard id="section-applicants">
      <ComponentAddCandidate
        isModalVisible={visibleAddUser || isOpenComponent === 1}
        sendInvitation={async (data) => {
          try {
            await handlerCallSendTenantInvitation(data);
            onCloseComponent();
          } catch (error) {
            throw error;
          }
        }}
        onClose={() => {
          setVisibleAddUser(false);
          onCloseComponent();
        }}
      />
      <div className="header-title">
        <h1>Prospectos</h1>
        {canInviteTenant === true && (
          <button
            id="section-applicants-add"
            onClick={() => {
              setVisibleAddUser(true);
            }}
            id="add-prospect"
          >
            Agregar
          </button>
        )}
      </div>
      <ComponentLoadSection isLoadApi={isLoadApi} position="absolute" text="">
        <div className="content-cards" id="user-applicants">
          {isEmpty(applicantsArray) === false &&
            applicantsArray.map((row, ix) => {
              return (
                <Card
                  id={`user-applicant-${
                    isNil(row.idCustomer) === false ? row.idCustomer : ix
                  }`}
                >
                  <div className="all-content-pre-info">
                    <CardStatus color={row.style}>
                      <div className="status-prospect">
                        <span>{row.applicantStatus}</span>
                      </div>
                    </CardStatus>
                    <div className="card-user">
                      <div className="top-info">
                        <div className="icon-info">
                          {isNil(row.idDocument) === false &&
                          isNil(row.bucketSource) === false ? (
                            <img
                              src={`${ENVIROMENT}/api/viewFile/${row.idDocument}/${row.bucketSource}`}
                            />
                          ) : (
                            <IconTenant size="100%" color="#4E4B66" />
                          )}
                          {isNil(row.score) === false && (
                            <div className="score">
                              <span>Score</span>
                              <strong>{row.score}</strong>
                            </div>
                          )}
                        </div>
                        <div className="name-info">
                          <h3>{row.fullName}</h3>
                          <u>{row.emailAddress}</u>
                          <span>{row.phoneNumber}</span>
                        </div>
                      </div>
                      {row.canProcessInvitation === false &&
                        row.canBeProcessed === true &&
                        toggleCard[row.prospectNo] === false && (
                          <div
                            className="button-action"
                            id={`user-applicant-canBeProcessed-${
                              isNil(row.idCustomer) === false
                                ? row.idCustomer
                                : ix
                            }`}
                          >
                            <Popconfirm
                              placement="left"
                              title="¿Estás seguro de rechazar a este prospecto?"
                              onConfirm={async () => {
                                try {
                                  setIsLoadApi(true);
                                  await handlerCallSetApplicant({
                                    idCustomer: row.idCustomer,
                                    idInvitation: row.idInvitation,
                                    isAccepted: false,
                                  });
                                  setIsLoadApi(false);
                                } catch (error) {
                                  setIsLoadApi(false);
                                  throw error;
                                }
                              }}
                              okText="Si"
                              cancelText="No"
                            >
                              <ButtonDocument onClick={() => {}}>
                                Rechazar
                              </ButtonDocument>
                            </Popconfirm>
                            <ButtonDocument
                              onClick={async () => {
                                try {
                                  setIsLoadApi(true);
                                  await handlerCallSetApplicant({
                                    idCustomer: row.idCustomer,
                                    idInvitation: row.idInvitation,
                                    isAccepted: true,
                                  });
                                  setIsLoadApi(false);
                                } catch (error) {
                                  setIsLoadApi(false);
                                  throw error;
                                }
                              }}
                            >
                              Aceptar
                            </ButtonDocument>
                          </div>
                        )}
                      {row.canProcessInvitation === true &&
                        toggleCard[row.prospectNo] === false && (
                          <div
                            className="button-action"
                            id={`user-applicant-canProcessInvitation-${
                              isNil(row.idCustomer) === false
                                ? row.idCustomer
                                : ix
                            }`}
                          >
                            <Popconfirm
                              placement="left"
                              title="¿Estás seguro de rechazar a este prospecto?"
                              onConfirm={async () => {
                                try {
                                  setIsLoadApi(true);
                                  await handlerCallSetApplicant({
                                    idCustomer: row.idCustomer,
                                    idInvitation: row.idInvitation,
                                    deleteInvitation: true,
                                  });
                                  setIsLoadApi(false);
                                } catch (error) {
                                  setIsLoadApi(false);
                                  throw error;
                                }
                              }}
                              okText="Si"
                              cancelText="No"
                            >
                              <ButtonDocument onClick={() => {}}>
                                Eliminar
                              </ButtonDocument>
                            </Popconfirm>
                            <ButtonDocument
                              onClick={async () => {
                                try {
                                  setIsLoadApi(true);
                                  await handlerCallSetApplicant({
                                    idCustomer: row.idCustomer,
                                    idInvitation: row.idInvitation,
                                    resendInvitation: true,
                                  });
                                  setIsLoadApi(false);
                                } catch (error) {
                                  setIsLoadApi(false);
                                  throw error;
                                }
                              }}
                            >
                              Reenviar
                            </ButtonDocument>
                          </div>
                        )}
                      <div className="toggle-card">
                        {toggleCard[row.prospectNo] === false ? (
                          <ArrowDown2
                            stroke="#200E32"
                            width="1.5em"
                            onClick={() => {
                              setToggleCard({
                                ...toggleCard,
                                [row.prospectNo]: !toggleCard[row.prospectNo],
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
                                [row.prospectNo]: !toggleCard[row.prospectNo],
                              });
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <ContentDetail visible={toggleCard[row.prospectNo]}>
                    {isNil(row.origin) === false && (
                      <p>
                        <span className="title-desc">Invitado por:</span>
                        <br />
                        <span className="value-desc">{row.origin}</span>
                      </p>
                    )}
                    {isNil(row.originService) === false && (
                      <p>
                        <span className="title-desc">Proceso:</span>
                        <br />
                        <span className="value-desc">{row.originService}</span>
                      </p>
                    )}
                    {isNil(row.originPolicy) === false && (
                      <p>
                        <span className="title-desc">Póliza Jurídica:</span>
                        <br />
                        <span className="value-desc">{row.originPolicy}</span>
                      </p>
                    )}
                    {isNil(row.originPolicyAmountFormat) === false && (
                      <p>
                        <span className="title-desc">Costo de póliza:</span>
                        <br />
                        <span className="value-desc">{row.originPolicyAmountFormat}</span>
                      </p>
                    )}
                    {isNil(row.originPolicyPymtMethod) === false && (
                      <p>
                        <span className="title-desc">Forma de pago de póliza:</span>
                        <br />
                        <span className="value-desc">{row.originPolicyPymtMethod}</span>
                      </p>
                    )}
                    <p>
                      <span className="title-desc">Descripción:</span>
                      <br />
                      <span className="value-desc">
                        {row.applicantStatusDes}
                      </span>
                    </p>
                    <p>
                      <span className="title-desc">Último cambio:</span>
                      <br />
                      <span className="value-desc">
                        {row.applicantStatusDesDate}
                      </span>
                    </p>
                    {row.canProcessInvitation === false &&
                      row.canBeProcessed === true &&
                      toggleCard[row.prospectNo] === true && (
                        <div
                          className="button-action"
                          id={`user-applicant-canBeProcessed-${
                            isNil(row.idCustomer) === false
                              ? row.idCustomer
                              : ix
                          }`}
                        >
                          <Popconfirm
                            placement="left"
                            title="¿Estás seguro de rechazar a este prospecto?"
                            onConfirm={async () => {
                              try {
                                setIsLoadApi(true);
                                await handlerCallSetApplicant({
                                  idCustomer: row.idCustomer,
                                  idInvitation: row.idInvitation,
                                  isAccepted: false,
                                });
                                setIsLoadApi(false);
                              } catch (error) {
                                setIsLoadApi(false);
                                throw error;
                              }
                            }}
                            okText="Si"
                            cancelText="No"
                          >
                            <ButtonDocument onClick={() => {}}>
                              Rechazar
                            </ButtonDocument>
                          </Popconfirm>
                          <ButtonDocument
                            onClick={async () => {
                              try {
                                setIsLoadApi(true);
                                await handlerCallSetApplicant({
                                  idCustomer: row.idCustomer,
                                  idInvitation: row.idInvitation,
                                  isAccepted: true,
                                });
                                setIsLoadApi(false);
                              } catch (error) {
                                setIsLoadApi(false);
                                throw error;
                              }
                            }}
                          >
                            Aceptar
                          </ButtonDocument>
                        </div>
                      )}
                    {row.canProcessInvitation === true &&
                      toggleCard[row.prospectNo] === true && (
                        <div
                          className="button-action"
                          id={`user-applicant-canProcessInvitation-${
                            isNil(row.idCustomer) === false
                              ? row.idCustomer
                              : ix
                          }`}
                        >
                          <Popconfirm
                            placement="left"
                            title="¿Estás seguro de rechazar a este prospecto?"
                            onConfirm={async () => {
                              try {
                                setIsLoadApi(true);
                                await handlerCallSetApplicant({
                                  idCustomer: row.idCustomer,
                                  idInvitation: row.idInvitation,
                                  deleteInvitation: true,
                                });
                                setIsLoadApi(false);
                              } catch (error) {
                                setIsLoadApi(false);
                                throw error;
                              }
                            }}
                            okText="Si"
                            cancelText="No"
                          >
                            <ButtonDocument onClick={() => {}}>
                              Eliminar
                            </ButtonDocument>
                          </Popconfirm>
                          <ButtonDocument
                            onClick={async () => {
                              try {
                                setIsLoadApi(true);
                                await handlerCallSetApplicant({
                                  idCustomer: row.idCustomer,
                                  idInvitation: row.idInvitation,
                                  resendInvitation: true,
                                });
                                setIsLoadApi(false);
                              } catch (error) {
                                setIsLoadApi(false);
                                throw error;
                              }
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
          {isEmpty(applicantsArray) === true && (
            <EmptyData>
              <img
                width="150"
                src="https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296R.png"
                alt=""
              />
              <p>No has invitado a algún inquilino</p>
            </EmptyData>
          )}
        </div>
      </ComponentLoadSection>
    </GeneralCard>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionApplicants);
