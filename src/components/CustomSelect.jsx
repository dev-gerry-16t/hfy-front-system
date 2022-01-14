import React from "react";
import styled from "styled-components";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import saqareX from "../assets/icons/saqareX.svg";

const Label = styled.label`
  color: ${(props) => (props.error ? "#DA1414" : "#4e4b66")};
  margin-left: 10px;
`;

const ContainerSelect = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Poppins;
`;

const Select = styled.select`
  padding: 5px 6px;
  border-radius: 5px;
  background: ${(props) =>
    props.isBlock === false ? "transparent" : "#efefefd4"};
  cursor: ${(props) => (props.isBlock === false ? "auto" : "not-allowed")};

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
    font-weight: 100;
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

const CustomSelect = (props) => {
  const {
    value,
    id,
    data,
    label,
    placeholder = "-- Selecciona una opción --",
    onChange,
    error = false,
    errorMessage,
    isBlock = false,
  } = props;
  return (
    <ContainerSelect>
      <Label error={error}>{label}</Label>
      <div>
        <Select
          isBlock={isBlock}
          id={isNil(id) === false ? id : null}
          value={isNil(value) === false ? value : ""}
          onChange={(e, a) => {
            const dataOption = data.find((row) => {
              return row.id == e.target.value;
            });
            onChange(e.target.value, dataOption);
          }}
          error={error}
          disabled={isBlock}
        >
          <option disabled selected value="">
            {placeholder}
          </option>
          {isNil(data) === false &&
            isEmpty(data) === false &&
            data.map((row) => {
              return <option value={row.id}>{row.text}</option>;
            })}
        </Select>
        <ErrorMessage error={error}>
          <img src={saqareX} alt="exclaim" />
          <span>{errorMessage}</span>
        </ErrorMessage>
      </div>
    </ContainerSelect>
  );
};

export default CustomSelect;
