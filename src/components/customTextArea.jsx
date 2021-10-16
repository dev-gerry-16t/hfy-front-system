import React from "react";
import styled from "styled-components";
import isNil from "lodash/isNil";
import saqareX from "../assets/icons/saqareX.svg";

const Label = styled.label`
  color: ${(props) => (props.error ? "#DA1414" : "#4e4b66")};
  margin-left: 10px;
`;

const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Poppins;
`;

const TextArea = styled.textarea`
  padding: 5px 6px;
  border-radius: 5px;
  background: transparent;
  border: ${(props) =>
    props.error ? "1px solid #DA1414" : "1px solid #d6d8e7"};
  outline: none;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 700;
  width: 100%;
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus {
    border: 1px solid #b9bbc7;
  }
  &:hover {
    border: 1px solid #b9bbc7;
  }
  &::placeholder {
    font-weight: 200;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  visibility: ${(props) => (props.error ? "visible" : "hidden")};
  opacity: ${(props) => (props.error ? "1" : "0")};
  background: #feefef;
  color: #da1414;
  border-radius: 5px;
  font-size: 10px;
  padding: 3px 0px 3px 5px;
  transition: visibility 0.1s linear, opacity 0.1s linear;
  span {
    margin-left: 3px;
  }
`;

const CustomTextArea = (props) => {
  const {
    value,
    id,
    suffix,
    label,
    placeholder,
    onChange,
    type,
    maxLength,
    minLength,
    error = false,
    errorMessage,
  } = props;
  return (
    <ContainerInput>
      <Label error={error}>{label}</Label>
      <div>
        <TextArea
          id={isNil(id) === false ? id : null}
          value={value}
          type={isNil(type) === false ? type : "text"}
          suffix={isNil(suffix) === false ? suffix : null}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onKeyDown={(e) => {
            if (type === "number") {
              if (e.keyCode === 109 || e.keyCode === 107) {
                e.preventDefault();
              }
            }
          }}
          maxLength={isNil(maxLength) === false ? maxLength : null}
          minLength={isNil(minLength) === false ? minLength : null}
          error={error}
        />
        <ErrorMessage error={error}>
          <img src={saqareX} alt="exclaim" />
          <span>{errorMessage}</span>
        </ErrorMessage>
      </div>
    </ContainerInput>
  );
};

export default CustomTextArea;
