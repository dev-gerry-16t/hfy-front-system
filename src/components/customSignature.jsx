import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import styled, { keyframes } from "styled-components";
import saqareX from "../assets/icons/saqareX.svg";

const rotate = keyframes`
0% { transform: rotate(0) }
50%{transform: rotate(180deg)}
100% { transform: rotate(0) }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  visibility: ${(props) => (props.error ? "visible" : "hidden")};
  opacity: ${(props) => (props.error ? "1" : "0")};
  background: #feefef;
  color: #da1414;
  border-radius: 5px;
  font-size: 0.7em;
  padding: 3px 0px 3px 5px;
  transition: visibility 0.1s linear, opacity 0.1s linear;
  span {
    margin-left: 3px;
  }
`;

const ModalMobile = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
  top: 0px;
  left: 0px;
  padding: 1em;
  z-index: 100;
  .content-signature {
    h1 {
      text-align: center;
      font-weight: 800;
      font-size: 14px;
      span {
        color: var(--color-primary);
      }
    }
    display: flex;
    flex-direction: column;
    .sign-section {
      position: relative;
      border: 1px solid var(--color-primary);
      width: 400px;
      height: 180px;
      text-align: center;
      margin: 0px auto;
      .clear-sign {
        position: absolute;
        right: -28px;
        button {
          border: none;
        }
      }
      .sigCanvas {
        width: 100%;
        height: 100%;
        background: #f8f8f8;
      }
    }
    .text-signature {
      margin-top: 10px;
      color: #8d8d8d;
      font-size: 12px;
    }
    .buttons-firm-section {
      margin-top: 10px;
      display: flex;
      justify-content: space-around;
      .secondary-button {
      }
      .primary-button {
        border-radius: 5px;
        border: none;
        background: var(--color-primary);
        color: #fff;
        padding: 5px 10px;
      }
      .secondary-button {
        border-radius: 5px;
        border: 1px solid var(--color-primary);
        background: #fff;
        color: var(--color-primary);
        padding: 5px 10px;
      }
    }
  }
  .message-hz-screen {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    .message-indication {
      text-align: center;
      h2 {
        font-weight: 700;
        color: var(--color-primary);
      }
    }
    .rotate-screen {
      animation: ${rotate} 3s normal linear 3 forwards;
    }
  }
  @media screen and (orientation: portrait) {
    .content-signature {
      display: none;
    }
  }
  @media screen and (orientation: landscape) {
    overflow-y: scroll;
    .message-hz-screen {
      display: none;
    }
  }
`;

const CustomSignature = ({
  isVisible,
  onClose,
  fullName,
  documentName,
  onSuccessSign,
}) => {
  const [isVisibleError, setIsVisibleError] = useState(false);
  const signatureRef = useRef(null);

  let component = <></>;

  if (isVisible === true) {
    component = (
      <ModalMobile>
        <div
          style={{
            position: "absolute",
            right: "1em",
            top: "5px",
            zIndex: "2",
          }}
        >
          <button
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              signatureRef.current.clear();
              onClose();
            }}
          >
            X
          </button>
        </div>
        <div className="content-signature">
          <h1>
            Firma digital <span>{documentName}</span>
          </h1>
          <div className="sign-section">
            <div className="clear-sign">
              <button
                onClick={() => {
                  signatureRef.current.clear();
                }}
              >
                <i className="fa fa-refresh"></i>
              </button>
            </div>
            <SignatureCanvas
              penColor="black"
              canvasProps={{
                className: "sigCanvas",
              }}
              ref={signatureRef}
            />
          </div>
          <ErrorMessage error={isVisibleError}>
            <img src={saqareX} alt="exclaim" />
            <span>Firma dentro del recuadro de arriba</span>
          </ErrorMessage>
          <div className="text-signature">
            Yo{" "}
            <strong>
              <u>
                <i>{fullName}</i>{" "}
              </u>
            </strong>
            entiendo que Homify utilizará mi nombre, dirección de correo
            electrónico o cualquier otro medio de comunicación e información
            limitada para completar el proceso de firma y mejorar la experiencia
            de usuario. Si deseas mayor información acerca de cómo Homify
            recopila, utiliza y <strong>protege tus datos</strong> personales,
            consulta nuestro{" "}
            <a href="https://www.homify.ai/aviso-de-privacidad" target="_blank">
              aviso de privacidad
            </a>
            . Al añadir la firma digital a este documento, acepto que dicha
            firma será tan válida como las firmas manuscritas y se considerará
            original en la medida permitida por la ley aplicable.
          </div>
          <div className="buttons-firm-section">
            <button
              className="secondary-button"
              onClick={() => {
                signatureRef.current.clear();
                onClose();
              }}
            >
              Cerrar
            </button>
            <button
              className="primary-button"
              onClick={async () => {
                try {
                  const signatureCurrent = signatureRef.current;
                  if (signatureCurrent.isEmpty() === false) {
                    const signatureBase64 = signatureCurrent.toDataURL();
                    await onSuccessSign(signatureBase64);
                    signatureRef.current.clear();
                  } else {
                    setIsVisibleError(true);
                    setTimeout(() => {
                      setIsVisibleError(false);
                    }, 5000);
                  }
                } catch (error) {}
              }}
            >
              Aceptar y Firmar
            </button>
          </div>
        </div>
        <div className="message-hz-screen">
          <div className="message-indication">
            <h2>Para firmar gira tu dispositivo horizontalmente</h2>
          </div>
          <div className="rotate-screen">
            <i
              className="fa fa-rotate-right"
              style={{
                fontSize: "40px",
                color: "var(--color-primary)",
              }}
            ></i>
          </div>
        </div>
      </ModalMobile>
    );
  }
  return component;
};

export default CustomSignature;
