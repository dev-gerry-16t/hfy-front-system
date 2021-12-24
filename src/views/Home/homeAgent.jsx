import React, { createElement } from "react";
import styled from "styled-components";
import { ReactComponent as IconProperties } from "../../assets/iconSvg/svgFile/iconProperties.svg";
import { ReactComponent as IconBagHouse } from "../../assets/iconSvg/svgFile/iconBagHouse.svg";
import { ReactComponent as IconHousePlus } from "../../assets/iconSvg/svgFile/iconHousePlus.svg";
import { ReactComponent as IconInMessage } from "../../assets/iconSvg/svgFile/iconInMessage.svg";
import { ReactComponent as IconSchedule } from "../../assets/iconSvg/svgFile/iconSchedule.svg";
import { ReactComponent as IconHomeDashboard } from "../../assets/iconSvg/svgFile/iconHomeDashboard.svg";
import { ReactComponent as IconNote } from "../../assets/iconSvg/svgFile/iconNote.svg";
import { ReactComponent as IconSearchUser } from "../../assets/iconSvg/svgFile/iconSearchUser.svg";
import { ReactComponent as IconHomePolicy } from "../../assets/iconSvg/svgFile/iconHomePolicy.svg";

const ContentHome = styled.div`
  font-size: 16px;
  font-family: Poppins;
  width: 100%;
  min-height: 90vh;
  overflow-x: scroll;
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
      width: 70%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 4em;
    }
  }

  @media screen and (max-width: 1280px) {
    .bottom-home {
      .main-cards {
        width: 90%;
        gap: 2em;
      }
    }
  }

  @media screen and (max-width: 870px) {
    font-size: 14px;
    .bottom-home {
      .main-cards {
        padding: 10px;
        width: 100%;
        gap: 1em;
      }
    }
  }

  @media screen and (max-width: 420px) {
      font-size: 12px;
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
  &:last-child{
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
    width: 10.5em;
    height: 8.625em;
    gap: 5px;
    span {
      font-size: 12px;
      width: 100%;
    }
  }
`;

const catalogHome = [
  { text: "Mis propiedades", icon: IconProperties },
  { text: "Bolsa inmobiliaria", icon: IconBagHouse },
  { text: "Agregar Propiedad", icon: IconHousePlus },
  { text: "Bandeja de entrada", icon: IconInMessage },
  { text: "Contactos", icon: IconSchedule },
  { text: "Dashboard", icon: IconHomeDashboard },
  { text: "Generar contrato de arrendamiento", icon: IconNote },
  { text: "Investigar inquilino", icon: IconSearchUser },
  { text: "Solicita póliza juridica", icon: IconHomePolicy },
];

const HomeAgent = () => {
  return (
    <ContentHome>
      <div className="top-home">
        <div className="title">
          <h1>
            Comienza <span>aquí</span>
          </h1>
        </div>
        <div className="subtitle">
          <span>
            Accede rápidamente a las secciones más importantes de tu cuenta.
          </span>
        </div>
      </div>
      <div className="bottom-home">
        <div className="main-cards">
          {catalogHome.map((row) => {
            return (
              <CardHome>
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