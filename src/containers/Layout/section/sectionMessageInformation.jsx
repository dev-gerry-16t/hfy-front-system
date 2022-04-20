import { isEmpty, isNil } from "lodash";
import TagManager from "react-gtm-module";
import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as IconInfoCircle } from "../../../assets/iconSvg/svgFile/iconInfoCircle.svg";

const MessageSubscription = styled.div`
  font-family: Poppins;
  display: ${(props) => (props.isVisible === true ? "flex" : "none")};
  max-width: 900px;
  background: #fc847f;
  position: absolute;
  right: 0px;
  top: 65px;
  z-index: 10;
  padding: 5px 10px;
  column-gap: 10px;
  color: #fff;
  transition: all 0.5s ease-out;
  align-items: center;
  .info-message {
    font-weight: 700;
  }
  u {
    cursor: pointer;
  }
  button {
    border: none;
    font-weight: bold;
    background: transparent;
  }
`;
const SectionMessageInformation = (props) => {
  const { dataProfile, cookie } = props;
  const [isOpenMessage, setIsOpenMessage] = useState(true);
  return (
    <MessageSubscription
      isVisible={
        dataProfile.idUserType === 4 &&
        isNil(cookie) === true &&
        isOpenMessage === true
      }
    >
      {isOpenMessage === true && (
        <>
          <span className="info-message">
            Obtén GRATIS 10 anuncios en Mercado Libre
          </span>
          <u
            onClick={() => {
              TagManager.dataLayer({
                dataLayer: {
                  event: "clicHome",
                  term: "open_video_mlm",
                },
              });
              window.open(
                "https://www.youtube.com/watch?v=K7tW8zM3USc",
                "_blank"
              );
            }}
          >
            Ver cómo
          </u>
          <button
            onClick={() => {
              TagManager.dataLayer({
                dataLayer: {
                  event: "clicHome",
                  term: "close_video_mlm",
                },
              });
              setIsOpenMessage(false);
              document.cookie =
                "freePublicPropertyMLM=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
            }}
          >
            X
          </button>
        </>
      )}
    </MessageSubscription>
  );
};

export default SectionMessageInformation;
