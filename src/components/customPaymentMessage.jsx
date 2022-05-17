import React from "react";
import styled from "styled-components";
import CustomDialog from "./CustomDialog";
import { ReactComponent as IconPaymentCheck } from "../assets/iconSvg/svgFile/iconPaymentCheck.svg";

const Container = styled.div`
  font-size: 16px;
  padding: 1.5em 1em;
  font-family: Poppins;
  .subTitle-confirm-info {
    font-weight: 700;
    font-size: 1.3em;
    color: var(--color-primary);
    cursor: pointer;
  }
`;

const HeaderContainer = styled.div`
  text-align: center;
  h1 {
    font-size: 1.4em;
    font-weight: 800;
  }
  span {
    color: var(--color-primary);
  }
`;

const MainButtons = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  row-gap: 1em;
  button {
    border-radius: 1em;
    border: none;
    padding: 0.5em 0px;
    font-weight: 600;
  }
  .hfy-primary-button {
    background: var(--color-primary);
    color: #fff;
  }
  .hfy-secondary-button {
    background: #fff;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
  }
`;

const CustomPaymentMessage = ({ onClose, visibleOnboard }) => {
  return (
    <CustomDialog
      isVisibleDialog={visibleOnboard}
      onClose={() => {}}
      classNameDialog="onboarding-dialog"
    >
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
          onClick={onClose}
        >
          X
        </button>
      </div>
      <Container>
        <HeaderContainer>
          <h1>
            Pago <span>recibido</span>
          </h1>
        </HeaderContainer>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <IconPaymentCheck />
        </div>
        <div
          style={{
            marginTop: "1em",
            textAlign: "center",
          }}
        >
          <span
            style={{
              color: "var(--color-primary)",
            }}
          >
            Tu pago se procesó exitosamente, ya puedes continuar disfrutando de
            tus beneficios adquiridos.
          </span>
        </div>
        <MainButtons>
          <button
            className="hfy-primary-button"
            onClick={() => {
              onClose();
            }}
          >
            Continuar
          </button>
        </MainButtons>
      </Container>
    </CustomDialog>
  );
};

export default CustomPaymentMessage;
