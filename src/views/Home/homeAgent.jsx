import React, { createElement, useEffect, useState } from "react";
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
import FrontFunctions from "../../utils/actions/frontFunctions";
import CustomOnboarding from "../../components/CustomOnboarding";

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
  &:last-child {
    visibility: hidden;
  }
  @media screen and (max-width: 870px) {
    width: 15.5em;
    height: 8.625em;
    padding: 10px 0px;
    svg {
      width: 5.3em;
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
  }
`;

const catalogHome = [
  {
    text: "Mis propiedades",
    icon: IconProperties,
    path: "/websystem/dashboard-properties",
    page: "mis_propiedades",
  },
  {
    text: "Bolsa inmobiliaria",
    icon: IconBagHouse,
    path: "/websystem/catalog-properties",
    page: "bolsa_inmobiliaria",
  },
  {
    text: "Agregar Propiedad",
    icon: IconHousePlus,
    path: "/websystem/add-property",
    page: "agregar_propiedad",
  },
  {
    text: "Bandeja de entrada",
    icon: IconInMessage,
    path: "/websystem/notificaciones/1",
    page: "bandeja_de_entrada",
  },
  // { text: "Contactos", icon: IconSchedule, path: null },
  {
    text: "Dashboard",
    icon: IconHomeDashboard,
    path: "/websystem/dashboard-adviser",
    page: "dashboard",
  },
  // { text: "Generar contrato de arrendamiento", icon: IconNote, path: null },
  // { text: "Investigar inquilino", icon: IconSearchUser, path: null },
  {
    text: "Solicita una póliza jurídica",
    icon: IconHomePolicy,
    path: "/websystem/select-policy-user",
    page: "Solicita_una_poliza_juridica",
  },
];

const HomeAgent = (props) => {
  const { history } = props;
  const [visibleOnboard, setVisibleOnboard] = useState(false);
  const frontFunctions = new FrontFunctions();

  useEffect(() => {
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
        <div className="main-cards">
          {catalogHome.map((row) => {
            return (
              <CardHome
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
                }}
              >
                {createElement(row.icon, null, null)}
                <span>{row.text}</span>
              </CardHome>
            );
          })}
          <CardHome></CardHome>
        </div>
      </div>
    </ContentHome>
  );
};

export default HomeAgent;
