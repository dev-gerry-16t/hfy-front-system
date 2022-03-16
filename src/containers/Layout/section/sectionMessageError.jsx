import { isEmpty, isNil } from "lodash";
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
  u {
    cursor: pointer;
  }
  button {
    border: none;
    font-weight: bold;
    background: transparent;
  }
`;
const SectionMessageError = (props) => {
  const { detailSubscription } = props;
  const [isOpenMessage, setIsOpenMessage] = useState(true);

  return (
    <MessageSubscription
      isVisible={
        isEmpty(detailSubscription) === false &&
        isNil(detailSubscription.hosted_invoice_url) === false
      }
    >
      {isOpenMessage === true && (
        <>
          <span>Ingresa tu método de pago para continuar tu suscripción</span>
          <u
            onClick={() => {
              window.location.href = detailSubscription.hosted_invoice_url;
            }}
          >
            ingresar
          </u>
          <button
            onClick={() => {
              setIsOpenMessage(false);
            }}
          >
            X
          </button>
        </>
      )}
      {isOpenMessage === false && (
        <button
          onClick={() => {
            setIsOpenMessage(true);
          }}
        >
          <IconInfoCircle />
        </button>
      )}
    </MessageSubscription>
  );
};

export default SectionMessageError;
