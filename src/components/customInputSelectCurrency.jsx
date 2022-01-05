import React from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
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
  border-radius: 5px 0px 0px 5px;
  background: transparent;
  border: ${(props) =>
    props.error ? "1px solid #DA1414" : "1px solid #d6d8e7"};
  border-right: none;
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

const GroupCurrency = styled.div`
  display: flex;
`;

const SelectCurrency = styled.select`
  border: ${(props) =>
    props.error ? "1px solid #DA1414" : "1px solid #d6d8e7"};
  border-radius: 0px 5px 5px 0px;
  color: var(--color-primary);
  font-weight: 600;
  &:focus-visible {
    outline: none;
  }
`;

const CustomInputSelectCurrency = (props) => {
  const {
    value,
    id,
    label,
    placeholder,
    onChange,
    error = false,
    errorMessage,
    prefix = "$",
    suffix = "",
    dataSelect = [],
    valueSelect = null,
    onChangeSelect = () => {},
  } = props;
  return (
    <ContainerInput>
      <Label error={error}>{label}</Label>
      <div>
        <GroupCurrency>
          <NumberFormat
            id={isNil(id) === false ? id : null}
            value={value}
            error={error}
            customInput={Input}
            thousandSeparator=","
            decimalSeparator="."
            decimalPrecision={2}
            allowNegative={false}
            prefix={prefix}
            suffix={suffix}
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
          <SelectCurrency
            value={isNil(valueSelect) === false ? valueSelect : ""}
            onChange={(e, a) => {
              const dataOption = dataSelect.find((row) => {
                return row.id == e.target.value;
              });
              onChangeSelect(e.target.value, dataOption);
            }}
            error={error}
          >
            {isNil(dataSelect) === false &&
              isEmpty(dataSelect) === false &&
              dataSelect.map((row) => {
                return <option value={row.id}>{row.text}</option>;
              })}
          </SelectCurrency>
        </GroupCurrency>
        <ErrorMessage error={error}>
          <img src={saqareX} alt="exclaim" />
          <span>{errorMessage}</span>
        </ErrorMessage>
      </div>
    </ContainerInput>
  );
};

export default CustomInputSelectCurrency;
