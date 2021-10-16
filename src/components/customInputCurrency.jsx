import React from "react";
import NumberFormat from "react-number-format";
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

const Input = styled.input`
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

const CustomInputCurrency = (props) => {
  const {
    value,
    id,
    label,
    placeholder,
    onChange,
    error = false,
    errorMessage,
  } = props;
  return (
    <ContainerInput>
      <Label error={error}>{label}</Label>
      <div>
        <NumberFormat
          id={isNil(id) === false ? id : null}
          value={value}
          error={error}
          customInput={Input}
          thousandSeparator=","
          decimalSeparator="."
          decimalPrecision={2}
          allowNegative={false}
          prefix="$"
          suffix=""
          className="inputLogin"
          floatingLabelText=""
          isVisible
          toBlock={false}
          disable={false}
          placeholder={placeholder}
          onValueChange={(values) => {
            const { formattedValue, valueString, floatValue } = values;
            onChange(floatValue, valueString, formattedValue);
          }}
          onClick={(event) => {}}
          onFocus={(event) => {}}
          onBlur={(event) => {}}
          onKeyDown={(e) => {
            if (e.keyCode === 109 || e.keyCode === 107) {
              e.preventDefault();
            }
          }}
        />
        <ErrorMessage error={error}>
          <img src={saqareX} alt="exclaim" />
          <span>{errorMessage}</span>
        </ErrorMessage>
      </div>
    </ContainerInput>
  );
};

export default CustomInputCurrency;
