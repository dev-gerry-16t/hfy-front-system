import React, { useRef } from "react";
import styled from "styled-components";

const ContainerVerifyCode = styled.div`
  position: relative;
  width: 360px;
  font-size: 16px;
  .form-button-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    margin-top: 25px;
  }
  #code-verification {
    position: absolute;
    opacity: 0;
  }
  .section-code {
    display: flex;
    justify-content: space-around;
    .code-type {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 50px;
      border: 1px solid #a0a3bd;
      box-sizing: border-box;
      border-radius: 8px;
      .code-point {
        width: 0.9em;
        height: 0.9em;
        border-radius: 50%;
        background: #000;
      }
    }
  }
  @media screen and (max-width: 760px) {
    font-size: 12px;
    width: 300px;
  }
  @media screen and (max-width: 670px) {
    font-size: 15px;
    width: 90%;
    .section-code {
      justify-content: space-around;
    }
  }
  @media screen and (max-width: 360px) {
    font-size: 12px;
  }
`;

const ButtonAction = styled.button`
  color: ${(props) => (props.primary ? "#fff" : "var(--color-primary)")};
  cursor: ${(props) => (props.block ? "no-drop" : "pointer")};
  background: ${(props) =>
    props.primary
      ? props.block === true
        ? "#D6D8E7"
        : "var(--color-primary)"
      : "#fff"};
  border: none;
  border-radius: 16px;
  padding: 5px 3em;
  transition: all 0.2s ease-in-out;
`;

const ComponentVerifyCode = ({
  type = "correo",
  onResendCode,
  onValidateCode,
  onChangeCode,
  codeVerify,
  userData,
}) => {
  const refInput = useRef(null);

  return (
    <ContainerVerifyCode>
      <p>
        Enviamos un código de confirmación al {type} <strong>{userData}</strong>
        , te recomendamos revisar tu correo no deseado.
      </p>
      <div
        id="input-ref-div"
        className="section-code"
        onClick={() => {
          refInput.current.focus();
        }}
      >
        <div className="code-type">
          {codeVerify.length >= 1 && <div className="code-point"></div>}
        </div>
        <div className="code-type">
          {codeVerify.length >= 2 && <div className="code-point"></div>}
        </div>
        <div className="code-type">
          {codeVerify.length >= 3 && <div className="code-point"></div>}
        </div>
        <div className="code-type">
          {codeVerify.length >= 4 && <div className="code-point"></div>}
        </div>
        <div className="code-type">
          {codeVerify.length >= 5 && <div className="code-point"></div>}
        </div>
        <div className="code-type">
          {codeVerify.length === 6 && <div className="code-point"></div>}
        </div>
      </div>
      <form autocomplete="off" action="">
        <input
          id="code-verification"
          name="hidden"
          autocomplete="false"
          autoFocus
          value={codeVerify}
          type="number"
          ref={refInput}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 6) {
              onChangeCode(value);
            }
          }}
          onFocus={() => {}}
        />
      </form>
      <div className="form-button-column">
        <ButtonAction block={false} primary onClick={onValidateCode}>
          Validar
        </ButtonAction>
        <ButtonAction block={false} onClick={onResendCode}>
          Reenviar código
        </ButtonAction>
      </div>
    </ContainerVerifyCode>
  );
};

export default ComponentVerifyCode;
