import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import ENVIROMENT from "../../utils/constants/enviroments";
import FrontFunctions from "../../utils/actions/frontFunctions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import { callGlobalActionApi } from "../../utils/actions/actions";
import { ReactComponent as ArrowPromotion } from "../../assets/iconSvg/svgFile/arrowPromotion.svg";
import { ReactComponent as IconPaymentCheck } from "../../assets/iconSvg/svgFile/iconPaymentCheck.svg";
import { ReactComponent as IconPaymentTimes } from "../../assets/iconSvg/svgFile/iconPaymentTimes.svg";
import { ReactComponent as IconMinCheck } from "../../assets/iconSvg/svgFile/iconMinCheck.svg";
import ComponentLoadSection from "../../components/componentLoadSection";
import SectionConfirmChangeSubscription from "./sections/sectionConfirmChangeSubscription";
import { DetailInfoSubscription, Circle } from "./constants/styleConstants";
import SectionConfirmCancelAcceptSubscription from "./sections/sectionConfirmCancelAcceptSubscription";

const Content = styled.div`
  overflow-y: scroll;
  font-size: 16px;
  font-family: Poppins;
  padding: 1em;
  letter-spacing: 0.75px;
  @media screen and (max-width: 900px) {
    font-size: 14px;
  }
  @media screen and (max-width: 420px) {
    padding: 1em 5px;
  }
  @media screen and (max-width: 360px) {
    font-size: 12px;
  }
`;

const ContentForm = styled.div`
  background: #fff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 0.5em;
  padding-bottom: 0.3em;
  margin-bottom: 2em;
  position: relative;
  .select-subscription {
    position: relative;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .offert-subscription {
      margin-top: 10px;
      span {
        color: var(--color-primary);
        font-size: 12px;
      }
    }
  }
  .catalog-subscription {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-bottom: 1em;
    gap: 1em;
  }
  .back-button {
    position: absolute;
    button {
      background: transparent;
      border: none;
    }
  }
  .header-title {
    padding: ${(props) => (props.owner ? "1em 1em" : "1em 6em")};
    border-bottom: 0.5px solid #4e4b66;
    display: flex;
    justify-content: space-between;
    .comision {
      span {
        padding: 0.5em;
        border: 1px solid var(--color-primary);
        border-radius: 7px;
        font-weight: 400;
        color: var(--color-primary);
      }
    }
    h1 {
      margin: 0;
      color: #4e4b66;
      font-weight: 700;
    }
  }
  @media screen and (max-width: 1004px) {
    .header-title {
      padding: 1em 1em;
    }
  }
  @media screen and (max-width: 560px) {
    .header-title {
      flex-direction: column;
      align-items: center;
      .comision {
        margin-top: 10px;
      }
    }
  }
`;

const PaidService = styled.div`
  padding: 2em 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    color: #4e4b66;
    font-size: 24px;
    font-weight: 800;
    span {
      color: var(--color-primary);
    }
  }
  h2 {
    color: #4e4b66;
    margin: 20px 0px;
    font-size: 18px;
    font-weight: 600;
  }
  span {
    color: #4e4b66;
  }
  .button-payment {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    button {
      width: 250px;
      border-radius: 16px;
      padding: 3px 0px;
      background: var(--color-primary);
      border: none;
      color: #fff;
      font-weight: 600;
    }
  }

  .label-success-pay {
    text-align: center;
  }
`;

const ToggleSubscription = styled.div`
  border: 1px solid var(--color-primary);
  width: 13em;
  height: 2.5em;
  border-radius: 2em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  .type-subscription {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: #6e7191;
      font-weight: 500;
    }
  }
`;

const NoticePolicy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #4e4b66;
  margin-top: 2em;
  h1 {
    font-weight: 600;
  }
`;

const Toggle = styled.div`
  cursor: pointer;
  border: none;
  position: absolute;
  width: 6.5em;
  height: 2.3em;
  border-radius: 2em;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2em;
  top: 0px;
  left: ${(props) => (props.mode === 1 ? "0px" : "6.4em")};
  box-shadow: ${(props) =>
    props.mode === 1
      ? "1px 4px 4px rgba(0, 0, 0, 0.25)"
      : "-1px 4px 4px rgba(0, 0, 0, 0.25)"};
  transition: all 0.2s ease-in;
  span {
    color: var(--color-primary);
    font-weight: 600;
  }
`;

const CardSubscription = styled.div`
  display: flex;
  width: 245px;
  height: fit-content;
  flex-direction: column;
  border-top: 5px solid var(--color-primary);
  background: #ffffff;
  box-shadow: 0px 1px 8px 6px #ebebf1;
  border-radius: 16px;
  align-items: center;
  padding: 1em 0px;
  gap: 1em;
  h1 {
    font-weight: 900;
    color: #0a3949;
  }
  P {
    text-align: center;
    font-weight: 500;
    color: #200e32;
  }
  .price-subscription {
    display: flex;
    align-items: center;
    h1 {
      color: var(--color-primary);
      font-size: 1.2em;
      margin: 0px;
    }
    span {
      color: var(--color-primary);
    }
  }
  .button-actions {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    font-size: 0.8em;
    .view-info {
      border: none;
      background: transparent;
      text-decoration: underline;
      color: #4e4b66;
    }
  }
`;

const ButtonSelect = styled.button`
  border: ${(props) =>
    props.select === false ? "1px solid var(--color-primary)" : "none"};
  background: ${(props) =>
    props.select === false ? "#fff" : "var(--color-primary)"};
  color: ${(props) =>
    props.select === false ? "var(--color-primary)" : "#fff"};
  border-radius: 1em;
  width: 12.375em;
  font-weight: 600;
`;

const DetailSubscription = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 8px;
  border-top: 5px solid #4e4b66;
  font-size: 12px;
  .info-general-subscription {
    display: grid;
    grid-template-columns: 2fr 3fr 2fr;
    padding: 10px 15px;
    .info-subscription {
      .data-info-subscription {
        display: flex;
        flex-wrap: wrap;
        column-gap: 5px;
        .type-plan {
          color: var(--color-primary);
        }
        .price-detail {
          font-weight: 600;
          color: #6e7191;
        }
      }
      .button-action {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;

        .secondary-button {
          border-radius: 1em;
          border: 1px solid var(--color-primary);
          background: #fff;
          color: var(--color-primary);
          font-weight: 600;
        }
        .primary-button {
          border-radius: 1em;
          padding: 5px 1em;
          border: 1px solid var(--color-primary);
          background: var(--color-primary);
          color: #fff;
          font-size: 1.3em;
          font-weight: 600;
        }
      }
    }
  }

  @media screen and (max-width: 538px) {
    .info-general-subscription {
      grid-template-columns: 1fr;
      .info-subscription {
        .data-info-subscription {
          justify-content: space-between;
        }
      }
    }
  }
`;

const Subscription = (props) => {
  const {
    callGlobalActionApi,
    dataProfile,
    match,
    dataUserRedirect,
    history,
    onGetSubscription,
  } = props;
  const [dataSubscription, setDataSubscription] = useState([]);
  const [dataSelectSubscription, setDataSelectSubscription] = useState({});
  const [isOpenCancelAcSubscription, setIsOpenCancelAcSubscription] = useState({
    title: "",
    subTitle: "",
    isOpen: false,
    reactive: null,
  });
  const [isOpenConfChangeSubscription, setIsOpenConfChangeSubscription] =
    useState(false);
  const [detailSubscription, setDetailSubscription] = useState({});
  const [subscriptionMethod, setSubscriptionMethod] = useState(1);
  const [statusSubscription, setStatusSubscription] = useState(null);
  const [loadApi, setLoadApi] = useState(false);
  const frontFunctions = new FrontFunctions();

  const handlerCallGetAllSubscriptionTypes = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          idMethod: id,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_ALL_SUBSCRIPTION_TYPES
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      setDataSubscription(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallCancelSubscription = async (data) => {
    const { fullName, email, userType } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          name: fullName,
          email,
          userType,
          reason: "",
          comment: "",
          ...data,
        },
        null,
        API_CONSTANTS.PROPERTY.CANCEL_SUBSCRIPTION
      );
      const message =
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : "";
      frontFunctions.showMessageStatusApi(
        isEmpty(message) === false
          ? message
          : "Se ejecutó correctamente la solicitud",
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetSuscriptionDetail = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.PROPERTY.GET_SUSCRIPTION_DETAIL
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false &&
        isNil(response.response[0]) === false &&
        isEmpty(response.response[0]) === false &&
        isNil(response.response[0][0]) === false &&
        isEmpty(response.response[0][0]) === false
          ? response.response[0][0]
          : [];
      setDetailSubscription(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallSetSubscription = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          ...data,
          idLoginHistory,
        },
        idSystemUser,
        API_CONSTANTS.PROPERTY.SET_SUBSCRIPTION,
        "PUT"
      );
      const urlRedirect =
        isNil(response.response) === false &&
        isNil(response.response.url) === false
          ? response.response.url
          : "";
      const message =
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : "";
      if (isEmpty(urlRedirect) === false) {
        window.location.href = urlRedirect;
      }
      if (
        message !== "C0" &&
        message !== "C1" &&
        message !== "C2" &&
        message !== "C3"
      ) {
        frontFunctions.showMessageStatusApi(
          isEmpty(message) === false
            ? message
            : "Se ejecutó correctamente la solicitud",
          GLOBAL_CONSTANTS.STATUS_API.SUCCESS
        );
        return false;
      }
      return message;
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerGetDetailInformation = () => {
    handlerCallGetAllSubscriptionTypes(subscriptionMethod);
    handlerCallGetSuscriptionDetail();
  };

  useEffect(() => {
    const { params } = match;
    if (params.status === "cancel") {
      setStatusSubscription("cancel");
    } else if (isEmpty(params.status) === false) {
      setStatusSubscription("success");
    } else {
      setStatusSubscription(null);
    }
    handlerGetDetailInformation();
  }, []);

  return (
    <Content>
      <ComponentLoadSection isLoadApi={loadApi}>
        <SectionConfirmCancelAcceptSubscription
          onCancel={() => {
            setIsOpenCancelAcSubscription({
              title: "",
              subTitle: "",
              isOpen: false,
              reactive: null,
            });
          }}
          onAccept={async () => {
            try {
              setLoadApi(true);
              await handlerCallCancelSubscription({
                idSubscription: detailSubscription.id,
                cancel_at: detailSubscription.cancel_at,
                reactive: null,
              });
              setIsOpenCancelAcSubscription({
                title: "",
                subTitle: "",
                isOpen: false,
                reactive: null,
              });
              setTimeout(() => {
                handlerGetDetailInformation();
                onGetSubscription();
                setLoadApi(false);
              }, 5000);
            } catch (error) {
              setLoadApi(false);
            }
          }}
          onclose={() => {
            setIsOpenCancelAcSubscription({
              title: "",
              subTitle: "",
              isOpen: false,
              reactive: null,
            });
          }}
          isVisibleModal={isOpenCancelAcSubscription.isOpen}
          title={isOpenCancelAcSubscription.title}
          subTitleMessage={isOpenCancelAcSubscription.subTitle}
        />
        <SectionConfirmChangeSubscription
          onCancel={() => {
            setIsOpenConfChangeSubscription(false);
            setDataSelectSubscription({});
          }}
          onAccept={async () => {
            try {
              setIsOpenConfChangeSubscription(false);
              setLoadApi(true);
              await handlerCallSetSubscription({
                ...dataSelectSubscription,
              });
              handlerGetDetailInformation();
              setStatusSubscription("success");
              onGetSubscription();
              setLoadApi(false);
              setDataSelectSubscription({});
            } catch (error) {}
          }}
          onclose={() => {
            setIsOpenConfChangeSubscription(false);
            setDataSelectSubscription({});
          }}
          isVisibleModal={isOpenConfChangeSubscription}
          dataDetail={dataSelectSubscription}
        />
        <ContentForm>
          {statusSubscription === "cancel" && (
            <PaidService>
              <h1>
                Suscripción <span>Fallida</span>
              </h1>
              <IconPaymentTimes />
              <h2>¡Oh no!</h2>
              <span className="label-success-pay">
                No se pudo realizar la suscripción, intentalo más tarde o
                contáctanos por el chat.
              </span>
              <div className="button-payment">
                <button
                  onClick={() => {
                    setStatusSubscription(null);
                  }}
                >
                  Continuar
                </button>
              </div>
            </PaidService>
          )}
          {statusSubscription === "success" && (
            <PaidService>
              <h1>
                Suscripción <span>Exitosa</span>
              </h1>
              <IconPaymentCheck />
              <h2>¡Felicidades!</h2>
              <span className="label-success-pay">
                Ya puedes disfrutar los beneficios de tu paquete.
              </span>
              <div className="button-payment">
                <button
                  onClick={() => {
                    if (isNil(dataUserRedirect) === false) {
                      history.push(dataUserRedirect.backPathOfSubscription);
                    } else {
                      history.push(dataProfile.path);
                    }
                    setStatusSubscription(null);
                  }}
                >
                  Continuar
                </button>
              </div>
            </PaidService>
          )}
          {isNil(statusSubscription) === true && (
            <>
              <div className="header-title">
                <h1>Selecciona tu paquete</h1>
              </div>
              <div
                style={{
                  padding: "0px 1em",
                  marginTop: "1em",
                }}
              >
                {isEmpty(detailSubscription) === false &&
                  isNil(detailSubscription.subscriptionType) === false &&
                  isEmpty(detailSubscription.subscriptionType) === false && (
                    <DetailSubscription>
                      <div className="info-general-subscription">
                        <div className="info-subscription">
                          <div className="data-info-subscription">
                            <strong>Paquete actual: </strong>
                            <strong className="type-plan">
                              {detailSubscription.subscriptionType}
                            </strong>
                          </div>
                          <div className="data-info-subscription">
                            <span>Costo: </span>
                            <span className="price-detail">
                              {detailSubscription.subscriptionAmount}
                            </span>
                          </div>
                        </div>
                        <div className="info-subscription">
                          <div className="data-info-subscription">
                            <span>Activo desde: </span>
                            <span className="price-detail">
                              {detailSubscription.activeSince}
                            </span>
                          </div>
                          <div className="data-info-subscription">
                            <span>Próximo pago: </span>
                            <span className="price-detail">
                              {detailSubscription.nextPymtScheduleAt}
                            </span>
                          </div>
                        </div>
                        <div className="info-subscription">
                          {detailSubscription.canBeCanceled === true && (
                            <div className="button-action">
                              <button
                                className="secondary-button"
                                onClick={() => {
                                  setIsOpenCancelAcSubscription({
                                    title: "Cancelación de suscripción",
                                    subTitle:
                                      "Si cancelas ahora mantendremos todos tus beneficios hasta el termino de tu suscripción y después de ello pasarás a una suscripción gratuita.",
                                    isOpen: true,
                                    reactive: null,
                                  });
                                }}
                              >
                                Cancelar suscripción
                              </button>
                            </div>
                          )}
                          {detailSubscription.isCanceled === true && (
                            <div className="button-action">
                              <button
                                className="primary-button"
                                onClick={async () => {
                                  try {
                                    setLoadApi(true);
                                    await handlerCallCancelSubscription({
                                      idSubscription: detailSubscription.id,
                                      cancel_at: detailSubscription.cancel_at,
                                      reactive: true,
                                    });
                                    setTimeout(() => {
                                      handlerGetDetailInformation();
                                      onGetSubscription();
                                      setLoadApi(false);
                                    }, 5000);
                                  } catch (error) {
                                    setLoadApi(false);
                                  }
                                }}
                              >
                                Reactivar suscripción
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {detailSubscription.isCanceled === true && (
                        <div
                          style={{
                            padding: "0px 15px",
                            textAlign: "center",
                            color: "var(--color-primary)",
                          }}
                        >
                          <strong>
                            Ya has cancelado tu suscripción y tus beneficios
                            permanecerán activos hasta el termino de tu ciclo de
                            facturación
                          </strong>
                        </div>
                      )}
                    </DetailSubscription>
                  )}
              </div>
              <NoticePolicy>
                <h1
                  style={{
                    textAlign: "center",
                  }}
                >
                  ¡
                  <span
                    style={{
                      color: "#FF0282",
                    }}
                  >
                    Potencia tu negocio
                  </span>{" "}
                  con el paquete apropiado!
                </h1>
              </NoticePolicy>
              <div className="select-subscription">
                <ToggleSubscription>
                  <div
                    className="type-subscription"
                    onClick={() => {
                      setSubscriptionMethod(1);
                      if (subscriptionMethod !== 1) {
                        handlerCallGetAllSubscriptionTypes(1);
                      }
                    }}
                  >
                    <span>Mensual</span>
                  </div>
                  <div
                    className="type-subscription"
                    onClick={() => {
                      setSubscriptionMethod(2);
                      if (subscriptionMethod !== 2) {
                        handlerCallGetAllSubscriptionTypes(2);
                      }
                    }}
                  >
                    <span>Anual</span>
                  </div>
                  <Toggle mode={subscriptionMethod}>
                    <span>
                      {subscriptionMethod === 1 ? "Mensual" : "Anual"}
                    </span>
                  </Toggle>
                </ToggleSubscription>
                <div className="offert-subscription">
                  <span>2 meses gratis</span>
                  <ArrowPromotion />
                </div>
              </div>
              <div className="catalog-subscription">
                {isEmpty(dataSubscription) === false &&
                  dataSubscription.map((row) => {
                    const contentParse =
                      isEmpty(row.content) === false
                        ? JSON.parse(row.content)
                        : [];
                    return (
                      <CardSubscription>
                        <h1>{row.subscriptionType}</h1>
                        {/* <p>{row.description}Alguna descripción</p> */}
                        <div
                          className="price-subscription"
                          dangerouslySetInnerHTML={{
                            __html:
                              isNil(row.priceDescription) === false
                                ? row.priceDescription
                                : "",
                          }}
                        />
                        <div
                          style={{
                            padding: "0px 10px",
                          }}
                        >
                          <DetailInfoSubscription>
                            {isEmpty(contentParse) === false &&
                              contentParse.map((rowMap) => {
                                return (
                                  <div className="option-subs">
                                    <div>
                                      <Circle ok>
                                        <IconMinCheck />
                                      </Circle>
                                    </div>
                                    <span>{rowMap}</span>
                                  </div>
                                );
                              })}
                          </DetailInfoSubscription>
                        </div>
                        <div className="button-actions">
                          <ButtonSelect
                            onClick={async () => {
                              try {
                                setLoadApi(true);
                                const isOpenConfirm =
                                  await handlerCallSetSubscription({
                                    idSubscriptionType: row.idSubscriptionType,
                                    idMethod: subscriptionMethod,
                                    isTrial: row.canStartTrial,
                                    isCanceled: false,
                                  });
                                if (isOpenConfirm === false) {
                                  handlerGetDetailInformation();
                                  setStatusSubscription("success");
                                  onGetSubscription();
                                } else {
                                  setIsOpenConfChangeSubscription(true);
                                  setDataSelectSubscription({
                                    idSubscriptionType: row.idSubscriptionType,
                                    idMethod: subscriptionMethod,
                                    isTrial: row.canStartTrial,
                                    isCanceled: false,
                                    acceptedCode: isOpenConfirm,
                                  });
                                }
                                setLoadApi(false);
                              } catch (error) {
                                setStatusSubscription("cancel");
                                setLoadApi(false);
                              }
                            }}
                            select={row.isCurrent === true}
                          >
                            {row.canStartTrial === true &&
                              row.isCurrent === false &&
                              "Prueba gratis"}
                            {row.canStartTrial === false &&
                              row.isCurrent === false &&
                              "Seleccionar"}
                            {row.isCurrent === true && "Paquete activo"}
                          </ButtonSelect>
                          {/* <button className="view-info">
                            Ver características
                          </button> */}
                        </div>
                      </CardSubscription>
                    );
                  })}
              </div>
            </>
          )}
        </ContentForm>
      </ComponentLoadSection>
    </Content>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataUserRedirect } = state;
  return {
    dataProfile: dataProfile.dataProfile,
    dataUserRedirect: dataUserRedirect.dataUserRedirect,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
