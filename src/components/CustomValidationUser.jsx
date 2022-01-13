import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal } from "antd";
import LogoHomify from "../assets/img/logo.png";
import CustomReactMati from "./customReactMati";
import { ReactComponent as IconCheck } from "../assets/iconSvg/svgFile/iconBigCheckWhite.svg";
import { ReactComponent as IconLocation } from "../assets/iconSvg/svgFile/iconLocationSecurity.svg";
import { ReactComponent as IconIdUser } from "../assets/iconSvg/svgFile/iconIdUser.svg";
import { ReactComponent as IconStart } from "../assets/iconSvg/svgFile/iconStarSuccess.svg";

const FormModal = styled.div`
  font-family: Poppins;
  color: #4e4b66;
  padding: 0px 15%;
  font-size: 16px;
  .logo-hfy-modal {
    text-align: center;
    img {
      width: 100px;
    }
  }
  h1 {
    text-align: center;
    font-size: 1.375em;
    font-weight: 700;
    color: var(--color-primary);
    letter-spacing: 1px;
  }
  .step-init-verification {
    margin: 25px 0px 20px 0px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .top-title-information {
      p {
        text-align: center;
        letter-spacing: 0.75px;
      }
    }
    .info-user-verify {
      margin-top: 50px;
      display: flex;
      justify-content: center;
    }
  }
  .button-action {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .button-action-row {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }
  @media screen and (max-width: 1250px) {
    padding: 0px 25px;
  }
  @media screen and (max-width: 560px) {
    padding: 0px 5px;
    font-size: 14px;
  }
  @media screen and (max-width: 360px) {
    padding: 0px;
    font-size: 12px;
  }
`;

const ButtonsModal = styled.button`
  border: none;
  background: ${(props) =>
    props.primary ? "var(--color-primary)" : "transparent"};
  color: ${(props) => (props.primary ? "#fff" : "var(--color-primary)")};
  border-radius: 1em;
  padding: 5px 2em;
  margin-bottom: 5px;
  font-size: 0.875em;
  text-decoration: ${(props) => (props.primary ? "none" : "underline")};
  font-weight: 700;
`;

const InfoVerify = styled.div`
  position: relative;
  border: 1px solid #ff0282;
  box-sizing: border-box;
  border-radius: 20px;
  width: 500px;
  .icon-top {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    top: -40px;
    .circle-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 81px;
      height: 81px;
      border-radius: 50%;
      background: var(--color-primary);
    }
  }
  .info-main {
    margin-top: 50px;
    padding: 0px 25px;
    h2 {
      font-size: 1em;
      font-weight: bold;
      text-align: center;
      margin-bottom: 25px;
    }
    p {
      text-align: justify;
      letter-spacing: 0.75px;
    }
  }
`;

const ViewInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .image-section {
    margin: 40px;
  }
  .bottom-information {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    h1 {
      margin: 0px;
    }
    h2 {
      font-weight: bold;
      text-align: center;
    }

    p {
      margin-top: 20px;
      text-align: justify;
      letter-spacing: 0.75px;
      font-size: 1em;
    }
  }
`;

const CustomValidationUser = (props) => {
  const {
    isVisible,
    onClose,
    metadata,
    finished,
    clientId,
    flowId,
    finishedProcess,
  } = props;
  const [stepsValidation, setStepsValidation] = useState(1);
  const [geolocation, setGeolocation] = useState({ latitud: 0, longitud: 0 });

  const matchedScreen = (sizeMatch) => {
    let width = "60%";
    if (sizeMatch.matches) {
      width = "100%";
    } else {
      width = "50%";
    }

    return width;
  };

  const handlerGetGeolocation = async () => {
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      return {
        lng: pos.coords.longitude,
        lat: pos.coords.latitude,
      };
    } catch (error) {
      throw error;
    }
  };

  return (
    <Modal
      visible={isVisible}
      closable={true}
      footer={false}
      style={{ top: 20 }}
      width={matchedScreen(window.matchMedia("(max-width: 900px)"))}
      onCancel={() => {
        setGeolocation({ latitud: 0, longitud: 0 });
        setStepsValidation(1);
        onClose();
      }}
    >
      <FormModal>
        <div className="logo-hfy-modal">
          <img src={LogoHomify} alt="" srcset="" />
        </div>
        {stepsValidation === 1 && (
          <div className="step-init-verification">
            <div className="top-title-information">
              <h1>Aquí comienza la verificación de tu cuenta</h1>
              <p>
                <strong>¡Recuerda!</strong> Este proceso es con el fin de
                brindarte seguridad contra la suplantación de identidad y
                detección de fraudes.
              </p>
            </div>
            <div className="info-user-verify">
              <InfoVerify>
                <div className="icon-top">
                  <div className="circle-icon">
                    <IconCheck />
                  </div>
                </div>
                <div className="info-main">
                  <h2>No olvides tener en cuenta los siguientes puntos:</h2>
                  <p>
                    <ul>
                      <li>
                        Si interrumpes tu proceso, deberás esperar 30 min. para
                        intentarlo nuevamente.
                      </li>
                      <li>
                        Debes permitir el acceso a tu ubicación para un correcto
                        funcionamiento.
                      </li>
                      <li>
                        El resultado te llegará a través de un correo
                        electrónico.
                      </li>
                    </ul>
                  </p>
                  <p>
                    <strong>Nota:</strong> Si no realizas el proceso de
                    verificación, por seguridad algunos procesos estarán
                    bloqueados.
                  </p>
                </div>
              </InfoVerify>
            </div>
            <div className="button-action-row">
              <ButtonsModal
                primary
                onClick={() => {
                  setStepsValidation(2);
                }}
              >
                Comenzar mi verificación
              </ButtonsModal>
            </div>
          </div>
        )}
        {stepsValidation === 2 && (
          <ViewInformation>
            <div className="image-section">
              <IconLocation />
            </div>
            <div className="bottom-information">
              <h1>Permite el acceso a tu ubicación</h1>
              <p>
                Así podremos evitar que alguien acceda a tu información desde
                algún lugar desconocido.
              </p>
            </div>
            <div className="button-action-row">
              <ButtonsModal
                primary
                onClick={async () => {
                  try {
                    const geolocation = await handlerGetGeolocation();
                    setGeolocation({
                      latitud: geolocation.lat,
                      longitud: geolocation.lng,
                      maps: `https://www.google.com/maps/embed/v1/place?key=AIzaSyBwWOmV2W9QVm7lN3EBK4wCysj2sLzPhiQ&q=${geolocation.lat},${geolocation.lng}&zoom=18`,
                    });
                    setStepsValidation(3);
                  } catch (error) {
                    setGeolocation({
                      latitud: 0,
                      longitud: 0,
                      maps: null,
                    });
                    setStepsValidation(3);
                  }
                }}
              >
                Entendido
              </ButtonsModal>
            </div>
          </ViewInformation>
        )}
        {stepsValidation === 3 && (
          <ViewInformation>
            <div className="image-section">
              <IconIdUser />
            </div>
            <div className="bottom-information">
              <h1>Ayudanos a verificar tu identidad</h1>
              <p>
                No olvides tener a la mano:
                <ul>
                  <li>
                    Identificación Oficial original, solo son validos IFE/INE o FM3 (Solo
                    extranjeros), <strong>no se aceptan copias</strong>.
                  </li>
                  <li>
                    Comprobante de domicilio (Luz, agua, teléfono no mayor a
                    tres meses, los estados de cuenta bancarios no son validos
                    como comprobantes).
                  </li>
                </ul>
              </p>
            </div>
            <div className="button-action-row">
              <CustomReactMati
                clientId={clientId}
                flowId={flowId}
                country="mx"
                loaded={() => {}}
                product="kyc"
                color={document.getElementsByTagName("body")[0].className}
                metadata={{
                  ...geolocation,
                  ...metadata,
                }}
                exited={() => {
                  setStepsValidation(1);
                  setGeolocation({ latitud: 0, longitud: 0 });
                  onClose();
                }}
                finished={() => {
                  setStepsValidation(4);
                  finished();
                }}
              />
            </div>
          </ViewInformation>
        )}
        {stepsValidation === 4 && (
          <ViewInformation>
            <div className="image-section">
              <IconStart />
            </div>
            <div className="bottom-information">
              <h1>¡Felicidades!</h1>
              <h2>Has concluido tu verificación exitosamente</h2>
              <p
                style={{
                  textAlign: "center",
                }}
              >
                Te informaremos sobre el resultado final a través de tu correo
                electrónico.
              </p>
            </div>
            <div className="button-action-row">
              <ButtonsModal
                primary
                onClick={() => {
                  setGeolocation({ latitud: 0, longitud: 0 });
                  setStepsValidation(1);
                  finishedProcess();
                }}
              >
                Finalizar
              </ButtonsModal>
            </div>
          </ViewInformation>
        )}
      </FormModal>
    </Modal>
  );
};

export default CustomValidationUser;
