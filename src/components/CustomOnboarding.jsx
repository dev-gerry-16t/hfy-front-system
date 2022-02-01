import React, { useState } from "react";
import isNil from "lodash/isNil";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import CustomDialog from "./CustomDialog";
import LogoHomify from "../assets/img/logo.png";

const activeItem = keyframes`
from {
  width: 0.5rem;
  background-color: rgba(255, 255, 255, 20%);
}
  to {
    width: 1.5625rem;
    background-color: rgb(255, 255, 255);
  }
  `;

const fadeInContent = keyframes`
from {
    opacity: 0;
}
  
to {
    opacity: 1;
}
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: var(--main-width);
  background-color: #fff;
  border-radius: 1.25rem;
  padding: 3.125rem 0;
  text-align: center;
  overflow-x: hidden;
  animation: ${fadeInContent} 1000ms ease-in-out;
  transition: all 500ms ease-in-out;
  transition-property: opacity, visibility;
  .logo-homify {
    margin-bottom: 35px;
    img {
      width: 150px;
    }
  }

  .paginations-area {
    pointer-events: none;
    .paginations-area__item {
      display: inline-block;
      width: 10px;
      height: 10px;
      background-color: #f9e9f1;
      border-radius: 1.5625rem;
    }

    .paginations-area__item--current {
      width: 1.5625rem;
      background-color: var(--color-primary);
      animation: ${activeItem} 500ms ease-in-out;
    }

    .paginations-area__item:not(:last-child) {
      margin-right: 0.25rem;
    }
  }
  .button-next--fade {
    opacity: 0.8;
    pointer-events: none;
    filter: blur(2px);
  }

  @media screen and (max-width: 380px) {
    padding: 0px;
    .logo-homify {
      margin-bottom: 10px;

      img {
        width: 100px;
      }
    }
  }
`;

const BorderButton = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid var(--color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 380px) {
    width: 60px;
    height: 60px;
  }
`;

const ButtonOnboarding = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: var(--color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in;
  @media screen and (max-width: 380px) {
    width: 40px;
    height: 40px;
  }
`;

const SlidesArea = styled.section`
  display: flex;
  transition: margin 500ms ease-in-out;
  width: ${(props) => props.width};
  margin-left: ${(props) => props.left};
`;

const SlideArea = styled.article`
  width: 100%;
  color: #000;
  font-family: Poppins;
  font-size: 16px;
  .slide__image {
    width: 350px;
    margin-bottom: 30px;
  }
  .slide__text {
    padding: 0 2.1875rem;
    .slide__title {
      margin-bottom: 0px;
      color: #000;
      font-size: 1.6em;
      font-weight: 600;
      span {
        color: var(--color-primary);
      }
    }
    .slide__paragraph {
      font-size: 1em;
      font-weight: 400;
      margin-top: 0.3125rem;
    }
  }

  @media screen and (max-width: 380px) {
    .slide__text {
      .slide__title {
        font-size: 1.2em;
      }
      .slide__paragraph {
        font-size: 0.8em;
        font-weight: 400;
        margin-top: 0.3125rem;
      }
    }
  }

  @media screen and (max-width: 350px) {
    .slide__image {
      width: 100%;
    }
  }
`;

const ButtonOnboardingGo = styled.button`
  background: var(--color-primary);
  border: none;
  color: #fff;
  font-weight: 700;
  padding: 5px 20px;
  border-radius: 16px;
  font-size: 16px;
`;

const stepOnboarding = [
  {
    img: "https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296U221.png",
    title: "Bienvenido",
    title2: "a Homify",
    text: (
      <p className="slide__paragraph">
        Encuentra todo lo que necesitas para facilitar{" "}
        <strong>la prospección, colaboración y procesos de cierre</strong> en un
        solo lugar.
      </p>
    ),
  },
  {
    img: "https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296U220.png",
    title: "Crea",
    title2: "fichas técnicas",
    text: (
      <p className="slide__paragraph">
        <strong>Publica tu inventario</strong> en nuestra bolsa inmobiliaria{" "}
        <strong>y comparte</strong> con otros asesores e inquilinos.
      </p>
    ),
  },
  {
    img: "https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296U215.png",
    title: "Comparte",
    title2: "con otros asesores",
    text: (
      <p className="slide__paragraph">
        Mas de 1000 asesores tendrán acceso a tus propiedades públicas para{" "}
        promocionarlas y encontrar al mejor inquilino.
      </p>
    ),
  },
  {
    img: "https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296U214.png",
    title: "Agrega",
    title2: "inquilinos",
    text: (
      <p className="slide__paragraph">
        Invita inquilinos a tus propiedades para encontrar al ideal y monitorea
        el <strong>resultado de su investigación</strong>.
      </p>
    ),
  },
  {
    img: "https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296U213.png",
    title: "Recibe",
    title2: "alertas",
    text: (
      <p className="slide__paragraph">
        Contacta clientes que no renueven contrato,{" "}
        <strong>te notificaremos 60 días antes</strong> del vencimiento de un
        contrato.
      </p>
    ),
  },
  {
    img: "https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296U210.png",
    title: "Conviértete",
    title2: "en asesor verificado",
    text: (
      <p className="slide__paragraph">
        Se parte de la{" "}
        <strong>comunidad exclusiva de asesores inmobiliarios</strong>.
        Recuerda, un usuario verificado brinda confianza en otros{" "}
        <strong>asesores y propietarios</strong>.
      </p>
    ),
  },
  {
    img: "https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296U218.png",
    title: "Protege a",
    title2: "clientes",
    text: (
      <p className="slide__paragraph">
        Solicita una póliza jurídica y{" "}
        <strong>obtén una comisión del 20%</strong>.
      </p>
    ),
  },
  {
    img: "https://homify-docs-users.s3.us-east-2.amazonaws.com/8A7198C9-AE07-4ADD-AF34-60E84758296U216.png",
    title: "Genera",
    title2: "contratos de arrendamiento",
    text: (
      <p className="slide__paragraph">
        Contratos, pagarés y recibos de pago personalizados{" "}
        <strong>en menos de 1 hora</strong>.
      </p>
    ),
  },
];

const CustomOnboarding = (props) => {
  const { visibleOnboard, onClose, onClickFinish } = props;
  const [count, setCount] = useState(0);
  const [renderWidth, setRenderWidth] = useState(0);

  useEffect(() => {
    const updateResize = () => {
      const widthOutput = document.getElementById("wrapper");
      setRenderWidth(
        isNil(widthOutput) === false && isNil(widthOutput.clientWidth) === false
          ? widthOutput.clientWidth
          : 0
      );
    };
    window.addEventListener("resize", updateResize, false);
    setRenderWidth(window.innerWidth > 959 ? 600 : window.innerWidth);
    return () => {
      window.removeEventListener("resize", updateResize, false);
    };
  }, []);

  return (
    <CustomDialog
      isVisibleDialog={visibleOnboard}
      onClose={() => {}}
      classNameDialog="onboarding-dialog"
    >
      <div
        style={{
          textAlign: "right",
          paddingRight: "30px",
          paddingTop: "20px",
        }}
      >
        <span
          style={{
            fontWeight: "800",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          omitir
        </span>
      </div>
      <Wrapper id="wrapper">
        <div className="logo-homify" style={{}}>
          {count === 0 && <img src={LogoHomify} alt="" srcset="" />}
        </div>
        <SlidesArea
          id="slides-area"
          left={`-${count * renderWidth}px`}
          width={`${renderWidth * stepOnboarding.length}px`}
        >
          {stepOnboarding.map((row) => {
            return (
              <SlideArea>
                <img
                  src={row.img}
                  alt="illustration"
                  className="slide__image"
                />
                <div className="slide__text">
                  <h2 className="slide__title">
                    {row.title} <span>{row.title2}</span>
                  </h2>
                  {row.text}
                </div>
              </SlideArea>
            );
          })}
        </SlidesArea>
        <section className="paginations-area">
          {stepOnboarding.map((row, ix) => {
            return (
              <span
                className={
                  count == ix
                    ? "paginations-area__item paginations-area__item--current"
                    : "paginations-area__item"
                }
              ></span>
            );
          })}
        </section>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 25,
          }}
        >
          {count + 1 < stepOnboarding.length && (
            <BorderButton>
              <ButtonOnboarding
                id="next-button"
                onClick={() => {
                  const wraperScroll = document.getElementById("wrapper");
                  const nextButton = document.getElementById("next-button");
                  wraperScroll.scrollTop = 0;
                  nextButton.classList.add("button-next--fade");
                  setTimeout(() => {
                    nextButton.classList.remove("button-next--fade");
                  }, 500);
                  if (count + 1 < stepOnboarding.length) {
                    setCount(count + 1);
                  }
                }}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5 5L15.5 12L8.5 19"
                    stroke="#fff"
                    stroke-width="3.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </ButtonOnboarding>
            </BorderButton>
          )}
          {count + 1 === stepOnboarding.length && (
            <ButtonOnboardingGo onClick={onClickFinish}>
              PUBLICA TU PRIMER PROPIEDAD
            </ButtonOnboardingGo>
          )}
        </div>
      </Wrapper>
    </CustomDialog>
  );
};

export default CustomOnboarding;
