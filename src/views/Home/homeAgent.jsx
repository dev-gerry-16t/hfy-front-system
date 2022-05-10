import React, { createElement, useEffect, useState } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import TagManager from "react-gtm-module";
import { ReactComponent as IconProperties } from "../../assets/iconSvg/svgFile/iconProperties.svg";
import { ReactComponent as IconBagHouse } from "../../assets/iconSvg/svgFile/iconBagHouse.svg";
import { ReactComponent as IconHousePlus } from "../../assets/iconSvg/svgFile/iconHousePlus.svg";
import { ReactComponent as IconInMessage } from "../../assets/iconSvg/svgFile/iconInMessage.svg";
import { ReactComponent as IconSchedule } from "../../assets/iconSvg/svgFile/iconSchedule.svg";
import { ReactComponent as IconHomeDashboard } from "../../assets/iconSvg/svgFile/iconHomeDashboard.svg";
import { ReactComponent as IconNote } from "../../assets/iconSvg/svgFile/iconNote.svg";
import { ReactComponent as IconSearchUser } from "../../assets/iconSvg/svgFile/iconSearchUser.svg";
import { ReactComponent as IconHomePolicy } from "../../assets/iconSvg/svgFile/iconHomePolicy.svg";
import CustomOnboarding from "../../components/CustomOnboarding";
import CustomViewRequestContract from "./sections/customViewRequestContract";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import { callGlobalActionApi } from "../../utils/actions/actions";

const ContentHome = styled.div`
  font-size: 16px;
  font-family: Poppins;
  width: 100%;
  min-height: 90vh;
  overflow-y: scroll;
  .top-home {
    background: #fff;
    padding: 1em;
    .title {
      h1 {
        font-size: 1.5em;
        font-weight: 700;
        span {
          color: var(--color-primary);
        }
      }
    }
    .subtitle {
      font-weight: 400;
    }
  }
  .bottom-home {
    padding-top: 2em;
    background: #f0f2f5;
    display: flex;
    justify-content: center;
    width: 100%;
    .main-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4em;
    }
  }

  @media screen and (max-width: 1280px) {
    font-size: 14px;
    .bottom-home {
      .main-cards {
        gap: 2em;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .bottom-home {
      .main-cards {
        grid-template-columns: repeat(2, 1fr);
        justify-items: center;
      }
    }
  }

  @media screen and (max-width: 870px) {
    .bottom-home {
      .main-cards {
        padding: 10px;
        width: 100%;
        gap: 1em;
      }
    }
  }

  @media screen and (max-width: 460px) {
    font-size: 12px;
    .bottom-home {
      .main-cards {
        grid-template-columns: 1fr;
        justify-items: center;
      }
    }
  }
`;

const CardHome = styled.div`
  position: relative;
  width: 17.5em;
  height: 10.625em;
  background: #fff;
  box-shadow: 0px 1px 8px 6px rgba(205, 213, 219, 0.6);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in;
  overflow: hidden;
  svg {
    width: 7.3em;
  }
  span {
    color: var(--color-primary);
    font-weight: 500;
    text-align: center;
    width: 180px;
  }
  &:hover {
    transform: scale(1.1);
  }
  .price-card {
    left: 5.6875em;
    bottom: 6.625em;
    text-align: center;
    background: var(--color-primary);
    color: #fff;
    position: absolute;
    transform: rotate(45deg);
    width: 100%;
    font-weight: 600;
    font-size: 1em;
  }
  @media screen and (max-width: 870px) {
    width: 15.5em;
    height: 8.625em;
    padding: 10px 0px;
    svg {
      width: 5.3em;
    }
    .price-card {
      left: 5.6875em;
      bottom: 4.625em;
    }
  }
  @media screen and (max-width: 420px) {
    width: 90%;
    height: 8.625em;
    gap: 5px;
    span {
      font-size: 12px;
      width: 100%;
    }
    .price-card {
      left: 7.6875em;
      bottom: 4.625em;
    }
  }
`;

const catalogHome = [
  {
    text: "Mis propiedades",
    icon: IconProperties,
    path: "/websystem/dashboard-properties",
    page: "mis_propiedades",
    price: false,
  },
  {
    text: "Bolsa inmobiliaria",
    icon: IconBagHouse,
    path: "/websystem/catalog-properties",
    page: "bolsa_inmobiliaria",
    price: false,
  },
  {
    text: "Agregar Propiedad",
    icon: IconHousePlus,
    path: "/websystem/add-property",
    page: "agregar_propiedad",
    price: false,
  },
  {
    text: "Bandeja de entrada",
    icon: IconInMessage,
    path: "/websystem/notificaciones/1",
    page: "bandeja_de_entrada",
    price: false,
  },
  // { text: "Contactos", icon: IconSchedule, path: null },
  {
    text: "Dashboard",
    icon: IconHomeDashboard,
    path: "/websystem/dashboard-adviser",
    page: "dashboard",
    price: false,
  },
  {
    text: "Generar contrato de arrendamiento",
    icon: IconNote,
    path: null,
    openComponent: 1,
    page: "genera_contrato_arrendamiento",
    price: true,
  },
  // { text: "Investigar inquilino", icon: IconSearchUser, path: null },
  {
    text: "Solicita una póliza jurídica",
    icon: IconHomePolicy,
    path: "/websystem/select-policy-user",
    page: "Solicita_una_poliza_juridica",
    price: false,
  },
];

const HomeAgent = (props) => {
  const { history, callGlobalActionApi, dataProfile } = props;
  const [visibleOnboard, setVisibleOnboard] = useState(false);
  const [visibleComponent, setVisibleComponent] = useState(null);
  const [dataFee, setDataFee] = useState({});

  const frontFunctions = new FrontFunctions();

  const handlerCallGetServiceFee = async () => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_SERVICE_FEE
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0][0]) === false &&
        isNil(response.response[0][0].serviceFee) === false &&
        isEmpty(response.response[0][0].serviceFee) === false
          ? JSON.parse(response.response[0][0].serviceFee)
          : {};
      setDataFee(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    handlerCallGetServiceFee();
    const cookieOnboarding = frontFunctions.getCookie("onboarding");
    if (isNil(cookieOnboarding) === true) {
      setVisibleOnboard(true);
    } else {
      setVisibleOnboard(false);
    }
  }, []);

  return (
    <ContentHome>
      <div className="top-home">
        <div className="title">
          <h1>
            Comienza{" "}
            <span
              onClick={() => {
                setVisibleOnboard(true);
              }}
              style={{
                cursor: "pointer",
              }}
            >
              aquí
            </span>
          </h1>
        </div>
        <div className="subtitle">
          <span>
            Accede rápidamente a las secciones más importantes de tu cuenta.
          </span>
        </div>
      </div>
      <div className="bottom-home">
        <CustomOnboarding
          visibleOnboard={visibleOnboard}
          onClose={() => {
            setVisibleOnboard(false);
            document.cookie =
              "onboarding=success; expires=Fri, 31 Dec 9999 23:59:59 GMT";
          }}
          onClickFinish={() => {
            setVisibleOnboard(false);
            document.cookie =
              "onboarding=success; expires=Fri, 31 Dec 9999 23:59:59 GMT";
            history.push("/websystem/add-property");
          }}
        />
        <CustomViewRequestContract
          dataFee={dataFee}
          visibleDialog={visibleComponent === 1}
          onClose={() => {
            setVisibleComponent(null);
          }}
          history={history}
        />
        <div className="main-cards">
          {catalogHome.map((row, ix) => {
            return (
              <CardHome
                key={`card-home-${ix}`}
                onClick={() => {
                  TagManager.dataLayer({
                    dataLayer: {
                      event: "clicHome",
                      term: row.page,
                    },
                  });
                  if (isNil(row.path) === false) {
                    history.push(row.path);
                  }
                  if (isNil(row.openComponent) === false) {
                    setVisibleComponent(row.openComponent);
                  }
                }}
              >
                {row.price === true && (
                  <div className="price-card">{dataFee.contract}</div>
                )}
                {createElement(row.icon, null, null)}
                <span>{row.text}</span>
              </CardHome>
            );
          })}
        </div>
      </div>
    </ContentHome>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeAgent);
