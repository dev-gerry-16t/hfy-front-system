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
    justify-content: space-around;
    padding-bottom: 1em;
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
      font-size: 1.5em;
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
  display: grid;
  grid-template-columns: 2fr 3fr 2fr;
  font-size: 12px;
  padding: 10px 15px;
  .info-subscription {
    .data-info-subscription {
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
      button {
        border-radius: 1em;
        border: 1px solid var(--color-primary);
        background: #fff;
        color: var(--color-primary);
        font-weight: 600;
      }
    }
  }
`;

const Subscription = (props) => {
  const { callGlobalActionApi, dataProfile } = props;
  const [dataSubscription, setDataSubscription] = useState([]);
  const [subscriptionMethod, setSubscriptionMethod] = useState(1);
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

  useEffect(() => {
    handlerCallGetAllSubscriptionTypes(subscriptionMethod);
  }, []);

  return (
    <Content>
      <ContentForm>
        <div className="header-title">
          <h1>Selecciona tu paquete</h1>
        </div>
        <div
          style={{
            padding: "0px 1em",
            marginTop:"1em",
          }}
        >
          <DetailSubscription>
            <div className="info-subscription">
              <div className="data-info-subscription">
                <strong>Tu plan actual: </strong>
                <strong className="type-plan">Estándar</strong>
              </div>
              <div className="data-info-subscription">
                <span>Costo: </span>
                <span className="price-detail">$599MXN</span>
              </div>
            </div>
            <div className="info-subscription">
              <div className="data-info-subscription">
                <span>Inicio de suscripción: </span>
                <span className="price-detail">17 de enero del 2022</span>
              </div>
              <div className="data-info-subscription">
                <span>Próxima fecha de pago: </span>
                <span className="price-detail">17 de febrero del 2022</span>
              </div>
            </div>
            <div className="info-subscription">
              <div className="button-action">
                <button>Cancelar suscripción</button>
              </div>
            </div>
          </DetailSubscription>
        </div>
        <NoticePolicy>
          <h1>
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
              <span>{subscriptionMethod === 1 ? "Mensual" : "Anual"}</span>
            </Toggle>
          </ToggleSubscription>
          <div className="offert-subscription">
            <span>2 meses gratis</span>
            <ArrowPromotion />
          </div>
        </div>
        <div className="catalog-subscription">
          <CardSubscription>
            <h1>GRATIS</h1>
            <p>Para freelancers y sitios web personales</p>
            <div className="price-subscription">
              <h1>$0MXN / </h1>
              <span>siempre</span>
            </div>
            <div className="button-actions">
              <ButtonSelect select={true}>Empezar</ButtonSelect>
              <button className="view-info">Ver características</button>
            </div>
          </CardSubscription>
          <CardSubscription>
            <h1>ESTANDAR</h1>
            <p>Para freelancers y sitios web personales</p>
            <div className="price-subscription">
              <h1>$599MXN / </h1>
              <span>al mes</span>
            </div>
            <div className="button-actions">
              <ButtonSelect select={false}>Empezar</ButtonSelect>
              <button className="view-info">Ver características</button>
            </div>
          </CardSubscription>
          <CardSubscription>
            <h1>PRO</h1>
            <p>Para freelancers y sitios web personales</p>
            <div className="price-subscription">
              <h1>$1,800MXN / </h1>
              <span>al mes</span>
            </div>
            <div className="button-actions">
              <ButtonSelect select={false}>Empezar</ButtonSelect>
              <button className="view-info">Ver características</button>
            </div>
          </CardSubscription>
        </div>
      </ContentForm>

      {/* <div
        style={{
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => {
            setSubscriptionMethod(1);
            if (subscriptionMethod !== 1) {
              handlerCallGetAllSubscriptionTypes(1);
            }
          }}
        >
          Mensual
        </button>
        <button
          onClick={() => {
            setSubscriptionMethod(2);
            if (subscriptionMethod !== 2) {
              handlerCallGetAllSubscriptionTypes(2);
            }
          }}
        >
          Anual
        </button>
      </div>
      {isEmpty(dataSubscription) === false &&
        dataSubscription.map((row) => {
          return (
            <button
              style={{
                background:
                  row.isCurrent === true ? "var(--color-primary)" : "default",
              }}
            >
              {row.canStartTrial === true
                ? "Prueba gratis"
                : row.priceDescription}
            </button>
          );
        })}
        <div>
          <div>
            
          </div>
        </div> */}
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
